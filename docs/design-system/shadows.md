# Perigon Shadows & Effects System

A comprehensive shadow system designed specifically for the Perigon application to create consistent depth, elevation, and visual hierarchy. The system provides carefully crafted shadows that work seamlessly in both light and dark modes with automatic theme adaptation.

## Shadow Architecture

### Technical Foundation

Shadows use CSS variables with RGB values to support both opacity variations and theme switching:

```css
:root {
  /* Shadow color variables */
  --color-pg-shadow-5: #1212120d;
  --color-pg-shadow-10: rgba(var(--color-pg-alpha-neutral), 0.1);
  --color-pg-shadow-12: #1212121f;
  --color-pg-shadow-blue-75: #227c9d75;

  /* Static shadow colors (theme-independent) */
  --color-pg-static-950: 3, 7, 18; /* Very dark blue-gray */
}

/* Dark mode adjustments */
.dark {
  --color-pg-shadow-5: rgba(var(--color-pg-static-950), 1);
  --color-pg-shadow-10: rgba(var(--color-pg-alpha-neutral), 0.1);
  --color-pg-shadow-12: rgba(var(--color-pg-static-950), 1);
}
```

### Shadow Philosophy

- **Elevation**: Clear visual hierarchy through depth
- **Consistency**: Predictable shadow progression using design tokens
- **Accessibility**: Maintains visibility in both light and dark modes
- **Performance**: Optimized shadow values for smooth rendering
- **Semantic**: Purpose-specific shadows for different UI elements

## Standard Shadow Scale

### Basic Elevation System

Progressive shadow system from subtle to pronounced elevation:

| Level | Class         | Elevation        | Usage          | Shadow Definition                         |
| ----- | ------------- | ---------------- | -------------- | ----------------------------------------- |
| 0     | `shadow-none` | No elevation     | Flush elements | `none`                                    |
| 1     | `shadow-sm`   | Minimal lift     | Subtle borders | `0 1px 0 0 var(--color-pg-shadow-5)`      |
| 2     | `shadow-md`   | Medium elevation | Cards, buttons | `0 16px 32px -12px rgba(14, 18, 27, 0.1)` |

```css
/* Basic shadow utilities */
.shadow-sm {
  box-shadow: 0 1px 0 0 var(--color-pg-shadow-5);
}

.shadow-md {
  box-shadow: 0 16px 32px -12px rgba(14, 18, 27, 0.1);
}
```

## Specialized Shadow System

### Button & Interactive Shadows

Purpose-built shadows for interactive elements:

```css
/* Important button focus state */
.shadow-buttons-important-focus {
  box-shadow:
    0 0 6px -1px var(--color-bg-blue-tint),
    0 0 12px 2px rgba(var(--color-bg-blue-tint-light), 1);
}

/* Toggle switch elevation */
.shadow-toggle-switch {
  box-shadow:
    0 2px 1px 0px var(--color-pg-shadow-5),
    0 1px 0px 0px var(--color-pg-shadow-5);
}
```

### Form & Input Shadows

Specialized shadows for form elements:

```css
/* Input field pop elevation */
.shadow-input-field-pop {
  box-shadow: 0 2px 2px 0 var(--color-pg-shadow-10);
}

/* Small input field pop */
.shadow-input-field-pop-sm {
  box-shadow: 0 1px 1px 0 var(--color-pg-shadow-10);
}

/* Blue glow for focused inputs */
.shadow-input-blue-glow-strong {
  box-shadow: 0 0 10px -2px rgba(34, 124, 157, 0.75);
}

/* Input overlay shadow */
.shadow-regular-shadow-input-overlay {
  box-shadow:
    0 1px 0 0 var(--color-pg-shadow-10),
    0 4px 3px 0 var(--color-pg-shadow-10);
}

/* Container inset shadow */
.shadow-container-inset {
  box-shadow: 0px 1px 1px 0px var(--color-pg-shadow-12) inset;
}
```

### Navigation & Layout Shadows

