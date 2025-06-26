# PiFlagLine Component

## Purpose

The `PiFlagLine` component is an SVG icon component that renders a flag outline icon. It's part of the Phosphor Icons collection (`pi` prefix) and provides a scalable, accessible icon for representing flags, bookmarks, marking items, or indicating priority/status in the user interface.

## Component Type

**Server Component** - This is a pure presentation component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element properties including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiFlagLine } from '@/components/icons/pi/pi-flag-line';

// Basic usage
export function BookmarkButton() {
  return (
    <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
      <PiFlagLine className="w-4 h-4 text-gray-600" />
      Bookmark
    </button>
  );
}

// Priority indicator
export function TaskItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      {task.priority === 'high' && (
        <PiFlagLine 
          className="w-5 h-5 text-red-500" 
          aria-label="High priority"
        />
      )}
      <span>{task.title}</span>
    </div>
  );
}

// With click handler (requires 'use client')
'use client';

export function FlagToggle({ isFlagged, onToggle }: FlagToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors ${
        isFlagged ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
      }`}
      aria-label={isFlagged ? 'Remove flag' : 'Add flag'}
    >
      <PiFlagLine className="w-5 h-5" />
    </button>
  );
}

// Navigation menu
export function ReportsMenu() {
  return (
    <nav className="space-y-1">
      <a 
        href="/reports" 
        className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
      >
        <PiFlagLine className="w-4 h-4" />
        Flagged Items
      </a>
    </nav>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp icons at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` for automatic color inheritance
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Flexible Styling**: Supports all standard SVG properties and CSS classes

### Visual Design
- **Outline Style**: Line-based flag icon with transparent fill
- **24x24 ViewBox**: Consistent sizing with other Phosphor icons
- **Flag Pole**: Vertical line representing the flag pole
- **Wavy Flag**: Outlined flag shape with curved edge for visual appeal

## State Management

**No State Management** - This is a pure presentational component with no internal state. Any state-related functionality should be managed by parent components using:

- **Local State**: `useState` for simple toggle states
- **Zustand**: For complex client-side flag/bookmark state
- **TanStack Query**: For server-synced bookmark/flag data

```tsx
// Example with TanStack Query
'use client';

export function BookmarkIcon({ itemId }: { itemId: string }) {
  const { data: isBookmarked } = useQuery({
    queryKey: ['bookmark', itemId],
    queryFn: () => checkBookmarkStatus(itemId)
  });

  return (
    <PiFlagLine 
      className={isBookmarked ? 'text-blue-600' : 'text-gray-400'} 
    />
  );
}
```

## Side Effects

**No Side Effects** - This component is purely presentational and doesn't:
- Make API calls
- Access browser APIs
- Perform DOM manipulations
- Trigger external interactions

Side effects should be handled by parent components that use this icon.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- **Tailwind CSS** - For styling classes in usage examples
- **Parent Components** - For state management and event handling

### No Internal Dependencies
- No custom hooks
- No utility functions
- No other components

## Integration

### Design System Integration
```tsx
// Icon size variants
const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4', 
  lg: 'w-5 h-5',
  xl: 'w-6 h-6'
};

// Theme color variants
const iconColors = {
  default: 'text-gray-600',
  primary: 'text-blue-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600'
};
```

### Feature Integration
- **Bookmark Systems**: Flag items for later reference
- **Priority Indicators**: Mark high-priority tasks or items
- **Status Indicators**: Show flagged/marked states
- **Navigation**: Represent flagged content sections

### Component Composition
```tsx
// Compound component pattern
export function FlagButton({ children, ...props }) {
  return (
    <button className="flex items-center gap-2" {...props}>
      <PiFlagLine className="w-4 h-4" />
      {children}
    </button>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server-First**: Uses Server Component by default  
✅ **Single Responsibility**: Only renders SVG icon  
✅ **Composable**: Works well in compound patterns  
✅ **Type Safe**: Proper TypeScript integration  

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with proper labeling
<PiFlagLine aria-label="High priority task" className="text-red-500" />

// ✅ Good: Consistent sizing with design system
<PiFlagLine className="w-4 h-4 text-gray-600" />

// ❌ Avoid: Hardcoded inline styles
<PiFlagLine style={{ width: '16px', color: '#ff0000' }} />

// ❌ Avoid: Missing accessibility context
<PiFlagLine /> {/* No context for screen readers */}
```

### Performance Optimization
- **Tree Shaking**: Import only needed icons
- **Bundle Size**: Lightweight SVG with no runtime dependencies
- **Server Rendering**: No hydration needed for static usage

### Accessibility
```tsx
// Decorative usage
<PiFlagLine aria-hidden="true" />

// Functional usage
<PiFlagLine 
  role="img" 
  aria-label="Bookmark this item" 
/>

// Interactive usage
<button aria-label="Toggle bookmark">
  <PiFlagLine />
</button>
```