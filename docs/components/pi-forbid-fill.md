# PiForbidFill Icon Component

## Purpose

The `PiForbidFill` component is a filled prohibit/forbid icon that visually represents restrictions, forbidden actions, or disabled states. It displays a filled circle with a diagonal line, commonly used in user interfaces to indicate that something is not allowed, blocked, or prohibited.

## Component Type

**Server Component** - This is a presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including className, style, onClick, etc. |

### Inherited SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiForbidFill } from '@/components/icons/pi/pi-forbid-fill';

// Basic usage
export default function AccessControl() {
  return (
    <div className="flex items-center gap-2">
      <PiForbidFill />
      <span>Access Denied</span>
    </div>
  );
}

// With custom styling
export default function RestrictedFeature() {
  return (
    <button 
      disabled 
      className="flex items-center gap-2 text-red-500 cursor-not-allowed"
    >
      <PiForbidFill 
        className="w-5 h-5" 
        aria-label="Feature restricted"
      />
      <span>Premium Feature</span>
    </button>
  );
}

// In permission-based UI
export default function UserPermissions() {
  const hasPermission = false;
  
  return (
    <div className="space-y-4">
      {!hasPermission && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
          <PiForbidFill className="text-red-600 w-4 h-4" />
          <span className="text-red-800">
            You don't have permission to perform this action
          </span>
        </div>
      )}
    </div>
  );
}

// In form validation
export default function ValidationMessage() {
  return (
    <div className="flex items-center gap-1 text-sm text-red-600">
      <PiForbidFill className="w-3 h-3" />
      <span>This field contains invalid data</span>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector**: Renders crisp at any size using `1em` dimensions
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Responsive Design**: Scales with font-size using `em` units
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design
- Filled circle outline representing a boundary or limit
- Diagonal line indicating prohibition or restriction
- Clean, minimalist design following Phosphor icon standards

## State Management

**No State Management** - This is a pure presentational component with no internal state. It simply renders an SVG based on the props passed to it.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Type Dependencies
- `SVGProps<SVGSVGElement>` - TypeScript interface for SVG element properties

## Integration

### Icon System Integration
```tsx
// Combine with other Phosphor icons
import { PiForbidFill } from '@/components/icons/pi/pi-forbid-fill';
import { PiCheckCircleFill } from '@/components/icons/pi/pi-check-circle-fill';

export default function StatusIndicators({ isAllowed }: { isAllowed: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {isAllowed ? (
        <PiCheckCircleFill className="text-green-500" />
      ) : (
        <PiForbidFill className="text-red-500" />
      )}
    </div>
  );
}
```

### Component Library Integration
```tsx
// Use in custom UI components
import { PiForbidFill } from '@/components/icons/pi/pi-forbid-fill';
import { Alert } from '@/components/ui/alert';

export default function ErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert variant="destructive">
      <PiForbidFill className="h-4 w-4" />
      {children}
    </Alert>
  );
}
```

### Permission System Integration
```tsx
// Integrate with permission checking
import { PiForbidFill } from '@/components/icons/pi/pi-forbid-fill';
import { usePermissions } from '@/hooks/use-permissions';

export default function PermissionGate({ 
  permission, 
  children 
}: { 
  permission: string;
  children: React.ReactNode;
}) {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) {
    return (
      <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
        <PiForbidFill className="text-gray-500" />
        <span>Access restricted</span>
      </div>
    );
  }
  
  return <>{children}</>;
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side JavaScript needed
- ✅ **Flat Structure**: Simple, single-purpose component
- ✅ **Reusable**: Generic icon that can be used across domains
- ✅ **Type Safe**: Proper TypeScript integration with SVG props

### Usage Guidelines
```tsx
// ✅ Good: Semantic usage with context
<div className="flex items-center gap-2 text-red-600">
  <PiForbidFill aria-label="Access denied" />
  <span>Permission required</span>
</div>

// ✅ Good: Consistent sizing with other icons
<PiForbidFill className="w-4 h-4" />

// ✅ Good: Color coordination with design system
<PiForbidFill className="text-destructive" />

// ❌ Avoid: Missing context for screen readers
<PiForbidFill />

// ❌ Avoid: Inline styles when CSS classes available
<PiForbidFill style={{ color: 'red', width: '16px' }} />
```

### Accessibility
- Always provide `aria-label` when icon stands alone
- Ensure sufficient color contrast (minimum 3:1 ratio)
- Use semantic HTML structure around the icon
- Consider `role="img"` for decorative usage

### Performance
- Component is lightweight with no runtime overhead
- SVG is optimized for minimal file size
- Server-side rendering eliminates client-side icon loading