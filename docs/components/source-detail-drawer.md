# SourceDetailDrawer Component

## Purpose

The SourceDetailDrawer component provides a detailed view of news sources in a mobile drawer interface. It displays comprehensive source information including metadata, statistics, and recent articles, while offering filtering options to include or exclude the source from search results.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive drawer state through Zustand store
- Handles user interactions for filtering and navigation
- Renders conditional UI based on client-side state

## Props Interface

### SourceDetail Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `Source` | ✅ | Complete source data object containing all metadata |
| `articleQuery` | `AllEndpointParams` | ✅ | Current search parameters for fetching related articles |

### SourceDrawer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleQuery` | `AllEndpointParams` | ✅ | Search parameters passed to article queries |

## Usage Example

```tsx
import { SourceDrawer } from '@/components/drawers/source-detail-drawer';

export default function SearchPage() {
  const articleQuery = {
    query: 'technology',
    size: 20,
    sortBy: 'relevance' as const
  };

  return (
    <div>
      {/* Search results and other content */}
      <SourceDrawer articleQuery={articleQuery} />
    </div>
  );
}

// Usage with SourceDetail directly
import { SourceDetail } from '@/components/drawers/source-detail-drawer';

const sourceData = {
  name: 'TechCrunch',
  domain: 'techcrunch.com',
  description: 'Technology news and analysis',
  monthlyVisits: 50000000,
  avgMonthlyPosts: 200,
  avgBiasRating: 'left-center',
  paywall: false,
  topCategories: [{ name: 'Technology' }],
  topTopics: [{ name: 'Startups' }],
  logoFavIcon: { url: 'https://example.com/favicon.ico' }
};

<SourceDetail 
  data={sourceData}
  articleQuery={articleQuery}
/>
```

## Functionality

### Core Features

1. **Source Information Display**
   - Source name with favicon
   - Monthly posts and reach statistics
   - Political bias rating with visual indicator
   - Paywall status with icon
   - Top categories and topics

2. **Interactive Filtering**
   - Include/exclude source from search results
   - Filter integration with search system
   - Separate include-only option for article browsing

3. **Article Integration**
   - Recent articles from the source
   - Customized search query for source-specific content
   - Footer with filtering options

4. **External Navigation**
   - Direct link to source website
   - Opens in new tab with external link indicator

## State Management

### Zustand Store Integration
```tsx
const isOpen = useEntityDetailDrawerStore((state) => state.isOpen);
const setIsOpen = useEntityDetailDrawerStore((state) => state.setIsOpen);
const source = useEntityDetailDrawerStore((state) => state.source);
```

- **Entity Detail Drawer Store**: Manages drawer visibility and selected source
- **Reactive State**: Component re-renders when store state changes
- **Centralized Control**: Drawer state managed globally for consistency

## Side Effects

1. **External Navigation**: Opens source website in new tab
2. **Search Filter Updates**: Modifies active search filters when include/exclude actions are triggered
3. **Article Fetching**: Triggers article searches based on source domain

## Dependencies

### UI Components
- `EntityDrawerMobile`: Base drawer container
- `PropertyBlockMobileDrawer`: Consistent property display
- `Typography`, `Button`: Core UI elements
- `Favicon`, `Bias`: Specialized display components

### Feature Components
- `SearchDrawerArticles`: Article listing integration
- `SearchExcludeInclude`: Filter control component

### External Dependencies
- `NextLink`: Next.js navigation
- Custom icons from `@/components/icons`
- Zustand store from `@/lib/contexts`

## Integration

### Search System Integration
```tsx
<SearchDrawerArticles
  searchQuery={{
    ...articleQuery,
    source: domain,
    size: 20,
    sortBy: 'pubDate',
  }}
/>
```

### Filter System Integration
```tsx
<SearchExcludeInclude
  excludeType={ExcludedFilterItemType.Source}
  filterKey='sources'
  value={domain}
/>
```

### Global State Integration
The component integrates with the global entity drawer store, allowing it to be controlled from anywhere in the application:

```tsx
// From any component
const { setSource, setIsOpen } = useEntityDetailDrawerStore();

// Trigger drawer with source data
setSource(sourceData);
setIsOpen(true);
```

## Best Practices

### Architecture Compliance
- ✅ **Component Decomposition**: Separates `SourceDetail` (pure display) from `SourceDrawer` (state management)
- ✅ **State Management**: Uses Zustand for client state, follows store patterns
- ✅ **Reusability**: `SourceDetail` can be used independently of the drawer
- ✅ **UI Consistency**: Leverages shared UI components from `/ui/` directory

### Performance Considerations
- Conditional rendering prevents unnecessary DOM creation
- Separated concerns allow for optimized re-renders
- External link opens in new tab to preserve application state

### User Experience
- Consistent property display with `PropertyBlockMobileDrawer`
- Clear visual hierarchy with typography system
- Contextual filtering options for enhanced search experience
- Direct access to source website for verification