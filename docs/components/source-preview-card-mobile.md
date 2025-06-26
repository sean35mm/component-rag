# SourcePreviewCardMobile

## Purpose

The `SourcePreviewCardMobile` component is a mobile-optimized wrapper for displaying source preview cards. It provides interactive functionality for opening detailed source information in a drawer interface on mobile devices. The component handles click events to distinguish between table actions and card expansion, making it suitable for touch interfaces.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `Source` | ✅ | The source data object containing information to display |
| `sourcesStats` | `EntityCount[]` | ❌ | Optional statistics data for the source |
| `row` | `Row<Source>` | ✅ | TanStack table row object for the source data |

## Usage Example

```tsx
import { SourcePreviewCardMobile } from '@/components/ui/source-preview-card-mobile';
import { Source, EntityCount } from '@/lib/types';
import { Row } from '@tanstack/react-table';

function MobileSourcesGrid({ sources, stats, tableRows }: {
  sources: Source[];
  stats: EntityCount[];
  tableRows: Row<Source>[];
}) {
  return (
    <div className="grid gap-4 p-4 md:hidden">
      {sources.map((source, index) => (
        <SourcePreviewCardMobile
          key={source.id}
          source={source}
          sourcesStats={stats}
          row={tableRows[index]}
        />
      ))}
    </div>
  );
}

// Example with responsive container
function ResponsiveSourcesList() {
  return (
    <div className="bg-pgBackground-0 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Mobile view */}
        <div className="block md:hidden">
          <SourcePreviewCardMobile
            source={sampleSource}
            sourcesStats={sampleStats}
            row={sampleRow}
          />
        </div>
        
        {/* Desktop view */}
        <div className="hidden md:block">
          {/* Desktop table or grid component */}
        </div>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Inherits typography from `SourcePreviewCardSmall` component
- Likely uses `.typography-labelMedium` for source names
- `.typography-paragraphSmall` for descriptions and metadata
- `.typography-label2XSmall` for status indicators and counts

### Color Tokens
- **Background**: `bg-pgBackground-0` - Primary background color with dark mode support
- **Interactive States**: Inherits hover and active states from the wrapped component
- **Text Colors**: Inherits `text-pgText-950` for primary text and `text-pgText-600` for secondary text

### Spacing & Layout
- **Padding**: `p-4` (16px) for consistent mobile touch targets
- **Responsive**: Designed for mobile-first approach with touch-friendly spacing

## Styling

### Base Styles
```tsx
// Default mobile card styling
<SourcePreviewCardMobile 
  className="bg-pgBackground-0 p-4" // Applied automatically
/>
```

### Customization Options
The component passes through styling to `SourcePreviewCardSmall`, allowing for:

```tsx
// Custom background variations
<SourcePreviewCardMobile 
  // Wrapper inherits bg-pgBackground-0 p-4
  source={source}
  row={row}
/>

// The internal SourcePreviewCardSmall can be styled through its props
```

### State Variations
- **Default**: Clean background with subtle borders
- **Interactive**: Touch-responsive with appropriate feedback
- **Expanded**: Triggers drawer opening with smooth transitions

## Responsive Design

### Mobile-First Approach
- **Base (Mobile)**: Optimized for touch interactions with adequate padding
- **SM (640px+)**: Maintains mobile optimization
- **MD (768px+)**: Typically hidden in favor of desktop layouts

### Usage Patterns
```tsx
// Responsive visibility pattern
<div className="block md:hidden">
  <SourcePreviewCardMobile {...props} />
</div>

<div className="hidden md:block">
  {/* Desktop alternative */}
</div>
```

## Accessibility

### Keyboard Navigation
- Supports keyboard interaction through click handlers
- Proper focus management when drawer opens

### Touch Interactions
- **Touch Targets**: Minimum 44px touch targets through `p-4` padding
- **Event Handling**: Distinguishes between different interactive elements using `data-action` attributes
- **Feedback**: Visual feedback on touch interactions

### Screen Readers
- Inherits accessibility features from `SourcePreviewCardSmall`
- Semantic structure for source information
- Proper labeling for interactive elements

### Implementation
```tsx
// Accessible event handling
const handleClick = useCallback((e: React.MouseEvent) => {
  const target = e.target as HTMLElement;
  // Prevents conflicts with other interactive elements
  if (target.getAttribute('data-action') !== 'table-action') {
    // Handle expansion
  }
}, []);
```

## Dependencies

### Internal Components
- **`SourcePreviewCardSmall`**: Core card component that handles the visual presentation
- **`useEntityDetailDrawerStore`**: State management for drawer functionality

### External Dependencies
- **`@tanstack/react-table`**: For the `Row<Source>` type and table integration
- **React**: For hooks and event handling (`useCallback`, `React.MouseEvent`)

### Type Dependencies
- **`Source`**: Core data structure for source information
- **`EntityCount[]`**: Statistics and count data structure

### Related Components
```tsx
// Typical usage alongside related components
import { SourcePreviewCardSmall } from './source-preview-card-small';
import { EntityDetailDrawer } from './entity-detail-drawer';
import { SourcesTable } from './sources-table';

// Used in responsive layouts
function SourcesView() {
  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden">
        <SourcePreviewCardMobile {...props} />
      </div>
      
      {/* Desktop table */}
      <div className="hidden md:block">
        <SourcesTable {...props} />
      </div>
      
      {/* Shared drawer */}
      <EntityDetailDrawer />
    </>
  );
}
```

## Best Practices

### Performance
- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Efficient state management through Zustand store

### Event Handling
- Implements proper event delegation to avoid conflicts with nested interactive elements
- Uses data attributes for action identification

### Mobile UX
- Provides clear visual feedback for interactions
- Maintains consistent spacing and typography across mobile devices
- Integrates seamlessly with drawer navigation patterns