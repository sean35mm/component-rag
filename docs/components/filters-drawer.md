# FiltersDrawerContainer Component

## Purpose

The `FiltersDrawerContainer` is a comprehensive client-side filtering interface that provides an overlay drawer for configuring content filters across multiple dimensions (sources, languages, locations, categories, etc.). It manages both transient filter states and persistent saved filter presets, allowing users to create complex filter combinations and save them for future use.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages extensive local state with multiple `useState` hooks
- Requires user interactions (form controls, button clicks)
- Uses browser-specific features like toast notifications
- Integrates with Zustand store for client-side state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onFiltersApply` | `(filters: FiltersState, isPresetApplied?: boolean) => void` | No | Callback fired when filters are applied, receives current filter state and preset flag |
| `onSelectedSavedFilterChange` | `(id: string \| null, savedFilter?: SavedFilter) => void` | No | Callback fired when saved filter selection changes, receives filter ID and data |

## Usage Example

```tsx
import { FiltersDrawerContainer } from '@/components/filters/filters-drawer';
import { FiltersState, SavedFilter } from '@/lib/types';

function ContentPage() {
  const handleFiltersApply = (filters: FiltersState, isPresetApplied?: boolean) => {
    console.log('Applying filters:', filters);
    if (isPresetApplied) {
      console.log('Applied from saved preset');
    }
    // Update content based on filters
    refetchContent(filters);
  };

  const handleSavedFilterChange = (id: string | null, savedFilter?: SavedFilter) => {
    if (savedFilter) {
      console.log('Selected saved filter:', savedFilter.name);
    } else {
      console.log('Cleared saved filter selection');
    }
  };

  return (
    <div>
      <FiltersDrawerContainer
        onFiltersApply={handleFiltersApply}
        onSelectedSavedFilterChange={handleSavedFilterChange}
      />
      {/* Rest of content */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Multi-dimensional Filtering**: Supports 9 different filter types (sources, languages, locations, categories, labels, journalists, exclusions, etc.)
- **Saved Filter Presets**: Create, select, and manage persistent filter configurations
- **Real-time Counter**: Shows total number of active filters
- **Undo Functionality**: Provides undo action via toast notification
- **Default Reset**: Restore to default filter state
- **Exclusion Management**: Handle excluded items across multiple filter types

### Filter Categories
- **Web & News Sources**: Source selection, source groups, source locations
- **Locale**: Language and geographic location filters
- **Content Details**: Labels, journalists, and content categories
- **Blocklist**: Exclusions and duplicate prevention

### User Interactions
- Apply filters with live counter feedback
- Save current filter state as named preset
- Select from existing saved filter presets
- Reset to default configuration
- Individual filter modifications with auto-deselection of presets

## State Management

### Zustand Store Integration
```tsx
// Primary store connection
const filtersDrawerStore = useFiltersDrawerStore();
```

**Store Dependencies**:
- `isOpen`: Drawer visibility state
- `filters`: Current applied filter state
- `defaultFilters`: Default filter configuration
- `selectedSavedFilterId`: Currently selected preset ID
- Actions: `onFiltersApply`, `onIsOpenChange`, `setSelectedSavedFilterId`

### Local State Management
Maintains 9 separate state variables for each filter type:
- `categories`, `excludedItems`, `labels`, `languages`
- `locations`, `noDuplicates`, `sources`, `sourceGroups`
- `sourceLocations`, `journalists`

### TanStack Query Integration
- `useSavedFilters`: Fetches user's saved filter presets
- `useCreateSavedFilter`: Mutation for creating new saved filters

## Side Effects

### State Synchronization
```tsx
// Syncs local state with store when drawer opens
useEffect(() => {
  setCategories(isFiltersOpen ? new Set(categoriesInStore) : new Set());
}, [isFiltersOpen, categoriesInStore]);
```

### Saved Filter Validation
```tsx
// Validates selected filter still exists
useEffect(() => {
  if (selectedSavedFilterId && savedFilters.length > 0) {
    // Clear selection if filter was deleted
  }
}, [selectedSavedFilterId, savedFilters]);
```

### API Interactions
- **Create Saved Filter**: POST request to persist filter configuration
- **Fetch Saved Filters**: GET request for user's saved presets
- **Toast Notifications**: Success/error feedback for user actions

## Dependencies

### UI Components
```tsx
import { FiltersDrawer, FiltersDrawerAccordion } from '@/components/ui/filters-drawer';
import { Button, Select, SheetContentDivider } from '@/components/ui/*';
```

### Filter Components
```tsx
// Individual filter type components
import {
  CategoryFilter, ExclusionsFilter, JournalistFilter,
  LabelFilter, LanguageFilter, LocationFilter,
  SourceFilter, SourceGroupFilter, SourceLocationFilter
} from './';
```

### Hooks & Utilities
```tsx
import { useFiltersDrawerStore, useAccessToken } from '@/lib/contexts';
import { useCreateSavedFilter, useSavedFilters } from '@/lib/query-hooks';
import { filtersToCounter, mapFiltersToSavedFilterQuery } from '@/lib/utils';
```

## Integration

### Application Architecture Role
- **Filter Management Hub**: Central component for all content filtering
- **State Bridge**: Connects UI interactions with application-wide filter state
- **Persistence Layer**: Manages saved filter presets for user convenience
- **Event Coordination**: Orchestrates filter changes across the application

### Store Integration Pattern
```tsx
// Follows Zustand selector pattern for performance
const isOpen = useFiltersDrawerStore(useCallback((store) => store.isOpen, []));
const setFilters = useFiltersDrawerStore(useCallback((store) => store.onFiltersApply, []));
```

### Parent Communication
```tsx
// Notifies parent components of filter changes
onFiltersApplyProps?.(localStateToFilters, isPresetApplied);
onSelectedSavedFilterChange?.(savedFilter.id, savedFilter);
```

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriate use of 'use client' for interactive functionality
- ✅ **Flat Structure**: Individual filter components composed at same level
- ✅ **Zustand Integration**: Proper store connection with memoized selectors
- ✅ **TanStack Query**: Server state management for saved filters

### Performance Optimizations
```tsx
// Memoized selectors prevent unnecessary re-renders
const onFiltersApply = useFiltersDrawerStore(
  useCallback((store) => store.onFiltersApply, [])
);

// Computed values memoized for performance
const counter = useMemo(() => filtersToCounter(localStateToFilters), [localStateToFilters]);
```

### State Management Best Practices
- **Local State**: Transient filter modifications
- **Store State**: Applied/committed filter state
- **Server State**: Persistent saved filter presets
- **Sync Strategy**: Clear separation between draft and applied states

### Error Handling
```tsx
try {
  await onCreateSavedFilter(savedFilterData);
  // Success handling
} catch (_error) {
  // Errors captured by ReactQueryClientProvider
}
```

The component exemplifies proper React architecture with clear separation of concerns, efficient state management, and comprehensive user experience features.