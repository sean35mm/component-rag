# Perigon Typography System

A comprehensive typography scale designed specifically for the Perigon application using the PX Grotesk font family. The system provides carefully crafted sizes, weights, and spacing optimized for digital interfaces with clear hierarchy and excellent readability.

## Font Foundation

### Primary Typeface

**PX Grotesk** - A modern sans-serif typeface optimized for digital interfaces

- Clean geometric forms with subtle humanist characteristics
- Excellent readability at all sizes from 10px to 56px
- Multiple weights: Light (300), Regular (400), Medium (500), Bold (700)
- OpenType features including stylistic sets (ss01 enabled by default)

### Font Loading

```css
@font-face {
  font-family: 'PX Grotesk';
  src: url('/fonts/px-grotesk-light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PX Grotesk';
  src: url('/fonts/px-grotesk-regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PX Grotesk';
  src: url('/fonts/px-grotesk-medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'PX Grotesk';
  src: url('/fonts/px-grotesk-bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Global Typography Settings

```css
:root {
  font-feature-settings: 'ss01' on; /* Enable stylistic set 01 */
}
```

## Typography Scale

### Display Titles (typography-title\*)

Large, prominent headings for major page sections and content hierarchy:

| Class                   | Size            | Weight       | Line Height    | Letter Spacing | Usage                      |
| ----------------------- | --------------- | ------------ | -------------- | -------------- | -------------------------- |
| `typography-titleH1`    | 56px (3.5rem)   | 500 (Medium) | 64px (4rem)    | -0.005em       | Page titles, hero headings |
| `typography-titleH2`    | 48px (3rem)     | 500 (Medium) | 56px (3.5rem)  | -0.005em       | Section titles             |
| `typography-titleH3`    | 48px (3rem)     | 500 (Medium) | 56px (3.5rem)  | -0.005em       | Subsection titles          |
| `typography-titleH4`    | 32px (2rem)     | 500 (Medium) | 40px (2.5rem)  | -0.0025em      | Card titles, modal headers |
| `typography-titleH5`    | 24px (1.5rem)   | 500 (Medium) | 32px (2rem)    | 0em            | Component titles           |
| `typography-titleH6`    | 20px (1.25rem)  | 500 (Medium) | 28px (1.75rem) | 0em            | Small section titles       |
| `typography-titleLarge` | 18px (1.125rem) | 500 (Medium) | 24px (1.5rem)  | 0em            | Large labels, subheadings  |
| `typography-titleH16`   | 16px (1rem)     | 700 (Bold)   | 24px (1.5rem)  | 0em            | Bold body text             |

```css
.typography-titleH1 {
  font-size: 3.5rem; /* 56px */
  font-weight: 500;
  line-height: 4rem; /* 64px */
  letter-spacing: -0.005em;
}

.typography-titleH2 {
  font-size: 3rem; /* 48px */
  font-weight: 500;
  line-height: 3.5rem; /* 56px */
  letter-spacing: -0.005em;
}

.typography-titleH4 {
  font-size: 2rem; /* 32px */
  font-weight: 500;
  line-height: 2.5rem; /* 40px */
  letter-spacing: -0.0025em;
}

.typography-titleH5 {
  font-size: 1.5rem; /* 24px */
  font-weight: 500;
}

.typography-titleH6 {
  font-size: 1.25rem; /* 20px */
  font-weight: 500;
}

.typography-titleLarge {
  font-size: 1.125rem; /* 18px */
  font-weight: 500;
}

.typography-titleH16 {
  font-size: 1rem; /* 16px */
  font-weight: 700;
}
```

### Interface Labels (typography-label\*)

Medium-weight text for labels, buttons, and interface elements:

| Class                     | Size             | Weight       | Letter Spacing | Usage                           |
| ------------------------- | ---------------- | ------------ | -------------- | ------------------------------- |
| `typography-labelXLarge`  | 24px (1.5rem)    | 500 (Medium) | -0.0025em      | Large buttons, prominent labels |
| `typography-labelLarge`   | 18px (1.125rem)  | 500 (Medium) | -0.0025em      | Button text, large labels       |
| `typography-labelMedium`  | 16px (1rem)      | 500 (Medium) | 0.01em         | Form labels, navigation         |
| `typography-labelSmall`   | 14px (0.875rem)  | 500 (Medium) | 0.03em         | Small buttons, tags             |
| `typography-labelXSmall`  | 12px (0.75rem)   | 500 (Medium) | 0.01em         | Captions, metadata              |
| `typography-label2XSmall` | 11px (0.6875rem) | 500 (Medium) | 0.01em         | Tiny labels, badges             |
| `typography-label3XSmall` | 10px (0.625rem)  | 500 (Medium) | 0.01em         | Micro text, status indicators   |

```css
.typography-labelXLarge {
  font-size: 1.5rem; /* 24px */
  font-weight: 500;
  letter-spacing: -0.0025em;
}

