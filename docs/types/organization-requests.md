# OrganizationRequestLog Type Documentation

## Purpose

The `OrganizationRequestLog` interface represents a domain object that captures API request logging data for organization-level monitoring and analytics. This type serves as the foundational data structure for tracking API usage, performance metrics, and security auditing within an organization's API ecosystem.

## Type Definition

```typescript
export interface OrganizationRequestLog {
  id: number;
  createdAt: string;
  updatedAt: string;
  organizationId: number;
  apiKeyId: number | null;
  apiKeyPreview: string | null;
  method: string;
  endpoint: string;
  query: string | null;
  ip: string;
  status: number;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the request log entry |
| `createdAt` | `string` | ✅ | ISO timestamp when the request was initially logged |
| `updatedAt` | `string` | ✅ | ISO timestamp when the log entry was last modified |
| `organizationId` | `number` | ✅ | Foreign key reference to the organization that owns this request |
| `apiKeyId` | `number \| null` | ❌ | Foreign key reference to the API key used (null for public endpoints) |
| `apiKeyPreview` | `string \| null` | ❌ | Truncated/masked version of the API key for display purposes |
| `method` | `string` | ✅ | HTTP method used for the request (GET, POST, PUT, DELETE, etc.) |
| `endpoint` | `string` | ✅ | The API endpoint path that was accessed |
| `query` | `string \| null` | ❌ | Query string parameters (null if no query parameters) |
| `ip` | `string` | ✅ | Client IP address that made the request |
| `status` | `number` | ✅ | HTTP status code returned by the API |

## Usage Examples

### Basic Usage in Components

```typescript
import { OrganizationRequestLog } from '@/lib/types/organization-requests';

// Display request logs in a table component
interface RequestLogTableProps {
  logs: OrganizationRequestLog[];
}

