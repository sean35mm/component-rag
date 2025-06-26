# StoryHistoryRecord Type Definition

## Purpose

The `StoryHistoryRecord` interface represents a complete historical snapshot of a story cluster's state at a specific point in time. This type serves as a domain object in our type architecture, capturing the essential data structure for story evolution tracking, including metadata, content summaries, key insights, and temporal information.

## Type Definition

```typescript
export interface StoryHistoryRecord {
  clusterId: string;
  name: string | null;
  summary: string;
  changelog: string | null;
  keyPoints: KeyPoint[];
  questions: Question[] | null;
  createdAt: string;
  triggeredAt: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clusterId` | `string` | ✅ | Unique identifier linking this record to its parent story cluster |
| `name` | `string \| null` | ✅ | Human-readable name for the story, null if not yet assigned |
| `summary` | `string` | ✅ | Comprehensive summary of the story content at this point in time |
| `changelog` | `string \| null` | ✅ | Description of changes since the last record, null for initial records |
| `keyPoints` | `KeyPoint[]` | ✅ | Array of extracted key insights and important points from the story |
| `questions` | `Question[] \| null` | ✅ | Generated questions for further investigation, null if none available |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp when this record was created in the system |
| `triggeredAt` | `string` | ✅ | ISO 8601 timestamp when the event that created this record occurred |

## Usage Examples

### Basic Usage in Components

```typescript
import { StoryHistoryRecord } from '@/lib/types/story-history-record';

interface StoryTimelineProps {
  historyRecords: StoryHistoryRecord[];
  selectedRecordId?: string;
}

const StoryTimeline: React.FC<StoryTimelineProps> = ({ 
  historyRecords, 
  selectedRecordId 
}) => {
  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="story-timeline">
      {historyRecords.map((record) => (
        <div 
          key={`${record.clusterId}-${record.createdAt}`}
          className={`timeline-item ${
            selectedRecordId === record.clusterId ? 'selected' : ''
          }`}
        >
          <h3>{record.name || 'Untitled Story'}</h3>
          <p className="summary">{record.summary}</p>
          <div className="metadata">
            <span>Created: {formatTimestamp(record.createdAt)}</span>
            <span>Triggered: {formatTimestamp(record.triggeredAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
```

### Service Layer Integration

```typescript
import { StoryHistoryRecord } from '@/lib/types/story-history-record';

class StoryHistoryService {
  async getHistoryForCluster(clusterId: string): Promise<StoryHistoryRecord[]> {
    const response = await fetch(`/api/stories/${clusterId}/history`);
    const data = await response.json();
    
    return data.records.map((record: any): StoryHistoryRecord => ({
      clusterId: record.cluster_id,
      name: record.name,
      summary: record.summary,
      changelog: record.changelog,
      keyPoints: record.key_points || [],
      questions: record.questions,
      createdAt: record.created_at,
      triggeredAt: record.triggered_at,
    }));
  }

  async createHistoryRecord(
    record: Omit<StoryHistoryRecord, 'createdAt'>
  ): Promise<StoryHistoryRecord> {
    const response = await fetch('/api/story-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cluster_id: record.clusterId,
        name: record.name,
        summary: record.summary,
        changelog: record.changelog,
        key_points: record.keyPoints,
        questions: record.questions,
        triggered_at: record.triggeredAt,
      }),
    });

    const data = await response.json();
    return {
      ...record,
      createdAt: data.created_at,
    };
  }
}
```

### Utility Functions and Type Guards

```typescript
import { StoryHistoryRecord } from '@/lib/types/story-history-record';

// Type guard for validation
export const isStoryHistoryRecord = (obj: any): obj is StoryHistoryRecord => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.clusterId === 'string' &&
    (typeof obj.name === 'string' || obj.name === null) &&
    typeof obj.summary === 'string' &&
    (typeof obj.changelog === 'string' || obj.changelog === null) &&
    Array.isArray(obj.keyPoints) &&
    (Array.isArray(obj.questions) || obj.questions === null) &&
    typeof obj.createdAt === 'string' &&
    typeof obj.triggeredAt === 'string'
  );
};

// Utility for filtering and sorting
export const sortRecordsByTimestamp = (
  records: StoryHistoryRecord[],
  direction: 'asc' | 'desc' = 'desc'
): StoryHistoryRecord[] => {
  return [...records].sort((a, b) => {
    const dateA = new Date(a.triggeredAt).getTime();
    const dateB = new Date(b.triggeredAt).getTime();
    return direction === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// Extract latest record for a cluster
export const getLatestRecord = (
  records: StoryHistoryRecord[]
): StoryHistoryRecord | null => {
  if (records.length === 0) return null;
  return sortRecordsByTimestamp(records, 'desc')[0];
};
```

## Type Architecture Pattern

