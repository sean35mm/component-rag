# ExclusionsFilter Component

## Purpose

The `ExclusionsFilter` component provides a comprehensive filtering interface for excluding unwanted content from search results. It allows users to exclude various types of entities (sources, people, companies, topics, locations, journalists, labels, and languages) and enable duplicate removal. The component displays excluded items in a collapsible accordion format with visual indicators and removal functionality.

## Component Type

**Client Component** - Uses `'use client'` directive (implied by React hooks usage)

**Rationale**: This component requires client-side interactivity for:
- Managing checkbox state changes
- Handling click events for item removal
- Dynamic rendering based on excluded item types
- Real-time counter updates

## Props Interface

### ExclusionsFilterProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `excludedItems` | `ExcludedFilterItem[]` | ✅ | Array of currently excluded filter items |
| `noDuplicates` | `boolean` | ✅ | Whether duplicate removal is enabled |
| `onExcludedItemsChange` | `(excludedItems: ExcludedFilterItem[]) => void` | ✅ | Callback fired when excluded items list changes |
| `onNoDuplicatesChange` | `(checked: boolean) => void` | ✅ | Callback fired when no duplicates setting changes |

### ExcludedFilterListItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `ExcludedFilterItem` | ✅ | The excluded filter item to render |
| `onClick` | `(item: ExcludedFilterItem) => void` | ✅ | Callback fired when item is clicked for removal |

## Usage Example

```tsx
import { useState } from 'react';
import { ExclusionsFilter } from '@/components/filters/filters-drawer/exclusions-filter';
import { ExcludedFilterItem, ExcludedFilterItemType } from '@/lib/types';

function SearchFilters() {
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([
    {
      type: ExcludedFilterItemType.Source,
      value: 'example.com'
    },
    {
      type: ExcludedFilterItemType.People,
      value: 'Q123456'
    },
    {
      type: ExcludedFilterItemType.Topic,
      value: 'Sports'
    }
  ]);
  
  const [noDuplicates, setNoDuplicates] = useState(false);

  const handleExcludedItemsChange = (items: ExcludedFilterItem[]) => {
    setExcludedItems(items);
    // Apply filters to search query
    applyFiltersToSearch({ excludedItems: items, noDuplicates });
  };

  const handleNoDuplicatesChange = (checked: boolean) => {
    setNoDuplicates(checked);
    // Apply no duplicates setting
    applyFiltersToSearch({ excludedItems, noDuplicates: checked });
  };

  return (
    <ExclusionsFilter
      excludedItems={excludedItems}
      noDuplicates={noDuplicates}
      onExcludedItemsChange={handleExcludedItemsChange}
      onNoDuplicatesChange={handleNoDuplicatesChange}
    />
  );
}
```

## Functionality

### Core Features

- **Multi-Type Exclusions**: Supports excluding 8 different entity types (sources, people, companies, topics, locations, journalists, labels, languages)
- **Dynamic Item Rendering**: Renders appropriate component for each excluded item type
- **Item Removal**: Click-to-remove functionality for excluded items
- **Duplicate Prevention**: Toggle for excluding duplicate content
- **Visual Counter**: Displays total number of active exclusions
- **Collapsible Interface**: Accordion-style container for space efficiency

### Key Behaviors

- **Smart Counter**: Combines excluded items count with duplicate setting (0 or 1)
- **Type-Safe Rendering**: Uses switch statement to render correct component for each item type
- **Efficient Removal**: Filters items by both type and value for precise removal
- **Conditional Sections**: Only shows excluded items list when items exist

## State Management

**Controlled Component Pattern**: Uses lifted state management where parent components control the excluded items and duplicate settings.

**Local State**: Minimal local state usage:
- Memoized counter calculation for performance
- Callback memoization to prevent unnecessary re-renders

**No External State Management**: Does not directly use TanStack Query or Zustand, but integrates with parent components that may use these tools for filter persistence.

## Side Effects

**No Direct Side Effects**: This component is purely presentational and does not perform:
- API calls
- Local storage operations
- External service interactions

**Indirect Effects**: Triggers parent callbacks that may cause:
- Search query updates
- Filter state persistence
- Analytics tracking

## Dependencies

### UI Components
- `FiltersDrawerAccordionItem` - Container accordion component
- `FiltersDrawerCheckbox` - Checkbox for duplicate setting
- `Typography` - Text styling component

### Icons
- `PiForbidLine` - Exclusions icon

### Specialized Item Components
- `ExcludedSourceItem` - Renders excluded source domains
- `ExcludedPeopleItem` - Renders excluded people by Wikidata ID
- `ExcludedCompanyItem` - Renders excluded companies
- `ExcludedTopicItem` - Renders excluded topics
- `ExcludedLocationItem` - Renders excluded locations
- `ExcludedJournalistItem` - Renders excluded journalists
- `ExcludedLabelItem` - Renders excluded labels
- `ExcludedLanguageItem` - Renders excluded languages

### Types
- `ExcludedFilterItem` - Core filter item interface
- `ExcludedFilterItemType` - Enum for filter item types

## Integration

### Application Architecture

**Filter System Integration**: Core component of the filters drawer system, working alongside other filter components to provide comprehensive search refinement.

**Search Pipeline**: Integrates with search functionality by providing exclusion criteria that modify search queries and result filtering.

**Type System**: Leverages centralized type definitions for filter items, ensuring consistency across the filtering system.

### Data Flow

```
Parent Component (Search/Filter State)
    ↓ (props)
ExclusionsFilter
    ↓ (specialized props)
ExcludedFilterListItem
    ↓ (type-specific props)
Specialized Item Components
```

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: Follows flat component structure with specialized item components
✅ **Controlled Components**: Implements proper controlled component pattern with callback props
✅ **Type Safety**: Leverages TypeScript for prop validation and type-safe rendering
✅ **Performance**: Uses `useMemo` and `useCallback` for optimization

### Design Patterns

✅ **Single Responsibility**: Each component handles one aspect of exclusion filtering
✅ **Composition**: Composes specialized item components based on item type
✅ **Prop Drilling Prevention**: Uses callback patterns to avoid deep prop drilling
✅ **Conditional Rendering**: Efficiently shows/hides sections based on state

### Future Considerations

- **Accessibility**: Ensure keyboard navigation and screen reader support
- **Virtualization**: Consider virtual scrolling for large exclusion lists
- **Bulk Operations**: Potential for bulk exclusion management
- **Persistence**: Integration with user preferences for exclusion defaults