# Card Components

## Purpose

A set of composable card components that provide a flexible foundation for displaying grouped content in a visually distinct container. The card system includes six sub-components that work together to create well-structured, accessible content layouts with consistent spacing and visual hierarchy.

## Props Interface

| Component | Prop | Type | Required | Default | Description |
|-----------|------|------|----------|---------|-------------|
| Card | className | string | No | - | Additional CSS classes to merge with default styles |
| Card | ...props | HTMLAttributes<HTMLDivElement> | No | - | Standard HTML div attributes |
| CardHeader | className | string | No | - | Additional CSS classes to merge with default styles |
| CardHeader | ...props | HTMLAttributes<HTMLDivElement> | No | - | Standard HTML div attributes |
| CardTitle | className | string | No | - | Additional CSS classes to merge with default styles |
| CardTitle | ...props | HTMLAttributes<HTMLHeadingElement> | No | - | Standard HTML h3 attributes |
| CardDescription | className | string | No | - | Additional CSS classes to merge with default styles |
| CardDescription | ...props | HTMLAttributes<HTMLParagraphElement> | No | - | Standard HTML p attributes |
| CardContent | className | string | No | - | Additional CSS classes to merge with default styles |
| CardContent | ...props | HTMLAttributes<HTMLDivElement> | No | - | Standard HTML div attributes |
| CardFooter | className | string | No | - | Additional CSS classes to merge with default styles |
| CardFooter | ...props | HTMLAttributes<HTMLDivElement> | No | - | Standard HTML div attributes |

## Usage Example

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

// Basic card with all components
function ProductCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="typography-titleH3 text-pgText-900">
          Premium Plan
        </CardTitle>
        <CardDescription className="typography-paragraphMedium">
          Everything you need to grow your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="typography-headlines24 font-bold text-pgBlue-600">
            $29/month
          </div>
          <ul className="space-y-2 typography-paragraphSmall text-pgText-700">
            <li>✓ Unlimited projects</li>
            <li>✓ 24/7 support</li>
            <li>✓ Advanced analytics</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full px-4 py-2 bg-pgBlue-600 text-white rounded-lg typography-labelMedium">
          Get Started
        </button>
      </CardFooter>
    </Card>
  );
}

// Minimal card usage
function SimpleCard() {
  return (
    <Card className="max-w-md">
      <CardContent className="p-8">
        <div className="typography-paragraphLarge text-pgText-800">
          Simple content without header or footer
        </div>
      </CardContent>
    </Card>
  );
}

// Status card with state colors
function StatusCard({ status }: { status: 'success' | 'warning' | 'error' }) {
  const statusConfig = {
    success: {
      bgColor: 'bg-pgStateSuccess-lighter',
      borderColor: 'border-pgStateSuccess-base',
      textColor: 'text-pgStateSuccess-dark'
    },
    warning: {
      bgColor: 'bg-pgStateWarning-lighter',
      borderColor: 'border-pgStateWarning-base',
      textColor: 'text-pgStateWarning-dark'
    },
    error: {
      bgColor: 'bg-pgStateError-lighter',
      borderColor: 'border-pgStateError-base',
      textColor: 'text-pgStateError-dark'
    }
  };

  return (
    <Card className={`${statusConfig[status].bgColor} ${statusConfig[status].borderColor}`}>
      <CardHeader>
        <CardTitle className={`typography-titleH4 ${statusConfig[status].textColor}`}>
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`typography-paragraphMedium ${statusConfig[status].textColor}`}>
          Current system status: {status}
        </p>
      </CardContent>
    </Card>
  );
}
```

## Design System Usage

### Typography Classes Used
- **Default CardTitle**: Uses `text-2xl font-semibold` (equivalent to typography-titleH3)
- **Default CardDescription**: Uses `text-sm` (similar to typography-paragraphSmall)
- **Recommended Typography**:
  - Title: `.typography-titleH3`, `.typography-titleH4`, `.typography-titleH5`
  - Description: `.typography-paragraphMedium`, `.typography-paragraphSmall`
  - Content: `.typography-paragraphLarge`, `.typography-paragraphMedium`
  - Labels: `.typography-labelMedium`, `.typography-labelSmall`

### Color Tokens Used
- **Background**: `bg-pgBackgroundWhiteInvAlpha-800` (default card background)
- **Text Colors**: `text-pgText-600` (default description), `text-pgText-900`, `text-pgText-800`
- **Border**: Default Tailwind border with shadow-sm
- **State Colors**: All pgState color variants available for status indicators

### Tailwind Utilities Applied
- **Layout**: `flex`, `size-full`, `flex-col`
- **Spacing**: `p-6`, `pt-0`, `space-y-1.5`
- **Borders**: `rounded-2xl`, `border`
- **Shadows**: `shadow-sm`

## Styling

### Available Variants

```tsx
// Size variants
<Card className="w-64 h-32">      {/* Small card */}
<Card className="w-96 h-64">      {/* Medium card */}
<Card className="w-full max-w-2xl"> {/* Large card */}

