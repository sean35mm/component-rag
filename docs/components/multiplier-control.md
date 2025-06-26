# MultiplierControl Component

## Purpose

The `MultiplierControl` component provides an interactive stepper input for adjusting numerical multiplier values. It features increment/decrement buttons with continuous press functionality and displays the current value in a centered format. The component is commonly used for adjusting betting multipliers, quantity selectors, or any numeric value that requires precise step-based control.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `defaultValue` | `number` | ✅ | - | Initial value to display when component mounts |
| `value` | `number \| undefined` | ✅ | - | Controlled value for the multiplier (use `undefined` for uncontrolled) |
| `onChangeAction` | `(multiplier: number) => void` | ✅ | - | Callback function triggered when the multiplier value changes |
| `min` | `number` | ❌ | `0.1` | Minimum allowed value for the multiplier |
| `max` | `number` | ❌ | `10.0` | Maximum allowed value for the multiplier |
| `step` | `number` | ❌ | `0.1` | Amount to increment/decrement with each step |

## Usage Example

```tsx
import { MultiplierControl } from '@/components/ui/multiplier-control';
import { useState } from 'react';

function BettingInterface() {
  const [multiplier, setMultiplier] = useState(2.0);

  const handleMultiplierChange = (newMultiplier: number) => {
    setMultiplier(newMultiplier);
    // Additional logic like updating bet calculations
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <MultiplierControl
        defaultValue={1.0}
        value={multiplier}
        onChangeAction={handleMultiplierChange}
        min={0.5}
        max={20.0}
        step={0.5}
      />
    </div>
  );
}

// Uncontrolled usage
function SimpleMultiplier() {
  return (
    <MultiplierControl
      defaultValue={1.5}
      value={undefined}
      onChangeAction={(value) => console.log('New multiplier:', value)}
    />
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-labelLarge`** - Applied to the central value display for optimal readability

### Layout & Spacing
- **Flexbox Layout**: `flex flex-row items-center justify-center gap-2`
- **Padding**: `p-2` (8px) for comfortable touch targets
- **Gap**: `gap-2` (8px) between elements for visual separation

### Component Dependencies
- **Card Component**: Provides the container with `shadow-inputFieldPop` styling
- **Button Component**: Uses `neutralGhost` variant for subtle interactive elements
- **Typography Component**: Ensures consistent text styling across the design system

## Styling

### Visual Appearance
- **Container**: Rounded card with `rounded-[10px]` and elevated shadow (`shadow-inputFieldPop`)
- **Buttons**: 
  - Size: `size-6` (24x24px) for optimal touch interaction
  - Variant: `neutralGhost` for subtle, non-intrusive appearance
  - Radius: `rounded-md` for consistent corner styling
- **Value Display**: Centered text with `text-center` alignment

### Interactive States
- **Disabled State**: Buttons automatically disable when reaching min/max limits
- **Hover Effects**: Inherited from Button component's `neutralGhost` variant
- **Active State**: Continuous increment/decrement while mouse is pressed

### Customization Options
```tsx
// Custom styling with Tailwind classes
<div className="bg-pgBackground-50 p-4 rounded-lg">
  <MultiplierControl
    defaultValue={1.0}
    value={multiplier}
    onChangeAction={setMultiplier}
    // Component automatically adapts to container width
  />
</div>
```

## Responsive Design

The component is designed to be fully responsive:

- **Mobile (< 640px)**: Full width with touch-friendly 24px button targets
- **Tablet (640px+)**: Maintains aspect ratio with flexible width
- **Desktop (1024px+)**: Optimal sizing within constrained containers

```tsx
// Responsive container example
<div className="w-full sm:w-64 md:w-72 lg:w-80">
  <MultiplierControl {...props} />
</div>
```

## Accessibility

### ARIA Support
- **`aria-label`**: Descriptive labels on both buttons ("Increase multiplier", "Decrease multiplier")
- **Disabled State**: Properly communicated to screen readers via `disabled` attribute
- **Semantic Structure**: Uses proper button elements for keyboard navigation

### Keyboard Interaction
- **Tab Navigation**: Buttons are focusable and follow natural tab order
- **Enter/Space**: Activates increment/decrement actions
- **Mouse Events**: 
  - `onMouseDown`: Starts continuous adjustment
  - `onMouseUp`: Stops continuous adjustment
  - `onMouseLeave`: Prevents stuck intervals when cursor leaves button area

### Screen Reader Support
- Current value is announced as "X.X times" format
- Button states (enabled/disabled) are properly communicated
- Value changes are announced in real-time

## Dependencies

### Internal Components
- **`@/components/ui/button`** - Provides interactive button elements
- **`@/components/ui/card`** - Container component with design system styling
- **`@/components/ui/typography`** - Ensures consistent text styling
- **`@/components/icons`** - PiMinus and PiPlus icons from Phosphor icon set

### External Dependencies
- **React Hooks**: `useState`, `useEffect`, `useCallback` for state management
- **TypeScript**: Full type safety with `MultiplierControlProps` interface

### Constants Available for Import
```tsx
import { 
  MAX_MULTIPLIER_DEFAULT,  // 10.0
  MIN_MULTIPLIER_DEFAULT,  // 0.1
  MULTIPLIER_STEP_DEFAULT, // 0.1
  INTERVAL_TIME           // 150ms
} from '@/components/ui/multiplier-control';
```