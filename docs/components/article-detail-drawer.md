# ArticleDetailDrawer Component

## Purpose

The `ArticleDetailDrawer` component provides a mobile-optimized drawer interface for displaying detailed article information. It consists of two main exports: `ArticleDetail` for rendering article content and `ArticleDrawer` for managing the drawer presentation. This component serves as a responsive detail view that allows users to preview article information without navigating away from their current context.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicitly required) due to:
- Interactive drawer functionality with open/close state management
- Integration with Zustand store for state management
- Event handlers for user interactions
- Dynamic rendering based on store state

## Props Interface

### ArticleDetail Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `Article` | Yes | Complete article object containing all article information including title, content, metadata, and source details |

### ArticleDrawer Props

The `ArticleDrawer` component accepts no props - it manages its own state through the Zustand store.

## Usage Example

```tsx
import { ArticleDetail, ArticleDrawer } from '@/components/drawers/article-detail-drawer';
import { useEntityDetailDrawerStore } from '@/lib/contexts';

// Using ArticleDetail directly
function ArticlePreview() {
  const article = {
    articleId: 'article-123',
    title: 'Breaking: New Technology Breakthrough',
    summary: 'Scientists discover revolutionary approach...',
    imageUrl: 'https://example.com/image.jpg',
    source: { domain: 'techcrunch.com' },
    pubDate: new Date('2024-01-15'),
    url: 'https://techcrunch.com/article',
    labels: [
      { name: 'Technology' },
      { name: 'Science' }
    ]
  };

  return <ArticleDetail data={article} />;
}

// Using ArticleDrawer with store integration
function ArticleList() {
  const setArticle = useEntityDetailDrawerStore((state) => state.setArticle);
  const setIsOpen = useEntityDetailDrawerStore((state) => state.setIsOpen);

  const handleArticleClick = (article: Article) => {
    setArticle(article);
    setIsOpen(true);
  };

  return (
    <div>
      {/* Article list items */}
      <ArticleDrawer />
    </div>
  );
}
```

## Functionality

### Core Features

- **Responsive Image Display**: Shows article image with fallback placeholder generation
- **Structured Content Layout**: Organized presentation of article metadata and content
- **AI-Generated Summary**: Displays AI-generated summaries with clear labeling and copy functionality
- **Source Attribution**: Clear source domain display with dedicated styling
- **Publication Date**: Formatted date display using consistent date formatting
- **Label System**: Tag-based categorization display
- **External Link Access**: Direct navigation to full article with visual indicators
- **Mobile-Optimized Design**: Specifically designed for mobile drawer interaction patterns

### Interactive Elements

- Copy functionality for AI-generated summaries
- External link button for viewing full articles
- Drawer open/close state management
- Touch-friendly mobile interface

## State Management

**Zustand Store Integration**:
- Uses `useEntityDetailDrawerStore` for centralized drawer state management
- Manages three key state properties:
  - `isOpen`: Controls drawer visibility
  - `article`: Stores current article data
  - `setIsOpen`: Action for toggling drawer state

**Local State**: Minimal local state usage, primarily relying on props and global store.

## Side Effects

- **Image Loading**: Handles image loading with fallback generation
- **External Navigation**: Opens article links in new tabs/windows
- **Copy Operations**: Integrates with system clipboard for summary copying
- **Date Formatting**: Processes and formats publication dates for display

## Dependencies

### UI Components
- `EntityDrawerMobile` - Base drawer container
- `PropertyBlockMobileDrawer` - Structured property display
- `ImageWithFallback` - Robust image handling
- `Typography` - Consistent text styling
- `Button`, `Tag`, `AiTag` - Interactive and display elements
- `CopyButton` - Copy functionality
- `SourceEntitySimple` - Source attribution display

### Hooks & Utilities
- `useImagePlaceholder` - Placeholder image generation
- `useEntityDetailDrawerStore` - State management
- `formatDate` from date-fns - Date formatting

### External Libraries
- Next.js Link component for navigation
- React icons for visual elements

## Integration

### Application Architecture Role

- **Mobile-First Design**: Primary mobile interface for article detail viewing
- **Global State Integration**: Connects with application-wide drawer state management
- **Content Preview System**: Part of larger content discovery and preview workflow
- **Navigation Bridge**: Facilitates transition from preview to full article consumption

### Data Flow

1. Article data flows from parent components or global state
2. User interactions trigger store state updates
3. Drawer visibility controlled through centralized state
4. External navigation handled through Next.js routing

## Best Practices

### Architecture Adherence

- ✅ **Component Decomposition**: Clean separation between detail content (`ArticleDetail`) and drawer management (`ArticleDrawer`)
- ✅ **State Management**: Proper use of Zustand for client-side state management
- ✅ **Reusability**: `ArticleDetail` can be used independently of drawer context
- ✅ **UI Component Usage**: Leverages established UI components from `/ui/` directory
- ✅ **Flat Structure**: Avoids unnecessary nesting, promotes composition

### Implementation Patterns

- **Conditional Rendering**: Proper null checks prevent unnecessary renders
- **TypeScript Integration**: Full type safety with `Article` interface
- **Performance Optimization**: Efficient re-renders through proper state management
- **Accessibility**: Semantic HTML structure and proper ARIA handling through base components
- **Mobile UX**: Touch-friendly interactions and appropriate sizing for mobile devices

### Code Organization

- Clear export separation for different use cases
- Consistent prop destructuring and variable naming
- Logical component structure with clear responsibility boundaries
- Proper integration with established design system patterns