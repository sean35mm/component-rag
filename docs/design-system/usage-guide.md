# Perigon Design System Usage Guide

A comprehensive implementation guide for the Perigon design system. This guide provides complete specifications, code examples, and best practices for creating consistent, accessible interfaces using the actual Perigon design tokens and patterns.

## Quick Start Implementation

### Essential Setup

First, ensure you have the Perigon design system properly configured in your project:

```css
/* Import Perigon globals.css */
@import './src/app/globals.css';

/* Enable font features */
:root {
  font-feature-settings: 'ss01' on;
  --max-tab-width: 1240px;
}
```

### Core Design Tokens

The Perigon design system is built on these fundamental tokens:

#### Color System

- **Neutrals**: `pgNeutral-0` through `pgNeutral-950` (18 values)
- **Brand Colors**: `pgBlue`, `pgSapphire`, `pgGreen`, `pgRed`, `pgOrange`, `pgGold`, `pgPurple`, `pgPink`, `pgTeal`
- **State Colors**: `pgStateFaded`, `pgStateInformation`, `pgStateWarning`, `pgStateError`, `pgStateSuccess`, etc.
- **Alpha Colors**: `alphaWhite`, `alphaNeutral`, `alphaBlack`, etc.

#### Typography System

- **Titles**: `typography-titleH1` through `typography-titleH6`, `typography-titleLarge`, `typography-titleH16`
- **Labels**: `typography-labelXLarge` through `typography-label3XSmall`
- **Paragraphs**: `typography-paragraphXLarge` through `typography-paragraph3XSmall`
- **Subheadings**: `typography-subheadingMedium` through `typography-subheading4XSmall`
- **Headlines**: `typography-headlines36` through `typography-headlines14`

#### Spacing Scale

- **Micro**: `space-0` to `space-1.5` (0px-6px)
- **Component**: `space-2` to `space-6` (8px-24px)
- **Section**: `space-8` to `space-16` (32px-64px)
- **Page**: `space-20` to `space-32` (80px-128px)

#### Shadow System

- **Basic**: `shadow-sm`, `shadow-md`
- **Interactive**: `shadow-buttonsImportantFocus`, `shadow-inputBlueGlowStrong`
- **Layout**: `shadow-sideTray`, `shadow-liveSearchTrays`, `shadow-mainDesktopWindow`
- **Content**: `shadow-cardShadowPop`, `shadow-cardShadowPopStrong`

## Color Implementation

### Semantic Color Usage

```css
/* Background colors that adapt to theme */
.bg-primary {
  background-color: rgb(var(--color-bg-0));
}
.bg-secondary {
  background-color: rgb(var(--color-bg-50));
}
.bg-tertiary {
  background-color: rgb(var(--color-bg-100));
}

/* Text colors with proper hierarchy */
.text-primary {
  color: rgb(var(--color-pg-text-950));
}
.text-secondary {
  color: rgb(var(--color-pg-text-600));
}
.text-tertiary {
  color: rgb(var(--color-pg-text-400));
}
.text-disabled {
  color: rgb(var(--color-pg-text-300));
}

/* Border colors */
.border-default {
  border-color: rgb(var(--color-stroke-200));
}
.border-subtle {
  border-color: rgb(var(--color-stroke-100));
}
.border-strong {
  border-color: rgb(var(--color-stroke-300));
}
```

### Brand Color Implementation

```html
<!-- Primary brand actions -->
<button
  class="bg-pgBlue-500 text-pgNeutral-0 hover:bg-pgBlue-600 active:bg-pgBlue-700"
>
  Primary Action
</button>

<!-- Secondary brand elements -->
<div class="border-pgSapphire-200 bg-pgSapphire-50 text-pgSapphire-700">
  Information panel
</div>

<!-- State colors -->
<div
  class="border-pgStateSuccess-light bg-pgStateSuccess-lighter text-pgStateSuccess-dark"
>
  Success message
</div>

<div
  class="border-pgStateError-light bg-pgStateError-lighter text-pgStateError-dark"
>
  Error message
</div>
```

### Alpha Color Usage

```css
/* Overlay backgrounds */
.modal-backdrop {
  background-color: rgba(var(--color-pg-alpha-black), 0.5);
}

/* Subtle tints */
.info-tint {
  background-color: rgba(var(--color-pg-alpha-blue), 0.1);
}

/* Hover states */
.hover-tint:hover {
  background-color: rgba(var(--color-pg-alpha-neutral), 0.05);
}
```

## Typography Implementation

### Typography Hierarchy

