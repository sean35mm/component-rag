# Signal Type Definitions Pattern

## Pattern Overview

The Signal Type Definitions pattern establishes a comprehensive type system for managing notification signals in a content monitoring and alerting system. This pattern defines the complete data structure for signals that monitor article content, detect volume anomalies, and trigger notifications based on configurable policies.

**When to use this pattern:**
- Building notification/alerting systems with complex configuration requirements
- Implementing content monitoring with multiple trigger conditions
- Creating flexible scheduling and notification delivery systems
- Designing systems that require strict type safety for configuration objects

## Architecture

The pattern is organized into several architectural layers:

```
Signal Type System
├── Core Enums (Status, Type, Policy definitions)
├── Configuration Interfaces (Schedule, Newsletter, Query)
├── Entity Relationships (Tags, Contact Points)
├── State Management Types (Creation, Validation)
└── Operational Types (Templates, Suggestions)
```

### Key Components:

1. **Enums**: Define finite sets of valid values for signal properties
2. **Configuration Interfaces**: Structure complex configuration objects
3. **Query Types**: Handle different types of monitoring queries
4. **Policy Objects**: Define scheduling and notification behaviors
5. **State Types**: Manage signal creation and validation workflows

## Implementation Details

### Enum-Based State Management
```typescript
// Provides type-safe state transitions
export enum SignalStatusEnum {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE', 
  STOPPED = 'STOPPED',
  ARCHIVED = 'ARCHIVED',
}

// Enables polymorphic behavior based on signal type
export enum SignalTypeEnum {
  ARTICLES = 'ARTICLES',
  ARTICLES_VOLUME = 'ARTICLES_VOLUME',
}
```

### Flexible Query System
```typescript
// Supports different query types through union types
export interface SignalQuery {
  query: {
    articlesQuery?: Partial<ComplexAllEndpointBody>;
    articlesVolumeQuery?: ArticlesVolumeQuery | null;
  };
}
```

### Temporal Configuration
```typescript
// Type-safe day scheduling
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

interface ScheduleInterval {
  hour: number;
  minute: number;
  days: DaysArray;
}
```

## Usage Examples

### Creating a Signal Configuration

```typescript
import { Signal, SignalStatusEnum, SignalTypeEnum, NotificationPolicyEnum } from './signal';

// Article monitoring signal
const articleSignal: Signal = {
  id: 1,
  uuid: 'signal-123',
  name: 'Tech News Monitor',
  status: SignalStatusEnum.ACTIVE,
  signalType: SignalTypeEnum.ARTICLES,
  notificationPolicyType: NotificationPolicyEnum.SCHEDULED,
  selectionPolicyType: SelectionPolicyEnum.MOST_RELEVANT,
  schedulePolicy: {
    intervals: [{
      hour: 9,
      minute: 0,
      days: ['MONDAY', 'WEDNESDAY', 'FRIDAY']
    }]
  },
  signalQuery: {
    query: {
      articlesQuery: {
        keywords: ['technology', 'AI'],
        dateRange: { start: '2024-01-01', end: '2024-12-31' }
      }
    }
  },
  contactPoints: [{
    type: ContactPointTypeEnum.EMAIL,
    status: 'ACTIVE',
    name: 'Tech Team',
    email: 'tech@company.com'
  }],
  // ... other required fields
};
```

### Volume Anomaly Detection

```typescript
// Volume-based signal with moving average comparison
const volumeSignal: Partial<Signal> = {
  signalType: SignalTypeEnum.ARTICLES_VOLUME,
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
          multiplier: 1.5
        },
        operator: 'GT'
      }
    }
  }
};
```

### Signal Creation Workflow

```typescript
// Type-safe signal creation state
const creationState: NewSignalCreationState = {
  content: 'Monitor AI breakthrough news',
  title: 'AI Innovation Tracker',
  entities: [
    { type: 'company', id: 'openai', name: 'OpenAI' },
    { type: 'topic', id: 'artificial-intelligence', name: 'AI' }
  ],
  filters: {
    dateRange: { start: '2024-01-01', end: null },
    sources: ['techcrunch', 'wired']
  }
};
```

