# IconDeepSearch2 Component

## Purpose

The `IconDeepSearch2` component renders an SVG icon representing advanced search functionality with analytics visualization. The icon depicts a magnifying glass combined with a trend line or graph, suggesting deep search capabilities with data insights or search analytics.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG content without any interactive features, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | All standard SVG element attributes including className, style, onClick, etc. |

### Common SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width/height` - Override default 1em sizing

## Usage Example

```tsx
import { IconDeepSearch2 } from '@/components/icons/icon-deep-search-2';

// Basic usage
export function SearchHeader() {
  return (
    <div className="flex items-center gap-2">
      <IconDeepSearch2 />
      <h2>Advanced Search</h2>
    </div>
  );
}

// With custom styling
export function AnalyticsButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <IconDeepSearch2 
        className="w-5 h-5" 
        aria-label="Search Analytics"
      />
      Search Analytics
    </button>
  );
}

// Interactive usage
export function SearchToggle() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`p-2 rounded ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}
    >
      <IconDeepSearch2 
        className={`w-6 h-6 transition-colors ${
          isActive ? 'text-blue-600' : 'text-gray-600'
        }`}
        aria-label="Toggle deep search"
      />
    </button>
  );
}

// In navigation or toolbar
export function SearchToolbar() {
  return (
    <div className="flex items-center space-x-4">
      <button className="flex items-center gap-2 text-sm">
        <IconDeepSearch2 className="w-4 h-4" />
        Basic Search
      </button>
      <button className="flex items-center gap-2 text-sm font-medium">
        <IconDeepSearch2 className="w-4 h-4 text-blue-600" />
        Deep Search
      </button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Default 1em sizing adapts to parent font size
- **Theme Integration**: Uses `currentColor` for automatic theme compatibility
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports all standard SVG/DOM events

### Visual Elements
- **Magnifying Glass**: Primary search metaphor
- **Trend Line**: Represents analytics or advanced search capabilities
- **Clean Geometry**: Professional appearance with precise paths
- **Clipping Path**: Ensures clean boundaries within 20x20 viewBox

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management solution. All dynamic behavior is handled by parent components.

## Side Effects

**No Side Effects** - Pure component with no:
- API calls
- Local storage interactions
- External service dependencies
- DOM manipulations beyond rendering

## Dependencies

### Direct Dependencies
- `React` - Core React library for JSX and component definition
- `SVGAttributes<SVGElement>` - TypeScript interface for SVG props

### No External Dependencies
- No third-party icon libraries
- No styling frameworks required
- No utility libraries needed

## Integration

### Application Architecture Role
- **UI Layer**: Part of the base UI components in `/components/icons/`
- **Design System**: Consistent with other icon components for visual cohesion
- **Feature Integration**: Used across search, analytics, and data exploration features

### Common Integration Patterns
```tsx
// Search feature components
import { IconDeepSearch2 } from '@/components/icons/icon-deep-search-2';

// Analytics dashboards
export function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <IconDeepSearch2 className="w-5 h-5 text-blue-600" />
        <h3>Search Analytics</h3>
      </div>
      {/* Analytics content */}
    </div>
  );
}

// Navigation menus
export function MainNavigation() {
  return (
    <nav>
      <NavItem href="/search/advanced" icon={IconDeepSearch2}>
        Advanced Search
      </NavItem>
    </nav>
  );
}
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: No client-side interactivity required
- ✅ **Flat Component Structure**: Simple, single-purpose component
- ✅ **Reusable Design**: Generic enough for multiple use cases
- ✅ **Type Safety**: Full TypeScript support with proper interfaces

### Usage Recommendations
- **Semantic Usage**: Use for advanced search, analytics, or data exploration features
- **Accessibility**: Always provide `aria-label` when used without accompanying text
- **Consistent Sizing**: Use Tailwind classes like `w-4 h-4`, `w-5 h-5` for consistent sizing
- **Color Inheritance**: Leverage `currentColor` by setting text color on parent elements

### Performance Considerations
- **Lightweight**: Minimal bundle impact as pure SVG
- **Server Renderable**: No hydration overhead
- **Cacheable**: Static content benefits from browser caching
- **Tree Shakeable**: Only imported when actually used

### Integration Guidelines
- Pair with search-related functionality
- Use in analytics and reporting interfaces
- Include in data exploration tools
- Maintain visual consistency with other search icons