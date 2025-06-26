# TokensService

## Purpose

The `TokensService` manages platform token operations, specifically handling the creation of encrypted authentication tokens. This service interfaces with the platform API to generate tokens and applies cryptographic transformations for security purposes.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `create` | `signal?: AbortSignal` | `Promise<string>` | Creates a new platform token with encryption |

### Method Details

#### `create(signal?: AbortSignal)`
- **Purpose**: Generates a new platform authentication token
- **Parameters**:
  - `signal` (optional): AbortSignal for request cancellation
- **Returns**: Promise resolving to an encrypted token string
- **API Endpoint**: `POST /platform-api/public/token`

## Authentication

This service uses the `DefaultApiServiceWrapper`, which handles:
- Basic API configuration and request setup
- Standard headers and request formatting
- No special authentication requirements for the public token endpoint

## Error Handling

Following our service architecture patterns:
- **No explicit error handling** in service methods
- Errors are thrown as `HttpException` instances for non-2xx responses
- Error handling is delegated to TanStack Query hooks
- Network errors and abort signals are handled by the underlying API wrapper

## Usage Examples

### Basic Token Creation
```typescript
import { TokensService } from '@/lib/services/tokens-service';

// Create a new token
const token = await TokensService.create();
console.log('Generated token:', token);
```

### With Abort Signal
```typescript
import { TokensService } from '@/lib/services/tokens-service';

const controller = new AbortController();

try {
  const token = await TokensService.create(controller.signal);
  // Handle token
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Token creation was cancelled');
  }
}
```

### Integration with TanStack Query
```typescript
import { useMutation } from '@tanstack/react-query';
import { TokensService } from '@/lib/services/tokens-service';

const useCreateToken = () => {
  return useMutation({
    mutationFn: ({ signal }: { signal?: AbortSignal }) => 
      TokensService.create(signal),
    onSuccess: (token) => {
      // Handle successful token creation
      console.log('Token created:', token);
    },
    onError: (error) => {
      // Handle token creation errors
      console.error('Token creation failed:', error);
    },
  });
};
```

## Related Types

### API Response Type
```typescript
interface TokenResponse {
  data: string; // Encrypted token data
}
```

### Service Method Type
```typescript
interface TokensServiceType {
  create(signal?: AbortSignal): Promise<string>;
}
```

## Dependencies

### Service Wrappers
- **`DefaultApiServiceWrapper`**: Provides basic API functionality without authentication
- Handles standard HTTP operations and response formatting

### External Libraries
- **`crypto-js`**: Used for AES encryption/decryption operations
- **`@/env`**: Environment configuration for encryption keys

### Environment Variables
- `NEXT_PUBLIC_OBFUSCATION_KEY`: Key for initial decryption
- `NEXT_PUBLIC_DEOBFUSCATION_KEY`: Key for final encryption

## Integration

### TanStack Query Integration
```typescript
// Mutation hook for token creation
export const useCreateTokenMutation = () => {
  return useMutation({
    mutationFn: TokensService.create,
    mutationKey: ['tokens', 'create'],
  });
};
```

### Query Client Integration
```typescript
import { queryClient } from '@/lib/query-client';

// Programmatic token creation
const createToken = async () => {
  return queryClient.fetchQuery({
    queryKey: ['tokens', 'create'],
    queryFn: () => TokensService.create(),
  });
};
```

## Best Practices

### Architecture Compliance
✅ **Simple, focused methods**: Single `create` method with clear purpose  
✅ **No error handling**: Delegates error handling to query hooks  
❌ **No data transformation**: Service applies encryption transformation (architectural deviation)  
✅ **Proper wrapper usage**: Uses appropriate `DefaultApiServiceWrapper`  
✅ **HTTP Exception pattern**: Inherits exception handling from wrapper  

### Architectural Deviation Note
This service deviates from the "no data transformation" principle by applying AES encryption to the token response. This is likely intentional for security purposes, but represents a departure from the standard pattern where services return raw API responses.

### Usage Guidelines
1. **Always use with TanStack Query**: Don't call service methods directly in components
2. **Handle abort signals**: Pass abort signals for cancellable operations
3. **Secure token storage**: Ensure generated tokens are stored securely
4. **Environment security**: Protect encryption keys in environment variables

### Security Considerations
- Encryption keys are exposed in `NEXT_PUBLIC_*` variables (client-side accessible)
- Consider server-side token encryption for enhanced security
- Implement proper token lifecycle management (expiration, renewal)