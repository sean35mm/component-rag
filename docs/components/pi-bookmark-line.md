# PiBookmarkLine Component

## Purpose

The `PiBookmarkLine` component is a lightweight, scalable SVG icon component that renders a bookmark outline icon. It serves as a visual indicator for bookmarking functionality, content saving, or favoriting features throughout the application. This component is part of the icon system and provides consistent bookmark iconography across different UI contexts.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiBookmarkLine } from '@/components/icons/pi/pi-bookmark-line';

// Basic usage
export function BookmarkButton() {
  return (
    <button className="p-2 hover:bg-gray-100 rounded">
      <PiBookmarkLine className="w-5 h-5 text-gray-600" />
    </button>
  );
}

// With click handler and accessibility
export function SaveArticleButton({ onSave, isSaved }: { onSave: () => void; isSaved: boolean }) {
  return (
    <button
      onClick={onSave}
      className="flex items-center gap-2 px-3 py-2 rounded-md border"
      aria-label={isSaved ? "Remove bookmark" : "Bookmark article"}
    >
      <PiBookmarkLine 
        className={`w-4 h-4 ${isSaved ? 'text-blue-600' : 'text-gray-500'}`}
        aria-hidden="true"
      />
      {isSaved ? 'Saved' : 'Save'}
    </button>
  );
}

// Custom styling with Tailwind
export function FavoriteIcon() {
  return (
    <PiBookmarkLine 
      className="w-6 h-6 text-amber-500 hover:text-amber-600 transition-colors"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
    />
  );
}
```

## Functionality

- **Scalable Vector Rendering**: Renders a crisp bookmark outline icon at any size using SVG
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size by default
- **Accessibility Ready**: Accepts all standard SVG props including ARIA attributes
- **Style Flexibility**: Supports custom styling through className, style props, and CSS

## State Management

**No State Management** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems. State related to bookmark status should be managed by parent components using:

- **TanStack Query** for server-side bookmark state (fetching, caching bookmark status)
- **Zustand** for client-side UI state (bookmark animations, temporary states)
- **Local state** in parent components for simple toggle functionality

## Side Effects

**No Side Effects** - This component is purely functional with no side effects. It doesn't:
- Make API calls
- Access browser APIs
- Modify external state
- Trigger network requests
- Interact with local storage

## Dependencies

- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained component with no third-party dependencies

## Integration

### Icon System Integration
```tsx
// Part of a larger icon library
import { PiBookmarkLine } from '@/components/icons/pi/pi-bookmark-line';
import { PiBookmarkFill } from '@/components/icons/pi/pi-bookmark-fill';

// Used in bookmark toggle components
export function BookmarkToggle({ isBookmarked }: { isBookmarked: boolean }) {
  return isBookmarked ? <PiBookmarkFill /> : <PiBookmarkLine />;
}
```

### Feature Component Integration
```tsx
// Used within domain-specific components
import { PiBookmarkLine } from '@/components/icons/pi/pi-bookmark-line';

export function ArticleCard({ article }: { article: Article }) {
  const { mutate: toggleBookmark } = useToggleBookmark();
  
  return (
    <div className="article-card">
      {/* Article content */}
      <button onClick={() => toggleBookmark(article.id)}>
        <PiBookmarkLine className="w-4 h-4" />
      </button>
    </div>
  );
}
```

## Best Practices

### ✅ Architectural Compliance

- **Component Decomposition**: Follows flat, composable design - can be easily stacked with other UI elements
- **Server-First**: Renders on server by default, no unnecessary client-side JavaScript
- **Reusability**: Located in `/components/icons/` for cross-application usage
- **Prop Spreading**: Accepts all standard SVG props for maximum flexibility

### ✅ Usage Patterns

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="Bookmark article">
  <PiBookmarkLine aria-hidden="true" className="w-4 h-4" />
</button>

// ✅ Good: Responsive sizing with Tailwind
<PiBookmarkLine className="w-4 h-4 sm:w-5 sm:h-5" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiBookmarkLine /> {/* Automatically blue */}
</div>

// ❌ Avoid: Hardcoded colors that break theming
<PiBookmarkLine fill="#3b82f6" />

// ❌ Avoid: Missing accessibility attributes
<PiBookmarkLine onClick={handleClick} /> {/* Should be in a button */}
```

### ✅ Integration Best Practices

- Use with proper semantic HTML elements (`<button>`, `<a>`)
- Combine with filled variant for toggle states
- Leverage Tailwind classes for consistent sizing and colors
- Include proper ARIA labels when interactive
- Let parent components handle bookmark state management