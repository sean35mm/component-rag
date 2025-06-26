# PiInformationLine Icon Component

## Purpose

The `PiInformationLine` component is an SVG icon that displays an information symbol featuring a circle with an "i" inside it. This icon is typically used in user interfaces to indicate informational content, help text, tooltips, or alert messages that provide additional context or guidance to users.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the `'use client'` directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
| Common Props | Type | Description |
|--------------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click handler function |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiInformationLine } from '@/components/icons/pi/pi-information-line';

// Basic usage
export function InfoTooltip() {
  return (
    <div className="flex items-center gap-2">
      <span>Account Balance</span>
      <PiInformationLine className="text-blue-500 cursor-help" />
    </div>
  );
}

// With click handler and accessibility
export function InfoButton() {
  const handleInfoClick = () => {
    // Show help modal or tooltip
  };

  return (
    <button
      onClick={handleInfoClick}
      className="p-1 rounded hover:bg-gray-100"
      aria-label="Show more information"
    >
      <PiInformationLine 
        className="w-4 h-4 text-gray-600"
        aria-hidden="true"
      />
    </button>
  );
}

// In form field with help text
export function FormFieldWithInfo() {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <label htmlFor="password">Password</label>
        <PiInformationLine 
          className="w-3 h-3 text-gray-400"
          title="Password must be at least 8 characters"
        />
      </div>
      <input id="password" type="password" />
    </div>
  );
}

// In alert or notification
export function InfoAlert({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <PiInformationLine className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
      <div className="text-blue-800">{children}</div>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts all ARIA attributes for screen readers
- **Interactive Capable**: Can receive click handlers and other event listeners
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design
- Circular outline with information "i" symbol inside
- Clean line-based design suitable for modern interfaces
- Consistent with design system icon patterns

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It simply renders SVG markup based on the props provided.

## Side Effects

**No Side Effects** - This component is a pure function that doesn't perform any side effects such as:
- API calls
- Local storage access
- DOM manipulation
- External service interactions

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition

### Integration Dependencies
- **UI Components**: Often used within buttons, tooltips, alerts, and form components
- **Icon System**: Part of the larger Phosphor icon collection
- **Design System**: Integrates with application theme and color schemes

## Integration

### Application Architecture Role
```
┌─────────────────┐
│   Page/Layout   │
│                 │
├─────────────────┤
│ Feature Components │
│ • Forms         │
│ • Alerts        │
│ • Tooltips      │
│                 │
├─────────────────┤
│  UI Components  │
│ • Button        │
│ • Input         │
│ • Card          │
│                 │
├─────────────────┤
│ Icon Components │ ← PiInformationLine
│ • PiInformationLine │
│ • Other Icons   │
└─────────────────┘
```

### Common Integration Patterns
- **Information Tooltips**: Paired with tooltip components to show help text
- **Form Validation**: Used in error states and help text
- **Alert Systems**: Integrated into notification and alert components
- **Interactive Help**: Combined with modal or popover components

## Best Practices

### Architecture Adherence
✅ **Server Component**: Properly implemented as server component without unnecessary client-side code
✅ **Flat Composition**: Simple, focused component that composes well with others
✅ **Reusable Design**: Generic icon that can be used across multiple domains
✅ **Type Safety**: Properly typed with SVGProps interface

### Usage Recommendations

1. **Accessibility First**
```tsx
// Good: Provide context for screen readers
<PiInformationLine 
  aria-label="Additional information about this field"
  role="img"
/>

// Better: Hide decorative icons from screen readers
<PiInformationLine aria-hidden="true" />
<span className="sr-only">Password requirements</span>
```

2. **Consistent Sizing**
```tsx
// Good: Use consistent size classes
<PiInformationLine className="w-4 h-4" />

// Better: Let it scale with text
<div className="text-sm">
  <PiInformationLine /> {/* Scales with text-sm */}
</div>
```

3. **Color Integration**
```tsx
// Good: Use semantic colors
<PiInformationLine className="text-blue-600" />

// Better: Use color that inherits from parent
<div className="text-blue-600">
  <PiInformationLine /> {/* Inherits blue-600 */}
</div>
```

4. **Interactive States**
```tsx
// Good: Provide hover states for interactive icons
<PiInformationLine className="hover:text-blue-700 cursor-help" />
```

### Performance Considerations
- **Bundle Size**: Minimal impact as it's a simple SVG component
- **Rendering**: Fast server-side rendering with no hydration overhead
- **Caching**: Can be cached effectively as a static component