# PiLogoutBoxLine Icon Component

## Purpose
The `PiLogoutBoxLine` component is an SVG icon that represents a logout action with a box/panel outline design. It's part of the Pi icon set and displays a logout symbol with a box frame, typically used in authentication interfaces, user menus, or navigation areas where users can sign out of the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It doesn't require browser APIs, state management, or event handling beyond basic prop forwarding, making it suitable for server-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiLogoutBoxLine } from '@/components/icons/pi/pi-logout-box-line';

// Basic usage
export function UserMenu() {
  return (
    <div className="user-menu">
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 hover:bg-gray-100"
      >
        <PiLogoutBoxLine className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

// With custom styling and accessibility
export function LogoutButton() {
  return (
    <button 
      onClick={handleLogout}
      className="logout-btn"
      aria-label="Sign out of your account"
    >
      <PiLogoutBoxLine 
        className="w-6 h-6 text-red-600" 
        aria-hidden="true"
      />
    </button>
  );
}

// In navigation component
export function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="nav-items">
        {/* Other nav items */}
      </div>
      <div className="nav-footer">
        <button onClick={handleLogout}>
          <PiLogoutBoxLine className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with a logout box line design
- **Responsive Sizing**: Uses `1em` dimensions that scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG props for maximum flexibility
- **Accessibility Ready**: Can receive ARIA attributes and other accessibility props

## State Management
**None** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems.

## Side Effects
**None** - The component has no side effects. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: Uses `SVGProps` type from React for proper TypeScript support
- **No External Dependencies**: Completely self-contained with no external libraries

## Integration
This component integrates into the application's design system as:

- **Icon System**: Part of the Pi icon collection providing consistent visual language
- **Authentication UI**: Used in login/logout interfaces and user account management
- **Navigation Components**: Integrated into headers, sidebars, and user menus
- **Button Components**: Combined with text or used standalone in action buttons
- **Design System**: Follows the application's icon sizing and color conventions

```tsx
// Integration with auth context
import { useAuth } from '@/contexts/auth-context';
import { PiLogoutBoxLine } from '@/components/icons/pi/pi-logout-box-line';

export function AuthenticatedHeader() {
  const { logout, user } = useAuth();
  
  return (
    <header className="app-header">
      <div className="user-section">
        <span>Welcome, {user.name}</span>
        <button 
          onClick={logout}
          className="logout-button"
        >
          <PiLogoutBoxLine />
        </button>
      </div>
    </header>
  );
}
```

## Best Practices
- **Server Component Usage**: Correctly implemented as a server component since it's purely presentational
- **Prop Spreading**: Properly spreads SVG props for maximum reusability
- **Accessibility**: Always include appropriate ARIA labels when used in interactive elements
- **Semantic HTML**: Combine with semantic button or link elements for proper interaction
- **Icon Sizing**: Use Tailwind classes or CSS to control size rather than hardcoding dimensions
- **Color Management**: Leverages `currentColor` for consistent theming
- **Component Composition**: Designed to be easily composed with other UI components following the "Lego blocks" principle