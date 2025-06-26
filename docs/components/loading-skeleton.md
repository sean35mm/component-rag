# LoadingSkeleton Component

## Purpose

The `LoadingSkeleton` component provides a visual placeholder for loading states within the omnibar selector menu. It renders a configurable number of skeleton elements to match the expected content structure, improving perceived performance and user experience during data fetching operations.

## Component Type

**Server Component** - This is a presentational component that doesn't require client-side interactivity, browser APIs, or event handlers. It renders static skeleton elements based on props, making it suitable as a server component for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `number` | No | `5` | Number of skeleton items to render in the loading state |

## Usage Example

```tsx
import { LoadingSkeleton } from '@/components/omnibar/selector-menu/loading-skeleton';

// Basic usage with default 5 items
function SelectorMenu() {
  const { data, isLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: fetchMenuItems,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {data?.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// Custom number of skeleton items
function CustomLoadingMenu() {
  return <LoadingSkeleton items={3} />;
}

// Conditional rendering in omnibar context
function OmnibarContent() {
  const { isSearching, results } = useOmnibarState();

  return (
    <div>
      {isSearching ? (
        <LoadingSkeleton items={8} />
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}
```

## Functionality

- **Configurable Item Count**: Renders a customizable number of skeleton placeholders
- **Consistent Styling**: Uses shared `listContainer` styles for visual consistency with actual menu content
- **Responsive Layout**: Skeleton items adapt to container width with proper spacing
- **Performance Optimized**: Minimal rendering overhead with efficient key generation

## State Management

**No State Management** - This is a pure presentational component that doesn't manage any internal state. It receives configuration through props and renders accordingly. Any loading states are managed by parent components using TanStack Query or other state management solutions.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component that displays skeleton placeholders based on the provided props.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Base skeleton component for individual placeholder elements
- `./common` - Shared styling utilities (`listContainer`) for consistent layout

### External Dependencies
- **React** - Core framework for component rendering
- **Class Variance Authority (CVA)** - Indirectly through `listContainer` utility

## Integration

The `LoadingSkeleton` component integrates into the omnibar selector menu architecture as follows:

```
Omnibar
├── SelectorMenu
    ├── LoadingSkeleton (this component)
    ├── MenuItems
    └── EmptyState
```

**Integration Patterns:**
- Used as a fallback component during TanStack Query loading states
- Seamlessly replaces actual menu content with matching visual structure
- Maintains consistent spacing and layout with `listContainer` utility
- Supports dynamic item counts to match expected content volume

## Best Practices

✅ **Follows Architecture Guidelines:**
- **Server Component**: Correctly implemented as server component for static content
- **Component Decomposition**: Simple, focused component with single responsibility
- **Reusability**: Generic enough for use across different loading scenarios
- **Flat Structure**: No unnecessary nesting, clean component hierarchy

✅ **Implementation Best Practices:**
- Uses shared styling utilities for consistency
- Configurable props with sensible defaults
- Efficient rendering with proper React keys
- No unnecessary complexity or state management

✅ **Usage Recommendations:**
- Match skeleton item count to expected content for better UX
- Use in conjunction with TanStack Query loading states
- Maintain consistent gap spacing with actual content
- Consider skeleton item height matching real content dimensions