# EmptyApiKeys Component

## Purpose

The `EmptyApiKeys` component displays an empty state interface for when a user has no API keys configured. It provides a visually appealing placeholder with an illustration and a call-to-action button to create the first API key, serving as an onboarding experience for developers accessing the API keys management section.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through the `useApiKeysStore` Zustand store
- Handles user interactions (button click events)
- Uses callback functions for event handling

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `Omit<BlockProps, 'icon' \| 'isLoading' \| 'skeletonSizes' \| 'title'>` | No | All Block component props except the omitted ones which are internally managed |

**Omitted BlockProps:**
- `icon` - Fixed to `PiKey2Line` icon
- `isLoading` - Not applicable for this static empty state
- `skeletonSizes` - Fixed to `'h-11'`
- `title` - Fixed to `'API Keys'`

## Usage Example

```tsx
import { EmptyApiKeys } from '@/components/developers/empty-api-keys';

// Basic usage
export default function DeveloperDashboard() {
  const { apiKeys, isLoading } = useApiKeys();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (apiKeys.length === 0) {
    return <EmptyApiKeys />;
  }

  return <ApiKeysList keys={apiKeys} />;
}

// With additional props
export default function ApiKeysSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EmptyApiKeys className="col-span-full" />
    </div>
  );
}
```

## Functionality

### Core Features
- **Empty State Visualization**: Displays an `ApiComputer` illustration to represent the empty API keys state
- **Action Button**: Provides a "Create your first API key" button that triggers the API key creation flow
- **Navigation Link**: Includes a "Manage all keys" action link that directs to the full API keys management page
- **Consistent Styling**: Uses the application's design system with proper typography and spacing

### Interactive Elements
- **Create Button**: Opens the API key creation modal/form when clicked
- **Header Action**: Provides navigation to the comprehensive API keys management interface

## State Management

### Zustand Store Integration
```tsx
const setIsOpenCreate = useApiKeysStore((state) => state.setIsOpenCreate);
```

- **Store**: `useApiKeysStore` - Manages API keys related client state
- **State Access**: Selects only the `setIsOpenCreate` function to minimize re-renders
- **State Updates**: Triggers modal/form opening through the store's setter function

### Event Handling
```tsx
const openCreateNewApiKey = useCallback(() => {
  setIsOpenCreate(true);
}, [setIsOpenCreate]);
```

- Uses `useCallback` to memoize the event handler and prevent unnecessary re-renders

## Side Effects

### User Interactions
- **Modal Triggering**: Button click opens the API key creation interface through state management
- **Navigation**: Header action link navigates to `/developers/api-keys` page

### No External API Calls
- This component is purely presentational and doesn't make direct API calls
- API key creation is handled by other components in the flow

## Dependencies

### Internal Components
- `Block` - UI wrapper component providing consistent layout and styling
- `Button` - UI button component with variant styling
- `Typography` - Text rendering component with design system integration
- `ApiComputer` - Custom illustration icon for empty state
- `PiKey2Line` - Phosphor icon for the header

### External Dependencies
- `useApiKeysStore` - Zustand store hook for API keys state management
- React hooks (`useCallback`) for performance optimization

## Integration

### Application Flow
```
Developer Dashboard → EmptyApiKeys → API Key Creation Modal
                                 ↓
                            API Keys Management Page
```

### Route Integration
- **Current Context**: Displayed within developer dashboard or API keys section
- **Navigation Target**: Links to `/developers/api-keys` for comprehensive management
- **Modal Integration**: Triggers API key creation flow without navigation

### Store Integration
- **State Coordination**: Works with `ApiKeysStore` to manage creation modal visibility
- **Event Flow**: User interaction → Store update → Modal component reaction

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Flat structure using Block as foundation  
✅ **State Management**: Proper Zustand usage for client state  
✅ **Reusability**: Built on reusable UI components from `/ui/`  
✅ **Client Component**: Appropriately marked as client component for interactivity  

### Performance Optimizations
- **Selective Store Access**: Only subscribes to needed store functions
- **Memoized Callbacks**: Uses `useCallback` for event handlers
- **Minimal Re-renders**: Efficient state selector patterns

### Design System Integration
- **Typography**: Uses design system typography with proper variants and colors
- **Spacing**: Consistent gap and padding following design tokens
- **Icons**: Integrates both Phosphor icons and custom illustrations
- **Button Variants**: Uses appropriate button styling (`neutralStroke`)

### User Experience
- **Clear Communication**: "No keys yet" message with appropriate styling
- **Obvious Actions**: Prominent creation button with clear labeling
- **Visual Hierarchy**: Proper use of icons, typography, and spacing for scanning