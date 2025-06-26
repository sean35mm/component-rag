# TopMentions Component

## Purpose

The `TopMentions` component displays an interactive accordion list of the most mentioned companies and people in a story cluster. It provides expandable sections for each mention with relevance filtering and analytics tracking, helping users explore key entities within news stories.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive accordion functionality with state management
- Animation effects via Framer Motion
- Event handlers for user interactions
- Browser-specific breakpoint detection
- Analytics tracking on user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the component |
| `companies` | `CompanyCount[]` | Yes | Array of companies with their mention counts |
| `people` | `PersonCount[]` | Yes | Array of people with their mention counts |
| `story` | `StoryWithPageInfo` | Yes | Story data including cluster ID for fetching mentions |

## Usage Example

```tsx
import { TopMentions } from '@/components/story/top-mentions/top-mentions';

function StoryPage({ story }: { story: StoryWithPageInfo }) {
  const companies = [
    { id: 'apple', name: 'Apple Inc.', count: 15 },
    { id: 'google', name: 'Google', count: 8 }
  ];
  
  const people = [
    { wikidataId: 'Q12345', name: 'John Doe', count: 12 },
    { wikidataId: 'Q67890', name: 'Jane Smith', count: 7 }
  ];

  return (
    <div className="space-y-6">
      <TopMentions
        story={story}
        companies={companies}
        people={people}
        className="mb-8"
      />
    </div>
  );
}
```

## Functionality

- **Expandable Mentions**: Interactive accordion interface for exploring mention details
- **Relevance Filtering**: Automatically filters out irrelevant mentions based on content analysis
- **Sorted Display**: Orders mentions by frequency count in descending order
- **Responsive Design**: Adapts typography and spacing based on screen size
- **Loading States**: Handles loading states while fetching mention data
- **Empty State Handling**: Gracefully handles cases with no relevant mentions
- **Visual Hierarchy**: Uses progress bars and counts to show relative importance
- **Smooth Animations**: Fade-in animations for better user experience

## State Management

- **TanStack Query**: Uses `useMentionsList` hook for fetching mention details from the API
- **Local State**: Manages derived state through `useMemo` for:
  - Processed company mentions with loading states
  - Processed people mentions with loading states
  - Filtered and sorted mention list
  - Maximum count for progress bar scaling
- **No Zustand**: Component doesn't require global state management

## Side Effects

- **API Calls**: Fetches detailed mention content for each company and person
- **Analytics Tracking**: Tracks mention expansion events via `StoryPageTracker.topMentionsItemExpanded()`
- **Breakpoint Detection**: Monitors screen size changes for responsive behavior

## Dependencies

### Hooks
- `useBreakpoint`: Responsive design utilities
- `useMentionsList`: TanStack Query hook for fetching mention data

### Components
- `MentionItem`: Individual mention display component
- `Typography`: Consistent text styling
- `PiHashtag`: Icon component

### External Libraries
- `@radix-ui/react-accordion`: Accessible accordion implementation
- `framer-motion`: Animation effects

### Types
- `CompanyCount`, `PersonCount`: Entity count interfaces
- `StoryWithPageInfo`: Story data structure
- `StoryMention`, `CompanyMention`, `PersonMention`: Internal mention types

## Integration

The component integrates into the story page architecture by:

- **Story Context**: Receives story data and entity lists from parent components
- **Analytics Layer**: Connects to the application's analytics tracking system
- **Query System**: Leverages the centralized TanStack Query setup for data fetching
- **Design System**: Uses consistent typography, spacing, and color tokens
- **Responsive Framework**: Integrates with the application's breakpoint system

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Client Component Usage**: Appropriately uses client-side rendering for interactive features
- **Component Decomposition**: Delegates mention rendering to `MentionItem` for better separation of concerns
- **State Management**: Uses TanStack Query for server state, local state for UI concerns
- **Reusability**: Accepts configurable props while maintaining focused responsibility

✅ **Performance Optimizations**:
- **Memoized Computations**: Uses `useMemo` for expensive filtering and sorting operations
- **Callback Optimization**: Uses `useCallback` for event handlers to prevent unnecessary re-renders
- **Conditional Rendering**: Only renders when mentions are available

✅ **User Experience**:
- **Loading States**: Shows appropriate loading states during data fetching
- **Accessibility**: Uses Radix UI accordion for keyboard navigation and screen reader support
- **Progressive Enhancement**: Gracefully degrades when no mentions are available
- **Analytics Integration**: Tracks user interactions for product insights