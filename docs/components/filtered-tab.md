# FilteredTab Component

## Purpose

The `FilteredTab` component acts as a conditional wrapper that filters tab visibility based on signal status. It automatically hides and closes tabs associated with archived signals, ensuring the UI only displays relevant, active content. This component is essential for maintaining a clean tab interface in signal-based workflows.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages conditional rendering with `useEffect` side effects
- Performs automatic tab closure operations
- Requires real-time reactivity to signal status changes
- Handles user interaction callbacks for tab management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tab` | `Tab \| TabStructure` | ✅ | Tab object containing metadata and identification |
| `children` | `ReactNode` | ✅ | Child components to render when tab should be visible |
| `handleTabClose` | `(name: string) => (tabId: number, isActive: boolean, position: number) => Promise<void>` | ❌ | Callback function to handle tab closure operations |
| `position` | `number` | ❌ | Position index of the tab in the tab manager |

## Usage Example

```tsx
import { FilteredTab } from '@/components/main-layout/tabs-manager/filtered-tab';
import { TabContent } from '@/components/main-layout/tabs-manager/tab-content';

function TabsManager() {
  const handleTabClose = (name: string) => 
    async (tabId: number, isActive: boolean, position: number) => {
      // Close tab logic
      await closeTab(tabId);
      if (isActive) {
        activateAdjacentTab(position);
      }
    };

  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <FilteredTab
          key={tab.id}
          tab={tab}
          handleTabClose={handleTabClose}
          position={index}
        >
          <TabContent tab={tab} />
        </FilteredTab>
      ))}
    </div>
  );
}
```

## Functionality

### Core Features

- **Conditional Rendering**: Shows/hides tab content based on signal status
- **Automatic Cleanup**: Automatically closes tabs for archived signals
- **Status Monitoring**: Continuously monitors signal status changes
- **Position Awareness**: Tracks tab position for proper closure handling

### Behavior Patterns

1. **Signal Detection**: Identifies signal-type tabs from metadata
2. **Status Evaluation**: Queries signal status and determines visibility
3. **Automatic Closure**: Triggers tab closure when signals become archived
4. **Graceful Fallback**: Handles non-signal tabs by always showing them

## State Management

### TanStack Query Integration

```tsx
const { data: signal } = useSignalById(signalId ?? '', {
  enabled: signalId !== null,
});
```

- **Server State**: Uses `useSignalById` hook for signal data fetching
- **Conditional Queries**: Only fetches when `signalId` exists
- **Reactive Updates**: Automatically responds to signal status changes

### Local State Logic

- **Computed Visibility**: Derives `shouldShow` from signal status
- **Effect-Driven Actions**: Uses `useEffect` for side effect management

## Side Effects

### Automatic Tab Closure

```tsx
useEffect(() => {
  if (!shouldShow) {
    handleTabClose?.(tab.name)(tab.id, false, position ?? 0);
  }
}, [shouldShow, handleTabClose, tab, position]);
```

- **Conditional Execution**: Only triggers when tab should be hidden
- **Async Operations**: Handles promise-based tab closure
- **State Synchronization**: Ensures UI consistency with data state

## Dependencies

### Internal Dependencies

- **Query Hooks**: `@/lib/query-hooks` for signal data fetching
- **Type Definitions**: `@/lib/types` for Tab and Signal types

### External Dependencies

- **React**: Core hooks (`useEffect`, `ReactNode`)
- **TanStack Query**: Implicit dependency through `useSignalById`

## Integration

### Tabs Manager Architecture

```
TabsManager
├── FilteredTab (conditional wrapper)
│   ├── Signal Status Logic
│   └── Auto-close Behavior
└── TabContent (actual content)
    ├── Signal Details
    └── Interactive Elements
```

### Data Flow

1. **Tab Creation**: Tabs manager creates tabs with signal metadata
2. **Status Monitoring**: FilteredTab monitors signal status via TanStack Query
3. **Conditional Display**: Shows/hides content based on signal state
4. **Automatic Cleanup**: Closes archived signal tabs automatically

## Best Practices

### Architecture Adherence

✅ **Client Component Usage**: Appropriately uses client component for interactive behavior
✅ **TanStack Query Integration**: Leverages server state management for signal data
✅ **Component Decomposition**: Acts as focused wrapper with single responsibility
✅ **Conditional Rendering**: Implements clean show/hide logic

### Implementation Patterns

```tsx
// ✅ Good: Conditional query execution
const { data: signal } = useSignalById(signalId ?? '', {
  enabled: signalId !== null,
});

// ✅ Good: Computed visibility logic
const shouldShow = 
  !('metadata' in tab) ||
  tab.type !== TabEntity.SIGNAL ||
  signal?.status !== 'ARCHIVED';

// ✅ Good: Effect-based cleanup
useEffect(() => {
  if (!shouldShow) {
    handleTabClose?.(tab.name)(tab.id, false, position ?? 0);
  }
}, [shouldShow, handleTabClose, tab, position]);
```

### Performance Considerations

- **Conditional Queries**: Only fetches signal data when needed
- **Memoized Dependencies**: Effect dependencies properly defined
- **Efficient Rendering**: Returns null instead of empty elements when hidden