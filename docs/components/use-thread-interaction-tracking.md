# use-thread-interaction-tracking Hook

## Purpose
A collection of custom React hooks that provide analytics tracking functionality for thread-based interactions in the answers feature. These hooks enable tracking of user interactions such as article views, drawer openings, filter applications, and suggestion clicks with proper access mode determination and conditional tracking based on shared mode.

## Component Type
**Client Component Hook** - Uses React hooks (`useCallback`) and client-side analytics tracking. These hooks are designed to be used within client components that handle user interactions and need to track analytics events.

## Props Interface

### useTrackArticleViewed
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isSharedMode` | `boolean` | ✅ | Whether the thread is in shared mode (determines if tracking should occur) |

**Returns**: `(threadId: string, answerId: string, articleId: string, url: string, title: string, source: 'CITED_SOURCES_DRAWER' \| 'SOURCE_BUILDER') => Promise<void>`

### useTrackCitedSourceDrawerOpened
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isSharedMode` | `boolean` | ✅ | Whether the thread is in shared mode |

**Returns**: `(threadId: string, answerId: string, source: 'INLINE' \| 'SOURCE_BUILDER') => Promise<void>`

### useTrackFiltersDrawerOpened
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isSharedMode` | `boolean` | ✅ | Whether the thread is in shared mode |

**Returns**: `(threadId: string \| null) => Promise<void>`

### useTrackFiltersDrawerApplied
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isSharedMode` | `boolean` | ✅ | Whether the thread is in shared mode |

**Returns**: `(threadId: string \| null, filters: FiltersState) => Promise<void>`

### useTrackPrimarySuggestionClick / useTrackSecondarySuggestionClick
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isSharedMode` | `boolean` | ✅ | Whether the thread is in shared mode |

**Returns**: `(threadId: string \| null, item: NextStepRecommendationType) => Promise<void>`

## Usage Example

```tsx
'use client';

import { useState } from 'react';
import {
  useTrackArticleViewed,
  useTrackCitedSourceDrawerOpened,
  useTrackFiltersDrawerOpened,
  useTrackPrimarySuggestionClick
} from '@/components/hooks/use-thread-interaction-tracking';

export default function ThreadInteractions() {
  const [isSharedMode] = useState(true);
  
  // Initialize tracking hooks
  const trackArticleViewed = useTrackArticleViewed(isSharedMode);
  const trackCitedSourceDrawerOpened = useTrackCitedSourceDrawerOpened(isSharedMode);
  const trackFiltersDrawerOpened = useTrackFiltersDrawerOpened(isSharedMode);
  const trackPrimarySuggestionClick = useTrackPrimarySuggestionClick(isSharedMode);

  const handleArticleClick = async () => {
    await trackArticleViewed(
      'thread-123',
      'answer-456',
      'article-789',
      'https://example.com/article',
      'Sample Article Title',
      'CITED_SOURCES_DRAWER'
    );
  };

  const handleSourceDrawerOpen = async () => {
    await trackCitedSourceDrawerOpened(
      'thread-123',
      'answer-456',
      'INLINE'
    );
  };

  const handleFiltersOpen = async () => {
    await trackFiltersDrawerOpened('thread-123');
  };

  const handleSuggestionClick = async (suggestion: NextStepRecommendationType) => {
    await trackPrimarySuggestionClick('thread-123', suggestion);
  };

  return (
    <div>
      <button onClick={handleArticleClick}>View Article</button>
      <button onClick={handleSourceDrawerOpen}>Open Sources</button>
      <button onClick={handleFiltersOpen}>Open Filters</button>
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Tracking**: Only tracks events when `isSharedMode` is true
- **Access Mode Detection**: Automatically determines public/private access mode
- **Event Mapping**: Transforms suggestion data into proper event format
- **Type Safety**: Provides strongly typed tracking functions
- **Promise-based**: All tracking functions return promises for proper async handling

### Tracking Events
- **Article Views**: Tracks when users view articles from various sources
- **Drawer Interactions**: Monitors opening of source and filter drawers
- **Filter Applications**: Records when users apply filter changes
- **Suggestion Clicks**: Tracks primary and secondary suggestion interactions

## State Management
- **No Internal State**: These hooks don't manage internal state
- **Context Integration**: Uses `useAccessToken` context for access mode determination
- **Memoization**: Uses `useCallback` to prevent unnecessary re-renders

## Side Effects
- **Analytics Tracking**: Sends events to `AnswersThreadPageTracker`
- **External API Calls**: May trigger analytics service calls
- **Conditional Execution**: Only executes tracking in shared mode

## Dependencies

### Internal Dependencies
- `@/lib/analytics/event-trackers` - Analytics tracking infrastructure
- `@/lib/contexts` - Access token context
- `@/lib/types` - Type definitions

### External Dependencies
- `react` - For hooks functionality

### Related Types
- `AnswersThreadPageSuggestionClickedEventExtra`
- `AccessMode`
- `FiltersState`
- `NextStepActionType`
- `NextStepRecommendationType`

## Integration

### Application Architecture Role
- **Analytics Layer**: Provides standardized tracking interface for thread interactions
- **Feature Integration**: Used across thread-related components for consistent tracking
- **Access Control**: Respects sharing permissions and access modes

### Usage Patterns
```tsx
// In a thread component
const ThreadComponent = ({ threadId, isShared }: ThreadProps) => {
  const trackArticleViewed = useTrackArticleViewed(isShared);
  
  // Use tracking in event handlers
  const handleArticleInteraction = useCallback(async (articleData) => {
    await trackArticleViewed(threadId, ...articleData);
  }, [trackArticleViewed, threadId]);
  
  return <ArticleList onArticleClick={handleArticleInteraction} />;
};
```

## Best Practices

### Architectural Compliance
- ✅ **Single Responsibility**: Each hook handles one specific tracking concern
- ✅ **Composition**: Hooks can be combined in components as needed
- ✅ **Type Safety**: Strong typing throughout with proper interfaces
- ✅ **Performance**: Proper memoization with `useCallback`

### Usage Guidelines
- **Conditional Tracking**: Always pass correct `isSharedMode` parameter
- **Error Handling**: Consider wrapping tracking calls in try-catch blocks
- **Performance**: Use the returned functions in memoized callbacks
- **Consistency**: Use appropriate tracking hooks for corresponding user actions

### Integration Best Practices
```tsx
// ✅ Good: Memoized usage
const trackArticle = useTrackArticleViewed(isSharedMode);
const handleClick = useCallback(async (data) => {
  try {
    await trackArticle(...data);
  } catch (error) {
    console.warn('Tracking failed:', error);
  }
}, [trackArticle]);

// ❌ Avoid: Direct inline usage without memoization
<button onClick={() => useTrackArticleViewed(isSharedMode)(...)}>
```

This hook collection follows our architectural guidelines by providing focused, reusable tracking functionality that integrates seamlessly with the application's analytics infrastructure while maintaining proper separation of concerns.