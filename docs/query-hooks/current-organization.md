# Current Organization Query Hooks

## Purpose

The current organization query hooks provide a comprehensive set of TanStack Query hooks for managing the current user's organization data, including organization details, billing information, API usage, request logs, and subscription management. These hooks handle authentication-aware data fetching and mutations for all organization-related operations.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useCurrentOrganization` | Query | Fetches current organization member data |
| `useCurrentOrganizationQueries` | Query | Fetches organization's query configurations |
| `useCurrentOrganizationApiLimits` | Query | Fetches API usage limits and quotas |
| `useCurrentOrganizationTrials` | Query | Fetches available and active trials |
| `useCurrentOrganizationSubscriptablePlans` | Query | Fetches available billing plans |
| `useUserTransactions` | Query | Fetches billing transactions and history |
| `usePaymentMethod` | Query | Fetches current payment method |
| `useSubscriptionIntents` | Query | Fetches subscription setup intents |
| `useUpcomingInvoice` | Query | Fetches upcoming invoice preview |
| `useRequestLogs` | Query | Fetches paginated request logs |
| `useLogsInfinite` | Infinite Query | Fetches infinite scrolling request logs |
| `useRequestLog` | Query | Fetches single request log details |
| `useRequestStats` | Query | Fetches request statistics |
| `useRequestStatsByApiKey` | Query | Fetches request stats grouped by API key |
| `useUpdateCurrentOrganization` | Mutation | Updates organization details |
| `useStartTrial` | Mutation | Starts a new trial |
| `useSetupIntent` | Mutation | Creates payment setup intent |
| `useUpdatePaymentMethod` | Mutation | Updates payment method |
| `useUpdateSubscription` | Mutation | Updates subscription plan |
| `useDeleteSubscription` | Mutation | Cancels subscription |

## Query Hooks

### Basic Organization Data

```typescript
// Get current organization member data
const useCurrentOrganization = <T = OrganizationMember | null>(
  options?: UseQueryOptions<OrganizationMember | null, T>
) => UseQueryResult<T>

// Get organization queries configuration
const useCurrentOrganizationQueries = <T = OrganizationQueries>(
  params?: GetCurrentOrganizationQueriesParams,
  options?: UseQueryOptions<OrganizationQueries, T>
) => UseQueryResult<T>

// Get API limits and quotas
const useCurrentOrganizationApiLimits = <T = OrganizationApiLimits>(
  options?: UseQueryOptions<OrganizationApiLimits, T>
) => UseQueryResult<T>
```

### Billing and Subscription Data

```typescript
// Get available trials
const useCurrentOrganizationTrials = <T = OrganizationTrial[]>(
  options?: UseQueryOptions<OrganizationTrial[], T>
) => UseQueryResult<T>

// Get available billing plans
const useCurrentOrganizationSubscriptablePlans = <T = BillingPlanWithPricingAndPermissions[]>(
  options?: UseQueryOptions<BillingPlanWithPricingAndPermissions[], T>
) => UseQueryResult<T>

// Get billing transactions
const useUserTransactions = <T = OrganizationBilling>(
  params?: GetUserTransactionsParams,
  options?: UseQueryOptions<OrganizationBilling, T>
) => UseQueryResult<T>

// Get payment method
const usePaymentMethod = <T = OrganizationPaymentMethod | null>(
  options?: UseQueryOptions<OrganizationPaymentMethod | null, T>
) => UseQueryResult<T>

// Get subscription intents
const useSubscriptionIntents = <T = SubscriptionSetup | null>(
  options?: UseQueryOptions<SubscriptionSetup | null, T>
) => UseQueryResult<T>

// Get upcoming invoice preview
const useUpcomingInvoice = <T = UpcomingInvoiceData>(
  dto: UpcomingInvoiceDto,
  options?: UseQueryOptions<UpcomingInvoiceData, T>
) => UseQueryResult<T>
```

### Request Logs and Analytics

