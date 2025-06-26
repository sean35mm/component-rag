# AnswersThreadFilterButton Component

## Purpose

The `AnswersThreadFilterButton` is a specialized filter button component designed for thread filtering in the answers interface. It provides users with a visual interface to access and customize chat sources, filters, and other thread-related options. The component includes an optional counter badge and a first-time user tooltip to guide new users on its functionality.

## Component Type

**Client Component** - This component uses interactive features including:
- Button click handlers and hover states
- First-time tooltip with localStorage interaction
- Dynamic styling based on user interactions
- Conditional rendering of counter badge

The component requires client-side JavaScript for proper functionality.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `counter` | `number \| undefined` | Optional | `undefined` | Number to display in the counter badge. When `null` or `undefined`, no badge is shown |
| `className` | `string` | Optional | `undefined` | Additional CSS classes to apply to the button |
| `...other` | `ButtonHTMLAttributes<HTMLButtonElement>` | Optional | - | All standard HTML button attributes except `children` |

## Usage Example

```tsx
import { AnswersThreadFilterButton } from '@/components/answers/thread-filter-button';

// Basic usage without counter
function AnswersHeader() {
  return (
    <div className="flex items-center gap-2">
      <AnswersThreadFilterButton 
        onClick={() => openFilterModal()}
        aria-label="Open filter options"
      />
    </div>
  );
}

// With counter badge
function AnswersHeaderWithFilters() {
  const activeFiltersCount = 3;
  
  return (
    <div className="flex items-center gap-2">
      <AnswersThreadFilterButton 
        counter={activeFiltersCount}
        onClick={() => openFilterModal()}
        disabled={isLoading}
        className="ml-auto"
      />
    </div>
  );
}

// Accessing the tooltip storage key
import { TOOLTIP_STORAGE_KEY } from '@/components/answers/thread-filter-button';

function resetTutorials() {
  localStorage.removeItem(TOOLTIP_STORAGE_KEY);
}
```

## Functionality

### Core Features
- **Filter Icon Display**: Shows a filter line icon to indicate filtering functionality
- **Counter Badge**: Conditionally displays a numbered badge indicating active filters or selections
- **First-Time Tooltip**: Provides educational tooltip for new users explaining the button's purpose
- **Responsive Design**: Adapts padding and icon size across different screen sizes (mobile vs desktop)
- **Interactive States**: Provides hover effects and disabled state styling

### Visual Behavior
- Rounded button with border and shadow styling
- Icon transitions from muted to full opacity on hover
- Counter badge positioned absolutely on mobile (top-right corner) and inline on desktop
- Disabled state with reduced opacity and no pointer events

## State Management

**Local State Only** - This component doesn't use TanStack Query or Zustand:
- **Tooltip State**: Managed internally by `FirstTimeTooltip` component using localStorage
- **Visual State**: Handled through CSS classes and transitions
- **Props State**: Receives counter and interaction handlers from parent components

The component follows the stateless pattern, receiving all necessary data through props.

## Side Effects

### Storage Interactions
- **Tooltip Persistence**: Uses localStorage to track whether the first-time tooltip has been shown
- **Storage Key**: `AnswersThreadFilterButtonTutorial` for tooltip state management

### No External API Calls
- Component is purely presentational and interactive
- Data fetching and filter logic handled by parent components

## Dependencies

### Internal Components
- `FirstTimeTooltip` - Provides educational overlay for new users
- `PiFilterLine` - Filter icon from the icon library

### Utilities
- `cn` - Class name utility for conditional styling

### External Libraries
- React's `forwardRef` for ref forwarding to enable parent component control

## Integration

### Application Architecture Role
- **Feature Component**: Domain-specific component for the answers interface
- **User Interface Layer**: Provides interaction point for filter functionality
- **Educational Layer**: Guides new users through filter capabilities

### Parent Component Integration
```tsx
// Typical parent component usage
function AnswersInterface() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: activeFilters } = useActiveFilters();
  
  return (
    <div className="answers-header">
      <AnswersThreadFilterButton 
        counter={activeFilters?.length}
        onClick={() => setIsFilterOpen(true)}
      />
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  );
}
```

## Best Practices

### Architecture Alignment
✅ **Proper Decomposition**: Single-responsibility component focused on filter button UI  
✅ **Reusable Design**: Accepts standard button props for flexibility  
✅ **Domain Organization**: Located in `/answers/` directory following feature-based structure  
✅ **Client Component Usage**: Appropriately uses client-side features only where needed  

### Implementation Guidelines
- Use `counter` prop to indicate active filter count
- Provide accessible `aria-label` for screen readers
- Handle loading states through `disabled` prop
- Export `TOOLTIP_STORAGE_KEY` for tutorial management in parent components
- Forward refs to enable parent component control over focus and DOM manipulation

### Performance Considerations
- Lightweight component with minimal re-renders
- CSS transitions for smooth interactions
- Conditional rendering of counter badge to avoid unnecessary DOM elements