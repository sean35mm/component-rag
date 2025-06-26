# ArticlesChart Component

## Purpose
The `ArticlesChart` component renders a visual chart displaying article count data and source statistics for signal previews. It serves as a specialized wrapper around the `DetailsChart` component, specifically configured for displaying signal-related metrics in a compact format suitable for preview contexts.

## Component Type
**Client Component** - Uses the `'use client'` directive because it:
- Manages client-side state through multiple React hooks
- Performs data fetching with TanStack Query hooks
- Handles dynamic prop calculations with `useMemo`
- Requires browser-side interactivity for chart rendering

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `SignalPreview` | Yes | Signal data object containing configuration and metadata for chart generation |
| `notificationPolicyType` | `NotificationPolicyEnum` | Yes | Policy type that determines notification behavior and chart styling |

## Usage Example

```tsx
import { ArticlesChart } from '@/components/signals/preview/articles-chart';
import { NotificationPolicyEnum } from '@/lib/types';

function SignalDashboard() {
  const signalData = {
    id: 'signal-123',
    name: 'Tech News Signal',
    query: 'technology AND innovation',
    dateRange: { start: '2024-01-01', end: '2024-01-31' }
  };

  return (
    <div className="signal-preview-container">
      <ArticlesChart
        signal={signalData}
        notificationPolicyType={NotificationPolicyEnum.IMMEDIATE}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Data Visualization**: Renders article count trends over time intervals
- **Source Statistics**: Displays total source count information
- **Compact Display**: Optimized for preview contexts with small size configuration
- **Policy-Aware Styling**: Adapts appearance based on notification policy type
- **Conditional Rendering**: Only renders when required data is available

### Chart Configuration
- Small size format (`size='sm'`) for preview contexts
- Custom dot styling with small size indicators
- Medium paragraph typography for titles
- Small footer sizing for compact display
- Disabled x-axis line for cleaner appearance
- Auto height adjustment with `h-auto` class

## State Management

### TanStack Query Integration
- **`useIntervalArticleCounts`**: Fetches article count data over time intervals
- **`useTopEntitiesCounts`**: Retrieves source count statistics with dynamic parameters
- Implements proper loading states and conditional rendering based on data availability

### Local State
- **`useMemo`** optimization for `sourcesCountParams` to prevent unnecessary re-computations
- Derived state from `useSignalArticlesIntervalData` hook for interval configuration

## Side Effects

### Data Fetching
- Automatically fetches article count data when component mounts
- Retrieves source statistics with dynamically generated parameters
- Updates data when signal or interval parameters change

### Performance Optimizations
- Memoized parameter calculations to reduce re-renders
- Conditional rendering to avoid unnecessary DOM updates when data is unavailable

## Dependencies

### Custom Hooks
- `useSignalArticlesIntervalData`: Provides signal-specific interval data and parameters
- `useIntervalArticleCounts`: TanStack Query hook for article count data
- `useTopEntitiesCounts`: TanStack Query hook for entity statistics

### Components
- `DetailsChart`: Core chart component that handles actual visualization rendering

### Services & Types
- `GetTopEntitiesParams`: Type definition for entity query parameters
- `NotificationPolicyEnum`: Enumeration for notification policy types
- `SignalPreview`: Type definition for signal data structure

## Integration

### Application Architecture
- **Domain-Specific Component**: Located in `/signals/preview/` following domain-based organization
- **Composition Pattern**: Acts as a specialized wrapper around the reusable `DetailsChart` component
- **Data Layer Integration**: Connects signal data with visualization layer through query hooks

### Component Hierarchy
```
ArticlesChart (Preview Wrapper)
├── useSignalArticlesIntervalData (Data Processing)
├── useIntervalArticleCounts (Article Data)
├── useTopEntitiesCounts (Source Data)
└── DetailsChart (Visualization Core)
```

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for hooks and interactivity
- ✅ **Component Decomposition**: Leverages existing `DetailsChart` component rather than duplicating visualization logic
- ✅ **State Management**: Uses TanStack Query for server state management following architectural guidelines
- ✅ **Domain Organization**: Located in feature-specific directory structure

### Performance Patterns
- ✅ **Memoization**: Optimizes parameter calculations with `useMemo`
- ✅ **Conditional Rendering**: Prevents unnecessary renders when data is unavailable
- ✅ **Prop Configuration**: Passes optimized props for preview context performance

### Reusability Design
- ✅ **Specialized Wrapper**: Creates domain-specific interface while reusing core chart functionality
- ✅ **Type Safety**: Strongly typed props interface with required validation
- ✅ **Flexible Configuration**: Adapts behavior based on notification policy type