.typography-labelLarge {
  font-size: 1.125rem; /* 18px */
  font-weight: 500;
  line-height: 1.5rem; /* 24px */
  letter-spacing: -0.0025em;
}

.typography-labelMedium {
  font-size: 1rem; /* 16px */
  font-weight: 500;
  letter-spacing: 0.01em;
}

.typography-labelSmall {
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  letter-spacing: 0.03em;
}

.typography-labelXSmall {
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  letter-spacing: 0.01em;
}

.typography-label2XSmall {
  font-size: 0.6875rem; /* 11px */
  font-weight: 500;
  letter-spacing: 0.01em;
}

.typography-label3XSmall {
  font-size: 0.625rem; /* 10px */
  font-weight: 500;
  letter-spacing: 0.01em;
}
```

### Body Text (typography-paragraph\*)

Regular-weight text for content, descriptions, and body copy:

| Class                         | Size            | Weight        | Line Height     | Letter Spacing | Usage                          |
| ----------------------------- | --------------- | ------------- | --------------- | -------------- | ------------------------------ |
| `typography-paragraphXLarge`  | 24px (1.5rem)   | 400 (Regular) | 32px (2rem)     | -0.0025em      | Large body text, introductions |
| `typography-paragraphLarge`   | 18px (1.125rem) | 400 (Regular) | 24px (1.5rem)   | -0.0025em      | Article body, descriptions     |
| `typography-paragraphMedium`  | 16px (1rem)     | 400 (Regular) | 24px (1.5rem)   | 0.01em         | Default body text              |
| `typography-paragraphSmall`   | 14px (0.875rem) | 400 (Regular) | 20px (1.25rem)  | 0.01em         | Small descriptions, captions   |
| `typography-paragraphXSmall`  | 12px (0.75rem)  | 400 (Regular) | 16px (1rem)     | 0.01em         | Fine print, footnotes          |
| `typography-paragraph3XSmall` | 10px (0.625rem) | 400 (Regular) | 14px (0.875rem) | 0.01em         | Micro text, legal text         |

```css
.typography-paragraphXLarge {
  font-size: 1.5rem; /* 24px */
  letter-spacing: -0.0025em;
}

.typography-paragraphLarge {
  font-size: 1.125rem; /* 18px */
  line-height: 1.5rem; /* 24px */
  letter-spacing: -0.0025em;
}

.typography-paragraphMedium {
  font-size: 1rem; /* 16px */
  letter-spacing: 0.01em;
}

.typography-paragraphSmall {
  font-size: 0.875rem; /* 14px */
  letter-spacing: 0.01em;
}

.typography-paragraphXSmall {
  font-size: 0.75rem; /* 12px */
  letter-spacing: 0.01em;
}

.typography-paragraph3XSmall {
  font-size: 0.625rem; /* 10px */
  letter-spacing: 0.01em;
}
```

### Subheadings (typography-subheading\*)

Uppercase, letter-spaced text for section labels and categorization:

| Class                          | Size             | Weight       | Case      | Letter Spacing | Usage            |
| ------------------------------ | ---------------- | ------------ | --------- | -------------- | ---------------- |
| `typography-subheadingMedium`  | 16px (1rem)      | 500 (Medium) | Uppercase | 0.06em         | Section dividers |
| `typography-subheadingSmall`   | 14px (0.875rem)  | 500 (Medium) | Uppercase | 0.06em         | Category labels  |
| `typography-subheadingXSmall`  | 12px (0.75rem)   | 500 (Medium) | Uppercase | 0.1em (wider)  | Form sections    |
| `typography-subheading2XSmall` | 11px (0.6875rem) | 500 (Medium) | Uppercase | 0.1em (wider)  | Small categories |
| `typography-subheading3XSmall` | 10px (0.625rem)  | 500 (Medium) | Uppercase | 0.1em (wider)  | Micro categories |
| `typography-subheading4XSmall` | 9px (0.5625rem)  | 500 (Medium) | Uppercase | 0.1em (wider)  | Tiny labels      |

```css
.typography-subheadingMedium {
  font-size: 1rem; /* 16px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.typography-subheadingSmall {
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.typography-subheadingXSmall {
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em; /* wider tracking */
}

