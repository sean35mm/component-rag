# PeoplePreviewCardMobile

## Purpose

The `PeoplePreviewCardMobile` component is a mobile-optimized wrapper for displaying person information in a card format. It handles click interactions to open a detailed drawer view and provides appropriate styling for mobile interfaces. This component acts as a bridge between tabular data and mobile-friendly card presentations.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `people` | `Person` | Yes | The person object containing all person-related data |
| `sourcesStats` | `EntityCount[]` | No | Optional array of entity counts for displaying statistics |
| `row` | `Row<Person>` | Yes | TanStack Table row object for the person data |

## Usage Example

```tsx
import { PeoplePreviewCardMobile } from '@/components/ui/people-preview-card-mobile';
import { Person, EntityCount } from '@/lib/types';

function PeopleListMobile({ people, stats, tableRow }) {
  return (
    <div className="space-y-4 p-4 bg-pgBackground-50">
      <h2 className="typography-titleH3 text-pgText-900">
        Team Members
      </h2>
      
      <div className="space-y-3">
        <PeoplePreviewCardMobile
          people={people}
          sourcesStats={stats}
          row={tableRow}
        />
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Inherits typography styling from `PeoplePreviewCardSmall` component
- Supports all design system typography scales through the wrapped component

### Color Tokens
- **Background**: `bg-pgBackground-0` - Primary background color for cards
- **Responsive Background**: Works with `bg-pgBackground-50` containers
- **Text Colors**: Inherits from design system through `PeoplePreviewCardSmall`

### Tailwind Utilities
- `p-4` - Standard padding (16px) for mobile touch targets
- `bg-pgBackground-0` - Clean background separation
- Event handling optimized for mobile interactions

## Styling

### Base Styling
```tsx
// Applied automatically
className="bg-pgBackground-0 p-4"
```

### Customization Options
The component accepts styling through the wrapped `PeoplePreviewCardSmall`:

```tsx
// Background variations
bg-pgBackground-0    // Default clean background
bg-pgBackground-50   // Subtle background tint
bg-pgBackground-100  // More prominent background

// Padding variations for different layouts
p-3  // Compact (12px)
p-4  // Standard (16px) - Default
p-6  // Spacious (24px)
```

### State Variations
- **Default**: Clean background with standard padding
- **Interactive**: Handles click states through the wrapped component
- **Accessible**: Full keyboard and screen reader support

## Responsive Design

### Mobile-First Approach
```tsx
// Optimized for mobile breakpoints
<div className="block md:hidden">
  <PeoplePreviewCardMobile ... />
</div>

// Desktop alternative
<div className="hidden md:block">
  <PeopleTableView ... />
</div>
```

### Breakpoint Usage
- **Default (0px+)**: Full mobile optimization
- **sm (640px+)**: Maintains mobile layout
- **md (768px+)**: Consider switching to desktop table view
- **lg (1024px+)**: Typically hidden in favor of table layouts

## Accessibility

### Keyboard Navigation
- Inherits full keyboard support from `PeoplePreviewCardSmall`
- Click handlers respect keyboard activation
- Focus management through drawer state

### Screen Reader Support
- Semantic structure maintained through wrapped component
- ARIA attributes inherited from base component
- Proper role assignments for interactive elements

### Touch Accessibility
- Minimum 44px touch targets (achieved through p-4 padding)
- Clear visual feedback on interaction
- Optimized for mobile screen readers

## Dependencies

### Internal Components
- **`PeoplePreviewCardSmall`**: Core display component being wrapped
- Inherits all styling and behavior from the base component

### State Management
- **`useEntityDetailDrawerStore`**: Zustand store for drawer state management
  - `setPeople`: Sets the selected person data
  - `setIsOpen`: Controls drawer visibility

### Type Dependencies
- **`Person`**: Core person data structure
- **`EntityCount[]`**: Statistics data for entity counts
- **`Row<Person>`**: TanStack Table row type

### External Dependencies
- **`@tanstack/react-table`**: For table row type definitions
- **React**: For component structure and hooks

## Best Practices

### Usage Patterns
```tsx
// Recommended: Use in mobile-specific contexts
const MobileView = () => (
  <div className="md:hidden space-y-3">
    {people.map((person, index) => (
      <PeoplePreviewCardMobile
        key={person.id}
        people={person}
        sourcesStats={stats}
        row={tableRows[index]}
      />
    ))}
  </div>
);

// Integration with responsive design
const ResponsivePeopleView = () => (
  <>
    {/* Mobile */}
    <div className="md:hidden">
      <PeoplePreviewCardMobile ... />
    </div>
    
    {/* Desktop */}
    <div className="hidden md:block">
      <PeopleTable ... />
    </div>
  </>
);
```

### Performance Considerations
- Uses `useCallback` for optimized click handling
- Prevents unnecessary re-renders through memoized handlers
- Efficient state management with Zustand store