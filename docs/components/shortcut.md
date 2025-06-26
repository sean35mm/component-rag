# Shortcut Component

## Purpose

The `Shortcut` component is a small, visually distinct UI element designed to display keyboard shortcuts, command keys, or other brief interactive indicators. It provides a clean, pill-shaped container with subtle styling that integrates seamlessly with form inputs, command palettes, and navigation elements.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'stroke'` | No | `'stroke'` | Visual style variant of the shortcut |
| `size` | `'xl' \| 'lg' \| 'md' \| 'none' \| 'auto'` | No | `'md'` | Size preset for the shortcut container |
| `asChild` | `boolean` | No | `false` | When true, merges props with immediate child instead of rendering a span |
| `className` | `string` | No | - | Additional CSS classes to apply |
| `children` | `ReactNode` | No | - | Content to display within the shortcut |
| `...rest` | `ButtonHTMLAttributes<HTMLButtonElement>` | No | - | All standard button HTML attributes |

## Usage Example

```tsx
import { Shortcut } from '@/components/ui/shortcut';

function CommandPalette() {
  return (
    <div className="flex items-center justify-between p-3 border-b border-pgStroke-100">
      <span className="typography-labelMedium text-pgText-700">
        Search commands
      </span>
      <div className="flex items-center gap-1">
        <Shortcut size="auto" className="typography-label2XSmall">
          ⌘
        </Shortcut>
        <Shortcut size="auto" className="typography-label2XSmall">
          K
        </Shortcut>
      </div>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="flex items-center justify-between px-4 py-2 hover:bg-pgBackground-100">
      <span className="typography-labelMedium text-pgText-900">
        Copy to clipboard
      </span>
      <div className="flex items-center gap-0.5">
        <Shortcut size="lg">⌘</Shortcut>
        <Shortcut size="lg">C</Shortcut>
      </div>
    </div>
  );
}

// Interactive shortcut as button
function InteractiveShortcut() {
  return (
    <Shortcut 
      size="xl" 
      onClick={() => console.log('Shortcut clicked')}
      className="cursor-pointer hover:bg-pgBackground-100 hover:border-pgStroke-200"
    >
      <span className="typography-labelSmall">ESC</span>
    </Shortcut>
  );
}

// Using asChild for custom elements
function CustomShortcut() {
  return (
    <Shortcut asChild size="auto">
      <kbd className="font-mono">Ctrl + S</kbd>
    </Shortcut>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-label2XSmall`** - For compact shortcut text
- **`.typography-label3XSmall`** - For very small shortcuts in dense layouts
- **`.typography-labelSmall`** - For readable shortcut labels
- **`.typography-labelXSmall`** - For secondary shortcut indicators

### Color Tokens
- **Background**: `pgBackground-50` (light neutral background)
- **Border**: `alphaNeutral/24` (subtle transparent border)
- **Text**: `pgIcon-600` (medium contrast icon color)
- **Disabled Text**: `pgText-300` (low contrast for disabled state)
- **Hover States**: `pgBackground-100`, `pgStroke-200` for interactive feedback

### Tailwind Utilities
- **Layout**: `inline-flex`, `items-center`, `justify-center`
- **Spacing**: `size-*` utilities for consistent dimensions, `px-1.5 py-0.5` for auto sizing
- **Border**: `rounded-md` for subtle corner radius
- **Transitions**: `transition-all` for smooth state changes

## Styling

### Variants

#### Stroke (Default)
```tsx
<Shortcut variant="stroke">⌘</Shortcut>
```
- Light background with subtle border
- Optimal for most use cases and interfaces

### Size Options

| Size | Dimensions | Use Case |
|------|------------|----------|
| `xl` | `28px × 28px` | Prominent shortcuts, main actions |
| `lg` | `24px × 24px` | Standard menu shortcuts |
| `md` | `20px × 20px` | Compact layouts, inline shortcuts |
| `none` | `auto + 4px padding` | Custom sizing with minimal padding |
| `auto` | `fit-content + 6px×2px padding` | Text-based shortcuts, flexible width |

### Custom Styling

```tsx
// Custom colors
<Shortcut className="bg-pgBlue-50 border-pgBlue-200 text-pgBlue-700">
  ⌘
</Shortcut>

// Custom hover states
<Shortcut className="hover:bg-pgStateSuccess-lighter hover:border-pgStateSuccess-base">
  ✓
</Shortcut>

// Dark mode adaptation (automatic with design system)
<Shortcut className="dark:bg-pgBackground-800 dark:border-pgStroke-700">
  ESC
</Shortcut>
```

## Responsive Design

The Shortcut component maintains consistent sizing across breakpoints but can be customized for responsive layouts:

```tsx
// Responsive sizing
<Shortcut size="md" className="sm:size-6 md:size-7">
  ⌘
</Shortcut>

// Responsive visibility
<div className="hidden sm:flex items-center gap-1">
  <Shortcut size="auto">⌘</Shortcut>
  <Shortcut size="auto">K</Shortcut>
</div>
```

## Accessibility

### ARIA Support
- Inherits all standard button ARIA attributes when interactive
- Use `aria-label` for screen reader descriptions of symbol shortcuts
- Consider `role="presentation"` for purely decorative shortcuts

### Keyboard Navigation
- Focusable when used as interactive elements
- Disabled state removes from tab order with `disabled:pointer-events-none`
- Supports all standard keyboard events via button attributes

### Screen Reader Considerations
```tsx
// Descriptive labels for symbols
<Shortcut aria-label="Command key">⌘</Shortcut>
<Shortcut aria-label="Escape key">ESC</Shortcut>

// Semantic markup with asChild
<Shortcut asChild>
  <kbd aria-label="Control plus S">Ctrl+S</kbd>
</Shortcut>
```

### Color Contrast
- Default styling meets WCAG AA contrast requirements
- Disabled state uses `pgText-300` for appropriate reduced contrast
- Custom color combinations should maintain accessibility standards

## Dependencies

### Internal Dependencies
- **`@/lib/utils/cn`** - Utility for conditional className merging
- **Design System Colors** - pgBackground, pgText, pgIcon, pgStroke color tokens
- **Typography System** - Compatible with all label typography classes

### External Dependencies
- **`@radix-ui/react-slot`** - Enables `asChild` functionality for composition
- **`class-variance-authority`** - Variant management for consistent styling
- **React** - forwardRef support for proper ref handling

### Related Components
- **Button** - Shares similar interactive patterns
- **Badge** - Similar visual treatment for status indicators  
- **Command** - Commonly used together in command palettes
- **Kbd** - Semantic alternative for keyboard shortcuts