# ComplexAllEndpointBody Type Documentation

## Purpose

The `ComplexAllEndpointBody` types define the comprehensive request structure for complex news search and filtering operations. These interfaces provide type-safe handling of advanced query parameters and body configuration for news endpoint interactions, supporting complex boolean logic, multi-dimensional filtering, and pagination controls.

## Type Definition

```typescript
import { NewsType } from './news-type';

export interface ComplexAllEndpointQuery {
  // Core search parameters
  q: string;
  prefixQ: string | null;
  
  // Content filtering
  url: string | null;
  imageUrl: string | null;
  title: string | null;
  content: string | null;
  desc: string | null;
  
  // Identifier filtering
  articleId: string | string[] | null;
  clusterId: string | string[] | null;
  reprintGroupId: string | null;
  journalistId: string | string[] | null;
  entityData: string | null;
  
  // Source filtering
  medium: string | string[] | null;
  sourceGroup: string | string[] | null;
  source: string | string[] | null;
  excludeSource: string | string[] | null;
  
  // Geographic filtering
  country: string | string[] | null;
  excludeCountry: string | string[] | null;
  language: string | string[] | null;
  excludeLanguage: string | string[] | null;
  
  // Content classification
  label: string | string[] | null;
  excludeLabel: string | string[] | null;
  category: string | string[] | null;
  excludeCategory: string | string[] | null;
  taxonomy: string | string[] | null;
  excludeTaxonomy: string | string[] | null;
  prefixTaxonomy: string | null;
  
  // Author filtering
  byline: string | string[] | null;
  bylineQ: string | null;
  author: string | string[] | null;
  excludeAuthor: string | string[] | null;
  
  // Topic filtering
  topic: string | string[] | null;
  excludeTopic: string | string[] | null;
  
  // Company filtering
  companyId: string | string[] | null;
  companyName: string | null;
  companyDomain: string | string[] | null;
  companySymbol: string | string[] | null;
  excludeCompanyId: string | string[] | null;
  excludeCompanyDomain: string | string[] | null;
  excludeCompanySymbol: string | string[] | null;
  
  // Person filtering
  personWikidataId: string | string[] | null;
  personName: string | string[] | null;
  excludePersonalWikidataId: string | string[] | null;
  excludePersonName: string | string[] | null;
  
  // Location filtering
  locationsCountry: string | string[] | null;
  state: string | string[] | null;
  city: string | string[] | null;
  area: string | string[] | null;
  county: string | string[] | null;
  location: string | string[] | null;
  
  // Source location filtering
  sourceCountry: string | string[] | null;
  sourceState: string | string[] | null;
  sourceCounty: string | string[] | null;
  sourceCity: string | string[] | null;
  sourceLocation: string | string[] | null;
  
  // Exclude location filtering
  excludeLocationsCountry: string | string[] | null;
  excludeState: string | string[] | null;
  excludeCounty: string | string[] | null;
  excludeCity: string | string[] | null;
  excludeArea: string | string[] | null;
  
  // Sentiment analysis
  positiveSentimentFrom: number | null;
  positiveSentimentTo: number | null;
  negativeSentimentFrom: number | null;
  negativeSentimentTo: number | null;
  neutralSentimentFrom: number | null;
  neutralSentimentTo: number | null;
  
  // Additional filters
  linkTo: string | null;
  searchTranslation: boolean | null;
  paywall: boolean | null;
  type: NewsType | null;
  
  // Boolean logic operators
  AND: Partial<ComplexAllEndpointQuery>[] | null;
  OR: Partial<ComplexAllEndpointQuery>[] | null;
  NOT: Partial<ComplexAllEndpointQuery>[] | null;
}

export interface ComplexAllEndpointBody {
  // Algorithm configuration
  timeDecay: boolean;
  randomSampleSeed: number | null;
  sortBy: string | null;
  
  // Response configuration
  truncateContent: number;
  showNumResults: boolean;
  expandCluster: boolean;
  showReprints: boolean;
  
  // Pagination
  page: number;
  size: number;
  
  // Content filters
  hasCategory: boolean | null;
  hasCompanies: boolean;
  hasPeople: boolean;
  
  // Date filtering
  from: string | null;
  to: string | null;
  addDateFrom: string | null;
  addDateTo: string | null;
  refreshDateFrom: string | null;
  refreshDateTo: string | null;
  
  // Query configuration
  query: Partial<ComplexAllEndpointQuery>;
  highlightQ: string | null;
}
```

