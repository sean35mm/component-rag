# PiPlayCircleLine Component

## Purpose

The `PiPlayCircleLine` component is an SVG icon component that renders a play button enclosed in a circular outline. This icon is commonly used in media interfaces to indicate play functionality, such as starting video playback, audio playback, or initiating any process that can be "played" or started.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs dependencies, making it suitable for server-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiPlayCircleLine } from '@/components/icons/pi/pi-play-circle-line';

// Basic usage
function MediaPlayer() {
  return (
    <button className="flex items-center gap-2 p-2">
      <PiPlayCircleLine />
      Play Video
    </button>
  );
}

// With custom styling
function StyledPlayButton() {
  return (
    <button className="group hover:scale-105 transition-transform">
      <PiPlayCircleLine 
        className="w-12 h-12 text-blue-500 group-hover:text-blue-600"
        aria-label="Play content"
      />
    </button>
  );
}

// In a media control interface
function VideoControls({ onPlay, isPlaying }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-black/50 rounded-lg">
      <button
        onClick={onPlay}
        disabled={isPlaying}
        className="text-white hover:text-gray-300 disabled:opacity-50"
      >
        <PiPlayCircleLine className="w-8 h-8" />
      </button>
      <span className="text-white">Ready to play</span>
    </div>
  );
}

// With accessibility features
function AccessiblePlayButton({ onPlay, contentTitle }) {
  return (
    <button
      onClick={onPlay}
      className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      aria-label={`Play ${contentTitle}`}
    >
      <PiPlayCircleLine 
        className="w-6 h-6"
        role="img"
        aria-hidden="true"
      />
    </button>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Icon**: Renders crisp at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Customizable**: All SVG props can be overridden for styling and behavior
- **Consistent Design**: Follows 24x24 viewBox standard for icon consistency

### Visual Design
- **Outline Style**: Features a circular border with a play triangle inside
- **Clean Geometry**: Uses precise path definitions for sharp rendering
- **Balanced Proportions**: Play triangle is properly centered within the circle

## State Management

**No State Management Required** - This is a stateless presentational component. Any interactive behavior (play/pause state, loading states, etc.) should be managed by parent components using:

- **TanStack Query**: For media metadata and playback status from APIs
- **Zustand**: For global media player state
- **Local State**: For component-specific UI states in parent components

## Side Effects

**No Side Effects** - This component:
- Does not make API calls
- Does not access browser APIs
- Does not perform any asynchronous operations
- Does not trigger any side effects

All interactive functionality should be implemented in parent components.

## Dependencies

### Direct Dependencies
- `react`: For `SVGProps` type definition

### Integration Dependencies
- **UI Components**: Often used within Button, IconButton, or custom control components
- **Media Components**: Integrated into VideoPlayer, AudioPlayer, or MediaControls
- **Theme System**: Inherits colors from design system via `currentColor`

## Integration

### Application Architecture Fit
```
├── app/                          # App Router pages
├── components/
│   ├── ui/                      # Generic UI components using PiPlayCircleLine
│   │   ├── button.tsx           # Button component with icon support
│   │   └── media-controls.tsx   # Media control components
│   ├── icons/
│   │   └── pi/
│   │       └── pi-play-circle-line.tsx  # ← This component
│   └── features/
│       ├── video-player/        # Video player using this icon
│       └── audio-player/        # Audio player using this icon
```

### Common Integration Patterns
```tsx
// In UI Button component
import { PiPlayCircleLine } from '@/components/icons/pi/pi-play-circle-line';

export function PlayButton({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      <PiPlayCircleLine />
      {children}
    </button>
  );
}

// In feature components
import { PlayButton } from '@/components/ui/play-button';

export function VideoPlayer() {
  const { mutate: startPlayback } = useStartVideoMutation();
  
  return (
    <PlayButton onClick={() => startPlayback()}>
      Play Video
    </PlayButton>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for optimal performance  
✅ **Single Responsibility**: Focuses solely on rendering the play icon  
✅ **Reusable Design**: Generic enough for use across different features  
✅ **Type Safety**: Properly typed with SVGProps interface  

### Usage Recommendations
- **Semantic HTML**: Always wrap in semantic elements (button, etc.) for interactivity
- **Accessibility**: Provide appropriate ARIA labels when used for actions
- **Consistent Sizing**: Use consistent sizing classes across the application
- **Color Inheritance**: Leverage `currentColor` for theme integration
- **Performance**: No additional optimization needed due to simple SVG nature

### Anti-Patterns to Avoid
❌ Don't add click handlers directly to the icon  
❌ Don't manage state within this component  
❌ Don't hardcode colors - use `currentColor` inheritance  
❌ Don't make this a client component unless absolutely necessary  