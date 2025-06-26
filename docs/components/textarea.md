# Textarea Component

## Purpose

The `Textarea` component is a multi-line text input field with integrated label support, built on top of native HTML textarea elements. It provides a consistent design with hover, focus, and disabled states, along with customizable resize behavior and full integration with our design system's typography and color tokens.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No | - | Text label displayed above the textarea |
| `resize` | `'x' \| 'y' \| 'both' \| 'none'` | No | `'both'` | Controls textarea resize behavior |
| `classNames` | `object` | No | - | Custom CSS classes for different parts |
| `classNames.container` | `string` | No | - | CSS class for the outer container |
| `classNames.label` | `string` | No | - | CSS class for the label element |
| `classNames.textarea` | `string` | No | - | CSS class for the textarea element |
| `disabled` | `boolean` | No | `false` | Disables the textarea |
| `id` | `string` | No | - | HTML id attribute (auto-generated if not provided) |
| ...other | `TextareaHTMLAttributes` | No | - | All standard HTML textarea attributes |

## Usage Example

```tsx
import { Textarea } from '@/components/ui/textarea';

function ContactForm() {
  return (
    <div className="space-y-4">
      {/* Basic textarea with label */}
      <Textarea
        label="Message"
        placeholder="Enter your message here..."
        rows={4}
      />

      {/* Textarea with vertical resize only */}
      <Textarea
        label="Description"
        resize="y"
        placeholder="Describe your issue..."
        classNames={{
          container: "mb-6",
          label: "text-pgText-700",
          textarea: "min-h-[8rem]"
        }}
      />

      {/* Disabled textarea */}
      <Textarea
        label="Read-only Content"
        value="This content cannot be edited"
        disabled
        resize="none"
      />

      {/* Textarea without label */}
      <Textarea
        placeholder="Quick note..."
        resize="none"
        rows={2}
        classNames={{
          textarea: "min-h-[3rem]"
        }}
      />
    </div>
  );
}
```

## Design System Usage

### Typography
- **Base Text**: `.typography-paragraphSmall` - Consistent with form input typography
- **Label**: Inherits from `Label` component typography

### Colors
- **Background**: `bg-pgBackground-0` (base), `hover:bg-pgBackground-50` (hover)
- **Text**: `text-pgText-950` (primary), `disabled:text-pgText-300` (disabled)
- **Placeholder**: `placeholder:text-pgText-400` (base), `focus-visible:placeholder:text-pgText-600` (focused)
- **Border**: Default border with `focus-visible:border-pgStroke-950` on focus
- **Disabled States**: `disabled:bg-pgBackground-50`, `disabled:border-pgBackground-50`

### Spacing & Layout
- **Padding**: `px-3 py-2.5` - Consistent with form element spacing
- **Gap**: `gap-1` between label and textarea
- **Minimum Height**: `min-h-[5.75rem]` (92px) for adequate content area

## Styling

### Variants

#### Resize Behavior
```tsx
// Horizontal resize only
<Textarea resize="x" />

// Vertical resize only  
<Textarea resize="y" />

// Both directions (default)
<Textarea resize="both" />

// No resize
<Textarea resize="none" />
```

### States

#### Interactive States
- **Default**: Clean background with subtle border
- **Hover**: `hover:bg-pgBackground-50` with enhanced placeholder visibility
- **Focus**: `focus-visible:border-pgStroke-950` with `shadow-buttonsImportantFocus`
- **Disabled**: Muted colors with `cursor-not-allowed`

#### Customization Options
```tsx
<Textarea
  classNames={{
    container: "mb-4 max-w-md", // Container styling
    label: "text-pgText-800 typography-labelMedium", // Label overrides
    textarea: "min-h-[10rem] bg-pgBackground-25" // Textarea overrides
  }}
/>
```

## Responsive Design

The textarea component adapts to our responsive breakpoints:

```tsx
<Textarea
  classNames={{
    container: "w-full sm:max-w-md lg:max-w-lg",
    textarea: "min-h-[4rem] sm:min-h-[6rem] lg:min-h-[8rem]"
  }}
/>
```

- **Mobile (< 640px)**: Full width with compact height
- **Tablet (≥ 640px)**: Constrained max-width with increased height
- **Desktop (≥ 1024px)**: Larger comfortable sizing

## Accessibility

### ARIA Support
- **Label Association**: Automatic `id` generation ensures proper label-textarea association
- **Disabled State**: Proper `disabled` attribute and visual indication
- **Focus Management**: Clear focus indicators with `focus-visible` styling

### Keyboard Navigation
- **Tab Navigation**: Natural tab order integration
- **Resize Functionality**: Native browser resize controls when enabled
- **Screen Reader Support**: Semantic HTML with proper labeling

### Best Practices
```tsx
// Provide descriptive labels
<Textarea label="Detailed feedback about your experience" />

// Use placeholder text for additional context
<Textarea 
  label="Comments"
  placeholder="Optional: Share any additional thoughts..."
/>

// Indicate required fields
<Textarea 
  label="Required feedback *"
  required
  aria-describedby="feedback-help"
/>
```

## Dependencies

### Internal Dependencies
- **`Label`**: From `./label` - Provides consistent label styling and behavior
- **`useIdFallback`**: From `@/components/hooks/use-id-fallback` - Ensures unique IDs for accessibility
- **`cn`**: From `@/lib/utils/cn` - Utility for conditional class names

### External Dependencies
- **`class-variance-authority`**: For variant management and type-safe styling
- **React**: `forwardRef` for ref forwarding to textarea element

### Design System Integration
- Inherits from global typography classes (`.typography-paragraphSmall`)
- Uses design system color tokens (`pgBackground-*`, `pgText-*`, `pgStroke-*`)
- Integrates with custom scrollbar styling (`.scrollbar-custom-md`)
- Utilizes design system shadow tokens (`shadow-buttonsImportantFocus`)