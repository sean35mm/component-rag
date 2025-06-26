# useCompaniesAllResultsTable Hook

## Purpose

The `useCompaniesAllResultsTable` hook provides table configuration for displaying company search results in a comprehensive data table. It creates column definitions with interactive features including row selection, company actions (exclude/include), and article statistics visualization for the all-results search interface.

## Component Type

**Client Component Hook** - This hook uses client-side state management (Zustand stores) and interactive features like checkboxes and click handlers that require browser APIs and event handling.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onRowSelectionChange` | `ResultsTableProps<Company>['onRowSelectionChange']` | Yes | Callback function triggered when table row selection state changes |
| `sourcesStats` | `EntityCount[]` | No | Optional array of entity counts used to display article statistics and progress bars |

## Usage Example

```tsx
import { useCompaniesAllResultsTable } from '@/components/search/all-results/hooks/use-companies-all-results-table';
import { ResultsTable } from '@/components/ui/results-table';

function CompaniesAllResultsPage() {
  const [rowSelection, setRowSelection] = useState({});
  const [companiesData, setCompaniesData] = useState<Company[]>([]);
  const [sourcesStats, setSourcesStats] = useState<EntityCount[]>([]);

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setRowSelection(selection);
  }, []);

  const { columns } = useCompaniesAllResultsTable(
    handleRowSelectionChange,
    sourcesStats
  );

  return (
    <div className="companies-results">
      <ResultsTable
        data={companiesData}
        columns={columns}
        onRowSelectionChange={handleRowSelectionChange}
        rowSelection={rowSelection}
      />
    </div>
  );
}
```

## Functionality

### Core Features

- **Interactive Table Columns**: Creates standardized column definitions for company data display
- **Row Selection**: Integrated checkbox selection with state management
- **Company Information Display**: Shows name, industry, official site, and favicon
- **Article Statistics**: Visual progress bars showing relative article counts per company
- **Filter Actions**: Exclude/Include functionality with immediate filter application
- **Data Formatting**: Handles missing data gracefully with fallback values

### Column Structure

1. **Name Column**: Company name with favicon, checkbox selection
2. **Known For Column**: Industry/description information  
3. **Official Site Column**: Primary domain display
4. **Articles Column**: Article count with progress visualization
5. **Actions Column**: Exclude/Include controls

## State Management

### Zustand Stores Integration

- **useExploreStore**: Manages entity selection state
  - `onAddEntity`: Adds companies to exploration context
  - `onRemoveEntity`: Removes companies from exploration context

- **useFiltersDrawerStore**: Manages filter state
  - `filters`: Current filter configuration
  - `onFiltersApply`: Applies filter changes with exclusions

### Local State

- Uses `useMemo` for column definition optimization
- Reactive updates based on store state changes

## Side Effects

### Filter Management
- Modifies global filter state when excluding/including companies
- Updates excluded items list with company-specific exclusions
- Clears row selection after filter actions

### Entity Management
- Adds/removes companies from exploration context
- Maintains entity metadata (name, description, icon, type)

## Dependencies

### UI Components
- `@/components/ui/checkbox` - Row selection checkboxes
- `@/components/ui/exclude-include` - Action buttons
- `@/components/ui/favicon` - Company favicon display
- `@/components/ui/progress` - Article count visualization
- `@/components/ui/typography` - Text rendering
- `@/components/ui/results-table` - Table infrastructure

### External Libraries
- `@tanstack/react-table` - Table column definitions
- `react` - Hook functionality

### Internal Dependencies
- `@/lib/contexts` - Zustand store hooks
- `@/lib/types` - TypeScript interfaces
- `@/lib/utils/text` - Number formatting utilities

## Integration

### Search Results Architecture
- Integrates with all-results search interface
- Works with `ResultsTable` component for consistent display
- Connects to global filter and exploration systems

### Data Flow
1. Receives company data and statistics from parent components
2. Creates interactive column definitions
3. Handles user interactions (selection, filtering)
4. Updates global application state through Zustand stores

## Best Practices

### Architecture Adherence
- ✅ **Single Responsibility**: Focused solely on table configuration
- ✅ **State Management**: Proper use of Zustand for global state
- ✅ **Component Decomposition**: Leverages UI components for consistent styling
- ✅ **Reusability**: Generic hook pattern for table configuration

### Performance Optimizations
- Uses `useMemo` for column definitions to prevent unnecessary re-renders
- Efficient dependency array management
- Optimized callback handling in cell renderers

### Error Handling
- Graceful handling of missing company data
- Fallback values for undefined properties
- Safe array access patterns

### Type Safety
- Full TypeScript integration with proper generic typing
- Consistent interface definitions
- Type-safe store integrations