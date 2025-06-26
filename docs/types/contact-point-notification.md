# ContactPointNotification Type Definition

## Purpose

The `ContactPointNotification` interface represents a notification sent to a specific contact point in the system. It tracks the lifecycle of a notification from creation to delivery, maintaining status information and timestamps for audit purposes. This type serves as a domain object that bridges contact management and notification delivery systems.

## Type Definition

```typescript
import { ContactPoint, ContactPointStatusEnum } from './contact-point';

export interface ContactPointNotification {
  id: string;
  createdAt: string;
  updatedAt: string;
  sentAt: string;
  status: ContactPointStatusEnum;
  contactPoint: ContactPoint;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the notification record |
| `createdAt` | `string` | ✅ | ISO timestamp when the notification was created |
| `updatedAt` | `string` | ✅ | ISO timestamp when the notification was last modified |
| `sentAt` | `string` | ✅ | ISO timestamp when the notification was sent |
| `status` | `ContactPointStatusEnum` | ✅ | Current status of the notification (pending, sent, failed, etc.) |
| `contactPoint` | `ContactPoint` | ✅ | Complete contact point object containing delivery details |

## Usage Examples

### Basic Usage in Components

```typescript
import { ContactPointNotification } from '@/lib/types/contact-point-notification';

// Display notification in a list component
const NotificationItem: React.FC<{ notification: ContactPointNotification }> = ({ 
  notification 
}) => {
  return (
    <div className="notification-item">
      <h3>Notification {notification.id}</h3>
      <p>Status: {notification.status}</p>
      <p>Sent to: {notification.contactPoint.value}</p>
      <p>Sent at: {new Date(notification.sentAt).toLocaleString()}</p>
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { ContactPointNotification } from '@/lib/types/contact-point-notification';

class NotificationService {
  async getNotificationHistory(
    contactPointId: string
  ): Promise<ContactPointNotification[]> {
    const response = await fetch(`/api/notifications?contactPointId=${contactPointId}`);
    return response.json();
  }

  async retryNotification(
    notification: ContactPointNotification
  ): Promise<ContactPointNotification> {
    const response = await fetch(`/api/notifications/${notification.id}/retry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }
}
```

### Utility Functions

```typescript
import { ContactPointNotification, ContactPointStatusEnum } from '@/lib/types';

// Filter notifications by status
export const getFailedNotifications = (
  notifications: ContactPointNotification[]
): ContactPointNotification[] => {
  return notifications.filter(
    notification => notification.status === ContactPointStatusEnum.FAILED
  );
};

// Check if notification was sent recently
export const isRecentNotification = (
  notification: ContactPointNotification,
  hoursThreshold: number = 24
): boolean => {
  const sentTime = new Date(notification.sentAt);
  const now = new Date();
  const diffHours = (now.getTime() - sentTime.getTime()) / (1000 * 60 * 60);
  return diffHours <= hoursThreshold;
};
```

## Type Architecture Pattern

Following our domain-first architecture:

### 1. Domain Object (Current)
```typescript
// Base domain representation
export interface ContactPointNotification {
  id: string;
  createdAt: string;
  updatedAt: string;
  sentAt: string;
  status: ContactPointStatusEnum;
  contactPoint: ContactPoint;
}
```

### 2. Response Types
```typescript
// API response wrapper
export interface NotificationResponse {
  notification: ContactPointNotification;
  metadata?: {
    retryCount: number;
    nextRetryAt?: string;
  };
}

// List response
export interface NotificationListResponse {
  notifications: ContactPointNotification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

### 3. Request Types
```typescript
// Create notification request
export interface CreateNotificationRequest {
  contactPointId: string;
  message: string;
  priority?: 'low' | 'normal' | 'high';
  scheduledAt?: string;
}

// Update notification request
export interface UpdateNotificationRequest extends Partial<
  Pick<ContactPointNotification, 'status'>
> {
  retryAt?: string;
}
```

## Related Types

### Direct Dependencies
- `ContactPoint` - The target contact point for the notification
- `ContactPointStatusEnum` - Enumeration of possible notification statuses

### Composite Types
```typescript
// Notification with delivery attempts
export interface NotificationWithAttempts extends ContactPointNotification {
  deliveryAttempts: DeliveryAttempt[];
}

// Notification summary for dashboards
export interface NotificationSummary extends Pick<
  ContactPointNotification, 
  'id' | 'status' | 'sentAt'
> {
  recipientName: string;
  notificationType: string;
}
```

## Integration Points

### Services
- **NotificationService** - CRUD operations and delivery management
- **ContactPointService** - Contact point validation and retrieval
- **AuditService** - Tracking notification history and compliance

### Components
- **NotificationList** - Display notification history
- **NotificationStatus** - Show current notification state
- **RetryNotification** - Handle failed notification retry logic

### API Endpoints
- `GET /api/notifications` - List notifications with filtering
- `POST /api/notifications` - Create new notification
- `PATCH /api/notifications/:id` - Update notification status
- `POST /api/notifications/:id/retry` - Retry failed notification

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { ContactPointSchema, ContactPointStatusEnum } from './contact-point';

export const ContactPointNotificationSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  sentAt: z.string().datetime(),
  status: z.nativeEnum(ContactPointStatusEnum),
  contactPoint: ContactPointSchema
});

// Request validation schemas
export const CreateNotificationRequestSchema = z.object({
  contactPointId: z.string().uuid(),
  message: z.string().min(1).max(1000),
  priority: z.enum(['low', 'normal', 'high']).optional(),
  scheduledAt: z.string().datetime().optional()
});
```

### Runtime Validation
```typescript
import { ContactPointNotificationSchema } from './schemas';

export const validateNotification = (data: unknown): ContactPointNotification => {
  return ContactPointNotificationSchema.parse(data);
};

export const isValidNotification = (data: unknown): data is ContactPointNotification => {
  return ContactPointNotificationSchema.safeParse(data).success;
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are strictly typed with no `any` usage
2. **Interface Usage**: Uses `interface` for object shape definition
3. **Enum Integration**: Leverages `ContactPointStatusEnum` for status values
4. **Composition**: Composes with `ContactPoint` interface for complete type safety

### ✅ Recommended Patterns

```typescript
// Use utility types for partial updates
type NotificationUpdate = Partial<Pick<ContactPointNotification, 'status'>>;

// Create specialized views
type NotificationListItem = Pick<
  ContactPointNotification, 
  'id' | 'status' | 'sentAt'
> & {
  contactType: string;
};

// Extend for specific use cases
interface ScheduledNotification extends ContactPointNotification {
  scheduledAt: string;
  triggerConditions: string[];
}
```

### ✅ Type Guards
```typescript
export const isFailedNotification = (
  notification: ContactPointNotification
): boolean => {
  return notification.status === ContactPointStatusEnum.FAILED;
};

export const isPendingNotification = (
  notification: ContactPointNotification
): boolean => {
  return notification.status === ContactPointStatusEnum.PENDING;
};
```

### ⚠️ Considerations

- **Date Handling**: Consider using `Date` objects instead of strings for better type safety
- **Status Validation**: Ensure status transitions follow business rules
- **Immutability**: Consider readonly modifiers for immutable notification records
- **Error Handling**: Include error details for failed notifications in extended interfaces