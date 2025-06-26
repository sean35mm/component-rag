# PiLightbulbFlashLine Icon Component

## Purpose
The `PiLightbulbFlashLine` component renders an SVG icon depicting a lightbulb with a lightning bolt inside, typically used to represent ideas, inspiration, innovation, or power/energy concepts. This icon follows the Phosphor Icons design system and is commonly used in UI elements like buttons, cards, navigation items, or anywhere visual representation of creativity or electrical concepts is needed.

## Component Type
**Server Component** - This is a presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server, making it optimal for performance and SEO.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread into the root SVG element |

### Common SVG Props
| Prop Name | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiLightbulbFlashLine } from '@/components/icons/pi/pi-lightbulb-flash-line';

// Basic usage
export function IdeaButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiLightbulbFlashLine />
      New Idea
    </button>
  );
}

// With custom styling
export function InnovationCard() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <PiLightbulbFlashLine 
        className="w-8 h-8 text-yellow-500 mb-4" 
        aria-label="Innovation"
      />
      <h3 className="text-lg font-semibold">Innovation Hub</h3>
      <p>Discover breakthrough ideas and solutions</p>
    </div>
  );
}

// Interactive usage
export function ToggleInspirationMode({ onToggle, isActive }) {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded ${isActive ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}
      aria-label={`${isActive ? 'Disable' : 'Enable'} inspiration mode`}
    >
      <PiLightbulbFlashLine className="w-5 h-5" />
    </button>
  );
}

// In navigation
export function CreativeToolsNav() {
  return (
    <nav className="flex space-x-4">
      <a href="/brainstorm" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
        <PiLightbulbFlashLine className="w-4 h-4" />
        Brainstorm
      </a>
    </nav>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic of a lightbulb with lightning bolt
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard mouse and keyboard events through props spreading
- **Styling Flexible**: Accepts className and style props for custom appearance

## State Management
**None** - This is a pure presentational component with no internal state. Any interactive behavior is handled by parent components through event handlers passed as props.

## Side Effects
**None** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained SVG icon with no additional libraries

## Integration
This icon component integrates seamlessly into the application architecture:

- **UI Component Library**: Part of the standardized icon system in `/components/icons/`
- **Design System**: Follows Phosphor Icons design language for consistency
- **Server-Side Rendering**: Compatible with Next.js SSR/SSG
- **Styling Systems**: Works with Tailwind CSS, CSS Modules, or styled-components
- **Feature Components**: Can be imported and used in any domain-specific components
- **Accessibility**: Integrates with screen readers when proper ARIA labels are provided

## Best Practices

### ✅ Recommended Patterns
```tsx
// Use semantic HTML with proper ARIA labels
<button aria-label="Generate new idea">
  <PiLightbulbFlashLine />
</button>

// Combine with text for clarity
<div className="flex items-center gap-2">
  <PiLightbulbFlashLine className="w-4 h-4" />
  <span>Innovation</span>
</div>

// Use consistent sizing classes
<PiLightbulbFlashLine className="w-5 h-5" /> // Small
<PiLightbulbFlashLine className="w-6 h-6" /> // Medium
<PiLightbulbFlashLine className="w-8 h-8" /> // Large
```

### ❌ Anti-patterns
```tsx
// Don't use without context in interactive elements
<button>
  <PiLightbulbFlashLine /> {/* No aria-label or text */}
</button>

// Avoid inline styles when CSS classes are available
<PiLightbulbFlashLine style={{ width: '20px', height: '20px' }} />

// Don't override fill color directly (use text color instead)
<PiLightbulbFlashLine style={{ fill: '#000' }} />
```

### Architecture Adherence
- **Flat Component Structure**: Icon lives in dedicated `/icons/` directory, not nested deeply
- **Server-First**: Renders on server by default, no unnecessary client-side hydration
- **Props Spreading**: Maintains flexibility while providing type safety
- **Single Responsibility**: Only responsible for rendering the icon SVG
- **Reusable**: Can be composed into any feature component across domains