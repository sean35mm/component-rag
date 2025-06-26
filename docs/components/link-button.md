# LinkButton Component

## Purpose

The `LinkButton` component provides a styled button that mimics the appearance of a text link while maintaining the semantic meaning and accessibility benefits of a button element. It's designed for actions that should look like links but perform button-like operations (navigation, form submission, etc.).

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'gray' \| 'black' \| 'white' \| 'primary' \| 'error'` | No | `'gray'` | Visual style variant determining color scheme |
| `size` | `'md' \| 'sm'` | No | `'md'` | Size variant affecting typography and icon sizing |
| `underline` | `boolean` | No | `false` | Whether to display underline decoration |
| `asChild` | `boolean` | No | `false` | Render as child element using Radix Slot |
| `className` | `string` | No | - | Additional CSS classes to merge |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` | No | - | Standard button HTML attributes |

## Usage Example

```tsx
import { LinkButton } from '@/components/ui/link-button';
import { ExternalLink } from 'lucide-react';

// Basic usage
<LinkButton>Default Link Button</LinkButton>

// With variants and styling
<LinkButton variant="primary" size="sm" underline>
  Primary Small Link
</LinkButton>

// With icon
<LinkButton variant="error" className="gap-1">
  Delete Item
  <ExternalLink />
</LinkButton>

// As child component (useful with Next.js Link)
<LinkButton asChild>
  <Link href="/dashboard">
    Go to Dashboard
  </Link>
</LinkButton>

// Disabled state
<LinkButton disabled>
  Disabled Link
</LinkButton>
```

## Design System Usage

### Typography Classes
- **Medium size**: `.typography-labelSmall` - Standard link text sizing
- **Small size**: `.typography-labelXSmall` - Compact link text for secondary actions

### Color Tokens
- **Text Colors**: `pgText-700`, `pgText-800`, `pgText-950`, `pgText-0`, `pgText-300`
- **Icon Colors**: `pgIcon-600`, `pgIcon-950`, `pgIcon-0`, `pgIcon-300`
- **State Colors**: `pgStateError-base`
- **Brand Colors**: `pgRed-700`

### Tailwind Utilities
- **Layout**: `inline-flex`, `items-center`, `justify-center`
- **Spacing**: `whitespace-nowrap`
- **Borders**: `rounded-xl`
- **Background**: `bg-transparent`
- **Interactions**: `transition-colors`
- **Focus**: `focus-visible:outline-none`
- **Disabled**: `disabled:pointer-events-none`

## Styling

### Variants

#### Gray (Default)
- **Text**: `pgText-700/80` → `pgText-800` (hover) → `pgText-950` (focus)
- **Icons**: `pgIcon-600/80` → `pgIcon-950` (focus)
- **Use case**: Standard secondary actions

#### Black
- **Text**: `pgText-950` → `pgText-800` (hover)
- **Icons**: `pgIcon-950`
- **Use case**: High contrast, primary text links

#### White
- **Text**: `pgText-0` → `pgText-0/80` (hover)
- **Icons**: `pgIcon-0`
- **Use case**: Links on dark backgrounds

#### Primary
- **Text**: `pgText-700` → `pgText-950` (hover/focus)
- **Icons**: `pgIcon-600` → `pgIcon-950` (hover/focus)
- **Use case**: Main call-to-action links

#### Error
- **Text**: `pgStateError-base` → `pgRed-700` (hover)
- **Use case**: Destructive actions, deletion links

### Sizes

#### Medium (Default)
- Typography: `.typography-labelSmall`
- Icon size: `1.25rem` (20px)

#### Small
- Typography: `.typography-labelXSmall`
- Icon size: `1rem` (16px)

### States

#### Hover
- Automatic color transitions for enhanced interactivity
- Variant-specific hover states for optimal contrast

#### Focus
- `focus-visible:outline-none` removes default outline
- Custom focus colors for better brand consistency

#### Disabled
- `disabled:pointer-events-none` prevents interaction
- Text: `pgText-300`, Icons: `pgIcon-300`
- Consistent disabled appearance across variants

## Responsive Design

The LinkButton component maintains consistent styling across all breakpoints. The typography classes automatically adapt to our responsive design system:

- Typography scales maintain readability on mobile devices
- Icon sizes remain proportional across screen sizes
- Touch targets meet accessibility standards on mobile

## Accessibility

### ARIA Support
- Maintains semantic `button` role when not using `asChild`
- Supports all standard button ARIA attributes
- `focus-visible` implementation for keyboard navigation

### Keyboard Navigation
- Standard button keyboard behavior (Space, Enter)
- Visible focus indicators with custom styling
- Proper tab order integration

### Screen Reader Support
- Button semantics preserved
- Icon content considered decorative (use `aria-label` if icons convey meaning)
- Disabled state properly communicated

### Best Practices
```tsx
// Good: Descriptive text
<LinkButton>Edit Profile</LinkButton>

// Good: Icon with accessible text
<LinkButton aria-label="Delete item">
  <Trash2 />
</LinkButton>

// Good: Disabled with context
<LinkButton disabled aria-describedby="save-help">
  Save Changes
</LinkButton>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility for merging Tailwind classes
- Design system color tokens (pgText, pgIcon, pgState, pgRed)
- Typography system (labelSmall, labelXSmall)

### External Dependencies
- `@radix-ui/react-slot` - Polymorphic component support
- `class-variance-authority` - Type-safe variant management
- `React` - forwardRef for ref forwarding

### Related Components
- Use with navigation libraries (Next.js Link, React Router)
- Pairs well with Icon components from Lucide React
- Complements Button component for mixed interaction patterns