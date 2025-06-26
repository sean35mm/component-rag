# Stats Types Documentation

## Purpose

The `stats` module provides TypeScript type definitions for statistics and analytics data throughout the application. These types define the structure for article count intervals, total system counts, entity counts, and aggregated statistics for various content types including articles, journalists, sources, and other entities. The types support both real-time analytics display and historical trend analysis.

## Type Definition

```typescript
export interface IntervalArticleCounts {
  date: string;
  numResults: number;
}

export interface TotalCounts {
  totalArticles: number;
  totalStories: number;
  totalJournalists: number;
  totalSources: number;
  totalPeople: number;
  totalCompanies: number;
  totalReviews: number;
}

export interface EntityCount {
  key: string;
  count: number;
}

export interface TopEntitiesCounts {
  totalTopics?: number;
  topics?: EntityCount[];
  totalPeople?: number;
  people?: EntityCount[];
  totalCompanies?: number;
  companies?: EntityCount[];
  totalCities?: number;
  cities?: EntityCount[];
  totalJournalists?: number;
  journalists?: EntityCount[];
  totalJournalistsById?: number;
  journalistsById?: EntityCount[];
  totalSources?: number;
  sources?: EntityCount[];
  totalArticles?: number;
}
```

## Properties

### IntervalArticleCounts

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `date` | `string` | ✅ | ISO date string representing the interval date |
| `numResults` | `number` | ✅ | Number of articles published in this interval |

### TotalCounts

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `totalArticles` | `number` | ✅ | Total number of articles in the system |
| `totalStories` | `number` | ✅ | Total number of unique stories |
| `totalJournalists` | `number` | ✅ | Total number of journalists |
| `totalSources` | `number` | ✅ | Total number of news sources |
| `totalPeople` | `number` | ✅ | Total number of people entities |
| `totalCompanies` | `number` | ✅ | Total number of company entities |
| `totalReviews` | `number` | ✅ | Total number of reviews |

### EntityCount

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | `string` | ✅ | Unique identifier or name of the entity |
| `count` | `number` | ✅ | Number of occurrences for this entity |

### TopEntitiesCounts

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `totalTopics` | `number` | ❌ | Total count of topic entities |
| `topics` | `EntityCount[]` | ❌ | Array of top topic entities with counts |
| `totalPeople` | `number` | ❌ | Total count of people entities |
| `people` | `EntityCount[]` | ❌ | Array of top people entities with counts |
| `totalCompanies` | `number` | ❌ | Total count of company entities |
| `companies` | `EntityCount[]` | ❌ | Array of top company entities with counts |
| `totalCities` | `number` | ❌ | Total count of city entities |
| `cities` | `EntityCount[]` | ❌ | Array of top city entities with counts |
| `totalJournalists` | `number` | ❌ | Total count of journalist entities |
| `journalists` | `EntityCount[]` | ❌ | Array of top journalists with counts |
| `totalJournalistsById` | `number` | ❌ | Total count of journalists by ID |
| `journalistsById` | `EntityCount[]` | ❌ | Array of top journalists by ID with counts |
| `totalSources` | `number` | ❌ | Total count of source entities |
| `sources` | `EntityCount[]` | ❌ | Array of top sources with counts |
| `totalArticles` | `number` | ❌ | Total article count for context |

## Usage Examples

### Dashboard Statistics Component

```typescript
import { TotalCounts, TopEntitiesCounts } from '@/lib/types/stats';

interface DashboardStatsProps {
  totalCounts: TotalCounts;
  topEntities: TopEntitiesCounts;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  totalCounts, 
  topEntities 
}) => {
  return (
    <div className="stats-grid">
      <StatCard 
        title="Total Articles" 
        count={totalCounts.totalArticles} 
      />
      <StatCard 
        title="Total Journalists" 
        count={totalCounts.totalJournalists} 
      />
      
      {topEntities.topics && (
        <TopEntitiesList 
          title="Top Topics"
          entities={topEntities.topics}
          total={topEntities.totalTopics}
        />
      )}
    </div>
  );
};
```

### Article Timeline Chart

