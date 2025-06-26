# SearchRefetchButton Component

## Purpose

The `SearchRefetchButton` is a specialized UI component designed for triggering search refetch operations within the smart search input system. It provides visual feedback during loading states with a spinning animation and maintains consistent styling with the application's design system.

## Component Type

**Client Component** - Uses the `'use client'` directive because it handles interactive button events and manages visual state transitions that require client-side rendering.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isLoading` | `boolean` | Optional | `false` | Controls the loading state, enabling spin animation and disabling interactions |
| `...rest` | `HTMLAttributes<HTMLButtonElement>` | Optional | - | All standard HTML button attributes (onClick, disabled, etc.) |

## Usage Example

```tsx
import { SearchRefetchButton } from '@/components/search/smart-search-input/search-refetch-button';

// Basic usage
function SearchInterface() {
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefetch = async () => {
    setIsRefetching(true);
    try {
      await refetchSearchResults();
    } finally {
      setIsRefetching(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <SearchInput />
      <SearchRefetchButton 
        isLoading={isRefetching}
        onClick={handleRefetch}
      />
    </div>
  );
}

// With TanStack Query integration
function SmartSearchInterface() {
  const { refetch, isRefetching } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: fetchSearchResults,
  });

  return (
    <SearchRefetchButton 
      isLoading={isRefetching}
      onClick={() => refetch()}
      aria-label="Refresh search results"
    />
  );
}
```

## Functionality

- **Interactive Button**: Renders a circular button with hover effects and proper accessibility
- **Loading State Management**: Displays spinning animation and disables interaction during loading
- **Visual Feedback**: Provides clear visual cues for user actions through animations and state changes
- **Flexible Integration**: Accepts all standard button props for seamless integration

## State Management

**Local State Only** - This component is stateless and relies on props for state management. It expects parent components to handle:
- Loading state tracking
- Click event handling
- Integration with TanStack Query for server state management

## Side Effects

**None** - This is a pure presentational component with no side effects. All actions are delegated to parent components through event handlers.

## Dependencies

### Internal Dependencies
- `@/components/icons` - Uses `PiRefreshLine` icon for the refresh visual
- `@/lib/utils/cn` - Utility for conditional className management

### External Dependencies
- `react` - Uses `HTMLAttributes` type for prop extension

## Integration

The `SearchRefetchButton` integrates into the smart search input ecosystem as a companion component:

```
smart-search-input/
├── search-refetch-button.tsx    # This component
├── search-input.tsx             # Main search input
└── search-suggestions.tsx       # Search suggestions dropdown
```

**Typical Integration Pattern**:
```tsx
function SmartSearchInput() {
  const { data, refetch, isRefetching } = useSearchQuery(searchTerm);

  return (
    <div className="search-container">
      <SearchInput onSearch={setSearchTerm} />
      <SearchRefetchButton 
        isLoading={isRefetching}
        onClick={() => refetch()}
      />
      <SearchSuggestions data={data} />
    </div>
  );
}
```

## Best Practices

### ✅ Architecture Adherence
- **Client Component Usage**: Correctly uses `'use client'` for interactive functionality
- **Component Decomposition**: Small, focused component following the "Lego block" principle
- **Reusability**: Generic enough for use across different search contexts
- **Props Pattern**: Extends HTML attributes following established patterns

### ✅ Recommended Usage Patterns
```tsx
// Good: Clear loading state management
<SearchRefetchButton 
  isLoading={isRefetching}
  onClick={handleRefetch}
  aria-label="Refresh search results"
/>

// Good: Integration with TanStack Query
const { refetch, isRefetching } = useQuery(queryConfig);
<SearchRefetchButton 
  isLoading={isRefetching}
  onClick={() => refetch()}
/>
```

### ⚠️ Integration Notes
- Always provide an `onClick` handler - the component doesn't perform refetch operations internally
- Use `isLoading` prop to prevent multiple simultaneous requests
- Consider adding `aria-label` for accessibility when the button context isn't obvious
- Parent components should handle error states and user feedback beyond the loading animation