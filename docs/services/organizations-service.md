# Organizations Service

## Purpose

The Organizations Service manages all organization-related API operations including listing organizations, retrieving billing plans, creating organizations, and handling organization authentication. This service provides a clean interface to organization management endpoints and integrates seamlessly with our TanStack Query-based data fetching layer.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `signal?: AbortSignal` | `Promise<OrganizationMember[]>` | Retrieves all organizations for the current user |
| `getListPaginated` | `params?: PaginationParams, signal?: AbortSignal` | `Promise<SliceResult<OrganizationMember>>` | Retrieves paginated list of organizations |
| `getSubscriptablePlans` | `signal?: AbortSignal` | `Promise<BillingPlanWithPricingAndPermissions[]>` | Retrieves available billing plans with pricing and permissions |
| `create` | `data: { params?: { ifNotExists?: boolean }; dto: CreateOrganizationDto }, signal?: AbortSignal` | `Promise<Organization>` | Creates a new organization |
| `login` | `id: number, signal?: AbortSignal` | `Promise<Organization>` | Authenticates and logs into a specific organization |

## Authentication

The Organizations Service uses the `PrivateApiServiceWrapper` which handles:
- **Automatic credential management** - Attaches authentication tokens to all requests
- **Session management** - Manages user session state and token refresh
- **Private API access** - Ensures all requests are authenticated for private endpoints

All methods require valid user authentication credentials to access organization data.

## Error Handling

Following our service architecture patterns, this service:
- **No built-in error handling** - Raw HTTP responses are returned
- **HttpException pattern** - Non-2xx responses throw HttpException instances
- **Query layer responsibility** - Error handling and retry logic managed by TanStack Query hooks
- **AbortSignal support** - All methods support request cancellation via AbortSignal

## Usage Examples

### Basic Organization Operations

```typescript
import { OrganizationsService } from '@/lib/services/organizations-service';

// Get all organizations
const organizations = await OrganizationsService.getList();

// Get paginated organizations
const paginatedOrgs = await OrganizationsService.getListPaginated({
  page: 1,
  limit: 10
});

// Get available billing plans
const plans = await OrganizationsService.getSubscriptablePlans();
```

### Creating Organizations

```typescript
import { CreateOrganizationDto } from '@/lib/dto';

const createOrgData: CreateOrganizationDto = {
  name: 'Acme Corp',
  description: 'A new organization',
  planId: 1
};

// Create organization
const newOrg = await OrganizationsService.create({
  dto: createOrgData
});

// Create organization with conditional creation
const conditionalOrg = await OrganizationsService.create({
  params: { ifNotExists: true },
  dto: createOrgData
});
```

### Organization Authentication

```typescript
// Login to specific organization
const organizationId = 123;
const activeOrg = await OrganizationsService.login(organizationId);
```

### With AbortSignal

```typescript
const controller = new AbortController();

// Cancel request if needed
setTimeout(() => controller.abort(), 5000);

const organizations = await OrganizationsService.getList(controller.signal);
```

## Related Types

### Core Types

```typescript
// Organization member with role information
interface OrganizationMember {
  id: number;
  name: string;
  role: OrganizationRole;
  permissions: Permission[];
  // ... other organization member fields
}

// Full organization entity
interface Organization {
  id: number;
  name: string;
  description?: string;
  billingPlan: BillingPlan;
  // ... other organization fields
}

// Billing plan with pricing and permissions
interface BillingPlanWithPricingAndPermissions {
  id: number;
  name: string;
  pricing: PlanPricing;
  permissions: Permission[];
  features: Feature[];
}
```

### Request Types

```typescript
// Organization creation payload
interface CreateOrganizationDto {
  name: string;
  description?: string;
  planId: number;
  // ... other creation fields
}

// Pagination parameters
interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### Response Types

```typescript
// Paginated response wrapper
interface SliceResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

## Dependencies

### Service Wrappers
- **`PrivateApiServiceWrapper`** - Provides authenticated API client with credential management
- **Raw API responses** - No transformation or error handling layers

### External Dependencies
- **AbortSignal** - Native browser API for request cancellation
- **Fetch API** - Underlying HTTP client through service wrapper

## Integration

### TanStack Query Integration

This service integrates with our query layer through standardized patterns:

```typescript
// Query hooks usage
const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: ({ signal }) => OrganizationsService.getList(signal),
  });
};

const useOrganizationsPaginated = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['organizations', 'paginated', params],
    queryFn: ({ signal }) => OrganizationsService.getListPaginated(params, signal),
  });
};

// Mutation hooks usage
const useCreateOrganization = () => {
  return useMutation({
    mutationFn: OrganizationsService.create,
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};
```

### Query Key Patterns

```typescript
// Recommended query key patterns
const organizationKeys = {
  all: ['organizations'] as const,
  lists: () => [...organizationKeys.all, 'list'] as const,
  list: (filters: PaginationParams) => [...organizationKeys.lists(), filters] as const,
  plans: () => [...organizationKeys.all, 'plans'] as const,
};
```

## Best Practices

### Service Architecture Adherence

✅ **Simple, focused methods** - Each method handles a single API operation
✅ **No error handling** - Raw responses returned for query layer handling
✅ **No data transformation** - API responses returned unchanged
✅ **Proper credential management** - Uses PrivateApiServiceWrapper
✅ **AbortSignal support** - All methods support request cancellation

### Usage Guidelines

1. **Always use with query hooks** - Don't call service methods directly in components
2. **Leverage AbortSignal** - Pass through for proper request cancellation
3. **Handle loading states** - Let query hooks manage loading and error states
4. **Cache invalidation** - Invalidate related queries after mutations
5. **Type safety** - Utilize TypeScript interfaces for request/response data

### Performance Considerations

- **Pagination support** - Use `getListPaginated` for large datasets
- **Request cancellation** - AbortSignal prevents unnecessary network requests
- **Query caching** - TanStack Query handles response caching automatically
- **Conditional creation** - Use `ifNotExists` parameter to prevent duplicates