```typescript
import { IntervalArticleCounts } from '@/lib/types/stats';

interface ArticleTimelineProps {
  intervals: IntervalArticleCounts[];
  dateRange: { start: Date; end: Date };
}

const ArticleTimeline: React.FC<ArticleTimelineProps> = ({ 
  intervals, 
  dateRange 
}) => {
  const chartData = intervals.map(interval => ({
    date: new Date(interval.date),
    articles: interval.numResults
  }));

  const totalArticles = intervals.reduce(
    (sum, interval) => sum + interval.numResults, 
    0
  );

  return (
    <div className="timeline-chart">
      <h3>Articles Over Time ({totalArticles} total)</h3>
      <LineChart data={chartData} />
    </div>
  );
};
```

### Statistics Service

```typescript
import { 
  TotalCounts, 
  TopEntitiesCounts, 
  IntervalArticleCounts,
  EntityCount 
} from '@/lib/types/stats';

class StatsService {
  async getTotalCounts(): Promise<TotalCounts> {
    const response = await fetch('/api/stats/totals');
    return response.json();
  }

  async getTopEntities(limit = 10): Promise<TopEntitiesCounts> {
    const response = await fetch(`/api/stats/top-entities?limit=${limit}`);
    return response.json();
  }

  async getArticleIntervals(
    startDate: string, 
    endDate: string, 
    interval: 'day' | 'week' | 'month' = 'day'
  ): Promise<IntervalArticleCounts[]> {
    const response = await fetch(
      `/api/stats/intervals?start=${startDate}&end=${endDate}&interval=${interval}`
    );
    return response.json();
  }

  // Helper method to sort entities by count
  sortEntitiesByCount(entities: EntityCount[]): EntityCount[] {
    return [...entities].sort((a, b) => b.count - a.count);
  }
}
```

### Entity Statistics Hook

```typescript
import { useState, useEffect } from 'react';
import { TopEntitiesCounts, EntityCount } from '@/lib/types/stats';

interface UseEntityStatsOptions {
  entityType: keyof Pick<TopEntitiesCounts, 'topics' | 'people' | 'companies'>;
  limit?: number;
}

export function useEntityStats({ entityType, limit = 10 }: UseEntityStatsOptions) {
  const [data, setData] = useState<EntityCount[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntityStats() {
      try {
        setLoading(true);
        const stats = await statsService.getTopEntities(limit);
        
        const entities = stats[entityType] || [];
        const totalKey = `total${entityType.charAt(0).toUpperCase() + entityType.slice(1)}` as keyof TopEntitiesCounts;
        const totalCount = stats[totalKey] as number || 0;

        setData(entities);
        setTotal(totalCount);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    }

    fetchEntityStats();
  }, [entityType, limit]);

  return { data, total, loading, error };
}
```

## Type Architecture Pattern

Following our type architecture pattern of **domain objects → response types → request types**:

### Domain Objects (Current Types)
```typescript
// Core domain entities for statistics
interface EntityCount { /* ... */ }
interface IntervalArticleCounts { /* ... */ }
interface TotalCounts { /* ... */ }
interface TopEntitiesCounts { /* ... */ }
```

### Response Types (Built from Domain Objects)
```typescript
// API response wrappers
interface StatsResponse<T> {
  data: T;
  meta: {
    generatedAt: string;
    cacheExpiry?: string;
  };
}

interface TotalCountsResponse extends StatsResponse<TotalCounts> {
  meta: StatsResponse<TotalCounts>['meta'] & {
    lastUpdated: string;
  };
}

interface TopEntitiesResponse extends StatsResponse<TopEntitiesCounts> {
  meta: StatsResponse<TopEntitiesCounts>['meta'] & {
    limit: number;
    entityTypes: string[];
  };
}
```

### Request Types (Query Parameters)
```typescript
interface StatsQueryParams {
  startDate?: string;
  endDate?: string;
  interval?: 'hour' | 'day' | 'week' | 'month';
  limit?: number;
}

interface TopEntitiesQueryParams extends Pick<StatsQueryParams, 'limit'> {
  entityTypes?: ('topics' | 'people' | 'companies' | 'cities' | 'journalists' | 'sources')[];
  includeInactive?: boolean;
}
```

## Related Types

### Extension Types
```typescript
// Analytics dashboard specific extensions
interface DashboardStats extends TotalCounts {
  trends: {
    articlesGrowth: number;
    journalistsGrowth: number;
    sourcesGrowth: number;
  };
  lastUpdated: string;
}

// Time-series analysis
interface TimeSeriesPoint extends IntervalArticleCounts {
  movingAverage?: number;
  percentChange?: number;
}
```

