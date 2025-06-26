# IconAsItHappens

## Purpose

The `IconAsItHappens` component is an SVG icon that represents real-time or live content features. It renders a document/page icon with a golden notification dot, visually indicating content that updates or changes as events occur. The icon adapts to the current theme, displaying in white for dark mode and dark gray for light mode.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through the `useTheme` hook from `next-themes`. This is necessary because theme detection requires access to browser APIs and client-side state.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ...props | `SVGAttributes<SVGElement>` | No | Standard SVG attributes (className, style, onClick, etc.) that are spread to the root SVG element |

## Usage Example

```tsx
import { IconAsItHappens } from '@/components/icons/as-it-happens';

// Basic usage
function LiveContentSection() {
  return (
    <div className="flex items-center gap-2">
      <IconAsItHappens />
      <span>Live Updates</span>
    </div>
  );
}

// With custom styling
function NavigationItem() {
  return (
    <button className="flex items-center gap-3 p-2 hover:bg-gray-100">
      <IconAsItHappens 
        className="text-blue-600" 
        width={24} 
        height={24}
      />
      <span>As It Happens</span>
    </button>
  );
}

// In a feature toggle or status indicator
function ContentStatusBadge({ isLive }: { isLive: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {isLive && <IconAsItHappens width={16} height={16} />}
      <span className={isLive ? 'text-green-600' : 'text-gray-500'}>
        {isLive ? 'Live' : 'Static'}
      </span>
    </div>
  );
}
```

## Functionality

- **Theme-Aware Rendering**: Automatically adjusts main icon color based on the current theme (dark/light)
- **Fixed Accent Color**: Maintains a consistent golden yellow (#F9C035) notification dot regardless of theme
- **Scalable Vector**: Renders crisply at any size while maintaining proportions
- **Flexible Styling**: Accepts all standard SVG attributes for customization
- **Semantic Design**: Visual metaphor of a document with live indicator communicates real-time content

## State Management

- **Theme State**: Consumes global theme state via `useTheme` hook from `next-themes`
- **No Local State**: Component is stateless and purely presentational
- **Reactive Updates**: Automatically re-renders when theme changes occur

## Side Effects

- **Theme Subscription**: Subscribes to theme changes through the `useTheme` hook
- **No External Calls**: No API calls or external data fetching
- **DOM Rendering**: Renders SVG elements to the DOM with conditional styling

## Dependencies

### External Dependencies
- `react` - Core React functionality and SVG attributes typing
- `next-themes` - Theme detection and management

### Internal Dependencies
- None - This is a standalone icon component

## Integration

### Application Architecture Role
- **UI Foundation Layer**: Part of the base icon system in `/components/icons/`
- **Theme Integration**: Integrates with the application's global theme system
- **Design System Component**: Provides consistent iconography across features

### Usage Patterns
```tsx
// In feature components
import { IconAsItHappens } from '@/components/icons/as-it-happens';

// In navigation menus
function LiveContentNav() {
  return (
    <nav>
      <Link href="/live" className="nav-item">
        <IconAsItHappens />
        Live Feed
      </Link>
    </nav>
  );
}

// In content cards
function ArticleCard({ article }) {
  return (
    <div className="card">
      {article.isLive && (
        <div className="live-indicator">
          <IconAsItHappens width={20} height={20} />
          <span>LIVE</span>
        </div>
      )}
      {/* article content */}
    </div>
  );
}
```

## Best Practices

### ✅ Follows Architecture Guidelines

- **Component Decomposition**: Single-purpose icon component that can be composed with other UI elements
- **Client Component Usage**: Appropriately uses client-side rendering only when necessary (theme detection)
- **Reusability**: Located in `/components/icons/` for application-wide usage
- **Prop Flexibility**: Accepts standard SVG props for maximum flexibility

### ✅ Implementation Patterns

- **Theme Integration**: Properly integrates with the application's theme system
- **Performance**: Lightweight with minimal re-rendering (only on theme changes)
- **Accessibility**: Inherits SVG accessibility features and can accept aria attributes
- **Type Safety**: Uses proper TypeScript interfaces for SVG attributes

### ✅ Usage Recommendations

```tsx
// Good: Semantic usage with descriptive context
<div className="live-content-indicator">
  <IconAsItHappens />
  <span>Updates in real-time</span>
</div>

// Good: Proper sizing for different contexts
<IconAsItHappens width={16} height={16} /> // Small UI elements
<IconAsItHappens width={32} height={32} /> // Default size
<IconAsItHappens width={48} height={48} /> // Large displays

// Good: Accessible implementation
<IconAsItHappens 
  role="img" 
  aria-label="Live content indicator"
  className="live-icon"
/>
```