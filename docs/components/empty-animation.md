# EmptyAnimation Component

## Purpose
The `EmptyAnimation` component renders an animated empty state for monitoring signals. It displays a theme-aware Lottie animation with a globe, overlaid with a monitoring status indicator and logos illustration. This component provides visual feedback when no monitoring data is available, maintaining engagement through smooth animations.

## Component Type
**Client Component** - Uses `'use client'` directive because it:
- Integrates with `useTheme` hook for theme detection
- Renders Lottie animations that require browser APIs
- Uses dynamic imports for client-side animation loading
- Manages theme-dependent visual states

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls whether the animation is rendered and active. When false, component returns null for performance optimization |

## Usage Example

```tsx
import { EmptyAnimation } from '@/components/signals/empty-animation';

// In a signals dashboard
function SignalsDashboard() {
  const { data: signals, isLoading } = useSignalsQuery();
  const hasNoSignals = !isLoading && (!signals || signals.length === 0);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <EmptyAnimation isVisible={hasNoSignals} />
          {signals?.map(signal => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </>
      )}
    </div>
  );
}

// In a monitoring page with conditional rendering
function MonitoringPage() {
  const [showAnimation, setShowAnimation] = useState(true);
  
  return (
    <div>
      <EmptyAnimation isVisible={showAnimation} />
      <button onClick={() => setShowAnimation(!showAnimation)}>
        Toggle Animation
      </button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Theme-Aware Animation**: Automatically switches between light and dark Lottie animations based on current theme
- **Conditional Rendering**: Only renders when `isVisible` is true, optimizing performance
- **Layered Composition**: Combines multiple visual elements (animation, status indicator, logos) in a cohesive layout
- **Responsive Design**: Fixed dimensions with centered positioning for consistent display

### Visual Elements
- **Globe Animation**: Theme-specific Lottie animation positioned at the top center
- **Monitoring Status**: Floating status card with "Monitoring" text and animated star loader
- **Logos Illustration**: Bottom-positioned SVG illustration that adapts to theme
- **Styled Container**: Gradient background with border and shadow effects

## State Management
- **Theme State**: Leverages `useTheme` from next-themes for theme detection
- **Animation State**: Uses custom `useThemeAnimation` hook to manage animation data loading
- **Local State**: No internal state management - relies on parent component's `isVisible` prop

## Side Effects
- **Dynamic Import**: Loads Lottie library client-side to avoid SSR issues
- **Theme Detection**: Responds to theme changes and updates animations accordingly
- **Animation Loading**: Fetches appropriate animation data based on current theme

## Dependencies

### Components
- `LoaderStar` - Animated star component for the monitoring status indicator
- `Lottie` - Dynamically imported animation renderer

### Hooks
- `useTheme` - Next.js theme detection and management
- `useThemeAnimation` - Custom hook for loading theme-specific animations

### External Libraries
- `next-themes` - Theme management system
- `next/dynamic` - Dynamic component importing
- `next/image` - Optimized image component
- `lottie-react` - Lottie animation rendering

## Integration

### Application Architecture
```
Signals Dashboard
├── SignalsQuery (TanStack Query)
├── EmptyAnimation (when no data)
│   ├── Theme Provider Context
│   ├── Animation Asset Loading
│   └── Visual State Management
└── SignalsList (when data exists)
```

### Data Flow
1. Parent component determines empty state condition
2. Passes `isVisible` boolean to EmptyAnimation
3. Component checks theme context and loads appropriate assets
4. Renders layered animation composition when visible

## Best Practices

### Architecture Adherence
- ✅ **Conditional Client Component**: Properly uses client-side rendering only when necessary
- ✅ **Flat Component Structure**: Avoids deep nesting, composes elements at single level
- ✅ **Performance Optimization**: Returns null when not visible, uses dynamic imports
- ✅ **Theme Integration**: Follows application-wide theme management patterns

### Usage Patterns
```tsx
// ✅ Good: Control visibility from parent
<EmptyAnimation isVisible={!hasData && !isLoading} />

// ✅ Good: Use with loading states
{isLoading ? <Loader /> : <EmptyAnimation isVisible={isEmpty} />}

// ❌ Avoid: Don't manage complex state internally
// Component should remain controlled by parent
```

### Performance Considerations
- Animation only loads when visible
- Lottie library loaded dynamically to reduce initial bundle
- Theme-specific assets loaded on demand
- Component unmounts cleanly when not needed