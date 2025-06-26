# PiEyeLine Icon Component

## Purpose

The `PiEyeLine` component is an SVG icon representing an eye outline, commonly used for visibility toggles, view actions, or password reveal functionality. It's part of the Phosphor Icons (Pi) collection and provides a scalable, customizable eye icon that inherits color and sizing from its parent context.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | Standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props
Common props you can pass include:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiEyeLine } from '@/components/icons/pi/pi-eye-line';
import { Button } from '@/components/ui/button';

// Basic usage
function ViewButton() {
  return (
    <Button variant="ghost" size="icon">
      <PiEyeLine />
      <span className="sr-only">View details</span>
    </Button>
  );
}

// Password visibility toggle
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <input 
        type={showPassword ? 'text' : 'password'}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        <PiEyeLine className="h-4 w-4 text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
}

// With custom styling
function CustomEyeIcon() {
  return (
    <PiEyeLine 
      className="h-6 w-6 text-blue-600 hover:text-blue-800 transition-colors"
      onClick={() => console.log('Eye clicked')}
    />
  );
}

// In a data table action
function TableRowActions({ item }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/items/${item.id}`}>
          <PiEyeLine className="h-4 w-4" />
          View
        </Link>
      </Button>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisply at any size using SVG format
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Interactive Capable**: Supports event handlers for click, hover, etc.

### Visual Characteristics
- **Design**: Outline style eye icon with pupil detail
- **ViewBox**: 24x24 coordinate system
- **Fill Rule**: Uses `evenodd` and `clipRule` for proper rendering
- **Paths**: Two path elements creating the eye outline and pupil

## State Management

**No State Management** - This is a purely presentational component with no internal state. Any state-dependent behavior (like visibility toggles) should be managed by parent components using appropriate patterns:

- **Local State**: `useState` for simple toggles
- **Form State**: React Hook Form for form-related visibility controls
- **Global State**: Zustand for app-wide visibility preferences

## Side Effects

**No Side Effects** - This component performs no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other Phosphor Icons in `/components/icons/pi/`
- UI components like `Button` for interactive wrappers
- Form components for input visibility toggles

### Common Integration Points
- Button components as icon content
- Input components for show/hide toggles
- Navigation items for view actions
- Table cells for row actions

## Integration

### Application Architecture Fit
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-eye-line.tsx     # ← This component
│   ├── ui/
│   │   ├── button.tsx              # ← Common wrapper
│   │   └── input.tsx               # ← Password inputs
│   └── features/
│       ├── auth/
│       │   └── password-input.tsx  # ← Uses for visibility
│       └── data-table/
│           └── row-actions.tsx     # ← Uses for view actions
```

### Design System Integration
- **Size Classes**: `h-4 w-4`, `h-5 w-5`, `h-6 w-6` for consistent sizing
- **Color Classes**: Inherits from text color utilities
- **Spacing**: Works with Tailwind spacing system
- **States**: Supports hover, focus, and disabled states through CSS

## Best Practices

### Architecture Compliance
✅ **Server Component**: Properly implemented as server component  
✅ **Component Decomposition**: Atomic, reusable icon component  
✅ **Flat Structure**: No unnecessary nesting or complexity  
✅ **Props Interface**: Uses standard SVG props pattern  

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with accessibility
<Button variant="ghost" size="icon" aria-label="Show password">
  <PiEyeLine />
</Button>

// ✅ Good: Consistent sizing with design system
<PiEyeLine className="h-4 w-4 text-muted-foreground" />

// ✅ Good: Event handling on wrapper
<button onClick={handleToggle}>
  <PiEyeLine className="h-5 w-5" />
  <span>Toggle visibility</span>
</button>

// ❌ Avoid: Inconsistent sizing
<PiEyeLine style={{ width: '17px', height: '19px' }} />

// ❌ Avoid: Missing accessibility context
<div onClick={handleClick}>
  <PiEyeLine />
</div>
```

### Performance Considerations
- **Bundle Size**: Minimal impact, only imports when used
- **Rendering**: Server-side rendered, no hydration needed
- **Caching**: Benefits from static asset caching
- **Tree Shaking**: Properly exported for dead code elimination