## Best Practices

### 1. Enum Usage
```typescript
// ✅ Use enums for finite, known values
function validateSignalStatus(status: SignalStatusEnum): boolean {
  return Object.values(SignalStatusEnum).includes(status);
}

// ❌ Avoid magic strings
function badValidation(status: string): boolean {
  return status === 'active' || status === 'draft'; // Error-prone
}
```

### 2. Optional vs Required Fields
```typescript
// ✅ Clear distinction between creation and persistence
interface SignalCreation extends Omit<Signal, 'id' | 'createdAt' | 'updatedAt'> {
  // Creation doesn't require system-generated fields
}

// ✅ Use Partial for flexible updates
interface SignalUpdate extends Partial<Pick<Signal, 'name' | 'status' | 'schedulePolicy'>> {
  id: number; // Always required for updates
}
```

### 3. Type Guards
```typescript
// ✅ Implement type guards for runtime validation
function isArticleVolumeSignal(signal: Signal): signal is Signal & { 
  signalQuery: { query: { articlesVolumeQuery: ArticlesVolumeQuery } } 
} {
  return signal.signalType === SignalTypeEnum.ARTICLES_VOLUME &&
         signal.signalQuery.query.articlesVolumeQuery !== null;
}
```

## Integration

### With State Management
```typescript
// Redux/Zustand store integration
interface SignalStore {
  signals: Signal[];
  activeSignal: Signal | null;
  creationState: NewSignalCreationState;
  
  actions: {
    createSignal: (data: NewSignalCreationState) => Promise<Signal>;
    updateSignalStatus: (id: number, status: SignalStatusEnum) => void;
    validateSignal: (signal: Partial<Signal>) => SIGNAL_CREATION_VALIDATION_ERRORS[];
  };
}
```

### With API Layer
```typescript
// API client methods
class SignalAPI {
  async createSignal(signal: Omit<Signal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Signal> {
    return this.post('/signals', signal);
  }
  
  async updateSignalStatus(id: number, status: SignalStatusEnum): Promise<Signal> {
    return this.patch(`/signals/${id}`, { status });
  }
  
  async getSignalsByStatus(status: SignalStatusEnum): Promise<Signal[]> {
    return this.get(`/signals?status=${status}`);
  }
}
```

## Type Safety

### Discriminated Unions
```typescript
// Enable type narrowing based on signal type
type TypedSignal = 
  | { signalType: SignalTypeEnum.ARTICLES; signalQuery: { query: { articlesQuery: ComplexAllEndpointBody } } }
  | { signalType: SignalTypeEnum.ARTICLES_VOLUME; signalQuery: { query: { articlesVolumeQuery: ArticlesVolumeQuery } } };

function processSignal(signal: TypedSignal) {
  switch (signal.signalType) {
    case SignalTypeEnum.ARTICLES:
      // TypeScript knows articlesQuery exists
      console.log(signal.signalQuery.query.articlesQuery.keywords);
      break;
    case SignalTypeEnum.ARTICLES_VOLUME:
      // TypeScript knows articlesVolumeQuery exists
      console.log(signal.signalQuery.query.articlesVolumeQuery.operator);
      break;
  }
}
```

### Generic Constraints
```typescript
// Type-safe policy configuration
interface PolicyConfiguration<T extends SignalTypeEnum> {
  signalType: T;
  config: T extends SignalTypeEnum.ARTICLES 
    ? { maxArticles: number; relevanceThreshold: number }
    : T extends SignalTypeEnum.ARTICLES_VOLUME 
    ? { volumeThreshold: number; detectionWindow: number }
    : never;
}
```

## Performance

### Optimization Strategies