## Properties

### ComplexAllEndpointQuery Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `q` | `string` | ✅ | Primary search query string |
| `prefixQ` | `string \| null` | ❌ | Prefix search query |
| `url` | `string \| null` | ❌ | Filter by specific URL |
| `imageUrl` | `string \| null` | ❌ | Filter by image URL presence |
| `title` | `string \| null` | ❌ | Filter by article title |
| `content` | `string \| null` | ❌ | Filter by article content |
| `desc` | `string \| null` | ❌ | Filter by article description |
| `articleId` | `string \| string[] \| null` | ❌ | Filter by article identifier(s) |
| `clusterId` | `string \| string[] \| null` | ❌ | Filter by cluster identifier(s) |
| `reprintGroupId` | `string \| null` | ❌ | Filter by reprint group |
| `journalistId` | `string \| string[] \| null` | ❌ | Filter by journalist identifier(s) |
| `entityData` | `string \| null` | ❌ | Filter by entity data |
| `medium` | `string \| string[] \| null` | ❌ | Filter by media type(s) |
| `sourceGroup` | `string \| string[] \| null` | ❌ | Filter by source group(s) |
| `source` | `string \| string[] \| null` | ❌ | Include specific source(s) |
| `excludeSource` | `string \| string[] \| null` | ❌ | Exclude specific source(s) |
| `country` | `string \| string[] \| null` | ❌ | Include specific country/countries |
| `excludeCountry` | `string \| string[] \| null` | ❌ | Exclude specific country/countries |
| `language` | `string \| string[] \| null` | ❌ | Include specific language(s) |
| `excludeLanguage` | `string \| string[] \| null` | ❌ | Exclude specific language(s) |
| `label` | `string \| string[] \| null` | ❌ | Include specific label(s) |
| `excludeLabel` | `string \| string[] \| null` | ❌ | Exclude specific label(s) |
| `category` | `string \| string[] \| null` | ❌ | Include specific category/categories |
| `excludeCategory` | `string \| string[] \| null` | ❌ | Exclude specific category/categories |
| `taxonomy` | `string \| string[] \| null` | ❌ | Include specific taxonomy/taxonomies |
| `excludeTaxonomy` | `string \| string[] \| null` | ❌ | Exclude specific taxonomy/taxonomies |
| `prefixTaxonomy` | `string \| null` | ❌ | Prefix taxonomy search |
| `byline` | `string \| string[] \| null` | ❌ | Filter by byline(s) |
| `bylineQ` | `string \| null` | ❌ | Byline query string |
| `author` | `string \| string[] \| null` | ❌ | Include specific author(s) |
| `excludeAuthor` | `string \| string[] \| null` | ❌ | Exclude specific author(s) |
| `topic` | `string \| string[] \| null` | ❌ | Include specific topic(s) |
| `excludeTopic` | `string \| string[] \| null` | ❌ | Exclude specific topic(s) |
| `companyId` | `string \| string[] \| null` | ❌ | Filter by company identifier(s) |
| `companyName` | `string \| null` | ❌ | Filter by company name |
| `companyDomain` | `string \| string[] \| null` | ❌ | Include company domain(s) |
| `companySymbol` | `string \| string[] \| null` | ❌ | Include company symbol(s) |
| `excludeCompanyId` | `string \| string[] \| null` | ❌ | Exclude company identifier(s) |
| `excludeCompanyDomain` | `string \| string[] \| null` | ❌ | Exclude company domain(s) |
| `excludeCompanySymbol` | `string \| string[] \| null` | ❌ | Exclude company symbol(s) |
| `personWikidataId` | `string \| string[] \| null` | ❌ | Include person Wikidata ID(s) |
| `personName` | `string \| string[] \| null` | ❌ | Include person name(s) |
| `excludePersonalWikidataId` | `string \| string[] \| null` | ❌ | Exclude person Wikidata ID(s) |
| `excludePersonName` | `string \| string[] \| null` | ❌ | Exclude person name(s) |
| `linkTo` | `string \| null` | ❌ | Filter by link destination |
| `positiveSentimentFrom` | `number \| null` | ❌ | Minimum positive sentiment score |
| `positiveSentimentTo` | `number \| null` | ❌ | Maximum positive sentiment score |
| `negativeSentimentFrom` | `number \| null` | ❌ | Minimum negative sentiment score |
| `negativeSentimentTo` | `number \| null` | ❌ | Maximum negative sentiment score |
| `neutralSentimentFrom` | `number \| null` | ❌ | Minimum neutral sentiment score |
| `neutralSentimentTo` | `number \| null` | ❌ | Maximum neutral sentiment score |
| `searchTranslation` | `boolean \| null` | ❌ | Include translated content in search |
| `paywall` | `boolean \| null` | ❌ | Filter by paywall status |
| `type` | `NewsType \| null` | ❌ | Filter by news type |
| `AND` | `Partial<ComplexAllEndpointQuery>[] \| null` | ❌ | AND boolean logic queries |
| `OR` | `Partial<ComplexAllEndpointQuery>[] \| null` | ❌ | OR boolean logic queries |
| `NOT` | `Partial<ComplexAllEndpointQuery>[] \| null` | ❌ | NOT boolean logic queries |

