# LocationPreviewCardMobile

## Purpose

The `LocationPreviewCardMobile` component is a mobile-optimized wrapper for location preview cards that handles user interactions to open a detail drawer. It provides a clickable interface for location data with entity statistics, specifically designed for mobile table row interactions.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `location` | `LocationsFilter` | ✅ | The location data object containing location information |
| `entityStats` | `EntityCount[]` | ❌ | Optional array of entity count statistics for the location |
| `row` | `Row<EntityCount>` | ✅ | TanStack Table row object containing the original entity count data |

## Usage Example

```tsx
import { LocationPreviewCardMobile } from '@/components/ui/location-preview-card-mobile';
import { LocationsFilter, EntityCount } from '@/lib/types';

function LocationTable() {
  const locationData: LocationsFilter = {
    id: '123',
    name: 'San Francisco Office',
    address: '123 Market St, San Francisco, CA',
    // ... other location properties
  };

  const entityStats: EntityCount[] = [
    { type: 'employees', count: 45 },
    { type: 'departments', count: 8 },
    { type: 'assets', count: 120 }
  ];

  return (
    <div className="bg-pgBackground-50 p-4 space-y-4">
      <LocationPreviewCardMobile
        location={locationData}
        entityStats={entityStats}
        row={tableRow}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Inherits typography from `LocationPreviewCardSmall` component
- Uses system typography scales for location names and statistics

### Colors
- **Background**: `bg-pgBackground-0` - Primary background for the card
- **Container**: Adapts to light/dark mode using design system color variables

### Spacing
- **Padding**: `p-4` (16px) - Standard card padding using Tailwind spacing scale
- Follows 4px base unit system for consistent spacing

## Styling

### Base Styling
```tsx
<LocationPreviewCardSmall
  className="bg-pgBackground-0 p-4"
  // ... other props
/>
```

### Customization Options
- Inherits all styling options from `LocationPreviewCardSmall`
- Background color can be customized using design system color tokens:
  - `bg-pgBackground-50` - Subtle background
  - `bg-pgNeutral-0` - Pure white/dark equivalent
  - `bg-pgBackground-100` - Slightly elevated appearance

### State Variations
- **Default**: Clean background with standard padding
- **Interactive**: Click handlers for drawer expansion
- **Conditional**: Prevents action on table-specific elements

## Responsive Design

### Mobile Optimization
- Specifically designed for mobile table interactions
- Uses `onMobileExpand` callback for mobile-specific behavior
- Breakpoint considerations:
  - **sm (640px) and below**: Primary usage target
  - **md (768px) and above**: May be replaced by desktop variants

### Responsive Spacing
```tsx
// Example responsive customization
className="bg-pgBackground-0 p-4 sm:p-6 md:hidden"
```

## Accessibility

### Interaction Handling
- **Click Events**: Properly scoped to avoid conflicts with table actions
- **Event Delegation**: Uses `data-action` attributes to prevent unwanted triggers
- **Keyboard Support**: Inherits keyboard navigation from `LocationPreviewCardSmall`

### Screen Reader Support
- Semantic structure maintained through child component
- Location data presented in accessible format
- Entity statistics properly labeled

### Focus Management
- Clickable area clearly defined
- Focus states handled by underlying card component

## Dependencies

### Internal Components
- **LocationPreviewCardSmall**: Core preview card component that handles display logic
- **useEntityDetailDrawerStore**: Zustand store for drawer state management

### External Dependencies
- **@tanstack/react-table**: For table row type definitions
- **React**: For component functionality and event handling

### Related Components
```tsx
// Typical usage alongside related components
import { LocationPreviewCardMobile } from '@/components/ui/location-preview-card-mobile';
import { LocationPreviewCardSmall } from '@/components/ui/location-preview-card-small';
import { EntityDetailDrawer } from '@/components/ui/entity-detail-drawer';
```

### Store Integration
```tsx
// Store usage pattern
const { setLocation, setIsOpen } = useEntityDetailDrawerStore();

// In component
const handleClick = useCallback((e) => {
  setLocation(row.original);
  setIsOpen(true);
}, [row.original]);
```

## Implementation Notes

### Event Handling
- Uses `useCallback` for performance optimization
- Implements event delegation to avoid table action conflicts
- Provides both `onMobileExpand` and `onClick` handlers for flexibility

### State Management
- Integrates with global drawer state using Zustand
- Passes original row data to drawer for detailed view
- Maintains separation between table actions and card interactions