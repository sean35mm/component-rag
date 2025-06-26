# Footer Component

## Purpose

The Footer component provides a horizontal navigation bar typically displayed at the bottom of pages. It renders a list of product-related links with visual separators, offering users quick access to important pages or external resources. The component is designed to be flexible and reusable across different pages while maintaining consistent styling and behavior.

## Component Type

**Client Component** - Uses the `'use client'` directive because it leverages client-side navigation with NextLink and requires interactive hover states for the typography elements. While the component doesn't manage complex state, the interactive behaviors necessitate client-side rendering.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| className | `string` | No | `undefined` | Additional CSS classes to apply to the footer container |
| ...props | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Any additional HTML div attributes (id, data-*, etc.) |

## Usage Example

```tsx
import { Footer } from '@/components/home/footer';

// Basic usage
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
}

// With custom styling
export default function CustomPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Page content */}
      </main>
      <Footer className="bg-gray-50 border-t" />
    </div>
  );
}

// With additional props
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Page content */}
      </main>
      <Footer 
        className="mt-auto" 
        data-testid="footer"
        role="contentinfo"
      />
    </div>
  );
}
```

## Functionality

- **Dynamic Link Rendering**: Automatically generates navigation links from the `FOOTER_PRODUCT_LINKS` constant
- **Visual Separators**: Adds bullet point separators between links (except after the last link)
- **External Navigation**: Opens all links in new tabs using `target='_blank'`
- **Hover Interactions**: Provides visual feedback with color transitions on link hover
- **Responsive Design**: Uses flexbox layout that adapts to different screen sizes
- **Accessible Typography**: Leverages the Typography component for consistent text styling

## State Management

**No State Management** - This is a stateless presentation component that:
- Receives configuration through props and constants
- Renders static content based on the `FOOTER_PRODUCT_LINKS` array
- Does not require TanStack Query, Zustand, or local state
- Follows the architectural pattern of keeping UI components simple and stateless

## Side Effects

**No Side Effects** - The component is purely presentational and does not:
- Make API calls
- Perform data fetching
- Execute side effects in useEffect hooks
- Interact with external services
- Modify global state

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - For consistent text styling and accessibility
- `@/lib/constants` - For the `FOOTER_PRODUCT_LINKS` configuration array
- `@/lib/utils/cn` - For conditional CSS class merging

### External Dependencies
- `next/link` - For client-side navigation and external link handling
- `react` - For component structure and TypeScript interfaces

### Expected Constants Structure
```typescript
// Expected structure of FOOTER_PRODUCT_LINKS
type FooterLink = {
  name: string;
  href: string;
};

const FOOTER_PRODUCT_LINKS: FooterLink[];
```

## Integration

### Application Architecture Role
- **Layout Component**: Typically used in layout components or page-level components
- **Domain Placement**: Located in `/components/home/` indicating it's part of the home/landing page domain
- **Reusability**: Can be reused across multiple pages that need footer navigation
- **Styling Integration**: Integrates with the design system through the Typography component and Tailwind classes

### Common Integration Patterns
```tsx
// Layout integration
export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// Page-specific integration
export default function AboutPage() {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen flex flex-col">
        <article className="flex-1">
          {/* Page content */}
        </article>
        <Footer className="mt-8" />
      </div>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Simple, single-level component without unnecessary nesting
- ✅ **Appropriate Client Component**: Uses client directive only when needed for interactivity
- ✅ **Props Spreading**: Properly extends HTML attributes for flexibility
- ✅ **Utility Integration**: Uses the `cn` utility for conditional class merging
- ✅ **Separation of Concerns**: Configuration extracted to constants file

### Implementation Recommendations
- **Configuration Management**: Keep footer links in a constants file for easy maintenance
- **Accessibility**: Consider adding `aria-label` for the footer container
- **SEO Optimization**: Ensure external links include `rel="noopener noreferrer"` for security
- **Performance**: Component is lightweight and doesn't require memoization
- **Testing**: Easy to test due to stateless nature and clear prop interface

### Future Enhancements
```tsx
// Enhanced version with better accessibility and SEO
<NextLink 
  target="_blank" 
  href={link.href}
  rel="noopener noreferrer"
  aria-label={`Visit ${link.name} (opens in new tab)`}
>
```