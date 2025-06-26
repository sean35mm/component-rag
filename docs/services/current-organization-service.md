# CurrentOrganizationService

## Purpose

The `CurrentOrganizationService` provides comprehensive management for the currently authenticated user's organization, including organization details, billing operations, subscription management, API usage analytics, and trial operations. This service acts as the primary interface for all organization-specific operations within the current user's context.

**Key Responsibilities:**
- Organization profile management and updates
- Billing and payment method operations
- Subscription lifecycle management (create, update, delete)
- Trial management for billing plans
- API usage analytics and request logging
- Payment intent and setup operations
- Fastn integration token management

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getFastnAccessToken` | `signal?: AbortSignal` | `Promise<string>` | Retrieves Fastn authentication token |
| `getCurrentOrganization` | `signal?: AbortSignal` | `Promise<OrganizationMember \| null>` | Gets current organization with member details |
| `getQueries` | `params: GetCurrentOrganizationQueriesParams, signal?: AbortSignal` | `Promise<OrganizationQueries>` | Retrieves organization query statistics |
| `getApiLimits` | `signal?: AbortSignal` | `Promise<OrganizationApiLimits>` | Gets API rate limits and quotas |
| `getPaymentMethod` | `signal?: AbortSignal` | `Promise<OrganizationPaymentMethod \| null>` | Retrieves current payment method |
| `getSubscriptablePlans` | `signal?: AbortSignal` | `Promise<BillingPlanWithPricingAndPermissions[]>` | Gets available billing plans |
| `getUserTransactions` | `params?: GetUserTransactionsParams, signal?: AbortSignal` | `Promise<OrganizationBilling>` | Retrieves billing transaction history |
| `setupIntent` | `signal?: AbortSignal` | `Promise<OrganizationIntent>` | Creates payment setup intent |
| `updateCurrentOrganization` | `dto: UpdateCurrentOrganizationDto, signal?: AbortSignal` | `Promise<Organization>` | Updates organization details |
| `updatePaymentMethod` | `dto: UpdateOrganizationPaymentMethodDto, signal?: AbortSignal` | `Promise<OrganizationPaymentMethod \| null>` | Updates payment method |
| `updateSubscription` | `dto: UpdateOrganizationSubscriptionDto, signal?: AbortSignal` | `Promise<UpdateSubscriptionResult>` | Updates subscription plan |
| `deleteSubscription` | `dto: DeleteOrganizationSubscriptionDto, signal?: AbortSignal` | `Promise<Organization>` | Cancels subscription |
| `getSubscriptionIntents` | `signal?: AbortSignal` | `Promise<SubscriptionSetup \| null>` | Gets subscription setup intents |
| `getUpcomingInvoice` | `dto: UpcomingInvoiceDto, signal?: AbortSignal` | `Promise<UpcomingInvoiceData>` | Previews upcoming invoice |
| `getTrials` | `signal?: AbortSignal` | `Promise<OrganizationTrial[]>` | Lists active trials |
| `startTrial` | `billingPriceId: number, signal?: AbortSignal` | `Promise<OrganizationTrial>` | Starts new trial |
| `stopTrial` | `id: number, signal?: AbortSignal` | `Promise<OrganizationTrial>` | Terminates trial |
| `getRequestLogs` | `params: GetRequestLogsParams, signal?: AbortSignal` | `Promise<SliceResult<OrganizationRequestLog>>` | Gets paginated request logs |
| `getRequestLog` | `params: GetRequestLogParams, signal?: AbortSignal` | `Promise<OrganizationRequestLog>` | Gets specific request log |
| `getRequestStats` | `params: GetRequestStatsParams, signal?: AbortSignal` | `Promise<OrganizationRequestStats>` | Gets request statistics |
| `getRequestStatsByApiKey` | `params: GetRequestStatsByApiKeyParams, signal?: AbortSignal` | `Promise<OrganizationRequestCountByApiKey[]>` | Gets statistics by API key |

## Authentication

This service uses the `PrivateApiServiceWrapper` which automatically handles:
- **JWT Bearer Token**: Attached to all requests via Authorization header
- **Automatic Token Refresh**: Handles token expiration and renewal
- **Credential Storage**: Manages secure token storage and retrieval

All methods require valid user authentication. Unauthenticated requests will result in 401 HTTP exceptions.

## Error Handling

Following our service architecture, this service **does not handle errors internally**. All HTTP errors are thrown as `HttpException` instances and should be handled by:
- TanStack Query hooks at the query layer
- Component-level error boundaries
- Global error handlers

**Error Scenarios:**
- `401 Unauthorized`: Invalid or expired authentication
- `403 Forbidden`: Insufficient organization permissions
- `404 Not Found`: Organization or resource not found
- `400 Bad Request`: Invalid request parameters or DTO validation failures
- `429 Too Many Requests`: Rate limit exceeded

## Usage Examples

### Basic Organization Operations

```typescript
import { CurrentOrganizationService } from '@/lib/services/current-organization-service';

// Get current organization
const organization = await CurrentOrganizationService.getCurrentOrganization();

