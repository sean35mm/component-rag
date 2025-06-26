# StoryPreviewCardMd

## Purpose

The `StoryPreviewCardMd` component displays a medium-sized preview card for news stories, featuring story metadata (date, time since creation, source count), thumbnail image, and title. It provides interactive states for hover, selection, and active slide conditions, making it suitable for story lists, carousels, or grid layouts.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `story` | `StoryWithPageInfoAndSelectedArticles` | Yes | - | Story data containing metadata, articles, and sources |
| `onClick` | `(e: React.MouseEvent) => void` | No | - | Callback fired when card is clicked |
| `isSelected` | `boolean` | No | `false` | Whether the card is in selected state |
| `isActiveSlide` | `boolean` | No | `false` | Whether the card is the active slide in a carousel/slider |
| `isLoading` | `boolean` | No | `false` | Override loading state display |
| `className` | `string` | No | - | Additional CSS classes to apply |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

## Usage Example

```tsx
import { StoryPreviewCardMd } from '@/components/ui/story-preview-card-md';

// Basic usage
<StoryPreviewCardMd
  story={storyData}
  onClick={(e) => handleStoryClick(story.id)}
/>

// With selection state
<StoryPreviewCardMd
  story={storyData}
  isSelected={selectedStoryId === story.id}
  onClick={(e) => setSelectedStoryId(story.id)}
  className="max-w-sm"
/>

// In carousel context
<StoryPreviewCardMd
  story={storyData}
  isActiveSlide={currentSlide === index}
  onClick={(e) => navigateToStory(story.id)}
/>

// Custom styling with design tokens
<StoryPreviewCardMd
  story={storyData}
  className="border-pgBlue-200 hover:border-pgBlue-500 hover:bg-pgBackground-50"
  onClick={handleClick}
/>
```

## Design System Usage

### Typography Classes
- **`.typography-labelSmall`** - Date and time metadata display
- **`.typography-subheadingXSmall`** - Source count indicator
- **`.typography-titleH16`** - Story title with line clamping

### Color Tokens
- **Border Colors**:
  - `border-pgStroke-250` - Default border
  - `border-pgStroke-950` - Hover, selected, and active states
- **Background Colors**:
  - `bg-pgBackgroundWhiteInv-800` - Hover, selected, and active background
- **Text Colors**:
  - `text-pgText-700` - Default secondary text
  - `text-pgText-800` - Primary text and hover states

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `justify-between`, `items-center`, `gap-2`, `gap-4`
- **Spacing**: `mb-4`, `px-3`, `py-2`, `mt-2`
- **Sizing**: `size-[68px]`, `aspect-square`
- **Border Radius**: `rounded-xl`, `rounded-[0.625rem]`
- **Visual Effects**: `shadow-sm`, `transition-all`, `duration-500`
- **Text**: `line-clamp-4`

## Styling

### Component States

#### Default State
```css
border-pgStroke-250 px-3 py-2 shadow-sm
```

#### Hover State
```css
hover:border-pgStroke-950 hover:bg-pgBackgroundWhiteInv-800
```

#### Selected State
```css
border-pgStroke-950 bg-pgBackgroundWhiteInv-800
```

#### Active Slide State
```css
border-pgStroke-950 bg-pgBackgroundWhiteInv-800
```

### Customization Options

The component accepts custom styling through the `className` prop while maintaining design system consistency:

```tsx
// Custom border colors
<StoryPreviewCardMd
  className="border-pgBlue-200 hover:border-pgBlue-500"
  story={story}
/>

// Custom spacing
<StoryPreviewCardMd
  className="mx-4 my-2 p-4"
  story={story}
/>

// Custom sizing constraints
<StoryPreviewCardMd
  className="max-w-xs min-h-[160px]"
  story={story}
/>
```

## Responsive Design

The component uses flexible layout patterns that adapt naturally:

- **Image**: Fixed `68px` square maintains aspect ratio across all breakpoints
- **Typography**: Uses responsive typography classes that scale appropriately
- **Spacing**: Utilizes consistent spacing tokens that work across screen sizes
- **Layout**: Flexbox layout adapts to container constraints

For responsive variations:
```tsx
<StoryPreviewCardMd
  className="sm:px-4 sm:py-3 md:max-w-md lg:max-w-lg"
  story={story}
/>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Clickable area supports standard keyboard interaction
- **Semantic Structure**: Uses proper heading hierarchy with Typography component
- **Image Alt Text**: Includes descriptive alt text from story data
- **Focus Management**: Inherits focus styles from design system

### Recommended Enhancements
```tsx
<StoryPreviewCardMd
  story={story}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  }}
  tabIndex={0}
  role="button"
  aria-label={`Read story: ${story.name}`}
/>
```

## Dependencies

### Internal Components
- **`Typography`** - Design system typography component for consistent text styling
- **`ImageWithFallback`** - Handles image loading with fallback support
- **`CitationBubbleListBase`** - Displays source indicators
- **`Skeleton`** - Loading state placeholder
- **`StoryPreviewCardMdFallback`** - Dedicated loading fallback component

### Hooks & Utilities
- **`useImagePlaceholder`** - Generates placeholder images
- **`useSources`** - Fetches source data for citations
- **`cn`** - Class name utility for conditional styling
- **`formatDistanceFn`** - Custom date formatting function
- **`domainUniquenessByTwoTopLevels`** - Domain processing utility

### External Dependencies
- **`date-fns`** - Date formatting and manipulation
- **React** - Core React functionality and hooks

### Related Types
- **`StoryWithPageInfoAndSelectedArticles`** - Story data interface
- **`GetSourcesListParams`** - Source query parameters