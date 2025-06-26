# AllEndpointParams Type Documentation

## Purpose

The `AllEndpointParams` interface defines a comprehensive set of query parameters for news API endpoints. It serves as a centralized type definition for filtering, searching, and configuring news data requests across various news-related endpoints. This type acts as the primary request parameter shape for news API interactions, supporting complex filtering by content, location, sentiment, companies, people, and more.

## Type Definition

### Main Interface

```typescript
export interface AllEndpointParams {
  // Search parameters
  q?: string;
  prefixQ?: string;
  qField?: QParamSearchFields | QParamSearchFields[];
  
  // Content filters
  url?: string;
  imageUrl?: string;
  title?: string;
  content?: string;
  desc?: string;
  
  // Date ranges
  from?: string;
  to?: string;
  addDateFrom?: string;
  addDateTo?: string;
  refreshDateFrom?: string;
  refreshDateTo?: string;
  
  // Entity filters
  articleId?: string | string[];
  clusterId?: string | string[];
  companyId?: string | string[];
  personWikidataId?: string | string[];
  
  // Geographic filters
  country?: string | string[];
  state?: string | string[];
  city?: string | string[];
  
  // Sentiment analysis
  positiveSentimentFrom?: number;
  negativeSentimentTo?: number;
  
  // Response configuration
  sortBy?: 'relevance' | 'date' | 'reverseDate' | 'reverseAddDate' | 'addDate' | 'pubDate' | 'refreshDate';
  page?: number;
  size?: number;
  type?: NewsType;
  
  // ... additional properties
}
```

### Supporting Enum

```typescript
const enum QParamSearchFields {
  TITLE = 'title',
  DESCRIPTION = 'description',
  CONTENT = 'content',
  SUMMARY = 'summary',
}
```

## Properties

### Search & Query Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `q` | `string` | No | Main search query string |
| `prefixQ` | `string` | No | Prefix search query |
| `qField` | `QParamSearchFields \| QParamSearchFields[]` | No | Fields to search within |
| `highlightQ` | `string` | No | Query string for highlighting |

### Content Filters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | `string` | No | Filter by article URL |
| `imageUrl` | `string` | No | Filter by image URL |
| `title` | `string` | No | Filter by article title |
| `content` | `string` | No | Filter by article content |
| `desc` | `string` | No | Filter by article description |

### Date Range Filters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `from` | `string` | No | Start date for publication date range |
| `to` | `string` | No | End date for publication date range |
| `addDateFrom` | `string` | No | Start date for when article was added |
| `addDateTo` | `string` | No | End date for when article was added |
| `refreshDateFrom` | `string` | No | Start date for last refresh |
| `refreshDateTo` | `string` | No | End date for last refresh |

### Entity Identification

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `articleId` | `string \| string[]` | No | Filter by specific article ID(s) |
| `clusterId` | `string \| string[]` | No | Filter by article cluster ID(s) |
| `companyId` | `string \| string[]` | No | Filter by company ID(s) |
| `personWikidataId` | `string \| string[]` | No | Filter by person Wikidata ID(s) |

### Geographic Filters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `country` | `string \| string[]` | No | Filter by country |
| `state` | `string \| string[]` | No | Filter by state/province |
| `city` | `string \| string[]` | No | Filter by city |
| `lat` | `number` | No | Latitude for geographic search |
| `lon` | `number` | No | Longitude for geographic search |
| `maxDistance` | `number` | No | Maximum distance from lat/lon |

### Sentiment Analysis

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `positiveSentimentFrom` | `number` | No | Minimum positive sentiment score |
| `positiveSentimentTo` | `number` | No | Maximum positive sentiment score |
| `negativeSentimentFrom` | `number` | No | Minimum negative sentiment score |
| `negativeSentimentTo` | `number` | No | Maximum negative sentiment score |

### Response Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `sortBy` | `'relevance' \| 'date' \| 'reverseDate' \| 'addDate' \| 'pubDate' \| 'refreshDate'` | No | Sort order for results |
| `page` | `number` | No | Page number for pagination |
| `size` | `number` | No | Number of results per page |
| `type` | `NewsType` | No | Type of news content |

