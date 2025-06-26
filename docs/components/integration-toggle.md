# IntegrationToggle Component

## Purpose

The `IntegrationToggle` component provides a flexible layout for displaying integration or feature cards with customizable content, toggle controls, and optional badges. It supports both horizontal and vertical layouts, making it ideal for settings panels, integration lists, or feature dashboards where users need to configure or control various services.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The main title/heading for the integration |
| `type` | `'list' \| 'card'` | ❌ | `'card'` | Visual style variant - card adds background and border |
| `variant` | `'horizontal' \| 'vertical'` | ❌ | `'horizontal'` | Layout orientation for content arrangement |
| `icon` | `ReactNode` | ❌ | - | Icon or image to display, typically integration logo |
| `description` | `ReactNode` | ❌ | - | Supporting text or description content |
| `toggle` | `ReactNode` | ❌ | - | Toggle switch or control element |
| `button` | `ReactNode` | ❌ | - | Action button (e.g., Configure, Setup) |
| `badge` | `string` | ❌ | - | Status badge text (e.g., "Beta", "New") |
| `children` | `ReactNode` | ❌ | - | Additional content rendered below main content |
| `className` | `string` | ❌ | - | Additional CSS classes for customization |

*Extends `HTMLAttributes<HTMLElement>` for additional DOM props*

## Usage Example

```tsx
import { IntegrationToggle } from '@/components/ui/integration-toggle';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { SlackIcon } from '@/components/icons';

// Card variant with horizontal layout
<IntegrationToggle
  title="Slack Integration"
  description="Connect your workspace to receive notifications and updates directly in Slack channels."
  icon={<SlackIcon className="w-5 h-5" />}
  badge="Popular"
  toggle={<Switch defaultChecked />}
  button={
    <Button variant="outline" size="sm">
      Configure
    </Button>
  }
/>

// List variant with vertical layout
<IntegrationToggle
  type="list"
  variant="vertical"
  title="GitHub Integration"
  description="Sync repositories and track commits automatically."
  icon={<GitHubIcon className="w-5 h-5" />}
  toggle={<Switch />}
>
  <div className="space-y-2">
    <Typography variant="labelXSmall" color="600">
      Connected Repositories: 3
    </Typography>
  </div>
</IntegrationToggle>
```

## Design System Usage

### Typography Classes
- **Titles**: Uses `.typography-labelSmall` (card type) or `.typography-labelMedium` (list type)
- **Descriptions**: Uses `.typography-paragraphXSmall` (card type) or `.typography-paragraphSmall` (list type)

### Color Tokens
- **Background**: `bg-pgBackground-0` - Primary background color with dark mode support
- **Border**: Uses default border color from design system
- **Text Colors**: 
  - Title: `pgText-800` - High contrast text
  - Description: `pgText-600` - Medium contrast supporting text

### Spacing & Layout
- **Padding**: `p-4` (16px) for card variant
- **Margins**: `mr-4` (16px) for icon spacing, `mr-2` (8px) for title-badge spacing
- **Gaps**: `mt-1` (4px) for description, `mt-3` (12px) for vertical spacing, `mt-4` (16px) for children

## Styling

### Variants

#### Type Variants
- **`card`** (default): Adds rounded corners, border, background, and padding
  ```css
  rounded-xl border bg-pgBackground-0 p-4
  ```
- **`list`**: Minimal styling for list contexts

#### Layout Variants
- **`horizontal`** (default): Icon, content, and controls in a row
- **`vertical`**: Stacked layout with icon/toggle at top

### Customization Options

```tsx
// Custom styling with design system tokens
<IntegrationToggle
  className="bg-pgBlue-50 border-pgBlue-200"
  title="Custom Integration"
  // ... other props
/>

// Responsive customization
<IntegrationToggle
  className="lg:p-6 xl:p-8"
  variant="vertical"
  // ... other props
/>
```

## Responsive Design

The component adapts to our breakpoint system:

- **Mobile-first**: Default horizontal layout works well on mobile
- **Tablet (md: 768px+)**: Optimal for both variants
- **Desktop (lg: 1024px+)**: Horizontal layout provides better space utilization
- **Large screens (xl: 1280px+)**: Card variant benefits from increased padding

```tsx
// Responsive variant switching
<IntegrationToggle
  variant="vertical"
  className="md:variant-horizontal"
  // ... other props
/>
```

## Accessibility

### ARIA Considerations
- Uses semantic HTML structure with proper heading hierarchy
- Icon containers have appropriate `flex items-center justify-center` for visual alignment
- Supports custom ARIA attributes through `HTMLAttributes` extension

### Keyboard Navigation
- Inherits focus management from child components (buttons, toggles)
- Proper focus indicators through design system focus utilities
- Logical tab order maintained through DOM structure

### Screen Reader Support
- Title uses `<h4>` semantic heading element
- Description content properly associated with title
- Badge information is accessible through Badge component

## Dependencies

### Internal Components
- **`Badge`**: For status indicators (`@/components/ui/badge`)
- **`Typography`**: For consistent text styling (`@/components/ui/typography`)

### Utilities
- **`cn`**: Class name utility (`@/lib/utils/cn`)
- **`cva`**: Class variance authority for variant management

### External Dependencies
- **`class-variance-authority`**: For variant-based className generation
- **React**: Core React functionality

### Recommended Pairings
- **`Switch`**: For toggle controls
- **`Button`**: For action buttons
- **Icon components**: For integration branding
- **`Card`**: Can be nested for complex layouts