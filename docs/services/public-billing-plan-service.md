# Public Billing Plan Service

## Purpose

The Public Billing Plan Service manages retrieval of publicly available billing plans with their associated pricing and permissions data. This service provides unauthenticated access to billing plan information, typically used for displaying pricing tiers and plan features to prospective customers or users browsing available subscription options.

**Managed APIs:**
- `/platform-api/public/plans` - Retrieves all subscribable billing plans

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getSubscriptablePlans` | `signal?: AbortSignal` | `Promise<BillingPlanWithPricingAndPermissions[]>` | Retrieves all publicly available billing plans with pricing and permissions |

## Authentication

**Authentication Type:** Public (No Authentication Required)

This service uses the `PublicPlatformApiServiceWrapper`, which provides unauthenticated access to public endpoints. No credentials or authentication tokens are required to access billing plan information.

## Error Handling

Follows the **HttpException pattern** established by our service architecture:

- **HTTP 4xx/5xx responses**: Automatically thrown as `HttpException` by the service wrapper
- **Network errors**: Propagated as native fetch errors
- **Abort signals**: Handled via `AbortController` for request cancellation
- **No custom error handling**: All error handling is delegated to the query layer

## Usage Examples

### Basic Usage with TanStack Query

```tsx
import { useQuery } from '@tanstack/react-query';
import { PublicBillingPlanServiceBuilder } from '@/lib/services/public-billing-plan-service';

// Initialize service
const billingPlanService = PublicBillingPlanServiceBuilder();

// Fetch available plans
function useBillingPlans() {
  return useQuery({
    queryKey: ['billing-plans', 'public'],
    queryFn: ({ signal }) => billingPlanService.getSubscriptablePlans(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Component Integration

```tsx
import { useBillingPlans } from '@/hooks/queries/billing-plans';

function PricingPage() {
  const { data: plans, isLoading, error } = useBillingPlans();

  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans</div>;

  return (
    <div className="pricing-grid">
      {plans?.map(plan => (
        <PricingCard 
          key={plan.id}
          plan={plan}
          pricing={plan.pricing}
          permissions={plan.permissions}
        />
      ))}
    </div>
  );
}
```

### Manual Service Usage

```tsx
import { PublicBillingPlanServiceBuilder } from '@/lib/services/public-billing-plan-service';

async function loadPricingData() {
  const service = PublicBillingPlanServiceBuilder();
  
  try {
    const plans = await service.getSubscriptablePlans();
    console.log('Available plans:', plans);
    return plans;
  } catch (error) {
    console.error('Failed to load plans:', error);
    throw error;
  }
}
```

## Related Types

### Core Response Types

```typescript
// Main response type
interface BillingPlanWithPricingAndPermissions {
  id: string;
  name: string;
  description: string;
  pricing: PricingInfo;
  permissions: PlanPermissions;
  features: PlanFeature[];
  isActive: boolean;
  displayOrder: number;
}

// Pricing information
interface PricingInfo {
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'both';
  trialDays?: number;
}

// Plan permissions and limits
interface PlanPermissions {
  maxUsers: number;
  maxProjects: number;
  storageLimit: number;
  apiCallsLimit: number;
  features: string[];
}

// Individual plan features
interface PlanFeature {
  name: string;
  description: string;
  included: boolean;
  limit?: number;
}
```

## Dependencies

### Service Wrappers
- **`PublicPlatformApiServiceWrapper`**: Provides unauthenticated HTTP client with standardized error handling and response processing

### External Dependencies
- **Fetch API**: Native browser fetch for HTTP requests
- **AbortController**: For request cancellation support

## Integration

### TanStack Query Integration

The service is designed for seamless integration with TanStack Query:

```typescript
// Query key pattern
const queryKey = ['billing-plans', 'public'];

// Query function integration
const queryFn = ({ signal }: QueryFunctionContext) => 
  billingPlanService.getSubscriptablePlans(signal);
```

### Recommended Query Configuration

```typescript
{
  queryKey: ['billing-plans', 'public'],
  queryFn: ({ signal }) => service.getSubscriptablePlans(signal),
  staleTime: 5 * 60 * 1000,      // 5 minutes - plans change infrequently
  cacheTime: 30 * 60 * 1000,     // 30 minutes
  retry: 3,                       // Retry failed requests
  refetchOnWindowFocus: false,    // Don't refetch on window focus
}
```

## Best Practices

### ✅ Architecture Compliance

- **Single responsibility**: Focused solely on public billing plan retrieval
- **No error handling**: Delegates all error handling to query hooks
- **Raw data return**: Returns unmodified API responses
- **Proper wrapper usage**: Uses `PublicPlatformApiServiceWrapper` for public endpoints
- **Signal support**: Implements `AbortSignal` for request cancellation

### ✅ Usage Guidelines

```typescript
// ✅ Correct: Use with query hooks
const { data } = useQuery({
  queryKey: ['billing-plans'],
  queryFn: ({ signal }) => service.getSubscriptablePlans(signal)
});

// ✅ Correct: Handle errors in query layer
const { data, error, isError } = useBillingPlans();
if (isError) handleError(error);

// ❌ Avoid: Direct error handling in service calls
try {
  const plans = await service.getSubscriptablePlans();
} catch (error) {
  // Error handling should be in query hooks
}
```

### ✅ Performance Considerations

- **Appropriate caching**: Public billing plans change infrequently, use longer stale times
- **Request deduplication**: TanStack Query automatically deduplicates identical requests
- **Abort signal usage**: Always pass abort signals for cancellation support