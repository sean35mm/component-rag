# ConnectedAppsDeliveryItem Component

## Purpose

The `ConnectedAppsDeliveryItem` component displays an individual connected app configuration in the signals delivery section. It renders app-specific information (like Slack channels/users) with the ability to disable the connection through a confirmation dialog.

## Component Type

**Client Component** - Uses the `'use client'` directive because it manages local state (`useState`) for modal visibility and loading states, and handles user interactions with click events.

## Props Interface

### ConnectedAppsDeliveryItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `configuration` | `Configuration` | Yes | Fastn configuration object containing app metadata, name, and available actions |

### SlackContent

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `metadata` | `FastnAppSlackMetadata` | Yes | Slack-specific metadata containing users and channels arrays |

## Usage Example

```tsx
import { ConnectedAppsDeliveryItem } from '@/components/signals/details/connected-apps/connected-apps-delivery-item';

function ConnectedAppsList() {
  const configurations = useSignalConfigurations();

  return (
    <div className="space-y-4">
      {configurations.map((config) => (
        <ConnectedAppsDeliveryItem 
          key={config.id}
          configuration={config}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **App Icon Display**: Shows connector-specific icons using NextJS Image optimization
- **Dynamic Content Rendering**: Renders app-specific content based on connector type (currently supports Slack)
- **Slack Integration**: Displays formatted user mentions (@username) and channel references (#channel)
- **Connection Management**: Provides disable functionality with confirmation dialog
- **Error Handling**: Integrates with application error handling system
- **Loading States**: Shows loading indicators during disable operations

## State Management

**Local State (useState)**:
- `isDisableModalOpen`: Controls visibility of the disable confirmation dialog
- `isLoading`: Manages loading state during disable operations

The component follows our architecture by using local state for UI-specific concerns while delegating data fetching and business logic to parent components and external services.

## Side Effects

- **Disable Action**: Executes configuration disable action when user confirms
- **Error Handling**: Captures and processes errors through `useFastnErrorHandler`
- **Modal Management**: Opens/closes confirmation dialog based on user interactions

## Dependencies

### Components
- `Button` - UI button component with variant support
- `Typography` - Text rendering with consistent styling
- `DisableConnectionDialog` - Confirmation modal for connection removal
- `NextImage` - Optimized image component

### Hooks
- `useFastnErrorHandler` - Application error handling system
- `useMemo` - Performance optimization for content rendering
- `useState` - Local state management

### Utilities
- `getConnectorAssets` - Retrieves app-specific icons and metadata
- `getConnectorKey` - Extracts connector type from configuration

### Types
- `Configuration` - Fastn configuration interface
- `FastnAppSlackMetadata` - Slack-specific metadata structure

## Integration

This component integrates into the signals detail view as part of the connected apps management system:

```
SignalsDetail
  └── ConnectedAppsSection
      └── ConnectedAppsDeliveryItem (multiple instances)
          └── DisableConnectionDialog
```

The component receives configurations from parent components that handle data fetching and state management, following our pattern of keeping data concerns separate from presentation.

## Best Practices

✅ **Proper Client Component Usage**: Uses client-side rendering only for interactive features requiring state

✅ **Component Decomposition**: Separates `SlackContent` as a focused sub-component for app-specific rendering

✅ **Error Handling**: Integrates with centralized error handling system rather than managing errors locally

✅ **Performance Optimization**: Uses `useMemo` for expensive content computations

✅ **Type Safety**: Handles TypeScript issues with appropriate comments and type guards

✅ **Conditional Rendering**: Gracefully handles missing data with early returns

✅ **Loading States**: Provides user feedback during asynchronous operations

✅ **Accessibility**: Uses semantic HTML and proper alt text for images

The component exemplifies our architecture principles by maintaining clear separation between presentation and business logic while providing a focused, reusable interface for connected app management.