# Perigon Spacing & Layout System

A comprehensive spacing system designed specifically for the Perigon application based on an 8px grid with 4px increments for fine-tuned control. This system provides consistent rhythm, alignment, and visual hierarchy across all interface elements through predictable spacing patterns and specialized container layouts.

## Spacing Foundation

### Base Grid System

- **Primary Grid**: 8px base unit for major spacing decisions (space-2)
- **Secondary Grid**: 4px increments for fine-tuned adjustments
- **Scaling Factor**: Consistent mathematical progression using rem units
- **Responsive Scaling**: Maintains proportions across all screen sizes

### Spacing Philosophy

- **Consistency**: Predictable spacing relationships using design tokens
- **Hierarchy**: Clear visual separation between elements
- **Rhythm**: Harmonious vertical and horizontal flow
- **Flexibility**: Granular control with standardized increments

## Spacing Scale

### Standard Spacing Tokens

Based on a 4px base unit with both logical increments and common use cases:

| Token       | Value    | Pixels | Rem   | Usage                              |
| ----------- | -------- | ------ | ----- | ---------------------------------- |
| `space-0`   | 0        | 0px    | 0     | No spacing, flush layouts          |
| `space-0.5` | 0.125rem | 2px    | 0.125 | Hairline spacing, fine adjustments |
| `space-1`   | 0.25rem  | 4px    | 0.25  | Minimal spacing, tight layouts     |
| `space-1.5` | 0.375rem | 6px    | 0.375 | Extra small spacing                |
| `space-2`   | 0.5rem   | 8px    | 0.5   | Small spacing, base grid unit      |
| `space-2.5` | 0.625rem | 10px   | 0.625 | Small-medium spacing               |
| `space-3`   | 0.75rem  | 12px   | 0.75  | Medium spacing                     |
| `space-3.5` | 0.875rem | 14px   | 0.875 | Medium-large spacing               |
| `space-4`   | 1rem     | 16px   | 1     | Large spacing, text line height    |
| `space-5`   | 1.25rem  | 20px   | 1.25  | Extra large spacing                |
| `space-6`   | 1.5rem   | 24px   | 1.5   | Double large spacing               |
| `space-7`   | 1.75rem  | 28px   | 1.75  | Section spacing                    |
| `space-8`   | 2rem     | 32px   | 2     | Large section spacing              |
| `space-9`   | 2.25rem  | 36px   | 2.25  | Major spacing                      |
| `space-10`  | 2.5rem   | 40px   | 2.5   | Component spacing                  |
| `space-11`  | 2.75rem  | 44px   | 2.75  | Large component spacing            |
| `space-12`  | 3rem     | 48px   | 3     | Section separation                 |
| `space-14`  | 3.5rem   | 56px   | 3.5   | Large section separation           |
| `space-16`  | 4rem     | 64px   | 4     | Page section spacing               |
| `space-20`  | 5rem     | 80px   | 5     | Major page sections                |
| `space-24`  | 6rem     | 96px   | 6     | Hero sections                      |
| `space-28`  | 7rem     | 112px  | 7     | Large hero sections                |
| `space-32`  | 8rem     | 128px  | 8     | Maximum section spacing            |

### CSS Custom Properties

All spacing values are available as CSS custom properties:

```css
:root {
  /* Micro spacing */
  --space-0: 0;
  --space-0-5: 0.125rem; /* 2px */
  --space-1: 0.25rem; /* 4px */
  --space-1-5: 0.375rem; /* 6px */

  /* Base spacing */
  --space-2: 0.5rem; /* 8px - base grid */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px - text baseline */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */

  /* Component spacing */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */

  /* Section spacing */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */
  --space-32: 8rem; /* 128px */
}
```

## Responsive Breakpoints

### Perigon Breakpoint System

Consistent breakpoint system optimized for the Perigon application:

| Breakpoint | Min Width | Max Width | Target Device               | Usage                             |
| ---------- | --------- | --------- | --------------------------- | --------------------------------- |
| `xs`       | 0px       | 639px     | Mobile phones               | Single column, stacked layouts    |
| `sm`       | 640px     | 767px     | Large mobile, small tablets | Two-column cards, larger text     |
| `md`       | 768px     | 1023px    | Tablets, small laptops      | Multi-column layouts, sidebars    |
| `lg`       | 1024px    | 1279px    | Laptops, desktops           | Full layouts, navigation headers  |
| `xl`       | 1280px    | 1439px    | Large desktops              | Wide layouts, large content areas |
| `2xl`      | 1440px    | ∞         | Extra large screens         | Maximum width containers          |

