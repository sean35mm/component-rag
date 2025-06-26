# PiTeamLine Icon Component

## Purpose

The `PiTeamLine` component is an SVG icon that displays a team/group symbol with multiple person figures. It's part of the Phosphor icon library integration and provides a visual representation for team-related features, user groups, collaboration sections, or multi-user functionality within the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiTeamLine } from '@/components/icons/pi/pi-team-line';

// Basic usage
export default function TeamSection() {
  return (
    <div className="flex items-center gap-2">
      <PiTeamLine />
      <span>Team Members</span>
    </div>
  );
}

// With styling and interaction
export default function TeamCard() {
  return (
    <button 
      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
      onClick={() => console.log('Team clicked')}
    >
      <PiTeamLine 
        className="w-6 h-6 text-blue-600" 
        aria-label="Team icon"
      />
      <div className="text-left">
        <h3 className="font-semibold">Development Team</h3>
        <p className="text-sm text-gray-600">5 members</p>
      </div>
    </button>
  );
}

// In navigation or menus
export default function Sidebar() {
  return (
    <nav>
      <a href="/teams" className="flex items-center gap-2 p-2 hover:bg-gray-100">
        <PiTeamLine className="w-5 h-5" />
        <span>Teams</span>
      </a>
    </nav>
  );
}

// With different sizes using Tailwind
<PiTeamLine className="w-4 h-4" />  {/* Small */}
<PiTeamLine className="w-6 h-6" />  {/* Medium */}
<PiTeamLine className="w-8 h-8" />  {/* Large */}
```

## Functionality

### Key Features
- **Responsive Sizing**: Uses `1em` dimensions that scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Interactive Capable**: Supports click handlers and other event props
- **Customizable**: Fully styleable through className and style props

### Visual Design
- Displays three person figures representing a team
- Line-style (outline) design with consistent stroke weight
- 24x24 viewBox providing crisp rendering at any size
- Follows Phosphor icon design system conventions

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects

**No Side Effects** - This component performs no API calls, data fetching, or external system interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `React` - Uses `SVGProps` type from React

### External Dependencies
- None - This is a self-contained SVG icon component

## Integration

### Icon System Integration
```tsx
// Can be used with a centralized icon mapping
const iconMap = {
  team: PiTeamLine,
  // other icons...
};

// Or with an icon component wrapper
interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent {...props} /> : null;
}
```

### UI Component Integration
```tsx
// With Button components
<Button variant="outline" icon={<PiTeamLine />}>
  Manage Team
</Button>

// With Card components
<Card>
  <CardHeader>
    <PiTeamLine className="w-6 h-6 mb-2" />
    <CardTitle>Team Overview</CardTitle>
  </CardHeader>
</Card>
```

## Best Practices

### Architectural Adherence
- ✅ **Server Component**: Correctly implemented as server component
- ✅ **Component Decomposition**: Simple, focused responsibility
- ✅ **Reusability**: Generic icon usable across features
- ✅ **Props Pattern**: Uses standard SVG props interface

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<button aria-label="View team members">
  <PiTeamLine className="w-5 h-5" />
  <span className="sr-only">Team Members</span>
</button>

// ✅ Good: Consistent sizing with design system
<PiTeamLine className="w-6 h-6 text-primary-600" />

// ✅ Good: Proper contrast and visibility
<PiTeamLine className="w-5 h-5 text-gray-700 dark:text-gray-300" />

// ❌ Avoid: Hardcoded dimensions that don't scale
<PiTeamLine style={{ width: '20px', height: '20px' }} />

// ❌ Avoid: Missing accessibility context
<button>
  <PiTeamLine /> {/* No context for screen readers */}
</button>
```

### Performance Considerations
- Icons are lightweight SVG components with minimal render cost
- Can be safely used in lists or repeated elements
- Consider icon sprite systems for applications with many icons