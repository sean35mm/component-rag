# Article Highlight Component

## Purpose

The Article Highlight component renders search highlights from article content, displaying the most relevant snippets from search results. It intelligently balances highlights from both article content and titles, prioritizing content highlights while maintaining a maximum of 3 highlights per article. Each highlight is formatted as a quoted snippet with appropriate typography styling.

## Props Interface

### ArticleHighlights

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `highlights` | `ArticleHighlightType` | Yes | Object containing arrays of highlight strings from article content and titles |

### Highlight

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `highlight` | `string` | Yes | Individual highlight string to be displayed as a quoted snippet |

### ArticleHighlightType Interface

```typescript
interface ArticleHighlightType {
  content?: string[];
  title?: string[];
}
```

## Usage Example

```tsx
import { ArticleHighlights } from '@/components/ui/article-highlight';

// Example with search highlights
const searchHighlights = {
  content: [
    "The React component uses <mark>advanced state management</mark> techniques",
    "This approach provides <mark>better performance</mark> than traditional methods",
    "Integration with <mark>TypeScript</mark> ensures type safety"
  ],
  title: [
    "Advanced <mark>React Patterns</mark> for Modern Applications"
  ]
};

function SearchResults() {
  return (
    <div className="bg-pgBackground-0 p-4">
      <h2 className="typography-titleH3 text-pgText-950 mb-4">
        Search Results
      </h2>
      
      <article className="bg-pgNeutral-0 rounded-lg p-6 shadow-sm">
        <h3 className="typography-titleH4 text-pgText-900 mb-2">
          Article Title
        </h3>
        
        <ArticleHighlights highlights={searchHighlights} />
        
        <div className="mt-4">
          <a 
            href="/article/123" 
            className="text-pgBlue-600 hover:text-pgBlue-700 typography-labelMedium"
          >
            Read Full Article
          </a>
        </div>
      </article>
    </div>
  );
}

// Example with no highlights (component returns null)
const emptyHighlights = {
  content: [],
  title: []
};

<ArticleHighlights highlights={emptyHighlights} />
// Renders nothing

// Example with single highlight
const singleHighlight = {
  content: ["This is a <mark>highlighted term</mark> in the content"],
  title: []
};

<ArticleHighlights highlights={singleHighlight} />
```

## Design System Usage

### Typography
- **Primary Text**: `.typography-paragraphSmall` - Used for highlight content with appropriate reading size
- **Font Family**: `font-roboto` - Ensures consistent typography with design system

### Colors
- **Border Accent**: `border-l-[#F9C035]` - Custom gold accent color for visual hierarchy
- **Text Color**: Inherits from Typography component, typically `pgText-900` or `pgText-950`

### Layout & Spacing
- **Container**: `flex w-full flex-col` - Full-width flexible container
- **Spacing**: `mt-2 px-2` - Consistent spacing using Tailwind scale
- **Border**: `border-l` - Left border for visual distinction

## Styling

### Visual Design
- **Quote Styling**: Each highlight is wrapped in curly quotes (`"..."`) for proper quotation formatting
- **Left Border**: Gold accent border (`#F9C035`) creates visual connection to highlighted content
- **Padding**: Horizontal padding (`px-2`) provides breathing room from the border

### Content Processing
- **Automatic Punctuation**: Removes trailing periods to avoid double punctuation with quote marks
- **HTML Rendering**: Safely renders HTML content using `dangerouslySetInnerHTML` for search term highlighting
- **Balanced Selection**: Intelligently selects up to 3 highlights, prioritizing content over titles

## Responsive Design

The component is fully responsive and adapts across all breakpoints:

```tsx
// Component works seamlessly across all breakpoints
<div className="w-full sm:w-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl">
  <ArticleHighlights highlights={highlights} />
</div>
```

- **Mobile (< 640px)**: Full-width layout with compact spacing
- **Tablet (640px+)**: Maintains proportional spacing
- **Desktop (1024px+)**: Consistent with mobile/tablet, no specific desktop adaptations needed

## Accessibility

### Semantic HTML
- Uses proper quote characters (`&#8220;` and `&#8221;`) for screen reader compatibility
- Maintains semantic structure with proper `<span>` elements

### Screen Reader Support
```tsx
// Enhanced accessibility example
<div 
  className="mt-2 flex w-full flex-col border-l border-l-[#F9C035] px-2"
  role="region"
  aria-label="Article highlights"
>
  {balancedHighlights.map((highlight, index) => (
    <div key={index} role="blockquote" aria-label={`Highlight ${index + 1}`}>
      <Highlight highlight={highlight} />
    </div>
  ))}
</div>
```

### Best Practices
- **Meaningful Content**: Only renders when highlights are available
- **Proper Quotation**: Uses semantic quote characters instead of straight quotes
- **HTML Safety**: Carefully handles HTML content from search highlighting

## Dependencies

### Internal Dependencies
- **Typography Component**: `@/components/ui/typography` - Provides consistent text styling
- **Article Types**: `@/lib/types/article` - Type definitions for ArticleHighlight
- **Article Utils**: `@/lib/utils/articles` - `processHighlights` utility function

### Utility Functions
- **`getBalancedHighlights`**: Exported utility for highlight selection logic
- **`processHighlights`**: External utility for processing raw highlight data

### Usage with Related Components
```tsx
import { ArticleHighlights } from '@/components/ui/article-highlight';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';

function SearchResultCard({ article, highlights }) {
  return (
    <Card className="bg-pgBackground-0 border-pgStroke-200">
      <Typography variant="titleH4" className="text-pgText-950 mb-2">
        {article.title}
      </Typography>
      
      <Typography variant="paragraphMedium" className="text-pgText-700 mb-3">
        {article.excerpt}
      </Typography>
      
      <ArticleHighlights highlights={highlights} />
    </Card>
  );
}
```

## Advanced Usage

### Custom Styling Override
```tsx
// Custom styling while maintaining design system
<div className="mt-4 flex w-full flex-col border-l-2 border-l-pgGold-400 px-4 bg-pgBackground-50/30">
  <ArticleHighlights highlights={highlights} />
</div>
```

### Integration with Search
```tsx
function SearchResults({ searchTerm, results }) {
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <article key={result.id} className="bg-pgNeutral-0 p-6 rounded-lg">
          <Typography variant="titleH3" className="text-pgText-950">
            {result.title}
          </Typography>
          
          <ArticleHighlights highlights={result.highlights} />
          
          <div className="mt-4 flex justify-between items-center">
            <Typography variant="labelSmall" className="text-pgText-600">
              {result.publishDate}
            </Typography>
            <button className="bg-pgBlue-600 text-pgNeutral-0 px-4 py-2 rounded-md typography-labelMedium">
              Read More
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
```