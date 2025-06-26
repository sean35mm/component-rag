# ImageWithFallback Component

## Purpose

The `ImageWithFallback` component is a robust image display component that extends Next.js's `Image` component with automatic fallback functionality. It gracefully handles image loading failures by displaying a fallback image when the primary source is unavailable, invalid, or fails to load. The component includes built-in error tracking through Sentry and automatically resets error states when the source changes.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `fallback` | `ImageProps['src']` | ✅ | - | The fallback image source to display when the primary image fails to load or is invalid |
| `src` | `string` | ❌ | - | The primary image source URL or path |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the image element |
| ...other | `NextImageProps` | ❌ | - | All other Next.js Image props except `src` and `onError` |

*Note: All standard Next.js Image props are supported except `src` and `onError` which are handled internally.*

## Usage Example

```tsx
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

// Basic usage with fallback
<ImageWithFallback
  src="https://example.com/user-avatar.jpg"
  fallback="/images/default-avatar.png"
  alt="User profile picture"
  width={80}
  height={80}
  className="rounded-full border-2 border-pgNeutral-200 dark:border-pgNeutral-700"
/>

// Product image with design system styling
<ImageWithFallback
  src={product.imageUrl}
  fallback="/images/product-placeholder.svg"
  alt={product.name}
  width={400}
  height={300}
  className="rounded-lg bg-pgBackground-50 dark:bg-pgBackground-900 object-cover"
  priority
/>

// Profile card with responsive sizing
<div className="flex items-center gap-4">
  <ImageWithFallback
    src={user.avatar}
    fallback="/icons/user-default.svg"
    alt={`${user.name}'s avatar`}
    width={48}
    height={48}
    className="rounded-full ring-2 ring-pgBlue-200 dark:ring-pgBlue-800"
  />
  <div>
    <h3 className="typography-labelLarge text-pgText-900 dark:text-pgText-100">
      {user.name}
    </h3>
    <p className="typography-paragraphSmall text-pgText-600 dark:text-pgText-400">
      {user.role}
    </p>
  </div>
</div>

// Gallery thumbnail with state styling
<ImageWithFallback
  src={thumbnail.url}
  fallback="/images/image-placeholder.png"
  alt={thumbnail.caption}
  width={200}
  height={150}
  className={cn(
    "rounded border transition-all duration-200",
    "hover:border-pgBlue-300 hover:shadow-lg",
    "focus:ring-2 focus:ring-pgBlue-500 focus:border-transparent",
    isSelected && "border-pgBlue-500 shadow-md"
  )}
/>
```

## Design System Usage

### Default Styling
- **Background Colors**: `bg-pgIcon-200 dark:bg-pgNeutral-600` - Provides a subtle background while images load
- **Color Adaptation**: Automatic dark mode support with contrasting background colors

### Typography Integration
When used in layouts with text, combine with our typography classes:
- **Labels**: `.typography-labelMedium` for image captions
- **Subheadings**: `.typography-subheadingSmall` for image titles
- **Paragraphs**: `.typography-paragraphSmall` for descriptions

### Color Tokens
Commonly used color combinations:
```tsx
// Border and ring styling
"border-pgNeutral-200 dark:border-pgNeutral-700"
"ring-pgBlue-200 dark:ring-pgBlue-800"

// Background variations
"bg-pgBackground-50 dark:bg-pgBackground-900"
"bg-pgNeutral-100 dark:bg-pgNeutral-800"

// State colors for interactive images
"hover:border-pgBlue-300 focus:ring-pgBlue-500"
"border-pgStateError-base" // For failed states
"border-pgStateSuccess-base" // For verified images
```

## Styling

### Available Variants

**Avatar Style**
```tsx
className="rounded-full border-2 border-pgNeutral-200 dark:border-pgNeutral-700"
```

**Card Image Style**
```tsx
className="rounded-lg object-cover bg-pgBackground-50 dark:bg-pgBackground-900"
```

**Thumbnail Style**
```tsx
className="rounded border border-pgStroke-200 dark:border-pgStroke-700 hover:border-pgBlue-300"
```

**Hero Image Style**
```tsx
className="w-full object-cover bg-gradient-to-br from-pgNeutral-100 to-pgNeutral-200 dark:from-pgNeutral-800 dark:to-pgNeutral-900"
```

### Customization Options

The component accepts all standard Tailwind classes and can be customized with:
- **Border Radius**: `rounded-*` classes
- **Object Fit**: `object-cover`, `object-contain`, `object-fill`
- **Aspect Ratio**: `aspect-square`, `aspect-video`, `aspect-[4/3]`
- **Shadow**: `shadow-*` classes with our design system variants
- **Transitions**: `transition-*` for hover and focus effects

## Responsive Design

### Breakpoint Adaptations

```tsx
// Responsive sizing
<ImageWithFallback
  src={image.url}
  fallback="/placeholder.png"
  alt="Responsive image"
  width={400}
  height={300}
  className={cn(
    "w-full h-auto",
    "sm:max-w-sm md:max-w-md lg:max-w-lg",
    "rounded-lg object-cover"
  )}
/>

// Grid layout responsive images
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {images.map((img) => (
    <ImageWithFallback
      key={img.id}
      src={img.url}
      fallback="/grid-placeholder.png"
      alt={img.alt}
      width={200}
      height={200}
      className="aspect-square object-cover rounded-md"
    />
  ))}
</div>
```

### Mobile Optimization
- Use appropriate `sizes` prop for responsive images
- Consider `priority` prop for above-the-fold images
- Implement lazy loading for gallery images

## Accessibility

### Built-in Features
- **Alt Text**: Always provide meaningful `alt` prop values
- **Focus Management**: Inherits Next.js Image focus behavior
- **Screen Reader Support**: Works with assistive technologies

### Best Practices
```tsx
// Descriptive alt text
<ImageWithFallback
  src={user.avatar}
  fallback="/default-avatar.svg"
  alt={`Profile picture of ${user.name}`}
  // Not just "avatar" or "user image"
/>

// Decorative images
<ImageWithFallback
  src="/decorative-pattern.png"
  fallback="/pattern-fallback.png"
  alt="" // Empty alt for decorative images
  role="presentation"
/>

// Interactive images
<button className="focus:ring-2 focus:ring-pgBlue-500 rounded">
  <ImageWithFallback
    src={thumbnail.url}
    fallback="/thumbnail-placeholder.png"
    alt={`View ${item.name} details`}
    width={100}
    height={100}
  />
</button>
```

## Dependencies

### Internal Dependencies
- **Utilities**: `cn` from `@/lib/utils/cn` for class name merging
- **Error Handling**: `captureException`, `SentryScope` from `@/lib/utils/sentry`

### External Dependencies
- **Next.js**: `next/image` for optimized image loading
- **React**: `forwardRef`, hooks for state management

### Related Components
- **Avatar**: Often used together for user profile displays
- **Card**: Commonly contains ImageWithFallback components
- **Gallery**: Uses ImageWithFallback for thumbnail displays
- **ProductCard**: Integrates with product image displays

### Design System Integration
- Compatible with all design system color tokens
- Works with typography classes for captions and labels
- Supports responsive breakpoint system
- Integrates with state color system for interactive elements