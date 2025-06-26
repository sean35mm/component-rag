# SignalNotification Type Documentation

## Purpose

The `SignalNotification` interface represents a notification entity that tracks the issuance and processing of signals within the notification system. It serves as a domain object that captures the lifecycle of signal notifications, including metadata about article processing and delivery to contact points.

This type acts as a bridge between the signal domain and the notification delivery system, maintaining references to both the originating signal and the resulting contact point notifications.

## Type Definition

```typescript
export interface SignalNotification {
  id: number;
  createdAt: string;
  updatedAt: string;
  signal: Pick<Signal, 'uuid' | 'createdAt' | 'updatedAt' | 'name' | 'status'>;
  issuedAt: string;
  metadata: {
    article_ids: string[];
    last_processed_at: string | null;
    current_processed_at: string | null;
  };
  contactPointNotifications: ContactPointNotification[];
}
```

### Type Architecture Analysis

This follows our **domain object** pattern as the foundational type. It demonstrates proper use of:
- **Utility Types**: Uses `Pick<Signal, ...>` to create a focused subset of Signal properties
- **Interfaces**: Properly uses interface for object shape definition
- **Strict Typing**: All properties are explicitly typed without any `any` usage

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the signal notification |
| `createdAt` | `string` | ✅ | ISO timestamp when the notification was created |
| `updatedAt` | `string` | ✅ | ISO timestamp when the notification was last updated |
| `signal` | `Pick<Signal, 'uuid' \| 'createdAt' \| 'updatedAt' \| 'name' \| 'status'>` | ✅ | Subset of signal properties relevant to the notification |
| `issuedAt` | `string` | ✅ | ISO timestamp when the notification was issued |
| `metadata` | `object` | ✅ | Processing metadata for the notification |
| `metadata.article_ids` | `string[]` | ✅ | Array of article identifiers associated with this notification |
| `metadata.last_processed_at` | `string \| null` | ✅ | Timestamp of last processing completion, null if never processed |
| `metadata.current_processed_at` | `string \| null` | ✅ | Timestamp of current processing start, null if not currently processing |
| `contactPointNotifications` | `ContactPointNotification[]` | ✅ | Array of notifications sent to specific contact points |

## Usage Examples

### Basic Usage in Components

```typescript
import { SignalNotification } from '@/lib/types/signal-notification';

interface NotificationListProps {
  notifications: SignalNotification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <h3>{notification.signal.name}</h3>
          <p>Issued: {new Date(notification.issuedAt).toLocaleDateString()}</p>
          <p>Articles: {notification.metadata.article_ids.length}</p>
          <p>Status: {notification.signal.status}</p>
        </div>
      ))}
    </div>
  );
}
```

### Service Layer Usage

```typescript
import { SignalNotification } from '@/lib/types/signal-notification';

class NotificationService {
  async getSignalNotifications(): Promise<SignalNotification[]> {
    const response = await fetch('/api/signal-notifications');
    return response.json();
  }

  async updateProcessingStatus(
    notificationId: number,
    status: 'start' | 'complete'
  ): Promise<SignalNotification> {
    const now = new Date().toISOString();
    const updateData = status === 'start' 
      ? { current_processed_at: now }
      : { last_processed_at: now, current_processed_at: null };

    const response = await fetch(`/api/signal-notifications/${notificationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metadata: updateData }),
    });
    
    return response.json();
  }
}
```

### Type Guards and Validation

```typescript
function isProcessing(notification: SignalNotification): boolean {
  return notification.metadata.current_processed_at !== null;
}

function hasBeenProcessed(notification: SignalNotification): boolean {
  return notification.metadata.last_processed_at !== null;
}

