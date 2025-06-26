# MobileAccessibilityHint Component

## Purpose

The MobileAccessibilityHint component provides visual accessibility indicators for mobile views, specifically showing when content is publicly accessible. It conditionally renders accessibility hints based on the current route and thread sharing status, helping users understand the visibility level of the content they're viewing.

## Component Type

**Client Component** - Uses the `'use client'` directive because it relies on:
- Next.js `usePathname` hook for route detection
- Zustand store (`useTabsStore`) for client-side state management
- Dynamic pathname-based conditional rendering

## Props Interface

### MobileAccessibilityHint
```typescript
// No props - component determines behavior from route context
```

### AnswersAccessibilityHint
```typescript
// No props - internal component used by MobileAccessibilityHint
```

### AccessibilityHint
```typescript
// No props - pure UI component displaying the accessibility indicator
```

## Usage Example

```tsx
import { MobileAccessibilityHint } from '@/components/main-layout/navigation/mobile-accessibility-hint';

// In a mobile layout component
export const MobileNavigation = () => {
  return (
    <div className="mobile-nav">
      {/* Navigation content */}
      <MobileAccessibilityHint />
    </div>
  );
};

// The component automatically handles route detection:
// - Shows "Public" indicator on shared member threads
// - Shows "Public" indicator on shared answer threads
// - Shows nothing on private content
```

## Functionality

### Route-Based Rendering
- **Shared Member Threads**: Automatically displays accessibility hint when pathname matches shared member thread routes
- **Answer Threads**: Conditionally displays hint based on thread sharing status
- **Other Routes**: Renders nothing for non-applicable routes

### Visual Indicator
- Displays eye icon with "Public" text
- Consistent styling with background highlight
- Responsive design optimized for mobile viewports

## State Management

### Zustand Store Integration
```typescript
const { tabs } = useTabsStore(); // Access current tab state
```

### TanStack Query for Server State
```typescript
const { data: thread } = useAnswersThreadById(entityId!, {
  enabled: !!entityId,
}); // Fetch thread data to determine sharing status
```

## Side Effects

### API Interactions
- **Thread Data Fetching**: Queries thread information to determine sharing status
- **Conditional Queries**: Only fetches when entity ID is available

### Route Monitoring
- Continuously monitors pathname changes to update visibility
- No direct side effects - purely reactive to route state

## Dependencies

### Internal Dependencies
```typescript
// UI Components
import { PiEyeLine } from '@/components/icons';
import { Typography } from '@/components/ui/typography';

// State Management
import { useTabsStore } from '@/lib/contexts';
import { useAnswersThreadById } from '@/lib/query-hooks';

// Utilities
import { TabOptions } from '@/lib/types';
import { GENERIC_TABS_TO_HREF, tabToHref } from '@/lib/utils/tab-type-to-href';
```

### External Dependencies
```typescript
import { usePathname } from 'next/navigation'; // Next.js routing
```

## Integration

### Navigation System Integration
- Part of the main layout navigation structure
- Specifically designed for mobile accessibility patterns
- Integrates with tab-based navigation system

### Route Architecture Integration
```typescript
// Route pattern matching
pathname.startsWith(GENERIC_TABS_TO_HREF[TabOptions.SHARED_MEMBER_THREAD])
pathname.startsWith(GENERIC_TABS_TO_HREF[TabOptions.ANSWER])
```

### State Architecture Integration
- Leverages centralized tab state management
- Utilizes standardized query patterns for server state
- Follows consistent entity ID resolution patterns

## Best Practices

### Component Architecture Adherence

✅ **Lego Block Design**: Three distinct components with clear separation of concerns
- `MobileAccessibilityHint`: Route orchestration
- `AnswersAccessibilityHint`: Answer-specific logic
- `AccessibilityHint`: Pure UI component

✅ **Appropriate Client Component Usage**: Uses `'use client'` only where necessary for routing and state access

✅ **State Management Patterns**: 
- TanStack Query for server state (thread data)
- Zustand for client state (tabs)
- No unnecessary local state

✅ **Conditional Rendering**: Efficient early returns prevent unnecessary processing

### Performance Optimizations
```typescript
// Memoized entity ID resolution
const entityId = useMemo(
  (): string | null =>
    tabs.find((it) => tabToHref(it) === pathname)?.metadata.entityId ?? null,
  [pathname, tabs]
);

// Conditional query execution
const { data: thread } = useAnswersThreadById(entityId!, {
  enabled: !!entityId, // Only fetch when needed
});
```

### Accessibility Best Practices
- Uses semantic icon with descriptive text
- Provides clear visual indication of content visibility
- Maintains consistent styling with design system
- Optimized for mobile screen readers