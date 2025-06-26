# Perigon Design System

A comprehensive design system built specifically for the Perigon application, providing consistent visual language, interaction patterns, and development standards. This system enables teams to build cohesive, accessible, and scalable user interfaces with confidence.

## Overview

The Perigon Design System is built on four foundational pillars:

- **🎨 Visual Consistency**: Unified color palettes, typography, and spacing
- **⚡ Developer Experience**: Token-based architecture with Tailwind CSS integration
- **♿ Accessibility**: WCAG 2.1 AA compliant patterns and components
- **🌙 Theme Support**: Complete light and dark mode implementations

## Design Tokens

Our design system is built on a comprehensive token architecture that ensures consistency across all touchpoints:

### Color System

- **18 Neutral Shades**: `pgNeutral-0` through `pgNeutral-950`
- **8 Brand Colors**: Blue, Sapphire, Green, Red, Orange, Gold, Purple, Pink, Teal
- **Semantic State Colors**: Success, Error, Warning, Information
- **Alpha Transparency**: Full RGBA support for overlays and effects
- **Theme Adaptive**: Automatic light/dark mode switching

### Typography Scale

- **Complete Hierarchy**: 32 distinct typography classes
- **PX Grotesk Font**: Professional typeface optimized for digital interfaces
- **Semantic Naming**: Clear purpose-driven class names
- **Responsive Scaling**: Mobile-first typography progression

### Spacing System

- **8px Base Grid**: Consistent rhythm and alignment
- **4px Increments**: Fine-tuned control for precise layouts
- **32 Spacing Values**: From 0px to 128px with logical progression
- **Responsive Containers**: Specialized sheet sizes for modals and forms

### Shadow & Effects

- **Purpose-Built Shadows**: 20+ specialized shadow utilities
- **Interactive States**: Focus, hover, and active state shadows
- **Theme Awareness**: Automatic adaptation between light and dark modes
- **Performance Optimized**: GPU-accelerated shadow rendering

## Documentation Structure

### 📖 [Colors](./colors.md)

Complete color palette documentation including:

- All 18 neutral shades with usage guidelines
- 8 brand color families with semantic applications
- State colors for UI feedback
- Alpha transparency system
- Light and dark mode specifications
- Accessibility and contrast guidelines

### 🔤 [Typography](./typography.md)

Comprehensive typography system covering:

- Complete PX Grotesk type scale (32 classes)
- Semantic naming conventions
- Responsive typography patterns
- Line height and letter spacing specifications
- Accessibility considerations
- Implementation examples

### 🌫️ [Shadows & Effects](./shadows.md)

Detailed shadow system documentation:

- 20+ purpose-specific shadow utilities
- Interactive element shadows
- Layout and navigation shadows
- Content container effects
- Dark mode adaptations
- Performance considerations

### 📏 [Spacing & Layout](./spacing.md)

Spacing system and layout patterns:

- 8px grid system with 4px increments
- 32 spacing tokens from micro to macro
- Responsive breakpoint system
- Specialized container patterns
- Grid and flexbox layouts
- Component spacing guidelines

### 🛠️ [Usage Guide](./usage-guide.md)

Comprehensive implementation guide:

- Quick start setup instructions
- Complete component patterns
- Responsive design guidelines
- Best practices and conventions
- Real-world implementation examples
- Performance optimization tips

## Quick Start

### 1. Install Dependencies

Ensure you have the Perigon design system configured in your project:

```bash
# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss postcss autoprefixer

# Import Perigon globals.css in your application
```

### 2. Configure Tailwind

Your `tailwind.config.ts` should extend the Perigon configuration:

```javascript
import type { Config } from 'tailwindcss'

const config: Config = {
  // ... your existing config
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Perigon design tokens are automatically included
      // via the extended configuration
    },
  },
  plugins: [],
}

export default config
```

### 3. Import Global Styles

Import the Perigon design system in your main CSS file:

```css
/* app/globals.css */
@import './globals.css';

:root {
  font-feature-settings: 'ss01' on;
  --max-tab-width: 1240px;
}
```

### 4. Start Building

Use Perigon design tokens in your components:

```html
<!-- Example component using Perigon tokens -->
<div
  class="rounded-xl border border-pgStroke-200 bg-pgBackground-0 p-6 shadow-cardShadowPop"
>
  <h2 class="typography-titleH4 mb-3 text-pgText-950">Welcome to Perigon</h2>
  <p class="typography-paragraphMedium mb-4 text-pgText-600">
    Start building consistent interfaces with the Perigon design system.
  </p>
  <button
    class="typography-labelMedium rounded-lg bg-pgBlue-500 px-6 py-3 text-pgNeutral-0 shadow-sm transition-all duration-150 hover:bg-pgBlue-600 hover:shadow-md"
  >
    Get Started
  </button>
</div>
```

