# IconPerigonLogoFull Component

## Purpose

The `IconPerigonLogoFull` component renders the complete Perigon brand logo as an SVG, including both the distinctive logo mark (a yellow rounded square with stylized "P") and the company wordmark. It provides flexible rendering options, allowing the logo to be displayed with or without the text portion based on the `onlyLogo` prop.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without requiring client-side interactivity, browser APIs, or event handlers. It can be safely rendered on the server for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onlyLogo` | `boolean` | No | `false` | When `true`, hides the text portion of the logo, showing only the logo mark |
| `...other` | `SVGAttributes<SVGElement>` | No | - | All standard SVG attributes (width, height, className, style, etc.) |

## Usage Example

```tsx
import { IconPerigonLogoFull } from '@/components/icons/icon-perigon-full';

// Full logo with text
function Header() {
  return (
    <div className="flex items-center">
      <IconPerigonLogoFull 
        className="h-8 w-auto text-gray-900 dark:text-white" 
        aria-label="Perigon Logo"
      />
    </div>
  );
}

// Logo mark only (without text)
function CompactHeader() {
  return (
    <div className="flex items-center">
      <IconPerigonLogoFull 
        onlyLogo={true}
        className="h-8 w-8"
        aria-label="Perigon"
      />
    </div>
  );
}

// Custom styling for different contexts
function BrandedSection() {
  return (
    <section className="hero-section">
      <IconPerigonLogoFull 
        width={200}
        height={46}
        className="mx-auto mb-4"
      />
    </section>
  );
}
```

## Functionality

- **Dual Display Modes**: Renders either the complete logo with text or just the logo mark based on the `onlyLogo` prop
- **Responsive Design**: Uses viewBox for scalable vector graphics that maintain aspect ratio
- **Theme Awareness**: Text portions use `currentColor` and theme-aware classes for dark/light mode compatibility
- **Accessibility Ready**: Accepts standard SVG attributes including ARIA labels for screen readers
- **Brand Consistency**: Maintains exact brand colors and proportions as specified in design guidelines

## State Management

**No state management required** - This is a stateless presentational component that renders based solely on props. No TanStack Query, Zustand, or local state needed.

## Side Effects

**No side effects** - Pure component with no API calls, external data fetching, or side effects. Renders deterministically based on props.

## Dependencies

- **React**: Core React library for component structure
- **TypeScript**: Uses `SVGAttributes<SVGElement>` for type safety
- **CSS Classes**: Relies on Tailwind CSS for theme-aware styling (`fill-[#227C9D] dark:fill-[#34B3E2]`)

## Integration

The component fits into the application architecture as:

- **Brand Identity Layer**: Core component for maintaining consistent brand presentation across the application
- **Icon System**: Part of the `/components/icons/` directory following the flat component organization pattern
- **Design System**: Provides the foundational brand element for headers, loading states, authentication pages, and marketing sections
- **Theme Integration**: Works seamlessly with the application's dark/light theme system through CSS custom properties

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Server Component**: Correctly implemented as server component (no 'use client' needed)
- **Flat Organization**: Located in `/components/icons/` following flat component structure
- **Reusable Design**: Generic enough for use across different application contexts
- **Type Safety**: Properly typed with TypeScript interfaces extending standard SVG attributes

✅ **Implementation Best Practices**:
- **Accessibility**: Supports ARIA attributes for screen readers
- **Performance**: SVG-based for crisp rendering at any scale without image downloads
- **Flexibility**: Accepts all standard SVG props while providing brand-specific functionality
- **Theme Compatibility**: Uses CSS classes and `currentColor` for automatic theme adaptation
- **Semantic Naming**: Clear, descriptive component and prop names following convention

✅ **Usage Recommendations**:
- Use in application headers, authentication pages, and brand-focused sections
- Apply appropriate ARIA labels for accessibility
- Leverage the `onlyLogo` prop for space-constrained layouts
- Use `currentColor` inheritance for automatic theme color adaptation