# Tabs TanStack Query Hooks

## Purpose

The tabs query hooks provide a comprehensive interface for managing browser tab data through TanStack Query. These hooks handle fetching individual tabs and tab lists, creating new tabs with optional tab closing, updating tab properties, and closing tabs individually or in batches. All hooks integrate with the authentication system and provide proper cache management for optimal performance.

## Hooks Overview

| Hook | Type | Purpose |
|------|------|---------|
| `useTabById` | Query | Fetch a single tab by ID with selector support |
| `useTabs` | Query | Fetch a list of tabs with filtering and sorting |
| `useCreateTab` | Mutation | Create a new tab with optional existing tab closure |
| `useUpdateTab` | Mutation | Update tab properties |
| `useCloseTab` | Mutation | Close a single tab |
| `useCloseTabBatch` | Mutation | Close multiple tabs in a batch operation |

## Query Hooks

### useTabById

Fetches a single tab by its ID with authentication-aware caching.

```typescript
function useTabById<T = Tab>(
  id: number,
  options?: UseQueryOptions<Tab, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `id`: The unique identifier of the tab to fetch
- `options`: Optional TanStack Query options with selector support

**Features:**
- Automatic authentication check with `isAuthorizedAndVerified`
- Query key includes authentication token for cache isolation
- Supports custom selectors for data transformation
- Automatically disabled when user is not authenticated

### useTabs

Fetches a paginated list of tabs with sorting and filtering capabilities.

```typescript
function useTabs<T = TabList>(
  params: GetTabsListParams = { sortBy: 'position', sortOrder: 'desc' },
  options?: UseQueryOptions<TabList, T>
): UseQueryResult<T, Error>
```

**Parameters:**
- `params`: Query parameters for sorting and filtering (defaults to position-based descending sort)
- `options`: Optional TanStack Query options with selector support

**Features:**
- Default sorting by position in descending order
- Configurable sort fields and order
- Authentication-aware query execution
- Supports custom data transformation through selectors

## Mutation Hooks

### useCreateTab

Creates a new tab with an optional capability to close an existing tab atomically.

```typescript
function useCreateTab(
  options?: UseMutationOptions<Tab, CreateTabDto>
): UseMutationResult<Tab, Error, CreateTabDto>
```

**CreateTabDto Interface:**
```typescript
interface CreateTabDto {
  tab: CreateTabDtoInner;
  tabIdToClose?: number;
}
```

**Features:**
- Atomic operation: closes existing tab first, then creates new tab
- Automatic cache invalidation on success
- Error recovery: invalidates cache even on failure to ensure consistency
- Returns the newly created tab data

### useUpdateTab

Updates properties of an existing tab.

```typescript
function useUpdateTab(
  options?: UseMutationOptions<Tab, UpdateTabDto>
): UseMutationResult<Tab, Error, UpdateTabDto>
```

**Features:**
- Built using the `tabMutationBuilder` pattern
- Automatic cache invalidation for both specific tab and tab list
- Returns updated tab data

### useCloseTab

Closes a single tab by ID.

```typescript
function useCloseTab(
  options?: UseMutationOptions<Tab, number>
): UseMutationResult<Tab, Error, number>
```

**Features:**
- Takes tab ID as mutation variable
- Invalidates both individual tab and list caches
- Returns closed tab data for potential optimistic updates

### useCloseTabBatch

Closes multiple tabs in a single batch operation.

```typescript
function useCloseTabBatch(
  options?: UseMutationOptions<Tab[], number[]>
): UseMutationResult<Tab[], Error, number[]>
```

**Features:**
- Accepts array of tab IDs for batch processing
- Efficiently invalidates cache for all affected tabs
- Returns array of closed tab data

## Query Keys

Query keys are managed using `@lukemorales/query-key-factory` for consistency:

```typescript
// Individual tab queries
queryKeys.tabs.getById(token, id)

// Tab list queries  
queryKeys.tabs.getList(token, params)

// Mutation keys (for internal use)
[...queryKeys.tabs._def, 'create']
[...queryKeys.tabs._def, 'update']
[...queryKeys.tabs._def, 'close']
[...queryKeys.tabs._def, 'closeBatch']
```

**Key Structure:**
- All query keys include authentication token for cache isolation
- List queries include serialized parameters for proper caching
- Mutation keys extend base tab key definition with action identifier

## Usage Examples

### Basic Tab Fetching

```typescript
// Fetch a specific tab
function TabDetails({ tabId }: { tabId: number }) {
  const { data: tab, isLoading, error } = useTabById(tabId);
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <TabView tab={tab} />;
}

// Fetch tabs list with custom sorting
function TabsList() {
  const { data: tabs, isLoading } = useTabs({
    sortBy: 'title',
    sortOrder: 'asc'
  });
  
  return (
    <div>
      {tabs?.items.map(tab => (
        <TabItem key={tab.id} tab={tab} />
      ))}
    </div>
  );
}
```

### Tab Mutations

```typescript
// Create a new tab
function CreateTabButton() {
  const createTab = useCreateTab({
    onSuccess: (newTab) => {
      toast.success(`Tab "${newTab.title}" created successfully`);
    },
    onError: (error) => {
      toast.error('Failed to create tab');
    }
  });
  
  const handleCreate = () => {
    createTab.mutate({
      tab: {
        title: 'New Tab',
        url: 'https://example.com'
      },
      tabIdToClose: 123 // Optional: close existing tab
    });
  };
  
  return (
    <Button 
      onClick={handleCreate}
      loading={createTab.isPending}
    >
      Create Tab
    </Button>
  );
}