## Design Principles

### Consistency

Every element in the Perigon design system follows predictable patterns. Colors, spacing, typography, and interactions are systematically defined to create a cohesive experience across all touchpoints.

### Accessibility

Built with WCAG 2.1 AA compliance in mind, the system ensures:

- Sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation support
- Screen reader compatibility
- Touch target sizes meeting accessibility standards

### Scalability

The token-based architecture allows the system to grow and evolve:

- CSS custom properties enable theme switching
- Semantic naming conventions support design evolution
- Modular component patterns promote reusability
- Responsive design patterns work across all screen sizes

### Performance

Optimized for production environments:

- CSS variables reduce bundle size
- GPU-accelerated animations and shadows
- Minimal specificity conflicts
- Tree-shakeable utility classes

## Theme Support

The Perigon design system provides complete light and dark mode support:

### Light Mode (Default)

- Clean, bright backgrounds (`pgBackground-0`)
- High contrast text (`pgText-950`)
- Subtle shadows and borders
- Warm, approachable color palette

### Dark Mode

- Rich, dark backgrounds (`pgBackground-950`)
- Optimized text contrast (`pgText-0`)
- Enhanced shadows for depth
- Adjusted color saturation for readability

### Implementation

Theme switching is handled automatically through CSS custom properties:

```css
/* Light mode (default) */
:root {
  --color-bg-0: 255, 255, 255;
  --color-text-950: 3, 7, 18;
}

/* Dark mode */
.dark {
  --color-bg-0: 3, 7, 18;
  --color-text-950: 255, 255, 255;
}
```

## Component Architecture

### Atomic Design Methodology

The system follows atomic design principles:

1. **Tokens**: Color, typography, spacing, shadow values
2. **Elements**: Buttons, inputs, text styles
3. **Components**: Cards, forms, navigation
4. **Patterns**: Page layouts, dashboard structures
5. **Templates**: Complete page compositions

### Naming Conventions

Clear, semantic naming throughout:

- **Colors**: `pg{Color}-{Shade}` (e.g., `pgBlue-500`)
- **Typography**: `typography-{category}{Size}` (e.g., `typography-titleH3`)
- **Spacing**: `space-{value}` (e.g., `space-6` for 24px)
- **Shadows**: Descriptive names (e.g., `shadow-cardShadowPop`)

## Browser Support

The Perigon design system supports all modern browsers:

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

### CSS Features Used

- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- Modern box-shadow syntax
- RGB color functions
- CSS calc() for responsive containers

## Development Workflow

### Design Tokens First

Always start with design tokens rather than custom values:

```css
/* ✅ Good - Using design tokens */
.component {
  background-color: rgb(var(--color-bg-0));
  color: rgb(var(--color-pg-text-950));
  padding: var(--space-6);
  border-radius: 12px;
  box-shadow: var(--shadow-cardShadowPop);
}

/* ❌ Avoid - Custom values */
.component {
  background-color: #ffffff;
  color: #030712;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

### Component Testing

Test all components in both themes:

1. Light mode functionality and appearance
2. Dark mode adaptation and readability
3. Interactive states (hover, focus, active)
4. Responsive behavior across breakpoints
5. Accessibility with keyboard navigation and screen readers

## Contributing

### Design Updates

When proposing design system changes:

1. Document the use case and rationale
2. Ensure backward compatibility when possible
3. Test across all themes and breakpoints
4. Update documentation and examples
5. Consider accessibility implications

### Code Standards

Follow these standards when contributing:

- Use semantic HTML elements
- Implement proper ARIA labels and roles
- Follow the established naming conventions
- Include interactive states for all components
- Test with keyboard navigation
- Validate color contrast ratios

## Resources

### Design Files

- [Figma Design System](link-to-figma)
- [Component Library](link-to-storybook)
- [Icon Library](link-to-icons)

### Development Tools

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Team Resources

- [Design System Slack Channel](link-to-slack)
- [Weekly Design Reviews](link-to-calendar)
- [Component Request Process](link-to-process)

## Changelog

### Version 2.0.0 (Current)

- Complete redesign with comprehensive token system
- 18-shade neutral color palette
- 32 typography classes with PX Grotesk
- 20+ specialized shadow utilities
- Enhanced dark mode support
- Responsive container system
- Accessibility improvements

### Migration Guide

See [MIGRATION.md](./MIGRATION.md) for upgrading from previous versions.

---

**Maintained by the Perigon Design Team**  
For questions, suggestions, or support, reach out to the design system team.

_Last updated: [Current Date]_
