# IconNavigationLibrary Component

## Purpose
The `IconNavigationLibrary` component renders an SVG icon depicting an open book or library symbol. This icon is designed for use in navigation menus, library sections, or any UI element that represents books, documentation, or knowledge resources. It follows a consistent design pattern with other navigation icons in the system.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { IconNavigationLibrary } from '@/components/icons/icon-navigation-library';

// Basic usage
export function LibraryNavItem() {
  return (
    <nav>
      <a href="/library" className="flex items-center gap-2">
        <IconNavigationLibrary />
        <span>Library</span>
      </a>
    </nav>
  );
}

// With custom styling
export function StyledLibraryIcon() {
  return (
    <IconNavigationLibrary 
      className="text-blue-600 hover:text-blue-800"
      style={{ fontSize: '24px' }}
    />
  );
}

// With accessibility
export function AccessibleLibraryButton() {
  return (
    <button className="p-2">
      <IconNavigationLibrary 
        aria-label="Open library"
        role="img"
      />
    </button>
  );
}

// In a navigation menu
export function MainNavigation() {
  return (
    <nav className="flex space-x-4">
      <NavItem href="/library" icon={IconNavigationLibrary}>
        Documentation
      </NavItem>
    </nav>
  );
}
```

## Functionality
- **Scalable Vector Icon**: Renders crisp at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` for automatic color inheritance from parent text color
- **Responsive Design**: Scales with font-size using `em` units
- **Accessibility Ready**: Accepts ARIA attributes and semantic props
- **Customizable**: Accepts all standard SVG props for styling and behavior

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state or external state dependencies.

## Side Effects
**None** - Pure functional component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for proper TypeScript support

### External Dependencies
- None - No external libraries or components required

## Integration

### Design System Integration
```tsx
// Part of the icon system
import { IconNavigationLibrary } from '@/components/icons/icon-navigation-library';
import { IconNavigationHome } from '@/components/icons/icon-navigation-home';
import { IconNavigationSettings } from '@/components/icons/icon-navigation-settings';

// Used in navigation components
export function SidebarNavigation() {
  const navItems = [
    { icon: IconNavigationHome, label: 'Home', href: '/' },
    { icon: IconNavigationLibrary, label: 'Library', href: '/library' },
    { icon: IconNavigationSettings, label: 'Settings', href: '/settings' },
  ];

  return (
    <nav>
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          <item.icon />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

### Component Composition
```tsx
// Composed with other UI components
export function LibraryCard({ title, description }: LibraryCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <IconNavigationLibrary className="text-xl" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Appropriately uses server component as it's purely presentational
- ✅ **Component Decomposition**: Simple, focused component that does one thing well
- ✅ **Reusability**: Located in `/components/icons/` for system-wide reuse
- ✅ **TypeScript**: Properly typed with SVG props interface

### Usage Guidelines
```tsx
// ✅ Good: Semantic usage with proper labeling
<IconNavigationLibrary aria-label="Library section" />

// ✅ Good: Consistent sizing with design system
<IconNavigationLibrary className="text-lg" />

// ✅ Good: Color inheritance from parent
<div className="text-blue-600">
  <IconNavigationLibrary /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Hardcoded colors that break theming
<IconNavigationLibrary style={{ color: '#ff0000' }} />

// ❌ Avoid: Missing accessibility context
<button>
  <IconNavigationLibrary /> {/* No label for screen readers */}
</button>
```

### Performance Considerations
- **Optimized SVG**: Uses efficient path definitions without unnecessary complexity
- **No Runtime Dependencies**: Zero JavaScript bundle impact beyond React
- **Server Renderable**: Can be rendered at build time for optimal performance