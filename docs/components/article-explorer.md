# ArticleExplorer Component

## Purpose

The `ArticleExplorer` component provides a comprehensive interface for browsing, filtering, and exploring articles with real-time search, advanced filtering options, and responsive layout. It features a dual-pane layout with article list on the left and preview on the right (desktop), with infinite scrolling and multiple filter capabilities including media bias filtering, content type tags, and sorting options.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes for styling customization |
| `isLoading` | `boolean` | No | `false` | Shows loading state with skeleton placeholders |
| `onClickViewAll` | `() => void` | No | - | Callback function when "View all" button is clicked |
| `showFilters` | `boolean` | No | `true` | Controls visibility of filter controls and search functionality |
| `uniqueSources` | `string[]` | No | - | Array of unique source domains for source filtering |
| `initialParams` | `AllEndpointParams` | No | - | Initial parameters for article queries |
| `articlesCount` | `number` | No | - | Total count of articles for display in results counter |
| `showViewAllButton` | `boolean` | No | `true` | Controls visibility of "View all results" button |

## Usage Example

```tsx
import { ArticleExplorer } from '@/components/ui/article-explorer';

function NewsPage() {
  const handleViewAll = () => {
    // Navigate to full results page
    router.push('/articles');
  };

  return (
    <div className="bg-pgBackground-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="typography-titleH2 text-pgText-950 mb-6">
          Latest News Articles
        </h1>
        
        <ArticleExplorer
          className="max-w-7xl mx-auto"
          showFilters={true}
          showViewAllButton={true}
          onClickViewAll={handleViewAll}
          uniqueSources={['cnn.com', 'bbc.com', 'reuters.com']}
          initialParams={{ 
            category: 'politics',
            timeframe: '24h' 
          }}
          articlesCount={1250}
        />
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Headers**: `.typography-labelLarge` for section titles
- **Body Text**: `.typography-paragraphSmall` for metadata and counters
- **Labels**: `.typography-labelSmall` for dropdown buttons
- **Subheadings**: `.typography-subheadingSmall` for result counts

### Color Tokens
- **Backgrounds**: `bg-alphaNeutral/6` for header sections
- **Borders**: `border-pgStroke-250` for component borders
- **Text Colors**: 
  - `text-pgText-950` for primary text
  - `text-pgText-700` for secondary text
  - `text-pgText-600` for loading states
- **Interactive States**: `text-pgText-950/80` with hover transitions

### Layout & Spacing
- **Container**: `px-4 py-3 lg:px-5` for consistent padding
- **Gaps**: `gap-1`, `gap-2`, `gap-3`, `gap-4` for element spacing
- **Margins**: `mt-2`, `mt-3`, `mb-4` following 4px base unit

## Variants

The component doesn't use CVA variants but has several configuration modes:

### Filter Visibility
```tsx
// Full feature mode with all filters
<ArticleExplorer showFilters={true} />

// Simplified mode without filters
<ArticleExplorer showFilters={false} />
```

### Loading States
```tsx
// Show loading skeletons
<ArticleExplorer isLoading={true} />

// Normal interactive state
<ArticleExplorer isLoading={false} />
```

## Styling

### Available States
- **Loading**: Skeleton placeholders throughout the interface
- **Interactive**: Full filtering and selection capabilities
- **Mobile**: Drawer-based article preview
- **Desktop**: Side-by-side layout with inline preview

### Responsive Layout
```css
/* Mobile: Stacked layout */
.block items-stretch lg:flex

/* Desktop: Split pane layout */
lg:w-1/2 lg:rounded-l-2xl
```

### Custom Scrollbars
- **Article List**: `max-h-[640px] overflow-y-auto lg:max-h-[768px]`
- **Filter Tags**: `overflow-y-auto py-[.1875rem]`

## Responsive Design

### Breakpoint Adaptations

#### Mobile (< 1024px)
- Stacked vertical layout
- Article preview opens in drawer
- Simplified "View all" button text
- Touch-optimized interactions

#### Desktop (≥ 1024px)
- Side-by-side dual-pane layout
- Inline article preview
- Hover states for interactions
- Full filter visibility

### Layout Structure
```tsx
// Mobile: Full width blocks
<div className="mb-4 flex flex-col">

// Desktop: Split layout
<div className="mb-4 block items-stretch lg:flex">
  <div className="lg:w-1/2 lg:rounded-l-2xl"> {/* Article list */}
  <div className="lg:w-1/2"> {/* Preview pane */}
```

## Accessibility

### ARIA Support
- **Loading States**: `<span className="sr-only">Loading Next Page...</span>`
- **Interactive Elements**: Proper button and dropdown semantics
- **Keyboard Navigation**: Full keyboard support for all interactive elements

### Focus Management
- Dropdown menus with proper focus handling
- Article selection with keyboard navigation
- Screen reader friendly loading indicators

### Semantic Structure
- Proper heading hierarchy
- Meaningful button labels
- Accessible form controls

## Dependencies

### Internal Components
- `ArticleDrawer` - Mobile article preview drawer
- `ArticlePreviewCardTiny` - Individual article cards
- `PreviewBlockArticles` - Desktop article preview
- `MenuSearchInput` - Search input component
- `SearchFilterTag` - Filter tag components
- `LinkButton` - Interactive button component
- `LinkButtonWithCheckbox` - Filter checkbox buttons
- `Typography` - Text rendering component
- `Skeleton` - Loading placeholder component

### External Libraries
- `@tanstack/react-query` - Data fetching and caching
- `framer-motion` - Animation library
- `@react-hook/intersection-observer` - Infinite scroll detection

### Hooks & Utilities
- `useBreakpoint` - Responsive design hook
- `useIntersectionObserver` - Scroll detection
- `useArticles`, `useArticlesInfinite` - Data fetching hooks

## Customization

### Styling Customization
```tsx
// Custom container styling
<ArticleExplorer 
  className="bg-pgBackground-100 rounded-3xl shadow-lg border-2 border-pgStroke-200"
/>

// Custom spacing and layout
<ArticleExplorer 
  className="max-w-6xl mx-auto my-8 px-6"
/>
```

### Behavioral Customization
```tsx
// Custom initial state
<ArticleExplorer
  initialParams={{
    category: 'technology',
    timeframe: '7d',
    source: 'techcrunch.com'
  }}
  uniqueSources={customSourceList}
  onClickViewAll={handleCustomNavigation}
/>
```

### Filter Customization
The component includes several built-in filters:
- **Content Type Tags**: Opinion, Press Release, Roundup, Fact Check
- **Media Bias Filter**: Left, Center, Right political bias filtering
- **Reprint Filtering**: Hide/show duplicate content
- **Sorting Options**: Newest, First Published

### Advanced Configuration
```tsx
// Production example with all options
<ArticleExplorer
  className="border border-pgStroke-200 rounded-2xl bg-pgBackground-0"
  showFilters={true}
  showViewAllButton={true}
  initialParams={{
    category: 'business',
    timeframe: '24h',
    showNumResults: true
  }}
  uniqueSources={verifiedSources}
  articlesCount={totalArticleCount}
  onClickViewAll={() => router.push('/articles/all')}
/>
```