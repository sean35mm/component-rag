# SavedFilterCard Component

## Purpose

The `SavedFilterCard` component renders an interactive card displaying a saved search filter with its metadata, criteria count, and actions. It serves as a clickable interface element that allows users to view, apply, and manage their saved search filters within the search customization settings.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Handles click events and user interactions
- Manages multiple Zustand store states for filters and drawer management
- Requires client-side state updates and callback handling

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `savedFilter` | `SavedFilter` | Yes | The saved filter object containing filter data, metadata, and configuration |
| `className` | `string` | No | Additional CSS classes to apply to the card container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the container |

## Usage Example

```tsx
import { SavedFilterCard } from '@/components/settings/search-customization/saved-filters-list/saved-filters-card';

function SavedFiltersList() {
  const savedFilters = useSavedFilters();

  return (
    <div className="space-y-4">
      {savedFilters.map((filter) => (
        <SavedFilterCard
          key={filter.id}
          savedFilter={filter}
          className="hover:shadow-lg transition-shadow"
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Filter Information Display**: Shows filter name, description, creation date, and ID
- **Criteria Counter**: Calculates and displays the number of active filter criteria
- **Click-to-Apply**: Applies the saved filter when the card is clicked
- **Options Menu**: Provides additional actions through the integrated `CardOptionsMenu`
- **Visual Feedback**: Styled with hover states and visual hierarchy

### Interactive Behavior
- Clicking the card applies the filter and opens the filters drawer in edit mode
- Processes saved filter data into applicable filter state
- Updates multiple store states simultaneously for seamless user experience

## State Management

### Zustand Stores
- **`useFiltersDrawerStore`**: Manages drawer visibility and filter application
- **`useSavedFiltersStore`**: Handles edit mode state and filter selection

### State Actions
```tsx
// Filter drawer management
const onIsOpenChange = useFiltersDrawerStore((state) => state.onIsOpenChange);
const onFiltersApply = useFiltersDrawerStore((state) => state.onFiltersApply);

// Saved filters management
const setIsEditMode = useSavedFiltersStore((state) => state.setIsEditMode);
const setSavedFilterToEdit = useSavedFiltersStore((state) => state.setSavedFilterToEdit);
const setFilterName = useSavedFiltersStore((state) => state.setFilterName);
```

## Side Effects

### Click Handler Effects
When a card is clicked, the following side effects occur:
1. Converts saved filter data to applicable filter format
2. Applies filters to the current search context
3. Sets the filter as the current edit target
4. Enables edit mode in the saved filters store
5. Opens the filters drawer

## Dependencies

### UI Components
- `Typography` - Text rendering with consistent styling
- `PiFilterLine` - Filter icon from the icon library

### Related Components
- `CardOptionsMenu` - Provides additional filter management actions

### Utilities & Services
- `mapSavedFilterQueryToFilters` - Converts saved filter data to filter state
- `filtersToCounter` - Calculates the number of active filter criteria
- `formatDate` - Formats the creation date display
- `cn` - Utility for conditional className handling

### Types
- `SavedFilter` - TypeScript interface for saved filter objects

## Integration

### Application Architecture
The component integrates into the search customization flow:

```
Settings → Search Customization → Saved Filters List → SavedFilterCard
                                                    ↓
                                              Filters Drawer (Edit Mode)
```

### Store Integration
- Coordinates between filters drawer and saved filters stores
- Maintains state consistency across filter management interfaces
- Enables seamless transition from saved filter selection to active filtering

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive functionality
- ✅ **Component Decomposition**: Delegates options functionality to separate `CardOptionsMenu` component
- ✅ **State Management**: Uses Zustand stores for client state management
- ✅ **Reusability**: Accepts standard HTML props for flexible styling and behavior

### Implementation Patterns
- **Memoized Calculations**: Uses `useMemo` for expensive filter counter calculations
- **Callback Optimization**: Uses `useCallback` for click handler to prevent unnecessary re-renders
- **Props Spreading**: Properly spreads HTML attributes while extracting component-specific props
- **Consistent Styling**: Uses design system typography variants and color tokens

### Performance Considerations
- Memoizes filter counter computation to avoid recalculation on every render
- Optimizes callback dependencies to minimize re-render cycles
- Efficient store selectors to prevent unnecessary subscriptions