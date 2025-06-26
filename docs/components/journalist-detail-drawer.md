# JournalistDetailDrawer Component

## Purpose

The `JournalistDetailDrawer` component provides a mobile-optimized drawer interface for displaying detailed journalist information and their associated articles. It serves as a comprehensive view that allows users to explore journalist profiles, view their recent articles, and perform search inclusion/exclusion operations within the media search application.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through:
- Zustand store integration (`useEntityDetailDrawerStore`)
- Interactive drawer behavior with state management
- User interactions for search filtering and social media links

## Props Interface

### JournalistDetail Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `row` | `EntityCount` | Yes | Entity data containing the journalist key and count information |
| `articleQuery` | `AllEndpointParams` | Yes | Current search query parameters for fetching related articles |

### JournalistDrawer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleQuery` | `AllEndpointParams` | Yes | Search query parameters passed to the detail component |

## Usage Example

```tsx
import { JournalistDrawer, JournalistDetail } from '@/components/drawers/journalist-detail-drawer';
import { AllEndpointParams, EntityCount } from '@/lib/types';

// Using the full drawer component
function SearchResultsPage() {
  const articleQuery: AllEndpointParams = {
    query: 'technology',
    sortBy: 'pubDate',
    size: 10
  };

  return (
    <div>
      {/* Other search components */}
      <JournalistDrawer articleQuery={articleQuery} />
    </div>
  );
}

// Using just the detail component
function JournalistProfile() {
  const journalistRow: EntityCount = {
    key: 'journalist-123',
    count: 45
  };

  const articleQuery: AllEndpointParams = {
    query: '',
    size: 20,
    sortBy: 'pubDate'
  };

  return (
    <JournalistDetail 
      row={journalistRow} 
      articleQuery={articleQuery} 
    />
  );
}
```

## Functionality

### Core Features

- **Journalist Profile Display**: Shows avatar, name, title, and professional information
- **Performance Metrics**: Displays monthly posting frequency and top categories/topics/sources
- **Social Media Integration**: Provides LinkedIn profile access with branded social buttons
- **Search Integration**: Enables include/exclude filtering for journalist-specific searches
- **Article Discovery**: Shows recent articles by the journalist with search functionality
- **Mobile-Optimized Layout**: Responsive design with drawer-based navigation

### Interactive Elements

- **Search Filtering**: Include/exclude journalist from current searches
- **External Links**: Direct navigation to journalist's LinkedIn profile
- **Article Browsing**: Access to journalist's recent articles with search capabilities

## State Management

### Zustand Integration
- **Entity Drawer Store**: Manages drawer open/close state and selected journalist data
- **Global State**: Coordinates with application-wide entity selection system

### TanStack Query
- **Data Fetching**: Uses `useJournalistById` hook for journalist profile data
- **Caching**: Automatic caching and background updates for journalist information

## Side Effects

### API Interactions
- **Journalist Data Fetching**: Retrieves detailed journalist profile information
- **Article Search**: Performs filtered searches for journalist-specific articles

### External Navigation
- **Social Media Links**: Opens LinkedIn profiles in new browser tabs
- **Search State Updates**: Modifies global search filters based on user interactions

## Dependencies

### UI Components
- `Avatar` - Profile image display with fallback handling
- `EntityDrawerMobile` - Mobile drawer container component
- `PropertyBlockMobileDrawer` - Structured property display blocks
- `SocialButton` - Branded social media interaction buttons
- `Typography` - Consistent text styling and hierarchy

### Feature Components
- `SearchDrawerArticles` - Article listing with search functionality
- `SearchExcludeInclude` - Search filter manipulation controls

### Hooks & Services
- `useJournalistById` - TanStack Query hook for journalist data
- `useEntityDetailDrawerStore` - Zustand store for drawer state management

### Utilities
- `nFormatter` - Number formatting for metrics display

## Integration

### Application Architecture
- **Search System Integration**: Seamlessly integrates with the main search functionality
- **Entity Management**: Part of the broader entity detail system alongside sources, topics, etc.
- **Mobile-First Design**: Complements the responsive design strategy of the application

### Data Flow
1. User selects journalist from search results
2. Zustand store updates with journalist selection
3. Drawer opens with journalist data fetched via TanStack Query
4. User can interact with search filters and view related articles

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Properly separated into `JournalistDetail` and `JournalistDrawer` for Lego-block architecture
- ✅ **State Management**: Correctly uses TanStack Query for server state and Zustand for client state
- ✅ **Reusability**: Leverages UI components from `/ui/` directory and feature-specific components
- ✅ **Conditional Rendering**: Implements proper loading states and null safety

### Performance Considerations
- **Lazy Loading**: Only renders when journalist data is available
- **Optimized Queries**: Uses specific journalist ID for targeted data fetching
- **Efficient Re-renders**: Zustand selectors prevent unnecessary re-renders

### User Experience
- **Progressive Disclosure**: Shows essential information first, detailed data in expandable sections
- **Accessibility**: Proper semantic structure with Typography components
- **Mobile Optimization**: Touch-friendly interface with appropriate spacing and sizing