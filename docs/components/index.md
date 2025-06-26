# Story Drawer Component

A barrel export module that provides convenient access to the Story Drawer component and its related utilities.

## Purpose

This index file serves as the main entry point for the Story Drawer component system, re-exporting all necessary components, types, and utilities from the story-drawer module. This pattern follows our design system's modular architecture, allowing consumers to import everything they need from a single location while maintaining clean component organization.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This is a barrel export file with no direct props |

## Usage Example

```tsx
import { StoryDrawer, StoryDrawerProps, useStoryDrawer } from '@/components/ui/story-drawer';
// or with alias
import * as StoryDrawerModule from '@/components/ui/story-drawer';

function App() {
  return (
    <div className="bg-pgBackground-50 min-h-screen">
      {/* Use imported components here */}
      <StoryDrawer 
        isOpen={true}
        onClose={() => {}}
        className="custom-story-drawer"
      >
        <div className="typography-titleH3 text-pgText-900">
          Story Content
        </div>
      </StoryDrawer>
    </div>
  );
}
```

## Design System Usage

### Import Patterns
```tsx
// Named imports (recommended)
import { StoryDrawer, StoryDrawerHeader, StoryDrawerContent } from '@/components/ui/story-drawer';

// Namespace import
import * as StoryComponents from '@/components/ui/story-drawer';

// Default import (if available)
import StoryDrawer from '@/components/ui/story-drawer';
```

### Typography Integration
Components exported from this module should support our typography system:
- **Headers**: `.typography-titleH1` through `.typography-titleH6`
- **Content**: `.typography-paragraphMedium`, `.typography-paragraphLarge`
- **Labels**: `.typography-labelMedium`, `.typography-labelSmall`

### Color System Integration
Exported components should utilize our color tokens:
- **Backgrounds**: `bg-pgBackground-0`, `bg-pgBackground-50`, `bg-pgBackground-100`
- **Text**: `text-pgText-900`, `text-pgText-700`, `text-pgText-500`
- **Borders**: `border-pgStroke-200`, `border-pgStroke-300`
- **Interactive States**: `bg-pgBlue-500`, `hover:bg-pgBlue-600`

## Variants

The exported components should support standard design system variants:

```tsx
// Size variants
<StoryDrawer size="sm" />    // Small drawer
<StoryDrawer size="md" />    // Medium drawer (default)
<StoryDrawer size="lg" />    // Large drawer
<StoryDrawer size="xl" />    // Extra large drawer

// Position variants
<StoryDrawer position="left" />   // Slide from left
<StoryDrawer position="right" />  // Slide from right (default)
<StoryDrawer position="bottom" /> // Slide from bottom
```

## Styling

### Available Customization
```tsx
// Custom styling with design system tokens
<StoryDrawer 
  className="bg-pgNeutral-50 border-pgStroke-300"
  overlayClassName="bg-pgNeutral-900/80"
  contentClassName="typography-paragraphMedium text-pgText-800"
/>
```

### Theme Support
- **Light Mode**: Uses `pgBackground-0`, `pgText-900` tokens
- **Dark Mode**: Automatically adapts using dark mode variants
- **Custom Themes**: Supports CSS variable overrides

## Responsive Design

The exported components should adapt across our breakpoint system:

```tsx
<StoryDrawer className="
  w-full sm:w-96 md:w-[480px] lg:w-[560px] xl:w-[640px]
  h-full sm:h-auto sm:max-h-[90vh]
">
  <div className="
    p-4 sm:p-6 md:p-8
    typography-titleH4 sm:typography-titleH3 lg:typography-titleH2
  ">
    Responsive Story Content
  </div>
</StoryDrawer>
```

## Accessibility

Components exported from this module should include:

- **ARIA Support**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Keyboard Navigation**: ESC key to close, focus management
- **Screen Reader Support**: Proper labeling and descriptions
- **Focus Management**: Trap focus within drawer when open

```tsx
<StoryDrawer
  aria-labelledby="story-title"
  aria-describedby="story-description"
  role="dialog"
  aria-modal="true"
/>
```

## Dependencies

### Internal Dependencies
- `./story-drawer` - Main component implementation
- Design system tokens and utilities
- CVA for variant management
- Tailwind CSS classes

### External Dependencies
- React (for component functionality)
- CSS variables system for theming
- Tailwind CSS for styling utilities

## Customization

### Extending with className
```tsx
// Custom overlay styling
<StoryDrawer 
  className="custom-drawer-styles"
  overlayClassName="backdrop-blur-sm bg-pgNeutral-900/60"
/>

// Custom animation timing
<StoryDrawer 
  className="transition-transform duration-300 ease-out"
/>

// Responsive customization
<StoryDrawer 
  className="
    lg:shadow-2xl lg:border lg:border-pgStroke-200
    lg:rounded-xl lg:m-8 lg:max-w-4xl
  "
/>
```

### CSS Variable Overrides
```css
.custom-story-drawer {
  --drawer-background: rgb(var(--pgBackground-50));
  --drawer-text: rgb(var(--pgText-900));
  --drawer-border: rgb(var(--pgStroke-200));
  --drawer-shadow: 0 25px 50px -12px rgb(var(--pgNeutral-900) / 0.25);
}
```

### Integration with Form Components
```tsx
import { StoryDrawer } from '@/components/ui/story-drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

<StoryDrawer>
  <div className="space-y-6 p-6">
    <h2 className="typography-titleH3 text-pgText-900">
      Edit Story
    </h2>
    <Input 
      placeholder="Story title..." 
      className="bg-pgBackground-0 border-pgStroke-300"
    />
    <Button 
      variant="primary" 
      className="bg-pgBlue-500 hover:bg-pgBlue-600"
    >
      Save Story
    </Button>
  </div>
</StoryDrawer>
```