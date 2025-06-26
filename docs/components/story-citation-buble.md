# StoryCitationBubble Component

## Purpose

The `StoryCitationBubble` component renders a tooltip-style citation bubble that displays story information including an image, source reference, publication date, and title. It's designed to provide rich preview information for story citations within the answers system, appearing as a hover tooltip to give users context about referenced stories.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its dependencies on interactive UI components like `TooltipContent` and data fetching hooks that require client-side execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clusterId` | `string` | ✅ | Unique identifier for the story cluster to display |
| `isAuthorizedAndVerified` | `boolean` | ✅ | Whether the current user has authorized and verified access |
| `isPublic` | `boolean` | ✅ | Whether the story is publicly accessible |
| `token` | `AccessToken` | ❌ | Access token for authenticated requests |
| `url` | `string` | ❌ | Source URL to extract domain information for media reference |

## Usage Example

```tsx
import { StoryCitationBubble } from '@/components/answers/story-citation-bubble';

// Within an answer component with citation tooltips
function AnswerWithCitations() {
  return (
    <div className="answer-content">
      <p>
        According to recent reports 
        <Tooltip>
          <TooltipTrigger>
            <span className="citation-link">[1]</span>
          </TooltipTrigger>
          <StoryCitationBubble
            clusterId="story-123"
            isAuthorizedAndVerified={true}
            isPublic={false}
            token={userToken}
            url="https://example.com/article"
          />
        </Tooltip>
        the market has shown significant growth.
      </p>
    </div>
  );
}

// For public stories
<StoryCitationBubble
  clusterId="public-story-456"
  isAuthorizedAndVerified={false}
  isPublic={true}
  url="https://news.example.com/breaking-news"
/>
```

## Functionality

- **Story Data Retrieval**: Fetches story information using the provided cluster ID and authorization parameters
- **Image Display**: Shows story image with fallback handling for missing or failed image loads
- **Source Attribution**: Displays media source reference with domain extraction from provided URL
- **Temporal Context**: Shows relative publication date with 72-hour threshold formatting
- **Responsive Layout**: Constrains content within a maximum width tooltip container
- **Error Handling**: Throws descriptive error when story data is not found

## State Management

**TanStack Query**: Uses `useStoryByIdSuspense` hook for server state management
- Fetches story data based on cluster ID and authorization parameters
- Implements Suspense pattern for loading states
- Provides automatic caching and revalidation
- Handles authentication context through token and authorization flags

## Side Effects

- **Data Fetching**: Makes API calls to retrieve story information through the query hook
- **Error Throwing**: Throws errors when story data is unavailable, triggering error boundaries
- **Domain Extraction**: Processes URL to extract domain information for source reference
- **Date Calculation**: Computes relative publication dates based on current time

## Dependencies

### UI Components
- `TooltipContent` - Container for tooltip display
- `StoryImageWithFallback` - Image component with error handling
- `MediaSourceReferenceBuilder` - Source attribution display
- `Typography` - Text styling and semantic markup

### Hooks & Services
- `useStoryByIdSuspense` - Story data fetching with Suspense
- `getPubDate` - Date formatting utility
- `extractDomain` - URL processing utility

### Types
- `AccessToken` - Authentication token interface
- `DATE_72_HOURS` - Time threshold constant

## Integration

The component integrates into the answers system as a citation mechanism:

- **Answer Citations**: Embedded within answer text to provide source references
- **Tooltip System**: Works with the application's tooltip infrastructure for hover interactions
- **Authentication Flow**: Respects user authorization and content access permissions
- **Media Pipeline**: Connects to the story and media source systems for content retrieval

## Best Practices

✅ **Server State Management**: Uses TanStack Query for efficient data fetching and caching

✅ **Component Decomposition**: Composes from smaller UI components following the Lego block principle

✅ **Error Handling**: Implements proper error boundaries through error throwing for missing data

✅ **Responsive Design**: Uses flexible layouts with constraints for various screen sizes

✅ **Performance Optimization**: 
- Uses `fill` and `sizes` props for optimized image loading
- Implements Suspense for better loading experiences

✅ **Type Safety**: Fully typed props interface with proper TypeScript usage

✅ **Accessibility**: Uses semantic HTML through Typography components and proper image handling

✅ **Separation of Concerns**: Delegates specific functionality to specialized components and utilities

The component follows our architectural guidelines by maintaining a flat component structure, using appropriate state management patterns, and composing from reusable UI components while handling the specific domain logic for story citations.