```javascript
// tailwind.config.ts
screens: {
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Small Desktop
  xl: '1280px',  // Desktop
  '2xl': '1440px', // Large Desktop
}
```

## Container System

### Standard Container

The main container system with responsive behavior:

```javascript
// tailwind.config.ts
container: {
  center: true,
  padding: '2rem',
  screens: {
    '2xl': '1400px',
  },
}
```

### Specialized Sheet Containers

Perigon includes specialized container sizes for modal dialogs, forms, and panels:

| Class                  | Width                         | Usage                                |
| ---------------------- | ----------------------------- | ------------------------------------ |
| `max-w-sheetSm`        | 384px (24rem)                 | Small modal dialogs, mobile sheets   |
| `max-w-sheetMd`        | 478px (29.875rem)             | Medium forms, detail panels          |
| `max-w-sheetLg`        | 520px (32.5rem)               | Large forms, complex dialogs         |
| `max-w-sheetSmBounded` | min(calc(100% - 48px), 344px) | Responsive small sheets with margin  |
| `max-w-sheetMdBounded` | min(calc(100% - 48px), 478px) | Responsive medium sheets with margin |
| `max-w-sheetLgBounded` | min(calc(100% - 48px), 520px) | Responsive large sheets with margin  |

```javascript
// tailwind.config.ts
maxWidth: {
  sheetSm: '24rem',
  sheetMd: '29.875rem',
  sheetLg: '32.5rem',
  sheetSmBounded: 'min(calc(100% - 48px), 21.5rem)',
  sheetMdBounded: 'min(calc(100% - 48px), 29.875rem)',
  sheetLgBounded: 'min(calc(100% - 48px), 32.5rem)',
},
```

### Usage Examples

```html
<!-- Small modal dialog -->
<div
  class="w-full max-w-sheetMdBounded rounded-lg bg-white shadow-mainDesktopWindow"
>
  <div class="border-b border-pgStroke-200 p-6">
    <h2 class="typography-titleH3">Dialog Title</h2>
  </div>

  <div class="space-y-4 p-6">
    <p class="typography-paragraphMedium">
      Dialog content with proper spacing.
    </p>
    <div class="space-y-3">
      <!-- Form fields with consistent spacing -->
    </div>
  </div>

  <div class="flex justify-end space-x-3 border-t border-pgStroke-200 p-6">
    <button class="typography-labelMedium px-4 py-2">Cancel</button>
    <button
      class="typography-labelMedium rounded bg-pgBlue-500 px-4 py-2 text-white"
    >
      Confirm
    </button>
  </div>
</div>
```

## Layout Patterns

### Responsive Container Patterns

```css
/* Base container with responsive padding */
.container-responsive {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4); /* 16px mobile */
}

@media (min-width: 640px) {
  .container-responsive {
    padding: 0 var(--space-6); /* 24px tablet */
  }
}

@media (min-width: 1024px) {
  .container-responsive {
    max-width: 1024px;
    padding: 0 var(--space-8); /* 32px desktop */
  }
}

@media (min-width: 1280px) {
  .container-responsive {
    max-width: 1280px;
  }
}
```

### Page Layout Structure

```css
/* Page layout with proper spacing */
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  flex-shrink: 0;
  padding: var(--space-4) 0; /* 16px vertical */
}

.page-main {
  flex: 1;
  padding: var(--space-8) 0; /* 32px vertical */
}

.page-footer {
  flex-shrink: 0;
  border-top: 1px solid rgb(var(--color-stroke-200));
  padding: var(--space-8) 0; /* 32px vertical */
  background-color: rgb(var(--color-bg-50));
}
```

## Spacing Usage Patterns

### Vertical Spacing (Margin Bottom)

```css
/* Component spacing */
.mb-2 {
  margin-bottom: var(--space-2);
} /* 8px */
.mb-3 {
  margin-bottom: var(--space-3);
} /* 12px */
.mb-4 {
  margin-bottom: var(--space-4);
} /* 16px */
.mb-6 {
  margin-bottom: var(--space-6);
} /* 24px */
.mb-8 {
  margin-bottom: var(--space-8);
} /* 32px */

/* Section spacing */
.mb-12 {
  margin-bottom: var(--space-12);
} /* 48px */
.mb-16 {
  margin-bottom: var(--space-16);
} /* 64px */
.mb-20 {
  margin-bottom: var(--space-20);
} /* 80px */
```

### Horizontal Spacing (Padding)

