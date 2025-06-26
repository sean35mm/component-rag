# SearchDrawer Component

## Purpose

The `SearchDrawer` component provides a slide-out drawer interface for displaying search filters and advanced search options. It serves as a modal overlay that appears from the side of the screen, containing filter controls with standardized apply, reset, and cancel actions. This component is part of the smart search system and provides a consistent UI pattern for complex search interactions.

## Component Type

**Client Component** - This component uses event handlers (`onClick`, `onOpenChange`) and manages interactive state (drawer open/close), requiring client-side JavaScript execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode \| ReactNode[]` | Yes | The content to be displayed inside the drawer, typically filter components |
| `isOpen` | `boolean` | Yes | Controls whether the drawer is currently open |
| `title` | `string` | No | The title displayed in the drawer header (defaults to "Filters") |
| `onApply` | `() => void` | Yes | Callback function triggered when the "Update" button is clicked |
| `onIsOpenChange` | `(isOpen: boolean) => void` | Yes | Callback function triggered when the drawer's open state changes |
| `onReset` | `() => void` | Yes | Callback function triggered when the "Clear All" link is clicked |
| `onCancel` | `() => void` | Yes | Callback function triggered when the "Cancel" button is clicked |

## Usage Example

```tsx
import { useState } from 'react';
import { SearchDrawer } from '@/components/search/smart-search-input/search-drawer/search-drawer';
import { FilterCheckboxGroup } from '@/components/filters/filter-checkbox-group';
import { FilterDateRange } from '@/components/filters/filter-date-range';

export function ProductSearchFilters() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleApplyFilters = () => {
    // Apply the current filter state to search
    applySearchFilters({
      categories: selectedCategories,
      dateRange,
    });
    setIsDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setDateRange({ start: null, end: null });
  };

  const handleCancel = () => {
    // Optionally revert to previous filter state
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsDrawerOpen(true)}>
        Open Filters
      </Button>
      
      <SearchDrawer
        isOpen={isDrawerOpen}
        title="Product Filters"
        onIsOpenChange={setIsDrawerOpen}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        onCancel={handleCancel}
      >
        <div className="space-y-6 p-4">
          <FilterCheckboxGroup
            title="Categories"
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
          />
          
          <FilterDateRange
            title="Date Range"
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </SearchDrawer>
    </>
  );
}
```

## Functionality

- **Slide-out Interface**: Provides a sheet/drawer that slides in from the side of the screen
- **Structured Layout**: Includes header with title and clear action, content area, and footer with action buttons
- **Action Buttons**: Standardized "Update", "Cancel", and "Clear All" actions
- **Responsive Design**: Uses rounded corners and appropriate spacing for mobile-friendly interaction
- **Icon Integration**: Displays a pencil icon to indicate editing/filtering functionality
- **Flexible Content**: Accepts any React content as children for maximum flexibility

## State Management

The component uses **prop-driven state management**:
- Receives `isOpen` state from parent component
- Communicates state changes through callback props (`onIsOpenChange`, `onApply`, `onReset`, `onCancel`)
- Does not manage internal state - follows controlled component pattern
- Parent components typically use local state or Zustand stores to manage filter state

## Side Effects

- **DOM Manipulation**: Sheet component handles focus management and scroll locking when opened
- **Event Propagation**: Manages click events for overlay dismissal and button interactions
- **No Direct API Calls**: Component is purely presentational - side effects handled by parent callbacks

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetFooter`, `SheetClose` from `@/components/ui/sheet`
- `Button` from `@/components/ui/button`
- `LinkButton` from `@/components/ui/link-button`

### Icons
- `PiPencilFill` from `@/components/icons`

### External Libraries
- React for component structure and types

## Integration

The `SearchDrawer` integrates into the search system architecture as:

- **Search Interface Layer**: Part of the smart search input system providing advanced filter UI
- **Modal Management**: Works with the Sheet component system for consistent modal behavior
- **Filter Orchestration**: Serves as a container for various filter components
- **State Coordination**: Bridges between filter components and parent search state management
- **Design System**: Follows established UI patterns with consistent styling and behavior

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Flat Component Structure**: Simple prop interface without complex nesting
- **Controlled Component**: State managed by parent, promotes reusability
- **Event-Driven Communication**: Uses callbacks for all interactions
- **UI Component Composition**: Built from smaller UI components following Lego block principle

✅ **Implementation Patterns**:
- Uses TypeScript interfaces for type safety
- Provides sensible defaults (title = "Filters")
- Separates concerns between presentation and business logic
- Follows consistent naming conventions for callbacks

✅ **Integration Best Practices**:
- Parent components should manage filter state with Zustand for complex scenarios
- Use with TanStack Query for server-side filter applications
- Combine with form validation using React Hook Form + Zod for complex filters
- Implement proper loading states in parent components during filter application