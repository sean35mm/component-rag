# FoldersContainer Component Documentation

## Purpose

The `FoldersContainer` component is a core part of the file display panel that provides a hierarchical view of folders and entities in the application's library system. It supports both private (authenticated) and public views, with features like search, filtering, virtualization for performance, and comprehensive folder/entity management operations.

## Component Type

**Client Component** - Uses `'use client'` directive due to:
- Complex state management with multiple Zustand stores
- Interactive UI elements (search, expand/collapse, drag operations)
- React hooks for managing local state and side effects
- Event handlers for user interactions
- Real-time UI updates based on user actions

## Props Interface

### FoldersContainer Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes for styling |
| `isExpanded` | `boolean` | No | `true` | Controls whether the container is expanded or collapsed |
| `onIsExpandedToggle` | `() => void` | No | - | Callback function triggered when expand/collapse state changes |
| `isMobileMode` | `boolean` | No | - | Enables mobile-specific styling and behavior |

### LibraryActions Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isExpanded` | `boolean` | No | - | Controls whether the library actions are expanded |
| `onIsExpandedToggle` | `() => void` | No | - | Callback for toggling expansion state |
| `isMobile` | `boolean` | No | - | Enables mobile-specific behavior |
| `className` | `string` | No | - | Additional CSS classes |

## Usage Example

```tsx
import { FoldersContainer } from '@/components/main-layout/file-display-panel/folders-container';

function FileDisplayPanel() {
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true);
  const isMobile = useBreakpoint('lg');

  return (
    <div className="file-display-panel">
      <FoldersContainer
        isExpanded={isLibraryExpanded}
        onIsExpandedToggle={() => setIsLibraryExpanded(!isLibraryExpanded)}
        isMobileMode={!isMobile}
        className="border-r border-gray-200"
      />
    </div>
  );
}

// Usage of individual exported components
function CustomLibraryView() {
  return (
    <div>
      <LibraryActions
        isExpanded={true}
        isMobile={false}
        onIsExpandedToggle={() => console.log('Toggle')}
      />
      <PrivateFoldersView isExpanded={true} />
    </div>
  );
}
```

## Functionality

### Core Features

1. **Dual View Support**
   - Private folders view for authenticated users
   - Public folders view for non-authenticated users
   - Automatic switching based on authentication state

2. **Virtualized Rendering**
   - Uses `react-virtuoso` for performance with large datasets
   - Efficient rendering of folder hierarchies and entities

3. **Search and Filtering**
   - Real-time search across folder and entity names
   - Filter toggle with dedicated search input
   - Case-insensitive filtering

4. **Folder Management**
   - Expandable/collapsible folder structure
   - Create, rename, and delete folders
   - Move entities between folders

5. **Entity Operations**
   - Support for multiple entity types (signals, threads, searches, stories)
   - Rename, delete, and move operations
   - Context-aware action menus

6. **Responsive Design**
   - Mobile-optimized layouts and interactions
   - Breakpoint-aware UI adjustments
   - Touch-friendly interface elements

## State Management

### Zustand Stores

- **`useFileDisplayPanel`**: Primary state management for:
  - Modal states (rename, delete, move operations)
  - Selected entities and folders
  - Filter values and active states
  - UI expansion states

- **`useAccessToken`**: Authentication state
- **`usePublicExplorePage`**: Public view specific state

### TanStack Query

- **`useFolders`**: Fetches and caches folder data with entities
- **`useSignals`**: Manages signal entities not in folders
- **`useAnswersThreads`**: Handles answer thread entities
- **`useSavedDeepSearches`**: Manages saved search entities
- **`useSavedSharedMemberThreads`**: Handles shared thread entities
- **`useSavedStories`**: Manages story entities

### Local State

- **`openFolders`**: Tracks which folders are expanded
- **`overflowClass`**: Manages CSS overflow behavior during animations

## Side Effects

1. **Cache Population**
   - Automatically populates individual entity caches when bulk data is fetched
   - Uses `updateEntitiesCache` utility for consistent cache management

2. **Animation Control**
   - Manages overflow classes with timeouts for smooth expand/collapse animations
   - Coordinates opacity transitions with expansion states

3. **Auto-focus Management**
   - Automatically focuses search input when filter mode is activated

## Dependencies

### UI Components
- `MenuSearchInput`, `TabMenuVerticalItem`, `Tooltip`, `Typography`
- Custom icons: `IconNavigationLibrary`, `PiCloseLine`, `PiFilter3Line`, `PiLibraryCollapse`

### Feature Components
- `CreateFolderWidgetWithTrigger`, `DeleteEntityWidget`, `DeleteFolderWidget`
- `EntityActionsWidget`, `FolderActionsWidget`, `FolderEntityLink`, `FolderItem`
- `MoveToFolderWidget`, `RenameEntityWidget`, `RenameFolderWidget`

### Hooks and Services
- `useBreakpoint`, `usePublicFiles`
- Multiple query hooks for different entity types
- Context providers for authentication and public state

### External Libraries
- `react-virtuoso` for virtualized rendering
- `date-fns` for date manipulation
- `@tanstack/react-query` for server state management

## Integration

### Application Architecture

1. **Main Layout Integration**
   - Part of the file display panel in the main application layout
   - Coordinates with other panel components for responsive behavior

2. **Authentication Flow**
   - Automatically switches between private and public views
   - Respects user authorization levels and verification status

3. **Navigation System**
   - Generates navigation links using `TABS_TO_HREF_BASE` mapping
   - Integrates with application routing for entity access

4. **Modal System**
   - Coordinates with application-wide modal management
   - Provides context-aware actions for different entity types

## Best Practices

### Component Architecture Adherence

1. **Flat Component Structure**
   - Main container delegates to specialized view components
   - Clear separation between private and public functionality

2. **State Co-location**
   - State management is centralized in appropriate Zustand stores
   - Local state is kept minimal and focused on UI concerns

3. **Query Optimization**
   - Uses TanStack Query select functions for data transformation
   - Implements proper cache management for related entities

4. **Performance Optimization**
   - Virtualization for large datasets
   - Memoized computations for filtered data
   - Stable callback references with useCallback

5. **Responsive Design**
   - Mobile-first approach with progressive enhancement
   - Breakpoint-aware feature toggling

6. **Accessibility**
   - Tooltip integration for enhanced UX
   - Keyboard navigation support through proper focus management

### Error Handling

- Graceful loading states during data fetching
- Fallback UI when data is unavailable
- Conditional rendering based on authentication state

### Type Safety

- Comprehensive TypeScript interfaces for all props and data structures
- Generic type parameters for TanStack Query hooks
- Proper typing for complex data transformations