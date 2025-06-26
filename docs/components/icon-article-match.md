# IconArticleMatch

## Purpose

`IconArticleMatch` is a React SVG icon component that displays a layered document icon with text lines, typically used to represent article matching, document comparison, or content pairing functionality. This icon visually communicates the concept of matching or comparing textual content across documents.

## Component Type

**Server Component** - This is a presentational icon component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | All standard SVG attributes including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Attributes
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Dimensions (defaults to 16x16)
- And all other standard SVG attributes

## Usage Example

```tsx
import { IconArticleMatch } from '@/components/icons/icon-article-match';

// Basic usage
export function ArticleMatchButton() {
  return (
    <button className="flex items-center gap-2">
      <IconArticleMatch />
      <span>Find Matches</span>
    </button>
  );
}

// With custom styling
export function MatchIndicator() {
  return (
    <div className="flex items-center">
      <IconArticleMatch 
        className="text-green-600 mr-2" 
        width={20} 
        height={20}
        aria-label="Article matched"
      />
      <span>Content matched successfully</span>
    </div>
  );
}

// In navigation or menu
export function MatchingFeature() {
  return (
    <nav>
      <a href="/article-matching" className="nav-link">
        <IconArticleMatch className="inline-block mr-3" />
        Article Matching
      </a>
    </nav>
  );
}

// Interactive usage
export function MatchToggle() {
  const [isMatching, setIsMatching] = useState(false);
  
  return (
    <button 
      onClick={() => setIsMatching(!isMatching)}
      className={`p-2 rounded ${isMatching ? 'bg-blue-100' : 'bg-gray-100'}`}
    >
      <IconArticleMatch 
        className={isMatching ? 'text-blue-600' : 'text-gray-600'}
        aria-label={isMatching ? 'Stop matching' : 'Start matching'}
      />
    </button>
  );
}
```

## Functionality

### Core Features
- **Static SVG Rendering**: Displays a layered document icon with text content indicators
- **Responsive Design**: Uses `currentColor` for stroke and fill, inheriting text color from parent
- **Flexible Sizing**: Default 16x16 viewport, easily customizable via props
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support

### Visual Elements
- **Layered Documents**: Two overlapping document shapes suggesting comparison
- **Text Lines**: Three horizontal lines of varying lengths representing article content
- **Consistent Styling**: Uses `currentColor` for seamless integration with design systems

## State Management

**No State Management** - This is a pure presentational component that doesn't manage any internal state. All styling and behavior is controlled through props and CSS classes.

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure SVG rendering component.

## Dependencies

### Direct Dependencies
- `React` - For JSX and component structure
- `SVGAttributes<SVGElement>` - TypeScript type for SVG props

### No External Dependencies
- No custom hooks
- No utility functions
- No other components
- No third-party libraries

## Integration

### Icon System Integration
```tsx
// Part of icon component library
export { IconArticleMatch } from './icon-article-match';

// Used in feature components
import { IconArticleMatch } from '@/components/icons/icon-article-match';
```

### Feature Integration Examples
```tsx
// Article matching feature
export function ArticleMatchingPanel() {
  return (
    <div className="panel">
      <div className="panel-header">
        <IconArticleMatch className="text-blue-600" />
        <h2>Article Matching</h2>
      </div>
      {/* Matching functionality */}
    </div>
  );
}

// Document comparison UI
export function ComparisonStatus({ hasMatches }: { hasMatches: boolean }) {
  return (
    <div className={`status ${hasMatches ? 'success' : 'pending'}`}>
      <IconArticleMatch className={hasMatches ? 'text-green-600' : 'text-gray-400'} />
      <span>{hasMatches ? 'Matches found' : 'Searching...'}</span>
    </div>
  );
}
```

### Design System Integration
```tsx
// With design system classes
<IconArticleMatch className="icon-sm text-primary" />
<IconArticleMatch className="icon-md text-secondary" />
<IconArticleMatch className="icon-lg text-accent" />
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side features, renders on server
- ✅ **Single Responsibility**: Only renders SVG icon, no additional logic
- ✅ **Reusability**: Generic icon usable across features
- ✅ **Flat Structure**: Simple component without nested complexity

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper labeling
<IconArticleMatch aria-label="Article matching feature" />

// ✅ Good: Consistent with design system
<IconArticleMatch className="text-primary-600" />

// ✅ Good: Appropriate sizing
<IconArticleMatch width={24} height={24} />

// ❌ Avoid: Overly complex styling
<IconArticleMatch style={{ transform: 'rotate(45deg) scale(2)' }} />
```

### Accessibility Best Practices
```tsx
// Decorative usage
<IconArticleMatch aria-hidden="true" />

// Functional usage
<IconArticleMatch 
  role="img" 
  aria-label="Find article matches" 
/>

// Interactive usage
<button aria-label="Start article matching">
  <IconArticleMatch aria-hidden="true" />
</button>
```

### Performance Considerations
- Lightweight SVG with minimal DOM nodes
- Uses `currentColor` to avoid style recalculations
- No JavaScript execution at runtime
- Optimized for server-side rendering