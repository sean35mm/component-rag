# ExcludedJournalistItem Component

## Purpose

The `ExcludedJournalistItem` component displays a journalist entry within an excluded filters list. It renders journalist information (name, title, avatar) and provides click handling for removing the exclusion filter. The component implements progressive enhancement by showing real journalist data when authorized or falling back to placeholder content when unauthorized.

## Component Type

**Client Component** - Uses the `'use client'` directive (inherited through context usage) because it:
- Consumes the `useAccessToken` context hook for authentication state
- Manages interactive click handlers for filter removal
- Implements Suspense boundaries for data fetching states

## Props Interface

### ExcludedJournalistItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The unique identifier of the journalist to display |
| `onClick` | `() => void` | Yes | Callback function triggered when the item is clicked (typically for removing the exclusion) |

### ExcludedJournalistItemSuspenseProps (Internal)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The unique identifier of the journalist |
| `onClick` | `() => void` | Yes | Click handler callback |
| `isAuthorizedAndVerified` | `boolean` | Yes | Whether the user is authorized and verified |
| `isPublic` | `boolean` | Yes | Whether the content is publicly accessible |
| `token` | `AccessToken \| undefined` | No | Access token for authenticated requests |

## Usage Example

```tsx
import { ExcludedJournalistItem } from '@/components/filters/filters-drawer/excluded-journalist-item';

function FiltersDrawer() {
  const excludedJournalists = ['journalist-1', 'journalist-2'];
  
  const handleRemoveJournalist = (journalistId: string) => {
    // Remove journalist from excluded filters
    setExcludedFilters(prev => 
      prev.filter(filter => filter.id !== journalistId)
    );
  };

  return (
    <div className="excluded-filters">
      {excludedJournalists.map(journalistId => (
        <ExcludedJournalistItem
          key={journalistId}
          id={journalistId}
          onClick={() => handleRemoveJournalist(journalistId)}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Conditional Rendering**: Shows full journalist data when authorized, placeholder when not
- **Progressive Loading**: Implements Suspense with fallback states for smooth UX
- **Avatar Display**: Renders journalist avatar with fallback to name initials
- **Interactive Removal**: Provides click handling for removing exclusion filters
- **Access Control**: Respects authentication and authorization states
- **Fallback States**: Graceful degradation when data is unavailable

## State Management

- **TanStack Query**: Uses `useJournalistByIdSuspense` for fetching journalist data with Suspense integration
- **Context State**: Consumes `useAccessToken` context for authentication state
- **No Local State**: Stateless component that relies on props and external state

## Side Effects

- **Data Fetching**: Automatically fetches journalist data when component mounts (if authorized)
- **Suspense Integration**: Triggers loading states during data fetching
- **Click Events**: Executes parent-provided onClick callbacks

## Dependencies

### Internal Dependencies
- `@/components/ui/avatar` - Avatar component for journalist profile pictures
- `@/lib/contexts` - Access token context for authentication
- `@/lib/query-hooks` - TanStack Query hooks for data fetching
- `@/lib/types` - TypeScript type definitions
- `./excluded-filter-item-base` - Base component for excluded filter items

### External Dependencies
- `react` - Suspense for loading states
- TanStack Query (via query hooks) - Server state management

## Integration

The component integrates into the filters system as part of the excluded filters drawer:

```
FiltersDrawer
├── ExcludedFiltersList
    ├── ExcludedJournalistItem (this component)
    ├── ExcludedSourceItem
    └── ExcludedTopicItem
```

It follows the established pattern for excluded filter items by:
- Extending `ExcludedFilterListItemBase` for consistent UI
- Implementing the same props interface as other excluded items
- Supporting the same interaction patterns (click to remove)

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Stacks cleanly with base component, flat structure
- ✅ **State Management**: Uses TanStack Query for server state, contexts for shared state
- ✅ **Reusability**: Follows domain-specific component pattern in filters module
- ✅ **Progressive Enhancement**: Graceful degradation based on authorization

### Implementation Patterns
- **Suspense Integration**: Proper use of React Suspense for data fetching states
- **Conditional Rendering**: Clean separation of authorized vs unauthorized states
- **Props Drilling**: Minimal props interface focused on essential data
- **Error Boundaries**: Relies on Suspense fallbacks for error states
- **Type Safety**: Full TypeScript coverage with proper interface definitions

### Export Strategy
```tsx
// Constants for reuse
export { EXCLUDED_JOURNALIST_ITEM_TITLE, EXCLUDED_JOURNALIST_ITEM_SUBTITLE };

// Testing components
export { ExcludedJournalistItemSuspense, ExcludedJournalistItemFallback };

// Main component
export { ExcludedJournalistItem };
```

The component exemplifies proper React patterns with Suspense, maintains consistency with the broader filters architecture, and provides a robust user experience across different authorization states.