Shadows for navigation and layout elements:

```css
/* Side tray/drawer shadow */
.shadow-side-tray {
  box-shadow:
    -1px 0 0 1px rgba(var(--color-pg-alpha-neutral), 0.06),
    0 0 40px -10px var(--color-pg-shadow-5);
}

/* Live search trays */
.shadow-live-search-trays {
  box-shadow:
    0 8px 16px -4px var(--color-pg-shadow-5),
    0 2px 4px 1px var(--color-pg-shadow-12),
    0 1px 2px -4px var(--color-pg-shadow-12);
}

/* Popover tray shadow */
.shadow-popover-tray {
  box-shadow: 0 16px 32px -12px var(--color-pg-shadow-10);
}

/* Main desktop window shadow */
.shadow-main-desktop-window {
  box-shadow:
    0 0 12px 2px var(--color-pg-shadow-5),
    0 4px 4px 1px var(--color-pg-shadow-5);
}
```

### Card & Content Shadows

Specialized shadows for content containers:

```css
/* Card shadow pop */
.shadow-card-shadow-pop {
  box-shadow:
    0 0px 2px 1px var(--color-pg-shadow-12),
    0 1px 4px 4px var(--color-pg-shadow-12);
}

/* Strong card shadow pop */
.shadow-card-shadow-pop-strong {
  box-shadow:
    0px 0px 2px 1px var(--color-pg-shadow-5),
    0px 2px 4px 1px var(--color-pg-shadow-5),
    0px 2px 4px -2px var(--color-pg-shadow-12),
    0px 10px 40px 0px var(--color-pg-shadow-10),
    0px 8px 24px -6px var(--color-pg-shadow-5);
}
```

### Tooltip & Overlay Shadows

Shadows for floating elements:

```css
/* Standard tooltip shadow */
.shadow-tooltip {
  box-shadow:
    0 4px 16px 0px var(--color-pg-shadow-5),
    0 4px 5px 0px var(--color-pg-shadow-5);
}

/* Small tooltip shadow */
.shadow-tooltip-s {
  box-shadow:
    0px 3px 4px 0px var(--color-pg-shadow-12),
    0px 4px 5px 0px var(--color-pg-shadow-5),
    0px 4px 16px 0px var(--color-pg-shadow-5);
}

/* Autocomplete dropdown shadow */
.shadow-auto-complete {
  box-shadow:
    0px 3px 4px 0px var(--color-pg-shadow-12),
    0 2px 4px 1px var(--color-pg-shadow-12),
    0px 4px 5px 0px var(--color-pg-shadow-5),
    0px 4px 16px 0px var(--color-pg-shadow-5);
}
```

### Glow Effects

Special glow effects for emphasis and focus states:

```css
/* Blue glow strong */
.shadow-blue-glow-strong {
  box-shadow: 0 0px 10px -2px var(--color-pg-shadow-blue-75);
}

/* Blue glow for inputs */
.shadow-input-blue-glow-strong {
  box-shadow: 0 0 10px -2px rgba(34, 124, 157, 0.75);
}
```

## Tailwind Integration

All shadows are integrated into the Tailwind configuration:

