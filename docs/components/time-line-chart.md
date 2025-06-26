# TimeLineChart Component

## Purpose

The `TimeLineChart` component renders an animated area chart to visualize story velocity data over time. It displays writing activity patterns with a glowing animated effect, reference lines, and customizable dots to highlight data points. The component is specifically designed for story statistics dashboards and provides visual feedback about recent activity states.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useState` for animation control
- Handles interactive animations and DOM-based chart rendering
- Uses event handlers for animation lifecycle management
- Requires browser APIs for date calculations and visual effects

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for styling customization |
| `velocities` | `StoryVelocity[]` | Yes | - | Array of story velocity data points with date and count |
| `isActive` | `boolean` | No | `undefined` | Override for active state; falls back to automatic detection |
| `isStale` | `boolean` | No | `true` | Controls initial animation state and staleness indicator |
| `size` | `'sm' \| 'md'` | No | `'md'` | Chart size variant affecting dimensions |

## Usage Example

```tsx
import { TimeLineChart } from '@/components/story/stats/time-line-chart';
import { StoryVelocity } from '@/lib/types';

function StoryDashboard() {
  const velocityData: StoryVelocity[] = [
    { date: '2024-01-01T00:00:00Z', count: 150 },
    { date: '2024-01-02T00:00:00Z', count: 200 },
    { date: '2024-01-03T00:00:00Z', count: 175 },
    // ... more data points
  ];

  return (
    <div className="story-stats">
      <h3>Writing Velocity</h3>
      <TimeLineChart
        velocities={velocityData}
        size="md"
        className="mb-4"
      />
      
      {/* Compact version for sidebar */}
      <TimeLineChart
        velocities={velocityData}
        size="sm"
        isStale={false}
        className="compact-chart"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Animated Area Chart**: Smooth transitions and glow effects for visual appeal
- **Activity Detection**: Automatically determines if story is active based on recent data (within 3 days)
- **Data Padding**: Extends datasets shorter than `MIN_LEN` (13 points) for consistent visualization
- **Reference Line**: Shows baseline at y=0 with dashed styling
- **Active Indicators**: Highlights the most recent data point with custom dots
- **Responsive Design**: Adapts to container size while maintaining aspect ratio

### Visual Effects
- **Gradient Fill**: Blue-tinted gradient from solid to transparent
- **Glow Animation**: Pulsing glow effect with SVG filters
- **Dash Patterns**: Dashed reference lines and inactive area strokes
- **Size Variants**: Two predefined sizes (sm: 7.5rem, md: 9rem width)

## State Management

**Local State (useState)**:
- `isPlaying`: Tracks animation state to control concurrent animations
- Manages animation lifecycle through `onAnimationStart` and `onAnimationEnd` callbacks

**Computed State (useMemo)**:
- `velocitiesExtendedToMinLen`: Memoized data padding for consistent chart appearance
- `isActive`: Cached activity status based on most recent data point
- `Dot`: Memoized custom dot component to prevent unnecessary re-renders

## Side Effects

- **Animation Control**: Sets playing state during chart animations
- **Date Calculations**: Parses ISO dates and compares with current time for activity detection
- **DOM Rendering**: Creates SVG filters and gradients for visual effects

## Dependencies

### Internal Dependencies
- `@/lib/types` - `StoryVelocity` type definition
- `@/lib/utils/cn` - Class name utility for conditional styling
- `./constants` - `THREE_DAYS` constant for activity threshold
- `./customized-dot` - `CustomizedDot` component and props interface

### External Dependencies
- `react` - Core React functionality and hooks
- `date-fns/parseISO` - Date parsing for activity calculations
- `recharts` - Chart components (`Area`, `AreaChart`, `ReferenceLine`, `ResponsiveContainer`)

## Integration

### Application Architecture Role
- **Story Statistics Layer**: Part of the story analytics and metrics system
- **Dashboard Component**: Integrates into story management dashboards
- **Visualization Module**: Provides data visualization capabilities for writing metrics

### Usage Context
- Story progress tracking interfaces
- Writer productivity dashboards
- Analytics and reporting sections
- Real-time activity monitoring displays

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Uses client-side features only when necessary for animations and interactivity

✅ **Component Decomposition**: Delegates dot rendering to separate `CustomizedDot` component

✅ **Performance Optimization**: Leverages `useMemo` for expensive calculations and component memoization

✅ **Type Safety**: Uses TypeScript interfaces and proper type definitions

✅ **Styling Strategy**: Combines utility classes with CSS custom properties for theme integration

### Recommendations
- Always provide velocity data with at least 2 points for meaningful visualization
- Use the `isActive` prop override sparingly; let automatic detection handle most cases
- Consider data loading states when integrating with async data sources
- Test animation performance with large datasets before production deployment