```html
<!-- Page structure -->
<article class="prose">
  <h1 class="typography-titleH1 mb-6 text-pgText-950">Main Page Title</h1>

  <p class="typography-paragraphLarge mb-8 text-pgText-600">
    Introduction paragraph with larger text for better reading experience.
  </p>

  <h2 class="typography-titleH2 mb-4 text-pgText-950">Section Heading</h2>

  <p class="typography-paragraphMedium mb-6 text-pgText-950">
    Regular body text that forms the main content.
  </p>

  <h3 class="typography-headlines18 mb-3 text-pgText-950">
    Subsection Emphasis
  </h3>

  <p class="typography-paragraphSmall mb-4 text-pgText-600">
    Supporting information in smaller text.
  </p>

  <div class="border-t border-pgStroke-200 pt-4">
    <span class="typography-subheadingSmall uppercase text-pgText-400">
      Related Topics
    </span>
  </div>
</article>
```

### Interface Typography

```html
<!-- Navigation -->
<nav class="flex items-center gap-6">
  <div class="typography-headlines18 text-pgText-950">Brand Name</div>
  <ul class="flex gap-4">
    <li>
      <a
        href="#"
        class="typography-labelMedium text-pgText-600 hover:text-pgText-950"
        >Home</a
      >
    </li>
    <li>
      <a
        href="#"
        class="typography-labelMedium text-pgText-600 hover:text-pgText-950"
        >About</a
      >
    </li>
  </ul>
</nav>

<!-- Form elements -->
<form class="space-y-4">
  <div>
    <label class="typography-labelSmall mb-2 block text-pgText-950">
      Email Address
    </label>
    <input
      type="email"
      class="typography-paragraphMedium w-full px-4 py-3"
      placeholder="Enter your email"
    />
    <span class="typography-paragraphXSmall mt-1 block text-pgText-400">
      We'll never share your email
    </span>
  </div>

  <button
    class="typography-labelMedium rounded-lg bg-pgBlue-500 px-6 py-3 text-pgNeutral-0"
  >
    Submit
  </button>
</form>
```

## Component Patterns

### Button Components

```html
<!-- Primary button -->
<button
  class="typography-labelMedium rounded-lg bg-pgBlue-500 px-6 py-3 text-pgNeutral-0 shadow-sm transition-all duration-150 hover:bg-pgBlue-600 hover:shadow-md focus:shadow-buttonsImportantFocus active:bg-pgBlue-700"
>
  Primary Action
</button>

<!-- Secondary button -->
<button
  class="typography-labelMedium rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-6 py-3 text-pgText-950 shadow-sm transition-all duration-150 hover:border-pgStroke-300 hover:bg-pgBackground-50 hover:shadow-md"
>
  Secondary Action
</button>

<!-- Destructive button -->
<button
  class="typography-labelMedium rounded-lg bg-pgStateError-base px-6 py-3 text-pgNeutral-0 shadow-sm transition-all duration-150 hover:bg-pgStateError-dark hover:shadow-md"
>
  Delete Item
</button>

<!-- Icon button -->
<button
  class="rounded-lg border border-pgStroke-200 bg-pgBackground-0 p-2 shadow-sm transition-all duration-150 hover:bg-pgBackground-50 hover:shadow-md"
>
  <svg class="h-5 w-5 text-pgIcon-600" fill="currentColor">
    <!-- Icon SVG -->
  </svg>
</button>
```

### Card Components

```html
<!-- Basic card -->
<div
  class="rounded-xl border border-pgStroke-200 bg-pgBackground-0 p-6 shadow-cardShadowPop transition-all duration-200 hover:shadow-cardShadowPopStrong"
>
  <h3 class="typography-titleH4 mb-3 text-pgText-950">Card Title</h3>
  <p class="typography-paragraphMedium mb-4 text-pgText-600">
    Card description content that provides context and information.
  </p>
  <div class="flex items-center justify-between">
    <span class="typography-label2XSmall uppercase text-pgText-400"
      >Category</span
    >
    <button class="typography-labelSmall text-pgBlue-600 hover:text-pgBlue-700">
      Learn More
    </button>
  </div>
</div>

<!-- Interactive card -->
<div
  class="cursor-pointer rounded-xl border border-pgStroke-200 bg-pgBackground-0 p-6 shadow-cardShadowPop transition-all duration-200 hover:-translate-y-1 hover:border-pgStroke-300 hover:shadow-cardShadowPopStrong"
>
  <div class="flex items-start gap-4">
    <div
      class="flex h-12 w-12 items-center justify-center rounded-lg bg-pgBlue-100"
    >
      <svg class="h-6 w-6 text-pgBlue-600" fill="currentColor">
        <!-- Icon SVG -->
      </svg>
    </div>
    <div class="flex-1">
      <h3 class="typography-titleH5 mb-2 text-pgText-950">Interactive Card</h3>
      <p class="typography-paragraphSmall text-pgText-600">
        Click to interact with this card component.
      </p>
    </div>
  </div>
</div>
```

