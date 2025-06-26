# CreateSignalButton Component

## Purpose

The `CreateSignalButton` is a specialized action button that provides a streamlined interface for users to create new signals within the application. It intelligently handles different creation flows based on the user's current usage limits and provides a consistent entry point for signal creation across the platform.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes browser-side navigation with Next.js `useRouter`
- Handles click events and user interactions
- Accesses client-side context for usage tracking
- Manages conditional routing logic based on user state

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `hideIcon` | `boolean` | No | `false` | Controls visibility of the flashlight icon next to the button text |
| `...rest` | `ButtonProps` | No | - | All standard Button component props (variant, size, disabled, etc.) |

*Extends all props from the base `Button` component through prop spreading.*

## Usage Example

```tsx
import { CreateSignalButton } from '@/components/signals/create-signal-button';

// Basic usage
function SignalsDashboard() {
  return (
    <div className="dashboard-header">
      <CreateSignalButton />
    </div>
  );
}

// With custom styling and hidden icon
function CompactToolbar() {
  return (
    <div className="toolbar">
      <CreateSignalButton 
        hideIcon 
        size="sm"
        className="w-full"
      />
    </div>
  );
}

// With custom button props
function FeaturedSignalSection() {
  return (
    <CreateSignalButton
      size="lg"
      disabled={isLoading}
      className="mt-4 px-8"
    />
  );
}
```

## Functionality

### Core Features
- **Smart Navigation**: Automatically routes to `/signals/create` when user has remaining signal capacity
- **Usage-Aware Behavior**: Triggers alternative creation flow when usage limits are reached
- **Visual Consistency**: Maintains consistent branding with specialty gold styling and flashlight icon
- **Flexible Display**: Optional icon hiding for compact layouts
- **Accessibility**: Inherits all accessibility features from the base Button component

### Behavior Logic
```tsx
// Navigation decision tree
if (activeSignalsRemaining === 0) {
  // Trigger upgrade/limit flow
  createSignal();
} else {
  // Navigate to creation form
  router.push('/signals/create');
}
```

## State Management

### External State Dependencies
- **Usage Context**: Consumes `activeSignalsRemaining` from `useUsageContext()` to determine available signal capacity
- **Router State**: Leverages Next.js router for programmatic navigation
- **Signal Creation Hook**: Utilizes `useSignalCreation()` for handling limit-exceeded scenarios

### State Flow
1. Component reads current usage limits from context
2. User clicks button
3. Component evaluates remaining capacity
4. Routes to appropriate flow (creation form vs. upgrade prompt)

## Side Effects

### Navigation Effects
- **Route Changes**: Programmatically navigates to `/signals/create` route
- **External Actions**: Triggers signal creation workflow through custom hook

### User Experience Effects
- **Immediate Feedback**: Button click provides instant response
- **Context-Aware Routing**: Users see appropriate next step based on their account status

## Dependencies

### Internal Dependencies
| Dependency | Purpose |
|------------|---------|
| `@/components/ui/button` | Base button functionality and styling |
| `@/components/icons` | Flashlight icon component |
| `@/lib/contexts` | Usage tracking and limits |
| `@/lib/hooks/use-signal-creation` | Signal creation workflow |
| `@/lib/utils/cn` | Class name utility |

### External Dependencies
- **Next.js Navigation**: `useRouter` for client-side routing
- **React**: Core component functionality

## Integration

### Application Architecture Role
- **Entry Point**: Primary interface for signal creation across the application
- **Usage Gateway**: Enforces usage limits and guides users through appropriate flows
- **Navigation Hub**: Connects dashboard/listing views to creation workflows

### Common Integration Patterns
```tsx
// Dashboard integration
<div className="dashboard-actions">
  <CreateSignalButton />
</div>

// Toolbar integration
<Toolbar>
  <CreateSignalButton hideIcon size="sm" />
</Toolbar>

// Empty state integration
<EmptyState
  title="No signals yet"
  action={<CreateSignalButton />}
/>
```

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive functionality  
✅ **Component Composition**: Extends base Button component rather than reimplementing  
✅ **Context Integration**: Leverages established context patterns for state access  
✅ **Hook Utilization**: Uses custom hooks for complex business logic  
✅ **Prop Spreading**: Maintains flexibility through prop forwarding  

### Implementation Patterns
- **Single Responsibility**: Focused solely on signal creation initiation
- **Conditional Logic**: Clean separation of navigation paths based on user state
- **Styling Consistency**: Uses established design tokens and utility classes
- **Accessibility**: Inherits semantic button behavior and keyboard navigation
- **Error Handling**: Delegates complex error scenarios to underlying hooks and contexts

### Performance Considerations
- **Minimal Re-renders**: Only re-renders when usage context changes
- **Efficient Navigation**: Uses Next.js optimized routing
- **Context Optimization**: Consumes only necessary context values