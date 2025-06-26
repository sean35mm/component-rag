# SourceFilter Component Documentation

## Purpose

The `SourceFilter` component provides a filterable interface for selecting news sources within a filters drawer. It displays a list of default news sources and allows users to search for additional sources, with the ability to both include and exclude specific domains from search results.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it manages interactive state including search input, checkbox selections, and real-time filtering with animations.

## Props Interface

### SourceFilterProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | ✅ | Set of currently selected source domains |
| `onActiveChange` | `(items: Set<string>) => void` | ✅ | Callback fired when active sources change |
| `excludedItems` | `ExcludedFilterItem[]` | ✅ | Array of excluded filter items |
| `onExcludedItemsChange` | `(items: ExcludedFilterItem[]) => void` | ✅ | Callback fired when excluded items change |

### Internal Component Props

#### SourceCheckboxInternalProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | `string` | ✅ | Source domain identifier |
| `onCheckedChange` | `(domain: string, checked: boolean) => void` | ✅ | Callback for checkbox state changes |
| `onExclusionChange` | `(domain: string, excluded: boolean) => void` | ❌ | Callback for exclusion state changes |

## Usage Example

```tsx
import { useState } from 'react';
import { SourceFilter } from '@/components/filters/filters-drawer/source-filter';
import { ExcludedFilterItem } from '@/lib/types';

function FiltersDrawer() {
  const [activeSources, setActiveSources] = useState<Set<string>>(
    new Set(['bbc.com', 'theguardian.com'])
  );
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);

  return (
    <div className="filters-drawer">
      <SourceFilter
        active={activeSources}
        onActiveChange={setActiveSources}
        excludedItems={excludedItems}
        onExcludedItemsChange={setExcludedItems}
      />
    </div>
  );
}
```

## Functionality

### Core Features

- **Default Sources Display**: Shows a curated list of popular news sources
- **Search Functionality**: Real-time search for sources by name or domain
- **Dual Selection Mode**: Support for both inclusion and exclusion of sources
- **Progressive Enhancement**: Graceful fallback when source data is unavailable
- **Suspense Integration**: Async loading of source metadata with fallbacks
- **Animated Transitions**: Smooth state transitions using Framer Motion

### Key Behaviors

1. **Search-Based Filtering**: When search input has value, displays filtered results
2. **Default List**: Shows predefined popular sources when no search is active
3. **Checkbox State Management**: Tracks both selected and excluded sources
4. **Loading States**: Displays spinner during async operations
5. **Authorization Handling**: Adapts behavior based on user authentication status

## State Management

### Local State
- **Search Input**: Managed with `useState` for real-time filtering
- **Set Operations**: Immutable set operations for active source management

### Server State (TanStack Query)
- **`useSourceByDomainSuspense`**: Fetches individual source metadata
- **`useSourcesByNameOrDomain`**: Handles search-based source queries
- **Suspense Integration**: Async data loading with fallback components

### External State
- **Active Sources**: Managed by parent component via props
- **Excluded Items**: Filter exclusion state managed externally

## Side Effects

### API Interactions
- **Source Metadata Fetching**: Retrieves source details (name, domain, branding)
- **Search Queries**: Real-time source search with debouncing via TanStack Query
- **Conditional Requests**: Authorization-based query enabling/disabling

### DOM Effects
- **Sticky Search Bar**: Maintains search input visibility during scroll
- **Animation Triggers**: Framer Motion animations on state changes

## Dependencies

### UI Components
- `FiltersDrawerAccordionItem`: Container for the filter section
- `FiltersDrawerCheckbox`: Individual source selection component
- `MenuSearchInput`: Search input component
- `SourceCitationItem`: Source icon/branding display

### Data Layer
- `useAccessToken`: Authentication context hook
- `useSourceByDomainSuspense`: Individual source data fetching
- `useSourcesByNameOrDomain`: Search-based source queries

### External Libraries
- `framer-motion`: Animation and transitions
- `@/components/icons`: Icon components (PiGlobalLine, PiLoader5Line)

## Integration

### Application Architecture
- **Filters System**: Core component of the application's filtering interface
- **Search Integration**: Connects to source search API endpoints
- **Authentication Flow**: Respects user authorization for enhanced features
- **State Coordination**: Integrates with parent filter management system

### Data Flow
1. Parent component manages active sources and exclusions
2. Component handles search and UI interactions
3. TanStack Query manages server state and caching
4. Callbacks update parent state for persistence

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Avoids deep nesting with focused sub-components
- ✅ **Separation of Concerns**: Clear separation between UI, data, and business logic
- ✅ **Reusable Components**: Leverages shared UI components from `/ui/` directory
- ✅ **Server State Management**: Proper use of TanStack Query for API interactions

### Implementation Excellence
- **Suspense Patterns**: Proper async component structure with fallbacks
- **Accessibility**: Screen reader support and semantic HTML structure
- **Performance**: Efficient set operations and memoized computations
- **Error Handling**: Graceful degradation when source data is unavailable
- **Type Safety**: Comprehensive TypeScript interfaces for all props and state

### State Management Best Practices
- **Controlled Components**: All state changes flow through parent callbacks
- **Immutable Updates**: Set operations maintain immutability
- **Optimistic Updates**: Immediate UI feedback with server state synchronization