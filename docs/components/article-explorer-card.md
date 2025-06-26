# ArticleExplorerCard Component

## Purpose

The `ArticleExplorerCard` component renders a clickable card displaying article information in a list format. It serves as a compact representation of articles within the article explorer feature, showing essential details like title, source, publication date, and associated labels. The component adapts its click behavior based on screen size - opening articles in a new tab on mobile devices and triggering a callback on desktop for inline viewing.

## Component Type

**Client Component** - This component uses the `'use client'` directive because it:
- Handles user interactions (click events)
- Uses the `useCallback` hook for event handling
- Utilizes the `useBreakpoint` hook for responsive behavior
- Manages interactive state transitions and hover effects

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `article` | `Article` | Yes | The article object containing all article data including title, source, labels, and URL |
| `now` | `Date` | Yes | Current date used for calculating relative publication time |
| `onClick` | `(article: Article) => void` | Yes | Callback function executed when the card is clicked on desktop devices |
| `active` | `boolean` | No | Visual state indicating if this card is currently selected/active (defaults to `false`) |

## Usage Example

```tsx
import { ArticleExplorerCard } from '@/components/story/article-explorer/article-explorer-card';

function ArticleList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const currentDate = new Date();

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    // Additional logic for displaying article details
  };

  return (
    <ul className="divide-y">
      {articles.map((article) => (
        <ArticleExplorerCard
          key={article.id}
          article={article}
          now={currentDate}
          onClick={handleArticleClick}
          active={selectedArticle?.id === article.id}
        />
      ))}
    </ul>
  );
}
```

## Functionality

### Core Features
- **Responsive Click Behavior**: Opens articles in new tabs on mobile, triggers callbacks on desktop
- **Visual State Management**: Displays active/inactive states with appropriate styling
- **Article Thumbnail**: Shows article image with fallback handling
- **Source Information**: Displays media source with domain and paywall indicators
- **Relative Timestamps**: Shows publication time in human-readable format
- **Label Display**: Shows up to one label with count indicator for additional labels
- **Hover Effects**: Provides visual feedback on interaction

### Responsive Behavior
- Uses `useBreakpoint('lg')` to detect desktop vs mobile viewports
- Adapts click behavior based on screen size for optimal user experience

## State Management

**Local State Only** - This component uses:
- `useCallback` for memoizing the click handler to prevent unnecessary re-renders
- No external state management (TanStack Query or Zustand)
- Receives all data through props, maintaining a stateless design pattern

## Side Effects

### External Interactions
- **Window Navigation**: Opens articles in new browser tabs on mobile devices using `window.open()`
- **Breakpoint Detection**: Monitors viewport size changes through the `useBreakpoint` hook
- **Event Propagation**: Handles click events and prevents unwanted bubbling

### Performance Optimizations
- Memoized click handler prevents unnecessary re-renders
- Optimized image loading with `sizes` attribute for responsive images

## Dependencies

### Internal Dependencies
- `useBreakpoint` - Custom hook for responsive breakpoint detection
- `MediaSourceReferenceBuilder` - UI component for source information display
- `SearchFilterTagBase` - UI component for label display
- `ArticleImageWithFallback` - UI component for article thumbnail with fallback
- `Typography` - UI component for consistent text styling

### External Dependencies
- `class-variance-authority` - For variant-based styling
- `Article` type from `@/lib/types`
- Utility functions for date formatting and CSS class merging

## Integration

### Application Architecture
- **Domain**: Part of the story/article-explorer feature domain
- **Composition**: Designed to be used within list containers (`<ul>` elements)
- **Data Flow**: Receives article data from parent components, likely fed by TanStack Query
- **Responsive Design**: Integrates with the application's breakpoint system

### Usage Patterns
- Typically rendered within article list components
- Often used with virtualization for large datasets
- Integrates with article detail views through click callbacks

## Best Practices

### Architecture Adherence
✅ **Flat Component Structure**: Single-level component without nested complexity  
✅ **Separation of Concerns**: UI presentation separated from business logic  
✅ **Reusable Design**: Generic enough for various article list contexts  
✅ **Responsive First**: Built with mobile and desktop considerations  

### Performance Considerations
✅ **Memoized Handlers**: Uses `useCallback` to prevent unnecessary re-renders  
✅ **Optimized Images**: Implements proper `sizes` for responsive image loading  
✅ **Conditional Rendering**: Efficiently handles optional content (labels)  

### Accessibility
✅ **Semantic HTML**: Uses proper `<li>` elements for list structure  
✅ **Interactive Elements**: Provides clear click targets and hover states  
✅ **External Links**: Proper `noopener noreferrer` for security  

### Code Quality
✅ **TypeScript**: Fully typed with proper interfaces  
✅ **Variant System**: Uses CVA for consistent styling patterns  
✅ **Error Handling**: Graceful fallbacks for missing data  