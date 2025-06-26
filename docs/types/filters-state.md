# Filters State Type Definitions

## Purpose

The `filters-state` module defines a comprehensive type system for managing filtering capabilities across news content, sources, and metadata. This system enables users to filter news articles by categories, languages, locations, excluded items, and various other criteria. It serves as the foundation for search, filtering, and content curation functionality throughout the application.

## Type Definition

### Core Filter Enums

```typescript
// Content categorization filters
export enum CategoriesFilters {
  Politics = 'Politics',
  Tech = 'Tech',
  Sports = 'Sports',
  Business = 'Business',
  Finance = 'Finance',
  Entertainment = 'Entertainment',
  Health = 'Health',
  Weather = 'Weather',
  Lifestyle = 'Lifestyle',
  Auto = 'Auto',
  Science = 'Science',
  Travel = 'Travel',
  Environment = 'Environment',
  World = 'World',
  General = 'General',
}

// Supported language filters
export enum LanguagesFilters {
  Croatian = 'Croatian',
  Danish = 'Danish',
  Dutch = 'Dutch',
  English = 'English',
  // ... (23 total languages)
}

// Content classification labels
export enum LabelsFilters {
  Opinion = 'Opinion',
  NonNews = 'Non-news',
  Roundup = 'Roundup',
  PopCulture = 'Pop Culture',
  FactCheck = 'Fact Check',
  PressRelease = 'Press Release',
  PaidNews = 'Paid News',
  LowContent = 'Low Content',
  Synthetic = 'Synthetic',
}

// Predefined source groupings
export enum SourceGroupsFilter {
  PERIGONS_TOP_SOURCES = 'generativeStoryEnglish',
  MOST_POPULAR = 'top500English',
  RIGHT_LEANING = 'top100rightUS',
  LEFT_LEANING = 'top100leftUS',
  SPORTS = 'top100sports',
  FINANCE = 'top25finance',
  TECH = 'top50tech',
}
```

### Location Filter System

```typescript
// Location type discriminators (const enum for performance)
export const enum LocationsFilterType {
  CITY = 'CITY',
  US_CITY = 'US_CITY',
  US_LIKE_CITY = 'US_LIKE_CITY',
  US_STATE = 'US_STATE',
  COUNTRY = 'COUNTRY',
  COUNTY = 'COUNTY',
  STATE = 'STATE',
  US_COUNTY = 'US_COUNTY',
}

// Base interface for all location filters
export interface LocationsFilterBase<T = LocationsFilterType> {
  type: T;
  name: string;
}

// Discriminated union for all location filter types
export type LocationsFilter =
  | CityLocationsFilter
  | UsCityLocationsFilter
  | CountyLocationsFilter
  | UsStateLocationsFilter
  | UsCountyLocationsFilter
  | UsLikeCityLocationsFilter
  | CountryLocationsFilter
  | StateLocationsFilter;
```

### Exclusion Filter System

```typescript
// Types of items that can be excluded
export const enum ExcludedFilterItemType {
  Source = 'Source',
  Company = 'Company',
  People = 'People',
  Topic = 'Topic',
  Location = 'Location',
  Journalist = 'Journalist',
  Label = 'Label',
  Language = 'Language',
}

// Generic base for excluded items
export interface ExcludedFilterItemBase<TValue, TType = ExcludedFilterItemType> {
  type: TType;
  value: TValue;
}

// Union type for all exclusion filters
export type ExcludedFilterItem =
  | ExcludedCompanyFilterItem
  | ExcludedJournalistFilterItem
  | ExcludedLabelFilterItem
  | ExcludedLanguageFilterItem
  | ExcludedLocationFilterItem
  | ExcludedPeopleFilterItem
  | ExcludedSourceFilterItem
  | ExcludedTopicFilterItem;
```

### Main Filters State Interface

