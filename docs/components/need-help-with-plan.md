# NeedHelpWithPlan Component

## Purpose

The `NeedHelpWithPlan` component provides a visual help section for users who need assistance with their billing plans. It displays contact information and encourages users to reach out to the support team via email. This component is designed to be used within billing or settings sections to provide easy access to customer support.

## Component Type

**Server Component** - This is a server component as it doesn't require any client-side interactivity, state management, or browser APIs. It renders static content with styling and a mailto link, making it suitable for server-side rendering.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { NeedHelpWithPlan } from '@/components/settings/billing/need-help-with-plan';

// Basic usage in a billing settings page
export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Other billing components */}
      <div className="space-y-4">
        <h2>Need Assistance?</h2>
        <NeedHelpWithPlan />
      </div>
    </div>
  );
}

// Usage in a plan selection page
export default function PlanSelectionPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Plan selection components */}
      
      {/* Help section at the bottom */}
      <div className="mt-8">
        <NeedHelpWithPlan />
      </div>
    </div>
  );
}
```

## Functionality

- **Visual Appeal**: Displays an attractive card layout with gradient background and proper spacing
- **Contact Information**: Shows support email with a clickable mailto link
- **Responsive Design**: Adapts layout from vertical (mobile) to horizontal (desktop) orientation
- **Iconography**: Uses chat and mail icons to enhance visual communication
- **Typography Hierarchy**: Employs consistent typography variants for clear information hierarchy

## State Management

**No State Management** - This component is purely presentational and maintains no internal state. It renders static content and doesn't require any state management solutions.

## Side Effects

**Minimal Side Effects** - The only side effect is the mailto link which opens the user's default email client when clicked. No API calls or other external interactions are performed.

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiChatSmile2Fill, PiMailLine icons
- `@/components/ui/typography` - Typography component for consistent text rendering
- `@/lib/constants` - SUPPORT_EMAIL constant

### External Dependencies
- `react` - FC (FunctionComponent) type

## Integration

This component fits into the billing and settings architecture as a support touchpoint:

```
Settings/Billing Flow:
├── Billing Dashboard
├── Plan Management
├── Payment Methods
└── Support Section (NeedHelpWithPlan) ← This component
```

**Integration Points:**
- **Billing Pages**: Provides support contact in billing-related sections
- **Settings Layout**: Can be embedded in various settings pages
- **Plan Selection**: Offers assistance during plan decision-making
- **Support Flow**: Acts as an entry point to customer support

## Best Practices

✅ **Adherence to Architecture Guidelines:**

- **Server Component Usage**: Correctly implemented as a server component since no client-side features are needed
- **Component Decomposition**: Flat structure using UI components (Typography) as building blocks
- **Reusability**: Self-contained component that can be dropped into any billing/settings context
- **Consistent Styling**: Uses design system classes and typography variants
- **Responsive Design**: Implements mobile-first responsive patterns

✅ **Implementation Best Practices:**

- **Accessibility**: Uses semantic HTML structure and proper color contrast
- **Performance**: Minimal bundle impact with no unnecessary client-side code
- **Maintainability**: Centralizes support email in constants file
- **Design System**: Leverages typography component and design tokens
- **Responsive Layout**: Uses Tailwind's responsive utilities for adaptive design

✅ **Usage Recommendations:**

- Place in billing/settings sections where users might need support
- Consider pairing with FAQ sections or help documentation
- Use consistently across all plan-related pages for unified UX
- Ensure SUPPORT_EMAIL constant is kept up-to-date