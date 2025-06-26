# PiErrorWarningLine Icon Component

## Purpose

The `PiErrorWarningLine` component renders an SVG icon representing an error or warning state with a line-style design. It displays a circular outline with an exclamation mark inside, commonly used to indicate alerts, warnings, or error conditions in user interfaces. This icon follows a consistent visual style within the application's icon system and provides semantic meaning for error states.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without requiring the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element for maximum flexibility |

### Extended SVG Props (via spread)
| Common Props | Type | Description |
|--------------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `onMouseEnter` | `MouseEventHandler` | Mouse enter event handler |
| `aria-label` | `string` | Accessibility label |
| `title` | `string` | Tooltip text |

## Usage Example

```tsx
import { PiErrorWarningLine } from '@/components/icons/pi/pi-error-warning-line';

// Basic usage
function ErrorMessage() {
  return (
    <div className="flex items-center gap-2 text-red-600">
      <PiErrorWarningLine />
      <span>Please fix the errors below</span>
    </div>
  );
}

// With custom styling
function ValidationAlert() {
  return (
    <div className="alert alert-error">
      <PiErrorWarningLine 
        className="w-5 h-5 text-red-500" 
        aria-label="Error"
      />
      <p>Invalid email format</p>
    </div>
  );
}

// Interactive usage
function ClickableWarning() {
  const handleWarningClick = () => {
    console.log('Warning clicked');
  };

  return (
    <button 
      className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
      onClick={handleWarningClick}
    >
      <PiErrorWarningLine className="w-4 h-4" />
      View Details
    </button>
  );
}

// In form validation
function FormField() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="form-field">
      <input type="email" className={error ? 'border-red-500' : ''} />
      {error && (
        <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
          <PiErrorWarningLine className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Sizing**: Default 1em dimensions scale with font size
- **Accessible by Default**: Can accept ARIA attributes for screen readers
- **Event Handling**: Supports all standard SVG/DOM events through props spreading
- **Customizable**: Accepts all SVG props for styling and behavior modification

### Visual Design
- **Outline Style**: Line-based design with circular border and exclamation mark
- **Consistent Geometry**: 24x24 viewBox with standardized proportions
- **Fill Rules**: Uses `fillRule='evenodd'` and `clipRule='evenodd'` for proper rendering
- **Symbol Elements**: Circle outline with vertical line and dot for exclamation point

## State Management

**No State Management Required** - This is a stateless presentational component that:
- Does not manage any internal state
- Does not require TanStack Query (no server data)
- Does not require Zustand (no global client state)
- Relies entirely on props for configuration
- Maintains no side effects or lifecycle state

## Side Effects

**No Side Effects** - This component:
- Makes no API calls or external requests
- Does not interact with browser APIs
- Does not modify global state or DOM outside its scope
- Does not perform any asynchronous operations
- Is purely deterministic based on props input

## Dependencies

### Direct Dependencies
- **React**: Uses `SVGProps` type from React
- **TypeScript**: Leverages TypeScript for type safety

### Related Components
- **Other Pi Icons**: Part of the Pi icon family with consistent styling
- **Error Components**: Commonly used with error boundaries, alerts, and validation messages
- **Form Components**: Frequently integrated with form validation displays
- **Notification Systems**: Used in toast notifications and alert components

### Integration Points
- **Design System**: Follows application icon conventions and sizing standards
- **Theme System**: Inherits colors from CSS custom properties and theme variables
- **Accessibility**: Works with screen readers and keyboard navigation patterns

## Integration

### Architecture Fit
```
Application Architecture
├── UI Components (Generic)
│   ├── Alert → uses PiErrorWarningLine
│   ├── FormField → uses for validation display
│   └── Toast → uses for error notifications
├── Feature Components (Domain-specific)
│   ├── AuthForm → validation errors
│   ├── DataTable → row-level warnings
│   └── Settings → configuration alerts
└── Icons System
    └── Pi Icons
        └── PiErrorWarningLine ← Current component
```

### Common Integration Patterns
- **Form Validation**: Display field-level errors and warnings
- **Alert Systems**: Visual indicator for error/warning notifications
- **Status Indicators**: Show problematic states in data displays
- **Interactive Elements**: Clickable warnings and error details
- **Loading States**: Error states in data fetching scenarios

## Best Practices

### Architectural Compliance
✅ **Server Component**: Correctly implemented as server-renderable component  
✅ **Component Decomposition**: Atomic, reusable icon component  
✅ **Props Interface**: Uses standard React patterns with proper TypeScript  
✅ **No State Management**: Appropriately stateless for its purpose  

### Usage Guidelines
- **Semantic Usage**: Use specifically for error and warning contexts
- **Color Inheritance**: Leverage `currentColor` for consistent theming
- **Size Consistency**: Use standard sizing (w-4 h-4, w-5 h-5) across the application
- **Accessibility**: Always provide `aria-label` or context for screen readers
- **Performance**: No memo needed due to simple props and no complex rendering

### Anti-Patterns to Avoid
❌ Adding 'use client' directive (unnecessary for static SVG)  
❌ Hardcoding colors (breaks theme consistency)  
❌ Complex prop interfaces (keep it simple with SVG props)  
❌ Internal state management (should remain stateless)  
❌ Direct DOM manipulation (let React handle rendering)