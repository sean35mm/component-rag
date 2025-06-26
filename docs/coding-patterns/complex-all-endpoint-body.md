# Complex All Endpoint Body Pattern

## Pattern Overview

The **Complex All Endpoint Body Pattern** is a comprehensive TypeScript interface design that defines the structure for complex news API endpoint requests. This pattern is specifically designed for news aggregation systems that require sophisticated querying capabilities with extensive filtering, pagination, and logical operators.

### When to Use This Pattern

- Building news aggregation or content management APIs
- Implementing complex search functionality with multiple filter criteria
- Creating systems that require logical query operations (AND, OR, NOT)
- Developing APIs that need extensive customization of results and metadata

## Architecture

The pattern consists of two main interfaces organized in a hierarchical structure:

```
ComplexAllEndpointBody (Root Interface)
├── Query Configuration (Basic parameters)
├── Result Configuration (Pagination, formatting)
├── Date Filtering (Multiple date ranges)
└── query: ComplexAllEndpointQuery (Nested complex query)
    ├── Content Filters (text, media, metadata)
    ├── Entity Filters (companies, people, locations)
    ├── Sentiment Analysis (positive, negative, neutral ranges)
    └── Logical Operators (AND, OR, NOT with recursive structure)
```

### Key Architectural Decisions

1. **Separation of Concerns**: Query logic separated from result configuration
2. **Recursive Structure**: Logical operators support nested query composition
3. **Flexible Typing**: Union types (`string | string[]`) support both single and multiple values
4. **Nullable Design**: Extensive use of `null` unions for optional parameters

## Implementation Details

### Core Interface Structure

```typescript
// Main request body interface
export interface ComplexAllEndpointBody {
  // Result configuration
  timeDecay: boolean;
  page: number;
  size: number;
  sortBy: string | null;
  
  // Content formatting
  truncateContent: number;
  showNumResults: boolean;
  expandCluster: boolean;
  
  // Nested complex query
  query: Partial<ComplexAllEndpointQuery>;
}
```

### Flexible Parameter Design

The pattern uses union types to support both single and multiple values:

```typescript
// Supports both single string and array of strings
source: string | string[] | null;
country: string | string[] | null;
companyId: string | string[] | null;
```

### Recursive Logical Operations

```typescript
// Self-referencing structure for complex logical queries
AND: Partial<ComplexAllEndpointQuery>[] | null;
OR: Partial<ComplexAllEndpointQuery>[] | null;
NOT: Partial<ComplexAllEndpointQuery>[] | null;
```

## Usage Examples

### Basic Query Implementation

```typescript
import { ComplexAllEndpointBody, ComplexAllEndpointQuery } from './complex-all-endpoint-body';

// Simple search query
const basicQuery: ComplexAllEndpointBody = {
  timeDecay: false,
  randomSampleSeed: null,
  sortBy: 'publishedAt',
  truncateContent: 500,
  showNumResults: true,
  expandCluster: false,
  page: 1,
  size: 20,
  showReprints: false,
  hasCategory: null,
  hasCompanies: false,
  hasPeople: false,
  from: '2024-01-01',
  to: '2024-01-31',
  addDateFrom: null,
  addDateTo: null,
  refreshDateFrom: null,
  refreshDateTo: null,
  query: {
    q: 'artificial intelligence',
    language: 'en',
    country: ['US', 'GB', 'CA']
  },
  highlightQ: 'AI OR "machine learning"'
};
```

### Complex Logical Query

```typescript
// Advanced query with logical operators
const complexQuery: ComplexAllEndpointBody = {
  timeDecay: true,
  sortBy: 'relevance',
  page: 1,
  size: 50,
  truncateContent: 1000,
  showNumResults: true,
  expandCluster: true,
  showReprints: false,
  hasCompanies: true,
  hasPeople: true,
  from: '2024-01-01',
  to: null,
  query: {
    AND: [
      {
        q: 'technology',
        category: 'business'
      },
      {
        OR: [
          { companyName: 'Apple' },
          { companyName: 'Google' },
          { companySymbol: ['MSFT', 'AMZN'] }
        ]
      }
    ],
    NOT: [
      {
        excludeCategory: 'sports',
        excludeLanguage: ['es', 'fr']
      }
    ],
    positiveSentimentFrom: 0.7,
    positiveSentimentTo: 1.0
  },
  highlightQ: null
};
```

### API Endpoint Implementation

