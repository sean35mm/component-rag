# AnswersThreadNewsArticlesFilter Type Documentation

## Purpose

The `AnswersThreadNewsArticlesFilter` interface defines the structure for filtering news articles within answer threads. It combines query-based filtering with publication date range constraints, enabling users to narrow down news articles based on search criteria and temporal boundaries. This type serves as a domain object for news article filtering operations across the application.

## Type Definition

```typescript
import { SavedFilterQuery } from './saved-filter';

export interface AnswersThreadNewsArticlesFilter {
  filter?: {
    query: SavedFilterQuery;
    showReprints?: boolean;
  };
  pubDateFrom?: string;
  pubDateTo?: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `filter` | `object` | Optional | Container for query-based filtering options |
| `filter.query` | `SavedFilterQuery` | Required* | Saved query configuration for filtering articles |
| `filter.showReprints` | `boolean` | Optional | Whether to include reprinted articles in results |
| `pubDateFrom` | `string` | Optional | Start date for publication date range (ISO date string) |
| `pubDateTo` | `string` | Optional | End date for publication date range (ISO date string) |

*Required when `filter` object is present

## Usage Examples

### Basic Filter Creation

```typescript
import { AnswersThreadNewsArticlesFilter } from '@/lib/types/answers-thread-news-articles-filter';

// Simple date range filter
const basicFilter: AnswersThreadNewsArticlesFilter = {
  pubDateFrom: '2024-01-01',
  pubDateTo: '2024-01-31'
};

// Filter with query and reprints
const advancedFilter: AnswersThreadNewsArticlesFilter = {
  filter: {
    query: {
      id: 'tech-news-filter',
      name: 'Technology News',
      searchTerm: 'artificial intelligence',
      categories: ['technology', 'business']
    },
    showReprints: false
  },
  pubDateFrom: '2024-01-01',
  pubDateTo: '2024-03-31'
};
```

### Component Integration

```typescript
import React, { useState } from 'react';
import { AnswersThreadNewsArticlesFilter } from '@/lib/types/answers-thread-news-articles-filter';

interface NewsFilterComponentProps {
  onFilterChange: (filter: AnswersThreadNewsArticlesFilter) => void;
  initialFilter?: AnswersThreadNewsArticlesFilter;
}

const NewsFilterComponent: React.FC<NewsFilterComponentProps> = ({
  onFilterChange,
  initialFilter = {}
}) => {
  const [filter, setFilter] = useState<AnswersThreadNewsArticlesFilter>(initialFilter);

  const handleDateRangeChange = (pubDateFrom: string, pubDateTo: string) => {
    const updatedFilter: AnswersThreadNewsArticlesFilter = {
      ...filter,
      pubDateFrom,
      pubDateTo
    };
    setFilter(updatedFilter);
    onFilterChange(updatedFilter);
  };

  const handleQueryFilterChange = (query: SavedFilterQuery, showReprints: boolean) => {
    const updatedFilter: AnswersThreadNewsArticlesFilter = {
      ...filter,
      filter: {
        query,
        showReprints
      }
    };
    setFilter(updatedFilter);
    onFilterChange(updatedFilter);
  };

  // Component JSX...
};
```

### Service Layer Usage

```typescript
import { AnswersThreadNewsArticlesFilter } from '@/lib/types/answers-thread-news-articles-filter';

class NewsArticleService {
  async fetchFilteredArticles(
    threadId: string,
    filter: AnswersThreadNewsArticlesFilter
  ): Promise<NewsArticle[]> {
    const queryParams = this.buildQueryParams(filter);
    
    const response = await fetch(`/api/threads/${threadId}/articles?${queryParams}`);
    return response.json();
  }

  private buildQueryParams(filter: AnswersThreadNewsArticlesFilter): URLSearchParams {
    const params = new URLSearchParams();

    if (filter.pubDateFrom) {
      params.append('pubDateFrom', filter.pubDateFrom);
    }
    
    if (filter.pubDateTo) {
      params.append('pubDateTo', filter.pubDateTo);
    }

    if (filter.filter?.query) {
      params.append('queryId', filter.filter.query.id);
    }

    if (filter.filter?.showReprints !== undefined) {
      params.append('showReprints', filter.filter.showReprints.toString());
    }

    return params;
  }
}
```

## Type Architecture Pattern

This type follows our established pattern of **domain objects → response types → request types**:

```typescript
// 1. Domain Object (Current)
interface AnswersThreadNewsArticlesFilter {
  filter?: {
    query: SavedFilterQuery;
    showReprints?: boolean;
  };
  pubDateFrom?: string;
  pubDateTo?: string;
}

// 2. Response Type (Derived)
interface NewsArticlesFilterResponse {
  filter: AnswersThreadNewsArticlesFilter;
  totalCount: number;
  appliedAt: string;
}

