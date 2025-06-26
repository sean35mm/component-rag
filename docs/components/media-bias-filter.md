# MediaBiasFilter Component

## Purpose

The `MediaBiasFilter` component provides an interactive slider interface for selecting media bias preferences. It displays a gradient-colored slider with three bias positions (Leans Left, Center, Leans Right) and includes visual bias icons and labels for each position. This component is specifically designed for filtering news articles or media content based on political bias orientation.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `MediaBiasFilterType` | Yes | - | Current selected bias filter value (-1, 0, or 1) |
| `onChange` | `(bias: MediaBiasFilterType) => void` | Yes | - | Callback function triggered when bias selection changes |

### MediaBiasFilterType Enum

| Value | Numeric | Description |
|-------|---------|-------------|
| `LEANS_LEFT` | -1 | Left-leaning bias filter |
| `CENTER` | 0 | Neutral/center bias filter |
| `LEANS_RIGHT` | 1 | Right-leaning bias filter |

## Usage Example

```tsx
import React, { useState } from 'react';
import { MediaBiasFilter, MediaBiasFilterType } from '@/components/ui/article-explorer/media-bias-filter';

function ArticleFilters() {
  const [biasFilter, setBiasFilter] = useState<MediaBiasFilterType>(
    MediaBiasFilterType.CENTER
  );

  const handleBiasChange = (bias: MediaBiasFilterType) => {
    setBiasFilter(bias);
    // Apply filter logic here
    console.log('Selected bias:', bias);
  };

  return (
    <div className="bg-pgNeutral-50 p-6 rounded-lg">
      <h3 className="typography-labelLarge text-pgText-900 mb-4">
        Filter by Media Bias
      </h3>
      <MediaBiasFilter
        value={biasFilter}
        onChange={handleBiasChange}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: `.typography-labelXSmall` - Used for bias type labels under slider ticks
- **Color**: `color='700'` - Applied to typography for medium-dark text contrast

### Color Tokens
- **Background Colors**: 
  - `bg-pgBackground-950/35` - Semi-transparent tick marks
  - `bg-pgStatic-0` - White slider thumb background
- **Gradient Colors**: Custom gradient `from-[#3831FF] via-[#595959] to-[#FF3131]` representing political spectrum
- **Border Colors**: 
  - `border-alphaNeutral/24` - Subtle thumb border
  - `ring-pgBackgroundBlueTint` - Focus ring color

### Spacing & Layout
- **Padding**: `px-2 pb-7 pt-3` - Component container spacing
- **Margins**: `mx-10` - Horizontal slider track margins
- **Sizing**: `size-5` - Slider thumb dimensions, `size-4` - Icon dimensions

## Variants

This component does not use CVA variants but provides built-in bias type variations:

- **Left Bias** (`LEANS_LEFT`): Blue-tinted left position with left-pointing bias icon
- **Center Bias** (`CENTER`): Neutral center position with balanced bias icon  
- **Right Bias** (`LEANS_RIGHT`): Red-tinted right position with right-pointing bias icon

## Styling

### Component States
- **Default**: Gradient slider track with positioned thumb
- **Focus**: `focus-visible:ring-1` - Focus ring on slider thumb
- **Hover**: Inherits Radix UI hover states for improved interaction

### Customization Options
- The component uses fixed styling but can be wrapped in containers with custom classes
- Bias icons are sourced from the `BiasIcon` component with configurable `avgBiasRating` prop
- Typography color can be customized through the `Typography` component's color prop

## Responsive Design

The component maintains consistent sizing across breakpoints:
- **Mobile**: Full-width slider with appropriate touch targets
- **Desktop**: Maintains proportional spacing and sizing
- **Touch Interaction**: `touch-none select-none` prevents unwanted touch behaviors during slider interaction

## Accessibility

### ARIA Support
- Utilizes Radix UI Slider primitive which provides comprehensive ARIA support
- Includes proper role attributes and keyboard navigation
- Screen reader compatible with value announcements

### Keyboard Navigation
- **Arrow Keys**: Navigate between bias positions
- **Tab**: Focus on slider thumb
- **Enter/Space**: Activate slider interaction

### Focus Management
- `focus-visible:outline-none focus-visible:ring-1` - Custom focus indicators
- Clear visual feedback for keyboard users

## Dependencies

### Internal Components
- `BiasIcon` - Displays bias-specific icons
- `Typography` - Consistent text styling
- `cn` utility - Class name concatenation

### External Libraries
- `@radix-ui/react-slider` - Accessible slider primitive
- Inherits Tailwind CSS for styling utilities

### Related Components
- Works within article explorer filtering systems
- Integrates with other filter components for comprehensive content filtering

## Customization

### Extending Functionality
```tsx
// Custom wrapper with additional styling
<div className="bg-pgNeutral-100 rounded-xl p-4 shadow-sm">
  <MediaBiasFilter
    value={biasValue}
    onChange={handleChange}
  />
</div>
```

### Style Overrides
While the component doesn't accept a `className` prop directly, it can be customized by:
1. Wrapping in styled containers
2. Overriding CSS custom properties for colors
3. Extending the gradient colors through CSS variables

### Icon Customization
The bias icons are configurable through the `BiasIcon` component's `avgBiasRating` prop, allowing for different visual representations of bias types.

## Exported Constants

The component exports several useful constants for external usage:

- `SLIDER_TICK_POSITIONS` - Positioning data for slider ticks
- `BIAS_TYPES` - Array of all bias filter types
- `MEDIA_BIAS_FILTER_TYPE_TO_ICON` - Icon mapping for bias types
- `MEDIA_BIAS_FILTER_TYPE_TO_LABEL` - Label mapping for bias types

These can be imported separately for use in other components or utilities that work with bias filtering.