```typescript
// Express.js endpoint using the pattern
import express from 'express';
import { ComplexAllEndpointBody } from '../types/complex-all-endpoint-body';

const router = express.Router();

router.post('/news/search', async (req: express.Request, res: express.Response) => {
  try {
    // Type-safe request body parsing
    const searchRequest: ComplexAllEndpointBody = req.body;
    
    // Validate required fields
    if (!searchRequest.query.q && !searchRequest.query.AND && !searchRequest.query.OR) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    
    // Process the complex query
    const results = await processNewsQuery(searchRequest);
    
    res.json({
      data: results,
      pagination: {
        page: searchRequest.page,
        size: searchRequest.size,
        total: results.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Best Practices

### 1. Input Validation

```typescript
// Implement comprehensive validation
function validateComplexQuery(body: ComplexAllEndpointBody): string[] {
  const errors: string[] = [];
  
  // Validate pagination
  if (body.page < 1) errors.push('Page must be >= 1');
  if (body.size < 1 || body.size > 1000) errors.push('Size must be between 1-1000');
  
  // Validate date ranges
  if (body.from && body.to && new Date(body.from) > new Date(body.to)) {
    errors.push('From date must be before to date');
  }
  
  // Validate sentiment ranges
  const query = body.query;
  if (query.positiveSentimentFrom && query.positiveSentimentTo) {
    if (query.positiveSentimentFrom > query.positiveSentimentTo) {
      errors.push('Invalid positive sentiment range');
    }
  }
  
  return errors;
}
```

### 2. Default Value Management

```typescript
// Create a factory function for default values
function createDefaultComplexQuery(): ComplexAllEndpointBody {
  return {
    timeDecay: false,
    randomSampleSeed: null,
    sortBy: 'publishedAt',
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
    query: {},
    highlightQ: null
  };
}

// Usage with partial updates
const customQuery = {
  ...createDefaultComplexQuery(),
  page: 2,
  size: 50,
  query: {
    q: 'breaking news',
    country: 'US'
  }
};
```

### 3. Type Guards for Runtime Safety

```typescript
// Implement type guards for runtime validation
function isValidNewsType(type: any): type is NewsType {
  return Object.values(NewsType).includes(type);
}

function sanitizeQueryBody(body: any): ComplexAllEndpointBody {
  const sanitized = createDefaultComplexQuery();
  
  // Safe property assignment with type checking
  if (typeof body.page === 'number' && body.page > 0) {
    sanitized.page = body.page;
  }
  
  if (typeof body.size === 'number' && body.size > 0 && body.size <= 1000) {
    sanitized.size = body.size;
  }
  
  // Handle query object
  if (body.query && typeof body.query === 'object') {
    sanitized.query = { ...body.query };
  }
  
  return sanitized;
}
```

## Integration

### Database Query Builder Integration

```typescript
// Convert complex query to database query
class NewsQueryBuilder {
  private query: ComplexAllEndpointQuery;
  
  constructor(query: ComplexAllEndpointQuery) {
    this.query = query;
  }
  
