# PlaceKit Types Documentation

## Purpose

This module defines patched interfaces for PlaceKit's client library types, extending the base `PKResult` and `PKSearchResponse` types to include additional administrative code information. These types serve as domain objects in our type architecture, providing enhanced location data with administrative code details that aren't included in the base PlaceKit client.

## Type Definition

```typescript
import { PKResult, PKSearchResponse } from '@placekit/client-js/lite';

export interface PKResultPatched extends PKResult {
  administrativecode: string;
}

export interface PKSearchResponsePatched extends PKSearchResponse {
  results: PKResultPatched[];
}
```

## Properties

### PKResultPatched

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `administrativecode` | `string` | Yes | Administrative code for the location (e.g., postal code, district code) |
| ...inherited | various | varies | All properties from base `PKResult` interface |

### PKSearchResponsePatched

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `results` | `PKResultPatched[]` | Yes | Array of enhanced PlaceKit results with administrative codes |
| ...inherited | various | varies | All other properties from base `PKSearchResponse` interface |

## Usage Examples

### Basic Usage in Search Service

```typescript
import { PKSearchResponsePatched, PKResultPatched } from '@/lib/types/placekit';

class PlaceKitService {
  async searchPlaces(query: string): Promise<PKSearchResponsePatched> {
    const response = await this.client.search(query);
    
    // Transform base response to include administrative codes
    return {
      ...response,
      results: response.results.map((result): PKResultPatched => ({
        ...result,
        administrativecode: this.extractAdministrativeCode(result)
      }))
    };
  }

  private extractAdministrativeCode(result: PKResult): string {
    // Logic to extract or derive administrative code
    return result.city_code || result.country_code || '';
  }
}
```

### Component Usage with Type Safety

```typescript
import { PKResultPatched } from '@/lib/types/placekit';

interface LocationSelectorProps {
  onLocationSelect: (location: PKResultPatched) => void;
  searchQuery: string;
}

export function LocationSelector({ onLocationSelect, searchQuery }: LocationSelectorProps) {
  const [results, setResults] = useState<PKResultPatched[]>([]);

  const handleLocationClick = (location: PKResultPatched) => {
    // Type-safe access to both base properties and administrative code
    console.log(`Selected: ${location.name} (${location.administrativecode})`);
    onLocationSelect(location);
  };

  return (
    <div>
      {results.map((result) => (
        <LocationItem
          key={result.id}
          location={result}
          onClick={handleLocationClick}
          administrativeCode={result.administrativecode}
        />
      ))}
    </div>
  );
}
```

### Request Type Derivation

```typescript
// Following our type architecture: domain objects → response types → request types
export interface LocationSearchRequest {
  query: string;
  includeAdministrativeCode: boolean;
  filters?: Pick<PKResultPatched, 'country' | 'city'>;
}

export interface LocationSearchResponse {
  data: PKSearchResponsePatched;
  metadata: {
    query: string;
    resultCount: number;
    hasAdministrativeCodes: boolean;
  };
}
```

## Type Architecture Pattern

This type follows our **domain objects → response types → request types** pattern:

1. **Domain Objects** (Current): `PKResultPatched`, `PKSearchResponsePatched`
   - Core business entities with enhanced location data
   - Extended from third-party types to include business-specific fields

2. **Response Types** (Built from these):
   ```typescript
   interface LocationApiResponse {
     locations: PKSearchResponsePatched;
     pagination: PaginationInfo;
   }
   ```

3. **Request Types** (Derived):
   ```typescript
   interface LocationSearchFilters extends Partial<Pick<PKResultPatched, 'country' | 'city'>> {
     requireAdministrativeCode?: boolean;
   }
   ```

## Related Types

### Utility Types for Enhanced Flexibility

```typescript
// Extract specific location properties
export type LocationIdentifier = Pick<PKResultPatched, 'id' | 'name' | 'administrativecode'>;

// Optional administrative code for partial updates
export type PartialLocationResult = Omit<PKResultPatched, 'administrativecode'> & {
  administrativecode?: string;
};

// Location summary for display purposes
export type LocationSummary = Pick<PKResultPatched, 'name' | 'city' | 'country' | 'administrativecode'>;
```

