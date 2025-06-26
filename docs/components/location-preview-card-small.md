# LocationPreviewCardSmall Component

## Purpose

The `LocationPreviewCardSmall` component renders a compact, interactive card displaying location information with entity statistics. It's designed for use in table rows or list views where locations need to be displayed with selection capabilities, expandable mobile actions, and visual progress indicators for article counts. The component includes a loading fallback state and supports both selected and unselected visual states.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `location` | `LocationsFilter` | ✅ | Location data object containing name, type, and country information |
| `row` | `Row<EntityCount>` | ✅ | TanStack Table row object for selection state management |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | Handler for card click events |
| `isSelected` | `boolean` | ❌ | Controls selected visual state of the card |
| `isLoading` | `boolean` | ❌ | Shows loading fallback when true |
| `onMobileExpand` | `(e: React.MouseEvent) => void` | ❌ | Handler for mobile expand button (shows button when provided) |
| `entityStats` | `EntityCount[]` | ❌ | Array of entity statistics for progress visualization |
| `className` | `string` | ❌ | Additional CSS classes for customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | Standard HTML div attributes |

## Usage Example

```tsx
import { LocationPreviewCardSmall } from '@/components/ui/location-preview-card-small';
import { LocationsFilter, EntityCount } from '@/lib/types';

const exampleLocation: LocationsFilter = {
  name: 'San Francisco',
  type: LocationsFilterType.CITY,
  country: {
    name: 'United States'
  }
};

const entityStats: EntityCount[] = [
  { key: 'sf', count: 1250 },
  { key: 'la', count: 980 },
  { key: 'nyc', count: 2100 }
];

function LocationList() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <LocationPreviewCardSmall
        location={exampleLocation}
        row={tableRow}
        entityStats={entityStats}
        isSelected={selectedLocation === 'sf'}
        onClick={(e) => setSelectedLocation('sf')}
        onMobileExpand={(e) => console.log('Mobile expand clicked')}
        className="hover:shadow-md transition-shadow"
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-labelMedium`** - Location name heading
- **`.typography-labelSmall`** - Country name text
- **`.typography-subheadingXSmall`** - Article count numbers

### Color Tokens
- **Borders**: `pgStroke-250` (default), `pgStroke-950` (selected)
- **Backgrounds**: `pgBackgroundWhiteInv-800` (selected state)
- **Text Colors**: `color='800'` prop for secondary text

### Spacing & Layout
- **Padding**: `px-3 py-2` for card content
- **Margins**: `mb-2 lg:mb-4` for card spacing
- **Gaps**: `gap-4` for main content, `gap-2` for skeleton elements

### Interactive States
- Group hover effects with `group` class
- Cursor pointer for clickable areas
- Transition effects for smooth interactions

## Styling

### Variants
- **Default State**: Light border with subtle shadow
- **Selected State**: Dark border with background highlight
- **Loading State**: Skeleton placeholder with similar dimensions

### Customization Options
```tsx
// Custom styling example
<LocationPreviewCardSmall
  className={cn(
    'hover:border-pgBlue-500', // Custom hover border
    'transition-all duration-200', // Smooth transitions
    'lg:px-6 lg:py-4' // Larger padding on desktop
  )}
  location={location}
  row={row}
/>
```

### State Classes
```css
/* Applied states */
.border-pgStroke-250         /* Default border */
.border-pgStroke-950         /* Selected border */
.bg-pgBackgroundWhiteInv-800 /* Selected background */
.shadow-sm                   /* Subtle elevation */
```

## Responsive Design

### Breakpoint Adaptations
- **Mobile (`< lg`)**: 
  - Margin bottom: `mb-2`
  - Compact spacing and mobile expand button
  - Single column layout for properties

- **Desktop (`lg+`)**:
  - Margin bottom: `mb-4` 
  - More generous spacing
  - Optimized for wider screens

### Mobile-Specific Features
- **Expand Button**: Only shows when `onMobileExpand` prop is provided
- **Compact Button**: Size-6 circular button with more icon
- **Touch-Friendly**: Adequate touch targets and spacing

## Accessibility

### ARIA Features
- **Semantic Structure**: Uses proper heading hierarchy with `h3`
- **Checkbox Integration**: Proper selection state management
- **Keyboard Navigation**: Clickable areas support keyboard interaction

### Screen Reader Support
```tsx
// Checkbox provides selection context
<Checkbox
  data-action='table-action'
  checked={row.getIsSelected()}
  onClick={row.getToggleSelectedHandler()}
/>

// Semantic heading for location name
<Typography as='h3' variant='labelMedium'>
  {location.name}
</Typography>
```

### Focus Management
- Clickable card with proper focus indicators
- Button elements maintain focus visibility
- Checkbox state clearly communicated

## Dependencies

### Internal Components
- **`Avatar`** - User/location avatar display
- **`Checkbox`** - Selection state management
- **`CompactButton`** - Mobile expand action
- **`Progress`** - Article count visualization
- **`PropertyBlockMobile`** - Mobile property display
- **`Skeleton`** - Loading state placeholder
- **`Typography`** - Text rendering with design system

### External Dependencies
- **`@tanstack/react-table`** - Row selection management
- **`@/components/icons`** - PiMore2Fill icon

### Utilities
- **`cn`** - Conditional className utility
- **`nFormatter`** - Number formatting for statistics

### Type Dependencies
- **`LocationsFilter`** - Location data structure
- **`EntityCount`** - Statistics data structure
- **`LocationsFilterType`** - Location type enumeration