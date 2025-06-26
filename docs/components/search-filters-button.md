# SearchFiltersButton Component

## Purpose

The `SearchFiltersButton` component provides a toggle button for accessing search filters within the smart search interface. It displays a filter icon with an optional badge showing the number of active filters and includes a first-time user tooltip to guide users on search refinement capabilities.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive button behavior with hover states
- Integrates with `FirstTimeTooltip` which requires client-side storage access
- Handles click events for opening/closing filter panels

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `activeFilters` | `number` | No | `undefined` | Number of currently active filters to display in the badge |
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the button |
| `...rest` | `HTMLAttributes<HTMLButtonElement>` | No | - | Standard HTML button attributes (onClick, disabled, etc.) |

## Usage Example

```tsx
import { SearchFiltersButton } from '@/components/search/smart-search-input/search-filters-button';

// Basic usage
<SearchFiltersButton onClick={toggleFiltersPanel} />

// With active filters count
<SearchFiltersButton 
  activeFilters={3}
  onClick={handleFiltersToggle}
  className="mr-2"
/>

// In a search toolbar
<div className="flex items-center gap-2">
  <SearchInput />
  <SearchFiltersButton 
    activeFilters={filterCount}
    onClick={() => setShowFilters(!showFilters)}
    aria-expanded={showFilters}
    aria-label="Toggle search filters"
  />
</div>
```

## Functionality

### Core Features
- **Filter Icon Display**: Shows a filter line icon to indicate filtering functionality
- **Active Filter Badge**: Displays the number of active filters when `activeFilters > 0`
- **Responsive Design**: Adapts from circular icon-only button on mobile to wider button on desktop
- **First-Time Tooltip**: Shows educational tooltip on first interaction to guide new users
- **Interactive States**: Provides hover effects and visual feedback

### Visual Behavior
- **Mobile**: Circular button (48px) with absolute-positioned badge
- **Desktop**: Wider button with inline badge display
- **Badge**: Only appears when there are active filters, positioned differently per breakpoint

## State Management

**Local State**: No internal state management - relies on parent components for:
- Filter count tracking
- Panel open/closed state
- Filter data management

The component is purely presentational and delegates state management to parent components following our stateless UI component pattern.

## Side Effects

### Storage Interaction
- **Tooltip Storage**: Uses localStorage via `FirstTimeTooltip` with key `'SearchFiltersButtonTutorial'`
- **No Direct API Calls**: Component doesn't make API requests itself

### External Dependencies
- Accesses browser localStorage through the tooltip component
- No other side effects or external service interactions

## Dependencies

### Internal Components
- `@/components/icons` - `PiFilterLine` icon component
- `@/components/ui/first-time-tooltip` - `FirstTimeTooltip` wrapper
- `@/components/ui/typography` - `Typography` for badge text

### Utilities
- `@/lib/utils/cn` - Class name utility for conditional styling

### External Libraries
- `React` - Core React functionality and types

## Integration

### Search Interface Architecture
```
SmartSearchInput/
├── SearchInput
├── SearchFiltersButton ← This component
└── SearchFiltersPanel
```

### Usage Patterns
- **Search Bars**: Companion to search input fields
- **Filter Toggles**: Controls visibility of filter panels
- **Toolbar Integration**: Part of search toolbar assemblies

### Parent Component Requirements
```tsx
// Parent should manage:
const [activeFilterCount, setActiveFilterCount] = useState(0);
const [showFilters, setShowFilters] = useState(false);

// And provide handlers:
const handleToggleFilters = () => setShowFilters(!showFilters);
```

## Best Practices

### Architectural Adherence
✅ **Stateless UI Component**: No internal state, pure presentation layer  
✅ **Composable Design**: Easily integrated into various search interfaces  
✅ **Responsive First**: Mobile-optimized with desktop enhancements  
✅ **Accessibility Ready**: Accepts ARIA attributes via props spreading  

### Usage Guidelines
- **Always provide onClick handler** for functional button behavior
- **Use activeFilters prop** to show current filter state
- **Add ARIA labels** for screen reader accessibility
- **Consider loading states** when filters are being applied

### Performance Considerations
- Lightweight component with minimal re-render triggers
- Conditional badge rendering avoids unnecessary DOM elements
- CSS transitions handled via Tailwind classes for optimal performance

### Integration Best Practices
- Pair with filter state management hooks or stores
- Use within search context providers for consistent behavior
- Consider debouncing filter updates to avoid excessive re-renders