// Update tab properties
function UpdateTabForm({ tab }: { tab: Tab }) {
  const updateTab = useUpdateTab();
  
  const handleUpdate = (updates: Partial<Tab>) => {
    updateTab.mutate({
      id: tab.id,
      ...updates
    });
  };
  
  return <TabEditForm tab={tab} onSubmit={handleUpdate} />;
}

// Close multiple tabs
function CloseTabsButton({ tabIds }: { tabIds: number[] }) {
  const closeTabsBatch = useCloseTabBatch();
  
  const handleCloseBatch = () => {
    closeTabsBatch.mutate(tabIds, {
      onSuccess: (closedTabs) => {
        toast.success(`Closed ${closedTabs.length} tabs`);
      }
    });
  };
  
  return (
    <Button 
      onClick={handleCloseBatch}
      variant="destructive"
      loading={closeTabsBatch.isPending}
    >
      Close Selected Tabs
    </Button>
  );
}
```

## Selector Support

Both query hooks support custom selectors for data transformation:

```typescript
// Transform single tab data
const { data: tabTitle } = useTabById(tabId, {
  select: (tab) => tab.title
});

// Transform and filter tabs list
const { data: favoriteTabs } = useTabs(params, {
  select: (tabList) => tabList.items.filter(tab => tab.isFavorite)
});

// Extract specific fields for performance
const { data: tabSummary } = useTabById(tabId, {
  select: (tab) => ({
    id: tab.id,
    title: tab.title,
    isActive: tab.isActive
  })
});

// Count tabs by status
const { data: tabCounts } = useTabs(params, {
  select: (tabList) => ({
    total: tabList.totalCount,
    active: tabList.items.filter(tab => tab.isActive).length,
    inactive: tabList.items.filter(tab => !tab.isActive).length
  })
});
```

## Caching Strategy

### Query Caching
- **Individual Tabs**: Cached by ID with authentication token isolation
- **Tab Lists**: Cached with serialized parameters for different views
- **Authentication-Aware**: All caches are isolated per user token

### Cache Invalidation
- **Create Operations**: Invalidates tab list and optionally closed tab
- **Update Operations**: Invalidates specific tab and tab list
- **Close Operations**: Invalidates affected tab(s) and tab list
- **Error Recovery**: Failed create operations still invalidate cache for consistency

### Cache Optimization
```typescript
// The tabMutationBuilder provides consistent invalidation
const tabMutationBuilder = (action, mutationFn) => {
  return (options) => {
    return useMutation({
      mutationFn,
      onSuccess: (result) => {
        // Invalidate specific tabs
        const tabIds = Array.isArray(result) ? result.map(t => t.id) : [result.id];
        Promise.all([
          ...tabIds.map(id => 
            queryClient.invalidateQueries({
              queryKey: [...queryKeys.tabs.getById._def, id]
            })
          ),
          // Invalidate all tab lists
          queryClient.invalidateQueries({
            queryKey: queryKeys.tabs.getList._def
          })
        ]);
      }
    });
  };
};
```

## Error Handling

Errors are handled through TanStack Query's standard error boundary pattern:

```typescript
// Service errors are automatically caught and propagated
const { data, error, isError } = useTabById(tabId);

// Mutation error handling
const createTab = useCreateTab({
  onError: (error, variables, context) => {
    // Custom error handling
    console.error('Failed to create tab:', error);
    
    // Cache is still invalidated for consistency
  }
});

// Global error boundary integration
function TabsErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={({ error }) => <TabsErrorView error={error} />}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## Related Services

### TabsService Integration
```typescript
// Service methods called by hooks
TabsService.getById(id, signal)      // useTabById
TabsService.getList(params, signal)  // useTabs  
TabsService.create(tabDto)           // useCreateTab
TabsService.update(updateDto)        // useUpdateTab
TabsService.close(tabId)             // useCloseTab
TabsService.closeBatch(tabIds)       // useCloseTabBatch
```

### Authentication Context
- All hooks use `useAccessToken()` for authentication state
- Queries are automatically disabled when `!isAuthorizedAndVerified`
- Query keys include token for proper cache isolation

## Best Practices

### 1. Authentication Handling
```typescript
// ✅ Good: Hooks automatically handle authentication
const { data: tabs } = useTabs();

// ❌ Avoid: Manual authentication checks
const { isAuthorizedAndVerified } = useAccessToken();
const { data: tabs } = useTabs({}, {
  enabled: isAuthorizedAndVerified // Already handled internally
});
```

### 2. Optimistic Updates
```typescript
// ✅ Good: Let mutations handle cache invalidation
const closeTab = useCloseTab({
  onSuccess: () => {
    // Additional UI updates only
    toast.success('Tab closed');
  }
});
```

### 3. Error Recovery
```typescript
// ✅ Good: Custom error handling with fallback
const createTab = useCreateTab({
  onError: (error) => {
    toast.error('Failed to create tab');
    // Cache invalidation still happens automatically
  }
});
```

### 4. Selector Usage
```typescript
// ✅ Good: Use selectors for performance optimization
const { data: activeTabCount } = useTabs(params, {
  select: (tabList) => tabList.items.filter(tab => tab.isActive).length
});

// ✅ Good: Transform data shape for components
const { data: tabOptions } = useTabs(params, {
  select: (tabList) => tabList.items.map(tab => ({
    value: tab.id,
    label: tab.title
  }))
});
```