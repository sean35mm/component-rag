# PiArticleLine Icon Component

## Purpose

The `PiArticleLine` component is a React SVG icon component that renders an article or document icon in line style. It provides a visual representation of text documents, articles, or content pages, commonly used in navigation menus, content management interfaces, and editorial features.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | Standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `title` - Tooltip text
- `role` - ARIA role
- All other standard SVG attributes

## Usage Example

```tsx
import { PiArticleLine } from '@/components/icons/pi/pi-article-line';

// Basic usage
export function DocumentList() {
  return (
    <div className="flex items-center gap-2">
      <PiArticleLine />
      <span>Articles</span>
    </div>
  );
}

// With custom styling
export function ArticleCard() {
  return (
    <div className="article-card">
      <PiArticleLine 
        className="w-6 h-6 text-blue-600" 
        aria-label="Article document"
      />
      <h3>Latest News Article</h3>
    </div>
  );
}

// In navigation menu
export function NavMenu() {
  return (
    <nav>
      <a href="/articles" className="nav-link">
        <PiArticleLine className="w-5 h-5" />
        Content Management
      </a>
    </nav>
  );
}

// With click handler
export function DocumentAction() {
  const handleCreateArticle = () => {
    // Navigate to article creation
  };

  return (
    <button onClick={handleCreateArticle} className="btn-primary">
      <PiArticleLine className="w-4 h-4 mr-2" />
      New Article
    </button>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Current Color**: Inherits text color from parent elements via `fill='currentColor'`
- **Accessible**: Supports all standard ARIA attributes for screen readers
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design
- **Document Layout**: Shows a rectangular document with content lines
- **Content Representation**: Includes horizontal lines representing text paragraphs
- **Image Placeholder**: Contains a small rectangle representing an embedded image
- **Line Style**: Uses outline/stroke style rather than filled shapes
- **Clean Aesthetic**: Minimalist design suitable for professional interfaces

## State Management

**None** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the provided props.

## Side Effects

**None** - The component has no side effects. It doesn't perform API calls, localStorage operations, or any other external interactions.

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition
- No external libraries or components

### Type Dependencies
- `SVGProps<SVGSVGElement>` from React for prop typing

## Integration

### Icon System Integration
```tsx
// Part of icon library
import { PiArticleLine } from '@/components/icons/pi/pi-article-line';
import { PiImageLine } from '@/components/icons/pi/pi-image-line';
import { PiVideoLine } from '@/components/icons/pi/pi-video-line';

export const contentTypeIcons = {
  article: PiArticleLine,
  image: PiImageLine,
  video: PiVideoLine,
};
```

### Content Management Features
```tsx
// In CMS interfaces
export function ContentTypeSelector() {
  return (
    <div className="content-types">
      <button className="type-button">
        <PiArticleLine className="w-8 h-8" />
        <span>Article</span>
      </button>
    </div>
  );
}
```

### Navigation Integration
```tsx
// In sidebar navigation
export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <nav>
        <NavLink to="/admin/articles">
          <PiArticleLine className="nav-icon" />
          Article Management
        </NavLink>
      </nav>
    </aside>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Properly implemented as server component with no client-side dependencies
- ✅ **Component Decomposition**: Single responsibility - renders one specific icon
- ✅ **Reusability**: Located in `/ui/` equivalent (`/icons/`) for cross-feature usage
- ✅ **Type Safety**: Uses proper TypeScript interfaces from React

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with accessibility
<PiArticleLine 
  className="w-5 h-5 text-gray-600" 
  aria-label="Article document"
  role="img"
/>

// ✅ Good: Consistent sizing with Tailwind
<PiArticleLine className="w-6 h-6" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <PiArticleLine /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Inline styles when CSS classes available
<PiArticleLine style={{width: '24px', height: '24px'}} />

// ❌ Avoid: Missing accessibility for interactive usage
<button>
  <PiArticleLine /> {/* Should have aria-label */}
</button>
```

### Performance Considerations
- Icon is lightweight SVG with minimal DOM nodes
- No runtime JavaScript execution
- Can be easily tree-shaken when unused
- Suitable for server-side rendering and static generation