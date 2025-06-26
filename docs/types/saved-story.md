# SavedStory Type Documentation

## Purpose

The `SavedStory` interface represents a user's saved story entity within the application. This is a core domain object that captures the essential metadata for stories that users have bookmarked or saved for later reading. It serves as the foundation for story management features including favorites, reading lists, and story organization.

## Type Definition

```typescript
export interface SavedStory {
  // id: number; // Currently commented - likely transitioning away from numeric IDs
  createdAt: string;
  updatedAt: string;
  clusterId: string;
  name: string;
  slug: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `createdAt` | `string` | ✅ | ISO 8601 timestamp indicating when the story was saved |
| `updatedAt` | `string` | ✅ | ISO 8601 timestamp of the last modification |
| `clusterId` | `string` | ✅ | Unique identifier linking to the story cluster/collection |
| `name` | `string` | ✅ | Human-readable title/name of the saved story |
| `slug` | `string` | ✅ | URL-friendly identifier for routing and sharing |

## Usage Examples

### Basic Implementation

```typescript
import { SavedStory } from '@/lib/types/saved-story';

// Creating a saved story object
const savedStory: SavedStory = {
  createdAt: '2023-12-07T10:30:00Z',
  updatedAt: '2023-12-07T10:30:00Z',
  clusterId: 'cluster-abc123',
  name: 'The Future of AI Development',
  slug: 'future-ai-development'
};

// Component usage
interface SavedStoryCardProps {
  story: SavedStory;
  onRemove: (clusterId: string) => void;
}

const SavedStoryCard: React.FC<SavedStoryCardProps> = ({ story, onRemove }) => {
  return (
    <div className="story-card">
      <h3>{story.name}</h3>
      <p>Saved: {new Date(story.createdAt).toLocaleDateString()}</p>
      <button onClick={() => onRemove(story.clusterId)}>
        Remove
      </button>
    </div>
  );
};
```

### Service Layer Usage

```typescript
// API service functions
class SavedStoryService {
  async getSavedStories(): Promise<SavedStory[]> {
    const response = await fetch('/api/saved-stories');
    return response.json();
  }

  async saveStory(clusterId: string, name: string): Promise<SavedStory> {
    const slug = this.generateSlug(name);
    const now = new Date().toISOString();
    
    const newStory: SavedStory = {
      createdAt: now,
      updatedAt: now,
      clusterId,
      name,
      slug
    };

    return this.createStory(newStory);
  }

  private generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
}
```

## Type Architecture Pattern

Following our domain-first approach, `SavedStory` serves as the foundation domain object:

```typescript
// 1. Domain Object (base)
interface SavedStory {
  createdAt: string;
  updatedAt: string;
  clusterId: string;
  name: string;
  slug: string;
}

// 2. Response Types (derived)
interface SavedStoriesResponse {
  stories: SavedStory[];
  totalCount: number;
  hasMore: boolean;
}

interface SavedStoryResponse {
  story: SavedStory;
  relatedStories?: Pick<SavedStory, 'clusterId' | 'name' | 'slug'>[];
}

// 3. Request Types (derived)
interface CreateSavedStoryRequest {
  clusterId: string;
  name: string;
}

interface UpdateSavedStoryRequest extends Partial<Pick<SavedStory, 'name'>> {
  clusterId: string;
}

// 4. Utility Types
type SavedStoryIdentifiers = Pick<SavedStory, 'clusterId' | 'slug'>;
type SavedStoryMetadata = Pick<SavedStory, 'createdAt' | 'updatedAt'>;
type SavedStoryDisplay = Omit<SavedStory, 'createdAt' | 'updatedAt'>;
```

## Related Types

```typescript
// Extended types that might relate to SavedStory
interface SavedStoryWithContent extends SavedStory {
  content?: string;
  excerpt?: string;
  readingTime?: number;
}

interface SavedStoryCollection {
  id: string;
  name: string;
  stories: SavedStory[];
  createdAt: string;
}

// Story cluster relationship
interface StoryCluster {
  id: string;
  title: string;
  savedStories: SavedStory[];
  totalStories: number;
}
```

## Integration Points

### Components
- `SavedStoriesList` - Renders collections of saved stories
- `SavedStoryCard` - Individual story display component
- `SaveStoryButton` - Action component for saving stories
- `SavedStorySearch` - Search and filter interface

### Services
- `SavedStoryService` - CRUD operations for saved stories
- `StoryClusterService` - Management of story clusters
- `UserPreferencesService` - User-specific story organization

### State Management
```typescript
// Redux/Zustand store slice
interface SavedStoriesState {
  stories: SavedStory[];
  loading: boolean;
  error: string | null;
  selectedStory: SavedStory | null;
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const SavedStorySchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  clusterId: z.string().min(1, 'Cluster ID is required'),
  name: z.string().min(1, 'Story name is required').max(200, 'Name too long'),
  slug: z.string().min(1, 'Slug is required').regex(
    /^[a-z0-9-]+$/,
    'Slug must contain only lowercase letters, numbers, and hyphens'
  )
});

// Validation helpers
export const validateSavedStory = (data: unknown): SavedStory => {
  return SavedStorySchema.parse(data);
};

export const isSavedStory = (data: unknown): data is SavedStory => {
  return SavedStorySchema.safeParse(data).success;
};
```

### Runtime Validation

```typescript
// Type guards for runtime safety
export const isValidSavedStory = (obj: any): obj is SavedStory => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string' &&
    typeof obj.clusterId === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.slug === 'string'
  );
};
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good: Strict typing with proper interfaces
interface SavedStoryProps {
  story: SavedStory;
  onUpdate: (story: SavedStory) => void;
}

// ❌ Avoid: Using any
interface BadProps {
  story: any;
  onUpdate: (data: any) => void;
}
```

### 2. Utility Type Usage
```typescript
// ✅ Good: Leverage utility types for focused interfaces
interface SavedStoryUpdateForm extends Pick<SavedStory, 'name'> {
  clusterId: string;
}

interface SavedStoryDisplay extends Omit<SavedStory, 'createdAt' | 'updatedAt'> {
  displayDate: string;
}
```

### 3. Interface Extension
```typescript
// ✅ Good: Extend base interface for specialized use cases
interface SavedStoryWithActions extends SavedStory {
  canEdit: boolean;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
```

### 4. Type-Safe API Calls
```typescript
// ✅ Good: Type-safe service methods
class SavedStoryService {
  async updateStory(
    clusterId: string, 
    updates: Partial<Pick<SavedStory, 'name'>>
  ): Promise<SavedStory> {
    // Implementation with proper typing
  }
}
```

### 5. Consistent Naming Patterns
- Use `SavedStory` as the base interface name
- Suffix response types with `Response`
- Suffix request types with `Request`
- Use descriptive property names that align with domain terminology

This type serves as a foundational building block in our story management system, providing type safety and clear contracts for all saved story operations throughout the application.