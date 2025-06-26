# FolderItem Component

## Purpose

The `FolderItem` component is a collapsible folder interface element within the file display panel. It renders folder entries with expand/collapse functionality, folder name display, and contextual actions (rename, delete) for authorized users. The component adapts its behavior and appearance based on screen size and user authorization status.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Local state management (`useState` for active dropdown state)
- Event handlers for user interactions (expand/collapse, dropdown actions)
- Conditional rendering based on breakpoint detection
- Interactive elements like collapsible triggers and dropdown menus

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `classNames` | `{ wrapper?: string; content?: string }` | No | Custom CSS classes for wrapper and content elements |
| `isExpanded` | `boolean` | Yes | Controls whether the folder is currently expanded |
| `defaultOpen` | `boolean` | No | Sets the initial open state of the collapsible |
| `name` | `string` | Yes | Display name of the folder |
| `onDeleteFolder` | `() => void` | No | Callback fired when delete action is triggered |
| `onRenameFolder` | `() => void` | No | Callback fired when rename action is triggered |
| `onSelectFolder` | `() => void` | No | Callback fired when folder is selected (mobile) |
| `onToggle` | `() => void` | No | Callback fired when folder expand/collapse state changes |

## Usage Example

```tsx
import { FolderItem } from '@/components/main-layout/file-display-panel/folder-item';

function FileDisplayPanel() {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  
  const handleToggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleDeleteFolder = async (folderId: string) => {
    // Delete folder logic
    await deleteFolderMutation.mutateAsync(folderId);
  };

  const handleRenameFolder = (folderId: string) => {
    // Open rename dialog/modal
    setRenamingFolder(folderId);
  };

  return (
    <div className="folder-list">
      {folders.map(folder => (
        <FolderItem
          key={folder.id}
          name={folder.name}
          isExpanded={expandedFolders.includes(folder.id)}
          defaultOpen={folder.isDefaultOpen}
          onToggle={() => handleToggleFolder(folder.id)}
          onDeleteFolder={() => handleDeleteFolder(folder.id)}
          onRenameFolder={() => handleRenameFolder(folder.id)}
          onSelectFolder={() => setSelectedFolder(folder.id)}
          classNames={{
            wrapper: 'mb-2',
            content: 'pl-4'
          }}
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Collapsible Interface**: Expandable/collapsible folder view using Radix UI Collapsible
- **Responsive Design**: Adapts UI patterns between mobile and desktop experiences
- **Contextual Actions**: Provides rename and delete actions for authorized users
- **Search Integration**: Automatically expands when search filter is active
- **Empty State Handling**: Shows appropriate messages for empty folders or no search results

### Interactive Elements
- **Expand/Collapse Toggle**: Click folder name or expand icon to toggle state
- **Action Menu**: Dropdown menu (desktop) or button (mobile) for folder operations
- **Visual Feedback**: Hover states, active states, and transition animations

## State Management

### Local State
- `active` - Boolean state for dropdown menu open/closed status using `useState`

### Zustand Store Integration
- **File Display Panel Store**: 
  - `filterValue` - Current search filter value
  - `setIsActiveFolderActions` - Controls mobile folder actions state

### External State Dependencies
- Responds to `isExpanded` prop from parent component
- Integrates with search filtering through `filterValue` context

## Side Effects

### Context Interactions
- **Access Control**: Reads user authorization status to conditionally render actions
- **Search Filtering**: Automatically opens folders when search is active
- **Mobile Actions**: Updates global folder actions state on mobile selection

### No Direct API Calls
- Component is presentation-focused and delegates data operations to parent components through callback props

## Dependencies

### UI Components
- `@radix-ui/react-collapsible` - Collapsible functionality
- `DropdownMenu` components - Action menu interface
- `Typography` - Text rendering with consistent styling

### Custom Hooks
- `useBreakpoint('lg')` - Responsive design detection
- `useAccessToken()` - User authorization status
- `useFileDisplayPanel()` - File panel state management

### Icons
- `IconExpand` - Folder expand/collapse indicator
- `PiDeleteBinLine` - Delete action icon
- `PiEditLine` - Rename action icon  
- `PiMoreFill` - More actions trigger icon

## Integration

### File Display Panel Architecture
- **Panel Component**: Renders within the file display panel as folder entries
- **File Organization**: Works alongside file items to create hierarchical file structure
- **Search System**: Integrates with global search functionality
- **Mobile Navigation**: Coordinates with mobile-specific navigation patterns

### Authorization Integration
- Conditionally renders action buttons based on user permissions
- Gracefully handles unauthorized states by hiding management controls

## Best Practices

### Architecture Alignment
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive functionality  
✅ **Prop-Based Configuration**: Accepts callbacks rather than handling business logic internally  
✅ **Responsive Design**: Implements mobile-first responsive patterns  
✅ **State Separation**: Uses Zustand for shared state, local state for component-specific needs  

### Component Design
✅ **Single Responsibility**: Focused on folder presentation and basic interactions  
✅ **Composition Pattern**: Accepts multiple optional callbacks for flexible integration  
✅ **Accessibility**: Proper ARIA attributes and semantic HTML structure  
✅ **Performance**: Efficient re-rendering with conditional prop spreading  

### Integration Patterns
✅ **Context Integration**: Properly consumes multiple contexts without tight coupling  
✅ **Error Boundaries**: Graceful handling of missing callbacks or undefined states  
✅ **TypeScript Safety**: Comprehensive prop typing with optional callback patterns