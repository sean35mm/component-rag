# ListLoader Component

## Purpose

The `ListLoader` component is a loading indicator specifically designed for list and data-loading scenarios. It displays an animated spinning icon with a screen reader-friendly loading message, wrapped in smooth fade animations to enhance the user experience during asynchronous operations.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ref | `React.Ref<HTMLDivElement>` | No | - | Forward ref to the container div element |

*Note: This component uses `React.forwardRef` and accepts all standard HTML div attributes through props spreading.*

## Usage Example

```tsx
import { ListLoader } from '@/components/ui/list-loader';
import { AnimatePresence } from 'framer-motion';

// Basic usage
function DataList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <div className="bg-pgBackground-50 rounded-lg border border-pgStroke-200">
      <AnimatePresence>
        {isLoading ? (
          <ListLoader />
        ) : (
          <div className="space-y-2 p-4">
            {data.map(item => (
              <div key={item.id} className="p-3 bg-pgNeutral-0 rounded-md">
                {item.name}
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// With custom container styling
function CustomStyledLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[200px] bg-pgBackground-100 rounded-xl">
      <ListLoader ref={loaderRef} />
    </div>
  );
}

// In a data table context
function DataTable() {
  const { data, isLoading, error } = useQuery('tableData', fetchData);

  return (
    <div className="bg-pgNeutral-0 border border-pgStroke-200 rounded-lg overflow-hidden">
      <div className="typography-labelLarge p-4 border-b border-pgStroke-200 bg-pgBackground-50">
        Data Table
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading && <ListLoader key="loader" />}
        {error && (
          <div className="p-4 text-pgStateError-base typography-paragraphMedium">
            Error loading data
          </div>
        )}
        {data && (
          <div key="content" className="divide-y divide-pgStroke-100">
            {data.map(row => (
              <div key={row.id} className="p-4 hover:bg-pgBackground-50">
                {row.content}
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Screen Reader Text**: Uses `sr-only` utility for accessible loading text

### Color Tokens
- **Text Color**: `text-pgText-600` - Provides subtle, secondary text color appropriate for loading states
- **Compatible Backgrounds**: Works well with `pgBackground-*` and `pgNeutral-*` color variants

### Tailwind Utilities
- **Layout**: `flex items-center justify-center` - Centers the loader content
- **Spacing**: `p-4` - Provides consistent padding using 16px (4 × 4px base unit)
- **Animation**: `animate-spin` - Continuous rotation animation for the loading icon
- **Sizing**: `size-7` - 28px (7 × 4px) icon size for optimal visibility
- **Flexibility**: `shrink-0` - Prevents icon from shrinking in flex layouts

## Styling

### Default Appearance
- Centered loading spinner with subtle gray text color
- 28px spinning icon with smooth rotation
- 16px padding for comfortable spacing
- Fade-in/fade-out animations via Framer Motion

### Customization Options

```tsx
// Custom positioning and spacing
<div className="py-8">
  <ListLoader />
</div>

// Different background contexts
<div className="bg-pgNeutral-950 rounded-lg">
  <ListLoader /> {/* Automatically adapts in dark backgrounds */}
</div>

// Larger container spacing
<div className="min-h-[300px] flex items-center">
  <ListLoader />
</div>
```

### Color Variants for Different Contexts

The component uses `pgText-600` which automatically adapts across color modes and provides appropriate contrast against various background colors from our design system.

## Responsive Design

The `ListLoader` component is inherently responsive and maintains consistent appearance across all breakpoints:

- **Mobile (< 640px)**: Maintains 28px icon size and 16px padding
- **Tablet (640px - 1024px)**: Same styling, optimal for touch interfaces
- **Desktop (> 1024px)**: Consistent appearance, works well in larger containers

The component scales naturally within its parent container and doesn't require breakpoint-specific modifications.

## Accessibility

### ARIA Features
- **Screen Reader Support**: `<span className='sr-only'>Loading...</span>` provides context for assistive technologies
- **Semantic Structure**: Uses proper div structure that doesn't interfere with screen reader navigation

### Motion Considerations
- Respects user motion preferences through CSS `prefers-reduced-motion`
- Framer Motion animations can be disabled globally if needed
- Spinning animation provides visual feedback without being overly distracting

### Keyboard Navigation
- Component doesn't interfere with keyboard navigation flow
- Loading state is announced to screen readers
- Doesn't trap focus or create accessibility barriers

## Dependencies

### Internal Dependencies
- **Icons**: `PiLoader5Line` from `@/components/icons` - Phosphor icon system
- **Design Tokens**: Relies on pgText color variables and Tailwind utilities

### External Dependencies
- **Framer Motion**: Required for fade animations (`motion.div`, `initial`, `animate`, `exit`)
- **React**: Uses `React.forwardRef` for ref forwarding

### Related Components
- Works seamlessly with `AnimatePresence` from Framer Motion
- Commonly used with data fetching hooks and state management
- Pairs well with list components, tables, and card layouts from the design system

### CSS Requirements
- Requires Tailwind CSS with custom color variable configuration
- Depends on design system's CSS variables for `pgText-*` colors
- Needs Tailwind animation utilities (`animate-spin`)