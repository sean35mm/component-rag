# useSourcesAllResultsTable Hook

## Purpose

The `useSourcesAllResultsTable` hook provides table configuration for displaying source data in the search results interface. It returns column definitions for a data table that displays news sources with their metadata, statistics, and filtering capabilities. This hook manages the complex table structure including selection checkboxes, source branding, bias indicators, article counts with progress visualization, and include/exclude actions.

## Component Type

**Client Component Hook** - This hook uses client-side state management through Zustand stores and handles user interactions like row selection and filter actions. It requires the 'use client' directive due to its dependency on interactive UI elements and state management.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRowSelectionChange` | `ResultsTableProps<Source>['onRowSelectionChange']` | Yes | Callback function triggered when table row selection changes |
| `sourcesStats` | `EntityCount[]` | No | Array of entity counts used to display article statistics and progress bars |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { useSourcesAllResultsTable } from '@/components/search/all-results/hooks/use-sources-all-results-table';
import { ResultsTable } from '@/components/ui/results-table';
import { Source, EntityCount } from '@/lib/types';

export function SourcesResultsTable({ 
  sources, 
  sourcesStats 
}: { 
  sources: Source[];
  sourcesStats?: EntityCount[];
}) {
  const [rowSelection, setRowSelection] = useState({});

  const { columns } = useSourcesAllResultsTable(
    setRowSelection,
    sourcesStats
  );

  return (
    <ResultsTable
      data={sources}
      columns={columns}
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
    />
  );
}
```

## Functionality

### Core Features

- **Source Information Display**: Shows source name with favicon, home base location, and official domain
- **Bias and Paywall Indicators**: Visual indicators for source bias rating and paywall status
- **Monthly Reach Metrics**: Displays formatted monthly visitor statistics
- **Article Count Visualization**: Progress bars showing relative article counts between sources
- **Row Selection**: Checkbox-based multi-selection for bulk operations
- **Filter Actions**: Include/exclude buttons for immediate filter application

### Column Definitions

1. **Source Name**: Favicon, checkbox, and source name with truncation
2. **Home Base**: Country location in uppercase format
3. **Official Site**: Domain with bias and paywall indicators
4. **Monthly Reach**: Formatted visitor count with team icon
5. **# of Articles**: Progress bar visualization with count
6. **Actions**: Include/exclude filter controls

## State Management

### Zustand Integration

- **Filter Store**: Uses `useFiltersDrawerStore` for managing search filters
- **Filter Actions**: Integrates with `onFiltersApply` for immediate filter updates
- **State Synchronization**: Coordinates between table selection and global filter state

### Local State

- **Column Memoization**: Uses `useMemo` to optimize column definitions based on dependencies
- **Dynamic Data**: Responds to changes in filters, sourcesStats, and callbacks

## Side Effects

### Filter Management

- **Exclude Actions**: Adds sources to excluded filters and removes from included sources
- **Include Actions**: Adds sources to included filters and removes from excluded sources
- **Selection Reset**: Clears table row selection after filter changes

### UI Updates

- **Progress Calculation**: Dynamically calculates progress bar values based on article counts
- **Icon Rendering**: Conditionally displays bias and paywall indicators
- **Text Formatting**: Applies number formatting and text truncation

## Dependencies

### UI Components

- `@tanstack/react-table` - Table functionality and column definitions
- `Checkbox`, `Progress`, `Typography` - Core UI components
- `BiasIcon`, `Favicon`, `ExcludeInclude` - Specialized display components
- `Dollar`, `PiTeamFill` - Icon components

### Utilities and Types

- `useFiltersDrawerStore` - Global filter state management
- `Source`, `EntityCount`, `ExcludedFilterItemType` - Type definitions
- `nFormatter` - Number formatting utility

### External Services

- Favicon service integration for source branding display

## Integration

### Search Results Architecture

```
SearchAllResults
├── SourcesResultsTable
│   ├── useSourcesAllResultsTable (this hook)
│   └── ResultsTable
├── FiltersDrawer
│   └── useFiltersDrawerStore
└── SearchResultsStats
```

### Data Flow

1. **Source Data**: Receives source array and statistics from parent components
2. **Filter Integration**: Connects to global filter state for include/exclude actions
3. **Selection Management**: Provides callbacks for row selection changes
4. **Statistics Visualization**: Transforms article counts into progress visualizations

## Best Practices

### Architecture Adherence

- ✅ **Separation of Concerns**: Hook focuses solely on table configuration logic
- ✅ **State Management**: Proper use of Zustand for global filter state
- ✅ **Memoization**: Optimizes column definitions with dependency-based memoization
- ✅ **Type Safety**: Full TypeScript integration with proper type definitions

### Performance Optimization

- **Memoized Columns**: Prevents unnecessary re-renders of table structure
- **Conditional Rendering**: Only renders progress bars when statistics are available
- **Efficient Filtering**: Uses Set operations for deduplication in filter arrays

### User Experience

- **Visual Hierarchy**: Clear information presentation with appropriate typography
- **Interactive Elements**: Intuitive include/exclude actions with immediate feedback
- **Progressive Enhancement**: Graceful handling of missing data (sourcesStats)
- **Accessibility**: Proper checkbox labeling and keyboard navigation support