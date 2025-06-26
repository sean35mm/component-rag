# TextareaHighlight Component

## Purpose

The `TextareaHighlight` component is an enhanced textarea input that provides syntax highlighting capabilities within the text area. It extends the functionality of `react-highlight-within-textarea` to support text highlighting while maintaining full editing capabilities. The component includes features like sticky labels, action buttons, error states, and auto-focus functionality, all styled according to our design system.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | No | - | Unique identifier for the textarea element |
| `className` | `string` | No | - | Additional CSS classes to apply to the container |
| `focus` | `() => void` | No | - | Function to programmatically focus the textarea |
| `autoFocusAfterMount` | `boolean` | No | `false` | Whether to automatically focus the textarea after mounting |
| `stickyLabel` | `string` | No | - | Label text that appears above the textarea content |
| `actionButton` | `React.ReactNode` | No | - | Button or element to display in the bottom-right corner |
| `onClick` | `() => void` | No | - | Click handler for the textarea container |
| `error` | `string \| null` | No | - | Error message to display below the textarea |
| `useWithErrorPlaceholder` | `boolean` | No | `false` | Whether to show error messages in a dedicated container |
| `onFocus` | `(e: React.FocusEvent<HTMLTextAreaElement>) => void` | No | - | Focus event handler |
| `onBlur` | `(e: React.FocusEvent<HTMLTextAreaElement>) => void` | No | - | Blur event handler |
| `onChange` | `(value: string, selection?: Selection) => void` | No | - | Change event handler with highlighted selection |
| `readOnly` | `boolean` | No | `false` | Whether the textarea is read-only |
| `...rest` | `HWTAProps` | No | - | All other props from react-highlight-within-textarea |

## Usage Example

```tsx
import { TextareaHighlight } from '@/components/ui/textarea-highlight';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Submit logic here
  };

  return (
    <div className="space-y-4">
      <TextareaHighlight
        id="code-editor"
        value={code}
        onChange={(value) => setCode(value)}
        stickyLabel="SQL Query"
        placeholder="Enter your SQL query here..."
        highlight={[
          {
            highlight: /SELECT|FROM|WHERE|JOIN/gi,
            className: 'bg-pgBlue-100 text-pgBlue-800'
          },
          {
            highlight: /\b\d+\b/g,
            className: 'bg-pgGreen-100 text-pgGreen-800'
          }
        ]}
        actionButton={
          <Button 
            size="sm" 
            onClick={handleSubmit}
            className="typography-labelSmall"
          >
            Execute
          </Button>
        }
        error={error}
        useWithErrorPlaceholder={true}
        className="min-h-32"
        autoFocusAfterMount={true}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Sticky Label**: `.typography-subheading4XSmall` - Used for optional labels above the textarea
- **Input Text**: `.typography-labelSmall` - Applied to the main textarea content
- **Placeholder Text**: `.typography-paragraphSmall` - Used for placeholder text styling
- **Error Text**: `.typography-paragraphXSmall` - Applied to error messages

### Color Tokens
- **Background Colors**:
  - Default: `bg-pgBackgroundWhiteInvAlpha-800`
  - Read-only: `bg-pgBackground-100`
- **Border Colors**:
  - Default: `border-pgStroke-250`
  - Focused: `border-pgStrokeBlue`
  - Error: `border-pgStateError-base`
- **Text Colors**:
  - Label: `text-pgText-400`
  - Error: `text-pgStateError-base`
- **Shadow Effects**:
  - Default: `shadow-sm`
  - Focused: `shadow-blueGlowStrong`

### Layout & Spacing
- **Container**: `rounded-2xl p-3` - Rounded corners with consistent padding
- **Spacing**: `gap-1`, `gap-2`, `mb-2` - Using standard 4px base unit
- **Positioning**: `absolute bottom-3 right-3` - Action button positioning

## Styling

### States
- **Default**: Standard border and background with subtle shadow
- **Focused**: Blue border with glowing shadow effect
- **Error**: Red border with error icon and message
- **Read-only**: Muted background with disabled interactions
- **Hover**: Enhanced shadow on hover (when not read-only)

### Customization Options
```tsx
// Custom highlighting rules
<TextareaHighlight
  highlight={[
    {
      highlight: /keyword/gi,
      className: 'bg-pgPurple-100 text-pgPurple-800'
    }
  ]}
  className="min-h-48 max-h-96" // Custom sizing
/>

// Error state styling
<TextareaHighlight
  error="Invalid syntax detected"
  useWithErrorPlaceholder={true}
  className="border-pgStateError-base"
/>
```

## Responsive Design

The component uses responsive design principles:

- **Base (Mobile)**: Full width with compact padding
- **sm (640px+)**: Maintains responsive width within containers
- **md (768px+)**: Optimal for tablet and desktop layouts
- **lg+ (1024px+)**: Scales appropriately within larger layouts

The component automatically adapts to its container width and maintains consistent spacing across all breakpoints.

## Accessibility

### Features
- **Keyboard Navigation**: Full keyboard support for text editing and navigation
- **Focus Management**: Proper focus indicators with blue glow effect
- **ARIA Labels**: Supports standard textarea ARIA attributes
- **Error Announcement**: Error messages are properly associated with the input
- **High Contrast**: Colors meet WCAG contrast requirements in both light and dark modes

### Best Practices
```tsx
<TextareaHighlight
  id="accessible-textarea"
  aria-label="Code editor for SQL queries"
  aria-describedby="editor-help"
  error={error}
  useWithErrorPlaceholder={true}
/>
```

## Dependencies

### Internal Dependencies
- **Typography Component**: Used for consistent text styling
- **Icon Components**: `PiInformationFill` for error states
- **Utility Functions**: `cn()` for conditional class names

### External Dependencies
- **react-highlight-within-textarea**: Core highlighting functionality
- **React**: Standard React hooks (useState, useEffect, useCallback)

### Related Components
- **Button**: Often used in the `actionButton` prop
- **Form**: Can be used within form layouts
- **Input**: Similar styling patterns and design tokens

## Dark Mode Support

The component fully supports dark mode through CSS variables:
- Background colors automatically adapt using `pgBackgroundWhiteInvAlpha-800`
- Text colors adjust via `pgText-*` tokens
- Border and shadow effects maintain proper contrast
- Highlighting colors work consistently across themes