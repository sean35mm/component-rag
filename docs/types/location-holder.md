# LocationHolder Type Documentation

## Purpose

The `LocationHolder` interface defines a standardized structure for representing geographical location information in a hierarchical format. This type serves as a foundational domain object for location-based features across the application, providing consistent data structure for address management, geographical queries, and location-based services.

## Type Definition

```typescript
export interface LocationHolder {
  country: string;
  state: string;
  county: string;
  city: string;
  area: string;
}
```

This interface follows our **domain-first** architecture pattern, establishing the core data structure that other location-related types will extend or reference.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `country` | `string` | ✅ | The country name (e.g., "United States", "Canada") |
| `state` | `string` | ✅ | State or province name (e.g., "California", "Ontario") |
| `county` | `string` | ✅ | County or administrative division (e.g., "Los Angeles County") |
| `city` | `string` | ✅ | City or municipality name (e.g., "Los Angeles", "Toronto") |
| `area` | `string` | ✅ | Local area, district, or neighborhood (e.g., "Downtown", "Westside") |

## Usage Examples

### Basic Usage

```typescript
import { LocationHolder } from '@/lib/types/location-holder';

// Creating a location object
const userLocation: LocationHolder = {
  country: "United States",
  state: "California",
  county: "Los Angeles County",
  city: "Los Angeles",
  area: "Beverly Hills"
};

// Function accepting location data
function formatAddress(location: LocationHolder): string {
  return `${location.area}, ${location.city}, ${location.county}, ${location.state}, ${location.country}`;
}
```

### Component Integration

```tsx
import React from 'react';
import { LocationHolder } from '@/lib/types/location-holder';

interface LocationDisplayProps {
  location: LocationHolder;
  showFullAddress?: boolean;
}

export const LocationDisplay: React.FC<LocationDisplayProps> = ({ 
  location, 
  showFullAddress = false 
}) => {
  return (
    <div className="location-display">
      <h3>{location.city}, {location.state}</h3>
      {showFullAddress && (
        <address>
          {location.area}<br />
          {location.city}, {location.county}<br />
          {location.state}, {location.country}
        </address>
      )}
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { LocationHolder } from '@/lib/types/location-holder';

class LocationService {
  async validateLocation(location: LocationHolder): Promise<boolean> {
    // Validation logic
    return this.checkLocationExists(location);
  }
  
  private async checkLocationExists(location: LocationHolder): Promise<boolean> {
    // Implementation details
    return true;
  }
}
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### 1. Domain Object (Current)
```typescript
// Primary domain object
export interface LocationHolder {
  country: string;
  state: string;
  county: string;
  city: string;
  area: string;
}
```

### 2. Response Types (Built from domain)
```typescript
// API response extending domain object
export interface LocationResponse extends LocationHolder {
  id: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

// Collection response
export interface LocationListResponse {
  locations: LocationResponse[];
  total: number;
  page: number;
  limit: number;
}
```

### 3. Request Types (Composed from domain)
```typescript
// Location creation request
export interface CreateLocationRequest extends LocationHolder {
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Location update request (partial updates allowed)
export interface UpdateLocationRequest extends Partial<LocationHolder> {
  id: string;
}

// Location search request
export interface LocationSearchRequest {
  query: string;
  filters?: Partial<LocationHolder>;
  limit?: number;
  offset?: number;
}
```

## Related Types

### Utility Type Variations

```typescript
// Partial location for progressive forms
export type PartialLocation = Partial<LocationHolder>;

// Location without area (broader search)
export type RegionalLocation = Omit<LocationHolder, 'area'>;

// Essential location info
export type CoreLocation = Pick<LocationHolder, 'country' | 'state' | 'city'>;

// Location keys for form validation
export type LocationKeys = keyof LocationHolder;
```

### Extended Types

```typescript
// Enhanced location with metadata
export interface EnhancedLocationHolder extends LocationHolder {
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timezone?: string;
}

// Location with user context
export interface UserLocationHolder {
  location: LocationHolder;
  userId: string;
  isPrimary: boolean;
  label?: string; // "Home", "Work", etc.
}
```

## Integration Points

### 1. Components
- `LocationSelector` - Dropdown/autocomplete for location selection
- `LocationDisplay` - Formatted location presentation
- `LocationForm` - Form inputs for location data entry
- `LocationCard` - Card component displaying location information

### 2. Services
- `LocationService` - Core location operations
- `GeocodeService` - Coordinate conversion
- `AddressValidationService` - Address verification

### 3. Hooks
- `useLocationSearch` - Location search functionality
- `useUserLocation` - User's saved locations
- `useLocationValidation` - Real-time location validation

### 4. API Endpoints
- `GET /api/locations` - Location listing
- `POST /api/locations` - Location creation
- `PUT /api/locations/:id` - Location updates
- `GET /api/locations/search` - Location search

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const LocationHolderSchema = z.object({
  country: z.string().min(1, 'Country is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  county: z.string().min(1, 'County is required').max(100),
  city: z.string().min(1, 'City is required').max(100),
  area: z.string().min(1, 'Area is required').max(100),
});

// Type inference from schema
export type ValidatedLocationHolder = z.infer<typeof LocationHolderSchema>;

// Validation function
export function validateLocation(data: unknown): LocationHolder {
  return LocationHolderSchema.parse(data);
}

// Safe validation
export function safeValidateLocation(data: unknown): {
  success: boolean;
  data?: LocationHolder;
  error?: string;
} {
  const result = LocationHolderSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { 
    success: false, 
    error: result.error.errors.map(e => e.message).join(', ') 
  };
}
```

### Form Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useLocationForm() {
  return useForm<LocationHolder>({
    resolver: zodResolver(LocationHolderSchema),
    defaultValues: {
      country: '',
      state: '',
      county: '',
      city: '',
      area: '',
    },
  });
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are explicitly typed as `string` with no `any` usage
2. **Interface Usage**: Uses `interface` for object shape definition
3. **Required Properties**: All fields are required, promoting data completeness
4. **Domain-First**: Serves as the foundational domain object for location architecture

### ✅ Recommended Patterns

```typescript
// ✅ Good: Using utility types for variations
type LocationUpdate = Partial<LocationHolder>;

// ✅ Good: Extending for enhanced functionality
interface GeoLocationHolder extends LocationHolder {
  coordinates: { lat: number; lng: number; };
}

// ✅ Good: Composition over inheritance
interface LocationWithMetadata {
  location: LocationHolder;
  metadata: {
    verified: boolean;
    source: string;
  };
}

// ✅ Good: Type-safe property access
function getLocationProperty<K extends keyof LocationHolder>(
  location: LocationHolder,
  key: K
): LocationHolder[K] {
  return location[key];
}
```

### ❌ Anti-Patterns to Avoid

```typescript
// ❌ Avoid: Using any
interface BadLocationHolder {
  location: any; // Use LocationHolder instead
}

// ❌ Avoid: Optional core properties without reason
interface IncompleteLocationHolder {
  country?: string; // Should be required for data integrity
  state?: string;
}

// ❌ Avoid: Mixing location data with unrelated concerns
interface MixedLocationHolder extends LocationHolder {
  userId: string; // Should be composed separately
  preferences: UserPreferences;
}
```

This `LocationHolder` interface provides a solid foundation for location-based functionality while maintaining strict typing standards and supporting extensible architecture patterns.