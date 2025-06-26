# Curated Entity Type Documentation

## Purpose

The `curated-entity` module defines types and utilities for handling curated content cards displayed throughout the application. This system transforms backend data into type-safe frontend representations for different content types including stories, deep searches, signals, and answers. The module follows a strict type transformation pattern to ensure data integrity when mapping from backend response formats to frontend domain objects.

## Type Architecture Pattern

This module exemplifies our type architecture pattern:

```
Backend Response Types → Domain Objects → Frontend Usage
BackendCuratedEntity → CuratedEntity → Component Props
BackendCard → CuratedEntityCard → UI Rendering
```

## Type Definitions

### Core Domain Objects

#### `CuratedEntity`

The primary domain object representing a curated content entity in the frontend.

```typescript
export interface CuratedEntity {
  id: number;
  position: number;
  visible: boolean;
  card: CuratedEntityCard;
}
```

#### `CuratedEntityCard`

A discriminated union type representing different types of curated content cards.

```typescript
type CuratedEntityCard =
  | CuratedStory
  | CuratedDeepSearch
  | CuratedSignal
  | CuratedAnswer;
```

### Card Type Interfaces

#### `CuratedStory`

```typescript
interface CuratedStory {
  type: TabEntity.STORY;
  title: string;
  slug: string;
}
```

#### `CuratedDeepSearch`

```typescript
interface CuratedDeepSearch {
  type: TabEntity.SEARCH;
  title: string;
  imageUrl?: string;
  query: ComplexAllEndpointQuery;
}
```

#### `CuratedSignal`

```typescript
interface CuratedSignal {
  type: TabEntity.SIGNAL;
  title: string;
  imageUrl?: string;
  query: Pick<ComplexAllEndpointBody, 'query' | 'showReprints'>;
}
```

#### `CuratedAnswer`

```typescript
interface CuratedAnswer {
  type: TabEntity.ANSWER;
  prompt: string;
  imageUrl?: string;
}
```

### Backend Response Types

#### `BackendCuratedEntity`

```typescript
export interface BackendCuratedEntity {
  id: number;
  position: number;
  visible: boolean;
  card: BackendCard;
}
```

#### `BackendCard`

```typescript
interface BackendCard {
  '@type': string;
  title?: string;
  slug?: string;
  query?: 
    | Pick<ComplexAllEndpointBody, 'query' | 'showReprints'>
    | Record<'query', ComplexAllEndpointQuery>;
  imageUrl?: string;
  prompt?: string;
}
```

## Properties Reference

### CuratedEntity Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the curated entity |
| `position` | `number` | ✅ | Display order position |
| `visible` | `boolean` | ✅ | Whether the entity should be displayed |
| `card` | `CuratedEntityCard` | ✅ | The content card data |

### Card Type Properties

#### CuratedStory
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `TabEntity.STORY` | ✅ | Discriminator for story cards |
| `title` | `string` | ✅ | Story title |
| `slug` | `string` | ✅ | URL slug for navigation |

#### CuratedDeepSearch
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `TabEntity.SEARCH` | ✅ | Discriminator for search cards |
| `title` | `string` | ✅ | Search title |
| `imageUrl` | `string` | ❌ | Optional thumbnail image |
| `query` | `ComplexAllEndpointQuery` | ✅ | Search query parameters |

#### CuratedSignal
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `TabEntity.SIGNAL` | ✅ | Discriminator for signal cards |
| `title` | `string` | ✅ | Signal title |
| `imageUrl` | `string` | ❌ | Optional thumbnail image |
| `query` | `Pick<ComplexAllEndpointBody, 'query' \| 'showReprints'>` | ✅ | Signal query parameters |

#### CuratedAnswer
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `TabEntity.ANSWER` | ✅ | Discriminator for answer cards |
| `prompt` | `string` | ✅ | Answer prompt text |
| `imageUrl` | `string` | ❌ | Optional thumbnail image |