## Usage Examples

### Basic Search Query

```typescript
import { AllEndpointParams, QParamSearchFields } from '@/lib/types/all-endpoint-params';

// Simple text search
const basicSearch: AllEndpointParams = {
  q: "artificial intelligence",
  qField: QParamSearchFields.TITLE,
  sortBy: "relevance",
  size: 20,
  page: 1
};

// Multiple field search
const multiFieldSearch: AllEndpointParams = {
  q: "climate change",
  qField: [QParamSearchFields.TITLE, QParamSearchFields.CONTENT],
  from: "2024-01-01",
  to: "2024-12-31"
};
```

### Advanced Filtering

```typescript
// Geographic and company filtering
const advancedFilter: AllEndpointParams = {
  q: "renewable energy",
  country: ["US", "CA"],
  state: ["CA", "NY", "TX"],
  companyId: ["company-123", "company-456"],
  positiveSentimentFrom: 0.7,
  showCompanies: true,
  sortBy: "date"
};

// Exclusion filters
const exclusionFilter: AllEndpointParams = {
  q: "technology",
  excludeSource: ["excluded-source-1"],
  excludeCategory: ["entertainment"],
  excludeLanguage: ["es"],
  language: ["en"]
};
```

### Pagination and Display Configuration

```typescript
// Paginated results with highlighting
const paginatedSearch: AllEndpointParams = {
  q: "machine learning",
  page: 2,
  size: 50,
  showHighlighting: true,
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>",
  truncateContent: 500,
  showNumResults: true
};
```

### API Service Integration

```typescript
class NewsService {
  async searchNews(params: AllEndpointParams): Promise<NewsResponse> {
    const searchParams = new URLSearchParams();
    
    // Type-safe parameter building
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
    
    return fetch(`/api/news/search?${searchParams}`)
      .then(res => res.json());
  }
  
  async getNewsByLocation(
    location: Pick<AllEndpointParams, 'lat' | 'lon' | 'maxDistance' | 'country'>
  ): Promise<NewsResponse> {
    return this.searchNews({
      ...location,
      sortBy: 'date',
      size: 25
    });
  }
}
```

## Type Architecture Pattern

### Domain Layer → Request Layer → Response Layer

```typescript
// 1. Domain Objects (base entities)
interface NewsArticle {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
}

// 2. Request Types (this interface)
interface AllEndpointParams {
  // Comprehensive parameter set for API requests
}

// 3. Response Types (built from domain objects)
interface NewsSearchResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  size: number;
}
```

### Utility Type Extensions

```typescript
// Common parameter subsets
type SearchParams = Pick<AllEndpointParams, 'q' | 'qField' | 'prefixQ'>;
type DateRangeParams = Pick<AllEndpointParams, 'from' | 'to' | 'addDateFrom' | 'addDateTo'>;
type GeographicParams = Pick<AllEndpointParams, 'country' | 'state' | 'city' | 'lat' | 'lon'>;
type PaginationParams = Pick<AllEndpointParams, 'page' | 'size' | 'sortBy'>;

// Composed parameter types
type BasicNewsSearch = SearchParams & PaginationParams;
type LocationBasedSearch = GeographicParams & SearchParams & PaginationParams;
```

## Related Types

### Dependencies

```typescript
import { NewsType } from './news-type';  // Defines article type classification
```

### Common Compositions

```typescript
// Frequently used parameter combinations
type ArticleSearchParams = Pick<AllEndpointParams, 
  'q' | 'qField' | 'from' | 'to' | 'sortBy' | 'page' | 'size'>;

type CompanyNewsParams = Pick<AllEndpointParams,
  'companyId' | 'companyName' | 'companyDomain' | 'excludeCompanyId'>;

type SentimentFilterParams = Pick<AllEndpointParams,
  'positiveSentimentFrom' | 'positiveSentimentTo' | 'negativeSentimentFrom' | 'negativeSentimentTo'>;
```

## Integration Points

### React Components

