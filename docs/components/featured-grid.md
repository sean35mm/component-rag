# FeaturedGrid Component

## Purpose

The `FeaturedGrid` component displays a grid of curated content cards on the home page, showcasing different types of workflows including stories, searches, signals, and answers. It serves as an interactive demonstration of Perigon's capabilities, allowing users to explore various content types through visually appealing cards with analytics tracking.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state with click handlers and analytics tracking
- Uses React hooks for data fetching and memoization
- Requires client-side event handling for user interactions

## Props Interface

### CuratedCard Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `entity` | `CuratedEntity` | Yes | Curated entity containing card data and configuration |

### FeaturedGridContainer Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `cards` | `ReactNode[]` | Yes | Array of card components to render in the grid |

### FeaturedGrid Props
No external props - self-contained component that fetches its own data.

### FeaturedGridFallback Props
No props - renders static loading state.

## Usage Example

```tsx
import { FeaturedGrid, FeaturedGridFallback } from '@/components/home/featured-grid';
import { Suspense } from 'react';

// Basic usage
export function HomePage() {
  return (
    <div>
      <Suspense fallback={<FeaturedGridFallback />}>
        <FeaturedGrid />
      </Suspense>
    </div>
  );
}

// Using individual components for custom layouts
import { CuratedCard, FeaturedGridContainer } from '@/components/home/featured-grid';

export function CustomGrid({ entities }: { entities: CuratedEntity[] }) {
  const cards = entities.map((entity, index) => (
    <CuratedCard key={entity.id} entity={entity} />
  ));
  
  return <FeaturedGridContainer cards={cards} />;
}
```

## Functionality

### Core Features
- **Dynamic Card Rendering**: Renders different card types based on entity configuration
- **Responsive Grid Layout**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Loading States**: Shows skeleton cards while data is fetching
- **Analytics Integration**: Tracks user interactions with individual cards
- **Content Filtering**: Only displays visible curated entities

### Card Type Support
- **Story Cards**: Display story content with navigation
- **Deep Search Cards**: Show search queries with custom imagery
- **Signal Cards**: Present signal-based content
- **Answer Cards**: Display AI-generated answers with prompts

### Interactive Behaviors
- Click tracking with detailed analytics metadata
- Responsive height adjustments (360px mobile, 420px desktop)
- Smooth loading transitions between skeleton and actual content

## State Management

### TanStack Query Integration
```tsx
const {
  data: curatedEntities = [],
  isLoading: isFetchingCards,
  isPending,
} = useCuratedEntities({
  select: useCallback(
    (res: CustomSearchResult<CuratedEntity>) =>
      res.data.filter((entity) => entity.visible),
    []
  ),
});
```

- Uses `useCuratedEntities` hook for server state management
- Implements data filtering to show only visible entities
- Handles loading and pending states for optimal UX

### Local State
- Uses `useMemo` for performance optimization of card rendering
- Implements `useCallback` for stable click handler references

## Side Effects

### Analytics Tracking
```tsx
const handleClick = useCallback(
  (title: string) => {
    const { id, card } = entity;
    const { type } = card;
    return HomePageTracker.carouselCardClicked({ id, type, title });
  },
  [entity]
);
```

### API Interactions
- Fetches curated entities from the backend
- Filters data client-side for visible entities only
- Handles loading and error states gracefully

## Dependencies

### Internal Components
- `Typography` - UI component for consistent text styling
- `AnswersCard`, `DeepSearchCard`, `PreviewCard`, `SignalCard`, `StoryCard` - Specialized card components

### Hooks and Services
- `useCuratedEntities` - Data fetching hook
- `HomePageTracker` - Analytics service
- `cn` - Utility for conditional class names

### Types
- `CuratedEntity` - Main data structure
- `CustomSearchResult` - API response wrapper
- `TabEntity` - Enum for card types

## Integration

### Application Architecture
```
HomePage
├── FeaturedGrid
│   ├── FeaturedGridContainer
│   │   └── CuratedCard[]
│   │       ├── StoryCard
│   │       ├── DeepSearchCard
│   │       ├── SignalCard
│   │       └── AnswersCard
│   └── PreviewCard[] (loading state)
```

### Data Flow
1. `FeaturedGrid` fetches curated entities via TanStack Query
2. Filters visible entities client-side
3. Maps entities to appropriate card components
4. Renders in responsive grid layout with analytics tracking

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` only where necessary for interactivity
- ✅ **Component Decomposition**: Well-structured hierarchy with single responsibilities
- ✅ **TanStack Query Integration**: Proper server state management with caching and loading states
- ✅ **Performance Optimization**: Uses `useMemo` and `useCallback` appropriately

### Code Quality
- ✅ **Type Safety**: Comprehensive TypeScript interfaces
- ✅ **Error Handling**: Graceful fallbacks for loading and error states
- ✅ **Analytics Integration**: Consistent tracking across all interactions
- ✅ **Responsive Design**: Mobile-first approach with progressive enhancement

### Reusability
- ✅ **Modular Exports**: Individual components available for custom compositions
- ✅ **Configurable Layout**: Container component accepts any card array
- ✅ **Fallback Component**: Dedicated loading state component for Suspense boundaries