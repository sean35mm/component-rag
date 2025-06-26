# ExcludedPeopleItem Component

## Purpose

The `ExcludedPeopleItem` component renders a list item for displaying people that have been excluded from search filters. It shows person information including avatar, name, and description with proper loading states and fallback content. This component is part of the filters drawer interface for managing excluded people in search results.

## Component Type

**Client Component** - Uses `'use client'` implicitly through hooks like `useAccessToken` and `usePeopleByWikidataIdSuspense`. The component requires client-side interactivity for handling click events and managing suspense boundaries for data fetching.

## Props Interface

### ExcludedPeopleItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `wikidataId` | `string` | Yes | The Wikidata identifier for the person to display |
| `onClick` | `() => void` | Yes | Callback function triggered when the item is clicked |

### ExcludedPeopleItemSuspenseProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `wikidataId` | `string` | Yes | The Wikidata identifier for the person |
| `onClick` | `() => void` | Yes | Click handler callback |
| `isAuthorizedAndVerified` | `boolean` | Yes | Whether user has verified authorization |
| `isPublic` | `boolean` | Yes | Whether content is publicly accessible |
| `token` | `AccessToken` | No | Access token for authenticated requests |

## Usage Example

```tsx
import { ExcludedPeopleItem } from '@/components/filters/filters-drawer/excluded-people-item';

// In a filters drawer component
function FiltersDrawer() {
  const excludedPeople = ['Q123456', 'Q789012']; // Wikidata IDs
  
  const handleRemovePerson = (wikidataId: string) => {
    // Remove person from excluded filters
    removeFromExcludedPeople(wikidataId);
  };

  return (
    <div className="excluded-people-list">
      {excludedPeople.map((wikidataId) => (
        <ExcludedPeopleItem
          key={wikidataId}
          wikidataId={wikidataId}
          onClick={() => handleRemovePerson(wikidataId)}
        />
      ))}
    </div>
  );
}
```

## Functionality

- **Person Data Display**: Fetches and displays person information from Wikidata ID
- **Avatar Rendering**: Shows person's image or fallback avatar with name initials
- **Loading States**: Implements Suspense pattern for graceful loading experience
- **Fallback Content**: Displays placeholder content when data is unavailable
- **Click Interaction**: Handles user clicks for removing excluded people
- **Authorization Handling**: Adapts behavior based on user authentication status

## State Management

- **TanStack Query**: Uses `usePeopleByWikidataIdSuspense` hook for server state management
- **Suspense Integration**: Leverages React Suspense for declarative loading states
- **No Local State**: Component is stateless, relying on props and server data

## Side Effects

- **API Calls**: Fetches person data from external service via `usePeopleByWikidataIdSuspense`
- **Conditional Rendering**: Dynamically renders based on authentication state
- **Image Loading**: Triggers avatar image loading from external URLs

## Dependencies

### Components
- `Avatar` - UI component for displaying person avatars
- `ExcludedFilterListItemBase` - Base component for excluded filter items

### Hooks
- `useAccessToken` - Context hook for authentication state
- `usePeopleByWikidataIdSuspense` - Query hook for fetching person data

### Types
- `AccessToken` - Type definition for authentication tokens

## Integration

The component integrates into the larger application architecture as:

- **Filters System**: Part of the excluded people filtering mechanism
- **Search Interface**: Enables users to manage excluded people in search results  
- **Drawer UI**: Renders within the filters drawer for filter management
- **Data Layer**: Connects to person data services via TanStack Query
- **Authentication**: Respects user authorization levels for data access

## Best Practices

- ✅ **Proper Decomposition**: Uses base component (`ExcludedFilterListItemBase`) for common functionality
- ✅ **Suspense Pattern**: Implements proper loading states with fallback components
- ✅ **State Management**: Uses TanStack Query for server state, avoiding unnecessary local state
- ✅ **Component Separation**: Separates concerns between data fetching and presentation
- ✅ **Error Boundaries**: Graceful fallback when authentication fails or data unavailable
- ✅ **Reusable Patterns**: Follows established patterns for excluded filter items
- ✅ **Accessibility**: Uses semantic Avatar component with proper naming
- ✅ **Performance**: Conditional rendering based on authentication prevents unnecessary requests

## Exported Constants

```tsx
// Available for consistent fallback text across the application
export const EXCLUDED_PEOPLE_ITEM_TITLE = 'Person';
export const EXCLUDED_PEOPLE_ITEM_SUBTITLE = 'Role';
```