// 3. Request Type (Derived)
interface ApplyNewsArticlesFilterRequest {
  threadId: string;
  filter: AnswersThreadNewsArticlesFilter;
  saveAsDefault?: boolean;
}
```

## Related Types

### Direct Dependencies
- `SavedFilterQuery` - Core query configuration for filtering operations

### Compositional Relationships
```typescript
// Filter preset management
interface NewsFilterPreset {
  id: string;
  name: string;
  filter: AnswersThreadNewsArticlesFilter;
  isDefault: boolean;
}

// Thread-specific filter state
interface ThreadNewsState {
  activeFilter: AnswersThreadNewsArticlesFilter;
  availablePresets: NewsFilterPreset[];
  filterHistory: AnswersThreadNewsArticlesFilter[];
}

// API response wrapper
interface FilteredNewsResponse {
  articles: NewsArticle[];
  filter: AnswersThreadNewsArticlesFilter;
  pagination: PaginationInfo;
}
```

## Integration Points

### Components
- `NewsFilterPanel` - Main filtering interface component
- `DateRangePicker` - Handles `pubDateFrom` and `pubDateTo` selection
- `SavedQuerySelector` - Manages `filter.query` selection
- `ThreadNewsView` - Consumes filtered results

### Services
- `NewsArticleService` - Fetches filtered articles
- `FilterPresetService` - Manages saved filter configurations
- `ThreadService` - Handles thread-specific filtering state

### State Management
```typescript
// Redux/Zustand store slice
interface NewsFilterState {
  currentFilter: AnswersThreadNewsArticlesFilter;
  isLoading: boolean;
  lastAppliedFilter?: AnswersThreadNewsArticlesFilter;
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { SavedFilterQuerySchema } from './saved-filter';

export const AnswersThreadNewsArticlesFilterSchema = z.object({
  filter: z.object({
    query: SavedFilterQuerySchema,
    showReprints: z.boolean().optional()
  }).optional(),
  pubDateFrom: z.string().datetime().optional(),
  pubDateTo: z.string().datetime().optional()
}).refine(
  (data) => {
    if (data.pubDateFrom && data.pubDateTo) {
      return new Date(data.pubDateFrom) <= new Date(data.pubDateTo);
    }
    return true;
  },
  {
    message: "pubDateFrom must be before or equal to pubDateTo",
    path: ["pubDateTo"]
  }
);

// Type inference
export type ValidatedNewsArticlesFilter = z.infer<typeof AnswersThreadNewsArticlesFilterSchema>;
```

### Runtime Validation Helper
```typescript
export const validateNewsArticlesFilter = (
  filter: unknown
): filter is AnswersThreadNewsArticlesFilter => {
  const result = AnswersThreadNewsArticlesFilterSchema.safeParse(filter);
  return result.success;
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are explicitly typed, avoiding `any`
2. **Interface Usage**: Uses `interface` for object shape definition
3. **Optional Properties**: Proper use of optional properties with `?` modifier
4. **Utility Types**: Can be extended with TypeScript utilities:

```typescript
// Partial filter for progressive building
type PartialNewsFilter = Partial<AnswersThreadNewsArticlesFilter>;

// Required filter for validation
type RequiredNewsFilter = Required<AnswersThreadNewsArticlesFilter>;

// Pick specific properties
type DateRangeOnly = Pick<AnswersThreadNewsArticlesFilter, 'pubDateFrom' | 'pubDateTo'>;
```

### 🎯 Recommended Patterns

```typescript
// 1. Builder Pattern for Complex Filters
class NewsFilterBuilder {
  private filter: AnswersThreadNewsArticlesFilter = {};

  withDateRange(from: string, to: string): this {
    this.filter.pubDateFrom = from;
    this.filter.pubDateTo = to;
    return this;
  }

  withQuery(query: SavedFilterQuery, showReprints = false): this {
    this.filter.filter = { query, showReprints };
    return this;
  }

  build(): AnswersThreadNewsArticlesFilter {
    return { ...this.filter };
  }
}

// 2. Type Guards for Runtime Safety
const hasDateRange = (filter: AnswersThreadNewsArticlesFilter): boolean => {
  return Boolean(filter.pubDateFrom && filter.pubDateTo);
};

const hasQueryFilter = (filter: AnswersThreadNewsArticlesFilter): boolean => {
  return Boolean(filter.filter?.query);
};

// 3. Immutable Updates
const updateFilter = (
  current: AnswersThreadNewsArticlesFilter,
  updates: Partial<AnswersThreadNewsArticlesFilter>
): AnswersThreadNewsArticlesFilter => {
  return {
    ...current,
    ...updates,
    filter: updates.filter ? { ...current.filter, ...updates.filter } : current.filter
  };
};
```

This type exemplifies clean domain modeling with proper TypeScript practices, enabling type-safe news article filtering across the application while maintaining flexibility for future enhancements.