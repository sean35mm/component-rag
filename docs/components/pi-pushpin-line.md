# PiPushpinLine Icon Component

## 1. Purpose

The `PiPushpinLine` component renders a pushpin/pin icon in line style as an SVG. This icon is typically used to indicate pinned content, bookmarks, location markers, or important items that should remain visible or accessible. It's part of the Phosphor icon library integration and provides a consistent visual element for pinning functionality across the application.

## 2. Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup. It has no interactive behavior, state management, or client-side functionality, making it perfect for server-side rendering. The component only accepts standard SVG props and renders consistently on both server and client.

## 3. Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element properties including `className`, `style`, `onClick`, `fill`, `stroke`, etc. |

### Common SVG Props Usage:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler (requires 'use client')
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Override default 1em sizing

## 4. Usage Example

```tsx
import { PiPushpinLine } from '@/components/icons/pi/pi-pushpin-line';

// Basic usage
export function BookmarkButton() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiPushpinLine className="w-4 h-4 text-gray-600" />
      Pin this item
    </button>
  );
}

// In a pinned items list
export function PinnedPostCard({ post, onUnpin }) {
  return (
    <div className="relative p-4 border rounded-lg">
      <div className="absolute top-2 right-2">
        <PiPushpinLine 
          className="w-5 h-5 text-blue-500" 
          aria-label="Pinned item"
        />
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </div>
  );
}

// Interactive pin toggle (requires client component wrapper)
'use client';
export function PinToggle({ isPinned, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`p-1 rounded ${isPinned ? 'text-blue-500' : 'text-gray-400'}`}
      aria-label={isPinned ? 'Unpin item' : 'Pin item'}
    >
      <PiPushpinLine className="w-4 h-4" />
    </button>
  );
}

// In navigation or sidebar
export function PinnedSection({ pinnedItems }) {
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-2 font-semibold text-sm text-gray-700 mb-3">
        <PiPushpinLine className="w-4 h-4" />
        Pinned Items
      </h2>
      <ul className="space-y-2">
        {pinnedItems.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 5. Functionality

### Core Features:
- **SVG Icon Rendering**: Displays a line-style pushpin icon with consistent styling
- **Responsive Sizing**: Uses `1em` dimensions by default, scaling with font size
- **Color Inheritance**: Uses `currentColor` fill, inheriting text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Style Flexibility**: Supports all standard SVG styling approaches

### Visual Characteristics:
- Clean line-style design following Phosphor icon standards
- 24x24 viewBox with scalable vector paths
- Two distinct path elements creating the pin head and needle
- Optimized for clarity at various sizes

## 6. State Management

**No State Management** - This is a purely presentational component with no internal state. Any state related to pin functionality (pin status, user preferences, etc.) should be managed by parent components using:

- **TanStack Query**: For server state related to pinned items from APIs
- **Zustand**: For client-side pin preferences or UI state
- **Local State**: For temporary pin interactions in parent components

## 7. Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props. Any side effects related to pinning functionality should be handled by parent components.

## 8. Dependencies

### Internal Dependencies:
- **React**: `SVGProps` type from React for prop typing
- **TypeScript**: For type safety and prop validation

### No External Dependencies:
- Self-contained SVG implementation
- No icon library runtime dependencies
- No utility function dependencies

## 9. Integration

### Application Architecture Integration:
- **UI Component Layer**: Lives in `/components/icons/pi/` as a foundational UI element
- **Feature Components**: Used by domain-specific components for pin functionality
- **Design System**: Part of the icon component system ensuring visual consistency
- **Server-First**: Renders on server by default, supporting SSR and static generation

### Common Integration Patterns:
```tsx
// In feature components
import { PiPushpinLine } from '@/components/icons/pi/pi-pushpin-line';

// Bookmark feature
export function BookmarkButton({ postId }) {
  const togglePin = usePinPost(postId); // TanStack Query mutation
  
  return (
    <button onClick={togglePin}>
      <PiPushpinLine />
    </button>
  );
}

// Dashboard pinned section
export function PinnedItemsWidget() {
  const { data: pinnedItems } = usePinnedItems(); // TanStack Query
  
  return (
    <section>
      <h2><PiPushpinLine /> Pinned</h2>
      {/* render items */}
    </section>
  );
}
```

## 10. Best Practices

### Architecture Adherence:
- ✅ **Server Component**: No unnecessary client-side JavaScript
- ✅ **Flat Structure**: Simple, single-purpose component
- ✅ **Reusable UI**: Generic icon suitable for multiple use cases
- ✅ **Type Safety**: Proper TypeScript integration with SVG props

### Implementation Guidelines:
- **Accessibility**: Always provide `aria-label` when icon stands alone
- **Sizing**: Use CSS classes rather than inline width/height for consistency
- **Styling**: Leverage `currentColor` for theme integration
- **Performance**: Component is lightweight and optimized for tree-shaking

### Usage Recommendations:
```tsx
// ✅ Good: Semantic usage with accessibility
<button aria-label="Pin this post">
  <PiPushpinLine className="w-4 h-4" />
</button>

// ✅ Good: Clear visual hierarchy
<h2 className="flex items-center gap-2">
  <PiPushpinLine className="w-5 h-5 text-blue-500" />
  Pinned Items
</h2>

// ❌ Avoid: Missing accessibility context
<PiPushpinLine onClick={handleClick} />

// ❌ Avoid: Inline sizing that breaks consistency
<PiPushpinLine width="16" height="16" />
```