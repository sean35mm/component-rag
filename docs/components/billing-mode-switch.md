# BillingModeSwitch Component

## Purpose

The `BillingModeSwitch` component provides a toggle interface for switching between monthly and annual billing modes in the application's billing settings. It displays a switch control with clear labeling and highlights the cost savings of annual billing (10% discount) to encourage users to choose the more cost-effective option.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires interactivity (switch toggling) and event handling that needs to run in the browser environment.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `disabled` | `boolean` | No | `false` | Disables the switch when true, preventing user interaction |
| `isMonthMode` | `boolean` | Yes | - | Current billing mode state (true for monthly, false for annual) |
| `onIsMonthModeChange` | `(isMonthMode: boolean) => void` | Yes | - | Callback function called when billing mode changes |

## Usage Example

```tsx
import { BillingModeSwitch } from '@/components/settings/billing/billing-mode-switch';
import { useState } from 'react';

function BillingSettings() {
  const [isMonthlyBilling, setIsMonthlyBilling] = useState(true);

  const handleBillingModeChange = (isMonthMode: boolean) => {
    setIsMonthlyBilling(isMonthMode);
    // Additional logic like updating pricing display, API calls, etc.
  };

  return (
    <div className="billing-settings">
      <h2>Billing Preferences</h2>
      <BillingModeSwitch
        isMonthMode={isMonthlyBilling}
        onIsMonthModeChange={handleBillingModeChange}
        disabled={false}
      />
    </div>
  );
}
```

## Functionality

- **Toggle Switch**: Provides an intuitive switch interface for billing mode selection
- **Visual Feedback**: Clear labeling shows "Annual pricing" with savings indicator
- **Accessibility**: Uses proper label association with `htmlFor` attribute and unique IDs
- **Controlled Component**: Operates as a controlled component requiring external state management
- **Savings Highlight**: Displays "10% savings" text to encourage annual billing selection
- **Disabled State**: Supports disabled state to prevent interaction when needed

## State Management

**Local State Only** - This component is purely presentational and stateless. It relies on:
- **Props-based state**: Receives current state via `isMonthMode` prop
- **Callback pattern**: Reports state changes via `onIsMonthModeChange` callback
- **Parent responsibility**: Parent components handle actual state persistence and business logic

## Side Effects

**No Direct Side Effects** - The component itself performs no side effects. However, it enables side effects through its callback:
- Parent components typically trigger API calls to update billing preferences
- May cause pricing recalculations in parent components
- Could trigger analytics events for billing mode changes

## Dependencies

### Internal Dependencies
- `@/components/ui/switch` - Core switch UI component
- `@/components/ui/typography` - Typography system for consistent text styling

### React Dependencies
- `useCallback` - Optimizes the change handler to prevent unnecessary re-renders
- `useId` - Generates unique IDs for accessibility compliance
- `FC` - TypeScript functional component type

## Integration

The `BillingModeSwitch` integrates into the billing settings flow:

```
Settings Page
├── BillingSettings (parent)
│   ├── PricingDisplay
│   ├── BillingModeSwitch ← This component
│   └── PaymentMethods
└── Other Settings
```

**Integration Points:**
- **Billing Forms**: Often used within billing configuration forms
- **Pricing Components**: Works alongside pricing displays that update based on mode
- **Settings Pages**: Integrated into user account and billing preference pages
- **Checkout Flows**: May appear in subscription upgrade/downgrade workflows

## Best Practices

### ✅ Architectural Adherence

- **Client Component Usage**: Correctly uses `'use client'` for interactive functionality
- **Component Decomposition**: Simple, focused component following single responsibility principle
- **Flat Architecture**: Minimal nesting, relies on composition with UI components
- **Controlled Pattern**: Implements controlled component pattern for predictable state management

### ✅ Implementation Best Practices

- **Accessibility**: Proper label association and unique ID generation
- **Performance**: Uses `useCallback` to prevent unnecessary re-renders
- **Type Safety**: Comprehensive TypeScript interface with clear prop definitions
- **Visual Design**: Clear visual hierarchy with savings indication

### ✅ Usage Recommendations

```tsx
// ✅ Good - Clear state management in parent
const [billingMode, setBillingMode] = useBillingMode();

<BillingModeSwitch
  isMonthMode={billingMode === 'monthly'}
  onIsMonthModeChange={(isMonth) => 
    setBillingMode(isMonth ? 'monthly' : 'annual')
  }
/>

// ❌ Avoid - Complex logic in callback
<BillingModeSwitch
  onIsMonthModeChange={(isMonth) => {
    // Too much logic here
    updatePricing();
    saveToAPI();
    trackAnalytics();
  }}
/>
```

This component exemplifies good architectural patterns by maintaining simplicity, clear separation of concerns, and proper integration with the larger billing system.