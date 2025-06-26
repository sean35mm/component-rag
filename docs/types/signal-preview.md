# SignalPreview Type Documentation

## Purpose

The `SignalPreview` interface represents a streamlined view of signal data optimized for preview contexts within the application. It extends the base `Signal` interface, providing all signal properties while semantically indicating its intended use in preview scenarios such as cards, lists, or summary views.

This type serves as a domain object that maintains strict typing while offering flexibility for future preview-specific enhancements without breaking existing implementations.

## Type Definition

```typescript
import { Signal } from './signal';

export interface SignalPreview extends Signal {}
```

### Structure Analysis

- **Base Interface**: Extends `Signal` interface completely
- **Extension Pattern**: Uses interface extension for type composition
- **Semantic Typing**: Provides meaningful type naming for preview contexts
- **Future-Proof**: Allows for preview-specific properties to be added without breaking changes

## Properties

Since `SignalPreview` extends `Signal`, it inherits all properties from the base `Signal` interface. The exact properties depend on the `Signal` interface definition, but typically include:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| *Inherited from Signal* | *Various* | *Various* | All properties from the base Signal interface |

> **Note**: For complete property documentation, refer to the [Signal type documentation](./signal.md).

## Usage Examples

### Component Props

```typescript
interface SignalPreviewCardProps {
  signal: SignalPreview;
  onSelect?: (signal: SignalPreview) => void;
  compact?: boolean;
}

const SignalPreviewCard: React.FC<SignalPreviewCardProps> = ({ 
  signal, 
  onSelect,
  compact = false 
}) => {
  return (
    <div 
      className={`signal-preview-card ${compact ? 'compact' : ''}`}
      onClick={() => onSelect?.(signal)}
    >
      {/* Render preview content */}
    </div>
  );
};
```

### Service Layer Usage

```typescript
class SignalPreviewService {
  async getSignalPreviews(): Promise<SignalPreview[]> {
    const response = await fetch('/api/signals/preview');
    return response.json();
  }

  async searchSignalPreviews(query: string): Promise<SignalPreview[]> {
    const response = await fetch(`/api/signals/search?q=${query}`);
    return response.json();
  }
}
```

### Hook Implementation

```typescript
function useSignalPreviews() {
  const [previews, setPreviews] = useState<SignalPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPreviews = async () => {
      try {
        const data = await signalPreviewService.getSignalPreviews();
        setPreviews(data);
      } catch (error) {
        console.error('Failed to load signal previews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreviews();
  }, []);

  return { previews, loading };
}
```

### Utility Functions

```typescript
// Type-safe filtering
function filterActiveSignalPreviews(signals: SignalPreview[]): SignalPreview[] {
  return signals.filter(signal => signal.status === 'active');
}

// Type-safe mapping
function mapToPreviewIds(signals: SignalPreview[]): string[] {
  return signals.map(signal => signal.id);
}
```

## Type Architecture Pattern

### Domain Object Layer (Current)

```typescript
// Base domain object
interface Signal {
  id: string;
  name: string;
  // ... other properties
}

// Specialized domain object for preview contexts
interface SignalPreview extends Signal {
  // Future preview-specific properties can be added here
}
```

### Response Type Layer

```typescript
// API response wrapper
interface SignalPreviewResponse {
  data: SignalPreview[];
  pagination?: PaginationInfo;
  metadata?: ResponseMetadata;
}

// Single signal preview response
interface SignalPreviewDetailResponse {
  data: SignalPreview;
  metadata?: ResponseMetadata;
}
```

### Request Type Layer

```typescript
// Request parameters for signal preview queries
interface SignalPreviewRequest {
  limit?: number;
  offset?: number;
  filters?: SignalPreviewFilters;
  sortBy?: keyof SignalPreview;
  sortOrder?: 'asc' | 'desc';
}

interface SignalPreviewFilters {
  status?: Signal['status'];
  category?: string[];
  dateRange?: DateRange;
}
```

