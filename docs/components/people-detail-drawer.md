# PeopleDetailDrawer Component

## Purpose

The `PeopleDetailDrawer` component provides a mobile-optimized drawer interface for displaying detailed information about a person entity. It includes the person's basic information, biographical details, search integration controls, and related articles. The component serves as a comprehensive detail view that allows users to explore person entities while maintaining the ability to add them to search queries.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by usage of hooks and state management). This is necessary because the component:
- Uses Zustand store hooks (`useEntityDetailDrawerStore`)
- Manages interactive drawer state
- Handles user interactions for search inclusion/exclusion

## Props Interface

### PeopleDetail Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `Person` | Yes | Person entity data containing name, abstract, birth date, image, and Wikidata ID |
| `articleQuery` | `AllEndpointParams` | Yes | Search parameters used for querying related articles |

### PeopleDrawer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleQuery` | `AllEndpointParams` | Yes | Search parameters passed through to the PeopleDetail component |

## Usage Example

```tsx
import { PeopleDrawer, PeopleDetail } from '@/components/drawers/people-detail-drawer';

// Using the full drawer component (recommended)
function SearchInterface() {
  const articleQuery = {
    q: 'technology',
    size: 10,
    sortBy: 'relevance',
    // ... other search parameters
  };

  return (
    <div>
      {/* Other search interface components */}
      <PeopleDrawer articleQuery={articleQuery} />
    </div>
  );
}

// Using the detail component directly (for custom layouts)
function CustomPeopleView() {
  const personData = {
    name: 'Jane Doe',
    abstract: 'Technology entrepreneur and innovator...',
    dateOfBirth: { time: '1980-05-15' },
    image: { url: 'https://example.com/jane-doe.jpg' },
    wikidataId: 'Q123456'
  };

  const query = {
    q: 'startups',
    size: 20,
    sortBy: 'pubDate'
  };

  return (
    <PeopleDetail 
      data={personData} 
      articleQuery={query} 
    />
  );
}
```

## Functionality

### Core Features

- **Person Information Display**: Shows avatar, name, birth date with calculated age
- **Search Integration**: Provides include/exclude controls for adding person to search queries
- **Related Articles**: Displays recent articles related to the person
- **Biographical Information**: Shows abstract/description when available
- **Mobile-Optimized Layout**: Responsive design optimized for mobile drawer interface

### Interactive Elements

- **Search Controls**: Two instances of `SearchExcludeInclude` for different interaction contexts
- **Drawer Management**: Open/close functionality with smooth transitions
- **Article Exploration**: Related articles section with dedicated search functionality

## State Management

### Zustand Store Integration

```tsx
const isOpen = useEntityDetailDrawerStore((state) => state.isOpen);
const setIsOpen = useEntityDetailDrawerStore((state) => state.setIsOpen);
const people = useEntityDetailDrawerStore((state) => state.people);
```

The component relies on `useEntityDetailDrawerStore` for:
- **Drawer State**: Managing open/closed state
- **Person Data**: Accessing the selected person entity
- **State Synchronization**: Coordinating with other parts of the application

## Side Effects

### Data Transformation
- **Date Processing**: Converts birth dates and calculates age using `convertDateAndCalculateAge`
- **Search Query Enhancement**: Adds `personWikidataId` to article queries for related content

### User Interactions
- **Search Integration**: Adds/removes person from active search filters
- **Navigation**: Updates application state when drawer opens/closes

## Dependencies

### UI Components
- `Avatar` - Person image display
- `EntityDrawerMobile` - Mobile drawer container
- `PropertyBlockMobileDrawer` - Structured property display
- `Typography` - Text styling and hierarchy

### Search Components
- `SearchDrawerArticles` - Related articles display
- `SearchExcludeInclude` - Search filter controls

### External Dependencies
- `useEntityDetailDrawerStore` - Global state management
- `convertDateAndCalculateAge` - Date utility function

## Integration

### Application Architecture
The component integrates into the larger search and discovery system by:

1. **Search Integration**: Connects with the main search interface through `SearchExcludeInclude` components
2. **Entity Management**: Works with the global entity drawer store for coordinated state
3. **Article Discovery**: Links to the article search system for related content exploration
4. **Mobile Experience**: Provides touch-optimized interaction patterns

### Data Flow
```
Entity Selection → Store Update → Drawer Opens → Person Details Display → User Actions → Search Updates
```

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: Properly separated into `PeopleDetail` (presentation) and `PeopleDrawer` (container)

✅ **State Management**: Uses Zustand for client state management following our patterns

✅ **Reusability**: `PeopleDetail` can be used independently of the drawer context

✅ **UI Component Usage**: Leverages established UI components from `/ui/` directory

✅ **Conditional Rendering**: Implements proper null checks and conditional rendering patterns

### Implementation Patterns

- **Props Interface**: Clean separation of concerns between data and query parameters
- **Error Handling**: Graceful handling of missing data (conditional rendering)
- **Performance**: Efficient state selection from Zustand store
- **Accessibility**: Proper semantic structure with headings and property blocks

### Mobile-First Design
- Optimized spacing and touch targets
- Responsive layout that works within drawer constraints
- Efficient use of screen real estate with collapsible sections