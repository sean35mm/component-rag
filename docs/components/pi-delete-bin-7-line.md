# PiDeleteBin7Line Component

## Purpose
The `PiDeleteBin7Line` component is an SVG icon component that renders a trash bin/delete icon with a line style design. It provides a visual indicator for delete actions and trash/removal functionality throughout the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `width` | `string \| number` | No | `'1em'` | Sets the width of the SVG icon |
| `height` | `string \| number` | No | `'1em'` | Sets the height of the SVG icon |
| `fill` | `string` | No | `'currentColor'` | Sets the fill color of the icon |
| `className` | `string` | No | `undefined` | CSS class names for styling |
| `onClick` | `(event: MouseEvent<SVGSVGElement>) => void` | No | `undefined` | Click event handler |
| `...props` | `SVGProps<SVGSVGElement>` | No | `undefined` | All other standard SVG element props |

## Usage Example

```tsx
import { PiDeleteBin7Line } from '@/components/icons/pi/pi-delete-bin-7-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function DeleteButton() {
  return (
    <Button variant="destructive" size="sm">
      <PiDeleteBin7Line className="mr-2 h-4 w-4" />
      Delete Item
    </Button>
  );
}

// As a standalone clickable icon
export function DeleteIconButton({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      onClick={onDelete}
      className="p-2 hover:bg-red-50 rounded-full transition-colors"
      aria-label="Delete item"
    >
      <PiDeleteBin7Line className="h-5 w-5 text-red-500" />
    </button>
  );
}

// In a data table action column
export function DataTableRow({ item }: { item: any }) {
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success('Item deleted successfully');
    },
  });

  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <PiDeleteBin7Line 
          className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => deleteMutation.mutate(item.id)}
        />
      </td>
    </tr>
  );
}
```

## Functionality
- **Scalable Icon Rendering**: Renders a crisp SVG icon that scales with font size (`1em` dimensions)
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent elements
- **Accessibility Ready**: Can be enhanced with ARIA labels and semantic markup
- **Style Customization**: Accepts all standard SVG props for full customization
- **Event Handling**: Supports click and other mouse/touch events when needed

## State Management
**No State Management Required** - This is a stateless presentational component. When used in interactive contexts, state management is handled by parent components using:
- **TanStack Query**: For server state when triggering delete mutations
- **Zustand**: For client state if managing UI state like confirmation dialogs
- **Local State**: For simple toggle states in parent components

## Side Effects
**No Direct Side Effects** - The component itself performs no side effects. However, when used in interactive contexts:
- Parent components may trigger API calls for delete operations
- May cause re-renders when used with state management libraries
- Can trigger navigation or UI updates through event handlers

## Dependencies
- **React**: Core dependency for `SVGProps` type
- **No External Dependencies**: Self-contained SVG icon component

### Related Components
- UI components: `Button`, `IconButton`, `Tooltip`
- Dialog components for delete confirmations
- Form components when used in delete actions

## Integration
The component integrates into the application architecture as:

```tsx
// In feature components
src/components/features/
├── user-management/
│   └── delete-user-button.tsx    // Uses PiDeleteBin7Line
├── product-catalog/
│   └── product-actions.tsx       // Uses PiDeleteBin7Line

// In UI components
src/components/ui/
├── data-table/
│   └── actions-column.tsx        // Uses PiDeleteBin7Line
├── confirmation-dialog/
│   └── delete-dialog.tsx         // Uses PiDeleteBin7Line
```

## Best Practices

### ✅ Recommended Patterns
```tsx
// 1. Use with semantic HTML for accessibility
<button aria-label="Delete user" onClick={handleDelete}>
  <PiDeleteBin7Line className="h-4 w-4" />
</button>

// 2. Combine with confirmation patterns
const ConfirmDeleteButton = ({ onConfirm }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="ghost" size="sm">
        <PiDeleteBin7Line className="h-4 w-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// 3. Use consistent sizing with Tailwind classes
<PiDeleteBin7Line className="h-4 w-4" /> // Small
<PiDeleteBin7Line className="h-5 w-5" /> // Medium
<PiDeleteBin7Line className="h-6 w-6" /> // Large
```

### ❌ Anti-patterns
```tsx
// Don't use without proper semantic context
<PiDeleteBin7Line onClick={handleDelete} /> // Missing accessibility

// Don't inline complex delete logic
<PiDeleteBin7Line onClick={() => {
  // Complex deletion logic here - extract to parent component
}} />
```

### Architecture Adherence
- **Flat Component Structure**: Icon lives in dedicated `/icons/` directory
- **Reusable UI Pattern**: Can be composed into higher-level UI components
- **Server-First**: Renders on server by default, no unnecessary client boundaries
- **Type Safety**: Fully typed with TypeScript for reliable integration