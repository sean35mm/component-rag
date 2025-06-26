# EditFilters Component

## Purpose

The `EditFilters` component provides a complete interface for editing signal filters through a trigger button and drawer pattern. It acts as a container component that coordinates between a trigger button that opens the editing interface and a custom filters drawer that contains the actual filter editing functionality.

## Component Type

**Server Component** - This component does not use any client-side state, event handlers, or browser APIs directly. It serves as a composition layer that renders child components, making it suitable as a Server Component by default.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalData` | `Signal` | Yes | The signal object containing current filter configuration and metadata needed for editing |

## Usage Example

```tsx
import { EditFilters } from '@/components/signals/details/edit-filters/edit-filters';
import { Signal } from '@/lib/types';

// In a signal details page or component
function SignalDetailsPage({ signal }: { signal: Signal }) {
  return (
    <div className="signal-details">
      <div className="signal-header">
        <h1>{signal.name}</h1>
        <EditFilters signalData={signal} />
      </div>
      {/* Other signal details */}
    </div>
  );
}

// Usage in a signal management dashboard
function SignalCard({ signal }: { signal: Signal }) {
  return (
    <div className="signal-card">
      <div className="card-actions">
        <EditFilters signalData={signal} />
      </div>
    </div>
  );
}
```

## Functionality

- **Trigger Interface**: Renders a button component that serves as the entry point for filter editing
- **Filter Editing**: Provides access to a drawer interface for modifying signal filters
- **Data Flow**: Passes signal data down to the filter editing interface
- **Composition Pattern**: Follows a clean separation between trigger and content components

## State Management

This component itself does not manage state directly. State management is handled by its child components:

- **TriggerButton**: Likely manages drawer open/close state using local React state or a client-side state management solution
- **CustomFiltersDrawer**: Handles filter editing state, potentially using React Hook Form with Zod validation for form management and TanStack Query for persisting filter changes

## Side Effects

The component itself has no direct side effects. Side effects are delegated to child components:

- Filter persistence and API calls are handled within `CustomFiltersDrawer`
- UI state changes (drawer open/close) are managed by the trigger/drawer interaction

## Dependencies

### Components
- `TriggerButton` - Provides the UI trigger for opening the filter editor
- `CustomFiltersDrawer` - Contains the filter editing interface and logic

### Types
- `Signal` from `@/lib/types` - Defines the structure of signal data

### Potential Child Component Dependencies
- React Hook Form + Zod (likely used in `CustomFiltersDrawer`)
- TanStack Query (for filter persistence)
- UI components from `/ui/` directory (buttons, drawers, form inputs)

## Integration

This component fits into the signals feature domain within the larger application:

```
src/components/signals/
├── details/
│   ├── edit-filters/
│   │   ├── edit-filters.tsx          # Main component
│   │   ├── trigger-button.tsx        # Trigger UI
│   │   └── custom-filters-drawer.tsx # Filter editing logic
│   └── signal-details.tsx            # Parent component
```

The component integrates with:
- **Signal Details Views**: Embedded in signal detail pages for in-context editing
- **Signal Management**: Used in dashboards and management interfaces
- **Filter System**: Connects to the broader signal filtering architecture

## Best Practices

✅ **Architectural Adherence**:
- **Proper Decomposition**: Clean separation between trigger and content components
- **Server Component Default**: Correctly uses Server Component pattern for composition
- **Domain Organization**: Properly placed within signals feature directory
- **Props Interface**: Well-defined interface with proper TypeScript typing

✅ **Component Design**:
- **Single Responsibility**: Focuses solely on coordinating filter editing interface
- **Flat Composition**: Avoids unnecessary nesting by rendering components as siblings
- **Data Flow**: Clean prop passing pattern for signal data

✅ **Reusability**:
- Generic enough to work with any Signal object
- Self-contained with clear dependencies
- Can be easily integrated into different signal-related views

✅ **Type Safety**:
- Proper TypeScript interfaces
- Leverages shared type definitions from `@/lib/types`