## Usage Examples

### Basic Usage in Components

```typescript
import { CuratedEntity, curatedEntityMapper } from '@/lib/types/curated-entity';
import { TabEntity } from '@/lib/types/tabs';

// Component rendering curated entities
interface CuratedFeedProps {
  entities: CuratedEntity[];
}

function CuratedFeed({ entities }: CuratedFeedProps) {
  return (
    <div className="curated-feed">
      {entities.map((entity) => (
        <CuratedCard key={entity.id} entity={entity} />
      ))}
    </div>
  );
}

// Card component with type discrimination
interface CuratedCardProps {
  entity: CuratedEntity;
}

function CuratedCard({ entity }: CuratedCardProps) {
  const { card } = entity;

  switch (card.type) {
    case TabEntity.STORY:
      return (
        <StoryCard 
          title={card.title} 
          slug={card.slug} 
        />
      );
    
    case TabEntity.SEARCH:
      return (
        <SearchCard 
          title={card.title}
          imageUrl={card.imageUrl}
          query={card.query}
        />
      );
    
    case TabEntity.SIGNAL:
      return (
        <SignalCard 
          title={card.title}
          imageUrl={card.imageUrl}
          query={card.query}
        />
      );
    
    case TabEntity.ANSWER:
      return (
        <AnswerCard 
          prompt={card.prompt}
          imageUrl={card.imageUrl}
        />
      );
    
    default:
      // TypeScript ensures exhaustive checking
      const _exhaustive: never = card;
      return null;
  }
}
```

### Data Transformation

```typescript
import { BackendCuratedEntity, curatedEntityMapper } from '@/lib/types/curated-entity';

// Service layer usage
async function fetchCuratedEntities(): Promise<CuratedEntity[]> {
  const response = await fetch('/api/curated-entities');
  const backendData: BackendCuratedEntity[] = await response.json();
  
  // Transform and filter out invalid entities
  const entities = backendData
    .map(curatedEntityMapper)
    .filter((entity): entity is CuratedEntity => entity !== null);
  
  return entities;
}

// Type-safe entity creation
function createStoryEntity(
  id: number, 
  position: number, 
  title: string, 
  slug: string
): CuratedEntity {
  return {
    id,
    position,
    visible: true,
    card: {
      type: TabEntity.STORY,
      title,
      slug,
    },
  };
}
```

### Advanced Type Guards

```typescript
import { CuratedEntityCard } from '@/lib/types/curated-entity';
import { TabEntity } from '@/lib/types/tabs';

// Type guard functions
function isStoryCard(card: CuratedEntityCard): card is CuratedStory {
  return card.type === TabEntity.STORY;
}

function isSearchCard(card: CuratedEntityCard): card is CuratedDeepSearch {
  return card.type === TabEntity.SEARCH;
}

function hasImage(
  card: CuratedEntityCard
): card is CuratedDeepSearch | CuratedSignal | CuratedAnswer {
  return 'imageUrl' in card;
}

// Usage with type narrowing
function getCardImageUrl(card: CuratedEntityCard): string | undefined {
  if (hasImage(card)) {
    return card.imageUrl; // TypeScript knows imageUrl exists
  }
  return undefined;
}
```

## Exported Functions

### `createCards`

**Signature:**
```typescript
function createCards(data: BackendCard, type: string): CuratedEntityCard | null
```

**Description:** Internal utility function that transforms backend card data into typed frontend card objects based on the card type.

**Parameters:**
- `data`: Backend card data with optional properties
- `type`: String identifier for the card type

**Returns:** Typed `CuratedEntityCard` or `null` if transformation fails

### `curatedEntityMapper`

**Signature:**
```typescript
export function curatedEntityMapper(entity: BackendCuratedEntity): CuratedEntity | null
```

**Description:** Main transformation function that converts backend curated entities into frontend domain objects.

**Parameters:**
- `entity`: Backend curated entity data

