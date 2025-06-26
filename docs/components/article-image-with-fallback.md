# ArticleImageWithFallback Component

## Purpose

The `ArticleImageWithFallback` component is a specialized image component designed specifically for displaying article images with graceful fallback handling. It extends the base `ImageWithFallback` component to automatically handle article-specific image requirements, including extracting image sources from article data and providing deterministic placeholder images when the primary image fails to load.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `article` | `Article` | ✅ | - | The article object containing image URL, title, and article ID |
| `className` | `string` | ❌ | - | Additional CSS classes to apply to the image element |
| `width` | `number` | ❌ | - | Image width in pixels |
| `height` | `number` | ❌ | - | Image height in pixels |
| `priority` | `boolean` | ❌ | `false` | Whether to prioritize loading this image |
| `quality` | `number` | ❌ | `75` | Image quality (1-100) |
| `fill` | `boolean` | ❌ | `false` | Whether the image should fill its container |
| `sizes` | `string` | ❌ | - | Responsive image sizes attribute |
| `onLoad` | `() => void` | ❌ | - | Callback fired when image loads successfully |
| `onError` | `() => void` | ❌ | - | Callback fired when image fails to load |

> **Note**: This component inherits all props from `ImageWithFallbackProps` except `alt`, `src`, `fallback`, and `ref` which are automatically handled.

## Usage Example

```tsx
import { ArticleImageWithFallback } from '@/components/ui/skeletons/article-image-with-fallback';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-pgBackground-0 dark:bg-pgBackground-900 rounded-lg overflow-hidden shadow-sm border border-pgStroke-200 dark:border-pgStroke-700">
      {/* Article Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <ArticleImageWithFallback
          article={article}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>
      
      {/* Article Content */}
      <div className="p-6">
        <h3 className="typography-titleH3 text-pgText-900 dark:text-pgText-100 mb-2">
          {article.title}
        </h3>
        <p className="typography-paragraphMedium text-pgText-600 dark:text-pgText-400">
          {article.excerpt}
        </p>
      </div>
    </div>
  );
};

// Grid Layout Example
const ArticleGrid = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.articleId} className="group">
          <ArticleImageWithFallback
            article={article}
            className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
            width={400}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};

// Hero Article Example
const HeroArticle = ({ featuredArticle }) => {
  return (
    <section className="relative h-[60vh] min-h-[400px]">
      <ArticleImageWithFallback
        article={featuredArticle}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pgNeutral-900/80 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h1 className="typography-titleH1 text-pgText-0 mb-4">
          {featuredArticle.title}
        </h1>
        <p className="typography-paragraphLarge text-pgText-200 max-w-2xl">
          {featuredArticle.excerpt}
        </p>
      </div>
    </section>
  );
};
```

## Design System Usage

### Typography Classes
While the component itself doesn't apply typography, it's commonly used alongside:
- **Article Titles**: `.typography-titleH2`, `.typography-titleH3` for accompanying headlines
- **Article Metadata**: `.typography-labelSmall`, `.typography-labelXSmall` for dates, authors
- **Article Excerpts**: `.typography-paragraphMedium`, `.typography-paragraphSmall`

### Color Tokens
- **Background Colors**: `bg-pgBackground-0`, `bg-pgBackground-900` for card backgrounds
- **Border Colors**: `border-pgStroke-200`, `border-pgStroke-700` for card borders
- **Text Colors**: `text-pgText-900`, `text-pgText-100` for content
- **Overlay Colors**: `bg-pgNeutral-900/80` for image overlays

### Common Tailwind Utilities
- **Layout**: `aspect-[16/9]`, `relative`, `overflow-hidden`, `fill`
- **Sizing**: `w-full`, `h-48`, `h-64`, `min-h-[400px]`
- **Object Fit**: `object-cover`, `object-center`
- **Transitions**: `transition-transform`, `duration-300`, `hover:scale-105`

## Styling

### Common Styling Patterns

