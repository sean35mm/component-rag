# StatusBadge Component

## Purpose

The `StatusBadge` is a visual indicator component that displays status information with consistent styling and iconography. It provides clear visual feedback for different states (completed, pending, failed, disabled) with appropriate colors, icons, and styling variants to communicate status at a glance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `status` | `'completed' \| 'pending' \| 'failed' \| 'disabled'` | No | `'completed'` | Determines the status state and associated colors/icons |
| `variant` | `'light' \| 'stroke'` | No | `'light'` | Controls the visual style variant of the badge |
| `withDot` | `boolean` | No | `false` | When true, shows a dot icon instead of status-specific icons |
| `children` | `React.ReactNode` | No | - | The text content to display in the badge |
| `className` | `string` | No | - | Additional CSS classes to apply |

*Extends `React.HTMLAttributes<HTMLDivElement>` for standard HTML div attributes*

## Usage Example

```tsx
import { StatusBadge } from '@/components/ui/status-badge';

function TaskList() {
  return (
    <div className="space-y-4">
      {/* Completed status */}
      <StatusBadge status="completed">
        Task Completed
      </StatusBadge>

      {/* Pending with stroke variant */}
      <StatusBadge status="pending" variant="stroke">
        Awaiting Review
      </StatusBadge>

      {/* Failed status */}
      <StatusBadge status="failed">
        Deployment Failed
      </StatusBadge>

      {/* Disabled state */}
      <StatusBadge status="disabled">
        Feature Disabled
      </StatusBadge>

      {/* With dot indicator */}
      <StatusBadge status="pending" withDot>
        In Progress
      </StatusBadge>

      {/* Custom styling */}
      <StatusBadge 
        status="completed" 
        className="ml-2"
      >
        Custom Badge
      </StatusBadge>
    </div>
  );
}
```

## Design System Usage

### Typography
- **Primary Text**: `.typography-labelXSmall` - Ensures consistent, readable text sizing for badge labels

### Colors
The component uses our semantic state color tokens:

- **Success State**: `pgStateSuccess-lighter` (background), `pgStateSuccess-base` (text/icon)
- **Warning State**: `pgStateWarning-lighter` (background), `pgStateWarning-base` (text/icon)
- **Error State**: `pgStateError-light` (background), `pgStateError-base` (text/icon)
- **Faded State**: `pgStateFaded-lighter` (background), `pgStateFaded-base` (text/icon)
- **Stroke Variant**: `pgStroke-200` (border), `pgBackgroundWhiteInv-800` (background), `pgText-600` (text)

### Tailwind Utilities
- **Layout**: `inline-flex`, `items-center`
- **Spacing**: `p-1`, `pr-2`, `mr-1`, `ml-1`, `mr-0.5`
- **Border**: `rounded-md`, `border`, `border-transparent`
- **Interactions**: `transition-colors`, `pointer-events-none` (disabled)

## Styling

### Variants

#### Light Variant (Default)
```tsx
<StatusBadge variant="light" status="completed">
  Completed Task
</StatusBadge>
```
- Transparent border
- Colored background based on status
- High contrast text and icons

#### Stroke Variant
```tsx
<StatusBadge variant="stroke" status="pending">
  Pending Review
</StatusBadge>
```
- Visible border with `pgStroke-200`
- Neutral background
- Consistent text styling

### Status States

| Status | Background | Text/Icon | Use Case |
|--------|------------|-----------|----------|
| `completed` | `pgStateSuccess-lighter` | `pgStateSuccess-base` | Successful operations, finished tasks |
| `pending` | `pgStateWarning-lighter` | `pgStateWarning-base` | In-progress items, awaiting action |
| `failed` | `pgStateError-light` | `pgStateError-base` | Errors, failed operations |
| `disabled` | `pgStateFaded-lighter` | `pgStateFaded-base` | Inactive features, disabled states |

### Icon Mapping
- **Completed**: `PiCheckboxCircleFill` - Checkmark circle
- **Pending**: `PiAlertFill` - Alert triangle
- **Failed**: `PiErrorWarningFill` - Error warning
- **Disabled**: `PiForbidFill` - Forbidden circle
- **Dot Mode**: `PiCircleFill` - Simple dot indicator

## Responsive Design

The component uses relative sizing units and maintains consistent appearance across all breakpoints:

- **Mobile (sm)**: Compact spacing with readable text
- **Tablet (md-lg)**: Standard sizing maintains visual hierarchy
- **Desktop (xl-2xl)**: Consistent proportions with surrounding content

The `typography-labelXSmall` class ensures text remains legible at all screen sizes while maintaining design consistency.

## Accessibility

### ARIA Considerations
- **Semantic HTML**: Uses `div` with appropriate role implications
- **Color Independence**: Icons provide visual meaning beyond color alone
- **Focus Management**: Supports keyboard navigation when interactive

### Recommended Enhancements
```tsx
<StatusBadge 
  status="failed" 
  role="status" 
  aria-label="Deployment failed"
>
  Deployment Failed
</StatusBadge>
```

### Disabled State
- Automatically applies `pointer-events-none` for disabled status
- Uses faded colors to indicate inactive state
- Maintains readability with appropriate contrast ratios

## Dependencies

### Internal Dependencies
- **Icons**: `@/components/icons` - Phosphor icon components
- **Utilities**: `@/lib/utils/cn` - Conditional className utility
- **Styling**: `class-variance-authority` - Variant management

### Design System Dependencies
- **State Colors**: Semantic color tokens for consistent status representation
- **Typography System**: Label typography scale for text sizing
- **Spacing System**: Tailwind spacing utilities for consistent layout

### Related Components
- Use with **Button** components for actionable status indicators
- Combine with **Card** components for status summaries
- Integrate with **List** components for status tracking interfaces