### Form Components

```html
<!-- Complete form example -->
<form class="mx-auto max-w-sheetLg space-y-8 p-8">
  <!-- Form header -->
  <div class="space-y-2">
    <h2 class="typography-titleH3 text-pgText-950">Contact Information</h2>
    <p class="typography-paragraphMedium text-pgText-600">
      Please fill in your details below.
    </p>
  </div>

  <!-- Form fields -->
  <div class="space-y-6">
    <!-- Text input -->
    <div class="space-y-2">
      <label class="typography-labelSmall block text-pgText-950">
        Full Name *
      </label>
      <input
        type="text"
        class="typography-paragraphMedium w-full rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-4 py-3 shadow-inputFieldPop transition-shadow duration-150 placeholder:text-pgText-400 focus:shadow-inputBlueGlowStrong"
        placeholder="Enter your full name"
        required
      />
    </div>

    <!-- Email input with validation -->
    <div class="space-y-2">
      <label class="typography-labelSmall block text-pgText-950">
        Email Address *
      </label>
      <input
        type="email"
        class="typography-paragraphMedium w-full rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-4 py-3 shadow-inputFieldPop transition-shadow duration-150 placeholder:text-pgText-400 focus:shadow-inputBlueGlowStrong"
        placeholder="Enter your email"
        required
      />
      <span class="typography-paragraphXSmall text-pgText-400">
        We'll never share your email address
      </span>
    </div>

    <!-- Select dropdown -->
    <div class="space-y-2">
      <label class="typography-labelSmall block text-pgText-950">
        Country
      </label>
      <select
        class="typography-paragraphMedium w-full rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-4 py-3 shadow-inputFieldPopSm transition-shadow duration-150"
      >
        <option>Select a country</option>
        <option>United States</option>
        <option>Canada</option>
        <option>United Kingdom</option>
      </select>
    </div>

    <!-- Textarea -->
    <div class="space-y-2">
      <label class="typography-labelSmall block text-pgText-950">
        Message
      </label>
      <textarea
        rows="4"
        class="typography-paragraphMedium resize-vertical w-full rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-4 py-3 shadow-inputFieldPop transition-shadow duration-150 placeholder:text-pgText-400 focus:shadow-inputBlueGlowStrong"
        placeholder="Enter your message"
      ></textarea>
    </div>

    <!-- Checkbox -->
    <div class="flex items-start gap-3">
      <input
        type="checkbox"
        id="terms"
        class="mt-1 h-4 w-4 rounded border border-pgStroke-300 shadow-containerInset"
      />
      <label for="terms" class="typography-paragraphSmall text-pgText-600">
        I agree to the terms and conditions and privacy policy
      </label>
    </div>
  </div>

  <!-- Form actions -->
  <div class="flex justify-end gap-3 border-t border-pgStroke-200 pt-6">
    <button
      type="button"
      class="typography-labelMedium rounded-lg border border-pgStroke-200 bg-pgBackground-0 px-6 py-3 text-pgText-950 shadow-sm transition-all duration-150 hover:bg-pgBackground-50 hover:shadow-md"
    >
      Cancel
    </button>
    <button
      type="submit"
      class="typography-labelMedium rounded-lg bg-pgBlue-500 px-6 py-3 text-pgNeutral-0 shadow-sm transition-all duration-150 hover:bg-pgBlue-600 hover:shadow-md focus:shadow-buttonsImportantFocus"
    >
      Submit Form
    </button>
  </div>
</form>
```

### Navigation Components

