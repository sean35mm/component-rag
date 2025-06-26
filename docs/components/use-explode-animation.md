# useExplodeAnimation Hook

## Purpose

The `useExplodeAnimation` hook provides a visually striking exploding text animation effect for search interfaces. It renders text onto an invisible canvas, analyzes the pixel data, and creates a particle explosion animation where each text pixel transforms into animated particles that scatter and fade away. This enhances user experience by providing satisfying visual feedback during search operations.

## Component Type

**Client Component** - Requires the `'use client'` directive due to:
- Canvas manipulation and drawing operations
- DOM ref interactions with HTMLTextAreaElement
- RequestAnimationFrame for smooth animations
- Browser-specific APIs (getComputedStyle, getContext)
- Real-time state updates during animation frames

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | The text content to be animated and exploded |
| `inputRef` | `HTMLTextAreaElement \| null` | Yes | Reference to the input element for style extraction |
| `setValue` | `Dispatch<SetStateAction<string>>` | Yes | State setter to clear the input value after animation |

## Usage Example

```tsx
'use client';

import { useState, useRef } from 'react';
import { useExplodeAnimation, canvasSize } from '@/components/search/search-bar/hooks/use-explode-animation';

export function SearchBarWithExplode() {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { vanishAndSubmit, animating, ExplodeCanvas } = useExplodeAnimation(
    searchValue,
    inputRef.current,
    setSearchValue
  );

  const handleSubmit = () => {
    // Trigger the explode animation
    vanishAndSubmit();
    
    // Perform search logic here
    // The animation will clear the input automatically
  };

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="w-full p-4 border rounded-lg"
      />
      
      <button
        onClick={handleSubmit}
        disabled={animating}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {animating ? 'Searching...' : 'Search'}
      </button>
      
      {/* Render the explosion canvas */}
      <ExplodeCanvas />
    </div>
  );
}
```

## Functionality

### Core Features

- **Text-to-Particle Conversion**: Renders text to canvas and extracts pixel data to create individual particles
- **Realistic Particle Physics**: Each particle moves randomly and shrinks over time for natural animation
- **Theme-Aware Rendering**: Adapts text color based on current theme (dark/light mode)
- **Performance Optimized**: Uses requestAnimationFrame for smooth 60fps animations
- **Auto-cleanup**: Automatically clears input value when animation completes

### Animation Lifecycle

1. **Draw Phase**: Text is rendered to hidden canvas using input element's computed styles
2. **Pixel Analysis**: Canvas pixel data is analyzed to identify non-transparent pixels
3. **Particle Generation**: Each text pixel becomes an AnimationData object with position, size, and color
4. **Animation Loop**: Particles move randomly and shrink until they disappear
5. **Cleanup**: Input is cleared and animation state is reset

## State Management

**Local State Pattern** - Uses React's built-in state management:

- `useState` for animation state tracking
- `useRef` for persistent canvas reference and animation data
- Props-based state coordination with parent component
- No external state management needed due to localized animation scope

```tsx
const [animating, setAnimating] = useState(false);
const canvasRef = useRef<HTMLCanvasElement>(null);
const newDataRef = useRef<AnimationData[]>([]);
```

## Side Effects

### Canvas Operations
- **Pixel Data Analysis**: Reads canvas pixel data to generate particles
- **Animation Frames**: Uses requestAnimationFrame for smooth rendering
- **Style Computation**: Reads computed styles from input element

### Theme Integration
- **Theme Detection**: Responds to theme changes for appropriate text color
- **Dynamic Color Adjustment**: Adapts canvas rendering based on resolved theme

### Performance Considerations
- **Memory Management**: Cleans up animation data after completion
- **Conditional Rendering**: Only animates text under 50 characters to prevent performance issues

## Dependencies

### Internal Dependencies
```tsx
import { cn } from '@/lib/utils/cn';
```

### External Dependencies
```tsx
import { useTheme } from 'next-themes';
import { 
  Dispatch, 
  SetStateAction, 
  useCallback, 
  useEffect, 
  useRef, 
  useState 
} from 'react';
```

### Browser APIs
- Canvas 2D Context
- RequestAnimationFrame
- GetComputedStyle

## Integration

### Search Bar Architecture
This hook integrates specifically with search bar components to provide enhanced UX:

```tsx
// Typical integration pattern
const SearchBar = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { vanishAndSubmit, animating, ExplodeCanvas } = useExplodeAnimation(
    value,
    inputRef.current,
    setValue
  );
  
  return (
    <div className="relative">
      <textarea ref={inputRef} />
      <ExplodeCanvas />
    </div>
  );
};
```

### Theme System Integration
- Automatically responds to Next.js theme changes
- Provides consistent visual experience across light/dark modes
- No additional configuration required

## Best Practices

### Architecture Adherence

✅ **Proper Client Component Usage**: Uses 'use client' only when necessary for canvas operations

✅ **Single Responsibility**: Focused solely on explosion animation logic

✅ **Reusable Design**: Generic enough to work with any text input element

✅ **Performance Conscious**: Includes safeguards against animating overly long text

### Implementation Guidelines

```tsx
// ✅ Good: Proper ref handling
const inputRef = useRef<HTMLTextAreaElement>(null);
const { vanishAndSubmit } = useExplodeAnimation(value, inputRef.current, setValue);

// ❌ Avoid: Animating very long text
if (value.length > 50) {
  // Hook automatically prevents animation
  // Consider alternative feedback for long text
}

// ✅ Good: Conditional rendering based on animation state
{animating && <LoadingSpinner />}
```

### Performance Optimization

- **Text Length Limits**: Automatically prevents animation for text over 50 characters
- **Memory Cleanup**: Properly cleans up animation data and canvas contexts
- **Efficient Updates**: Uses useCallback to prevent unnecessary re-renders

### Canvas Constants

```tsx
export const canvasSize = 1000; // Exported for consistent sizing
```

This hook exemplifies our architecture principles by providing a focused, reusable animation utility that integrates seamlessly with the broader component ecosystem while maintaining performance and theme consistency.