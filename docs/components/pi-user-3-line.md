# PiUser3Line Icon Component

## Purpose

The `PiUser3Line` component is an SVG icon component that renders a line-style user/person icon. It's part of the icon library and provides a consistent, scalable vector graphic for representing users throughout the application. This icon specifically features a person with a circular head and body outline in a line art style.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or event handling. It can be rendered on the server for optimal performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including className, style, onClick, etc. Spreads to the root `<svg>` element |

### Common SVG Props
- `className?: string` - CSS classes for styling
- `style?: CSSProperties` - Inline styles
- `onClick?: MouseEventHandler` - Click event handler
- `aria-label?: string` - Accessibility label
- `role?: string` - ARIA role attribute

## Usage Example

```tsx
import { PiUser3Line } from '@/components/icons/pi/pi-user-3-line';

// Basic usage
function UserProfile() {
  return (
    <div>
      <PiUser3Line />
      <span>User Profile</span>
    </div>
  );
}

// With custom styling
function UserButton() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiUser3Line 
        className="w-5 h-5 text-blue-600" 
        aria-label="User icon"
      />
      <span>My Account</span>
    </button>
  );
}

// With click handler (makes it a Client Component)
'use client';
function InteractiveUserIcon() {
  return (
    <PiUser3Line 
      className="w-6 h-6 cursor-pointer hover:text-blue-500"
      onClick={() => console.log('User icon clicked')}
      role="button"
      aria-label="Open user menu"
    />
  );
}

// In navigation or header
function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <nav className="flex items-center gap-4">
        <PiUser3Line className="w-5 h-5" />
        <span>John Doe</span>
      </nav>
    </header>
  );
}
```

## Functionality

- **Scalable Vector Rendering**: Renders crisp at any size using `1em` dimensions that scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Flexible Styling**: Supports all SVG props for complete customization
- **Responsive Design**: Adapts to parent container sizing and text scale settings

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other icon components in `/components/icons/` directory
- UI components that use this icon (buttons, navigation, user cards, etc.)

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational UI icon system
- **Design System**: Provides consistent user representation across the application
- **Component Composition**: Can be composed within buttons, cards, navigation, and other UI components

### Usage Patterns
```tsx
// In user-related features
import { PiUser3Line } from '@/components/icons/pi/pi-user-3-line';

// User profile components
function UserCard({ user }) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded">
      <PiUser3Line className="w-8 h-8 text-gray-600" />
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

// Navigation menus
function UserMenu() {
  return (
    <nav>
      <a href="/profile" className="flex items-center gap-2">
        <PiUser3Line className="w-4 h-4" />
        Profile
      </a>
    </nav>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side interactivity needed
- ✅ **Component Decomposition**: Single-purpose icon component that can be composed into larger components
- ✅ **Reusability**: Follows UI component pattern in organized icon directory structure

### Implementation Guidelines
- **Consistent Sizing**: Use Tailwind classes like `w-4 h-4`, `w-5 h-5`, or `w-6 h-6` for consistent sizing
- **Color Inheritance**: Leverage `currentColor` by setting text color on parent elements
- **Accessibility**: Always provide `aria-label` when the icon conveys important information
- **Performance**: Keep as Server Component unless click handlers or client interactivity is needed

### Anti-patterns to Avoid
- ❌ Don't make it a Client Component unless you need event handlers
- ❌ Don't hardcode colors in the SVG - use `currentColor` for theme flexibility
- ❌ Don't use without proper ARIA labels in interactive contexts
- ❌ Don't inline the SVG code - use the component for consistency