```html
<!-- Main navigation header -->
<header
  class="sticky top-0 z-50 border-b border-pgStroke-200 bg-pgBackground-0 shadow-sm"
>
  <div class="container mx-auto px-6 py-4">
    <nav class="flex items-center justify-between">
      <!-- Brand -->
      <div class="flex items-center gap-8">
        <a href="/" class="typography-headlines18 text-pgText-950"> Perigon </a>

        <!-- Main navigation -->
        <ul class="hidden items-center gap-6 md:flex">
          <li>
            <a
              href="/dashboard"
              class="typography-labelMedium rounded-lg px-3 py-2 text-pgText-600 transition-all duration-150 hover:bg-pgBackground-50 hover:text-pgText-950"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/analytics"
              class="typography-labelMedium rounded-lg bg-pgBlue-50 px-3 py-2 text-pgBlue-600 transition-all duration-150"
            >
              Analytics
            </a>
          </li>
          <li>
            <a
              href="/settings"
              class="typography-labelMedium rounded-lg px-3 py-2 text-pgText-600 transition-all duration-150 hover:bg-pgBackground-50 hover:text-pgText-950"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>

      <!-- User menu -->
      <div class="flex items-center gap-4">
        <button
          class="rounded-lg p-2 text-pgIcon-600 transition-all duration-150 hover:bg-pgBackground-50 hover:text-pgIcon-950"
        >
          <svg class="h-5 w-5" fill="currentColor">
            <!-- Notification icon -->
          </svg>
        </button>

        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-pgBlue-500"
        >
          <span class="typography-labelSmall text-pgNeutral-0">JD</span>
        </div>
      </div>
    </nav>
  </div>
</header>

<!-- Sidebar navigation -->
<nav
  class="h-full w-64 overflow-y-auto border-r border-pgStroke-200 bg-pgBackground-0 shadow-sideTray"
>
  <div class="p-6">
    <div class="space-y-8">
      <!-- Navigation section -->
      <div class="space-y-3">
        <span class="typography-subheadingXSmall uppercase text-pgText-400">
          Main
        </span>
        <ul class="space-y-1">
          <li>
            <a
              href="/dashboard"
              class="typography-labelMedium flex items-center gap-3 rounded-lg bg-pgBlue-50 px-3 py-2 text-pgBlue-700"
            >
              <svg class="h-5 w-5" fill="currentColor">
                <!-- Dashboard icon -->
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/projects"
              class="typography-labelMedium flex items-center gap-3 rounded-lg px-3 py-2 text-pgText-600 transition-all duration-150 hover:bg-pgBackground-50 hover:text-pgText-950"
            >
              <svg class="h-5 w-5" fill="currentColor">
                <!-- Projects icon -->
              </svg>
              Projects
            </a>
          </li>
        </ul>
      </div>

      <!-- Settings section -->
      <div class="space-y-3">
        <span class="typography-subheadingXSmall uppercase text-pgText-400">
          Settings
        </span>
        <ul class="space-y-1">
          <li>
            <a
              href="/profile"
              class="typography-labelMedium flex items-center gap-3 rounded-lg px-3 py-2 text-pgText-600 transition-all duration-150 hover:bg-pgBackground-50 hover:text-pgText-950"
            >
              <svg class="h-5 w-5" fill="currentColor">
                <!-- Profile icon -->
              </svg>
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
```

### Modal Components

```html
<!-- Modal backdrop and container -->
<div
  class="bg-pgAlphaBlack/50 fixed inset-0 z-50 flex items-center justify-center p-4"
>
  <!-- Modal content -->
  <div
    class="w-full max-w-sheetMdBounded overflow-hidden rounded-xl bg-pgBackground-0 shadow-mainDesktopWindow"
  >
    <!-- Modal header -->
    <div
      class="flex items-center justify-between border-b border-pgStroke-200 px-6 py-4"
    >
      <h2 class="typography-titleH4 text-pgText-950">Confirm Action</h2>
      <button
        class="rounded-lg p-2 text-pgIcon-400 transition-all duration-150 hover:bg-pgBackground-50 hover:text-pgIcon-600"
      >
        <svg class="h-5 w-5" fill="currentColor">
          <!-- Close icon -->
        </svg>
      </button>
    </div>

    <!-- Modal body -->
    <div class="space-y-4 px-6 py-6">
      <p class="typography-paragraphMedium text-pgText-950">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>

      <div
        class="rounded-lg border border-pgStateWarning-light bg-pgStateWarning-lighter p-4"
      >
        <p class="typography-paragraphSmall text-pgStateWarning-dark">
          Warning: This will permanently remove all associated data.
        </p>
      </div>
    </div>

    <!-- Modal footer -->
    <div
      class="flex justify-end gap-3 border-t border-pgStroke-200 bg-pgBackground-50 px-6 py-4"
    >
      <button
        class="typography-labelMedium rounded-lg px-4 py-2 text-pgText-600 transition-all duration-150 hover:bg-pgBackground-100 hover:text-pgText-950"
      >
        Cancel
      </button>
      <button
        class="typography-labelMedium rounded-lg bg-pgStateError-base px-4 py-2 text-pgNeutral-0 shadow-sm transition-all duration-150 hover:bg-pgStateError-dark hover:shadow-md"
      >
        Delete Item
      </button>
    </div>
  </div>
</div>
```

