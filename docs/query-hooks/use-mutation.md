# Source Group Mutation Hooks

## Purpose

These hooks provide a comprehensive set of TanStack Query mutations for managing source groups in your application. They handle creating, updating, and deleting source groups with automatic cache invalidation, error handling, and toast notifications.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useCreateSourceGroup` | Mutation | Creates a new source group |
| `useDeleteSourceGroup` | Mutation | Deletes an existing source group |
| `useUpdateSourceGroup` | Mutation | Updates an existing source group |
| `sourceGroupMutationBuilder` | Builder | Factory function for creating source group mutations |

## Mutation Hooks

### useCreateSourceGroup

Creates a new source group with automatic cache invalidation.

```tsx
const useCreateSourceGroup = (options?: UseMutationOptions<TData, TVariables>) => UseMutationResult
```

**Parameters:**
- `options` - Optional mutation configuration extending TanStack Query's `UseMutationOptions`

**Returns:** TanStack Query `UseMutationResult` object

### useDeleteSourceGroup

Deletes an existing source group with automatic cache invalidation.

```tsx
const useDeleteSourceGroup = (options?: UseMutationOptions<TData, TVariables>) => UseMutationResult
```

**Parameters:**
- `options` - Optional mutation configuration extending TanStack Query's `UseMutationOptions`

**Returns:** TanStack Query `UseMutationResult` object

### useUpdateSourceGroup

Updates an existing source group with automatic cache invalidation.

```tsx
const useUpdateSourceGroup = (options?: UseMutationOptions<TData, TVariables>) => UseMutationResult
```

**Parameters:**
- `options` - Optional mutation configuration extending TanStack Query's `UseMutationOptions`

**Returns:** TanStack Query `UseMutationResult` object

## Query Keys

The hooks use `@lukemorales/query-key-factory` for consistent query key management:

```tsx
// Mutation keys follow this pattern:
[...queryKeys.sourceGroups._def, action]

// Examples:
['sourceGroups', 'create']  // useCreateSourceGroup
['sourceGroups', 'delete']  // useDeleteSourceGroup  
['sourceGroups', 'update']  // useUpdateSourceGroup
```

**Cache Invalidation Targets:**
- `queryKeys.sourceGroups.getList._def` - Invalidates paginated source group lists
- `queryKeys.sourceGroups.getListInfinite._def` - Invalidates infinite query lists

## Usage Examples

### Creating a Source Group

```tsx
import { useCreateSourceGroup } from '@/lib/query-hooks/source-groups/use-mutation';

function CreateSourceGroupForm() {
  const createSourceGroup = useCreateSourceGroup({
    onSuccess: (data) => {
      console.log('Source group created:', data);
      // Additional success handling
    },
    onError: (error) => {
      console.error('Failed to create source group:', error);
      // Additional error handling beyond toast
    }
  });

  const handleSubmit = (formData: CreateSourceGroupRequest) => {
    createSourceGroup.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={createSourceGroup.isPending}
      >
        {createSourceGroup.isPending ? 'Creating...' : 'Create Source Group'}
      </button>
    </form>
  );
}
```

### Updating a Source Group

```tsx
import { useUpdateSourceGroup } from '@/lib/query-hooks/source-groups/use-mutation';

function EditSourceGroupModal({ sourceGroup, onClose }) {
  const updateSourceGroup = useUpdateSourceGroup({
    onSuccess: () => {
      onClose();
      // Modal will close and cache will be invalidated automatically
    }
  });

  const handleUpdate = (updates: UpdateSourceGroupRequest) => {
    updateSourceGroup.mutate({
      id: sourceGroup.id,
      ...updates
    });
  };

  return (
    <Modal>
      {/* Update form */}
      <button 
        onClick={() => handleUpdate(formData)}
        disabled={updateSourceGroup.isPending}
      >
        {updateSourceGroup.isPending ? 'Updating...' : 'Update'}
      </button>
    </Modal>
  );
}
```

### Deleting a Source Group

```tsx
import { useDeleteSourceGroup } from '@/lib/query-hooks/source-groups/use-mutation';

