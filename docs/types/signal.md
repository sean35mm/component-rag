# Signal Types Documentation

## Purpose

The `signal` type module defines the comprehensive type system for signal management functionality within the application. Signals represent automated monitoring systems that track article content and volume changes based on user-defined criteria, with configurable notification and scheduling policies. This module serves as the domain layer for signal creation, management, and execution workflows.

## Type Definition

### Core Domain Enums

```typescript
enum NotificationPolicyEnum {
  SCHEDULED = 'SCHEDULED',
  IMMEDIATE = 'IMMEDIATE',
}

enum SelectionPolicyEnum {
  LATEST = 'LATEST',
  MOST_RELEVANT = 'MOST_RELEVANT',
  AI_NEWSLETTER_SUMMARY = 'AI_NEWSLETTER_SUMMARY',
}

enum SignalStatusEnum {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
  ARCHIVED = 'ARCHIVED',
}

enum SignalTypeEnum {
  ARTICLES = 'ARTICLES',
  ARTICLES_VOLUME = 'ARTICLES_VOLUME',
}

enum ValueType {
  THRESHOLD = 'THRESHOLD',
  VOLUME = 'VOLUME',
  MA_VAL = 'MA_VAL',
  EMA_VAL = 'EMA_VAL',
  MA_PCT = 'MA_PCT',
  EMA_PCT = 'EMA_PCT',
}
```

### Domain Object Interfaces

```typescript
interface Signal {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  status: SignalStatusEnum;
  signalType: SignalTypeEnum;
  schedulePolicy: SchedulePolicy;
  notificationPolicyType: NotificationPolicyEnum;
  selectionPolicyType: SelectionPolicyEnum;
  newsletterConfig: null | unknown;
  signalQuery: SignalQuery;
  collection: null | unknown;
  tagIds: Tag[];
  contactPoints: ContactPoint[];
  contactPointIds?: number[];
}
```

## Properties

### Signal Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique numeric identifier |
| `uuid` | `string` | ✅ | UUID string for external references |
| `createdAt` | `string` | ✅ | ISO timestamp of creation |
| `updatedAt` | `string` | ✅ | ISO timestamp of last update |
| `name` | `string` | ✅ | Human-readable signal name |
| `status` | `SignalStatusEnum` | ✅ | Current signal lifecycle status |
| `signalType` | `SignalTypeEnum` | ✅ | Type of monitoring (articles or volume) |
| `schedulePolicy` | `SchedulePolicy` | ✅ | When notifications are sent |
| `notificationPolicyType` | `NotificationPolicyEnum` | ✅ | Notification timing strategy |
| `selectionPolicyType` | `SelectionPolicyEnum` | ✅ | Content selection strategy |
| `newsletterConfig` | `null \| unknown` | ✅ | Newsletter formatting configuration |
| `signalQuery` | `SignalQuery` | ✅ | Query definition for monitoring |
| `collection` | `null \| unknown` | ✅ | Associated collection if any |
| `tagIds` | `Tag[]` | ✅ | Associated tags for organization |
| `contactPoints` | `ContactPoint[]` | ✅ | Notification destinations |
| `contactPointIds` | `number[]` | ❌ | Alternative contact point references |

### SignalQuery Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ❌ | Query identifier |
| `createdAt` | `string` | ❌ | Query creation timestamp |
| `updatedAt` | `string` | ❌ | Query update timestamp |
| `query` | `QueryObject` | ✅ | Query definition object |

### SchedulePolicy Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `intervals` | `ScheduleInterval[]` | ✅ | Array of scheduled time intervals |

### ScheduleInterval Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `hour` | `number` | ✅ | Hour of day (0-23) |
| `minute` | `number` | ✅ | Minute of hour (0-59) |
| `days` | `DaysArray` | ✅ | Days of week for execution |

## Usage Examples

### Creating a New Signal

```typescript
import { Signal, SignalStatusEnum, SignalTypeEnum, NotificationPolicyEnum, SelectionPolicyEnum } from '@/lib/types/signal';

const createArticleSignal = (): Partial<Signal> => {
  return {
    name: "Tech News Monitor",
    status: SignalStatusEnum.DRAFT,
    signalType: SignalTypeEnum.ARTICLES,
    notificationPolicyType: NotificationPolicyEnum.SCHEDULED,
    selectionPolicyType: SelectionPolicyEnum.MOST_RELEVANT,
    schedulePolicy: {
      intervals: [
        {
          hour: 9,
          minute: 0,
          days: ['MONDAY', 'WEDNESDAY', 'FRIDAY']
        }
      ]
    },
    signalQuery: {
      query: {
        articlesQuery: {
          keywords: "artificial intelligence",
          dateRange: "last_7_days"
        }
      }
    },
    contactPoints: [
      {
        type: ContactPointTypeEnum.EMAIL,
        status: 'ACTIVE',
        name: 'Tech Team Email',
        email: 'tech@company.com'
      }
    ]
  };
};
```

