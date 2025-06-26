# ConnectedAppAlertItem Component

## Purpose

The `ConnectedAppAlertItem` component displays and manages connected application integrations within the signals alert creation flow. It provides an interface for users to enable, disable, and configure third-party application connections for alert notifications, with visual status indicators and configuration management.

## Component Type

**Client Component** - Uses the `'use client'` directive due to interactive state management, dialog controls, theme handling, and asynchronous operations for connector activation and configuration.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `connector` | `Connector` | Yes | The connector object containing app details, actions, and status information |
| `configuration` | `Configuration` | Yes | The configuration object with current settings, status, and available actions |

## Usage Example

```tsx
import { ConnectedAppAlertItem } from '@/components/signals/creation/alert-methods/connected-app-alert-item';

function AlertMethodsConfiguration() {
  const connectors = useConnectors(); // From Fastn AI
  const configurations = useConfigurations(); // From Fastn AI

  return (
    <div className="space-y-4">
      {connectors.map((connector) => {
        const configuration = configurations.find(
          config => config.connectorId === connector.id
        );
        
        if (!configuration) return null;

        return (
          <ConnectedAppAlertItem
            key={connector.id}
            connector={connector}
            configuration={configuration}
          />
        );
      })}
    </div>
  );
}
```

## Functionality

### Core Features
- **Visual Status Display**: Shows connector icon, name, and description with opacity indicating enabled/disabled state
- **Enable/Disable Toggle**: Provides button to activate or deactivate the connection
- **Configuration Management**: Opens configuration dialog for editing connection settings
- **Error Handling**: Integrates with global error handling system for user feedback
- **Loading States**: Shows loading indicators during async operations

### User Interactions
- **Enable Connection**: Activates connector and opens configuration if needed
- **Disable Connection**: Shows confirmation dialog before disabling
- **Edit Configuration**: Opens form modal for updating connection settings
- **Cancel Operations**: Provides cancel options for all dialogs

## State Management

### Local State (useState)
- `isLoading`: Tracks async operation states for button feedback
- `isOpen`: Controls configuration dialog visibility
- `isDisableModalOpen`: Manages disable confirmation dialog state

### Computed State (useMemo)
- `activateAction`: Extracts activation function from connector actions
- `disableAction`: Extracts disable function from configuration actions
- `configStyles`: Builds theme-appropriate styles for Fastn components

## Side Effects

### API Interactions
- **Connector Activation**: Calls `activateAction` to enable app connections
- **Configuration Disable**: Executes `disableAction` to deactivate configurations
- **Error Reporting**: Sends error details to global error handler

### Theme Integration
- Responds to theme changes for consistent styling
- Applies theme-specific styles to embedded Fastn components

## Dependencies

### External Libraries
- `@fastn-ai/react`: Core connector and configuration components
- `next-themes`: Theme detection and management
- `next/image`: Optimized image rendering for app icons

### Internal Components
- `DisableConnectionDialog`: Confirmation dialog for connection removal
- `Button`, `Card`, `Dialog`, `Typography`: UI foundation components
- `PiEditBoxLine`: Edit icon from icon system

### Utilities and Hooks
- `useFastnErrorHandler`: Global error handling integration
- `getConnectorAssets`, `getConnectorKey`: Connected app utility functions
- `buildFastnStyles`: Theme-aware style generation

## Integration

### Signals Creation Flow
- Integrates into alert method selection during signal creation
- Provides connected app configuration as part of notification setup
- Coordinates with other alert method components

### Connected Apps System
- Leverages centralized connector management from Fastn AI
- Maintains consistency with main connected apps management interface
- Shares configuration patterns across the application

### Theme System Integration
- Responds to global theme changes
- Ensures visual consistency with application design system
- Applies theme-specific styling to third-party components

## Best Practices

### Component Architecture Adherence
- **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- **Flat Component Structure**: Maintains single responsibility with clear prop interface
- **State Locality**: Keeps UI state local while delegating business logic to external systems

### Error Handling
- Integrates with centralized error handling system
- Provides user feedback for failed operations
- Maintains application stability during connector failures

### Performance Considerations
- Uses `useMemo` for expensive computations
- Optimizes re-renders through proper dependency arrays
- Leverages Next.js Image optimization for connector icons

### User Experience
- Provides clear visual feedback for all states
- Implements loading states for async operations
- Offers cancellation options for all dialogs
- Uses confirmation dialogs for destructive actions