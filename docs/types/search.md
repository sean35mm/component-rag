# Search Types Documentation

## Purpose

The search types module defines the core type system for the application's search functionality. It provides type definitions for search entities, tab items, form submission handlers, and state management for both active search pages and navigation transitions. This module serves as the foundation for type-safe search operations across the application.

## Type Definition

### SearchEntities Enum

```typescript
export enum SearchEntities {
  ALL = 'All',
  PEOPLE = 'People',
  COMPANIES = 'Companies',
  TOPICS = 'Topics',
  STORIES = 'Stories°',
}
```

**Rationale**: Uses enum (following our guidelines) as these are reusable values referenced across multiple components for search categorization.

### SearchTabItem Type

```typescript
export type SearchTabItem = {
  type?: SearchEntities;
  name: string;
  id?: string;
};
```

**Note**: Consider refactoring to interface per our guidelines:

```typescript
// Recommended refactor
export interface SearchTabItem {
  type?: SearchEntities;
  name: string;
  id?: string;
}
```

### SearchSubmitHandler Type

```typescript
export type SearchSubmitHandler = (
  items: SearchTabItem[],
  originalQuery: string,
  query?: Partial<ComplexAllEndpointQuery>,
  onBeforeRoutePush?: () => Promise<void>,
  onRoutePush?: (href: string) => void
) => Promise<void>;
```

### NewSearchPageState Interface

```typescript
export type NewSearchPageState = {
  items: SearchTabItem[];
  query: string;
  filters: FiltersState | null;
  access: 'public' | 'private';
  savedFilterPresetId: string | null;
};
```

**Note**: Should be refactored to interface per our guidelines.

### NewSearchPageTransitionState Interface

```typescript
export type NewSearchPageTransitionState = {
  savedFilterPresetId: string | null;
};
```

## Properties

### SearchTabItem Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `SearchEntities` | Optional | The category/entity type for the search tab |
| `name` | `string` | Required | Display name for the search tab |
| `id` | `string` | Optional | Unique identifier for the tab item |

### SearchSubmitHandler Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `SearchTabItem[]` | Required | Array of selected search tab items |
| `originalQuery` | `string` | Required | The original search query string |
| `query` | `Partial<ComplexAllEndpointQuery>` | Optional | Complex query object for API calls |
| `onBeforeRoutePush` | `() => Promise<void>` | Optional | Async callback before navigation |
| `onRoutePush` | `(href: string) => void` | Optional | Navigation callback with target URL |

### NewSearchPageState Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `items` | `SearchTabItem[]` | Required | Active search tab items |
| `query` | `string` | Required | Current search query |
| `filters` | `FiltersState \| null` | Required | Applied search filters or null |
| `access` | `'public' \| 'private'` | Required | Search access level |
| `savedFilterPresetId` | `string \| null` | Required | ID of saved filter preset or null |

### NewSearchPageTransitionState Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `savedFilterPresetId` | `string \| null` | Required | Preserved filter preset ID during transitions |

## Usage Examples

### Basic Search Tab Implementation

```typescript
import { SearchEntities, SearchTabItem } from '@/lib/types/search';

// Creating search tabs
const searchTabs: SearchTabItem[] = [
  {
    type: SearchEntities.ALL,
    name: 'All Results',
    id: 'all-tab'
  },
  {
    type: SearchEntities.PEOPLE,
    name: 'People',
    id: 'people-tab'
  },
  {
    type: SearchEntities.COMPANIES,
    name: 'Companies',
    id: 'companies-tab'
  }
];
```

### Search Form Handler

```typescript
import { SearchSubmitHandler, SearchEntities } from '@/lib/types/search';
import { useRouter } from 'next/navigation';

const SearchForm: React.FC = () => {
  const router = useRouter();
  
  const handleSearch: SearchSubmitHandler = async (
    items,
    originalQuery,
    query,
    onBeforeRoutePush,
    onRoutePush
  ) => {
    // Pre-navigation logic
    if (onBeforeRoutePush) {
      await onBeforeRoutePush();
    }
    
    // Build search URL
    const searchParams = new URLSearchParams({
      q: originalQuery,
      entities: items.map(item => item.type).join(',')
    });
    
    const href = `/search?${searchParams.toString()}`;
    
    // Handle navigation
    if (onRoutePush) {
      onRoutePush(href);
    } else {
      router.push(href);
    }
  };
  
  return (
    // Form implementation
  );
};
```

### State Management

