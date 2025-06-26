# PiMore2Fill Icon Component

## Purpose
The `PiMore2Fill` component is a filled vertical three-dot menu icon that represents "more options" or "additional actions" in user interfaces. It provides a visual indicator for dropdown menus, action lists, or expandable content sections where additional options are available to users.

## Component Type
**Server Component** - This is a pure presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiMore2Fill } from '@/components/icons/pi/pi-more-2-fill';

// Basic usage
export function ActionMenu() {
  return (
    <button className="p-2 hover:bg-gray-100 rounded">
      <PiMore2Fill className="w-5 h-5 text-gray-600" />
    </button>
  );
}

// With dropdown menu
export function PostActions() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-50 rounded"
        aria-label="More options"
      >
        <PiMore2Fill className="w-4 h-4 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50">
            Edit
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// In data tables
export function TableRow({ item }: { item: any }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded">
              <PiMore2Fill className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
```

## Functionality
- **Visual Indicator**: Displays three filled circular dots arranged vertically
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Inherits color from parent element's text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Event Handling**: Supports all standard SVG/HTML events through props spreading

## State Management
**None** - This is a pure presentational component with no internal state. State management for associated functionality (like dropdown visibility) should be handled by parent components using:
- **Local State**: `useState` for simple toggle states
- **Zustand**: For complex menu states shared across components
- **Component Libraries**: Leverage existing dropdown/menu components that handle state internally

## Side Effects
**None** - This component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: `SVGProps` type import
- **No External Dependencies**: Self-contained SVG icon component

## Integration
This component integrates into the application architecture as:

### UI Layer
- **Icon System**: Part of the Phosphor Icons collection in `/components/icons/pi/`
- **Design System**: Provides consistent visual language for "more actions"
- **Reusable Asset**: Used across multiple feature domains

### Component Composition
```tsx
// Composes with UI components
<DropdownMenu>
  <DropdownMenuTrigger>
    <PiMore2Fill />
  </DropdownMenuTrigger>
</DropdownMenu>

// Integrates with feature components
<PostCard>
  <PostActions icon={<PiMore2Fill />} />
</PostCard>
```

### Feature Integration
- **Data Tables**: Action column menus
- **Card Components**: Action buttons
- **Navigation**: Expandable menu indicators
- **Forms**: Additional options toggles

## Best Practices

### Architecture Adherence
✅ **Server Component**: Renders on server, no client-side JavaScript needed
✅ **Flat Composition**: Stacks cleanly with other UI components
✅ **Single Responsibility**: Only handles SVG rendering
✅ **Reusable**: Domain-agnostic icon for cross-feature usage

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="More options" onClick={handleMenuToggle}>
  <PiMore2Fill className="w-4 h-4" />
</button>

// ✅ Good: Consistent sizing with Tailwind
<PiMore2Fill className="w-5 h-5 text-gray-600" />

// ❌ Avoid: Inline styles over utility classes
<PiMore2Fill style={{ width: '20px', height: '20px' }} />

// ✅ Good: Compose with existing UI components
<DropdownMenuTrigger asChild>
  <Button variant="ghost" size="sm">
    <PiMore2Fill />
  </Button>
</DropdownMenuTrigger>
```

### Performance Considerations
- **Tree Shaking**: Named export allows bundlers to optimize unused icons
- **No Runtime Overhead**: SVG renders directly without JavaScript execution
- **Caching**: Static asset that benefits from browser caching