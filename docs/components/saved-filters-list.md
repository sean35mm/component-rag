# SavedFiltersList Component

## Purpose

The `SavedFiltersList` component provides a comprehensive interface for managing saved search filter presets in the application. It displays saved filters in a responsive table format with CRUD operations (Create, Read, Update, Delete) and allows users to apply, edit, duplicate, and manage their saved filter configurations.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages interactive state through Zustand stores
- Handles user interactions (clicks, edits, deletes)
- Uses React hooks for breakpoint detection and callbacks
- Requires client-side event handling for table operations

## Props Interface

### SavedFiltersList
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component doesn't accept props |

### CriteriaCell
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<SavedFilter>` | ✅ | TanStack Table row object containing SavedFilter data |

### ActionButtons
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `Row<SavedFilter>` | ✅ | TanStack Table row object containing SavedFilter data |

## Usage Example

```tsx
import { SavedFiltersList } from '@/components/settings/search-customization/saved-filters-list';

// Basic usage in a settings page
export function SearchCustomizationPage() {
  return (
    <div className="space-y-6">
      <h1>Search Customization</h1>
      <SavedFiltersList />
    </div>
  );
}

// The component is self-contained and manages its own state
// No props needed for basic functionality
```

## Functionality

### Core Features
- **Responsive Data Display**: Shows saved filters in a table (desktop) or card layout (mobile)
- **CRUD Operations**: Create, edit, duplicate, and delete saved filter presets
- **Filter Management**: Apply saved filters to current search, edit existing filters
- **Sorting & Organization**: Sort by name, creation date, with default sort by newest first
- **Real-time Updates**: Reflects changes immediately through optimistic updates

### Key Interactions
- **Create**: Opens filter drawer to create new preset
- **Edit**: Loads filter into drawer for modification
- **Duplicate**: Creates copy with "Copy of" prefix
- **Delete**: Shows confirmation dialog before removal
- **Apply**: Loads filter criteria into active search state

### Data Display
- Filter name with icon indicator
- Criteria count (number of applied filters)
- Creation date with relative formatting
- Creator information
- Unique filter ID

## State Management

### Zustand Stores
```tsx
// Filter drawer state management
const onIsOpenChange = useFiltersDrawerStore((state) => state.onIsOpenChange);
const onFiltersApply = useFiltersDrawerStore((state) => state.onFiltersApply);

// Saved filters state management
const setIsEditMode = useSavedFiltersStore((state) => state.setIsEditMode);
const setSavedFilterToEdit = useSavedFiltersStore((state) => state.setSavedFilterToEdit);
const setFilterName = useSavedFiltersStore((state) => state.setFilterName);
const setIsDeleteDialogOpen = useSavedFiltersStore((state) => state.setIsDeleteDialogOpen);
```

### TanStack Query
```tsx
// Server state for saved filters data
const { data: savedFilters, isError, isPending } = useSavedFilters();

// Mutations for filter operations
const { mutate: createSavedFilter, isPending: isCreatingSavedFilter } = useCreateSavedFilter();
```

## Side Effects

### API Interactions
- **Fetch**: Loads saved filters on component mount
- **Create**: Duplicates existing filters with new names
- **Update**: Modifies existing filter configurations
- **Delete**: Removes filters after confirmation

### State Synchronization
- Updates filter drawer when editing filters
- Syncs filter application with search state
- Manages loading states during async operations
- Handles error states for failed operations

## Dependencies

### UI Components
- `CrudTable` - Main data display component
- `Button`, `CompactButton` - Action triggers
- `Typography` - Text formatting
- `Tooltip` - Action button help text
- `KeyIcon` - Visual filter indicators

### Hooks & Utilities
- `useBreakpoint` - Responsive layout detection
- `useFiltersDrawerStore` - Filter drawer state management
- `useSavedFiltersStore` - Saved filters state management
- `useSavedFilters`, `useCreateSavedFilter` - Data fetching and mutations

### Child Components
- `SavedFiltersCardList` - Mobile card layout
- `DeleteSavedFilterDialog` - Confirmation dialog

### Utility Functions
- `filtersToCounter` - Counts active filter criteria
- `formatDateWithRelativeDay` - Human-readable date formatting
- `mapSavedFilterQueryToFilters` - Data transformation between API and UI formats

## Integration

### Application Architecture
```
Settings Page
├── Search Customization Section
│   ├── SavedFiltersList (this component)
│   ├── Filter Drawer (for editing)
│   └── Delete Confirmation Dialog
```

### Data Flow
1. **Load**: Fetches saved filters from API via TanStack Query
2. **Display**: Renders in responsive table/card layout
3. **Interact**: User actions trigger state changes in Zustand stores
4. **Sync**: State changes propagate to filter drawer and search components
5. **Persist**: Mutations update server state and refresh local cache

### State Coordination
- Coordinates with filter drawer for editing workflows
- Integrates with search state for filter application
- Manages dialog state for delete confirmations

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive functionality  
✅ **State Management**: Properly separates server state (TanStack Query) from client state (Zustand)  
✅ **Component Decomposition**: Breaks down into focused sub-components (`CriteriaCell`, `ActionButtons`)  
✅ **Reusability**: Uses shared UI components from `/ui/` directory  

### Performance Patterns
✅ **Memoization**: Uses `useMemo` for expensive counter calculations  
✅ **Callback Optimization**: Uses `useCallback` for event handlers to prevent unnecessary re-renders  
✅ **Responsive Design**: Adapts layout and button variants based on breakpoints  

### Error Handling
✅ **Loading States**: Shows loading indicators during async operations  
✅ **Error Boundaries**: Handles error states gracefully with fallback UI  
✅ **Optimistic Updates**: Provides immediate feedback for user actions  

### Accessibility
✅ **Tooltips**: Provides context for icon-only action buttons  
✅ **Semantic HTML**: Uses proper button elements and ARIA attributes  
✅ **Keyboard Navigation**: Supports keyboard interaction through table navigation