# SearchDrawerArticles Component

## Purpose

The `SearchDrawerArticles` component displays a searchable list of articles within a mobile drawer interface. It fetches articles based on search parameters, handles loading states, and provides a user-friendly way to browse and navigate to relevant articles with external link functionality.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through the `useArticles` hook
- Handles loading states and conditional rendering
- Provides click navigation functionality for article links

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `searchQuery` | `AllEndpointParams` | ✅ | Search parameters used to fetch relevant articles |
| `title` | `string` | ✅ | Header title displayed in the drawer |
| `className` | `string` | ❌ | Additional CSS classes for styling customization |
| `footer` | `ReactNode` | ❌ | Optional footer content displayed below articles |
| `label` | `string` | ❌ | Descriptive label used in the results summary text |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | Standard HTML div attributes |

## Usage Example

```tsx
import { SearchDrawerArticles } from '@/components/search/search-drawer-articles';

function SearchInterface() {
  const searchParams = {
    query: 'renewable energy',
    category: 'technology',
    limit: 10
  };

  return (
    <SearchDrawerArticles
      searchQuery={searchParams}
      title="Related Articles"
      label="renewable energy"
      className="custom-spacing"
      footer={
        <button className="text-blue-600">
          View All Articles
        </button>
      }
    />
  );
}
```

## Functionality

- **Dynamic Article Fetching**: Retrieves articles based on provided search parameters
- **Loading State Management**: Displays skeleton loaders during data fetching
- **Conditional Rendering**: Shows content only when articles are available
- **External Navigation**: Opens articles in new tabs for seamless user experience
- **Responsive Design**: Optimized for mobile drawer interfaces
- **Results Summary**: Provides context about the number and relevance of displayed articles

## State Management

- **TanStack Query**: Uses the `useArticles` hook for server state management
  - Handles API calls for article data
  - Manages loading states (`isLoadingArticles`)
  - Provides automatic caching and refetching capabilities
- **No Local State**: Component is primarily stateless, relying on props and server state

## Side Effects

- **API Calls**: Fetches article data through the `useArticles` hook
- **External Navigation**: Opens article URLs in new browser tabs
- **Loading Indicators**: Renders skeleton components during data fetching

## Dependencies

### Components
- `ArticlePreviewCardSmall` - Displays individual article previews
- `PropertyBlockMobileDrawer` - Provides the mobile drawer container
- `Skeleton` - Loading state placeholder components
- `Typography` - Text styling and formatting

### Hooks & Utilities
- `useArticles` - TanStack Query hook for article data fetching
- `cn` - Utility for conditional CSS class composition
- `NextLink` - Next.js optimized link component

### Types
- `AllEndpointParams` - Type definition for search parameters

## Integration

The component integrates into the search functionality of the application by:

- **Search Interface**: Works as part of a larger search drawer or modal system
- **Mobile Experience**: Specifically designed for mobile user interfaces
- **Content Discovery**: Helps users find relevant articles based on their search criteria
- **External Content**: Facilitates navigation to external article sources

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses client component appropriately for interactive functionality
- Implements TanStack Query for server state management
- Maintains flat component composition with clear dependencies

✅ **Performance Optimizations**:
- Conditional rendering prevents unnecessary DOM operations
- Skeleton loading improves perceived performance
- External links open in new tabs to maintain session context

✅ **User Experience**:
- Clear loading states with skeleton components
- Informative results summary with context
- Accessible navigation with proper link handling

✅ **Code Quality**:
- TypeScript interfaces for type safety
- Proper prop spreading and HTML attribute support
- Clean separation of concerns between data fetching and presentation