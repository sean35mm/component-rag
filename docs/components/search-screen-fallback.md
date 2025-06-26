# SearchScreenFallback Component

## Purpose

The `SearchScreenFallback` component provides a loading state skeleton UI that matches the layout of the main search screen. It displays placeholder content while the actual search results are being loaded, maintaining visual consistency and providing users with immediate feedback that content is loading.

## Component Type

**Server Component** - This is a pure presentational component that renders static skeleton placeholders. It doesn't require client-side interactivity, event handlers, or browser APIs, making it suitable as a server component for optimal performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { Suspense } from 'react';
import { SearchScreen } from '@/components/search/search-screen';
import { SearchScreenFallback } from '@/components/search/search-screen-fallback';

export default function SearchPage() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<SearchScreenFallback />}>
        <SearchScreen />
      </Suspense>
    </div>
  );
}

// Or with dynamic imports for code splitting
import dynamic from 'next/dynamic';

const SearchScreen = dynamic(
  () => import('@/components/search/search-screen'),
  {
    loading: () => <SearchScreenFallback />,
  }
);
```

## Functionality

- **Responsive Layout**: Adapts skeleton layout between mobile and desktop viewports using Tailwind breakpoints
- **Search Header Skeleton**: Displays placeholder for search input, action buttons, and user avatar (desktop only)
- **Tab Navigation Skeleton**: Shows placeholders for tab navigation with different layouts for mobile/desktop
- **Summarize Section**: Renders an active `SummarizeFallback` component with supporting metadata placeholders
- **Graph Visualization**: Large skeleton placeholder that matches the expected chart/graph dimensions
- **Results Grid**: Generates 12 result card skeletons with image, text, and metadata placeholders
- **Sidebar Skeleton**: Desktop-only right sidebar placeholder

## State Management

**No state management required** - This component is purely presentational and renders static skeleton content. It doesn't manage any local state, server state, or global state.

## Side Effects

**No side effects** - This component has no side effects, API calls, or external interactions. It's a pure UI component that renders skeleton placeholders.

## Dependencies

### UI Components
- `@/components/ui/skeleton` - Base skeleton component for placeholder elements

### Feature Components
- `@/components/search/summarize` - Imports `SummarizeFallback` for the summarize section

### External Dependencies
- `react` - Core React library for component definition

## Integration

The `SearchScreenFallback` component integrates into the search feature architecture as:

- **Loading State Provider**: Serves as the fallback UI for `Suspense` boundaries wrapping async search components
- **Layout Mirror**: Maintains the exact visual structure of the actual search screen to prevent layout shifts
- **Progressive Enhancement**: Provides immediate visual feedback while heavier search components load
- **Mobile-First Design**: Follows responsive design patterns consistent with the main search interface

```tsx
// Typical integration pattern
<main className="search-layout">
  <Suspense fallback={<SearchScreenFallback />}>
    <SearchResultsContainer />
  </Suspense>
</main>
```

## Best Practices

### ✅ Architectural Compliance

- **Server Component Usage**: Correctly implemented as a server component since no client-side interactivity is needed
- **Component Decomposition**: Properly composed with reusable `Skeleton` components and domain-specific `SummarizeFallback`
- **Responsive Design**: Uses Tailwind classes for consistent responsive behavior
- **Separation of Concerns**: Focused solely on loading state presentation

### ✅ Performance Optimizations

- **Static Rendering**: No props or dynamic content allows for optimal static rendering
- **Skeleton Consistency**: Matches actual content dimensions to prevent layout shift
- **Efficient Rendering**: Uses array mapping for repeated elements rather than duplicated JSX

### ✅ Maintainability

- **Layout Mirroring**: Structure closely matches the actual search screen for easy maintenance
- **Consistent Styling**: Uses design system tokens and standardized spacing
- **Clear Sectioning**: Well-commented sections make it easy to identify corresponding real content areas

### ✅ User Experience

- **Immediate Feedback**: Provides instant visual response while content loads
- **Familiar Layout**: Users can immediately understand what content will appear
- **Responsive Adaptation**: Skeleton layout adapts appropriately for different screen sizes