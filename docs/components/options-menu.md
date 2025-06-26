# OptionsMenu Component Documentation

## Purpose

The `OptionsMenu` component provides contextual actions for managing saved filters in the search customization interface. It renders a dropdown menu with rename, duplicate, and delete operations for the currently selected saved filter, integrating with the filter management system to provide a comprehensive filter editing experience.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local UI state (dropdown and dialog visibility)
- Handles user interactions (click events, form submissions)
- Uses React hooks for state management and side effects
- Integrates with Zustand stores that require client-side reactivity

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| *No props* | - | - | This component doesn't accept any external props |

## Usage Example

```tsx
import { OptionsMenu } from '@/components/settings/search-customization/saved-filter-drawer/options-menu';

// Used within a saved filter management interface
function SavedFilterDrawer() {
  return (
    <div className="filter-header">
      <h3>Current Filter</h3>
      <OptionsMenu />
    </div>
  );
}

// The component automatically operates on the currently selected filter
// from the saved filters store context
function FilterManagementPanel() {
  return (
    <div className="filter-panel">
      <FilterDetails />
      <OptionsMenu />
    </div>
  );
}
```

## Functionality

### Core Features

- **Rename Filter**: Opens a dialog to rename the current saved filter
- **Duplicate Filter**: Creates a copy of the current filter with "Copy of" prefix
- **Delete Filter**: Initiates the deletion process with confirmation dialog
- **Visual Feedback**: Shows loading states and hover animations
- **Keyboard Navigation**: Supports dropdown menu keyboard interactions

### Interactive Elements

- **Dropdown Trigger**: More options button with rotation animation
- **Menu Items**: Three action items with appropriate icons and variants
- **Loading States**: Spinner animation during duplicate operation
- **Dialog Integration**: Seamless rename dialog workflow

## State Management

### Zustand Stores

```tsx
// Saved filters store for filter data management
const setFilterName = useSavedFiltersStore((state) => state.setFilterName);
const savedFilter = useSavedFiltersStore((state) => state.savedFilterToEdit);
const setIsDeleteDialogOpen = useSavedFiltersStore((state) => state.setIsDeleteDialogOpen);
const setSavedFilterIdToDelete = useSavedFiltersStore((state) => state.setSavedFilterIdToDelete);

// Filters drawer store for UI state
const reset = useFiltersDrawerStore((state) => state.reset);
```

### Local State

```tsx
const [isOpen, setIsOpen] = useState(false); // Dropdown visibility
const [isRenameOpen, setIsRenameOpen] = useState(false); // Rename dialog visibility
```

## Side Effects

### API Interactions

- **Filter Duplication**: Creates new saved filter via `useCreateSavedFilter` mutation
- **Success Callback**: Resets drawer state after successful duplication

### State Updates

- **Filter Renaming**: Updates filter name in store and closes dialog
- **Delete Preparation**: Sets up delete confirmation by updating store state
- **UI State Management**: Controls dropdown and dialog visibility

## Dependencies

### UI Components
```tsx
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { RenameFilterDialog } from '@/components/filters/rename-filter-dialog';
```

### Icons
```tsx
import { PiDeleteBinLine, PiEditLine, PiFileCopy2Line, PiLoader3Line, PiMore2Fill } from '@/components/icons';
```

### Hooks and Stores
```tsx
import { useFiltersDrawerStore, useSavedFiltersStore } from '@/lib/contexts';
import { useCreateSavedFilter } from '@/lib/query-hooks';
```

### Utilities
```tsx
import { cn } from '@/lib/utils/cn';
```

## Integration

### Application Architecture

```
Search Customization
├── Saved Filter Drawer
│   ├── Filter Details
│   ├── OptionsMenu ← This component
│   └── Delete Confirmation Dialog
├── Filter Management Store
└── API Layer (TanStack Query)
```

### Data Flow

1. **Context Dependency**: Operates on `savedFilterToEdit` from store
2. **Action Delegation**: Triggers state changes in parent stores
3. **Dialog Coordination**: Manages rename dialog and delegates delete confirmation
4. **API Integration**: Handles filter duplication through query hooks

## Best Practices

### Architecture Adherence

✅ **Client Component Usage**: Appropriate use of `'use client'` for interactive features
✅ **State Management**: Proper separation of concerns with Zustand stores
✅ **Component Decomposition**: Flat structure with clear single responsibility
✅ **Hook Integration**: TanStack Query for server state mutations

### Code Quality

✅ **Performance**: `useCallback` optimization for event handlers
✅ **Type Safety**: Proper TypeScript integration with dialog props
✅ **Accessibility**: Dropdown menu with proper keyboard navigation
✅ **Error Handling**: Safe filter existence checks before operations
✅ **UI Consistency**: Consistent styling with design system components

### Integration Patterns

✅ **Store Integration**: Clean separation between UI state and business logic
✅ **Event Handling**: Proper event prevention and state management
✅ **Loading States**: Visual feedback during async operations
✅ **Dialog Management**: Coordinated dialog state with parent components