1. **Lazy Loading**
```typescript
// Load contact points on demand
interface OptimizedSignal extends Omit<Signal, 'contactPoints'> {
  contactPointIds: number[];
  getContactPoints?: () => Promise<ContactPoint[]>;
}
```

2. **Indexed Access**
```typescript
// Use Map for O(1) lookups
class SignalManager {
  private signalsByStatus = new Map<SignalStatusEnum, Signal[]>();
  private signalsById = new Map<number, Signal>();
  
  getActiveSignals(): Signal[] {
    return this.signalsByStatus.get(SignalStatusEnum.ACTIVE) || [];
  }
}
```

3. **Selective Updates**
```typescript
// Minimize object creation with targeted updates
function updateSignalSchedule(
  signal: Signal, 
  schedule: SchedulePolicy
): Signal {
  return {
    ...signal,
    schedulePolicy: schedule,
    updatedAt: new Date().toISOString()
  };
}
```

## Testing

### Unit Tests
```typescript
describe('Signal Types', () => {
  it('should validate signal status transitions', () => {
    const signal: Signal = createMockSignal();
    
    expect(canTransitionTo(signal.status, SignalStatusEnum.ACTIVE)).toBe(true);
    expect(canTransitionTo(SignalStatusEnum.ARCHIVED, SignalStatusEnum.ACTIVE)).toBe(false);
  });
  
  it('should properly type-narrow signal queries', () => {
    const volumeSignal: Signal = createVolumeSignal();
    
    if (isArticleVolumeSignal(volumeSignal)) {
      expect(volumeSignal.signalQuery.query.articlesVolumeQuery.operator).toBeOneOf(['GT', 'LT']);
    }
  });
});
```

### Integration Tests
```typescript
describe('Signal API Integration', () => {
  it('should create signal with proper type validation', async () => {
    const signalData: NewSignalCreationState = {
      content: 'Test signal',
      title: 'Test',
      entities: []
    };
    
    const signal = await signalAPI.createSignal(signalData);
    
    expect(signal).toMatchSchema(SignalSchema);
    expect(signal.status).toBe(SignalStatusEnum.DRAFT);
  });
});
```

## Common Pitfalls

### 1. Incomplete Type Definitions
```typescript
// ❌ Incomplete interface - missing required properties
interface IncompleteSignal {
  name: string;
  // Missing status, signalType, etc.
}

// ✅ Use utility types to ensure completeness
type RequiredSignalFields = Required<Pick<Signal, 'name' | 'status' | 'signalType'>>;
```

### 2. Enum Value Mismatches
```typescript
// ❌ Runtime values don't match enum
const badStatus = 'active'; // Should be 'ACTIVE'

// ✅ Use enum values consistently
const goodStatus = SignalStatusEnum.ACTIVE;

// ✅ Validate enum values at boundaries
function parseSignalStatus(value: string): SignalStatusEnum | null {
  return Object.values(SignalStatusEnum).includes(value as SignalStatusEnum) 
    ? value as SignalStatusEnum 
    : null;
}
```

### 3. Mutation of Readonly Data
```typescript
// ❌ Mutating enum arrays
const days: DaysArray = ['MONDAY', 'TUESDAY'];
days.push('INVALID_DAY' as DayOfWeek); // Runtime error

// ✅ Use readonly arrays and immutable updates
const readonlyDays: readonly DayOfWeek[] = ['MONDAY', 'TUESDAY'];
const newDays = [...readonlyDays, 'WEDNESDAY'];
```

### 4. Missing Null Checks
```typescript
// ❌ Assuming optional fields exist
function processNewsletter(signal: Signal) {
  return signal.newsletterConfig.type; // Potential null reference
}

// ✅ Proper null checking
function processNewsletterSafe(signal: Signal) {
  if (signal.newsletterConfig && 'type' in signal.newsletterConfig) {
    return signal.newsletterConfig.type;
  }
  return null;
}
```

This pattern provides a robust foundation for building type-safe, scalable notification systems with clear separation of concerns and comprehensive error handling capabilities.