# PiMoonFill Icon Component

## Purpose

The `PiMoonFill` component is a filled moon icon used to represent dark mode or night theme states in the application's UI. This icon is part of the Phosphor icon family and provides a consistent visual element for theme toggle buttons, navigation elements, or any interface component that needs to indicate dark mode functionality.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity. It can be safely rendered on the server as it has no state, event handlers, or browser-specific APIs.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Allows full customization of the SVG element. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click handler for interactive usage |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiMoonFill } from '@/components/icons/pi/pi-moon-fill';

// Basic usage
function ThemeToggle() {
  return (
    <button className="p-2 rounded-md hover:bg-gray-100">
      <PiMoonFill className="w-5 h-5 text-gray-700" />
    </button>
  );
}

// With accessibility
function AccessibleThemeButton() {
  return (
    <button 
      className="p-2 rounded-md hover:bg-gray-100"
      aria-label="Switch to dark mode"
    >
      <PiMoonFill 
        className="w-5 h-5 text-gray-700"
        role="img"
        aria-hidden="true"
      />
    </button>
  );
}

// In navigation
function NavigationItem() {
  return (
    <div className="flex items-center gap-2">
      <PiMoonFill className="w-4 h-4 text-blue-600" />
      <span>Dark Mode</span>
    </div>
  );
}

// With custom styling
function CustomStyledIcon() {
  return (
    <PiMoonFill 
      className="w-8 h-8 text-purple-500 hover:text-purple-700 transition-colors"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders as crisp SVG at any size
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Aware**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts all ARIA attributes for screen readers
- **Customizable**: Accepts all standard SVG props for full customization

### Visual Characteristics
- **ViewBox**: 24x24 coordinate system
- **Fill Rule**: Even-odd fill rule for complex path rendering
- **Design**: Filled moon crescent shape following Phosphor icon design system

## State Management

**No State Management Required** - This is a pure presentational component with no internal state. When used in interactive contexts (like theme toggles), state management should be handled by parent components using:

- **Theme State**: Zustand store for global theme preferences
- **User Preferences**: TanStack Query for persisting theme choices to server

```tsx
// Example with Zustand theme store
import { useThemeStore } from '@/stores/theme-store';

function ThemeToggleWithState() {
  const { isDark, toggleTheme } = useThemeStore();
  
  return (
    <button onClick={toggleTheme}>
      <PiMoonFill className={isDark ? 'text-yellow-400' : 'text-gray-600'} />
    </button>
  );
}
```

## Side Effects

**No Side Effects** - This component is purely functional with no:
- API calls
- DOM manipulation
- Browser storage access
- External service interactions

Side effects should be managed by parent components that use this icon.

## Dependencies

### Internal Dependencies
- React's `SVGProps` type for prop typing

### No External Dependencies
- No third-party libraries required
- No custom hooks or utilities needed
- No other components dependencies

## Integration

### Application Architecture Fit
- **UI Component Layer**: Part of the base icon system in `/components/icons/`
- **Design System**: Follows Phosphor icon family conventions
- **Theme Integration**: Works seamlessly with theme providers
- **Component Composition**: Designed to be composed into larger UI elements

### Common Integration Patterns
```tsx
// In theme toggle components
<ThemeToggle icon={PiMoonFill} />

// In navigation menus
<MenuItem icon={PiMoonFill} label="Dark Mode" />

// In preference panels
<SettingItem icon={PiMoonFill} title="Theme" />
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component
✅ **Single Responsibility**: Focused solely on rendering moon icon
✅ **Composability**: Designed to be composed into larger components
✅ **Prop Flexibility**: Accepts all SVG props for maximum reusability

### Recommended Usage Patterns
```tsx
// ✅ Good: Semantic usage with proper labeling
<button aria-label="Enable dark mode">
  <PiMoonFill className="w-5 h-5" />
</button>

// ✅ Good: Consistent sizing with Tailwind
<PiMoonFill className="w-4 h-4" /> // Small
<PiMoonFill className="w-5 h-5" /> // Medium  
<PiMoonFill className="w-6 h-6" /> // Large

// ✅ Good: Theme-aware coloring
<PiMoonFill className="text-current" />

// ❌ Avoid: Hardcoded dimensions
<PiMoonFill style={{ width: '20px', height: '20px' }} />
```

### Accessibility Guidelines
- Always provide `aria-label` on interactive parent elements
- Use `aria-hidden="true"` on decorative usage
- Ensure sufficient color contrast for visibility
- Consider reduced motion preferences for any animations