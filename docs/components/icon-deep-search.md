# IconDeepSearch Component Documentation

## Purpose

The `IconDeepSearch` component renders an SVG icon representing a deep search or advanced search functionality. The icon combines a magnifying glass with a trending chart/graph element, visually indicating analytical or in-depth search capabilities. This component is part of the application's icon system and provides a consistent visual representation for deep search features across the UI.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it ideal as a server component for optimal performance and SEO.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props (Common Usage)
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling the icon |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click handler for interactive icons |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { IconDeepSearch } from '@/components/icons/icon-deep-search';

// Basic usage
export function SearchHeader() {
  return (
    <div className="flex items-center gap-2">
      <IconDeepSearch />
      <h2>Advanced Search</h2>
    </div>
  );
}

// With custom styling
export function SearchButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
      <IconDeepSearch className="w-5 h-5" />
      Deep Search
    </button>
  );
}

// Interactive icon with click handler
export function SearchToolbar() {
  const handleDeepSearch = () => {
    // Navigate to advanced search or trigger deep search modal
  };

  return (
    <div className="flex items-center">
      <IconDeepSearch 
        className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
        onClick={handleDeepSearch}
        aria-label="Open deep search"
        role="button"
      />
    </div>
  );
}

// In search feature components
export function SearchModeToggle() {
  return (
    <div className="flex items-center space-x-4">
      <button className="flex items-center gap-2">
        <IconDeepSearch className="w-4 h-4" />
        Advanced Mode
      </button>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions that scale with font-size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Customizable**: Accepts all standard SVG props for styling and interaction

### Visual Design
- **Dual Concept**: Combines magnifying glass with trending chart elements
- **20x20 Viewbox**: Optimized for common icon sizes
- **Fill-based**: Uses solid fills rather than strokes for clarity at small sizes
- **Professional Styling**: Clean, modern design suitable for business applications

## State Management

**No State Management** - This is a stateless presentational component. It renders static SVG content and does not manage any internal state. Any interactive behavior (clicks, hover states) should be handled by parent components.

## Side Effects

**No Side Effects** - The component has no side effects. It performs no API calls, DOM manipulations, or external interactions beyond rendering its SVG content.

## Dependencies

### Internal Dependencies
- `React` - Uses `SVGProps` type from React
- No other internal component dependencies

### External Dependencies
- None - Pure React component with no external library dependencies

## Integration

### Icon System Integration
```tsx
// Typically used alongside other search-related icons
import { IconDeepSearch } from '@/components/icons/icon-deep-search';
import { IconSearch } from '@/components/icons/icon-search';
import { IconFilter } from '@/components/icons/icon-filter';

export function SearchToolbar() {
  return (
    <div className="flex items-center gap-4">
      <IconSearch className="w-5 h-5" />
      <IconDeepSearch className="w-5 h-5" />
      <IconFilter className="w-5 h-5" />
    </div>
  );
}
```

### Feature Component Integration
```tsx
// Integration with search features
export function AdvancedSearchModal() {
  return (
    <Modal>
      <div className="flex items-center gap-2 mb-4">
        <IconDeepSearch className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Deep Search</h2>
      </div>
      {/* Search form content */}
    </Modal>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component for optimal performance
- ✅ **Single Responsibility**: Focused solely on rendering the deep search icon
- ✅ **Reusability**: Generic design allows usage across multiple features
- ✅ **Type Safety**: Properly typed with TypeScript interfaces

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper labeling
<IconDeepSearch 
  aria-label="Advanced search options" 
  className="w-5 h-5"
/>

// ✅ Good: Consistent sizing with CSS classes
<IconDeepSearch className="w-6 h-6 text-primary" />

// ❌ Avoid: Inline sizing that breaks responsive design
<IconDeepSearch width="24" height="24" />

// ✅ Good: Proper interactive patterns
<button onClick={handleSearch} aria-label="Open deep search">
  <IconDeepSearch className="w-4 h-4" />
</button>
```

### Integration Patterns
- Use within search-related UI components and features
- Combine with other icons to create comprehensive search toolbars
- Apply consistent sizing and theming across the application
- Ensure proper accessibility labeling when used interactively
- Leverage the component's scalability for different UI contexts