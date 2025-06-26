# SourcePreviewCardSmall Component

## Purpose

The `SourcePreviewCardSmall` component is a compact, interactive card that displays source/publication information in a condensed format. It's designed for use in lists, tables, or grids where space is limited but essential source details need to be accessible. The component includes selection functionality, expandable details on mobile, and visual statistics representation.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `source` | `Source` | ✅ | - | The source object containing name, domain, logo, location, and visit data |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | - | Handler for card click events |
| `isSelected` | `boolean` | ❌ | `false` | Controls selected state styling |
| `isLoading` | `boolean` | ❌ | `false` | Shows skeleton fallback when true |
| `onMobileExpand` | `(e: React.MouseEvent) => void` | ❌ | - | Handler for mobile expand button (shows expand icon when provided) |
| `sourcesStats` | `EntityCount[]` | ❌ | - | Array of statistics for progress visualization |
| `row` | `Row<Source>` | ✅ | - | TanStack table row object for selection management |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Additional HTML div attributes |

## Usage Example

```tsx
import { SourcePreviewCardSmall } from '@/components/ui/source-preview-card-small';

function SourcesList() {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  
  const sourcesStats = [
    { key: 'example.com', count: 1250 },
    { key: 'news-site.com', count: 890 },
  ];

  const handleSourceClick = (sourceId: string) => {
    console.log('Source clicked:', sourceId);
  };

  const handleMobileExpand = (e: React.MouseEvent) => {
    // Handle mobile expansion logic
    console.log('Expanding mobile view');
  };

  return (
    <div className="space-y-2">
      {sources.map((source, index) => (
        <SourcePreviewCardSmall
          key={source.id}
          source={source}
          row={table.getRow(index.toString())}
          isSelected={selectedSources.includes(source.id)}
          onClick={() => handleSourceClick(source.id)}
          onMobileExpand={handleMobileExpand}
          sourcesStats={sourcesStats}
          className="hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-labelMedium`** - Source name/title
- **`.typography-paragraphXSmall`** - Domain text with reduced opacity
- **`.typography-labelSmall`** - Property values (country, monthly reach)
- **`.typography-subheadingXSmall`** - Article count numbers

### Color Tokens
- **Border Colors**: 
  - `pgStroke-250` - Default border
  - `pgStroke-950` - Selected state border
- **Background Colors**:
  - `pgBackgroundWhiteInv-800` - Selected state and skeleton background
- **Text Colors**:
  - `pgText-600` - Secondary text with opacity variants
  - Color variants: `600`, `800` for text hierarchy

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `items-center`, `justify-between`
- **Spacing**: `gap-4`, `px-3`, `py-2`, `mt-3.5`, `mb-2`, `lg:mb-4`
- **Sizing**: `size-6`, `size-4`, `size-32`, `max-w-32`
- **Border**: `rounded-xl`, `border`
- **Effects**: `shadow-sm`, `line-clamp-1`
- **Interactive**: `cursor-pointer`, `group`

## Styling

### States
- **Default**: Clean card with subtle border and shadow
- **Selected**: Enhanced border (`pgStroke-950`) and background (`pgBackgroundWhiteInv-800`)
- **Loading**: Skeleton fallback with animated placeholders
- **Hover**: Group hover states for interactive elements

### Customization Options
```tsx
// Custom styling example
<SourcePreviewCardSmall
  source={source}
  row={row}
  className="border-2 hover:border-pgBlue-500 transition-colors"
  onClick={handleClick}
/>
```

### Visual Variants
- **With Statistics**: Shows progress bar and article count when `sourcesStats` provided
- **Mobile Expandable**: Shows expand button when `onMobileExpand` provided
- **Minimal**: Basic card without optional properties

## Responsive Design

| Breakpoint | Behavior |
|------------|----------|
| **Mobile** (`< 640px`) | Compact layout, optional expand button visible |
| **Tablet** (`md: 768px+`) | Same compact layout maintained |
| **Desktop** (`lg: 1024px+`) | Increased bottom margin (`lg:mb-4` vs `mb-2`) |

### Responsive Features
- Progress bar with `max-w-32` constraint prevents overflow
- Icon sizing remains consistent across breakpoints
- Mobile-specific expand functionality

## Accessibility

### ARIA Features
- **Semantic Structure**: Uses proper heading hierarchy with `<h3>` for source names
- **Interactive Elements**: Checkbox and buttons properly handle click events
- **Focus Management**: Click handlers include proper event propagation control

### Keyboard Navigation
- **Tab Order**: Checkbox → Expand button (if present) → Card container
- **Event Handling**: `e.stopPropagation()` prevents unintended selections
- **Screen Reader Support**: Meaningful text content and proper semantic markup

### Best Practices
```tsx
// Ensure row selection is accessible
<Checkbox
  data-action='table-action'
  checked={row.getIsSelected()}
  onClick={row.getToggleSelectedHandler()}
  aria-label={`Select ${source.name}`}
/>
```

## Dependencies

### Internal Components
- **`Avatar`** - Displays source logo/favicon
- **`Checkbox`** - Selection control with table integration
- **`CompactButton`** - Mobile expand action
- **`Progress`** - Statistics visualization
- **`PropertyBlockMobile`** - Structured property display
- **`Skeleton`** - Loading state fallback
- **`Typography`** - Consistent text rendering

### External Dependencies
- **`@tanstack/react-table`** - Row selection management
- **React Icons**: `PiMore2Fill`, `PiTeamFill`

### Utilities
- **`cn`** - Class name concatenation utility
- **`nFormatter`** - Number formatting for statistics

### Type Dependencies
- **`Source`** - Main data interface
- **`EntityCount`** - Statistics data structure

The component seamlessly integrates with table selection systems and maintains consistency with the design system's visual hierarchy and interaction patterns.