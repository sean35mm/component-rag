# NoResults Component

## Purpose

The `NoResults` component displays a user-friendly empty state when no search results or data are found. It provides visual feedback with illustrations and customizable messaging to guide users when content is unavailable.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The main heading text displayed when no results are found |
| `description` | `string` | ❌ | `undefined` | Optional secondary text providing additional context or guidance |

## Usage Example

```tsx
import { NoResults } from '@/components/ui/no-results';

// Basic usage
<NoResults title="No articles found" />

// With description
<NoResults 
  title="No search results"
  description="Try adjusting your search terms or browse our featured content instead."
/>

// In a search results context
function SearchResults({ query, results }) {
  if (results.length === 0) {
    return (
      <NoResults 
        title={`No results for "${query}"`}
        description="Check your spelling or try different keywords to find what you're looking for."
      />
    );
  }
  
  return <ResultsList results={results} />;
}
```

## Design System Usage

### Typography
- **Title**: Uses `.typography-labelXLarge` variant for prominent heading display
- **Description**: Uses `.typography-paragraphSmall` variant for secondary text

### Colors
- **Text Color**: `pgText-700` for both title and description, providing good contrast while maintaining visual hierarchy
- Uses our CSS variable system for automatic dark mode adaptation

### Layout & Spacing
- **Container**: `min-h-[400px]` ensures adequate vertical space for the empty state
- **Padding**: `pt-32` (128px) provides top spacing for visual balance
- **Margins**: `mb-6` (24px) between icon and title, `mb-3` (12px) between title and description

## Styling

### Layout Structure
```css
/* Container */
.relative .flex .min-h-[400px] .w-full .justify-center .pt-32

/* Background illustration */
.absolute .left-0 .top-0

/* Content area */
.relative .z-10 .flex .flex-col .items-center .justify-center
```

### Visual Elements
- **Background Skeleton**: Full-width placeholder illustration (`empty-placeholder-skeleton.svg`)
- **Search Icon**: 73x54px illustration (`search-articles.svg`) with 24px bottom margin
- **Layered Design**: Uses `z-10` to ensure content appears above background illustration

### Customization Options
The component can be styled through:
- **Typography Component**: Inherits all Typography component variants and color options
- **Container Classes**: Additional Tailwind classes can be applied to the root container
- **Icon Replacement**: SVG assets can be swapped for different contexts

## Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 640px)** | Full-width container with centered content, adequate touch targets |
| **Tablet (640px+)** | Maintains proportional spacing and typography scaling |
| **Desktop (1024px+)** | Optimal viewing with generous whitespace and clear visual hierarchy |

The component uses:
- `w-full` for full-width responsiveness
- Flexbox centering for consistent alignment across all screen sizes
- SVG images that scale appropriately with responsive design

## Accessibility

### ARIA Features
- **Alt Text**: Descriptive alt attributes for both illustrations
  - Background: `"No results loader placeholder"`
  - Icon: `"No matches found"`
- **Semantic HTML**: Uses proper heading hierarchy with `<h3>` element
- **Typography Component**: Inherits accessibility features from the Typography system

### Screen Reader Support
- Title is announced as a heading (h3 level)
- Description provides additional context when present
- Images include meaningful alt text for context

### Keyboard Navigation
- Component is display-only and doesn't interfere with keyboard navigation
- Maintains focus flow for surrounding interactive elements

## Dependencies

### Internal Components
- **Typography** (`@/components/ui/typography`): Used for consistent text styling and semantic HTML
- **NextImage** (`next/image`): Optimized image loading and performance

### Design System Assets
- `/empty-placeholder-skeleton.svg` - Background illustration
- `/search-articles.svg` - Search icon illustration

### Design Tokens Used
- Typography: `labelXLarge`, `paragraphSmall`
- Colors: `pgText-700`
- Spacing: Tailwind spacing scale (mb-3, mb-6, pt-32)
- Layout: Flexbox utilities, positioning classes

### Related Components
This component works well with:
- Search components for empty search results
- Data tables for empty data states  
- Loading states and skeleton components
- Error boundary components for fallback UI