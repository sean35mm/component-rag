# IconSearchAI Component

## Purpose

`IconSearchAI` is a specialized SVG icon component that visually represents AI-powered search functionality. It combines a traditional search magnifying glass with a sparkle/star element to indicate AI enhancement or intelligent search capabilities. This icon is typically used in search interfaces, buttons, or navigation elements where AI-assisted search features are available.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no client-side interactivity, state management, or browser APIs, making it suitable for server-side rendering and optimal for performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | All standard SVG attributes including `className`, `style`, `onClick`, `aria-label`, etc. Spreads to the root `<svg>` element |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Override default dimensions

## Usage Example

```tsx
import { IconSearchAI } from '@/components/icons/icon-search-ai';

// Basic usage
<IconSearchAI />

// With custom styling
<IconSearchAI 
  className="text-blue-600 hover:text-blue-800" 
  width={24} 
  height={24}
/>

// In a search button
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
  <IconSearchAI className="w-5 h-5" />
  AI Search
</button>

// With accessibility
<IconSearchAI 
  aria-label="AI-powered search"
  role="img"
  className="w-6 h-6"
/>

// In a navigation menu
<nav className="flex items-center space-x-4">
  <Link href="/search" className="flex items-center text-gray-700 hover:text-gray-900">
    <IconSearchAI className="w-5 h-5 mr-2" />
    Smart Search
  </Link>
</nav>
```

## Functionality

### Core Features
- **SVG Rendering**: Renders a crisp, scalable vector graphic suitable for any size
- **Dual Visual Elements**: Combines magnifying glass (search) with sparkle/star (AI) imagery
- **Responsive Design**: Scales appropriately with CSS dimensions
- **Color Inheritance**: Uses `currentColor` for fill, inheriting text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility

### Visual Characteristics
- **Default Size**: 20x20 pixels
- **Color**: Inherits from parent text color via `currentColor`
- **Style**: Modern, clean line art suitable for contemporary interfaces
- **Semantic Design**: Clearly communicates AI-enhanced search functionality

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any form of state management (TanStack Query, Zustand, or local state).

## Side Effects

**No Side Effects** - Pure functional component with no side effects, API calls, or external interactions.

## Dependencies

### Direct Dependencies
- `React` - For JSX and component structure
- `SVGAttributes<SVGElement>` type from React

### No Internal Dependencies
- No custom hooks
- No other components
- No external services or utilities

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational UI component library in `/components/icons/`
- **Design System**: Provides consistent iconography across AI search features
- **Reusable Asset**: Can be used across multiple features and domains
- **Server-Side Friendly**: Renders efficiently in server components

### Common Integration Patterns
```tsx
// In search components
export function AISearchBar() {
  return (
    <div className="relative">
      <input type="search" placeholder="Ask AI anything..." />
      <IconSearchAI className="absolute right-3 top-3 text-gray-400" />
    </div>
  );
}

// In feature toggles
export function SearchModeToggle() {
  const [isAIMode, setIsAIMode] = useState(false);
  
  return (
    <button onClick={() => setIsAIMode(!isAIMode)}>
      {isAIMode ? <IconSearchAI /> : <IconSearch />}
    </button>
  );
}
```

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as server component (no 'use client' needed)  
✅ **Component Decomposition**: Atomic, single-responsibility component that stacks well with others  
✅ **Reusability**: Located in `/ui/` equivalent (`/icons/`) for cross-domain usage  
✅ **TypeScript**: Properly typed with React's SVG attributes  

### Recommended Usage Patterns
- **Consistent Sizing**: Use Tailwind classes like `w-5 h-5` for consistent icon sizing
- **Color Management**: Leverage `currentColor` by setting text color on parent elements
- **Accessibility**: Always include `aria-label` when icon stands alone without text
- **Performance**: Import only when needed to maintain bundle efficiency

### Anti-Patterns to Avoid
- ❌ Don't add 'use client' directive unless adding interactivity
- ❌ Don't hardcode colors in the SVG; use `currentColor` for flexibility
- ❌ Don't create multiple similar icons; use props for variations
- ❌ Don't forget accessibility attributes in interactive contexts