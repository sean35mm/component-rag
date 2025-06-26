# PiInformationFill Component

## Purpose
The `PiInformationFill` component renders a filled information icon (circle with "i") from the Phosphor Icons collection. It serves as a visual indicator for informational content, help text, tooltips, or alerts within the application's user interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

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
import { PiInformationFill } from '@/components/icons/pi/pi-information-fill';

// Basic usage
function InfoAlert() {
  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
      <PiInformationFill className="text-blue-600 text-lg" />
      <span className="text-blue-800">This is important information</span>
    </div>
  );
}

// Interactive tooltip trigger
function HelpTooltip() {
  return (
    <button 
      className="inline-flex items-center gap-1 text-gray-600 hover:text-blue-600"
      aria-label="Show help information"
    >
      <span>Need help?</span>
      <PiInformationFill className="text-sm" />
    </button>
  );
}

// Form field with info icon
function FormFieldWithInfo() {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm font-medium">
        Email Address
        <PiInformationFill 
          className="text-gray-400 hover:text-gray-600 cursor-help"
          title="We'll never share your email"
        />
      </label>
      <input 
        type="email" 
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
  );
}

// Alert component
function InfoAlert({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <PiInformationFill className="text-blue-600 text-xl mt-0.5 flex-shrink-0" />
      <p className="text-blue-800">{message}</p>
    </div>
  );
}
```

## Functionality
- **SVG Icon Rendering**: Displays a filled circular information icon with consistent 24x24 viewBox
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Prop Forwarding**: Accepts and forwards all standard SVG element properties
- **Accessibility Ready**: Can accept ARIA attributes for screen reader compatibility

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state or interact with external state management systems.

## Side Effects
**None** - Pure functional component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for TypeScript prop typing

### External Dependencies
- React (implicit)

### Related Components
- Other Phosphor icon components in `/components/icons/pi/`
- UI components that commonly use information icons (Alert, Tooltip, Help components)

## Integration
This component integrates into the application's design system as:

- **Icon System**: Part of the standardized Phosphor Icons collection for consistent iconography
- **UI Components**: Used within Alert, Tooltip, Help, and Form components
- **Design Tokens**: Sizing and colors controlled through Tailwind CSS classes
- **Accessibility**: Works with screen readers when proper ARIA labels are provided

### Common Integration Patterns
```tsx
// With tooltip components
<Tooltip content="Additional information">
  <PiInformationFill className="text-gray-400" />
</Tooltip>

// In alert components
<Alert variant="info" icon={<PiInformationFill />}>
  Your changes have been saved
</Alert>

// In form validation
<FormField
  label="Password"
  info={<PiInformationFill />}
  infoContent="Must be at least 8 characters"
/>
```

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as server component (no client-side state)
- **Component Decomposition**: Simple, focused component that serves a single purpose
- **Reusability**: Located in `/components/icons/` for cross-application usage
- **TypeScript**: Properly typed with SVG props interface

### ✅ Recommended Usage
- Use consistent sizing classes (`text-sm`, `text-lg`, `text-xl`)
- Apply semantic colors (`text-blue-600` for info, `text-gray-400` for subtle)
- Include accessibility attributes when interactive
- Combine with text or other elements for clear context

### ❌ Anti-patterns to Avoid
- Don't hardcode colors in the component (use CSS classes instead)
- Don't use without context (icon alone may be unclear)
- Don't forget accessibility attributes for interactive usage
- Don't use inconsistent sizing across similar use cases

### Accessibility Considerations
```tsx
// Good: Provides context for screen readers
<PiInformationFill 
  aria-label="Additional information available"
  role="img"
/>

// Good: Used as decorative with text context
<div>
  <PiInformationFill aria-hidden="true" />
  <span>Important notice</span>
</div>
```