### ComplexAllEndpointBody Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `timeDecay` | `boolean` | ✅ | Apply time-based relevance decay |
| `randomSampleSeed` | `number \| null` | ❌ | Seed for random sampling |
| `sortBy` | `string \| null` | ❌ | Sort criteria for results |
| `truncateContent` | `number` | ✅ | Content truncation length |
| `showNumResults` | `boolean` | ✅ | Show result count in response |
| `expandCluster` | `boolean` | ✅ | Expand clustered results |
| `page` | `number` | ✅ | Page number for pagination |
| `size` | `number` | ✅ | Number of results per page |
| `showReprints` | `boolean` | ✅ | Include reprint articles |
| `hasCategory` | `boolean \| null` | ❌ | Filter by category presence |
| `hasCompanies` | `boolean` | ✅ | Filter by company mentions |
| `hasPeople` | `boolean` | ✅ | Filter by people mentions |
| `from` | `string \| null` | ❌ | Start date filter (ISO string) |
| `to` | `string \| null` | ❌ | End date filter (ISO string) |
| `addDateFrom` | `string \| null` | ❌ | Start date for addition filter |
| `addDateTo` | `string \| null` | ❌ | End date for addition filter |
| `refreshDateFrom` | `string \| null` | ❌ | Start date for refresh filter |
| `refreshDateTo` | `string \| null` | ❌ | End date for refresh filter |
| `query` | `Partial<ComplexAllEndpointQuery>` | ✅ | Complex query configuration |
| `highlightQ` | `string \| null` | ❌ | Query string for highlighting |

## Usage Examples

### Basic Search Query

```typescript
import { ComplexAllEndpointBody, ComplexAllEndpointQuery } from '@/lib/types/complex-all-endpoint-body';
import { NewsType } from '@/lib/types/news-type';

// Basic search with pagination
const basicSearchBody: ComplexAllEndpointBody = {
  timeDecay: true,
  randomSampleSeed: null,
  sortBy: 'relevance',
  truncateContent: 500,
  showNumResults: true,
  expandCluster: false,
  page: 1,
  size: 20,
  showReprints: false,
  hasCategory: null,
  hasCompanies: false,
  hasPeople: false,
  from: '2024-01-01T00:00:00Z',
  to: '2024-12-31T23:59:59Z',
  query: {
    q: 'artificial intelligence',
    type: NewsType.ARTICLE,
    language: ['en'],
    country: ['US', 'UK']
  },
  highlightQ: 'AI machine learning'
};
```

### Advanced Filtering with Boolean Logic

