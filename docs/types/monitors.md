# Monitor Types Documentation

## Purpose

The `monitors.ts` module defines the core domain types for monitoring system functionality. These interfaces represent uptime monitoring entities and their collection responses, serving as the foundation for all monitor-related operations throughout the application.

## Type Definition

### Core Interfaces

```typescript
export interface Monitor {
  id: number;
  friendly_name: string;
  url: string;
  type: number;
  sub_type: string;
  keyword_type: string | null;
  keyword_case_type: string | null;
  keyword_value: string;
  port: string;
  interval: number;
  timeout: number;
  status: number;
  create_datetime: number;
  custom_uptime_ratio: string;
  custom_down_durations: string;
}

export interface Monitors {
  stat: string;
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
  monitors: Monitor[];
}
```

## Properties

### Monitor Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the monitor |
| `friendly_name` | `string` | ✅ | Human-readable name for the monitor |
| `url` | `string` | ✅ | Target URL or endpoint being monitored |
| `type` | `number` | ✅ | Monitor type identifier (HTTP, ping, port, etc.) |
| `sub_type` | `string` | ✅ | Additional classification for monitor behavior |
| `keyword_type` | `string \| null` | ✅ | Type of keyword monitoring (exists, not-exists, etc.) |
| `keyword_case_type` | `string \| null` | ✅ | Case sensitivity setting for keyword matching |
| `keyword_value` | `string` | ✅ | Keyword to search for in monitor response |
| `port` | `string` | ✅ | Port number for port-based monitoring |
| `interval` | `number` | ✅ | Check interval in seconds |
| `timeout` | `number` | ✅ | Request timeout in seconds |
| `status` | `number` | ✅ | Current monitor status (up/down/paused) |
| `create_datetime` | `number` | ✅ | Unix timestamp of monitor creation |
| `custom_uptime_ratio` | `string` | ✅ | Custom uptime percentage calculation |
| `custom_down_durations` | `string` | ✅ | Custom downtime duration tracking |

### Monitors Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `stat` | `string` | ✅ | API response status indicator |
| `pagination` | `object` | ✅ | Pagination metadata for monitor collection |
| `pagination.offset` | `number` | ✅ | Starting index for paginated results |
| `pagination.limit` | `number` | ✅ | Maximum number of results per page |
| `pagination.total` | `number` | ✅ | Total number of monitors available |
| `monitors` | `Monitor[]` | ✅ | Array of monitor objects |

## Usage Examples

### Basic Monitor Usage

```typescript
import { Monitor, Monitors } from '@/lib/types/monitors';

// Working with a single monitor
const handleMonitorUpdate = (monitor: Monitor): void => {
  console.log(`Updating monitor: ${monitor.friendly_name}`);
  console.log(`Status: ${monitor.status === 2 ? 'Up' : 'Down'}`);
  console.log(`Uptime: ${monitor.custom_uptime_ratio}%`);
};

// Processing monitor collection
const processMonitors = (response: Monitors): void => {
  const { monitors, pagination } = response;
  
  console.log(`Showing ${monitors.length} of ${pagination.total} monitors`);
  
  monitors.forEach(monitor => {
    if (monitor.keyword_type) {
      console.log(`Monitor ${monitor.friendly_name} uses keyword monitoring`);
    }
  });
};
```

### Component Integration

```typescript
import { Monitor } from '@/lib/types/monitors';

interface MonitorCardProps {
  monitor: Monitor;
  onStatusChange: (id: number, status: number) => void;
}

const MonitorCard: React.FC<MonitorCardProps> = ({ monitor, onStatusChange }) => {
  const isActive = monitor.status === 2;
  
  return (
    <div className={`monitor-card ${isActive ? 'active' : 'inactive'}`}>
      <h3>{monitor.friendly_name}</h3>
      <p>URL: {monitor.url}</p>
      <p>Interval: {monitor.interval}s</p>
      <p>Uptime: {monitor.custom_uptime_ratio}%</p>
      
      {monitor.keyword_type && (
        <div className="keyword-info">
          <span>Keyword: {monitor.keyword_value}</span>
          <span>Type: {monitor.keyword_type}</span>
        </div>
      )}
      
      <button 
        onClick={() => onStatusChange(monitor.id, isActive ? 0 : 2)}
      >
        {isActive ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { Monitor, Monitors } from '@/lib/types/monitors';

class MonitorService {
  async getMonitors(offset = 0, limit = 50): Promise<Monitors> {
    const response = await fetch(`/api/monitors?offset=${offset}&limit=${limit}`);
    return response.json() as Promise<Monitors>;
  }
  
  async getMonitor(id: number): Promise<Monitor> {
    const response = await fetch(`/api/monitors/${id}`);
    return response.json() as Promise<Monitor>;
  }
  
  async updateMonitorStatus(monitor: Monitor, status: number): Promise<Monitor> {
    const response = await fetch(`/api/monitors/${monitor.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json() as Promise<Monitor>;
  }
}
```

## Type Architecture Pattern

### Domain Objects → Response Types → Request Types

```typescript
// 1. Domain Objects (Current)
export interface Monitor { /* ... */ }
export interface Monitors { /* ... */ }

