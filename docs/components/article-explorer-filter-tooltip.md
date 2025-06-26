# ArticleExplorerFilterTooltip

A compact tooltip component designed to provide contextual information for filter options in the article explorer interface. Displays a title and description in a constrained layout optimized for tooltip content.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | The heading text for the tooltip |
| `description` | `string` | ✅ | The descriptive text explaining the filter option |

## Usage Example

```tsx
import { ArticleExplorerFilterTooltip } from '@/components/ui/article-explorer/article-explorer-filter-tooltip';

function FilterExample() {
  return (
    <div className="relative">
      {/* Tooltip triggered by hover/focus */}
      <ArticleExplorerFilterTooltip
        title="Publication Date"
        description="Filter articles by when they were originally published or last updated"
      />
    </div>
  );
}

// Usage within a tooltip trigger
function FilterWithTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="bg-pgNeutral-100 hover:bg-pgNeutral-200 px-3 py-2 rounded">
          Date Filter
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <ArticleExplorerFilterTooltip
          title="Publication Date"
          description="Filter articles by when they were originally published or last updated"
        />
      </TooltipContent>
    </Tooltip>
  );
}
```

## Design System Usage

### Typography Classes
- **Title**: Uses `.typography-subheadingXSmall` for compact yet readable headings
- **Description**: Uses `.typography-paragraphXSmall` for detailed explanatory text

### Colors
- **Title Text**: `pgText-800` for strong readability and hierarchy
- **Description Text**: `pgText-700` for secondary information with good contrast

### Layout
- **Container**: `flex flex-col` for vertical stacking
- **Max Width**: `max-w-[12.5rem]` (200px) to maintain compact tooltip sizing
- **Text Wrapping**: `whitespace-normal` on description for proper text flow

## Variants

This component doesn't use CVA variants but relies on the Typography component's built-in variants:

- **Title Variant**: `subheadingXSmall` - Compact heading appropriate for tooltips
- **Description Variant**: `paragraphXSmall` - Small body text for detailed descriptions

## Styling

### Fixed Styling
- Constrained width design optimized for tooltip containers
- Vertical flex layout with natural spacing
- Semantic color hierarchy with title darker than description

### Customization Options
```tsx
// The component accepts standard React props and can be wrapped for additional styling
<div className="p-2 bg-pgNeutral-50 rounded-md border border-pgStroke-200">
  <ArticleExplorerFilterTooltip
    title="Custom Filter"
    description="Extended description with custom container styling"
  />
</div>
```

## Responsive Design

- **Base Design**: Mobile-first with compact 200px max-width
- **Breakpoint Adaptation**: Width constraint works across all breakpoints
- **Text Behavior**: `whitespace-normal` ensures proper wrapping on smaller screens

## Accessibility

### Built-in Features
- Semantic HTML structure with proper heading hierarchy
- High contrast color combinations (800/700 on light backgrounds)
- Readable typography scales designed for accessibility

### Implementation Considerations
```tsx
// When used in tooltips, ensure proper ARIA labeling
<Tooltip>
  <TooltipTrigger aria-describedby="filter-tooltip">
    Filter Button
  </TooltipTrigger>
  <TooltipContent id="filter-tooltip" role="tooltip">
    <ArticleExplorerFilterTooltip
      title="Filter Name"
      description="Detailed explanation of filter functionality"
    />
  </TooltipContent>
</Tooltip>
```

## Dependencies

### Required Components
- **Typography**: `@/components/ui/typography` - Provides consistent text styling and design system integration

### Recommended Pairings
- **Tooltip**: For interactive tooltip containers
- **Popover**: For more complex filter explanations
- **Button**: As tooltip triggers for filter options

## Customization

### Extending with className
```tsx
// Custom spacing and background
<div className="p-3 bg-pgBackground-50 rounded-lg">
  <ArticleExplorerFilterTooltip
    title="Enhanced Filter"
    description="Custom container with enhanced styling"
  />
</div>

// Dark mode adaptation
<div className="dark:bg-pgBackground-900 p-2 rounded">
  <ArticleExplorerFilterTooltip
    title="Dark Mode Filter"
    description="Automatically adapts to dark mode through design system tokens"
  />
</div>
```

### Typography Customization
Since the component uses the Typography component internally, it automatically inherits:
- Dark mode color adaptations
- Responsive typography scaling
- Design system color token updates

### Layout Variations
```tsx
// Wider tooltip for complex filters
<div className="max-w-xs">
  <ArticleExplorerFilterTooltip
    title="Complex Filter"
    description="Longer description that benefits from additional width for better readability"
  />
</div>

// Inline tooltip content
<div className="flex items-start gap-2">
  <Icon className="mt-1 text-pgNeutral-600" />
  <ArticleExplorerFilterTooltip
    title="Icon Filter"
    description="Tooltip content paired with contextual icons"
  />
</div>
```