```typescript
export interface FiltersState {
  categories: CategoriesFilters[];
  excluded: ExcludedFilterItem[];
  labels: LabelsFilters[];
  languages: LanguagesFilters[];
  locations: LocationsFilter[];
  noDuplicates: boolean;
  sourceLocations: SourceLocationsFilter[];
  sourceGroups: SourceGroupsFilterType[];
  sources: string[];
  journalists: string[];
}
```

## Properties

### FiltersState Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `categories` | `CategoriesFilters[]` | Yes | Content categories to include in results |
| `excluded` | `ExcludedFilterItem[]` | Yes | Items to exclude from results |
| `labels` | `LabelsFilters[]` | Yes | Content classification labels to filter by |
| `languages` | `LanguagesFilters[]` | Yes | Languages to include in results |
| `locations` | `LocationsFilter[]` | Yes | Geographic locations to filter by |
| `noDuplicates` | `boolean` | Yes | Whether to remove duplicate articles |
| `sourceLocations` | `SourceLocationsFilter[]` | Yes | Geographic filters for news sources |
| `sourceGroups` | `SourceGroupsFilterType[]` | Yes | Predefined source groups to include |
| `sources` | `string[]` | Yes | Specific source identifiers |
| `journalists` | `string[]` | Yes | Specific journalist names to filter by |

### LocationsFilter Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `LocationsFilterType` | Yes | Discriminator for location type |
| `name` | `string` | Yes | Human-readable location name |
| `code` | `string` | Conditional | Location code (for countries/states) |
| `country` | `{ name: string; code: string }` | Conditional | Country information |
| `state` | `{ name: string; code: string }` | Conditional | State/province information |

### ExcludedFilterItem Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `ExcludedFilterItemType` | Yes | Type of item being excluded |
| `value` | `TValue` | Yes | The actual value to exclude (varies by type) |

## Usage Examples

### Creating Filter State

```typescript
import { 
  FiltersState, 
  CategoriesFilters, 
  LanguagesFilters,
  LocationsFilterType,
  ExcludedFilterItemType 
} from '@/lib/types/filters-state';

// Basic filter configuration
const basicFilters: FiltersState = {
  categories: [CategoriesFilters.Tech, CategoriesFilters.Business],
  excluded: [],
  labels: [],
  languages: [LanguagesFilters.English],
  locations: [],
  noDuplicates: true,
  sourceLocations: [],
  sourceGroups: [],
  sources: [],
  journalists: []
};

// Advanced filter with exclusions
const advancedFilters: FiltersState = {
  categories: [CategoriesFilters.Politics],
  excluded: [
    {
      type: ExcludedFilterItemType.Source,
      value: 'biased-news-source'
    },
    {
      type: ExcludedFilterItemType.Language,
      value: LanguagesFilters.Spanish
    }
  ],
  labels: [LabelsFilters.FactCheck],
  languages: [LanguagesFilters.English],
  locations: [
    {
      type: LocationsFilterType.US_STATE,
      name: 'California',
      code: 'CA',
      country: { name: 'United States', code: 'US' }
    }
  ],
  noDuplicates: true,
  sourceLocations: [],
  sourceGroups: [SourceGroupsFilter.MOST_POPULAR],
  sources: ['reuters', 'bbc'],
  journalists: ['John Doe', 'Jane Smith']
};
```

### Type Guards for Location Filters

```typescript
import { LocationsFilter, LocationsFilterType } from '@/lib/types/filters-state';

function isCityFilter(location: LocationsFilter): location is CityLocationsFilter {
  return location.type === LocationsFilterType.CITY;
}

function isCountryFilter(location: LocationsFilter): location is CountryLocationsFilter {
  return location.type === LocationsFilterType.COUNTRY;
}

// Usage in filter processing
function processLocationFilter(location: LocationsFilter): string {
  if (isCityFilter(location)) {
    return `${location.name}, ${location.country.name}`;
  }
  
  if (isCountryFilter(location)) {
    return location.name;
  }
  
  // Handle other location types...
  return location.name;
}
```

