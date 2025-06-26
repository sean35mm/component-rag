# StoryVelocity Type Documentation

## Purpose

The `StoryVelocity` interface represents a data point for tracking story completion metrics over time within specific clusters. This type serves as a domain object for measuring development velocity and is typically used in analytics, reporting, and performance monitoring features.

## Type Definition

```typescript
export interface StoryVelocity {
  clusterId: string;
  date: string;
  count: number;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clusterId` | `string` | ✅ | Unique identifier for the cluster/team/project group |
| `date` | `string` | ✅ | ISO date string representing the measurement period |
| `count` | `number` | ✅ | Number of stories completed during the specified date |

## Usage Examples

### Basic Usage in Components

```tsx
import { StoryVelocity } from '@/lib/types/story-velocity';

interface VelocityChartProps {
  data: StoryVelocity[];
}

const VelocityChart: React.FC<VelocityChartProps> = ({ data }) => {
  return (
    <div>
      {data.map((velocity) => (
        <div key={`${velocity.clusterId}-${velocity.date}`}>
          <span>Cluster: {velocity.clusterId}</span>
          <span>Date: {velocity.date}</span>
          <span>Stories: {velocity.count}</span>
        </div>
      ))}
    </div>
  );
};
```

### Service Layer Implementation

```tsx
import { StoryVelocity } from '@/lib/types/story-velocity';

class VelocityService {
  async getVelocityData(clusterId: string, startDate: string, endDate: string): Promise<StoryVelocity[]> {
    const response = await fetch(`/api/velocity?clusterId=${clusterId}&start=${startDate}&end=${endDate}`);
    return response.json();
  }

  calculateAverageVelocity(velocities: StoryVelocity[]): number {
    const total = velocities.reduce((sum, velocity) => sum + velocity.count, 0);
    return total / velocities.length;
  }

  groupByCluster(velocities: StoryVelocity[]): Record<string, StoryVelocity[]> {
    return velocities.reduce((acc, velocity) => {
      if (!acc[velocity.clusterId]) {
        acc[velocity.clusterId] = [];
      }
      acc[velocity.clusterId].push(velocity);
      return acc;
    }, {} as Record<string, StoryVelocity[]>);
  }
}
```

### Data Transformation Examples

```tsx
import { StoryVelocity } from '@/lib/types/story-velocity';

// Transform for chart libraries
interface ChartDataPoint {
  x: string;
  y: number;
  cluster: string;
}

const transformToChartData = (velocities: StoryVelocity[]): ChartDataPoint[] => {
  return velocities.map((velocity) => ({
    x: velocity.date,
    y: velocity.count,
    cluster: velocity.clusterId,
  }));
};

// Aggregate weekly data
const aggregateWeeklyVelocity = (velocities: StoryVelocity[]): StoryVelocity[] => {
  // Implementation would group by week and sum counts
  // This is a simplified example
  return velocities; // placeholder
};
```

## Type Architecture Pattern

Following our domain-first approach, `StoryVelocity` serves as the core domain object:

```typescript
// Domain Object (Current)
interface StoryVelocity {
  clusterId: string;
  date: string;
  count: number;
}

// Response Types (Built from domain)
interface StoryVelocityResponse {
  data: StoryVelocity[];
  totalCount: number;
  page: number;
  hasMore: boolean;
}

interface StoryVelocityAggregateResponse {
  velocities: StoryVelocity[];
  averageVelocity: number;
  trendDirection: 'up' | 'down' | 'stable';
}

// Request Types (For API consumption)
interface StoryVelocityRequest {
  clusterIds: string[];
  startDate: string;
  endDate: string;
  granularity?: 'daily' | 'weekly' | 'monthly';
}

interface CreateStoryVelocityRequest extends Pick<StoryVelocity, 'clusterId' | 'date' | 'count'> {
  // Exact same shape for creation
}
```

## Related Types

