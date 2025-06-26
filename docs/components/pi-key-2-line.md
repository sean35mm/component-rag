# PiKey2Line Icon Component

## Purpose
The `PiKey2Line` component is an SVG-based icon that renders a line-style key symbol. This icon is part of the Phosphor Icons (Pi) collection and is typically used to represent authentication, security, access control, or password-related functionality within the application interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any interactivity, state management, or client-side JavaScript requirements. It can be safely rendered on the server side.

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
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiKey2Line } from '@/components/icons/pi/pi-key-2-line';

// Basic usage
function LoginForm() {
  return (
    <div className="flex items-center gap-2">
      <PiKey2Line />
      <span>Password</span>
    </div>
  );
}

// With custom styling
function SecuritySection() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiKey2Line 
        className="text-blue-600" 
        style={{ fontSize: '1.25rem' }}
      />
      <span>Security Settings</span>
    </button>
  );
}

// With accessibility
function AccessControlPanel() {
  return (
    <div className="security-panel">
      <PiKey2Line 
        aria-label="Access key icon"
        role="img"
        className="w-6 h-6"
      />
      <h2>Manage Access Keys</h2>
    </div>
  );
}

// Interactive usage
function PasswordToggle({ onClick }: { onClick: () => void }) {
  return (
    <PiKey2Line 
      className="cursor-pointer text-gray-500 hover:text-gray-700"
      onClick={onClick}
      aria-label="Toggle password visibility"
    />
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Rendering**: Renders crisp at any size using SVG format
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Responsive Sizing**: Default `1em` dimensions scale with font size
- **Accessible**: Supports all ARIA attributes for screen readers
- **Interactive**: Can handle click events and other user interactions

### Visual Characteristics
- **Style**: Outline/line style key icon
- **Viewbox**: 24x24 coordinate system
- **Paths**: Complex key shape with circular head and angular shaft
- **Fill Rule**: Uses `evenodd` and `clipRule` for proper path rendering

## State Management
**No State Management** - This is a stateless presentational component that doesn't require any state management solution. All behavior is controlled through props passed from parent components.

## Side Effects
**No Side Effects** - This component performs no API calls, side effects, or external interactions. It's a pure rendering component that outputs SVG markup based on input props.

## Dependencies

### Internal Dependencies
- `React` - Uses `SVGProps` type for prop typing
- No other internal component dependencies

### External Dependencies
- None - This is a self-contained SVG component

## Integration

### Application Architecture Role
```
UI Layer (Leaf Component)
├── Feature Components (Auth, Security, Settings)
├── Layout Components (Forms, Panels, Navigation)
└── PiKey2Line (Visual indicator/decoration)
```

### Common Integration Patterns
- **Form Components**: Password fields, authentication forms
- **Navigation**: Security settings, account management
- **Feature Components**: Access control, API key management
- **UI Components**: Buttons, cards, list items with security context

### Design System Integration
```tsx
// In a design system component
function SecurityCard({ title, children, ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <PiKey2Line className="text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server-renderable component  
✅ **Flat Structure**: Single-level component without unnecessary nesting  
✅ **Reusable**: Properly placed in `/icons/` directory for cross-application use  
✅ **Type Safety**: Uses proper TypeScript interfaces from React  

### Usage Recommendations
- **Semantic Context**: Always use in security/authentication related contexts
- **Accessibility**: Include `aria-label` when icon conveys important information
- **Sizing**: Rely on CSS/className for sizing rather than inline styles when possible
- **Color**: Leverage `currentColor` behavior for consistent theming
- **Performance**: Can be safely used in lists without memoization concerns

### Anti-Patterns to Avoid
❌ Don't add 'use client' directive unnecessarily  
❌ Don't wrap in additional div elements without purpose  
❌ Don't hardcode colors that break theme consistency  
❌ Don't use for non-security related contexts (confuses users)  