### Filter State Management Hook

```typescript
import { useState, useCallback } from 'react';
import { FiltersState, CategoriesFilters, ExcludedFilterItem } from '@/lib/types/filters-state';

function useFiltersState() {
  const [filters, setFilters] = useState<FiltersState>({
    categories: [],
    excluded: [],
    labels: [],
    languages: [],
    locations: [],
    noDuplicates: false,
    sourceLocations: [],
    sourceGroups: [],
    sources: [],
    journalists: []
  });

  const addCategory = useCallback((category: CategoriesFilters) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category) 
        ? prev.categories 
        : [...prev.categories, category]
    }));
  }, []);

  const removeCategory = useCallback((category: CategoriesFilters) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  }, []);

  const addExclusion = useCallback((exclusion: ExcludedFilterItem) => {
    setFilters(prev => ({
      ...prev,
      excluded: [...prev.excluded, exclusion]
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      excluded: [],
      labels: [],
      languages: [],
      locations: [],
      noDuplicates: false,
      sourceLocations: [],
      sourceGroups: [],
      sources: [],
      journalists: []
    });
  }, []);

  return {
    filters,
    addCategory,
    removeCategory,
    addExclusion,
    clearFilters,
    setFilters
  };
}
```

## Type Architecture Pattern

This module follows our **domain objects → response types → request types** pattern:

### 1. Domain Objects (Current Module)
- **Core Enums**: `CategoriesFilters`, `LanguagesFilters`, `LabelsFilters`
- **Base Interfaces**: `LocationsFilterBase`, `ExcludedFilterItemBase`
- **Domain State**: `FiltersState`

### 2. Response Types (Built from these domains)
```typescript
// Example response type using filters
interface NewsResponse {
  articles: Article[];
  appliedFilters: FiltersState;
  totalCount: number;
  hasMore: boolean;
}
```

### 3. Request Types (Transforms domain for API)
```typescript
// Example request type transforming filters
interface NewsSearchRequest {
  categories?: string[]; // CategoriesFilters → string[]
  excludedSources?: string[];
  languages?: string[];
  location?: string;
  // ... other transformed filter fields
}
```

## Related Types

### Extension Types
```typescript
// Partial filters for incremental updates
type PartialFiltersState = Partial<FiltersState>;

// Filter selections for UI components
type FilterSelection<T> = {
  available: T[];
  selected: T[];
};

// Filter metadata
interface FilterMetadata {
  lastApplied: Date;
  resultCount: number;
  filterHash: string;
}
```

### Composition Types
```typescript
// Combined with search state
interface SearchFiltersState {
  query: string;
  filters: FiltersState;
  sortBy: 'relevance' | 'date' | 'popularity';
}

// With pagination
interface PaginatedFiltersState extends FiltersState {
  page: number;
  limit: number;
}
```

## Integration Points

### Services
```typescript
// News API service
class NewsService {
  async searchNews(filters: FiltersState): Promise<NewsResponse> {
    const params = this.transformFiltersToApiParams(filters);
    return this.httpClient.get('/news/search', { params });
  }

  private transformFiltersToApiParams(filters: FiltersState): NewsSearchRequest {
    // Transform domain filters to API format
  }
}
```

### Components
```typescript
// Filter selection component
interface FilterSelectorProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  availableCategories: CategoriesFilters[];
}

// Location filter component
interface LocationFilterProps {
  locations: LocationsFilter[];
  onLocationAdd: (location: LocationsFilter) => void;
  onLocationRemove: (index: number) => void;
}
```

### State Management
```typescript
// Redux slice
interface AppState {
  filters: FiltersState;
  ui: {
    showAdvancedFilters: boolean;
    filterPanelOpen: boolean;
  };
}
```

## Validation