**Returns:** Typed `CuratedEntity` or `null` if mapping fails

**Example:**
```typescript
const backendEntity: BackendCuratedEntity = {
  id: 1,
  position: 0,
  visible: true,
  card: {
    '@type': 'STORY',
    title: 'Breaking News',
    slug: 'breaking-news-story'
  }
};

const frontendEntity = curatedEntityMapper(backendEntity);
// Result: CuratedEntity with properly typed card
```

## Related Types

### Direct Dependencies
- `TabEntity` - Enum providing type discriminators
- `ComplexAllEndpointQuery` - Query parameters for search functionality
- `ComplexAllEndpointBody` - Request body structure for complex endpoints

### Usage Dependencies
- Component prop interfaces that accept `CuratedEntity[]`
- Service response types that return collections of curated entities
- State management types for curated content

## Integration Points

### Services
```typescript
// API service integration
interface CuratedEntityService {
  fetchEntities(): Promise<CuratedEntity[]>;
  updateEntityVisibility(id: number, visible: boolean): Promise<void>;
  reorderEntities(entities: CuratedEntity[]): Promise<void>;
}
```

### State Management
```typescript
// Redux/Zustand store integration
interface CuratedEntityState {
  entities: CuratedEntity[];
  loading: boolean;
  error: string | null;
}

// Actions
interface CuratedEntityActions {
  loadEntities: () => Promise<void>;
  toggleVisibility: (id: number) => void;
  reorderEntities: (newOrder: CuratedEntity[]) => void;
}
```

### Component Integration
```typescript
// Hook for curated entities
function useCuratedEntities() {
  const [entities, setEntities] = useState<CuratedEntity[]>([]);
  
  useEffect(() => {
    fetchCuratedEntities().then(setEntities);
  }, []);
  
  return { entities };
}
```

## Best Practices

### Type Safety
- ✅ **Use discriminated unions**: The `CuratedEntityCard` type uses proper discriminated unions for type safety
- ✅ **Leverage utility types**: Uses `Pick<>` to compose query types from existing interfaces
- ✅ **Strict null handling**: Functions return `null` explicitly rather than `undefined`

### Error Handling
- ✅ **Graceful degradation**: Invalid entities are filtered out rather than causing failures
- ✅ **Monitoring integration**: Unknown card types are reported to Sentry with proper context

### Architecture Adherence
- ✅ **Domain-first design**: Frontend types are optimized for UI usage, not backend structure
- ✅ **Transformation layer**: Clear separation between backend and frontend representations
- ✅ **Type composition**: Builds complex types from simpler, reusable components

### Performance Considerations
```typescript
// Memoize expensive transformations
const memoizedMapper = useMemo(() => 
  entities.map(curatedEntityMapper).filter(Boolean),
  [entities]
);

// Type-safe filtering with proper type guards
const visibleEntities = entities.filter(
  (entity): entity is CuratedEntity => entity.visible
);
```

## Validation Patterns

While no Zod schemas are present in this module, recommended validation patterns:

```typescript
import { z } from 'zod';

// Zod schema for runtime validation
const CuratedEntitySchema = z.object({
  id: z.number().positive(),
  position: z.number().min(0),
  visible: z.boolean(),
  card: z.discriminatedUnion('type', [
    z.object({
      type: z.literal(TabEntity.STORY),
      title: z.string().min(1),
      slug: z.string().min(1),
    }),
    z.object({
      type: z.literal(TabEntity.SEARCH),
      title: z.string().min(1),
      imageUrl: z.string().url().optional(),
      query: ComplexAllEndpointQuerySchema,
    }),
    // ... other card types
  ]),
});

// Type inference from schema
type ValidatedCuratedEntity = z.infer<typeof CuratedEntitySchema>;
```

This type system provides a robust foundation for handling curated content with full type safety, proper error handling, and clear separation of concerns between backend data structures and frontend domain objects.