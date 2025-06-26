# SaveButton Component

## Purpose

The `SaveButton` component provides functionality for saving and updating filter configurations within the search customization system. It handles both creating new saved filters and updating existing ones, with different UI behaviors based on the current mode (create vs. edit). The component integrates with a rename dialog for new filter creation and manages the complete save workflow.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Local state management for dialog visibility
- Event handlers for user interactions
- Access to Zustand stores for filter state management
- Mutation hooks for API operations

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filtersState` | `FiltersState` | Yes | The current filter configuration state that will be saved or updated |

## Usage Example

```tsx
import { SaveButton } from '@/components/settings/search-customization/saved-filter-drawer/save-button';
import { FiltersState } from '@/lib/types';

function FilterDrawer() {
  const [currentFilters, setCurrentFilters] = useState<FiltersState>({
    searchTerm: 'react',
    categories: ['frontend'],
    dateRange: { start: '2024-01-01', end: '2024-12-31' }
  });

  return (
    <div className="filter-drawer">
      {/* Other filter controls */}
      
      <SaveButton filtersState={currentFilters} />
    </div>
  );
}
```

## Functionality

### Core Features
- **Dual Mode Operation**: Handles both creating new saved filters and updating existing ones
- **Dialog Integration**: Opens a rename dialog for new filter creation to capture filter name
- **Loading States**: Provides visual feedback during save/update operations
- **State Synchronization**: Applies filters and resets drawer state after successful operations

### User Interactions
- **Create Mode**: Opens rename dialog when clicked, then creates saved filter with user-provided name
- **Edit Mode**: Directly updates the existing saved filter without dialog
- **Disabled State**: Button is disabled during update operations to prevent duplicate submissions

## State Management

### Zustand Stores
- **`useFiltersDrawerStore`**: Manages drawer state and filter application
  - `onFiltersApply`: Applies current filters to the search
  - `reset`: Resets the drawer state after successful operations

- **`useSavedFiltersStore`**: Manages saved filter state and edit mode
  - `savedFilterToEdit`: The filter being edited (if any)
  - `isEditMode`: Boolean indicating if component is in edit mode
  - `filterName`: Current name of the filter being edited

### Local State
- **`isOpen`**: Controls the visibility of the rename dialog

## Side Effects

### API Operations
- **Create Filter**: Uses `useCreateSavedFilter` mutation to create new saved filters
- **Update Filter**: Uses `useUpdateSavedFilter` mutation to update existing filters
- **Success Callbacks**: Triggers filter application and state reset after successful operations

### Data Transformation
- **Filter Mapping**: Converts `FiltersState` to API-compatible format using `mapFiltersToSavedFilterQuery`
- **DTO Creation**: Constructs `CreateSavedFilterDto` and `UpdateSavedFilterDto` objects for API calls

## Dependencies

### Components
- **`RenameFilterDialog`**: Dialog component for capturing filter names during creation
- **`Button`**: UI button component from the design system

### Hooks
- **`useCreateSavedFilter`**: Mutation hook for creating saved filters
- **`useUpdateSavedFilter`**: Mutation hook for updating saved filters

### Utilities
- **`mapFiltersToSavedFilterQuery`**: Transforms filter state to API parameters

### Types
- **`FiltersState`**: Type definition for filter configuration
- **`CreateSavedFilterDto`**: Data transfer object for filter creation
- **`UpdateSavedFilterDto`**: Data transfer object for filter updates

## Integration

### Application Flow
1. **Filter Configuration**: User configures filters in the search customization interface
2. **Save Action**: User clicks the save button to persist their filter configuration
3. **Mode Detection**: Component determines whether to create new or update existing filter
4. **API Interaction**: Appropriate mutation is triggered based on the mode
5. **State Management**: Successful operations trigger filter application and drawer reset

### Architecture Alignment
- **State Management**: Follows TanStack Query pattern for server state mutations
- **Client State**: Uses Zustand for managing drawer and filter states
- **Component Decomposition**: Single responsibility focused on save operations
- **Error Handling**: Leverages mutation hooks' built-in error handling

## Best Practices

### Architectural Compliance
- **Server State**: Uses TanStack Query mutations for API operations following our server state management pattern
- **Client State**: Properly leverages Zustand stores for UI state management
- **Component Isolation**: Focused single responsibility for save operations
- **Type Safety**: Fully typed props and internal operations

### Implementation Patterns
- **Callback Optimization**: Uses `useCallback` for performance optimization of event handlers
- **Conditional Logic**: Clean separation between create and edit mode behaviors
- **Loading States**: Provides appropriate user feedback during async operations
- **Error Prevention**: Disables interactions during pending operations

### Future Considerations
- **Description Field**: Currently uses placeholder description - ready for future enhancement when designs include description input
- **Validation**: Well-positioned to add client-side validation before save operations
- **Accessibility**: Button states and loading indicators support screen readers