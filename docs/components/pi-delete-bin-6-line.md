# PiDeleteBin6Line Icon Component

## Purpose

The `PiDeleteBin6Line` component is a reusable SVG icon that renders a delete/trash bin with a line/outline style. This icon is typically used in UI elements to indicate delete, remove, or trash functionality, such as delete buttons, confirmation dialogs, or action menus where users can remove items.

## Component Type

**Server Component** - This is a presentational SVG icon component that renders static markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, `fill`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiDeleteBin6Line } from '@/components/icons/pi/pi-delete-bin-6-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function DeleteButton() {
  return (
    <Button variant="destructive" size="sm">
      <PiDeleteBin6Line className="w-4 h-4 mr-2" />
      Delete Item
    </Button>
  );
}

// Icon only button
export function DeleteIconButton({ onDelete }: { onDelete: () => void }) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onDelete}
      className="p-2 hover:bg-red-50 hover:text-red-600"
    >
      <PiDeleteBin6Line className="w-4 h-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}

// Custom styling
export function CustomDeleteIcon() {
  return (
    <PiDeleteBin6Line 
      className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
      onClick={() => console.log('Delete clicked')}
    />
  );
}

// In a data table action column
export function DataTableActions({ item }: { item: any }) {
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries(['items'])
  });

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <EditIcon className="w-4 h-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => deleteMutation.mutate(item.id)}
        disabled={deleteMutation.isPending}
      >
        <PiDeleteBin6Line className="w-4 h-4" />
      </Button>
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic of a delete/trash bin icon
- **Responsive Sizing**: Uses `1em` dimensions by default, making it scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessibility Ready**: Can accept ARIA attributes and event handlers through props spreading
- **Customizable**: All SVG properties can be overridden through props

## State Management

**None** - This is a stateless presentational component that doesn't manage any internal state. Any state management related to delete operations should be handled by parent components using:
- **TanStack Query**: For server state mutations when deleting items
- **Zustand**: For client state updates after deletions
- **Local State**: For UI states like loading, confirmation dialogs

## Side Effects

**None** - This component has no side effects. It's a pure presentational component that only renders SVG markup. Any side effects (API calls, state updates, navigation) should be handled by parent components that use this icon.

## Dependencies

- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained SVG icon with no additional dependencies

## Integration

This icon component follows our flat component architecture and integrates seamlessly into the application:

```tsx
// Feature components use the icon
src/components/features/
├── products/
│   └── ProductDeleteButton.tsx  // Uses PiDeleteBin6Line
├── users/
│   └── UserActions.tsx         // Uses PiDeleteBin6Line
└── files/
    └── FileManager.tsx         // Uses PiDeleteBin6Line

// UI components incorporate the icon
src/components/ui/
├── data-table/
│   └── DataTableActions.tsx    // Uses PiDeleteBin6Line
└── confirmation-dialog/
    └── ConfirmationDialog.tsx  // Uses PiDeleteBin6Line as visual indicator
```

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Lego Block Principle**: Small, focused, reusable icon component
- **Server Component**: No unnecessary client-side overhead
- **Prop Spreading**: Flexible and extensible through SVG props
- **Domain Agnostic**: Generic icon usable across all features

✅ **Implementation Best Practices**:
- Always include `sr-only` text for icon-only buttons
- Use semantic color classes (`text-red-500`) for delete contexts
- Pair with confirmation dialogs for destructive actions
- Handle loading states in parent components during delete operations
- Use appropriate button variants (`destructive`, `ghost`) based on context

✅ **Accessibility**:
- Inherits color for proper contrast ratios
- Can receive `aria-label`, `role`, and other accessibility props
- Works with keyboard navigation when used in interactive elements