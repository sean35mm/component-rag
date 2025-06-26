# ExcludedCompanyItem Component

## Purpose

The `ExcludedCompanyItem` component renders a filterable company item that can be excluded from search results or listings. It displays company information including name, favicon/avatar, and industry, with proper loading states and authentication-aware data fetching. This component is part of the filters system that allows users to manage excluded companies from their search or view preferences.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied through hooks usage) because it:
- Utilizes React Suspense for data fetching coordination
- Manages interactive state through click handlers
- Depends on client-side context (`useAccessToken`)
- Requires real-time data fetching with loading states

## Props Interface

### ExcludedCompanyItemProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the company to display |
| `onClick` | `() => void` | Yes | Callback function triggered when the item is clicked/selected |

### ExcludedCompanyItemSuspenseProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Company identifier |
| `onClick` | `() => void` | Yes | Click handler callback |
| `isAuthorizedAndVerified` | `boolean` | Yes | User authorization status |
| `isPublic` | `boolean` | Yes | Whether content is publicly accessible |
| `token` | `AccessToken \| undefined` | No | Authentication token for API requests |

## Usage Example

```tsx
import { ExcludedCompanyItem } from '@/components/filters/filters-drawer/excluded-company-item';

// In a filters drawer or excluded items list
function FiltersDrawer() {
  const [excludedCompanyIds, setExcludedCompanyIds] = useState<string[]>([
    'company-123',
    'company-456'
  ]);

  const handleRemoveExcludedCompany = (companyId: string) => {
    setExcludedCompanyIds(prev => prev.filter(id => id !== companyId));
    // Update filters in backend or global state
  };

  return (
    <div className="filters-drawer">
      <h3>Excluded Companies</h3>
      {excludedCompanyIds.map(companyId => (
        <ExcludedCompanyItem
          key={companyId}
          id={companyId}
          onClick={() => handleRemoveExcludedCompany(companyId)}
        />
      ))}
    </div>
  );
}

// With loading boundary
function FiltersWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={<FiltersError />}>
      <ExcludedCompanyItem
        id="acme-corp-123"
        onClick={() => console.log('Company filter removed')}
      />
    </ErrorBoundary>
  );
}
```

## Functionality

- **Dynamic Company Display**: Fetches and displays real company data including name, favicon, and industry
- **Progressive Enhancement**: Shows fallback content during loading or when data is unavailable
- **Authentication-Aware**: Adapts behavior based on user authorization and public access status
- **Interactive Filtering**: Provides click interaction for removing companies from exclusion lists
- **Graceful Degradation**: Falls back to generic display when authentication fails or data is unavailable
- **Avatar Integration**: Displays company favicons with fallback to generated avatars

## State Management

- **Server State**: Uses TanStack Query via `useCompanyByIdSuspense` hook for fetching company data
- **Authentication State**: Consumes `useAccessToken` context for user authorization status
- **No Local State**: Component is purely presentational with data fetched from external sources
- **Suspense Integration**: Leverages React Suspense for coordinated loading states

## Side Effects

- **API Calls**: Fetches company data by ID when user is authorized
- **Image Loading**: Loads company favicon/avatar images
- **Context Subscription**: Subscribes to access token context changes
- **Click Propagation**: Triggers parent component callbacks on user interaction

## Dependencies

### Internal Dependencies
- `@/components/ui/avatar` - Avatar component for displaying company images
- `@/lib/contexts` - Access token context hook
- `@/lib/query-hooks` - Company data fetching hook
- `@/lib/types` - TypeScript type definitions
- `./excluded-filter-item-base` - Base component for filter item rendering

### External Dependencies
- `react` - Suspense functionality
- Implicit TanStack Query dependency through query hooks

## Integration

- **Filters System**: Core component in the application's filtering architecture
- **Authentication Flow**: Integrates with the app's authentication and authorization system
- **Data Layer**: Connects to the company data API through standardized query hooks
- **UI Framework**: Uses the application's design system components (Avatar, base filter item)
- **State Synchronization**: Works with parent components to manage excluded company lists

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-decomposed with separate Suspense and Fallback components
- ✅ **State Management**: Proper use of TanStack Query for server state
- ✅ **Reusability**: Built on reusable base components from the UI system
- ✅ **Error Boundaries**: Implements fallback patterns for error handling

### Recommended Patterns
- Use within Suspense boundaries for optimal loading coordination
- Implement proper error boundaries when using in lists
- Batch multiple exclusion operations for better performance
- Consider virtualization for large lists of excluded companies
- Maintain consistent click interaction patterns across filter components

### Performance Considerations
- Data fetching is optimized through Suspense and query caching
- Fallback rendering prevents layout shifts during loading
- Avatar component handles image optimization internally
- Consider memoization for large lists of excluded items

## Exported Constants

- `EXCLUDED_COMPANY_ITEM_TITLE`: Default title for fallback display ("Company")
- `EXCLUDED_COMPANY_ITEM_SUBTITLE`: Default subtitle for fallback display ("World wide")