# Source Groups Query Hooks

## Purpose

The Source Groups query hooks provide React Query integration for managing source group data and operations. These hooks handle fetching, creating, updating, and deleting source groups while maintaining proper cache management and optimistic updates.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useSourceGroupsQuery` | Query | Fetch paginated list of source groups |
| `useSourceGroupQuery` | Query | Fetch single source group by ID |
| `useCreateSourceGroupMutation` | Mutation | Create new source group |
| `useUpdateSourceGroupMutation` | Mutation | Update existing source group |
| `useDeleteSourceGroupMutation` | Mutation | Delete source group |

## Query Hooks

### useSourceGroupsQuery

Fetches a paginated list of source groups with filtering and sorting capabilities.

```tsx
const useSourceGroupsQuery = (
  params?: SourceGroupsQueryParams,
  options?: UseQueryOptions<SourceGroupsResponse, HttpException>
) => {
  return useQuery({
    queryKey: sourceGroupKeys.list(params),
    queryFn: () => sourceGroupService.getSourceGroups(params),
    ...options,
  });
};
```

### useSourceGroupQuery

Fetches a single source group by its ID.

```tsx
const useSourceGroupQuery = (
  id: string,
  options?: UseQueryOptions<SourceGroup, HttpException>
) => {
  return useQuery({
    queryKey: sourceGroupKeys.detail(id),
    queryFn: () => sourceGroupService.getSourceGroup(id),
    enabled: !!id,
    ...options,
  });
};
```

## Mutation Hooks

### useCreateSourceGroupMutation

Creates a new source group with optimistic updates and cache invalidation.

```tsx
const useCreateSourceGroupMutation = (
  options?: UseMutationOptions<SourceGroup, HttpException, CreateSourceGroupData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sourceGroupService.createSourceGroup,
    onSuccess: (newSourceGroup) => {
      // Invalidate and refetch source groups list
      queryClient.invalidateQueries({
        queryKey: sourceGroupKeys.lists(),
      });

      // Add new source group to cache
      queryClient.setQueryData(
        sourceGroupKeys.detail(newSourceGroup.id),
        newSourceGroup
      );
    },
    ...options,
  });
};
```

### useUpdateSourceGroupMutation

Updates an existing source group with optimistic updates.

```tsx
const useUpdateSourceGroupMutation = (
  options?: UseMutationOptions<SourceGroup, HttpException, UpdateSourceGroupData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => sourceGroupService.updateSourceGroup(id, data),
    onMutate: async ({ id, ...updates }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: sourceGroupKeys.detail(id),
      });

      // Snapshot previous value
      const previousSourceGroup = queryClient.getQueryData(
        sourceGroupKeys.detail(id)
      );

      // Optimistically update
      queryClient.setQueryData(
        sourceGroupKeys.detail(id),
        (old: SourceGroup) => ({ ...old, ...updates })
      );

      return { previousSourceGroup };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousSourceGroup) {
        queryClient.setQueryData(
          sourceGroupKeys.detail(id),
          context.previousSourceGroup
        );
      }
    },
    onSettled: (data, error, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: sourceGroupKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: sourceGroupKeys.lists(),
      });
    },
    ...options,
  });
};
```

### useDeleteSourceGroupMutation

Deletes a source group with cache cleanup.

```tsx
const useDeleteSourceGroupMutation = (
  options?: UseMutationOptions<void, HttpException, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sourceGroupService.deleteSourceGroup,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: sourceGroupKeys.detail(deletedId),
      });

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: sourceGroupKeys.lists(),
      });
    },
    ...options,
  });
};
```

## Query Keys

Query keys are structured using `@lukemorales/query-key-factory` for consistency:

```tsx
export const sourceGroupKeys = createQueryKeys('sourceGroups', {
  all: null,
  lists: () => ['list'],
  list: (params: SourceGroupsQueryParams = {}) => [
    ...sourceGroupKeys.lists().queryKey,
    params,
  ],
  details: () => ['detail'],
  detail: (id: string) => [
    ...sourceGroupKeys.details().queryKey,
    id,
  ],
});
```

**Key Structure:**
- `sourceGroups` - Base scope
- `['sourceGroups', 'list']` - All lists
- `['sourceGroups', 'list', params]` - Specific list with parameters
- `['sourceGroups', 'detail']` - All details
- `['sourceGroups', 'detail', id]` - Specific source group

## Usage Examples

### Basic List Query

```tsx
function SourceGroupsList() {
  const { data, isLoading, error } = useSourceGroupsQuery({
    page: 1,
    limit: 20,
    search: 'api',
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.items.map(group => (
        <SourceGroupCard key={group.id} sourceGroup={group} />
      ))}
    </div>
  );
}
```

### Detail Query with Conditional Fetching

```tsx
function SourceGroupDetail({ sourceGroupId }: { sourceGroupId?: string }) {
  const { data: sourceGroup, isLoading } = useSourceGroupQuery(
    sourceGroupId!,
    {
      enabled: !!sourceGroupId,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (!sourceGroupId) return <div>No source group selected</div>;
  if (isLoading) return <LoadingSpinner />;

  return <SourceGroupForm sourceGroup={sourceGroup} />;
}
```

### Create Mutation with Toast

```tsx
function CreateSourceGroupForm() {
  const [form] = Form.useForm();
  
  const createMutation = useCreateSourceGroupMutation({
    onSuccess: (sourceGroup) => {
      toast.success(`Source group "${sourceGroup.name}" created successfully`);
      form.resetFields();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: CreateSourceGroupData) => {
    createMutation.mutate(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Source group name" />
      </Form.Item>
      
      <Button 
        type="primary" 
        htmlType="submit"
        loading={createMutation.isPending}
      >
        Create Source Group
      </Button>
    </Form>
  );
}
```

### Update with Optimistic UI

```tsx
function EditSourceGroupForm({ sourceGroup }: { sourceGroup: SourceGroup }) {
  const updateMutation = useUpdateSourceGroupMutation({
    onSuccess: () => {
      toast.success('Source group updated successfully');
    },
  });

  const handleUpdate = (updates: Partial<SourceGroup>) => {
    updateMutation.mutate({
      id: sourceGroup.id,
      ...updates,
    });
  };

  return (
    <Form
      initialValues={sourceGroup}
      onFinish={handleUpdate}
    >
      <Form.Item name="name">
        <Input />
      </Form.Item>
      
      <Button 
        type="primary" 
        htmlType="submit"
        loading={updateMutation.isPending}
      >
        Update
      </Button>
    </Form>
  );
}
```

## Selector Support

Use selector functions to transform query data:

```tsx
// Select only source group names
const sourceGroupNames = useSourceGroupsQuery(
  { limit: 100 },
  {
    select: (data) => data.items.map(group => ({
      id: group.id,
      name: group.name,
    })),
  }
);

// Select specific field from detail query
const sourceGroupName = useSourceGroupQuery(
  sourceGroupId,
  {
    select: (sourceGroup) => sourceGroup.name,
  }
);

// Count total items
const totalSourceGroups = useSourceGroupsQuery(
  {},
  {
    select: (data) => data.total,
  }
);
```

## Caching Strategy

### Cache Time Configuration

```tsx
// Long-lived data (source group details)
const sourceGroup = useSourceGroupQuery(id, {
  staleTime: 10 * 60 * 1000, // 10 minutes
  gcTime: 30 * 60 * 1000,    // 30 minutes
});

// Frequently changing data (source group lists)
const sourceGroups = useSourceGroupsQuery(params, {
  staleTime: 2 * 60 * 1000,  // 2 minutes
  gcTime: 10 * 60 * 1000,    // 10 minutes
});
```

### Manual Cache Management

```tsx
function SourceGroupManager() {
  const queryClient = useQueryClient();

  const refreshSourceGroups = () => {
    queryClient.invalidateQueries({
      queryKey: sourceGroupKeys.lists(),
    });
  };

  const prefetchSourceGroup = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: sourceGroupKeys.detail(id),
      queryFn: () => sourceGroupService.getSourceGroup(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <div>
      <Button onClick={refreshSourceGroups}>
        Refresh Source Groups
      </Button>
    </div>
  );
}
```

## Error Handling

### Service-Level Errors

Services throw `HttpException` which TanStack Query handles automatically:

```tsx
// Service throws HttpException
export const sourceGroupService = {
  async getSourceGroup(id: string): Promise<SourceGroup> {
    const response = await apiClient.get(`/source-groups/${id}`);
    
    if (!response.ok) {
      throw new HttpException(
        response.status,
        'Failed to fetch source group'
      );
    }
    
    return response.data;
  },
};
```

### Component Error Handling

```tsx
function SourceGroupDetail({ id }: { id: string }) {
  const { data, error, isError, refetch } = useSourceGroupQuery(id);

  if (isError) {
    return (
      <ErrorBoundary
        error={error}
        retry={refetch}
        fallback="Failed to load source group"
      />
    );
  }

  return <SourceGroupForm sourceGroup={data} />;
}
```

### Global Error Handling

```tsx
// In QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error: HttpException) => {
        if (error.status === 401) {
          // Handle unauthorized
          authService.logout();
        } else if (error.status >= 500) {
          // Handle server errors
          toast.error('Server error occurred');
        }
      },
    },
  },
});
```

## Related Services

### Source Group Service Integration

```tsx
// src/lib/services/source-group.service.ts
export const sourceGroupService = {
  getSourceGroups: (params?: SourceGroupsQueryParams) => 
    apiClient.get('/source-groups', { params }),
  
  getSourceGroup: (id: string) => 
    apiClient.get(`/source-groups/${id}`),
  
  createSourceGroup: (data: CreateSourceGroupData) => 
    apiClient.post('/source-groups', data),
  
  updateSourceGroup: (id: string, data: UpdateSourceGroupData) => 
    apiClient.patch(`/source-groups/${id}`, data),
  
  deleteSourceGroup: (id: string) => 
    apiClient.delete(`/source-groups/${id}`),
};
```

### API Client Integration

```tsx
// Hooks use simple service calls
const { data } = useSourceGroupsQuery(); // Calls sourceGroupService.getSourceGroups()
const mutation = useCreateSourceGroupMutation(); // Uses sourceGroupService.createSourceGroup()
```

## Best Practices

### 1. Consistent Query Key Usage

```tsx
// ✅ Good - Use query key factory
queryClient.invalidateQueries({
  queryKey: sourceGroupKeys.lists(),
});

