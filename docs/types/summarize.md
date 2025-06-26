# Summarize Types Documentation

## Purpose

The `summarize.ts` module defines core TypeScript interfaces for the application's content summarization feature. These types represent the contract between the client and summarization service, handling both the configuration of summarization requests and the structured response containing summarized search results.

## Type Definition

```typescript
export interface SummarizeSearchResult<T> {
  status: number;
  numResults: number;
  summary: string;
  results: T[];
}

export interface SummarizeDto {
  method: string;
  prompt: string;
  summarizeFields: string[];
  maxArticleCount: number;
  model: string;
  temperature?: string | number;
}
```

## Properties

### SummarizeSearchResult<T>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `number` | ✅ | HTTP status code or operation status indicator |
| `numResults` | `number` | ✅ | Total count of results returned in the response |
| `summary` | `string` | ✅ | AI-generated summary of the search results |
| `results` | `T[]` | ✅ | Array of typed result objects (generic type T) |

### SummarizeDto

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `method` | `string` | ✅ | Summarization method/algorithm to use |
| `prompt` | `string` | ✅ | User-provided prompt for summarization context |
| `summarizeFields` | `string[]` | ✅ | Array of field names to include in summarization |
| `maxArticleCount` | `number` | ✅ | Maximum number of articles to process |
| `model` | `string` | ✅ | AI model identifier for summarization |
| `temperature` | `string \| number` | ❌ | Model creativity parameter (0-1 range) |

## Usage Examples

### Basic Implementation

```typescript
import { SummarizeSearchResult, SummarizeDto } from '@/lib/types/summarize';

// Define domain-specific result type
interface Article {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  author: string;
}

// Type-safe response handling
const handleSummarizeResponse = (
  response: SummarizeSearchResult<Article>
): void => {
  if (response.status === 200) {
    console.log(`Found ${response.numResults} articles`);
    console.log(`Summary: ${response.summary}`);
    
    response.results.forEach(article => {
      console.log(`${article.title} by ${article.author}`);
    });
  }
};
```

### Service Integration

```typescript
class SummarizationService {
  async summarizeContent(
    config: SummarizeDto
  ): Promise<SummarizeSearchResult<Article>> {
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    
    return response.json() as Promise<SummarizeSearchResult<Article>>;
  }
}

// Usage
const service = new SummarizationService();
const config: SummarizeDto = {
  method: 'extractive',
  prompt: 'Summarize recent developments in AI technology',
  summarizeFields: ['title', 'content', 'abstract'],
  maxArticleCount: 50,
  model: 'gpt-4',
  temperature: 0.7
};

const results = await service.summarizeContent(config);
```

### React Component Integration

```typescript
import { useState, useCallback } from 'react';
import { SummarizeSearchResult, SummarizeDto } from '@/lib/types/summarize';

interface SummarizeComponentProps {
  initialConfig?: Partial<SummarizeDto>;
}

const SummarizeComponent: React.FC<SummarizeComponentProps> = ({
  initialConfig
}) => {
  const [results, setResults] = useState<SummarizeSearchResult<Article> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = useCallback(async (config: SummarizeDto) => {
    setLoading(true);
    try {
      const response = await summarizationService.summarizeContent(config);
      setResults(response);
    } catch (error) {
      console.error('Summarization failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {results && (
        <div>
          <h3>Summary ({results.numResults} results)</h3>
          <p>{results.summary}</p>
          <ul>
            {results.results.map(article => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

```typescript
// 1. Domain Objects (Article, Document, etc.)
interface Article {
  id: string;
  title: string;
  content: string;
}

// 2. Response Types (built from domain objects)
interface SummarizeSearchResult<T> {
  status: number;
  numResults: number;
  summary: string;
  results: T[]; // Generic allows any domain object
}

// 3. Request Types (configuration and DTOs)
interface SummarizeDto {
  method: string;
  prompt: string;
  // ... other request parameters
}
```

## Related Types

### Extending Base Types

```typescript
// Specialized response types
interface ArticleSummaryResult extends SummarizeSearchResult<Article> {
  categories: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
}

// Configuration variants
interface AdvancedSummarizeDto extends SummarizeDto {
  filters: Record<string, unknown>;
  sortBy: 'relevance' | 'date' | 'popularity';
}

// Utility types for partial configurations
type SummarizeConfigUpdate = Partial<Pick<SummarizeDto, 'temperature' | 'maxArticleCount'>>;
```

## Integration Points

### Services
- `SummarizationService` - Core service consuming `SummarizeDto`
- `SearchService` - Returns `SummarizeSearchResult<T>` responses
- `CacheService` - Caches summarization results by config hash

### Components
- `SummarizeForm` - Form handling `SummarizeDto` input validation
- `ResultsList` - Displays `SummarizeSearchResult<T>` data
- `SummaryCard` - Shows summary text and metadata

### API Routes
- `POST /api/summarize` - Accepts `SummarizeDto`, returns `SummarizeSearchResult<T>`
- `GET /api/summarize/history` - Returns historical summarization results

## Validation

### Zod Schema Implementation

```typescript
import { z } from 'zod';

const SummarizeDtoSchema = z.object({
  method: z.string().min(1, 'Method is required'),
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  summarizeFields: z.array(z.string()).min(1, 'At least one field required'),
  maxArticleCount: z.number().int().min(1).max(1000),
  model: z.string().min(1, 'Model is required'),
  temperature: z.union([z.string(), z.number()]).optional()
});

const SummarizeSearchResultSchema = <T>(resultSchema: z.ZodSchema<T>) =>
  z.object({
    status: z.number().int().min(100).max(599),
    numResults: z.number().int().min(0),
    summary: z.string().min(1),
    results: z.array(resultSchema)
  });

// Usage with validation
const validateSummarizeConfig = (data: unknown): SummarizeDto => {
  return SummarizeDtoSchema.parse(data);
};
```

## Best Practices

### 1. Strict Typing Compliance
✅ **Good**: Uses strict interfaces without `any` types
```typescript
interface SummarizeDto {
  temperature?: string | number; // Union type for flexibility
}
```

❌ **Avoid**: Loose typing
```typescript
interface SummarizeDto {
  temperature?: any; // Too permissive
}
```

### 2. Generic Design Patterns
✅ **Good**: Generic response type supports any domain object
```typescript
interface SummarizeSearchResult<T> {
  results: T[]; // Type-safe, reusable
}
```

### 3. Interface Composition
```typescript
// Compose types for specific use cases
interface SummarizeArticlesRequest {
  config: SummarizeDto;
  filters: ArticleFilters;
}

type ArticleSummaryResponse = SummarizeSearchResult<Article>;
```

### 4. Optional Property Patterns
```typescript
// Use utility types for variations
type RequiredSummarizeDto = Required<SummarizeDto>;
type SummarizeConfigPartial = Partial<Pick<SummarizeDto, 'temperature' | 'model'>>;
```

### 5. Type Guards
```typescript
const isSummarizeResult = <T>(
  obj: unknown
): obj is SummarizeSearchResult<T> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    'summary' in obj &&
    'results' in obj &&
    Array.isArray((obj as any).results)
  );
};
```

This type system provides a robust, type-safe foundation for the summarization feature while maintaining flexibility through generics and following our established architectural patterns.