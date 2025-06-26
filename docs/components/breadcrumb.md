# Breadcrumb Component

## Purpose

The Breadcrumb component provides navigation context by showing the user's current location within a hierarchical site structure. It displays a horizontal list of links leading back to parent pages, with customizable separators and support for truncation when dealing with long navigation paths.

## Props Interface

### Breadcrumb Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `ComponentPropsWithoutRef<'nav'>` | No | - | Standard nav element props |

### BreadcrumbList Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'md' \| 'sm'` | No | `'md'` | Controls typography and spacing size |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `ComponentPropsWithoutRef<'ol'>` | No | - | Standard ol element props |

### BreadcrumbItem Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'md' \| 'sm'` | No | `'md'` | Controls gap spacing between items |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `ComponentPropsWithoutRef<'li'>` | No | - | Standard li element props |

### BreadcrumbLink Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `asChild` | `boolean` | No | `false` | Render as child component (using Radix Slot) |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `ComponentPropsWithoutRef<'a'>` | No | - | Standard anchor element props |

### BreadcrumbPage Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `ComponentPropsWithoutRef<'span'>` | No | - | Standard span element props |

### BreadcrumbSeparator Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `'arrow' \| 'slash' \| 'dot'` | No | `'arrow'` | Type of separator to display |
| `size` | `'md' \| 'sm'` | No | `'md'` | Size of the separator icon |
| `className` | `string` | No | - | Additional CSS classes |
| `children` | `ReactNode` | No | - | Custom separator content |
| `...props` | `ComponentProps<'li'>` | No | - | Standard li element props |

### BreadcrumbEllipsis Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'md' \| 'sm'` | No | `'md'` | Size of the ellipsis icon |
| `className` | `string` | No | - | Additional CSS classes |
| `...props` | `ComponentProps<'span'>` | No | - | Standard span element props |

## Usage Example

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '@/components/ui/breadcrumb';

// Basic breadcrumb navigation
function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products/electronics">Electronics</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Compact breadcrumb with custom separator
function CompactBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList size="sm">
        <BreadcrumbItem size="sm">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator type="slash" size="sm" />
        <BreadcrumbItem size="sm">
          <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator type="slash" size="sm" />
        <BreadcrumbItem size="sm">
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Breadcrumb with ellipsis for long paths
function TruncatedBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Using with Next.js Link component
function NextJsBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator type="dot" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator type="dot" />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Design System Usage

### Typography Classes
- **Medium Size**: Uses `.typography-labelSmall` for readable navigation text
- **Small Size**: Uses `.typography-paragraphXSmall` for compact layouts

### Color Tokens
- **Default Text**: `pgText-600` - Medium gray for navigation links
- **Hover Text**: `pgText-950` - Near black for better contrast on hover
- **Current Page**: `pgText-700/80` - Slightly muted for current page indicator
- **Separators**: `pgText-300` - Light gray for visual separation

### Spacing and Layout
- **Gap Medium**: `gap-1.5` (6px) between elements
- **Gap Small**: `gap-1` (4px) for compact layout
- **Flexbox**: Uses `flex flex-wrap items-center` for responsive layout

## Variants

### Size Variants
```tsx
// Medium size (default) - Better for desktop interfaces
<BreadcrumbList size="md">
  {/* Typography: labelSmall, Gap: 1.5 */}
</BreadcrumbList>

// Small size - Better for mobile or compact layouts
<BreadcrumbList size="sm">
  {/* Typography: paragraphXSmall, Gap: 1 */}
</BreadcrumbList>
```

### Separator Types
```tsx
// Arrow separator (default)
<BreadcrumbSeparator type="arrow" />

// Slash separator
<BreadcrumbSeparator type="slash" />

// Dot separator
<BreadcrumbSeparator type="dot" />

// Custom separator
<BreadcrumbSeparator>
  <CustomIcon />
</BreadcrumbSeparator>
```

## Styling

### Available States
- **Default**: Normal link appearance with `pgText-600`
- **Hover**: Darkens to `pgText-950` with underline
- **Current Page**: Muted appearance with `pgText-700/80`
- **Disabled**: Current page has `aria-disabled="true"`

### Icon Sizing
- **Medium**: Icons are `size-5` (20px)
- **Small**: Icons are `size-4` (16px)

### Customization Examples
```tsx
// Custom styling with design system tokens
<BreadcrumbList 
  className="bg-pgNeutral-50 p-3 rounded-lg border border-pgStroke-200"
>
  <BreadcrumbItem>
    <BreadcrumbLink 
      href="/"
      className="text-pgBlue-600 hover:text-pgBlue-800"
    >
      Home
    </BreadcrumbLink>
  </BreadcrumbItem>
</BreadcrumbList>

// Dark mode friendly styling
<BreadcrumbList className="text-pgText-100">
  <BreadcrumbSeparator className="text-pgText-400" />
</BreadcrumbList>
```

## Responsive Design

The breadcrumb component is fully responsive and adapts across breakpoints:

- **Mobile**: Uses `flex-wrap` to wrap long breadcrumb paths
- **Tablet/Desktop**: Maintains horizontal layout with proper spacing
- **Text Breaking**: Uses `break-words` to handle long page names gracefully

```tsx
// Responsive breadcrumb example
<Breadcrumb className="w-full max-w-4xl mx-auto px-4">
  <BreadcrumbList className="sm:gap-2 md:gap-3">
    {/* Automatically wraps on smaller screens */}
  </BreadcrumbList>
</Breadcrumb>
```

## Accessibility

### ARIA Support
- **Navigation Landmark**: Root `<nav>` has `aria-label="breadcrumb"`
- **Current Page**: Uses `aria-current="page"` and `aria-disabled="true"`
- **Hidden Elements**: Separators and ellipsis have `aria-hidden="true"`
- **Screen Reader**: Ellipsis includes `<span className="sr-only">More</span>`

### Semantic HTML
- Uses proper `<nav>`, `<ol>`, `<li>` structure
- Links are actual `<a>` elements (or can use `asChild` for routing libraries)
- Current page uses `<span>` with proper ARIA attributes

### Keyboard Navigation
- All links are keyboard accessible
- Current page is properly identified to screen readers
- Tab order follows logical navigation flow

## Dependencies

### Internal Dependencies
- **Icons**: `PiArrowRightSLine`, `PiMoreFill` from `@/components/icons`
- **Utilities**: `cn` function from `@/lib/utils/cn`

### External Dependencies
- **Radix UI**: `@radix-ui/react-slot` for `asChild` prop support
- **CVA**: `class-variance-authority` for variant management

### Related Components
- Works well with navigation components
- Can be integrated with routing libraries (Next.js, React Router)
- Pairs with page headers and layout components

## Customization

### Extending with className
```tsx
// Custom brand colors
<BreadcrumbLink className="text-pgBlue-600 hover:text-pgBlue-800 hover:bg-pgBlue-50 px-2 py-1 rounded">
  Custom Link
</BreadcrumbLink>

// Custom separator styling
<BreadcrumbSeparator 
  type="slash" 
  className="text-pgGreen-400 font-bold mx-3"
/>

// Custom current page styling
<BreadcrumBPage className="bg-pgNeutral-100 px-2 py-1 rounded text-pgText-900 font-medium">
  Current Page
</BreadcrumbPage>
```

### Creating Custom Variants
```tsx
// Extend the existing variants
const customBreadcrumbVariants = cva(
  'flex flex-wrap items-center break-words',
  {
    variants: {
      theme: {
        default: 'text-pgText-600',
        primary: 'text-pgBlue-600',
        success: 'text-pgGreen-600',
      },
      // ... extend existing variants
    }
  }
);
```