.typography-subheading2XSmall {
  font-size: 0.6875rem; /* 11px */
  font-weight: 500;
  text-transform: uppercase;
  line-height: 0.75rem; /* 12px */
  letter-spacing: 0.1em; /* wider tracking */
}

.typography-subheading3XSmall {
  font-size: 0.625rem; /* 10px */
  font-weight: 500;
  text-transform: uppercase;
  line-height: 0.75rem; /* 12px */
  letter-spacing: 0.1em; /* wider tracking */
}

.typography-subheading4XSmall {
  font-size: 0.5625rem; /* 9px */
  font-weight: 500;
  text-transform: uppercase;
  line-height: 0.75rem; /* 12px */
  letter-spacing: 0.1em; /* wider tracking */
}
```

### Headlines (typography-headlines\*)

Bold text for important content and feature emphasis:

| Class                                   | Size             | Weight         | Line Height    | Letter Spacing | Usage                  |
| --------------------------------------- | ---------------- | -------------- | -------------- | -------------- | ---------------------- |
| `typography-headlines36`                | 36px (2.25rem)   | 700 (Bold)     | 44px (2.75rem) | -0.005em       | Feature headlines      |
| `typography-headlines32`                | 32px (2rem)      | 700 (Bold)     | 40px (2.5rem)  | -0.005em       | Large headlines        |
| `typography-headlines24`                | 24px (1.5rem)    | 700 (Bold)     | 32px (2rem)    | 0.015em        | Article headlines      |
| `typography-headlines20`                | 20px (1.25rem)   | 700 (Bold)     | 28px (1.75rem) | -0.0025em      | Card headlines         |
| `typography-headlines18`                | 18px (1.125rem)  | 700 (Bold)     | 24px (1.5rem)  | 0.01em         | Component headlines    |
| `typography-headlines18-tracking-tight` | 18px (1.125rem)  | 600 (Semibold) | 24px (1.5rem)  | -0.0025em      | Tight headline variant |
| `typography-headlines16`                | 16px (1rem)      | 700 (Bold)     | 20px (1.25rem) | 0.01em         | Small headlines        |
| `typography-headlines15`                | 15px (0.9375rem) | 550 (Medium+)  | 24px (1.5rem)  | 0.01em         | Medium headlines       |
| `typography-headlines14`                | 14px (0.875rem)  | 550 (Medium+)  | 20px (1.25rem) | 0.01em         | Small emphasis         |

```css
.typography-headlines36 {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  line-height: 2.75rem; /* 44px */
  letter-spacing: -0.005em;
}

.typography-headlines32 {
  font-size: 2rem; /* 32px */
  font-weight: 700;
  line-height: 2.5rem; /* 40px */
  letter-spacing: -0.005em;
}

.typography-headlines24 {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 2rem; /* 32px */
  letter-spacing: 0.015em;
}

.typography-headlines20 {
  font-size: 1.25rem; /* 20px */
  font-weight: 700;
  line-height: 1.75rem; /* 28px */
  letter-spacing: -0.0025em;
}

.typography-headlines18 {
  font-size: 1.125rem; /* 18px */
  font-weight: 700;
  line-height: 1.5rem; /* 24px */
  letter-spacing: 0.01em;
}

.typography-headlines18-tracking-tight {
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  line-height: 1.5rem; /* 24px */
  letter-spacing: -0.0025em;
}

.typography-headlines16 {
  font-size: 1rem; /* 16px */
  font-weight: 700;
  letter-spacing: 0.01em;
}

.typography-headlines15 {
  font-size: 0.9375rem; /* 15px */
  font-weight: 550;
  line-height: 1.5rem; /* 24px */
  letter-spacing: 0.01em;
}

