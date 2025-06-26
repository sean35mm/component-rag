# Public Billing Plans Query Hooks

## Purpose

The `public-billing-plans` query hooks provide a simplified interface for fetching publicly available billing plans and subscription options without requiring full authentication. These hooks are designed for public-facing components like pricing pages, subscription forms, and plan comparison interfaces where users need to view available billing plans before signing up or upgrading.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `usePublicSubscriptablePlans` | Query | Fetches all publicly available billing plans that users can subscribe to |

## Query Hooks

### usePublicSubscriptablePlans

Fetches all billing plans that are available for public subscription, including their pricing details and permission configurations.

**Signature:**
```tsx
function usePublicSubscriptablePlans<T = BillingPlanWithPricingAndPermissions[]>(
  options?: UseQueryOptions<BillingPlanWithPricingAndPermissions[], T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `options` - Standard TanStack Query options with selector support

**Returns:**
- Array of `BillingPlanWithPricingAndPermissions` objects containing plan details, pricing tiers, and associated permissions

**Key Features:**
- Automatically handles public vs authenticated contexts
- Uses optional token for potential enhanced data when available
- Supports custom selectors for data transformation
- Enabled only in public contexts

## Query Keys

The query keys are managed using `@lukemorales/query-key-factory` pattern:

```tsx
// Generated query key structure
queryKeys.publicBillingPlans.getSubscriptablePlans(token)
```

**Key Structure:**
- `publicBillingPlans` - Scope for all public billing plan queries
- `getSubscriptablePlans` - Specific operation with token parameter
- Token parameter allows for different cache entries based on authentication state

## Usage Examples

### Basic Plan Fetching

```tsx
import { usePublicSubscriptablePlans } from '@/lib/query-hooks/public-billing-plans';

function PricingPage() {
  const { data: plans, isLoading, error } = usePublicSubscriptablePlans();

  if (isLoading) return <div>Loading plans...</div>;
  if (error) return <div>Failed to load plans</div>;

  return (
    <div className="pricing-grid">
      {plans?.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
```

### With Custom Loading States

```tsx
function SubscriptionPlans() {
  const { 
    data: plans, 
    isLoading, 
    isFetching,
    error 
  } = usePublicSubscriptablePlans({
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isFetching && <LoadingIndicator />}
      <PlanGrid plans={plans} />
    </div>
  );
}
```

### Conditional Rendering Based on Plan Availability

```tsx
function ConditionalPricing() {
  const { data: plans, isSuccess } = usePublicSubscriptablePlans();

  const hasPremiumPlans = plans?.some(plan => plan.tier === 'premium');

  return (
    <div>
      {isSuccess && hasPremiumPlans && (
        <PremiumFeaturesSection />
      )}
      <StandardPlansGrid plans={plans} />
    </div>
  );
}
```

## Selector Support

### Filtering Plans by Type

```tsx
function useBasicPlans() {
  return usePublicSubscriptablePlans({
    select: (plans) => plans.filter(plan => plan.type === 'basic'),
  });
}

function BasicPlansSection() {
  const { data: basicPlans } = useBasicPlans();
  
  return <PlansGrid plans={basicPlans} />;
}
```

### Extracting Pricing Information Only

```tsx
function usePlanPricing() {
  return usePublicSubscriptablePlans({
    select: (plans) => plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      pricing: plan.pricing,
      currency: plan.currency
    })),
  });
}

function PricingComparison() {
  const { data: pricing } = usePlanPricing();
  
  return <PriceComparisonTable pricing={pricing} />;
}
```

### Sorting Plans by Price

```tsx
function useSortedPlansByPrice() {
  return usePublicSubscriptablePlans({
    select: (plans) => [...plans].sort((a, b) => 
      (a.pricing?.monthly || 0) - (b.pricing?.monthly || 0)
    ),
  });
}
```

## Caching Strategy

### Cache Configuration

- **Stale Time**: Plans are considered fresh for a reasonable duration since they change infrequently
- **Cache Time**: Data persists in cache for background refetching
- **Background Refetch**: Automatic updates ensure users see current pricing

### Cache Key Strategy

```tsx
// Different cache entries based on token presence
// Anonymous users: queryKeys.publicBillingPlans.getSubscriptablePlans('')
// Authenticated users: queryKeys.publicBillingPlans.getSubscriptablePlans(userToken)
```

### Cache Invalidation

Since this is read-only public data, invalidation typically happens:
- On window focus (if enabled)
- At specified intervals
- When authentication state changes (different tokens)

## Error Handling

### Automatic Error Management

```tsx
function PricingPageWithErrorBoundary() {
  const { data: plans, error, isError } = usePublicSubscriptablePlans();

  if (isError) {
    // TanStack Query provides the error object
    console.error('Failed to fetch plans:', error);
    return <ErrorFallback error={error} />;
  }

  return <PlansList plans={plans} />;
}
```

### Custom Error Handling

```tsx
function PricingWithCustomError() {
  const { data: plans, error } = usePublicSubscriptablePlans({
    retry: (failureCount, error) => {
      // Custom retry logic for specific error types
      if (error.status === 404) return false;
      return failureCount < 2;
    },
    onError: (error) => {
      // Custom error reporting
      analytics.track('billing_plans_fetch_failed', {
        error: error.message,
        context: 'public_pricing_page'
      });
    }
  });

  return <PlansDisplay plans={plans} />;
}
```

## Related Services

### PublicBillingPlanServiceBuilder

The hook integrates with the `PublicBillingPlanServiceBuilder` service:

```tsx
// Service integration
PublicBillingPlanServiceBuilder(token?.token || '').getSubscriptablePlans(signal)
```

**Service Responsibilities:**
- HTTP request management
- Response transformation
- Error throwing (HttpException)
- Signal handling for request cancellation

### Access Token Integration

```tsx
// Utilizes useAccessToken context
const { token, isPublic } = useAccessToken();
```

**Context Integration:**
- `token`: Optional authentication token for enhanced data
- `isPublic`: Boolean flag determining hook enablement

## Best Practices

### Conditional Enablement

```tsx
// ✅ Good: Respects public context
const { data } = usePublicSubscriptablePlans();

// ❌ Avoid: Forcing enabled state inappropriately
const { data } = usePublicSubscriptablePlans({ enabled: true });
```

### Selector Optimization

```tsx
// ✅ Good: Memoized selector
const selectPlanNames = useCallback(
  (plans: BillingPlanWithPricingAndPermissions[]) => 
    plans.map(p => p.name),
  []
);

const { data: planNames } = usePublicSubscriptablePlans({
  select: selectPlanNames
});

// ❌ Avoid: Inline selector causing re-renders
const { data: planNames } = usePublicSubscriptablePlans({
  select: (plans) => plans.map(p => p.name) // Creates new function each render
});
```

### Error Boundary Integration

```tsx
// ✅ Good: Proper error boundary usage
function PricingPage() {
  return (
    <ErrorBoundary fallback={<PricingErrorFallback />}>
      <PricingContent />
    </ErrorBoundary>
  );
}

function PricingContent() {
  const { data: plans } = usePublicSubscriptablePlans();
  return <PlansGrid plans={plans} />;
}
```

### Loading State Management

```tsx
// ✅ Good: Comprehensive loading states
function PricingDisplay() {
  const { data: plans, isLoading, isError, error } = usePublicSubscriptablePlans();

  if (isLoading) return <PricingPageSkeleton />;
  if (isError) return <ErrorMessage error={error} />;
  if (!plans?.length) return <NoPlansAvailable />;

  return <PlansGrid plans={plans} />;
}
```