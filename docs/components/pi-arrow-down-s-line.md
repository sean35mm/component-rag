# PiArrowDownSLine Icon Component

## Purpose

The `PiArrowDownSLine` component is a down-pointing arrow icon designed for indicating dropdown states, sorting directions, or navigation downward. It's part of our standardized icon system and provides a consistent visual element for directional UI interactions throughout the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Inherited SVG Props (Common Usage)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `data-testid` | `string` | Test identifier |

## Usage Example

```tsx
import { PiArrowDownSLine } from '@/components/icons/pi/pi-arrow-down-s-line';

// Basic usage
export function DropdownButton() {
  return (
    <button className="flex items-center gap-2">
      Select Option
      <PiArrowDownSLine className="h-4 w-4" />
    </button>
  );
}

// Interactive dropdown with state
'use client';

import { useState } from 'react';
import { PiArrowDownSLine } from '@/components/icons/pi/pi-arrow-down-s-line';

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-md"
      >
        Categories
        <PiArrowDownSLine 
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg">
          {/* Dropdown content */}
        </div>
      )}
    </div>
  );
}

// Table sorting indicator
export function SortableTableHeader({ column, onSort }: SortableHeaderProps) {
  return (
    <button
      onClick={() => onSort(column)}
      className="flex items-center gap-1 font-medium"
    >
      Name
      <PiArrowDownSLine 
        className="h-3 w-3 text-gray-400"
        aria-label="Sort descending"
      />
    </button>
  );
}
```

## Functionality

- **Scalable Vector Icon**: Renders as SVG with `1em` dimensions, automatically scaling with font size
- **Current Color Fill**: Uses `currentColor` for fill, inheriting text color from parent elements
- **Accessible**: Accepts all standard SVG accessibility props like `aria-label`
- **Customizable**: Fully customizable through className, style, and other SVG props
- **Interactive**: Can receive event handlers for user interactions

## State Management

**No State Management** - This is a stateless presentational component. Any state management for features using this icon (like dropdown open/closed states) should be handled by parent components using:
- Local state with `useState` for simple UI states
- Zustand for complex client-side state
- TanStack Query for server-derived state

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition

### Related Components
- Other Pi icon components in the same icon family
- UI components that commonly use directional icons (dropdowns, accordions, sort controls)

## Integration

This component integrates into our application architecture as:

- **Design System Component**: Part of our standardized icon library ensuring visual consistency
- **Building Block**: Used within feature components across different domains (forms, tables, navigation)
- **Accessibility Layer**: Supports ARIA attributes for screen readers and assistive technologies
- **Theme Integration**: Inherits colors from our design system through `currentColor`

### Common Integration Patterns

```tsx
// In dropdown components
import { PiArrowDownSLine } from '@/components/icons/pi/pi-arrow-down-s-line';

// In table sorting
import { PiArrowDownSLine } from '@/components/icons/pi/pi-arrow-down-s-line';

// In accordion/collapsible sections
import { PiArrowDownSLine } from '@/components/icons/pi/pi-arrow-down-s-line';
```

## Best Practices

### ✅ Adherence to Architecture Patterns

- **Server-First**: Properly implemented as Server Component without unnecessary client boundaries
- **Reusable Design**: Located in icon-specific directory following our component organization
- **Props Interface**: Uses standard SVG props interface for maximum flexibility
- **No Over-Engineering**: Avoids unnecessary abstractions for a simple icon component

### ✅ Recommended Usage

```tsx
// Good: Semantic sizing with Tailwind classes
<PiArrowDownSLine className="h-4 w-4" />

// Good: Accessibility support
<PiArrowDownSLine aria-label="Expand menu" />

// Good: Responsive to theme colors
<PiArrowDownSLine className="text-primary" />

// Good: Animation support
<PiArrowDownSLine className="transition-transform rotate-180" />
```

### ❌ Anti-Patterns to Avoid

```tsx
// Bad: Don't wrap unnecessarily in client components
'use client';
export function ArrowWrapper() {
  return <PiArrowDownSLine />;
}

// Bad: Don't override the size props directly
<PiArrowDownSLine width="16px" height="16px" />

// Bad: Don't duplicate - reuse this component
const CustomArrowDown = () => <svg>...</svg>;
```