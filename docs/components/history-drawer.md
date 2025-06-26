# HistoryDrawer Component

## Purpose

The `HistoryDrawer` component provides a modal drawer interface for displaying story history and AI-generated changes. It serves as a wrapper around the core `History` component, providing access control, responsive design, and error handling for viewing chronological story modifications tracked and summarized by AI.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive drawer state through context
- Handles responsive breakpoint detection
- Requires client-side Sheet/modal functionality
- Manages user authentication state for conditional rendering

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clusterId` | `string` | ✅ | Unique identifier for the story cluster to fetch history for |
| `createdAt` | `string \| Date` | ✅ | Creation timestamp used for history filtering and ordering |

> **Note**: This component inherits from `HistoryProps` but omits authentication-related props (`isAuthorizedAndVerified`, `isPublic`, `token`) as these are handled internally via context.

## Usage Example

```tsx
import { HistoryDrawer } from '@/components/story/history-drawer/history-drawer';
import { useStoryHistoryDrawer } from '@/lib/contexts';

function StoryPage({ story }) {
  const { handleIsOpen } = useStoryHistoryDrawer();

  return (
    <div>
      {/* Story content */}
      <button onClick={() => handleIsOpen(true)}>
        View History
      </button>
      
      {/* History drawer - renders when open */}
      <HistoryDrawer 
        clusterId={story.clusterId}
        createdAt={story.createdAt}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Responsive Design**: Adapts layout and sizing based on screen size (lg breakpoint)
- **Access Control**: Conditionally renders history based on user authorization and story visibility
- **Error Handling**: Wraps history content in ErrorBoundary with custom fallback
- **Loading States**: Shows loading UI during data fetching and unauthorized states
- **Modal Management**: Provides full-screen drawer experience with proper accessibility

### UI Behavior
- **Drawer Positioning**: Appears from the right with rounded left corners
- **Dynamic Sizing**: Responsive width (`sheetLgBounded` on large screens, `sheetLg` on smaller)
- **Header Styling**: Contextual title sizing and AI tag indicator
- **Scrollable Content**: History content area with proper overflow handling
- **Footer Actions**: Close button with full-width styling

## State Management

### Context Dependencies
- **`useStoryHistoryDrawer`**: Zustand-based state for drawer open/close management
- **`useAccessToken`**: Authentication context providing user authorization status

### State Flow
```tsx
// Drawer state management
const { isOpen, handleIsOpen } = useStoryHistoryDrawer();

// Authentication state
const { isAuthorizedAndVerified, isPublic, token } = useAccessToken();
```

## Side Effects

### Conditional Rendering
- Performs authorization checks on each render to determine content visibility
- Dynamically switches between loading states and actual history content

### Responsive Behavior
- Uses `useBreakpoint('lg')` hook to adjust UI elements based on screen size
- No direct API calls (delegated to child `History` component)

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose`
- `Button`, `AiTag`, `ErrorBoundary`

### Feature Components
- `History` - Core history display logic
- `HistoryLoader` - Loading state component
- `HistoryErrorFallback` - Error state component

### Hooks & Contexts
- `useBreakpoint` - Responsive design hook
- `useAccessToken` - Authentication context
- `useStoryHistoryDrawer` - Drawer state management

## Integration

### Application Architecture
```
StoryPage/StoryView
├── Story Content
├── History Trigger Button
└── HistoryDrawer (modal overlay)
    └── History (data fetching & display)
        ├── HistoryLoader (loading state)
        └── HistoryErrorFallback (error state)
```

### Context Integration
- Integrates with global authentication state for access control
- Uses dedicated drawer state management for modal behavior
- Coordinates with responsive design system for optimal UX

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive modal functionality

✅ **Component Decomposition**: Separates concerns by wrapping focused `History` component rather than implementing all logic inline

✅ **State Management**: Follows patterns by using Zustand context for drawer state and authentication context for access control

✅ **Error Handling**: Implements proper error boundaries with custom fallback components

✅ **Reusability**: Clean props interface allowing reuse across different story contexts

### Performance Optimizations
- Uses `Suspense` for progressive loading of history data
- Conditional rendering prevents unnecessary `History` component mounting
- Responsive hook prevents excessive re-renders

### Accessibility
- Proper semantic structure with Sheet components providing ARIA support
- Keyboard navigation support through Sheet primitives
- Clear visual hierarchy with appropriate heading levels