import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { readdir, readFile, stat } from 'fs/promises';
import { join, relative, basename, dirname } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    filename: string;
    category: string;
    subcategory?: string;
    section: string;
    type: DocumentType;
    path: string;
  };
}

type DocumentType =
  | 'component'
  | 'design-system'
  | 'coding-patterns'
  | 'app-architecture'
  | 'services'
  | 'query-hooks'
  | 'types'
  | 'general-docs'
  | 'readme';

class DocumentVectorizer {
  private openai: OpenAI;
  private pinecone: Pinecone;
  private indexName = 'perigon-coding-guidelines';
  private readonly MAX_TOKENS = 7000; // Conservative limit below 8192
  private readonly MAX_CHUNK_LENGTH = 20000; // Rough character limit

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('PINECONE_API_KEY environment variable is required');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }

  async initialize() {
    try {
      const index = this.pinecone.index(this.indexName);

      // Check if index has any vectors before trying to delete
      const stats = await index.describeIndexStats();
      console.log(`Index stats: ${stats.totalRecordCount} vectors`);

      if (stats.totalRecordCount && stats.totalRecordCount > 0) {
        console.log('Clearing existing vectors from index...');
        await index.deleteAll();
        console.log('Cleared existing vectors from index');
      } else {
        console.log('Index is empty, no need to clear');
      }
    } catch (error) {
      console.error('Error initializing index:', error);
      throw new Error(
        'Failed to initialize Pinecone index. Make sure the index exists and is properly configured.'
      );
    }

    console.log('Initialized index:', this.indexName);
  }

  private getDocumentType(filePath: string): DocumentType {
    const pathParts = filePath.split('/');
    const filename = basename(filePath).toLowerCase();

    // Handle README files specially
    if (filename.startsWith('readme')) {
      return 'readme';
    }

    // Determine type based on directory structure
    for (const part of pathParts) {
      const lowerPart = part.toLowerCase();
      if (lowerPart === 'components') return 'component';
      if (lowerPart === 'design-system') return 'design-system';
      if (lowerPart === 'coding-patterns') return 'coding-patterns';
      if (lowerPart === 'app-architecture') return 'app-architecture';
      if (lowerPart === 'services') return 'services';
      if (lowerPart === 'query-hooks') return 'query-hooks';
      if (lowerPart === 'types') return 'types';
    }

    return 'general-docs';
  }

  private getCategoryFromPath(filePath: string): {
    category: string;
    subcategory?: string;
  } {
    const pathParts = filePath
      .split('/')
      .filter((part) => part !== '.' && part !== '..');
    const docsIndex = pathParts.findIndex((part) => part === 'docs');

    if (docsIndex === -1) {
      return { category: 'unknown' };
    }

    const relevantParts = pathParts.slice(docsIndex + 1);

    if (relevantParts.length === 0) {
      return { category: 'root' };
    }

    const category = relevantParts[0] || 'unknown';
    const subcategory =
      relevantParts.length > 1
        ? relevantParts.slice(1, -1).join('/')
        : undefined;

    return { category, subcategory };
  }

  async readAllDocuments(directory: string): Promise<DocumentChunk[]> {
    const chunks: DocumentChunk[] = [];
    let processedFiles = 0;
    let skippedFiles = 0;

    const processPath = async (currentPath: string) => {
      try {
        const stats = await stat(currentPath);

        if (stats.isDirectory()) {
          console.log(
            `📁 Processing directory: ${relative(directory, currentPath)}`
          );
          const entries = await readdir(currentPath, { withFileTypes: true });

          for (const entry of entries) {
            const fullPath = join(currentPath, entry.name);
            await processPath(fullPath);
          }
        } else if (stats.isFile()) {
          const filename = basename(currentPath);
          const extension = filename.split('.').pop()?.toLowerCase();

          // Process markdown files and README files
          if (
            extension === 'md' ||
            filename.toLowerCase().startsWith('readme')
          ) {
            try {
              const content = await readFile(currentPath, 'utf-8');

              if (content.trim().length < 50) {
                console.log(
                  `⚠️  Skipping ${relative(directory, currentPath)} - too short`
                );
                skippedFiles++;
                return;
              }

              const relativePath = relative(directory, currentPath);
              const documentType = this.getDocumentType(relativePath);
              const { category, subcategory } =
                this.getCategoryFromPath(relativePath);

              const documentChunks = this.splitDocumentIntoChunks(content, {
                source: currentPath,
                filename: filename.replace(/\.(md|txt)$/i, ''),
                category,
                subcategory,
                type: documentType,
                path: relativePath,
              });

              chunks.push(...documentChunks);
              processedFiles++;

              console.log(
                `📄 Processed: ${relativePath} (${documentChunks.length} chunks, type: ${documentType})`
              );
            } catch (error) {
              console.error(`❌ Error processing ${currentPath}:`, error);
              skippedFiles++;
            }
          }
        }
      } catch (error) {
        console.error(`❌ Error accessing ${currentPath}:`, error);
      }
    };

    await processPath(directory);

    console.log(`\n📊 Processing Summary:`);
    console.log(`   ✅ Files processed: ${processedFiles}`);
    console.log(`   ⚠️  Files skipped: ${skippedFiles}`);
    console.log(`   📚 Total chunks created: ${chunks.length}`);

    return chunks;
  }

  // Add token estimation function
  private estimateTokenCount(text: string): number {
    // Rough estimation: ~4 characters per token for English text
    return Math.ceil(text.length / 4);
  }

  // Add function to split large content into smaller chunks
  private splitLargeContent(
    content: string,
    maxTokens: number = this.MAX_TOKENS
  ): string[] {
    const estimatedTokens = this.estimateTokenCount(content);

    if (estimatedTokens <= maxTokens) {
      return [content];
    }

    const chunks: string[] = [];
    const paragraphs = content.split('\n\n');
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      const testChunk = currentChunk + (currentChunk ? '\n\n' : '') + paragraph;

      if (this.estimateTokenCount(testChunk) > maxTokens) {
        // If current chunk has content, save it
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = paragraph;
        } else {
          // If single paragraph is too large, split by sentences
          const sentences = paragraph.split(/[.!?]+/).filter((s) => s.trim());
          let sentenceChunk = '';

          for (const sentence of sentences) {
            const testSentence =
              sentenceChunk + (sentenceChunk ? '. ' : '') + sentence.trim();

            if (this.estimateTokenCount(testSentence) > maxTokens) {
              if (sentenceChunk.trim()) {
                chunks.push(sentenceChunk.trim() + '.');
                sentenceChunk = sentence.trim();
              } else {
                // If single sentence is too large, truncate it
                const truncated = sentence.substring(0, maxTokens * 3); // Rough character limit
                chunks.push(truncated + '...');
              }
            } else {
              sentenceChunk = testSentence;
            }
          }

          if (sentenceChunk.trim()) {
            currentChunk = sentenceChunk.trim() + '.';
          }
        }
      } else {
        currentChunk = testChunk;
      }
    }

    // Don't forget the last chunk
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks.filter((chunk) => chunk.length > 50); // Filter out tiny chunks
  }

  private splitDocumentIntoChunks(
    content: string,
    baseMetadata: Omit<DocumentChunk['metadata'], 'section'>
  ): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    const cleanContent = content.trim();

    // Split by headers (## or #)
    const sections = cleanContent.split(/^(#{1,6})\s+(.+)$/gm);

    if (sections.length <= 3) {
      // No clear sections, split by token limit
      const contentChunks = this.splitLargeContent(cleanContent);

      contentChunks.forEach((chunk, index) => {
        chunks.push({
          id: `${baseMetadata.category}-${baseMetadata.filename}-part-${index}`,
          content: chunk,
          metadata: {
            ...baseMetadata,
            section: 'full-document',
          },
        });
      });

      return chunks;
    }

    let currentContent = '';
    let currentTitle = 'introduction';
    let chunkIndex = 0;

    for (let i = 0; i < sections.length; i += 3) {
      const headerLevel = sections[i + 1];
      const title = sections[i + 2];
      const sectionContent = sections[i + 3] || '';

      if (headerLevel && title) {
        // Save previous chunk if it has substantial content
        if (currentContent.trim().length > 100) {
          // Split large content into smaller chunks
          const contentChunks = this.splitLargeContent(currentContent.trim());

          contentChunks.forEach((chunk, subIndex) => {
            chunks.push({
              id: `${baseMetadata.category}-${
                baseMetadata.filename
              }-${currentTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')}-${chunkIndex}-${subIndex}`,
              content: chunk,
              metadata: {
                ...baseMetadata,
                section: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              },
            });
          });

          chunkIndex++;
        }

        // Start new chunk
        currentTitle = title.trim();
        currentContent = `${'#'.repeat(
          headerLevel?.length || 1
        )} ${title}\n\n${sectionContent}`;
      } else if (i === 0) {
        currentContent = sections[i] || '';
      } else {
        currentContent += sections[i] || '';
      }
    }

    // Don't forget the last chunk
    if (currentContent.trim().length > 100) {
      const contentChunks = this.splitLargeContent(currentContent.trim());

      contentChunks.forEach((chunk, subIndex) => {
        chunks.push({
          id: `${baseMetadata.category}-${baseMetadata.filename}-${currentTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}-${chunkIndex}-${subIndex}`,
          content: chunk,
          metadata: {
            ...baseMetadata,
            section: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          },
        });
      });
    }

    return chunks;
  }

  async generateEmbeddings(chunks: DocumentChunk[]): Promise<void> {
    const index = this.pinecone.index(this.indexName);

    // Filter and validate chunks before processing
    const validChunks = chunks.filter((chunk) => {
      const tokenCount = this.estimateTokenCount(chunk.content);
      if (tokenCount > this.MAX_TOKENS) {
        console.log(
          `⚠️  Chunk ${chunk.id} has ${tokenCount} tokens (max: ${this.MAX_TOKENS}), truncating...`
        );
        // Truncate the content to fit within limits
        chunk.content = chunk.content.substring(0, this.MAX_TOKENS * 3) + '...';
      }
      return chunk.content.length > 50;
    });

    console.log(
      `📊 Processing ${validChunks.length} valid chunks (filtered from ${chunks.length})`
    );

    const batchSize = 25; // Reduced batch size for better error handling
    const totalBatches = Math.ceil(validChunks.length / batchSize);

    console.log(
      `\n🚀 Starting embedding generation for ${validChunks.length} chunks in ${totalBatches} batches...`
    );

    for (let i = 0; i < validChunks.length; i += batchSize) {
      const batch = validChunks.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      console.log(
        `⚡ Processing batch ${batchNumber}/${totalBatches} (${batch.length} chunks)`
      );

      // Log token counts for debugging
      const batchTokenCounts = batch.map((chunk) =>
        this.estimateTokenCount(chunk.content)
      );
      const totalBatchTokens = batchTokenCounts.reduce(
        (sum, count) => sum + count,
        0
      );
      console.log(
        `   Token counts: [${batchTokenCounts.join(
          ', '
        )}] (total: ${totalBatchTokens})`
      );

      try {
        const embeddings = await this.openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: batch.map((chunk) => chunk.content),
        });

        const vectors = batch.map((chunk, idx) => ({
          id: chunk.id,
          values: embeddings.data[idx]!.embedding,
          metadata: {
            ...chunk.metadata,
            content: chunk.content.substring(0, 40000), // Pinecone metadata size limit
          },
        }));

        await index.upsert(vectors);

        console.log(
          `✅ Batch ${batchNumber} completed - added ${batch.length} vectors`
        );

        // Rate limiting for OpenAI API
        if (batchNumber < totalBatches) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`❌ Error processing batch ${batchNumber}:`, error);

        // Try to process chunks individually to isolate problematic ones
        console.log(
          `🔍 Attempting individual processing for batch ${batchNumber}...`
        );

        for (let j = 0; j < batch.length; j++) {
          const chunk = batch[j];
          if (!chunk) continue;

          const tokenCount = this.estimateTokenCount(chunk.content);

          try {
            if (tokenCount > this.MAX_TOKENS) {
              console.log(
                `⚠️  Skipping chunk ${chunk.id} - too large (${tokenCount} tokens)`
              );
              continue;
            }

            const embedding = await this.openai.embeddings.create({
              model: 'text-embedding-3-small',
              input: [chunk.content],
            });

            const vector = {
              id: chunk.id,
              values: embedding.data[0]!.embedding,
              metadata: {
                ...chunk.metadata,
                content: chunk.content.substring(0, 40000),
              },
            };

            await index.upsert([vector]);
            console.log(
              `   ✅ Individual chunk ${j + 1}/${batch.length} processed`
            );

            // Rate limit individual requests too
            await new Promise((resolve) => setTimeout(resolve, 200));
          } catch (chunkError) {
            console.error(
              `   ❌ Failed to process individual chunk ${chunk.id}:`,
              chunkError
            );
          }
        }
      }
    }
  }

  async vectorizeDocumentation() {
    console.log('🚀 Starting comprehensive documentation vectorization...');
    console.log(
      '📍 This will process ALL markdown files and READMEs in the docs directory'
    );

    await this.initialize();

    const docsPath = join(process.cwd(), 'docs');
    console.log(`📂 Reading all documents from: ${docsPath}`);

    const chunks = await this.readAllDocuments(docsPath);

    if (chunks.length === 0) {
      console.log('⚠️  No documents found to vectorize!');
      return;
    }

    console.log(`\n📋 Document Categories Found:`);
    const categoryStats = chunks.reduce((acc, chunk) => {
      const key = chunk.metadata.type;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(categoryStats).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} chunks`);
    });

    await this.generateEmbeddings(chunks);

    console.log('\n🎉 Vectorization complete!');

    const index = this.pinecone.index(this.indexName);
    const stats = await index.describeIndexStats();
    console.log(`📊 Total vectors in index: ${stats.totalRecordCount}`);
    console.log(`🎯 Successfully processed ${chunks.length} document chunks`);
  }
}

async function main() {
  try {
    const vectorizer = new DocumentVectorizer();
    await vectorizer.vectorizeDocumentation();
  } catch (error) {
    console.error('💥 Vectorization failed:', error);
    process.exit(1);
  }
}

main();
