# SavedSharedMemberThread Type Documentation

## Purpose

The `SavedSharedMemberThread` interface represents a saved shared thread in a member's personal collection. This domain object captures the essential metadata for threads that have been saved by users, including organizational structure through folder association and temporal tracking for sorting and filtering.

## Type Definition

```typescript
export interface SavedSharedMemberThread {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  folderId: number | null;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the saved thread |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp when thread was first saved |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp of last modification |
| `name` | `string` | ✅ | User-defined display name for the saved thread |
| `folderId` | `number \| null` | ✅ | Foreign key to folder for organization; null for root level |

## Usage Examples

### Basic Usage in Components

```typescript
interface SavedThreadListProps {
  threads: SavedSharedMemberThread[];
  onThreadSelect: (thread: SavedSharedMemberThread) => void;
}

const SavedThreadList: React.FC<SavedThreadListProps> = ({ threads, onThreadSelect }) => {
  return (
    <div>
      {threads.map((thread) => (
        <div key={thread.id} onClick={() => onThreadSelect(thread)}>
          <h3>{thread.name}</h3>
          <time>{new Date(thread.createdAt).toLocaleDateString()}</time>
        </div>
      ))}
    </div>
  );
};
```

### Service Layer Integration

```typescript
class SavedThreadService {
  async getSavedThreads(): Promise<SavedSharedMemberThread[]> {
    const response = await fetch('/api/saved-threads');
    return response.json();
  }

  async updateThreadName(
    threadId: string, 
    name: string
  ): Promise<SavedSharedMemberThread> {
    const response = await fetch(`/api/saved-threads/${threadId}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }
}
```

### Utility Type Applications

```typescript
// For partial updates
type SavedThreadUpdate = Partial<Pick<SavedSharedMemberThread, 'name' | 'folderId'>>;

// For creation requests (excluding server-generated fields)
type CreateSavedThreadRequest = Omit<SavedSharedMemberThread, 'id' | 'createdAt' | 'updatedAt'>;

// For folder organization
type SavedThreadsByFolder = Record<number | 'root', SavedSharedMemberThread[]>;
```

## Type Architecture Pattern

Following our domain-first approach:

```typescript
// 1. Domain Object (current)
interface SavedSharedMemberThread {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  folderId: number | null;
}

// 2. API Response Types
interface SavedThreadsResponse {
  threads: SavedSharedMemberThread[];
  pagination: PaginationMeta;
}

interface SavedThreadResponse {
  thread: SavedSharedMemberThread;
}

// 3. Request Types
interface CreateSavedThreadRequest {
  name: string;
  folderId?: number;
  sourceThreadId: string; // Reference to original shared thread
}

interface UpdateSavedThreadRequest {
  name?: string;
  folderId?: number | null;
}
```

## Related Types

```typescript
// Folder organization
interface SavedThreadFolder {
  id: number;
  name: string;
  memberId: string;
  createdAt: string;
}

// Extended view with folder information
interface SavedThreadWithFolder extends SavedSharedMemberThread {
  folder: SavedThreadFolder | null;
}

// Source thread reference
interface SharedMemberThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  // ... other thread properties
}
```

## Integration Points

### Component Integration
- **SavedThreadsList**: Displays collection of saved threads
- **ThreadFolderTree**: Organizes threads by folder structure
- **SavedThreadCard**: Individual thread display component
- **ThreadSearchFilter**: Filtering and searching saved threads

### Service Integration
- **SavedThreadService**: CRUD operations for saved threads
- **FolderService**: Folder management operations
- **ThreadSyncService**: Synchronization with source threads

### State Management
```typescript
interface SavedThreadsState {
  threads: SavedSharedMemberThread[];
  folders: SavedThreadFolder[];
  loading: boolean;
  error: string | null;
}

// Redux slice or Zustand store
interface SavedThreadsStore {
  state: SavedThreadsState;
  actions: {
    loadSavedThreads: () => Promise<void>;
    saveThread: (request: CreateSavedThreadRequest) => Promise<void>;
    updateThread: (id: string, updates: UpdateSavedThreadRequest) => Promise<void>;
    deleteThread: (id: string) => Promise<void>;
    moveToFolder: (threadId: string, folderId: number | null) => Promise<void>;
  };
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const SavedSharedMemberThreadSchema = z.object({
  id: z.string().uuid('Invalid thread ID format'),
  createdAt: z.string().datetime('Invalid createdAt timestamp'),
  updatedAt: z.string().datetime('Invalid updatedAt timestamp'),
  name: z.string()
    .min(1, 'Thread name is required')
    .max(200, 'Thread name must be 200 characters or less'),
  folderId: z.number().int().positive().nullable()
});

export const CreateSavedThreadRequestSchema = z.object({
  name: z.string().min(1).max(200),
  folderId: z.number().int().positive().optional(),
  sourceThreadId: z.string().uuid()
});

export const UpdateSavedThreadRequestSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  folderId: z.number().int().positive().nullable().optional()
});
```

### Runtime Validation
```typescript
function validateSavedThread(data: unknown): SavedSharedMemberThread {
  return SavedSharedMemberThreadSchema.parse(data);
}

function isValidSavedThread(data: unknown): data is SavedSharedMemberThread {
  return SavedSharedMemberThreadSchema.safeParse(data).success;
}
```

## Best Practices

### 1. Strict Typing Adherence
- Uses `string` for timestamps (ISO 8601 format) rather than `Date` for serialization compatibility
- Explicit `number | null` for optional foreign key relationships
- No `any` types used

### 2. Interface Usage
- Uses `interface` for object shape definition following guidelines
- Enables declaration merging if future extensions needed

### 3. Null Handling
```typescript
// Proper null checking for folderId
function getThreadFolder(thread: SavedSharedMemberThread): string | null {
  return thread.folderId !== null ? `Folder ${thread.folderId}` : null;
}

// Type guard for threads with folders
function hasFolder(thread: SavedSharedMemberThread): thread is SavedSharedMemberThread & { folderId: number } {
  return thread.folderId !== null;
}
```

### 4. Utility Type Leverage
```typescript
// Create focused update types
type ThreadMetaUpdate = Pick<SavedSharedMemberThread, 'name' | 'folderId'>;
type ThreadTimestamps = Pick<SavedSharedMemberThread, 'createdAt' | 'updatedAt'>;

// Build request types from domain object
type ThreadCreationFields = Omit<SavedSharedMemberThread, 'id' | 'createdAt' | 'updatedAt'>;
```

### 5. Type Architecture Consistency
This type serves as the foundational domain object, with all related types (requests, responses, extended views) deriving from it, ensuring consistency across the application's type system.