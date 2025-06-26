# DisableConnectionDialog Component

## Purpose

The `DisableConnectionDialog` component provides a confirmation modal for unsubscribing from connected apps in the signals system. It presents users with a clear warning about the consequences of disabling a connection and offers cancel/confirm actions with appropriate loading states during the disable operation.

## Component Type

**Client Component** - This component requires client-side interactivity for dialog state management, event handling (button clicks), and loading state updates. The interactive nature of the confirmation dialog necessitates client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls the visibility state of the dialog |
| `onOpenChange` | `(open: boolean) => void` | Yes | Callback function triggered when dialog open state changes |
| `onDisable` | `() => Promise<void>` | Yes | Async function called when user confirms the disable action |
| `connectionName` | `string` | Yes | Display name of the connection being disabled |
| `isLoading` | `boolean` | Yes | Loading state that disables buttons during the disable operation |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DisableConnectionDialog } from '@/components/signals/details/connected-apps/disable-connection-dialog';
import { disableConnection } from '@/lib/api/connections';

export function ConnectionCard({ connection }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const disableMutation = useMutation({
    mutationFn: () => disableConnection(connection.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      setIsDialogOpen(false);
      // Show success toast
    },
    onError: (error) => {
      // Handle error, show error toast
    },
  });

  return (
    <>
      <div className="connection-card">
        <h3>{connection.name}</h3>
        <Button 
          variant="errorStroke" 
          onClick={() => setIsDialogOpen(true)}
        >
          Disable Connection
        </Button>
      </div>

      <DisableConnectionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onDisable={disableMutation.mutateAsync}
        connectionName={connection.name}
        isLoading={disableMutation.isPending}
      />
    </>
  );
}
```

## Functionality

- **Confirmation Modal**: Displays a warning dialog before executing destructive actions
- **Dynamic Content**: Shows the specific connection name in both title and description
- **Loading States**: Disables all interactive elements during the disable operation
- **Accessibility**: Uses semantic dialog structure with proper ARIA labels
- **Action Buttons**: Provides clear cancel and confirm options with appropriate styling
- **State Management**: Handles dialog visibility and loading states through props

## State Management

The component follows a **stateless pattern** where all state is managed by the parent component:
- Dialog visibility (`isOpen`) is controlled externally
- Loading state (`isLoading`) reflects the parent's mutation status
- No internal state management, promoting better control flow and testability

## Side Effects

- **Dialog State Changes**: Triggers `onOpenChange` callback when dialog is closed via overlay or escape key
- **Disable Action**: Executes the `onDisable` async function when user confirms the action
- **No Direct API Calls**: The component delegates actual API operations to the parent component

## Dependencies

### UI Components
- `@/components/ui/dialog` - Core dialog functionality and structure
- `@/components/ui/button` - Action buttons with consistent styling
- `@/components/ui/typography` - Standardized text styling and hierarchy

### External Dependencies
- React - For component lifecycle and props handling

## Integration

This component integrates into the signals architecture as part of the connected apps management flow:

```
Signals Details Page
└── Connected Apps Section
    └── Connection Card
        └── DisableConnectionDialog (this component)
```

**Integration Pattern**:
1. Parent component manages connection data and mutations
2. Dialog component handles UI presentation and user confirmation
3. Parent component processes the actual disable operation
4. Query invalidation updates the UI after successful operations

## Best Practices

✅ **Adherence to Architecture Guidelines**:
- **Component Decomposition**: Simple, focused component with single responsibility
- **State Management**: Uses props-down pattern, delegates complex state to parent
- **Reusability**: Generic enough to work with any connection type
- **UI Consistency**: Leverages design system components for consistent styling

✅ **Implementation Best Practices**:
- **Async Handling**: Properly handles async operations with loading states
- **Error Boundaries**: Delegates error handling to parent component
- **Accessibility**: Uses semantic HTML structure with proper dialog patterns
- **Performance**: Lightweight component with no unnecessary re-renders

✅ **Integration Patterns**:
- **Clear Separation**: UI logic separated from business logic
- **Predictable API**: Simple, well-defined props interface
- **Flexible**: Works with any mutation library or state management approach
- **Testable**: Stateless design makes unit testing straightforward