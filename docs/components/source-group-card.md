# SourceGroupCard

## Purpose

The `SourceGroupCard` component displays a single source group within the search customization settings. It presents key information about a source group including creation date, name, description, number of sources, and ID in a clickable card format. When clicked, it opens the source groups drawer in edit mode for that specific source group.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive click handlers with `useCallback`
- Utilizes Zustand store hooks for state management
- Handles user interactions that trigger state updates in the source groups drawer

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sourceGroup` | `SourceGroup` | Yes | The source group data object containing all necessary information to display |
| `className` | `string` | No | Additional CSS classes to apply to the card container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the container |

## Usage Example

```tsx
import { SourceGroupCard } from '@/components/settings/search-customization/source-groups-list/source-group-card';

function SourceGroupsList() {
  const sourceGroups = [
    {
      id: 'sg-123',
      name: 'tech-news',
      displayName: 'Technology News',
      description: 'Sources for technology and startup news',
      domains: ['techcrunch.com', 'ycombinator.com', 'github.com'],
      createdAt: new Date('2024-01-15')
    }
  ];

  return (
    <div className="space-y-4">
      {sourceGroups.map((sourceGroup) => (
        <SourceGroupCard 
          key={sourceGroup.id}
          sourceGroup={sourceGroup}
          className="hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Visual Presentation**: Displays source group information in a structured card layout with icon, metadata, and summary statistics
- **Date Formatting**: Shows creation date in readable format (MMM d, yyyy)
- **Interactive Editing**: Click handler opens the source groups drawer in edit mode
- **Fallback Display**: Handles missing displayName by falling back to name property
- **Statistics Display**: Shows number of sources and group ID
- **Options Menu**: Integrates with `CardOptionsMenu` for additional actions

## State Management

**Zustand Store Integration** - Uses `useSourceGroupsDrawerStore` for:
- `setSourceGroupToEdit`: Sets the selected source group for editing
- `setSourceGroupName`: Pre-populates the drawer with current group name
- `setIsEditMode`: Configures drawer to open in edit mode
- `onIsSourceGroupsDrawerOpenChange`: Controls drawer visibility

No local state management - all state changes are handled through the centralized Zustand store.

## Side Effects

- **Drawer State Updates**: Click interaction triggers multiple store updates to configure the edit drawer
- **UI Navigation**: Clicking the card programmatically opens the source groups drawer
- **Form Pre-population**: Sets initial form values in the drawer based on selected source group

## Dependencies

### Components
- `Typography` - Text rendering with consistent styling
- `PiLinksLine` - Icon component for visual representation
- `CardOptionsMenu` - Additional actions menu for the source group

### Hooks & Context
- `useSourceGroupsDrawerStore` - Zustand store for drawer state management

### Utilities
- `formatDate` from `date-fns` - Date formatting utility
- `cn` - Utility for conditional class name merging

### Types
- `SourceGroup` - TypeScript interface for source group data structure

## Integration

The component integrates into the search customization settings flow:

1. **Settings Page** → **Search Customization** → **Source Groups List** → **SourceGroupCard**
2. **Data Flow**: Receives source group data from parent list component
3. **User Interaction**: Triggers drawer opening for editing source groups
4. **State Coordination**: Works with the source groups drawer through shared Zustand store

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- **Flat Component Structure**: Simple, focused component without unnecessary nesting
- **Zustand State Management**: Proper use of centralized store for UI state
- **Component Decomposition**: Delegates options functionality to separate `CardOptionsMenu` component

✅ **Design Patterns**:
- **Props Spreading**: Cleanly handles additional HTML attributes with rest props
- **Conditional Rendering**: Graceful fallbacks for missing data
- **Event Handling**: Uses `useCallback` for optimized click handlers
- **Styling**: Consistent use of design system classes and conditional styling

✅ **Performance Considerations**:
- **Memoized Callbacks**: `useCallback` prevents unnecessary re-renders
- **Efficient State Updates**: Single click triggers multiple coordinated state changes
- **Minimal Re-renders**: Store selectors are specific to avoid unnecessary updates