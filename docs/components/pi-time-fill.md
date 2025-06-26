# PiTimeFill Icon Component

## Purpose
The `PiTimeFill` component is an SVG icon that renders a filled clock/time symbol. It's part of the Phosphor icon library implementation and is used throughout the application to represent time-related functionality, timestamps, scheduling, or temporal data.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup. It doesn't require client-side interactivity, state management, or browser APIs, making it ideal as a server component for optimal performance and SEO.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |
| `width` | `string \| number` | Override default width |
| `height` | `string \| number` | Override default height |

## Usage Example

```tsx
import { PiTimeFill } from '@/components/icons/pi/pi-time-fill';

// Basic usage
export default function TimeDisplay() {
  return (
    <div className="flex items-center gap-2">
      <PiTimeFill />
      <span>Last updated: 2 hours ago</span>
    </div>
  );
}

// With custom styling
export function ScheduleCard() {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <PiTimeFill 
          className="text-blue-600 w-5 h-5" 
          aria-label="Schedule time"
        />
        <h3 className="font-semibold">Meeting Schedule</h3>
      </div>
      <p>Daily standup at 9:00 AM</p>
    </div>
  );
}

// Interactive usage
export function TimeButton() {
  const handleTimeClick = () => {
    // Handle time-related action
    console.log('Time button clicked');
  };

  return (
    <button 
      onClick={handleTimeClick}
      className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
    >
      <PiTimeFill className="w-4 h-4" />
      <span>Set Time</span>
    </button>
  );
}

// In data tables
export function ActivityTable() {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="flex items-center gap-2">
            <PiTimeFill className="w-4 h-4" />
            Timestamp
          </th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        {/* Table content */}
      </tbody>
    </table>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a filled clock icon using SVG paths
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports standard DOM events like `onClick`, `onMouseOver`, etc.
- **Customizable**: Accepts all standard SVG props for full customization

## State Management
**No State Management** - This is a pure functional component that doesn't manage any internal state. It's a stateless presentational component that simply renders SVG markup based on the props passed to it.

## Side Effects
**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that returns JSX based on its props.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained component with no external library dependencies

## Integration
This icon component integrates into the larger application architecture as:

- **UI Building Block**: Used as a primitive component in larger UI compositions
- **Icon System**: Part of the standardized Phosphor icon library implementation
- **Design System**: Follows consistent sizing and color patterns across the application
- **Accessibility Layer**: Supports ARIA attributes for inclusive design
- **Theme Integration**: Respects CSS custom properties and theme tokens through `currentColor`

## Best Practices

### ✅ Adherence to Architecture Guidelines
- **Server Component**: Correctly implemented as a server component since no client-side interactivity is needed
- **Component Decomposition**: Simple, focused component that does one thing well
- **Reusability**: Located in `/components/icons/` for shared usage across features
- **Flat Structure**: No unnecessary nesting or complexity

### ✅ Recommended Usage Patterns
```tsx
// Good: Semantic usage with proper labeling
<PiTimeFill aria-label="Last modified time" className="text-gray-500" />

// Good: Consistent sizing
<PiTimeFill className="w-4 h-4" /> // Small
<PiTimeFill className="w-5 h-5" /> // Medium
<PiTimeFill className="w-6 h-6" /> // Large

// Good: Proper color inheritance
<div className="text-blue-600">
  <PiTimeFill /> {/* Inherits blue color */}
</div>
```

### ❌ Anti-patterns to Avoid
```tsx
// Avoid: Hardcoded colors that break theme consistency
<PiTimeFill style={{ color: '#ff0000' }} />

// Avoid: Unnecessary client component wrapper
'use client';
function TimeIcon() {
  return <PiTimeFill />;
}

// Avoid: Missing accessibility labels in interactive contexts
<button onClick={handleClick}>
  <PiTimeFill /> {/* Missing aria-label */}
</button>
```