```css
/* Content padding */
.px-4 {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
} /* 16px */

.px-6 {
  padding-left: var(--space-6);
  padding-right: var(--space-6);
} /* 24px */

.px-8 {
  padding-left: var(--space-8);
  padding-right: var(--space-8);
} /* 32px */

/* Container padding */
.py-6 {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
} /* 24px */

.py-8 {
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
} /* 32px */

.py-12 {
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
} /* 48px */
```

### Gap Spacing (Flexbox/Grid)

```css
/* Element gaps */
.gap-1 {
  gap: var(--space-1);
} /* 4px */
.gap-2 {
  gap: var(--space-2);
} /* 8px */
.gap-3 {
  gap: var(--space-3);
} /* 12px */
.gap-4 {
  gap: var(--space-4);
} /* 16px */
.gap-6 {
  gap: var(--space-6);
} /* 24px */
.gap-8 {
  gap: var(--space-8);
} /* 32px */
```

## Responsive Spacing

### Mobile-First Approach

```css
/* Base mobile spacing */
.responsive-padding {
  padding: var(--space-4); /* 16px on mobile */
}

/* Tablet adjustments */
@media (min-width: 768px) {
  .responsive-padding {
    padding: var(--space-6); /* 24px on tablet+ */
  }
}

/* Desktop adjustments */
@media (min-width: 1024px) {
  .responsive-padding {
    padding: var(--space-8); /* 32px on desktop+ */
  }
}
```

### Responsive Spacing Classes

Using Tailwind's responsive prefixes:

```html
<!-- Responsive padding example -->
<div class="p-4 md:p-6 lg:p-8">
  <!-- 16px mobile, 24px tablet, 32px desktop -->
</div>

<!-- Responsive margin example -->
<div class="mb-6 md:mb-8 lg:mb-12">
  <!-- 24px mobile, 32px tablet, 48px desktop -->
</div>

<!-- Responsive gap example -->
<div class="flex gap-4 md:gap-6 lg:gap-8">
  <!-- 16px mobile, 24px tablet, 32px desktop -->
</div>
```

## Component Spacing Guidelines

### Card Components

```css
.card {
  padding: var(--space-6); /* 24px internal padding */
  margin-bottom: var(--space-4); /* 16px between cards */
}

.card-compact {
  padding: var(--space-4); /* 16px internal padding */
  margin-bottom: var(--space-3); /* 12px between cards */
}

.card-spacious {
  padding: var(--space-8); /* 32px internal padding */
  margin-bottom: var(--space-6); /* 24px between cards */
}
```

### Form Elements

```css
.form-group {
  margin-bottom: var(--space-4); /* 16px between form groups */
}

.form-label {
  margin-bottom: var(--space-1); /* 4px below labels */
}

.form-input {
  padding: var(--space-3) var(--space-4); /* 12px top/bottom, 16px left/right */
}

.form-section {
  margin-bottom: var(--space-8); /* 32px between form sections */
}
```

### Navigation Elements

```css
.nav-header {
  padding: var(--space-4) var(--space-6); /* 16px top/bottom, 24px left/right */
}

.nav-item {
  padding: var(--space-2) var(--space-4); /* 8px top/bottom, 16px left/right */
  margin-bottom: var(--space-1); /* 4px between nav items */
}

.nav-section {
  margin-bottom: var(--space-6); /* 24px between nav sections */
}
```

### Content Layouts

```css
.content-header {
  margin-bottom: var(--space-8); /* 32px below headers */
}

.content-section {
  margin-bottom: var(--space-12); /* 48px between content sections */
}

.content-footer {
  margin-top: var(--space-16); /* 64px above footers */
}
```

## Grid Systems

### CSS Grid Layout

```css
.grid-container {
  display: grid;
  gap: var(--space-6); /* 24px gap between grid items */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: var(--space-8); /* 32px container padding */
}

.grid-tight {
  gap: var(--space-3); /* 12px gap for tight layouts */
}

.grid-loose {
  gap: var(--space-8); /* 32px gap for spacious layouts */
}
```

### Flexbox Layout

```css
.flex-container {
  display: flex;
  gap: var(--space-4); /* 16px gap between flex items */
  align-items: center;
}

.flex-column {
  flex-direction: column;
  gap: var(--space-3); /* 12px vertical gap */
}

.flex-wrap {
  flex-wrap: wrap;
  gap: var(--space-4) var(--space-6); /* 16px row gap, 24px column gap */
}
```

## Best Practices

### Spacing Hierarchy

1. **Micro spacing** (0-6px): Fine adjustments, borders, icons
2. **Component spacing** (8-24px): Element relationships, padding
3. **Section spacing** (32-64px): Major content divisions
4. **Page spacing** (80px+): Hero sections, major layouts

### Responsive Guidelines

