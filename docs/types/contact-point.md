# ContactPoint Type Documentation

## Purpose

The `ContactPoint` type system defines the structure for managing notification endpoints and communication channels within the application. This type represents various delivery mechanisms (email, webhook, FASTN) for system notifications, alerts, and messages, along with their lifecycle status tracking.

## Type Definition

### Enums

#### ContactPointTypeEnum
```typescript
export enum ContactPointTypeEnum {
  EMAIL = 'EMAIL',
  WEBHOOK = 'WEBHOOK',
  FASTN = 'FASTN',
}
```

#### ContactPointStatusEnum
```typescript
export enum ContactPointStatusEnum {
  ARCHIVED = 'ARCHIVED',
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
  FAILING = 'FAILING',
  DELIVERED = 'DELIVERED',
  DELIVERY_FAILED = 'DELIVERY_FAILED',
  SCHEDULED = 'SCHEDULED',
}
```

### Core Interface

```typescript
export interface ContactPoint {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: ContactPointTypeEnum;
  status: ContactPointStatusEnum;
  name: string;
  webhookUrl: string;
  email: string;
  verified: boolean;
  verifiedAt: string | null;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the contact point |
| `createdAt` | `string` | ✅ | ISO timestamp of when the contact point was created |
| `updatedAt` | `string` | ✅ | ISO timestamp of the last update |
| `type` | `ContactPointTypeEnum` | ✅ | The delivery mechanism type (EMAIL, WEBHOOK, FASTN) |
| `status` | `ContactPointStatusEnum` | ✅ | Current operational status of the contact point |
| `name` | `string` | ✅ | Human-readable name/label for the contact point |
| `webhookUrl` | `string` | ✅ | URL endpoint for webhook deliveries |
| `email` | `string` | ✅ | Email address for email-type contact points |
| `verified` | `boolean` | ✅ | Whether the contact point has been verified |
| `verifiedAt` | `string \| null` | ✅ | ISO timestamp of verification, null if unverified |

## Usage Examples

### Basic Contact Point Creation

```typescript
import { ContactPoint, ContactPointTypeEnum, ContactPointStatusEnum } from '@/lib/types/contact-point';

// Creating an email contact point
const emailContactPoint: ContactPoint = {
  id: 1,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
  type: ContactPointTypeEnum.EMAIL,
  status: ContactPointStatusEnum.ACTIVE,
  name: 'Primary Support Email',
  webhookUrl: '', // Empty for email type
  email: 'support@company.com',
  verified: true,
  verifiedAt: '2024-01-15T11:00:00Z'
};

// Creating a webhook contact point
const webhookContactPoint: ContactPoint = {
  id: 2,
  createdAt: '2024-01-15T14:20:00Z',
  updatedAt: '2024-01-15T14:20:00Z',
  type: ContactPointTypeEnum.WEBHOOK,
  status: ContactPointStatusEnum.SCHEDULED,
  name: 'Slack Alerts Webhook',
  webhookUrl: 'https://hooks.slack.com/services/...',
  email: '', // Empty for webhook type
  verified: false,
  verifiedAt: null
};
```

### Type-Safe Filtering and Processing

```typescript
// Filter contact points by type
function getEmailContactPoints(contactPoints: ContactPoint[]): ContactPoint[] {
  return contactPoints.filter(cp => cp.type === ContactPointTypeEnum.EMAIL);
}

// Check if contact point is operational
function isContactPointOperational(contactPoint: ContactPoint): boolean {
  return contactPoint.status === ContactPointStatusEnum.ACTIVE && 
         contactPoint.verified;
}

// Get delivery endpoint based on type
function getDeliveryEndpoint(contactPoint: ContactPoint): string {
  switch (contactPoint.type) {
    case ContactPointTypeEnum.EMAIL:
      return contactPoint.email;
    case ContactPointTypeEnum.WEBHOOK:
    case ContactPointTypeEnum.FASTN:
      return contactPoint.webhookUrl;
    default:
      throw new Error(`Unknown contact point type: ${contactPoint.type}`);
  }
}
```

### Component Integration

```tsx
import React from 'react';
import { ContactPoint, ContactPointStatusEnum } from '@/lib/types/contact-point';

interface ContactPointListProps {
  contactPoints: ContactPoint[];
  onVerify: (id: number) => void;
  onArchive: (id: number) => void;
}

