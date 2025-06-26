# IconGrayDot Component

## Purpose
The `IconGrayDot` component renders a semi-transparent gray circular dot SVG icon. This visual indicator component is typically used to represent inactive states, placeholders, or decorative elements in the UI. The component provides a consistent visual element for indicating neutral or disabled states across the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | All standard SVG attributes including `className`, `style`, `onClick`, etc. Spread into the root SVG element |

## Usage Example

```tsx
import { IconGrayDot } from '@/components/icons/gray-dot';

// Basic usage
export function StatusIndicator() {
  return (
    <div className="flex items-center gap-2">
      <IconGrayDot />
      <span>Inactive</span>
    </div>
  );
}

// With custom styling
export function CustomizedDot() {
  return (
    <IconGrayDot 
      className="w-6 h-6" 
      style={{ opacity: 0.3 }}
    />
  );
}

// As a clickable element
export function InteractiveDot() {
  return (
    <IconGrayDot 
      className="cursor-pointer hover:opacity-75 transition-opacity"
      onClick={() => console.log('Dot clicked')}
      role="button"
      tabIndex={0}
    />
  );
}

// In a status list
export function StatusList() {
  const items = [
    { id: 1, name: 'Item 1', active: false },
    { id: 2, name: 'Item 2', active: true },
  ];

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className="flex items-center gap-2">
          {item.active ? (
            <div className="w-5 h-5 bg-green-500 rounded-full" />
          ) : (
            <IconGrayDot className="w-5 h-5" />
          )}
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
```

## Functionality

### Core Features
- **Static SVG Rendering**: Displays a semi-transparent gray circular dot
- **Flexible Sizing**: Default 80x80 viewBox that scales with CSS classes
- **Layered Opacity**: Multiple circle elements with opacity effects for visual depth
- **Prop Forwarding**: Accepts all standard SVG attributes for customization

### Visual Characteristics
- **Size**: 80x80 viewBox with 20px radius circle
- **Color**: Gray (#6A6A6A and #B1B1B1) with 50% opacity
- **Position**: Centered at coordinates (40, 40)
- **Styling**: Layered circles for subtle visual depth

## State Management
**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the provided props.

## Side Effects
**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- React core (`React`, `SVGAttributes`)

### External Dependencies
- None

### Type Dependencies
```tsx
import { SVGAttributes } from 'react';
```

## Integration

### Application Architecture Role
- **UI Layer**: Sits in the `/components/icons/` directory as a reusable UI primitive
- **Design System**: Part of the icon component library for consistent visual indicators
- **Status Indication**: Commonly used in status displays, navigation, and form elements

### Common Integration Patterns
```tsx
// In status components
import { IconGrayDot } from '@/components/icons/gray-dot';

// In feature components
export function UserStatus({ user }) {
  return (
    <div className="flex items-center">
      {user.isActive ? <ActiveIcon /> : <IconGrayDot />}
      <span>{user.name}</span>
    </div>
  );
}

// In navigation menus
export function NavItem({ item, isActive }) {
  return (
    <li className="flex items-center gap-2">
      {isActive ? <ActiveDot /> : <IconGrayDot className="w-3 h-3" />}
      <span>{item.title}</span>
    </li>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as a server component
- ✅ **Flat Structure**: Simple, non-nested component structure
- ✅ **Reusable UI**: Properly placed in UI components directory
- ✅ **Prop Forwarding**: Flexible through SVG attributes spreading

### Usage Guidelines
- **Sizing**: Use Tailwind classes (`w-4 h-4`, `w-6 h-6`) to control size
- **Accessibility**: Add appropriate ARIA labels when used as interactive elements
- **Semantic Usage**: Use for inactive/neutral states, not active/success states
- **Performance**: No performance considerations needed (static SVG)

### Anti-patterns to Avoid
```tsx
// ❌ Don't wrap unnecessarily
function WrappedGrayDot() {
  return (
    <div>
      <IconGrayDot />
    </div>
  );
}

// ✅ Use directly
<IconGrayDot className="w-4 h-4" />

// ❌ Don't duplicate the component for minor variations
function BlueGrayDot() {
  return <IconGrayDot style={{ fill: 'blue' }} />;
}

// ✅ Create a proper variant or use CSS classes
<IconGrayDot className="text-blue-500" />
```