### Zod Schemas
```typescript
import { z } from 'zod';

// Enum validations
const CategoriesFiltersSchema = z.nativeEnum(CategoriesFilters);
const LanguagesFiltersSchema = z.nativeEnum(LanguagesFilters);
const LocationsFilterTypeSchema = z.nativeEnum(LocationsFilterType);

// Location filter schemas
const LocationsFilterBaseSchema = z.object({
  type: LocationsFilterTypeSchema,
  name: z.string().min(1),
});

const CityLocationsFilterSchema = LocationsFilterBaseSchema.extend({
  type: z.literal(LocationsFilterType.CITY),
  country: z.object({
    name: z.string().min(1),
    code: z.string().length(2),
  }),
});

const CountryLocationsFilterSchema = LocationsFilterBaseSchema.extend({
  type: z.literal(LocationsFilterType.COUNTRY),
  code: z.string().length(2),
});

const LocationsFilterSchema = z.discriminatedUnion('type', [
  CityLocationsFilterSchema,
  CountryLocationsFilterSchema,
  // ... other location filter schemas
]);

// Exclusion filter schemas
const ExcludedFilterItemSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(ExcludedFilterItemType.Source),
    value: z.string().min(1),
  }),
  z.object({
    type: z.literal(ExcludedFilterItemType.Language),
    value: LanguagesFiltersSchema,
  }),
  // ... other exclusion schemas
]);

// Main filters state schema
export const FiltersStateSchema = z.object({
  categories: z.array(CategoriesFiltersSchema),
  excluded: z.array(ExcludedFilterItemSchema),
  labels: z.array(z.nativeEnum(LabelsFilters)),
  languages: z.array(LanguagesFiltersSchema),
  locations: z.array(LocationsFilterSchema),
  noDuplicates: z.boolean(),
  sourceLocations: z.array(LocationsFilterSchema),
  sourceGroups: z.array(z.string()),
  sources: z.array(z.string()),
  journalists: z.array(z.string()),
});

// Validation helper
export function validateFiltersState(data: unknown): FiltersState {
  return FiltersStateSchema.parse(data);
}
```

## Best Practices

### 1. Strict Typing Adherence
- ✅ Uses `interface` for object shapes (`FiltersState`, `LocationsFilterBase`)
- ✅ Uses `enum` for reusable string constants (`CategoriesFilters`, `LanguagesFilters`)
- ✅ Uses `const enum` for performance-critical discriminators (`LocationsFilterType`)
- ✅ Leverages discriminated unions for type safety (`LocationsFilter`, `ExcludedFilterItem`)

### 2. Type Safety Patterns
```typescript
// Type-safe filter updates
function updateFilters<K extends keyof FiltersState>(
  filters: FiltersState,
  key: K,
  value: FiltersState[K]
): FiltersState {
  return { ...filters, [key]: value };
}

// Type-safe exclusion creation
function createExclusion<T extends ExcludedFilterItemType>(
  type: T,
  value: ExcludedFilterItemBase<any, T>['value']
): ExcludedFilterItemBase<any, T> {
  return { type, value };
}
```

### 3. Performance Considerations
- Use `const enum` for `LocationsFilterType` and `ExcludedFilterItemType` to enable inlining
- Implement memoization for filter transformations
- Use discriminated unions for efficient type narrowing

### 4. Extensibility
- Generic base interfaces allow easy addition of new filter types
- Union types enable adding new exclusion categories
- Enum values are string-based for serialization compatibility

### 5. Error Handling
```typescript
// Safe filter application
function applyFilters(filters: Partial<FiltersState>): FiltersState {
  const defaultFilters: FiltersState = {
    categories: [],
    excluded: [],
    labels: [],
    languages: [LanguagesFilters.English], // Default to English
    locations: [],
    noDuplicates: true, // Default to removing duplicates
    sourceLocations: [],
    sourceGroups: [],
    sources: [],
    journalists: []
  };

  return { ...defaultFilters, ...filters };
}
```

This type system provides a robust foundation for filtering functionality while maintaining type safety, performance, and extensibility throughout the application.