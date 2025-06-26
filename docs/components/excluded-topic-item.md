# ExcludedTopicItem Component

## Purpose

The `ExcludedTopicItem` component renders a list item representing a topic that has been excluded from filters. It displays topic information including name, category, and an avatar icon, with proper loading states and fallback handling for different authentication scenarios.

## Component Type

**Client Component** - Uses React Suspense, hooks (`useAccessToken`, `useTopicByNameSuspense`), and manages interactive state for click handlers.

## Props Interface

### ExcludedTopicItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name of the topic to display |
| `onClick` | `() => void` | Yes | Callback function triggered when the item is clicked |

### ExcludedTopicItemSuspenseProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name of the topic to display |
| `onClick` | `() => void` | Yes | Callback function triggered when the item is clicked |
| `isAuthorizedAndVerified` | `boolean` | Yes | Whether the user is authenticated and verified |
| `isPublic` | `boolean` | Yes | Whether the content is publicly accessible |
| `token` | `AccessToken` | No | Authentication token for API requests |

## Usage Example

```tsx
import { ExcludedTopicItem } from '@/components/filters/filters-drawer/excluded-topic-item';

function FiltersDrawer() {
  const handleRemoveExcludedTopic = (topicName: string) => {
    // Logic to remove topic from excluded filters
    console.log(`Removing ${topicName} from excluded topics`);
  };

  return (
    <div className="filters-drawer">
      <h3>Excluded Topics</h3>
      <ExcludedTopicItem
        name="technology"
        onClick={() => handleRemoveExcludedTopic('technology')}
      />
      <ExcludedTopicItem
        name="sports"
        onClick={() => handleRemoveExcludedTopic('sports')}
      />
    </div>
  );
}
```

## Functionality

- **Dynamic Topic Loading**: Fetches topic data using Suspense for better UX
- **Authentication-Aware**: Adapts behavior based on user authentication status
- **Fallback Handling**: Provides graceful degradation when topic data is unavailable
- **Interactive UI**: Handles click events for topic removal/management
- **Visual Representation**: Displays topic avatar, name, and category information

## State Management

- **TanStack Query**: Uses `useTopicByNameSuspense` hook for server state management of topic data
- **Context State**: Leverages `useAccessToken` context for authentication state
- **No Local State**: Component is stateless, relying on props and external state sources

## Side Effects

- **API Calls**: Fetches topic data via `useTopicByNameSuspense` when authenticated
- **Conditional Rendering**: Triggers different render paths based on authentication status
- **Click Events**: Executes provided `onClick` callback when item is interacted with

## Dependencies

### Components
- `Avatar` - UI component for displaying topic avatars
- `ExcludedFilterListItemBase` - Base component for excluded filter list items

### Hooks
- `useAccessToken` - Context hook for authentication state
- `useTopicByNameSuspense` - Query hook for fetching topic data

### Types
- `AccessToken` - Type definition for authentication tokens

## Integration

The component integrates into the filters system architecture:

1. **Filters Drawer**: Part of the filtering UI system
2. **Topic Management**: Connects to topic data layer via query hooks
3. **Authentication Flow**: Respects user authentication state for data access
4. **Suspense Boundary**: Participates in React's concurrent features for better UX

## Best Practices

✅ **Proper Component Decomposition**: 
- Separates concerns with distinct components for different states
- Uses composition pattern with base components

✅ **Suspense Implementation**:
- Provides meaningful fallback component during loading
- Gracefully handles unauthenticated states

✅ **State Management Alignment**:
- Uses TanStack Query for server state (topic data)
- Leverages context for shared authentication state

✅ **Conditional Rendering Logic**:
- Implements proper authentication checks before data fetching
- Provides consistent UX across different user states

✅ **Reusability Pattern**:
- Accepts generic props for flexible usage
- Delegates specialized rendering to base components

The component follows the Lego block architecture by composing smaller, focused components and properly handling different application states through our established patterns.