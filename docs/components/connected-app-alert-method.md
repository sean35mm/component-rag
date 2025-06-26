# ConnectedAppAlertMethod

## Purpose

The `ConnectedAppAlertMethod` component provides an interface for managing connected application alert methods within the signal creation flow. It displays a collapsible section that allows users to enable/disable connected applications as alert destinations and configure individual connector settings. The component handles the loading states, manages the visibility of connected app configurations, and integrates with the global signal creation state.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useState` hooks
- Handles user interactions (checkbox clicks, expand/collapse)
- Uses `useEffect` for side effects
- Integrates with Zustand store for global state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalId` | `string` | Yes | The unique identifier of the signal being configured. Used to fetch relevant configurations and associate alert methods. |

## Usage Example

```tsx
import { ConnectedAppAlertMethod } from '@/components/signals/creation/alert-methods/connected-app-alert-method';

function SignalCreationForm() {
  const signalId = "signal-123";
  
  return (
    <div className="alert-methods-section">
      <h3>Alert Methods</h3>
      <ConnectedAppAlertMethod signalId={signalId} />
      {/* Other alert method components */}
    </div>
  );
}
```

## Functionality

- **Expandable Interface**: Provides a collapsible section with a checkbox to toggle connected app configuration visibility
- **Loading States**: Displays loading spinners while fetching connectors and configurations
- **Configuration Management**: Maps connector types to their configurations and displays enabled/disabled states
- **Interactive Controls**: Allows users to enable/disable the connected apps section and configure individual connectors
- **Status Awareness**: Automatically checks the section if any connected apps are already enabled
- **Conditional Rendering**: Only renders connector items that have existing configurations

## State Management

### Local State (useState)
- `isCheckboxChecked`: Controls the expanded/collapsed state and checkbox status

### Global State (Zustand)
- **useCreateSignalStore**: Updates the global signal creation state with `setHasConnectedApps`

### Server State (TanStack Query via Custom Hooks)
- **useConnectors**: Fetches available connector configurations
- **useConfigurations**: Fetches signal-specific configurations based on `signalId`

## Side Effects

### useEffect Hook
- **Dependency**: `[isSomeConnectedAppEnabled, setHasConnectedApps]`
- **Purpose**: Synchronizes local checkbox state with enabled configurations and updates global store
- **Trigger**: Runs when configuration loading completes or enabled status changes

### Data Fetching
- Automatically fetches connectors and configurations on component mount
- Configurations are filtered by the provided `signalId`

## Dependencies

### External Components
- `ConnectedAppAlertItem`: Child component for individual connector configuration
- `Checkbox`: UI component for toggle control
- `Typography`: Text styling component
- `PiLoader3Line`: Loading spinner icon

### Hooks & Services
- `useConnectors`: Fetches available connectors from `@fastn-ai/react`
- `useConfigurations`: Fetches signal configurations from `@fastn-ai/react`
- `useCreateSignalStore`: Zustand store for signal creation state

### Utilities
- `cn`: Utility for conditional className merging
- `alertMethodContainer`: Shared styling for alert method components

## Integration

### Signal Creation Flow
- Integrates into the broader signal creation wizard/form
- Updates global signal state through Zustand store
- Coordinates with other alert method components

### Configuration System
- Links connectors with their specific configurations
- Respects existing enabled/disabled states
- Provides interface for modifying connector settings

### Data Architecture
- Maps connector types to configurations using `typeToConfiguration` lookup
- Filters connectors to only show those with existing configurations
- Maintains consistency between local UI state and server data

## Best Practices

### Architecture Adherence
- ✅ **Proper Component Type**: Correctly uses Client Component for interactive functionality
- ✅ **State Management**: Follows patterns with TanStack Query for server state, Zustand for global state, useState for local UI state
- ✅ **Component Decomposition**: Delegates connector-specific rendering to `ConnectedAppAlertItem`

### Performance Optimization
- Uses `useMemo` for expensive computations (`isSomeConnectedAppEnabled`, `typeToConfiguration`)
- Prevents unnecessary re-renders through memoized values
- Efficient data transformation and lookup patterns

### User Experience
- Provides clear loading states with appropriate spinners
- Prevents interaction during loading states
- Maintains consistent checkbox behavior with existing configurations
- Uses semantic HTML with proper labels and accessibility attributes

### Error Handling
- Gracefully handles loading states
- Provides fallback UI during data fetching
- Conditionally renders based on data availability