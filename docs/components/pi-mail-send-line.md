# PiMailSendLine Icon Component

## Purpose

The `PiMailSendLine` component is a scalable SVG icon that represents email sending functionality with visual elements showing mail composition/sending actions. It renders an envelope icon with stylized lines indicating text content or send animation, making it ideal for email composition interfaces, send buttons, or mail-related UI elements.

## Component Type

**Server Component** - This is a pure presentational SVG component with no interactive behavior, client-side state, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, aria-label, etc. |

### Common SVG Props

| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `data-*` | `string` | Data attributes |

## Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { PiMailSendLine } from '@/components/icons/pi/pi-mail-send-line';

// Basic usage
export function SendEmailButton() {
  return (
    <Button variant="primary">
      <PiMailSendLine className="w-4 h-4 mr-2" />
      Send Email
    </Button>
  );
}

// Icon-only button with accessibility
export function SendIconButton() {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      aria-label="Send email"
    >
      <PiMailSendLine 
        className="w-5 h-5 text-blue-600" 
        aria-hidden="true"
      />
    </Button>
  );
}

// With custom styling
export function StyledMailSendIcon() {
  return (
    <PiMailSendLine 
      className="w-6 h-6 text-green-500 hover:text-green-600 transition-colors"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
    />
  );
}

// In email composer interface
export function EmailComposer() {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center gap-2">
        <PiMailSendLine className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-600">Ready to send</span>
      </div>
      <Button>
        <PiMailSendLine className="w-4 h-4 mr-2" />
        Send
      </Button>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Defaults to `1em` dimensions, scaling with font size
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader support
- **Customizable**: Supports all standard SVG props for styling and interaction

### Visual Design
- Clean line-based envelope icon
- Additional horizontal lines suggesting text content or send motion
- Optimized 24x24 viewBox for sharp rendering
- Uses `fillRule` and `clipRule` for precise path rendering

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state.

## Side Effects

**No Side Effects** - Pure component with no:
- API calls
- DOM manipulation
- Browser storage access
- External service integration
- Event subscriptions

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` type from React

### External Dependencies
- None - standalone SVG icon component

### Related Components
- Other Pi icon components in `/components/icons/pi/`
- UI components that commonly use icons (Button, IconButton, etc.)
- Email-related feature components

## Integration

### Application Architecture Role
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-mail-send-line.tsx    # ← This component
│   ├── ui/
│   │   ├── button.tsx                   # Common integration
│   │   └── icon-button.tsx             # Common integration
│   └── features/
│       ├── email/
│       │   ├── email-composer.tsx       # Uses this icon
│       │   └── send-button.tsx         # Uses this icon
│       └── messaging/
```

### Integration Patterns
- **Button Icons**: Commonly used in email send buttons
- **Status Indicators**: Shows email sending states in UI
- **Navigation**: Email composition or sending page indicators
- **Form Actions**: Email form submission buttons

## Best Practices

### Architectural Compliance
✅ **Server Component**: Correctly implemented as server component  
✅ **Single Responsibility**: Focused solely on rendering mail send icon  
✅ **Reusability**: Generic icon usable across email features  
✅ **Prop Spreading**: Flexible with standard SVG prop forwarding  

### Usage Guidelines

**DO:**
```tsx
// Provide accessibility labels for interactive icons
<button aria-label="Send email">
  <PiMailSendLine aria-hidden="true" />
</button>

// Use semantic sizing classes
<PiMailSendLine className="w-4 h-4" />

// Combine with descriptive text
<span className="flex items-center gap-2">
  <PiMailSendLine />
  Send Message
</span>
```

**DON'T:**
```tsx
// Don't use without accessibility context
<PiMailSendLine onClick={sendEmail} />

// Don't use inline styles for standard sizing
<PiMailSendLine style={{width: '16px', height: '16px'}} />

// Don't nest unnecessarily
<div><span><PiMailSendLine /></span></div>
```

### Performance Considerations
- Icon is lightweight SVG with minimal DOM impact
- No re-rendering concerns due to stateless nature
- Can be safely used in lists or repeated UI elements
- Consider icon sprite systems for large-scale usage