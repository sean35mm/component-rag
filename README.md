# Perigon RAG Backend

A RAG (Retrieval-Augmented Generation) backend server that provides context-aware code generation using the Perigon Design System documentation.

## Features

- **Vector Search**: Uses Pinecone for fast similarity search across Perigon component documentation
- **Code Generation**: Claude Sonnet 4 integration for generating production-ready React components
- **Design System Context**: Automatically injects relevant Perigon component docs and design tokens
- **RESTful API**: Simple HTTP endpoints for search and generation

## Setup

### Prerequisites

- Node.js 18+ or Bun runtime
- Pinecone account and API key
- OpenAI API key (for embeddings)
- Anthropic API key (for code generation)

### Environment Variables

Create a `.env` file in the backend directory:

```bash
# OpenAI API Key for embeddings
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API Key for code generation
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Pinecone API Key for vector database
PINECONE_API_KEY=your_pinecone_api_key_here
```

### Pinecone Setup

1. Create a Pinecone account at [pinecone.io](https://pinecone.io)
2. Create a new index named `perigon-coding-guidelines` with:
   - Dimensions: 1536 (for OpenAI text-embedding-3-small)
   - Metric: cosine
   - Pod type: Starter (free tier)

### Installation

```bash
# Install dependencies
bun install
# or
npm install

# Vectorize the documentation (run once)
bun run vectorize
# or
npm run vectorize

# Start the server
bun run dev
# or
npm run dev
```

## API Endpoints

### POST /api/generate

Generate React code using Perigon Design System components.

**Request:**

```json
{
  "prompt": "Create a login form with email and password fields",
  "context": "Make it responsive and accessible",
  "maxResults": 8
}
```

**Response:**

```json
{
  "code": "// Generated React component code",
  "explanation": "Brief explanation of the implementation",
  "components": ["Button", "Input", "Card"],
  "context_used": ["button - props", "input - usage", "card - examples"]
}
```

### GET /api/search

Search for relevant documentation chunks.

**Query Parameters:**

- `q`: Search query
- `limit`: Maximum results (default: 8)

### GET /health

Health check endpoint.

## Architecture

1. **Document Processing**: Markdown docs are split into chunks and vectorized using OpenAI embeddings
2. **Vector Storage**: Embeddings stored in Pinecone for fast similarity search
3. **Context Retrieval**: User prompts are embedded and matched against stored documentation
4. **Code Generation**: Relevant docs are injected into Claude prompts for context-aware generation

## Development

The server runs on `http://localhost:4000` by default.

Key files:

- `rag-server.ts`: Main server with API endpoints
- `vectorize-docs.ts`: Script to process and vectorize documentation
- `docs/`: Markdown documentation directory
# vibes-backend