.typography-headlines14 {
  font-size: 0.875rem; /* 14px */
  font-weight: 550;
  letter-spacing: 0.01em;
}
```

## Typography Hierarchy Guidelines

### Semantic HTML Mapping

```html
<!-- Page structure -->
<h1 class="typography-titleH1">Page Title</h1>
<h2 class="typography-titleH2">Section Title</h2>
<h3 class="typography-titleH3">Subsection Title</h3>
<h4 class="typography-titleH4">Card Title</h4>
<h5 class="typography-titleH5">Component Title</h5>
<h6 class="typography-titleH6">Small Section Title</h6>

<!-- Content hierarchy -->
<p class="typography-paragraphLarge">Introduction text</p>
<p class="typography-paragraphMedium">Body content</p>
<p class="typography-paragraphSmall">Supporting details</p>

<!-- Interface elements -->
<button class="typography-labelMedium">Button Text</button>
<label class="typography-labelSmall">Form Label</label>
<span class="typography-labelXSmall">Caption</span>

<!-- Emphasis and features -->
<h4 class="typography-headlines20">Featured Content</h4>
<h5 class="typography-headlines16">Important Notice</h5>

<!-- Section dividers -->
<h6 class="typography-subheadingSmall">Category</h6>
<span class="typography-subheadingXSmall">Form Section</span>
```

### Content Hierarchy Rules

1. **Page Title**: Use `typography-titleH1` for main page headings
2. **Section Titles**: Use `typography-titleH2` for major sections
3. **Subsections**: Use `typography-titleH3` through `typography-titleH6` for nested content
4. **Body Text**: Default to `typography-paragraphMedium`, scale up/down as needed
5. **Interface Text**: Use `typography-label*` classes for interactive elements
6. **Emphasis**: Use `typography-headlines*` classes for featured content
7. **Categories**: Use `typography-subheading*` classes for section labels

## Typography Color Integration

### Text Color Classes

When using typography classes, combine with Perigon color system:

```css
/* Primary text colors */
.text-primary {
  color: rgb(var(--color-pg-text-950));
} /* High contrast */
.text-secondary {
  color: rgb(var(--color-pg-text-600));
} /* Medium contrast */
.text-tertiary {
  color: rgb(var(--color-pg-text-400));
} /* Low contrast */
.text-disabled {
  color: rgb(var(--color-pg-text-300));
} /* Disabled state */

/* Semantic text colors */
.text-success {
  color: rgb(var(--color-pg-green-600));
}
.text-error {
  color: rgb(var(--color-pg-red-600));
}
.text-warning {
  color: rgb(var(--color-pg-orange-600));
}
.text-info {
  color: rgb(var(--color-pg-sapphire-600));
}

/* Interactive text colors */
.text-link {
  color: rgb(var(--color-pg-blue-600));
}
.text-link:hover {
  color: rgb(var(--color-pg-blue-700));
}
```

## Responsive Typography

### Mobile-First Scaling

```css
/* Base mobile styles */
.typography-titleH1 {
  font-size: 2rem; /* 32px on mobile */
}
.typography-titleH2 {
  font-size: 1.5rem; /* 24px on mobile */
}
.typography-paragraphLarge {
  font-size: 1rem; /* 16px on mobile */
}

