# PreviewCard Component

## Purpose

The `PreviewCard` component serves as a loading placeholder that mimics the structure and layout of a featured card while content is being fetched or prepared. It provides visual feedback to users during loading states by displaying skeleton elements that match the expected content layout.

## Component Type

**Server Component** - This component contains no interactive elements, event handlers, or client-side state. It renders static skeleton elements and can be safely rendered on the server, improving initial page load performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| None | - | - | - | This component accepts no props and renders a fixed skeleton layout |

## Usage Example

```tsx
import { PreviewCard } from '@/components/home/featured-cards/preview-card';

// Basic usage - typically shown while loading actual content
function FeaturedSection() {
  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ['featured-items'],
    queryFn: fetchFeaturedItems,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        // Show preview cards while loading
        Array.from({ length: 6 }).map((_, index) => (
          <PreviewCard key={`preview-${index}`} />
        ))
      ) : (
        featuredItems?.map((item) => (
          <FeaturedCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

// Usage in Suspense boundaries
function FeaturedCardsSection() {
  return (
    <Suspense 
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PreviewCard />
          <PreviewCard />
          <PreviewCard />
        </div>
      }
    >
      <FeaturedCards />
    </Suspense>
  );
}
```

## Functionality

### Core Features
- **Skeleton Layout**: Renders skeleton elements that mirror the structure of actual featured cards
- **Responsive Design**: Adapts skeleton sizes for different screen sizes using Tailwind's responsive classes
- **Visual Hierarchy**: Maintains proper spacing and proportions to match real content
- **Loading Indication**: Provides clear visual feedback during content loading states

### Layout Structure
- **Title Section**: Skeleton for main title with additional content lines
- **Preview Section**: Full-size skeleton representing media or preview content
- **Footer Section**: Skeleton for footer information or actions

## State Management

**No State Management** - This component is purely presentational and stateless. It doesn't manage any local state, server state, or interact with state management systems.

## Side Effects

**No Side Effects** - The component performs no API calls, subscriptions, or external interactions. It's a pure rendering component focused solely on displaying loading placeholders.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Provides the base skeleton component for loading animations
- `./base-card-container` - Container component that provides the card structure and styling

### External Dependencies
- `React` - Core React library for component definition

## Integration

### Application Architecture Role
- **Loading States**: Primary component for showing loading states in featured card sections
- **User Experience**: Enhances perceived performance by showing content placeholders
- **Layout Consistency**: Maintains visual consistency during loading transitions
- **Suspense Boundaries**: Ideal fallback component for React Suspense boundaries

### Related Components
- Works in conjunction with actual featured card components
- Typically replaced by real content components after data loading
- Part of the featured cards ecosystem in the home section

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as a server component with no client-side requirements

✅ **Component Decomposition**: Utilizes the base card container following the Lego block approach

✅ **Reusability**: Leverages UI components from `/ui/` directory for skeleton elements

✅ **Performance**: Optimized for fast rendering with minimal overhead

### Implementation Patterns
- **Consistent Proportions**: Skeleton elements match the expected dimensions of real content
- **Responsive Design**: Uses responsive classes to adapt to different screen sizes
- **Semantic Structure**: Maintains logical content hierarchy even in loading state
- **Accessibility**: Skeleton components inherit accessibility features from the base UI components

### Usage Guidelines
- Use in arrays for multiple loading cards
- Combine with Suspense boundaries for automatic fallback handling
- Replace with actual content components once data is available
- Consider showing multiple preview cards to match expected content count