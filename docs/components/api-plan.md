# ApiPlan Component Documentation

## Purpose

The `ApiPlan` component displays subscription plan information for API users, including billing cycle details, subscription costs, and plan management functionality. It provides a comprehensive overview of the user's current API plan with visual emphasis through gradient styling and easy access to billing management.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes the `useSubscriptionDetails` hook for dynamic data fetching
- Requires client-side interactivity for real-time subscription data
- Manages loading states with skeleton components

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `BlockProps` | No | All props from the Block component are passed through, allowing customization of the container styling and behavior |

**Inherited from BlockProps:**
- Standard Block component props for layout, styling, and accessibility
- Extends standard HTML div attributes

## Usage Example

```tsx
import { ApiPlan } from '@/components/developers/api-plan';

// Basic usage
function DeveloperDashboard() {
  return (
    <div className="grid gap-6">
      <ApiPlan />
    </div>
  );
}

// With additional Block props
function CustomApiPlan() {
  return (
    <ApiPlan 
      className="custom-plan-styling"
      data-testid="api-plan-card"
    />
  );
}

// In a grid layout
function BillingOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ApiPlan />
      {/* Other billing components */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Plan Information Display**: Shows current subscription plan name with optional hint badges
- **Billing Cycle Tracking**: Displays when the current billing cycle ends
- **Cost Breakdown**: Shows subscription price with billing frequency
- **Plan Management**: Direct link to billing management interface
- **Loading States**: Skeleton loading for asynchronous data
- **Visual Hierarchy**: Gradient background with warm color scheme for emphasis

### Data Presentation
- Formats dates using `date-fns` for consistent date display
- Uses number formatting for currency display
- Conditional rendering based on data availability
- Badge system for plan hints and metadata

## State Management

### External State
- **useSubscriptionDetails Hook**: Fetches and manages subscription configuration data
- **Server State**: Subscription details are likely managed through TanStack Query within the hook
- **No Local State**: Component is purely presentational with external data dependency

### Data Flow
```tsx
useSubscriptionDetails() → config → {
  meta: {
    name: string,
    hint?: string,
    date: { value: string },
    price: number,
    period: string
  }
}
```

## Side Effects

### External Interactions
- **Navigation**: Links to `/account/billing` for plan management
- **Data Fetching**: Subscription details fetched through the custom hook
- **Date Formatting**: Client-side date formatting using `date-fns`

### Loading Behavior
- Displays skeleton components while subscription data loads
- Graceful fallbacks for missing data (empty strings, zero values)

## Dependencies

### Internal Dependencies
- `useSubscriptionDetails` - Custom hook for subscription data
- `Block` - UI container component
- `Button`, `Badge`, `Typography`, `Skeleton` - UI components
- `PiBankCard2Line` - Icon component

### External Dependencies
- `date-fns/format` - Date formatting utility
- `next/link` - Next.js navigation
- Subscription constants for formatting and labels

### Type Dependencies
- `BlockProps` - TypeScript interface from Block component

## Integration

### Application Architecture
- **Domain**: Developers section, specifically for API subscription management
- **Layout**: Designed to fit within dashboard grid layouts
- **Navigation**: Integrates with account/billing flow
- **Theming**: Supports dark/light mode through CSS custom properties

### Data Architecture
- Relies on centralized subscription state management
- Follows the pattern of presentational components consuming hook-provided data
- Fits into the broader billing and account management system

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Uses Block as base, composes UI elements flatly  
✅ **State Management**: Leverages custom hook for server state management  
✅ **Reusability**: Built on reusable UI components from `/ui/`  
✅ **Domain Organization**: Properly placed in `/developers/` domain folder  

### Design Patterns
✅ **Prop Spreading**: Correctly spreads BlockProps for extensibility  
✅ **Conditional Rendering**: Handles loading and missing data states  
✅ **Accessibility**: Uses semantic HTML and proper Typography variants  
✅ **Responsive Design**: Flexible layout that adapts to container size  

### Performance Considerations
✅ **Loading States**: Implements skeleton loading for better UX  
✅ **Efficient Rendering**: Minimal re-renders through proper data dependencies  
✅ **Lazy Loading**: Uses Next.js Link for optimized navigation  

### Code Quality
✅ **TypeScript**: Properly typed with interface inheritance  
✅ **Constants**: Uses centralized formatting constants  
✅ **Error Handling**: Graceful fallbacks for undefined data  
✅ **Styling**: Consistent with design system patterns