```typescript
// Utility types derived from StoryVelocity
type StoryVelocityUpdate = Partial<Pick<StoryVelocity, 'count'>>;
type StoryVelocityKey = Pick<StoryVelocity, 'clusterId' | 'date'>;
type StoryVelocityMetrics = Omit<StoryVelocity, 'clusterId' | 'date'>;

// Extended interfaces
interface StoryVelocityWithMetadata extends StoryVelocity {
  createdAt: string;
  updatedAt: string;
  source: 'manual' | 'automated';
}

interface EnhancedStoryVelocity extends StoryVelocity {
  weekOverWeekChange?: number;
  trend?: 'increasing' | 'decreasing' | 'stable';
  ranking?: number;
}
```

## Integration Points

### API Routes
- `GET /api/velocity` - Fetch velocity data
- `POST /api/velocity` - Create velocity records
- `PUT /api/velocity` - Update velocity data

### Components
- `VelocityDashboard` - Main dashboard displaying velocity metrics
- `VelocityChart` - Chart component for visualizing trends
- `ClusterVelocityCard` - Individual cluster velocity display
- `VelocityTable` - Tabular data presentation

### Services
- `VelocityService` - Core business logic for velocity operations
- `AnalyticsService` - Aggregation and reporting functions
- `CacheService` - Caching frequently accessed velocity data

### State Management
- Zustand stores for velocity data
- React Query for server state management
- Local component state for UI interactions

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const StoryVelocitySchema = z.object({
  clusterId: z.string().min(1, 'Cluster ID is required'),
  date: z.string().datetime('Invalid date format'),
  count: z.number().int().min(0, 'Count must be a non-negative integer'),
});

export const StoryVelocityArraySchema = z.array(StoryVelocitySchema);

// Request validation schemas
export const StoryVelocityRequestSchema = z.object({
  clusterIds: z.array(z.string().min(1)),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  granularity: z.enum(['daily', 'weekly', 'monthly']).optional(),
});

// Response validation
export const StoryVelocityResponseSchema = z.object({
  data: StoryVelocityArraySchema,
  totalCount: z.number().int().min(0),
  page: z.number().int().min(1),
  hasMore: z.boolean(),
});
```

### Runtime Validation Example

```typescript
import { StoryVelocitySchema } from './validation/story-velocity';

const validateVelocityData = (data: unknown): StoryVelocity => {
  const result = StoryVelocitySchema.safeParse(data);
  
  if (!result.success) {
    throw new Error(`Invalid velocity data: ${result.error.message}`);
  }
  
  return result.data;
};
```

## Best Practices

### Adherence to Guidelines

✅ **Strict Typing**: All properties are explicitly typed with no `any` usage  
✅ **Interface Usage**: Uses `interface` for object shape definition  
✅ **Domain-First**: Serves as foundational domain object  
✅ **Utility Types**: Examples show proper use of `Pick`, `Omit`, `Partial`

### Recommended Patterns

```typescript
// ✅ Good: Use utility types for variations
type VelocityUpdateFields = Pick<StoryVelocity, 'count'>;

// ✅ Good: Extend for enhanced versions
interface VelocityWithTrend extends StoryVelocity {
  trendDirection: 'up' | 'down' | 'stable';
}

// ✅ Good: Type-safe array operations
const getClusterIds = (velocities: StoryVelocity[]): string[] => {
  return velocities.map(v => v.clusterId);
};

// ❌ Avoid: Loosely typed operations
const processData = (data: any) => {
  // Don't do this
};
```

### Performance Considerations

- Use `readonly` arrays for immutable velocity datasets
- Consider using `Map<string, StoryVelocity>` for frequent lookups by composite keys
- Implement proper memoization for expensive calculations

```typescript
// Performance-optimized variations
interface ReadonlyStoryVelocityCollection {
  readonly velocities: readonly StoryVelocity[];
}

type VelocityLookupMap = Map<string, StoryVelocity>; // Key: `${clusterId}-${date}`
```