# EnhanceQueryButton Component

## Purpose

The `EnhanceQueryButton` component provides AI-powered query enhancement functionality for signal creation. It allows users to iteratively improve their search queries by fetching and applying intelligent suggestions, cycling through multiple enhancement options to help users create more effective signals.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied) because it:
- Manages complex local state with hooks (`useState`, `useEffect`, `useCallback`)
- Handles user interactions and click events
- Integrates with Zustand store for real-time state updates
- Requires interactive behavior for query enhancement cycling

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props and derives all data from the global store |

## Usage Example

```tsx
import { EnhanceQueryButton } from '@/components/signals/creation/search-enhance-query/enhance-query-button';

function SearchQueryForm() {
  return (
    <div className="flex items-center gap-2">
      <input 
        type="text" 
        placeholder="Enter your search query..." 
        className="flex-1"
      />
      <EnhanceQueryButton />
    </div>
  );
}

// In a signal creation flow
function CreateSignalPage() {
  return (
    <div className="space-y-4">
      <h2>Create Signal</h2>
      <div className="query-section">
        <label>Search Query</label>
        <div className="flex gap-2">
          <textarea placeholder="Describe what you're looking for..." />
          <EnhanceQueryButton />
        </div>
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Query Enhancement**: Fetches AI-generated suggestions to improve user queries
- **Iterative Improvement**: Cycles through multiple suggestion options on repeated clicks
- **Smart State Management**: Tracks applied suggestions and manages enhancement flow
- **Loading States**: Provides visual feedback during suggestion fetching
- **Auto-application**: Automatically applies the first suggestion when new ones are fetched

### Behavior Flow
1. **Initial Click**: Triggers suggestion fetching for the current query
2. **Subsequent Clicks**: Cycles through available suggestions
3. **End of Cycle**: Re-fetches new suggestions based on the last applied suggestion
4. **State Reset**: Manages suggestion index and pending states appropriately

## State Management

### Zustand Store Integration
```tsx
// Global state from useCreateSignalStore
const query = useCreateSignalStore((state) => state.query);
const setQuery = useCreateSignalStore((state) => state.setQuery);
const setSuggestionsQuery = useCreateSignalStore((state) => state.setSuggestionsQuery);
const suggestionsQuery = useCreateSignalStore((state) => state.suggestionsQuery);
```

### Local State Management
```tsx
const [isPendingUpdate, setIsPendingUpdate] = useState(false);
const [currentAppliedSuggestionIndex, setCurrentAppliedSuggestionIndex] = useState<null | number>(null);
```

### TanStack Query Integration
- Uses `useSignalQuerySuggestions` hook for server state management
- Handles loading states and data fetching automatically
- Enables conditional fetching based on `suggestionsQuery` presence

## Side Effects

### API Interactions
- **Query Suggestions API**: Fetches enhancement suggestions via `useSignalQuerySuggestions`
- **Conditional Fetching**: Only triggers when `suggestionsQuery` is present

### State Synchronization
```tsx
useEffect(() => {
  if (isPendingUpdate && querySuggestions && querySuggestions.length > 0 && !isQuerySuggestionsFetching) {
    if (querySuggestions[0]) {
      setQuery(querySuggestions[0]);
    }
    setCurrentAppliedSuggestionIndex(0);
    setIsPendingUpdate(false);
  }
}, [isPendingUpdate, querySuggestions, isQuerySuggestionsFetching, setQuery]);
```

## Dependencies

### UI Components
- `Button` from `@/components/ui/button`
- `PiRefreshLine`, `PiShiningFill` from `@/components/icons`

### Hooks & Context
- `useCreateSignalStore` - Zustand store for signal creation state
- `useSignalQuerySuggestions` - TanStack Query hook for fetching suggestions

### React Hooks
- `useState` - Local state management
- `useEffect` - Side effect handling
- `useCallback` - Performance optimization
- `useMemo` - Computed values

## Integration

### Signal Creation Flow
The component integrates into the signal creation workflow by:
- **Reading Query State**: Accesses current query from global store
- **Enhancing Queries**: Provides AI-powered improvements to user input
- **Updating Global State**: Modifies query state that other components consume
- **Suggestion Management**: Maintains separate suggestion state for iteration

### Store Architecture
```tsx
// Store slice for query enhancement
interface CreateSignalStore {
  query: string;
  setQuery: (query: string) => void;
  suggestionsQuery: string | null;
  setSuggestionsQuery: (query: string) => void;
}
```

## Best Practices

### Architecture Adherence
- ✅ **State Management**: Properly uses Zustand for client state and TanStack Query for server state
- ✅ **Component Decomposition**: Single responsibility focused on query enhancement
- ✅ **Performance**: Uses `useCallback` and `useMemo` for optimization
- ✅ **UI Components**: Leverages reusable UI components from `/ui/` directory

### Code Quality
- **Error Boundaries**: Graceful handling of missing suggestions
- **Loading States**: Clear visual feedback during async operations
- **Disabled States**: Prevents interaction when inappropriate
- **Type Safety**: Proper TypeScript usage with nullable types

### User Experience
- **Progressive Enhancement**: Works iteratively to improve queries
- **Visual Feedback**: Shows loading spinners and appropriate icons
- **Intuitive Interaction**: Clear button labeling and state indication
- **Performance**: Optimized re-renders and API calls