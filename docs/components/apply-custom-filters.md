# CustomFiltersDrawer Component

## Purpose
The `CustomFiltersDrawer` component serves as a specialized wrapper for filter management within the signal creation workflow. It bridges the gap between the generic `FiltersDrawerContainer` component and the signal creation context, handling the application of both custom filters and saved filter presets while updating the appropriate state in the signal creation store.

## Component Type
**Client Component** - Uses the `'use client'` directive (implied by useState and useCallback hooks) because it:
- Manages local state for pending filter applications
- Handles user interactions and callbacks
- Integrates with Zustand store that requires client-side state management

## Props Interface
| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| None | - | - | - | This component accepts no props and manages all state internally |

## Usage Example
```tsx
import { CustomFiltersDrawer } from '@/components/signals/creation/custom-filters/apply-custom-filters';

function SignalCreationPage() {
  return (
    <div className="signal-creation-container">
      <h1>Create New Signal</h1>
      
      {/* Other signal creation components */}
      
      <CustomFiltersDrawer />
    </div>
  );
}

// Usage within signal creation workflow
function CreateSignalProvider({ children }: { children: React.ReactNode }) {
  return (
    <CreateSignalStoreProvider>
      {children}
      <CustomFiltersDrawer />
    </CreateSignalStoreProvider>
  );
}
```

## Functionality
- **Filter Application Management**: Handles the application of both custom filters and saved filter presets
- **State Synchronization**: Updates the signal creation store with applied filter names and preset IDs
- **Preset Handling**: Manages the selection and application of saved filter presets
- **Custom Filter Support**: Allows application of ad-hoc custom filters without preset association
- **Pending State Management**: Tracks filters that are selected but not yet applied

## State Management
### Zustand Store Integration
- **`setAppliedFiltersName`**: Updates the display name for currently applied filters
- **`setSavedFilterPresetId`**: Sets the ID of the applied preset (null for custom filters)

### Local State
- **`pendingToApplySavedFilter`**: Tracks the saved filter that is selected but not yet applied

```tsx
// Store actions used
const setAppliedFiltersName = useCreateSignalStore(state => state.setAppliedFiltersName);
const setSavedFilterPresetId = useCreateSignalStore(state => state.setSavedFilterPresetId);

// Local state for pending operations
const [pendingToApplySavedFilter, setPendingToApplySavedFilter] = useState<SavedFilter | null>(null);
```

## Side Effects
- **Store Updates**: Modifies the signal creation store when filters are applied
- **Filter Name Assignment**: Automatically sets filter names based on preset selection or defaults to "Custom filters"
- **Preset ID Management**: Associates or disassociates filter applications with saved presets

## Dependencies
### Components
- **`FiltersDrawerContainer`**: Core filter management UI component from `@/components/filters/filters-drawer`

### Hooks & Contexts
- **`useCreateSignalStore`**: Zustand store hook from `@/lib/contexts/create-signal-provider`

### Types
- **`FiltersState`**: Type definition for filter state structure
- **`SavedFilter`**: Type definition for saved filter presets

## Integration
### Signal Creation Workflow
The component integrates into the signal creation process by:
1. Providing filter management capabilities during signal setup
2. Persisting filter selections in the creation store for later use
3. Enabling both custom and preset-based filtering approaches

### Architecture Alignment
- **Domain-Specific**: Located in signals creation domain following our component organization
- **State Integration**: Properly uses Zustand for cross-component state management
- **Composition Pattern**: Acts as a specialized wrapper around generic filter components

## Best Practices
### ✅ Follows Our Guidelines
- **Proper State Management**: Uses Zustand for shared state, local state for component-specific concerns
- **Component Decomposition**: Wraps and specializes generic `FiltersDrawerContainer` for specific use case
- **Callback Optimization**: Uses `useCallback` to prevent unnecessary re-renders
- **Domain Organization**: Correctly placed in signals creation feature directory

### 🔧 Implementation Patterns
```tsx
// Proper callback memoization
const handleApplyFilters = useCallback(
  (_: FiltersState, isPresetApplied?: boolean) => {
    // Logic depends on stable references
  },
  [setAppliedFiltersName, setSavedFilterPresetId, pendingToApplySavedFilter]
);

// Clear state management separation
// Store state: persistent across component lifecycle
// Local state: temporary, component-specific
```

### 💡 Usage Recommendations
- Always use within `CreateSignalStoreProvider` context
- Consider the component's side effects when integrating into forms
- Monitor store state changes if other components depend on applied filter information
- Use component's automatic naming for consistent user experience