function RequestLogTable({ logs }: RequestLogTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Status</th>
          <th>IP Address</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.method}</td>
            <td>{log.endpoint}</td>
            <td className={getStatusColor(log.status)}>{log.status}</td>
            <td>{log.ip}</td>
            <td>{new Date(log.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Service Layer Usage

```typescript
import { OrganizationRequestLog } from '@/lib/types/organization-requests';

class OrganizationRequestService {
  async getRequestLogs(organizationId: number): Promise<OrganizationRequestLog[]> {
    const response = await fetch(`/api/organizations/${organizationId}/request-logs`);
    return response.json();
  }

  async filterLogsByStatus(
    logs: OrganizationRequestLog[],
    statusRange: [number, number]
  ): OrganizationRequestLog[] {
    return logs.filter(log => 
      log.status >= statusRange[0] && log.status <= statusRange[1]
    );
  }

  async getLogsByApiKey(
    logs: OrganizationRequestLog[],
    apiKeyId: number
  ): OrganizationRequestLog[] {
    return logs.filter(log => log.apiKeyId === apiKeyId);
  }
}
```

### Utility Type Usage

```typescript
// Creating request types using utility types
type CreateOrganizationRequestLog = Omit<OrganizationRequestLog, 'id' | 'createdAt' | 'updatedAt'>;

type UpdateOrganizationRequestLog = Partial<Pick<OrganizationRequestLog, 'status' | 'updatedAt'>>;

type RequestLogSummary = Pick<OrganizationRequestLog, 'method' | 'endpoint' | 'status' | 'createdAt'>;

// Analytics and filtering
interface RequestLogFilters {
  organizationId: number;
  methods?: OrganizationRequestLog['method'][];
  statusCodes?: OrganizationRequestLog['status'][];
  dateRange?: {
    start: string;
    end: string;
  };
}
```

## Type Architecture Pattern

Following our domain objects → response types → request types pattern:

```typescript
// 1. Domain Object (Base)
export interface OrganizationRequestLog {
  // ... (as defined above)
}

// 2. Response Types
export interface OrganizationRequestLogsResponse {
  data: OrganizationRequestLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    organizationId: number;
    dateRange: string;
  };
}

export interface OrganizationRequestLogStatsResponse {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  topEndpoints: Array<{
    endpoint: string;
    count: number;
  }>;
  statusDistribution: Record<string, number>;
}

// 3. Request Types
export interface GetOrganizationRequestLogsRequest {
  organizationId: number;
  page?: number;
  limit?: number;
  method?: string;
  status?: number;
  startDate?: string;
  endDate?: string;
}

export interface CreateOrganizationRequestLogRequest 
  extends Omit<OrganizationRequestLog, 'id' | 'createdAt' | 'updatedAt'> {}
```

## Related Types

```typescript
// Organization context
interface Organization {
  id: number;
  name: string;
  // ... other properties
}

// API Key context
interface ApiKey {
  id: number;
  organizationId: number;
  keyPreview: string;
  // ... other properties
}

// Extended analytics types
interface RequestLogAnalytics {
  log: OrganizationRequestLog;
  responseTime?: number;
  userAgent?: string;
  referer?: string;
}

// Error tracking
interface RequestLogError extends OrganizationRequestLog {
  errorMessage: string;
  stackTrace?: string;
}
```

## Integration Points

### API Routes
```typescript
// pages/api/organizations/[id]/request-logs.ts
import { OrganizationRequestLog } from '@/lib/types/organization-requests';

export default async function handler(req: NextApiRequest, res: NextApiResponse<OrganizationRequestLog[]>) {
  // Implementation
}
```

### Database Layer
```typescript
// lib/db/organization-requests.ts
import { OrganizationRequestLog } from '@/lib/types/organization-requests';

export class OrganizationRequestRepository {
  async findByOrganizationId(organizationId: number): Promise<OrganizationRequestLog[]> {
    // Database query implementation
  }

  async create(logData: CreateOrganizationRequestLog): Promise<OrganizationRequestLog> {
    // Insert implementation
  }
}
```

### React Query Integration
```typescript
// hooks/useOrganizationRequestLogs.ts
import { useQuery } from '@tanstack/react-query';
import { OrganizationRequestLog } from '@/lib/types/organization-requests';

export function useOrganizationRequestLogs(organizationId: number) {
  return useQuery<OrganizationRequestLog[]>({
    queryKey: ['organization-request-logs', organizationId],
    queryFn: () => fetchOrganizationRequestLogs(organizationId),
  });
}
```

## Validation

```typescript
import { z } from 'zod';

// Zod schema for runtime validation
export const OrganizationRequestLogSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  organizationId: z.number().positive(),
  apiKeyId: z.number().positive().nullable(),
  apiKeyPreview: z.string().min(1).nullable(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']),
  endpoint: z.string().min(1),
  query: z.string().nullable(),
  ip: z.string().ip(),
  status: z.number().int().min(100).max(599),
});

// Validation for creation
export const CreateOrganizationRequestLogSchema = OrganizationRequestLogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type inference from schema
export type ValidatedOrganizationRequestLog = z.infer<typeof OrganizationRequestLogSchema>;
```

## Best Practices

### 1. **Strict Typing Adherence**
- All properties are explicitly typed
- Uses `number | null` instead of `any` for optional references
- Maintains type safety throughout the data flow

### 2. **Interface Usage**
- Uses `interface` for object shape definition following our guidelines
- Provides clear extension points for future enhancements

### 3. **Null Handling**
- Explicit nullable types (`| null`) for optional foreign keys and data
- Clear distinction between required and optional properties

### 4. **Type Architecture**
- Serves as the foundational domain object
- Can be extended with utility types for specific use cases
- Follows the domain → response → request pattern

### 5. **Integration Patterns**
```typescript
// Good: Type-safe filtering
function filterSuccessfulRequests(logs: OrganizationRequestLog[]): OrganizationRequestLog[] {
  return logs.filter(log => log.status >= 200 && log.status < 300);
}

// Good: Utility type usage for partial updates
function updateRequestLog(
  id: number, 
  updates: Partial<Pick<OrganizationRequestLog, 'status' | 'updatedAt'>>
): Promise<OrganizationRequestLog> {
  // Implementation
}

// Good: Type-safe analytics
function calculateStatusDistribution(logs: OrganizationRequestLog[]): Record<string, number> {
  return logs.reduce((acc, log) => {
    const statusGroup = Math.floor(log.status / 100) * 100;
    acc[`${statusGroup}xx`] = (acc[`${statusGroup}xx`] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}
```

This type definition provides a solid foundation for organization-level request logging while maintaining strict typing standards and clear integration patterns throughout the application.