# UserFeedbackService

## Purpose

The `UserFeedbackService` manages user feedback submission operations through private API endpoints. This service provides a simple interface for creating user feedback entries, handling the communication with the backend feedback API while maintaining our service architecture patterns of focused, single-responsibility methods.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `create` | `feedback: CreateUserFeedbackDto`, `signal?: AbortSignal` | `Promise<void>` | Creates a new user feedback entry |

## Authentication

This service uses the `PrivateApiServiceWrapper`, which handles:

- **Automatic credential management**: Includes authentication tokens in requests
- **Session handling**: Manages user session state and token refresh
- **Private endpoint access**: Ensures proper authorization for protected feedback endpoints

No manual credential handling is required when using this service.

## Error Handling

Following our service architecture patterns, this service:

- **No internal error handling**: All errors are propagated to the calling layer
- **HttpException pattern**: Non-2xx HTTP responses are automatically converted to `HttpException` instances by the service wrapper
- **Query layer responsibility**: Error handling and user feedback are managed by TanStack Query hooks

Common error scenarios:
- `401 Unauthorized`: Invalid or expired authentication
- `403 Forbidden`: Insufficient permissions for feedback submission
- `422 Unprocessable Entity`: Invalid feedback data format
- `429 Too Many Requests`: Rate limiting exceeded

## Usage Examples

### Basic Feedback Creation

```typescript
import { UserFeedbackService } from '@/lib/services/user-feedback-service';
import { CreateUserFeedbackDto } from '@/lib/dto';

// Create user feedback
const feedbackData: CreateUserFeedbackDto = {
  type: 'bug',
  message: 'Found an issue with the search functionality',
  rating: 3,
  category: 'functionality'
};

await UserFeedbackService.create(feedbackData);
```

### With AbortSignal for Cancellation

```typescript
import { UserFeedbackService } from '@/lib/services/user-feedback-service';

// Create with cancellation support
const controller = new AbortController();

try {
  await UserFeedbackService.create(feedbackData, controller.signal);
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Feedback submission cancelled');
  }
}

// Cancel the request if needed
controller.abort();
```

### Integration with TanStack Query

```typescript
import { useMutation } from '@tanstack/react-query';
import { UserFeedbackService } from '@/lib/services/user-feedback-service';

const useCreateFeedback = () => {
  return useMutation({
    mutationFn: (feedback: CreateUserFeedbackDto) => 
      UserFeedbackService.create(feedback),
    onSuccess: () => {
      // Handle successful feedback submission
      toast.success('Feedback submitted successfully');
    },
    onError: (error: HttpException) => {
      // Handle feedback submission errors
      toast.error(`Failed to submit feedback: ${error.message}`);
    },
  });
};
```

## Related Types

### CreateUserFeedbackDto

```typescript
interface CreateUserFeedbackDto {
  type: 'bug' | 'feature' | 'improvement' | 'general';
  message: string;
  rating?: number;
  category?: string;
  metadata?: Record<string, any>;
  attachments?: string[];
}
```

### HttpException

```typescript
class HttpException extends Error {
  constructor(
    public status: number,
    public message: string,
    public response?: any
  ) {
    super(message);
  }
}
```

## Dependencies

### PrivateApiServiceWrapper

- **Purpose**: Provides authenticated API client with automatic credential management
- **Features**: Token injection, session handling, response transformation
- **Error handling**: Converts HTTP errors to `HttpException` instances

```typescript
import { PrivateApiServiceWrapper } from '@/lib/service-wrappers';
```

### Required DTOs

```typescript
import { CreateUserFeedbackDto } from '@/lib/dto';
```

## Integration

### TanStack Query Integration

This service is designed to work seamlessly with TanStack Query mutation hooks:

```typescript
// Mutation hook for feedback creation
const useCreateFeedbackMutation = () => {
  return useMutation({
    mutationFn: UserFeedbackService.create,
    onSuccess: () => {
      // Invalidate related queries if needed
      queryClient.invalidateQueries({ queryKey: ['user-feedback'] });
    },
  });
};

// Usage in component
const createFeedback = useCreateFeedbackMutation();

const handleSubmit = (feedbackData: CreateUserFeedbackDto) => {
  createFeedback.mutate(feedbackData);
};
```

### Request Cancellation

The service supports AbortSignal for request cancellation, which integrates with TanStack Query's automatic cancellation:

```typescript
const useCreateFeedback = () => {
  return useMutation({
    mutationFn: ({ feedback, signal }: { 
      feedback: CreateUserFeedbackDto; 
      signal?: AbortSignal;
    }) => UserFeedbackService.create(feedback, signal),
  });
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods**: Single `create` method with clear responsibility  
✅ **No error handling**: Errors propagated to query layer  
✅ **No data transformation**: Returns raw API response (`void`)  
✅ **Proper credential management**: Uses `PrivateApiServiceWrapper`  
✅ **HTTP Exception pattern**: Automatic conversion via service wrapper  

### Implementation Guidelines

1. **Keep methods focused**: Each method handles a single operation
2. **Leverage service wrapper**: Let `PrivateApiServiceWrapper` handle authentication
3. **Support cancellation**: Always accept optional `AbortSignal` parameter
4. **Raw responses**: Return unmodified API responses
5. **Query integration**: Design for seamless TanStack Query integration

### Usage Recommendations

- **Always use with query hooks**: Don't call service methods directly in components
- **Handle errors in queries**: Use query error handling, not try/catch blocks
- **Support cancellation**: Pass AbortSignal when request cancellation is needed
- **Type safety**: Use proper TypeScript types for all parameters and returns