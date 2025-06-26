# ConnectedAppList Component Documentation

## Purpose

The `ConnectedAppList` component displays a grid of connected applications/connectors available to the user. It serves as the main interface for users to view and manage their app integrations within the settings section. The component handles loading states, error scenarios, and provides visual feedback for different environment modes.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through the `useConnectors` hook
- Conditionally renders content based on loading and error states
- Requires client-side context consumption (`useFastnEnv`)

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { ConnectedAppList } from '@/components/settings/connected-apps/connected-app-list';

// Basic usage in a settings page
export default function ConnectedAppsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Connected Applications</h1>
      <ConnectedAppList />
    </div>
  );
}

// Usage within a settings layout
export function SettingsConnectedApps() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold">Manage Your Connections</h2>
        <p className="text-muted-foreground">
          Connect and manage third-party applications
        </p>
      </div>
      <ConnectedAppList />
    </div>
  );
}
```

## Functionality

### Core Features
- **Grid Layout**: Responsive grid that adapts from 1 column (mobile) to 4 columns (xl screens)
- **Loading States**: Shows skeleton placeholders while data is being fetched
- **Error Handling**: Displays user-friendly error messages when data fetching fails
- **Empty States**: Shows "No connectors found" message when no data is available
- **Environment Awareness**: Displays draft mode warning in development environments

### Visual Behaviors
- Skeleton loaders maintain consistent sizing (275px min-width, 300px max-width)
- Grid items are centered and evenly spaced with 4-unit gaps
- Draft mode warning appears as red text above the grid

## State Management

**External State Management**:
- Uses `useConnectors()` hook from `@fastn-ai/react` for server state management
- Leverages `useFastnEnv()` context for environment configuration
- No local state management required

**Data Flow**:
```
useConnectors() → { connectors, loading, error }
useFastnEnv() → FastnEnv enum value
↓
Conditional rendering based on state
```

## Side Effects

### Data Fetching
- **Primary Effect**: Fetches connector data through `useConnectors()` hook
- **No Direct API Calls**: Relies on the hook's internal data fetching mechanism
- **Automatic Updates**: Data updates are handled by the underlying hook implementation

### Environment Detection
- Reads current environment configuration to show/hide draft warnings
- No side effects, purely reactive to context changes

## Dependencies

### Internal Dependencies
```tsx
// UI Components
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';

// Child Components
import { ConnectedAppItem } from './connected-app-item';

// Contexts & Types
import { useFastnEnv } from '@/lib/contexts';
import { FastnEnv } from '@/lib/types';
```

### External Dependencies
```tsx
// Third-party hooks
import { useConnectors } from '@fastn-ai/react';
```

### Component Relationships
- **Parent of**: `ConnectedAppItem` - renders individual connector cards
- **Sibling to**: Other settings components in the connected-apps domain
- **Consumer of**: UI components from the design system

## Integration

### Application Architecture
```
Settings Layout
└── Connected Apps Section
    ├── ConnectedAppList (this component)
    │   └── ConnectedAppItem (multiple instances)
    └── Other settings components
```

### Data Architecture
- **Data Source**: Fastn AI platform via `@fastn-ai/react` SDK
- **State Layer**: Hook-managed server state with built-in caching
- **Environment Layer**: Context-provided environment configuration

### Routing Integration
- Typically rendered at `/settings/connected-apps` or similar routes
- Works within any parent container or layout component
- No internal routing dependencies

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Properly delegates individual item rendering to `ConnectedAppItem`
✅ **State Management**: Uses appropriate external hooks rather than managing server state locally
✅ **Client Component Usage**: Justified use of client component for interactive features
✅ **Error Handling**: Implements proper error boundaries and user feedback

### Performance Considerations
✅ **Efficient Rendering**: Uses React keys for list items to optimize re-renders
✅ **Loading States**: Provides immediate visual feedback during data fetching
✅ **Responsive Design**: Grid layout adapts efficiently across screen sizes

### Code Quality
✅ **TypeScript**: Properly typed with external hook interfaces
✅ **Accessibility**: Uses semantic HTML structure with proper spacing
✅ **Maintainability**: Clear separation of concerns and readable conditional logic

### Recommended Patterns
- Always wrap in error boundaries when used in larger applications
- Consider memoization if parent components re-render frequently
- Use consistent skeleton count (6) that works well across different screen sizes