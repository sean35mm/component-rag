# PiCloseLeftLine Icon Component

## Purpose

The `PiCloseLeftLine` component is an SVG icon that displays a close/exit symbol with a left-side visual emphasis. This icon represents actions like closing panels, dismissing overlays, or canceling operations that relate to left-side UI elements. It features a rounded rectangle with an X symbol inside and an additional panel element, commonly used in drawer close buttons, left sidebar dismissals, or panel collapse actions.

## Component Type

**Server Component** - This is a pure presentational SVG icon component with no interactivity, state, or client-side behavior. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `() => void` | Click event handler |
| `width` | `string \| number` | Override default width (1em) |
| `height` | `string \| number` | Override default height (1em) |
| `fill` | `string` | Override fill color (defaults to currentColor) |

## Usage Example

```tsx
import { PiCloseLeftLine } from '@/components/icons/pi/pi-close-left-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function DrawerCloseButton() {
  return (
    <Button variant="ghost" size="icon">
      <PiCloseLeftLine />
    </Button>
  );
}

// With custom styling
export function SidebarHeader() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="flex items-center justify-between p-4">
      <h2>Navigation</h2>
      <button 
        onClick={() => setIsOpen(false)}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <PiCloseLeftLine 
          className="text-gray-600 hover:text-gray-900 transition-colors" 
        />
      </button>
    </div>
  );
}

// In a modal or overlay
export function LeftPanelModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex">
      <div className="bg-white w-80 h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3>Panel Title</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <PiCloseLeftLine className="w-4 h-4" />
            <span className="ml-2">Close</span>
          </Button>
        </div>
        {/* Panel content */}
      </div>
    </div>
  );
}

// Responsive sizing
export function ResponsiveCloseButton() {
  return (
    <PiCloseLeftLine 
      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
      style={{ width: 'auto', height: 'auto' }}
    />
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders as crisp SVG at any size
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Responsive Sizing**: Default 1em sizing adapts to parent font-size
- **Accessibility Ready**: Works with screen readers when proper ARIA labels are added to parent buttons
- **Customizable**: Accepts all standard SVG props for styling and event handling
- **Opacity Effect**: Features 0.8 opacity for subtle visual hierarchy

## State Management

**No State Management** - This is a stateless presentational component. Any state related to visibility, interactions, or UI changes should be managed by parent components using:
- Local state with `useState` for simple toggle behavior
- Zustand stores for global UI state (sidebar open/closed status)
- Component props for controlled behavior

## Side Effects

**No Side Effects** - This component:
- Does not make API calls
- Does not interact with external services
- Does not manage local storage or cookies
- Does not trigger navigation or routing changes
- Pure rendering component with no lifecycle effects

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for TypeScript support

### Typical Usage Dependencies
- UI Button components for interactive containers
- State management hooks (`useState`, Zustand stores)
- Styling utilities (Tailwind CSS classes)

### No External Dependencies
- No third-party icon libraries required
- No additional build tools or plugins needed

## Integration

### UI Component Integration
```tsx
// With shadcn/ui Button
import { Button } from '@/components/ui/button';
<Button variant="outline" size="icon">
  <PiCloseLeftLine />
</Button>

// With custom button component
import { IconButton } from '@/components/ui/icon-button';
<IconButton icon={PiCloseLeftLine} onClick={handleClose} />
```

### Layout Integration
- **Drawers**: Close button for left-side navigation drawers
- **Sidebars**: Collapse/close action for sidebar panels  
- **Modals**: Dismiss button for left-anchored modal panels
- **Toolbars**: Close action for left-positioned tool panels

### State Integration
```tsx
// With Zustand store
const { closeSidebar } = useUIStore();
<Button onClick={closeSidebar}>
  <PiCloseLeftLine />
</Button>

// With component state
const [showPanel, setShowPanel] = useState(true);
<Button onClick={() => setShowPanel(false)}>
  <PiCloseLeftLine />
</Button>
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No 'use client' needed - pure SVG rendering
- ✅ **Flat Component Structure**: Simple, single-purpose icon component
- ✅ **Reusable UI Component**: Located in icons directory for global reuse
- ✅ **Props Interface**: Uses standard SVG props for maximum flexibility

### Usage Patterns
```tsx
// ✅ GOOD: Semantic button with icon
<Button variant="ghost" onClick={onClose} aria-label="Close panel">
  <PiCloseLeftLine />
</Button>

// ✅ GOOD: Proper sizing
<PiCloseLeftLine className="w-5 h-5" />

// ✅ GOOD: Color inheritance
<div className="text-red-500">
  <PiCloseLeftLine /> {/* Will be red */}
</div>

// ❌ AVOID: Icon without interactive container
<PiCloseLeftLine onClick={handler} /> {/* Use button instead */}

// ❌ AVOID: Hardcoded colors that break theming
<PiCloseLeftLine fill="#ff0000" />
```

### Accessibility
```tsx
// ✅ Proper ARIA labeling
<Button onClick={onClose} aria-label="Close navigation panel">
  <PiCloseLeftLine aria-hidden="true" />
</Button>

// ✅ Screen reader friendly
<Button onClick={onClose}>
  <PiCloseLeftLine />
  <span className="sr-only">Close panel</span>
</Button>
```

### Performance
- Icons are lightweight SVG components
- No runtime dependencies or heavy computations
- Suitable for frequent re-rendering in interactive UIs
- Consider sprite sheets for applications with many icons