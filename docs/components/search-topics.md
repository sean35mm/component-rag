# SearchTopics Component

## Purpose

The `SearchTopics` component provides a searchable, filterable interface for selecting topics within a search drawer. It displays predefined default topics and allows users to search for additional topics, enabling dynamic filtering with real-time API queries. The component integrates with authentication to show appropriate topic data based on user access levels.

## Component Type

**Client Component** - Uses the `'use client'` directive for state management, user interactions, form handling, and real-time search functionality. Requires client-side state for search input, topic selection, and animated transitions.

## Props Interface

### SearchTopics Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of currently selected topic names |
| `onActiveChange` | `(items: Set<string>) => void` | Yes | Callback when selected topics change |

### Internal Component Props

#### TopicCheckboxInternalProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Topic name identifier |
| `onCheckedChange` | `(name: string, checked: boolean) => void` | Yes | Callback for checkbox state changes |
| `...other` | `Omit<FiltersDrawerCheckboxProps, 'onCheckedChange'>` | No | Other drawer checkbox props |

#### TopicsListProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of selected topic names |
| `defaultTopics` | `Set<string>` | Yes | Set of default topics to display |
| `search` | `string` | No | Current search query |
| `onCheckedChange` | `(domain: string, checked: boolean) => void` | Yes | Topic selection change handler |

## Usage Example

```tsx
import { useState } from 'react';
import { SearchTopics } from '@/components/search/smart-search-input/search-drawer/search-topics';

function SearchFilters() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(
    new Set(['AI', 'Cryptocurrency'])
  );

  const handleTopicsChange = (topics: Set<string>) => {
    setSelectedTopics(topics);
    // Apply topic filters to search results
    applyTopicFilters(Array.from(topics));
  };

  return (
    <div className="search-filters">
      <SearchTopics
        active={selectedTopics}
        onActiveChange={handleTopicsChange}
      />
    </div>
  );
}

// Usage in search drawer context
function SearchDrawer() {
  const [filters, setFilters] = useState({
    topics: new Set<string>(),
    // other filters...
  });

  return (
    <FiltersDrawer>
      <SearchTopics
        active={filters.topics}
        onActiveChange={(topics) => 
          setFilters(prev => ({ ...prev, topics }))
        }
      />
    </FiltersDrawer>
  );
}
```

## Functionality

### Core Features
- **Default Topics Display**: Shows predefined popular topics (Markets, AI, Cryptocurrency, etc.)
- **Real-time Search**: Searches topics via API with debounced queries
- **Multi-select Interface**: Checkbox-based selection with visual feedback
- **Authentication Integration**: Adapts topic data based on user authorization
- **Animated Transitions**: Smooth loading states and list transitions
- **Sticky Search**: Fixed search input for easy access while scrolling

### Search Modes
- **Default Mode**: Displays default topics with cached/suspended data loading
- **Search Mode**: Performs live API queries with loading indicators
- **Fallback Handling**: Graceful degradation for unauthorized users or failed requests

### Visual Features
- Counter badge showing number of selected topics
- Loading spinners during API requests
- Animated list transitions using Framer Motion
- Sticky search input with proper z-indexing

## State Management

### Local State (useState)
- **Search Query**: Controls the search input value and triggers API calls
- **Selection State**: Managed via props but internally handles Set operations

### TanStack Query Integration
- **useTopics**: Fetches filtered topics based on search query
- **useTopicByNameSuspense**: Loads individual topic details with Suspense
- **Conditional Queries**: Enabled only when search term exists
- **Data Selection**: Transforms API response to extract topic data array

### State Flow
```typescript
// Search input change
handleSearchChange → setSearch → useTopics query

// Topic selection change  
handleItemChange → Set manipulation → onActiveChange callback

// Default topics loading
Suspense boundary → useTopicByNameSuspense → TopicCheckboxBase
```

## Side Effects

### API Interactions
- **Topic Search**: `GET /topics?name={search}` when search query exists
- **Individual Topic Fetch**: Loads topic details for default topics
- **Conditional Loading**: Respects authentication state for API calls

### Performance Optimizations
- **Enabled Queries**: Only searches when search term provided
- **Suspense Boundaries**: Prevents blocking UI during individual topic loads
- **Memoized Arrays**: Prevents unnecessary re-renders of default topics list

## Dependencies

### UI Components
- `FiltersDrawerAccordionItem`: Container with collapsible interface
- `FiltersDrawerCheckbox`: Styled checkbox component
- `MenuSearchInput`: Search input with consistent styling

### Hooks & Context
- `useAccessToken`: Authentication and authorization state
- `useTopics`: Topic search query hook
- `useTopicByNameSuspense`: Individual topic data loading
- `useCallback`, `useMemo`: Performance optimizations

### External Libraries
- **Framer Motion**: Animation and transition effects
- **React Icons**: PiHashtag and PiLoader5Line icons

### Types
- `AccessToken`, `Topic`: Core data type definitions
- `FiltersDrawerCheckboxProps`: UI component prop types

## Integration

### Search Architecture
```
SearchDrawer
├── SearchTopics (topic filtering)
├── Other filter components
└── Search results integration
```

### Data Flow
```
User Input → Local State → TanStack Query → API → UI Update → Parent Callback
```

### Authentication Integration
- Adapts query behavior based on `isAuthorizedAndVerified` and `isPublic`
- Falls back to basic display for unauthorized users
- Passes access token to authenticated queries

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Properly uses client-side for interactive features
- ✅ **Component Decomposition**: Well-structured with logical sub-components
- ✅ **TanStack Query**: Appropriate use for server state management
- ✅ **Performance**: Memoization and conditional queries implemented

### Code Quality
- **Error Boundaries**: Suspense fallbacks for graceful error handling
- **Type Safety**: Comprehensive TypeScript interfaces
- **Accessibility**: Screen reader support and semantic HTML
- **Separation of Concerns**: Clear distinction between data fetching and UI logic

### Reusability Patterns
- Generic topic selection interface that could be extracted
- Configurable default topics via exported constant
- Flexible callback pattern for parent state management
- Consistent with other filter drawer components