# ExcludedFilterListItemBase

## Purpose
The `ExcludedFilterListItemBase` component renders an individual excluded filter item within filter lists or drawers. It provides a standardized interface for displaying filter information with an icon, title, subtitle, and remove functionality. This component serves as a building block for filter management interfaces where users can view and remove applied exclusion filters.

## Component Type
**Client Component** - This component requires client-side interactivity for click handling and hover states. While it doesn't use React hooks directly, it needs to respond to user interactions and manage DOM events.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | `ReactNode` | Yes | Icon element to display alongside the filter item |
| `title` | `string` | Yes | Primary text label for the filter item |
| `subtitle` | `string` | Yes | Secondary descriptive text for additional context |
| `onClick` | `() => void` | Yes | Callback function executed when the item is clicked to remove the filter |

## Usage Example

```tsx
import { ExcludedFilterListItemBase } from '@/components/filters/filters-drawer/excluded-filter-item-base';
import { PiTag } from '@/components/icons';

function FilterDrawer() {
  const handleRemoveFilter = () => {
    // Remove filter logic
    removeExcludedTag('design');
  };

  return (
    <ul className="space-y-1">
      <ExcludedFilterListItemBase
        icon={<PiTag className="size-4 text-blue-500" />}
        title="Design"
        subtitle="Excluded from search results"
        onClick={handleRemoveFilter}
      />
    </ul>
  );
}

// Real-world usage in filter management
function ExcludedFiltersSection({ excludedFilters, onRemoveFilter }) {
  return (
    <div className="space-y-2">
      <Typography variant="paragraphSmall" color="700">
        Excluded Filters
      </Typography>
      <ul>
        {excludedFilters.map((filter) => (
          <ExcludedFilterListItemBase
            key={filter.id}
            icon={filter.icon}
            title={filter.name}
            subtitle={`${filter.count} items excluded`}
            onClick={() => onRemoveFilter(filter.id)}
          />
        ))}
      </ul>
    </div>
  );
}
```

## Functionality

### Core Features
- **Visual Hierarchy**: Displays filter information with clear title/subtitle structure
- **Interactive Removal**: Provides click functionality to remove excluded filters
- **Hover States**: Enhanced visual feedback with background color transitions
- **Icon Support**: Flexible icon integration for different filter types
- **Text Truncation**: Handles long text with appropriate truncation and line clamping
- **Accessible Interaction**: Proper ARIA roles and keyboard interaction support

### Visual Design
- Consistent spacing and typography following design system patterns
- Hover effects with subtle background color changes
- Close icon with opacity transitions for better UX
- Responsive layout with proper flex alignment

## State Management
**No Direct State Management** - This component is purely presentational and stateless. State management is handled by parent components that:
- Maintain the list of excluded filters (likely with Zustand for client-side filter state)
- Handle filter removal logic through the `onClick` callback
- May integrate with TanStack Query for server-side filter persistence

## Side Effects
**No Direct Side Effects** - The component delegates all side effects to parent components through the `onClick` callback. Common side effects triggered by parent components include:
- API calls to update server-side filter preferences
- Local storage updates for filter persistence
- State updates in filter management stores

## Dependencies

### Internal Dependencies
- `@/components/icons` - For the close icon (PiCloseLine)
- `@/components/ui/typography` - For consistent text styling

### External Dependencies
- React - For component structure and ReactNode types

### Design System Integration
- Follows typography scale and color system
- Uses consistent spacing patterns (px-4, py-2.5, gap-3)
- Implements standard hover and transition patterns

## Integration

### Application Architecture Role
- **Filter Management Layer**: Part of the filter drawer/sidebar system
- **Reusable Building Block**: Can be composed into various filter interfaces
- **Design System Component**: Provides consistent excluded filter item styling

### Common Integration Patterns
```tsx
// Integration with filter store
function FiltersList() {
  const { excludedFilters, removeFilter } = useFilterStore();
  
  return (
    <div>
      {excludedFilters.map(filter => (
        <ExcludedFilterListItemBase
          key={filter.id}
          icon={getFilterIcon(filter.type)}
          title={filter.label}
          subtitle={getFilterSubtitle(filter)}
          onClick={() => removeFilter(filter.id)}
        />
      ))}
    </div>
  );
}

// Integration with search/query context
function SearchFilters() {
  const { excludedTags, toggleTagExclusion } = useSearchQuery();
  
  return (
    <section>
      {excludedTags.map(tag => (
        <ExcludedFilterListItemBase
          icon={<PiTag />}
          title={tag.name}
          subtitle="Tag excluded"
          onClick={() => toggleTagExclusion(tag.id)}
        />
      ))}
    </section>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Single responsibility for excluded filter item display
- ✅ **Flat Structure**: Simple component without nested complexity
- ✅ **Reusability**: Generic interface works across different filter types
- ✅ **Separation of Concerns**: Presentation logic separated from business logic

### Usage Recommendations
- **Consistent Iconography**: Use appropriate icons that match filter types
- **Meaningful Subtitles**: Provide context-rich subtitle information
- **Proper Event Handling**: Implement comprehensive removal logic in parent components
- **Accessibility**: Ensure proper keyboard navigation and screen reader support
- **Performance**: When rendering many items, consider virtualization for large filter lists

### Anti-Patterns to Avoid
- Don't embed complex business logic within the component
- Avoid tight coupling to specific filter data structures
- Don't handle state mutations directly within the component
- Avoid inconsistent icon sizing or styling patterns