# KeyPoint Type Documentation

## Purpose

The `KeyPoint` interface represents a structured data model for capturing important points or insights along with their supporting references. This type serves as a foundational domain object for organizing information in a way that connects key insights to their source materials, commonly used in research, documentation, and knowledge management contexts.

## Type Definition

```typescript
export interface KeyPoint {
  point: string;
  references: string[];
}
```

This interface follows our strict typing guidelines by:
- Using `interface` for object shape definition
- Employing explicit string types for clarity
- Avoiding `any` types completely
- Maintaining a clean, focused structure

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `point` | `string` | ✅ | The main insight, conclusion, or key information being captured |
| `references` | `string[]` | ✅ | Array of reference identifiers, URLs, or citation strings that support this point |

## Usage Examples

### Basic Usage

```typescript
import { KeyPoint } from '@/lib/types/key-point';

// Creating a simple key point
const basicKeyPoint: KeyPoint = {
  point: "TypeScript improves code maintainability through static typing",
  references: [
    "https://www.typescriptlang.org/docs/",
    "microsoft-typescript-handbook-2023"
  ]
};
```

### In Component Props

```typescript
interface KeyPointCardProps {
  keyPoint: KeyPoint;
  onEdit?: (point: KeyPoint) => void;
  className?: string;
}

const KeyPointCard: React.FC<KeyPointCardProps> = ({ keyPoint, onEdit, className }) => {
  return (
    <div className={className}>
      <h3>{keyPoint.point}</h3>
      <ul>
        {keyPoint.references.map((ref, index) => (
          <li key={index}>{ref}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Array Operations

```typescript
// Working with collections of key points
const keyPoints: KeyPoint[] = [
  {
    point: "React hooks simplify state management",
    references: ["react-docs-hooks", "dan-abramov-hooks-intro"]
  },
  {
    point: "Code splitting improves initial load times",
    references: ["web-dev-code-splitting", "webpack-docs"]
  }
];

// Filtering by reference count
const wellDocumentedPoints = keyPoints.filter(kp => kp.references.length >= 2);
```

### Service Integration

```typescript
class KeyPointService {
  async createKeyPoint(data: Omit<KeyPoint, 'id'>): Promise<KeyPoint> {
    // Implementation would add ID and persist
    return {
      ...data,
      // Additional properties added by service layer
    };
  }

  async findPointsByReference(reference: string): Promise<KeyPoint[]> {
    // Find all key points that cite a specific reference
    return keyPoints.filter(kp => 
      kp.references.includes(reference)
    );
  }
}
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### Domain Object (Current)
```typescript
export interface KeyPoint {
  point: string;
  references: string[];
}
```

### Response Types
```typescript
// API response wrapper
export interface KeyPointResponse {
  data: KeyPoint;
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

// Collection response
export interface KeyPointsListResponse {
  keyPoints: KeyPoint[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

### Request Types
```typescript
// Creation request
export interface CreateKeyPointRequest {
  point: string;
  references: string[];
  tags?: string[];
}

// Update request using utility types
export interface UpdateKeyPointRequest extends Partial<Pick<KeyPoint, 'point' | 'references'>> {
  id: string;
}

// Search request
export interface KeyPointSearchRequest {
  query?: string;
  references?: string[];
  limit?: number;
  offset?: number;
}
```

## Related Types

### Extended Types
```typescript
// Enhanced version with metadata
export interface EnhancedKeyPoint extends KeyPoint {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  author: string;
}

// Summary version using utility types
export interface KeyPointSummary extends Pick<KeyPoint, 'point'> {
  referenceCount: number;
  id: string;
}
```

### Composition Types
```typescript
// For research documents
export interface ResearchSection {
  title: string;
  keyPoints: KeyPoint[];
  summary: string;
}

// For citation management
export interface Citation {
  id: string;
  title: string;
  url?: string;
  relatedKeyPoints: KeyPoint[];
}
```

## Integration Points

### Components
- `KeyPointCard` - Display individual key points
- `KeyPointList` - Render collections of key points
- `KeyPointEditor` - Form for creating/editing key points
- `ReferenceViewer` - Show references with linked key points

### Services
- `KeyPointService` - CRUD operations for key points
- `ReferenceService` - Manage reference validation and metadata
- `SearchService` - Full-text search across key points

### Hooks
```typescript
// Custom hook for key point management
function useKeyPoints() {
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
  
  const addKeyPoint = useCallback((newPoint: Omit<KeyPoint, 'id'>) => {
    // Implementation
  }, []);
  
  return { keyPoints, addKeyPoint };
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const KeyPointSchema = z.object({
  point: z.string()
    .min(1, "Point cannot be empty")
    .max(500, "Point must be under 500 characters"),
  references: z.array(z.string().url().or(z.string().min(1)))
    .min(1, "At least one reference is required")
    .max(10, "Maximum 10 references allowed")
});

// Type inference from schema
export type ValidatedKeyPoint = z.infer<typeof KeyPointSchema>;

// Validation function
export function validateKeyPoint(data: unknown): KeyPoint {
  return KeyPointSchema.parse(data);
}
```

### Runtime Validation
```typescript
function isValidKeyPoint(obj: unknown): obj is KeyPoint {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'point' in obj &&
    'references' in obj &&
    typeof (obj as any).point === 'string' &&
    Array.isArray((obj as any).references) &&
    (obj as any).references.every((ref: unknown) => typeof ref === 'string')
  );
}
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good - Explicit typing
const processKeyPoints = (points: KeyPoint[]): string[] => {
  return points.map(kp => kp.point);
};

// ❌ Avoid - Using any
const processKeyPoints = (points: any[]): any[] => {
  return points.map(kp => kp.point);
};
```

### 2. Interface Extension
```typescript
// ✅ Good - Extending base interface
interface EditableKeyPoint extends KeyPoint {
  isEditing: boolean;
  originalPoint?: string;
}

// ❌ Avoid - Type aliases for object shapes
type EditableKeyPoint = KeyPoint & {
  isEditing: boolean;
};
```

### 3. Utility Type Usage
```typescript
// ✅ Good - Using utility types for variations
type KeyPointDraft = Omit<KeyPoint, 'references'> & {
  references?: string[];
};

type KeyPointUpdate = Partial<KeyPoint> & {
  id: string;
};
```

### 4. Immutable Operations
```typescript
// ✅ Good - Immutable updates
const updateKeyPointReferences = (
  keyPoint: KeyPoint, 
  newReference: string
): KeyPoint => ({
  ...keyPoint,
  references: [...keyPoint.references, newReference]
});

// ❌ Avoid - Mutating original
const updateKeyPointReferences = (keyPoint: KeyPoint, newReference: string) => {
  keyPoint.references.push(newReference);
  return keyPoint;
};
```

This `KeyPoint` interface serves as a solid foundation for building more complex types while maintaining our strict typing standards and architectural patterns.