- **Mobile**: Use smaller spacing values (space-2 to space-6)
- **Tablet**: Increase to medium values (space-4 to space-8)
- **Desktop**: Use larger values (space-6 to space-12)
- **Large screens**: Maximum spacing (space-12 to space-20)

### Consistency Rules

- Use the spacing scale consistently across all components
- Maintain proportional relationships at different screen sizes
- Prefer standard spacing tokens over custom values
- Test spacing at multiple screen sizes and zoom levels

### Accessibility Considerations

- Maintain minimum 44px touch targets on mobile
- Ensure adequate spacing for users with motor difficulties
- Provide sufficient contrast and separation for visual clarity
- Support zoom levels up to 200% without horizontal scrolling

## Implementation Examples

### Modal Dialog Layout

```html
<div class="fixed inset-0 flex items-center justify-center p-4">
  <div
    class="w-full max-w-sheetMdBounded rounded-lg bg-white shadow-mainDesktopWindow"
  >
    <div class="border-b border-pgStroke-200 p-6">
      <h2 class="typography-titleH3">Dialog Title</h2>
    </div>

    <div class="space-y-4 p-6">
      <p class="typography-paragraphMedium">
        Dialog content with proper spacing.
      </p>
      <div class="space-y-3">
        <!-- Form fields with consistent spacing -->
      </div>
    </div>

    <div class="flex justify-end space-x-3 border-t border-pgStroke-200 p-6">
      <button class="typography-labelMedium px-4 py-2">Cancel</button>
      <button
        class="typography-labelMedium rounded bg-pgBlue-500 px-4 py-2 text-white"
      >
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Dashboard Layout

```html
<div class="min-h-screen bg-pgBackground-0">
  <header class="border-b border-pgStroke-200 py-4">
    <div class="container mx-auto px-6">
      <h1 class="typography-titleH2">Dashboard</h1>
    </div>
  </header>

  <main class="py-8">
    <div class="container mx-auto space-y-8 px-6">
      <section class="space-y-6">
        <h2 class="typography-titleH3">Overview</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Cards with consistent spacing -->
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="typography-titleH3">Recent Activity</h2>
        <div class="space-y-4">
          <!-- Activity items -->
        </div>
      </section>
    </div>
  </main>
</div>
```

### Form Layout

```html
<form class="mx-auto max-w-sheetLg space-y-6 p-8">
  <div class="space-y-2">
    <h2 class="typography-titleH3">Contact Information</h2>
    <p class="typography-paragraphMedium text-pgText-600">
      Please fill in your details below.
    </p>
  </div>

  <div class="space-y-4">
    <div class="space-y-2">
      <label class="typography-labelSmall text-pgText-800">Full Name</label>
      <input
        type="text"
        class="w-full rounded-lg border border-pgStroke-200 px-4 py-3"
        placeholder="Enter your full name"
      />
    </div>

    <div class="space-y-2">
      <label class="typography-labelSmall text-pgText-800">Email Address</label>
      <input
        type="email"
        class="w-full rounded-lg border border-pgStroke-200 px-4 py-3"
        placeholder="Enter your email"
      />
    </div>
  </div>

  <div class="border-t border-pgStroke-200 pt-4">
    <button
      type="submit"
      class="typography-labelMedium w-full rounded-lg bg-pgBlue-500 py-3 text-white"
    >
      Submit Form
    </button>
  </div>
</form>
```

### Component Spacing

```css
/* Perigon-specific component spacing patterns */
.perigon-card {
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  border-radius: 12px;
  border: 1px solid rgb(var(--color-stroke-200));
}

.perigon-card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid rgb(var(--color-stroke-100));
}

.perigon-card-content {
  margin-bottom: var(--space-6);
}

.perigon-card-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid rgb(var(--color-stroke-100));
}

/* Navigation spacing */
.perigon-nav {
  padding: var(--space-4) var(--space-6);
  gap: var(--space-6);
}

.perigon-nav-item {
  padding: var(--space-2) var(--space-3);
  margin: var(--space-1);
  border-radius: 8px;
}

/* Form spacing */
.perigon-form-group {
  margin-bottom: var(--space-4);
}

.perigon-form-group:last-child {
  margin-bottom: 0;
}

.perigon-form-label {
  margin-bottom: var(--space-2);
}

.perigon-form-input {
  padding: var(--space-3) var(--space-4);
}

.perigon-form-section {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid rgb(var(--color-stroke-200));
}

.perigon-form-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}
```

This comprehensive spacing system provides complete coverage of the Perigon design system, ensuring consistent rhythm, alignment, and visual hierarchy across all interface elements while supporting responsive design and specialized container layouts.