```typescript
interface NewsSearchProps {
  initialParams?: Partial<AllEndpointParams>;
  onParamsChange?: (params: AllEndpointParams) => void;
}

const NewsSearch: React.FC<NewsSearchProps> = ({ initialParams, onParamsChange }) => {
  const [searchParams, setSearchParams] = useState<AllEndpointParams>(
    initialParams || {}
  );
  
  const handleSearch = useCallback((newParams: Partial<AllEndpointParams>) => {
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);
    onParamsChange?.(updatedParams);
  }, [searchParams, onParamsChange]);
  
  // Component implementation
};
```

### API Route Handlers

```typescript
// Next.js API route
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Type-safe parameter extraction
  const params: AllEndpointParams = {
    q: searchParams.get('q') || undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
    size: searchParams.get('size') ? Number(searchParams.get('size')) : undefined,
    country: searchParams.getAll('country'),
    sortBy: searchParams.get('sortBy') as AllEndpointParams['sortBy'],
  };
  
  const results = await newsService.search(params);
  return Response.json(results);
}
```

## Validation

### Zod Schema Pattern

```typescript
import { z } from 'zod';

const QParamSearchFieldsSchema = z.enum(['title', 'description', 'content', 'summary']);

const AllEndpointParamsSchema = z.object({
  q: z.string().optional(),
  prefixQ: z.string().optional(),
  qField: z.union([
    QParamSearchFieldsSchema,
    z.array(QParamSearchFieldsSchema)
  ]).optional(),
  
  // Date validation
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  
  // Numeric validation
  page: z.number().int().min(1).optional(),
  size: z.number().int().min(1).max(100).optional(),
  
  // Geographic validation
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
  
  // Sentiment validation
  positiveSentimentFrom: z.number().min(0).max(1).optional(),
  positiveSentimentTo: z.number().min(0).max(1).optional(),
  
  sortBy: z.enum([
    'relevance', 'date', 'reverseDate', 'reverseAddDate', 
    'addDate', 'pubDate', 'refreshDate'
  ]).optional(),
}).strict();

// Type inference from schema
type ValidatedAllEndpointParams = z.infer<typeof AllEndpointParamsSchema>;
```

### Runtime Validation Helper

```typescript
export function validateEndpointParams(params: unknown): AllEndpointParams {
  const result = AllEndpointParamsSchema.safeParse(params);
  
  if (!result.success) {
    throw new Error(`Invalid endpoint parameters: ${result.error.message}`);
  }
  
  return result.data;
}
```

## Best Practices

### 1. Type Safety with Utility Types

```typescript
// Use Pick for specific parameter subsets
function buildSearchQuery(params: Pick<AllEndpointParams, 'q' | 'qField' | 'sortBy'>) {
  // Type-safe implementation
}

// Use Partial for optional updates
function updateSearchParams(
  current: AllEndpointParams, 
  updates: Partial<AllEndpointParams>
): AllEndpointParams {
  return { ...current, ...updates };
}
```

### 2. Enum Usage Adherence

```typescript
// Correct: Using const enum for internal values
const searchField = QParamSearchFields.TITLE; // ✅

// Avoid: String literals for reusable values
const badSearchField = 'title'; // ❌
```

### 3. Interface Composition

```typescript
// Build specific interfaces from the comprehensive base
interface NewsSearchFormData extends Pick<AllEndpointParams, 
  'q' | 'from' | 'to' | 'country' | 'language'> {
  // Additional form-specific properties
  rememberSearch?: boolean;
}
```

### 4. Default Value Patterns

```typescript
const DEFAULT_SEARCH_PARAMS: Required<Pick<AllEndpointParams, 'page' | 'size' | 'sortBy'>> = {
  page: 1,
  size: 20,
  sortBy: 'relevance'
} as const;

function searchNews(params: AllEndpointParams = {}) {
  const finalParams = { ...DEFAULT_SEARCH_PARAMS, ...params };
  // Implementation with guaranteed required fields
}
```

### 5. Type Guards for Array Parameters

```typescript
function normalizeArrayParam<T>(value: T | T[] | undefined): T[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

// Usage with type safety
const countries = normalizeArrayParam(params.country); // string[] | undefined
```

This comprehensive interface serves as the foundation for all news API interactions, providing type safety while maintaining flexibility for diverse search and filtering requirements across the application.