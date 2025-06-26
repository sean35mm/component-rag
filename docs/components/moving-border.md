# MovingBorder Component Documentation

## Purpose
The MovingBorder component creates an animated border effect with a moving gradient element that travels along the perimeter of a rectangular path. This component is designed to provide visual feedback and enhance the user interface of search functionality with an eye-catching animated border that can be toggled on/off based on interaction states.

## Component Type
**Client Component** - Uses the `'use client'` directive (implicitly required) because it:
- Utilizes Framer Motion animations with `useAnimationFrame`
- Manages real-time animation state with `useMotionValue`
- Requires DOM manipulation with `useRef` and SVG path calculations
- Needs browser APIs for animation timing and rendering

## Props Interface

### MovingBorderProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `duration` | `number` | No | `2000` | Animation duration in milliseconds for one complete cycle |
| `rx` | `string` | No | `undefined` | Horizontal radius for rounded corners of the border path |
| `ry` | `string` | No | `undefined` | Vertical radius for rounded corners of the border path |

### MovingComponentProps
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isShow` | `boolean` | No | `true` | Controls visibility of the animated border |
| `className` | `string` | No | `undefined` | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML div attributes |

## Usage Example

```tsx
import { MovingBorderAnimation } from '@/components/search/search-bar/moving-border';

// Basic usage with default settings
export function SearchContainer() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="relative">
      <input 
        className="search-input"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Search..."
      />
      <MovingBorderAnimation 
        isShow={isActive}
        className="border-animation"
      />
    </div>
  );
}

// Advanced usage with custom styling
export function EnhancedSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input 
          className="w-full px-4 py-2 rounded-3xl border-2 border-transparent bg-white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <MovingBorderAnimation 
          isShow={isFocused}
          className="custom-border-animation"
        />
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Animated Border Path**: Creates a smooth animation along the perimeter of a rectangular path
- **Customizable Speed**: Configurable animation duration for different visual effects
- **Rounded Corner Support**: Supports custom border radius through `rx` and `ry` props
- **Visibility Control**: Toggle animation visibility with smooth opacity transitions
- **Responsive Design**: Automatically adapts to container dimensions

### Animation Mechanics
- Uses SVG path calculations to determine the border perimeter
- Employs `useAnimationFrame` for smooth, performance-optimized animations
- Calculates position along the path using `getPointAtLength()` and `getTotalLength()`
- Applies centered transforms to maintain visual consistency

## State Management
**Local State Management**: 
- Uses Framer Motion's `useMotionValue` for animation progress tracking
- Manages animation state through `useRef` for SVG path reference
- No external state management required - self-contained animation logic

## Side Effects
- **Animation Frame Updates**: Continuously updates animation progress using `useAnimationFrame`
- **DOM Calculations**: Performs SVG path length and position calculations on each frame
- **Performance Optimization**: Uses Framer Motion's optimized animation system to minimize reflows

## Dependencies

### External Dependencies
- `framer-motion`: Animation library for motion values and transforms
- `react`: Core React hooks (`useRef`)

### Internal Dependencies
- `@/lib/utils/cn`: Utility function for conditional class name concatenation

### Related Components
- Typically used within search bar components
- Integrates with input focus/blur states
- Can be combined with other UI feedback components

## Integration
This component fits into the search functionality architecture by:
- **Visual Enhancement**: Provides immediate visual feedback for search interactions
- **Component Composition**: Designed to wrap around search input containers
- **State Coordination**: Responds to parent component state changes for visibility control
- **Styling Integration**: Uses Tailwind CSS classes that align with the design system

## Best Practices

### Architecture Adherence
✅ **Flat Component Structure**: Simple, focused component without unnecessary nesting
✅ **Reusable Design**: Parameterized props allow for various use cases
✅ **Client-Side Optimization**: Proper use of client component for animation requirements
✅ **Performance Conscious**: Uses optimized animation techniques

### Usage Guidelines
- Use `isShow` prop to control visibility based on user interactions
- Customize `duration` for different animation speeds (slower for subtle effects, faster for dynamic feedback)
- Apply custom `className` for design system integration
- Position within a `relative` container for proper absolute positioning
- Consider accessibility by ensuring animations respect user motion preferences

### Performance Considerations
- Animation automatically handles cleanup when component unmounts
- Uses hardware-accelerated transforms for smooth performance
- Minimal DOM manipulation through optimized SVG calculations
- Framer Motion provides built-in performance optimizations