```typescript
// Complex query with boolean operators
const advancedQuery: Partial<ComplexAllEndpointQuery> = {
  OR: [
    {
      q: 'climate change',
      category: ['environment', 'science']
    },
    {
      q: 'global warming',
      topic: ['environmental-policy']
    }
  ],
  NOT: [
    {
      source: ['unreliable-source.com'],
      excludeLanguage: ['spam']
    }
  ],
  AND: [
    {
      hasCategory: true,
      positiveSentimentFrom: 0.6,
      positiveSentimentTo: 1.0
    }
  ]
};

const complexSearchBody: ComplexAllEndpointBody = {
  timeDecay: false,
  randomSampleSeed: 12345,
  sortBy: 'date',
  truncateContent: 300,
  showNumResults: true,
  expandCluster: true,
  page: 1,
  size: 50,
  showReprints: true,
  hasCategory: true,
  hasCompanies: true,
  hasPeople: true,
  from: '2024-01-01T00:00:00Z',
  to: null,
  addDateFrom: null,
  addDateTo: null,
  refreshDateFrom: null,
  refreshDateTo: null,
  query: advancedQuery,
  highlightQ: 'climate environment'
};
```

### Company and Person Filtering

```typescript
// Search for technology news with specific companies and people
const entitySearchBody: ComplexAllEndpointBody = {
  timeDecay: true,
  randomSampleSeed: null,
  sortBy: 'popularity',
  truncateContent: 400,
  showNumResults: true,
  expandCluster: false,
  page: 1,
  size: 25,
  showReprints: false,
  hasCategory: true,
  hasCompanies: true,
  hasPeople: true,
  from: '2024-01-01T00:00:00Z',
  to: null,
  addDateFrom: null,
  addDateTo: null,
  refreshDateFrom: null,
  refreshDateTo: null,
  query: {
    q: 'technology innovation',
    companySymbol: ['AAPL', 'GOOGL', 'MSFT'],
    excludeCompanyDomain: ['competitor.com'],
    personName: ['Elon Musk', 'Tim Cook'],
    category: ['technology', 'business'],
    sentiment: {
      positiveSentimentFrom: 0.3,
      neutralSentimentFrom: 0.2
    }
  },
  highlightQ: 'innovation tech'
};
```

### Geographic and Source Filtering

```typescript
// News from specific regions with source filtering
const geoFilteredBody: ComplexAllEndpointBody = {
  timeDecay: true,
  randomSampleSeed: null,
  sortBy: 'date',
  truncateContent: 600,
  showNumResults: true,
  expandCluster: false,
  page: 1,
  size: 30,
  showReprints: false,
  hasCategory: null,
  hasCompanies: false,
  hasPeople: false,
  from: null,
  to: null,
  addDateFrom: null,
  addDateTo: null,
  refreshDateFrom: null,
  refreshDateTo: null,
  query: {
    q: 'economic policy',
    country: ['US'],
    state: ['CA', 'NY', 'TX'],
    city: ['San Francisco', 'New York', 'Austin'],
    sourceCountry: ['US'],
    excludeSource: ['biased-source.com'],
    medium: ['newspaper', 'magazine'],
    language: ['en']
  },
  highlightQ: 'economy policy government'
};
```

### Service Integration

```typescript
// Service method using the complex endpoint body
class NewsSearchService {
  async searchComplexNews(
    searchParams: Partial<ComplexAllEndpointBody>
  ): Promise<NewsSearchResponse> {
    const defaultBody: ComplexAllEndpointBody = {
      timeDecay: true,
      randomSampleSeed: null,
      sortBy: 'relevance',
      truncateContent: 500,
      showNumResults: true,
      expandCluster: false,
      page: 1,
      size: 20,
      showReprints: false,
      hasCategory: null,
      hasCompanies: false,
      hasPeople: false,
      from: null,
      to: null,
      addDateFrom: null,
      addDateTo: null,
      refreshDateFrom: null,
      refreshDateTo: null,
      query: { q: '' },
      highlightQ: null
    };

    const requestBody: ComplexAllEndpointBody = {
      ...defaultBody,
      ...searchParams,
      query: {
        ...defaultBody.query,
        ...searchParams.query
      }
    };

    const response = await fetch('/api/news/search/complex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return response.json();
  }
}
```

## Type Architecture Pattern

This type follows our **Request Type** pattern in the type architecture:

```
Domain Objects → Response Types → Request Types
                                      ↑
                            ComplexAllEndpointBody
```

