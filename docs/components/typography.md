# Typography Component

## Purpose

The `Typography` component is a versatile text rendering component that provides consistent typography across the application. It leverages our design system's typography classes and color tokens to ensure uniform text styling, supports semantic HTML elements through polymorphic rendering, and maintains accessibility standards.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `TypographyVariant` | No | `'paragraphMedium'` | Typography style variant from our design system |
| `color` | `ColorVariant` | No | `'950'` | Text color using our design system color tokens |
| `as` | `ElementType` | No | `'span'` | HTML element to render (polymorphic component) |
| `htmlFor` | `string` | No | - | For attribute when using as a label element |
| `className` | `string` | No | - | Additional CSS classes to apply |
| `children` | `ReactNode` | No | - | Content to render inside the typography element |

### Typography Variants

**Title Variants:**
- `titleH1`, `titleH2`, `titleH3`, `titleH4`, `titleH5`, `titleH6`, `titleH16`, `titleLarge`

**Label Variants:**
- `labelXLarge`, `labelLarge`, `labelMedium`, `labelSmall`, `labelXSmall`, `label2XSmall`, `label3XSmall`

**Paragraph Variants:**
- `paragraphXLarge`, `paragraphLarge`, `paragraphMedium`, `paragraphSmall`, `paragraphXSmall`, `paragraph3XSmall`

**Subheading Variants:**
- `subheadingMedium`, `subheadingSmall`, `subheadingXSmall`, `subheading2XSmall`, `subheading3XSmall`, `subheading4XSmall`

**Headlines Variants:**
- `headlines36`, `headlines32`, `headlines24`, `headlines20`, `headlines18`, `headlines16`, `headlines15`, `headlines14`

### Color Variants

- `inherit` - Inherits parent text color
- `blueDark` - `text-pgTextBlueDark`
- `blue` - `text-pgTextBlue`
- `error` - `text-pgStateError-base`
- `errorDark` - `text-pgStateError-dark`
- `0`, `300`, `400`, `600`, `700`, `800`, `950` - Text color scale from our pgText color system

## Usage Examples

### Basic Usage

```tsx
import { Typography } from '@/components/ui/typography';

// Default paragraph text
<Typography>
  This is default paragraph text using paragraphMedium variant
</Typography>

// Page title
<Typography as="h1" variant="titleH1" color="950">
  Main Page Title
</Typography>

// Subheading with custom color
<Typography as="h2" variant="subheadingMedium" color="700">
  Section Subheading
</Typography>
```

### Form Labels

```tsx
// Form label with htmlFor attribute
<Typography as="label" variant="labelMedium" color="800" htmlFor="email">
  Email Address
</Typography>

// Small helper text
<Typography variant="labelXSmall" color="600">
  We'll never share your email with anyone else.
</Typography>
```

### Content Hierarchy

```tsx
<article>
  <Typography as="h1" variant="headlines32" color="950">
    Article Title
  </Typography>
  
  <Typography as="h2" variant="headlines24" color="800">
    Section Heading
  </Typography>
  
  <Typography as="p" variant="paragraphLarge" color="700">
    This is the main content paragraph with larger text for better readability.
  </Typography>
  
  <Typography as="p" variant="paragraphMedium" color="600">
    This is supporting content with medium paragraph styling.
  </Typography>
  
  <Typography as="small" variant="paragraph3XSmall" color="400">
    Fine print or disclaimer text
  </Typography>
</article>
```

### Error and State Messages

```tsx
// Error message
<Typography variant="labelSmall" color="error">
  Please enter a valid email address
</Typography>

// Success message
<Typography variant="labelMedium" color="blueDark">
  Form submitted successfully!
</Typography>
```

## Design System Usage

### Typography Classes
The component uses typography classes from `globals.css`:
- **Titles**: `.typography-titleH1` through `.typography-titleH6`, `.typography-titleLarge`
- **Labels**: `.typography-labelXLarge` through `.typography-label3XSmall`
- **Paragraphs**: `.typography-paragraphXLarge` through `.typography-paragraph3XSmall`
- **Subheadings**: `.typography-subheadingMedium` through `.typography-subheading4XSmall`
- **Headlines**: `.typography-headlines36` through `.typography-headlines14`

### Color Tokens
- **Text Colors**: `pgText-0` through `pgText-950`
- **Brand Text**: `pgTextBlue`, `pgTextBlueDark`
- **State Colors**: `pgStateError-base`, `pgStateError-dark`

## Styling

### Variant Combinations

```tsx
// Large headline for hero sections
<Typography as="h1" variant="headlines36" color="950">
  Hero Title
</Typography>

// Medium labels for form fields
<Typography as="label" variant="labelMedium" color="800">
  Field Label
</Typography>

// Small subheadings for card titles
<Typography as="h3" variant="subheading2XSmall" color="700">
  Card Title
</Typography>
```

### Custom Styling

```tsx
// Additional custom classes
<Typography 
  variant="paragraphLarge" 
  color="600"
  className="font-semibold tracking-wide"
>
  Custom styled text
</Typography>

// With opacity
<Typography 
  variant="labelSmall" 
  color="800"
  className="opacity-75"
>
  Subtle helper text
</Typography>
```

## Responsive Design

The typography component automatically adapts to different screen sizes through the CSS classes defined in `globals.css`. Typography scales are designed to be responsive:

```tsx
// Typography classes include responsive behavior
<Typography as="h1" variant="titleH1" color="950">
  Responsive Title
</Typography>

// Can be combined with responsive utilities
<Typography 
  variant="paragraphMedium"
  className="sm:text-lg md:text-xl"
  color="700"
>
  Custom responsive text
</Typography>
```

## Accessibility

### Semantic HTML
- Use appropriate HTML elements via the `as` prop (`h1`, `h2`, `p`, `label`, etc.)
- Maintains proper heading hierarchy
- Supports form labeling with `htmlFor` attribute

### Screen Reader Support
```tsx
// Proper label association
<Typography as="label" variant="labelMedium" htmlFor="username">
  Username
</Typography>
<input id="username" type="text" />

// Accessible headings
<Typography as="h1" variant="titleH1">Main Content</Typography>
<Typography as="h2" variant="titleH2">Subsection</Typography>
```

### Color Contrast
All color variants maintain WCAG AA compliance:
- Light text (`pgText-0`, `pgText-300`) for dark backgrounds
- Dark text (`pgText-700`, `pgText-800`, `pgText-950`) for light backgrounds
- Error states use high-contrast `pgStateError` colors

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility for merging Tailwind classes
- `class-variance-authority` - For variant-based styling
- Design system typography classes from `globals.css`
- Design system color tokens (pgText, pgState colors)

### Related Components
- Form components (Input, Label, Button) that use Typography internally
- Card components for consistent text hierarchy
- Alert/Notification components for state messaging

### Usage with Other Components

```tsx
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

<Card>
  <Typography as="h3" variant="titleH3" color="950">
    Card Title
  </Typography>
  <Typography variant="paragraphMedium" color="600">
    Card description text
  </Typography>
  <Button>
    <Typography variant="labelMedium" color="inherit">
      Action Button
    </Typography>
  </Button>
</Card>
```