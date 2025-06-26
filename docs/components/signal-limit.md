# SignalLimit Component

## Purpose

The `SignalLimit` component displays a warning notification when users have reached their maximum allowable active signals during the beta period. It provides visual feedback about signal limitations and guides users on how to activate additional signals by pausing existing ones.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Integrates with Framer Motion for animations
- Consumes client-side context (`useUsageContext`)
- Renders conditionally based on real-time usage state

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the component |

## Usage Example

```tsx
import { SignalLimit } from '@/components/signals/signal-limit';

// Basic usage in a signals dashboard
function SignalsDashboard() {
  return (
    <div className="signals-container">
      <SignalLimit />
      {/* Other signal-related components */}
    </div>
  );
}

// With custom styling
function CustomSignalsView() {
  return (
    <div>
      <SignalLimit className="mb-6 mx-4" />
      <SignalsList />
    </div>
  );
}

// In a layout with specific spacing
function SignalsLayout() {
  return (
    <main className="container mx-auto">
      <h1>Signal Management</h1>
      <SignalLimit className="my-8" />
      <SignalControls />
    </main>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Only displays when `activeSignalsRemaining` equals 0
- **Smooth Animations**: Entry animation using Framer Motion with opacity and vertical slide
- **Responsive Design**: Adaptive icon sizing and spacing for different screen sizes
- **Theme Support**: Dark mode compatible styling using theme-aware color classes
- **Accessibility**: Clear warning message with appropriate semantic structure

### Visual Elements
- **Warning Icon**: `PiErrorWarningFill` icon to indicate the limitation
- **Alert Styling**: Red-themed background (`pgRed-50`/`pgRed-950`) for visual prominence
- **Typography Hierarchy**: Structured heading and description text
- **Responsive Layout**: Flexible spacing and sizing across devices

## State Management

**Context-Based State**: 
- Consumes `useUsageContext` to access `activeSignalsRemaining` value
- No local state management required
- Reactive to context state changes for real-time updates

## Side Effects

**No Direct Side Effects** - The component is purely presentational and:
- Does not trigger API calls
- Does not modify application state
- Only responds to state changes from the usage context

## Dependencies

### Internal Dependencies
- `@/components/icons` - `PiErrorWarningFill` icon component
- `@/components/ui/typography` - Typography component for consistent text styling
- `@/lib/contexts` - `useUsageContext` hook for usage data
- `@/lib/utils/cn` - Utility for conditional class name merging

### External Dependencies
- `framer-motion` - Animation library for smooth transitions
- `react` - Core React functionality (implicit)

## Integration

### Application Architecture Role
- **Feature Component**: Domain-specific component for signal management features
- **Notification Layer**: Acts as a contextual alert within signal interfaces
- **Usage Monitoring**: Integrates with the application's usage tracking system
- **User Guidance**: Provides actionable feedback for limit management

### Context Integration
```tsx
// Typical context structure this component expects
interface UsageContextType {
  activeSignalsRemaining: number;
  // other usage-related properties...
}
```

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features  
✅ **Component Decomposition**: Single responsibility focused on limit notification  
✅ **Reusable Design**: Accepts className prop for flexible styling integration  
✅ **Context Integration**: Leverages established context patterns for state access  

### Implementation Patterns
✅ **Conditional Rendering**: Efficiently renders only when needed  
✅ **Responsive Design**: Mobile-first approach with responsive breakpoints  
✅ **Animation Performance**: Uses optimized Framer Motion animations  
✅ **Theme Consistency**: Follows established design system color patterns  

### Usage Guidelines
- Place near signal creation interfaces for immediate feedback
- Ensure `useUsageContext` is available in the component tree
- Consider placement within form flows to prevent user frustration
- Use default styling unless specific design requirements necessitate overrides