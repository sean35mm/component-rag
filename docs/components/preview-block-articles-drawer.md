# PreviewBlockArticlesDrawer

## Purpose

The `PreviewBlockArticlesDrawer` component provides a mobile-optimized drawer interface for displaying article previews with a call-to-action to view the full article on the original source. It uses the Sheet component as a foundation to create a slide-up overlay that contains article content and a footer action button.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `article` | `Article` | ✅ | Article object containing content, metadata, and source information |
| `isOpen` | `boolean` | ✅ | Controls the open/closed state of the drawer |
| `setIsOpen` | `(isOpen: boolean) => void` | ✅ | Callback function to update the drawer's open state |

## Usage Example

```tsx
import { useState } from 'react';
import { PreviewBlockArticlesDrawer } from '@/components/ui/preview-block-articles-drawer';
import { Article } from '@/lib/types';

function ArticleList() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Article list items */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => handleArticleClick(article)}
            className="p-4 bg-pgBackground-50 hover:bg-pgBackground-100 
                       rounded-lg text-left transition-colors"
          >
            <h3 className="typography-labelLarge text-pgText-900">
              {article.title}
            </h3>
            <p className="typography-paragraphSmall text-pgText-600 mt-2">
              {article.excerpt}
            </p>
          </button>
        ))}
      </div>

      {/* Preview Drawer */}
      {selectedArticle && (
        <PreviewBlockArticlesDrawer
          article={selectedArticle}
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </div>
  );
}
```

## Design System Usage

### Background Colors
- **Primary Background**: `bg-pgBackground-0` - Clean white/light background for the drawer content
- **Semantic Usage**: Uses the neutral background token for consistent theming across light/dark modes

### Component Structure
- **Sheet Foundation**: Built on the Sheet component system for consistent drawer behavior
- **Mobile-First**: Specifically designed with `isMobile` prop for mobile-optimized experience
- **Icon Integration**: Uses `PiArrowRightUpLine` from the design system icon library

### Typography Integration
- Inherits typography styles from the nested `PreviewBlockArticles` component
- Button text uses standard button typography from the Button component

## Styling

### Available Customizations

#### Sheet Styling
```tsx
// Custom background override
<SheetContent className='bg-pgBackground-0'>
```

#### Header Configuration
```tsx
// Minimal header with left-side close button
<SheetHeader
  isMobile
  closeIconSide='left'
  className='border-b-0 pb-0'
/>
```

#### Button Variants
```tsx
// Primary filled button with full width
<Button className='w-full gap-2' asChild variant='primaryFilled'>
```

### State Variations
- **Open State**: Controlled by `isOpen` prop with smooth slide-up animation
- **Closed State**: Dismissible via close button or backdrop click
- **Loading State**: Inherits from PreviewBlockArticles component

## Responsive Design

### Mobile Optimization
- **Primary Target**: Designed specifically for mobile viewports
- **Full-Width Footer**: Button spans full width for easy touch interaction
- **Slide-Up Animation**: Native mobile app-like interaction pattern

### Breakpoint Behavior
```scss
// Optimal usage across breakpoints
@media (max-width: 767px) {
  /* Drawer is primary interface */
}

@media (min-width: 768px) {
  /* Consider modal or sidebar alternatives */
}
```

## Accessibility

### Keyboard Navigation
- **Focus Management**: Sheet component handles focus trapping within drawer
- **ESC Key**: Closes drawer when focused
- **Tab Navigation**: Cycles through interactive elements (close button, external link)

### Screen Reader Support
- **External Link Indication**: Button clearly indicates "View on [domain]" with external icon
- **Link Semantics**: Uses proper `<a>` element with `target="_blank"` and security attributes
- **Drawer Semantics**: Sheet component provides proper ARIA dialog implementation

### Security Considerations
```tsx
// Safe external link handling
<NextLink
  href={article.url}
  target='_blank'
  rel='noopener noreferrer'
>
```

## Dependencies

### Internal Components
- **Sheet**: `./sheet` - Core drawer/modal functionality
  - `Sheet` - Root container
  - `SheetContent` - Main content area
  - `SheetHeader` - Header with close button
  - `SheetFooter` - Footer action area

- **PreviewBlockArticles**: `./preview-block-articles` - Article content display
- **Button**: `./button` - Action button with variants

### External Dependencies
- **NextLink**: `next/link` - Next.js routing and external links
- **Icons**: `@/components/icons` - Design system icon library

### Type Dependencies
- **Article**: `@/lib/types` - Article data structure

### Related Components
- Consider using with `PreviewBlockArticles` for consistent article display
- Pairs well with article list components and search interfaces
- Can be integrated with bookmark and sharing functionality