# PiFireLine Icon Component

## Purpose

The `PiFireLine` component is a styled SVG icon representing a fire outline that's part of the Phosphor Icons (Pi) collection. It provides a consistent, scalable fire icon for use throughout the application where fire-related visual indicators are needed, such as trending content, hot topics, energy indicators, or temperature representations.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including className, style, onClick, etc. Spread onto the root `<svg>` element |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role attribute

## Usage Example

```tsx
import { PiFireLine } from '@/components/icons/pi/pi-fire-line';

// Basic usage
export function TrendingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <PiFireLine className="text-red-500" />
      <span>Trending Now</span>
    </div>
  );
}

// With click handler and accessibility
export function HotTopicButton() {
  const handleClick = () => {
    // Navigate to trending topics
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
    >
      <PiFireLine 
        className="text-orange-500 w-5 h-5" 
        aria-label="Hot topics"
      />
      <span>Hot Topics</span>
    </button>
  );
}

// Temperature/energy indicator
export function EnergyMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <PiFireLine 
        className={`transition-colors ${
          level > 80 ? 'text-red-500' : 
          level > 50 ? 'text-orange-500' : 
          'text-gray-400'
        }`}
        style={{ fontSize: `${Math.max(16, level / 5)}px` }}
      />
      <span>{level}% Energy</span>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisply at any size using SVG format
- **Responsive Sizing**: Uses `1em` width/height to scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Flexible Styling**: Accepts all standard SVG props for customization

### Visual Characteristics
- **Style**: Outline/line version of fire icon (not filled)
- **Viewbox**: 24x24 coordinate system for consistent proportions
- **Path Design**: Single path element with fill rules for clean rendering
- **Color**: Inherits current text color, easily customizable via CSS

## State Management

**No State Management Required** - This is a stateless presentational component that simply renders SVG markup. It doesn't interact with:
- TanStack Query (no server state)
- Zustand (no client state) 
- Local state (no internal state)

## Side Effects

**No Side Effects** - This component:
- Makes no API calls
- Performs no DOM manipulation beyond rendering
- Has no lifecycle effects or subscriptions
- Is purely functional with no external interactions

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition
- No external libraries or custom hooks

### Related Components
- Other Phosphor Icons components (`pi-*` family)
- UI components that might use this icon (buttons, cards, indicators)
- Layout components where this icon appears

### Potential Integration Points
```tsx
// Common usage patterns
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// In trending content cards
<Card>
  <Badge variant="secondary">
    <PiFireLine className="w-3 h-3 mr-1" />
    Trending
  </Badge>
</Card>

// In navigation buttons
<Button variant="ghost" size="sm">
  <PiFireLine className="w-4 h-4 mr-2" />
  Hot Posts
</Button>
```

## Integration

### Application Architecture Role
- **UI Layer**: Part of the foundational icon system in `/components/icons/pi/`
- **Design System**: Provides consistent fire iconography across features
- **Reusability**: Used by multiple feature domains (social, analytics, gaming, etc.)
- **Theming**: Integrates with CSS custom properties and Tailwind color system

### File Organization
```
src/
  components/
    icons/
      pi/
        pi-fire-line.tsx    # This component
        pi-fire-fill.tsx    # Filled variant (if exists)
        index.ts           # Barrel exports
    ui/                    # Components that might use this icon
      button.tsx
      badge.tsx
      card.tsx
```

### Import Patterns
```tsx
// Direct import (preferred for single use)
import { PiFireLine } from '@/components/icons/pi/pi-fire-line';

// Barrel import (if multiple icons needed)
import { PiFireLine, PiFireFill } from '@/components/icons/pi';
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component without unnecessary client-side code
✅ **Component Decomposition**: Single responsibility - only renders fire icon
✅ **Reusability**: Generic icon component usable across domains
✅ **Type Safety**: Properly typed with SVGProps for full prop support

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper accessibility
<PiFireLine 
  className="text-red-500 w-5 h-5" 
  aria-label="Trending content"
  role="img"
/>

// ✅ Good: Responsive sizing with em units
<PiFireLine style={{ fontSize: '1.5rem' }} />

// ✅ Good: Theme-aware coloring
<PiFireLine className="text-primary" />

// ❌ Avoid: Fixed pixel dimensions that don't scale
<PiFireLine style={{ width: '20px', height: '20px' }} />

// ❌ Avoid: Redundant size specifications
<PiFireLine className="w-4 h-4" style={{ width: '16px' }} />
```

### Performance Considerations
- Renders efficiently as static SVG
- No runtime overhead or re-renders
- Can be safely used in lists or repeated elements
- Consider icon sprite sheets for applications with many icons