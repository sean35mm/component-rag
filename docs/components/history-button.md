# StoryHistoryButton Component

## Purpose

The `StoryHistoryButton` component provides a clickable button interface that allows users to open a story history drawer. It displays a history icon with a tooltip and handles user interactions to view the historical versions or changes of a story. This component serves as an entry point for accessing story versioning functionality within the story viewing interface.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive click handlers with `useCallback`
- Integrates with browser-based analytics tracking
- Uses client-side context (`useStoryHistoryDrawer`) for drawer state management
- Requires event handling for user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes to apply to the button component |
| `story` | `StoryWithPageInfo` | Required | Story object containing story data and page information used for analytics tracking |

## Usage Example

```tsx
import { StoryHistoryButton } from '@/components/story/history-button';

function StoryToolbar({ story }: { story: StoryWithPageInfo }) {
  return (
    <div className="flex items-center gap-2">
      <StoryHistoryButton 
        story={story}
        className="ml-auto"
      />
      {/* Other story action buttons */}
    </div>
  );
}

// In a story page component
function StoryPage({ story }: { story: StoryWithPageInfo }) {
  return (
    <div className="story-container">
      <header className="story-header">
        <h1>{story.title}</h1>
        <StoryHistoryButton story={story} />
      </header>
      {/* Story content */}
    </div>
  );
}
```

## Functionality

- **History Access**: Provides a single-click interface to open the story history drawer
- **Visual Feedback**: Displays a history icon (`PiHistoryLine`) with hover states
- **Accessibility**: Includes tooltip text ("View History") for better user experience
- **Analytics Integration**: Automatically tracks when users access story history
- **Responsive Design**: Supports custom styling through className prop

## State Management

The component uses **Context-based state management**:
- Leverages `useStoryHistoryDrawer` context hook to control drawer visibility
- Does not maintain local state - delegates drawer state to the global context
- Follows the single responsibility principle by only handling the trigger action

## Side Effects

- **Analytics Tracking**: Calls `StoryPageTracker.historyDrawerOpened(story)` when button is clicked to track user engagement
- **Drawer State Mutation**: Modifies global drawer state through context when activated
- **Event Propagation**: Handles click events and may prevent default browser behaviors

## Dependencies

### Components
- `TooltipButton` - Base UI component providing button with tooltip functionality
- `PiHistoryLine` - Icon component from the icons collection

### Hooks & Context
- `useStoryHistoryDrawer` - Context hook for managing history drawer state
- `useCallback` - React hook for memoizing the click handler

### Services
- `StoryPageTracker` - Analytics service for tracking story-related user interactions

### Types
- `StoryWithPageInfo` - Type definition for story objects with page metadata

## Integration

The component integrates into the larger application architecture by:

- **Story Interface**: Part of the story viewing/editing interface alongside other story action buttons
- **Analytics Pipeline**: Feeds user interaction data into the application's analytics system
- **Drawer System**: Works with a global drawer management system for consistent UI patterns
- **Context Architecture**: Utilizes the application's context-based state management for cross-component communication

## Best Practices

✅ **Architectural Compliance**:
- Uses client components appropriately for interactive functionality
- Follows component decomposition with single responsibility (only handles history button logic)
- Leverages existing UI components (`TooltipButton`) for consistency
- Implements proper separation of concerns with context for state management

✅ **Performance Optimizations**:
- Uses `useCallback` to prevent unnecessary re-renders of the click handler
- Minimal prop interface reduces re-render frequency
- Delegates complex state management to context rather than local state

✅ **User Experience**:
- Provides clear visual feedback with icons and tooltips
- Implements consistent interaction patterns with other UI components
- Integrates analytics tracking for product insights

✅ **Maintainability**:
- Clear prop interface with TypeScript definitions
- Composable design that works with various story contexts
- Centralized analytics tracking through dedicated service layer