## Related Types

### Direct Dependencies

- **Signal**: Base interface that `SignalPreview` extends
- **SignalStatus**: Enumeration for signal status values
- **SignalCategory**: Type definition for signal categorization

### Composition Types

```typescript
// Collection types
type SignalPreviewCollection = SignalPreview[];
type SignalPreviewMap = Record<string, SignalPreview>;

// Utility types for partial operations
type SignalPreviewUpdate = Partial<Pick<SignalPreview, 'name' | 'description'>>;
type SignalPreviewKey = keyof SignalPreview;
```

### Response Wrapper Types

```typescript
interface SignalPreviewListResponse {
  signals: SignalPreview[];
  total: number;
  hasMore: boolean;
}
```

## Integration Points

### Components

- **SignalPreviewCard**: Individual preview display component
- **SignalPreviewList**: Collection display component  
- **SignalPreviewGrid**: Grid layout component
- **SignalSearchResults**: Search result display using previews

### Services

- **SignalPreviewService**: API interaction layer
- **SignalCacheService**: Caching preview data
- **SignalSearchService**: Search functionality

### Hooks

- **useSignalPreviews**: Data fetching and state management
- **useSignalSearch**: Search-specific preview handling
- **useSignalPreviewSelection**: Selection state management

### Stores/Context

```typescript
interface SignalPreviewContext {
  previews: SignalPreview[];
  selectedPreviews: SignalPreview[];
  loading: boolean;
  error: string | null;
}
```

## Validation

### Runtime Validation with Zod

```typescript
import { z } from 'zod';
import { SignalSchema } from './signal';

// SignalPreview uses the same schema as Signal since it extends it
export const SignalPreviewSchema = SignalSchema;

// Validation function
export function validateSignalPreview(data: unknown): SignalPreview {
  return SignalPreviewSchema.parse(data);
}

// Array validation
export const SignalPreviewArraySchema = z.array(SignalPreviewSchema);

export function validateSignalPreviewArray(data: unknown): SignalPreview[] {
  return SignalPreviewArraySchema.parse(data);
}
```

### Type Guards

```typescript
function isSignalPreview(value: unknown): value is SignalPreview {
  try {
    SignalPreviewSchema.parse(value);
    return true;
  } catch {
    return false;
  }
}

function isSignalPreviewArray(value: unknown): value is SignalPreview[] {
  return Array.isArray(value) && value.every(isSignalPreview);
}
```

## Best Practices

### Strict Typing Adherence

✅ **DO**: Use the interface for all preview-related operations
```typescript
function processSignalPreview(signal: SignalPreview): ProcessedPreview {
  // Type-safe operations
}
```

❌ **DON'T**: Use `any` or loose typing
```typescript
function processSignalPreview(signal: any): any {
  // Avoid this pattern
}
```

### Interface Extension Pattern

✅ **DO**: Leverage the extension relationship
```typescript
function isSignalCompatible(preview: SignalPreview): preview is Signal {
  return true; // SignalPreview extends Signal
}
```

### Future-Proof Design

✅ **DO**: Design for extensibility
```typescript
// If preview-specific properties are needed later:
interface SignalPreview extends Signal {
  previewImageUrl?: string;
  shortDescription?: string;
  previewMetadata?: PreviewMetadata;
}
```

### Type Composition

✅ **DO**: Use utility types for operations
```typescript
type SignalPreviewUpdate = Partial<Pick<SignalPreview, 'name' | 'status'>>;
type SignalPreviewKeys = keyof SignalPreview;
```

### Validation Integration

✅ **DO**: Always validate external data
```typescript
async function fetchSignalPreviews(): Promise<SignalPreview[]> {
  const response = await api.get('/signals/preview');
  return validateSignalPreviewArray(response.data);
}
```

This type architecture maintains strict typing while providing semantic clarity for preview contexts, following our established patterns for scalable and maintainable TypeScript code.