# Folder Type Definition

## Purpose

The `Folder` interface represents a domain object for organizing and grouping various types of saved content within the application. It serves as a container for signals, stories, searches, and member threads, providing users with a way to categorize and manage their saved items in a hierarchical structure.

## Type Definition

```tsx
export interface Folder {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  signals: Signal[];
  stories: SavedStory[];
  searches: SavedDeepSearch[];
  memberThreads: AnswersThread[];
  sharedMemberThreads: SavedSharedMemberThread[];
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the folder |
| `createdAt` | `string` | ✅ | ISO 8601 timestamp of when the folder was created |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp of when the folder was last modified |
| `name` | `string` | ✅ | Human-readable name for the folder |
| `signals` | `Signal[]` | ✅ | Array of signals saved in this folder |
| `stories` | `SavedStory[]` | ✅ | Array of saved stories in this folder |
| `searches` | `SavedDeepSearch[]` | ✅ | Array of saved deep searches in this folder |
| `memberThreads` | `AnswersThread[]` | ✅ | Array of answers threads saved in this folder |
| `sharedMemberThreads` | `SavedSharedMemberThread[]` | ✅ | Array of shared member threads saved in this folder |

## Usage Examples

### Basic Folder Creation

```tsx
// Creating a new folder (without saved items)
const createNewFolder = (name: string): Omit<Folder, 'id' | 'createdAt' | 'updatedAt'> => ({
  name,
  signals: [],
  stories: [],
  searches: [],
  memberThreads: [],
  sharedMemberThreads: []
});

// Usage in a component
const [folders, setFolders] = useState<Folder[]>([]);

const handleCreateFolder = async (folderName: string) => {
  const newFolderData = createNewFolder(folderName);
  const createdFolder = await folderService.create(newFolderData);
  setFolders(prev => [...prev, createdFolder]);
};
```

### Folder with Content

```tsx
// Working with populated folders
const MyFoldersComponent: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const renderFolderContents = (folder: Folder) => (
    <div className="folder-contents">
      <h3>{folder.name}</h3>
      <div className="folder-stats">
        <span>Signals: {folder.signals.length}</span>
        <span>Stories: {folder.stories.length}</span>
        <span>Searches: {folder.searches.length}</span>
        <span>Threads: {folder.memberThreads.length}</span>
        <span>Shared Threads: {folder.sharedMemberThreads.length}</span>
      </div>
    </div>
  );

  return (
    <div>
      {selectedFolder && renderFolderContents(selectedFolder)}
    </div>
  );
};
```

### Utility Functions

```tsx
// Type-safe utility functions for folder operations
const getFolderItemCount = (folder: Folder): number => {
  return folder.signals.length + 
         folder.stories.length + 
         folder.searches.length + 
         folder.memberThreads.length + 
         folder.sharedMemberThreads.length;
};

const isFolderEmpty = (folder: Folder): boolean => {
  return getFolderItemCount(folder) === 0;
};

// Filtering folders by content type
const getFoldersWithSignals = (folders: Folder[]): Folder[] => {
  return folders.filter(folder => folder.signals.length > 0);
};

