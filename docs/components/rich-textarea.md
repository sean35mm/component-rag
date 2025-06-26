# RichTextarea Component

## Purpose

The RichTextarea component is an enhanced textarea input that provides rich text editing capabilities while maintaining consistent styling with our design system. It wraps the external `rich-textarea` library and adds custom styling, error handling, sticky labels, and action buttons. The component supports both active and read-only states with smooth transitions and visual feedback.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | No | `undefined` | Unique identifier for the textarea element |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the container |
| `focus` | `() => void` | No | `undefined` | Function to programmatically focus the textarea |
| `autoFocusAfterMount` | `boolean` | No | `false` | Whether to automatically focus the textarea after mounting |
| `stickyLabel` | `string` | No | `undefined` | Label text that appears above the textarea content |
| `actionButton` | `React.ReactNode` | No | `undefined` | Button or element positioned in the bottom-right corner |
| `onClick` | `() => void` | No | `undefined` | Click handler for the container element |
| `error` | `string \| null` | No | `null` | Error message to display below the textarea |
| `useWithErrorPlaceholder` | `boolean` | No | `false` | Whether to render error messages in a dedicated container |
| `onChange` | `(value: string) => void` | No | `undefined` | Callback fired when the textarea value changes |
| `active` | `boolean` | No | `true` | Whether the textarea is interactive (affects styling and cursor) |
| `readOnly` | `boolean` | No | `false` | Whether the textarea is read-only |
| `onFocus` | `React.FocusEventHandler` | No | `undefined` | Focus event handler |
| `onBlur` | `React.BlurEventHandler` | No | `undefined` | Blur event handler |
| `children` | `React.ReactNode` | No | `undefined` | Child elements to render within the textarea |

*Inherits all other props from the base `RichTextareaProps` except `onChange`*

## Usage Example

```tsx
import { RichTextarea } from '@/components/ui/rich-textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function MessageComposer() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (message.trim().length < 10) {
      setError('Message must be at least 10 characters long');
      return;
    }
    setError(null);
    // Submit logic here
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <RichTextarea
        id="message-composer"
        placeholder="Write your message here..."
        value={message}
        onChange={setMessage}
        stickyLabel="Your Message"
        error={error}
        useWithErrorPlaceholder
        autoFocusAfterMount
        actionButton={
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmit}
            className="bg-pgBlue-600 hover:bg-pgBlue-700"
          >
            Send
          </Button>
        }
        className="mb-4"
      />
    </div>
  );
}

// Read-only example with custom styling
function MessageDisplay({ content }: { content: string }) {
  return (
    <RichTextarea
      value={content}
      readOnly
      active={false}
      stickyLabel="Original Message"
      className="bg-pgNeutral-50 border-pgStroke-200"
    />
  );
}
```

## Design System Usage

### Typography Classes
- **Container**: Uses `typography-labelSmall` for the main container
- **Placeholder**: Uses `typography-paragraphSmall` for placeholder text styling
- **Sticky Label**: Uses `typography-subheading4XSmall` via Typography component
- **Error Messages**: Uses `typography-paragraphXSmall` via Typography component

### Color Tokens
- **Background Colors**:
  - Active: `bg-pgBackgroundWhiteInvAlpha-800`
  - Inactive: `bg-pgBackground-100`
- **Border Colors**:
  - Default: `border-pgStroke-250`
  - Focus: `border-pgStrokeBlue`
  - Error: `border-pgStateError-base`
- **Text Colors**:
  - Placeholder: `text-pgText-400`
  - Error: `text-pgStateError-base`

### Shadow System
- Default: `shadow-sm`
- Hover: `hover:shadow-sm`
- Focus: `shadow-blueGlowStrong hover:shadow-blueGlowStrong`

## Styling

### States and Variants

#### Focus State
```tsx
// Automatically applied on focus
className="border-pgStrokeBlue shadow-blueGlowStrong"
```

#### Error State
```tsx
<RichTextarea
  error="This field is required"
  useWithErrorPlaceholder
  className="border-pgStateError-base"
/>
```

#### Inactive State
```tsx
<RichTextarea
  active={false}
  className="cursor-default select-none bg-pgBackground-100"
/>
```

#### Read-only State
```tsx
<RichTextarea
  readOnly
  active={false}
  className="bg-pgNeutral-50"
/>
```

### Customization Options

```tsx
// Custom styling example
<RichTextarea
  className={cn(
    "rounded-xl border-2", // Override border radius and width
    "bg-pgNeutral-25",     // Custom background
    "p-4",                 // Custom padding
    "min-h-32"             // Custom minimum height
  )}
  stickyLabel="Custom Label"
  actionButton={<CustomButton />}
/>
```

## Responsive Design

The component is fully responsive and adapts to different screen sizes:

```tsx
// Responsive example
<RichTextarea
  className={cn(
    "w-full",
    "sm:max-w-md md:max-w-lg lg:max-w-2xl", // Responsive max width
    "p-3 sm:p-4",                          // Responsive padding
    "text-sm sm:text-base"                 // Responsive text size
  )}
  placeholder="Enter your message..."
/>
```

### Breakpoint Behavior
- **sm (640px+)**: Maintains standard padding and sizing
- **md (768px+)**: Suitable for tablet layouts with larger touch targets
- **lg (1024px+)**: Desktop optimization with hover states
- **xl (1280px+)**: Large screen layouts with expanded content areas

## Accessibility

### ARIA Support
- Automatically generates accessible labels when `id` prop is provided
- Error messages are properly associated with the input
- Focus management for keyboard navigation

### Keyboard Navigation
- **Enter**: Prevented by default (customizable via onKeyDown)
- **Tab**: Standard focus management
- **Escape**: Can be handled via custom event handlers

### Screen Reader Support
```tsx
<RichTextarea
  id="accessible-textarea"
  aria-label="Message content"
  aria-describedby={error ? "error-message" : undefined}
  error={error}
  useWithErrorPlaceholder
/>
```

### Focus Management
```tsx
// Programmatic focus control
const textareaRef = useRef<HTMLTextAreaElement>(null);

<RichTextarea
  ref={textareaRef}
  autoFocusAfterMount
  onFocus={(e) => {
    // Custom focus handling
    console.log('Textarea focused');
  }}
/>
```

## Dependencies

### Internal Dependencies
- **Typography Component**: Used for consistent text styling (`./typography`)
- **Icons**: Uses `PiInformationFill` from `@/components/icons`
- **Utilities**: Uses `cn` utility from `@/lib/utils/cn` for conditional classes

### External Dependencies
- **rich-textarea**: Base rich text editing functionality
- **React**: Core React hooks and components (`useState`, `useEffect`, `useCallback`, `forwardRef`)

### Related Components
- **Typography**: For consistent text rendering
- **Button**: Often used with `actionButton` prop
- **Form Components**: Can be integrated with form validation systems
- **Modal/Dialog**: Commonly used within modal contexts for user input