# VolumeMarker Component

## Purpose
The `VolumeMarker` component is an interactive draggable marker used in anomaly detection workflows to visually represent and adjust volume thresholds on charts. It provides a horizontal line with optional grabber handles that users can drag to set specific volume levels, essential for configuring signal detection parameters.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires:
- Mouse event handling for drag interactions
- DOM manipulation with refs
- Real-time position updates during dragging
- Animation state management with Framer Motion

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `position` | `number` | No | `0` | Current vertical position as percentage (0-200) |
| `allowGrabber` | `boolean` | No | `undefined` | Shows draggable grabber handles instead of static dots |
| `setPosition` | `(position: number) => void` | No | `undefined` | Callback function to update position during drag operations |

## Usage Example

```tsx
import { useState } from 'react';
import { VolumeMarker } from '@/components/signals/creation/anomaly-detection/volume-marker';

function AnomalyDetectionChart() {
  const [volumeThreshold, setVolumeThreshold] = useState(75);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative h-96 w-full">
      {/* Chart container */}
      <div className="relative h-full bg-gray-100">
        {/* Static marker for display */}
        <VolumeMarker 
          position={volumeThreshold}
          allowGrabber={false}
        />
        
        {/* Interactive marker for editing */}
        {isEditing && (
          <VolumeMarker
            position={volumeThreshold}
            allowGrabber={true}
            setPosition={setVolumeThreshold}
          />
        )}
      </div>
      
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'} Threshold
      </button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Visual Threshold Representation**: Displays a horizontal dashed line with end markers
- **Interactive Dragging**: Optional grabber handles for real-time position adjustment
- **Smooth Animation**: Framer Motion integration for position transitions
- **Precise Positioning**: Percentage-based positioning system (0-200 range)
- **Visual Feedback**: Hover and active states for interactive elements

### Drag Behavior
- **Mouse Down**: Initiates drag mode and adds global event listeners
- **Mouse Move**: Calculates new position based on mouse coordinates relative to parent
- **Mouse Up**: Terminates drag mode and cleans up event listeners
- **Position Clamping**: Constrains movement within valid bounds (0-200%)

## State Management

### Local State
- **Refs**: Uses `useRef` for DOM element reference and drag state tracking
- **No Internal State**: Position is controlled externally via props
- **Event Listeners**: Dynamically managed global mouse event listeners during drag

### External State Integration
```tsx
// Typical integration with parent state
const [config, setConfig] = useState({
  volumeThreshold: 75,
  // other anomaly detection settings
});

const updateVolumeThreshold = (position: number) => {
  setConfig(prev => ({
    ...prev,
    volumeThreshold: position
  }));
};
```

## Side Effects

### DOM Interactions
- **Global Event Listeners**: Adds/removes `mousemove` and `mouseup` listeners during drag
- **Coordinate Calculations**: Reads parent element dimensions and mouse position
- **Memory Management**: Properly cleans up event listeners to prevent memory leaks

### Animation Effects
- **Position Transitions**: Smooth movement animation via Framer Motion
- **Opacity Animation**: Fade-in effect on component mount
- **Performance**: Zero-duration position changes for responsive dragging

## Dependencies

### External Libraries
- **Framer Motion**: Animation and gesture handling
- **React**: Core hooks (`useCallback`, `useRef`)

### Internal Dependencies
- **PiGrabber Icon**: Grabber handle visual component
- **Tailwind Classes**: Styling with custom color tokens (`pgBlueVSGold`)

### Type Dependencies
```tsx
interface VolumeMarkerProps {
  position: number;
  allowGrabber?: boolean;
  setPosition?: (position: number) => void;
}
```

## Integration

### Application Architecture
```
Anomaly Detection Workflow
├── Signal Creation Form
│   ├── Volume Analysis Section
│   │   ├── Volume Chart Container
│   │   │   ├── VolumeMarker (threshold display)
│   │   │   └── Chart Visualization
│   │   └── Threshold Controls
└── Configuration Management
```

### Data Flow
1. **Parent Component**: Manages volume threshold state
2. **VolumeMarker**: Receives position and update callback
3. **User Interaction**: Drag events trigger position updates
4. **State Update**: Parent receives new position via callback
5. **Re-render**: Component reflects new position

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Properly designated for interactive functionality
- ✅ **Controlled Component Pattern**: Position managed externally
- ✅ **Single Responsibility**: Focused solely on marker visualization and interaction
- ✅ **Proper Cleanup**: Event listeners removed to prevent memory leaks

### Performance Considerations
- **Efficient Calculations**: Position calculations use direct DOM measurements
- **Optimized Rerenders**: Uses `useCallback` to prevent unnecessary function recreation
- **Animation Performance**: Leverages Framer Motion's optimized animation engine

### Integration Patterns
```tsx
// Recommended: Combine with form management
function SignalConfigForm() {
  const { control, watch, setValue } = useForm<SignalConfig>();
  const volumeThreshold = watch('volumeThreshold');

  return (
    <VolumeMarker
      position={volumeThreshold}
      allowGrabber={true}
      setPosition={(pos) => setValue('volumeThreshold', pos)}
    />
  );
}
```

### Accessibility Considerations
- **Keyboard Support**: Could be enhanced with keyboard navigation
- **Screen Reader Support**: Consider adding ARIA labels for threshold values
- **Focus Management**: Visual focus indicators for interactive elements