```javascript
// tailwind.config.ts
export const config = {
  theme: {
    extend: {
      boxShadow: {
        // Basic shadows
        sm: `0 1px 0 0 ${getColorVar('--color-pg-shadow-5')}`,
        md: '0 16px 32px -12px rgba(14, 18, 27, 0.1)',

        // Interactive shadows
        buttonsImportantFocus:
          '0 0 6px -1px var(--color-bg-blue-tint), 0 0 12px 2px rgba(var(--color-bg-blue-tint-light), 1)',
        inputFieldPop: '0 2px 2px 0 var(--color-pg-shadow-10)',
        inputFieldPopSm: '0 1px 1px 0 var(--color-pg-shadow-10)',
        inputBlueGlowStrong: '0 0 10px -2px rgba(34, 124, 157, 0.75)',

        // Layout shadows
        regularShadowInputOverlay:
          '0 1px 0 0 var(--color-pg-shadow-10), 0 4px 3px 0 var(--color-pg-shadow-10)',
        sideTray:
          '-1px 0 0 1px rgba(var(--color-pg-alpha-neutral), 0.06), 0 0 40px -10px var(--color-pg-shadow-5)',
        liveSearchTrays: `0 8px 16px -4px ${getColorVar('--color-pg-shadow-5')}, 0 2px 4px 1px ${getColorVar('--color-pg-shadow-12')}, 0 1px 2px -4px ${getColorVar('--color-pg-shadow-12')}`,
        poproverTray: `0 16px 32px -12px ${getColorVar('--color-pg-shadow-10')}`,

        // Content shadows
        cardShadowPop: `0 0px 2px 1px ${getColorVar('--color-pg-shadow-12')}, 0 1px 4px 4px ${getColorVar('--color-pg-shadow-12')}`,
        cardShadowPopStrong: `0px 0px 2px 1px ${getColorVar('--color-pg-shadow-5')}, 0px 2px 4px 1px ${getColorVar('--color-pg-shadow-5')}, 0px 2px 4px -2px ${getColorVar('--color-pg-shadow-12')}, 0px 10px 40px 0px ${getColorVar('--color-pg-shadow-10')}, 0px 8px 24px -6px ${getColorVar('--color-pg-shadow-5')}`,

        // Special effects
        blueGlowStrong: `0 0px 10px -2px ${getColorVar('--color-pg-shadow-blue-75')}`,
        toggleSwitch: `0 2px 1px 0px ${getColorVar('--color-pg-shadow-5')}, 0 1px 0px 0px ${getColorVar('--color-pg-shadow-5')}`,
        containerInset: `0px 1px 1px 0px ${getColorVar('--color-pg-shadow-12')} inset`,

        // Floating elements
        tooltip: `0 4px 16px 0px ${getColorVar('--color-pg-shadow-5')}, 0 4px 5px 0px ${getColorVar('--color-pg-shadow-5')}`,
        tooltipS: `0px 3px 4px 0px ${getColorVar('--color-pg-shadow-12')}, 0px 4px 5px 0px ${getColorVar('--color-pg-shadow-5')}, 0px 4px 16px 0px ${getColorVar('--color-pg-shadow-5')}`,
        autoComplete: `0px 3px 4px 0px ${getColorVar('--color-pg-shadow-12')}, 0 2px 4px 1px ${getColorVar('--color-pg-shadow-12')}, 0px 4px 5px 0px ${getColorVar('--color-pg-shadow-5')}, 0px 4px 16px 0px ${getColorVar('--color-pg-shadow-5')}`,
        mainDesktopWindow: `0 0 12px 2px ${getColorVar('--color-pg-shadow-5')}, 0 4px 4px 1px ${getColorVar('--color-pg-shadow-5')}`,
      },
    },
  },
};
```

## Dark Mode Adaptations

### Automatic Shadow Adjustments

Shadows automatically adapt in dark mode through CSS variable changes:

```css
/* Light mode shadows */
:root {
  --color-pg-shadow-5: #1212120d;
  --color-pg-shadow-10: rgba(var(--color-pg-alpha-neutral), 0.1);
  --color-pg-shadow-12: #1212121f;
}

/* Dark mode shadow adjustments */
.dark {
  --color-pg-shadow-5: rgba(var(--color-pg-static-950), 1);
  --color-pg-shadow-10: rgba(var(--color-pg-alpha-neutral), 0.1);
  --color-pg-shadow-12: rgba(var(--color-pg-static-950), 1);
}
```

### Theme-Aware Shadow Variables

Some shadows use theme-aware variables that automatically adapt:

