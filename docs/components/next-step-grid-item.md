# NextStepGridItem Component

## Purpose
A polymorphic grid item component that renders different types of next-step recommendations (Search, Story, Signal) with appropriate badges, click handlers, and navigation logic. This component serves as the primary building block for displaying actionable next steps to users after completing searches or viewing content.

## Component Type
**Client Component** - Uses `'use client'` directive due to:
- Interactive click handlers and navigation
- Browser-specific APIs (router, hover states)
- Real-time state management with hooks
- Dynamic rendering based on user authentication

## Props Interface

### NextStepGridItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `NextStepRecommendationType` | Yes | The recommendation item to render (Search, Story, or Signal) |
| `onClick` | `(item: NextStepRecommendationType) => Promise<void>` | No | Optional callback executed when item is clicked |

### NextStepStoryGridItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `StoryNextStepRecommendation` | Yes | Story recommendation data including slug and name |
| `onClick` | `(item: StoryNextStepRecommendation) => Promise<void>` | No | Optional callback for story click tracking |

### NextStepSearchGridItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `SearchNextStepRecommendation` | Yes | Search recommendation with title and query parameters |
| `onClick` | `(item: SearchNextStepRecommendation) => Promise<void>` | No | Optional callback for search initiation tracking |

### NextStepSignalGridItem
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `SignalNextStepRecommendation` | Yes | Signal recommendation with query and title data |

### NextStepGridItemContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Display title for the recommendation |
| `featureType` | `BadgeType` | Yes | Badge type (SEARCH, STORY, SIGNAL) |
| `disabled` | `boolean` | No | Whether the item should appear disabled (default: false) |

## Usage Example

```tsx
import { NextStepGridItem } from '@/components/answers/next-steps/next-step-grid-item';

function NextStepsSection() {
  const recommendations = useNextStepRecommendations();

  const handleItemClick = async (item: NextStepRecommendationType) => {
    // Track user interaction
    await trackNextStepClick(item);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {recommendations.map((item) => (
        <NextStepGridItem
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}

// Usage with specific item types
function SearchRecommendations() {
  const searchItems = useSearchRecommendations();

  return (
    <div className="grid grid-cols-1 gap-2">
      {searchItems.map((item) => (
        <NextStepSearchGridItem
          key={item.id}
          item={item}
          onClick={async (item) => {
            await analytics.track('search_recommendation_clicked', {
              query: item.articlesQuery.query,
              title: item.title
            });
          }}
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Polymorphic Rendering**: Automatically renders appropriate sub-component based on item type
- **Authentication-Aware**: Different behavior for public/private users and authorization states
- **Interactive States**: Hover effects with dynamic arrow icon display
- **Accessibility**: Proper semantic markup with links and buttons
- **Responsive Design**: Adapts to grid layouts with flexible sizing

### Navigation Behavior
- **Story Items**: Direct navigation to story pages with slug-based URLs
- **Search Items**: Initiates deep search with query preservation and URL parameter handling
- **Signal Items**: Conditional navigation based on user limits and authorization status

### Visual States
- **Hover Effects**: Animated arrow icon appears on hover
- **Loading States**: Skeleton placeholder during authentication resolution
- **Disabled States**: Visual and functional disable for restricted access

## State Management

### Local State
- **Hover State**: `useHover` hook for interactive visual feedback
- **Refs**: Component references for hover detection

### Context Dependencies
- **Authentication**: `useAccessToken` for user authorization status
- **Usage Limits**: `useUsageContext` for signal creation limits
- **Public Features**: `usePublicExplorePage` for non-authenticated users

### Route State
- **Navigation State**: `useRouteState` for preserving state across route changes
- **URL Parameters**: Preservation of UI state during navigation

## Side Effects

### Navigation Effects
- Programmatic router navigation with Next.js router
- URL parameter preservation across route changes
- State-based navigation for signal creation flow

### Search Initiation
- Deep search activation with query execution
- Public search handling for non-authenticated users
- Search state management and result caching

### User Interaction Tracking
- Optional click callback execution for analytics
- Signal limit checking with toast notifications
- Usage limit enforcement and user feedback

## Dependencies

### Internal Components
- `Card`, `Button`, `Typography` - UI components for layout and styling
- `FeatureBadge`, `Skeleton` - Specialized UI elements
- `PiArrowRightUpLine` - Icon component for interaction feedback

### Hooks & Contexts
- `useDeepSearch` - Search functionality management
- `useSignalCreation` - Signal creation workflow
- `useRouteState` - Route state preservation
- `useUsageContext` - User usage limits and quotas

### Utilities
- `cn` - Conditional className utility
- `preserveUrlParams` - URL parameter preservation
- `getGenericDeepSearchHref` - Search URL generation

## Integration

### Application Architecture
- **Next Steps Flow**: Primary component in recommendation system
- **Search Integration**: Seamless connection to deep search functionality
- **Authentication Layer**: Respects user authorization and access levels
- **Analytics Integration**: Supports tracking through optional callbacks

### Feature Integration
- **Story System**: Direct integration with story routing and display
- **Signal System**: Connects to signal creation and management workflows
- **Search System**: Initiates both public and private search experiences

## Best Practices

### Architecture Adherence
✅ **Flat Component Structure**: Separate components for each item type instead of deep nesting
✅ **Reusable Content Component**: `NextStepGridItemContent` as shared presentation layer
✅ **Context Integration**: Proper use of authentication and usage contexts
✅ **State Isolation**: Each sub-component manages its specific state requirements

### Implementation Patterns
✅ **Polymorphic Design**: Single entry point with type-based rendering
✅ **Conditional Rendering**: Authentication-aware component selection
✅ **Progressive Enhancement**: Graceful degradation for different user states
✅ **URL State Management**: Proper parameter preservation during navigation

### Performance Considerations
✅ **Lazy Loading**: Skeleton states during authentication resolution
✅ **Memoized Callbacks**: `useCallback` for stable click handlers
✅ **Efficient Re-renders**: Minimal state updates and prop drilling

### User Experience
✅ **Immediate Feedback**: Hover states and loading indicators
✅ **Clear Navigation**: Semantic links and proper href attributes
✅ **Error Handling**: Graceful handling of authorization limits and restrictions