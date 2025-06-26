# useStoryBreadcrumb Hook

## Purpose

The `useStoryBreadcrumb` hook generates breadcrumb navigation items for story pages, creating a navigation path from the trending page through the story's top categories. It provides consistent breadcrumb structure across story detail pages while displaying the most relevant category information.

## Component Type

**Client Component Hook** - This hook uses React's `useMemo` for memoization and handles JSX elements, requiring client-side execution. It's designed to be consumed by components that need breadcrumb navigation for story pages.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `StoryWithPageInfo` | Yes | Story object containing categories and other metadata used to build the breadcrumb navigation |

### Type Definitions

```tsx
interface StoryWithPageInfo {
  categories: Array<{
    name: string;
    count: number;
  }>;
  // ... other story properties
}
```

## Usage Example

```tsx
'use client';

import { useStoryBreadcrumb } from '@/components/hooks/use-story-breadcrumb';
import { BreadcrumbContainer } from '@/components/ui/breadcrumb-container';

function StoryDetailPage({ story }: { story: StoryWithPageInfo }) {
  const breadcrumbItems = useStoryBreadcrumb(story);

  return (
    <div className="story-detail">
      <BreadcrumbContainer items={breadcrumbItems} />
      
      <article>
        <h1>{story.title}</h1>
        {/* Story content */}
      </article>
    </div>
  );
}

// Usage in a story layout component
function StoryLayout({ children, story }: { 
  children: React.ReactNode; 
  story: StoryWithPageInfo; 
}) {
  const breadcrumbItems = useStoryBreadcrumb(story);

  return (
    <div>
      <BreadcrumbContainer items={breadcrumbItems} />
      {children}
    </div>
  );
}
```

## Functionality

### Core Features

- **Dynamic Breadcrumb Generation**: Creates breadcrumb items based on story data
- **Category Prioritization**: Sorts categories by count and displays top 2 most relevant categories
- **Navigation Integration**: Provides links back to trending page
- **Memoized Performance**: Uses `useMemo` to prevent unnecessary recalculations
- **Responsive Icons**: Includes trending icon with responsive sizing

### Breadcrumb Structure

1. **Trending Link**: Always includes link to `/trending` with trend icon
2. **Category Labels**: Shows up to 2 highest-count categories as comma-separated labels

### Category Logic

```tsx
// Categories are sorted by count (descending) and limited to top 2
categories
  .toSorted((a, b) => b.count - a.count)
  .slice(0, 2)
  .map((it) => it.name)
  .join(', ')
```

## State Management

- **Memoization**: Uses React's `useMemo` to cache breadcrumb items based on story dependency
- **No External State**: Pure function that derives breadcrumb state from props
- **Performance Optimization**: Prevents recreation of breadcrumb items on every render

## Side Effects

- **None**: This hook is a pure function with no side effects
- **No API Calls**: Works with provided story data
- **No External Mutations**: Only transforms input data into breadcrumb format

## Dependencies

### Internal Dependencies
- `@/components/icons` - ArrowTrendUp icon component
- `@/components/ui/breadcrumb-container` - BreadcrumbItem type definition
- `@/lib/types` - StoryWithPageInfo type

### External Dependencies
- `React` - useMemo hook for memoization

## Integration

### Application Architecture Role

```
Story Pages
├── Story Detail Component
│   ├── useStoryBreadcrumb() ← Generates navigation
│   ├── BreadcrumbContainer ← Renders breadcrumb UI
│   └── Story Content
├── Trending Page (/trending) ← Breadcrumb target
└── Category Navigation ← Breadcrumb labels
```

### Data Flow

1. **Story Data Input**: Receives story with categories from parent component
2. **Processing**: Sorts and filters categories, creates breadcrumb structure
3. **Output**: Returns memoized array of BreadcrumbItem objects
4. **Rendering**: Consumed by BreadcrumbContainer for UI display

### Navigation Context

- **Entry Point**: Trending page serves as consistent navigation anchor
- **Category Context**: Displays story's domain through top categories
- **User Journey**: Provides clear path back to story discovery

## Best Practices

### Architecture Adherence

✅ **Single Responsibility**: Focused solely on breadcrumb generation logic  
✅ **Memoization**: Proper performance optimization with useMemo  
✅ **Type Safety**: Full TypeScript integration with proper interfaces  
✅ **Separation of Concerns**: Logic separated from UI rendering  
✅ **Reusability**: Can be used across different story page layouts  

### Usage Patterns

```tsx
// ✅ Good: Use in client components that need breadcrumb navigation
function StoryPage({ story }: { story: StoryWithPageInfo }) {
  const breadcrumbs = useStoryBreadcrumb(story);
  return <BreadcrumbContainer items={breadcrumbs} />;
}

// ✅ Good: Memoization works automatically with stable story references
const MemoizedStoryPage = memo(StoryPage);

// ❌ Avoid: Don't recreate story object on every render
function BadUsage() {
  const story = { categories: [...] }; // Creates new object each render
  const breadcrumbs = useStoryBreadcrumb(story); // Memoization broken
}
```

### Performance Considerations

- **Stable References**: Ensure story prop has stable reference for effective memoization
- **Category Limit**: Built-in limit of 2 categories prevents overly long breadcrumbs
- **Lightweight Processing**: Minimal computation with efficient sorting and slicing