// Background variants
<Card className="bg-pgNeutral-50">           {/* Light background */}
<Card className="bg-pgBackground-100">       {/* Subtle background */}
<Card className="bg-gradient-to-br from-pgBlue-50 to-pgPurple-50"> {/* Gradient */}

// Border variants
<Card className="border-2 border-pgBlue-200">     {/* Colored border */}
<Card className="border-0 shadow-md">             {/* Borderless with shadow */}
<Card className="border-dashed border-pgStroke-300"> {/* Dashed border */}

// Elevation variants
<Card className="shadow-lg">      {/* Higher elevation */}
<Card className="shadow-2xl">     {/* Maximum elevation */}
<Card className="shadow-none">    {/* Flat design */}
```

### Interactive States

```tsx
// Hoverable card
<Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer">

// Clickable card with focus states
<Card className="focus:outline-none focus:ring-2 focus:ring-pgBlue-500 focus:ring-offset-2">

// Selected state
<Card className="ring-2 ring-pgBlue-500 bg-pgBlue-50/50">
```

## Responsive Design

### Breakpoint Adaptations

```tsx
// Responsive sizing
<Card className="w-full sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem]">

// Responsive padding
<CardHeader className="p-4 sm:p-6 lg:p-8">
<CardContent className="p-4 sm:p-6 lg:p-8 pt-0">

// Responsive typography
<CardTitle className="typography-titleH5 md:typography-titleH4 lg:typography-titleH3">

// Responsive layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### Mobile Optimization

```tsx
// Mobile-first card design
<Card className="mx-4 sm:mx-0 rounded-xl sm:rounded-2xl">
  <CardHeader className="p-4 sm:p-6">
    <CardTitle className="typography-titleH5 sm:typography-titleH4">
      Mobile Title
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4 sm:p-6 pt-0">
    <p className="typography-paragraphSmall sm:typography-paragraphMedium">
      Responsive content
    </p>
  </CardContent>
</Card>
```

## Accessibility

### ARIA Support
- **CardTitle**: Renders as semantic `<h3>` element for proper heading hierarchy
- **CardDescription**: Uses `<p>` element for proper text semantics
- **Focus Management**: All components support ref forwarding for focus control

### Best Practices

```tsx
// Proper heading hierarchy
<Card>
  <CardHeader>
    <CardTitle as="h2">Main Card Title</CardTitle> {/* Adjust heading level as needed */}
    <CardDescription>Supporting description</CardDescription>
  </CardHeader>
</Card>

// Interactive cards
<Card 
  role="button" 
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-pgBlue-500"
>

// Screen reader support
<Card aria-labelledby="card-title" aria-describedby="card-description">
  <CardHeader>
    <CardTitle id="card-title">Accessible Title</CardTitle>
    <CardDescription id="card-description">Accessible description</CardDescription>
  </CardHeader>
</Card>
```

### Keyboard Navigation

```tsx
// Keyboard accessible card group
<div role="group" aria-label="Product cards">
  {products.map((product, index) => (
    <Card 
      key={product.id}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleProductSelect(product);
        }
      }}
    >
      {/* Card content */}
    </Card>
  ))}
</div>
```

## Dependencies

### Internal Dependencies
- **Utilities**: `@/lib/utils/cn` - Class name merging utility using clsx and tailwind-merge
- **React**: forwardRef for ref forwarding support

### Related Components
- **Button**: Often used in CardFooter for actions
- **Badge**: Commonly used in CardHeader for status indicators  
- **Avatar**: Frequently used in CardHeader for user representation
- **Separator**: Can be used between CardContent sections

### Design System Integration
- **Typography System**: Integrates with all typography classes from globals.css
- **Color System**: Compatible with all pgNeutral, pgBackground, pgText, and pgState color tokens
- **Spacing System**: Uses standard Tailwind spacing scale
- **Dark Mode**: Automatically adapts with CSS variable-based color system