# CustomFilters Component

## Purpose
The `CustomFilters` component provides a complete filtering interface for signal creation workflows. It orchestrates a filter drawer, trigger button, and clear functionality to enable users to apply and manage custom filters on data sets. This component serves as the main entry point for the custom filtering feature within the signals creation flow.

## Component Type
**Server Component** - This component renders static JSX without requiring client-side interactivity at the top level. While its child components (`CustomFiltersDrawer`, `TriggerButton`, `ClearFiltersButton`) may be Client Components that handle user interactions, the parent container itself can remain as a Server Component following our architecture guidelines.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `triggerClassName` | `string` | No | `undefined` | Additional CSS classes to apply to the trigger button for custom styling |

## Usage Example

```tsx
// Basic usage in a signals creation page
import { CustomFilters } from '@/components/signals/creation/custom-filters/custom-filters';

export function SignalsCreationPage() {
  return (
    <div className="signals-creation-container">
      <h1>Create Signal</h1>
      
      {/* Filter controls section */}
      <div className="filter-section">
        <CustomFilters />
      </div>
      
      {/* Data display area */}
      <div className="data-section">
        {/* Filtered data would be displayed here */}
      </div>
    </div>
  );
}

// Usage with custom trigger styling
export function CompactFiltersView() {
  return (
    <div className="compact-view">
      <CustomFilters triggerClassName="btn-sm bg-secondary" />
    </div>
  );
}

// Integration with other signal creation components
export function SignalCreationWorkflow() {
  return (
    <div className="creation-workflow">
      <div className="toolbar flex justify-between items-center">
        <h2>Configure Filters</h2>
        <CustomFilters triggerClassName="ml-auto" />
      </div>
      
      {/* Other workflow steps */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Filter Drawer Management**: Renders and manages the custom filters drawer interface
- **Action Controls**: Provides trigger and clear buttons for filter operations
- **Flexible Layout**: Arranges filter controls in a horizontal layout with proper spacing
- **Styling Customization**: Allows custom styling of the trigger button through props

### User Interactions
- **Filter Activation**: Users can trigger the filters drawer to configure custom filters
- **Filter Clearing**: Users can clear all applied filters with a dedicated clear button
- **Visual Feedback**: Provides clear visual separation between filter controls

## State Management

This component follows our **decomposed state management** pattern:
- **No Direct State**: The component itself doesn't manage state, delegating to child components
- **Child Component State**: Each child component manages its own relevant state:
  - `CustomFiltersDrawer`: Likely uses Zustand for drawer open/closed state and filter configurations
  - `TriggerButton`: May use local state for button interactions
  - `ClearFiltersButton`: Handles clear operations, possibly interacting with global filter state

## Side Effects

### Direct Side Effects
- **None at component level** - Side effects are handled by child components

### Child Component Side Effects
- **Filter Application**: `CustomFiltersDrawer` likely triggers API calls when filters are applied
- **State Updates**: Filter changes may update global application state
- **URL Updates**: Filter states might be reflected in URL parameters for bookmarking

## Dependencies

### Internal Components
```tsx
import { CustomFiltersDrawer } from './apply-custom-filters';
import { ClearFiltersButton } from './clear-filters-button';
import { TriggerButton } from './trigger-button';
```

### Expected Child Component Responsibilities
- **CustomFiltersDrawer**: Renders filter configuration UI, manages filter state
- **TriggerButton**: Handles drawer opening, displays current filter status
- **ClearFiltersButton**: Manages filter clearing operations

### Potential External Dependencies
- **Filter Store**: Zustand store for managing filter state across components
- **API Services**: For fetching filterable data and applying server-side filters
- **UI Components**: Shared UI components from `/ui/` directory

## Integration

### Application Architecture Role
```
SignalsCreationPage
├── FilterSection
│   └── CustomFilters ← Entry point for filtering
│       ├── CustomFiltersDrawer (filter configuration)
│       ├── TriggerButton (activation)
│       └── ClearFiltersButton (reset)
├── DataVisualization (consumes filter state)
└── CreationActions
```

### Data Flow
1. **Filter Configuration**: User interacts with `CustomFiltersDrawer` to set filters
2. **State Propagation**: Filter state updates flow to global store
3. **Data Refresh**: Other components react to filter changes and update displays
4. **URL Synchronization**: Filter state may sync with browser URL

## Best Practices

### Architecture Adherence
✅ **Server Component Default**: Uses Server Component unless client interactivity needed  
✅ **Component Decomposition**: Flat structure with focused child components  
✅ **Domain Organization**: Located in signals/creation domain-specific path  
✅ **Separation of Concerns**: Each child component has a single responsibility  

### Usage Recommendations
- **Consistent Styling**: Use `triggerClassName` for contextual styling needs
- **State Management**: Ensure child components use appropriate state management (Zustand for shared filter state)
- **Error Handling**: Implement error boundaries around filter operations
- **Performance**: Consider memoization if filter configurations are complex

### Integration Patterns
```tsx
// Recommended: Use with proper error boundaries
<ErrorBoundary fallback={<FilterErrorFallback />}>
  <CustomFilters triggerClassName="custom-styling" />
</ErrorBoundary>

// Recommended: Integrate with loading states
<Suspense fallback={<FiltersSkeleton />}>
  <CustomFilters />
</Suspense>
```

This component exemplifies our Lego-block architecture by composing focused child components into a cohesive filtering interface while maintaining clear separation of concerns and following our Server Component default pattern.