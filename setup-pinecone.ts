import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupPineconeIndex() {
  console.log('🔧 Setting up Pinecone index...');

  // Check if API key is loaded
  if (!process.env.PINECONE_API_KEY) {
    console.error('❌ PINECONE_API_KEY not found in environment variables');
    console.log('Make sure your .env file contains:');
    console.log('PINECONE_API_KEY=your-pinecone-api-key');
    process.exit(1);
  }

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexName = 'perigon-coding-guidelines';

  try {
    // List existing indexes
    console.log('📋 Listing existing indexes...');
    const indexes = await pinecone.listIndexes();
    console.log(
      'Existing indexes:',
      indexes.indexes?.map((idx) => idx.name) || []
    );

    // Check if our index exists
    const indexExists = indexes.indexes?.some((idx) => idx.name === indexName);

    if (indexExists) {
      console.log(`✅ Index "${indexName}" already exists`);

      // Get index stats
      const index = pinecone.index(indexName);
      const stats = await index.describeIndexStats();
      console.log(`📊 Current vector count: ${stats.totalRecordCount}`);
    } else {
      console.log(`❌ Index "${indexName}" does not exist. Creating it...`);

      // Create the index
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536, // OpenAI text-embedding-3-small dimension
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
        waitUntilReady: true,
      });

      console.log(`✅ Index "${indexName}" created successfully!`);
    }

    console.log('🎉 Pinecone setup complete!');
  } catch (error) {
    console.error('❌ Error setting up Pinecone:', error);

    if (error instanceof Error && error.message.includes('401')) {
      console.log(
        'This looks like an authentication error. Please check your PINECONE_API_KEY.'
      );
    }

    process.exit(1);
  }
}

setupPineconeIndex();
