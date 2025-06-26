# NLP Service Documentation

## Purpose

The NLP Service provides natural language processing capabilities for converting user queries into structured data and generating human-readable names from complex query objects. It manages two primary NLP operations:

- **Query Conversion**: Transforms natural language queries into structured `ComplexAllEndpointBody` format
- **Name Generation**: Creates descriptive names from complex query parameters

The service provides both private and public API variants to support different authentication contexts within the platform.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `convertNlpQuery` | `dto: NlpQueryDto`, `signal?: AbortSignal` | `Promise<ComplexAllEndpointBody>` | Converts natural language query to structured format |
| `generateNameFromQuery` | `dto: Partial<ComplexAllEndpointQuery>`, `signal?: AbortSignal` | `Promise<string>` | Generates descriptive name from query parameters |

### NlpService (Private API)
- Uses `/ui/nlpQuery` and `/ui/nameFromQuery` endpoints
- Requires private API authentication

### PublicNlpServiceBuilder (Public API)
- Uses `/platform-api/public/nlpQuery` and `/platform-api/public/nameFromQuery` endpoints  
- Designed for public platform API access

## Authentication

### Private API Service
- **Wrapper**: `PrivateApiServiceWrapper`
- **Requirements**: Private API credentials and authentication
- **Context**: Internal application usage with full authentication

### Public API Service  
- **Wrapper**: `PublicPlatformApiServiceWrapper`
- **Requirements**: Public platform API access tokens
- **Context**: External or public-facing integrations

## Error Handling

The service follows our **HttpException pattern**:

- **No internal error handling** - Raw API responses are returned
- **HTTP exceptions** thrown automatically by service wrappers for non-2xx responses
- **Error management** handled by TanStack Query hooks in the query layer
- **AbortSignal support** for request cancellation

## Usage Examples

### Private NLP Service Usage

```typescript
import { NlpService } from '@/lib/services/nlp-service';
import { NlpQueryDto } from '@/lib/dto';

// Convert natural language to structured query
const nlpQuery: NlpQueryDto = {
  query: "Show me sales data for last 30 days",
  context: "dashboard"
};

const structuredQuery = await NlpService.convertNlpQuery(nlpQuery);

// Generate name from complex query
const queryParams = {
  filters: { dateRange: "30d", metric: "sales" },
  aggregations: ["sum", "avg"]
};

const generatedName = await NlpService.generateNameFromQuery(queryParams);
```

### Public NLP Service Usage

```typescript
import { PublicNlpServiceBuilder } from '@/lib/services/nlp-service';

// Build public service instance
const publicNlpService = PublicNlpServiceBuilder();

// Use same methods with public API endpoints
const result = await publicNlpService.convertNlpQuery({
  query: "Revenue trends by region",
  context: "analytics"
});
```

### With AbortSignal

```typescript
const controller = new AbortController();

try {
  const result = await NlpService.convertNlpQuery(
    { query: "User engagement metrics" },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled');
  }
}

// Cancel request
controller.abort();
```

## Related Types

### Core Types

```typescript
// Input DTO for NLP query conversion
interface NlpQueryDto {
  query: string;
  context?: string;
  // Additional NLP-specific parameters
}

// Output type for converted queries
interface ComplexAllEndpointBody {
  // Structured query representation
  filters?: Record<string, any>;
  aggregations?: string[];
  // Other query structure fields
}

// Input type for name generation
interface ComplexAllEndpointQuery {
  // Query parameters for name generation
  filters?: Record<string, any>;
  sort?: string;
  limit?: number;
  // Additional query fields
}
```

### API Response Format

```typescript
// Expected API response structure
interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}
```

## Dependencies

### Service Wrappers
- **`PrivateApiServiceWrapper`**: Handles private API authentication and request management
- **`PublicPlatformApiServiceWrapper`**: Manages public platform API access and credentials

### External Dependencies
- **`@/lib/dto`**: Data transfer objects for API requests
- **`@/lib/types`**: TypeScript type definitions for complex queries

## Integration

### TanStack Query Integration

```typescript
// Query hook usage
import { useQuery } from '@tanstack/react-query';
import { NlpService } from '@/lib/services/nlp-service';

// NLP query conversion hook
export const useNlpQuery = (dto: NlpQueryDto) => {
  return useQuery({
    queryKey: ['nlp', 'convert', dto.query],
    queryFn: ({ signal }) => NlpService.convertNlpQuery(dto, signal),
    enabled: !!dto.query,
  });
};

// Name generation hook
export const useGenerateName = (queryParams: Partial<ComplexAllEndpointQuery>) => {
  return useQuery({
    queryKey: ['nlp', 'generateName', queryParams],
    queryFn: ({ signal }) => NlpService.generateNameFromQuery(queryParams, signal),
    enabled: Object.keys(queryParams).length > 0,
  });
};
```

### Mutation Integration

```typescript
import { useMutation } from '@tanstack/react-query';

// NLP conversion mutation
export const useNlpConversion = () => {
  return useMutation({
    mutationFn: (dto: NlpQueryDto) => NlpService.convertNlpQuery(dto),
    onSuccess: (data) => {
      // Handle successful conversion
      console.log('Query converted:', data);
    },
  });
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods** - Each method handles one specific NLP operation  
✅ **No error handling** - Errors bubble up to query hooks for proper handling  
✅ **No data transformation** - Returns raw API responses without modification  
✅ **Proper credential management** - Uses appropriate service wrappers for authentication  
✅ **HTTP Exception pattern** - Leverages wrapper exception handling

### Implementation Notes

- **TODO Items**: The service currently uses UI endpoints with plans to migrate to platform-api endpoints once credential support is added
- **AbortSignal Support**: All methods support request cancellation for better UX
- **Type Safety**: Strong TypeScript typing for all parameters and return values
- **Dual API Support**: Provides both private and public API variants for flexibility

### Usage Guidelines

1. **Use private service** for internal application features
2. **Use public service builder** for external integrations or public-facing features  
3. **Always handle AbortSignal** for long-running NLP operations
4. **Leverage query hooks** for proper error handling and caching
5. **Follow DTO patterns** for consistent API request structures