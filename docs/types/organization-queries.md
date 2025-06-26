# OrganizationQueries Type Documentation

## Purpose

The `OrganizationQueries` type represents a nested record structure for tracking query metrics or counts associated with organizations. This type is typically used for analytics, monitoring, or caching query statistics where you need to organize numerical data by organization and query type hierarchically.

## Type Definition

```typescript
export type OrganizationQueries = Record<string, Record<string, number>>;
```

### Structure Breakdown
- **Outer Record**: Maps organization identifiers (string keys) to query collections
- **Inner Record**: Maps query identifiers/types (string keys) to numerical values
- **Values**: Numbers representing counts, metrics, or other quantitative data

## Properties

| Level | Key Type | Value Type | Description | Required |
|-------|----------|------------|-------------|----------|
| Level 1 | `string` | `Record<string, number>` | Organization identifier mapping to query collection | ✅ |
| Level 2 | `string` | `number` | Query identifier/type mapping to numerical value | ✅ |

## Usage Examples

### Basic Usage
```typescript
const organizationQueries: OrganizationQueries = {
  "org-123": {
    "user-queries": 450,
    "admin-queries": 23,
    "api-calls": 1200
  },
  "org-456": {
    "user-queries": 890,
    "admin-queries": 67,
    "api-calls": 2340
  }
};
```

### Service Layer Implementation
```typescript
// Analytics service
class OrganizationAnalyticsService {
  private queryMetrics: OrganizationQueries = {};

  incrementQuery(organizationId: string, queryType: string): void {
    if (!this.queryMetrics[organizationId]) {
      this.queryMetrics[organizationId] = {};
    }
    
    this.queryMetrics[organizationId][queryType] = 
      (this.queryMetrics[organizationId][queryType] || 0) + 1;
  }

  getOrganizationMetrics(organizationId: string): Record<string, number> | undefined {
    return this.queryMetrics[organizationId];
  }

  getAllMetrics(): OrganizationQueries {
    return { ...this.queryMetrics };
  }
}
```

### React Component Usage
```typescript
interface QueryMetricsProps {
  metrics: OrganizationQueries;
}

const QueryMetricsComponent: React.FC<QueryMetricsProps> = ({ metrics }) => {
  return (
    <div>
      {Object.entries(metrics).map(([orgId, queries]) => (
        <div key={orgId} className="org-metrics">
          <h3>Organization: {orgId}</h3>
          <ul>
            {Object.entries(queries).map(([queryType, count]) => (
              <li key={queryType}>
                {queryType}: {count.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
```

### Utility Functions
```typescript
// Calculate total queries for an organization
function getTotalQueriesForOrg(
  metrics: OrganizationQueries, 
  organizationId: string
): number {
  const orgMetrics = metrics[organizationId];
  if (!orgMetrics) return 0;
  
  return Object.values(orgMetrics).reduce((sum, count) => sum + count, 0);
}

// Get top performing organizations
function getTopOrganizations(
  metrics: OrganizationQueries, 
  limit: number = 5
): Array<{ organizationId: string; totalQueries: number }> {
  return Object.entries(metrics)
    .map(([orgId, queries]) => ({
      organizationId: orgId,
      totalQueries: Object.values(queries).reduce((sum, count) => sum + count, 0)
    }))
    .sort((a, b) => b.totalQueries - a.totalQueries)
    .slice(0, limit);
}
```

## Type Architecture Pattern

### Current Position in Architecture
```
Domain Objects → Response Types → Request Types
                      ↑
            OrganizationQueries
```

### Recommended Refactoring for Strict Guidelines

Following our **"Interfaces over Types"** guideline, consider this improved structure:

