# Reach Component

## Purpose
The `Reach` component visualizes the estimated magnitude of a story based on the number of unique publications covering it. It displays a flame-based indicator with 5 levels ranging from "Limited" to "Maximum" reach, providing users with an intuitive visual representation of story impact and coverage scope.

## Component Type
**Client Component** - Uses the `'use client'` directive (implied by `useMemo` hooks) because it requires client-side computation for reach calculations, dynamic styling based on percentage values, and interactive tooltip functionality.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for styling customization |
| `disableBorder` | `boolean` | No | `false` | When true, removes the dashed bottom border from the component |
| `size` | `'sm' \| 'md'` | No | `'md'` | Controls the component size - small or medium |
| `uniqueCount` | `number` | Yes | - | The number of unique publications covering the story, used to calculate reach |

## Usage Example

```tsx
import { Reach } from '@/components/story/stats/reach';

// Basic usage
function StoryCard({ story }) {
  return (
    <div className="story-stats">
      <Reach uniqueCount={story.uniquePublications} />
    </div>
  );
}

// Customized usage
function CompactStoryMetrics({ metrics }) {
  return (
    <div className="flex gap-4">
      <Reach
        uniqueCount={metrics.publicationCount}
        size="sm"
        disableBorder
        className="text-blue-600"
      />
    </div>
  );
}

// In a dashboard context
function StoryAnalytics({ stories }) {
  return (
    <div className="analytics-grid">
      {stories.map(story => (
        <div key={story.id} className="metric-card">
          <h3>{story.title}</h3>
          <Reach uniqueCount={story.uniquePublications} />
        </div>
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Visual Reach Indicator**: Displays 5 flame icons with progressive fill based on reach percentage
- **Dynamic Calculation**: Converts unique publication count to reach percentage using predefined ranges
- **Interactive Tooltip**: Shows detailed reach information on hover with numerical score and label
- **Responsive Sizing**: Supports small and medium size variants for different UI contexts
- **Accessibility**: Includes descriptive tooltip content and proper semantic structure

### Reach Calculation Logic
- Maps unique publication counts to reach percentages through 9 defined ranges
- Converts percentages to 1-5 scale with descriptive labels (Limited, Low, Average, High, Maximum)
- Uses overlay technique to show partial flame fills for precise reach representation

### Visual Presentation
- Base flames shown at 25% opacity to indicate total scale
- Overlay flames at full opacity clipped to show exact reach percentage
- Dashed border (optional) to separate from other content
- Consistent spacing and alignment across size variants

## State Management
**Local State Only** - Uses `useMemo` hooks for performance optimization of:
- Reach percentage calculation from unique count
- Rounded reach value and label computation
- Style object memoization

No external state management (TanStack Query or Zustand) required as the component is purely presentational with computed values.

## Side Effects
**None** - This is a pure presentation component with no side effects:
- No API calls or data fetching
- No external state mutations
- No localStorage or sessionStorage interactions
- Only performs calculations and renders UI based on props

## Dependencies

### Internal Components
- `@/components/icons/ReachFlame` - Flame icon for visual indicator
- `@/components/ui/tooltip` - Tooltip wrapper components
- `@/components/ui/typography` - Text styling component

### Utilities
- `@/lib/utils/cn` - Tailwind class merging utility

### External Libraries
- `React` - Core React functionality and hooks

## Integration

### Application Architecture
- **Story Analytics**: Primary component for displaying story reach metrics
- **Dashboard Integration**: Used in story cards, analytics grids, and metric displays
- **Reusable UI Pattern**: Can be integrated anywhere story impact visualization is needed

### Data Flow
```
Story Data → uniqueCount prop → Reach calculation → Visual representation
```

### Component Hierarchy
```
Reach (container)
├── Tooltip wrapper
│   ├── TooltipTrigger
│   │   └── ReachIcons (visual indicator)
│   └── TooltipContent
│       ├── ReachIcons (detailed view)
│       └── Typography (labels and description)
```

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Clean separation between `Reach` container and `ReachIcons` presentation
✅ **Reusability**: Self-contained with configurable props for different contexts
✅ **Performance**: Proper memoization of expensive calculations
✅ **Type Safety**: Full TypeScript interfaces with exported constants for reuse

### Usage Recommendations
- Use `size="sm"` in compact layouts or secondary contexts
- Enable `disableBorder` when component has its own container styling
- Provide meaningful `uniqueCount` values from validated data sources
- Consider wrapping in loading states when data is being fetched

### Exported Constants
```tsx
// Available for external use
import { 
  FLAME_COUNT,    // Number of flame indicators (5)
  RANGES,         // Publication count to reach mapping
  LABELS,         // Reach level descriptions
  REACH_SIZES     // Size variant styles
} from '@/components/story/stats/reach';
```