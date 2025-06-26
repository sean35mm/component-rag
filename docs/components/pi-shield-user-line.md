# PiShieldUserLine Icon Component

## Purpose
The `PiShieldUserLine` component is an SVG icon that displays a shield with a user silhouette in line/outline style. It represents user security, protection, or user account security features within the application's interface. This icon is commonly used for security settings, user protection features, or authenticated user areas.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

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
import { PiShieldUserLine } from '@/components/icons/pi/pi-shield-user-line';

// Basic usage
export function SecuritySettings() {
  return (
    <div className="flex items-center gap-2">
      <PiShieldUserLine />
      <span>Account Security</span>
    </div>
  );
}

// With custom styling
export function UserProtectionCard() {
  return (
    <div className="security-card">
      <PiShieldUserLine 
        className="w-6 h-6 text-blue-600" 
        aria-label="User protection"
      />
      <h3>Your account is protected</h3>
    </div>
  );
}

// Interactive usage
export function SecurityToggle() {
  const handleSecurityClick = () => {
    // Handle security settings navigation
  };

  return (
    <button 
      onClick={handleSecurityClick}
      className="flex items-center gap-2 p-2 hover:bg-gray-100"
    >
      <PiShieldUserLine className="w-5 h-5" />
      <span>Security Settings</span>
    </button>
  );
}

// In navigation menu
export function UserMenu() {
  return (
    <nav>
      <a href="/security" className="nav-item">
        <PiShieldUserLine className="nav-icon" />
        Security & Privacy
      </a>
    </nav>
  );
}
```

## Functionality
- **Static SVG Rendering**: Renders a scalable vector graphic with shield and user iconography
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size by default
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Customizable**: Accepts all standard SVG props for styling and interaction

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies
- `React` - Uses `SVGProps` type from React
- **No external dependencies** - Self-contained SVG icon component

## Integration
This component fits into the application architecture as:

- **Icon System**: Part of the Phosphor Icons (pi) collection in `/components/icons/pi/`
- **Design System**: Provides consistent iconography across the application
- **UI Components**: Can be used within buttons, cards, navigation, and other UI components
- **Theming**: Integrates with CSS custom properties and Tailwind classes for consistent styling
- **Accessibility**: Supports ARIA attributes and semantic HTML patterns

### Common Integration Patterns

```tsx
// In feature components
import { PiShieldUserLine } from '@/components/icons/pi/pi-shield-user-line';

// Security dashboard
export function SecurityDashboard() {
  return (
    <div className="dashboard-section">
      <div className="section-header">
        <PiShieldUserLine className="section-icon" />
        <h2>Account Security</h2>
      </div>
      {/* Dashboard content */}
    </div>
  );
}

// Status indicators
export function SecurityStatus({ isSecure }: { isSecure: boolean }) {
  return (
    <div className={`status ${isSecure ? 'secure' : 'warning'}`}>
      <PiShieldUserLine className="status-icon" />
      <span>{isSecure ? 'Protected' : 'Action Required'}</span>
    </div>
  );
}
```

## Best Practices
- **Semantic Usage**: Use for security-related features, user protection, or account safety contexts
- **Accessibility**: Always provide `aria-label` when used without accompanying text
- **Consistent Sizing**: Use Tailwind sizing classes (`w-4 h-4`, `w-6 h-6`) for consistency
- **Color Inheritance**: Leverage `currentColor` by setting text color on parent elements
- **Performance**: Component is lightweight and suitable for frequent usage
- **Type Safety**: Fully typed with TypeScript for reliable integration
- **Server-Side Rendering**: Safe to use in Server Components and SSR contexts

### Architecture Adherence
- ✅ **Server Component** by default (no client-side features)
- ✅ **Reusable UI Component** in appropriate `/icons/` directory
- ✅ **Flat Component Structure** - single-purpose, composable icon
- ✅ **TypeScript Integration** with proper prop typing
- ✅ **No State Complexity** - pure presentational component