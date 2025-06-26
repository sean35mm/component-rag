# Navigation Component

## Purpose

The `Navigation` component provides responsive navigation functionality for the main layout. It conditionally renders different navigation interfaces based on the screen size - displaying a file display panel on desktop devices and mobile-specific navigation components on smaller screens.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires browser-side functionality for:
- Responsive breakpoint detection
- Dynamic rendering based on screen size
- Analytics tracking through heap

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { Navigation } from '@/components/main-layout/navigation/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-layout">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
```

## Functionality

- **Responsive Design**: Automatically switches between desktop and mobile navigation interfaces
- **Breakpoint Detection**: Uses the `lg` breakpoint to determine desktop vs mobile display
- **Analytics Integration**: Automatically initializes heap analytics tracking
- **Conditional Rendering**: Renders appropriate navigation components based on screen size

### Key Features:
- Desktop: Displays `FileDisplayPanel` for file navigation
- Mobile: Renders `MobileNavigation` with accessibility hints
- Seamless responsive transitions
- Built-in analytics tracking

## State Management

This component uses **external state sources**:
- **Breakpoint State**: Managed by the `useBreakpoint` hook for responsive behavior
- **Analytics State**: Managed by the `useHeap` hook for tracking initialization
- **No Local State**: Component is purely presentational based on external state

## Side Effects

- **Analytics Initialization**: The `useHeap` hook initializes analytics tracking on component mount
- **Responsive Listening**: The `useBreakpoint` hook sets up media query listeners for screen size changes

## Dependencies

### Hooks
- `useBreakpoint` - Detects current screen breakpoint
- `useHeap` - Initializes analytics tracking

### Components
- `FileDisplayPanel` - Desktop file navigation interface
- `MobileNavigation` - Mobile navigation interface
- `MobileAccessibilityHint` - Accessibility guidance for mobile users

## Integration

The Navigation component serves as a critical part of the main layout architecture:

```
MainLayout
├── Navigation (this component)
│   ├── FileDisplayPanel (desktop)
│   └── MobileNavigation + MobileAccessibilityHint (mobile)
└── Content Areas
```

### Architectural Role:
- **Layout Component**: Part of the main application shell
- **Responsive Orchestrator**: Manages navigation UX across device types
- **Analytics Gateway**: Ensures tracking is initialized for the application

## Best Practices

✅ **Follows Architecture Guidelines:**
- **Client Component Usage**: Appropriately uses client-side rendering for responsive behavior
- **Component Decomposition**: Delegates specific functionality to focused child components
- **Flat Structure**: Maintains simple conditional rendering without deep nesting
- **Hook Separation**: Uses dedicated hooks for breakpoint detection and analytics

✅ **Implementation Patterns:**
- **Single Responsibility**: Focuses solely on navigation orchestration
- **Responsive Design**: Handles mobile-first responsive patterns
- **Analytics Integration**: Follows centralized analytics initialization pattern
- **Accessibility**: Includes dedicated accessibility components for mobile users

✅ **Performance Considerations:**
- **Conditional Loading**: Only renders necessary components for current breakpoint
- **Hook Optimization**: Leverages efficient breakpoint detection
- **Minimal Re-renders**: Simple conditional logic minimizes unnecessary updates