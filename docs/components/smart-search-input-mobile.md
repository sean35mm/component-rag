# SmartSearchInputMobile

## Purpose

`SmartSearchInputMobile` is a specialized mobile search interface component that provides a fixed-position search input with drawer-based editing capabilities. It enables users to perform complex searches with keywords, titles, and entity filters through an intuitive mobile-optimized interface that opens in a drawer overlay.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management with `useState` for focus handling and local state
- DOM event handling for click interactions and drawer triggers
- Real-time synchronization between local editing state and global search state
- Mobile-specific touch interactions and gesture handling

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isMobile` | `boolean` | No | `undefined` | Flag to indicate mobile-specific behavior (currently unused in implementation) |
| `className` | `string` | No | `undefined` | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML div attributes passed through to the container |

## Usage Example

```tsx
import { SmartSearchInputMobile } from '@/components/search/smart-search-input/smart-search-input-mobile';

function MobileSearchPage() {
  return (
    <div className="relative min-h-screen">
      {/* Page content */}
      <main className="pb-20">
        {/* Your main content here */}
      </main>
      
      {/* Fixed mobile search input */}
      <SmartSearchInputMobile 
        className="bg-white/90 shadow-lg"
        isMobile={true}
      />
    </div>
  );
}

// Usage in responsive layout
function ResponsiveSearchLayout() {
  return (
    <>
      {/* Desktop search - hidden on mobile */}
      <div className="hidden md:block">
        <SmartSearchInputDesktop />
      </div>
      
      {/* Mobile search - visible only on mobile */}
      <div className="block md:hidden">
        <SmartSearchInputMobile />
      </div>
    </>
  );
}
```

## Functionality

### Core Features
- **Fixed Position Interface**: Positioned at bottom of screen for easy thumb access
- **Drawer-Based Editing**: Opens full-screen drawer for detailed search configuration
- **Multi-Faceted Search**: Supports queries, titles, and entity-based filtering
- **Local State Management**: Maintains temporary editing state separate from global search state
- **Visual Feedback**: Shows active filters count and current search parameters
- **Backdrop Blur**: Applies visual blur effect for modern mobile UI aesthetics

### Key Behaviors
- **Tap to Edit**: Clicking the search input opens the editing drawer
- **Staged Changes**: Edits are local until user confirms with "Apply"
- **Cancel/Reset Options**: Users can discard changes or clear all search parameters
- **Real-time Sync**: Global search state updates are reflected in the input display
- **Entity Management**: Individual entity removal with visual feedback

## State Management

### Zustand Store Integration
```typescript
// Global search state
const onSetQuery = useExploreStore((state) => state.onSetQuery);
const onSetTitle = useExploreStore((state) => state.onSetTitle);
const onSetEntities = useExploreStore((state) => state.onSetEntities);
const entities = useExploreStore((state) => state.entities);
const query = useExploreStore((state) => state.q);
const title = useExploreStore((state) => state.title);

// Filters drawer state
const onIsOpenChange = useFiltersDrawerStore((store) => store.onIsOpenChange);
const counter = useFiltersDrawerStore((store) => filtersToCounter(store.filters));
```

### Local State Management
- `focus`: Controls drawer open/closed state
- `localEntities`: Temporary entity list during editing
- `localQuery`: Temporary query string during editing
- `localTitle`: Temporary title string during editing

## Side Effects

### State Synchronization Effects
```typescript
// Sync global state to local state when not editing
useEffect(() => {
  if (entities.length > 0) setLocalEntities(entities);
}, [entities, focus]);

useEffect(() => {
  if (query) setLocalQuery(query);
}, [query, focus]);

useEffect(() => {
  if (title) setLocalTitle(title);
}, [title, focus]);
```

### User Interactions
- **Immediate Updates**: Query and title removal update global state immediately
- **Staged Updates**: Entity and bulk changes require confirmation through drawer
- **Filter Integration**: Opens filters drawer for additional search refinement

## Dependencies

### UI Components
- `FiltersDrawerAccordion`: Collapsible sections for search organization
- `SheetContentDivider`: Visual separators with labels
- `SearchDrawer`: Modal drawer container for mobile editing
- `SearchEntities`: Entity selection and management interface
- `SearchQueries`: Query input and management
- `SearchTitles`: Title input and management
- `SearchFiltersButton`: Filter activation button with counter
- `SearchInput`: Core search input display component

### Utilities & Contexts
- `useExploreStore`: Global search state management
- `useFiltersDrawerStore`: Filter drawer state management
- `filtersToCounter`: Utility for counting active filters
- `cn`: Utility for conditional class names

## Integration

### Mobile-First Architecture
```typescript
// Responsive integration pattern
const isMobile = useMediaQuery('(max-width: 768px)');

return (
  <>
    {isMobile ? (
      <SmartSearchInputMobile />
    ) : (
      <SmartSearchInputDesktop />
    )}
  </>
);
```

### Search Ecosystem Integration
- **Explore Store**: Centralizes search state across all search components
- **Filters System**: Integrates with advanced filtering capabilities
- **Results Display**: Search state changes trigger result updates automatically
- **URL Synchronization**: Search parameters sync with browser URL for sharing

## Best Practices

### Architectural Adherence
- ✅ **State Management**: Proper separation of local editing state and global application state
- ✅ **Component Decomposition**: Composed of focused, reusable search components
- ✅ **Client Component Usage**: Justified use of client-side rendering for interactivity
- ✅ **Zustand Integration**: Follows established patterns for global state management

### Mobile UX Patterns
- ✅ **Thumb-Friendly Positioning**: Fixed bottom placement for easy access
- ✅ **Staged Editing**: Prevents accidental search triggers during composition
- ✅ **Visual Feedback**: Clear indication of active filters and search parameters
- ✅ **Gesture Support**: Proper touch target sizing and interaction patterns

### Performance Considerations
- ✅ **Efficient Re-renders**: Selective state subscriptions prevent unnecessary updates
- ✅ **Lazy Loading**: Drawer content loads only when needed
- ✅ **Debounced Updates**: Prevents excessive API calls during rapid input changes
- ✅ **Memory Management**: Proper cleanup of local state on component unmount