// ❌ Bad - Manual key construction
queryClient.invalidateQueries({
  queryKey: ['sourceGroups', 'list'],
});
```

### 2. Proper Error Boundaries

```tsx
// ✅ Good - Let TanStack Query handle errors
const { data, error } = useSourceGroupQuery(id);

// ❌ Bad - Try/catch in component
try {
  const data = await sourceGroupService.getSourceGroup(id);
} catch (error) {
  // Handle error
}
```

### 3. Optimistic Updates

```tsx
// ✅ Good - Implement optimistic updates
const updateMutation = useUpdateSourceGroupMutation({
  onMutate: async (variables) => {
    // Cancel queries and update cache optimistically
  },
  onError: (err, variables, context) => {
    // Rollback on error
  },
});

// ❌ Bad - No optimistic updates
const updateMutation = useUpdateSourceGroupMutation();
```

### 4. Selective Invalidation

```tsx
// ✅ Good - Invalidate specific queries
queryClient.invalidateQueries({
  queryKey: sourceGroupKeys.detail(id),
});

// ❌ Bad - Invalidate everything
queryClient.invalidateQueries();
```

### 5. Proper Loading States

```tsx
// ✅ Good - Handle all states
const { data, isLoading, error, isError } = useSourceGroupQuery(id);

if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage error={error} />;
return <SourceGroupDetail sourceGroup={data} />;
```