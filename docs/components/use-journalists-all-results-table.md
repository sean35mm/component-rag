# useJournalistsAllResultsTable Hook

## Purpose

The `useJournalistsAllResultsTable` hook provides table configuration and column definitions for displaying journalist search results in a data table. It manages journalist data presentation, selection handling, and filter operations within the search results interface, enabling users to view, select, and include/exclude journalists from their search criteria.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its dependencies on interactive UI components (Checkbox, ExcludeInclude) and client-side state management (Zustand store). The hook manages table interactions, row selection, and filter state updates that require client-side reactivity.

## Props Interface

### useJournalistsAllResultsTable

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRowSelectionChange` | `ResultsTableProps<EntityCount>['onRowSelectionChange']` | Yes | Callback function triggered when table row selection changes |
| `sourcesStats` | `EntityCount[]` | No | Array of entity statistics used to calculate relative article counts and progress indicators |

### TitleEntity

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `journalistId` | `string` | Yes | Unique identifier for the journalist to display title information |

### AvatarEntity

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `journalistId` | `string` | Yes | Unique identifier for the journalist to display avatar and name information |

## Usage Example

```tsx
import { useJournalistsAllResultsTable } from '@/components/search/all-results/hooks/use-journalists-all-results-table';
import { ResultsTable } from '@/components/ui/results-table';

function JournalistsResultsTable() {
  const [rowSelection, setRowSelection] = useState({});
  const sourcesStats = [
    { key: 'journalist-1', count: 150 },
    { key: 'journalist-2', count: 89 },
    { key: 'journalist-3', count: 45 }
  ];

  const { columns } = useJournalistsAllResultsTable(
    setRowSelection,
    sourcesStats
  );

  const journalistData = [
    { key: 'journalist-1', name: 'John Smith', count: 150 },
    { key: 'journalist-2', name: 'Jane Doe', count: 89 },
    { key: 'journalist-3', name: 'Bob Johnson', count: 45 }
  ];

  return (
    <ResultsTable
      data={journalistData}
      columns={columns}
      onRowSelectionChange={setRowSelection}
      rowSelection={rowSelection}
    />
  );
}

// Using individual entity components
function CustomJournalistDisplay({ journalistId }: { journalistId: string }) {
  return (
    <div className="journalist-info">
      <AvatarEntity journalistId={journalistId} />
      <TitleEntity journalistId={journalistId} />
    </div>
  );
}
```

## Functionality

### Core Features

- **Column Configuration**: Provides standardized column definitions for journalist data tables
- **Row Selection**: Manages checkbox selection for individual journalists
- **Visual Data Representation**: Displays journalist avatars, names, titles, and article statistics
- **Progress Indicators**: Shows relative article counts using progress bars
- **Filter Integration**: Handles include/exclude operations for search filtering
- **Loading States**: Provides skeleton loading UI during data fetching

### Column Structure

1. **Name Column**: Checkbox selection + journalist avatar and name
2. **Title Column**: Journalist's professional title
3. **Articles Column**: Article count with progress visualization
4. **Actions Column**: Include/exclude filter controls

## State Management

### Zustand Store Integration
- **useFiltersDrawerStore**: Manages global filter state including journalist selections and exclusions
- **Filter Operations**: Handles adding/removing journalists from include and exclude lists
- **State Synchronization**: Updates filter state and clears row selection on filter changes

### Local State
- **Row Selection**: Managed through TanStack Table's built-in selection system
- **Column Memoization**: Uses `useMemo` to optimize column definition performance

## Side Effects

### Filter Updates
- **Include Operation**: Adds journalist to filters and removes from excluded list
- **Exclude Operation**: Adds journalist to excluded list and removes from active filters
- **Selection Reset**: Clears row selection after filter operations

### Data Fetching
- **Journalist Details**: Fetches individual journalist data for avatar and title display
- **Lazy Loading**: Only loads journalist details when components are rendered

## Dependencies

### UI Components
- `Avatar` - Profile image and name display
- `Checkbox` - Row selection controls
- `ExcludeInclude` - Filter action buttons
- `Progress` - Article count visualization
- `Skeleton` - Loading state placeholders
- `Typography` - Text styling and formatting

### Hooks and Services
- `useJournalistById` - Fetches individual journalist data
- `useFiltersDrawerStore` - Global filter state management
- `@tanstack/react-table` - Table functionality and types

### Utilities
- `nFormatter` - Number formatting for large article counts
- `EntityCount` - Type definition for statistical data
- `ExcludedFilterItemType` - Enum for filter categorization

## Integration

### Search Results Architecture
- **All Results View**: Primary integration point for journalist search results
- **Filter System**: Seamlessly integrates with global search filter state
- **Results Table**: Designed for use with the standardized ResultsTable component

### Data Flow
1. **Statistics Input**: Receives journalist statistics for progress calculations
2. **Selection Handling**: Manages row selection through callback system
3. **Filter Updates**: Applies filter changes through centralized store
4. **UI Updates**: Triggers re-renders through state changes

## Best Practices

### Architecture Adherence
- ✅ **Separation of Concerns**: Separates table logic from UI presentation
- ✅ **Reusable Components**: Exports individual entity components for flexible usage
- ✅ **State Management**: Uses appropriate Zustand store for global filter state
- ✅ **Performance**: Implements proper memoization for column definitions

### Code Quality
- ✅ **Type Safety**: Full TypeScript integration with proper type definitions
- ✅ **Error Handling**: Graceful handling of loading and undefined states
- ✅ **Accessibility**: Proper checkbox and button interactions
- ✅ **Responsive Design**: Flexible layout accommodating various screen sizes

### Integration Patterns
- ✅ **Hook Pattern**: Follows custom hook conventions for reusable logic
- ✅ **Component Composition**: Provides building blocks for complex table structures
- ✅ **Data Transformation**: Handles statistics processing and progress calculations
- ✅ **Filter Integration**: Seamlessly integrates with application-wide filtering system