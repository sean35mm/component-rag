# PiMoreFill Icon Component

## Purpose

The `PiMoreFill` component is a presentational SVG icon that renders three filled horizontal dots, commonly used to indicate "more options" or to trigger dropdown menus and action sheets. This icon is part of the Pi icon family and provides a visual cue for expandable content or additional actions.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `onClick`, `style`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `onClick` | `(event: MouseEvent) => void` | Click handler for interactive usage |
| `aria-label` | `string` | Accessibility label |
| `style` | `CSSProperties` | Inline styles |
| `data-*` | `string` | Data attributes |

## Usage Example

```tsx
import { PiMoreFill } from '@/components/icons/pi/pi-more-fill';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Basic usage
export function ActionButton() {
  return (
    <Button variant="ghost" size="sm">
      <PiMoreFill className="h-4 w-4" />
    </Button>
  );
}

// With dropdown menu
export function PostActions({ postId }: { postId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          aria-label="More options"
        >
          <PiMoreFill className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// In table rows or cards
export function DataTableRow({ item }: { item: any }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.status}</td>
      <td className="text-right">
        <PiMoreFill 
          className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors"
          onClick={() => openActionMenu(item.id)}
        />
      </td>
    </tr>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector**: Uses `1em` dimensions to scale with font size
- **Current Color**: Inherits text color from parent via `fill='currentColor'`
- **Accessible**: Can receive `aria-label` and other accessibility props
- **Interactive**: Supports click handlers and hover states
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Characteristics
- **Viewbox**: 24x24 coordinate system
- **Design**: Three filled circular dots arranged horizontally
- **Spacing**: Evenly distributed across the icon area
- **Style**: Solid/filled variant of the more options icon

## State Management

**No State Management** - This is a pure presentational component with no internal state. Any interactive behavior (dropdown state, menu visibility, etc.) should be managed by parent components using appropriate state management solutions:

- **Local UI State**: Use `useState` for simple toggle states
- **Complex UI State**: Use Zustand for cross-component dropdown/modal state
- **Server State**: Use TanStack Query if actions trigger API calls

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It purely renders SVG markup based on the provided props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Common Integration Dependencies
- `@/components/ui/button` - Often wrapped in button components
- `@/components/ui/dropdown-menu` - Frequently used as dropdown triggers
- `@/components/ui/popover` - Alternative popup container
- Styling libraries (Tailwind CSS classes)

## Integration

### Application Architecture Role
```
UI Layer (Presentational)
├── Icons (/components/icons/)
│   ├── pi/
│   │   └── pi-more-fill.tsx ← This component
│   └── other-icon-families/
├── UI Components (/components/ui/)
│   ├── button.tsx (common wrapper)
│   ├── dropdown-menu.tsx (frequent pairing)
│   └── popover.tsx (alternative container)
└── Feature Components (/components/features/)
    ├── data-tables/ (uses in action columns)
    ├── post-cards/ (uses for post actions)
    └── navigation/ (uses in menu items)
```

### Common Integration Patterns
1. **Action Triggers**: Primary use case for dropdowns and popovers
2. **Table Actions**: Standard pattern in data table action columns
3. **Card Menus**: Overflow menus in card-based layouts
4. **Navigation**: Secondary navigation and context menus

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component  
✅ **Flat Structure**: Simple, non-nested component design  
✅ **Reusable UI**: Properly placed in UI icon directory  
✅ **Prop Spreading**: Flexible prop forwarding with `{...props}`  

### Usage Recommendations

```tsx
// ✅ Good: Proper accessibility
<Button aria-label="More options">
  <PiMoreFill className="h-4 w-4" />
</Button>

// ✅ Good: Consistent sizing with Tailwind
<PiMoreFill className="h-4 w-4 text-muted-foreground" />

// ✅ Good: Semantic HTML structure
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon">
    <PiMoreFill />
  </Button>
</DropdownMenuTrigger>

// ❌ Avoid: Missing accessibility context
<div onClick={handleClick}>
  <PiMoreFill />
</div>

// ❌ Avoid: Inconsistent sizing
<PiMoreFill style={{ width: '13px', height: '15px' }} />
```

### Performance Considerations
- **No memoization needed**: Pure component with no complex computations
- **Bundle efficient**: Lightweight SVG with minimal DOM nodes
- **Tree-shakeable**: Can be imported individually

### Accessibility Guidelines
- Always provide `aria-label` when used as interactive trigger
- Ensure sufficient color contrast (4.5:1 minimum)
- Use semantic button elements for clickable instances
- Consider `aria-expanded` state for dropdown triggers