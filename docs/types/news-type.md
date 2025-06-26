# News Type

## Purpose

The `NewsType` enum defines the available news categories for filtering and categorizing news content throughout the application. It serves as a strict type-safe enumeration to ensure consistent news category handling across components, services, and API interactions.

## Type Definition

```typescript
export const enum NewsType {
  ALL = 'all',
  LOCAL = 'local',
  WORLD = 'world',
}
```

### Architecture Decision
- Uses `const enum` for compile-time inlining and better performance
- String literals as values for API compatibility and serialization
- Follows our guideline of using enums for reusable values across the application

## Properties

| Property | Type | Value | Description |
|----------|------|-------|-------------|
| `ALL` | `'all'` | `'all'` | Represents all news categories combined |
| `LOCAL` | `'local'` | `'local'` | Local/regional news content |
| `WORLD` | `'world'` | `'world'` | International/world news content |

## Usage Examples

### Component State Management
```typescript
import { NewsType } from '@/lib/types/news-type';
import { useState } from 'react';

interface NewsFilterProps {
  onFilterChange: (filter: NewsType) => void;
}

const NewsFilter: React.FC<NewsFilterProps> = ({ onFilterChange }) => {
  const [selectedType, setSelectedType] = useState<NewsType>(NewsType.ALL);

  const handleFilterChange = (type: NewsType) => {
    setSelectedType(type);
    onFilterChange(type);
  };

  return (
    <div>
      {Object.values(NewsType).map((type) => (
        <button
          key={type}
          onClick={() => handleFilterChange(type)}
          className={selectedType === type ? 'active' : ''}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};
```

### API Service Integration
```typescript
import { NewsType } from '@/lib/types/news-type';

interface NewsApiParams {
  type: NewsType;
  limit?: number;
  offset?: number;
}

class NewsService {
  async fetchNews(params: NewsApiParams): Promise<NewsArticle[]> {
    const queryParams = new URLSearchParams({
      type: params.type,
      limit: params.limit?.toString() || '10',
      offset: params.offset?.toString() || '0',
    });

    const response = await fetch(`/api/news?${queryParams}`);
    return response.json();
  }

  async fetchNewsByType(type: NewsType): Promise<NewsArticle[]> {
    return this.fetchNews({ type });
  }
}
```

### Type Guards and Validation
```typescript
import { NewsType } from '@/lib/types/news-type';

function isValidNewsType(value: string): value is NewsType {
  return Object.values(NewsType).includes(value as NewsType);
}

function parseNewsTypeFromUrl(searchParams: URLSearchParams): NewsType {
  const typeParam = searchParams.get('type');
  
  if (typeParam && isValidNewsType(typeParam)) {
    return typeParam;
  }
  
  return NewsType.ALL;
}
```

## Type Architecture Pattern

### Domain Layer (Current)
```typescript
// Primary domain enum - foundation for news categorization
export const enum NewsType {
  ALL = 'all',
  LOCAL = 'local',
  WORLD = 'world',
}
```

### Response Types Layer
```typescript
import { NewsType } from './news-type';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  type: NewsType;
  publishedAt: Date;
  author: string;
}

interface NewsListResponse {
  articles: NewsArticle[];
  total: number;
  type: NewsType;
  pagination: {
    page: number;
    limit: number;
    hasNext: boolean;
  };
}
```

### Request Types Layer
```typescript
import { NewsType } from './news-type';

interface NewsFilterRequest {
  type: NewsType;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

interface CreateNewsRequest {
  title: string;
  content: string;
  type: Exclude<NewsType, NewsType.ALL>; // ALL is not valid for creation
  authorId: string;
}
```

## Related Types

### Extending Types
```typescript
// News preferences using NewsType
interface UserNewsPreferences {
  preferredTypes: NewsType[];
  notifications: Record<NewsType, boolean>;
}

// News analytics
interface NewsTypeMetrics {
  type: NewsType;
  viewCount: number;
  engagementRate: number;
}
```

### Utility Types with NewsType
```typescript
// Create a type for news types excluding ALL
type CreatableNewsType = Exclude<NewsType, NewsType.ALL>;

// Create a record for news type configurations
type NewsTypeConfig = Record<NewsType, {
  displayName: string;
  icon: string;
  color: string;
}>;

const newsTypeConfig: NewsTypeConfig = {
  [NewsType.ALL]: {
    displayName: 'All News',
    icon: 'globe',
    color: 'blue',
  },
  [NewsType.LOCAL]: {
    displayName: 'Local News',
    icon: 'map-pin',
    color: 'green',
  },
  [NewsType.WORLD]: {
    displayName: 'World News',
    icon: 'world',
    color: 'purple',
  },
};
```

## Integration Points

### Components
- **NewsFilter**: Filter selection component
- **NewsList**: Displays filtered news by type
- **NewsCard**: Shows individual news items with type badges
- **NewsPreferences**: User settings for news type preferences

### Services
- **NewsApiService**: Fetches news by type from backend
- **NewsCache**: Caches news data organized by type
- **AnalyticsService**: Tracks user interactions by news type

### Hooks
```typescript
// Custom hook for news filtering
function useNewsFilter(initialType: NewsType = NewsType.ALL) {
  const [activeType, setActiveType] = useState<NewsType>(initialType);
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const articles = await newsService.fetchNewsByType(activeType);
      setNews(articles);
    };

    fetchNews();
  }, [activeType]);

  return {
    activeType,
    setActiveType,
    news,
  };
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { NewsType } from './news-type';

export const NewsTypeSchema = z.nativeEnum(NewsType);

export const NewsFilterSchema = z.object({
  type: NewsTypeSchema,
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
});

export const NewsArticleSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  type: NewsTypeSchema,
  publishedAt: z.date(),
  author: z.string().min(1),
});
```

### Runtime Validation
```typescript
function validateNewsTypeFromRequest(req: Request): NewsType {
  const typeParam = req.url.searchParams.get('type');
  
  try {
    return NewsTypeSchema.parse(typeParam);
  } catch {
    return NewsType.ALL; // Default fallback
  }
}
```

## Best Practices

### ✅ Recommended Patterns

1. **Use const enum for performance**:
   ```typescript
   export const enum NewsType { /* values */ }
   ```

2. **Type-safe iteration**:
   ```typescript
   Object.values(NewsType).forEach((type: NewsType) => {
     // TypeScript knows type is NewsType
   });
   ```

3. **Strict typing in functions**:
   ```typescript
   function filterNews(articles: NewsArticle[], type: NewsType): NewsArticle[] {
     return type === NewsType.ALL 
       ? articles 
       : articles.filter(article => article.type === type);
   }
   ```

4. **Use with utility types for restrictions**:
   ```typescript
   type EditableNewsType = Exclude<NewsType, NewsType.ALL>;
   ```

### ❌ Anti-patterns to Avoid

1. **Don't use string literals directly**:
   ```typescript
   // Bad
   const newsType = 'local';
   
   // Good
   const newsType = NewsType.LOCAL;
   ```

2. **Don't bypass type checking**:
   ```typescript
   // Bad
   const type = userInput as NewsType;
   
   // Good
   const type = isValidNewsType(userInput) ? userInput : NewsType.ALL;
   ```

3. **Don't create redundant enums**:
   ```typescript
   // Bad - creates separate enum when NewsType exists
   enum FilterType { ALL, LOCAL, WORLD }
   
   // Good - reuse existing NewsType
   type FilterType = NewsType;
   ```

This enum follows our TypeScript guidelines by providing strict typing, using enums for reusable values, and serving as a foundation for building more complex domain objects and API interfaces.