### Architecture Flow

1. **Domain Objects**: `NewsType`, entity identifiers
2. **Response Types**: News search results, paginated responses
3. **Request Types**: `ComplexAllEndpointBody` (this type)

### Pattern Adherence

- **Interfaces over Types**: Uses `interface` declarations for object shapes
- **Strict Typing**: No `any` types, explicit null handling
- **Utility Types**: Leverages `Partial<ComplexAllEndpointQuery>` for flexible query composition
- **Composable Design**: Boolean logic operators allow recursive query composition

## Related Types

### Direct Dependencies
- `NewsType` - Enum/type for news article classification
- Standard TypeScript primitives (`string`, `number`, `boolean`)

### Potential Related Types
```typescript
// Response type that would consume this request
interface NewsSearchResponse {
  articles: NewsArticle[];
  pagination: PaginationInfo;
  totalResults: number;
  searchMetadata: SearchMetadata;
}

// Validation schema type
interface ComplexAllEndpointBodySchema {
  body: ComplexAllEndpointBody;
  query?: Record<string, unknown>;
}

// API endpoint type
interface ComplexSearchEndpoint {
  method: 'POST';
  path: '/api/news/search/complex';
  body: ComplexAllEndpointBody;
  response: NewsSearchResponse;
}
```

## Integration Points

### API Services
```typescript
// news-search.service.ts
import { ComplexAllEndpointBody } from '@/lib/types/complex-all-endpoint-body';

export class NewsSearchService {
  async complexSearch(body: ComplexAllEndpointBody): Promise<NewsSearchResponse>;
}
```

### React Components
```typescript
// SearchForm.tsx
import { ComplexAllEndpointBody } from '@/lib/types/complex-all-endpoint-body';

interface SearchFormProps {
  onSearch: (searchBody: ComplexAllEndpointBody) => void;
  initialQuery?: Partial<ComplexAllEndpointBody>;
}
```

### State Management
```typescript
// search.store.ts
interface SearchState {
  currentQuery: ComplexAllEndpointBody | null;
  searchHistory: ComplexAllEndpointBody[];
  isLoading: boolean;
}
```

### API Routes
```typescript
// /api/news/search/complex/route.ts
import { ComplexAllEndpointBody } from '@/lib/types/complex-all-endpoint-body';

export async function POST(request: Request) {
  const body: ComplexAllEndpointBody = await request.json();
  // Handle search logic
}
```

## Validation

