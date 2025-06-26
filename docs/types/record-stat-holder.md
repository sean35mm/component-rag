# RecordStatHolder Type Definition

## Purpose

The `RecordStatHolder` interface represents a statistical record holder structure that combines a descriptive name with a numerical count. This type serves as a foundational data structure for displaying statistical information, leaderboards, or any scenario where you need to track named entities with associated counts.

## Type Definition

```typescript
export interface RecordStatHolder {
  name: string;
  count: number;
}
```

This interface follows our **strict typing guidelines** by:
- Using `interface` over `type` for object shapes
- Providing explicit primitive types (`string`, `number`)
- Avoiding `any` types completely
- Maintaining a simple, focused structure

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | The display name or identifier for the record holder |
| `count` | `number` | ✅ | The numerical count or score associated with the record holder |

## Usage Examples

### Basic Usage

```typescript
import { RecordStatHolder } from '@/lib/types/record-stat-holder';

// Simple record holder
const topScorer: RecordStatHolder = {
  name: "John Doe",
  count: 150
};

// Usage in arrays for leaderboards
const leaderboard: RecordStatHolder[] = [
  { name: "Alice Smith", count: 250 },
  { name: "Bob Johnson", count: 200 },
  { name: "Charlie Brown", count: 175 }
];
```

### Component Integration

```typescript
import React from 'react';
import { RecordStatHolder } from '@/lib/types/record-stat-holder';

interface LeaderboardProps {
  records: RecordStatHolder[];
}

const LeaderboardComponent: React.FC<LeaderboardProps> = ({ records }) => {
  return (
    <div className="leaderboard">
      {records.map((record, index) => (
        <div key={record.name} className="record-item">
          <span className="rank">#{index + 1}</span>
          <span className="name">{record.name}</span>
          <span className="count">{record.count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { RecordStatHolder } from '@/lib/types/record-stat-holder';

class StatisticsService {
  async getTopPerformers(): Promise<RecordStatHolder[]> {
    const response = await fetch('/api/statistics/top-performers');
    const data = await response.json();
    
    return data.map((item: any): RecordStatHolder => ({
      name: item.performerName,
      count: item.score
    }));
  }

  formatLeaderboard(records: RecordStatHolder[]): RecordStatHolder[] {
    return records
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}
```

## Type Architecture Pattern

Following our **Type Architecture Pattern**, `RecordStatHolder` serves as a **domain object**:

```typescript
// 1. Domain Object (Base)
interface RecordStatHolder {
  name: string;
  count: number;
}

// 2. Response Types (API shapes)
interface LeaderboardResponse {
  records: RecordStatHolder[];
  totalCount: number;
  lastUpdated: string;
}

interface StatisticsResponse {
  topPerformers: RecordStatHolder[];
  categories: Record<string, RecordStatHolder[]>;
}

// 3. Request Types (API inputs)
interface RecordStatRequest {
  category?: string;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
}
```

## Related Types

### Extensions and Compositions

```typescript
// Extended version with additional metadata
interface DetailedRecordStatHolder extends RecordStatHolder {
  rank?: number;
  lastUpdated: Date;
  category: string;
}

// Utility types for partial updates
type RecordStatUpdate = Partial<Pick<RecordStatHolder, 'count'>>;
type RecordStatCreate = Omit<RecordStatHolder, never>; // All fields required

// Grouped statistics
interface CategoryStats {
  category: string;
  records: RecordStatHolder[];
  totalCount: number;
}
```

### Utility Type Applications

```typescript
// For form inputs or updates
type RecordStatInput = Partial<RecordStatHolder>;

// For display-only scenarios
type RecordStatDisplay = Readonly<RecordStatHolder>;

// For bulk operations
type RecordStatBulk = Pick<RecordStatHolder, 'name'> & {
  counts: number[];
};
```

## Integration Points

### Frontend Components
- **Leaderboard displays**: Ranking lists, top performer widgets
- **Dashboard statistics**: KPI cards, summary components
- **Charts and graphs**: Data visualization components

### Backend Services
- **Analytics APIs**: Performance tracking endpoints
- **Reporting services**: Statistical report generators
- **Database queries**: Aggregation and counting operations

### State Management
```typescript
// Redux/Zustand store slice
interface StatisticsState {
  leaderboard: RecordStatHolder[];
  loading: boolean;
  error: string | null;
}

// Actions
type UpdateLeaderboard = {
  type: 'UPDATE_LEADERBOARD';
  payload: RecordStatHolder[];
};
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const RecordStatHolderSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  count: z.number().int('Count must be an integer').min(0, 'Count cannot be negative')
});

// Usage in API validation
export const LeaderboardResponseSchema = z.object({
  records: z.array(RecordStatHolderSchema),
  totalCount: z.number().int().min(0),
  lastUpdated: z.string().datetime()
});

// Type inference from schema
type ValidatedRecordStatHolder = z.infer<typeof RecordStatHolderSchema>;
```

### Runtime Validation Helper

```typescript
export function validateRecordStatHolder(data: unknown): RecordStatHolder {
  const result = RecordStatHolderSchema.safeParse(data);
  
  if (!result.success) {
    throw new Error(`Invalid RecordStatHolder: ${result.error.message}`);
  }
  
  return result.data;
}
```

## Best Practices

### 1. **Strict Typing Adherence**
```typescript
// ✅ Good: Explicit typing
const createRecord = (name: string, count: number): RecordStatHolder => ({
  name,
  count
});

// ❌ Avoid: Implicit any
const createRecord = (name, count) => ({ name, count });
```

### 2. **Interface Consistency**
```typescript
// ✅ Good: Using interface for object shapes
interface RecordStatHolder {
  name: string;
  count: number;
}

// ❌ Avoid: Using type for simple object shapes
type RecordStatHolder = {
  name: string;
  count: number;
};
```

### 3. **Utility Type Leverage**
```typescript
// ✅ Good: Using built-in utility types
type PartialRecord = Partial<RecordStatHolder>;
type RecordName = Pick<RecordStatHolder, 'name'>;

// ✅ Good: Composition over duplication
interface ExtendedRecord extends RecordStatHolder {
  metadata: object;
}
```

### 4. **Type Guards**
```typescript
export function isRecordStatHolder(obj: unknown): obj is RecordStatHolder {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as RecordStatHolder).name === 'string' &&
    typeof (obj as RecordStatHolder).count === 'number'
  );
}
```

This type definition exemplifies our commitment to **strict typing** while maintaining simplicity and reusability across the application architecture.