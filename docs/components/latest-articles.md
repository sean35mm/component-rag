# LatestArticles Component

## Purpose

The `LatestArticles` component provides a comprehensive article exploration interface for search results. It displays a list of articles in a compact format alongside a detailed preview panel, allowing users to browse and preview articles efficiently. The component includes skeleton loading states and responsive design patterns for optimal user experience across devices.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for article selection
- Browser-specific APIs (`window`, `document.querySelector`)
- Next.js navigation hooks (`useRouter`, `useSearchParams`)
- Responsive breakpoint detection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the component |
| `data` | `ArticlesSearchResult<Article> \| undefined` | Yes | Search result data containing articles array |
| `isLoading` | `boolean` | No | Loading state indicator for skeleton display |

## Usage Example

```tsx
import { LatestArticles } from '@/components/search/latest-articles';
import { useArticleSearch } from '@/hooks/use-article-search';

export default function SearchResults() {
  const { data, isLoading } = useArticleSearch({
    query: 'latest articles',
    limit: 10
  });

  return (
    <div className="container mx-auto">
      <LatestArticles
        data={data}
        isLoading={isLoading}
        className="custom-articles-container"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Dual-Panel Layout**: Split view with article list and preview panel
- **Article Selection**: Click-to-select functionality for desktop preview
- **Responsive Design**: Mobile-first with desktop enhancements
- **Loading States**: Comprehensive skeleton loading for all UI elements
- **Navigation Integration**: "View all results" button with URL parameter management
- **Smooth Scrolling**: Workspace scroll behavior on navigation

### Interactive Behaviors
- **Desktop**: Hover and click selection updates preview panel
- **Mobile**: Simplified list view without preview panel
- **Keyboard Navigation**: Accessible interaction patterns
- **Scroll Management**: Auto-scroll to top on view all navigation

## State Management

### Local State (useState)
```tsx
const [selectedIndex, setSelectedIndex] = useState(0);
```
- Manages currently selected article index for preview panel

### Zustand Store Integration
```tsx
const onSetAllResultsTab = useExploreStore(state => state.onSetAllResultsTab);
```
- Connects to global explore store for tab management
- Updates tab state when navigating to all results

### Navigation State
- Uses Next.js navigation hooks for URL parameter management
- Maintains search state across route transitions

## Side Effects

### Navigation Side Effects
- **URL Parameter Updates**: Modifies search parameters when clicking "View all"
- **Route Navigation**: Programmatic navigation with preserved search state
- **DOM Manipulation**: Direct workspace element scrolling
- **Store Updates**: Updates global explore store tab state

### Browser Interactions
- **Window Detection**: Guards against SSR issues with `typeof window !== 'undefined'`
- **Element Querying**: Direct DOM access for scroll behavior
- **Responsive Breakpoints**: Real-time breakpoint detection

## Dependencies

### UI Components
- `ArticlePreviewCardTiny` - Compact article display cards
- `PreviewBlockArticles` - Detailed article preview panel
- `Skeleton` - Loading state placeholders
- `Typography` - Consistent text styling
- `AiTag` - AI-generated content indicator

### Hooks & Utilities
- `useBreakpoint` - Responsive design hook
- `useExploreStore` - Global state management
- `usePathname`, `useRouter`, `useSearchParams` - Next.js navigation
- `cn` - Conditional className utility

### Icons & Assets
- `IconArticles` - Article explorer icon
- `PiArrowRightSLine` - Navigation arrow icon

## Integration

### Search Architecture
- Integrates with search result pipeline
- Handles `ArticlesSearchResult<Article>` data structure
- Supports loading states from parent search components

### Navigation Flow
- Connects to main search/explore interface
- Manages tab state transitions
- Preserves search context across navigation

### Responsive Strategy
- Mobile-first approach with progressive enhancement
- Conditional rendering based on breakpoint detection
- Adaptive UI patterns for different screen sizes

## Best Practices

### ✅ Architectural Adherence
- **Client Component Usage**: Appropriate use of `'use client'` for interactive features
- **Component Decomposition**: Well-separated concerns with `PreviewBlockFallback`
- **State Management**: Proper combination of local state and Zustand store
- **Props Interface**: Clean, well-typed interface following TypeScript patterns

### ✅ Performance Patterns
- **Conditional Rendering**: Efficient mobile/desktop rendering
- **Skeleton Loading**: Comprehensive loading states prevent layout shift
- **Memoization Ready**: Component structure supports React.memo if needed

### ✅ User Experience
- **Responsive Design**: Adaptive interface across device types
- **Loading States**: Maintains UI structure during data fetching
- **Smooth Transitions**: Enhanced navigation with smooth scrolling
- **Accessibility**: Semantic HTML and keyboard navigation support

### 🔧 Integration Considerations
- Requires parent component to handle data fetching and loading states
- Depends on global store setup for explore functionality
- Needs proper TypeScript types for `Article` and `ArticlesSearchResult`
- Should be wrapped with error boundaries for robust error handling