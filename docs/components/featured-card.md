# FeaturedCard Component

## Purpose
The `FeaturedCard` component is a smart router component that renders different types of featured cards based on the next step recommendation type. It acts as a dispatcher, determining which specific featured card component to render (search, signal, or story) based on the recommendation's type property.

## Component Type
**Server Component** - This component doesn't require client-side interactivity beyond prop passing and can be rendered on the server. The actual interactivity is handled by the individual featured card components it renders.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `NextStepRecommendationType` | Yes | The next step recommendation object containing type and data |
| `onClick` | `(item: NextStepRecommendationType) => Promise<void>` | No | Optional async click handler for user interactions |

## Usage Example

```tsx
import { FeaturedCard } from '@/components/answers/next-steps/featured-card';
import { NextStepActionType } from '@/lib/types';

// Example with search recommendation
const searchRecommendation = {
  type: NextStepActionType.SEARCH,
  query: "React best practices",
  title: "Learn React Best Practices",
  description: "Discover recommended patterns for React development"
};

// Example with signal recommendation
const signalRecommendation = {
  type: NextStepActionType.SIGNAL,
  title: "Market Signal Alert",
  description: "New trend detected in your industry"
};

// Example with story recommendation
const storyRecommendation = {
  type: NextStepActionType.STORY,
  title: "Success Story",
  description: "How Company X achieved 300% growth",
  url: "/stories/company-x-growth"
};

function NextStepsSection() {
  const handleCardClick = async (item: NextStepRecommendationType) => {
    // Track user interaction
    await analytics.track('featured_card_clicked', {
      type: item.type,
      title: item.title
    });
    
    // Handle navigation or other actions
    if (item.type === NextStepActionType.SEARCH) {
      router.push(`/search?q=${encodeURIComponent(item.query)}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FeaturedCard 
        item={searchRecommendation} 
        onClick={handleCardClick}
      />
      <FeaturedCard 
        item={signalRecommendation} 
        onClick={handleCardClick}
      />
      <FeaturedCard 
        item={storyRecommendation} 
        onClick={handleCardClick}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Type-based Routing**: Dynamically renders appropriate card component based on recommendation type
- **Polymorphic Rendering**: Handles three distinct recommendation types with different data structures
- **Click Handler Delegation**: Passes onClick handler to supported child components
- **Type Safety**: Uses TypeScript type assertions to ensure proper typing for child components
- **Graceful Fallback**: Returns null for unrecognized recommendation types

### Supported Recommendation Types
1. **Search Recommendations**: Renders `FeaturedSearchCard` for search-based next steps
2. **Signal Recommendations**: Renders `FeaturedSignalCard` for market signals and alerts
3. **Story Recommendations**: Renders `FeaturedStoryCard` for case studies and success stories

## State Management
**Stateless Component** - This component doesn't manage any internal state. It serves as a pure routing component that:
- Receives recommendation data via props
- Delegates state management to child components
- Passes through click handlers without modification

## Side Effects
**No Direct Side Effects** - The component itself doesn't perform side effects, but:
- Delegates click handling to child components
- Child components may trigger navigation, analytics, or API calls
- The optional onClick prop can contain async operations

## Dependencies

### Internal Dependencies
- `@/lib/types` - Type definitions for recommendations and actions
- `./featured-search-card` - Search recommendation card component
- `./featured-signal-card` - Signal recommendation card component  
- `./featured-story-card` - Story recommendation card component

### Type Dependencies
- `NextStepRecommendationType` - Union type for all recommendation types
- `SearchNextStepRecommendation` - Search-specific recommendation structure
- `SignalNextStepRecommendation` - Signal-specific recommendation structure
- `StoryNextStepRecommendation` - Story-specific recommendation structure
- `NextStepActionType` - Enum defining available action types

## Integration

### Application Architecture Role
- **Router Component**: Acts as a type-based router within the next steps feature
- **Abstraction Layer**: Provides consistent interface for different recommendation types
- **Feature Boundary**: Encapsulates next step recommendation rendering logic
- **Composition Root**: Composes different featured card components based on data

### Usage Patterns
```tsx
// In recommendation lists
{recommendations.map((item, index) => (
  <FeaturedCard 
    key={`${item.type}-${index}`}
    item={item} 
    onClick={handleRecommendationClick}
  />
))}

// In dashboard widgets
<FeaturedCard 
  item={featuredRecommendation} 
  onClick={trackAndNavigate}
/>
```

## Best Practices

### Architecture Adherence
✅ **Flat Component Structure**: Uses composition over nesting by delegating to specialized components  
✅ **Single Responsibility**: Focuses solely on type-based routing logic  
✅ **Server Component Default**: Remains server-rendered while delegating interactivity to children  
✅ **Domain Organization**: Located in feature-specific directory structure  

### Implementation Notes
- **TODO Identified**: Signal card click tracking needs to be implemented
- **Type Safety**: Uses proper TypeScript type assertions for child component props
- **Graceful Degradation**: Returns null for unsupported types instead of throwing errors
- **Extensibility**: Easy to add new recommendation types by extending the switch statement

### Performance Considerations
- Lightweight routing logic with minimal overhead
- Server-side rendering reduces client bundle size
- Type-based switching is efficient at runtime
- Child components handle their own optimization needs