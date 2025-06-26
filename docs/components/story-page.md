# StoryPage Component

## Purpose

The `StoryPage` component is a comprehensive news story presentation component that renders a complete story page with all associated content including story header, content, statistics, gallery, mentioned entities, critical questions, and related articles. It serves as the main layout container for displaying detailed story information in both regular and preview modes.

## Component Type

**Server Component** - This is a server-side component that doesn't require client-side interactivity at the top level. While it contains many child components that may be client components, the main `StoryPage` component itself handles layout and composition server-side for optimal performance and SEO.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | ✅ | Complete story object with page info and selected articles |
| `lastArticle` | `Article \| null` | ✅ | Most recent article for the story, used in statistics |
| `showTopMentions` | `boolean` | ❌ | Whether to display mentioned people and companies (default: `true`) |
| `showCriticalQuestions` | `boolean` | ❌ | Whether to show critical questions section (default: `true`) |
| `showStoryHistory` | `boolean` | ❌ | Whether to display story history features (default: `true`) |
| `preview` | `string \| null` | ❌ | Custom preview image URL (default: `null`) |
| `mentionedPeople` | `PersonCount[]` | ❌ | Array of people mentioned in the story (default: `[]`) |
| `mentionedCompanies` | `CompanyCount[]` | ❌ | Array of companies mentioned in the story (default: `[]`) |
| `isPreviewStory` | `boolean` | ❌ | Flag indicating if this is a preview version (default: `false`) |

## Usage Example

```tsx
import { StoryPage } from '@/components/news/story-page';

// Basic usage with required props
function NewsStoryRoute({ params }: { params: { id: string } }) {
  const story = await getStoryWithArticles(params.id);
  const lastArticle = await getLastArticleForStory(params.id);
  
  return (
    <StoryPage 
      story={story} 
      lastArticle={lastArticle} 
    />
  );
}

// Advanced usage with all features
function EnhancedStoryPage({ storyId }: { storyId: string }) {
  const story = await getStoryWithArticles(storyId);
  const lastArticle = await getLastArticleForStory(storyId);
  const mentionedPeople = await getMentionedPeople(storyId);
  const mentionedCompanies = await getMentionedCompanies(storyId);
  const customPreview = await getCustomPreviewImage(storyId);

  return (
    <StoryPage
      story={story}
      lastArticle={lastArticle}
      showTopMentions={true}
      showCriticalQuestions={true}
      showStoryHistory={true}
      preview={customPreview}
      mentionedPeople={mentionedPeople}
      mentionedCompanies={mentionedCompanies}
      isPreviewStory={false}
    />
  );
}

// Preview mode usage
function StoryPreview({ story }: { story: StoryWithPageInfoAndSelectedArticles }) {
  return (
    <StoryPage
      story={story}
      lastArticle={null}
      showStoryHistory={false}
      isPreviewStory={true}
      mentionedPeople={[]}
      mentionedCompanies={[]}
    />
  );
}
```

## Functionality

- **Responsive Layout**: Adapts between mobile and desktop layouts with different component arrangements
- **Conditional Rendering**: Intelligently shows/hides sections based on available data and configuration props
- **Tab Management**: Integrates with tab system for story navigation and preview handling
- **Image Fallback**: Automatically selects preview images from selected articles when no custom preview is provided
- **Multi-Column Layout**: Implements responsive two-column layout with primary content and secondary sidebar
- **Interactive Elements**: Includes drawers, dialogs, and explorers for enhanced user interaction
- **Preview Mode**: Special handling for preview stories with reduced functionality

## State Management

- **No Internal State**: Component is purely presentational and relies on props for all data
- **Child Component State**: Individual child components manage their own state using appropriate patterns:
  - Drawers and dialogs use local state for open/close
  - Tab management handled by `StoryTabManager`
  - Article exploration uses TanStack Query for data fetching

## Side Effects

- **No Direct Side Effects**: Component doesn't perform API calls or side effects directly
- **Child Component Effects**: Child components handle their own side effects:
  - `ArticleExplorer` fetches related articles
  - `HistoryDrawer` loads story history when opened
  - `CitedSourcesDrawer` manages source data loading

## Dependencies

### Core Components
- `TabContainer` - Main layout wrapper
- `StoryTabManager` - Tab system integration
- `StoryHeader`, `StoryContent`, `StoryStats` - Core story display
- `ArticleExplorer` - Related articles functionality

### Interactive Components
- `CitedSourcesDrawer`, `HistoryDrawer` - Expandable content sections
- `StoryGalleryDialog`, `ReportIssueDialog` - Modal interactions
- `TopMentions`, `CriticalQuestions` - Enhanced content features

### Utilities
- `cn` utility for conditional className handling
- `getPreviewImage` helper function for image selection

## Integration

The `StoryPage` component serves as the main container for story-related routes and integrates with:

- **Tab System**: Works within the application's tab-based navigation
- **Layout System**: Fits into the main application layout structure
- **Story Ecosystem**: Coordinates multiple story-related components
- **Article System**: Connects stories with their constituent articles
- **Entity Recognition**: Displays mentioned people and companies
- **Media Management**: Handles story images and galleries

## Best Practices

### ✅ Architectural Adherence

- **Composition Pattern**: Follows flat component composition over deep nesting
- **Prop Drilling Prevention**: Uses focused props for each child component
- **Responsive Design**: Implements mobile-first responsive patterns
- **Server-Side Rendering**: Optimized for SSR with minimal client-side state

### ✅ Performance Optimizations

- **Conditional Rendering**: Only renders sections when data is available
- **Layout Calculation**: Efficiently determines column layouts based on content
- **Image Optimization**: Smart preview image selection with fallbacks

### ✅ Maintainability

- **Clear Separation**: Each section handled by dedicated components
- **Flexible Configuration**: Feature flags allow customization for different use cases
- **Type Safety**: Comprehensive TypeScript interfaces for all props
- **Utility Function**: `getPreviewImage` extracted for reusability

### ✅ User Experience

- **Progressive Enhancement**: Core content loads first, enhanced features load as needed
- **Responsive Behavior**: Optimal layouts for all screen sizes
- **Accessibility**: Proper semantic structure and focus management through child components