```tsx
// Card Style
<ArticleImageWithFallback
  article={article}
  className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
/>

// Hero Style
<ArticleImageWithFallback
  article={article}
  fill
  className="object-cover object-center"
/>

// Thumbnail Style
<ArticleImageWithFallback
  article={article}
  className="w-20 h-20 object-cover rounded-md border border-pgStroke-200"
  width={80}
  height={80}
/>

// List Item Style
<ArticleImageWithFallback
  article={article}
  className="w-16 h-16 object-cover rounded border border-pgStroke-100 dark:border-pgStroke-800"
  width={64}
  height={64}
/>
```

### State Variations

```tsx
// Loading State Styling
<div className="relative">
  <ArticleImageWithFallback
    article={article}
    className={cn(
      "transition-opacity duration-200",
      isLoading && "opacity-50"
    )}
  />
  {isLoading && (
    <div className="absolute inset-0 bg-pgNeutral-100 dark:bg-pgNeutral-800 animate-pulse" />
  )}
</div>

// Error State Styling
<ArticleImageWithFallback
  article={article}
  className="border-2 border-pgStateError-light dark:border-pgStateError-dark"
  onError={() => setHasError(true)}
/>
```

## Responsive Design

### Breakpoint Adaptations

```tsx
// Responsive Sizing
<ArticleImageWithFallback
  article={article}
  className="
    w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64
    object-cover rounded-md
  "
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>

// Responsive Grid Layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {articles.map((article) => (
    <ArticleImageWithFallback
      key={article.articleId}
      article={article}
      className="aspect-square object-cover rounded-lg"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
    />
  ))}
</div>

// Mobile-First Approach
<ArticleImageWithFallback
  article={article}
  className="
    w-full h-48 object-cover rounded-lg
    md:h-56 md:rounded-xl
    lg:h-64
    xl:h-72
  "
/>
```

## Accessibility

### Automatic Alt Text
- **Alt Text**: Automatically uses `article.title` as alt text for screen readers
- **Descriptive**: Provides meaningful context about the article content
- **Fallback Safe**: Alt text remains available even when image fails to load

### Accessibility Best Practices

```tsx
// Decorative Images (rare case)
<ArticleImageWithFallback
  article={article}
  className="object-cover"
  role="presentation" // Only if purely decorative
/>

// Enhanced Accessibility
<figure className="relative">
  <ArticleImageWithFallback
    article={article}
    className="w-full h-64 object-cover rounded-lg"
  />
  <figcaption className="typography-labelSmall text-pgText-600 dark:text-pgText-400 mt-2">
    {article.imageCaption || article.title}
  </figcaption>
</figure>

// Interactive Images
<button 
  className="group relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-pgBlue-500 focus:ring-offset-2"
  onClick={() => openArticle(article)}
>
  <ArticleImageWithFallback
    article={article}
    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
  />
  <span className="sr-only">Read article: {article.title}</span>
</button>
```

### Focus Management
- **Keyboard Navigation**: When used in interactive contexts, ensure proper focus states
- **Screen Readers**: Alt text provides article context
- **Color Contrast**: Ensure sufficient contrast for overlaid text

## Dependencies

### Internal Dependencies
- **`ImageWithFallback`**: Base image component with fallback functionality
- **`useImagePlaceholder`**: Hook for generating deterministic placeholder images
- **`Article` Type**: TypeScript interface defining article data structure

### Related Components
- **`ArticleCard`**: Commonly used together for article listings
- **`ArticleSkeleton`**: Loading state component for article content
- **`MediaGallery`**: For multiple article images

### Utility Dependencies
- **React**: `forwardRef`, `ElementRef` for ref forwarding
- **TypeScript**: Strong typing for article data and props

### Usage with Other UI Components

```tsx
import { ArticleImageWithFallback } from '@/components/ui/skeletons/article-image-with-fallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ArticlePreview = ({ article }) => {
  return (
    <div className="bg-pgBackground-0 dark:bg-pgBackground-900 rounded-xl overflow-hidden">
      <ArticleImageWithFallback
        article={article}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="typography-labelSmall text-pgText-500">
            {article.publishedAt}
          </span>
        </div>
        <h3 className="typography-titleH3 mb-2">{article.title}</h3>
        <p className="typography-paragraphMedium text-pgText-600 mb-4">
          {article.excerpt}
        </p>
        <Button variant="outline" size="sm">
          Read More
        </Button>
      </div>
    </div>
  );
};
```