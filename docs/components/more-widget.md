# MoreWidget Component

## Purpose

The `MoreWidget` component renders a comprehensive social connection and navigation panel that displays social media links, product navigation items, and policy links. It serves as a supplementary widget typically used in dropdown menus or sidebar areas to provide users with additional connection and navigation options.

## Component Type

**Server Component** - This component is a server component as it renders static content (social links, product links, policy links) without requiring client-side interactivity beyond basic navigation. The component doesn't need useState, useEffect, or event handlers that require client-side JavaScript.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the root container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | `{}` | Standard HTML div attributes (id, data-*, aria-*, etc.) |

## Usage Example

```tsx
import { MoreWidget } from '@/components/main-layout/file-display-panel/more-widget';

// Basic usage
export function SidebarPanel() {
  return (
    <div className="w-64">
      <MoreWidget />
    </div>
  );
}

// With custom styling
export function CustomDropdown() {
  return (
    <DropdownMenuContent>
      <MoreWidget 
        className="min-w-[280px] shadow-lg" 
        data-testid="more-widget"
      />
    </DropdownMenuContent>
  );
}

// In a modal or overlay
export function ConnectionModal() {
  return (
    <Modal>
      <MoreWidget className="border-0 rounded-lg" />
    </Modal>
  );
}
```

## Functionality

### Core Features
- **Social Media Links**: Displays interactive social media icons with hover effects
- **Product Navigation**: Renders product-related navigation links as dropdown menu items
- **Policy Links**: Shows policy-related links (Privacy Policy, Terms of Service, etc.)
- **Responsive Design**: Adapts to different container sizes with flexible layouts
- **Accessibility**: Includes proper ARIA attributes and keyboard navigation support

### Visual Structure
- Header section with "Connect with Us" title
- Bordered social media icons section with hover states
- Product links as styled dropdown menu items
- Footer section with policy links

### Interactive Elements
- Social links open in new tabs with security attributes (`noopener noreferrer`)
- Product links navigate using Next.js Link component for optimized routing
- Hover effects on social icons and policy links

## State Management

**No State Management Required** - This component is purely presentational and relies on static configuration data from constants. It doesn't manage any local state, server state, or global state.

## Side Effects

**No Side Effects** - The component performs no API calls, subscriptions, or other side effects. All data is sourced from static constants and all interactions are standard navigation actions.

## Dependencies

### Internal Dependencies
- `@/components/ui/dropdown-menu` - For DropdownMenuItem styling and behavior
- `@/components/ui/typography` - For consistent text styling
- `@/lib/constants` - For POLICY_LINKS, PRODUCT_LINKS, and SOCIAL_LINKS data
- `@/lib/utils/cn` - For conditional className merging

### External Dependencies
- `next/link` - For optimized client-side navigation
- `react` - For HTMLAttributes type definitions

### Constants Structure
```typescript
// Expected structure from constants
SOCIAL_LINKS: Array<{ href: string; icon: ReactNode }>
PRODUCT_LINKS: Array<{ href: string; name: string }>
POLICY_LINKS: Array<{ href: string; name: string }>
```

## Integration

### Application Architecture Role
- **Layout Component**: Functions as a secondary navigation widget within the main layout
- **File Display Panel**: Specifically designed for the file display panel context
- **Dropdown Integration**: Works seamlessly with dropdown menu systems
- **Responsive Design**: Adapts to various container contexts (sidebars, modals, dropdowns)

### Usage Contexts
- Dropdown menus for additional navigation options
- Sidebar panels in dashboard layouts
- Modal dialogs for user engagement
- Footer-like sections in content panels

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for static content  
✅ **Component Decomposition**: Flat structure using UI components as building blocks  
✅ **Reusability**: Accepts standard HTML attributes for flexible integration  
✅ **Constants Usage**: Leverages centralized constants for maintainable link management  

### Implementation Patterns
- **Prop Spreading**: Properly spreads HTML attributes while extracting component-specific props
- **Conditional Styling**: Uses `cn()` utility for clean className merging
- **External Links**: Implements security best practices with `target="_blank"` and `rel="noopener noreferrer"`
- **Next.js Integration**: Uses Next.js Link component for internal navigation optimization

### Accessibility Considerations
- Semantic HTML structure with proper sectioning
- External link indicators through `target` and `rel` attributes
- Keyboard navigation support through native elements
- Screen reader friendly with proper typography components

### Performance Optimizations
- Server-side rendering for immediate content availability
- Next.js Link prefetching for optimized navigation
- Minimal client-side JavaScript bundle impact
- Efficient CSS class application with utility functions