# ArticlesPreviewSkeleton Component

## Purpose

The `ArticlesPreviewSkeleton` component provides a loading state placeholder for article preview items during data fetching. It mimics the visual structure of an actual article preview with animated skeleton elements, ensuring a smooth user experience while content loads in signals creation workflows.

## Component Type

**Server Component** - This is a pure presentational component that renders static skeleton UI elements without any client-side interactions, event handlers, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { ArticlesPreviewSkeleton } from '@/components/signals/creation/articles-preview/articles-preview-skeleton';

// In a signals creation page during loading
export function SignalsCreationPage() {
  const { data: articles, isLoading } = useArticles();

  return (
    <div className="space-y-4">
      <h2>Related Articles</h2>
      {isLoading ? (
        <div className="space-y-2">
          <ArticlesPreviewSkeleton />
          <ArticlesPreviewSkeleton />
          <ArticlesPreviewSkeleton />
        </div>
      ) : (
        articles?.map(article => (
          <ArticlePreview key={article.id} article={article} />
        ))
      )}
    </div>
  );
}

// Using the exported constant
import { DOT_COLOR_BLUE } from '@/components/signals/creation/articles-preview/articles-preview-skeleton';

export function CustomComponent() {
  return (
    <div style={{ borderColor: DOT_COLOR_BLUE }}>
      Custom content with matching blue theme
    </div>
  );
}
```

## Functionality

- **Visual Placeholder**: Renders a skeleton layout matching the structure of actual article previews
- **Animated Loading Indicator**: Features a pulsing blue dot with 2-second animation duration
- **Responsive Layout**: Maintains consistent spacing and alignment with real content
- **Theme Integration**: Uses CSS custom properties for consistent color theming
- **Accessibility**: Provides visual feedback during loading states

## State Management

**No State Management** - This component is stateless and purely presentational. It doesn't manage any local state, server state, or global state. All styling and animation are handled through CSS classes and the `CustomizedDot` component's internal animation.

## Side Effects

**No Side Effects** - This component performs no API calls, external interactions, or side effects. It's a pure presentational component focused solely on rendering skeleton UI elements.

## Dependencies

### Internal Dependencies
- `@/components/story/stats/customized-dot` - Provides the animated dot indicator
- `@/components/ui/skeleton` - Base skeleton component for loading states

### External Dependencies
- React - For component rendering
- Tailwind CSS - For styling and layout classes

## Integration

This component integrates into the signals creation workflow as part of the articles preview feature:

```
src/components/signals/creation/
├── articles-preview/
│   ├── articles-preview-skeleton.tsx  ← This component
│   ├── articles-preview.tsx           ← Main preview component
│   └── article-preview-item.tsx       ← Individual article items
```

**Integration Points:**
- **Signals Creation Flow**: Used during article loading in signal creation workflows
- **Design System**: Follows the application's skeleton loading patterns
- **Theme System**: Integrates with CSS custom properties for consistent theming

## Best Practices

✅ **Architectural Alignment:**
- **Server Component**: Correctly implemented as a server component with no client-side logic
- **Component Decomposition**: Simple, focused component that does one thing well
- **Flat Structure**: Minimal nesting with clear layout hierarchy
- **Reusable Design**: Can be easily composed multiple times for list loading states

✅ **Implementation Best Practices:**
- **Consistent Styling**: Uses the same layout classes as real content
- **Performance**: Lightweight with no unnecessary re-renders
- **Accessibility**: Skeleton elements provide clear loading feedback
- **Maintainability**: Clear separation of concerns with exported constants

✅ **Integration Patterns:**
- **Conditional Rendering**: Designed to work with loading state conditionals
- **List Rendering**: Easily repeatable for multiple skeleton items
- **Theme Consistency**: Uses design system colors and spacing
- **Animation Performance**: Leverages CSS animations over JavaScript for better performance