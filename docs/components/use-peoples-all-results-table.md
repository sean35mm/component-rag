# usePeoplesAllResultsTable Hook

## Purpose

A custom React hook that provides table column configuration for displaying people (Person entities) in search results. This hook generates TanStack React Table column definitions with interactive features including selection, filtering, and entity management for people data.

## Component Type

**Client Component Hook** - This hook must run on the client side because it:
- Uses complex state management with multiple Zustand stores
- Handles interactive table operations (selection, filtering)
- Manages click handlers and user interactions
- Integrates with client-side routing and state updates

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRowSelectionChange` | `ResultsTableProps<Person>['onRowSelectionChange']` | ✅ | Callback function to handle table row selection changes |
| `sourcesStats` | `EntityCount[]` | ❌ | Optional array of entity counts used to display article statistics with progress bars |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { usePeoplesAllResultsTable } from '@/components/search/all-results/hooks/use-peoples-all-results-table';
import { ResultsTable } from '@/components/ui/results-table';
import { Person } from '@/lib/types';

function PeopleSearchResults({ people, sourcesStats }) {
  const [rowSelection, setRowSelection] = useState({});

  const { columns } = usePeoplesAllResultsTable(
    setRowSelection,
    sourcesStats
  );

  return (
    <ResultsTable<Person>
      data={people}
      columns={columns}
      onRowSelectionChange={setRowSelection}
      rowSelection={rowSelection}
    />
  );
}
```

## Functionality

### Core Features
- **Multi-column Table Layout**: Provides structured columns for person data display
- **Row Selection**: Checkbox-based selection system for bulk operations
- **Avatar Display**: Visual representation of people with fallback handling
- **Progress Visualization**: Article count display with relative progress bars
- **Entity Management**: Include/exclude actions for search filtering
- **Responsive Design**: Optimized layout with proper text truncation

### Column Structure
1. **Name Column**: Avatar, checkbox selection, and person name
2. **Known For Column**: Person description/occupation
3. **Articles Count Column**: Statistical data with progress visualization
4. **Actions Column**: Include/exclude controls for filtering

## State Management

### Zustand Store Integration
- **`useExploreStore`**: Manages entity addition/removal for exploration features
- **`useFiltersDrawerStore`**: Handles filter state and application logic

### Local State
- Uses `useMemo` for column definition optimization
- Manages table selection state through parent component callback

## Side Effects

### Filter Operations
- **Entity Inclusion**: Adds person to active exploration entities
- **Entity Exclusion**: Removes person and adds to excluded filters list
- **Selection Reset**: Clears table selection after filter operations

### State Updates
- Updates global filter state when including/excluding entities
- Synchronizes exploration state with filter drawer state
- Triggers re-renders based on dependency changes

## Dependencies

### UI Components
- `Avatar` - Person image display
- `Checkbox` - Row selection controls
- `ExcludeInclude` - Action buttons for filtering
- `Progress` - Visual statistics display
- `Typography` - Consistent text styling

### External Libraries
- `@tanstack/react-table` - Table functionality and types
- React hooks (`useMemo`) - Performance optimization

### Internal Dependencies
- Store contexts for state management
- Type definitions (`Person`, `EntityCount`, `ExcludedFilterItemType`)
- Utility functions (`nFormatter`)

## Integration

### Search Results Architecture
```
SearchResultsPage
├── PeopleSearchResults
│   ├── usePeoplesAllResultsTable (this hook)
│   └── ResultsTable<Person>
└── Other result type components
```

### Data Flow
1. **Parent Component** → Provides people data and statistics
2. **Hook** → Generates column configuration with handlers
3. **ResultsTable** → Renders interactive table with data
4. **Store Actions** → Updates global application state

## Best Practices

### Architectural Compliance
- ✅ **Proper State Management**: Uses Zustand for global state, local state for UI
- ✅ **Component Decomposition**: Separates table logic from presentation
- ✅ **Reusable Patterns**: Follows consistent table hook pattern
- ✅ **Performance Optimization**: Memoizes expensive column calculations

### Code Quality
- **Dependency Management**: Comprehensive dependency array for `useMemo`
- **Type Safety**: Full TypeScript integration with proper generics
- **Error Handling**: Graceful fallbacks for missing data
- **Accessibility**: Proper ARIA attributes and semantic structure

### Integration Patterns
- **Store Integration**: Clean separation between different store responsibilities
- **Event Handling**: Consistent callback patterns for parent communication
- **Data Transformation**: Proper entity mapping for different contexts
- **UI Consistency**: Follows established design system patterns

This hook exemplifies the application's approach to complex table management, providing a clean interface for data presentation while maintaining tight integration with the global state management system.