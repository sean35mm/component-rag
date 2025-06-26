# PeoplePreviewCardSmall Component

## Purpose

The `PeoplePreviewCardSmall` component is a compact card display for person entities in list or grid views. It presents essential person information including avatar, name, description, and article statistics with selection capabilities. The component is optimized for mobile and desktop use, featuring a clean layout with expandable details and progress visualization for entity statistics.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `people` | `Person` | ✅ | - | Person entity containing name, description, image, and wikidataId |
| `row` | `Row<Person>` | ✅ | - | TanStack Table row object for selection state management |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | - | Handler for card click events |
| `isSelected` | `boolean` | ❌ | `false` | Controls selected state styling |
| `isLoading` | `boolean` | ❌ | `false` | Shows loading fallback when true |
| `onMobileExpand` | `(e: React.MouseEvent) => void` | ❌ | - | Handler for mobile expand button, shows button when provided |
| `entityStats` | `EntityCount[]` | ❌ | - | Array of entity statistics for progress visualization |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard div element attributes |

## Usage Example

```tsx
import { PeoplePreviewCardSmall } from '@/components/ui/people-preview-card-small';
import { useTable } from '@tanstack/react-table';

function PeopleList() {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const entityStats = [
    { key: 'Q12345', count: 1250 }, // Max stat for progress calculation
    { key: 'Q67890', count: 890 },
    { key: 'Q11111', count: 445 }
  ];

  const handleCardClick = (person: Person) => {
    // Navigate to person detail or perform action
    router.push(`/people/${person.wikidataId}`);
  };

  const handleMobileExpand = (e: React.MouseEvent, personId: string) => {
    setExpandedId(expandedId === personId ? null : personId);
  };

  return (
    <div className="space-y-4">
      {people.map((person) => (
        <PeoplePreviewCardSmall
          key={person.wikidataId}
          people={person}
          row={table.getRow(person.wikidataId)}
          onClick={() => handleCardClick(person)}
          isSelected={selectedPeople.includes(person)}
          entityStats={entityStats}
          onMobileExpand={(e) => handleMobileExpand(e, person.wikidataId)}
          className="hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Person Name**: `.typography-labelMedium` - Medium label for primary identification
- **Description**: `.typography-labelSmall` - Small label for secondary information  
- **Statistics**: `.typography-subheadingXSmall` - Extra small subheading for numeric data

### Color Tokens
- **Default Border**: `border-pgStroke-250` - Light stroke for card boundaries
- **Selected Border**: `border-pgStroke-950` - Dark stroke for selected state
- **Selected Background**: `bg-pgBackgroundWhiteInv-800` - Inverted background for selection
- **Text Colors**: `color='800'` prop applies `pgText-800` for secondary text

### Tailwind Utilities
- **Layout**: `flex flex-col justify-between` for card structure
- **Spacing**: `px-3 py-2` for card padding, `gap-4` for element spacing
- **Borders**: `rounded-xl border shadow-sm` for card appearance
- **States**: `group hover:` utilities for interactive states

## Styling

### Variants
The component has two main visual states:
- **Default**: Light border with subtle shadow
- **Selected**: Dark border with inverted background color

### States
- **Loading**: Displays `PeoplePreviewCardSmallFallback` skeleton
- **Selected**: Enhanced border and background using selection tokens
- **Hover**: Group hover states available for custom styling
- **Interactive**: Cursor pointer and click handlers

### Customization Options
```tsx
// Custom styling with design system tokens
<PeoplePreviewCardSmall
  className={cn(
    "border-pgStroke-300", // Stronger default border
    "hover:bg-pgBackground-50", // Subtle hover background
    "dark:border-pgStroke-700" // Dark mode adaptation
  )}
  people={person}
  row={row}
/>
```

## Responsive Design

### Breakpoint Adaptations
- **Mobile (default)**: Compact 32px avatar, stacked layout
- **Large screens (lg+)**: Increased margin spacing (`lg:mb-4`)
- **Mobile expand**: Optional expand button for mobile-specific interactions

### Responsive Features
- **Text Truncation**: `line-clamp-1` prevents text overflow
- **Flexible Layout**: `shrink-0` and `max-w-32` for progress section
- **Mobile-first**: Base styles optimized for mobile, enhanced for larger screens

## Accessibility

### ARIA Features
- **Checkbox Integration**: Leverages TanStack Table's selection ARIA patterns
- **Semantic Markup**: Proper heading hierarchy with `<h3>` for person names
- **Interactive States**: Clear focus and selection indicators

### Keyboard Navigation
- **Tab Navigation**: Card and checkbox are keyboard accessible
- **Selection**: Space/Enter key support through checkbox component
- **Focus Management**: Proper focus ring inheritance from base components

### Screen Reader Support
- **Descriptive Content**: Name and description provide context
- **Statistical Data**: Progress component includes accessible value representation
- **Action Context**: Mobile expand button has clear interactive purpose

## Dependencies

### Internal Components
- **Avatar**: Profile image display with fallback initials
- **Checkbox**: Selection state management with table integration
- **CompactButton**: Mobile expand functionality
- **Progress**: Visual statistics representation
- **PropertyBlockMobile**: Mobile-optimized property display
- **Skeleton**: Loading state placeholder
- **Typography**: Design system text rendering

### External Dependencies
- **@tanstack/react-table**: Row selection and table state management
- **@/components/icons**: PiMore2Fill icon component

### Utilities
- **cn**: Conditional className utility for styling
- **nFormatter**: Number formatting for statistics display

### Type Dependencies
- **EntityCount**: Statistics data structure
- **Person**: Person entity type definition