  toSQL(): { sql: string; params: any[] } {
    const conditions: string[] = [];
    const params: any[] = [];
    
    // Handle basic text search
    if (this.query.q) {
      conditions.push('MATCH(title, content) AGAINST (? IN BOOLEAN MODE)');
      params.push(this.query.q);
    }
    
    // Handle array parameters
    if (this.query.country) {
      const countries = Array.isArray(this.query.country) 
        ? this.query.country 
        : [this.query.country];
      conditions.push(`country IN (${countries.map(() => '?').join(',')})`);
      params.push(...countries);
    }
    
    // Handle logical operators recursively
    if (this.query.AND) {
      const andConditions = this.query.AND.map(subQuery => 
        new NewsQueryBuilder(subQuery).toSQL()
      );
      // Combine AND conditions...
    }
    
    return {
      sql: `SELECT * FROM news WHERE ${conditions.join(' AND ')}`,
      params
    };
  }
}
```

### API Client Integration

```typescript
// Type-safe API client
class NewsAPIClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async searchNews(query: ComplexAllEndpointBody): Promise<NewsSearchResponse> {
    const response = await fetch(`${this.baseUrl}/news/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}
```

## Type Safety

### Strict Type Definitions

```typescript
// Enhance type safety with branded types
type NonEmptyString = string & { readonly __brand: unique symbol };
type PositiveNumber = number & { readonly __brand: unique symbol };

// Enhanced interface with stricter types
export interface StrictComplexAllEndpointBody 
  extends Omit<ComplexAllEndpointBody, 'page' | 'size'> {
  page: PositiveNumber;
  size: PositiveNumber;
  query: StrictComplexAllEndpointQuery;
}

export interface StrictComplexAllEndpointQuery 
  extends Omit<ComplexAllEndpointQuery, 'q'> {
  q: NonEmptyString;
}
```

### Utility Types for Flexibility

```typescript
// Create utility types for common use cases
type RequiredQuery<T extends keyof ComplexAllEndpointQuery> = 
  ComplexAllEndpointQuery & Required<Pick<ComplexAllEndpointQuery, T>>;

type TextSearchQuery = RequiredQuery<'q'>;
type CompanySearchQuery = RequiredQuery<'companyName' | 'companyId'>;
type LocationSearchQuery = RequiredQuery<'country' | 'city'>;

// Usage examples
const textSearch: TextSearchQuery = {
  q: 'climate change', // Required
  country: 'US',       // Optional
  // ... other optional fields
};
```

## Performance

### Query Optimization Strategies

```typescript
// Implement query optimization
class QueryOptimizer {
  static optimizeComplexQuery(query: ComplexAllEndpointQuery): ComplexAllEndpointQuery {
    const optimized = { ...query };
    
    // Remove empty arrays and null values
    Object.keys(optimized).forEach(key => {
      const value = optimized[key as keyof ComplexAllEndpointQuery];
      if (Array.isArray(value) && value.length === 0) {
        delete optimized[key as keyof ComplexAllEndpointQuery];
      }
      if (value === null || value === undefined) {
        delete optimized[key as keyof ComplexAllEndpointQuery];
      }
    });
    
    // Flatten nested logical operations where possible
    if (optimized.AND && optimized.AND.length === 1) {
      // Merge single AND operation into parent
      const singleAnd = optimized.AND[0];
      Object.assign(optimized, singleAnd);
      delete optimized.AND;
    }
    
    return optimized;
  }
}
```

### Caching Strategy

```typescript
// Implement intelligent caching
class QueryCache {
  private cache = new Map<string, { result: any; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes
  
  private generateCacheKey(body: ComplexAllEndpointBody): string {
    // Create deterministic hash of query parameters
    const normalized = this.normalizeQuery(body);
    return JSON.stringify(normalized);
  }
  
  private normalizeQuery(body: ComplexAllEndpointBody): any {
    // Sort arrays and remove timestamp-sensitive fields for caching
    const normalized = { ...body };
    
    // Remove pagination for cache key (different pages same query)
    delete normalized.page;
    
    // Sort arrays for consistent cache keys
    if (normalized.query.country && Array.isArray(normalized.query.country)) {
      normalized.query.country = [...normalized.query.country].sort();
    }
    
    return normalized;
  }
  
  get(body: ComplexAllEndpointBody): any | null {
    const key = this.generateCacheKey(body);
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.result;
    }
    
    return null;
  }
  
  set(body: ComplexAllEndpointBody, result: any): void {
    const key = this.generateCacheKey(body);
    this.cache.set(key, { result, timestamp: Date.now() });
  }
}
```

## Testing

### Unit Testing Strategy

```typescript
import { describe, it, expect } from 'vitest';
import { ComplexAllEndpointBody, ComplexAllEndpointQuery } from '../complex-all-endpoint-body';

describe('ComplexAllEndpointBody', () => {
  describe('Type Validation', () => {
    it('should accept valid basic query', () => {
      const validQuery: ComplexAllEndpointBody = {
        timeDecay: false,
        randomSampleSeed: null,
        sortBy: 'publishedAt',
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
        query: {
          q: 'test query'
        },
        highlightQ: null
      };
      
      expect(validQuery.query.q).toBe('test query');
      expect(validQuery.page).toBe(1);
    });
    
    it('should handle complex logical operations', () => {
      const complexQuery: Partial<ComplexAllEndpointQuery> = {
        AND: [
          { q: 'technology' },
          { 
            OR: [
              { companyName: 'Apple' },
              { companyName: 'Google' }
            ]
          }
        ],
        NOT: [
          { excludeCategory: 'sports' }
        ]
      };
      
      expect(complexQuery.AND).toHaveLength(2);
      expect(complexQuery.AND![1].OR).toHaveLength(2);
      expect(complexQuery.NOT![0].excludeCategory).toBe('sports');
    });
  });
  
  describe('Query Builder Integration', () => {
    it('should convert to SQL correctly', () => {
      const query: ComplexAllEndpointQuery = {
        q: 'artificial intelligence',
        country: ['US', 'GB'],
        positiveSentimentFrom: 0.5,
        positiveSentimentTo: 1.0
      };
      
      const builder = new NewsQueryBuilder(query);
      const { sql, params } = builder.toSQL();
      
      expect(sql).toContain('MATCH(title, content) AGAINST');
      expect(sql).toContain('country IN');
      expect(params).toContain('artificial intelligence');
      expect(params).toContain('US');
      expect(params).toContain('GB');
    });
  });
});
```

### Integration Testing

```typescript
// Test API endpoint integration
describe('News Search API', () => {
  let app: express.Application;
  
  beforeEach(() => {
    app = createTestApp();
  });
  
  it('should handle complex search queries', async () => {
    const searchBody: ComplexAllEndpointBody = {
      // ... complete test body
      query: {
        q: 'climate change',
        country: ['US', 'CA'],
        AND: [
          { category: 'environment' },
          { positiveSentimentFrom: 0.6 }
        ]
      }
    };
    
    const response = await request(app)
      .post('/api/news/search')
      .send(searchBody)
      .expect(200);
    
    expect(response.body.data).toBeDefined();
    expect(response.body.pagination.page).toBe(searchBody.page);
  });
  
  it('should validate required parameters', async () => {
    const invalidBody = {
      page: 1,
      size: 20,
      query: {} // Empty query should fail
    };
    
    await request(app)
      .post('/api/news/search')
      .send(invalidBody)
      .expect(400);
  });
});
```

## Common Pitfalls

### 1. Null vs Undefined Handling

```typescript
// ❌ Problematic - mixing null and undefined
const badQuery: Partial<ComplexAllEndpointQuery> = {
  q: 'search term',
  country: undefined, // Should be null
  language: null
};

// ✅ Correct - consistent null usage
const goodQuery: Partial<ComplexAllEndpointQuery> = {
  q: 'search term',
  country: null,
  language: null
};
```

### 2. Logical Operator Complexity

```typescript
// ❌ Overly complex nested structure
const overlyComplex: Partial<ComplexAllEndpointQuery> = {
  AND: [
    {
      OR: [
        {
          AND: [
            { q: 'term1' },
            { 
              NOT: [{ excludeCategory: 'sports' }] 
            }
          ]
        }
      ]
    }
  ]
};

// ✅ Simplified equivalent
const simplified: Partial<ComplexAllEndpointQuery> = {
  q: 'term1',
  excludeCategory: 'sports'
};
```

### 3. Array Parameter Confusion

```typescript
// ❌ Inconsistent array handling
function processCountries(countries: string | string[] | null) {
  if (countries) {
    // This will fail if countries is a string
    return countries.map(c => c.toUpperCase()); // TypeError!
  }
}

// ✅ Proper array normalization
function processCountriesCorrectly(countries: string | string[] | null): string[] {
  if (!countries) return [];
  
  const countryArray = Array.isArray(countries) ? countries : [countries];
  return countryArray.map(c => c.toUpperCase());
}
```

### 4. Date Range Validation Issues

```typescript
// ❌ Missing date validation
const riskyQuery: ComplexAllEndpointBody = {
  // ...other fields
  from: '2024-12-31',
  to: '2024-01-01', // End before start!
  query: {}
};

// ✅ Proper date validation
function validateDateRange(from: string | null, to: string | null): boolean {
  if (!from || !to) return true; // Allow partial ranges
  
  const fromDate = new Date(from);
  const toDate = new Date(to);
  
  return fromDate <= toDate;
}
```

### 5. Performance Issues with Deep Nesting

```typescript
// ❌ Inefficient deep recursive processing
function processQueryNaively(query: Partial<ComplexAllEndpointQuery>): any {
  // Processes every level every time, causing exponential complexity
  if (query.AND) {
    query.AND.forEach(subQuery => processQueryNaively(subQuery));
  }
  if (query.OR) {
    query.OR.forEach(subQuery => processQueryNaively(subQuery));
  }
  // ... repeated processing
}

// ✅ Optimized processing with memoization
const queryCache = new WeakMap();

function processQueryEfficiently(query: Partial<ComplexAllEndpointQuery>): any {
  if (queryCache.has(query)) {
    return queryCache.get(query);
  }
  
  const result = {
    /* processed query */
  };
  
  queryCache.set(query, result);
  return result;
}
```

This comprehensive pattern provides a robust foundation for building complex news API endpoints with extensive querying capabilities while maintaining type safety and performance.