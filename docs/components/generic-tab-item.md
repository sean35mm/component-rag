# GenericTabItem Component

## Purpose

The `GenericTabItem` component renders individual tab items within a tab manager interface. It provides a clickable tab with a close button, supporting navigation and tab management functionality. The component handles active/inactive states, displays appropriate tab names based on type, and enables users to close tabs through an integrated close button.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Event handlers for mouse interactions (click and close events)
- Interactive state management for hover effects
- Client-side navigation integration with NextLink

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActive` | `boolean` | ✅ | Determines if the tab is currently active/selected |
| `href` | `string` | ✅ | Navigation URL for the tab link |
| `type` | `TabOptionType` | ✅ | Tab type identifier used for mapping to default names |
| `onClose` | `(genericTabType: TabOptionType) => void` | ✅ | Callback function triggered when the close button is clicked |
| `name` | `string` | ✅ | Custom display name for the tab (falls back to default if empty) |

## Usage Example

```tsx
import { GenericTabItem, TAB_TO_NAME } from '@/components/main-layout/tabs-manager/generic-tab-item';
import { TabOptions } from '@/lib/types';

function TabsManager() {
  const handleTabClose = (tabType: TabOptionType) => {
    // Handle tab closure logic
    console.log(`Closing tab: ${tabType}`);
  };

  return (
    <div className="flex">
      <GenericTabItem
        isActive={true}
        href="/answers"
        type={TabOptions.ANSWER}
        onClose={handleTabClose}
        name="Custom Answers Tab"
      />
      
      <GenericTabItem
        isActive={false}
        href="/explore"
        type={TabOptions.SEARCH}
        onClose={handleTabClose}
        name="" // Will use default "Explore" from TAB_TO_NAME
      />
    </div>
  );
}

// Accessing default tab names
const defaultAnswersName = TAB_TO_NAME[TabOptions.ANSWER]; // "Answers"
```

## Functionality

### Core Features
- **Navigation Integration**: Seamlessly integrates with Next.js routing via NextLink
- **Close Functionality**: Provides a close button with proper event handling to prevent navigation conflicts
- **Active State Management**: Visual distinction between active and inactive tabs
- **Name Resolution**: Supports custom names with fallback to predefined tab names
- **Hover Effects**: Interactive styling for better user experience

### Visual States
- **Active Tab**: Elevated appearance with border-bottom removal and lighter background
- **Inactive Tab**: Standard appearance with hover effects
- **Close Button**: Hover state changes for clear interaction feedback

## State Management

**Local State Only** - The component uses:
- `useMemo` for efficient name resolution between custom and default names
- `useCallback` for optimized event handler memoization
- No external state management (TanStack Query or Zustand) as it's a pure presentation component

## Side Effects

### Event Handling
- **Click Prevention**: Close button click prevents tab navigation
- **Event Propagation**: Stops close event from bubbling to parent elements
- **Navigation**: Integrates with Next.js client-side routing

### Performance Optimizations
- Memoized name computation to prevent unnecessary re-renders
- Callback memoization for stable event handler references

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiCloseLine icon component
- `@/components/ui/typography` - Typography component for text rendering
- `@/lib/types` - TabOptions and TabOptionType definitions
- `@/lib/utils/cn` - Utility for conditional class name concatenation

### External Dependencies
- `next/link` - NextLink for client-side navigation
- `react` - Core React functionality and hooks

## Integration

### Tab Manager System
- **Parent Integration**: Designed to be used within tab manager containers
- **Navigation Flow**: Integrates with application routing system
- **State Communication**: Communicates tab closure events to parent components

### Design System Integration
- **Typography System**: Uses standardized Typography component
- **Color Tokens**: Leverages design system color tokens (pgNeutral-*)
- **Icon System**: Integrates with application icon library

## Best Practices

### Architecture Adherence
✅ **Client Component Justification**: Appropriately uses client-side rendering for interactive functionality  
✅ **Component Decomposition**: Single responsibility focused on tab item rendering  
✅ **Reusability**: Generic design allows usage across different tab contexts  
✅ **Performance**: Implements proper memoization patterns  

### Implementation Patterns
- **Event Handler Optimization**: Uses useCallback for stable references
- **Conditional Styling**: Leverages cn utility for clean conditional classes
- **Type Safety**: Strongly typed props interface with required/optional distinctions
- **Accessibility**: Semantic HTML structure with proper interactive elements

### Integration Guidelines
- Use within tab manager containers for proper layout context
- Ensure parent components handle the onClose callback appropriately
- Leverage TAB_TO_NAME export for consistent tab naming across the application
- Combine with other tab management components for complete navigation experience