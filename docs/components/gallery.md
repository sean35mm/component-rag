# StoryGallery Component

## Purpose
The `StoryGallery` component displays a visual gallery of images from a news story's selected articles. It provides a responsive preview interface that shows primary and secondary images with source citations, and opens a dialog for viewing the full gallery when clicked.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires:
- Event handlers for user interactions (click events)
- Browser-specific hooks (`useBreakpoint`)
- Client-side state management for dialog interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes for styling customization |
| `story` | `StoryWithPageInfoAndSelectedArticles` | Required | Story object containing image data and selected articles for the gallery |

## Usage Example

```tsx
import { StoryGallery } from '@/components/story/gallery/gallery';

function StoryPage({ story }: { story: StoryWithPageInfoAndSelectedArticles }) {
  return (
    <div className="story-content">
      <h1>{story.name}</h1>
      
      <StoryGallery 
        story={story}
        className="my-4"
      />
      
      {/* Other story content */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Responsive Layout**: Different layouts for desktop (lg+) and mobile screens
- **Image Prioritization**: Sorts articles by publication date and displays most recent images first
- **Source Attribution**: Shows source citations for all displayed images
- **Gallery Dialog Integration**: Opens full gallery dialog when any image is clicked
- **Fallback Handling**: Uses placeholder images when article images fail to load

### Image Display Logic
- **Desktop**: Shows primary image (5/8 height) + up to 2 secondary images (3/8 height)
- **Mobile**: Shows primary image + 1 secondary image in horizontal layout
- **Primary Image**: Uses story's main image or falls back to most recent article image

### Interactive Elements
- All images are clickable and open the story gallery dialog
- "View All" button appears on the last secondary image
- Analytics tracking for gallery dialog opens

## State Management

### Local State
- Uses `useMemo` for computed image arrangements and primary image selection
- Uses `useCallback` for memoized event handlers

### External State
- **Dialog State**: Integrates with `useStoryGalleryDialog` context for gallery dialog management
- **No server state**: Component receives all data via props

## Side Effects

### Analytics Tracking
- Tracks gallery dialog opens via `StoryPageTracker.galleryDialogOpened()`

### Event Handling
- Click events that stop propagation and open gallery dialog
- Responsive breakpoint detection for layout changes

## Dependencies

### Hooks
- `useBreakpoint('lg')` - Responsive layout detection
- `useImagePlaceholder()` - Fallback image generation
- `useStoryGalleryDialog()` - Gallery dialog state management

### UI Components
- `ImageWithFallback` - Main image display with error handling
- `ArticleImageWithFallback` - Article-specific image display
- `SourceCitationItem` - Source attribution display
- `ViewAllButton` - Gallery action button

### External Libraries
- `date-fns/parseISO` - Date parsing for article sorting
- Analytics tracking utilities

## Integration

### Story Architecture
- Part of the story detail page component hierarchy
- Integrates with story gallery dialog system
- Connects to story analytics tracking pipeline

### Responsive Design
- Adapts to application's breakpoint system
- Follows consistent spacing and styling patterns
- Integrates with design system color tokens

### Context Integration
- Communicates with gallery dialog context
- Participates in story-level state management

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client component for interactive features  
✅ **Component Decomposition**: Flat structure with well-separated concerns  
✅ **Performance**: Memoized computations and event handlers  
✅ **Responsive Design**: Mobile-first approach with breakpoint-based layouts  

### Code Quality
✅ **Type Safety**: Full TypeScript integration with proper interfaces  
✅ **Error Handling**: Graceful fallbacks for missing images and data  
✅ **Accessibility**: Semantic HTML structure and proper image alt attributes  
✅ **Analytics**: Proper event tracking integration  

### Integration Patterns
✅ **Context Usage**: Leverages React context for cross-component communication  
✅ **Hook Composition**: Combines multiple custom hooks effectively  
✅ **Conditional Rendering**: Handles empty states gracefully  
✅ **Event Management**: Proper event handling with stopPropagation where needed