# Coordinate Type Documentation

## Purpose

The `Coordinate` interface represents a geographical point on Earth using latitude and longitude coordinates. This fundamental domain object serves as the building block for location-based features throughout the application, providing a standardized way to represent geographical positions in mapping, geolocation, and spatial data operations.

## Type Definition

```typescript
export interface Coordinate {
  lat: number;
  lon: number;
}
```

This interface follows our **Interfaces over Types** guideline by using `interface` for object shapes and implements **Strict Typing** with explicit `number` types for both coordinate values.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `lat` | `number` | ✅ | Latitude coordinate in decimal degrees (-90 to 90) |
| `lon` | `number` | ✅ | Longitude coordinate in decimal degrees (-180 to 180) |

## Usage Examples

### Basic Usage

```typescript
import { Coordinate } from '@/lib/types/coordinate';

// Creating a coordinate for New York City
const nycCoordinate: Coordinate = {
  lat: 40.7128,
  lon: -74.0060
};

// Function accepting coordinate parameter
function calculateDistance(point1: Coordinate, point2: Coordinate): number {
  // Haversine formula implementation
  const R = 6371; // Earth's radius in kilometers
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lon - point1.lon) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
```

### Component Integration

```typescript
import React from 'react';
import { Coordinate } from '@/lib/types/coordinate';

interface MapProps {
  center: Coordinate;
  markers: Coordinate[];
  zoom?: number;
}

const MapComponent: React.FC<MapProps> = ({ center, markers, zoom = 10 }) => {
  return (
    <div className="map-container">
      <p>Center: {center.lat}, {center.lon}</p>
      {markers.map((marker, index) => (
        <div key={index} data-lat={marker.lat} data-lon={marker.lon}>
          Marker at {marker.lat}, {marker.lon}
        </div>
      ))}
    </div>
  );
};
```

### Utility Type Applications

```typescript
import { Coordinate } from '@/lib/types/coordinate';

// Using Partial for optional coordinate updates
type CoordinateUpdate = Partial<Coordinate>;

function updateLocation(current: Coordinate, updates: CoordinateUpdate): Coordinate {
  return {
    lat: updates.lat ?? current.lat,
    lon: updates.lon ?? current.lon
  };
}

// Using Pick for specific coordinate properties
type Latitude = Pick<Coordinate, 'lat'>;
type Longitude = Pick<Coordinate, 'lon'>;
```

## Type Architecture Pattern

Following our **Type Architecture** pattern of domain objects → response types → request types:

### 1. Domain Object (Base)
```typescript
// src/lib/types/coordinate.ts
export interface Coordinate {
  lat: number;
  lon: number;
}
```

### 2. Response Types
```typescript
// API response shapes that include coordinates
export interface LocationResponse {
  id: string;
  name: string;
  coordinate: Coordinate;
  timestamp: string;
}

export interface GeocodingResponse {
  results: Array<{
    address: string;
    coordinate: Coordinate;
    confidence: number;
  }>;
}
```

### 3. Request Types
```typescript
// API request shapes for coordinate-based operations
export interface NearbySearchRequest {
  center: Coordinate;
  radius: number;
  category?: string;
}

export interface RouteRequest {
  origin: Coordinate;
  destination: Coordinate;
  waypoints?: Coordinate[];
}
```

## Related Types

```typescript
// Extended coordinate types
export interface CoordinateWithAltitude extends Coordinate {
  alt: number; // altitude in meters
}

export interface BoundingBox {
  northEast: Coordinate;
  southWest: Coordinate;
}

export interface LocationPoint {
  coordinate: Coordinate;
  address?: string;
  name?: string;
}

// Coordinate collections
export type Route = Coordinate[];
export type Polygon = Coordinate[];
```

## Integration Points

### Services
```typescript
// src/services/geocoding.ts
import { Coordinate } from '@/lib/types/coordinate';

export class GeocodingService {
  async getCoordinateFromAddress(address: string): Promise<Coordinate> {
    // Implementation
  }
  
  async getAddressFromCoordinate(coord: Coordinate): Promise<string> {
    // Implementation
  }
}
```

### Hooks
```typescript
// src/hooks/useGeolocation.ts
import { Coordinate } from '@/lib/types/coordinate';

export function useGeolocation() {
  const [position, setPosition] = useState<Coordinate | null>(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      });
    });
  }, []);
  
  return position;
}
```

### State Management
```typescript
// src/store/locationSlice.ts
import { Coordinate } from '@/lib/types/coordinate';

interface LocationState {
  currentPosition: Coordinate | null;
  savedLocations: Coordinate[];
  selectedLocation: Coordinate | null;
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const CoordinateSchema = z.object({
  lat: z.number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  lon: z.number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180')
});

// Runtime validation helper
export function validateCoordinate(coord: unknown): Coordinate {
  return CoordinateSchema.parse(coord);
}

// Type-safe validation
export function isValidCoordinate(coord: Coordinate): boolean {
  return coord.lat >= -90 && coord.lat <= 90 && 
         coord.lon >= -180 && coord.lon <= 180;
}
```

### Form Validation
```typescript
import { z } from 'zod';
import { CoordinateSchema } from './coordinate.validation';

const LocationFormSchema = z.object({
  name: z.string().min(1),
  coordinate: CoordinateSchema,
  description: z.string().optional()
});

type LocationFormData = z.infer<typeof LocationFormSchema>;
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: Uses explicit `number` types instead of `any`
2. **Interface over Type**: Implements as `interface` for object shape
3. **Utility Types**: Examples show proper use of `Partial`, `Pick`, etc.
4. **Type Architecture**: Serves as foundation for response and request types

### ✅ Usage Patterns

```typescript
// ✅ Good: Explicit typing
const location: Coordinate = { lat: 40.7128, lon: -74.0060 };

// ✅ Good: Type-safe function parameters
function isWithinBounds(point: Coordinate, bounds: BoundingBox): boolean {
  return point.lat <= bounds.northEast.lat && 
         point.lat >= bounds.southWest.lat &&
         point.lon <= bounds.northEast.lon && 
         point.lon >= bounds.southWest.lon;
}

// ✅ Good: Composition with other interfaces
interface Venue {
  id: string;
  name: string;
  location: Coordinate;
}
```

### ❌ Anti-patterns

```typescript
// ❌ Avoid: Using any type
const location: any = { lat: 40.7128, lon: -74.0060 };

// ❌ Avoid: Type alias for simple object (prefer interface)
type Coordinate = { lat: number; lon: number; };

// ❌ Avoid: Inline coordinate objects without typing
function someFunction(coords: { lat: number; lon: number }) {
  // Should use Coordinate interface instead
}
```

The `Coordinate` interface exemplifies our type system's foundation, providing a clean, reusable domain object that composes well with other types while maintaining strict typing standards throughout the application.