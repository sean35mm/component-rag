import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// Load environment variables with explicit path
dotenv.config({ path: '.env' });

interface GenerateRequest {
  prompt: string;
  context?: string;
  maxResults?: number;
}

interface GenerateResponse {
  code: string;
  explanation: string;
  components: string[];
  context_used: string[];
}

class RAGService {
  private openai: OpenAI;
  private anthropic: Anthropic;
  private pinecone: Pinecone;
  private indexName = 'perigon-coding-guidelines';

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('PINECONE_API_KEY environment variable is required');
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }

  async searchRelevantDocs(
    query: string,
    maxResults: number = 8
  ): Promise<any[]> {
    try {
      console.log(`🔍 Searching for: "${query}" (max: ${maxResults})`);

      const index = this.pinecone.index(this.indexName);

      console.log('🤖 Creating OpenAI embedding...');
      const embedding = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: query,
      });

      if (!embedding.data[0]?.embedding) {
        throw new Error(
          'Failed to create embedding - no embedding data received'
        );
      }

      console.log(
        `📊 Embedding created (${embedding.data[0].embedding.length} dimensions)`
      );
      console.log('🔍 Querying Pinecone index...');

      const results = await index.query({
        vector: embedding.data[0].embedding,
        topK: maxResults,
        includeMetadata: true,
        includeValues: false,
      });

      console.log(
        `✅ Pinecone query successful (${results.matches?.length || 0} matches)`
      );

      const relevantDocs =
        results.matches?.map((match) => ({
          content: match.metadata?.content || '',
          metadata: {
            filename: match.metadata?.filename || '',
            component: match.metadata?.component || '',
            category: match.metadata?.category || '',
            subcategory: match.metadata?.subcategory || '',
            section: match.metadata?.section || '',
            type: match.metadata?.type || 'general-docs',
            source: match.metadata?.source || '',
            path: match.metadata?.path || '',
          },
          score: match.score || 0,
        })) || [];

      console.log(`📋 Processed ${relevantDocs.length} relevant documents`);
      return relevantDocs.sort((a, b) => b.score - a.score);
    } catch (error) {
      console.error('❌ Error searching documents:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Return empty array instead of throwing to prevent total failure
      return [];
    }
  }

  private buildSystemPrompt(relevantDocs: any[]): string {
    // Organize docs by type for better context
    const docsByType = relevantDocs.reduce((acc, doc) => {
      const type = doc.metadata.type || 'general-docs';
      if (!acc[type]) acc[type] = [];
      acc[type].push(doc.content);
      return acc;
    }, {} as Record<string, string[]>);

    const componentDocs = docsByType.component?.join('\n\n---\n\n') || '';
    const designSystemDocs =
      docsByType['design-system']?.join('\n\n---\n\n') || '';
    const codingPatternsDocs =
      docsByType['coding-patterns']?.join('\n\n---\n\n') || '';
    const appArchitectureDocs =
      docsByType['app-architecture']?.join('\n\n---\n\n') || '';
    const servicesDocs = docsByType.services?.join('\n\n---\n\n') || '';
    const queryHooksDocs = docsByType['query-hooks']?.join('\n\n---\n\n') || '';
    const typesDocs = docsByType.types?.join('\n\n---\n\n') || '';
    const readmeDocs = docsByType.readme?.join('\n\n---\n\n') || '';
    const generalDocs = docsByType['general-docs']?.join('\n\n---\n\n') || '';

    return `You are an expert full-stack React/TypeScript developer specializing in the Perigon application architecture and development patterns. Your task is to generate production-ready code that follows Perigon's comprehensive development standards, architectural patterns, and component system.

## CRITICAL IMPORT REQUIREMENTS

**ALWAYS use these exact import patterns:**
- \`import { Button, Card, Badge, Dialog, etc. } from '@/perigon/components';\`
- \`import { IconName } from '@/perigon/components';\` for icons
- For types: \`import type { UserType, ApiResponse } from '@/types';\`
- For hooks: \`import { useQuery, useMutation } from '@/lib/hooks';\`
- For services: \`import { apiService, authService } from '@/lib/services';\`

**NEVER use generic component libraries or make up imports.**

## PERIGON COMPREHENSIVE DOCUMENTATION

### App Architecture & Patterns
${appArchitectureDocs}

### Coding Patterns & Best Practices
${codingPatternsDocs}

### Component Library
${componentDocs}

### Design System Guidelines
${designSystemDocs}

### Services & API Integration
${servicesDocs}

### Query Hooks & Data Fetching
${queryHooksDocs}

### TypeScript Types & Interfaces
${typesDocs}

### README & Setup Documentation
${readmeDocs}

### Additional Documentation
${generalDocs}

## PERIGON COMPREHENSIVE DESIGN SYSTEM

### Complete Typography System (MANDATORY USAGE)
The Perigon typography system uses PX Grotesk font with comprehensive semantic classes:

**Title Classes:**
- \`typography-titleH1\` (56px, Medium, Page titles)
- \`typography-titleH2\` (48px, Medium, Section titles)
- \`typography-titleH3\` (48px, Medium, Subsections)
- \`typography-titleH4\` (32px, Medium, Card titles)
- \`typography-titleH5\` (24px, Medium, Component titles)
- \`typography-titleH6\` (20px, Medium, Small sections)
- \`typography-titleLarge\` (18px, Medium, Subheadings)
- \`typography-titleH16\` (16px, Bold, Bold body text)

**Label Classes (Interface Elements):**
- \`typography-labelXLarge\` (24px, Medium, Large buttons)
- \`typography-labelLarge\` (18px, Medium, Button text)
- \`typography-labelMedium\` (16px, Medium, Form labels)
- \`typography-labelSmall\` (14px, Medium, Small buttons)
- \`typography-labelXSmall\` (12px, Medium, Captions)
- \`typography-label2XSmall\` (11px, Medium, Badges)
- \`typography-label3XSmall\` (10px, Medium, Micro text)

**Paragraph Classes (Body Text):**
- \`typography-paragraphXLarge\` (24px, Regular, Large body)
- \`typography-paragraphLarge\` (18px, Regular, Article body)
- \`typography-paragraphMedium\` (16px, Regular, Default body)
- \`typography-paragraphSmall\` (14px, Regular, Small descriptions)
- \`typography-paragraphXSmall\` (12px, Regular, Fine print)
- \`typography-paragraph3XSmall\` (10px, Regular, Micro text)

**Subheading Classes (Section Labels):**
- \`typography-subheadingMedium\` (16px, Medium, Uppercase, Section dividers)
- \`typography-subheadingSmall\` (14px, Medium, Uppercase, Categories)
- \`typography-subheadingXSmall\` (12px, Medium, Uppercase, Form sections)
- \`typography-subheading2XSmall\` (11px, Medium, Uppercase, Small categories)
- \`typography-subheading3XSmall\` (10px, Medium, Uppercase, Micro categories)

**Headline Classes (Feature Emphasis):**
- \`typography-headlines36\` (36px, Bold, Feature headlines)
- \`typography-headlines32\` (32px, Bold, Large headlines)
- \`typography-headlines24\` (24px, Bold, Article headlines)
- \`typography-headlines20\` (20px, Bold, Card headlines)
- \`typography-headlines18\` (18px, Bold, Component headlines)
- \`typography-headlines16\` (16px, Bold, Small headlines)
- \`typography-headlines15\` (15px, Medium+, Medium headlines)
- \`typography-headlines14\` (14px, Medium+, Small emphasis)

### Comprehensive Color System (STRICT ADHERENCE REQUIRED)

**Semantic Background Colors (Theme Adaptive):**
- \`bg-pgBackground-0\` - Primary backgrounds
- \`bg-pgBackground-50\` - Secondary backgrounds  
- \`bg-pgBackground-100\` - Tertiary backgrounds
- \`bg-pgBackground-200\` - Subtle backgrounds
- \`bg-pgBackground-300\` - Card backgrounds
- \`bg-pgBackground-800\` - Inverted backgrounds
- \`bg-pgBackground-950\` - Maximum contrast backgrounds

**Semantic Text Colors (Theme Adaptive):**
- \`text-pgText-0\` - Inverted text (white on dark)
- \`text-pgText-300\` - Placeholder text
- \`text-pgText-400\` - Secondary text
- \`text-pgText-600\` - Tertiary text
- \`text-pgText-700\` - Strong text
- \`text-pgText-800\` - Primary text
- \`text-pgText-950\` - Maximum contrast text

**Border Colors (pgStroke System):**
- \`border-pgStroke-0\` - White borders
- \`border-pgStroke-100\` - Subtle borders
- \`border-pgStroke-200\` - Default borders (most common)
- \`border-pgStroke-250\` - Medium borders
- \`border-pgStroke-300\` - Strong borders
- \`border-pgStroke-950\` - Maximum contrast borders

**Icon Colors:**
- \`text-pgIcon-0\` - White icons
- \`text-pgIcon-200\` - Subtle icons
- \`text-pgIcon-300\` - Secondary icons
- \`text-pgIcon-400\` - Default icons
- \`text-pgIcon-600\` - Primary icons
- \`text-pgIcon-950\` - Maximum contrast icons

**Brand Color Palettes (Each with 50-950 shades):**
- \`pgBlue\` - Primary brand (interactive elements)
- \`pgSapphire\` - Secondary blue (information)
- \`pgGreen\` - Success states
- \`pgRed\` - Error states
- \`pgOrange\` - Warning states
- \`pgGold\` - Accent/highlight
- \`pgPurple\` - Feature states
- \`pgPink\` - Highlighted content
- \`pgTeal\` - Stable/balanced states

**State Color System (Complete Variants):**
Each state has \`dark\`, \`base\`, \`light\`, \`lighter\` variants:
- \`pgStateFaded\` - Disabled, inactive
- \`pgStateInformation\` - Info messages (Sapphire-based)
- \`pgStateWarning\` - Warnings (Orange-based)
- \`pgStateError\` - Errors (Red-based)
- \`pgStateSuccess\` - Success (Green-based)
- \`pgStateAway\` - Away, pending (Gold-based)
- \`pgStateFeature\` - Features (Purple-based)
- \`pgStateVerified\` - Verified (Sapphire-based)
- \`pgStateHighlighted\` - Highlighted (Pink-based)
- \`pgStateStable\` - Stable (Teal-based)

### Comprehensive Shadow System

**Basic Elevation:**
- \`shadow-sm\` - Minimal lift (subtle borders)
- \`shadow-md\` - Medium elevation (cards, buttons)

**Interactive Shadows:**
- \`shadow-buttonsImportantFocus\` - Important button focus states
- \`shadow-inputFieldPop\` - Input field elevation
- \`shadow-inputFieldPopSm\` - Small input elevation
- \`shadow-inputBlueGlowStrong\` - Input focus glow
- \`shadow-toggleSwitch\` - Toggle switch elevation

**Layout Shadows:**
- \`shadow-sideTray\` - Side navigation/drawers
- \`shadow-liveSearchTrays\` - Search dropdowns
- \`shadow-popoverTray\` - Popover containers
- \`shadow-mainDesktopWindow\` - Modal dialogs

**Content Shadows:**
- \`shadow-cardShadowPop\` - Interactive cards
- \`shadow-cardShadowPopStrong\` - Enhanced card elevation
- \`shadow-tooltip\` - Floating tooltips
- \`shadow-tooltipS\` - Small tooltips
- \`shadow-autoComplete\` - Autocomplete dropdowns

**Special Effects:**
- \`shadow-blueGlowStrong\` - Blue emphasis glow
- \`shadow-containerInset\` - Inset container shadow

### Comprehensive Spacing System (8px Grid)

**Micro Spacing (Fine Adjustments):**
- \`space-0\` (0px), \`space-0.5\` (2px), \`space-1\` (4px), \`space-1.5\` (6px)

**Component Spacing (Element Relationships):**
- \`space-2\` (8px), \`space-3\` (12px), \`space-4\` (16px), \`space-5\` (20px), \`space-6\` (24px)

**Section Spacing (Content Divisions):**
- \`space-8\` (32px), \`space-10\` (40px), \`space-12\` (48px), \`space-14\` (56px), \`space-16\` (64px)

**Page Spacing (Major Layouts):**
- \`space-20\` (80px), \`space-24\` (96px), \`space-28\` (112px), \`space-32\` (128px)

**Specialized Container Widths:**
- \`max-w-sheetSm\` (384px) - Small modals
- \`max-w-sheetMd\` (478px) - Medium forms
- \`max-w-sheetLg\` (520px) - Large forms
- \`max-w-sheetSmBounded\` - Responsive small sheets
- \`max-w-sheetMdBounded\` - Responsive medium sheets
- \`max-w-sheetLgBounded\` - Responsive large sheets

## MANDATORY IMPLEMENTATION PATTERNS

### Component Development Pattern
\`\`\`tsx
import { Button, Card, Badge } from '@/perigon/components';
import type { ComponentProps } from '@/types';

interface ExampleComponentProps extends ComponentProps {
  title: string;
  status: 'active' | 'inactive';
}

export function ExampleComponent({ title, status, ...props }: ExampleComponentProps) {
  return (
    <Card className="bg-pgBackground-0 border-pgStroke-200 shadow-cardShadowPop" {...props}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="typography-titleH4 text-pgText-950">{title}</h3>
          <Badge 
            variant={status === 'active' ? 'success' : 'neutral'}
            className="typography-labelSmall"
          >
            {status}
          </Badge>
        </div>
        <p className="typography-paragraphMedium text-pgText-600">
          Component description with proper typography and colors.
        </p>
        <Button 
          variant="primaryFilled" 
          size="md"
          className="typography-labelMedium"
        >
          Primary Action
        </Button>
      </div>
    </Card>
  );
}
\`\`\`

### Form Pattern Example
\`\`\`tsx
export function FormExample() {
  return (
    <form className="max-w-sheetMdBounded mx-auto space-y-6 p-8">
      <div className="space-y-2">
        <h2 className="typography-titleH3 text-pgText-950">Form Title</h2>
        <p className="typography-paragraphMedium text-pgText-600">Form description</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="typography-labelSmall text-pgText-950 block">
            Email Address
          </label>
          <input
            type="email"
            className="typography-paragraphMedium w-full rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-4 py-3 shadow-inputFieldPop focus:shadow-inputBlueGlowStrong"
            placeholder="Enter your email"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 border-t border-pgStroke-200 pt-6">
        <Button variant="neutralGhost" className="typography-labelMedium">
          Cancel
        </Button>
        <Button variant="primaryFilled" className="typography-labelMedium">
          Submit
        </Button>
      </div>
    </form>
  );
}
\`\`\`

## STRICT DESIGN SYSTEM ADHERENCE

### NEVER Use:
- Generic component libraries (Material-UI, Chakra, Ant Design, etc.)
- Custom colors outside the pg* system
- Arbitrary spacing values not in the spacing scale
- Custom typography sizes or weights
- Non-Perigon shadow values
- Custom border or background values

### ALWAYS Use:
- Perigon typography classes for ALL text
- Perigon color classes for ALL colors
- Perigon spacing scale for ALL spacing
- Perigon shadow system for ALL shadows
- Semantic component props and variants
- Proper accessibility attributes
- Theme-adaptive color classes

Generate complete, production-ready solutions that strictly adhere to ALL documented Perigon design system patterns, typography, colors, spacing, and shadows. Every element must use the comprehensive Perigon design tokens.`;
  }

  async generateCode(
    prompt: string,
    context?: string,
    maxResults: number = 12
  ): Promise<GenerateResponse> {
    try {
      const searchQuery = context ? `${prompt} ${context}` : prompt;
      const relevantDocs = await this.searchRelevantDocs(
        searchQuery,
        maxResults
      );

      const systemPrompt = this.buildSystemPrompt(relevantDocs);

      const userPrompt = `
User Request: ${prompt}
${context ? `Additional Context: ${context}` : ''}

Please generate comprehensive, production-ready code that implements this request using the documented Perigon patterns, architecture, and components. 

Provide:
1. Complete, production-ready code (components, hooks, services, types as needed)
2. Clear explanation of the implementation approach and architectural decisions
3. List of Perigon components, patterns, and services used
4. Important notes about styling, functionality, data flow, and integration points
5. Any setup or configuration requirements

Focus on creating complete, well-architected solutions that follow documented best practices.
`;

      console.log(
        '🤖 Calling Anthropic API with model: claude-sonnet-4-20250514'
      );

      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 5000,
        temperature: 0.1,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      console.log('✅ Anthropic API call successful');

      const content = response.content[0];
      if (content?.type !== 'text') {
        throw new Error('Unexpected response type from Anthropic');
      }

      const fullResponse = (content as any).text;

      const codeMatch = fullResponse.match(
        /```(?:tsx?|jsx?|typescript|javascript)?\n([\s\S]*?)```/
      );
      const code = codeMatch ? codeMatch[1].trim() : fullResponse;

      const components = this.extractComponents(relevantDocs);
      const contextUsed = relevantDocs.map(
        (doc) =>
          `${doc.metadata.type}: ${
            doc.metadata.filename || doc.metadata.component || 'Unknown'
          } - ${doc.metadata.section}`
      );

      return {
        code,
        explanation: fullResponse.replace(/```[\s\S]*?```/g, '').trim(),
        components,
        context_used: contextUsed,
      };
    } catch (error) {
      console.error('❌ Error generating code:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw new Error(
        `Failed to generate code: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  private extractComponents(docs: any[]): string[] {
    const components = new Set<string>();
    docs.forEach((doc) => {
      // Extract component names from various metadata fields
      if (doc.metadata.component) {
        components.add(doc.metadata.component);
      }
      if (doc.metadata.filename) {
        components.add(doc.metadata.filename);
      }
      // Extract components mentioned in content for comprehensive tracking
      const componentMatches = doc.content.match(
        /import\s+{[^}]+}\s+from\s+['"]@\/perigon\/components['"]/g
      );
      if (componentMatches) {
        componentMatches.forEach((match: string) => {
          const imports = match.match(/{([^}]+)}/)?.[1];
          if (imports) {
            imports.split(',').forEach((imp: string) => {
              const cleanImport = imp.trim();
              if (cleanImport) components.add(cleanImport);
            });
          }
        });
      }
    });
    return Array.from(components);
  }

  async healthCheck(): Promise<{ status: string; indexStats: any }> {
    try {
      const index = this.pinecone.index(this.indexName);
      const stats = await index.describeIndexStats();

      return {
        status: 'healthy',
        indexStats: stats,
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        status: 'unhealthy',
        indexStats: null,
      };
    }
  }
}

const ragService = new RAGService();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(),
    },
  });
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    });
  }

  try {
    if (pathname === '/health' && request.method === 'GET') {
      const health = await ragService.healthCheck();
      return jsonResponse(health);
    }

    if (pathname === '/api/generate' && request.method === 'POST') {
      const body = (await request.json()) as GenerateRequest;

      if (!body.prompt) {
        return jsonResponse({ error: 'Prompt is required' }, 400);
      }

      const result = await ragService.generateCode(
        body.prompt,
        body.context,
        body.maxResults || 12
      );

      return jsonResponse(result);
    }

    if (pathname === '/api/search' && request.method === 'GET') {
      const query = url.searchParams.get('q');
      const maxResults = parseInt(url.searchParams.get('max') || '5');

      if (!query) {
        return jsonResponse({ error: 'Query parameter "q" is required' }, 400);
      }

      const results = await ragService.searchRelevantDocs(query, maxResults);
      return jsonResponse({ results });
    }

    return jsonResponse({ error: 'Not found' }, 404);
  } catch (error) {
    console.error('Request error:', error);
    return jsonResponse(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      500
    );
  }
}

const port = process.env.PORT || 4000;

const server = Bun.serve({
  port,
  fetch: handleRequest,
});

console.log(`🚀 RAG Server running on http://localhost:${port}`);
console.log(`🔍 Vector search endpoint: http://localhost:${port}/api/search`);
console.log(
  `🤖 Code generation endpoint: http://localhost:${port}/api/generate`
);
console.log(`❤️  Health check: http://localhost:${port}/health`);

export { RAGService };
