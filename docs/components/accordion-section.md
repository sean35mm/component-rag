# AccordionSection Component

A collapsible content section component that provides an expandable/collapsible interface for organizing content within the design system.

## Purpose

The `AccordionSection` component creates a single collapsible section with a clickable header that toggles the visibility of its content. Built on top of our base Accordion components, it provides a simplified interface for creating standalone accordion sections with consistent styling and behavior.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | The title text displayed in the accordion trigger |
| `isOpenByDefault` | `boolean` | Yes | - | Whether the accordion section should be expanded on initial render |
| `children` | `ReactNode` | Yes | - | The content to display when the accordion is expanded |
| `className` | `string` | No | - | Additional CSS classes to apply to the accordion wrapper |

## Usage Example

```tsx
import { AccordionSection } from '@/components/ui/accordion-section';
import { Typography } from '@/components/ui/typography';

function SettingsPanel() {
  return (
    <div className="space-y-4 p-6 bg-pgBackground-50 rounded-lg">
      {/* Basic usage - closed by default */}
      <AccordionSection
        title="Account Settings"
        isOpenByDefault={false}
      >
        <div className="space-y-3">
          <Typography variant="paragraphMedium" className="text-pgText-600">
            Manage your account preferences and security settings.
          </Typography>
          <button className="px-4 py-2 bg-pgBlue-500 text-white rounded-md hover:bg-pgBlue-600">
            Update Settings
          </button>
        </div>
      </AccordionSection>

      {/* Open by default with custom styling */}
      <AccordionSection
        title="Notification Preferences"
        isOpenByDefault={true}
        className="border border-pgStroke-200 rounded-md p-4 bg-pgBackground-0"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Typography variant="labelMedium" className="text-pgText-700">
              Email Notifications
            </Typography>
            <Typography variant="paragraphSmall" className="text-pgText-500">
              Receive updates via email
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="labelMedium" className="text-pgText-700">
              Push Notifications
            </Typography>
            <Typography variant="paragraphSmall" className="text-pgText-500">
              Receive browser notifications
            </Typography>
          </div>
        </div>
      </AccordionSection>

      {/* With state indicators */}
      <AccordionSection
        title="Advanced Options"
        isOpenByDefault={false}
        className="border-l-4 border-pgStateWarning-base pl-4"
      >
        <div className="bg-pgStateWarning-lighter p-4 rounded-md">
          <Typography variant="labelSmall" className="text-pgStateWarning-dark mb-2">
            Warning: Advanced Settings
          </Typography>
          <Typography variant="paragraphSmall" className="text-pgText-600">
            These settings may affect system performance. Please proceed with caution.
          </Typography>
        </div>
      </AccordionSection>
    </div>
  );
}
```

## Design System Usage

### Typography
- **Title**: Uses `typography-headlines16` class for consistent heading hierarchy
- Applied through the Typography component with `variant='headlines16'`

### Colors
- **Background**: Transparent by default (`bg-transparent`)
- **Borders**: No border styling (`border-none`)
- **Text**: Inherits from Typography component, supports all design system text colors

### Spacing
- **Padding**: `pb-4 pt-2` on trigger (16px bottom, 8px top)
- Content padding managed by AccordionContent component

### Interactive States
- **Hover**: Removes default underline decoration (`hover:no-underline`)
- **Focus**: Inherits focus styles from base Accordion components

## Styling

### Default Styling
```tsx
// Minimal styling approach
<AccordionSection
  title="Basic Section"
  isOpenByDefault={false}
>
  Content here
</AccordionSection>
```

### Custom Styling Options
```tsx
// Card-like appearance
<AccordionSection
  title="Card Section"
  isOpenByDefault={true}
  className="bg-pgBackground-0 border border-pgStroke-200 rounded-lg p-4 shadow-sm"
>
  Content with card styling
</AccordionSection>

// With accent colors
<AccordionSection
  title="Featured Section"
  isOpenByDefault={false}
  className="border-l-4 border-pgBlue-500 bg-pgBlue-50/30 pl-6"
>
  Featured content
</AccordionSection>

// Dark mode variant
<AccordionSection
  title="Dark Section"
  isOpenByDefault={true}
  className="bg-pgBackground-900 border border-pgStroke-700 rounded-md p-4"
>
  <div className="text-pgText-100">Dark themed content</div>
</AccordionSection>
```

## Responsive Design

The component is inherently responsive through its flexible layout:

```tsx
// Responsive content layout
<AccordionSection
  title="Responsive Content"
  isOpenByDefault={true}
>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div className="bg-pgBackground-100 p-4 rounded-md">
      <Typography variant="labelMedium" className="text-pgText-700">
        Mobile First
      </Typography>
    </div>
    <div className="bg-pgBackground-100 p-4 rounded-md">
      <Typography variant="labelMedium" className="text-pgText-700">
        Tablet View
      </Typography>
    </div>
    <div className="bg-pgBackground-100 p-4 rounded-md lg:block hidden">
      <Typography variant="labelMedium" className="text-pgText-700">
        Desktop Only
      </Typography>
    </div>
  </div>
</AccordionSection>
```

### Breakpoint Considerations
- **sm (640px+)**: Title remains single line, content can expand to two columns
- **md (768px+)**: Optimal for side-by-side content layouts
- **lg (1024px+)**: Best for complex multi-column content arrangements

## Accessibility

### Built-in Features
- **ARIA Compliance**: Inherits full ARIA implementation from base Accordion components
- **Keyboard Navigation**: Space/Enter to toggle, Tab to navigate
- **Screen Reader Support**: Proper expansion state announcements
- **Focus Management**: Visible focus indicators and logical tab order

### Best Practices
```tsx
// Descriptive titles for screen readers
<AccordionSection
  title="User Account Settings - Click to expand"
  isOpenByDefault={false}
>
  <div role="region" aria-label="Account settings form">
    {/* Form content */}
  </div>
</AccordionSection>

// Semantic content structure
<AccordionSection
  title="Help Documentation"
  isOpenByDefault={true}
>
  <nav aria-label="Help topics">
    <ul className="space-y-2">
      <li><a href="#getting-started" className="text-pgBlue-600 hover:text-pgBlue-700">Getting Started</a></li>
      <li><a href="#faq" className="text-pgBlue-600 hover:text-pgBlue-700">Frequently Asked Questions</a></li>
    </ul>
  </nav>
</AccordionSection>
```

## Dependencies

### Internal Components
- `@/components/ui/accordion` - Base accordion components (Accordion, AccordionContent, AccordionItem, AccordionTrigger)
- `@/components/ui/typography` - Typography component for consistent text styling

### External Dependencies
- `react` - useState, useEffect, ReactNode

### Design System Dependencies
- **Typography System**: Requires `typography-headlines16` class definition
- **Color System**: Compatible with all pgNeutral, pgBackground, pgText, and pgState color tokens
- **Tailwind CSS**: Utilizes spacing, hover states, and utility classes