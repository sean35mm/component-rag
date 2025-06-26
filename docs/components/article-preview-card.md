# ArticlePreviewCard Component

## Purpose

The `ArticlePreviewCard` component displays a preview of an article with its title, summary, source information, and publication date. It provides interactive states, responsive design, and customizable display options including highlights and expandable mobile views. The component follows a card-based design pattern with hover effects and selection states.

## Props Interface

| Prop | Type | Required | Description |
|------|------|-----------|-------------|
| `article` | `Article` | ✓ | Article data object containing title, summary, source, pubDate, and optional highlights |
| `onClick` | `() => void` | ✗ | Handler function called when the card is clicked |
| `handleMobileExpand` | `() => void` | ✗ | Handler for mobile expand button interaction |
| `isSelected` | `boolean` | ✗ | Whether the card is in selected state (applies selection styling) |
| `isFitToContainer` | `boolean` | ✗ | Reduces padding for compact layouts |
| `className` | `string` | ✗ | Additional CSS classes to apply to the card container |
| `onMobileExpand` | `boolean` | ✗ | Whether to show the mobile expand button |
| `labels` | `string[]` | ✗ | Array of labels to display on the source entity |
| `classNames` | `object` | ✗ | Custom class names for nested components |
| `classNames.sourceEntity` | `string` | ✗ | Custom classes for the source entity container |
| `classNames.sourceEntityName` | `string` | ✗ | Custom classes for the source entity name |
| `sourceEntitySubTitle` | `string` | ✗ | Subtitle text for the source entity |
| `showDateOnTop` | `boolean` | ✗ | Whether to display date next to source name instead of inline with summary |
| `showHighlights` | `boolean` | ✗ | Whether to display article highlights section |

## Usage Example

```tsx
import { ArticlePreviewCard } from '@/components/ui/article-preview-card';

// Basic usage
<ArticlePreviewCard
  article={{
    title: "New React Features Announced",
    summary: "The React team has announced several new features including improved server components and enhanced performance optimizations.",
    source: {
      domain: "react.dev"
    },
    pubDate: new Date().toISOString(),
    highlights: ["server components", "performance", "optimization"]
  }}
  onClick={() => handleArticleClick()}
/>

// Advanced usage with custom styling and mobile expand
<ArticlePreviewCard
  article={article}
  onClick={handleCardClick}
  isSelected={selectedArticleId === article.id}
  onMobileExpand={true}
  handleMobileExpand={handleMobileMenu}
  showDateOnTop={true}
  showHighlights={true}
  labels={["Tech", "Featured"]}
  sourceEntitySubTitle="Technology News"
  className="shadow-sm"
  classNames={{
    sourceEntity: "border border-pgStroke-200",
    sourceEntityName: "font-semibold"
  }}
/>

// Compact layout
<ArticlePreviewCard
  article={article}
  isFitToContainer={true}
  showDateOnTop={true}
  className="bg-pgBackground-50"
/>
```

## Design System Usage

### Typography Classes
- **Mobile Title**: `titleH16` - Smaller title variant for mobile screens
- **Desktop Title**: `titleLarge` - Larger title for desktop layouts  
- **Date Label**: `paragraphXSmall` with `font-light` - Lightweight date display
- **Inline Date**: `labelSmall` - Compact date format when inline with summary
- **Summary Text**: `paragraphSmall` - Standard paragraph text for article summaries

### Color Tokens
- **Border Colors**: 
  - `border-transparent` - Default invisible border
  - `border-pgStroke-250` - Hover and selected state borders
- **Background Colors**:
  - `hover:bg-pgBackgroundBlueTintLight` - Subtle blue tint on hover
  - `bg-pgBackgroundBlueTintLight` - Selected state background
- **Text Colors**:
  - `color='800'` - High contrast for titles
  - `color='700'` - Medium contrast for dates
  - `color='600'` - Labels and secondary text
  - `color='400'` - Muted text for summaries

### Layout & Spacing
- **Container**: `p-4` padding, `rounded-xl` corners
- **Compact Mode**: `px-0 py-2` reduced padding
- **Gap Spacing**: `gap-1` between elements
- **Margins**: `mb-2 lg:mb-4` responsive bottom margins

## Styling

### States
- **Default**: Transparent border with hover effects
- **Hover**: `border-pgStroke-250` and `bg-pgBackgroundBlueTintLight` 
- **Selected**: Persistent border and background when `isSelected=true`
- **Compact**: Reduced padding when `isFitToContainer=true`

### Customization Options
- **Container Styling**: Use `className` prop for additional container styles
- **Source Entity**: Customize via `classNames.sourceEntity` and `classNames.sourceEntityName`
- **Layout Variants**: Toggle compact mode with `isFitToContainer`
- **Content Display**: Control date positioning and highlights visibility

## Responsive Design

### Breakpoints
- **Mobile (`< lg`)**: 
  - Uses `titleH16` for titles
  - Shows mobile expand button when `onMobileExpand=true`
  - Applies `mb-2` bottom margin
- **Desktop (`>= lg`)**:
  - Uses `titleLarge` for titles  
  - Hides mobile expand functionality
  - Applies `mb-4` bottom margin and hover background effects

### Responsive Features
- Typography scales automatically between mobile and desktop
- Mobile-specific expand button for additional actions
- Hover effects only active on desktop (via `lg:hover:` prefix)

## Accessibility

### Interactive Elements
- **Clickable Card**: Entire card is clickable when `onClick` provided
- **Keyboard Navigation**: Card receives focus and can be activated via keyboard
- **Mobile Actions**: Separate expand button for mobile-specific interactions

### Content Structure
- **Semantic Hierarchy**: Proper heading levels via Typography component
- **Content Truncation**: Summary text uses `line-clamp-2` for consistent layout
- **Visual Hierarchy**: Clear contrast levels between title, date, and summary

### Considerations
- Ensure `onClick` handlers include keyboard event support
- Consider adding `role="article"` for screen readers
- Provide meaningful `alt` text for source logos via SourceEntity component

## Dependencies

### Internal Components
- **`SourceEntity`**: Displays source logo, name, and metadata
- **`Typography`**: Handles text styling with design system variants
- **`CompactButton`**: Mobile expand button functionality
- **`ArticleHighlights`**: Displays article highlight tags

### Hooks & Utilities
- **`useBreakpoint`**: Responsive behavior detection
- **`cn`**: Class name utility for conditional styling
- **`formatCustomDistanceToNow`**: Date formatting utility

### Icons
- **`PiMore2Fill`**: Three-dot menu icon for mobile expand button

### Types
- **`Article`**: TypeScript interface for article data structure