```typescript
import { NewSearchPageState, SearchEntities } from '@/lib/types/search';
import { useState } from 'react';

const useSearchState = () => {
  const [searchState, setSearchState] = useState<NewSearchPageState>({
    items: [
      {
        type: SearchEntities.ALL,
        name: 'All Results'
      }
    ],
    query: '',
    filters: null,
    access: 'public',
    savedFilterPresetId: null
  });
  
  const updateQuery = (query: string) => {
    setSearchState(prev => ({
      ...prev,
      query
    }));
  };
  
  return {
    searchState,
    updateQuery,
    setSearchState
  };
};
```

### Transition State Management

```typescript
import { NewSearchPageTransitionState } from '@/lib/types/search';

// During page transitions, preserve filter presets
const preserveFilterState = (
  currentState: NewSearchPageState
): NewSearchPageTransitionState => ({
  savedFilterPresetId: currentState.savedFilterPresetId
});

// Restore state after transition
const restoreSearchState = (
  transitionState: NewSearchPageTransitionState,
  newState: Partial<NewSearchPageState>
): NewSearchPageState => ({
  items: newState.items || [],
  query: newState.query || '',
  filters: newState.filters || null,
  access: newState.access || 'public',
  savedFilterPresetId: transitionState.savedFilterPresetId
});
```

## Type Architecture Pattern

This module follows our domain-first architecture:

```
Domain Objects (SearchEntities, SearchTabItem)
    ↓
State Types (NewSearchPageState, NewSearchPageTransitionState)
    ↓
Handler Types (SearchSubmitHandler)
    ↓
Integration with API Types (ComplexAllEndpointQuery)
```

### Architecture Flow

1. **Domain Objects**: `SearchEntities` enum defines core search categories
2. **Component Types**: `SearchTabItem` represents UI tab elements
3. **State Management**: `NewSearchPageState` manages component state
4. **Transition Types**: `NewSearchPageTransitionState` handles navigation state
5. **Handler Integration**: `SearchSubmitHandler` bridges UI actions to API calls

## Related Types

### Dependencies

- `ComplexAllEndpointQuery` - From `./complex-all-endpoint-body`
- `FiltersState` - From `./filters-state`

### Type Relationships

```typescript
// Composition relationships
NewSearchPageState {
  items: SearchTabItem[]           // Composition
  filters: FiltersState | null     // External dependency
}

SearchSubmitHandler {
  query?: Partial<ComplexAllEndpointQuery>  // External API type
}

SearchTabItem {
  type?: SearchEntities            // Enum reference
}
```

## Integration Points

### Components
- Search form components
- Tab navigation components
- Search results pages
- Filter management components

### Services
- Search API service calls
- Route management
- State persistence
- Filter preset management

### Pages
- `/search` - Main search page
- Search result pages
- Advanced search interfaces

## Validation

### Recommended Zod Schemas

```typescript
import { z } from 'zod';

export const SearchEntitiesSchema = z.nativeEnum(SearchEntities);

export const SearchTabItemSchema = z.object({
  type: SearchEntitiesSchema.optional(),
  name: z.string().min(1),
  id: z.string().optional()
});

export const NewSearchPageStateSchema = z.object({
  items: z.array(SearchTabItemSchema),
  query: z.string(),
  filters: z.any().nullable(), // Replace with FiltersStateSchema when available
  access: z.enum(['public', 'private']),
  savedFilterPresetId: z.string().nullable()
});

export const NewSearchPageTransitionStateSchema = z.object({
  savedFilterPresetId: z.string().nullable()
});
```

### Runtime Validation Example

```typescript
const validateSearchState = (data: unknown): NewSearchPageState => {
  return NewSearchPageStateSchema.parse(data);
};
```

## Best Practices

### ✅ Adherence to Guidelines

- **Enum Usage**: Correctly uses enum for reusable `SearchEntities` values
- **Utility Types**: Proper use of `Partial<ComplexAllEndpointQuery>`
- **Strict Typing**: All types are strictly defined with no `any` usage

### ❌ Areas for Improvement

1. **Interface vs Type**: Convert object type definitions to interfaces:

```typescript
// Current
export type SearchTabItem = { ... }

// Recommended
export interface SearchTabItem { ... }
```

2. **Type Safety**: Consider making access level an enum:

```typescript
export enum AccessLevel {
  PUBLIC = 'public',
  PRIVATE = 'private'
}
```

### 🎯 Recommended Refactoring

```typescript
// Improved version following all guidelines
export enum AccessLevel {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export interface SearchTabItem {
  readonly type?: SearchEntities;
  readonly name: string;
  readonly id?: string;
}

export interface NewSearchPageState {
  readonly items: SearchTabItem[];
  readonly query: string;
  readonly filters: FiltersState | null;
  readonly access: AccessLevel;
  readonly savedFilterPresetId: string | null;
}
```

### Performance Considerations

- Use `readonly` modifiers for immutable state
- Consider memoization for search tab arrays
- Implement proper state normalization for large result sets