```css
/* These automatically adapt to theme */
.shadow-side-tray {
  box-shadow:
    -1px 0 0 1px rgba(var(--color-pg-alpha-neutral), 0.06),
    0 0 40px -10px var(--color-pg-shadow-5);
}

.shadow-buttons-important-focus {
  box-shadow:
    0 0 6px -1px var(--color-bg-blue-tint),
    0 0 12px 2px rgba(var(--color-bg-blue-tint-light), 1);
}
```

## Interactive Shadow States

### Button Shadow Progression

```css
.btn-shadow {
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.15s ease-in-out;
}

.btn-shadow:hover {
  box-shadow: var(--shadow-md);
}

.btn-shadow:active {
  box-shadow: var(--shadow-sm);
}

.btn-shadow:focus {
  box-shadow: var(--shadow-buttons-important-focus);
}
```

### Card Shadow Transitions

```css
.card-interactive {
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}

.card-interactive:hover {
  box-shadow: var(--shadow-card-shadow-pop);
  transform: translateY(-2px);
}

.card-interactive:active {
  box-shadow: var(--shadow-card-shadow-pop-strong);
  transform: translateY(0);
}
```

### Input Focus States

```css
.input-field {
  box-shadow: var(--shadow-input-field-pop);
  transition: box-shadow 0.15s ease-in-out;
}

.input-field:focus {
  box-shadow: var(--shadow-input-blue-glow-strong);
}

.input-field.error:focus {
  box-shadow: 0 0 10px -2px rgba(239, 68, 68, 0.75);
}
```

## Component-Specific Shadow Usage

### Navigation Elements

```css
.nav-header {
  box-shadow: var(--shadow-sm);
}

.nav-dropdown {
  box-shadow: var(--shadow-live-search-trays);
}

.nav-sidebar {
  box-shadow: var(--shadow-side-tray);
}
```

### Form Elements

```css
.form-input {
  box-shadow: var(--shadow-input-field-pop);
}

.form-input:focus {
  box-shadow: var(--shadow-input-blue-glow-strong);
}

.form-select {
  box-shadow: var(--shadow-input-field-pop-sm);
}

.form-checkbox:checked {
  box-shadow: var(--shadow-container-inset);
}
```

### Modal and Overlay Elements

```css
.modal-content {
  box-shadow: var(--shadow-main-desktop-window);
}

.tooltip {
  box-shadow: var(--shadow-tooltip);
}

.tooltip-small {
  box-shadow: var(--shadow-tooltip-s);
}

.autocomplete-dropdown {
  box-shadow: var(--shadow-auto-complete);
}

.popover {
  box-shadow: var(--shadow-popover-tray);
}
```

### Interactive Components

```css
.toggle-switch {
  box-shadow: var(--shadow-toggle-switch);
}

.card-clickable {
  box-shadow: var(--shadow-card-shadow-pop);
}

.card-clickable:hover {
  box-shadow: var(--shadow-card-shadow-pop-strong);
}

.search-result {
  box-shadow: var(--shadow-live-search-trays);
}
```

## Implementation Examples

### Component Usage

```html
<!-- Card with interactive shadow -->
<div
  class="rounded-lg bg-white p-6 shadow-cardShadowPop transition-shadow hover:shadow-cardShadowPopStrong"
>
  <h3 class="typography-titleH4 mb-2">Card Title</h3>
  <p class="typography-paragraphMedium text-secondary">Card content</p>
</div>

<!-- Button with focus shadow -->
<button
  class="rounded bg-blue-600 px-4 py-2 text-white shadow-sm transition-shadow hover:shadow-md focus:shadow-buttonsImportantFocus"
>
  Click Me
</button>

<!-- Input with focus glow -->
<input
  type="text"
  class="rounded border px-3 py-2 shadow-inputFieldPop transition-shadow focus:shadow-inputBlueGlowStrong"
  placeholder="Enter text"
/>

<!-- Dropdown menu -->
<div class="rounded-md bg-white py-2 shadow-liveSearchTrays">
  <a href="#" class="block px-4 py-2 hover:bg-gray-50">Menu Item</a>
</div>

<!-- Modal dialog -->
<div
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
>
  <div
    class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-mainDesktopWindow"
  >
    <h2 class="typography-titleH4 mb-4">Modal Title</h2>
    <p class="typography-paragraphMedium text-secondary">Modal content</p>
  </div>
</div>

<!-- Tooltip -->
<div
  class="absolute rounded bg-gray-900 px-2 py-1 text-sm text-white shadow-tooltip"
>
  Tooltip text
</div>

<!-- Side navigation -->
<nav class="h-full w-64 bg-white shadow-sideTray">
  <div class="p-4">Navigation content</div>
</nav>

<!-- Toggle switch -->
<button class="relative h-6 w-11 rounded-full bg-gray-200 shadow-toggleSwitch">
  <span
    class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform"
  ></span>
</button>
```

