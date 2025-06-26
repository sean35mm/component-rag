# ConnectedAppItem Component

## Purpose

The `ConnectedAppItem` component displays a connected application in the settings panel, allowing users to view connection status and manage activation/deactivation of integrations. It renders a card-based interface showing app details, connection status, and provides controls for managing the connection state with confirmation dialogs for destructive actions.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Local state management for loading states and dialog visibility
- Event handlers for user interactions (activate/deactivate actions)
- Dynamic UI updates based on user actions

## Props Interface

### ConnectedAppItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `connector` | `Connector` | Yes | Connector object from Fastn containing app data, status, and available actions |

### ConnectedAppItemInner

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `connector` | `Connector` | Yes | Connector object from Fastn containing app data, status, and available actions |
| `description` | `string` | Yes | App description text displayed in the card |
| `icon` | `string` | Yes | URL/path to the app icon image |
| `alt` | `string` | Yes | Alt text for the app icon |

## Usage Example

```tsx
import { ConnectedAppItem } from '@/components/settings/connected-apps/connected-app-item';

function ConnectedAppsSettings() {
  const connectors = useConnectors(); // From Fastn SDK

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {connectors.map((connector) => (
        <ConnectedAppItem 
          key={connector.id} 
          connector={connector} 
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Visual App Representation**: Displays app icon, name, and description in a card layout
- **Status Indication**: Shows connection status with a "CONNECTED" badge for active apps
- **Action Management**: Provides activate/deactivate buttons based on current connection status
- **Confirmation Dialog**: Shows confirmation dialog before deactivating connected apps
- **Loading States**: Displays loading indicators during activation/deactivation processes
- **Error Handling**: Integrates with Fastn error handling system for action failures

### Interactive Behaviors
- Direct activation for inactive apps
- Confirmation dialog for deactivation of active apps
- Disabled states during processing
- Dynamic button text based on app status

## State Management

**Local State (useState)**:
- `isLoading`: Boolean flag for managing loading states during actions
- `isOpen`: Boolean flag for controlling confirmation dialog visibility

**Derived State**:
- `actions`: Computed from connector actions using `useMemo` to extract activate/deactivate functions
- `isActive`: Derived from connector status
- `buttonText`: Computed based on connection status

## Side Effects

### API Interactions
- **Activation**: Calls connector's activation action when user activates an app
- **Deactivation**: Calls connector's deactivation action after user confirms deactivation

### Error Handling
- Uses `useFastnErrorHandler` hook for consistent error handling across Fastn operations
- Automatically handles and displays errors from activation/deactivation operations

## Dependencies

### UI Components
- `Badge` - For connection status display
- `Button` - For action triggers
- `Card` - For container layout
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogTitle` - For confirmation modal
- `Typography` - For text styling

### External Libraries
- `@fastn-ai/react` - Connector type and integration functionality
- `NextImage` - Optimized image component for app icons

### Utilities & Hooks
- `useFastnErrorHandler` - Error handling hook
- `getConnectorAssets` - Utility for retrieving app assets (icon, description)
- `getConnectorKey` - Utility for extracting connector identifier
- `cn` - Class name utility

### Types
- `FastnActivationResult` - Type for activation/deactivation results

## Integration

### Settings Architecture
- Part of the connected apps settings section
- Integrates with Fastn SDK for connector management
- Follows card-based layout pattern for settings items

### Data Flow
1. Receives connector data from parent component
2. Extracts app assets using connector key
3. Processes available actions into activate/deactivate functions
4. Manages user interactions and API calls
5. Updates UI based on operation results

### Error Integration
- Connects to application-wide error handling system
- Provides contextual error information including connector details

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for interactivity
- ✅ **Component Decomposition**: Separates data fetching (ConnectedAppItem) from presentation (ConnectedAppItemInner)
- ✅ **Flat Structure**: Avoids deep nesting by using utility functions for data processing
- ✅ **Domain-Based Organization**: Located in settings/connected-apps feature directory

### State Management
- ✅ **Local State for UI**: Uses local state for UI-specific concerns (loading, dialog visibility)
- ✅ **Derived State**: Computes values from props rather than storing redundant state
- ✅ **Memoization**: Uses `useMemo` for expensive computations

### Error Handling
- ✅ **Consistent Patterns**: Uses centralized error handling hook
- ✅ **User Feedback**: Provides loading states and error context
- ✅ **Graceful Degradation**: Handles missing connector keys gracefully

### UI/UX Patterns
- ✅ **Confirmation for Destructive Actions**: Shows dialog before deactivation
- ✅ **Clear Visual Hierarchy**: Uses typography variants and spacing consistently
- ✅ **Responsive Design**: Includes responsive layout classes
- ✅ **Accessibility**: Provides proper alt text and semantic structure