# AI Suggestions Service

## Purpose

The AI Suggestions Service manages AI-powered suggestion functionality for the omnibar component. It provides methods to retrieve AI-generated suggestions from the platform API, supporting both private and public API access patterns.

This service handles AI suggestion requests to enhance user experience with intelligent autocomplete and recommendation features in the omnibar interface.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getOmnibarAiSuggestions` | `params: GetOmnibarAiSuggestionsParams`, `signal?: AbortSignal` | `Promise<OmnibarAiSuggestions>` | Retrieves AI suggestions for omnibar input |

### AiSuggestionsService Methods

- **getOmnibarAiSuggestions**: Fetches AI suggestions via private API endpoint

### PublicAiSuggestionsServiceBuilder Methods

- **getOmnibarAiSuggestions**: Fetches AI suggestions via public API endpoint

## Authentication

### Private Service (`AiSuggestionsService`)
- **Wrapper**: `PrivateApiServiceWrapper`
- **Authentication**: Requires authenticated user session
- **Credentials**: Automatically managed by the service wrapper
- **Endpoint**: `/platform-api/suggestions/omnibar`

### Public Service (`PublicAiSuggestionsServiceBuilder`)
- **Wrapper**: `PublicPlatformApiServiceWrapper`
- **Authentication**: No authentication required
- **Credentials**: None required
- **Endpoint**: `/platform-api/public/suggestions/omnibar`

## Error Handling

This service follows our **HttpException pattern**:

- **No internal error handling**: All HTTP errors are thrown as exceptions
- **Non-2xx responses**: Automatically throw `HttpException` via service wrappers
- **Error management**: Handled by TanStack Query hooks in the query layer
- **AbortSignal support**: Request cancellation handled through AbortSignal parameter

## Usage Examples

### Private API Usage

```tsx
import { AiSuggestionsService } from '@/lib/services/ai-suggestions-service';

// Basic usage
const suggestions = await AiSuggestionsService.getOmnibarAiSuggestions({
  query: 'user search term',
  context: 'dashboard',
  limit: 10
});

// With request cancellation
const controller = new AbortController();
const suggestions = await AiSuggestionsService.getOmnibarAiSuggestions(
  {
    query: 'user search term',
    context: 'dashboard',
    limit: 10
  },
  controller.signal
);

// Cancel request if needed
controller.abort();
```

### Public API Usage

```tsx
import { PublicAiSuggestionsServiceBuilder } from '@/lib/services/ai-suggestions-service';

// Initialize public service (typically done in query hooks)
const publicService = PublicAiSuggestionsServiceBuilder(/* api config */);

// Fetch suggestions without authentication
const suggestions = await publicService.getOmnibarAiSuggestions({
  query: 'public search term',
  context: 'public-dashboard',
  limit: 5
});
```

## Related Types

### Request Types

```tsx
interface GetOmnibarAiSuggestionsParams {
  query: string;
  context?: string;
  limit?: number;
  filters?: Record<string, unknown>;
  // Additional parameters as defined in types
}
```

### Response Types

```tsx
interface OmnibarAiSuggestions {
  suggestions: AiSuggestion[];
  metadata?: {
    query: string;
    processingTime: number;
    confidence: number;
  };
  // Additional response fields as defined in types
}

interface AiSuggestion {
  id: string;
  text: string;
  type: string;
  confidence: number;
  metadata?: Record<string, unknown>;
}
```

## Dependencies

### Service Wrappers
- **PrivateApiServiceWrapper**: Handles authenticated API requests
- **PublicPlatformApiServiceWrapper**: Handles public API requests
- **HTTP Configuration**: Automatic request/response handling

### Type Imports
- **GetOmnibarAiSuggestionsParams**: Request parameter interface
- **OmnibarAiSuggestions**: Response data interface

## Integration

### TanStack Query Integration

```tsx
// Query hook usage
import { useQuery } from '@tanstack/react-query';
import { AiSuggestionsService } from '@/lib/services/ai-suggestions-service';

function useOmnibarAiSuggestions(query: string) {
  return useQuery({
    queryKey: ['omnibar-ai-suggestions', query],
    queryFn: ({ signal }) => 
      AiSuggestionsService.getOmnibarAiSuggestions(
        { query, limit: 10 },
        signal
      ),
    enabled: query.length > 2,
  });
}
```

### Mutation Hook Integration

```tsx
// Mutation hook for dynamic suggestions
import { useMutation } from '@tanstack/react-query';

function useOmnibarAiSuggestionsMutation() {
  return useMutation({
    mutationFn: (params: GetOmnibarAiSuggestionsParams) =>
      AiSuggestionsService.getOmnibarAiSuggestions(params),
  });
}
```

## Best Practices

### Service Architecture Compliance

✅ **Simple, focused methods**: Single responsibility for AI suggestion retrieval  
✅ **No error handling**: Errors thrown as HttpException, handled by query layer  
✅ **No data transformation**: Returns raw API responses without modification  
✅ **Proper credential management**: Uses appropriate service wrappers for auth  
✅ **HTTP Exception pattern**: Non-2xx responses automatically throw exceptions  

### Implementation Guidelines

- **Use appropriate service**: Choose private or public service based on authentication needs
- **Leverage AbortSignal**: Always pass through AbortSignal for request cancellation
- **Query layer integration**: Let TanStack Query hooks handle error states and caching
- **Type safety**: Ensure proper typing for request parameters and responses
- **Request optimization**: Use query keys and caching strategies in query hooks

### Performance Considerations

- **Request debouncing**: Implement in query hooks, not service methods
- **Caching strategy**: Configure in TanStack Query, not service layer
- **Request cancellation**: Utilize AbortSignal for better user experience
- **Background refetching**: Manage in query configuration, not service logic