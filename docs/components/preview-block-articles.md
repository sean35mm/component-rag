# PreviewBlockArticles Component

## Purpose

The `PreviewBlockArticles` component displays a comprehensive preview of a news article with metadata, source information, author details, and AI-generated summary. It provides both desktop and mobile-optimized layouts with features like sharing, reporting issues, and highlighting mentions.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `article` | `Article` | ✅ | The article object containing all article data including title, content, source, and metadata |
| `isMobile` | `boolean` | ❌ | Enables mobile-specific layout optimizations (removes borders, adjusts spacing) |
| `className` | `string` | ❌ | Additional CSS classes to apply to the root container |
| `showHighlights` | `boolean` | ❌ | Whether to display article highlights/mentions section |

## Usage Example

```tsx
import { PreviewBlockArticles } from '@/components/ui/preview-block-articles';

// Basic usage
<PreviewBlockArticles 
  article={articleData}
  showHighlights={true}
/>

// Mobile optimized
<PreviewBlockArticles 
  article={articleData}
  isMobile={true}
  className="custom-spacing"
  showHighlights={false}
/>

// With custom styling
<PreviewBlockArticles 
  article={articleData}
  className="shadow-lg bg-pgBackground-50"
  showHighlights={true}
/>
```

## Design System Usage

### Typography Classes
- **`.typography-labelLarge`** - "Article preview" header text
- **`.typography-headlines18`** - Article title display
- **`.typography-paragraphSmall`** - Publication date, source domain, and summary text
- **`.typography-paragraphXSmall`** - Country code labels
- **`.typography-subheading2XSmall`** - Section headers ("Source", "Author", "Summary", "Mentions")

### Color Tokens
- **Background Colors**: 
  - `bg-pgBackgroundWhiteInv-950` - Main container background
  - `bg-pgBackground-0` - Mobile background override
- **Border Colors**:
  - `border-pgStroke-250` - Container border
  - `border-alphaNeutral/24` - Section dividers
- **Text Colors**: 
  - `color-950`, `color-800`, `color-700`, `color-600`, `color-400` - Hierarchical text colors
- **Icon Colors**:
  - `text-pgIcon-600` - Icon color for user statistics

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `items-center`, `justify-between`, `gap-4`
- **Spacing**: `p-4`, `px-4`, `py-3`, `mt-3`, `ml-2`
- **Borders**: `rounded-2xl`, `border`, `border-y`
- **Sizing**: `h-[calc(100%-126px)]`, `h-[104px]`, `w-28`, `size-4`
- **Text**: `line-clamp-4` for title truncation

## Styling Variants

### Layout Variants
- **Desktop**: Full border, padding, and structured layout with image
- **Mobile**: Borderless, full-width layout without article image

### State Variants
- **With Highlights**: Shows mentions section when `showHighlights={true}` and highlights exist
- **With Authors**: Displays author section when `matchedAuthors` are available
- **With Summary**: Shows AI-generated summary section when available

### Customization Options
```tsx
// Custom container styling
<PreviewBlockArticles 
  className="border-pgStroke-500 shadow-xl bg-pgBackground-100"
  article={article}
/>

// Override mobile detection
<PreviewBlockArticles 
  isMobile={false} // Force desktop layout
  article={article}
/>
```

## Responsive Design

### Breakpoint Adaptations

**Mobile Layout (`isMobile={true}`)**:
- Removes container borders and rounded corners
- Eliminates article image display
- Adjusts padding from `p-4` to `p-0`
- Changes background from `bg-pgBackgroundWhiteInv-950` to `bg-pgBackground-0`
- Adds horizontal padding `px-4` to summary section
- Enables flex-wrap for metadata tags

**Desktop Layout**:
- Full structured layout with image preview
- Container styling with borders and background
- Side-by-side metadata organization
- Fixed action buttons at bottom

### Responsive Utilities
- `flex-wrap` for mobile tag organization
- `overflow-x-auto` for horizontal scrolling on mobile
- Conditional spacing classes based on `isMobile` prop

## Accessibility

### ARIA Considerations
- Uses semantic HTML structure with proper heading hierarchy
- Button elements have appropriate labeling through child text
- Links include `rel="noopener noreferrer"` for security
- Images include alt text through `ArticleImageWithFallback` component

### Keyboard Navigation
- All interactive elements (buttons, links) are keyboard accessible
- Tab order follows logical reading flow
- External links open in new tabs with proper attributes

### Screen Reader Support
- Typography component provides semantic meaning
- Icon-only buttons are wrapped in `TooltipProvider` for context
- Hierarchical content structure with clear section headers

## Dependencies

### Internal Components
- **`Typography`** - Text rendering with design system tokens
- **`Button`** - Primary action button for "View article"
- **`Tag`** - Metadata display (paywall, bias, country)
- **`AiTag`** - AI-generated content indicator
- **`ArticleImageWithFallback`** - Image display with loading states
- **`ShareButtonWithDialog`** - Social sharing functionality
- **`ReportIssueButton`** - Issue reporting interface
- **`CopyButton`** - Copy-to-clipboard functionality
- **`BiasIcon`** - Source bias rating display
- **`SourceCitationItem`** - Source favicon and branding

### External Dependencies
- **`react-circle-flags`** - Country flag icons
- **`next/link`** - Client-side navigation
- **Custom Icons** - `Dollar`, `PiArrowRightUpLine`, `PiUser3Fill`

### Utility Dependencies
- **`cn`** - Conditional className utility
- **`formatCustomDistanceToNow`** - Date formatting
- **`nFormatter`** - Number formatting for statistics

### Context Dependencies
- **`useAccessToken`** - Authentication state management
- **`useReportIssueDialog`** - Issue reporting dialog state
- **`useSourceByDomain`** - Source data fetching