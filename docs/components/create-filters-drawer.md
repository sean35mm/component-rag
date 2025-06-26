# CreateFiltersDrawer

## Purpose
The `CreateFiltersDrawer` component provides a specialized drawer interface for creating and saving custom search filters. It wraps the generic `FiltersDrawer` component with specific functionality for filter creation workflows, including a header section and save button functionality within the search customization system.

## Component Type
**Client Component** - This component manages interactive state (`isOpen`, `onIsOpenChange`) and handles user interactions for creating filters, requiring client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode \| ReactNode[]` | ✅ | The filter form content or components to render within the drawer |
| `isOpen` | `boolean` | ✅ | Controls the open/closed state of the drawer |
| `title` | `string` | ❌ | Optional title displayed in the drawer header |
| `filtersState` | `FiltersState` | ✅ | Current state of filters being created/configured |
| `onIsOpenChange` | `(isOpen: boolean) => void` | ✅ | Callback function to handle drawer open/close state changes |

## Usage Example

```tsx
import { CreateFiltersDrawer } from '@/components/settings/search-customization/saved-filter-drawer/create-filters-drawer';
import { FilterForm } from '@/components/forms/filter-form';
import { useFiltersState } from '@/hooks/use-filters-state';

function SearchCustomization() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { filtersState, updateFilters } = useFiltersState();

  return (
    <div>
      <button onClick={() => setIsDrawerOpen(true)}>
        Create New Filter
      </button>
      
      <CreateFiltersDrawer
        isOpen={isDrawerOpen}
        title="Create Custom Filter"
        filtersState={filtersState}
        onIsOpenChange={setIsDrawerOpen}
      >
        <FilterForm
          initialValues={filtersState}
          onFiltersChange={updateFilters}
        />
      </CreateFiltersDrawer>
    </div>
  );
}
```

## Functionality
- **Drawer Management**: Controls the visibility and state of the filter creation drawer
- **Filter Creation Interface**: Provides a structured layout with header and save functionality
- **Content Composition**: Accepts flexible children content for different filter creation forms
- **State Integration**: Integrates with the application's filter state management system
- **Action Handling**: Includes built-in save button functionality for filter persistence

## State Management
- **Props-based State**: Receives `filtersState` and `isOpen` state from parent components
- **Callback Pattern**: Uses `onIsOpenChange` callback to communicate state changes to parent
- **No Internal State**: Follows controlled component pattern, delegating state management to parent components
- **Filter State Integration**: Works with the broader filter state management system through `FiltersState` type

## Side Effects
- **Drawer Visibility**: Controls the visual presentation of the drawer overlay
- **Filter Persistence**: Triggers filter saving through the integrated `SaveButton` component
- **State Synchronization**: Synchronizes drawer state with parent component state

## Dependencies

### Internal Components
- `FiltersDrawer` - Base drawer component from UI library
- `Header` - Specific header component for filter creation
- `SaveButton` - Action button for saving created filters

### Types
- `FiltersState` - Type definition for filter state structure from `@/lib/types`

### External Dependencies
- `React` - Core React functionality for component composition

## Integration
- **Search Customization Flow**: Part of the larger search customization and saved filters system
- **Settings Architecture**: Nested within the settings section for search configuration
- **Filter Management**: Integrates with the application's filter creation and persistence workflow
- **UI System**: Leverages the base `FiltersDrawer` component for consistent drawer behavior
- **State Architecture**: Connects to the application's filter state management patterns

## Best Practices

### Component Architecture Adherence
- ✅ **Composition Pattern**: Uses children prop for flexible content composition
- ✅ **Single Responsibility**: Focused specifically on filter creation drawer functionality
- ✅ **Reusable Design**: Generic enough to work with different filter creation forms
- ✅ **Props Interface**: Clean, well-typed interface following TypeScript best practices

### State Management
- ✅ **Controlled Component**: Follows controlled component pattern for predictable state flow
- ✅ **Callback Pattern**: Uses callbacks for parent-child communication
- ✅ **Type Safety**: Strongly typed props and state interactions

### Integration Patterns
- ✅ **Domain Organization**: Properly organized within search customization domain
- ✅ **Component Composition**: Builds upon base UI components following Lego block principle
- ✅ **Separation of Concerns**: Delegates specific functionality to specialized child components