### Zod Schema Example
```typescript
import { z } from 'zod';
import { NewsTypeSchema } from './news-type';

const ComplexAllEndpointQuerySchema: z.ZodType<ComplexAllEndpointQuery> = z.lazy(() =>
  z.object({
    q: z.string(),
    prefixQ: z.string().nullable(),
    url: z.string().url().nullable(),
    imageUrl: z.string().url().nullable(),
    title: z.string().nullable(),
    content: z.string().nullable(),
    desc: z.string().nullable(),
    articleId: z.union([z.string(), z.array(z.string())]).nullable(),
    clusterId: z.union([z.string(), z.array(z.string())]).nullable(),
    reprintGroupId: z.string().nullable(),
    journalistId: z.union([z.string(), z.array(z.string())]).nullable(),
    entityData: z.string().nullable(),
    medium: z.union([z.string(), z.array(z.string())]).nullable(),
    sourceGroup: z.union([z.string(), z.array(z.string())]).nullable(),
    source: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeSource: z.union([z.string(), z.array(z.string())]).nullable(),
    country: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCountry: z.union([z.string(), z.array(z.string())]).nullable(),
    language: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeLanguage: z.union([z.string(), z.array(z.string())]).nullable(),
    label: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeLabel: z.union([z.string(), z.array(z.string())]).nullable(),
    byline: z.union([z.string(), z.array(z.string())]).nullable(),
    bylineQ: z.string().nullable(),
    author: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeAuthor: z.union([z.string(), z.array(z.string())]).nullable(),
    topic: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeTopic: z.union([z.string(), z.array(z.string())]).nullable(),
    category: z.union([z.string(), z.array(z.string())]).nullable(),
    taxonomy: z.union([z.string(), z.array(z.string())]).nullable(),
    prefixTaxonomy: z.string().nullable(),
    companyId: z.union([z.string(), z.array(z.string())]).nullable(),
    companyName: z.string().nullable(),
    companyDomain: z.union([z.string(), z.array(z.string())]).nullable(),
    companySymbol: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCompanyId: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCompanyDomain: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCompanySymbol: z.union([z.string(), z.array(z.string())]).nullable(),
    personWikidataId: z.union([z.string(), z.array(z.string())]).nullable(),
    personName: z.union([z.string(), z.array(z.string())]).nullable(),
    excludePersonalWikidataId: z.union([z.string(), z.array(z.string())]).nullable(),
    excludePersonName: z.union([z.string(), z.array(z.string())]).nullable(),
    linkTo: z.string().nullable(),
    locationsCountry: z.union([z.string(), z.array(z.string())]).nullable(),
    state: z.union([z.string(), z.array(z.string())]).nullable(),
    city: z.union([z.string(), z.array(z.string())]).nullable(),
    area: z.union([z.string(), z.array(z.string())]).nullable(),
    county: z.union([z.string(), z.array(z.string())]).nullable(),
    sourceCountry: z.union([z.string(), z.array(z.string())]).nullable(),
    sourceState: z.union([z.string(), z.array(z.string())]).nullable(),
    sourceCounty: z.union([z.string(), z.array(z.string())]).nullable(),
    sourceCity: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeLocationsCountry: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeState: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCounty: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCity: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeArea: z.union([z.string(), z.array(z.string())]).nullable(),
    location: z.union([z.string(), z.array(z.string())]).nullable(),
    sourceLocation: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeCategory: z.union([z.string(), z.array(z.string())]).nullable(),
    excludeTaxonomy: z.union([z.string(), z.array(z.string())]).nullable(),
    positiveSentimentFrom: z.number().min(0).max(1).nullable(),
    positiveSentimentTo: z.number().min(0).max(1).nullable(),
    negativeSentimentFrom: z.number().min(0).max(1).nullable(),
    negativeSentimentTo: z.number().min(0).max(1).nullable(),
    neutralSentimentFrom: z.number().min(0).max(1).nullable(),
    neutralSentimentTo: z.number().min(0).max(1).nullable(),
    searchTranslation: z.boolean().nullable(),
    paywall: z.boolean().nullable(),
    type: NewsTypeSchema.nullable(),
    AND: z.array(z.lazy(() => ComplexAllEndpointQuerySchema.partial())).nullable(),
    OR: z.array(z.lazy(() => ComplexAllEndpointQuerySchema.partial())).nullable(),
    NOT: z.array(z.lazy(() => ComplexAllEndpointQuerySchema.partial())).nullable(),
  })
);

const ComplexAllEndpointBodySchema = z.object({
  timeDecay: z.boolean(),
  randomSampleSeed: z.number().nullable(),
  sortBy: z.string().nullable(),
  truncateContent: z.number().min(0),
  showNumResults: z.boolean(),
  expandCluster: z.boolean(),
  page: z.number().min(1),
  size: z.number().min(1).max(100),
  showReprints: z.boolean(),
  hasCategory: z.boolean().nullable(),
  hasCompanies: z.boolean(),
  hasPeople: z.boolean(),
  from: z.string().datetime().nullable(),
  to: z.string().datetime().nullable(),
  addDateFrom: z.string().datetime().nullable(),
  addDateTo: z.string().datetime().nullable(),
  refreshDateFrom: z.string().datetime().nullable(),
  refreshDateTo: z.string().datetime().nullable(),
  query: ComplexAllEndpointQuerySchema.partial(),
  highlightQ: z.string().nullable(),
});
```

### Runtime Validation
```typescript
export function validateComplexSearchBody(data: unknown): ComplexAllEndpointBody {
  return ComplexAllEndpointBodySchema.parse(data);
}

export function isValidComplexSearchBody(data: unknown): data is ComplexAllEndpointBody {
  return ComplexAllEndpointBodySchema.safeParse(data).success;
}
```

## Best Practices

### Type Safety Guidelines

1. **Always use the complete interface**: Don't create