// Update organization details
const updatedOrg = await CurrentOrganizationService.updateCurrentOrganization({
  name: 'New Organization Name',
  description: 'Updated description'
});

// Get API limits
const limits = await CurrentOrganizationService.getApiLimits();
```

### Subscription Management

```typescript
// Get available plans
const plans = await CurrentOrganizationService.getSubscriptablePlans();

// Update subscription
const result = await CurrentOrganizationService.updateSubscription({
  billingPriceId: 123,
  paymentMethodId: 'pm_1234567890'
});

// Preview upcoming invoice
const invoice = await CurrentOrganizationService.getUpcomingInvoice({
  billingPriceId: 123
});

// Cancel subscription
const canceledOrg = await CurrentOrganizationService.deleteSubscription({
  reason: 'no-longer-needed'
});
```

### Trial Management

```typescript
// Start a trial
const trial = await CurrentOrganizationService.startTrial(456);

// Get all trials
const trials = await CurrentOrganizationService.getTrials();

// Stop a trial
const stoppedTrial = await CurrentOrganizationService.stopTrial(trial.id);
```

### Analytics and Monitoring

```typescript
// Get request statistics
const stats = await CurrentOrganizationService.getRequestStats({
  periodDays: 30
});

// Get request logs with pagination
const logs = await CurrentOrganizationService.getRequestLogs({
  page: 1,
  size: 20,
  status: 200,
  sort: 'timestamp',
  order: 'desc'
});

// Get API key statistics
const keyStats = await CurrentOrganizationService.getRequestStatsByApiKey({
  from: '2024-01-01',
  to: '2024-01-31'
});
```

### Payment Operations

```typescript
// Get current payment method
const paymentMethod = await CurrentOrganizationService.getPaymentMethod();

// Update payment method
const updatedPayment = await CurrentOrganizationService.updatePaymentMethod({
  paymentMethodId: 'pm_new_payment_method'
});

// Create setup intent for payment
const intent = await CurrentOrganizationService.setupIntent();
```

## Related Types

### Request Parameters

```typescript
interface GetCurrentOrganizationQueriesParams {
  periodDays?: number;
}

interface GetUserTransactionsParams {
  numTransactions?: number;
}

interface GetRequestLogsParams extends PaginationSort<OrganizationRequestLog> {
  status?: number;
  page?: number;
  size?: number;
}

interface GetRequestLogParams {
  id: number;
}

interface GetRequestStatsParams {
  periodDays?: number;
}

interface GetRequestStatsByApiKeyParams {
  from: string;
  to: string;
}
```

### Key Response Types

- `OrganizationMember`: Organization details with member information
- `OrganizationQueries`: Query usage statistics
- `OrganizationApiLimits`: API rate limits and quotas
- `OrganizationPaymentMethod`: Payment method details
- `BillingPlanWithPricingAndPermissions`: Available billing plans
- `OrganizationBilling`: Billing and transaction history
- `OrganizationTrial`: Trial information and status
- `OrganizationRequestLog`: Individual request log entry
- `OrganizationRequestStats`: Aggregated request statistics
- `UpdateSubscriptionResult`: Subscription update result

### DTO Types

- `UpdateCurrentOrganizationDto`: Organization update payload
- `UpdateOrganizationPaymentMethodDto`: Payment method update payload
- `UpdateOrganizationSubscriptionDto`: Subscription update payload
- `DeleteOrganizationSubscriptionDto`: Subscription cancellation payload
- `UpcomingInvoiceDto`: Invoice preview request payload

## Dependencies

- **PrivateApiServiceWrapper**: Provides authenticated API client with automatic credential management
- **DTO Types**: Request/response data transfer objects from `@/lib/dto`
- **Type Definitions**: Core type definitions from `@/lib/types`

## Integration

This service integrates seamlessly with TanStack Query hooks:

```typescript
// Query hook example
export const useCurrentOrganization = () => 
  useQuery({
    queryKey: ['organization', 'current'],
    queryFn: ({ signal }) => CurrentOrganizationService.getCurrentOrganization(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Mutation hook example
export const useUpdateOrganization = () =>
  useMutation({
    mutationFn: (dto: UpdateCurrentOrganizationDto) =>
      CurrentOrganizationService.updateCurrentOrganization(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', 'current'] });
    },
  });
```

## Best Practices

### ✅ Adherence to Service Architecture

- **Simple, Focused Methods**: Each method handles a single API operation
- **No Error Handling**: Errors bubble up to query hooks and components
- **No Data Transformation**: Returns raw API responses
- **Proper Authentication**: Uses PrivateApiServiceWrapper for credential management
- **AbortSignal Support**: All methods support request cancellation

### ✅ Recommended Usage

- Use with TanStack Query for caching and error handling
- Leverage AbortSignal for request cancellation
- Handle errors at the component level
- Cache organization data appropriately
- Use mutation hooks for state updates

### ❌ Anti-Patterns

- Don't handle errors within the service
- Don't transform response data
- Don't cache data within the service
- Don't make multiple API calls within a single method
- Don't add business logic to service methods

This service follows our established patterns for clean separation of concerns, proper authentication handling, and seamless integration with the query layer.