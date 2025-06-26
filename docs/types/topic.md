# Topic Type Definitions

## Purpose

The `Topic` type system defines the core domain objects for managing categorized topics within the application. These types serve as the foundational data structures for topic management, providing strict typing for topic entities with hierarchical labeling through categories and subcategories. This type follows our domain-first architecture pattern, serving as the base domain object from which response and request types can be derived.

## Type Definition

```typescript
export interface Labels {
  category: string;
  subcategory: string;
}

export interface Topic {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  labels: Labels;
}
```

### Type Breakdown

- **`Labels`**: Hierarchical categorization interface providing two-tier classification
- **`Topic`**: Complete domain entity representing a categorized topic with metadata

## Properties

### Labels Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `category` | `string` | ✅ | Primary classification level for the topic |
| `subcategory` | `string` | ✅ | Secondary classification level providing more specific categorization |

### Topic Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique numerical identifier for the topic |
| `createdAt` | `string` | ✅ | ISO timestamp string of topic creation |
| `updatedAt` | `string` | ✅ | ISO timestamp string of last topic modification |
| `name` | `string` | ✅ | Display name/title of the topic |
| `labels` | `Labels` | ✅ | Hierarchical categorization labels |

## Usage Examples

### Basic Topic Creation

```typescript
const newTopic: Topic = {
  id: 1,
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  name: "React Hooks Best Practices",
  labels: {
    category: "Frontend Development",
    subcategory: "React"
  }
};
```

### Component Integration

```tsx
interface TopicCardProps {
  topic: Topic;
  onUpdate?: (topic: Topic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onUpdate }) => {
  return (
    <div className="topic-card">
      <h3>{topic.name}</h3>
      <div className="labels">
        <span className="category">{topic.labels.category}</span>
        <span className="subcategory">{topic.labels.subcategory}</span>
      </div>
      <time>{new Date(topic.createdAt).toLocaleDateString()}</time>
    </div>
  );
};
```

### Service Layer Usage

```typescript
class TopicService {
  async getTopicById(id: number): Promise<Topic> {
    const response = await fetch(`/api/topics/${id}`);
    return response.json() as Topic;
  }

  async getTopicsByCategory(category: string): Promise<Topic[]> {
    const response = await fetch(`/api/topics?category=${category}`);
    return response.json() as Topic[];
  }
}
```

### Filtering and Manipulation

```typescript
// Filter topics by category
const filterTopicsByCategory = (topics: Topic[], category: string): Topic[] => {
  return topics.filter(topic => topic.labels.category === category);
};

// Group topics by subcategory
const groupTopicsBySubcategory = (topics: Topic[]): Record<string, Topic[]> => {
  return topics.reduce((acc, topic) => {
    const subcategory = topic.labels.subcategory;
    acc[subcategory] = acc[subcategory] || [];
    acc[subcategory].push(topic);
    return acc;
  }, {} as Record<string, Topic[]>);
};
```

## Type Architecture Pattern

Following our domain-first architecture, this type serves as the foundation for derived types:

### Domain Object (Base)
```typescript
// Current implementation - serves as the source of truth
interface Topic {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  labels: Labels;
}
```

### Response Types (Derived)
```typescript
// API response wrapper
interface TopicResponse {
  data: Topic;
  message: string;
  status: 'success' | 'error';
}

interface TopicsListResponse {
  data: Topic[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Minimal response for lists
type TopicSummary = Pick<Topic, 'id' | 'name' | 'labels'>;
```

### Request Types (Derived)
```typescript
// Creation request (omit generated fields)
type CreateTopicRequest = Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>;

// Update request (make fields optional except id)
type UpdateTopicRequest = Partial<Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>> & {
  id: number;
};

// Label-only updates
type UpdateTopicLabelsRequest = Pick<Topic, 'id'> & {
  labels: Partial<Labels>;
};
```

## Related Types

### Extensions and Compositions
```typescript
// Extended topic with additional metadata
interface TopicWithStats extends Topic {
  viewCount: number;
  commentCount: number;
  lastViewedAt?: string;
}

// Topic with user context
interface TopicWithUser extends Topic {
  createdBy: {
    id: number;
    name: string;
  };
  isBookmarked: boolean;
}

// Hierarchical topic structure
interface TopicHierarchy {
  category: string;
  subcategories: Array<{
    name: string;
    topics: Topic[];
    count: number;
  }>;
}
```

