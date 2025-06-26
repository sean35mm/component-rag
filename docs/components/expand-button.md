# ExpandButton Component

## Purpose
The `ExpandButton` is a reusable UI component that provides a toggle mechanism for expanding and collapsing content sections. It displays contextual text ("See all" or "See less") with an animated arrow icon that rotates based on the expanded state, commonly used in lists, details panels, and collapsible content areas.

## Component Type
**Client Component** - This component requires client-side interactivity to handle click events and manage visual state transitions. The `onClick` handler and animated icon rotation necessitate client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isExpanded` | `boolean` | Yes | Controls the visual state and text content of the button |
| `onClick` | `() => void` | Yes | Callback function triggered when the button is clicked |

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import { ExpandButton } from '@/components/signals/details/expand-button';

export function SignalDetailsList() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      {/* Display limited or full items based on expanded state */}
      {(isExpanded ? items : items.slice(0, 3)).map((item, index) => (
        <div key={index} className="p-4 border rounded">
          {item.content}
        </div>
      ))}
      
      {items.length > 3 && (
        <ExpandButton 
          isExpanded={isExpanded} 
          onClick={handleToggle} 
        />
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Dynamic Text Display**: Automatically switches between "See all" and "See less" text based on `isExpanded` state
- **Animated Icon**: Arrow icon rotates 180 degrees with smooth transition when toggling states
- **Accessible Button**: Built on the design system's Button component with proper semantic structure
- **Consistent Styling**: Uses standardized typography and button variants for design consistency

### Visual Behaviors
- Smooth rotation animation on icon state changes
- Left-aligned positioning with `place-self-start`
- Neutral link styling with extra-small size for subtle appearance
- No horizontal padding for tight integration with content

## State Management
**External State Management** - This component is stateless and relies on parent components to manage the expanded/collapsed state. The component follows a controlled pattern where:
- Parent component maintains the `isExpanded` boolean state
- Parent provides the `onClick` handler to update state
- Component purely reflects the provided state visually

## Side Effects
**No Direct Side Effects** - The component doesn't perform API calls or external operations. All side effects are delegated to the parent component through the `onClick` callback, maintaining separation of concerns.

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiArrowDownSLine icon component
- `@/components/ui/button` - Base Button component from design system
- `@/components/ui/typography` - Typography component for text styling
- `@/lib/utils/cn` - Utility for conditional className composition

### External Dependencies
- React (implicit) - For component structure and props handling

## Integration

### Application Architecture Role
- **UI Layer Component**: Sits at the presentation layer, focusing purely on user interaction
- **Signals Domain**: Located within the signals feature domain (`/signals/details/`), suggesting primary use in signal-related interfaces
- **Reusable Pattern**: Despite domain-specific location, the component is generic enough for cross-feature usage

### Common Integration Patterns
```tsx
// In data tables with expandable rows
<ExpandButton 
  isExpanded={expandedRows.includes(rowId)} 
  onClick={() => toggleRow(rowId)} 
/>

// In content cards with truncated descriptions
<ExpandButton 
  isExpanded={showFullDescription} 
  onClick={() => setShowFullDescription(!showFullDescription)} 
/>

// In filter panels with collapsible sections
<ExpandButton 
  isExpanded={activeSection === 'filters'} 
  onClick={() => toggleSection('filters')} 
/>
```

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Small, focused component with single responsibility
✅ **Reusability**: Generic props interface allows usage across different contexts
✅ **UI Component Standards**: Built on design system foundations (Button, Typography)
✅ **State Management**: Follows controlled component pattern, delegating state to parent

### Implementation Guidelines
- **Conditional Rendering**: Always check if expand/collapse functionality is needed before rendering
- **Accessibility**: Ensure parent components provide proper ARIA attributes for screen readers
- **Performance**: Component is lightweight with minimal re-render impact
- **Styling**: Leverage the built-in design system variants rather than custom styles

### Usage Recommendations
- Use for content that benefits from progressive disclosure
- Pair with smooth content transitions for better UX
- Consider keyboard navigation support in parent implementations
- Maintain consistent expand/collapse behavior across similar UI patterns