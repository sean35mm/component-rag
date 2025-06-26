# useTopicsAllResultsTable Hook

## Purpose

The `useTopicsAllResultsTable` hook configures and returns column definitions for displaying topics in a data table within the search results interface. It provides a comprehensive table structure with selection capabilities, category information, article counts with progress visualization, and filter actions for including/excluding topics from search results.

## Component Type

**Client Component Hook** - This hook uses client-side state management with Zustand stores (`useExploreStore`, `useFiltersDrawerStore`) and handles interactive user actions like row selection, filtering, and entity management. The `useMemo` optimization and interactive callbacks require client-side execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRowSelectionChange` | `ResultsTableProps<EntityCount>['onRowSelectionChange']` | Yes | Callback function triggered when table row selection changes |
| `sourcesStats` | `EntityCount[]` | No | Array of entity count statistics used for progress bar calculations and article count display |

## Usage Example

```tsx
import { useTopicsAllResultsTable } from '@/components/search/all-results/hooks/use-topics-all-results-table';
import { ResultsTable } from '@/components/ui/results-table';

const TopicsResultsPage = () => {
  const [selectedRows, setSelectedRows] = useState({});
  const [sourcesStats, setSourcesStats] = useState<EntityCount[]>([]);

  const { columns } = useTopicsAllResultsTable(
    setSelectedRows,
    sourcesStats
  );

  return (
    <ResultsTable
      data={topicsData}
      columns={columns}
      onRowSelectionChange={setSelectedRows}
      rowSelection={selectedRows}
    />
  );
};
```

## Functionality

### Core Features
- **Selectable Rows**: Checkbox-based row selection with avatar and name display
- **Category Display**: Primary and secondary category information with loading states
- **Progress Visualization**: Article count with progress bars relative to maximum counts
- **Filter Actions**: Include/exclude functionality with immediate filter application
- **Responsive Design**: Optimized column widths and text truncation

### Column Structure
1. **Name Column**: Checkbox, avatar, and topic name with selection handling
2. **Primary Category**: Displays topic's primary category with loading skeleton
3. **Secondary Category**: Shows topic's subcategory information
4. **Articles Count**: Progress bar and formatted count display
5. **Actions**: Include/exclude controls for search filtering

## State Management

### Zustand Stores
- **`useExploreStore`**: Manages entity addition/removal for exploration
- **`useFiltersDrawerStore`**: Handles filter state and application logic

### Local State
- **`useMemo`**: Optimizes column definitions based on dependencies
- **Row Selection**: Managed externally via `onRowSelectionChange` callback

## Side Effects

### Filter Application
```tsx
// Exclude action updates filters and removes entity
onFiltersApply({
  ...filters,
  excluded: [...filters.excluded, newExcludedItem]
});
onRemoveEntity(entity);
```

### Entity Management
- Adds/removes topics from exploration context
- Updates filter exclusion lists
- Resets row selection after actions

## Dependencies

### UI Components
- `Avatar`, `Checkbox`, `ExcludeInclude`, `Progress`, `Skeleton`, `Typography`
- `ResultsTable` (external integration)

### Hooks & Utilities
- `useTopics` - TanStack Query hook for category data
- `nFormatter` - Text formatting utility
- `@tanstack/react-table` - Table functionality

### Types
- `EntityCount`, `ExcludedFilterItemType` - Data structure types
- `ColumnDef` - Table column definition type

## Integration

### Search Results Architecture
```
SearchAllResults
├── TopicsAllResultsTable
│   └── useTopicsAllResultsTable ← Current Hook
├── SourcesAllResultsTable  
└── AuthorsAllResultsTable
```

### Data Flow
1. **Input**: Receives row selection handler and statistics data
2. **Processing**: Configures interactive table columns with filtering
3. **Output**: Returns column definitions for ResultsTable component
4. **Side Effects**: Updates global filter state and entity management

## Best Practices

### Architecture Adherence
- ✅ **Separation of Concerns**: Logic hook separated from UI components
- ✅ **State Management**: Proper use of Zustand for global state
- ✅ **Performance**: Memoized column definitions prevent unnecessary re-renders
- ✅ **Reusability**: Generic hook pattern adaptable for different entity types

### Implementation Patterns
- **Dependency Array**: Comprehensive memoization dependencies
- **Error Handling**: Graceful fallbacks for missing data
- **Loading States**: Skeleton components during data fetching
- **Accessibility**: Proper checkbox and interactive element handling

### Integration Guidelines
- Use with `ResultsTable` component for consistent table behavior
- Provide `sourcesStats` for progress visualization features
- Handle row selection state in parent component
- Ensure filter state synchronization across search interface