```typescript
// 1. Domain Object (Current)
interface StoryHistoryRecord {
  clusterId: string;
  name: string | null;
  summary: string;
  changelog: string | null;
  keyPoints: KeyPoint[];
  questions: Question[] | null;
  createdAt: string;
  triggeredAt: string;
}

// 2. Response Types
interface StoryHistoryResponse {
  records: StoryHistoryRecord[];
  totalCount: number;
  hasMore: boolean;
  nextCursor?: string;
}

interface SingleHistoryRecordResponse {
  record: StoryHistoryRecord;
  previousRecord?: StoryHistoryRecord;
  nextRecord?: StoryHistoryRecord;
}

// 3. Request Types
interface CreateStoryHistoryRequest {
  clusterId: string;
  name?: string;
  summary: string;
  changelog?: string;
  keyPoints: Omit<KeyPoint, 'id'>[];
  questions?: Omit<Question, 'id'>[];
  triggeredAt: string;
}

interface UpdateStoryHistoryRequest {
  name?: string;
  summary?: string;
  changelog?: string;
}

// 4. Query Types
interface StoryHistoryQuery {
  clusterId?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  cursor?: string;
  includeKeyPoints?: boolean;
  includeQuestions?: boolean;
}
```

## Related Types

### Direct Dependencies
- `KeyPoint` - Represents extracted insights and important information
- `Question` - Represents generated questions for investigation

### Composed Types
```typescript
// Partial record for updates
type PartialStoryHistoryRecord = Partial<Pick<
  StoryHistoryRecord, 
  'name' | 'summary' | 'changelog'
>>;

// Record without timestamps (for creation)
type NewStoryHistoryRecord = Omit<StoryHistoryRecord, 'createdAt'>;

// Minimal record for listings
type StoryHistoryRecordSummary = Pick<
  StoryHistoryRecord, 
  'clusterId' | 'name' | 'summary' | 'createdAt' | 'triggeredAt'
>;
```

## Integration Points

### Services
- **StoryHistoryService**: CRUD operations and data transformation
- **StoryClusterService**: Retrieving related cluster information
- **AnalyticsService**: Tracking story evolution metrics

### Components
- **StoryTimeline**: Displaying chronological story progression
- **StoryDashboard**: Overview of story states and changes
- **StoryDetails**: Detailed view of individual records
- **StoryComparison**: Side-by-side comparison of records

### State Management
```typescript
// Redux/Zustand store slice
interface StoryHistoryState {
  records: Record<string, StoryHistoryRecord[]>;
  loading: boolean;
  error: string | null;
  selectedRecord: StoryHistoryRecord | null;
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { KeyPointSchema } from './key-point';
import { QuestionSchema } from './question';

export const StoryHistoryRecordSchema = z.object({
  clusterId: z.string().uuid('Invalid cluster ID format'),
  name: z.string().nullable(),
  summary: z.string().min(1, 'Summary is required'),
  changelog: z.string().nullable(),
  keyPoints: z.array(KeyPointSchema),
  questions: z.array(QuestionSchema).nullable(),
  createdAt: z.string().datetime('Invalid createdAt timestamp'),
  triggeredAt: z.string().datetime('Invalid triggeredAt timestamp'),
});

// Validation helper
export const validateStoryHistoryRecord = (
  data: unknown
): StoryHistoryRecord => {
  return StoryHistoryRecordSchema.parse(data);
};

// Create request validation
export const CreateStoryHistoryRequestSchema = StoryHistoryRecordSchema
  .omit({ createdAt: true });
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good: Explicit null handling
const getRecordName = (record: StoryHistoryRecord): string => {
  return record.name ?? 'Untitled Story';
};

// ❌ Bad: Implicit any
const getRecordName = (record: any) => {
  return record.name || 'Untitled Story';
};
```

### 2. Interface Composition
```typescript
// ✅ Good: Using utility types for variations
interface EditableStoryHistoryRecord extends 
  Pick<StoryHistoryRecord, 'name' | 'summary' | 'changelog'> {
  isDirty: boolean;
}

// ✅ Good: Omit for creation types
type CreateStoryHistoryData = Omit<StoryHistoryRecord, 'createdAt'>;
```

### 3. Temporal Data Handling
```typescript
// ✅ Good: Proper date handling
const isRecentRecord = (record: StoryHistoryRecord): boolean => {
  const daysSinceCreated = Math.floor(
    (Date.now() - new Date(record.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSinceCreated <= 7;
};

// ✅ Good: Timezone-aware formatting
const formatRecordDate = (record: StoryHistoryRecord): string => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC'
  }).format(new Date(record.triggeredAt));
};
```

### 4. Error Handling
```typescript
// ✅ Good: Comprehensive error handling
const safeParseHistoryRecord = (
  data: unknown
): { success: true; data: StoryHistoryRecord } | { success: false; error: string } => {
  try {
    const record = validateStoryHistoryRecord(data);
    return { success: true, data: record };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Invalid record format'
    };
  }
};
```

This type definition serves as a cornerstone of the story tracking system, providing a robust foundation for temporal data management while maintaining strict type safety and clear architectural boundaries.