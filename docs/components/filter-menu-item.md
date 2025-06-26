# FilterMenuItem Component

## Purpose

The `FilterMenuItem` component is a specialized wrapper around the base `SelectItem` component, designed specifically for filter menus in the signals creation workflow. It provides consistent styling and structure for filter options while maintaining the core functionality of a selectable item with enhanced visual presentation and click handling.

## Component Type

**Client Component** - This component uses event handlers (`onClick`) and interactive elements that require client-side JavaScript execution, making it a client component by necessity.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | The content to be displayed inside the menu item (typically filter labels, icons, or descriptions) |
| `value` | `string` | Yes | The unique value associated with this menu item, used for selection identification |
| `onClick` | `MouseEventHandler` | No | Optional click handler for additional custom behavior when the item is selected |
| `...rest` | `SelectItemProps` | No | All other props from the base `SelectItem` component are passed through |

## Usage Example

```tsx
import { FilterMenuItem } from '@/components/signals/creation/custom-filters/filter-menu-item';
import { Filter, Calendar } from 'lucide-react';

function CustomFilterMenu() {
  const handleFilterSelect = (value: string) => {
    console.log('Filter selected:', value);
  };

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent>
        <FilterMenuItem 
          value="date-range" 
          onClick={() => handleFilterSelect('date-range')}
        >
          <Calendar className="h-4 w-4" />
          Date Range Filter
        </FilterMenuItem>
        
        <FilterMenuItem 
          value="severity" 
          onClick={() => handleFilterSelect('severity')}
        >
          <Filter className="h-4 w-4" />
          Severity Level
        </FilterMenuItem>
        
        <FilterMenuItem value="custom-query">
          <span className="text-muted-foreground">Custom Query</span>
        </FilterMenuItem>
      </SelectContent>
    </Select>
  );
}
```

## Functionality

- **Enhanced Select Item**: Extends the base `SelectItem` with custom styling optimized for filter menus
- **Flexible Content**: Accepts any React node as children, allowing for complex filter descriptions with icons, text, and styling
- **Consistent Styling**: Applies standardized padding, hover states, and background colors across all filter options
- **Click Handling**: Supports both inherited selection behavior and custom click handlers for additional functionality
- **Text Truncation**: Automatically handles long filter names with CSS truncation to maintain layout consistency
- **Gap Management**: Provides consistent spacing between child elements (icons, text, etc.)

## State Management

This component is **stateless** and relies on:
- **Parent Component State**: Selection state is managed by the parent `Select` component
- **Event Delegation**: Click events bubble up to parent components for state updates
- **No Internal State**: Does not maintain any internal state, following the principle of lifting state up

## Side Effects

- **No Direct Side Effects**: The component itself doesn't perform API calls or external operations
- **Event Propagation**: Click events may trigger side effects in parent components
- **CSS Class Application**: Applies hover and focus styles that modify visual appearance

## Dependencies

### Internal Dependencies
- `@/components/ui/select` - Base `SelectItem` component and related types
- React types for `ReactNode` and event handling

### External Dependencies
- **React**: Core React library for component functionality
- **CSS Classes**: Tailwind CSS classes for styling (`pgBackground-100`, padding, flex utilities)

## Integration

### Application Architecture Role
- **Domain-Specific UI Component**: Lives in the signals domain (`/components/signals/creation/`)
- **Filter System Component**: Part of the custom filters feature for signal creation
- **UI Layer**: Sits between the base UI components and feature-specific implementations

### Usage Context
- **Signal Creation Workflow**: Used in filter selection menus during custom signal configuration
- **Filter Configuration**: Enables users to select from available filter types and options
- **Menu Systems**: Can be reused in any dropdown or select context within the signals domain

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Simple, focused component that wraps base functionality
- ✅ **Prop Extension**: Properly extends base component props while adding domain-specific functionality
- ✅ **Domain Organization**: Correctly placed in the signals feature directory structure
- ✅ **Reusability**: Generic enough to be reused across different filter menus within the signals domain

### Implementation Patterns
- ✅ **Props Spreading**: Uses destructuring and rest spread for clean prop handling
- ✅ **Consistent Styling**: Applies domain-specific styling while maintaining design system consistency
- ✅ **Event Handling**: Properly handles both inherited and custom click behaviors
- ✅ **Accessibility**: Maintains accessibility features from the base `SelectItem` component

### Recommended Usage
```tsx
// Good: Clear, semantic usage with proper icons and labels
<FilterMenuItem value="status" onClick={handleStatusFilter}>
  <StatusIcon className="h-4 w-4" />
  Status Filter
</FilterMenuItem>

// Good: Simple text-only option
<FilterMenuItem value="priority">
  Priority Level
</FilterMenuItem>

// Avoid: Overly complex nested content that breaks the simple menu item pattern
```