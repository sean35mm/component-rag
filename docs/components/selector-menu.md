# SelectorMenu Component

## Purpose

The `SelectorMenu` component is a flexible, keyboard-navigable dropdown menu designed for interactive selection workflows. It provides a customizable item renderer, keyboard navigation with arrow keys and Enter, and loading states for dynamic content. This component is primarily used in omnibar interfaces for command selection, search results, and other interactive picker scenarios.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state for selected index and user interactions
- Handles keyboard events and DOM manipulation
- Integrates with Lexical editor commands
- Requires imperative DOM operations (scrolling, refs)

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `SelectorMenuItem<ITEM>[]` | Yes | Array of menu items to display |
| `children` | `(props: SelectorMenuChildrenProps<ITEM>) => ReactNode` | Yes | Render function for individual menu items |
| `isLoading` | `boolean` | No | Shows loading skeleton when true |
| `loadingSkeletonItems` | `number` | No | Number of skeleton items to show during loading |
| `onSelect` | `(item: SelectorMenuItem<ITEM>) => void` | No | Callback fired when item is selected via click or Enter |
| `noDefaultSelectedItem` | `boolean` | No | Prevents auto-selection of first item |
| `emptyItemsMessage` | `string` | No | Message displayed when no items are available |
| `onArrowSelect` | `(item: SelectorMenuItem) => void` | No | Callback fired when navigating with arrow keys |
| `wrapperClassName` | `string` | No | Additional CSS classes for the container |
| `passRefToChildren` | `boolean` | No | Whether to pass the selected item ref to children |
| `disableEnterKeyPress` | `boolean` | No | Disables Enter key selection |

### SelectorMenuItem Interface

```typescript
type SelectorMenuItem<ITEM = unknown> = {
  label: () => ReactNode;
  value: string;
  icon?: ReactNode;
  name: string;
  item?: ITEM;
  type?: string;
  href?: URL | string;
};
```

## Usage Example

```tsx
import { SelectorMenu, SelectorMenuItem } from '@/components/omnibar/selector-menu/selector-menu';

type CommandItem = {
  id: string;
  action: () => void;
};

function CommandPalette() {
  const [commands, setCommands] = useState<SelectorMenuItem<CommandItem>[]>([
    {
      value: 'save',
      name: 'Save Document',
      label: () => 'Save Document',
      icon: <SaveIcon />,
      item: { id: 'save', action: () => console.log('Saving...') }
    },
    {
      value: 'open',
      name: 'Open File',
      label: () => 'Open File',
      icon: <OpenIcon />,
      item: { id: 'open', action: () => console.log('Opening...') }
    }
  ]);

  const handleSelect = (selectedItem: SelectorMenuItem<CommandItem>) => {
    selectedItem.item?.action();
    // Close palette or perform other actions
  };

  const handleArrowSelect = (item: SelectorMenuItem<CommandItem>) => {
    // Preview or highlight the command
    console.log('Previewing:', item.name);
  };

  return (
    <SelectorMenu
      items={commands}
      onSelect={handleSelect}
      onArrowSelect={handleArrowSelect}
      emptyItemsMessage="No commands found"
      wrapperClassName="max-h-80 overflow-auto"
    >
      {({ item, index, selectedIndex, ref }) => (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100',
            index === selectedIndex && 'bg-blue-50 border-l-2 border-blue-500'
          )}
        >
          {item.icon}
          <div>
            <div className="font-medium">{item.label()}</div>
            <div className="text-sm text-gray-500">{item.name}</div>
          </div>
        </div>
      )}
    </SelectorMenu>
  );
}
```

## Functionality

### Core Features
- **Keyboard Navigation**: Arrow up/down for item selection with circular navigation
- **Item Selection**: Click or Enter key to select items
- **Custom Rendering**: Flexible children render prop for item customization
- **Loading States**: Built-in skeleton loading with configurable item count
- **Empty States**: Customizable message when no items are available
- **Auto-scrolling**: Selected item automatically scrolls into view

### Keyboard Interactions
- **Arrow Down**: Move to next item (wraps to first)
- **Arrow Up**: Move to previous item (wraps to last)
- **Enter**: Select current item (if not disabled)

### Selection Behaviors
- **Auto-selection**: First item selected by default (unless disabled)
- **Visual Feedback**: Selected item ref provided for styling
- **Dual Callbacks**: Separate callbacks for navigation vs. selection

## State Management

**Local State Management**:
- `selectedIndex`: Tracks currently highlighted item index
- `selectedItemRef`: DOM reference for auto-scrolling behavior

The component follows React patterns for local UI state and doesn't require external state management solutions.

## Side Effects

### DOM Interactions
- **Scroll Management**: Auto-scrolls selected items into view with smooth behavior
- **Keyboard Event Handling**: Registers Lexical editor commands for key interactions
- **Focus Management**: Maintains focus state within the menu

### Lexical Editor Integration
- Registers `KEY_DOWN_COMMAND` with high priority for arrow navigation
- Registers `KEY_ENTER_COMMAND` with critical priority for selection
- Properly unregisters commands on cleanup

## Dependencies

### Internal Dependencies
- `useLexicalEditorTools`: Hook for Lexical editor integration
- `Typography`: UI component for text rendering
- `LoadingSkeleton`: Loading state component
- Style utilities from `./common`

### External Dependencies
- **Lexical**: Editor framework for command registration and keyboard handling
- **React**: Core hooks (useState, useEffect, useRef, useCallback)

## Integration

### Omnibar Architecture
The component is designed as part of the omnibar system, providing:
- **Command Selection**: For command palette interfaces
- **Search Results**: For dynamic search result display
- **Option Picking**: For any selection-based workflows

### Editor Integration
Deeply integrated with Lexical editor:
- Respects editor command priorities
- Handles keyboard events within editor context
- Maintains editor focus while providing menu interactions

## Best Practices

### Architecture Compliance
✅ **Component Decomposition**: Flat structure with render prop pattern for flexibility  
✅ **Reusability**: Generic typing allows reuse across different item types  
✅ **State Management**: Appropriate use of local state for UI interactions  
✅ **Client Component**: Correctly uses client-side rendering for interactive features  

### Usage Guidelines
- **Generic Typing**: Use type parameters for strongly-typed item data
- **Render Props**: Leverage children render prop for custom item layouts
- **Keyboard Accessibility**: Component handles keyboard navigation automatically
- **Loading States**: Always provide loading states for dynamic content
- **Error Boundaries**: Consider wrapping in error boundaries for robust UX

### Performance Considerations
- **Ref Optimization**: Optional ref passing to children minimizes re-renders
- **Callback Stability**: Uses useCallback for stable event handlers
- **Scroll Debouncing**: Scroll behavior is optimized with setTimeout
- **Command Cleanup**: Properly unregisters Lexical commands to prevent memory leaks