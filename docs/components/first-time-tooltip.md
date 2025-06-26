# FirstTimeTooltip Component

## Purpose

The `FirstTimeTooltip` component displays a helpful tooltip that appears only on the first interaction with an element. Once the user closes the tooltip or clicks the trigger element, it's permanently dismissed using localStorage persistence. This component is ideal for onboarding experiences, feature highlights, or providing contextual help without being intrusive on subsequent visits.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `storageKey` | `string` | ✅ | - | Unique key for localStorage persistence. Should be descriptive and unique across your app |
| `description` | `string` | ✅ | - | Main tooltip content describing the feature or providing help text |
| `title` | `string` | ❌ | `"Filters"` | Tooltip header text displayed prominently |
| `icon` | `ReactNode` | ❌ | `<PiSparklingLine />` | Icon displayed at the start of the tooltip content |
| `children` | `ReactNode` | ✅ | - | The trigger element that the tooltip will be attached to |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | ❌ | `'bottom'` | Position of tooltip relative to trigger element |
| `align` | `'start' \| 'center' \| 'end'` | ❌ | `'start'` | Alignment of tooltip along the specified side |
| `className` | `string` | ❌ | - | Additional CSS classes for tooltip content customization |

## Usage Example

```tsx
import { FirstTimeTooltip } from '@/components/ui/first-time-tooltip';
import { PiFilterLine, PiLightbulbLine } from '@/components/icons';
import { Button } from '@/components/ui/button';

// Basic usage with default styling
<FirstTimeTooltip
  storageKey="filters-intro"
  title="Smart Filters"
  description="Use these filters to quickly find exactly what you're looking for. Try combining multiple filters for better results."
>
  <Button variant="outline">
    <PiFilterLine />
    Filters
  </Button>
</FirstTimeTooltip>

// Custom positioning and icon
<FirstTimeTooltip
  storageKey="export-feature"
  title="New Export Feature"
  description="You can now export your data in multiple formats including CSV, PDF, and Excel."
  icon={<PiLightbulbLine />}
  side="top"
  align="center"
  className="bg-pgBlue-900 border-pgBlue-700"
>
  <Button variant="primary">
    Export Data
  </Button>
</FirstTimeTooltip>

// With form elements
<FirstTimeTooltip
  storageKey="search-tips"
  title="Search Tips"
  description="Use quotes for exact phrases, or try advanced operators like AND, OR to refine your search."
  side="bottom"
  align="start"
>
  <input 
    type="search"
    placeholder="Search..."
    className="px-3 py-2 border border-pgStroke-300 rounded-lg"
  />
</FirstTimeTooltip>
```

## Design System Usage

### Typography Classes
- **Title**: Uses `.typography-labelSmall` for the tooltip header
- **Description**: Uses `.typography-paragraphSmall` for the main content
- Both maintain proper contrast ratios with `color='0'` for title and custom color classes for description

### Color Tokens
- **Background**: Dark theme tooltip with `text-pgText-0` for primary text
- **Description Text**: `text-pgTextInv-700` in light mode, `dark:text-pgNeutral-600` in dark mode
- **Close Button**: `text-pgTextInv-950` with opacity transitions
- **Custom Styling**: Supports all background colors from `pgBackground-*`, `pgBlue-*`, `pgGreen-*` series

### Spacing & Layout
- **Padding**: `p-3` (12px) for comfortable content spacing
- **Gap**: `gap-3` (12px) between icon, content, and close button
- **Gap**: `gap-1` (4px) between title and description for tight grouping
- **Max Width**: `max-w-72` (288px) prevents overly wide tooltips
- **Margin**: `mx-2` (8px horizontal) for screen edge spacing

## Styling

### Available Customization Options

```tsx
// Custom background colors
<FirstTimeTooltip
  className="bg-pgGreen-900 border-pgGreen-700"
  // ... other props
/>

// Different sizes and spacing
<FirstTimeTooltip
  className="max-w-80 p-4"
  // ... other props
/>

// State-based styling
<FirstTimeTooltip
  className="bg-pgStateInformation-dark border-pgStateInformation-base"
  // ... other props
/>
```

### Visual States
- **Default**: Dark background with white text and sparkling icon
- **Hover**: Close button opacity transitions from 50% to 100%
- **Focus**: Inherits focus states from underlying Tooltip component
- **Dismissed**: Component renders only children after first interaction

## Responsive Design

The component adapts across all breakpoints:

- **Mobile (< 640px)**: `mx-2` provides adequate spacing from screen edges
- **Tablet (640px+)**: `max-w-72` prevents tooltip from becoming too wide
- **Desktop (1024px+)**: Collision detection ensures tooltip stays visible
- **All Sizes**: `collisionPadding={{ top: 50 }}` maintains 50px clearance from top edge

## Accessibility

### ARIA Support
- **Close Button**: Includes `aria-label='Close tooltip'` for screen readers
- **Keyboard Navigation**: Inherits focus management from base Tooltip component
- **Role Semantics**: Proper tooltip role and relationship maintained

### Screen Reader Support
- Title and description are properly announced
- Icon is decorative and doesn't interfere with content reading
- Close action is clearly labeled and accessible

### Keyboard Interaction
- **ESC**: Closes tooltip (inherited from Tooltip component)
- **Enter/Space**: On close button dismisses tooltip
- **Tab**: Moves focus appropriately when tooltip is dismissed

## Dependencies

### Required Components
- `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` from `@/components/ui/tooltip`
- `Typography` from `@/components/ui/typography`

### Required Utilities
- `cn` from `@/lib/utils/cn` for className merging
- `useLocalStorage` from `usehooks-ts` for persistence

### Required Icons
- `PiCloseLine` for close button (required)
- `PiSparklingLine` as default icon (can be overridden)

### Peer Dependencies
- Requires proper CSS variable definitions for color system
- Needs Tailwind CSS configuration with design system tokens
- localStorage API availability for persistence functionality

## Implementation Notes

- **Storage Keys**: Use descriptive, unique keys like `"feature-filters-v1"` to avoid conflicts
- **Performance**: Component automatically renders only children after dismissal, avoiding unnecessary re-renders
- **Event Handling**: Preserves existing onClick handlers on trigger elements while adding dismissal logic
- **SSR Safe**: Uses client-side storage safely with proper hydration handling