# FeaturedSkeleton Component

## Purpose

The `FeaturedSkeleton` component provides a loading state placeholder for featured cards in the answers next-steps section. It displays animated skeleton elements that match the layout and dimensions of the actual featured card content, creating a smooth loading experience while data is being fetched.

## Component Type

**Server Component** - This is a presentational component that renders static skeleton elements without any client-side interactivity, state management, or event handlers. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { FeaturedSkeleton } from '@/components/answers/next-steps/featured-card-skeleton';

// Basic usage during loading state
function NextStepsSection() {
  const { data: featuredCards, isLoading } = useFeaturedCards();

  return (
    <div className="grid gap-4">
      {isLoading ? (
        // Show skeleton while loading
        <>
          <FeaturedSkeleton />
          <FeaturedSkeleton />
          <FeaturedSkeleton />
        </>
      ) : (
        // Show actual content when loaded
        featuredCards?.map((card) => (
          <FeaturedCard key={card.id} {...card} />
        ))
      )}
    </div>
  );
}

// Usage with conditional rendering
function FeaturedCardsGrid({ isLoading, cards }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <FeaturedSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <FeaturedCard key={card.id} {...card} />
      ))}
    </div>
  );
}
```

## Functionality

- **Layout Matching**: Mimics the exact layout structure of the actual featured card with appropriate spacing
- **Dimension Consistency**: Uses fixed height (`h-[442px]`) to prevent layout shifts when content loads
- **Progressive Loading**: Displays multiple skeleton elements representing different content sections:
  - Title area (75% width, medium height)
  - Main content area (full width, large height)
  - Action button area (full width, medium height)
  - Footer metadata (two elements with different widths)
- **Animation**: Inherits skeleton animation from the base `Skeleton` component
- **Responsive Design**: Skeleton elements adapt to container width using relative sizing

## State Management

**No State Management** - This is a pure presentational component with no internal state. Loading states are managed by parent components using TanStack Query or other data fetching solutions.

## Side Effects

**No Side Effects** - This component performs no API calls, data fetching, or external interactions. It's purely a visual placeholder.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Provides the base `Skeleton` component with loading animations
- `./base-featured-card` - Provides the container structure and base styling

### External Dependencies
- **React** - Core framework
- **Tailwind CSS** - Styling classes

## Integration

### Application Architecture
```
Next Steps Section
├── Featured Cards Container
│   ├── FeaturedSkeleton (loading state)
│   └── FeaturedCard (loaded state)
└── Data Fetching Layer (TanStack Query)
```

### Data Flow
1. Parent component initiates data fetching with TanStack Query
2. During `isLoading` state, renders `FeaturedSkeleton` components
3. When data loads successfully, replaces skeletons with actual `FeaturedCard` components
4. Skeleton maintains consistent layout to prevent UI shifts

### Common Integration Patterns
```tsx
// Pattern 1: Array-based skeleton rendering
{isLoading && Array.from({ length: cardCount }).map((_, i) => (
  <FeaturedSkeleton key={`skeleton-${i}`} />
))}

// Pattern 2: Conditional with fallback
{isLoading ? <FeaturedSkeleton /> : <FeaturedCard {...data} />}

// Pattern 3: Grid layout preservation
<div className="grid grid-cols-3 gap-4">
  {isLoading 
    ? Array(6).fill(0).map((_, i) => <FeaturedSkeleton key={i} />)
    : cards.map(card => <FeaturedCard key={card.id} {...card} />)
  }
</div>
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: No client-side features, rendered on server
- ✅ **Flat Component Structure**: Simple composition without deep nesting
- ✅ **Single Responsibility**: Focused solely on loading state presentation
- ✅ **Reusable Design**: Can be used across different featured card contexts

### Performance Considerations
- **Lightweight Rendering**: Minimal DOM elements with efficient CSS classes
- **Layout Stability**: Fixed dimensions prevent cumulative layout shift (CLS)
- **Animation Efficiency**: Leverages CSS-based skeleton animations

### Usage Guidelines
- Use consistent skeleton count matching expected content
- Maintain skeleton visibility duration appropriate for data loading times
- Ensure skeleton layout matches actual content structure
- Consider accessibility by providing appropriate loading indicators for screen readers

### Anti-Patterns to Avoid
- ❌ Don't add client-side state or effects to skeleton components
- ❌ Don't make skeleton dimensions dynamic based on unknown content
- ❌ Don't use skeletons for error states (use proper error components)
- ❌ Don't nest multiple skeleton components unnecessarily