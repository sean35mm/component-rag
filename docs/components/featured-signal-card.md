# FeaturedSignalCard

## Purpose

The `FeaturedSignalCard` component displays a recommendation card for creating a new signal based on suggested search queries. It provides a visual preview of potential signal activity through charts and statistics, allowing users to quickly assess and create signals from recommended queries. This component serves as an actionable next step in the user journey from consuming content to creating monitoring workflows.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state with click handlers and navigation
- Uses client-side hooks like `useCallback`, `useMemo`, and custom hooks
- Performs dynamic data fetching based on user interactions
- Requires browser APIs for navigation and state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `SignalNextStepRecommendation` | Yes | The recommendation object containing title and articlesQuery for the suggested signal |

### SignalNextStepRecommendation Interface
```typescript
interface SignalNextStepRecommendation {
  title: string;           // Display title for the recommended signal
  articlesQuery: {         // Query configuration for the signal
    query: {
      q?: string;          // Search query string
      // Additional query parameters
    };
  };
}
```

## Usage Example

```tsx
import { FeaturedSignalCard } from '@/components/answers/next-steps/featured-signal-card';

// Basic usage in a recommendations list
function NextStepsSection() {
  const recommendations = [
    {
      title: "AI Technology Developments",
      articlesQuery: {
        query: {
          q: "artificial intelligence AND technology AND development",
          sources: ["techcrunch", "wired"]
        }
      }
    }
  ];

  return (
    <div className="grid gap-4">
      {recommendations.map((item, index) => (
        <FeaturedSignalCard key={index} item={item} />
      ))}
    </div>
  );
}

// Usage with dynamic recommendations
function PersonalizedRecommendations({ userId }: { userId: string }) {
  const { data: recommendations } = useUserRecommendations(userId);
  
  return (
    <section className="space-y-4">
      <h2>Recommended Signals</h2>
      {recommendations?.map((recommendation) => (
        <FeaturedSignalCard 
          key={recommendation.id} 
          item={recommendation} 
        />
      ))}
    </section>
  );
}
```

## Functionality

### Core Features
- **Signal Preview**: Displays a 30-day chart preview of article counts and source statistics
- **Usage Limit Checking**: Validates user's remaining signal quota before allowing creation
- **Navigation Integration**: Routes to signal creation page with pre-populated query
- **Visual Feedback**: Shows loading skeleton during data fetching
- **Feature Badging**: Displays signal-specific badge for clear categorization

### Interactive Behaviors
- **Click-to-Create**: Single click initiates signal creation workflow
- **Limit Enforcement**: Shows appropriate messaging when usage limits are reached
- **State Preservation**: Maintains query context during navigation

### Visual Components
- Chart visualization with 30-day article count trends
- Source count statistics
- Scheduled notification indicator
- Responsive layout with proper content hierarchy

## State Management

### TanStack Query
- **Article Interval Counts**: `useIntervalArticleCounts` - Fetches 30-day article statistics
- **Source Counts**: `useTopEntitiesCounts` - Retrieves unique source counts for the query
- **Optimistic Loading**: Shows skeleton while data loads

### Context Usage
- **Usage Context**: `useUsageContext` - Tracks remaining signal creation quota
- **Route State**: `useRouteState` - Manages navigation with state preservation

### Local State
- **Memoized Parameters**: Search parameters optimized with `useMemo`
- **Callback Optimization**: Click handler optimized with `useCallback`

## Side Effects

### API Calls
- Fetches article count trends over 30-day period
- Retrieves source diversity statistics
- Query parameters dynamically generated with date ranges

### Navigation Effects
- Routes to `/signals/new` with pre-populated query
- Preserves signal creation state across navigation
- Triggers usage limit validation

### User Feedback
- Shows toast notifications for usage limit violations
- Displays loading states during data fetching

## Dependencies

### Core Components
- `BaseFeaturedCard` - Base layout and styling foundation
- `FeaturedSkeleton` - Loading state placeholder
- `DetailsChart` - Signal activity visualization
- `FeatureBadge` - Signal type indicator

### UI Components
- `Button`, `Typography` - Basic UI building blocks
- Icon components for visual enhancement

### Hooks & Services
- `useSignalCreation` - Signal creation workflow management
- `useRouteState` - Navigation state management
- Query hooks for data fetching
- Usage context for quota tracking

### Utilities
- `date-fns` for date manipulation and formatting
- `removeNullish` for query parameter cleaning

## Integration

### Application Flow
1. **Discovery**: User browses content and receives recommendations
2. **Preview**: FeaturedSignalCard shows potential signal value
3. **Validation**: System checks usage limits and permissions
4. **Creation**: User navigates to signal creation with context preserved

### Data Pipeline
- Recommendations → Preview Data → User Action → Signal Creation
- Query transformation from recommendation format to API parameters
- State preservation across navigation boundaries

### Feature Ecosystem
- Integrates with answer/recommendation system
- Connects to signal management workflow
- Participates in usage tracking and limits

## Best Practices

### Architecture Adherence
- ✅ **Lego Block Design**: Composes smaller UI components effectively
- ✅ **Separation of Concerns**: Data fetching, UI rendering, and business logic separated
- ✅ **Hook Composition**: Uses multiple focused hooks rather than monolithic state

### Performance Optimization
- ✅ **Memoization**: Query parameters and callbacks properly memoized
- ✅ **Conditional Rendering**: Shows skeleton during loading states
- ✅ **Efficient Queries**: Focused data selection with transform functions

### User Experience
- ✅ **Progressive Enhancement**: Graceful loading and error states
- ✅ **Clear Intent**: Visual hierarchy guides user toward action
- ✅ **Responsive Design**: Adapts to different screen sizes

### Code Quality
- ✅ **Type Safety**: Comprehensive TypeScript interfaces
- ✅ **Readable Logic**: Clear separation of data preparation and rendering
- ✅ **Consistent Patterns**: Follows established component architecture

## Exports

```typescript
export const DAY_RANGE = 30;           // Constant for chart date range
export { FeaturedSignalCard };         // Main component
```

The `DAY_RANGE` constant is exported to maintain consistency across related components that might need the same time window for signal analysis.