### Volume-Based Signal with Moving Average

```typescript
const createVolumeSignal = (): Partial<Signal> => {
  return {
    name: "High Volume Alert",
    signalType: SignalTypeEnum.ARTICLES_VOLUME,
    notificationPolicyType: NotificationPolicyEnum.IMMEDIATE,
    signalQuery: {
      query: {
        articlesVolumeQuery: {
          left: {
            valueType: ValueType.VOLUME,
            period: 'DAY'
          },
          right: {
            valueType: ValueType.MA_VAL,
            trailingDays: 7,
            multiplier: 2.0
          },
          operator: 'GT'
        }
      }
    }
  };
};
```

### Signal Status Management

```typescript
const updateSignalStatus = (signal: Signal, newStatus: SignalStatusEnum): Signal => {
  return {
    ...signal,
    status: newStatus,
    updatedAt: new Date().toISOString()
  };
};

// Activate a draft signal
const activateSignal = (signal: Signal): Signal => {
  if (signal.status !== SignalStatusEnum.DRAFT) {
    throw new Error('Only draft signals can be activated');
  }
  
  return updateSignalStatus(signal, SignalStatusEnum.ACTIVE);
};
```

### Working with Signal Creation State

```typescript
import { NewSignalCreationState, SIGNAL_CREATION_VALIDATION_ERRORS } from '@/lib/types/signal';

interface SignalCreationValidation {
  isValid: boolean;
  errors: SIGNAL_CREATION_VALIDATION_ERRORS[];
}

const validateSignalCreation = (state: NewSignalCreationState): SignalCreationValidation => {
  const errors: SIGNAL_CREATION_VALIDATION_ERRORS[] = [];
  
  if (!state.content.trim()) {
    errors.push(SIGNAL_CREATION_VALIDATION_ERRORS.QUERY);
  }
  
  if (!state.title?.trim()) {
    errors.push(SIGNAL_CREATION_VALIDATION_ERRORS.QUERY_TITLE);
  }
  
  if (!state.entities?.length && !state.filters) {
    errors.push(SIGNAL_CREATION_VALIDATION_ERRORS.QUERY_INCOMPLETE);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## Type Architecture Pattern

This module follows our domain-first architecture pattern:

### 1. Domain Objects (Core Entities)
- `Signal` - Primary domain entity
- `SignalQuery` - Query configuration domain object
- `Tag` - Supporting entity for organization

### 2. Value Objects and Enums
- `SignalStatusEnum` - Lifecycle states
- `SignalTypeEnum` - Monitoring types
- `NotificationPolicyEnum` - Delivery strategies
- `ValueType` - Volume calculation methods

### 3. Request/Creation Types
- `NewSignalCreationState` - Form state for signal creation
- `PendingSignalEntities` - Temporary entity storage during creation

### 4. Response Shapes
- `SignalSuggestionTemplate` - API response for suggestions
- `ContactPoint` objects within Signal responses

## Related Types

### Direct Dependencies
- `ComplexAllEndpointBody` - Article query structure
- `ContactPointTypeEnum` - Notification channel types
- `FiltersState` - Search filter configurations
- `SearchEntityItem` - Entity selection during creation

### Composition Relationships
```typescript
// Signal composes multiple domain concepts
Signal -> {
  SignalQuery -> ComplexAllEndpointBody,
  SchedulePolicy -> ScheduleInterval[],
  ContactPoint[] -> ContactPointTypeEnum,
  Tag[]
}
```

### Extension Points
```typescript
// For creating specialized signal types
interface ArticleSignal extends Signal {
  signalType: SignalTypeEnum.ARTICLES;
  signalQuery: {
    query: {
      articlesQuery: ComplexAllEndpointBody;
      articlesVolumeQuery?: never;
    };
  };
}

