# SavingAnimation Component

## Purpose

The `SavingAnimation` component displays a theme-aware Lottie animation during save operations in the signal creation flow. It provides visual feedback to users indicating that their signal data is being processed and saved, with automatic light/dark theme adaptation.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Renders Lottie animations which require browser APIs
- Utilizes the `useThemeAnimation` hook for dynamic theme-based animation switching
- Manages conditional rendering based on visibility state

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls whether the animation is rendered and plays. When `false`, the component returns `null` |

## Usage Example

```tsx
import { SavingAnimation } from '@/components/signals/creation/saving-animation';

export function SignalCreationForm() {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSignal(signalData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSave}>
        {/* Form fields */}
        <button type="submit" disabled={isSaving}>
          Save Signal
        </button>
      </form>
      
      {/* Overlay animation during save */}
      {isSaving && (
        <div className="absolute inset-0 bg-background/80">
          <SavingAnimation isVisible={isSaving} />
        </div>
      )}
    </div>
  );
}
```

## Functionality

- **Conditional Rendering**: Only renders when `isVisible` is `true`, returning `null` otherwise for optimal performance
- **Theme-Aware Animation**: Automatically switches between light and dark theme animations based on current theme
- **Centered Display**: Uses flexbox to center the animation within its container
- **Continuous Loop**: Plays the Lottie animation in a continuous loop while visible
- **Full Container Coverage**: Takes up the full size of its parent container

## State Management

- **No Internal State**: Component is purely controlled by the `isVisible` prop
- **Theme State**: Relies on the `useThemeAnimation` hook which internally manages theme detection and animation loading
- **External Control**: Animation visibility is managed by parent components handling save operations

## Side Effects

- **Animation Loading**: The `useThemeAnimation` hook loads appropriate animation assets based on theme
- **DOM Manipulation**: Lottie library manipulates the DOM to render SVG/Canvas animations
- **Theme Monitoring**: Subscribes to theme changes through the custom hook

## Dependencies

### Hooks
- `useThemeAnimation` - Custom hook for theme-aware animation management

### External Libraries
- `lottie-react` - Renders Lottie animations in React

### Animation Assets
- `phone-animation-lottie-light` - Light theme animation asset
- `phone-animation-lottie-dark` - Dark theme animation asset

## Integration

### Application Architecture
- **Signal Creation Flow**: Part of the signal creation domain under `/signals/creation/`
- **UI Feedback Layer**: Provides visual feedback during async operations
- **Theme System**: Integrates with the application's theme management system

### Usage Patterns
```tsx
// In signal creation wizards
<SavingAnimation isVisible={mutation.isPending} />

// In form submissions
<SavingAnimation isVisible={isSubmitting} />

// With loading states
<SavingAnimation isVisible={savingState === 'saving'} />
```

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Single-purpose component without nesting
- ✅ **Domain Organization**: Located in `/signals/creation/` following domain-driven structure
- ✅ **Controlled Component**: Fully controlled by props, no internal state management
- ✅ **Client-Side Only**: Properly marked as client component for browser-specific functionality

### Performance Considerations
- **Conditional Rendering**: Returns `null` when not visible to avoid unnecessary DOM manipulation
- **Animation Optimization**: Leverages Lottie's built-in performance optimizations
- **Asset Loading**: Theme-based animation loading prevents loading unused assets

### Accessibility
- **Screen Reader Friendly**: Animation doesn't interfere with screen readers when hidden
- **Non-Essential Animation**: Purely decorative, doesn't convey critical information
- **Respects Motion Preferences**: Consider adding `prefers-reduced-motion` support

### Integration Recommendations
- Combine with loading states from TanStack Query mutations
- Use with form submission states from React Hook Form
- Coordinate with global loading indicators to prevent conflicting UI states