### CSS Implementation

```css
/* Custom shadow utilities for specific use cases */
.shadow-elevated-card {
  box-shadow: var(--shadow-card-shadow-pop-strong);
}

.shadow-floating-panel {
  box-shadow: var(--shadow-main-desktop-window);
}

.shadow-search-overlay {
  box-shadow: var(--shadow-live-search-trays);
}

.shadow-form-focus {
  box-shadow: var(--shadow-input-blue-glow-strong);
}

/* Combining shadows for complex effects */
.complex-shadow {
  box-shadow:
    var(--shadow-card-shadow-pop),
    0 0 0 1px rgba(var(--color-pg-blue-500), 0.1);
}

/* Animation-ready shadows */
.animated-shadow {
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-shadow:hover {
  box-shadow: var(--shadow-card-shadow-pop-strong);
}
```

## Best Practices

### Shadow Hierarchy Guidelines

1. **Subtle (sm)**: Basic elevation, borders, quiet elements
2. **Medium (md)**: Cards, buttons, moderate elevation
3. **Strong (cardShadowPop)**: Interactive cards, emphasized content
4. **Maximum (mainDesktopWindow)**: Modals, overlays, maximum elevation

### Performance Considerations

- Use CSS variables for consistent shadow values
- Prefer simpler shadows over complex multi-layer effects when possible
- Use `transform: translateZ(0)` for GPU acceleration when needed
- Avoid excessive shadow transitions on low-power devices

### Accessibility Guidelines

- Ensure shadows don't interfere with content readability
- Maintain sufficient contrast in both light and dark modes
- Don't rely solely on shadows to convey important information
- Test shadow visibility across different display types and zoom levels

### Design Principles

- Shadows should enhance, not dominate the interface
- Use consistent shadow progression for predictable hierarchy
- Adapt shadow intensity based on the surrounding context
- Consider the light source metaphor (shadows fall down and right)
- Use semantic shadow names that describe their purpose

## Shadow Selection Guide

### When to Use Each Shadow

| Shadow Type                    | Use Case                         | Examples                        |
| ------------------------------ | -------------------------------- | ------------------------------- |
| `shadow-sm`                    | Subtle elevation, quiet elements | Basic cards, subtle borders     |
| `shadow-md`                    | Standard elevation               | Default buttons, standard cards |
| `shadow-inputFieldPop`         | Form elements                    | Input fields, textareas         |
| `shadow-cardShadowPop`         | Interactive content              | Clickable cards, hover states   |
| `shadow-liveSearchTrays`       | Search and dropdown              | Autocomplete, select dropdowns  |
| `shadow-sideTray`              | Navigation panels                | Sidebars, drawers               |
| `shadow-mainDesktopWindow`     | Modal content                    | Dialogs, overlays               |
| `shadow-tooltip`               | Floating help                    | Tooltips, popovers              |
| `shadow-buttonsImportantFocus` | Focus states                     | Important button focus          |
| `shadow-inputBlueGlowStrong`   | Input focus                      | Form field focus states         |

This comprehensive shadow system provides complete coverage of the Perigon design system, ensuring consistent depth and elevation across all interface elements while maintaining accessibility and performance.
