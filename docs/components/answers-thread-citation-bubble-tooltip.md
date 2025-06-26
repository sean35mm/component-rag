# AnswersThreadCitationBubbleTooltip

## Purpose

The `AnswersThreadCitationBubbleTooltip` component renders a rich tooltip that displays article information when hovering over citation bubbles in an answers thread. It provides users with a preview of the cited article including its image, source, publication date, and title without requiring navigation away from the current context.

## Component Type

**Client Component** - This component uses the `use client` directive implicitly through its dependencies. It requires client-side interactivity for tooltip display and uses TanStack Query hooks that need to run in the browser environment.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleId` | `string` | ✅ | Unique identifier for the article to display in the tooltip |
| `isAuthorizedAndVerified` | `boolean` | ✅ | Whether the current user has authorized and verified access |
| `isPublic` | `boolean` | ✅ | Whether the article is publicly accessible |
| `token` | `AccessToken` | ❌ | Authentication token for accessing protected articles |

## Usage Example

```tsx
import { AnswersThreadCitationBubbleTooltip } from '@/components/answers/answers-thread-citation-bubble-tooltip';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';

function AnswersThreadCitation({ 
  articleId, 
  citationNumber,
  userToken,
  isUserVerified 
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="citation-bubble">
          {citationNumber}
        </button>
      </TooltipTrigger>
      <AnswersThreadCitationBubbleTooltip
        articleId={articleId}
        isAuthorizedAndVerified={isUserVerified}
        isPublic={false}
        token={userToken}
      />
    </Tooltip>
  );
}

// Usage in answers thread
function AnswersThread({ threadData, userSession }) {
  return (
    <div className="answers-thread">
      <p>
        This information is supported by research findings.
        <AnswersThreadCitation
          articleId="article-123"
          citationNumber={1}
          userToken={userSession?.token}
          isUserVerified={userSession?.verified}
        />
      </p>
    </div>
  );
}
```

## Functionality

- **Article Data Display**: Fetches and displays comprehensive article information including title, source, and publication date
- **Image Handling**: Shows article thumbnail with fallback support for missing images
- **Source Attribution**: Displays media source information with domain and paywall indicators
- **Date Formatting**: Presents publication dates in a user-friendly format relative to current time
- **Error Handling**: Throws descriptive errors when articles cannot be found
- **Responsive Design**: Adapts to different screen sizes with maximum width constraints

## State Management

**TanStack Query**: Uses `useArticleByIdSuspense` hook for server state management:
- Fetches article data based on provided `articleId`
- Handles caching and background updates automatically
- Implements Suspense pattern for loading states
- Manages authorization and public access logic

No local state management required - component is purely presentational once data is loaded.

## Side Effects

- **API Calls**: Fetches article data through `useArticleByIdSuspense` hook
- **Suspense Boundary**: Component suspends rendering until article data is available
- **Error Throwing**: Throws errors that bubble up to nearest error boundary when article is not found

## Dependencies

### Internal Components
- `MediaSourceReferenceBuilder` - Displays source attribution with paywall indicators
- `ArticleImageWithFallback` - Handles article image display with fallback support
- `TooltipContent` - Provides styled tooltip container
- `Typography` - Consistent text styling throughout the tooltip

### Hooks & Utilities
- `useArticleByIdSuspense` - TanStack Query hook for article data fetching
- `getPubDate` - Utility for formatting publication dates

### Types
- `AccessToken` - Type definition for authentication tokens

## Integration

This component integrates into the larger answers system architecture:

- **Answers Thread**: Embedded within answer citations to provide article previews
- **Authentication System**: Respects user authorization and verification status
- **Content Management**: Works with the article content system to display rich previews
- **UI System**: Follows design system patterns for consistent tooltip styling
- **Query Layer**: Leverages centralized data fetching patterns through TanStack Query

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses TanStack Query for server state management
- Implements proper error handling with descriptive messages
- Separates concerns with dedicated UI components
- Uses TypeScript for type safety

✅ **Component Design Patterns**:
- Single responsibility (tooltip display only)
- Proper prop interface with clear types
- Suspense-based loading strategy
- Consistent styling through design system components

✅ **Performance Considerations**:
- Efficient image loading with `sizes` attribute
- Cached data fetching through TanStack Query
- Optimized re-renders through proper dependency management

✅ **Accessibility**:
- Semantic HTML structure
- Proper image alt text handling through ArticleImageWithFallback
- Consistent typography hierarchy