### Composition Types

```typescript
export interface EnhancedLocationData extends PKResultPatched {
  displayName: string;
  formattedAddress: string;
  isValidated: boolean;
}

export interface LocationWithMetadata {
  location: PKResultPatched;
  searchQuery: string;
  selectedAt: Date;
  source: 'user-input' | 'suggestion' | 'geolocation';
}
```

## Integration Points

### Services
- **LocationService**: Primary consumer for location search and validation
- **GeocodingService**: Uses for reverse geocoding with administrative codes
- **AddressValidationService**: Leverages administrative codes for validation

### Components
- **LocationAutocomplete**: Renders search results with administrative information
- **AddressForm**: Uses for address validation and formatting
- **LocationPicker**: Map-based selection with administrative code display

### State Management
```typescript
// Redux/Zustand store integration
interface LocationState {
  searchResults: PKSearchResponsePatched | null;
  selectedLocation: PKResultPatched | null;
  recentSearches: LocationIdentifier[];
}
```

## Validation

### Zod Schema Patterns

```typescript
import { z } from 'zod';

// Schema for administrative code validation
const AdministrativeCodeSchema = z.string()
  .min(1, 'Administrative code is required')
  .regex(/^[A-Za-z0-9-]+$/, 'Invalid administrative code format');

// Enhanced result validation
export const PKResultPatchedSchema = z.object({
  id: z.string(),
  name: z.string(),
  administrativecode: AdministrativeCodeSchema,
  // Add other PKResult properties as needed
  city: z.string().optional(),
  country: z.string().optional(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
});

// Response validation
export const PKSearchResponsePatchedSchema = z.object({
  results: z.array(PKResultPatchedSchema),
  query: z.string(),
  // Add other PKSearchResponse properties
});

// Runtime validation helper
export function validateLocationResult(data: unknown): PKResultPatched {
  return PKResultPatchedSchema.parse(data);
}
```

### Validation Usage

```typescript
import { validateLocationResult } from '@/lib/types/placekit';

async function processLocationData(rawData: unknown): Promise<PKResultPatched> {
  try {
    return validateLocationResult(rawData);
  } catch (error) {
    throw new Error(`Invalid location data: ${error.message}`);
  }
}
```

## Best Practices

### ✅ Recommended Patterns

1. **Interface Extension**: Properly extends third-party types while adding business logic
2. **Strict Typing**: No use of `any`, maintains type safety throughout
3. **Utility Type Usage**: Leverages `Pick`, `Omit`, and `Partial` for flexible type derivation
4. **Clear Naming**: `Patched` suffix clearly indicates these are enhanced versions

### 🔄 Type Architecture Adherence

```typescript
// ✅ Good: Following domain → response → request pattern
interface LocationDomain extends PKResultPatched {
  // Domain-specific enhancements
}

interface LocationResponse {
  data: LocationDomain[];
}

interface LocationRequest {
  filters: Partial<Pick<LocationDomain, 'country' | 'city'>>;
}

// ❌ Avoid: Mixing concerns
interface LocationEverything extends PKResultPatched {
  // Don't mix domain, request, and response properties
  requestId: string;    // Request concern
  serverTimestamp: Date; // Response concern
}
```

### 🛡️ Type Safety Patterns

```typescript
// ✅ Type guards for runtime safety
export function isPKResultPatched(obj: any): obj is PKResultPatched {
  return obj && typeof obj.administrativecode === 'string';
}

// ✅ Utility functions with proper typing
export function formatLocationDisplay(location: PKResultPatched): string {
  return `${location.name} (${location.administrativecode})`;
}

// ✅ Generic helpers maintaining type safety
export function transformResults<T extends PKResultPatched>(
  results: T[],
  transformer: (result: T) => T
): T[] {
  return results.map(transformer);
}
```

This type definition serves as a solid foundation for location-based functionality while maintaining strict typing and following our established architectural patterns.