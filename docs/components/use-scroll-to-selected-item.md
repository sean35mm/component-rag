# useScrollToSelectedItem Hook

## Purpose

The `useScrollToSelectedItem` hook provides automatic scrolling functionality to keep a selected item visible within a scrollable container. It's specifically designed for search interfaces where users navigate through results using keyboard navigation, ensuring the currently selected item remains in view by calculating its position relative to preset items and scrolling accordingly.

## Component Type

**Client Component Hook** - This hook requires client-side functionality as it:
- Manipulates DOM elements directly through refs
- Uses `useEffect` for side effects that must run in the browser
- Interacts with browser scrolling APIs (`scrollIntoView`)
- Responds to real-time user interactions and state changes

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `scrollContainer` | `RefObject<HTMLDivElement \| null>` | Yes | Reference to the scrollable container element that holds the selectable items |
| `selectedRow` | `number` | Yes | Zero-based index of the currently selected row/item |
| `presetsLength` | `number` | Yes | Number of preset items that appear before the main list items, used for index calculation |

## Usage Example

```tsx
'use client';

import { useRef, useState } from 'react';
import { useScrollToSelectedItem } from '@/components/search/search-bar/hooks/use-scroll-to-selected-item';

const SearchResults = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const presetItems = ['Recent Search 1', 'Recent Search 2'];
  const searchResults = ['Result 1', 'Result 2', 'Result 3', 'Result 4'];

  // Auto-scroll to selected item
  useScrollToSelectedItem({
    scrollContainer: scrollContainerRef,
    selectedRow: selectedIndex,
    presetsLength: presetItems.length,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = presetItems.length + searchResults.length;
    
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div 
        ref={scrollContainerRef}
        className="max-h-64 overflow-y-auto"
      >
        {/* Preset items */}
        {presetItems.map((item, index) => (
          <div 
            key={`preset-${index}`}
            className={`p-2 ${selectedIndex === index ? 'bg-blue-100' : ''}`}
          >
            {item}
          </div>
        ))}
        
        {/* Search results */}
        {searchResults.map((result, index) => {
          const globalIndex = presetItems.length + index;
          return (
            <div 
              key={`result-${index}`}
              className={`p-2 ${selectedIndex === globalIndex ? 'bg-blue-100' : ''}`}
            >
              {result}
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

## Functionality

### Core Features

- **Automatic Scrolling**: Automatically scrolls selected items into view when selection changes
- **Index Calculation**: Properly calculates item position accounting for preset items offset
- **Smooth Positioning**: Uses `scrollIntoView` with `block: 'nearest'` for optimal scroll behavior
- **DOM Safety**: Includes null checks to prevent errors when refs aren't available

### Scroll Behavior

- Calculates the actual item index by adjusting for preset items: `index = selectedRow - presetsLength + 1`
- Uses CSS nth-child selector to find the target element
- Scrolls only when necessary using the 'nearest' block positioning strategy

## State Management

**Local State Only** - This hook doesn't manage state directly but responds to:
- External state changes via props (`selectedRow`)
- DOM ref state through the `scrollContainer` prop
- No server state or global client state management required

## Side Effects

### DOM Manipulation
- **Element Selection**: Queries DOM using CSS selectors to find target elements
- **Scroll Control**: Calls `scrollIntoView()` on target elements to control viewport
- **Ref Dependencies**: Monitors ref changes to ensure DOM availability

### Effect Dependencies
- Runs effect when `selectedRow`, `scrollContainer`, or `presetsLength` change
- Properly cleanup-free as `scrollIntoView` doesn't require cleanup

## Dependencies

### React Dependencies
- `useEffect` - For responding to prop changes
- `RefObject` - Type for scroll container reference

### DOM APIs
- `querySelector` - For finding specific child elements
- `scrollIntoView` - For controlling element visibility

### Integration Points
- Search bar keyboard navigation logic
- Dropdown/list selection components
- Any scrollable item selection interface

## Integration

### Search Architecture Role
```
SearchBar Component
├── Keyboard Navigation Logic
├── useScrollToSelectedItem Hook ← This component
├── Results Dropdown
└── Selection State Management
```

### Data Flow
1. User navigates with keyboard (ArrowUp/ArrowDown)
2. Parent component updates `selectedRow` state
3. Hook calculates target element position
4. Scroll container automatically adjusts viewport
5. Selected item remains visible to user

## Best Practices

### Architecture Alignment
- ✅ **Single Responsibility**: Focused solely on scroll behavior
- ✅ **Composable**: Can be used with any scrollable selection interface
- ✅ **No Direct State Management**: Responds to external state changes
- ✅ **Type Safety**: Properly typed props and ref handling

### Usage Recommendations
- Always provide stable refs to avoid unnecessary re-renders
- Ensure `presetsLength` accurately reflects actual preset items
- Use with keyboard navigation for optimal user experience
- Consider debouncing rapid selection changes for performance

### Performance Considerations
- Minimal re-renders due to focused dependencies
- Efficient DOM queries using nth-child selectors
- No unnecessary scroll operations when elements already visible