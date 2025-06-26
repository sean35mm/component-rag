# PiForbidLine Icon Component

## Purpose
`PiForbidLine` is an SVG icon component that renders a circular prohibition/forbidden symbol with a diagonal line. This icon is commonly used to indicate restricted access, disabled features, or forbidden actions in user interfaces. It's part of the Pi icon library and follows consistent sizing and styling patterns.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiForbidLine } from '@/components/icons/pi/pi-forbid-line';

// Basic usage
export function AccessDeniedMessage() {
  return (
    <div className="flex items-center gap-2 text-red-600">
      <PiForbidLine />
      <span>Access Denied</span>
    </div>
  );
}

// With custom styling
export function DisabledFeatureCard() {
  return (
    <div className="p-4 border rounded-lg opacity-50">
      <div className="flex items-center gap-3 mb-2">
        <PiForbidLine 
          className="text-red-500 text-xl" 
          aria-label="Feature disabled"
        />
        <h3 className="font-semibold">Premium Feature</h3>
      </div>
      <p className="text-gray-600">
        This feature is not available in your current plan.
      </p>
    </div>
  );
}

// Interactive usage with click handler
export function PermissionToggle({ 
  isBlocked, 
  onToggle 
}: { 
  isBlocked: boolean; 
  onToggle: () => void; 
}) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors ${
        isBlocked 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      }`}
      aria-label={isBlocked ? 'Remove restriction' : 'Add restriction'}
    >
      <PiForbidLine className="text-lg" />
    </button>
  );
}

// In forms with validation state
export function FormFieldWithError({ error }: { error?: string }) {
  return (
    <div className="space-y-1">
      <input 
        type="email" 
        className={`w-full px-3 py-2 border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Enter email"
      />
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <PiForbidLine className="text-xs" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
```

## Functionality

### Visual Features
- **Circular Design**: Renders as a circle with a diagonal prohibition line
- **Scalable Vector**: Maintains crisp appearance at any size using SVG
- **Current Color**: Inherits text color from parent elements via `fill='currentColor'`
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size

### Accessibility
- Accepts `aria-label` and `role` props for screen reader compatibility
- Can be hidden from screen readers with `aria-hidden="true"` when decorative
- Supports keyboard navigation when used within interactive elements

## State Management
**No State Management** - This is a pure presentational component with no internal state. Any state management would be handled by parent components using:
- **TanStack Query**: For server state related to permissions or feature flags
- **Zustand**: For client-side UI state like toggle states or user preferences
- **Local State**: For simple interactive behaviors in parent components

## Side Effects
**No Side Effects** - This component:
- Does not make API calls
- Does not interact with browser APIs
- Does not cause re-renders beyond normal React reconciliation
- Has no lifecycle effects or cleanup requirements

## Dependencies

### Direct Dependencies
- **React**: `SVGProps` type from React for TypeScript support
- **No external libraries**: Pure React component with no additional dependencies

### Integration Dependencies
- **Tailwind CSS**: Commonly styled using Tailwind classes in parent components
- **Theme System**: Inherits colors from CSS custom properties or theme context
- **Icon System**: Part of the broader Pi icon library ecosystem

## Integration

### Component Architecture Alignment
```tsx
// UI Layer - Pure presentation
export function ForbiddenIcon() {
  return <PiForbidLine className="text-red-500" />;
}

// Feature Layer - Business logic integration
export function PermissionGuard({ children, hasPermission }) {
  if (!hasPermission) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <PiForbidLine />
        <span>Insufficient permissions</span>
      </div>
    );
  }
  return children;
}

// Page Layer - Full feature integration
export function AdminDashboard() {
  const { data: permissions } = usePermissions(); // TanStack Query
  
  return (
    <div className="space-y-4">
      {permissions?.map(permission => (
        <PermissionItem 
          key={permission.id}
          permission={permission}
          icon={permission.blocked ? PiForbidLine : CheckIcon}
        />
      ))}
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side interactivity, safe for SSR
- ✅ **Flat Structure**: Simple, single-purpose component without nesting
- ✅ **Reusable**: Generic icon component usable across domains
- ✅ **Composable**: Easily combined with other UI components

### Usage Patterns
- **Semantic HTML**: Wrap in appropriate semantic elements (`<button>`, `<div>`, etc.)
- **Accessibility**: Always provide context through labels or surrounding text
- **Performance**: Lightweight SVG with minimal DOM impact
- **Styling**: Use CSS classes rather than inline styles for consistency

### Integration Guidelines
- Use in permission systems and access control UI
- Combine with form validation to indicate errors or restrictions
- Include in status indicators and feature availability displays
- Integrate with theme systems for consistent color schemes