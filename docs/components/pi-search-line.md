# PiSearchLine Component

## Purpose
The `PiSearchLine` component is a search icon SVG component that provides a magnifying glass visual indicator commonly used in search interfaces, search input fields, and navigation elements. It's part of the Phosphor Icons (Pi) icon library integration and follows consistent sizing and styling patterns for use throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `onClick`, `style`, `aria-label`, etc. Spread onto the root `<svg>` element |

**Inherited SVG Props Include:**
- `className` - CSS classes for styling
- `onClick` - Click event handler
- `style` - Inline styles
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiSearchLine } from '@/components/icons/pi/pi-search-line';

// Basic usage
<PiSearchLine />

// With custom styling
<PiSearchLine className="text-blue-500 hover:text-blue-700" />

// In a search input
<div className="relative">
  <input 
    type="text" 
    placeholder="Search..." 
    className="pl-10 pr-4 py-2 border rounded-lg"
  />
  <PiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
</div>

// As a clickable search button
<button 
  onClick={handleSearch}
  className="p-2 hover:bg-gray-100 rounded-full"
  aria-label="Search"
>
  <PiSearchLine className="w-5 h-5" />
</button>

// In a navigation menu
<nav>
  <button className="flex items-center gap-2">
    <PiSearchLine />
    <span>Search</span>
  </button>
</nav>
```

## Functionality
- **Scalable Vector Icon**: Renders a crisp magnifying glass icon at any size using `1em` dimensions
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Sizing**: Automatically scales with font-size using `em` units
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG/DOM events through props spreading

## State Management
**No State Management** - This is a stateless presentational component that doesn't manage any internal state or interact with external state management systems.

## Side Effects
**No Side Effects** - Pure component with no API calls, DOM mutations, or external interactions beyond rendering SVG markup.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no additional library dependencies

## Integration

### UI Component Library
```tsx
// Use in reusable UI components
import { PiSearchLine } from '@/components/icons/pi/pi-search-line';

export const SearchInput = ({ placeholder, onSearch }) => (
  <div className="relative">
    <input placeholder={placeholder} className="pl-10" />
    <PiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2" />
  </div>
);
```

### Feature Components
```tsx
// In search feature components
import { PiSearchLine } from '@/components/icons/pi/pi-search-line';

export const ProductSearch = () => {
  const [query, setQuery] = useState('');
  
  return (
    <form onSubmit={handleSearch}>
      <PiSearchLine />
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
    </form>
  );
};
```

### Navigation Integration
```tsx
// In header/navigation components
import { PiSearchLine } from '@/components/icons/pi/pi-search-line';

export const AppHeader = () => (
  <header>
    <nav>
      <Link href="/search" className="flex items-center">
        <PiSearchLine className="mr-2" />
        Search
      </Link>
    </nav>
  </header>
);
```

## Best Practices

### ✅ Architectural Adherence
- **Server Component**: Correctly implemented as server component with no client-side requirements
- **Single Responsibility**: Focused solely on rendering search icon
- **Prop Spreading**: Follows React patterns for extending native element props
- **Type Safety**: Properly typed with SVG-specific props interface

### ✅ Usage Patterns
```tsx
// Good: Semantic usage with accessibility
<button aria-label="Search products">
  <PiSearchLine />
</button>

// Good: Consistent sizing with Tailwind
<PiSearchLine className="w-4 h-4 text-gray-500" />

// Good: Contextual color inheritance
<div className="text-blue-600">
  <PiSearchLine /> {/* Inherits blue color */}
</div>
```

### ❌ Anti-patterns
```tsx
// Avoid: Unnecessary client component wrapper
'use client';
export const ClientSearchIcon = () => <PiSearchLine />;

// Avoid: Hardcoded styling that breaks theming
<PiSearchLine style={{ color: '#333', width: '16px' }} />

// Avoid: Missing accessibility context
<div onClick={handleSearch}>
  <PiSearchLine /> {/* No indication this is clickable */}
</div>
```

### 🎯 Integration Guidelines
- Use in UI component composition for consistent search interfaces
- Combine with form components following React Hook Form + Zod patterns
- Integrate with TanStack Query for search functionality in parent components
- Maintain consistent sizing and spacing with design system tokens