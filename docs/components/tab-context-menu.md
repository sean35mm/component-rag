# TabContextMenu Component

## Purpose

The `TabContextMenu` component provides a right-click context menu for tab management operations in the main layout's tabs manager. It offers common tab actions like closing, moving, and renaming tabs through an accessible context menu interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it handles user interactions (right-click events) and manages interactive context menu state that requires client-side JavaScript.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | ✅ | The trigger element that will show the context menu on right-click |
| `onClose` | `() => void` | ❌ | Callback fired when "Close tab" is selected |
| `onCloseOthers` | `() => void` | ❌ | Callback fired when "Close other tabs" is selected |
| `onCloseToRight` | `() => void` | ❌ | Callback fired when "Close tabs to the right" is selected |
| `onMove` | `() => void` | ❌ | Callback fired when "Move to" is selected |
| `onRename` | `() => void` | ❌ | Callback fired when "Rename" is selected |

## Usage Example

```tsx
import { TabContextMenu } from '@/components/main-layout/tabs-manager/tab-context-menu';

function TabItem({ tab, onTabAction }) {
  return (
    <TabContextMenu
      onClose={() => onTabAction('close', tab.id)}
      onCloseOthers={() => onTabAction('closeOthers', tab.id)}
      onCloseToRight={() => onTabAction('closeToRight', tab.id)}
      onMove={() => onTabAction('move', tab.id)}
      onRename={() => onTabAction('rename', tab.id)}
    >
      <div className="tab-item">
        {tab.title}
      </div>
    </TabContextMenu>
  );
}

// In tabs manager
function TabsManager() {
  const handleTabAction = (action: string, tabId: string) => {
    switch (action) {
      case 'close':
        closeTab(tabId);
        break;
      case 'closeOthers':
        closeOtherTabs(tabId);
        break;
      case 'closeToRight':
        closeTabsToRight(tabId);
        break;
      case 'move':
        openMoveDialog(tabId);
        break;
      case 'rename':
        openRenameDialog(tabId);
        break;
    }
  };

  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <TabItem key={tab.id} tab={tab} onTabAction={handleTabAction} />
      ))}
    </div>
  );
}
```

## Functionality

- **Conditional Menu Items**: Only renders menu items for provided callback functions, allowing flexible menu configurations
- **Smart Separators**: Automatically shows/hides separators between action groups based on available actions
- **Icon Integration**: Consistent iconography using Phosphor icons with standardized sizing
- **Keyboard Navigation**: Inherits keyboard accessibility from the underlying ContextMenu component
- **Action Organization**: Groups actions logically (edit actions vs. close actions)

## State Management

- **No Internal State**: The component is stateless and relies on parent components for state management
- **Callback Pattern**: Uses callback props to communicate actions back to parent components
- **External State Integration**: Designed to work with parent components that may use Zustand stores for tab management

## Side Effects

- **No Direct Side Effects**: The component doesn't perform any direct side effects
- **Event Delegation**: Relies on parent components to handle the actual tab operations
- **Context Menu Behavior**: Manages the display/hide behavior of the context menu through the UI library

## Dependencies

### UI Components
- `ContextMenu`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuSeparator`, `ContextMenuTrigger` from `@/components/ui/context-menu`

### Icons
- `PiCloseLeftLine`, `PiCloseLine`, `PiCloseRightLine`, `PiEditLine`, `PiFolderTransferLine` from `@/components/icons`

### External Libraries
- React for component structure and ReactNode typing

## Integration

- **Tabs Manager Integration**: Designed specifically for the tabs manager system in the main layout
- **Flexible Architecture**: Can be wrapped around any tab trigger element
- **Action Handler Pattern**: Integrates with parent action handling systems
- **UI System Compliance**: Uses the application's design system components for consistent styling

## Best Practices

✅ **Component Decomposition**: Follows the Lego block principle - small, focused component with single responsibility

✅ **Client Component Usage**: Appropriately uses client component only where interaction is needed

✅ **Prop Interface Design**: Clean, optional callback pattern allows flexible usage without forcing unused functionality

✅ **Accessibility**: Leverages UI library's built-in accessibility features for context menus

✅ **Consistent Styling**: Uses exported `ICON_CLASS` constant for consistent icon styling across menu items

✅ **Conditional Rendering**: Smart rendering logic prevents empty separators and unused menu items

✅ **Type Safety**: Proper TypeScript interfaces ensure type safety across the component API

## Exports

- `ICON_CLASS`: String constant for consistent icon styling (`'mr-2 size-5'`)
- `TabContextMenu`: Main component for tab context menu functionality