interface VolumeSignal extends Signal {
  signalType: SignalTypeEnum.ARTICLES_VOLUME;
  signalQuery: {
    query: {
      articlesQuery?: Partial<ComplexAllEndpointBody>;
      articlesVolumeQuery: ArticlesVolumeQuery;
    };
  };
}
```

## Integration Points

### Services Layer
```typescript
// Signal management service
interface SignalService {
  createSignal(data: Partial<Signal>): Promise<Signal>;
  updateSignal(id: number, updates: Partial<Signal>): Promise<Signal>;
  getSignalById(id: number): Promise<Signal>;
  listSignals(filters?: SignalFilters): Promise<Signal[]>;
  executeSignal(id: number): Promise<void>;
}
```

### React Components
```typescript
// Signal list component
interface SignalListProps {
  signals: Signal[];
  onStatusChange: (signal: Signal, status: SignalStatusEnum) => void;
  onEdit: (signal: Signal) => void;
}

// Signal creation form
interface SignalFormProps {
  initialState?: NewSignalCreationState;
  onSubmit: (signal: Partial<Signal>) => Promise<void>;
  validationErrors?: SIGNAL_CREATION_VALIDATION_ERRORS[];
}
```

### State Management
```typescript
// Redux/Zustand store slice
interface SignalStore {
  signals: Signal[];
  creationState: NewSignalCreationState;
  selectedSignal: Signal | null;
  
  // Actions
  setSignals: (signals: Signal[]) => void;
  updateSignalStatus: (id: number, status: SignalStatusEnum) => void;
  setCreationState: (state: Partial<NewSignalCreationState>) => void;
}
```

## Validation

### Zod Schema Examples

```typescript
import { z } from 'zod';

const SignalStatusSchema = z.nativeEnum(SignalStatusEnum);
const SignalTypeSchema = z.nativeEnum(SignalTypeEnum);
const DayOfWeekSchema = z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);

const ScheduleIntervalSchema = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  days: z.array(DayOfWeekSchema).min(1)
});

const SchedulePolicySchema = z.object({
  intervals: z.array(ScheduleIntervalSchema).min(1)
});

const SignalSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string().min(1).max(255),
  status: SignalStatusSchema,
  signalType: SignalTypeSchema,
  schedulePolicy: SchedulePolicySchema,
  notificationPolicyType: z.nativeEnum(NotificationPolicyEnum),
  selectionPolicyType: z.nativeEnum(SelectionPolicyEnum),
  // Additional validations...
});

// Creation validation
const NewSignalCreationSchema = z.object({
  content: z.string().min(1, "Query content is required"),
  title: z.string().min(1, "Signal title is required").optional(),
  entities: z.array(z.any()).optional(),
  filters: z.any().nullable().optional(),
  savedFilterPresetId: z.string().nullable().optional()
});
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good: Specific enum usage
const activateSignal = (status: SignalStatusEnum.ACTIVE) => { };

// ❌ Avoid: String literals for known enums
const activateSignal = (status: 'ACTIVE') => { };
```

### 2. Interface Composition
```typescript
// ✅ Good: Composing interfaces for different contexts
interface SignalListItem extends Pick<Signal, 'id' | 'name' | 'status' | 'signalType'> {
  lastExecuted?: string;
  nextExecution?: string;
}

// ✅ Good: Partial for updates
interface SignalUpdate extends Partial<Omit<Signal, 'id' | 'uuid' | 'createdAt'>> {
  updatedAt: string;
}
```

### 3. Type Guards
```typescript
const isActiveSignal = (signal: Signal): signal is Signal & { status: SignalStatusEnum.ACTIVE } => {
  return signal.status === SignalStatusEnum.ACTIVE;
};

const isVolumeSignal = (signal: Signal): signal is VolumeSignal => {
  return signal.signalType === SignalTypeEnum.ARTICLES_VOLUME;
};
```

### 4. Utility Type Usage
```typescript
// Creating focused interfaces using utility types
type SignalCreationFields = Omit<Signal, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>;
type SignalSummary = Pick<Signal, 'id' | 'name' | 'status' | 'signalType'>;
type SignalWithoutContacts = Omit<Signal, 'contactPoints' | 'contactPointIds'>;
```

### 5. Enum vs Literal Types
```typescript
// ✅ Good: Enums for reusable domain concepts
enum SignalStatusEnum { ... }

// ✅ Good: Literals for single-use cases
type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'EXECUTE';
```

This comprehensive type system provides a robust foundation for signal management functionality while maintaining strict typing standards and clear architectural boundaries.