# SearchInput Component

## Purpose
The `SearchInput` component provides an interactive smart search interface that displays and manages search queries, entities, and titles as removable pill-shaped elements. It serves as a visual representation of active search criteria with the ability to modify individual search components through a scrollable, drag-enabled container.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires browser-specific functionality including:
- Interactive event handlers for clicks and removals
- Framer Motion animations for smooth UI transitions
- Drag scrolling functionality via react-indiana-drag-scroll
- Real-time state updates and visual feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling customization |
| `onClickEntity` | `() => void` | No | Callback fired when any entity pill is clicked |
| `onClickSpace` | `() => void` | No | Callback fired when clicking the empty space within the container |
| `onClear` | `() => void` | No | Callback fired when the clear (close) button is clicked |
| `onRemoveQuery` | `() => void` | No | Callback fired when the query pill is removed |
| `onRemoveTitle` | `() => void` | No | Callback fired when the title pill is removed |
| `onRemoveEntity` | `(e: SearchEntityItem) => void` | No | Callback fired when a specific entity is removed |
| `entities` | `SearchEntityItem[]` | No | Array of search entities to display as pills |
| `query` | `string` | No | Search query text to display as a keyword pill |
| `title` | `string` | No | Title text to display as an entity pill |
| `disableClear` | `boolean` | No | Whether to hide the clear button functionality |

## Usage Example

```tsx
import { SearchInput } from '@/components/search/smart-search-input/search-input';
import { SearchEntityItem } from '@/lib/types';

function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState('machine learning');
  const [searchTitle, setSearchTitle] = useState('AI Research');
  const [searchEntities, setSearchEntities] = useState<SearchEntityItem[]>([
    { id: '1', name: 'Neural Networks', type: 'concept' },
    { id: '2', name: 'Stanford University', type: 'organization' }
  ]);

  const handleRemoveEntity = (entity: SearchEntityItem) => {
    setSearchEntities(prev => prev.filter(e => e.id !== entity.id));
  };

  const handleClear = () => {
    setSearchQuery('');
    setSearchTitle('');
    setSearchEntities([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <SearchInput
        query={searchQuery}
        title={searchTitle}
        entities={searchEntities}
        onRemoveQuery={() => setSearchQuery('')}
        onRemoveTitle={() => setSearchTitle('')}
        onRemoveEntity={handleRemoveEntity}
        onClear={handleClear}
        onClickSpace={() => console.log('Focus search input')}
        className="border border-gray-200 p-2"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Multi-type Search Display**: Renders different types of search criteria (queries, titles, entities) as distinct pill components
- **Interactive Removal**: Each search element can be individually removed via close buttons
- **Drag Scrolling**: Horizontal scrolling with drag functionality for handling overflow content
- **Empty State**: Shows placeholder text when no search criteria are active
- **Animated Clear Button**: Smooth fade-in/out animation for the clear button based on content state

### Visual Behaviors
- **Conditional Rendering**: Only displays pills for non-empty search criteria
- **Responsive Layout**: Adjusts width calculation based on clear button visibility
- **Hover Effects**: Interactive feedback on removable elements
- **Syntax Highlighting**: Special highlighting for logical operators (OR, AND, NOT)

## State Management
**Props-driven State** - This component is entirely controlled, relying on parent components to manage search state. It follows a unidirectional data flow pattern where:
- All search data flows down via props
- All state changes flow up via callback functions
- No internal state management for search criteria
- Uses `useMemo` for performance optimization of empty state calculation

## Side Effects
- **DOM Event Handling**: Manages click events for various interactive elements
- **Animation Triggers**: Framer Motion animations respond to state changes
- **Scroll Behavior**: Horizontal drag scrolling affects container scroll position

## Dependencies

### Internal Components
- `PillButton` - Renders keyword and entity pills with removal functionality
- `SearchEntity` - Specialized component for displaying search entity items
- `Typography` - Consistent text styling for placeholder content
- `PiCloseLine` - Icon component for the clear button

### External Libraries
- `framer-motion` - Provides smooth animations for the clear button
- `react-indiana-drag-scroll` - Enables horizontal drag scrolling functionality

### Utilities
- `cn` - Utility for conditional class name concatenation
- `SearchEntityItem` - Type definition for entity data structure

## Integration
This component serves as a **visual search state manager** within the smart search system:

- **Search Interface Layer**: Acts as the display layer for active search criteria
- **Parent Container Integration**: Designed to be embedded within larger search interfaces
- **Event Delegation**: Communicates with parent components through well-defined callback props
- **Responsive Design**: Integrates with container layouts and responsive breakpoints

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features  
✅ **Props Interface**: Clean, well-typed interface following component contract patterns  
✅ **Event Handling**: Proper separation of concerns with callback-based event management  
✅ **Performance**: Uses `useMemo` for expensive computations  

### Implementation Patterns
✅ **Controlled Component**: Follows controlled component pattern for predictable state management  
✅ **Composition**: Leverages smaller UI components (PillButton, SearchEntity) for modularity  
✅ **Accessibility**: Maintains proper interactive element structure  
✅ **Styling**: Uses utility-first CSS with conditional class application  

### Integration Guidelines
- Always provide meaningful callback handlers for interactive elements
- Consider implementing keyboard navigation for accessibility
- Ensure parent components handle state persistence and synchronization
- Test drag scrolling behavior across different device types and screen sizes