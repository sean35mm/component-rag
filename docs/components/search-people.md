# SearchPeople Component

## Purpose

The `SearchPeople` component provides a searchable filter interface for selecting people (public figures, executives, etc.) within a search drawer. It combines a default list of notable people with real-time search functionality, allowing users to filter content by specific individuals. The component handles both authenticated and public access scenarios with appropriate fallbacks.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through:
- Interactive state management (`useState` for search input)
- Event handlers for user interactions
- Real-time search functionality
- Checkbox selection state management

## Props Interface

### SearchPeople Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of currently selected people Wikidata IDs |
| `onActiveChange` | `(items: Set<string>) => void` | Yes | Callback fired when selection changes |

### Internal Component Props

#### PeopleCheckboxInternalProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `wikidataId` | `string` | Yes | Wikidata identifier for the person |
| `onCheckedChange` | `(wikidataId: string, checked: boolean) => void` | Yes | Callback for checkbox state changes |

#### PeopleListProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of active selections |
| `defaultPeople` | `Set<string>` | Yes | Set of default people to display |
| `search` | `string` | No | Search query string |
| `onCheckedChange` | `(domain: string, checked: boolean) => void` | Yes | Selection change handler |

## Usage Example

```tsx
import { useState } from 'react';
import { SearchPeople } from '@/components/search/smart-search-input/search-drawer/search-people';

export default function SearchFilters() {
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set());

  return (
    <div className="search-filters">
      <SearchPeople
        active={selectedPeople}
        onActiveChange={setSelectedPeople}
      />
    </div>
  );
}

// Usage in search context
export function SearchDrawer() {
  const [peopleFilters, setPeopleFilters] = useState<Set<string>>(new Set());

  const handleApplyFilters = () => {
    // Apply filters to search results
    console.log('Selected people:', Array.from(peopleFilters));
  };

  return (
    <div>
      <SearchPeople
        active={peopleFilters}
        onActiveChange={setPeopleFilters}
      />
      <button onClick={handleApplyFilters}>
        Apply Filters ({peopleFilters.size})
      </button>
    </div>
  );
}
```

## Functionality

### Core Features

1. **Default People List**: Displays curated list of notable figures (Tim Cook, Jeff Bezos, etc.)
2. **Real-time Search**: Live search functionality with API integration
3. **Selection Management**: Multi-select checkbox interface with Set-based state
4. **Accordion Interface**: Collapsible section with counter badge
5. **Loading States**: Animated loading indicators during API calls
6. **Fallback Handling**: Graceful degradation for failed data loads
7. **Access Control**: Different behavior for authenticated vs. public users

### Search Behavior

- **Default View**: Shows predefined list of notable people
- **Search Mode**: Switches to API-driven search results
- **Empty States**: Handles no results gracefully
- **Debouncing**: Managed by TanStack Query for efficient API calls

### Visual Features

- **Animated Transitions**: Framer Motion animations for state changes
- **People Citations**: Rich display with avatars and descriptions
- **Counter Badge**: Shows number of selected items
- **Sticky Search**: Search input remains visible during scroll

## State Management

### Local State (useState)
- **Search Query**: `search` state for input value
- **Selection State**: Managed via parent component's `active` Set

### TanStack Query Integration
- **People Search**: `usePeoples` hook for search API calls
- **People Details**: `usePeopleByWikidataIdSuspense` for individual person data
- **Caching**: Automatic query caching and background updates
- **Optimistic Updates**: Immediate UI feedback with server sync

### State Flow
```tsx
// Parent manages selection state
const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set());

// Component manages search state internally
const [search, setSearch] = useState('');

// TanStack Query manages server state
const { data: people, isFetching } = usePeoples({ prefixQ: search });
```

## Side Effects

### API Interactions
1. **People Search API**: Triggered by search input changes
2. **Individual Person Lookup**: Fetches detailed person information
3. **Access Token Validation**: Checks authentication status

### Performance Optimizations
- **Conditional Rendering**: Only renders search results when needed
- **Suspense Boundaries**: Prevents blocking UI during data fetching
- **Memoization**: `useMemo` for expensive computations

## Dependencies

### External Libraries
- **Framer Motion**: Animation and transitions
- **React**: Core functionality and hooks

### Internal Dependencies
- **UI Components**: `FiltersDrawerAccordionItem`, `FiltersDrawerCheckbox`, `MenuSearchInput`
- **Citation Components**: `PeopleCitationItemBase`, `PeopleCitationItemFallback`
- **Query Hooks**: `usePeoples`, `usePeopleByWikidataIdSuspense`
- **Context Hooks**: `useAccessToken`
- **Icons**: `PiGroupLine`, `PiLoader5Line`

### Type Dependencies
- **Types**: `AccessToken`, `Person` from `@/lib/types`

## Integration

### Search Architecture
```
SearchDrawer
├── SearchPeople (this component)
│   ├── PeopleList
│   │   ├── PeopleCheckboxSuspense
│   │   ├── PeopleCheckboxBase
│   │   └── PeopleCheckboxFallback
│   └── MenuSearchInput
└── Other filter components
```

### Data Flow
1. **User Input**: Search or selection changes
2. **Local State**: Updates search/selection state
3. **API Calls**: TanStack Query fetches data
4. **UI Updates**: Animated transitions show results
5. **Parent Notification**: Selection changes propagate up

### Authentication Integration
- **Public Users**: Limited to fallback display
- **Authenticated Users**: Full API integration with Suspense
- **Token Management**: Automatic token handling via context

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: Well-structured hierarchy with single responsibilities
- `SearchPeople` (main interface)
- `PeopleList` (list management)
- `PeopleCheckbox*` (item rendering variants)

✅ **State Management**: Proper separation of concerns
- TanStack Query for server state
- Local state for UI interactions
- Parent component for business logic state

✅ **Error Handling**: Comprehensive fallback strategy
- Fallback components for failed loads
- Graceful degradation for unauthenticated users
- Loading states for better UX

✅ **Performance**: Optimized rendering patterns
- Conditional API calls (`enabled: !!search`)
- Memoized expensive computations
- Suspense boundaries prevent blocking

### Code Quality
- **TypeScript**: Comprehensive type safety
- **Accessibility**: Screen reader support with `sr-only` labels
- **Reusability**: Modular component design
- **Maintainability**: Clear separation between presentation and logic

### Integration Patterns
- **Composable**: Works within accordion/drawer systems
- **Flexible**: Supports both default and search modes
- **Responsive**: Handles different authentication states
- **Consistent**: Follows established UI patterns