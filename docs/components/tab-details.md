# SearchTabDetails Component

## Purpose

The `SearchTabDetails` component renders the header section for deep search tabs, providing navigation breadcrumbs and action buttons for search operations. It displays contextual information about the current search, including the search name, and provides actions like creating signals, sharing, and managing saved searches.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Relies on the `useAccessToken` context hook for authentication state
- Uses `useMemo` for computed values based on reactive state
- Manages interactive UI elements that require client-side event handling

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the component |
| `entity` | `SavedDeepSearch` | No | Saved search entity data when viewing a saved search |
| `metadata` | `DeepSearchMetadata` | Yes | Metadata about the current search including name and search parameters |

## Usage Example

```tsx
import { SearchTabDetails } from '@/components/search/tab-details';

// Basic usage with search metadata
function SearchPage() {
  const searchMetadata = {
    name: 'AI Research Papers',
    query: 'artificial intelligence machine learning',
    // ... other metadata
  };

  return (
    <div>
      <SearchTabDetails metadata={searchMetadata} />
      {/* Search results content */}
    </div>
  );
}

// With saved search entity
function SavedSearchPage() {
  const savedSearch = {
    uuid: 'search-123',
    name: 'AI Research Papers',
    createdAt: '2024-01-15T10:00:00Z',
    // ... other saved search properties
  };

  const searchMetadata = {
    name: savedSearch.name,
    // ... metadata from saved search
  };

  return (
    <SearchTabDetails 
      entity={savedSearch}
      metadata={searchMetadata}
      className="border-b"
    />
  );
}
```

## Functionality

### Core Features
- **Breadcrumb Navigation**: Displays hierarchical navigation showing "Recent" → Search name
- **Dynamic Search Icon**: Shows deep search icon alongside the search name
- **Action Buttons**: Provides search-specific actions (create signal, share)
- **Saved Search Management**: Shows additional actions for saved searches
- **Authentication-Aware Labels**: Adjusts generic tab names based on user authentication status

### Key Behaviors
- Automatically generates breadcrumb navigation based on search metadata
- Conditionally renders folder entity actions only for saved searches
- Uses authentication state to determine appropriate generic tab names
- Transforms saved search data into folder entity format for consistent UI

## State Management

- **Context Usage**: Consumes `useAccessToken` context for authentication state
- **Computed State**: Uses `useMemo` for:
  - Breadcrumb items based on metadata and auth state
  - Folder entity transformation from saved search data
- **No Local State**: Component is purely presentational with computed derived state

## Side Effects

- **No Direct Side Effects**: Component doesn't trigger API calls or mutations
- **Context Subscription**: Reacts to authentication state changes from context
- **Memoization**: Optimizes re-renders through memoized computations

## Dependencies

### Internal Components
- `TabDetails` - Base tab header component
- `IconDeepSearch` - Search-specific icon
- `FolderEntityItemActionsContainer` - Actions for saved searches
- `SearchCreateSignalButton` - Signal creation functionality
- `SearchShareButton` - Search sharing functionality

### Hooks & Contexts
- `useAccessToken` - Authentication state management

### Types & Utils
- `DeepSearchMetadata`, `SavedDeepSearch`, `TabEntity` - Type definitions
- `TABS_TO_HREF_BASE` - URL routing utilities
- `GENERIC_TAB_TO_NAME` - Tab naming conventions

## Integration

### Application Architecture
- **Search Domain**: Part of the search feature module
- **Tab System**: Integrates with the main tab management system
- **Navigation**: Connects to the breadcrumb navigation system
- **Authentication Flow**: Respects user authentication state throughout

### Layout Integration
```tsx
// Typical integration in search layouts
<div className="search-layout">
  <SearchTabDetails 
    entity={savedSearch}
    metadata={searchMetadata}
  />
  <SearchFilters />
  <SearchResults />
</div>
```

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Composes multiple focused sub-components
- ✅ **State Management**: Uses context for authentication, memoization for performance
- ✅ **Client Component Justification**: Properly uses client component for interactive features
- ✅ **Prop Interface**: Clear, typed interface with optional/required distinctions

### Usage Patterns
- Always provide `metadata` as it contains essential search information
- Use `entity` prop when displaying saved searches for additional functionality
- Apply `className` for layout-specific styling needs
- Ensure authentication context is available in component tree

### Performance Considerations
- Memoized computations prevent unnecessary re-renders
- Conditional rendering of folder actions reduces DOM complexity
- Efficient dependency arrays in `useMemo` hooks