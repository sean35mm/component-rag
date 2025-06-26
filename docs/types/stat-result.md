# StatResult Type Definition

## Purpose

The `StatResult<T>` interface is a generic response wrapper type designed to standardize statistical query results across the application. It provides a consistent structure for returning collections of statistical data with status information, enabling type-safe handling of statistical responses from APIs, database queries, or computed analytics.

## Type Definition

```typescript
export interface StatResult<T> {
  status: number;
  results: T[];
}
```

### Generic Parameters

- `T` - The type of individual statistical result items contained in the results array

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `number` | ✅ | HTTP-style status code indicating the success/failure state of the statistical operation |
| `results` | `T[]` | ✅ | Array of statistical result items of the specified generic type |

## Usage Examples

### Basic Usage with Domain Objects

```typescript
// Domain object for user statistics
interface UserStats {
  userId: string;
  loginCount: number;
  lastActive: Date;
  sessionDuration: number;
}

// Using StatResult with the domain object
const userStatsResult: StatResult<UserStats> = {
  status: 200,
  results: [
    {
      userId: "user-123",
      loginCount: 45,
      lastActive: new Date(),
      sessionDuration: 3600
    },
    {
      userId: "user-456", 
      loginCount: 12,
      lastActive: new Date(),
      sessionDuration: 1800
    }
  ]
};
```

### API Service Integration

```typescript
// Service function returning statistical data
async function getUserActivityStats(dateRange: DateRange): Promise<StatResult<UserStats>> {
  try {
    const stats = await database.query.userStats(dateRange);
    return {
      status: 200,
      results: stats
    };
  } catch (error) {
    return {
      status: 500,
      results: []
    };
  }
}

// Component usage
const StatsComponent: React.FC = () => {
  const [statsData, setStatsData] = useState<StatResult<UserStats> | null>(null);
  
  useEffect(() => {
    getUserActivityStats({ start: startDate, end: endDate })
      .then(setStatsData);
  }, [startDate, endDate]);

  if (!statsData || statsData.status !== 200) {
    return <div>Failed to load statistics</div>;
  }

  return (
    <div>
      {statsData.results.map(stat => (
        <StatCard key={stat.userId} data={stat} />
      ))}
    </div>
  );
};
```

### Complex Statistical Data

```typescript
// Advanced usage with aggregated metrics
interface MetricsSummary {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

const metricsResult: StatResult<MetricsSummary> = {
  status: 200,
  results: [
    { metric: 'conversion_rate', value: 0.12, trend: 'up', percentage: 5.2 },
    { metric: 'bounce_rate', value: 0.34, trend: 'down', percentage: -2.1 }
  ]
};
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

```typescript
// 1. Domain Objects (Core business entities)
interface SalesMetric {
  period: string;
  revenue: number;
  transactions: number;
  averageOrderValue: number;
}

// 2. Response Types (API response shapes)
type SalesStatsResponse = StatResult<SalesMetric>;

interface SalesAnalyticsResponse {
  daily: StatResult<SalesMetric>;
  weekly: StatResult<SalesMetric>;
  monthly: StatResult<SalesMetric>;
}

// 3. Request Types (API request parameters)
interface SalesStatsRequest {
  startDate: string;
  endDate: string;
  granularity: 'daily' | 'weekly' | 'monthly';
  includeProjections?: boolean;
}
```

## Related Types

### Extending StatResult

```typescript
// Enhanced result with metadata
interface EnhancedStatResult<T> extends StatResult<T> {
  metadata: {
    totalCount: number;
    executionTime: number;
    cacheHit: boolean;
  };
}

// Paginated statistical results
interface PaginatedStatResult<T> extends StatResult<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}
```

### Utility Types

```typescript
// Extract just the results array type
type StatResultData<T> = StatResult<T>['results'];

// Create a successful result helper
type SuccessfulStatResult<T> = StatResult<T> & { status: 200 };

// Partial results for loading states
type PartialStatResult<T> = Partial<StatResult<Partial<T>>>;
```

## Integration Points

### Services Layer
```typescript
// Analytics service
class AnalyticsService {
  async getPageViews(): Promise<StatResult<PageViewMetric>> { /* ... */ }
  async getConversions(): Promise<StatResult<ConversionMetric>> { /* ... */ }
}
```

### React Components
```typescript
// Custom hook for statistical data
function useStatistics<T>(
  fetcher: () => Promise<StatResult<T>>
): {
  data: T[] | null;
  isLoading: boolean;
  error: string | null;
} {
  // Implementation using StatResult structure
}
```

### State Management
```typescript
// Redux slice handling statistical data
interface StatsState {
  userStats: StatResult<UserStats> | null;
  salesStats: StatResult<SalesMetric> | null;
  loading: boolean;
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

// Generic StatResult schema factory
function createStatResultSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    status: z.number().int().min(100).max(599),
    results: z.array(itemSchema)
  });
}

// Usage with specific domain schemas
const UserStatsSchema = z.object({
  userId: z.string(),
  loginCount: z.number().int().min(0),
  lastActive: z.date(),
  sessionDuration: z.number().min(0)
});

const UserStatsResultSchema = createStatResultSchema(UserStatsSchema);

// Validation function
function validateStatResult<T>(
  data: unknown,
  schema: z.ZodSchema<StatResult<T>>
): StatResult<T> {
  return schema.parse(data);
}
```

### Runtime Type Guards

```typescript
// Type guard for successful results
function isSuccessfulStatResult<T>(
  result: StatResult<T>
): result is StatResult<T> & { status: 200 } {
  return result.status >= 200 && result.status < 300;
}

// Type guard for results with data
function hasStatResults<T>(
  result: StatResult<T>
): result is StatResult<T> & { results: [T, ...T[]] } {
  return result.results.length > 0;
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: Uses generic `T` parameter instead of `any`
2. **Interface Usage**: Properly uses `interface` for object shape definition
3. **Type Architecture**: Fits perfectly as a response wrapper type

### ✅ Recommended Patterns

```typescript
// Good: Specific generic types
const analyticsResult: StatResult<AnalyticsMetric> = { /* ... */ };

// Good: Proper error handling
function processStatResult<T>(result: StatResult<T>): T[] {
  if (!isSuccessfulStatResult(result)) {
    throw new Error(`Failed with status: ${result.status}`);
  }
  return result.results;
}

// Good: Composing with utility types
type OptionalStatResult<T> = Partial<StatResult<T>>;
```

### ❌ Anti-patterns to Avoid

```typescript
// Bad: Using any
const badResult: StatResult<any> = { /* ... */ };

// Bad: Not handling status codes
function unsafeProcess<T>(result: StatResult<T>): T[] {
  return result.results; // Ignores potential error status
}

// Bad: Overly complex nested generics
type BadNesting<T, U, V> = StatResult<StatResult<T & U & V>>;
```

This type serves as a fundamental building block for statistical data handling, providing consistency and type safety across all statistical operations in the application.