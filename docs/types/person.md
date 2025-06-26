# Person Type Documentation

## Purpose

The `Person` interface represents a comprehensive domain object for individual people with structured biographical and professional information sourced from Wikidata. This type serves as the core data model for person entities in the application, providing rich metadata including biographical details, career positions, political affiliations, and media assets.

## Type Definition

```typescript
import { ImageHolder } from './image-holder';

interface WikidataLabelHolder {
  wikidataId: string;
  label: string;
}

interface WikidataDateHolder {
  time: string;
  precision: string;
}

interface WikidataPositionHolder {
  wikidataId: string;
  label: string;
  startTime: WikidataDateHolder;
  endTime: WikidataDateHolder;
  employer: WikidataLabelHolder;
}

interface WikidataPoliticalPartyHolder {
  wikidataId: string;
  label: string;
  startTime: WikidataDateHolder;
  endTime: WikidataDateHolder;
}

export interface Person {
  wikidataId: string;
  name: string;
  gender: WikidataLabelHolder;
  dateOfBirth: WikidataDateHolder;
  dateOfDeath: WikidataDateHolder;
  description: string;
  aliases: string[];
  occupation: WikidataLabelHolder[];
  position: WikidataPositionHolder[];
  politicalParty: WikidataPoliticalPartyHolder[];
  image: ImageHolder | null;
  abstractText: string;
  abstract: string;
}
```

## Properties

### Person Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `wikidataId` | `string` | ✅ | Unique Wikidata identifier for the person |
| `name` | `string` | ✅ | Primary display name of the person |
| `gender` | `WikidataLabelHolder` | ✅ | Gender information with Wikidata ID and label |
| `dateOfBirth` | `WikidataDateHolder` | ✅ | Birth date with time and precision metadata |
| `dateOfDeath` | `WikidataDateHolder` | ✅ | Death date with time and precision metadata |
| `description` | `string` | ✅ | Brief description or summary of the person |
| `aliases` | `string[]` | ✅ | Alternative names or aliases |
| `occupation` | `WikidataLabelHolder[]` | ✅ | List of occupations with Wikidata references |
| `position` | `WikidataPositionHolder[]` | ✅ | Professional positions held with timeline |
| `politicalParty` | `WikidataPoliticalPartyHolder[]` | ✅ | Political party affiliations with timeline |
| `image` | `ImageHolder \| null` | ✅ | Profile image or null if unavailable |
| `abstractText` | `string` | ✅ | Plain text abstract/biography |
| `abstract` | `string` | ✅ | Formatted abstract/biography (possibly HTML) |

### Supporting Interfaces

#### WikidataLabelHolder
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `wikidataId` | `string` | ✅ | Wikidata entity identifier |
| `label` | `string` | ✅ | Human-readable label for the entity |

#### WikidataDateHolder
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `time` | `string` | ✅ | Date/time string (ISO format expected) |
| `precision` | `string` | ✅ | Precision level (year, month, day, etc.) |

#### WikidataPositionHolder
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `wikidataId` | `string` | ✅ | Wikidata ID for the position |
| `label` | `string` | ✅ | Position title or name |
| `startTime` | `WikidataDateHolder` | ✅ | When the position started |
| `endTime` | `WikidataDateHolder` | ✅ | When the position ended |
| `employer` | `WikidataLabelHolder` | ✅ | Employing organization |

#### WikidataPoliticalPartyHolder
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `wikidataId` | `string` | ✅ | Wikidata ID for the political party |
| `label` | `string` | ✅ | Political party name |
| `startTime` | `WikidataDateHolder` | ✅ | When membership started |
| `endTime` | `WikidataDateHolder` | ✅ | When membership ended |

## Usage Examples

### Basic Person Display Component

```typescript
import { Person } from '@/lib/types/person';

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const formatDate = (date: WikidataDateHolder): string => {
    // Handle date formatting based on precision
    return new Date(date.time).toLocaleDateString();
  };

  return (
    <div className="person-card">
      <h2>{person.name}</h2>
      {person.image && (
        <img 
          src={person.image.url} 
          alt={person.name}
          width={person.image.width}
          height={person.image.height}
        />
      )}
      <p>{person.description}</p>
      <div>
        <strong>Born:</strong> {formatDate(person.dateOfBirth)}
      </div>
      <div>
        <strong>Occupations:</strong> 
        {person.occupation.map(occ => occ.label).join(', ')}
      </div>
    </div>
  );
}
```

### Working with Political Affiliations

```typescript
import { Person, WikidataPoliticalPartyHolder } from '@/lib/types/person';

function getCurrentPoliticalParty(person: Person): WikidataPoliticalPartyHolder | null {
  const current = person.politicalParty.find(party => {
    const endTime = new Date(party.endTime.time);
    return endTime > new Date(); // Still active
  });
  
  return current || null;
}

function getPoliticalHistory(person: Person): WikidataPoliticalPartyHolder[] {
  return person.politicalParty
    .slice()
    .sort((a, b) => 
      new Date(a.startTime.time).getTime() - new Date(b.startTime.time).getTime()
    );
}
```

### Person Search and Filtering

