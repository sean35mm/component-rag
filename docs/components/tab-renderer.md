# TabRenderer Component

## Purpose

The `TabRenderer` component is a polymorphic rendering component responsible for conditionally rendering different types of tabs within the tabs manager system. It acts as a smart router that determines whether to render a regular tab (with an `id`) or a generic tab (with an `href`) and wraps each in appropriate filtering and memoization layers for optimal performance.

## Component Type

**Client Component** - Uses the `memo` HOC for performance optimization and handles complex conditional rendering logic based on runtime tab type detection. This component needs to re-render efficiently when tab states change, making it suitable for client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tab` | `Tab \| TabStructure` | ✅ | The tab object to render, either a regular tab with `id` or generic tab with `href` |
| `index` | `number` | ✅ | The position index of the tab in the tabs array |
| `pathname` | `string` | ✅ | Current pathname for active tab detection |
| `isAuthorized` | `boolean` | ✅ | User authorization status for conditional rendering |
| `containerRef` | `RefObject<HTMLDivElement \| null>` | ✅ | Reference to the tabs container for positioning calculations |
| `handleTabClose` | `(name: string) => (tabId: number, isActive: boolean, position: number) => Promise<void>` | ✅ | Handler for closing regular tabs |
| `handleCloseOthers` | `(tabId: number \| string) => Promise<void>` | ❌ | Handler for closing all other tabs except the specified one |
| `handleCloseToRight` | `(position: number) => Promise<void>` | ❌ | Handler for closing all tabs to the right of the specified position |
| `handleMoveTo` | `(tab: Tab) => void` | ❌ | Handler for moving/reordering tabs |
| `handleRename` | `(tab: Tab) => void` | ❌ | Handler for renaming tabs |
| `handleGenericTabClose` | `(type: TabOptionType) => (href: string, isActive: boolean, position: number) => Promise<void>` | ✅ | Handler for closing generic tabs |
| `handleGenericCloseOthers` | `(tabHref: string) => Promise<void>` | ❌ | Handler for closing other generic tabs |
| `handleGenericCloseToRight` | `(position: number) => Promise<void>` | ❌ | Handler for closing generic tabs to the right |

## Usage Example

```tsx
import React from 'react';
import { TabRenderer } from '@/components/main-layout/tabs-manager/tab-renderer';

function TabsContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const handleTabClose = (name: string) => 
    async (tabId: number, isActive: boolean, position: number) => {
      // Close regular tab logic
      await closeTab(tabId);
    };

  const handleGenericTabClose = (type: TabOptionType) =>
    async (href: string, isActive: boolean, position: number) => {
      // Close generic tab logic
      await closeGenericTab(href, type);
    };

  return (
    <div ref={containerRef} className="tabs-container">
      {tabs.map((tab, index) => (
        <TabRenderer
          key={'id' in tab ? tab.id : tab.href}
          tab={tab}
          index={index}
          pathname={pathname}
          isAuthorized={user?.isAuthorized ?? false}
          containerRef={containerRef}
          handleTabClose={handleTabClose}
          handleCloseOthers={handleCloseOthers}
          handleCloseToRight={handleCloseToRight}
          handleMoveTo={handleMoveTo}
          handleRename={handleRename}
          handleGenericTabClose={handleGenericTabClose}
          handleGenericCloseOthers={handleGenericCloseOthers}
          handleGenericCloseToRight={handleGenericCloseToRight}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Polymorphic Rendering**: Automatically detects tab type using TypeScript discriminated unions (`'id' in tab`)
- **Performance Optimization**: Wrapped with `memo` to prevent unnecessary re-renders
- **Conditional Component Selection**: Renders `MemoizedTabItem` for regular tabs or `MemoizedGenericTabItem` for generic tabs
- **Consistent Filtering**: Wraps all tabs in `FilteredTab` for uniform filtering behavior
- **Event Handler Delegation**: Passes appropriate handlers based on tab type
- **Position Management**: Calculates and passes position information for tab operations

## State Management

This component is **stateless** and acts as a pure rendering component. It relies on:
- Props passed down from parent components for all data
- Memoization through React's `memo` HOC for performance
- State management is handled by parent components and passed through handlers

## Side Effects

**No direct side effects** - All side effects are handled through callback props:
- Tab closing operations via `handleTabClose` and `handleGenericTabClose`
- Tab management operations via optional handlers (`handleMoveTo`, `handleRename`, etc.)
- All async operations are delegated to parent components

## Dependencies

### Components
- `FilteredTab` - Wrapper component for tab filtering logic
- `MemoizedTabItem` - Optimized regular tab item component
- `MemoizedGenericTabItem` - Optimized generic tab item component

### Types
- `Tab` - Regular tab type with `id` property
- `TabStructure` - Generic tab type with `href` property  
- `TabOptionType` - Enumeration for generic tab types

### React
- `memo` - Performance optimization HOC
- `RefObject` - TypeScript type for container reference

## Integration

The `TabRenderer` fits into the tabs management architecture as:

```
TabsManager
├── TabRenderer (multiple instances)
│   ├── FilteredTab
│   │   └── MemoizedTabItem (for regular tabs)
│   └── FilteredTab  
│       └── MemoizedGenericTabItem (for generic tabs)
```

- **Parent**: `TabsManager` - Provides tab data and event handlers
- **Children**: Conditionally renders memoized tab components based on tab type
- **Siblings**: Other `TabRenderer` instances for different tabs

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Component Decomposition**: Acts as a routing layer, keeping rendering logic flat
- **Performance**: Uses `memo` for optimization following React best practices
- **Type Safety**: Leverages discriminated unions for type-safe polymorphic rendering
- **Separation of Concerns**: Delegates state management to parent components

✅ **Implementation Patterns**:
- **Polymorphic Design**: Single component handles multiple tab types cleanly
- **Memoization Strategy**: Wraps entire component rather than individual parts
- **Props Drilling**: Efficiently passes props to appropriate child components
- **Key Management**: Uses appropriate keys (`tab.id` vs `tab.href`) for React reconciliation

✅ **Performance Considerations**:
- Memoized to prevent unnecessary re-renders
- Child components are also memoized for optimal performance
- Efficient key selection based on tab type for React's reconciliation