// 2. Response Types (Suggested extensions)
export interface MonitorResponse {
  stat: 'ok' | 'fail';
  monitor: Monitor;
}

export interface MonitorStatsResponse {
  stat: string;
  monitor: Pick<Monitor, 'id' | 'friendly_name' | 'status' | 'custom_uptime_ratio'>;
  stats: {
    uptime_ratio: number;
    total_checks: number;
    failed_checks: number;
  };
}

// 3. Request Types (Suggested extensions)
export interface CreateMonitorRequest {
  friendly_name: string;
  url: string;
  type: number;
  interval?: number;
  timeout?: number;
  keyword_type?: string;
  keyword_value?: string;
}

export interface UpdateMonitorRequest extends Partial<Pick<Monitor, 
  'friendly_name' | 'url' | 'interval' | 'timeout' | 'status'
>> {}
```

## Related Types

### Utility Types

```typescript
// Common monitor operations
export type MonitorId = Monitor['id'];
export type MonitorStatus = Monitor['status'];
export type MonitorSummary = Pick<Monitor, 'id' | 'friendly_name' | 'status' | 'url'>;

// Filtering and searching
export interface MonitorFilters {
  status?: MonitorStatus[];
  type?: number[];
  search?: string;
}

// Pagination utilities
export type PaginationParams = Pick<Monitors['pagination'], 'offset' | 'limit'>;
```

### Enums (Recommended additions)

```typescript
// Replace magic numbers with typed enums
export enum MonitorType {
  HTTP = 1,
  KEYWORD = 2,
  PING = 3,
  PORT = 4,
  HEARTBEAT = 5
}

export enum MonitorStatus {
  PAUSED = 0,
  NOT_CHECKED = 1,
  UP = 2,
  SEEMS_DOWN = 8,
  DOWN = 9
}

export enum KeywordType {
  EXISTS = 'exists',
  NOT_EXISTS = 'not exists'
}
```

## Integration Points

### Services
- `MonitorService` - CRUD operations for monitors
- `AlertService` - Monitor status change notifications
- `ReportService` - Uptime and performance reporting

### Components
- `MonitorList` - Display paginated monitor collections
- `MonitorCard` - Individual monitor status display
- `MonitorForm` - Create/edit monitor configuration
- `MonitorStats` - Uptime and performance metrics

### Hooks
- `useMonitors` - Fetch and manage monitor collections
- `useMonitor` - Individual monitor state management
- `useMonitorStatus` - Real-time status updates

## Validation

### Zod Schemas

```typescript
import { z } from 'zod';

export const MonitorSchema = z.object({
  id: z.number().positive(),
  friendly_name: z.string().min(1).max(255),
  url: z.string().url(),
  type: z.number().min(1).max(5),
  sub_type: z.string(),
  keyword_type: z.string().nullable(),
  keyword_case_type: z.string().nullable(),
  keyword_value: z.string(),
  port: z.string(),
  interval: z.number().min(60).max(86400), // 1 minute to 1 day
  timeout: z.number().min(1).max(3600),    // 1 second to 1 hour
  status: z.number().min(0).max(9),
  create_datetime: z.number().positive(),
  custom_uptime_ratio: z.string(),
  custom_down_durations: z.string()
});

export const MonitorsSchema = z.object({
  stat: z.string(),
  pagination: z.object({
    offset: z.number().min(0),
    limit: z.number().min(1).max(100),
    total: z.number().min(0)
  }),
  monitors: z.array(MonitorSchema)
});

// Runtime validation helpers
export const validateMonitor = (data: unknown): Monitor => {
  return MonitorSchema.parse(data);
};

export const validateMonitors = (data: unknown): Monitors => {
  return MonitorsSchema.parse(data);
};
```

## Best Practices

### Type Safety
- ✅ All properties are strictly typed with appropriate primitives
- ✅ Uses `string | null` over `any` for optional values
- ✅ Interfaces follow our guideline preference over type aliases

### Recommended Improvements
1. **Replace magic numbers with enums** for `type` and `status` fields
2. **Add utility types** for common operations (filtering, sorting)
3. **Create request/response wrappers** following our architecture pattern
4. **Implement runtime validation** with Zod schemas
5. **Add JSDoc comments** for better IDE support

### Usage Guidelines
- Always validate API responses using Zod schemas
- Use utility types for component props to avoid repetition
- Implement proper error handling for type mismatches
- Consider creating specialized views of Monitor for different use cases