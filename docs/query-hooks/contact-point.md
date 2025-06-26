# Contact Point Query Hooks

## Purpose

The contact point query hooks manage contact point data and operations within the application. These hooks provide a type-safe interface for fetching contact point lists and individual contact points, as well as performing CRUD operations like creating, updating, and unsubscribing contact points from signals. All hooks integrate with the authentication system and follow TanStack Query best practices for caching and state management.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useContactPoints` | Query | Fetch paginated list of contact points with filtering |
| `useContactPointById` | Query | Fetch a single contact point by ID |
| `useCreateContactPoint` | Mutation | Create a new contact point |
| `useUnsubscribeContactPoint` | Mutation | Unsubscribe a contact point from a signal |
| `useUpdateContactPoint` | Mutation | Update an existing contact point |

## Query Hooks

### useContactPoints

Fetches a paginated list of contact points with support for filtering and search parameters.

**Parameters:**
- `params: GetContactPointsListParams` - Query parameters for filtering and pagination
- `options?: UseQueryOptions<CustomSearchResult<ContactPoint>, T>` - TanStack Query options with selector support

**Returns:** `UseQueryResult<CustomSearchResult<ContactPoint> | T>`

**Features:**
- Automatic authentication check via `isAuthorizedAndVerified`
- Selector function support for data transformation
- Integrated with query key factory for consistent caching

### useContactPointById

Fetches a single contact point by its unique identifier.

**Parameters:**
- `id: string` - The contact point ID to fetch
- `options?: UseQueryOptions<ContactPoint, T>` - TanStack Query options with selector support

**Returns:** `UseQueryResult<ContactPoint | T>`

**Features:**
- Automatic authentication verification
- Type-safe selector support
- Consistent query key structure for efficient caching

## Mutation Hooks

### useCreateContactPoint

Creates a new contact point with automatic cache invalidation.

**Parameters:**
- `options?: UseMutationOptions<ContactPoint, CreateContactPointDto>` - Mutation options and callbacks

**Returns:** `UseMutationResult<ContactPoint, Error, CreateContactPointDto>`

**Cache Invalidation:**
- Invalidates contact point list queries
- Updates individual contact point cache with new data

### useUnsubscribeContactPoint

Unsubscribes a contact point from a specific signal.

**Parameters:**
- `options?: UseMutationOptions<void, UnsubscribeContactPointVariables>` - Mutation options and callbacks

**Variables Type:**
```typescript
interface UnsubscribeContactPointVariables {
  signalId: string;
  contactPointId: string;
}
```

**Cache Invalidation:**
- Invalidates the affected signal query
- Invalidates the affected contact point query

### useUpdateContactPoint

Updates an existing contact point with optimized cache management.

**Parameters:**
- `options?: UseMutationOptions<ContactPoint, UpdateContactPointVariables>` - Mutation options and callbacks

**Variables Type:**
```typescript
interface UpdateContactPointVariables {
  id: string;
  dto: UpdateContactPointDto;
}
```

**Cache Invalidation:**
- Updates the specific contact point cache
- Invalidates contact point list queries

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency and type safety:

```typescript
// Query key structure examples
queryKeys.contactPoints.getList(token, params)
queryKeys.contactPoints.getById(token, id)

// Mutation keys
[...queryKeys.contactPoints._def, 'create']
[...queryKeys.contactPoints._def, 'unsubscribe']
[...queryKeys.contactPoints._def, 'update']
```

## Usage Examples

### Basic Contact Point List

```typescript
import { useContactPoints } from '@/lib/query-hooks/contact-point';

function ContactPointsList() {
  const { data, isLoading, error } = useContactPoints({
    page: 1,
    pageSize: 20,
    search: ''
  });

  if (isLoading) return <div>Loading contact points...</div>;
  if (error) return <div>Error loading contact points</div>;

  return (
    <div>
      {data?.results.map(contactPoint => (
        <div key={contactPoint.id}>{contactPoint.name}</div>
      ))}
    </div>
  );
}
```

### Contact Point Details with Selector

```typescript
import { useContactPointById } from '@/lib/query-hooks/contact-point';

function ContactPointDetails({ id }: { id: string }) {
  // Using selector to extract only the name
  const { data: contactPointName } = useContactPointById(id, {
    select: (contactPoint) => contactPoint.name,
    enabled: !!id
  });

  return <h2>{contactPointName}</h2>;
}
```

### Creating a Contact Point

```typescript
import { useCreateContactPoint } from '@/lib/query-hooks/contact-point';

function CreateContactPointForm() {
  const createContactPoint = useCreateContactPoint({
    onSuccess: (newContactPoint) => {
      console.log('Contact point created:', newContactPoint.id);
      // Navigation or notification logic
    },
    onError: (error) => {
      console.error('Failed to create contact point:', error);
    }
  });

  const handleSubmit = (formData: CreateContactPointDto) => {
    createContactPoint.mutate(formData);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({ name: 'New Contact Point' });
    }}>
      <button 
        type="submit" 
        disabled={createContactPoint.isPending}
      >
        {createContactPoint.isPending ? 'Creating...' : 'Create Contact Point'}
      </button>
    </form>
  );
}
```

### Unsubscribing Contact Point

```typescript
import { useUnsubscribeContactPoint } from '@/lib/query-hooks/contact-point';