## Layout Patterns

### Dashboard Layout

```html
<div class="min-h-screen bg-pgBackground-0">
  <!-- Header -->
  <header
    class="sticky top-0 z-40 border-b border-pgStroke-200 bg-pgBackground-0"
  >
    <!-- Header content -->
  </header>

  <div class="flex">
    <!-- Sidebar -->
    <aside class="sticky top-16 h-[calc(100vh-theme(spacing.16))] w-64">
      <!-- Sidebar content -->
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8">
      <div class="mx-auto max-w-7xl space-y-8">
        <!-- Page header -->
        <div class="space-y-2">
          <h1 class="typography-titleH2 text-pgText-950">Dashboard</h1>
          <p class="typography-paragraphLarge text-pgText-600">
            Welcome back! Here's your overview.
          </p>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            class="rounded-xl border border-pgStroke-200 bg-pgBackground-0 p-6 shadow-cardShadowPop"
          >
            <div class="space-y-2">
              <span
                class="typography-subheadingXSmall uppercase text-pgText-400"
              >
                Total Users
              </span>
              <div class="typography-headlines32 text-pgText-950">1,234</div>
              <span class="typography-paragraphSmall text-pgStateSuccess-base">
                +12% from last month
              </span>
            </div>
          </div>

          <!-- More stat cards... -->
        </div>

        <!-- Content sections -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- Chart section -->
          <div
            class="rounded-xl border border-pgStroke-200 bg-pgBackground-0 p-6 shadow-cardShadowPop"
          >
            <h3 class="typography-titleH5 mb-4 text-pgText-950">Analytics</h3>
            <!-- Chart content -->
          </div>

          <!-- Activity section -->
          <div
            class="rounded-xl border border-pgStroke-200 bg-pgBackground-0 p-6 shadow-cardShadowPop"
          >
            <h3 class="typography-titleH5 mb-4 text-pgText-950">
              Recent Activity
            </h3>
            <!-- Activity content -->
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

## Responsive Design

### Breakpoint Usage

```html
<!-- Responsive grid -->
<div
  class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
>
  <!-- Grid items -->
</div>

<!-- Responsive spacing -->
<div class="p-4 md:p-6 lg:p-8">
  <!-- Content with responsive padding -->
</div>

<!-- Responsive typography -->
<h1 class="typography-titleH3 md:typography-titleH2 lg:typography-titleH1">
  Responsive Heading
</h1>

<!-- Responsive visibility -->
<nav class="hidden items-center gap-6 md:flex">
  <!-- Desktop navigation -->
</nav>

<button class="p-2 md:hidden">
  <!-- Mobile menu button -->
</button>
```

### Container Patterns

```html
<!-- Standard page container -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Page content -->
</div>

<!-- Sheet containers for modals/forms -->
<div class="mx-auto max-w-sheetSmBounded p-6">
  <!-- Small form content -->
</div>

<div class="mx-auto max-w-sheetMdBounded p-8">
  <!-- Medium form content -->
</div>

<div class="mx-auto max-w-sheetLgBounded p-8">
  <!-- Large form content -->
</div>
```

## Best Practices

### Color Usage Guidelines

1. **Always use semantic tokens**: Prefer `bg-pgBackground-0` over `bg-pgNeutral-0`
2. **Test in both themes**: Ensure colors work in light and dark modes
3. **Maintain contrast ratios**: Use appropriate text colors for backgrounds
4. **Use state colors semantically**: `pgStateError` for errors, `pgStateSuccess` for success

### Typography Best Practices

1. **Follow hierarchy**: Use heading tags with typography classes
2. **Consistent spacing**: Use the spacing scale for text margins
3. **Responsive sizing**: Consider mobile-first typography scaling
4. **Accessibility**: Maintain proper contrast and readable line heights

### Component Architecture

1. **Atomic design**: Build from small components to larger patterns
2. **Consistent spacing**: Use the spacing scale throughout
3. **Interactive states**: Include hover, focus, and active states
4. **Theme awareness**: Ensure components work in both themes

### Performance Considerations

1. **Use CSS variables**: Leverage the design token system
2. **Optimize shadows**: Prefer simpler shadows when possible
3. **Responsive images**: Use appropriate sizing for different screens
4. **Minimize layout shift**: Use consistent spacing and sizing

This comprehensive usage guide provides the foundation for implementing the Perigon design system consistently across all applications and components.