```typescript
import { Person } from '@/lib/types/person';

interface PersonFilters {
  occupation?: string;
  gender?: string;
  hasImage?: boolean;
}

function filterPersons(persons: Person[], filters: PersonFilters): Person[] {
  return persons.filter(person => {
    if (filters.occupation) {
      const hasOccupation = person.occupation.some(
        occ => occ.label.toLowerCase().includes(filters.occupation!.toLowerCase())
      );
      if (!hasOccupation) return false;
    }

    if (filters.gender) {
      if (person.gender.label !== filters.gender) return false;
    }

    if (filters.hasImage !== undefined) {
      const hasImage = person.image !== null;
      if (hasImage !== filters.hasImage) return false;
    }

    return true;
  });
}
```

## Type Architecture Pattern

This type follows our domain-first architecture pattern:

### 1. Domain Object (Current)
```typescript
// Core domain representation
export interface Person { /* ... */ }
```

### 2. Response Types (Derived)
```typescript
// API response wrapper
export interface PersonResponse {
  person: Person;
  metadata: {
    lastUpdated: string;
    source: 'wikidata';
  };
}

// List response
export interface PersonListResponse {
  persons: Person[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

### 3. Request Types (Projected)
```typescript
// Search/filter parameters
export interface PersonSearchRequest {
  query?: string;
  occupation?: string[];
  gender?: string;
  birthYear?: {
    min?: number;
    max?: number;
  };
  hasImage?: boolean;
  limit?: number;
  offset?: number;
}

// Partial update request
export interface PersonUpdateRequest {
  wikidataId: string;
  updates: Partial<Pick<Person, 'description' | 'aliases'>>;
}
```

## Related Types

### Dependencies
- `ImageHolder` - For profile images and media assets
- Potential relations to `Organization`, `Event`, or `Location` types

### Utility Types
```typescript
// For forms or partial updates
export type PersonSummary = Pick<Person, 'wikidataId' | 'name' | 'description' | 'image'>;

// For timeline components
export type PersonTimeline = Pick<Person, 'position' | 'politicalParty' | 'dateOfBirth' | 'dateOfDeath'>;

// For search results
export type PersonSearchResult = Pick<Person, 'wikidataId' | 'name' | 'description' | 'occupation' | 'image'>;
```

## Integration Points

### Services
```typescript
// Person service interface
interface PersonService {
  getById(wikidataId: string): Promise<Person>;
  search(params: PersonSearchRequest): Promise<PersonListResponse>;
  getTimeline(wikidataId: string): Promise<PersonTimeline>;
}
```

### Components
- `PersonCard` - Display person summary
- `PersonProfile` - Full person details
- `PersonTimeline` - Career and life events
- `PersonSearch` - Search and filter interface

### State Management
```typescript
// Redux/Zustand store slice
interface PersonState {
  persons: Record<string, Person>;
  searchResults: PersonSearchResult[];
  loading: boolean;
  selectedPerson: Person | null;
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

const WikidataLabelHolderSchema = z.object({
  wikidataId: z.string().min(1),
  label: z.string().min(1),
});

const WikidataDateHolderSchema = z.object({
  time: z.string().datetime(),
  precision: z.enum(['year', 'month', 'day', 'hour', 'minute', 'second']),
});

const WikidataPositionHolderSchema = z.object({
  wikidataId: z.string().min(1),
  label: z.string().min(1),
  startTime: WikidataDateHolderSchema,
  endTime: WikidataDateHolderSchema,
  employer: WikidataLabelHolderSchema,
});

const WikidataPoliticalPartyHolderSchema = z.object({
  wikidataId: z.string().min(1),
  label: z.string().min(1),
  startTime: WikidataDateHolderSchema,
  endTime: WikidataDateHolderSchema,
});

export const PersonSchema = z.object({
  wikidataId: z.string().regex(/^Q\d+$/, 'Must be valid Wikidata ID'),
  name: z.string().min(1),
  gender: WikidataLabelHolderSchema,
  dateOfBirth: WikidataDateHolderSchema,
  dateOfDeath: WikidataDateHolderSchema,
  description: z.string(),
  aliases: z.array(z.string()),
  occupation: z.array(WikidataLabelHolderSchema),
  position: z.array(WikidataPositionHolderSchema),
  politicalParty: z.array(WikidataPoliticalPartyHolderSchema),
  image: z.union([ImageHolderSchema, z.null()]),
  abstractText: z.string(),
  abstract: z.string(),
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are explicitly typed, no `any` usage
2. **Interface Usage**: Consistent use of `interface` over `type` for object shapes
3. **Nullable Handling**: Explicit `null` type for optional image property
4. **Array Typing**: Proper array type definitions for collections
5. **Composition**: Reusable interfaces for common Wikidata patterns

### ✅ Recommended Patterns

```typescript
// Use utility types for specific use cases
function createPersonSummary(person: Person): PersonSummary {
  return {
    wikidataId: person.wikidataId,
    name: person.name,
    description: person.description,
    image: person.image,
  };
}

// Type guards for runtime checking
function isPersonWithImage(person: Person): person is Person & { image: ImageHolder } {
  return person.image !== null;
}

// Const assertions for literal types
const PERSON_DISPLAY_FIELDS = ['name', 'description', 'occupation'] as const;
type PersonDisplayField = typeof PERSON_DISPLAY_FIELDS[number];
```

### ⚠️ Considerations

- **Date Handling**: The `WikidataDateHolder` uses string dates - consider standardizing on Date objects or ISO strings
- **Null vs Undefined**: Currently mixes `null` (image) with potential undefined behavior - consider consistency
- **Validation**: Runtime validation should be implemented for Wikidata ID format and date precision values
- **Immutability**: Consider making interfaces readonly for immutable data patterns