# ExplorePageTabManager Component

## Purpose

The `ExplorePageTabManager` component manages tab registration for deep search exploration pages. It handles the lifecycle of search tabs by registering them with the global tab manager and synchronizing search metadata with the public explore page context. This component acts as a bridge between individual search instances and the application's tab management system.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages client-side state through the `usePublicExplorePage` context
- Performs side effects with `useEffect` for metadata synchronization
- Computes dynamic values with `useMemo` for href generation

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `metadata` | `DeepSearchMetadata` | Yes | Search metadata containing search name, query parameters, and other search-related information used for tab registration and context updates |

## Usage Example

```tsx
import { ExplorePageTabManager } from '@/components/search/tab-manager';
import { DeepSearchMetadata } from '@/lib/types';

function SearchResultsPage() {
  const searchMetadata: DeepSearchMetadata = {
    name: "AI Research Papers",
    query: {
      articlesQuery: "artificial intelligence machine learning",
      filters: { dateRange: "2024" }
    },
    searchId: "search-123",
    totalResults: 245
  };

  return (
    <div>
      <ExplorePageTabManager metadata={searchMetadata} />
      
      {/* Rest of search results page */}
      <SearchResults />
      <SearchFilters />
    </div>
  );
}

// Usage in a dynamic search page
function DynamicSearchPage({ params }: { params: { query: string } }) {
  const metadata = useSearchMetadata(params.query);
  
  if (!metadata) return <SearchSkeleton />;

  return (
    <>
      <ExplorePageTabManager metadata={metadata} />
      <SearchInterface metadata={metadata} />
    </>
  );
}
```

## Functionality

### Core Features
- **Tab Registration**: Automatically registers search tabs with the global tab manager using search metadata
- **Href Generation**: Computes dynamic URLs for search tabs based on search name and query parameters
- **Metadata Synchronization**: Updates the public explore page context with current search metadata
- **Timestamp Management**: Preserves creation timestamps while updating metadata
- **Search Identity**: Links search instances to their corresponding browser tabs

### Key Behaviors
- Registers tabs with `TabOptions.SEARCH` type for proper categorization
- Maintains metadata consistency across component re-renders
- Generates SEO-friendly URLs for search results pages
- Preserves existing creation timestamps when updating metadata

## State Management

### Context Integration
- **Read/Write**: Uses `usePublicExplorePage` context for search metadata management
- **State Updates**: Merges new metadata with existing state, preserving timestamps
- **State Shape**: Manages `DeepSearchMetadata` objects with search queries and results

### State Patterns
```tsx
// Metadata synchronization pattern
setPublicDeepSearchMetadata((prev) => ({
  ...metadata,
  createdAt: prev?.createdAt ?? new Date().toISOString(),
}));
```

## Side Effects

### Metadata Synchronization
- **Trigger**: Runs when `metadata` prop changes
- **Action**: Updates global search metadata state
- **Preservation**: Maintains existing `createdAt` timestamps
- **Dependencies**: `[metadata, setPublicDeepSearchMetadata]`

### Performance Optimizations
- **Memoized Href**: Computes search URLs only when metadata changes
- **Efficient Updates**: Only triggers context updates when metadata actually changes

## Dependencies

### Internal Dependencies
- `@/components/main-layout/register-general-tab` - Tab registration functionality
- `@/lib/contexts` - Public explore page context provider
- `@/lib/types` - TypeScript definitions for search metadata and tab options
- `@/lib/utils/tab-type-to-href` - URL generation utilities

### Type Dependencies
- `DeepSearchMetadata` - Search metadata structure
- `TabOptions` - Tab type enumeration
- `FC` from React - Functional component typing

## Integration

### Application Architecture
```
Search Flow:
┌─────────────────┐    ┌────────────────────┐    ┌──────────────────┐
│ Search Page     │───▶│ ExplorePageTab     │───▶│ Global Tab       │
│ Component       │    │ Manager            │    │ Manager          │
└─────────────────┘    └────────────────────┘    └──────────────────┘
                                │
                                ▼
                       ┌────────────────────┐
                       │ Public Explore     │
                       │ Page Context       │
                       └────────────────────┘
```

### Context Integration
- Integrates with the public explore page context for metadata sharing
- Connects individual search instances to the global application state
- Enables cross-component search state synchronization

### Tab Management
- Registers with the main layout's tab management system
- Provides search-specific tab configuration and routing
- Enables proper tab restoration and navigation

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client component for state management and side effects
- ✅ **Single Responsibility**: Focused solely on tab management for search pages
- ✅ **Context Integration**: Properly integrates with application-wide context patterns
- ✅ **Performance**: Uses `useMemo` for expensive computations and proper dependency arrays

### Implementation Patterns
- ✅ **Immutable Updates**: Uses spread operator for safe state updates
- ✅ **Timestamp Preservation**: Maintains data integrity across updates
- ✅ **Type Safety**: Leverages TypeScript interfaces for prop validation
- ✅ **Side Effect Management**: Proper `useEffect` usage with correct dependencies

### Integration Guidelines
- Always provide complete `DeepSearchMetadata` objects
- Ensure search pages include this component for proper tab management
- Place early in component tree to ensure timely registration
- Consider error boundaries for search metadata validation