function UnsubscribeButton({ signalId, contactPointId }: {
  signalId: string;
  contactPointId: string;
}) {
  const unsubscribe = useUnsubscribeContactPoint({
    onSuccess: () => {
      console.log('Successfully unsubscribed');
    }
  });

  const handleUnsubscribe = () => {
    unsubscribe.mutate({ signalId, contactPointId });
  };

  return (
    <button 
      onClick={handleUnsubscribe}
      disabled={unsubscribe.isPending}
    >
      {unsubscribe.isPending ? 'Unsubscribing...' : 'Unsubscribe'}
    </button>
  );
}
```

### Updating Contact Point

```typescript
import { useUpdateContactPoint } from '@/lib/query-hooks/contact-point';

function EditContactPointForm({ contactPoint }: { contactPoint: ContactPoint }) {
  const updateContactPoint = useUpdateContactPoint({
    onSuccess: (updatedContactPoint) => {
      console.log('Contact point updated:', updatedContactPoint.id);
    }
  });

  const handleUpdate = (updates: UpdateContactPointDto) => {
    updateContactPoint.mutate({
      id: contactPoint.id,
      dto: updates
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleUpdate({ name: 'Updated Name' });
    }}>
      <button 
        type="submit" 
        disabled={updateContactPoint.isPending}
      >
        {updateContactPoint.isPending ? 'Updating...' : 'Update Contact Point'}
      </button>
    </form>
  );
}
```

## Selector Support

All query hooks support selector functions for data transformation:

### Transform Contact Point Data

```typescript
// Extract specific fields
const { data: contactPointSummary } = useContactPointById(id, {
  select: (contactPoint) => ({
    id: contactPoint.id,
    name: contactPoint.name,
    isActive: contactPoint.status === 'active'
  })
});

// Transform list data
const { data: contactPointNames } = useContactPoints(params, {
  select: (result) => result.results.map(cp => cp.name)
});
```

### Conditional Data Processing

```typescript
const { data: activeContactPoints } = useContactPoints(params, {
  select: (result) => ({
    ...result,
    results: result.results.filter(cp => cp.isActive)
  }),
  enabled: user?.hasPermission('view_contact_points')
});
```

## Caching Strategy

### Query Caching
- **Contact Point Lists**: Cached by token and query parameters
- **Individual Contact Points**: Cached by token and contact point ID
- **Authentication Dependency**: All queries are disabled when user is not authenticated

### Cache Invalidation Patterns

**Create Operations:**
```typescript
// Invalidates list queries and updates individual cache
queryClient.invalidateQueries({ queryKey: queryKeys.contactPoints.getList._def })
queryClient.invalidateQueries({ queryKey: [...queryKeys.contactPoints.getById._def, data.id] })
```

**Update Operations:**
```typescript
// Updates specific contact point and invalidates lists
queryClient.invalidateQueries({ queryKey: [...queryKeys.contactPoints.getById._def, data.id] })
queryClient.invalidateQueries({ queryKey: queryKeys.contactPoints.getList._def })
```

**Unsubscribe Operations:**
```typescript
// Invalidates both signal and contact point caches
queryClient.invalidateQueries({ queryKey: [...queryKeys.signals.getById._def, signalId] })
queryClient.invalidateQueries({ queryKey: [...queryKeys.contactPoints.getById._def, contactPointId] })
```

## Error Handling

### Service Integration
- Services throw `HttpException` for HTTP errors
- TanStack Query automatically handles error states
- Error boundaries can catch unhandled errors

### Error State Management

```typescript
const { data, error, isError, isPending } = useContactPoints(params);

if (isError) {
  // error is typed as Error
  console.error('Contact points fetch failed:', error.message);
}
```

### Mutation Error Handling

```typescript
const createContactPoint = useCreateContactPoint({
  onError: (error, variables, context) => {
    // Handle specific error scenarios
    if (error.message.includes('validation')) {
      // Handle validation errors
    }
  }
});
```

## Related Services

### ContactPointService Integration
- **File**: `@/lib/services/contact-points-service`
- **Methods**: `getList()`, `getById()`, `create()`, `update()`, `unsubscribeContactPoint()`
- **Error Handling**: Services throw HttpException for HTTP errors

### Authentication Integration
- **Context**: `useAccessToken` from `@/lib/contexts`
- **Token Management**: Automatic token inclusion in query keys
- **Authorization**: Queries disabled when `isAuthorizedAndVerified` is false

## Best Practices

### Query Hook Usage
```typescript
// ✅ Good: Enable queries conditionally
const { data } = useContactPointById(id, {
  enabled: !!id && user?.hasPermission('view_contact_points')
});

// ✅ Good: Use selectors for data transformation
const { data: contactPointName } = useContactPointById(id, {
  select: (cp) => cp.name
});
```

### Mutation Hook Usage
```typescript
// ✅ Good: Handle loading states
const createMutation = useCreateContactPoint();

// ✅ Good: Provide user feedback
if (createMutation.isPending) return <Spinner />;

// ✅ Good: Handle success/error states
const handleCreate = async (data: CreateContactPointDto) => {
  try {
    await createMutation.mutateAsync(data);
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

### Performance Optimization
```typescript
// ✅ Good: Use selectors to prevent unnecessary re-renders
const { data: isActiveContactPoint } = useContactPointById(id, {
  select: (cp) => cp.status === 'active'
});

// ✅ Good: Conditional enabling
const { data } = useContactPoints(params, {
  enabled: shouldFetchContactPoints && !!user
});
```