const searchFoldersByName = (folders: Folder[], searchTerm: string): Folder[] => {
  return folders.filter(folder => 
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
```

## Type Architecture Pattern

Following our domain-first architecture, the `Folder` type serves as the core domain object with derived types:

### Domain Object (Base)
```tsx
// Primary domain object - src/lib/types/folders.ts
interface Folder {
  // Full domain object with all properties
}
```

### Response Types
```tsx
// API response shapes
interface FolderListResponse {
  folders: Folder[];
  total: number;
  page: number;
  limit: number;
}

interface FolderResponse {
  folder: Folder;
}
```

### Request Types
```tsx
// API request payloads
interface CreateFolderRequest {
  name: string;
}

interface UpdateFolderRequest {
  name?: string;
}

interface AddToFolderRequest {
  folderId: number;
  itemType: 'signal' | 'story' | 'search' | 'thread' | 'sharedThread';
  itemId: number;
}
```

### Utility Types
```tsx
// Derived types for specific use cases
type FolderSummary = Pick<Folder, 'id' | 'name' | 'updatedAt'>;
type FolderMetadata = Omit<Folder, 'signals' | 'stories' | 'searches' | 'memberThreads' | 'sharedMemberThreads'>;
type EmptyFolder = Omit<Folder, 'id' | 'createdAt' | 'updatedAt'>;
```

## Related Types

The `Folder` interface composes several other domain types:

- **`Signal`** - Individual signals saved in folders
- **`SavedStory`** - Story content saved by users
- **`SavedDeepSearch`** - Persistent search queries and results
- **`AnswersThread`** - Q&A thread conversations
- **`SavedSharedMemberThread`** - Shared conversation threads

## Integration Points

### Services
```tsx
// src/lib/services/folder-service.ts
class FolderService {
  async getFolders(): Promise<Folder[]> { /* ... */ }
  async createFolder(data: CreateFolderRequest): Promise<Folder> { /* ... */ }
  async updateFolder(id: number, data: UpdateFolderRequest): Promise<Folder> { /* ... */ }
  async deleteFolder(id: number): Promise<void> { /* ... */ }
}
```

### Components
- Folder management interfaces
- Content organization views
- Drag-and-drop folder systems
- Folder selection dropdowns

### State Management
```tsx
// Redux/Zustand store slices
interface FolderState {
  folders: Folder[];
  selectedFolder: Folder | null;
  loading: boolean;
  error: string | null;
}
```

## Validation

### Zod Schema
```tsx
import { z } from 'zod';

const FolderSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  name: z.string().min(1).max(255),
  signals: z.array(SignalSchema),
  stories: z.array(SavedStorySchema),
  searches: z.array(SavedDeepSearchSchema),
  memberThreads: z.array(AnswersThreadSchema),
  sharedMemberThreads: z.array(SavedSharedMemberThreadSchema)
});

const CreateFolderSchema = z.object({
  name: z.string().min(1, 'Folder name is required').max(255, 'Folder name too long')
});

// Type inference from schema
type ValidatedFolder = z.infer<typeof FolderSchema>;
type ValidatedCreateFolder = z.infer<typeof CreateFolderSchema>;
```

### Runtime Validation
```tsx
const validateFolder = (data: unknown): Folder => {
  return FolderSchema.parse(data);
};

const validateCreateFolder = (data: unknown): CreateFolderRequest => {
  return CreateFolderSchema.parse(data);
};
```

## Best Practices

### 1. Strict Typing Adherence
```tsx
// ✅ Good: Strict typing with proper interfaces
const processFolder = (folder: Folder): FolderSummary => ({
  id: folder.id,
  name: folder.name,
  updatedAt: folder.updatedAt
});

// ❌ Avoid: Using any type
const processFolder = (folder: any) => { /* ... */ };
```

### 2. Interface Usage
```tsx
// ✅ Good: Using interface for object shape
interface FolderProps {
  folder: Folder;
  onUpdate: (folder: Folder) => void;
}

// ❌ Avoid: Using type for simple object shapes
type FolderProps = {
  folder: Folder;
  onUpdate: (folder: Folder) => void;
}
```

### 3. Utility Type Leverage
```tsx
// ✅ Good: Using utility types for variations
type PartialFolderUpdate = Partial<Pick<Folder, 'name'>>;
type FolderWithoutContent = Omit<Folder, 'signals' | 'stories' | 'searches' | 'memberThreads' | 'sharedMemberThreads'>;

// ✅ Good: Creating specific types for different contexts
type FolderListItem = Pick<Folder, 'id' | 'name' | 'updatedAt'> & {
  itemCount: number;
};
```

### 4. Type Guards
```tsx
// Type guard for runtime type checking
const isFolder = (obj: unknown): obj is Folder => {
  return typeof obj === 'object' && 
         obj !== null && 
         'id' in obj && 
         'name' in obj && 
         'signals' in obj;
};

// Usage in components
const FolderComponent: React.FC<{ data: unknown }> = ({ data }) => {
  if (!isFolder(data)) {
    return <div>Invalid folder data</div>;
  }
  
  // TypeScript now knows data is Folder
  return <div>{data.name}</div>;
};
```

### 5. Immutable Updates
```tsx
// ✅ Good: Immutable folder updates
const addSignalToFolder = (folder: Folder, signal: Signal): Folder => ({
  ...folder,
  signals: [...folder.signals, signal],
  updatedAt: new Date().toISOString()
});

// ✅ Good: Type-safe property updates
const updateFolderName = (folder: Folder, name: string): Folder => ({
  ...folder,
  name,
  updatedAt: new Date().toISOString()
});
```