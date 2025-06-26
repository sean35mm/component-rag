# StoryPreview Component Documentation

## Purpose

The `StoryPreview` component renders an individual story item within a searchable dropdown menu interface. It displays story information with interactive visual feedback, including selection highlighting and keyboard navigation indicators. This component is specifically designed for use within the omnibar's story search functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static content based on props without requiring client-side interactivity, state management, or browser APIs.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `object` | ✅ | Story item containing `value`, `icon`, and `label()` method |
| `item.value` | `string` | ✅ | Unique identifier for the story item |
| `item.icon` | `ReactNode` | ✅ | Icon component to display alongside the story |
| `item.label` | `() => ReactNode` | ✅ | Function that returns the story label/title |
| `selectedIndex` | `number` | ✅ | Index of currently selected item in the list |
| `index` | `number` | ✅ | Current item's index position in the list |

## Usage Example

```tsx
import { StoryPreview } from '@/components/omnibar/stories-search/story-preview';
import { PiBookOpenLine } from '@/components/icons';

// Within a selector menu or search results
const storyItems = [
  {
    value: 'story-123',
    icon: <PiBookOpenLine />,
    label: () => 'User Authentication Story'
  },
  {
    value: 'story-456', 
    icon: <PiBookOpenLine />,
    label: () => 'Payment Integration Story'
  }
];

function StoriesSearchResults() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  return (
    <div>
      {storyItems.map((item, index) => (
        <StoryPreview
          key={item.value}
          item={item}
          selectedIndex={selectedIndex}
          index={index}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Visual Story Representation**: Displays story icon, label, and metadata in a consistent format
- **Selection Highlighting**: Applies visual styling to indicate the currently selected story
- **Keyboard Navigation Indicator**: Shows corner-down-left arrow icon for the selected item to indicate it can be activated
- **Responsive Layout**: Uses flexible layout with icon, content, and action indicator positioning
- **Accessibility Support**: Provides clear visual feedback for keyboard and mouse navigation states

## State Management

**No Direct State Management** - This component is purely presentational and receives all necessary data through props. State management is handled by parent components in the selector menu system.

## Side Effects

**None** - This is a pure presentational component with no side effects, API calls, or external interactions.

## Dependencies

### Internal Dependencies
- `@/components/icons` - For the `PiCornerDownLeftLine` selection indicator icon
- `../selector-menu/common` - For shared styling utilities (`listItem`, `listItemIcon`, `selectedItemIcon`)
- `../selector-menu/selector-menu` - For the `SelectorMenuChildrenProps` interface

### External Dependencies
- React - For JSX rendering and component structure

## Integration

The `StoryPreview` component integrates into the larger omnibar search architecture:

```
Omnibar
├── StoriesSearch (parent container)
│   ├── SelectorMenu (list management)
│   │   └── StoryPreview (individual items) ← This component
│   └── Search input/filtering logic
```

**Integration Points:**
- **Parent Component**: Used within `SelectorMenu` or similar list containers
- **Omnibar System**: Part of the unified search interface for stories
- **Story Management**: Displays story data from the application's story management system
- **Navigation Flow**: Enables users to quickly find and select stories for various actions

## Best Practices

✅ **Architectural Alignment:**
- **Flat Component Structure**: Single-purpose component focused solely on story item presentation
- **Server Component Default**: No client-side state or interactivity required
- **Reusable Design**: Generic enough to work with any story item that matches the expected interface
- **Separation of Concerns**: Pure presentation logic separated from business logic and state management

✅ **Implementation Patterns:**
- **Consistent Styling**: Uses shared styling utilities from the selector menu system
- **Prop Interface**: Extends established `SelectorMenuChildrenProps` for consistency
- **Visual Feedback**: Clear indication of selection state and available actions
- **Performance**: Minimal re-renders due to pure component design
- **Accessibility**: Visual indicators support keyboard navigation patterns