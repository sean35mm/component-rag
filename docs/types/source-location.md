# SourceLocation Type Documentation

## Purpose

The `SourceLocation` interface represents a complete geographical location with hierarchical administrative divisions and precise coordinates. This domain object serves as a foundational type for location-based functionality throughout the application, providing a standardized structure for representing physical locations from country level down to specific coordinates.

## Type Definition

```typescript
import { Coordinate } from './coordinate';

export interface SourceLocation {
  country: string;
  state: string;
  county: string;
  city: string;
  coordinates: Coordinate;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `country` | `string` | ✅ | The country name where the location is situated |
| `state` | `string` | ✅ | The state or province within the country |
| `county` | `string` | ✅ | The county or administrative subdivision within the state |
| `city` | `string` | ✅ | The city or municipality name |
| `coordinates` | `Coordinate` | ✅ | Precise geographical coordinates (latitude/longitude) |

## Usage Examples

### Basic Usage

```typescript
import { SourceLocation } from './types/source-location';
import { Coordinate } from './types/coordinate';

// Creating a complete source location
const businessLocation: SourceLocation = {
  country: 'United States',
  state: 'California',
  county: 'Los Angeles County',
  city: 'Los Angeles',
  coordinates: {
    latitude: 34.0522,
    longitude: -118.2437
  }
};
```

### Component Integration

```typescript
interface LocationDisplayProps {
  location: SourceLocation;
  showCoordinates?: boolean;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ 
  location, 
  showCoordinates = false 
}) => {
  const formatAddress = (loc: SourceLocation): string => {
    return `${loc.city}, ${loc.county}, ${loc.state}, ${loc.country}`;
  };

  return (
    <div className="location-display">
      <h3>{formatAddress(location)}</h3>
      {showCoordinates && (
        <p>
          Coordinates: {location.coordinates.latitude}, {location.coordinates.longitude}
        </p>
      )}
    </div>
  );
};
```

### Service Layer Usage

```typescript
class LocationService {
  async findNearbyLocations(
    center: SourceLocation, 
    radiusKm: number
  ): Promise<SourceLocation[]> {
    // Implementation would filter locations within radius
    return this.locations.filter(location => 
      this.calculateDistance(center.coordinates, location.coordinates) <= radiusKm
    );
  }

  private calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
    // Haversine formula implementation
    // Returns distance in kilometers
  }
}
```

## Type Architecture Pattern

### Domain Object (Current)
```typescript
// Core domain representation
export interface SourceLocation {
  country: string;
  state: string;
  county: string;
  city: string;
  coordinates: Coordinate;
}
```

### Response Types
```typescript
// API response shape
export interface SourceLocationResponse {
  data: SourceLocation;
  metadata: {
    source: string;
    accuracy: number;
    lastUpdated: string;
  };
}

// List response
export interface SourceLocationListResponse {
  locations: SourceLocation[];
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
export interface CreateSourceLocationRequest {
  location: Omit<SourceLocation, 'coordinates'>;
  address?: string; // For geocoding
}

// Update request
export interface UpdateSourceLocationRequest {
  location: Partial<SourceLocation>;
  id: string;
}

// Search request
export interface SearchLocationRequest {
  query: string;
  filters?: {
    country?: string;
    state?: string;
    radius?: {
      center: Coordinate;
      km: number;
    };
  };
}
```

## Related Types

### Direct Dependencies
- `Coordinate` - Required for geographical positioning

### Extended Types
```typescript
// Enhanced location with additional metadata
export interface EnhancedSourceLocation extends SourceLocation {
  timezone: string;
  postalCode: string;
  population?: number;
}

// Minimal location for dropdown selections
export type LocationSummary = Pick<SourceLocation, 'city' | 'state' | 'country'>;

// Location without coordinates for privacy-sensitive contexts
export type PublicLocation = Omit<SourceLocation, 'coordinates'>;
```

### Utility Types
```typescript
// Optional location for forms
export type PartialSourceLocation = Partial<SourceLocation>;

// Required location fields for validation
export type RequiredLocationFields = Required<Pick<SourceLocation, 'country' | 'city'>>;
```

## Integration Points

### Components
- `LocationPicker` - Form component for selecting locations
- `LocationDisplay` - Read-only location presentation
- `MapView` - Interactive map with location markers
- `LocationSearch` - Search and autocomplete functionality

### Services
- `GeocodingService` - Convert addresses to coordinates
- `LocationValidationService` - Validate location data
- `ProximityService` - Calculate distances and nearby locations

### API Endpoints
- `GET /api/locations` - Fetch locations
- `POST /api/locations` - Create new location
- `PUT /api/locations/:id` - Update location
- `GET /api/locations/search` - Search locations

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { CoordinateSchema } from './coordinate';

export const SourceLocationSchema = z.object({
  country: z.string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country name too long'),
  
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State name too long'),
  
  county: z.string()
    .min(2, 'County must be at least 2 characters')
    .max(100, 'County name too long'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City name too long'),
  
  coordinates: CoordinateSchema
});

// Validation function
export const validateSourceLocation = (data: unknown): SourceLocation => {
  return SourceLocationSchema.parse(data);
};

// Type guard
export const isSourceLocation = (data: unknown): data is SourceLocation => {
  return SourceLocationSchema.safeParse(data).success;
};
```

### Runtime Validation Example
```typescript
const processLocationData = (rawData: unknown): SourceLocation | null => {
  try {
    return validateSourceLocation(rawData);
  } catch (error) {
    console.error('Invalid location data:', error);
    return null;
  }
};
```

## Best Practices

### ✅ Recommended Patterns

1. **Strict Interface Adherence**
   ```typescript
   // Good: All properties required, strict typing
   const location: SourceLocation = {
     country: 'United States',
     state: 'California',
     county: 'Los Angeles County',
     city: 'Los Angeles',
     coordinates: { latitude: 34.0522, longitude: -118.2437 }
   };
   ```

2. **Use Utility Types for Variations**
   ```typescript
   // Good: Leverage TypeScript utilities
   type LocationUpdate = Partial<SourceLocation>;
   type LocationPreview = Pick<SourceLocation, 'city' | 'state' | 'country'>;
   ```

3. **Proper Error Handling**
   ```typescript
   // Good: Validate before processing
   const processLocation = (data: unknown): void => {
     if (!isSourceLocation(data)) {
       throw new Error('Invalid location data');
     }
     // Process valid location
   };
   ```

### ❌ Anti-patterns to Avoid

1. **Avoid Any Types**
   ```typescript
   // Bad: Loses type safety
   const location: any = { /* ... */ };
   
   // Good: Use proper typing
   const location: SourceLocation = { /* ... */ };
   ```

2. **Don't Modify Interface Properties**
   ```typescript
   // Bad: Mutating interface properties
   location.city = undefined;
   
   // Good: Use utility types for optional variants
   const partialLocation: Partial<SourceLocation> = { city: undefined };
   ```

3. **Avoid String Concatenation for Addresses**
   ```typescript
   // Bad: Manual string building
   const address = location.city + ', ' + location.state;
   
   // Good: Proper formatting function
   const formatAddress = (loc: SourceLocation): string => 
     `${loc.city}, ${loc.state}, ${loc.country}`;
   ```

This type serves as a cornerstone for location-based functionality, providing a robust foundation for geographical data representation while maintaining strict type safety and clear architectural boundaries.