```typescript
// Get paginated request logs
const useRequestLogs = <T = SliceResult<OrganizationRequestLog>>(
  params: GetRequestLogsParams,
  options?: UseQueryOptions<SliceResult<OrganizationRequestLog>, T>
) => UseQueryResult<T>

// Get infinite scrolling request logs
const useLogsInfinite = <T = SliceResult<OrganizationRequestLog>>(
  params?: Omit<GetRequestLogsParams, 'page'>,
  options?: UseInfiniteQueryOptions<SliceResult<OrganizationRequestLog>, Error, T>
) => UseInfiniteQueryResult<T>

// Get single request log
const useRequestLog = <T = OrganizationRequestLog>(
  params: GetRequestLogParams,
  options?: UseQueryOptions<OrganizationRequestLog, T>
) => UseQueryResult<T>

// Get request statistics
const useRequestStats = <T = OrganizationRequestStats>(
  params: GetRequestStatsParams,
  options?: UseQueryOptions<OrganizationRequestStats, T>
) => UseQueryResult<T>

// Get request stats by API key
const useRequestStatsByApiKey = <T = OrganizationRequestCountByApiKey[]>(
  params: GetRequestStatsByApiKeyParams,
  options?: UseQueryOptions<OrganizationRequestCountByApiKey[], T>
) => UseQueryResult<T>
```

## Mutation Hooks

### Organization Management

```typescript
// Update organization details
const useUpdateCurrentOrganization = (
  options?: UseMutationOptions<Organization, UpdateCurrentOrganizationDto>
) => UseMutationResult<Organization, Error, UpdateCurrentOrganizationDto>

// Start a trial
const useStartTrial = (
  options?: UseMutationOptions<OrganizationTrial, number>
) => UseMutationResult<OrganizationTrial, Error, number>
```

### Payment and Subscription Management

```typescript
// Create payment setup intent
const useSetupIntent = (
  options?: UseMutationOptions<OrganizationIntent, void>
) => UseMutationResult<OrganizationIntent, Error, void>

// Update payment method
const useUpdatePaymentMethod = (
  options?: UseMutationOptions<OrganizationPaymentMethod | null, UpdateOrganizationPaymentMethodDto>
) => UseMutationResult<OrganizationPaymentMethod | null, Error, UpdateOrganizationPaymentMethodDto>

// Update subscription
const useUpdateSubscription = (
  options?: UseMutationOptions<UpdateSubscriptionResult, UpdateOrganizationSubscriptionDto>
) => UseMutationResult<UpdateSubscriptionResult, Error, UpdateOrganizationSubscriptionDto>

// Cancel subscription
const useDeleteSubscription = (
  options?: UseMutationOptions<Organization, DeleteOrganizationSubscriptionDto>
) => UseMutationResult<Organization, Error, DeleteOrganizationSubscriptionDto>
```

## Query Keys

The hooks use `@lukemorales/query-key-factory` for consistent query key management:

```typescript
// Query key structure
queryKeys.currentOrganization = {
  getCurrent: (token: string) => [...],
  getQueries: (token: string, params: GetCurrentOrganizationQueriesParams) => [...],
  getApiLimits: (token: string) => [...],
  getTrials: (token: string) => [...],
  getSubscriptablePlans: (token: string) => [...],
  getUserTransactions: (token: string, params: GetUserTransactionsParams) => [...],
  getPaymentMethod: (token: string) => [...],
  getSubscriptionIntents: (token: string) => [...],
  getUpcomingInvoice: (token: string, dto: UpcomingInvoiceDto) => [...],
  getRequestLogs: (token: string, params: GetRequestLogsParams) => [...],
  getRequestLogsInfinite: (token: string, params: Omit<GetRequestLogsParams, 'page'>) => [...],
  getRequestLog: (token: string, params: GetRequestLogParams) => [...],
  getRequestStats: (token: string, params: GetRequestStatsParams) => [...],
  getRequestStatsByApiKey: (token: string, params: GetRequestStatsByApiKeyParams) => [...],
}
```

## Usage Examples

### Basic Organization Data

```typescript
function OrganizationProfile() {
  // Basic organization data
  const { data: organization, isLoading } = useCurrentOrganization();
  
  // API limits with selector
  const currentUsage = useCurrentOrganizationApiLimits({
    select: (limits) => limits.currentUsage
  });
  
  // Available trials
  const { data: trials } = useCurrentOrganizationTrials();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <h1>{organization?.organization.name}</h1>
      <p>API Usage: {currentUsage.data} requests</p>
      <p>Available Trials: {trials?.length}</p>
    </div>
  );
}
```

### Billing Management

```typescript
function BillingDashboard() {
  // Payment method
  const { data: paymentMethod } = usePaymentMethod();
  
  // Billing plans
  const { data: plans } = useCurrentOrganizationSubscriptablePlans();
  
  // Transaction history
  const { data: transactions } = useUserTransactions({
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  // Upcoming invoice preview
  const { data: invoice } = useUpcomingInvoice({
    planId: 'premium-plan',
    priceId: 'price_123'
  });
  
  return (
    <div>
      <PaymentMethodCard method={paymentMethod} />
      <BillingPlans plans={plans} />
      <TransactionHistory transactions={transactions} />
      <InvoicePreview invoice={invoice} />
    </div>
  );
}
```

