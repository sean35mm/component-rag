# UpdateSourceGroupDrawer Component

## Purpose

The `UpdateSourceGroupDrawer` component provides a modal interface for editing existing source groups in the search customization settings. It allows users to modify the collection of search sources (domains) within a source group, including adding, removing, and managing sources through a comprehensive drawer-based interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages complex interactive state through Zustand store
- Handles multiple useEffect hooks for data synchronization
- Provides real-time UI interactions (drawer open/close, search, table management)
- Requires client-side state persistence during editing sessions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props - all data is managed through Zustand store |

## Usage Example

```tsx
import { UpdateSourceGroupDrawer } from '@/components/settings/search-customization/source-group-drawer/update-source-group-drawer';

// Component is controlled by Zustand store
function SearchCustomizationPage() {
  return (
    <div>
      {/* Other search customization components */}
      <UpdateSourceGroupDrawer />
    </div>
  );
}

// Trigger the drawer from another component
function SourceGroupsList() {
  const { setSourceGroupToEdit, setIsEditMode, onIsOpenChange } = useSourceGroupsDrawerStore();
  
  const handleEditGroup = (sourceGroup) => {
    setSourceGroupToEdit(sourceGroup);
    setIsEditMode(true);
    onIsOpenChange(true);
  };

  return (
    <div>
      {sourceGroups.map(group => (
        <button key={group.id} onClick={() => handleEditGroup(group)}>
          Edit {group.name}
        </button>
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Source Group Editing**: Modify existing source groups with domain management
- **Domain Search**: Search and add new domains to the source group
- **Sources Table**: Display and manage current sources in a tabular format
- **Batch Operations**: Handle multiple domain operations efficiently
- **Validation**: Identify and display unsupported domains
- **Loading States**: Show appropriate loading indicators during data fetching

### Key Behaviors
- **Auto-population**: Automatically loads existing source group data when opened
- **Smart Updates**: Only processes data changes when switching between different source groups
- **Cleanup**: Resets state when drawer is closed
- **Chunked Loading**: Processes large domain lists in chunks of 100 for performance

## State Management

### Zustand Store (`useSourceGroupsDrawerStore`)
- **isOpen**: Controls drawer visibility
- **isEditMode**: Distinguishes between create and edit modes
- **sourceGroupToEdit**: Holds the source group being edited
- **createSourceGroupData**: Working copy of source previews being edited
- **reset()**: Clears all drawer state

### Local State
- **lastSourceGroupId**: Ref to track source group changes and prevent unnecessary updates

## Side Effects

### Data Fetching
- **useSourcesByDomain**: Fetches source details for domains in the source group
- Chunks domain requests into batches of 100 for API efficiency
- Aggregates results from multiple parallel queries

### State Synchronization
- **Effect 1**: Converts source group domains to source previews when data loads
- **Effect 2**: Resets tracking ref when drawer closes
- Uses dependency array to prevent unnecessary re-processing

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader`, etc. - Base drawer/modal components
- `Button` - Action buttons
- `PiGlobalFill`, `PiLoader5Line` - Icons

### Feature Components
- `ActionButtons` - Bulk action controls
- `EmptyGroup` - Empty state display
- `SaveButton` - Save functionality
- `SearchSources` - Domain search interface
- `SourcesTable` - Sources management table
- `UnsupportedDomains` - Invalid domain warnings

### Hooks & Utilities
- `useSourcesByDomain` - TanStack Query hook for fetching source data
- `chunkArray` - Array chunking utility
- `sourceDomainToSourcePreview`, `sourceToSourcePreview` - Data transformation utilities

## Integration

### Application Architecture
```
Settings Page
├── Search Customization Section
│   ├── Source Groups Management
│   │   ├── Source Groups List
│   │   ├── Create Source Group Drawer
│   │   └── UpdateSourceGroupDrawer ← This component
│   └── Other search settings
```

### Data Flow
1. **Trigger**: User clicks edit on a source group
2. **Store Update**: `sourceGroupToEdit` is set in Zustand store
3. **Drawer Opens**: Component renders with edit mode enabled
4. **Data Loading**: Fetches current source details via TanStack Query
5. **State Sync**: Converts domains to editable source previews
6. **User Interaction**: Modify sources through child components
7. **Save/Cancel**: Persist changes or reset state

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses 'use client' for legitimate interactive needs
- ✅ **Component Decomposition**: Delegates specific functionality to focused child components
- ✅ **State Management Separation**: TanStack Query for server state, Zustand for UI state
- ✅ **Performance Optimization**: Chunks API requests and memoizes expensive operations

### Implementation Patterns
- **Controlled Components**: Fully controlled by Zustand store state
- **Separation of Concerns**: UI logic separate from business logic
- **Error Boundaries**: Graceful handling of loading and error states
- **Memory Management**: Proper cleanup with useRef and useEffect dependencies

### Integration Guidelines
- Use store actions to trigger the drawer rather than prop drilling
- Ensure parent components handle the store setup and initial data
- Follow the established pattern for other drawer components in the application
- Maintain consistency with the source group management workflow