# PlanList Component

## Purpose

The `PlanList` component displays a responsive grid of pricing plan cards, designed for showcasing subscription or service tiers. It includes support for recommended badges, pricing display with formatting, feature lists with checkmarks, and custom actions. The component follows the design system's card-based layout patterns and includes a fallback skeleton state for loading scenarios.

## Props Interface

### PlanList Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the wrapper |
| `plans` | `PlanItem[]` | Required | Array of plan objects to display |

### PlanItem Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Required | Display name of the plan |
| `recommended` | `boolean` | Required | Whether to show the "Recommended" badge |
| `priceHint` | `string \| null` | Required | Optional text shown above price (e.g., "starting at") |
| `price` | `number` | Required | Numeric price value in USD cents |
| `period` | `string` | Required | Billing period description |
| `action` | `ReactNode` | Optional | Custom action element (typically a button) |
| `limits` | `ReactNode[]` | Required | Array of feature/limit descriptions |

### PlanListFallback Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the skeleton wrapper |

## Usage Example

```tsx
import { PlanList, ORGANIZATION_PLAN, PlanItem } from '@/components/ui/plan-list';
import { Button } from '@/components/ui/button';

const plans: PlanItem[] = [
  {
    name: 'Starter Plan',
    recommended: false,
    priceHint: null,
    price: 2900, // $29.00
    period: 'month',
    action: (
      <Button className='w-full' variant='primary'>
        Get Started
      </Button>
    ),
    limits: [
      'Up to 10,000 API requests',
      'Basic support',
      'Standard data access',
      'Email notifications'
    ]
  },
  {
    name: 'Professional Plan',
    recommended: true,
    priceHint: 'most popular',
    price: 9900, // $99.00
    period: 'month',
    action: (
      <Button className='w-full' variant='primary'>
        Choose Professional
      </Button>
    ),
    limits: [
      'Up to 100,000 API requests',
      'Priority support',
      'Advanced data access',
      'Real-time notifications',
      'Custom integrations'
    ]
  },
  ORGANIZATION_PLAN // Pre-configured enterprise plan
];

function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <PlanList plans={plans} className="mb-8" />
    </div>
  );
}

// Loading state usage
function PricingPageWithLoading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {isLoading ? (
        <PlanListFallback />
      ) : (
        <PlanList plans={plans} />
      )}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Plan Names**: `.typography-headlines18` - Used for plan titles
- **Price Display**: `.typography-headlines24` - Large pricing emphasis
- **Price Hints**: `.typography-paragraphXSmall` - Subtle text above pricing
- **Period Text**: `.typography-paragraphXSmall` - Billing period information
- **Section Headers**: `.typography-labelSmall` - "This includes:" section labels
- **Feature Lists**: `.typography-paragraphXSmall` - Individual feature descriptions

### Color System
- **Card Backgrounds**: `bg-pgBackgroundWhiteInv-950` - Adaptive card background
- **Recommended Badge**: `bg-pgStateAway-light` with `text-pgStateAway-dark`
- **Price Emphasis**: `text-pgBlueVSGold` - Brand color for pricing
- **Muted Text**: `color='600'` and `color='700'` props via Typography component
- **Borders**: `border-pgStroke-200` - Subtle section dividers
- **Check Icons**: `bg-pgText-300` with `text-pgBackgroundWhiteInv-950`

### Layout & Spacing
- **Card Padding**: `p-6` - Consistent internal spacing
- **Card Borders**: `rounded-[1.25rem]` - Large border radius for modern appearance
- **Gap Spacing**: `gap-4` between cards and internal elements
- **Margin Utilities**: `mt-4`, `mt-8` for vertical rhythm

## Styling

### Card Variants
- **Standard Card**: Default styling with rounded borders and background
- **Recommended Card**: Includes highlighted badge with away state colors
- **Skeleton Card**: Loading state with `h-80` fixed height

### Customization Options
- **Wrapper Classes**: Apply additional styling via `className` prop
- **Custom Actions**: Any ReactNode can be used for plan actions
- **Flexible Content**: Feature limits accept ReactNode for rich content
- **Conditional Spacing**: Automatic spacing adjustments based on content presence

### State Variations
- **Loading State**: `PlanListFallback` with skeleton placeholders
- **Recommended State**: Visual emphasis with colored badge
- **Action States**: Custom button styling through action prop

## Responsive Design

### Grid Behavior
- **Auto-fit Grid**: `grid-cols-[repeat(auto-fit,minmax(252px,1fr))]`
- **Minimum Width**: Cards maintain 252px minimum width
- **Fluid Columns**: Automatically adjusts column count based on available space
- **Consistent Gaps**: 16px gap (`gap-4`) maintained across all breakpoints

### Breakpoint Adaptations
- **Mobile (< 640px)**: Single column layout
- **Tablet (640px+)**: 2-column layout when space allows
- **Desktop (1024px+)**: Up to 3+ columns based on container width
- **Large Screens (1440px+)**: Maximum effective columns with proper spacing

## Accessibility

### Semantic Structure
- **Proper Headings**: Plan names use `<h3>` elements with headline typography
- **List Semantics**: Features rendered as proper `<ul>` and `<li>` elements
- **Interactive Elements**: Action buttons maintain full accessibility via Button component

### Visual Accessibility
- **Color Contrast**: All text meets WCAG contrast requirements
- **Focus Management**: Interactive elements inherit focus styles from Button component
- **Screen Reader Support**: Semantic HTML structure supports assistive technology

### Content Accessibility
- **Descriptive Labels**: Clear pricing and feature descriptions
- **Status Indicators**: "Recommended" badge provides clear preference guidance
- **Logical Reading Order**: Content flows naturally for screen readers

## Dependencies

### Internal Components
- **Button**: `@/components/ui/button` - Action elements and interactive states
- **Typography**: `@/components/ui/typography` - Consistent text styling and hierarchy
- **Skeleton**: `@/components/ui/skeleton` - Loading state placeholders

### Internal Icons
- **PiCheckLine**: `@/components/icons` - Feature list checkmark icons

### Utilities
- **cn**: `@/lib/utils/cn` - Conditional className utility
- **SUPPORT_EMAIL**: `@/lib/constants` - Contact email for organization plan

### External Dependencies
- **React**: Core component functionality and TypeScript interfaces
- **Intl.NumberFormat**: Built-in currency formatting for consistent price display