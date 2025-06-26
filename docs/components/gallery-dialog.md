# Gallery Dialog Component

## Purpose

The `StoryGalleryDialog` component provides an immersive, fullscreen gallery view for browsing articles within a story. It displays a carousel of article previews with scaling animations, comprehensive article metadata, and responsive navigation controls. The component serves as a visual exploration interface that allows users to quickly scan through multiple articles while maintaining context about sources, publication dates, and content summaries.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Browser-specific APIs for carousel animations and scaling effects
- Interactive state management for dialog visibility and carousel navigation
- Event handlers for user interactions and carousel animations
- Access to window/viewport information through breakpoint detection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | Yes | Story object containing selected articles and metadata for gallery display |

## Usage Example

```tsx
import { StoryGalleryDialog } from '@/components/story/gallery-dialog';

function StoryPage() {
  const story = useStoryData();
  
  return (
    <div>
      {/* Story content */}
      <StoryGalleryDialog story={story} />
    </div>
  );
}
```

## Functionality

### Core Features
- **Responsive Carousel**: Touch-friendly navigation with previous/next controls
- **Scaling Animation**: Dynamic scaling effects based on scroll position using custom tween calculations
- **Article Previews**: High-quality image previews with overlay metadata on desktop
- **Source Information**: Displays source citations, bias ratings, and paywall indicators
- **Responsive Design**: Fullscreen mobile view, modal desktop view
- **External Navigation**: Direct links to original articles with analytics tracking

### Animation System
- **Tween Factor**: Configurable scaling animation intensity (`TWEEN_FACTOR_BASE = 0.25`)
- **Range Clamping**: Ensures scale values remain within valid bounds (0-1)
- **Performance Optimization**: Only processes visible slides during scroll events

### Article Display
- **Chronological Sorting**: Articles sorted by publication date (newest first)
- **Metadata Overlay**: Source name, bias rating, paywall status, and publication time
- **Labels**: Article categorization tags with overflow handling
- **Summary Preview**: Content summaries on mobile view

## State Management

### Local State (useState)
- `api`: Carousel API instance for programmatic control
- `currentSlide`: Active slide index for navigation and metadata display
- `slideCount`: Total number of slides for pagination display

### Context State
- `useStoryGalleryDialog()`: Global dialog visibility state
- `useAccessToken()`: User authentication and authorization status

### Refs
- `nodes`: DOM references to slide elements for animation
- `factor`: Cached tween factor for performance optimization

## Side Effects

### Carousel Management
```tsx
useEffect(() => {
  // Registers multiple carousel event listeners
  // - Animation scaling on scroll/select
  // - Slide counting and current position tracking
  // - Node reference management for animations
}, [api, ...handlers]);
```

### Analytics Tracking
- **Article Views**: Tracks when users click to view articles
- **Source Attribution**: Records gallery as the interaction source
- **Story Context**: Maintains story-level analytics context

## Dependencies

### UI Components
- `Carousel` family: Core carousel functionality and navigation
- `Dialog` family: Modal presentation and responsive behavior
- `Typography`, `Button`: Standard UI elements
- `ArticleImageWithFallback`: Optimized image loading with fallbacks

### Hooks & Context
- `useBreakpoint('lg')`: Responsive design decisions
- `useStoryGalleryDialog()`: Dialog state management
- `useAccessToken()`: Authentication state
- `useSourceByDomainSuspense()`: Source metadata fetching

### Utilities
- `formatCustomDistanceToNow()`: Human-readable date formatting
- `parseISO()`: Date parsing for chronological sorting
- `StoryPageTracker`: Analytics event tracking

## Integration

### Story Navigation Flow
```
Story Page → Gallery Trigger → StoryGalleryDialog → Article External Link
     ↓              ↓                 ↓                    ↓
Context Setup → Dialog Open → Article Browse → Analytics Track
```

### Authentication Integration
- **Authorized Users**: Full source metadata and bias ratings
- **Public Access**: Limited source information
- **Unauthorized**: Skeleton loading states for restricted content

### Responsive Architecture
- **Mobile**: Fullscreen overlay with bottom metadata panel
- **Desktop**: Centered modal with overlay metadata on images
- **Tablet**: Adaptive layout based on breakpoint detection

## Best Practices

### Component Decomposition
✅ **Follows Lego Block Pattern**
- `SourcePreviewSuspense`: Isolated source data fetching
- `SourcePreview`: Suspense boundary wrapper
- `StoryGalleryDialog`: Main orchestration component

### Performance Optimization
✅ **Efficient Rendering**
- Suspense boundaries prevent cascading loading states
- Memoized article sorting prevents unnecessary recalculation
- Event handler optimization with `useCallback`

### State Management Patterns
✅ **Appropriate State Distribution**
- Global dialog state managed through context
- Local UI state (carousel position) kept in component
- Server state (source data) handled by TanStack Query

### Accessibility Considerations
✅ **User Experience**
- Keyboard navigation through carousel controls
- Screen reader friendly typography components
- Focus management within modal dialog
- External link indicators and proper ARIA attributes

### Error Boundaries
✅ **Graceful Degradation**
- Suspense fallbacks for slow-loading source data
- Skeleton states for unauthorized content
- Fallback source display when metadata unavailable