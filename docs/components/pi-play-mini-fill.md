# PiPlayMiniFill Icon Component

## Purpose

The `PiPlayMiniFill` component is a filled play button icon that renders a triangular play symbol pointing to the right. This icon is typically used in media players, video controls, audio players, or any interface element that triggers playback functionality. It's part of the Phosphor icon library integration and provides a consistent, scalable SVG icon for play actions.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and does not require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including className, style, onClick, etc. Spreads directly to the underlying `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role

## Usage Example

```tsx
import { PiPlayMiniFill } from '@/components/icons/pi/pi-play-mini-fill';

// Basic usage
export function MediaPlayer() {
  return (
    <button 
      onClick={handlePlay}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      <PiPlayMiniFill />
      Play Video
    </button>
  );
}

// With custom styling
export function PlayButton() {
  return (
    <button className="p-3 rounded-full bg-green-500 hover:bg-green-600">
      <PiPlayMiniFill 
        className="w-6 h-6 text-white" 
        aria-label="Play audio"
      />
    </button>
  );
}

// In a playlist component
export function PlaylistItem({ track, onPlay }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-100">
      <button 
        onClick={() => onPlay(track.id)}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <PiPlayMiniFill className="w-4 h-4 text-gray-600" />
      </button>
      <span>{track.title}</span>
    </div>
  );
}

// With conditional rendering (play/pause toggle)
export function PlayPauseButton({ isPlaying, onToggle }) {
  return (
    <button onClick={onToggle} className="p-2">
      {isPlaying ? (
        <PiPauseFill className="w-5 h-5" />
      ) : (
        <PiPlayMiniFill className="w-5 h-5" />
      )}
    </button>
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders crisp at any size using `1em` dimensions that scale with font-size
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessible**: Can accept ARIA attributes for screen reader compatibility
- **Interactive**: Supports all standard event handlers when wrapped in interactive elements
- **Responsive**: Automatically adapts to parent container sizing and theming

## State Management

**No State Management Required** - This is a pure presentational component with no internal state. Any state related to play/pause functionality should be managed by parent components using:

- **Local State**: `useState` for simple play/pause toggles
- **TanStack Query**: For media state that involves server synchronization
- **Zustand**: For global media player state across the application

```tsx
// Example with local state
const [isPlaying, setIsPlaying] = useState(false);

// Example with Zustand store
const { isPlaying, currentTrack, play } = useMediaPlayerStore();
```

## Side Effects

**No Direct Side Effects** - The component itself produces no side effects. However, it's commonly used in contexts that trigger side effects:

- Media playback controls
- Audio/video player state changes
- API calls to track play counts or user interactions
- Analytics events for user engagement

## Dependencies

### Internal Dependencies
- **React**: `SVGProps<SVGSVGElement>` type from React
- **SVG Standards**: Relies on browser SVG support

### Common Usage Dependencies
- **Styling**: Tailwind CSS classes or styled-components
- **Parent Components**: Media players, buttons, interactive controls
- **Related Icons**: Often used alongside pause, stop, next/previous icons

### No External Dependencies
- No third-party libraries required
- No API services needed
- No complex state management dependencies

## Integration

### Application Architecture Integration

```tsx
// In media player components
export function VideoPlayer({ videoId }) {
  const { data: video } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => fetchVideo(videoId)
  });
  
  return (
    <div className="relative">
      <video ref={videoRef} src={video?.url} />
      <div className="absolute bottom-4 left-4">
        <button onClick={handlePlay}>
          <PiPlayMiniFill className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}

// In design system components
export function Button({ variant, children, ...props }) {
  return (
    <button 
      className={`flex items-center gap-2 ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Usage in feature components
<Button variant="primary" onClick={startPlayback}>
  <PiPlayMiniFill />
  Start Course
</Button>
```

### Domain Integration
- **Media Domain**: Video players, audio controls, podcast players
- **Learning Domain**: Course players, lesson controls
- **Entertainment Domain**: Music players, game controls
- **UI Domain**: Reusable button components, interactive elements

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for optimal performance  
✅ **Flat Composition**: Simple, single-purpose component that composes well  
✅ **Prop Spreading**: Properly spreads SVG props for maximum flexibility  
✅ **Type Safety**: Uses proper TypeScript types from React  

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with proper ARIA
<button onClick={play} aria-label="Play video">
  <PiPlayMiniFill />
</button>

// ✅ Good: Consistent sizing with Tailwind
<PiPlayMiniFill className="w-6 h-6" />

// ✅ Good: Color inheritance
<div className="text-blue-500">
  <PiPlayMiniFill /> {/* Will be blue */}
</div>

// ❌ Avoid: Missing accessibility
<div onClick={play}>
  <PiPlayMiniFill />
</div>

// ❌ Avoid: Hardcoded colors
<PiPlayMiniFill style={{ color: '#ff0000' }} />
```

### Performance Considerations
- **Bundle Size**: Minimal impact, only imports when used
- **Rendering**: No re-renders unless props change
- **Memory**: No event listeners or cleanup required
- **SEO**: Server-rendered for optimal loading