### Request Logs and Analytics

```typescript
function RequestAnalytics() {
  // Request statistics
  const { data: stats } = useRequestStats({
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    interval: 'day'
  });
  
  // Stats by API key
  const { data: apiKeyStats } = useRequestStatsByApiKey({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });
  
  // Infinite scrolling logs
  const {
    data: logsPages,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useLogsInfinite({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    limit: 20
  });
  
  const allLogs = logsPages?.pages.flatMap(page => page.items) ?? [];
  
  return (
    <div>
      <RequestStatsChart data={stats} />
      <ApiKeyStatsTable data={apiKeyStats} />
      <RequestLogsList 
        logs={allLogs}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        loading={isLoading}
      />
    </div>
  );
}
```

### Organization Management

```typescript
function OrganizationSettings() {
  // Update organization mutation
  const updateOrganization = useUpdateCurrentOrganization({
    onSuccess: (organization) => {
      toast.success('Organization updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update organization');
    }
  });
  
  // Start trial mutation
  const startTrial = useStartTrial({
    onSuccess: (trial) => {
      toast.success(`${trial.name} trial started!`);
    }
  });
  
  const handleUpdateOrganization = (data: UpdateCurrentOrganizationDto) => {
    updateOrganization.mutate(data);
  };
  
  const handleStartTrial = (planId: number) => {
    startTrial.mutate(planId);
  };
  
  return (
    <div>
      <OrganizationForm 
        onSubmit={handleUpdateOrganization}
        loading={updateOrganization.isPending}
      />
      <TrialSection 
        onStartTrial={handleStartTrial}
        loading={startTrial.isPending}
      />
    </div>
  );
}
```

### Payment Management

```typescript
function PaymentSettings() {
  // Payment method mutations
  const setupIntent = useSetupIntent({
    onSuccess: (intent) => {
      // Redirect to payment setup
      window.location.href = intent.url;
    }
  });
  
  const updatePaymentMethod = useUpdatePaymentMethod({
    onSuccess: () => {
      toast.success('Payment method updated');
    }
  });
  
  const updateSubscription = useUpdateSubscription({
    onSuccess: (result) => {
      if (result.requiresAction) {
        // Handle 3D Secure authentication
        window.location.href = result.actionUrl;
      } else {
        toast.success('Subscription updated');
      }
    }
  });
  
  const deleteSubscription = useDeleteSubscription({
    onSuccess: () => {
      toast.success('Subscription cancelled');
    }
  });
  
  return (
    <div>
      <PaymentMethodForm 
        onSetupIntent={() => setupIntent.mutate()}
        onUpdateMethod={updatePaymentMethod.mutate}
      />
      <SubscriptionForm 
        onUpdate={updateSubscription.mutate}
        onCancel={deleteSubscription.mutate}
      />
    </div>
  );
}
```

## Selector Support

All query hooks support TanStack Query's selector functionality:

```typescript
// Select specific fields
const organizationName = useCurrentOrganization({
  select: (data) => data?.organization.name
});

// Transform API limits data
const usagePercentage = useCurrentOrganizationApiLimits({
  select: (limits) => ({
    percentage: (limits.currentUsage / limits.maxUsage) * 100,
    remaining: limits.maxUsage - limits.currentUsage
  })
});

// Filter and transform transactions
const recentPayments = useUserTransactions(
  { limit: 50 },
  {
    select: (billing) => billing.transactions
      .filter(tx => tx.type === 'payment')
      .slice(0, 5)
  }
);

// Transform request stats for charts
const chartData = useRequestStats(
  { startDate: '2024-01-01', endDate: '2024-01-31' },
  {
    select: (stats) => stats.dailyStats.map(stat => ({
      date: stat.date,
      requests: stat.count,
      errors: stat.errorCount
    }))
  }
);
```

## Caching Strategy

### Query Invalidation

Mutations automatically invalidate related queries:

