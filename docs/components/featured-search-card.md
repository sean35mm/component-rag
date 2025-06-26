# FeaturedSearchCard Component Documentation

## Purpose

The `FeaturedSearchCard` component renders an interactive search recommendation card that displays search analytics data with a chart visualization. It provides users with suggested search topics based on their access level (private authenticated or public) and includes a 90-day trend chart showing article counts over time. Users can click to perform an in-depth search on the recommended topic.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive event handlers (`onClick`, `useCallback`)
- Browser-specific hooks (`useRouter` from Next.js)
- State management with TanStack Query
- Chart rendering with Recharts library

## Props Interface

### FeaturedSearchCard

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `SearchNextStepRecommendation` | Yes | Search recommendation data containing title and query parameters |
| `onClick` | `(item: SearchNextStepRecommendation) => Promise<void>` | No | Optional callback executed when user clicks the search action |

### FeaturedSearchCardContent

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `SearchNextStepRecommendation` | Yes | Search recommendation data |
| `onClick` | `() => void` | Yes | Click handler for the search action |

### SearchChart

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `IntervalArticleCounts[]` | Yes | Array of article count data points over time |
| `from` | `string` | Yes | Start date in 'yyyy-MM-dd' format |
| `to` | `string` | Yes | End date in 'yyyy-MM-dd' format |

## Usage Example

```tsx
import { FeaturedSearchCard } from '@/components/answers/next-steps/featured-search-card';

// In a recommendations list
function NextStepsSection({ recommendations }) {
  const handleSearchClick = async (item) => {
    // Track analytics
    await trackSearchRecommendationClick(item.title);
  };

  return (
    <div className="grid gap-4">
      {recommendations.map((item) => (
        <FeaturedSearchCard
          key={item.title}
          item={item}
          onClick={handleSearchClick}
        />
      ))}
    </div>
  );
}

// Example recommendation data structure
const sampleRecommendation = {
  title: "Climate Change Impact on Agriculture",
  articlesQuery: {
    query: {
      q: "climate change agriculture impact",
      sources: ["nature", "science"],
      dateRange: "2024"
    }
  }
};
```

## Functionality

### Core Features
- **Access-based Rendering**: Automatically determines user access level and renders appropriate card variant
- **Interactive Search Analytics**: Displays 90-day trend chart of article counts for the recommended search
- **Deep Search Integration**: Initiates deep search queries through appropriate handlers
- **URL Navigation**: Preserves URL parameters when navigating to search results
- **Loading States**: Shows skeleton loader during data fetching

### Chart Visualization
- **Time Series Data**: Line chart showing article counts over 90-day period
- **Smart Tick Labels**: Shows only start, middle, and end date labels to avoid crowding
- **Custom Tooltips**: Displays detailed information on hover
- **Responsive Design**: Adapts to container width with proper margins

### User Interaction Flow
1. Component determines user access level (private/public/unauthorized)
2. Fetches article count data for the recommendation
3. Renders chart with trend visualization
4. On click, initiates appropriate search flow based on user type
5. Executes optional callback and navigates to results

## State Management

### TanStack Query
- **Data Fetching**: Uses `useIntervalArticleCounts` hook for article statistics
- **Caching**: Automatically caches chart data with query key based on search parameters
- **Loading States**: Provides `isFetching` state for skeleton rendering
- **Data Transformation**: Applies `select` function to extract results from API response

### Local State
- **Memoized Computations**: Uses `useMemo` for expensive chart data transformations
- **Callback Optimization**: Uses `useCallback` for event handlers to prevent unnecessary re-renders

## Side Effects

### API Calls
- **Article Count Queries**: Fetches interval-based article counts for trend visualization
- **Search Initialization**: Triggers deep search or public search depending on user access

### Navigation
- **Route Changes**: Programmatically navigates to search results using Next.js router
- **URL Parameter Preservation**: Maintains existing URL parameters when navigating

### External Services
- **Analytics Tracking**: Executes optional analytics callbacks on user interactions

## Dependencies

### Hooks
- `useDeepSearch` - Private user search functionality
- `usePublicExplorePage` - Public user search functionality
- `useAccessToken` - User authentication and access level
- `useIntervalArticleCounts` - Article statistics data fetching

### UI Components
- `BaseFeaturedCard` - Base card layout and styling
- `FeatureBadge` - Search type indicator badge
- `Typography` - Consistent text styling
- `ChartContainer` - Chart wrapper with theming
- `FeaturedSkeleton` - Loading state placeholder

### External Libraries
- **date-fns**: Date manipulation and formatting
- **Recharts**: Chart rendering and visualization
- **Next.js Router**: Client-side navigation

## Integration

### Application Architecture
- **Next Steps System**: Part of the answer recommendations workflow
- **Search Ecosystem**: Integrates with both private and public search systems
- **Authentication Flow**: Respects user access levels and authentication state

### Data Flow
1. Receives search recommendations from parent components
2. Fetches supporting analytics data via TanStack Query
3. Transforms data for chart visualization
4. Handles user interactions through appropriate search systems
5. Reports interactions back to analytics systems

### Responsive Design
- **Mobile-First**: Chart adapts to smaller screens
- **Container Queries**: Adjusts layout based on available space
- **Touch Interactions**: Optimized for mobile touch events

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses client-side rendering for interactivity
- ✅ **Component Decomposition**: Flat structure with clear separation of concerns
- ✅ **TanStack Query**: Proper server state management for API data
- ✅ **Reusable UI**: Leverages shared UI components from `/ui/` directory

### Performance Optimizations
- **Memoization**: Chart data and callbacks are memoized to prevent unnecessary recalculations
- **Lazy Loading**: Data fetching only occurs when component mounts
- **Efficient Re-renders**: Optimized dependency arrays and callback patterns

### Error Handling
- **Graceful Degradation**: Shows skeleton on loading or error states
- **Null Safety**: Handles missing or incomplete data gracefully
- **Access Control**: Appropriate fallbacks for unauthorized users

### Accessibility
- **Semantic HTML**: Proper button and interactive element structure
- **Keyboard Navigation**: Clickable elements are keyboard accessible
- **Screen Readers**: Chart data is accessible through tooltip descriptions