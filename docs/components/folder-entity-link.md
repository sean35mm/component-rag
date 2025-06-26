# FolderEntityLink Component

## Purpose

The `FolderEntityLink` component renders clickable links for folder entities (signals, answers, searches, stories, and shared member threads) within the file display panel. It provides navigation functionality, visual state indicators, and contextual actions like delete, move, and rename operations. The component adapts its behavior and appearance based on screen size and entity type.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Next.js navigation hooks (`useRouter`, `usePathname`)
- Interactive state management (hover, active states)
- Event handlers for user interactions
- Browser-specific APIs for navigation and prefetching

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `entity` | `T extends FolderEntityBase` | Yes | The folder entity object containing type, name, href, and other properties |
| `onDelete` | `() => void` | No | Callback function triggered when user deletes the entity |
| `onMoveTo` | `() => void` | No | Callback function triggered when user moves the entity to another location |
| `onRename` | `() => void` | No | Callback function triggered when user renames the entity |
| `onSelectEntity` | `() => void` | No | Callback function triggered when user selects the entity (mobile only) |

## Usage Example

```tsx
import { FolderEntityLink } from '@/components/main-layout/file-display-panel/folder-entity-link';

function FileDisplayPanel() {
  const handleDelete = () => {
    // Handle entity deletion
    console.log('Deleting entity...');
  };

  const handleMoveTo = () => {
    // Handle entity move operation
    console.log('Moving entity...');
  };

  const handleRename = () => {
    // Handle entity rename
    console.log('Renaming entity...');
  };

  const handleSelectEntity = () => {
    // Handle entity selection (mobile)
    console.log('Entity selected...');
  };

  return (
    <div className="space-y-2">
      <FolderEntityLink
        entity={{
          id: '1',
          name: 'Market Analysis Signal',
          type: 'SIGNAL',
          href: '/signals/market-analysis-signal',
          // ... other entity properties
        }}
        onDelete={handleDelete}
        onMoveTo={handleMoveTo}
        onRename={handleRename}
        onSelectEntity={handleSelectEntity}
      />
      
      <FolderEntityLink
        entity={{
          id: '2',
          name: 'Customer Research Story',
          type: 'STORY',
          href: '/stories/customer-research-story',
          // ... other entity properties
        }}
        onDelete={handleDelete}
        onMoveTo={handleMoveTo}
        // Note: Stories don't support rename functionality
        onSelectEntity={handleSelectEntity}
      />
    </div>
  );
}
```

## Functionality

- **Visual Entity Display**: Shows appropriate icons and typography for different entity types
- **Active State Indication**: Highlights the currently active entity based on pathname matching
- **Responsive Interaction**: Adapts UI behavior between desktop and mobile interfaces
- **Navigation**: Handles routing to entity-specific pages with prefetching optimization
- **Contextual Actions**: Provides access to entity actions (delete, move, rename) through hover/selection
- **Animation Effects**: Smooth transitions for hover states and action button appearances
- **Type-Specific Behavior**: Disables rename functionality for story entities

## State Management

**Local State (useState)**:
- `active`: Controls action menu visibility state
- `isHovering`: Tracks mouse hover state for desktop interactions
- `prefetchAttempted`: Prevents duplicate prefetch attempts

**Zustand State**:
- `setIsActiveEntityActions`: Global state for entity action panel visibility
- `setIsActiveMobile`: Global state for mobile panel activation

## Side Effects

**Navigation Prefetching**: Automatically prefetches entity pages on component mount to improve navigation performance:

```tsx
useEffect(() => {
  const prefetchEntity = async () => {
    const url = new URL(entity.href, env.NEXT_PUBLIC_BASE_URL).pathname;
    await router.prefetch(url);
    setPrefetchAttempted(true);
  };

  if (!prefetchAttempted) {
    prefetchEntity();
  }
}, [entity.href, router, prefetchAttempted]);
```

**Mobile State Management**: Updates global mobile panel state when navigating.

## Dependencies

**Hooks**:
- `usePathname`, `useRouter` (Next.js navigation)
- `useBreakpoint` (responsive design)
- `useFileDisplayPanel` (Zustand store)

**Components**:
- `Typography` (UI component)
- `FolderEntityItemActions` (action menu)
- Icon components for different entity types

**Utilities**:
- `cn` (className utility)
- `env` (environment configuration)

## Integration

The component integrates into the file display panel architecture as a navigation element:

1. **File Display Panel**: Parent container that manages the sidebar navigation
2. **Entity Management**: Works with entity CRUD operations through callback props
3. **Routing System**: Integrates with Next.js App Router for navigation
4. **Responsive Design**: Coordinates with global breakpoint system
5. **Icon System**: Uses the application's icon mapping for consistent visual representation

## Best Practices

✅ **Proper Component Decomposition**: Separates concerns by using `FolderEntityItemActions` for action menu logic

✅ **Performance Optimization**: Implements prefetching to improve navigation UX

✅ **Responsive Design**: Uses breakpoint hooks instead of CSS media queries for complex responsive behavior

✅ **Type Safety**: Leverages generic constraints (`T extends FolderEntityBase`) for flexible but type-safe entity handling

✅ **State Management Pattern**: Uses Zustand for global state and local state for component-specific concerns

✅ **Accessibility**: Provides proper semantic structure with buttons and interactive elements

✅ **Conditional Rendering**: Handles different entity types appropriately (e.g., stories can't be renamed)

✅ **Event Handling**: Uses `useCallback` for performance optimization of click handlers

✅ **Styling Architecture**: Follows the design system with consistent className patterns and conditional styling