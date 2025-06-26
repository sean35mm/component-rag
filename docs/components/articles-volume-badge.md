# ArticlesVolumeBadge Component

## Purpose

The `ArticlesVolumeBadge` component is a visual indicator that displays the volume level of articles with color-coded badges. It categorizes article counts into LOW (≤60), MEDIUM (61-300), and HIGH (≥301) volumes, providing users with quick visual feedback about content density in the signals creation workflow.

## Component Type

**Server Component** - This is a pure presentational component that renders static content based on props. It performs no client-side interactions, state management, or browser APIs, making it suitable for server-side rendering to improve performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `articlesVolume` | `number` | ✅ | - | The number of articles to categorize and display |
| `showFullLabel` | `boolean` | ❌ | `false` | Whether to show full text labels (e.g., "LOW ARTICLE VOLUME") or abbreviated (e.g., "LOW") |
| `showIcon` | `boolean` | ❌ | `false` | Whether to display a warning icon alongside the badge text |

## Usage Example

```tsx
import { ArticlesVolumeBadge } from '@/components/signals/creation/articles-preview/articles-volume-badge';

// Basic usage
function ArticleStats() {
  return (
    <div className="flex items-center gap-2">
      <span>Article Count: 45</span>
      <ArticlesVolumeBadge articlesVolume={45} />
    </div>
  );
}

// With full labels and icons
function DetailedArticleStats() {
  return (
    <div className="space-y-2">
      <ArticlesVolumeBadge 
        articlesVolume={25} 
        showFullLabel={true} 
        showIcon={true} 
      />
      <ArticlesVolumeBadge 
        articlesVolume={150} 
        showFullLabel={true} 
        showIcon={true} 
      />
      <ArticlesVolumeBadge 
        articlesVolume={450} 
        showFullLabel={true} 
        showIcon={true} 
      />
    </div>
  );
}

// In a data table or list
function ArticlePreviewItem({ article }) {
  return (
    <div className="flex justify-between items-center p-4">
      <h3>{article.title}</h3>
      <ArticlesVolumeBadge 
        articlesVolume={article.count}
        showIcon={true}
      />
    </div>
  );
}
```

## Functionality

### Volume Categorization
- **LOW (≤60 articles)**: Yellow badge indicating minimal article volume
- **MEDIUM (61-300 articles)**: Green badge indicating moderate article volume  
- **HIGH (≥301 articles)**: Red badge indicating high article volume

### Display Options
- **Compact Mode**: Shows abbreviated labels (LOW, MEDIUM, HIGH)
- **Full Label Mode**: Shows descriptive labels (LOW ARTICLE VOLUME, etc.)
- **Icon Support**: Optional warning icon for enhanced visual communication

### Visual Design
- Consistent badge styling with `light` variant and `xs` size
- Color-coded system: yellow (caution), green (good), red (high attention)
- Half-rounded corners for modern appearance
- Flexible width with proper content alignment

## State Management

**No State Management** - This component is stateless and purely functional. It receives data via props and renders the appropriate badge based on the `articlesVolume` value. All state management occurs in parent components.

## Side Effects

**No Side Effects** - The component performs no API calls, local storage operations, or other side effects. It's a pure rendering component that transforms props into JSX.

## Dependencies

### Internal Dependencies
- `@/components/ui/badge` - Core Badge component for consistent styling
- `@/components/icons` - PiErrorWarningLine icon for visual enhancement

### External Dependencies
- React (implicit) - For JSX rendering and component structure

## Integration

### Application Architecture
The component integrates into the signals creation workflow as part of the articles preview system:

```
signals/creation/
├── articles-preview/
│   ├── articles-volume-badge.tsx (this component)
│   ├── articles-list.tsx
│   └── articles-summary.tsx
```

### Usage Context
- **Articles Preview**: Shows volume indicators for signal article collections
- **Dashboard Views**: Provides quick volume assessment in list/grid layouts
- **Analytics Displays**: Visual representation of content metrics

### Data Flow
```
Parent Component → articlesVolume (number) → ArticlesVolumeBadge → Rendered Badge
```

## Best Practices

### ✅ Architectural Compliance
- **Server Component**: Correctly implemented as server component for static rendering
- **Flat Structure**: No unnecessary nesting, direct conditional rendering
- **Reusable Design**: Generic enough for use across different contexts
- **Props Interface**: Clean, typed interface following component patterns

### ✅ Design Patterns
- **Single Responsibility**: Focused solely on volume badge display
- **Configurable Display**: Flexible options without overcomplication
- **Consistent Styling**: Uses design system components (Badge, icons)
- **Accessible Design**: Color coding supplemented with text labels

### ✅ Performance Considerations
- **Server Rendering**: Reduces client-side JavaScript bundle
- **Pure Function**: Predictable output based on inputs
- **No Re-renders**: Stateless design prevents unnecessary updates
- **Lightweight**: Minimal dependencies and computational overhead

### ✅ Usage Guidelines
- Use in contexts where article volume assessment is valuable
- Consider `showFullLabel={true}` for first-time users or important contexts
- Include `showIcon={true}` when badge appears in dense layouts
- Pair with actual article counts for complete user understanding