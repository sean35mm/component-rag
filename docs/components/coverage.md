# Coverage Component

## Purpose

The Coverage component displays animated geographic coverage statistics for news stories, showing the distribution of media attention across different countries. It presents country flags with percentage breakdowns, cycling through countries automatically to provide an engaging visual representation of global story coverage.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by useState and useEffect usage) because it:
- Manages local animation state with `useState`
- Uses `useEffect` for interval-based animations
- Handles user interactions (hover for tooltip)
- Integrates with Framer Motion for animations

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `countries` | `RecordStatHolder[]` | Yes | - | Array of country statistics with name and count properties |
| `size` | `'sm' \| 'md'` | No | `'md'` | Visual size variant for the component |

### RecordStatHolder Interface
```tsx
interface RecordStatHolder {
  name: string;  // Country code (e.g., 'us', 'uk')
  count: number; // Number of publications/mentions
}
```

## Usage Example

```tsx
import { Coverage } from '@/components/story/stats/coverage';

// Basic usage
function StoryStats() {
  const coverageData = [
    { name: 'us', count: 45 },
    { name: 'uk', count: 23 },
    { name: 'ca', count: 12 },
    { name: 'au', count: 8 }
  ];

  return (
    <div className="story-stats">
      <Coverage countries={coverageData} />
    </div>
  );
}

// Small size variant
function CompactStats() {
  return (
    <Coverage 
      countries={coverageData} 
      size="sm"
    />
  );
}

// Integration with server data
function StoryAnalytics({ storyId }: { storyId: string }) {
  const { data: stats } = useQuery({
    queryKey: ['story-stats', storyId],
    queryFn: () => getStoryStats(storyId)
  });

  if (!stats?.coverage) return null;

  return (
    <Coverage countries={stats.coverage} />
  );
}
```

## Functionality

### Core Features
- **Animated Country Display**: Cycles through countries every 4 seconds using Framer Motion
- **Percentage Calculation**: Automatically calculates and displays percentage distribution
- **Smart Filtering**: Only shows countries with ≥2% coverage to avoid visual clutter
- **Interactive Tooltip**: Provides contextual information about coverage metrics
- **Responsive Sizing**: Supports multiple size variants with consistent styling

### Visual Elements
- Country flags using `react-circle-flags`
- Percentage and country code labels
- Dashed border styling for professional appearance
- Smooth opacity transitions between countries

### Animation System
- Uses Framer Motion variants for smooth transitions
- Pre-calculates animation variants for each country position
- Implements absolute positioning for seamless overlays

## State Management

**Local State Only**:
- `current`: Tracks the currently displayed country index for animation cycling
- Uses `useState` for simple counter state
- No external state management needed as this is a pure presentation component

## Side Effects

### Interval Management
```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((current) => current + 1);
  }, 4000);
  return () => {
    clearInterval(interval);
  };
}, [setCurrent]);
```

- Sets up automatic country cycling every 4 seconds
- Properly cleans up interval on component unmount
- Uses functional state updates to avoid stale closures

## Dependencies

### UI Components
- `@/components/ui/tooltip` - Interactive help text
- `@/components/ui/typography` - Consistent text styling

### External Libraries
- `framer-motion` - Animation system
- `react-circle-flags` - Country flag display

### Utilities
- `@/lib/utils/cn` - Conditional class name handling
- `@/lib/types` - TypeScript interfaces

## Integration

### Story Analytics Architecture
```
Story Dashboard
├── StoryStats (parent)
│   ├── Coverage (this component)
│   ├── Engagement metrics
│   └── Timeline data
└── StoryDetails
```

### Data Flow
1. Parent components fetch story statistics via TanStack Query
2. Coverage component receives processed country data
3. Component handles all presentation logic internally
4. No data mutations or external state updates

### Usage Patterns
- **Story Statistics**: Primary use in story analytics dashboards
- **Report Summaries**: Compact coverage overviews
- **Real-time Updates**: Can be refreshed via parent query invalidation

## Best Practices

### Architecture Adherence
✅ **Proper Component Type**: Correctly uses Client Component for interactive features  
✅ **Single Responsibility**: Focused solely on coverage visualization  
✅ **Reusable Design**: Size variants and flexible data input  
✅ **Performance Optimized**: `useMemo` for expensive calculations  

### Implementation Excellence
- **Accessibility**: Tooltip provides context for screen readers
- **Performance**: Filters data early to reduce rendering overhead
- **Memory Management**: Proper cleanup of intervals
- **Type Safety**: Full TypeScript integration with proper interfaces

### Recommended Usage
```tsx
// ✅ Good: Let parent handle data fetching
const { data } = useQuery(['coverage', storyId], fetchCoverage);
return <Coverage countries={data?.countries || []} />;

// ❌ Avoid: Don't fetch data inside this component
// This component should remain a pure presentation layer
```

The Coverage component exemplifies our architectural principles by maintaining clear separation of concerns, providing excellent reusability, and handling client-side interactivity appropriately.