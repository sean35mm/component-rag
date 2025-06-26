# PiAlertFill Component

## Purpose

The `PiAlertFill` component is a filled warning/alert icon that renders a triangular warning symbol with an exclamation mark. This SVG icon component is designed to provide visual feedback for warning states, error conditions, or alert notifications throughout the application. It's part of the Phosphor icon family (`pi` prefix) and offers a filled variant for stronger visual emphasis compared to outline icons.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server side, improving performance and reducing the client-side JavaScript bundle size.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Extends React's built-in SVG properties |

### Common SVG Props
- `className`: CSS classes for styling
- `style`: Inline styles
- `onClick`: Click event handler
- `aria-label`: Accessibility label
- `role`: ARIA role
- `width`/`height`: Override default size (defaults to "1em")

## Usage Example

```tsx
import { PiAlertFill } from '@/components/icons/pi/pi-alert-fill';

// Basic usage
function ErrorMessage() {
  return (
    <div className="flex items-center gap-2 text-red-600">
      <PiAlertFill />
      <span>Something went wrong!</span>
    </div>
  );
}

// With custom styling
function WarningBanner() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <PiAlertFill 
          className="text-yellow-600 mt-0.5 flex-shrink-0" 
          aria-label="Warning"
        />
        <div>
          <h3 className="font-medium text-yellow-800">
            Account requires verification
          </h3>
          <p className="text-yellow-700 text-sm mt-1">
            Please check your email to verify your account.
          </p>
        </div>
      </div>
    </div>
  );
}

// In form validation
function FormField() {
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div>
      <input 
        type="email" 
        className={`border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
          <PiAlertFill className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Interactive with click handler
function DismissibleAlert() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PiAlertFill className="text-red-500" />
          <span className="text-red-800">Error processing request</span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a filled triangular alert icon with exclamation mark
- **Scalable Vector**: Maintains crisp appearance at any size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Flexible Sizing**: Defaults to "1em" (inherits font size) but accepts custom dimensions
- **Accessibility Ready**: Supports ARIA attributes for screen readers

### Visual Design
- **Triangular Shape**: Classic warning symbol shape for universal recognition
- **Filled Style**: Solid fill provides strong visual weight for critical alerts
- **Centered Icon**: Exclamation mark and dot properly centered within triangle
- **24x24 ViewBox**: Standard icon dimensions for consistent sizing

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't require TanStack Query, Zustand, or local state management. All dynamic behavior is controlled by parent components through props.

## Side Effects

**No Side Effects** - This component is purely functional with no:
- API calls
- Browser storage access
- External service interactions
- DOM mutations beyond rendering

## Dependencies

### Direct Dependencies
- `react`: For `SVGProps` type definition
- No external libraries or custom hooks required

### Integration Dependencies
- **Parent Components**: Relies on parent for styling context (color, size)
- **CSS Framework**: Works with Tailwind CSS classes for styling
- **Theme System**: Inherits colors from design system tokens

## Integration

### Application Architecture Role
- **UI Layer**: Part of the base UI component library in `/components/icons/`
- **Design System**: Follows Phosphor icon family conventions
- **Reusability**: Can be used across all application domains
- **Composability**: Designed to compose with other UI components

### Common Integration Patterns
```tsx
// In alert/notification components
import { PiAlertFill } from '@/components/icons/pi/pi-alert-fill';
import { Alert } from '@/components/ui/alert';

// In form validation systems
import { useFormValidation } from '@/hooks/useFormValidation';

// In toast notification systems
import { toast } from '@/components/ui/toast';
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Properly implemented as server component for performance
✅ **Component Decomposition**: Atomic, single-responsibility component
✅ **Reusability**: Located in `/ui/` equivalent structure for cross-domain usage
✅ **Type Safety**: Uses proper TypeScript definitions with `SVGProps`

### Usage Guidelines
```tsx
// ✅ Good: Semantic usage with proper context
<div className="error-message">
  <PiAlertFill aria-label="Error" />
  <span>Error message</span>
</div>

// ✅ Good: Consistent sizing with design system
<PiAlertFill className="w-5 h-5 text-red-500" />

// ✅ Good: Accessibility consideration
<PiAlertFill role="img" aria-label="Warning indicator" />

// ❌ Avoid: Using for non-alert contexts
<PiAlertFill /> {/* as a decorative element */}

// ❌ Avoid: Inconsistent sizing
<PiAlertFill style={{ width: '23px', height: '19px' }} />
```

### Performance Considerations
- **Bundle Size**: Minimal impact due to simple SVG structure
- **Rendering**: No re-render concerns as it's stateless
- **Server-Side**: Renders efficiently on server without hydration needs
- **Accessibility**: Always provide `aria-label` for screen readers when used without accompanying text