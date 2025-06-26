# ArticlePreview Component

## Purpose

The `ArticlePreview` component displays a comprehensive preview of a news article within the story explorer interface. It provides users with article metadata, AI-generated summaries, author information, source details, and actions like sharing, reporting issues, and viewing the full article. This component serves as a detailed preview panel that helps users evaluate article relevance before navigating to the external source.

## Component Type

**Client Component** - Uses `'use client'` directive due to:
- Interactive state management (summary expansion, clamping detection)
- Event handlers for user interactions (share, report, view article)
- Framer Motion animations and resize observers
- Dynamic content rendering based on user permissions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `article` | `Article` | ✅ | The article object containing all article data (title, URL, summary, authors, etc.) |
| `isSummaryExpanded` | `boolean` | ✅ | Controls whether the article summary is expanded or collapsed |
| `story` | `StoryWithPageInfo` | ✅ | The parent story context for analytics tracking |
| `onIsSummaryExpandedChange` | `(expanded: boolean) => void` | ✅ | Callback fired when summary expansion state changes |
| `showHighlights` | `boolean` | ❌ | Optional flag to show highlighted content (currently unused) |

## Usage Example

```tsx
import { ArticlePreview } from '@/components/story/article-explorer/article-preview';

function ArticleExplorer({ story, selectedArticle }) {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  return (
    <div className="article-explorer">
      {selectedArticle && (
        <ArticlePreview
          article={selectedArticle}
          story={story}
          isSummaryExpanded={isSummaryExpanded}
          onIsSummaryExpandedChange={setIsSummaryExpanded}
          showHighlights={true}
        />
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Article Metadata Display**: Shows title, source, authors, and content labels
- **AI Summary**: Displays AI-generated article summary with expand/collapse functionality
- **Image Preview**: Article thumbnail with fallback handling
- **Interactive Actions**: Share, report issues, copy summary, and view full article
- **Permission-Based Rendering**: Conditionally renders author details based on user access level
- **Responsive Layout**: Adapts to different screen sizes with proper spacing

### Text Clamping Logic
- **Smart Truncation**: Uses `isNodeClamped` utility to detect when content overflows
- **Dynamic Controls**: Shows expand/collapse buttons only when content is actually clamped
- **Resize Handling**: Automatically recalculates clamping on container resize

### Animation & UX
- **Smooth Transitions**: Framer Motion animations for component entrance/exit
- **Visual Feedback**: Loading states and fallbacks for async content
- **Accessibility**: Proper semantic HTML and tooltip support

## State Management

### Local State
- **`isClamped`**: Tracks whether summary text is truncated (managed via `useState`)
- **Summary Expansion**: Controlled by parent component through props

### External State
- **User Access**: Consumed from `useAccessToken` context
- **Report Dialog**: Managed through `useReportIssueDialog` context

### No Server State
- Does not directly manage server state; relies on article data passed as props

## Side Effects

### Analytics Tracking
- **Article View Events**: Tracks when users click "View Article"
- **Share Dialog Events**: Records share button interactions
- **Report Issue Events**: Logs issue reporting attempts

### DOM Interactions
- **Resize Observer**: Monitors element dimensions for clamping detection
- **External Navigation**: Opens article URLs in new tabs

### Context Updates
- **Report Issue Dialog**: Triggers global dialog state changes

## Dependencies

### UI Components
- `Button`, `LinkButton`, `CopyButton` - Interactive elements
- `Typography` - Text rendering with consistent styling
- `AiTag`, `SearchFilterTagBase` - Content labeling
- `ArticleImageWithFallback` - Image handling with fallbacks
- `TooltipProvider` - Enhanced accessibility

### Feature Components
- `ArticlePreviewAuthorPreview` - Author information display
- `ArticlePreviewSourcePreview` - Source metadata rendering
- `ShareButtonWithDialog`, `ReportIssueButton` - Action components

### Hooks & Utilities
- `useResizeObserver` - Element dimension tracking
- `useAccessToken`, `useReportIssueDialog` - Context consumption
- `StoryPageTracker` - Analytics event tracking

### External Libraries
- `framer-motion` - Animations and transitions
- `pluralize` - Text pluralization

## Integration

### Story Explorer Architecture
- **Preview Panel**: Functions as the detailed view within article explorer
- **Parent Coordination**: Receives article data and state controls from parent
- **Analytics Integration**: Reports user interactions back to story tracking system

### Permission System
- **Access Control**: Adapts content based on user authorization level
- **Progressive Enhancement**: Shows additional features for verified users

### Global Context Integration
- **Report System**: Integrates with application-wide issue reporting
- **Authentication**: Respects user access levels for content display

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Uses composition over deep nesting
- ✅ **Domain Organization**: Located in story-specific directory structure
- ✅ **Separation of Concerns**: UI logic separated from business logic
- ✅ **Reusable Utilities**: Exports `isNodeClamped` for reuse

### State Management Patterns
- ✅ **Controlled Components**: Summary expansion controlled by parent
- ✅ **Context Usage**: Leverages contexts for cross-cutting concerns
- ✅ **Local State Scope**: Keeps DOM-related state local to component

### Performance Considerations
- ✅ **Lazy Loading**: Uses Suspense for author preview components
- ✅ **Memoized Callbacks**: Event handlers wrapped with `useCallback`
- ✅ **Conditional Rendering**: Avoids unnecessary component mounting

### User Experience
- ✅ **Progressive Disclosure**: Expand/collapse for long content
- ✅ **Loading States**: Fallbacks for async operations
- ✅ **Accessibility**: Semantic HTML and tooltip support