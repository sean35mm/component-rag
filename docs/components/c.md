# C Icon Component

## Purpose

The `C` component is an SVG icon component that renders the letter "C" in a standardized format. It serves as a visual indicator for the C programming language in technology stacks, skill displays, or programming language selection interfaces. The component provides a scalable, accessible icon that inherits color and sizing from its parent context.

## Component Type

**Server Component** - This is a purely presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server as it only takes props and returns JSX.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | All standard SVG element attributes including `className`, `style`, `onClick`, `aria-label`, etc. Spreads to the root `<svg>` element |

### Common SVG Attributes
| Attribute | Type | Description |
|-----------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { C } from '@/components/icons/c';

// Basic usage
export function TechStack() {
  return (
    <div className="flex items-center gap-2">
      <C className="w-6 h-6 text-blue-600" />
      <span>C Programming</span>
    </div>
  );
}

// In a skills grid
export function SkillsGrid() {
  const skills = [
    { name: 'C', icon: C, color: 'text-blue-600' },
    // ... other skills
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {skills.map((skill) => (
        <div key={skill.name} className="flex flex-col items-center p-4">
          <skill.icon className={`w-8 h-8 ${skill.color} mb-2`} />
          <span className="text-sm">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}

// Interactive usage with click handler
export function ProgrammingLanguageSelector() {
  const handleLanguageSelect = (language: string) => {
    console.log(`Selected: ${language}`);
  };

  return (
    <button
      onClick={() => handleLanguageSelect('C')}
      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
    >
      <C className="w-5 h-5" aria-label="C programming language" />
      <span>C</span>
    </button>
  );
}

// With custom sizing and accessibility
export function AccessibleTechIcon() {
  return (
    <C
      className="w-12 h-12 text-gray-700"
      role="img"
      aria-label="C programming language"
      style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Current Color Inheritance**: Uses `currentColor` for both fill and stroke, inheriting text color from parent
- **Responsive Sizing**: Default `1em` size scales with font-size, can be overridden with CSS classes
- **Flexible Styling**: Accepts all standard SVG attributes for complete customization
- **Accessibility Ready**: Can receive ARIA attributes for screen reader compatibility

### Visual Properties
- **Viewbox**: `0 0 18 18` coordinate system
- **Default Size**: `1em × 1em` (scales with font size)
- **Color**: Inherits from `currentColor`
- **Stroke**: Enabled with width 0 (effectively disabled)

## State Management

**No State Management** - This is a pure functional component that doesn't manage any state. It simply transforms props into SVG markup without any internal state, side effects, or data fetching requirements.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure function that deterministically renders the same output for the same props.

## Dependencies

### Direct Dependencies
- `React`: Core React library for JSX and component definition
- `SVGAttributes` type from React for proper TypeScript typing

### No Internal Dependencies
- No custom hooks, utilities, or other internal components
- No external libraries beyond React
- No API services or data fetching dependencies

## Integration

### Application Architecture Role
- **UI Component Layer**: Lives in `/components/icons/` as a reusable UI primitive
- **Design System**: Part of the icon library for consistent visual language
- **Feature Integration**: Used by feature components for technology representation
- **Layout Agnostic**: Can be integrated into any layout or component hierarchy

### Common Integration Patterns
```tsx
// In tech stack displays
import { C } from '@/components/icons/c';

// In form selections
const TechStackForm = () => (
  <div className="space-y-4">
    <label className="flex items-center gap-2">
      <input type="checkbox" value="c" />
      <C className="w-4 h-4" />
      <span>C</span>
    </label>
  </div>
);

// In data visualization
const SkillChart = ({ skills }) => (
  <div className="chart">
    {skills.map(skill => (
      <div key={skill.name} className="skill-bar">
        <C className="skill-icon" />
        <div className="skill-level" style={{ width: `${skill.level}%` }} />
      </div>
    ))}
  </div>
);
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component (no client-side features)
- ✅ **Reusable UI Component**: Properly placed in UI component layer
- ✅ **Single Responsibility**: Focused solely on rendering C language icon
- ✅ **Composable Design**: Can be easily combined with other components

### Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper accessibility
<C className="w-6 h-6 text-blue-600" aria-label="C programming language" />

// ✅ Good: Consistent sizing with Tailwind classes
<C className="w-5 h-5" />

// ✅ Good: Color inheritance
<div className="text-blue-600">
  <C /> {/* Inherits blue color */}
</div>

// ❌ Avoid: Hardcoded inline styles when classes are available
<C style={{ width: '24px', height: '24px', color: '#blue' }} />

// ✅ Better: Use Tailwind classes
<C className="w-6 h-6 text-blue-600" />
```

### Accessibility Guidelines
- Always provide `aria-label` when icon conveys meaning
- Use `role="img"` when icon is decorative but meaningful
- Ensure sufficient color contrast when styling
- Consider providing text alternatives in complex interfaces

### Performance Considerations
- Component is lightweight with no runtime overhead
- SVG is inline, avoiding additional HTTP requests
- No re-renders since component is pure and stateless
- Safe for server-side rendering and static generation