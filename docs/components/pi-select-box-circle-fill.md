# PiSelectBoxCircleFill Icon Component

## Purpose

The `PiSelectBoxCircleFill` component is an SVG icon that displays a filled circle with a checkmark, commonly used to indicate a selected state in selection interfaces, checkboxes, radio buttons, or confirmation UI elements. This icon is part of the Phosphor icon library implementation and provides a visual representation of successful selection or completion.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without any behavioral changes.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Allows full customization of the SVG element |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `(event: MouseEvent) => void` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiSelectBoxCircleFill } from '@/components/icons/pi/pi-select-box-circle-fill';

// Basic usage
function SelectionIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiSelectBoxCircleFill className="text-green-500" />
      <span>Item selected</span>
    </div>
  );
}

// In a custom checkbox component
function CustomCheckbox({ checked, onChange, children }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="relative">
        {checked ? (
          <PiSelectBoxCircleFill 
            className="text-blue-600 w-5 h-5" 
            aria-hidden="true"
          />
        ) : (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
        )}
      </div>
      {children}
    </label>
  );
}

// In a selection list
function SelectableItem({ isSelected, onSelect, item }) {
  return (
    <div 
      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
      onClick={onSelect}
    >
      <span>{item.name}</span>
      {isSelected && (
        <PiSelectBoxCircleFill 
          className="text-green-600 w-4 h-4"
          aria-label="Selected"
        />
      )}
    </div>
  );
}

// With accessibility
function AccessibleSelectionIndicator({ isSelected }) {
  return (
    <PiSelectBoxCircleFill
      className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-300'}`}
      aria-label={isSelected ? 'Selected' : 'Not selected'}
      role="img"
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Customizable**: Accepts all standard SVG props for full customization

### Visual Characteristics
- **Shape**: Circular background with integrated checkmark
- **Fill Style**: Solid fill using the current text color
- **Dimensions**: 24x24 viewBox with 1em sizing
- **Design**: Clean, modern filled circle with checkmark indication

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. Selection state should be managed by parent components using:

- **TanStack Query**: For selection state that needs to be persisted to server
- **Zustand**: For complex client-side selection state shared across components  
- **Local State**: For simple component-level selection state using `useState`

```tsx
// Example with local state
function SelectableList({ items }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id} onClick={() => toggleSelection(item.id)}>
          {selectedIds.has(item.id) && <PiSelectBoxCircleFill />}
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

## Side Effects

**No Side Effects** - This component is purely presentational and doesn't:
- Make API calls
- Perform DOM manipulations
- Trigger browser APIs
- Cause any external state changes

All interactivity and side effects should be handled by parent components.

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` type from React

### External Dependencies
- None - this is a self-contained SVG component

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- Form components that might use this for selection indication
- Checkbox and radio button components
- Selection list components

## Integration

### Application Architecture Fit
- **UI Component Layer**: Located in `/components/icons/pi/` as a reusable UI primitive
- **Feature Components**: Used by domain-specific components for selection indication
- **Design System**: Part of the icon system providing consistent visual language
- **Form Integration**: Commonly used in form components with React Hook Form + Zod

### Usage Patterns
```tsx
// In form components
function FormCheckbox({ field, label }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" {...field} className="sr-only" />
      {field.value && <PiSelectBoxCircleFill className="text-primary" />}
      {label}
    </label>
  );
}

// In data tables
function DataTableRow({ row, isSelected, onSelect }) {
  return (
    <tr onClick={onSelect} className="hover:bg-gray-50">
      <td>
        {isSelected && <PiSelectBoxCircleFill className="text-blue-600" />}
      </td>
      {/* other cells */}
    </tr>
  );
}
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Properly implemented as server component without client-side state
- ✅ **Flat Composition**: Simple, non-nested component that composes well with others
- ✅ **Single Responsibility**: Focused solely on rendering the selection icon
- ✅ **Reusable UI Primitive**: Located in appropriate directory structure

### Implementation Guidelines
- **Always provide accessibility labels** when used for functional purposes
- **Use semantic color classes** (e.g., `text-green-600` for success, `text-blue-600` for selection)
- **Combine with proper form controls** rather than relying solely on visual indication
- **Consider keyboard navigation** when using in interactive contexts
- **Maintain consistent sizing** using Tailwind size classes (`w-4 h-4`, `w-5 h-5`, etc.)

### Anti-patterns to Avoid
- ❌ Don't use for non-selection related UI (use appropriate icons instead)
- ❌ Don't manage selection state within this component
- ❌ Don't override the SVG structure or path data
- ❌ Don't use without proper accessibility considerations in interactive contexts