### Composition Types
```typescript
// Combined statistics for comprehensive views
interface FullStatsData {
  totals: TotalCounts;
  topEntities: TopEntitiesCounts;
  intervals: IntervalArticleCounts[];
  generatedAt: string;
}

// Filtered entity statistics
type EntityStatsSubset = Pick<TopEntitiesCounts, 'topics' | 'people' | 'companies'>;
```

## Integration Points

### API Endpoints
- **GET `/api/stats/totals`** - Returns `TotalCounts`
- **GET `/api/stats/top-entities`** - Returns `TopEntitiesCounts`
- **GET `/api/stats/intervals`** - Returns `IntervalArticleCounts[]`
- **GET `/api/stats/dashboard`** - Returns combined statistics

### Components
- **`DashboardStats`** - Displays total counts and top entities
- **`ArticleTimeline`** - Visualizes article intervals over time
- **`EntityRankingList`** - Shows ranked entity statistics
- **`StatsCard`** - Individual statistic display component

### Services
- **`StatsService`** - API interaction layer for statistics
- **`AnalyticsService`** - Advanced analytics and trend calculation
- **`CacheService`** - Statistics data caching and invalidation

## Validation

### Zod Schemas
```typescript
import { z } from 'zod';

export const IntervalArticleCountsSchema = z.object({
  date: z.string().datetime(),
  numResults: z.number().min(0)
});

export const TotalCountsSchema = z.object({
  totalArticles: z.number().min(0),
  totalStories: z.number().min(0),
  totalJournalists: z.number().min(0),
  totalSources: z.number().min(0),
  totalPeople: z.number().min(0),
  totalCompanies: z.number().min(0),
  totalReviews: z.number().min(0)
});

export const EntityCountSchema = z.object({
  key: z.string().min(1),
  count: z.number().min(0)
});

export const TopEntitiesCountsSchema = z.object({
  totalTopics: z.number().min(0).optional(),
  topics: z.array(EntityCountSchema).optional(),
  totalPeople: z.number().min(0).optional(),
  people: z.array(EntityCountSchema).optional(),
  totalCompanies: z.number().min(0).optional(),
  companies: z.array(EntityCountSchema).optional(),
  totalCities: z.number().min(0).optional(),
  cities: z.array(EntityCountSchema).optional(),
  totalJournalists: z.number().min(0).optional(),
  journalists: z.array(EntityCountSchema).optional(),
  totalJournalistsById: z.number().min(0).optional(),
  journalistsById: z.array(EntityCountSchema).optional(),
  totalSources: z.number().min(0).optional(),
  sources: z.array(EntityCountSchema).optional(),
  totalArticles: z.number().min(0).optional()
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties have explicit types, no `any` usage
2. **Interfaces over Types**: All definitions use `interface` for object shapes
3. **Utility Types**: Leveraging `Pick` and extending patterns for related types
4. **Type Architecture**: Clear domain objects that can be composed into response/request types

### 🔧 Recommended Patterns

```typescript
// ✅ Good: Strict typing with proper nullability
function processEntityCounts(entities?: EntityCount[]): EntityCount[] {
  return entities?.filter(entity => entity.count > 0) || [];
}

// ✅ Good: Using utility types for partial updates
type PartialTotalCounts = Partial<TotalCounts>;

// ✅ Good: Proper error handling with typed responses
async function getStatsWithFallback(): Promise<TotalCounts> {
  try {
    return await statsService.getTotalCounts();
  } catch {
    return {
      totalArticles: 0,
      totalStories: 0,
      totalJournalists: 0,
      totalSources: 0,
      totalPeople: 0,
      totalCompanies: 0,
      totalReviews: 0
    };
  }
}

// ✅ Good: Type guards for runtime validation
function isValidEntityCount(obj: unknown): obj is EntityCount {
  return typeof obj === 'object' && 
         obj !== null && 
         'key' in obj && 
         'count' in obj &&
         typeof (obj as EntityCount).key === 'string' &&
         typeof (obj as EntityCount).count === 'number';
}
```

### 📊 Performance Considerations

- **Optional Properties**: `TopEntitiesCounts` uses optional properties to support partial data loading
- **Array Handling**: Entity arrays can be filtered and sorted without type issues
- **Caching Strategy**: Types support cached responses with metadata for efficient data management