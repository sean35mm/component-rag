# PiSearchEyeLine Icon Component

## Purpose

The `PiSearchEyeLine` component is an SVG icon that combines a magnifying glass with an eye symbol, representing search and visibility functionality. This icon is commonly used for search interfaces that involve visual inspection, preview capabilities, or "search and view" actions within the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering by default.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiSearchEyeLine } from '@/components/icons/pi/pi-search-eye-line';

// Basic usage
export function SearchButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiSearchEyeLine />
      Search & Preview
    </button>
  );
}

// With custom styling
export function AdvancedSearchIcon() {
  return (
    <PiSearchEyeLine 
      className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors"
      aria-label="Advanced search with preview"
    />
  );
}

// In a search interface
export function SearchWithPreview() {
  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search documents..."
        className="pl-10 pr-4 py-2 border rounded"
      />
      <PiSearchEyeLine 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

// Interactive usage (converts to Client Component when used with event handlers)
'use client';

export function InteractiveSearchIcon() {
  const handleSearchPreview = () => {
    // Handle search with preview functionality
  };

  return (
    <PiSearchEyeLine 
      className="cursor-pointer text-gray-600 hover:text-blue-600"
      onClick={handleSearchPreview}
      role="button"
      aria-label="Search and preview results"
    />
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` for automatic color inheritance
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Responsive Design**: Inherits font-size for consistent scaling

### Visual Design
- **24x24 viewBox**: Standard icon dimensions for consistent sizing
- **Line Style**: Outlined design with clean, minimal aesthetics
- **Combined Metaphor**: Merges search (magnifying glass) and visibility (eye) concepts
- **Fill Rule**: Uses `evenodd` for proper SVG rendering

## State Management

**No State Management Required** - This is a stateless presentational component that:
- Renders static SVG markup
- Accepts props for customization
- Does not manage any internal state
- Relies on parent components for interactive behavior

## Side Effects

**No Side Effects** - The component:
- Does not perform API calls
- Does not access browser APIs
- Does not modify external state
- Does not trigger any side effects during render

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition
- No external icon libraries or dependencies

### Integration Dependencies
- **Parent Components**: Buttons, form inputs, navigation elements
- **Styling System**: Tailwind CSS classes or styled-components
- **Theme Provider**: For color inheritance via `currentColor`

## Integration

### Application Architecture Fit
```tsx
// UI Component Layer - Reusable icon
/components/icons/pi/pi-search-eye-line.tsx

// Feature Component Layer - Search functionality
/components/search/SearchInterface.tsx
/components/search/DocumentPreview.tsx

// Page Layer - Complete search experience
/app/search/page.tsx
/app/documents/search/page.tsx
```

### Common Integration Patterns
```tsx
// 1. Form Controls
<SearchInput icon={<PiSearchEyeLine />} />

// 2. Navigation
<NavItem icon={<PiSearchEyeLine />} label="Search" />

// 3. Action Buttons
<Button variant="outline" icon={<PiSearchEyeLine />}>
  Preview Search
</Button>

// 4. Status Indicators
<StatusCard 
  icon={<PiSearchEyeLine className="text-blue-500" />}
  title="Search Results Ready"
/>
```

## Best Practices

### Architecture Adherence
✅ **Server Component Default**: No unnecessary client-side JavaScript  
✅ **Prop Spreading**: Flexible integration with `{...props}`  
✅ **Type Safety**: Full TypeScript support with `SVGProps`  
✅ **Reusability**: Generic icon suitable for multiple contexts  

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper labels
<PiSearchEyeLine aria-label="Search with preview" />

// ✅ Good: Consistent sizing with design system
<PiSearchEyeLine className="w-5 h-5" />

// ✅ Good: Theme-aware coloring
<PiSearchEyeLine className="text-primary" />

// ❌ Avoid: Inline styles for sizing
<PiSearchEyeLine style={{ width: '20px', height: '20px' }} />

// ❌ Avoid: Missing accessibility for interactive usage
<PiSearchEyeLine onClick={handler} /> // Missing role and aria-label
```

### Performance Considerations
- **Bundle Size**: Minimal impact as simple SVG component
- **Rendering**: Server-rendered by default for optimal performance
- **Caching**: Benefits from component-level caching
- **Tree Shaking**: Properly exported for dead code elimination