function SourceGroupActions({ sourceGroupId }) {
  const deleteSourceGroup = useDeleteSourceGroup({
    onSuccess: () => {
      // Cache invalidation happens automatically
      console.log('Source group deleted successfully');
    }
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this source group?')) {
      deleteSourceGroup.mutate({ id: sourceGroupId });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={deleteSourceGroup.isPending}
      className="btn-danger"
    >
      {deleteSourceGroup.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

### Using Multiple Mutations

```tsx
import { 
  useCreateSourceGroup, 
  useUpdateSourceGroup, 
  useDeleteSourceGroup 
} from '@/lib/query-hooks/source-groups/use-mutation';

function SourceGroupManager() {
  const createMutation = useCreateSourceGroup();
  const updateMutation = useUpdateSourceGroup();
  const deleteMutation = useDeleteSourceGroup();

  const isLoading = createMutation.isPending || 
                   updateMutation.isPending || 
                   deleteMutation.isPending;

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {/* Your UI components */}
    </div>
  );
}
```

## Mutation Builder Pattern

### sourceGroupMutationBuilder

A factory function that creates consistent mutation hooks with shared behavior:

```tsx
function sourceGroupMutationBuilder<TData, TVariables>(
  action: keyof typeof SourceGroupService,
  mutationFn: (variables: TVariables) => Promise<TData>
) => (options?: UseMutationOptions<TData, TVariables>) => UseMutationResult
```

**Features:**
- Consistent mutation key generation
- Automatic cache invalidation
- Error handling with toast notifications
- Success callback chaining

**Custom Usage:**
```tsx
// Creating a custom source group mutation
const useCustomSourceGroupAction = sourceGroupMutationBuilder(
  'customAction',
  SourceGroupService.customAction
);
```

## Caching Strategy

### Cache Invalidation

All mutations automatically invalidate related queries:

```tsx
// After any mutation, these queries are invalidated:
queryClient.invalidateQueries({
  queryKey: queryKeys.sourceGroups.getList._def,
});
queryClient.invalidateQueries({
  queryKey: queryKeys.sourceGroups.getListInfinite._def,
});
```

### Cache Behavior

- **Create**: Invalidates list queries to include new source group
- **Update**: Invalidates list queries to reflect changes
- **Delete**: Invalidates list queries to remove deleted source group

## Error Handling

### Automatic Error Handling

All mutations include automatic error handling via `useHandleToastError`:

```tsx
onError: (error, variables, context) => {
  onError?.(error, variables, context); // Custom error handler
  handleToastError(error); // Automatic toast notification
}
```

### Custom Error Handling

```tsx
const createSourceGroup = useCreateSourceGroup({
  onError: (error, variables, context) => {
    // Custom error handling
    if (error.status === 409) {
      setFieldError('name', 'Source group name already exists');
    }
    // Toast error is still shown automatically
  }
});
```

### Error Types

Mutations handle `HttpException` errors thrown by services:

```tsx
// Service throws HttpException
// Hook catches and displays toast
// Custom onError can provide additional handling
```

## Related Services

### SourceGroupService Integration

These hooks integrate with the `SourceGroupService`:

```tsx
// Service methods used:
SourceGroupService.create   // useCreateSourceGroup
SourceGroupService.update   // useUpdateSourceGroup  
SourceGroupService.delete   // useDeleteSourceGroup
```

### Service Method Signatures

```tsx
interface SourceGroupService {
  create(data: CreateSourceGroupRequest): Promise<SourceGroup>;
  update(data: UpdateSourceGroupRequest): Promise<SourceGroup>;
  delete(data: DeleteSourceGroupRequest): Promise<void>;
}
```

## Best Practices

### 1. Use Mutation Status

```tsx
const mutation = useCreateSourceGroup();

// Check mutation status
if (mutation.isPending) return <LoadingSpinner />;
if (mutation.isError) return <ErrorMessage error={mutation.error} />;
if (mutation.isSuccess) return <SuccessMessage />;
```

### 2. Handle Success Actions

```tsx
const createSourceGroup = useCreateSourceGroup({
  onSuccess: (data) => {
    // Navigate to new source group
    router.push(`/source-groups/${data.id}`);
    
    // Show success message
    toast.success('Source group created successfully');
    
    // Reset form
    form.reset();
  }
});
```

### 3. Provide User Feedback

```tsx
<button 
  onClick={() => mutation.mutate(data)}
  disabled={mutation.isPending}
>
  {mutation.isPending ? (
    <>
      <Spinner size="sm" />
      Creating...
    </>
  ) : (
    'Create Source Group'
  )}
</button>
```

### 4. Chain Mutations Safely

```tsx
const createGroup = useCreateSourceGroup({
  onSuccess: (group) => {
    // Chain another mutation
    updateSettings.mutate({ 
      defaultSourceGroupId: group.id 
    });
  }
});
```

### 5. Handle Cleanup

```tsx
useEffect(() => {
  return () => {
    // Reset mutation state when component unmounts
    createSourceGroup.reset();
  };
}, []);
```

### 6. Optimistic Updates (Advanced)

```tsx
const updateSourceGroup = useUpdateSourceGroup({
  onMutate: async (variables) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ 
      queryKey: queryKeys.sourceGroups.getList._def 
    });

    // Snapshot previous value
    const previousData = queryClient.getQueryData(
      queryKeys.sourceGroups.getList._def
    );

    // Optimistically update
    queryClient.setQueryData(
      queryKeys.sourceGroups.getList._def, 
      (old) => updateSourceGroupInList(old, variables)
    );

    return { previousData };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    if (context?.previousData) {
      queryClient.setQueryData(
        queryKeys.sourceGroups.getList._def,
        context.previousData
      );
    }
  }
});
```

This comprehensive mutation system provides type-safe, consistent, and robust source group management with automatic cache management and error handling following TanStack Query best practices.