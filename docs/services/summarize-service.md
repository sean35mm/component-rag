# Summarize Service Documentation

## Purpose

The Summarize Service manages AI-powered content summarization operations through the platform API. It provides comprehensive text summarization capabilities for articles and search results, utilizing configurable AI models to generate coherent, contextual summaries. The service is designed to create vivid, insightful syntheses of search results in a natural, conversational style.

## Architecture

This service follows our standard service architecture with multiple deployment contexts:

- **SsrSummarizeService**: Server-side rendering context
- **SummarizeService**: Private API operations with authentication
- **PublicSummarizeServiceBuilder**: Public platform API operations

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getSummarize` | `params: AllEndpointParams`, `signal?: AbortSignal` | `Promise<SummarizeSearchResult<T>>` | Generates AI-powered summaries for articles/search results |
| `getSummarizeHelper` | `api: typeof Fetch`, `prefix: string`, `dto?: SummarizeDto` | `Function` | Factory function for creating summarize operations |

## Configuration

The service includes a comprehensive default configuration:

```typescript
const config: SummarizeDto = {
  method: 'ARTICLES',
  prompt: '...', // Detailed AI prompt for summary generation
  summarizeFields: ['SUMMARY'],
  maxArticleCount: 50,
  model: env.NEXT_PUBLIC_SUMMARIZE_MODEL || 'gpt-4o',
  temperature: env.NEXT_PUBLIC_SUMMARIZE_TEMPERATURE || 0.7,
}
```

## Authentication

- **SummarizeService**: Requires authentication via `PrivateApiServiceWrapper`
- **PublicSummarizeServiceBuilder**: Public access via `PublicPlatformApiServiceWrapper`
- **SsrSummarizeService**: Server-side context via `SsrApiServiceWrapper`

Credentials are automatically managed by the respective service wrappers.

## Error Handling

Following our service architecture patterns:

- **No internal error handling**: Services return raw API responses
- **HttpException pattern**: Non-2xx responses throw HttpException
- **Error management**: Handled by TanStack Query hooks in the query layer
- **Abort support**: All methods support AbortSignal for request cancellation

## Usage Examples

### Basic Summarization

```typescript
import { SummarizeService } from '@/lib/services/summarize-service';

// Private API usage
const summaryResult = await SummarizeService.getSummarize({
  query: 'technology trends',
  limit: 25
});
```

### Public API Usage

```typescript
import { PublicSummarizeServiceBuilder } from '@/lib/services/summarize-service';

const publicService = PublicSummarizeServiceBuilder('public-key');
const summaryResult = await publicService.getSummarize({
  query: 'market analysis',
  limit: 50
});
```

### Server-Side Rendering

```typescript
import { SsrSummarizeService } from '@/lib/services/summarize-service';

const summaryResult = await SsrSummarizeService.getSummarize({
  query: 'news events',
  limit: 30
});
```

### With Abort Signal

```typescript
const controller = new AbortController();

const summaryResult = await SummarizeService.getSummarize(
  { query: 'recent developments' },
  controller.signal
);

// Cancel request if needed
controller.abort();
```

## Related Types

### Core Types

```typescript
interface SummarizeDto {
  method: string;
  prompt: string;
  summarizeFields: string[];
  maxArticleCount: number;
  model: string;
  temperature: number;
}

interface SummarizeSearchResult<T extends Article> {
  summary: string;
  articles: T[];
  metadata: {
    totalCount: number;
    processedCount: number;
    model: string;
  };
}

interface AllEndpointParams {
  query?: string;
  limit?: number;
  offset?: number;
  // Additional search parameters
}

interface Article {
  id: string;
  title: string;
  content: string;
  summary?: string;
  publishedAt: string;
  // Additional article fields
}
```

## Dependencies

### Service Wrappers
- `PrivateApiServiceWrapper`: Private API operations with authentication
- `PublicPlatformApiServiceWrapper`: Public platform API operations
- `SsrApiServiceWrapper`: Server-side rendering operations

### Utilities
- `Fetch`: HTTP client utility for API requests
- Environment variables for AI model configuration

### Types
- `AllEndpointParams`: Standard endpoint parameters
- `Article`: Article entity interface
- `SummarizeDto`: Summarization configuration
- `SummarizeSearchResult`: Summary response type

## Integration with TanStack Query

### Query Hook Integration

```typescript
// In your query hooks file
export function useSummarizeQuery(params: AllEndpointParams) {
  return useQuery({
    queryKey: ['summarize', params],
    queryFn: ({ signal }) => SummarizeService.getSummarize(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSummarizeMutation() {
  return useMutation({
    mutationFn: (params: AllEndpointParams) => 
      SummarizeService.getSummarize(params),
  });
}
```

### Component Usage

```typescript
function SummaryComponent({ searchQuery }: { searchQuery: string }) {
  const { data, isLoading, error } = useSummarizeQuery({
    query: searchQuery,
    limit: 25
  });

  if (isLoading) return <div>Generating summary...</div>;
  if (error) return <div>Failed to generate summary</div>;

  return (
    <div>
      <h3>Summary</h3>
      <p>{data?.summary}</p>
      <div>Processed {data?.metadata.processedCount} articles</div>
    </div>
  );
}
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Each method handles a single summarization operation
✅ **No error handling**: Raw API responses returned, errors handled by query layer
✅ **No data transformation**: Returns unmodified API responses
✅ **Proper credential management**: Uses appropriate service wrappers
✅ **HTTP Exception pattern**: Non-2xx responses throw HttpException

### AI Configuration Management

- Use environment variables for model configuration
- Maintain consistent prompt engineering across deployments
- Configure appropriate temperature settings for summary coherence
- Set reasonable article count limits for processing efficiency

### Performance Considerations

- Implement proper caching strategies in query hooks
- Use abort signals for long-running summarization requests
- Consider pagination for large result sets
- Monitor AI model usage and costs

### Error Recovery

```typescript
// In query hooks - implement retry logic
export function useSummarizeQuery(params: AllEndpointParams) {
  return useQuery({
    queryKey: ['summarize', params],
    queryFn: ({ signal }) => SummarizeService.getSummarize(params, signal),
    retry: (failureCount, error) => {
      if (error instanceof HttpException && error.status >= 400) {
        return failureCount < 2; // Retry up to 2 times for client errors
      }
      return failureCount < 3; // Standard retry for other errors
    },
  });
}
```

## Environment Configuration

Required environment variables:

```bash
NEXT_PUBLIC_SUMMARIZE_MODEL=gpt-4o
NEXT_PUBLIC_SUMMARIZE_TEMPERATURE=0.7
```

The service provides sensible defaults but allows customization through environment configuration for different deployment contexts.