export const ContactPointList: React.FC<ContactPointListProps> = ({
  contactPoints,
  onVerify,
  onArchive
}) => {
  const getStatusBadgeColor = (status: ContactPointStatusEnum): string => {
    switch (status) {
      case ContactPointStatusEnum.ACTIVE:
        return 'bg-green-100 text-green-800';
      case ContactPointStatusEnum.FAILING:
      case ContactPointStatusEnum.DELIVERY_FAILED:
        return 'bg-red-100 text-red-800';
      case ContactPointStatusEnum.SCHEDULED:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {contactPoints.map((contactPoint) => (
        <div key={contactPoint.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{contactPoint.name}</h3>
              <p className="text-sm text-gray-600">
                Type: {contactPoint.type}
              </p>
              <p className="text-sm text-gray-600">
                {getDeliveryEndpoint(contactPoint)}
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeColor(contactPoint.status)}`}>
              {contactPoint.status}
            </span>
          </div>
          
          <div className="mt-3 flex gap-2">
            {!contactPoint.verified && (
              <button
                onClick={() => onVerify(contactPoint.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Verify
              </button>
            )}
            <button
              onClick={() => onArchive(contactPoint.id)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            >
              Archive
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
```

## Type Architecture Pattern

Following our domain-driven type architecture:

### 1. Domain Object (Current)
```typescript
// Core domain entity
export interface ContactPoint {
  // Base entity properties
  id: number;
  createdAt: string;
  updatedAt: string;
  
  // Domain-specific properties
  type: ContactPointTypeEnum;
  status: ContactPointStatusEnum;
  name: string;
  webhookUrl: string;
  email: string;
  verified: boolean;
  verifiedAt: string | null;
}
```

### 2. Response Types (Suggested Extensions)
```typescript
// API response wrapper
export interface ContactPointResponse {
  contactPoint: ContactPoint;
  metadata?: {
    lastDeliveryAttempt?: string;
    deliveryCount?: number;
    failureReason?: string;
  };
}

// List response
export interface ContactPointListResponse {
  contactPoints: ContactPoint[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

### 3. Request Types (Suggested Extensions)
```typescript
// Creation request
export interface CreateContactPointRequest {
  type: ContactPointTypeEnum;
  name: string;
  email?: string;
  webhookUrl?: string;
}

// Update request
export interface UpdateContactPointRequest {
  name?: string;
  email?: string;
  webhookUrl?: string;
  status?: ContactPointStatusEnum;
}

// Type-specific creation requests
export interface CreateEmailContactPointRequest {
  type: ContactPointTypeEnum.EMAIL;
  name: string;
  email: string;
}

export interface CreateWebhookContactPointRequest {
  type: ContactPointTypeEnum.WEBHOOK | ContactPointTypeEnum.FASTN;
  name: string;
  webhookUrl: string;
}
```

## Related Types

### Utility Types
```typescript
// Partial updates
export type ContactPointUpdate = Partial<Pick<ContactPoint, 'name' | 'email' | 'webhookUrl' | 'status'>>;

// Contact point without system fields
export type ContactPointInput = Omit<ContactPoint, 'id' | 'createdAt' | 'updatedAt' | 'verified' | 'verifiedAt'>;

// Status-specific types
export type ActiveContactPoint = ContactPoint & { status: ContactPointStatusEnum.ACTIVE };
export type VerifiedContactPoint = ContactPoint & { verified: true; verifiedAt: string };

// Type-specific contact points
export type EmailContactPoint = ContactPoint & { type: ContactPointTypeEnum.EMAIL };
export type WebhookContactPoint = ContactPoint & { 
  type: ContactPointTypeEnum.WEBHOOK | ContactPointTypeEnum.FASTN 
};
```

### Integration Types
```typescript
// For notification system integration
export interface NotificationTarget {
  contactPointId: number;
  priority: 'high' | 'medium' | 'low';
}

// For delivery tracking
export interface DeliveryAttempt {
  contactPointId: number;
  attemptedAt: string;
  status: 'success' | 'failed' | 'retrying';
  errorMessage?: string;
}
```

## Integration Points

### Services
```typescript
// Contact point service
export class ContactPointService {
  async create(request: CreateContactPointRequest): Promise<ContactPoint> {
    // Implementation
  }
  
  async update(id: number, updates: ContactPointUpdate): Promise<ContactPoint> {
    // Implementation
  }
  
  async verify(id: number): Promise<ContactPoint> {
    // Implementation
  }
  
  async getByStatus(status: ContactPointStatusEnum): Promise<ContactPoint[]> {
    // Implementation
  }
}

// Notification delivery service
export class NotificationDeliveryService {
  async deliver(
    contactPoint: ContactPoint, 
    message: string
  ): Promise<DeliveryAttempt> {
    // Implementation
  }
}
```

### API Endpoints
```typescript
// API route handlers
export async function POST(request: Request): Promise<Response> {
  const createRequest: CreateContactPointRequest = await request.json();
  // Handle creation
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const updates: ContactPointUpdate = await request.json();
  // Handle updates
}
```

## Validation

### Zod Schemas
```typescript
import { z } from 'zod';

export const ContactPointTypeSchema = z.nativeEnum(ContactPointTypeEnum);
export const ContactPointStatusSchema = z.nativeEnum(ContactPointStatusEnum);

export const ContactPointSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  type: ContactPointTypeSchema,
  status: ContactPointStatusSchema,
  name: z.string().min(1).max(100),
  webhookUrl: z.string().url().or(z.literal('')),
  email: z.string().email().or(z.literal('')),
  verified: z.boolean(),
  verifiedAt: z.string().datetime().nullable(),
}).refine((data) => {
  // Type-specific validation
  if (data.type === ContactPointTypeEnum.EMAIL) {
    return data.email !== '' && data.email.length > 0;
  }
  if (data.type === ContactPointTypeEnum.WEBHOOK || data.type === ContactPointTypeEnum.FASTN) {
    return data.webhookUrl !== '' && data.webhookUrl.length > 0;
  }
  return true;
}, {
  message: "Contact point must have appropriate endpoint for its type"
});

export const CreateContactPointSchema = z.object({
  type: ContactPointTypeSchema,
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  webhookUrl: z.string().url().optional(),
}).refine((data) => {
  if (data.type === ContactPointTypeEnum.EMAIL) {
    return data.email !== undefined;
  }
  if (data.type === ContactPointTypeEnum.WEBHOOK || data.type === ContactPointTypeEnum.FASTN) {
    return data.webhookUrl !== undefined;
  }
  return true;
}, {
  message: "Must provide appropriate endpoint for contact point type"
});
```

## Best Practices

### 1. Strict Typing Adherence
- ✅ Uses enums for reusable, constrained values (type and status)
- ✅ Uses interfaces for object shapes
- ✅ Avoids `any` types completely
- ✅ Provides explicit null handling for optional timestamps

### 2. Type Safety Patterns
```typescript
// Type guards for runtime safety
export function isEmailContactPoint(cp: ContactPoint): cp is EmailContactPoint {
  return cp.type === ContactPointTypeEnum.EMAIL;
}

export function isWebhookContactPoint(cp: ContactPoint): cp is WebhookContactPoint {
  return cp.type === ContactPointTypeEnum.WEBHOOK || cp.type === ContactPointTypeEnum.FASTN;
}

// Status checking utilities
export function isOperationalStatus(status: ContactPointStatusEnum): boolean {
  return [
    ContactPointStatusEnum.ACTIVE,
    ContactPointStatusEnum.DELIVERED,
    ContactPointStatusEnum.SCHEDULED
  ].includes(status);
}
```

### 3. Utility Type Usage
```typescript
// Leverage TypeScript utility types
export type ContactPointCreationFields = Pick<ContactPoint, 'type' | 'name' | 'email' | 'webhookUrl'>;
export type ContactPointTimestamps = Pick<ContactPoint, 'createdAt' | 'updatedAt' | 'verifiedAt'>;
export type ContactPointWithoutTimestamps = Omit<ContactPoint, keyof ContactPointTimestamps>;
```

### 4. Enum Best Practices
- Enums use string values for better debugging and API compatibility
- Status enum covers the complete lifecycle of contact points
- Type enum is extensible for future delivery mechanisms

### 5. Interface Design
- Follows consistent naming conventions
- Includes all necessary metadata fields
- Balances specificity with flexibility for different contact point types

This type system provides a robust foundation for managing notification delivery endpoints while maintaining type safety and following established architectural patterns.