# VolumeDropdown Component

## Purpose

The `VolumeDropdown` component provides an interface for configuring volume-based anomaly detection thresholds in signal creation. It allows users to select predefined volume multipliers (Slightly, Heavily, Significantly) or set a custom multiplier value to trigger alerts when publishing volume increases compared to a 30-day average.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its use of interactive hooks (`useCallback`) and state management with Zustand store. This component requires client-side interactivity for dropdown selection and custom multiplier input.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props and manages its state through the global Zustand store |

## Usage Example

```tsx
import { VolumeDropdown } from '@/components/signals/creation/anomaly-detection/volume-dropdown';

function AnomalyDetectionForm() {
  return (
    <div className="space-y-6">
      <h2>Configure Anomaly Detection</h2>
      
      {/* Volume threshold configuration */}
      <VolumeDropdown />
      
      {/* Other anomaly detection controls */}
    </div>
  );
}

// Usage in signal creation flow
function CreateSignalPage() {
  return (
    <CreateSignalProvider>
      <div className="max-w-2xl mx-auto p-6">
        <AnomalyDetectionForm />
      </div>
    </CreateSignalProvider>
  );
}
```

## Functionality

### Core Features

- **Predefined Volume Thresholds**: Offers three preset multiplier options
  - Slightly: 1.25x increase
  - Heavily: 1.75x increase  
  - Significantly: 3.00x increase
- **Custom Multiplier**: Allows precise control with custom multiplier values
- **Interactive Controls**: Dropdown selection with conditional custom input
- **Real-time Updates**: Immediate state synchronization with global store

### Volume Multiplier Options

```tsx
// Predefined thresholds
const VOLUME_OPTIONS = {
  SLIGHTLY: 1.25,      // 25% increase
  HEAVILY: 1.75,       // 75% increase
  SIGNIFICANTLY: 3.00  // 200% increase
};

// Custom range (from constants)
const CUSTOM_RANGE = {
  min: VOLUME_MIN,
  max: VOLUME_MAX,
  step: VOLUME_STEP
};
```

## State Management

### Zustand Store Integration

The component uses the `useCreateSignalStore` for centralized state management:

```tsx
// State selectors
const volumeType = useCreateSignalStore(state => state.anomalyDetectionVolumeType);
const volumeMultiplier = useCreateSignalStore(state => state.anomalyDetectionVolumeMultiplier);

// State setters
const setVolumeType = useCreateSignalStore(state => state.setAnomalyDetectionVolumeType);
const setVolumeMultiplier = useCreateSignalStore(state => state.setAnomalyDetectionVolumeMultiplier);
```

### State Flow

1. **Selection Change**: User selects volume type → triggers `onSelectChange`
2. **Custom Mode**: When "Custom" selected → reveals `MultiplierControl`
3. **Multiplier Update**: Custom value changes → updates store via `setAnomalyDetectionVolumeMultiplier`
4. **Persistence**: State persists across component unmounts via Zustand

## Side Effects

### Store Updates

- **Volume Type Changes**: Automatically updates global signal creation state
- **Multiplier Mapping**: Applies default multipliers for predefined types
- **Custom Value Persistence**: Maintains custom multiplier values when switching modes

### UI State Effects

```tsx
// Conditional rendering based on selection
{selectedAnomalyDetectionVolumeType === AnomalyDetectionVolumeType.CUSTOM && (
  <MultiplierControl
    value={anomalyDetectionVolumeMultiplier ?? customDefaultMultiplier}
    onChangeAction={setAnomalyDetectionVolumeMultiplier}
  />
)}
```

## Dependencies

### UI Components
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from `@/components/ui/select`
- `Typography` from `@/components/ui/typography`
- `MultiplierControl` from `@/components/ui/multiplier-control`

### Store & Types
- `useCreateSignalStore` from `@/lib/contexts`
- `AnomalyDetectionVolumeType` enum from `@/lib/types`

### Utilities
- `mapAnomalyDetectionVolumeTypeToMultiplier` from `@/lib/utils/signal`
- Volume constants: `VOLUME_MIN`, `VOLUME_MAX`, `VOLUME_STEP`

### React Hooks
- `useCallback` for memoized event handlers

## Integration

### Signal Creation Workflow

```tsx
// Part of larger signal creation form
CreateSignalPage
├── SignalTypeSelection
├── BasicInformation  
├── AnomalyDetectionSettings
│   ├── VolumeDropdown ← This component
│   ├── PriceDropdown
│   └── TimeframeSelector
└── ReviewAndSubmit
```

### Store Architecture

```tsx
// Global state shape
interface CreateSignalState {
  anomalyDetectionVolumeType: AnomalyDetectionVolumeType;
  anomalyDetectionVolumeMultiplier: number | null;
  setAnomalyDetectionVolumeType: (type: AnomalyDetectionVolumeType) => void;
  setAnomalyDetectionVolumeMultiplier: (multiplier: number) => void;
}
```

## Best Practices

### Architecture Adherence

✅ **State Management**: Uses Zustand for client state as per guidelines  
✅ **Component Decomposition**: Flat structure with UI component composition  
✅ **Reusability**: Leverages shared UI components (`MultiplierControl`, `Select`)  
✅ **Type Safety**: Full TypeScript integration with proper type definitions  

### Implementation Patterns

```tsx
// ✅ Memoized callbacks for performance
const onSelectChange = useCallback(
  (value: AnomalyDetectionVolumeType) => {
    setAnomalyDetectionVolumeType(value);
  },
  [setAnomalyDetectionVolumeType]
);

// ✅ Conditional rendering with proper fallbacks
value={anomalyDetectionVolumeMultiplier ?? customDefaultMultiplier}

// ✅ Semantic HTML structure with accessibility
<SelectValue 
  placeholder='Select a volume'
  className='typography-paragraphSmall text-pgStroke-950'
/>
```

### Error Handling

The component handles edge cases through:
- Default multiplier fallbacks for custom mode
- Null-safe value handling with `??` operator
- Proper constraint validation via `MultiplierControl` min/max/step props