### Filter and Search Types
```typescript
interface TopicFilters {
  category?: string;
  subcategory?: string;
  createdAfter?: string;
  createdBefore?: string;
  searchTerm?: string;
}

type TopicSortField = keyof Pick<Topic, 'name' | 'createdAt' | 'updatedAt'>;

interface TopicQuery extends TopicFilters {
  sortBy?: TopicSortField;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
```

## Integration Points

### Services
- **TopicService**: CRUD operations and business logic
- **SearchService**: Topic search and filtering
- **CacheService**: Topic data caching strategies

### Components  
- **TopicCard**: Individual topic display
- **TopicList**: Collection rendering with filtering
- **TopicForm**: Creation and editing forms
- **CategorySelector**: Label management interface

### Stores/State Management
- **topicStore**: Global topic state management
- **categoryStore**: Category and subcategory management
- **userTopicsStore**: User-specific topic interactions

### API Endpoints
- `GET /api/topics` - List topics with filtering
- `GET /api/topics/:id` - Single topic retrieval
- `POST /api/topics` - Topic creation
- `PUT /api/topics/:id` - Topic updates
- `DELETE /api/topics/:id` - Topic deletion

## Validation

### Zod Schema Implementation
```typescript
import { z } from 'zod';

const LabelsSchema = z.object({
  category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
  subcategory: z.string().min(1, 'Subcategory is required').max(50, 'Subcategory too long')
});

const TopicSchema = z.object({
  id: z.number().positive('ID must be positive'),
  createdAt: z.string().datetime('Invalid creation date'),
  updatedAt: z.string().datetime('Invalid update date'),
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
  labels: LabelsSchema
});

// Request validation schemas
const CreateTopicSchema = TopicSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

const UpdateTopicSchema = TopicSchema.partial().required({ id: true });

// Validation helpers
export const validateTopic = (data: unknown): Topic => {
  return TopicSchema.parse(data);
};

export const validateCreateTopic = (data: unknown): CreateTopicRequest => {
  return CreateTopicSchema.parse(data);
};
```

### Runtime Validation Usage
```typescript
// API endpoint validation
app.post('/api/topics', async (req, res) => {
  try {
    const validatedData = validateCreateTopic(req.body);
    const topic = await topicService.create(validatedData);
    res.json({ data: topic, status: 'success' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors, status: 'error' });
    }
  }
});
```

## Best Practices

### Adherence to TypeScript Guidelines

1. **Strict Typing Compliance** ✅
   - All properties have explicit types
   - No use of `any` type
   - Timestamp strings are properly typed (consider using branded types for ISO strings)

2. **Interface Usage** ✅
   - Uses `interface` declarations for object shapes
   - Proper interface composition with `Labels` nested in `Topic`

3. **Type Architecture Pattern** ✅
   - Follows domain-first approach
   - Serves as foundation for derived request/response types
   - Enables proper use of utility types (Pick, Omit, Partial)

### Recommended Enhancements

```typescript
// Consider branded types for better type safety
type ISOString = string & { __brand: 'ISOString' };
type PositiveInteger = number & { __brand: 'PositiveInteger' };

// Enhanced interface with branded types
interface Topic {
  id: PositiveInteger;
  createdAt: ISOString;
  updatedAt: ISOString;
  name: string;
  labels: Labels;
}

// Enum consideration for common categories (if categories are fixed)
enum TopicCategory {
  FRONTEND = 'Frontend Development',
  BACKEND = 'Backend Development',
  DEVOPS = 'DevOps',
  DESIGN = 'Design'
}

// If categories are dynamic, maintain string literal approach
```

### Usage Patterns

1. **Always use utility types** for derived types rather than manual reconstruction
2. **Validate at boundaries** using Zod schemas for API inputs/outputs
3. **Compose interfaces** rather than duplicating properties
4. **Use discriminated unions** when Topic might have different variants
5. **Implement proper error handling** with typed error responses

This type definition successfully establishes a clean, extensible foundation for topic management while adhering to our strict typing guidelines and architectural patterns.