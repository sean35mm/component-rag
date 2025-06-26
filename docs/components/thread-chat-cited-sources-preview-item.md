# Thread Chat Cited Sources Preview Item Component

## Purpose

The `thread-chat-cited-sources-preview-item` component renders preview cards for cited sources in AI thread conversations. It handles different citation types (generic web sources, news articles, and stories) with adaptive loading states, error boundaries, and authentication-aware data fetching. This component provides a unified interface for displaying source citations with thumbnails, metadata, and interactive previews.

## Component Type

**Client Component** - Uses 'use client' directive due to:
- Interactive click handlers and callbacks
- Suspense boundaries with dynamic data fetching
- Access token context consumption
- Error boundary implementations
- Client-side state management for loading states

## Props Interface

### CitationPreview (Main Component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `citation` | `AnswersThreadHistoryItemCitation` | ✅ | Citation data object containing type and metadata |
| `onArticleClick` | `(articleId: string, url: string, title: string) => void` | ✅ | Callback when article citations are clicked |
| `className` | `string` | ❌ | Additional CSS classes |
| `showDescription` | `boolean` | ❌ | Whether to display source descriptions |
| `description` | `string` | ❌ | Custom description text |
| `now` | `Date` | ✅ | Current date for relative time calculations |
| `displayIndex` | `number` | ✅ | Citation number to display in bubble |
| `size` | `'xs' \| 's' \| 'm'` | ✅ | Preview card size variant |
| `hideImage` | `boolean` | ❌ | Whether to hide the thumbnail image |

### GenericCitedPreview

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `citation` | `AnswersThreadHistoryGenericCitation` | ✅ | Generic citation with title, URL, and optional image |
| All base props | `AnswersThreadChatCitedSourcesPreviewItemPropsBase` | ✅ | Common preview item properties |

### CitedNewsPreview

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleId` | `string` | ✅ | Article identifier for data fetching |
| `pubDate` | `Date` | ✅ | Article publication date |
| `title` | `string` | ✅ | Article title for fallback display |
| `onArticleClick` | `(articleId: string, url: string, title: string) => void` | ✅ | Article click handler |
| All base props | `AnswersThreadChatCitedSourcesPreviewItemPropsBase` | ✅ | Common preview item properties |

### CitedStoryPreview

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `citation` | `AnswersThreadHistoryStoryCitation` | ✅ | Story citation with metadata |
| `clusterId` | `string` | ✅ | Story cluster identifier |
| `title` | `string` | ✅ | Story title for fallback display |
| `pubDate` | `Date` | ✅ | Story publication/update date |
| All base props | `AnswersThreadChatCitedSourcesPreviewItemPropsBase` | ✅ | Common preview item properties |

## Usage Example

```tsx
import { CitationPreview } from '@/components/answers/thread-chat-cited-sources-preview-item';
import { AnswersThreadHistoryItemCitation, CitationType } from '@/lib/types';

function ThreadCitations() {
  const citations: AnswersThreadHistoryItemCitation[] = [
    {
      type: CitationType.ARTICLE,
      articleId: 'article-123',
      title: 'Breaking News Article',
      pubDate: new Date('2024-01-15'),
      displayIndex: 1,
      url: 'https://example.com/article'
    },
    {
      type: CitationType.GENERIC,
      title: 'Web Source',
      url: 'https://example.com',
      displayIndex: 2,
      image: { src: '/image.jpg', alt: 'Source image' }
    }
  ];

  const handleArticleClick = (articleId: string, url: string, title: string) => {
    // Track article interaction
    analytics.track('citation_clicked', { articleId, title });
    // Navigate or open article
  };

  return (
    <div className="space-y-3">
      {citations.map((citation, index) => (
        <CitationPreview
          key={`${citation.type}-${citation.displayIndex}`}
          citation={citation}
          onArticleClick={handleArticleClick}
          now={new Date()}
          displayIndex={citation.displayIndex}
          size="m"
          showDescription={true}
          className="border border-gray-200 rounded-lg"
        />
      ))}
    </div>
  );
}

// Size variants usage
function CompactCitations() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <CitationPreview size="xs" {...props} /> {/* Compact grid view */}
      <CitationPreview size="s" {...props} />  {/* Medium density */}
      <CitationPreview size="m" {...props} />  {/* Full details */}
    </div>
  );
}

