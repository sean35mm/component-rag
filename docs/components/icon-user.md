# IconUser Component

## Purpose
The `IconUser` component renders an SVG icon representing a user profile or person. It displays a minimalist user silhouette consisting of a circular head and body shape, commonly used in user interfaces for profile indicators, avatars, authentication forms, and user management sections.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
Common props you can pass include:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { IconUser } from '@/components/icons/icon-user';

// Basic usage
export function UserProfile() {
  return (
    <div className="flex items-center gap-2">
      <IconUser className="w-4 h-4 text-gray-600" />
      <span>Profile</span>
    </div>
  );
}

// With click handler (requires 'use client')
'use client';

export function UserMenu() {
  const handleUserClick = () => {
    // Handle user menu toggle
  };

  return (
    <button 
      onClick={handleUserClick}
      className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
      aria-label="Open user menu"
    >
      <IconUser className="w-5 h-5 text-blue-600" />
    </button>
  );
}

// In navigation
export function Header() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="logo">App Name</div>
      <div className="flex items-center gap-4">
        <IconUser className="w-6 h-6 text-gray-700" />
        <span>John Doe</span>
      </div>
    </nav>
  );
}

// With custom styling
export function UserCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <IconUser 
        className="w-12 h-12 text-gray-400 mx-auto mb-2" 
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />
      <h3 className="text-center">User Profile</h3>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Icon**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `fill="currentColor"` to inherit text color from parent
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Flexible Styling**: Accepts all standard SVG props for customization

### Visual Design
- Displays a simplified user silhouette with head and body
- Clean, minimalist design suitable for modern interfaces
- Follows standard iconography conventions for user representation

## State Management
**No State Management** - This is a stateless presentational component that renders static SVG content based on props.

## Side Effects
**No Side Effects** - Pure component with no API calls, side effects, or external interactions.

## Dependencies

### Internal Dependencies
- `SVGProps` from React for TypeScript prop typing

### External Dependencies
- React (for JSX and SVGProps type)

### No Component Dependencies
- Self-contained icon component with no dependencies on other application components

## Integration

### Application Architecture Role
- **UI Layer**: Part of the base icon system in `/components/icons/`
- **Design System**: Provides consistent user iconography across the application
- **Reusable Asset**: Used throughout user-related features and interfaces

### Common Integration Patterns

```tsx
// Authentication forms
export function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="relative">
        <IconUser className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Username"
          className="pl-10 w-full p-2 border rounded"
        />
      </div>
    </form>
  );
}

// User management tables
export function UserTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <IconUser className="w-4 h-4 inline mr-2" />
            User
          </th>
        </tr>
      </thead>
    </table>
  );
}

// Navigation menus
export function SidebarNav() {
  return (
    <nav>
      <a href="/profile" className="flex items-center gap-3 p-2">
        <IconUser className="w-5 h-5" />
        Profile
      </a>
    </nav>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Stateless and server-renderable by default
- ✅ **Flat Structure**: Simple, single-purpose component without nesting
- ✅ **Reusability**: Located in `/components/icons/` for application-wide use
- ✅ **Prop Flexibility**: Accepts all SVG props for maximum customization

### Usage Guidelines
- **Sizing**: Use Tailwind classes like `w-4 h-4`, `w-5 h-5` for consistent sizing
- **Color**: Leverage `text-*` classes to control icon color via currentColor
- **Accessibility**: Always provide `aria-label` when icon conveys important information
- **Semantic Context**: Use within appropriate semantic elements (buttons, links, etc.)

### Performance Considerations
- **Lightweight**: Minimal SVG markup with optimized path data
- **No Bundle Impact**: Self-contained with no external dependencies
- **Server Renderable**: Can be included in initial HTML payload

### Integration Best Practices
- Combine with text labels for better UX
- Use consistent sizing patterns across the application
- Implement proper focus states when interactive
- Consider icon placement in relation to accompanying text