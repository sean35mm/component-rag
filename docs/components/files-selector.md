# FilesSelector Component

## Purpose

The `FilesSelector` component provides a searchable interface for users to find and navigate to files in their library through the omnibar. It enables quick file discovery by filtering through both private and public files based on user authorization status, displaying results with appropriate icons and metadata.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied through hooks usage) because it:
- Manages interactive search state with debounced input
- Handles user selection events and navigation
- Integrates with multiple client-side stores (Zustand)
- Requires real-time filtering and UI updates

## Props Interface

This component takes no props - it's a self-contained feature component that manages its own state through global stores.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { FilesSelector } from '@/components/omnibar/files-selector/files-selector';

// Used within the omnibar component
function Omnibar() {
  return (
    <div className="omnibar-container">
      {/* Other omnibar components */}
      <FilesSelector />
      {/* Other selectors */}
    </div>
  );
}
```

## Functionality

### Core Features

- **Debounced Search**: Implements 300ms debounced search to optimize performance
- **Authorization-Based File Access**: Shows private files for authorized users, public files otherwise
- **Dynamic Filtering**: Real-time filtering based on file names containing search query
- **Type-Specific Icons**: Displays appropriate icons for different file types (Signals, Answers, Stories, etc.)
- **Keyboard Navigation**: Supports keyboard selection with visual indicators
- **Empty State Handling**: Shows "No results found" message when no files match

### Search Behavior

- Only activates when `filesSearchQuery` is not null or empty
- Filters out queries that start with `//` prefix for other selector types
- Case-insensitive substring matching on file names
- Minimum query length enforcement through debouncing

### File Type Support

Supports multiple file types with corresponding icons:
- **Signals** (`TabEntity.SIGNAL`) - `IconSignalsFDP`
- **Answers** (`TabEntity.ANSWER`) - `IconAnswers` 
- **Deep Search** (`TabEntity.SEARCH`) - `IconDeepSearch`
- **Stories** (`TabEntity.STORY`) - `IconStoriesFDP`

## State Management

### Zustand Stores

**Omnibar Store** (`useOmnibarStore`):
- `filesSearchQuery` - Current search query string
- `setIsOpen` - Controls omnibar visibility
- `setFilesSearchQuery` - Updates search query
- `setIsFileSearchActive` - Toggles file search mode
- `reset` - Resets all omnibar state

**Access Token Context** (`useAccessToken`):
- `isAuthorized` - Determines which file set to display

### Local State
- `debouncedSearchQuery` - Debounced version of search query using `use-debounce`

## Side Effects

### Navigation
- Uses Next.js router to navigate to selected files
- Clears lexical editor content on file selection
- Resets omnibar state and closes interface

### Editor Integration
- Clears editor content through `useLexicalEditorTools` hook
- Ensures clean state when navigating away

## Dependencies

### Hooks
- `usePrivateFiles` - Fetches private files when user is authorized
- `usePublicFiles` - Fetches public files for unauthorized users
- `useLexicalEditorTools` - Provides editor clearing functionality
- `useRouter` - Next.js navigation
- `useDebounce` - Search query debouncing

### Components
- `SelectorMenu` - Base menu component for rendering selectable items
- `WorkflowSection` - Section wrapper with title
- `Typography` - Text rendering with consistent styling
- Various icons for file type representation

### Contexts
- `useOmnibarStore` - Global omnibar state management
- `useAccessToken` - User authorization context

## Integration

### Omnibar Architecture
- Part of the larger omnibar system for universal search/navigation
- Works alongside other selector components (workflows, commands, etc.)
- Integrates with global keyboard shortcuts and navigation patterns

### File Management System
- Connects to both private and public file repositories
- Respects user authorization levels
- Provides unified interface regardless of file source

### Editor Integration
- Cleanly integrates with lexical editor by clearing content on navigation
- Maintains consistent state between omnibar and editor components

## Best Practices

### Architecture Adherence
✅ **Feature Component by Domain** - Located in omnibar domain structure  
✅ **Zustand for Client State** - Uses omnibar store for search state  
✅ **Component Decomposition** - Leverages `SelectorMenu` base component  
✅ **Conditional Rendering** - Returns empty fragment when inactive  

### Performance Optimizations
- Implements debounced search to reduce computational overhead
- Uses `useMemo` for expensive filtering operations
- Conditional rendering prevents unnecessary DOM updates

### User Experience
- Provides immediate visual feedback for selections
- Implements keyboard navigation support
- Shows appropriate empty states
- Maintains consistent icon mapping for file types

### State Management Patterns
- Single source of truth through Zustand store
- Clean separation between search state and file data
- Proper cleanup on component unmount and navigation