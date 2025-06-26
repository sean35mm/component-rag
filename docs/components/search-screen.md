# SearchScreen Component

## Purpose

The `SearchScreen` component serves as the main interface for the search functionality, providing a comprehensive search experience with smart input, tabbed results views, and integrated filtering capabilities. It acts as the central hub for search operations, combining overview and detailed results presentation with responsive design patterns.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through multiple Zustand stores
- Handles responsive breakpoint detection
- Manages complex user interactions across tabs and filters
- Requires side effects for state synchronization

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes for styling customization |
| `onChangeSavedFilterId` | `(id?: string) => void` | Optional | Callback function triggered when saved filter selection changes |

## Usage Example

```tsx
import { SearchScreen } from '@/components/search/search-screen';

// Basic usage
function SearchPage() {
  return (
    <div className="container mx-auto">
      <SearchScreen />
    </div>
  );
}

// With saved filter tracking
function AdvancedSearchPage() {
  const handleFilterChange = (filterId?: string) => {
    console.log('Active filter changed:', filterId);
    // Track analytics, update URL, etc.
  };

  return (
    <SearchScreen 
      className="min-h-screen bg-background"
      onChangeSavedFilterId={handleFilterChange}
    />
  );
}
```

## Functionality

### Core Features
- **Responsive Search Input**: Automatically switches between desktop and mobile search interfaces
- **Tabbed Results View**: Provides "Overview" and "All Results" tabs for different data presentations
- **Date Range Selection**: Integrated date picker with preset options (desktop only)
- **Filter Integration**: Seamless connection with filters drawer system
- **First-time User Experience**: Includes modal for new user onboarding

### Responsive Behavior
- **Mobile**: Uses `SmartSearchInputMobile` with simplified interface
- **Desktop**: Full-featured `SmartSearchInput` with date picker sidebar
- **Breakpoint**: Switches at `lg` breakpoint (1024px)

### Tab Management
- **Overview Tab**: Displays `SearchOverview` component with summarized results
- **All Results Tab**: Shows `SearchAllResults` with comprehensive data listing
- **Persistent State**: Maintains tab selection across navigation

## State Management

### Zustand Stores
- **`useExploreStore`**: Manages search parameters and date range
  - `onSetDateRange`: Updates date filter
  - `from`, `to`: Date range values
- **`useFiltersDrawerStore`**: Handles filter drawer state
  - `selectedSavedFilterId`: Currently active saved filter
- **`useAccessToken`**: Provides authentication context
  - `isPublic`: Determines feature availability

### State Flow
```typescript
// Date range management
const dateRange = useMemo(
  () => from 
    ? { from, ...(to ? { to } : {}) }
    : defaultPresets[4].range(new Date()),
  [from, to]
);
```

## Side Effects

### Filter Synchronization
```typescript
useEffect(() => {
  onChangeSavedFilterId?.(selectedSavedFilterId);
}, [selectedSavedFilterId, onChangeSavedFilterId]);
```

**Purpose**: Synchronizes internal filter state with parent component callbacks for external state management or analytics tracking.

## Dependencies

### UI Components
- `DatePickerWithRange`: Date selection with preset ranges
- `Tabs`, `TabsContent`, `TabsList`, `TabsTrigger`: Tabbed interface components
- `SmartSearchInput` / `SmartSearchInputMobile`: Search input variants

### Feature Components
- `SearchOverview`: Summary view of search results
- `SearchAllResults`: Detailed results listing
- `FiltersDrawerContainer`: Filter management interface
- `FirstTimeModal`: New user onboarding

### Hooks & Contexts
- `useBreakpoint`: Responsive design hook
- `AllResultsStoreProvider`: Context provider for results state
- Store hooks: `useExploreStore`, `useFiltersDrawerStore`, `useAccessToken`

## Integration

### Application Architecture
```
SearchScreen (Main Container)
├── Smart Search Input (Mobile/Desktop variants)
├── AllResultsStoreProvider
│   ├── Tabs Container
│   │   ├── SearchOverview
│   │   └── SearchAllResults
│   └── Date Picker (Desktop only)
├── FiltersDrawerContainer
└── FirstTimeModal
```

### Data Flow
1. **Search Input** → Updates explore store → Triggers result updates
2. **Date Selection** → Updates date range → Refreshes filtered results
3. **Filter Changes** → Updates filter store → Notifies parent via callback
4. **Tab Switching** → Changes view mode → Maintains persistent state

## Best Practices

### Architecture Adherence
- ✅ **Lego Block Pattern**: Composed of focused, single-responsibility components
- ✅ **State Management**: Uses Zustand for client state, proper context boundaries
- ✅ **Responsive Design**: Implements mobile-first responsive patterns
- ✅ **Client Component Justification**: Only client-side due to interactive requirements

### Performance Optimization
- **Memoized Date Range**: Prevents unnecessary recalculations
- **Conditional Rendering**: Mobile/desktop variants loaded based on breakpoint
- **Context Scoping**: `AllResultsStoreProvider` scopes results state appropriately

### Code Quality
- **TypeScript Integration**: Proper interface definitions and type safety
- **Side Effect Management**: Controlled useEffect with proper dependencies
- **Prop Forwarding**: Clean className and callback pattern implementation

### Integration Patterns
- **Callback Props**: Enables parent component integration without tight coupling
- **Store Composition**: Multiple stores work together without conflicts
- **Component Variants**: Responsive components follow consistent patterns