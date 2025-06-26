# IconScheduledDigest Component

## Purpose

The `IconScheduledDigest` component renders an SVG icon representing scheduled digest functionality. It displays a document/report icon with horizontal lines to represent text content and adapts its appearance based on the current theme (light/dark mode).

## Component Type

**Client Component** - Uses the `'use client'` directive because it depends on the `useTheme` hook from `next-themes` to dynamically adjust colors based on the current theme state.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | Standard SVG attributes that can be passed to customize the icon (className, style, onClick, etc.) |

## Usage Example

```tsx
import { IconScheduledDigest } from '@/components/icons/icon-scheduled-digest';

// Basic usage
<IconScheduledDigest />

// With custom styling
<IconScheduledDigest 
  className="w-6 h-6 text-blue-500" 
  onClick={handleDigestClick}
/>

// In a button component
<button className="flex items-center gap-2">
  <IconScheduledDigest className="w-4 h-4" />
  View Scheduled Digest
</button>

// With custom size via CSS properties
<IconScheduledDigest 
  style={{ width: '24px', height: '24px' }}
/>
```

## Functionality

- **Theme-Aware Rendering**: Automatically adjusts icon colors based on the current theme (light/dark)
- **Responsive Sizing**: Uses `1em` for width/height, making it scale with parent font-size
- **Flexible Styling**: Accepts all standard SVG attributes for customization
- **Visual Hierarchy**: Uses different colors (gold accent and theme-adaptive colors) to create visual distinction between document elements

## State Management

**Theme State**: Consumes theme state through the `useTheme` hook from `next-themes`. No local state management required.

## Side Effects

- **Theme Detection**: Reads the current resolved theme to determine appropriate colors
- **No External API Calls**: Pure presentation component with no network requests

## Dependencies

- **next-themes**: For theme detection and color adaptation
- **React**: Base framework for component structure
- **CSS Custom Properties**: Relies on CSS variables for color theming:
  - `--color-pg-static-0` (dark theme text)
  - `--color-pg-static-950` (light theme text)
  - `--color-pg-gold-500` (accent color)

## Integration

- **Icon System**: Part of the application's icon component library in `/components/icons/`
- **Theme System**: Integrates with the global theme provider to maintain consistent visual appearance
- **UI Components**: Can be used within buttons, navigation items, headers, or any UI component requiring digest-related iconography
- **Design System**: Follows the application's color token system for consistent theming

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component Usage**: Appropriately uses client component only when needed for theme state
- **Component Decomposition**: Simple, focused component with single responsibility
- **Reusability**: Located in `/ui/` equivalent (`/icons/`) for cross-application usage
- **Props Interface**: Uses standard SVG props interface for maximum flexibility

✅ **Implementation Best Practices**:
- **Performance**: Minimal re-renders, only updates when theme changes
- **Accessibility**: Maintains proper SVG structure for screen readers
- **Flexibility**: Spreads props to allow custom event handlers and styling
- **Consistency**: Uses established color token system for theme integration

✅ **Usage Recommendations**:
- Use for digest-related features, reports, or scheduled content interfaces
- Combine with semantic HTML elements for proper accessibility
- Apply consistent sizing across the application using CSS classes
- Leverage the theme-aware nature rather than overriding colors manually