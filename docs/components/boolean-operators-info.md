# BooleanOperatorsInfo Component

## Purpose

The `BooleanOperatorsInfo` component is an informational UI element that educates users about boolean search operators. It displays available operators (AND, OR, NOT, *) with visual emphasis and provides a link to detailed documentation about boolean syntax. This component is typically used in search interfaces or forms where boolean operators are supported.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to customize the component styling |
| `...props` | `HTMLAttributes<HTMLDivElement>` | No | - | All standard HTML div attributes are passed through |

## Usage Example

```tsx
import { BooleanOperatorsInfo } from '@/components/ui/boolean-operators-info';

// Basic usage
export function SearchForm() {
  return (
    <div className="w-full max-w-md">
      <input 
        type="text" 
        placeholder="Enter search terms..."
        className="w-full p-3 border border-pgStroke-200 rounded-t-2xl"
      />
      <BooleanOperatorsInfo />
    </div>
  );
}

// With custom styling
export function AdvancedSearchForm() {
  return (
    <div className="w-full max-w-lg">
      <textarea 
        placeholder="Enter complex search query..."
        className="w-full p-4 border border-pgStroke-200 rounded-t-2xl"
        rows={3}
      />
      <BooleanOperatorsInfo 
        className="border-pgStroke-300 bg-pgBackground-50" 
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- `.typography-paragraphXSmall` - Used for main descriptive text
- `.typography-paragraph3XSmall` - Used for operator labels within shortcuts

### Color Tokens
- **Background**: `bg-pgBackground-100` - Light background for the info panel
- **Border**: `border-pgStroke-200` - Subtle border separation
- **Text Colors**:
  - `text-pgText-400` - Secondary text for descriptions
  - `text-pgText-600` - Emphasized text for operators
  - `text-pgBackgroundBlueTintDark` - Link color with blue tint

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `items-center`, `gap-1`, `gap-2`
- **Spacing**: `px-5`, `py-3`, `lg:px-6`, `ml-1`
- **Borders**: `rounded-b-2xl`, `border-t`
- **Sizing**: `w-full`, `size-4`, `size-3.5`
- **Typography**: `line-clamp-1`

## Variants

This component does not use CVA variants but relies on conditional rendering for responsive behavior:

- **Mobile Layout**: Shows "Operators" label
- **Desktop Layout**: Shows "Boolean operators" label (more descriptive)

## Styling

### Base Styles
- Rounded bottom corners (`rounded-b-2xl`) to pair with form inputs
- Top border separator to distinguish from connected elements
- Light background with subtle contrast
- Flexible layout that adapts to content

### Customization Options
```tsx
// Custom background
<BooleanOperatorsInfo className="bg-pgNeutral-50" />

// Custom border
<BooleanOperatorsInfo className="border-pgStroke-300" />

// Custom spacing
<BooleanOperatorsInfo className="px-8 py-4" />

// Dark theme adaptation
<BooleanOperatorsInfo className="bg-pgNeutral-800 border-pgStroke-700" />
```

## Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 768px)** | Shows abbreviated "Operators" label to save space |
| **Desktop (≥ 768px)** | Shows full "Boolean operators" label for clarity |
| **Large (≥ 1024px)** | Increases horizontal padding from `px-5` to `lg:px-6` |

The component maintains consistent operator display and functionality across all breakpoints while optimizing text labels for available space.

## Accessibility

### Features
- **Semantic HTML**: Uses proper div structure with meaningful content
- **Icon Accessibility**: Information icon provides visual context
- **External Link Indication**: Arrow icon indicates external navigation
- **Text Truncation**: `line-clamp-1` prevents layout overflow while maintaining readability
- **Focus Management**: Link receives proper focus styling through Tailwind defaults

### ARIA Considerations
- The component relies on descriptive text content for screen readers
- External link opens in new tab (`target='_blank'`) with visual indication
- Consider adding `aria-label` for the information icon if enhanced accessibility is needed

## Dependencies

### Internal Components
- `Typography` - Provides consistent text styling with design system integration
- `Shortcut` - Creates visually distinct operator badges
- `PiInformationLine`, `PiArrowRightUpLine` - Phosphor icons for visual enhancement

### External Dependencies
- `NextLink` - Next.js optimized link component for external navigation
- `cn` utility - Class name concatenation utility for conditional styling

### Related Components
This component pairs well with:
- Search input fields
- Advanced search forms
- Filter interfaces
- Query builders

## Customization

### Extending Styles
```tsx
// Custom operator styling
<BooleanOperatorsInfo className="[&_.shortcut]:bg-pgBlue-100 [&_.shortcut]:text-pgBlue-700" />

// Custom link styling
<BooleanOperatorsInfo className="[&_a]:text-pgGreen-600 [&_a:hover]:text-pgGreen-700" />

// Custom layout
<BooleanOperatorsInfo className="flex-row justify-between items-start" />

// Custom responsive behavior
<BooleanOperatorsInfo className="lg:rounded-2xl lg:border lg:m-4" />
```

### Integration Patterns
```tsx
// With form validation
<div className="relative">
  <SearchInput error={hasError} />
  <BooleanOperatorsInfo className={cn(
    hasError && "border-pgRed-200 bg-pgRed-50"
  )} />
</div>

// With conditional display
{showHelp && <BooleanOperatorsInfo />}

// With animation
<BooleanOperatorsInfo className="animate-in slide-in-from-top-2" />
```