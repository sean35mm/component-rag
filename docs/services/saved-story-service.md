# SavedStoryService

A focused CRUD service for managing saved stories, following our service architecture patterns for clean separation between API operations and query handling.

## Purpose

The `SavedStoryService` provides direct API access for saved story management operations including:
- Retrieving paginated lists of saved stories with optional filtering
- Fetching individual saved stories by ID
- Creating new saved story entries
- Updating existing saved stories
- Deleting saved stories

This service handles raw API communication without error handling or data transformation, delegating those responsibilities to the query layer.

## Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `getList` | `params: GetSavedStoriesListParams`, `signal: AbortSignal` | `Promise<CustomSearchResult<SavedStory>>` | Retrieves paginated list of saved stories |
| `getById` | `id: string`, `signal: AbortSignal` | `Promise<SavedStory>` | Fetches a specific saved story by ID |
| `create` | `dto: CreateSavedStoryDto`, `signal?: AbortSignal` | `Promise<SavedStory>` | Creates a new saved story |
| `update` | `data: { id: string; dto: UpdateSavedStoryDto }`, `signal?: AbortSignal` | `Promise<SavedStory>` | Updates an existing saved story |
| `delete` | `id: string`, `signal?: AbortSignal` | `Promise<SavedStory>` | Deletes a saved story and returns the deleted entity |

## Authentication

This service uses the `PrivateApiServiceWrapper` which automatically handles:
- **Authentication required**: All endpoints require valid user credentials
- **Automatic credential injection**: User tokens are automatically included in requests
- **Session management**: Handles token refresh and authentication state

No manual credential handling is required when using this service.

## Error Handling

Following our service architecture patterns:
- **No internal error handling**: Service methods throw raw HTTP exceptions
- **HttpException pattern**: Non-2xx responses are thrown as HttpException instances
- **Query layer responsibility**: Error handling, retry logic, and user feedback are managed by TanStack Query hooks
- **AbortSignal support**: All methods support request cancellation through AbortSignal

## Usage Examples

### Basic CRUD Operations

```typescript
// Get paginated list of saved stories
const savedStories = await SavedStoryService.getList(
  {
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    folderIsNull: true
  },
  signal
);

// Get specific saved story
const savedStory = await SavedStoryService.getById('story-123', signal);

// Create new saved story
const newSavedStory = await SavedStoryService.create(
  {
    storyId: 'story-456',
    folderId: 'folder-789',
    notes: 'Interesting article about technology'
  },
  signal
);

// Update saved story
const updatedSavedStory = await SavedStoryService.update(
  {
    id: 'saved-story-123',
    dto: {
      notes: 'Updated notes',
      folderId: 'new-folder-456'
    }
  },
  signal
);

// Delete saved story
const deletedSavedStory = await SavedStoryService.delete('saved-story-123', signal);
```

### Advanced Filtering and Pagination

```typescript
// Get saved stories not in any folder
const unorganizedStories = await SavedStoryService.getList(
  {
    page: 1,
    limit: 50,
    folderIsNull: true,
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  },
  signal
);

// Get saved stories with custom sorting
const recentStories = await SavedStoryService.getList(
  {
    page: 2,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  signal
);
```

## Related Types

### Core Interfaces

```typescript
// Service-specific parameter interface
interface GetSavedStoriesListParams extends PaginationSort<SavedStory> {
  folderIsNull?: boolean;
}

// Core entity type
interface SavedStory {
  id: string;
  storyId: string;
  folderId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Response wrapper for paginated results
interface CustomSearchResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
}
```

### DTO Types

```typescript
// Creation payload
interface CreateSavedStoryDto {
  storyId: string;
  folderId?: string;
  notes?: string;
}

// Update payload
interface UpdateSavedStoryDto {
  folderId?: string;
  notes?: string;
}
```

### Utility Types

```typescript
// Pagination and sorting base interface
interface PaginationSort<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}
```

## Dependencies

- **PrivateApiServiceWrapper**: Provides authenticated API client with automatic credential management
- **@/lib/dto**: DTO types for request payloads (`CreateSavedStoryDto`, `UpdateSavedStoryDto`)
- **@/lib/types**: Core domain types (`SavedStory`, `CustomSearchResult`, `PaginationSort`)

## Integration

### TanStack Query Hook Integration

```typescript
// Query hook example
const useSavedStories = (params: GetSavedStoriesListParams) => {
  return useQuery({
    queryKey: ['savedStories', params],
    queryFn: ({ signal }) => SavedStoryService.getList(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation hook example
const useCreateSavedStory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (dto: CreateSavedStoryDto) => 
      SavedStoryService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedStories'] });
    },
  });
};
```

### Service Layer Integration

```typescript
// The service integrates seamlessly with our query architecture
const { data: savedStories, isLoading, error } = useSavedStories({
  page: 1,
  limit: 20,
  folderIsNull: true
});

// Error handling is managed by the query layer
if (error) {
  // Handle HttpException thrown by service
  console.error('Failed to fetch saved stories:', error.message);
}
```

## Best Practices

### ✅ Correct Usage

```typescript
// Clean separation of concerns
const savedStory = await SavedStoryService.getById(id, signal);
// Let query hooks handle errors, caching, and state management

// Proper AbortSignal usage
const controller = new AbortController();
const result = await SavedStoryService.getList(params, controller.signal);
```

### ❌ Anti-patterns

```typescript
// DON'T: Handle errors in service layer
try {
  const result = await SavedStoryService.getById(id, signal);
} catch (error) {
  // Error handling belongs in query hooks
}

// DON'T: Transform data in service
const transformedResult = await SavedStoryService.getList(params, signal)
  .then(data => data.map(transform)); // Transform in query hooks instead
```

### Architecture Adherence

- **✅ Simple, focused methods**: Each method has a single responsibility
- **✅ No error handling**: Raw exceptions are thrown for query layer handling
- **✅ No data transformation**: Returns raw API responses
- **✅ Proper credential management**: Uses PrivateApiServiceWrapper for authentication
- **✅ HttpException pattern**: Consistent error throwing for non-2xx responses
- **✅ AbortSignal support**: All methods support request cancellation

This service exemplifies our architecture patterns by maintaining clean separation between API operations and application logic, enabling the query layer to handle caching, error states, and data transformations effectively.