# Person Icon Component Documentation

## Purpose
The `Person` component is a reusable SVG icon that renders a stylized person/user avatar icon. It's designed to be used throughout the application wherever a generic user representation is needed, such as in navigation bars, user profiles, authentication forms, or user listing interfaces.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, `fill`, etc. Props are spread to the root `<svg>` element |

## Usage Example

```tsx
import { Person } from '@/components/icons/person';

// Basic usage
<Person />

// With custom styling
<Person 
  className="text-blue-500 hover:text-blue-700" 
  width={24} 
  height={24} 
/>

// As a clickable button icon
<button 
  onClick={() => openUserMenu()}
  className="p-2 rounded-full hover:bg-gray-100"
>
  <Person className="w-5 h-5" />
  <span className="sr-only">Open user menu</span>
</button>

// In a navigation component
<nav className="flex items-center gap-4">
  <Person className="w-6 h-6 text-gray-600" />
  <span>My Profile</span>
</nav>

// With dynamic sizing based on context
<Person 
  width={isLargeScreen ? 32 : 20}
  height={isLargeScreen ? 32 : 20}
  className="transition-colors duration-200"
/>
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size without pixelation
- **Flexible Styling**: Accepts all standard SVG props for complete customization
- **Accessible Design**: Simple, recognizable person silhouette design
- **Optimized Markup**: Minimal SVG code with efficient clip-path usage
- **Design System Integration**: Default 20x20 size fits standard icon sizing conventions

### Visual Design
- Circular clipped container (rounded icon boundary)
- Two-part person representation: head (circle) and body (ellipse)
- Semi-transparent white fill with opacity variations for depth
- Clean, minimalist aesthetic suitable for various UI contexts

## State Management
**None** - This is a stateless presentational component. It renders static SVG markup and doesn't manage any internal state or require external state management.

## Side Effects
**None** - The component has no side effects. It performs no API calls, doesn't interact with browser APIs, and doesn't trigger any external actions.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition
- No external libraries or custom dependencies

### Type Dependencies
- `SVGProps<SVGSVGElement>` from React for comprehensive SVG element prop typing

## Integration

### Application Architecture Fit
- **UI Component Layer**: Located in `/components/icons/` following the flat component organization pattern
- **Design System**: Part of the icon library for consistent visual language
- **Reusability**: Can be imported and used across any feature domain
- **Server-First**: Aligns with server component default strategy

### Common Integration Patterns
```tsx
// In authentication components
import { Person } from '@/components/icons/person';

export function LoginForm() {
  return (
    <form>
      <div className="flex items-center gap-2">
        <Person className="w-4 h-4 text-gray-500" />
        <input type="email" placeholder="Email" />
      </div>
    </form>
  );
}

// In navigation components
import { Person } from '@/components/icons/person';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Person className="w-6 h-6" />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: No client-side requirements
- ✅ **Flat Organization**: Properly placed in `/components/icons/` directory
- ✅ **Lego Block Pattern**: Single responsibility, highly composable
- ✅ **Reusability**: Generic design suitable for multiple use cases

### Implementation Guidelines
- **Accessibility**: Always provide context when used in interactive elements (aria-labels, sr-only text)
- **Sizing**: Use consistent sizing classes (`w-4 h-4`, `w-6 h-6`) for design system compliance
- **Performance**: Component is lightweight with no runtime overhead
- **Customization**: Leverage props spreading for maximum flexibility without prop drilling

### Integration Recommendations
- Import directly where needed rather than re-exporting through barrel files
- Use semantic HTML structure around the icon for better accessibility
- Apply hover and focus states through parent elements rather than the icon itself
- Consider using with other UI components like buttons, dropdown triggers, or form inputs