// With custom styling and hidden images
function MinimalCitations() {
  return (
    <CitationPreview
      {...props}
      hideImage={true}
      showDescription={false}
      className="bg-gray-50 hover:bg-gray-100"
    />
  );
}
```

## Functionality

### Core Features
- **Multi-type Citation Support**: Handles generic web sources, news articles, and story clusters
- **Adaptive Loading**: Suspense-based loading with skeleton fallbacks
- **Authentication Awareness**: Shows appropriate content based on user permissions
- **Error Resilience**: Error boundaries with graceful fallback displays
- **Responsive Sizing**: Three size variants (xs, s, m) for different layouts
- **Interactive Elements**: Click handling with external link navigation

### Visual Components
- **Citation Bubbles**: Numbered indicators showing citation order
- **Thumbnail Images**: Article/story images with fallbacks to favicons
- **Metadata Display**: Source domains, publication dates, labels
- **Typography Hierarchy**: Structured title, description, and metadata layout

### Content Adaptation
- **Dynamic Descriptions**: Conditional description display with line clamping
- **Date Formatting**: Relative time display with 72-hour threshold
- **Domain Extraction**: Automatic source domain identification
- **Paywall Indicators**: Visual cues for paywalled content

## State Management

### TanStack Query Integration
```tsx
// Article data fetching
const { data: article } = useArticleByIdSuspense(
  articleId,
  isAuthorizedAndVerified,
  isPublic,
  token
);

// Story data fetching
const { data: story } = useStoryByIdSuspense(
  clusterId,
  isAuthorizedAndVerified,
  isPublic,
  token
);
```

### Context Dependencies
- **Access Token Context**: Authentication state and token management
- **Suspense State**: Loading states managed by React Suspense
- **Error State**: Error boundaries handle failed data fetching

### Local State
- **Memoized Images**: Optimized image rendering for generic citations
- **Click Handlers**: Callback memoization for performance

## Side Effects

### Data Fetching
- **Conditional Loading**: Only fetches data when user is authorized or content is public
- **Suspense Integration**: Throws promises for React Suspense handling
- **Error Throwing**: Explicit errors for missing data to trigger error boundaries

### External Interactions
- **Link Navigation**: Opens citation sources in new tabs with security attributes
- **Analytics Tracking**: Article click events through provided callbacks
- **Image Loading**: Progressive image loading with fallback mechanisms

## Dependencies

### Internal Components
- `AnswersThreadCitationBubble` - Citation number indicators
- `ArticleImageWithFallback` - Article thumbnail handling
- `StoryImageWithFallback` - Story thumbnail handling
- `MediaSourceReferenceBuilder` - Source metadata display
- `ErrorBoundary` - Error handling wrapper
- `Skeleton` - Loading state placeholders

### UI Components
- `Typography` - Text styling and hierarchy
- `ImageWithFallback` - Image loading with fallbacks
- `Favicon` - Domain favicon display
- `SearchFilterTagBase` - Label/tag display

### Hooks and Utilities
- `useAccessToken` - Authentication context
- `useArticleByIdSuspense` - Article data fetching
- `useStoryByIdSuspense` - Story data fetching
- `getPubDate` - Date formatting utility
- `extractDomain` - URL parsing utility

## Integration

### Thread Chat Architecture
```
ThreadChat
├── ThreadMessages
│   ├── AIMessage
│   │   ├── MessageContent
│   │   └── CitedSources
│   │       └── CitationPreview (this component)
│   └── UserMessage
└── ThreadInput
```

### Citation Flow
1. **AI Response Generation**: Creates citations during answer generation
2. **Citation Processing**: Categorizes citations by type (article, story, generic)
3. **Rendering Pipeline**: Suspense → Data Fetch → Content Display → Error Handling
4. **User Interaction**: Click tracking and navigation handling

### Authentication Integration
- **Authorized Users**: Full content access with complete data fetching
- **Public Access**: Limited content with fallback displays
- **Unauthorized**: Skeleton fallbacks without sensitive data

## Best Practices

### Component Architecture Adherence
- **Lego Block Design**: Composable sub-components for different citation types
- **Error Boundaries**: Graceful degradation for failed data loading
- **Suspense Integration**: Proper loading state management
- **Context Usage**: Clean separation of authentication concerns

### Performance Optimization
```tsx
// Memoized image rendering
const image = useMemo(
  () => props.citation.image ? (
    <PreviewThumbnail image={props.citation.image} />
  ) : (
    <Favicon src={props.citation.url} />
  ),
  [props.citation.image, props.citation.url]
);

// Callback memoization
const handleArticleClick = useCallback(() => {
  onArticleClick(article.articleId, article.url, article.title);
}, [article, onArticleClick]);
```

### Accessibility Considerations
- **Semantic HTML**: Proper anchor tags with security attributes
- **Alt Text**: Comprehensive image descriptions
- **Keyboard Navigation**: Standard link navigation patterns
- **Screen Reader Support**: Structured content hierarchy

### Data Loading Strategy
- **Progressive Enhancement**: Shows fallbacks before data loads
- **Error Resilience**: Multiple fallback layers for failed requests
- **Authentication Awareness**: Respects user permissions throughout the flow