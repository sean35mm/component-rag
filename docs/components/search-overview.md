# SearchOverview Component

## Purpose

The `SearchOverview` component provides a comprehensive search dashboard that displays search results through multiple visualizations including charts, statistics, stories carousel, and article explorer. It serves as the main interface for users to analyze and explore search data with temporal filtering capabilities.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive state management with multiple useState hooks
- Browser-specific APIs (window, URL manipulation)
- Event handlers for user interactions
- Real-time data visualization updates

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the root element |

## Usage Example

```tsx
import { SearchOverview } from '@/components/search/search-overview';

// Basic usage in a search results page
export default function SearchResultsPage() {
  return (
    <div className="container mx-auto">
      <SearchOverview />
    </div>
  );
}

// With custom styling
export default function CustomSearchPage() {
  return (
    <SearchOverview className="bg-gray-50 p-6 rounded-lg" />
  );
}
```

## Functionality

### Core Features
- **Data Visualization**: Interactive charts showing search results over time
- **Story Management**: Carousel display of related stories with active story selection
- **Article Exploration**: Comprehensive article browser with pagination
- **Statistics Display**: Responsive stats showing counts and metrics
- **Date Range Filtering**: Interactive date picker for temporal analysis
- **Mobile Responsiveness**: Adaptive layout for different screen sizes

### Interactive Behaviors
- **Click Outside Detection**: Automatically deselects active story when clicking outside chart area
- **Smooth Navigation**: Animated scrolling when switching to "All Results" tab
- **Error Handling**: Toast notifications with retry functionality for failed requests
- **Real-time Updates**: Automatic data refetching based on filter changes

## State Management

### Local State (useState)
- `activeStory`: Currently selected story for highlighting in visualizations

### Zustand Stores
- **useExploreStore**: Date range filters, tab management, refetch triggers
- **useFiltersDrawerStore**: Loading states for filter operations

### TanStack Query (via useAdvancedSearch)
- Server state for articles, stories, and analytics data
- Automatic caching and background updates
- Error state management with retry capabilities

## Side Effects

### Navigation Effects
- URL parameter manipulation for tab switching
- Smooth scrolling to container top on navigation
- Search params preservation across route changes

### Data Fetching
- Automatic refetching when filters change
- Background data updates for real-time analytics
- Error recovery with user-initiated retry

### Toast Notifications
- Error handling with actionable retry buttons
- Non-blocking user feedback for data loading issues

## Dependencies

### Custom Hooks
- `useAdvancedSearch`: Primary data fetching and search logic
- `useBreakpoint`: Responsive design utilities
- `useAccessToken`: Authentication state management
- `useTabContainer`: Container reference management

### UI Components
- `ArticleExplorer`: Article browsing interface
- `DatePickerWithRange`: Date range selection
- `ResultsOverTime`: Temporal data visualization
- `SearchStats`/`SearchStatsTiny`: Statistics display components
- `SearchStoriesCarousel`: Story navigation interface
- `Summarize`: Content summarization display

### External Libraries
- `date-fns`: Date manipulation and comparison
- `next/navigation`: Router and URL management
- `react-day-picker`: Date range selection
- `usehooks-ts`: Click outside detection

## Integration

### Application Architecture
- **Search Domain**: Central component in the search feature module
- **Tab System**: Integrates with tab-based navigation for different result views
- **Filter System**: Works with global filter state for cross-component coordination
- **Authentication**: Respects user access levels for feature availability

### Data Flow
```
URL Params → Zustand Stores → useAdvancedSearch → TanStack Query → API
                ↓
Component State → UI Updates → User Interactions → State Updates
```

### Responsive Strategy
- Desktop: Full layout with sidebar statistics and expanded controls
- Mobile: Stacked layout with condensed statistics and simplified controls

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses 'use client' only for necessary interactivity
- ✅ **Component Decomposition**: Delegates specialized functionality to focused sub-components
- ✅ **State Management Separation**: Clear distinction between server state (TanStack Query) and client state (Zustand)
- ✅ **Error Handling**: Comprehensive error states with user recovery options

### Performance Optimizations
- `useMemo` for expensive computations (date range, loading states)
- `useCallback` for stable function references
- Conditional rendering to avoid unnecessary DOM updates
- Efficient data sorting with proper dependency arrays

### User Experience
- Progressive loading states for different data types
- Graceful error handling with actionable feedback
- Responsive design with appropriate mobile adaptations
- Accessible navigation patterns with smooth transitions

### Code Organization
- Clear separation of concerns between data fetching and presentation
- Consistent naming patterns for state and handlers
- Proper TypeScript integration with comprehensive type safety
- Modular import structure following domain boundaries