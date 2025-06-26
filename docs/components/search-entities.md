# SearchEntities Component

## Purpose

The `SearchEntities` component provides a collapsible interface for entity-based search functionality. It allows users to add and manage search entities (people, companies, topics) that are enriched with context to provide more accurate search results. The component features an animated expandable/collapsible design with a search input that becomes active when expanded.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (expand/collapse)
- DOM manipulation (focus management)
- Animation libraries (Framer Motion)
- Event handlers for user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onChangeEntities` | `(entities: SearchEntityItem[]) => void` | Yes | Callback function triggered when the entities list changes |
| `entities` | `SearchEntityItem[]` | No | Array of current search entities to display |
| `className` | `string` | No | Additional CSS classes to apply to the root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the root element |

## Usage Example

```tsx
import { SearchEntities } from '@/components/search/smart-search-input/search-modal/search-entities';
import { SearchEntityItem } from '@/lib/types';

function SearchModal() {
  const [searchEntities, setSearchEntities] = useState<SearchEntityItem[]>([]);

  const handleEntitiesChange = (entities: SearchEntityItem[]) => {
    setSearchEntities(entities);
    // Optional: Trigger search or update parent state
  };

  return (
    <div className="search-modal">
      <SearchEntities
        entities={searchEntities}
        onChangeEntities={handleEntitiesChange}
        className="custom-entities-section"
      />
    </div>
  );
}
```

## Functionality

- **Expandable Interface**: Toggles between collapsed and expanded states with smooth animations
- **Auto-expansion**: Automatically expands when entities are present
- **Focus Management**: Automatically focuses the search input when expanded
- **Entity Management**: Integrates with `SearchBarSimple` for adding/removing entities
- **Visual Feedback**: Animated button with sliding effects and icon transitions
- **Contextual Help**: Provides descriptive text explaining entity search benefits

## State Management

**Local State** - Uses React's `useState` for:
- `isExpanded`: Controls the collapse/expand state of the component

The component follows the pattern of lifting state up by accepting `entities` as props and communicating changes through the `onChangeEntities` callback, allowing parent components to manage the actual entity data.

## Side Effects

- **Focus Management**: Uses `useEffect` to focus the search input when the component expands
- **State Synchronization**: Monitors `entities` prop changes to auto-expand when entities are added externally
- **Animation Effects**: Framer Motion handles smooth transitions for expand/collapse and button sliding animations

## Dependencies

### Internal Components
- `SearchBarSimple`: The actual search input component for entity management
- `Typography`: For consistent text styling
- `PiAddLine`: Icon component for the add button

### External Libraries
- `framer-motion`: Provides smooth animations for expand/collapse and button effects
- `react-collapsed`: Handles the collapsible behavior with proper accessibility

### Types
- `SearchEntityItem`: Defines the structure of search entities

## Integration

The `SearchEntities` component is part of the smart search modal system:

```
SearchModal
├── SearchEntities (this component)
│   └── SearchBarSimple
├── Other search sections...
└── Search results
```

**Integration Pattern**:
- **Parent Communication**: Uses callback pattern to communicate entity changes upward
- **State Lifting**: Relies on parent components for entity data persistence
- **Modal Context**: Designed specifically for modal interfaces with appropriate spacing and borders
- **Search System**: Integrates with the broader search architecture for entity-enriched queries

## Best Practices

✅ **Architectural Alignment**:
- **Client Component Usage**: Properly uses client-side rendering only where interactive features are needed
- **Component Decomposition**: Cleanly separates concerns by delegating actual search functionality to `SearchBarSimple`
- **State Management**: Follows controlled component pattern with state lifting
- **Prop Interface**: Extends standard HTML attributes while adding specific functionality

✅ **Implementation Quality**:
- **Accessibility**: Uses `react-collapsed` which provides proper ARIA attributes
- **Performance**: Minimal re-renders through focused state management
- **User Experience**: Smooth animations and intuitive expand/collapse behavior
- **Maintainability**: Clear separation between presentation and functionality logic

✅ **Integration Standards**:
- **Consistent Styling**: Uses design system colors and typography components
- **Flexible Styling**: Accepts className for customization while maintaining defaults
- **Type Safety**: Proper TypeScript interfaces for all props and callbacks