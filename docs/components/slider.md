# Slider Component

## Purpose

The Slider component provides an interactive range input control that allows users to select a value from a continuous range by dragging a thumb along a track. Built on Radix UI's slider primitive, it offers full keyboard navigation, accessibility features, and customizable styling that integrates seamlessly with our design system.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the slider root |
| `defaultValue` | `number[]` | No | - | The default value of the slider when initially rendered |
| `value` | `number[]` | No | - | The controlled value of the slider |
| `onValueChange` | `(value: number[]) => void` | No | - | Callback fired when the slider value changes |
| `onValueCommit` | `(value: number[]) => void` | No | - | Callback fired when the user stops dragging |
| `min` | `number` | No | `0` | The minimum value of the slider |
| `max` | `number` | No | `100` | The maximum value of the slider |
| `step` | `number` | No | `1` | The step interval of the slider |
| `orientation` | `'horizontal' \| 'vertical'` | No | `'horizontal'` | The orientation of the slider |
| `disabled` | `boolean` | No | `false` | Whether the slider is disabled |
| `inverted` | `boolean` | No | `false` | Whether the slider is visually inverted |

*Note: This component extends all props from `@radix-ui/react-slider` Root component.*

## Usage Example

```tsx
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

export default function VolumeControl() {
  const [volume, setVolume] = useState([50]);

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Basic Usage */}
      <div className="space-y-2">
        <label className="typography-labelMedium text-pgText-900">
          Volume: {volume[0]}%
        </label>
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Custom Styled Slider */}
      <div className="space-y-2">
        <label className="typography-labelMedium text-pgText-900">
          Custom Theme
        </label>
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          className="w-full [&>span:first-child]:bg-pgNeutral-200 [&>span:first-child>span]:bg-pgBlue-600 [&>span:last-child]:border-pgBlue-600 [&>span:last-child]:bg-pgBackground-0"
        />
      </div>

      {/* Range Slider */}
      <div className="space-y-2">
        <label className="typography-labelMedium text-pgText-900">
          Price Range
        </label>
        <Slider
          defaultValue={[20, 80]}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Disabled State */}
      <div className="space-y-2">
        <label className="typography-labelMedium text-pgText-500">
          Disabled Slider
        </label>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          disabled
          className="w-full"
        />
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: Use `.typography-labelMedium` or `.typography-labelSmall` for slider labels
- **Values**: Use `.typography-labelSmall` or `.typography-paragraph3XSmall` for value displays

### Colors Used
- **Track Background**: `bg-slate-100` (maps to neutral background)
- **Range Fill**: `bg-slate-900` (active range indicator)
- **Thumb**: `bg-white` with `border-slate-900` (draggable handle)
- **Focus Ring**: `ring-slate-950` (keyboard focus indicator)

### Design System Integration
```tsx
// Using design system colors
<Slider
  className="[&>span:first-child]:bg-pgNeutral-200 
             [&>span:first-child>span]:bg-pgBlue-600 
             [&>span:last-child]:border-pgBlue-600"
/>

// Dark mode support
<Slider
  className="[&>span:first-child]:bg-pgNeutral-200 
             dark:[&>span:first-child]:bg-pgNeutral-800
             [&>span:first-child>span]:bg-pgBlue-600 
             [&>span:last-child]:bg-pgBackground-0
             dark:[&>span:last-child]:bg-pgBackground-950"
/>
```

## Styling

### Available Customizations

**Track Styling** (first span element):
```tsx
className="[&>span:first-child]:bg-pgNeutral-200 [&>span:first-child]:h-1"
```

**Range Styling** (nested span):
```tsx
className="[&>span:first-child>span]:bg-pgBlue-600"
```

**Thumb Styling** (last span element):
```tsx
className="[&>span:last-child]:size-4 [&>span:last-child]:border-pgBlue-600"
```

### State Variants

**Success State**:
```tsx
<Slider className="[&>span:first-child>span]:bg-pgStateSuccess-base [&>span:last-child]:border-pgStateSuccess-base" />
```

**Warning State**:
```tsx
<Slider className="[&>span:first-child>span]:bg-pgStateWarning-base [&>span:last-child]:border-pgStateWarning-base" />
```

**Error State**:
```tsx
<Slider className="[&>span:first-child>span]:bg-pgStateError-base [&>span:last-child]:border-pgStateError-base" />
```

## Responsive Design

The slider adapts across breakpoints with responsive width and spacing:

```tsx
<Slider 
  className="w-full 
             sm:w-64 
             md:w-80 
             lg:w-96
             [&>span:last-child]:size-4
             sm:[&>span:last-child]:size-5
             lg:[&>span:last-child]:size-6"
/>
```

### Responsive Sizing Patterns
- **Mobile**: Smaller thumb size for touch interactions
- **Tablet**: Standard sizing with adequate touch targets
- **Desktop**: Larger precision controls for mouse interaction

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Arrow keys, Home, End, Page Up/Down support
- **Screen Reader**: Proper ARIA attributes and role announcements
- **Focus Management**: Visible focus indicators and logical tab order
- **Touch Support**: Optimized for touch interactions on mobile devices

### ARIA Attributes
- `role="slider"` - Identifies the element as a slider
- `aria-valuemin` - Minimum value of the slider
- `aria-valuemax` - Maximum value of the slider  
- `aria-valuenow` - Current value of the slider
- `aria-orientation` - Horizontal or vertical orientation

### Best Practices
```tsx
// Always provide accessible labels
<div>
  <label id="volume-label" className="typography-labelMedium">
    Volume Control
  </label>
  <Slider 
    aria-labelledby="volume-label"
    aria-describedby="volume-description"
  />
  <div id="volume-description" className="typography-paragraph3XSmall text-pgText-600">
    Use arrow keys to adjust volume level
  </div>
</div>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional className merging

### External Dependencies
- `@radix-ui/react-slider` - Base slider primitive component
- `React` - forwardRef, ComponentPropsWithoutRef, ElementRef

### Related Components
- **Form** - Often used within form contexts
- **Label** - For accessible labeling
- **Input** - Alternative numeric input method
- **Range Input** - Native HTML range alternative

### Utility Integration
- Uses `cn()` utility for className composition
- Compatible with Tailwind's arbitrary value syntax for deep customization
- Supports CSS variable-based theming through design system tokens