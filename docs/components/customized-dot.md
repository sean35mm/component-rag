# CustomizedDot Component

## Purpose
The `CustomizedDot` component renders an animated SVG dot with ripple effects for use in data visualization charts, specifically designed for story velocity metrics. It provides configurable sizes and animated visual feedback when active, creating an engaging user experience for highlighting data points.

## Component Type
**Client Component** - This component uses interactive SVG animations with `<animate>` elements that require browser rendering. The animations are purely visual and don't require server-side processing.

## Props Interface

### CustomizedDotProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `cx` | `number` | ✅ | - | X-coordinate position for the dot center |
| `cy` | `number` | ✅ | - | Y-coordinate position for the dot center |
| `isActive` | `boolean` | ✅ | - | Whether the dot should be visible and animated |
| `fill` | `string` | ✅ | - | Color value for the dot and ripple effects |
| `size` | `'sm' \| 'md' \| 'smd' \| 'sma'` | ❌ | `'sm'` | Size variant of the dot |
| `animationDunarion` | `string` | ❌ | `'4s'` | Duration of the animation cycle |
| `payload` | `StoryVelocity` | ❌ | - | Associated story velocity data |
| `key` | `string \| number` | ❌ | - | React key for list rendering |

## Usage Example

```tsx
import { CustomizedDot } from '@/components/story/stats/customized-dot';

// In a chart component
const StoryVelocityChart = () => {
  const handleDotRender = (props: any) => (
    <CustomizedDot
      {...props}
      isActive={props.payload?.isHighlight}
      fill="#3b82f6"
      size="md"
      animationDunarion="3s"
    />
  );

  return (
    <LineChart data={velocityData}>
      <Line 
        dataKey="velocity" 
        dot={handleDotRender}
      />
    </LineChart>
  );
};

// Standalone usage
<CustomizedDot
  cx={100}
  cy={50}
  isActive={true}
  fill="#10b981"
  size="smd"
  payload={storyVelocityData}
/>
```

## Functionality

### Core Features
- **Conditional Rendering**: Only renders when `isActive` is true
- **Animated Ripple Effects**: Three concentric circles with staggered animations
- **Size Variants**: Four predefined size configurations (sm, smd, md, sma)
- **Configurable Colors**: Accepts any valid CSS color value
- **Responsive Positioning**: Centers itself at provided coordinates

### Animation System
- **Outer Ripples**: Three circles with opacity fade and radius expansion
- **Inner Dot**: Static circle with subtle radius pulsing
- **Staggered Timing**: Ripples start at 0.5s intervals for smooth effect
- **Infinite Loop**: Continuous animation cycle

### Size Configuration
```tsx
// Available sizes with their dimensions
sm:  24px (compact)
smd: 40px (medium-small)  
md:  64px (large)
sma: 24px (compact with enhanced inner animation)
```

## State Management
**Local State Only** - This component is purely presentational and doesn't manage any application state. All data flows through props from parent components that handle:
- Chart data via TanStack Query
- UI state via local React state or Zustand stores

## Side Effects
**None** - This component has no side effects, API calls, or external interactions. It's a pure rendering component focused on visual presentation.

## Dependencies

### Internal Dependencies
- `@/lib/types` - `StoryVelocity` type definition

### External Dependencies
- `React` - Core React functionality
- SVG/Browser APIs - Native animation support

### Integration Points
- Chart libraries (Recharts, Chart.js, etc.)
- Story velocity tracking components
- Data visualization dashboards

## Integration
This component fits into the application architecture as a **specialized UI component** within the story management domain:

```
src/components/
├── story/
│   ├── stats/
│   │   ├── customized-dot.tsx     # ← This component
│   │   ├── velocity-chart.tsx     # Parent chart component
│   │   └── stats-dashboard.tsx    # Feature container
```

### Usage Patterns
1. **Chart Integration**: Primary use case with charting libraries
2. **Status Indicators**: Standalone indicators for story states
3. **Dashboard Widgets**: Part of larger analytics interfaces

## Best Practices

### Architecture Alignment
✅ **Component Decomposition**: Single responsibility for dot visualization  
✅ **Reusability**: Configurable props for multiple use cases  
✅ **Domain Organization**: Located in story-specific component structure  
✅ **Performance**: Conditional rendering prevents unnecessary DOM updates  

### Usage Recommendations
```tsx
// ✅ Good: Use with chart libraries
<Line dot={(props) => <CustomizedDot {...props} isActive={shouldShow} />} />

// ✅ Good: Configure size appropriately
<CustomizedDot size="sm" /> // For dense charts
<CustomizedDot size="md" /> // For prominent indicators

// ❌ Avoid: Don't use for static indicators
// Use regular dots/circles for non-animated use cases

// ✅ Good: Performance optimization
{isDataLoaded && (
  <CustomizedDot isActive={item.shouldHighlight} />
)}
```

### Performance Considerations
- Use `isActive={false}` to prevent rendering when not needed
- Consider animation duration based on user experience requirements
- Limit concurrent animated dots to prevent performance issues