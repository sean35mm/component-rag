# JournalistFilter Component Documentation

## Purpose

The `JournalistFilter` component provides a comprehensive filtering interface for selecting authors and journalists within a filters drawer. It supports real-time search functionality, displays journalist information with avatars, and manages the selection state of multiple journalists. The component is designed to be used within content filtering systems where users need to filter articles or content by specific creators.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it requires:
- Interactive state management for search and selection
- Event handlers for user interactions
- Real-time updates and animations
- Suspense boundaries for async data loading

## Props Interface

### JournalistFilter (Main Component)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of currently selected journalist IDs |
| `onActiveChange` | `(items: Set<string>) => void` | Yes | Callback function when selection changes |

### JournalistCheckboxInternalProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `journalistId` | `string` | Yes | Unique identifier for the journalist |
| `onCheckedChange` | `(name: string, checked: boolean) => void` | Yes | Callback when checkbox state changes |

### JournalistListProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of selected journalist IDs |
| `defaultJournalistsIds` | `Set<string>` | Yes | Set of default journalist IDs to display |
| `search` | `string` | No | Search query for filtering journalists |
| `onCheckedChange` | `(name: string, checked: boolean) => void` | Yes | Callback for checkbox changes |

## Usage Example

```tsx
import { useState } from 'react';
import { JournalistFilter } from '@/components/filters/filters-drawer/journalist-filter';

function ContentFilters() {
  const [selectedJournalists, setSelectedJournalists] = useState<Set<string>>(new Set());

  const handleJournalistChange = (journalists: Set<string>) => {
    setSelectedJournalists(journalists);
    // Apply filters to content
    applyContentFilters({ journalists: Array.from(journalists) });
  };

  return (
    <div className="filters-panel">
      <JournalistFilter
        active={selectedJournalists}
        onActiveChange={handleJournalistChange}
      />
    </div>
  );
}

// Usage in a form context
function AdvancedFiltersForm() {
  const [filters, setFilters] = useState({
    journalists: new Set<string>(),
    categories: new Set<string>(),
    dateRange: null,
  });

  return (
    <form>
      <JournalistFilter
        active={filters.journalists}
        onActiveChange={(journalists) => 
          setFilters(prev => ({ ...prev, journalists }))
        }
      />
    </form>
  );
}
```

## Functionality

### Core Features
- **Multi-select Interface**: Allows selection of multiple journalists via checkboxes
- **Real-time Search**: Filters journalists by name as user types
- **Lazy Loading**: Uses Suspense for efficient data loading
- **Fallback States**: Displays skeleton loading states while data loads
- **Avatar Display**: Shows journalist profile images with fallback to initials
- **Counter Badge**: Displays count of selected journalists
- **Accordion Layout**: Collapsible interface within filters drawer

### Search Behavior
- Debounced search input for performance
- Switches between default journalists and search results
- Loading states during search operations
- Empty state handling for no results

### Selection Management
- Maintains selection state using Set data structure
- Preserves selections when switching between search and default views
- Provides clear visual feedback for selected items

## State Management

### Local State (useState)
```tsx
const [search, setSearch] = useState(''); // Search query management
```

### TanStack Query Integration
```tsx
// Fetches journalists based on search query
const { data: journalists, isFetching } = useJournalists(
  { name: search },
  { enabled: !!search }
);

// Fetches individual journalist data with Suspense
const { data: journalist } = useJournalistByIdSuspense(
  journalistId,
  isAuthorizedAndVerified,
  isPublic,
  token
);
```

### Props-based State
- Selection state managed by parent component
- Follows controlled component pattern
- Uses Set for efficient membership testing

## Side Effects

### API Calls
- **Journalist Search**: Triggered by search input changes
- **Individual Journalist Fetch**: Loads journalist details for default list
- **Authorization-aware**: Adjusts queries based on user access level

### Performance Optimizations
- **Memoized Computations**: Uses `useMemo` for expensive operations
- **Callback Memoization**: Uses `useCallback` to prevent unnecessary re-renders
- **Suspense Boundaries**: Prevents blocking UI during data loading

## Dependencies

### UI Components
- `FiltersDrawerAccordionItem` - Container for the filter section
- `FiltersDrawerCheckbox` - Individual checkbox components
- `Avatar` - User profile image display
- `MenuSearchInput` - Search functionality
- `Skeleton` - Loading state placeholders

### Hooks & Contexts
- `useAccessToken` - Authentication and authorization context
- `useJournalists` - Query hook for journalist search
- `useJournalistByIdSuspense` - Individual journalist data fetching

### External Libraries
- `framer-motion` - Animations and transitions
- React `Suspense` - Async component loading

### Constants & Types
- `DEFAULT_JOURNALISTS` - Predefined journalist list
- `Journalist`, `AccessToken` - TypeScript interfaces

## Integration

### Filters Drawer Architecture
```tsx
<FiltersDrawer>
  <JournalistFilter active={journalists} onActiveChange={setJournalists} />
  <CategoryFilter active={categories} onActiveChange={setCategories} />
  <DateRangeFilter active={dateRange} onActiveChange={setDateRange} />
</FiltersDrawer>
```

### Content Filtering Pipeline
1. User selects journalists in filter
2. Selection state propagates to parent
3. Parent combines all filter states
4. Filters applied to content queries
5. UI updates with filtered results

### Authorization Integration
- Respects user access levels
- Adjusts available journalist data based on permissions
- Handles public vs. authenticated user scenarios

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Properly stacked components (Internal → Base → Suspense → List → Filter)
- ✅ **State Management**: Uses TanStack Query for server state, local state for UI interactions
- ✅ **Reusability**: Built on reusable UI components from `/ui/` directory
- ✅ **Performance**: Implements proper memoization and lazy loading patterns

### Code Quality
- **Type Safety**: Comprehensive TypeScript interfaces
- **Error Boundaries**: Graceful fallback handling
- **Accessibility**: Screen reader support and semantic HTML
- **Responsive Design**: Mobile-friendly interface

### Data Flow
- **Controlled Components**: Parent manages selection state
- **Unidirectional Data Flow**: Clear props down, events up pattern
- **Immutable Updates**: Uses Set operations for state changes
- **Optimistic Updates**: Immediate UI feedback before API responses