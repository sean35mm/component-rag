# ExcludedLabelItem Component

## Purpose
The `ExcludedLabelItem` component renders a specialized filter item for displaying excluded content type labels within a filters drawer. It provides a standardized interface for showing labels that have been filtered out, with consistent iconography and styling that indicates the item represents a "Content Type" exclusion.

## Component Type
**Client Component** - This component uses event handlers (`onClick`) for user interactions, requiring client-side JavaScript execution. The interactive nature necessitates the 'use client' directive (inherited from its base component).

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The display name of the excluded label/content type |
| `onClick` | `() => void` | Yes | Callback function executed when the item is clicked, typically used to remove the exclusion filter |

## Usage Example

```tsx
import { ExcludedLabelItem } from '@/components/filters/filters-drawer/excluded-label-item';

// Within a filters drawer component
const FiltersDrawer = () => {
  const [excludedLabels, setExcludedLabels] = useState(['Article', 'Blog Post']);

  const handleRemoveLabel = (labelToRemove: string) => {
    setExcludedLabels(prev => prev.filter(label => label !== labelToRemove));
    // Additional logic to update filters
  };

  return (
    <div className="filters-drawer">
      <h3>Excluded Filters</h3>
      {excludedLabels.map((label) => (
        <ExcludedLabelItem
          key={label}
          name={label}
          onClick={() => handleRemoveLabel(label)}
        />
      ))}
    </div>
  );
};
```

## Functionality
- **Visual Representation**: Displays excluded content type labels with a consistent file list icon (`PiFileList3Line`)
- **User Interaction**: Provides click functionality to remove/modify exclusion filters
- **Standardized Display**: Uses the base component pattern to ensure consistent styling and behavior across all excluded filter items
- **Content Type Indication**: Explicitly labels items as "Content Type" to provide clear context about the filter category

## State Management
- **No Internal State**: This component is stateless and relies on props for all data
- **Parent-Managed State**: State management is delegated to parent components, typically using:
  - **Zustand** for client-side filter state management
  - **TanStack Query** for syncing filter states with server-side preferences or search parameters

## Side Effects
- **No Direct Side Effects**: The component itself doesn't perform API calls or side effects
- **Delegated Actions**: Side effects are handled through the `onClick` callback, which may trigger:
  - Filter state updates
  - Search query modifications  
  - Server state synchronization

## Dependencies

### Internal Dependencies
- `@/components/icons` - Provides the `PiFileList3Line` icon component
- `./excluded-filter-item-base` - Base component that handles common excluded filter item functionality

### External Dependencies
- **React** - Core component functionality
- **Phosphor Icons** - Icon library (via the icons module)

## Integration
The component integrates into the larger application architecture as part of the filtering system:

- **Filters Drawer**: Sits within the filters drawer as part of the excluded items section
- **Search Interface**: Connects to the broader search and filtering functionality
- **Content Management**: Specifically handles content type filtering exclusions
- **Component Hierarchy**: `FiltersDrawer` → `ExcludedFilters` → `ExcludedLabelItem`

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Follows flat structure by utilizing `ExcludedFilterListItemBase` for shared functionality  
✅ **Single Responsibility**: Focused solely on rendering excluded label filter items  
✅ **Reusability**: Leverages base components for consistent behavior across filter types  
✅ **Domain Organization**: Located within the filters feature domain structure  

### Implementation Patterns
- **Props Interface**: Clean, minimal interface with only essential props
- **Event Delegation**: Uses callback pattern for handling user interactions
- **Icon Consistency**: Standardizes on file list icon for content type representations
- **Base Component Usage**: Properly leverages shared base component for common functionality

### Integration Guidelines
- Always provide meaningful `name` values that clearly identify the content type
- Ensure `onClick` handlers properly manage filter state and trigger necessary updates
- Use within controlled environments where excluded filters are managed at the parent level
- Consider accessibility when implementing click handlers for keyboard navigation