/* Tablet and up */
@media (min-width: 768px) {
  .typography-titleH1 {
    font-size: 2.5rem; /* 40px on tablet */
  }
  .typography-titleH2 {
    font-size: 2rem; /* 32px on tablet */
  }
  .typography-paragraphLarge {
    font-size: 1.125rem; /* 18px on tablet */
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .typography-titleH1 {
    font-size: 3.5rem; /* 56px on desktop */
  }
  .typography-titleH2 {
    font-size: 3rem; /* 48px on desktop */
  }
  .typography-paragraphLarge {
    font-size: 1.125rem; /* 18px on desktop */
  }
}
```

### Fluid Typography (Optional)

```css
.typography-titleH1 {
  font-size: clamp(2rem, 4vw, 3.5rem); /* Scales between 32px-56px */
}

.typography-titleH2 {
  font-size: clamp(1.5rem, 3vw, 3rem); /* Scales between 24px-48px */
}
```

## Implementation Examples

### Component Typography

```html
<!-- Card component -->
<div class="card">
  <h3 class="typography-titleH4 text-primary">Card Title</h3>
  <p class="typography-paragraphMedium text-secondary">
    Card description content that provides context and information.
  </p>
  <div class="mt-4">
    <span class="typography-subheadingXSmall text-tertiary">Category</span>
    <button class="typography-labelMedium">Action</button>
  </div>
</div>

<!-- Form component -->
<form class="space-y-4">
  <div>
    <label class="typography-labelSmall text-primary">Email Address</label>
    <input
      type="email"
      class="typography-paragraphMedium"
      placeholder="Enter your email"
    />
    <span class="typography-paragraphXSmall text-tertiary">
      We'll never share your email
    </span>
  </div>

  <button class="typography-labelMedium">Submit</button>
</form>

<!-- Article content -->
<article class="prose">
  <h1 class="typography-titleH1 text-primary">Article Title</h1>
  <p class="typography-paragraphLarge text-secondary">
    Introduction paragraph with larger text for better reading experience.
  </p>

  <h2 class="typography-titleH2 text-primary">Section Heading</h2>
  <p class="typography-paragraphMedium text-primary">
    Regular body text that forms the main content of the article.
  </p>

  <h3 class="typography-headlines18 text-primary">Subsection Emphasis</h3>
  <p class="typography-paragraphSmall text-secondary">
    Supporting information in smaller text.
  </p>

  <div class="border-t pt-4">
    <span class="typography-subheadingSmall text-tertiary">Related Topics</span>
    <span class="typography-label2XSmall text-info">Technology</span>
  </div>
</article>
```

### Navigation Typography

```html
<nav>
  <div class="typography-headlines18 text-primary">Brand Name</div>
  <ul class="nav-menu">
    <li><a href="#" class="typography-labelMedium text-secondary">Home</a></li>
    <li><a href="#" class="typography-labelMedium text-secondary">About</a></li>
    <li>
      <a href="#" class="typography-labelMedium text-secondary">Contact</a>
    </li>
  </ul>
</nav>
```

### Dashboard Typography

```html
<div class="dashboard">
  <header>
    <h1 class="typography-titleH2 text-primary">Dashboard</h1>
    <p class="typography-paragraphLarge text-secondary">
      Welcome back! Here's your overview.
    </p>
  </header>

  <div class="stats-grid">
    <div class="stat-card">
      <span class="typography-subheadingXSmall text-tertiary">Total Users</span>
      <div class="typography-headlines32 text-primary">1,234</div>
      <span class="typography-paragraphSmall text-success"
        >+12% from last month</span
      >
    </div>

    <div class="stat-card">
      <span class="typography-subheadingXSmall text-tertiary">Revenue</span>
      <div class="typography-headlines32 text-primary">$12,345</div>
      <span class="typography-paragraphSmall text-success"
        >+8% from last month</span
      >
    </div>
  </div>
</div>
```

## Accessibility Considerations

### Contrast Requirements

- **Normal text (below 18px)**: 4.5:1 contrast ratio minimum
- **Large text (18px+)**: 3:1 contrast ratio minimum
- **Bold text (14px+ bold)**: 3:1 contrast ratio minimum

### Line Height Guidelines

- **Body text**: 1.4-1.6x the font size for optimal readability
- **Headings**: 1.1-1.3x the font size for visual impact
- **Interface text**: 1.2-1.4x the font size for clarity

### Letter Spacing Best Practices

- **Large text**: Slight negative spacing (-0.005em to -0.0025em) for tighter appearance
- **Small text**: Positive spacing (0.01em to 0.03em) for improved readability
- **ALL CAPS**: Increased spacing (0.06em to 0.1em) for better letter recognition

## Best Practices

### Typography Hierarchy

1. **Establish clear hierarchy**: Use size and weight to create visual order
2. **Limit font weights**: Stick to 3-4 weights maximum (400, 500, 550, 700)
3. **Consistent spacing**: Use the typography classes as designed
4. **Semantic HTML**: Always use proper heading tags with typography classes

### Performance Optimization

- Use `font-display: swap` for better loading performance
- Preload critical font files
- Subset fonts when possible to reduce file size

### Design Consistency

- Always use the predefined typography classes
- Don't override font sizes arbitrarily
- Test typography at different zoom levels (up to 200%)
- Ensure readability across all device sizes

This comprehensive typography system provides complete coverage of the Perigon design system, ensuring consistency and readability across all text elements in the application.