```typescript
// Domain objects (base interfaces)
interface QueryMetric {
  readonly queryType: string;
  readonly count: number;
  readonly lastUpdated?: Date;
}

interface OrganizationMetrics {
  readonly organizationId: string;
  readonly queries: readonly QueryMetric[];
}

// Response shape
interface OrganizationQueriesResponse {
  readonly organizations: readonly OrganizationMetrics[];
  readonly totalOrganizations: number;
  readonly generatedAt: Date;
}

// Current type as utility for backward compatibility
type OrganizationQueries = Record<string, Record<string, number>>;

// Conversion utilities
function toOrganizationQueries(response: OrganizationQueriesResponse): OrganizationQueries {
  return response.organizations.reduce((acc, org) => {
    acc[org.organizationId] = org.queries.reduce((queryAcc, query) => {
      queryAcc[query.queryType] = query.count;
      return queryAcc;
    }, {} as Record<string, number>);
    return acc;
  }, {} as OrganizationQueries);
}
```

## Related Types

```typescript
// Potential related types in the system
interface Organization {
  readonly id: string;
  readonly name: string;
  readonly tier: 'free' | 'pro' | 'enterprise';
}

interface QueryType {
  readonly id: string;
  readonly name: string;
  readonly category: 'read' | 'write' | 'admin';
}

// Composed types
type OrganizationQueryLimit = Record<string, Record<string, number>>;
type OrganizationQueryHistory = Record<string, Record<string, number[]>>;
```

## Integration Points

### Services
- **Analytics Service**: Query tracking and metrics aggregation
- **Monitoring Service**: Performance and usage monitoring
- **Billing Service**: Usage-based billing calculations
- **Cache Service**: Query result caching strategies

### Components
- **Dashboard Components**: Metrics visualization
- **Admin Panels**: Organization management
- **Reports**: Usage and analytics reporting

### API Endpoints
```typescript
// Example API integration
interface GetOrganizationMetricsResponse {
  data: OrganizationQueries;
  timestamp: string;
}

async function fetchOrganizationMetrics(): Promise<OrganizationQueries> {
  const response = await api.get<GetOrganizationMetricsResponse>('/analytics/queries');
  return response.data.data;
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

const OrganizationQueriesSchema = z.record(
  z.string().min(1, 'Organization ID cannot be empty'),
  z.record(
    z.string().min(1, 'Query type cannot be empty'),
    z.number().int().min(0, 'Query count must be non-negative')
  )
);

// Usage
function validateOrganizationQueries(data: unknown): OrganizationQueries {
  return OrganizationQueriesSchema.parse(data);
}

// Type guard
function isOrganizationQueries(data: unknown): data is OrganizationQueries {
  return OrganizationQueriesSchema.safeParse(data).success;
}
```

## Best Practices

### ✅ Recommended Improvements

1. **Use Interface over Type**:
   ```typescript
   interface OrganizationQueriesMap {
     readonly [organizationId: string]: {
       readonly [queryType: string]: number;
     };
   }
   ```

2. **Add Strict Key Typing**:
   ```typescript
   type OrganizationId = `org-${string}`;
   type QueryType = 'user-queries' | 'admin-queries' | 'api-calls';
   
   type OrganizationQueries = Record<OrganizationId, Record<QueryType, number>>;
   ```

3. **Immutable Structure**:
   ```typescript
   interface OrganizationQueries {
     readonly [organizationId: string]: {
       readonly [queryType: string]: number;
     };
   }
   ```

### ⚠️ Current Limitations

1. **Lacks Type Safety**: Generic string keys don't provide IDE support or compile-time validation
2. **Mutability**: No readonly modifiers allow accidental mutations
3. **No Domain Context**: Type doesn't convey business meaning or constraints

### 🎯 Migration Strategy

1. Create domain-specific interfaces following our guidelines
2. Add the improved types alongside existing ones
3. Gradually migrate consumers to use the new interfaces
4. Deprecate the generic Record type once migration is complete

This type serves its purpose for flexible key-value storage but should be enhanced with more specific interfaces to align with our strict typing guidelines and provide better developer experience.