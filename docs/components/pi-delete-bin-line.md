# PiDeleteBinLine Icon Component

## Purpose

The `PiDeleteBinLine` component is a React SVG icon that renders a delete/trash bin icon with a line style. This component is part of the icon library and provides a visual representation for delete actions, trash functionality, or removal operations throughout the application. It's designed to be consistent with the Phosphor icon style and integrates seamlessly with the application's design system.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering. The component only accepts props and returns JSX, with no need for the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width` / `height` - Override default size (defaults to `1em`)

## Usage Example

```tsx
import { PiDeleteBinLine } from '@/components/icons/pi/pi-delete-bin-line';

// Basic usage
export function DeleteButton() {
  return (
    <button className="flex items-center gap-2">
      <PiDeleteBinLine className="text-red-500" />
      Delete Item
    </button>
  );
}

// With custom sizing and styling
export function TrashIcon() {
  return (
    <PiDeleteBinLine 
      className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors"
      aria-label="Delete"
      role="img"
    />
  );
}

// In a data table action
export function DataTableRow({ item, onDelete }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <button 
          onClick={() => onDelete(item.id)}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label={`Delete ${item.name}`}
        >
          <PiDeleteBinLine className="w-4 h-4 text-gray-600" />
        </button>
      </td>
    </tr>
  );
}

// With custom size override
export function LargeDeleteIcon() {
  return (
    <PiDeleteBinLine 
      width="2rem" 
      height="2rem" 
      className="text-red-600"
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG
- **Responsive Sizing**: Defaults to `1em` for font-relative sizing
- **Current Color**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Style Flexible**: Supports all standard SVG styling approaches
- **Event Handling**: Supports click and other interaction events

### Visual Design
- Line-style trash bin icon with lid and handle
- Two vertical lines inside representing bin slots
- Clean, minimal design following Phosphor icon standards
- 24x24 viewBox with optimized path definitions

## State Management

**No State Management** - This is a stateless functional component that relies purely on props. It doesn't use:
- TanStack Query (no server state)
- Zustand (no client state)
- Local state (no useState/useReducer)

The component is purely presentational and delegates all state management to parent components.

## Side Effects

**No Side Effects** - This component:
- Makes no API calls
- Performs no DOM manipulation beyond rendering
- Has no useEffect hooks
- Doesn't interact with browser APIs
- Is a pure function that returns consistent output for given props

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing
- No other internal components or services

### External Dependencies
- React (for JSX and component structure)
- TypeScript (for type safety)

### Peer Dependencies
- Styling system (Tailwind CSS classes expected in usage)
- Parent components for event handling and state management

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational icon library in `/components/icons/`
- **Design System**: Consistent with Phosphor icon family
- **Reusability**: Used across multiple domains (user management, content management, etc.)
- **Composition**: Designed to be composed with buttons, tooltips, and other interactive elements

### Common Integration Patterns
```tsx
// With confirmation dialog
const DeleteWithConfirmation = ({ onDelete }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="ghost" size="sm">
        <PiDeleteBinLine className="w-4 h-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// With tooltip
const DeleteButton = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <PiDeleteBinLine className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete item</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component without unnecessary client-side code
✅ **Flat Structure**: Simple, non-nested component structure
✅ **Reusability**: Placed in shared `/icons/` directory for cross-domain usage
✅ **Composition**: Designed to be composed with other UI components

### Implementation Guidelines
- **Accessibility**: Always provide `aria-label` when used standalone
- **Semantic HTML**: Wrap in appropriate interactive elements (buttons, links)
- **Color Inheritance**: Leverage `currentColor` for theme consistency
- **Size Consistency**: Use consistent sizing patterns across the application
- **Event Delegation**: Handle interactions in parent components, not the icon itself

### Performance Considerations
- **Bundle Size**: Minimal impact due to simple SVG structure
- **Rendering**: Efficient server-side rendering with no hydration needed
- **Caching**: Cacheable as static content
- **Tree Shaking**: Importable individually to prevent unused icon bundling

### Anti-Patterns to Avoid
❌ Don't add client-side state or effects to icon components
❌ Don't hardcode colors - use currentColor and CSS classes
❌ Don't implement complex logic within icon components
❌ Don't forget accessibility attributes when icons convey meaning