function getProcessingDuration(notification: SignalNotification): number | null {
  const { current_processed_at, last_processed_at } = notification.metadata;
  
  if (!current_processed_at || !last_processed_at) return null;
  
  return new Date(last_processed_at).getTime() - new Date(current_processed_at).getTime();
}
```

## Type Architecture Pattern

### Domain Object (Current)
```typescript
// ✅ Current: Domain object
export interface SignalNotification { ... }
```

### Response Types (Derived)
```typescript
// API response wrapper
export interface SignalNotificationResponse {
  data: SignalNotification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Detailed view response
export interface SignalNotificationDetailResponse {
  data: SignalNotification;
  related: {
    recentNotifications: Pick<SignalNotification, 'id' | 'issuedAt' | 'signal'>[];
  };
}
```

### Request Types (Derived)
```typescript
// Create request
export interface CreateSignalNotificationRequest {
  signalUuid: string;
  articleIds: string[];
  contactPointIds: number[];
}

// Update request
export interface UpdateSignalNotificationRequest {
  metadata?: Partial<SignalNotification['metadata']>;
}

// Query filters
export interface SignalNotificationFilters {
  signalStatus?: SignalNotification['signal']['status'];
  issuedAfter?: string;
  issuedBefore?: string;
  isProcessing?: boolean;
}
```

## Related Types

### Dependencies
- **`Signal`**: The source signal entity (uses `Pick` utility type)
- **`ContactPointNotification`**: Array of delivery notifications

### Extending Types
```typescript
// Enriched notification with computed fields
export interface EnrichedSignalNotification extends SignalNotification {
  isProcessing: boolean;
  processingDuration: number | null;
  deliveryStatus: 'pending' | 'partial' | 'complete' | 'failed';
}

// Summary view
export type SignalNotificationSummary = Pick<
  SignalNotification, 
  'id' | 'issuedAt' | 'signal'
> & {
  articleCount: number;
  contactPointCount: number;
};
```

## Integration Points

### API Endpoints
- `GET /api/signal-notifications` - List notifications
- `GET /api/signal-notifications/:id` - Get specific notification
- `POST /api/signal-notifications` - Create new notification
- `PATCH /api/signal-notifications/:id` - Update notification

### Components
- `NotificationDashboard` - Overview of all notifications
- `SignalNotificationCard` - Individual notification display
- `ProcessingStatusIndicator` - Shows processing state
- `ArticleList` - Displays associated articles

### Services
- `NotificationService` - CRUD operations
- `ProcessingService` - Handles metadata updates
- `DeliveryService` - Manages contact point notifications

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

const SignalNotificationMetadataSchema = z.object({
  article_ids: z.array(z.string()),
  last_processed_at: z.string().datetime().nullable(),
  current_processed_at: z.string().datetime().nullable(),
});

export const SignalNotificationSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  signal: z.object({
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    name: z.string().min(1),
    status: z.enum(['active', 'inactive', 'pending']), // Adjust based on Signal status
  }),
  issuedAt: z.string().datetime(),
  metadata: SignalNotificationMetadataSchema,
  contactPointNotifications: z.array(ContactPointNotificationSchema),
});

// Request validation
export const CreateSignalNotificationRequestSchema = z.object({
  signalUuid: z.string().uuid(),
  articleIds: z.array(z.string()).min(1),
  contactPointIds: z.array(z.number().positive()).min(1),
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties explicitly typed, no `any` usage
2. **Interface Usage**: Uses `interface` for object shape definition
3. **Utility Types**: Properly leverages `Pick<Signal, ...>` to avoid duplication
4. **Domain-First**: Serves as foundational domain object for derived types

### ✅ Recommended Patterns

```typescript
// Use utility types for variations
type SignalNotificationDraft = Omit<SignalNotification, 'id' | 'createdAt' | 'updatedAt'>;

// Create focused interfaces for specific use cases
interface NotificationProcessingUpdate {
  id: SignalNotification['id'];
  metadata: Pick<SignalNotification['metadata'], 'current_processed_at' | 'last_processed_at'>;
}

// Use type guards for runtime checks
function isValidNotification(data: unknown): data is SignalNotification {
  return SignalNotificationSchema.safeParse(data).success;
}
```

### ⚠️ Important Considerations

- **Date Handling**: All timestamps are strings (ISO format) - convert to Date objects for manipulation
- **Null vs Undefined**: Processing timestamps use `null` for explicit "not set" state
- **Array Dependencies**: Ensure `ContactPointNotification[]` is populated when needed
- **Signal Subset**: Only includes essential Signal properties - fetch full Signal separately if needed