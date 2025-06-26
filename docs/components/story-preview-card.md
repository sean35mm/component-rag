# StoryPreviewCard Component

## Purpose

The `StoryPreviewCard` component displays a preview of a news story with metadata, statistics, and citation information. It provides a clickable card interface for story selection within story lists or feeds, featuring a timeline chart, source citations, and formatted story details.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfo` | Yes | The story object containing metadata, content, and source information |
| `onClick` | `() => void` | No | Callback function triggered when the card is clicked |
| `isSelected` | `boolean` | No | Indicates if the card is in a selected state, applying selected styling |

## Usage Example

```tsx
import { StoryPreviewCard } from '@/components/ui/story-preview-card';

// Basic usage
<StoryPreviewCard 
  story={storyData}
  onClick={() => handleStorySelect(storyData.id)}
/>

// With selection state
<StoryPreviewCard 
  story={storyData}
  onClick={() => handleStorySelect(storyData.id)}
  isSelected={selectedStoryId === storyData.id}
/>

// In a story list
<div className="space-y-2">
  {stories.map((story) => (
    <StoryPreviewCard
      key={story.id}
      story={story}
      onClick={() => navigate(`/story/${story.id}`)}
      isSelected={activeStoryId === story.id}
    />
  ))}
</div>
```

## Design System Usage

### Typography Classes
- **`.typography-labelSmall`** - Date labels and source counts
- **`.typography-paragraphSmall`** - Update timestamps and story summaries
- **`.typography-titleLarge`** - Story titles

### Color Tokens
- **Background Colors**:
  - `pgBackground-100` - Default card border
  - `pgNeutral-400/12` - Hover and selected background with 12% opacity

- **Text Colors**:
  - `pgText-400` - Story summary text (muted)
  - `pgText-600` - Date and update timestamp
  - `pgText-700` - Source count
  - `pgText-800` - Story title

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `items-center`, `justify-between`, `gap-1`, `gap-2`
- **Spacing**: `p-4`, `mb-2`, `lg:mb-4`
- **Borders**: `rounded-xl`, `border`
- **Text**: `line-clamp-2` for summary truncation
- **Sizing**: `max-h-[25px]` for timeline chart constraint

## Styling

### Base State
```css
/* Default card styling */
.story-preview-card {
  border: 1px solid rgb(var(--pgBackground-100));
  background: transparent;
  border-radius: 0.75rem;
  padding: 1rem;
}
```

### Interactive States
- **Hover**: `hover:border-pgNeutral-400/12 hover:bg-pgNeutral-400/12`
- **Selected**: `border-pgNeutral-400/12 bg-pgNeutral-400/12`

### Customization Options
The component uses conditional classes for state management:
```tsx
cn(
  'mb-2 flex flex-col gap-1 rounded-xl border border-pgBackground-100 p-4 hover:border-pgNeutral-400/12 hover:bg-pgNeutral-400/12 lg:mb-4',
  isSelected && 'border-pgNeutral-400/12 bg-pgNeutral-400/12'
)
```

## Responsive Design

### Breakpoint Adaptations
- **Mobile to Large (< 1024px)**: `mb-2` - Reduced bottom margin
- **Large+ (≥ 1024px)**: `lg:mb-4` - Increased bottom margin for better spacing

### Content Layout
- Header section with date/update info and statistics uses `justify-between` for optimal spacing
- Timeline chart constrains to `max-h-[25px]` for consistent sizing across devices
- Summary text uses `line-clamp-2` for consistent truncation

## Accessibility

### Current Implementation
- **Semantic Structure**: Uses proper div hierarchy with logical content flow
- **Interactive Element**: Card container handles click events
- **Text Contrast**: Uses design system color tokens ensuring proper contrast ratios

### Recommendations for Enhancement
- Add `role="button"` and `tabIndex={0}` when `onClick` is provided
- Implement keyboard navigation with Enter/Space key handlers
- Add `aria-selected` attribute when `isSelected` is true
- Include `aria-label` or `aria-labelledby` for screen reader context

```tsx
// Enhanced accessibility example
<div
  className={cardClasses}
  onClick={onClick}
  role={onClick ? "button" : undefined}
  tabIndex={onClick ? 0 : undefined}
  aria-selected={isSelected}
  aria-label={`Story: ${story.name}, updated ${storyUpdatedDateTime}`}
  onKeyDown={(e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      onClick();
    }
  }}
>
```

## Dependencies

### Internal Components
- **`Typography`** - Design system typography component for consistent text styling
- **`TimeLineChart`** - Displays story velocity data visualization
- **`CitationBubbleListBase`** - Shows source citation indicators

### External Dependencies
- **`date-fns/format`** - Date formatting utilities
- **`cn`** - Utility for conditional class name concatenation

### Hooks and Services
- **`useStoryVelocity`** - Fetches story engagement velocity data
- **`useSources`** - Retrieves source information for citations
- **`buildCitationBubbles`** - Utility for processing citation data

### Types
- **`StoryWithPageInfo`** - TypeScript interface for story data structure
- **`GetSourcesListParams`** - Parameters for source data fetching