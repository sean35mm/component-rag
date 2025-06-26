# InlineTextInput Component

## Purpose

The `InlineTextInput` is a minimalist text input component designed for seamless integration into content areas. It provides a clean, borderless input field with focus states and disabled styling, ideal for inline editing scenarios, search functionality, or form inputs that need to blend naturally with surrounding content.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the input |
| `disabled` | `boolean` | No | `false` | Whether the input is disabled |
| `placeholder` | `string` | No | `'Search'` | Placeholder text displayed when input is empty |
| `ref` | `React.Ref<HTMLInputElement>` | No | - | Forwarded ref to the underlying input element |
| `...other` | `InputHTMLAttributes<HTMLInputElement>` | No | - | All standard HTML input attributes |

## Usage Example

```tsx
import { InlineTextInput } from '@/components/ui/inline-text-input';
import { useState } from 'react';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex items-center gap-2 p-4 bg-pgBackground-50 rounded-lg">
      <SearchIcon className="w-4 h-4 text-pgText-500" />
      <InlineTextInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search products..."
        className="flex-1"
      />
    </div>
  );
}

function InlineEditor() {
  const [title, setTitle] = useState('Untitled Document');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-6">
      {isEditing ? (
        <InlineTextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          className="font-semibold text-pgText-950"
          autoFocus
        />
      ) : (
        <h1 
          className="typography-titleH2 cursor-pointer hover:bg-pgBackground-100 rounded px-2 py-1"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
```

## Design System Usage

### Typography
- **Base Typography**: `.typography-paragraphSmall` - Provides consistent small paragraph text sizing
- **Text Hierarchy**: Integrates seamlessly with title and label typography classes when used in context

### Colors
- **Text Colors**:
  - `text-pgText-950` - Primary text color for high contrast
  - `text-pgText-400` - Disabled state text color
  - `text-pgText-500` - Focused placeholder text color
- **Background Integration**: Transparent background allows seamless integration with any background color

### Spacing & Layout
- **Size**: `size-full` - Fills available container space
- **Padding**: No internal padding - relies on container for spacing
- **Border**: `border-none` - Borderless design for inline integration

## Styling

### Variants

#### Default State
```tsx
<InlineTextInput placeholder="Enter text..." />
```
- Typography: Small paragraph text
- Text color: `pgText-950`
- Placeholder: `pgText-950`

#### Disabled State
```tsx
<InlineTextInput disabled placeholder="Cannot edit..." />
```
- Typography: Small paragraph text
- Text color: `pgText-400`
- Placeholder: `pgText-400`

#### Focus State
```tsx
<InlineTextInput placeholder="Focus me..." />
```
- Placeholder color changes to: `pgText-500`
- Maintains focus outline removal for seamless integration

### Customization Options

```tsx
// Custom styling with design system tokens
<InlineTextInput
  className="typography-labelMedium text-pgBlue-700 placeholder:text-pgBlue-400"
  placeholder="Custom styled input"
/>

// Integration with background colors
<div className="bg-pgBackground-100 p-4 rounded-lg">
  <InlineTextInput
    className="bg-transparent"
    placeholder="Blends with background"
  />
</div>
```

## Responsive Design

The component is fully responsive and adapts to container constraints:

```tsx
// Responsive container example
<div className="w-full sm:w-auto md:min-w-64 lg:min-w-80">
  <InlineTextInput placeholder="Responsive input" />
</div>

// Responsive typography scaling
<InlineTextInput
  className="typography-paragraphXSmall sm:typography-paragraphSmall md:typography-paragraphMedium"
  placeholder="Scales with breakpoints"
/>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Full keyboard support with tab navigation
- **Focus Management**: Proper focus handling with `focus:outline-none` for custom focus styles
- **Screen Reader Support**: Inherits standard input accessibility features

### Recommended Enhancements
```tsx
// Add labels for screen readers
<div>
  <label htmlFor="search-input" className="sr-only">Search</label>
  <InlineTextInput
    id="search-input"
    placeholder="Search..."
    aria-label="Search products"
  />
</div>

// Form integration with validation
<InlineTextInput
  placeholder="Required field"
  required
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-message' : undefined}
/>
```

## Dependencies

### Internal Dependencies
- **CVA (Class Variance Authority)**: `inputVariants` for conditional styling
- **CN Utility**: `@/lib/utils/cn` for class name merging
- **Design Tokens**: Typography and color classes from `globals.css`

### Related Components
- **Button Components**: Often used together in search bars and forms
- **Form Components**: Integrates with form validation and state management
- **Icon Components**: Commonly paired with search or action icons

### Usage with Form Libraries
```tsx
// React Hook Form integration
import { useForm } from 'react-hook-form';

function FormExample() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InlineTextInput
        {...register('searchTerm')}
        placeholder="Search..."
      />
    </form>
  );
}
```

## Best Practices

1. **Container Styling**: Always wrap in a container with appropriate padding and background
2. **Focus Management**: Consider custom focus indicators when removing default outlines
3. **Validation**: Add proper error states and validation feedback
4. **Performance**: Use `React.memo` for lists with many inline inputs
5. **Accessibility**: Always provide appropriate labels and ARIA attributes