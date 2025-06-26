# PersonHolder Type Documentation

## Purpose

The `PersonHolder` interface represents a standardized data structure for entities that can be associated with specific persons in the application. This type serves as a core domain object for linking application data to Wikidata entities, providing both machine-readable identification through Wikidata IDs and human-readable representation through multiple name variants.

This type is primarily used in contexts where the application needs to maintain references to real-world persons while supporting internationalization and alternative naming conventions.

## Type Definition

```typescript
export interface PersonHolder {
  wikidataId: string;
  name: string[];
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `wikidataId` | `string` | ✅ Yes | Unique Wikidata identifier (e.g., "Q1234567") for unambiguous person identification |
| `name` | `string[]` | ✅ Yes | Array of name variants including full names, aliases, translations, and alternative spellings |

## Usage Examples

### Basic Usage

```typescript
import { PersonHolder } from '@/lib/types/person-holder';

// Creating a person holder for a historical figure
const shakespeareHolder: PersonHolder = {
  wikidataId: "Q692",
  name: [
    "William Shakespeare",
    "The Bard",
    "Shakespeare",
    "William Shakspere"
  ]
};

// Creating a person holder for an international figure
const picassoHolder: PersonHolder = {
  wikidataId: "Q5593",
  name: [
    "Pablo Picasso",
    "Pablo Ruiz Picasso",
    "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso",
    "Пабло Пикассо" // Russian translation
  ]
};
```

### Component Integration

```typescript
interface AuthorCardProps {
  author: PersonHolder;
  showWikidataLink?: boolean;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, showWikidataLink = false }) => {
  const primaryName = author.name[0];
  const alternativeNames = author.name.slice(1);

  return (
    <div className="author-card">
      <h3>{primaryName}</h3>
      {alternativeNames.length > 0 && (
        <p className="text-sm text-gray-600">
          Also known as: {alternativeNames.join(", ")}
        </p>
      )}
      {showWikidataLink && (
        <a 
          href={`https://www.wikidata.org/wiki/${author.wikidataId}`}
          className="text-blue-600 hover:underline"
        >
          View on Wikidata
        </a>
      )}
    </div>
  );
};
```

### Service Layer Usage

```typescript
class PersonService {
  async searchPersons(query: string): Promise<PersonHolder[]> {
    const response = await fetch(`/api/persons/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }

  async getPersonByWikidataId(wikidataId: string): Promise<PersonHolder | null> {
    try {
      const response = await fetch(`/api/persons/${wikidataId}`);
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  }

  getPersonDisplayName(person: PersonHolder, locale: string = 'en'): string {
    // Logic to select appropriate name based on locale
    return person.name.find(name => this.matchesLocale(name, locale)) || person.name[0];
  }

  private matchesLocale(name: string, locale: string): boolean {
    // Implementation for locale-based name matching
    return false; // Simplified for example
  }
}
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

```typescript
// 1. Domain Object (Base)
export interface PersonHolder {
  wikidataId: string;
  name: string[];
}

// 2. Response Types
export interface PersonHolderResponse extends PersonHolder {
  lastUpdated: string;
  confidence: number;
}

export interface PersonSearchResponse {
  persons: PersonHolderResponse[];
  totalCount: number;
  hasMore: boolean;
}

// 3. Request Types
export interface PersonSearchRequest {
  query: string;
  limit?: number;
  offset?: number;
  includeAliases?: boolean;
}

export interface CreatePersonHolderRequest extends Omit<PersonHolder, 'wikidataId'> {
  suggestedWikidataId?: string;
}
```

## Related Types

```typescript
// Extended types that compose with PersonHolder
export interface Author extends PersonHolder {
  biography?: string;
  birthYear?: number;
  deathYear?: number;
  nationality?: string[];
}

export interface Artist extends PersonHolder {
  medium: string[];
  movements: string[];
  activeYears: {
    start: number;
    end?: number;
  };
}

// Utility types for specific use cases
export type PersonReference = Pick<PersonHolder, 'wikidataId' | 'name'>;
export type PersonIdentifier = Pick<PersonHolder, 'wikidataId'>;
export type PartialPersonHolder = Partial<PersonHolder> & Pick<PersonHolder, 'wikidataId'>;
```

## Integration Points

### Database Layer
```typescript
// Prisma schema integration
model PersonEntity {
  wikidataId String   @id
  names      String[] // Maps to PersonHolder.name
  // ... other fields
}
```

### API Endpoints
- `GET /api/persons/:wikidataId` - Returns single PersonHolder
- `GET /api/persons/search` - Returns PersonHolder[]
- `POST /api/persons` - Accepts CreatePersonHolderRequest

### State Management
```typescript
interface PersonState {
  persons: Record<string, PersonHolder>;
  searchResults: PersonHolder[];
  loading: boolean;
  error: string | null;
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const PersonHolderSchema = z.object({
  wikidataId: z.string()
    .regex(/^Q\d+$/, "Must be a valid Wikidata ID (e.g., Q123456)")
    .min(2, "Wikidata ID must contain at least one digit"),
  name: z.array(z.string().min(1, "Names cannot be empty"))
    .min(1, "At least one name is required")
    .max(20, "Too many name variants")
});

// Usage in API routes
export const validatePersonHolder = (data: unknown): PersonHolder => {
  return PersonHolderSchema.parse(data);
};

// Runtime validation utility
export const isValidPersonHolder = (data: unknown): data is PersonHolder => {
  return PersonHolderSchema.safeParse(data).success;
};
```

### Custom Validation Functions

```typescript
export const PersonHolderValidators = {
  hasValidWikidataId: (person: PersonHolder): boolean => {
    return /^Q\d+$/.test(person.wikidataId);
  },

  hasPrimaryName: (person: PersonHolder): boolean => {
    return person.name.length > 0 && person.name[0].trim().length > 0;
  },

  hasUniqueNames: (person: PersonHolder): boolean => {
    const uniqueNames = new Set(person.name.map(n => n.toLowerCase().trim()));
    return uniqueNames.size === person.name.length;
  }
};
```

## Best Practices

### ✅ Do's

```typescript
// Use strict typing for PersonHolder arrays
const persons: PersonHolder[] = await fetchPersons();

// Leverage utility types for partial operations
const updatePerson = (id: string, updates: Partial<PersonHolder>): void => {
  // Implementation
};

// Use proper error handling with type guards
const processPersonData = (data: unknown): PersonHolder | null => {
  if (isValidPersonHolder(data)) {
    return data;
  }
  return null;
};

// Prefer interface extension over type intersection
interface AuthorProfile extends PersonHolder {
  publishedWorks: string[];
}
```

### ❌ Don'ts

```typescript
// Don't use 'any' type
const person: any = fetchPerson(); // ❌

// Don't mutate the name array directly
person.name.push("New Name"); // ❌
// Instead, create new array
const updatedPerson: PersonHolder = {
  ...person,
  name: [...person.name, "New Name"]
};

// Don't assume array length without checking
const primaryName = person.name[0]; // ❌ Could be undefined
// Instead, provide fallback
const primaryName = person.name[0] || "Unknown";
```

### Type Safety Patterns

```typescript
// Safe array access utility
export const getPersonPrimaryName = (person: PersonHolder): string => {
  return person.name[0] || "Unknown Person";
};

// Safe WikiData URL generation
export const getWikidataUrl = (person: PersonHolder): string => {
  if (!PersonHolderValidators.hasValidWikidataId(person)) {
    throw new Error(`Invalid Wikidata ID: ${person.wikidataId}`);
  }
  return `https://www.wikidata.org/wiki/${person.wikidataId}`;
};

// Immutable update helper
export const updatePersonNames = (
  person: PersonHolder, 
  newNames: string[]
): PersonHolder => ({
  ...person,
  name: [...newNames]
});
```

This type serves as a foundational building block for person-related data throughout the application, ensuring consistent structure while maintaining flexibility for various naming conventions and internationalization requirements.