```typescript
// useUpdateCurrentOrganization invalidates:
// - getCurrent queries

// useStartTrial invalidates:
// - getCurrent, getApiLimits, getTrials
// - getSubscriptablePlans, getUpcomingInvoice

// useUpdatePaymentMethod invalidates:
// - getCurrent, getApiLimits, getTrials
// - getSubscriptablePlans, getUserTransactions
// - getPaymentMethod, getSubscriptionIntents, getUpcomingInvoice

// useDeleteSubscription invalidates:
// - getCurrent, getApiLimits, getTrials
// - getSubscriptablePlans, getUserTransactions
// - getSubscriptionIntents, getUpcomingInvoice
```

### Authentication-Aware Caching

All queries include the access token in their query keys and are only enabled when authenticated:

```typescript
const { token, isAuthorizedAndVerified } = useAccessToken();

// Queries are automatically disabled when not authenticated
enabled: isAuthorizedAndVerified && options?.enabled
```

### Infinite Query Caching

The `useLogsInfinite` hook implements proper infinite query caching:

```typescript
// Proper page management
initialPageParam: 0,
getNextPageParam: (last, _, pageParam) =>
  last.hasNext ? (pageParam as number) + 1 : undefined,
```

## Error Handling

### Service Integration

Hooks delegate error handling to TanStack Query, with services throwing `HttpException`:

```typescript
// Services throw HttpException for HTTP errors
queryFn: ({ signal }) => CurrentOrganizationService.getCurrentOrganization(signal)

// TanStack Query handles error states
const { data, error, isError, isLoading } = useCurrentOrganization();
```

### Mutation Error Handling

```typescript
const updateOrganization = useUpdateCurrentOrganization({
  onError: (error) => {
    if (error instanceof HttpException) {
      // Handle specific HTTP errors
      if (error.status === 403) {
        toast.error('Insufficient permissions');
      } else if (error.status === 400) {
        toast.error('Invalid organization data');
      }
    }
  }
});
```

### Global Error Handling

```typescript
function OrganizationData() {
  const { data, error, isError } = useCurrentOrganization();
  
  if (isError) {
    // Error is automatically typed from service
    return <ErrorDisplay error={error} />;
  }
  
  return <OrganizationDisplay data={data} />;
}
```

## Related Services

### CurrentOrganizationService

```typescript
// Service methods called by hooks
CurrentOrganizationService.getCurrentOrganization(signal)
CurrentOrganizationService.getQueries(params, signal)
CurrentOrganizationService.getApiLimits(signal)
CurrentOrganizationService.getTrials(signal)
CurrentOrganizationService.updateCurrentOrganization(dto)
CurrentOrganizationService.startTrial(planId)
CurrentOrganizationService.setupIntent()
CurrentOrganizationService.updatePaymentMethod(dto)
CurrentOrganizationService.updateSubscription(dto)
CurrentOrganizationService.deleteSubscription(dto)
```

### Integration with Access Token Context

```typescript
// All hooks use access token context
const { token, isAuthorizedAndVerified } = useAccessToken();

// Queries include token in query keys
queryKeys.currentOrganization.getCurrent(token?.token || '')

// Queries are only enabled when authenticated
enabled: isAuthorizedAndVerified && options?.enabled
```

## Best Practices

### 1. Authentication-Aware Queries

```typescript
// ✅ Good - queries automatically handle authentication
const { data } = useCurrentOrganization();

// ❌ Bad - manually checking authentication
const { token } = useAccessToken();
const { data } = useCurrentOrganization({
  enabled: !!token
});
```

### 2. Proper Selector Usage

```typescript
// ✅ Good - using selectors for data transformation
const organizationName = useCurrentOrganization({
  select: (data) => data?.organization.name
});

// ❌ Bad - transforming data in component
const { data } = useCurrentOrganization();
const organizationName = data?.organization.name;
```

### 3. Mutation Error Handling

```typescript
// ✅ Good - handling mutation errors
const updateOrganization = useUpdateCurrentOrganization({
  onSuccess: () => toast.success('Updated'),
  onError: (error) => handleError(error)
});

// ❌ Bad - not handling errors
const updateOrganization = useUpdateCurrentOrganization();
```

### 4. Infinite Query Usage

```typescript
// ✅ Good - proper infinite query implementation
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useLogsInfinite();

// ❌ Bad - using regular query for pagination
const { data } = useRequestLogs({ page: currentPage });
```

### 5. Parameter Validation

```typescript
// ✅ Good - providing required parameters
const { data } = useRequestStats({
  startDate: '2024-01-01',
  endDate: '2024-01-31'
});

// ❌ Bad - missing required parameters
const { data } = useRequestStats({});
```