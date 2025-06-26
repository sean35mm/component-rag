# TypeScript Type Index Module

## Purpose

The `src/lib/types/index.ts` module serves as the central export hub for the entire type system architecture. This barrel export pattern provides a single entry point for importing types across the application, ensuring consistent type access and maintaining clean dependency management. It aggregates over 80 distinct type modules covering domain objects, API interfaces, UI components, and business logic entities.

## Module Architecture

### Export Structure

```typescript
// Central type system exports
export * from './access-mode';
export * from './access-token';
export * from './all-endpoint-params';
// ... 80+ additional type modules
```

### Type Categories

The exported types follow our architectural pattern and can be categorized as:

#### Domain Objects (Core Business Entities)
- `article`, `company`, `person`, `organization`
- `journalist`, `story`, `topic`
- `user`, `source`, `location-holder`

#### API & Request/Response Types  
- `all-endpoint-params`, `complex-all-endpoint-body`
- `standard-search-result`, `custom-search-result`
- `pagination-params`, `query-options`

#### Authentication & Authorization
- `access-mode`, `access-token`, `api-key`
- `organization-member`, `user-feedback`

#### UI & Component Types
- `framer-variants`, `next-js-page-props`, `error-page-props`
- `tabs`, `omnibar`, `filters-state`

#### Business Logic & Analytics
- `billing-mode`, `billing-plan`, `billing-price`
- `stats`, `stat-result`, `record-stat-holder`
- `monitors`, `signal`, `sentiment-holder`

## Usage Examples

### Importing Types

```typescript
// Single type import
import type { Article } from '@/lib/types';

// Multiple related types
import type { 
  Organization, 
  OrganizationMember, 
  OrganizationBilling,
  OrganizationLimits 
} from '@/lib/types';

// Service layer usage
import type {
  StandardSearchResult,
  PaginationParams,
  QueryOptions
} from '@/lib/types';
```

### Component Integration

```typescript
// React component with strict typing
interface NewsComponentProps {
  articles: Article[];
  pagination: PaginationParams;
  filters: FiltersState;
}

const NewsComponent: React.FC<NewsComponentProps> = ({ 
  articles, 
  pagination, 
  filters 
}) => {
  // Component implementation
};
```

### Service Layer Implementation

```typescript
// API service with comprehensive typing
class NewsService {
  async searchArticles(
    params: AllEndpointParams,
    options: QueryOptions
  ): Promise<StandardSearchResult<Article>> {
    // Service implementation
  }

  async getOrganizationStats(
    orgId: string
  ): Promise<Stats> {
    // Stats retrieval
  }
}
```

### Type Composition Patterns

```typescript
// Combining domain types with utility types
interface ArticleWithMetadata extends Article {
  metadata: Pick<Story, 'velocity' | 'sentiment'>;
  cluster?: ArticleWithCluster;
}

// Request type composition
interface SearchRequest {
  params: AllEndpointParams;
  body: ComplexAllEndpointBody;
  pagination: PaginationParams;
  filters: Partial<FiltersState>;
}
```

## Type Architecture Pattern

### Domain-First Approach

```typescript
// 1. Domain Objects (Foundation)
Article → Company → Person → Organization

// 2. Response Shapes (API Layer)
StandardSearchResult<Article> → CustomSearchResult → SliceResult

// 3. Request Types (Client Layer)  
AllEndpointParams → ComplexAllEndpodyBody → QueryOptions
```

### Composition Hierarchy

```typescript
// Base entities
User → Organization → OrganizationMember
Article → Story → Topic → Signal

// Enhanced compositions
ArticleWithCluster → SavedStory → StoryHistoryRecord
OrganizationBilling → BillingPlan → BillingPrice
```

## Integration Points

### Frontend Components
- **Search Interface**: `omnibar`, `filters-state`, `search`
- **Content Display**: `article`, `story`, `news-type`
- **User Management**: `user`, `organization-member`, `access-mode`

### API Services
- **Search Endpoints**: `all-endpoint-params`, `standard-search-result`
- **Authentication**: `access-token`, `api-key`
- **Billing**: `organization-billing`, `billing-plan`

### State Management
- **Redux/Zustand Stores**: Domain objects as state shapes
- **Form Validation**: Request types for form schemas
- **Cache Keys**: Type-safe cache key generation

## Related Type Dependencies

### Core Dependencies
```typescript
// Utility types enhance domain objects
WithoutNullish<T> → sanitizes nullable fields
Partial<FiltersState> → optional filter application
Pick<Organization, 'id' | 'name'> → selective organization data
```

### Cross-Module Relationships
```typescript
// Complex type relationships
Article + ArticleWithCluster + Source + Journalist
Organization + OrganizationMember + OrganizationBilling + User
Story + StoryHistoryRecord + StoryVelocity + Topic
```

## Validation Patterns

### Zod Schema Integration

```typescript
// Type-first validation approach
import { z } from 'zod';
import type { Article, Organization } from '@/lib/types';

const ArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string(),
  publishedAt: z.date(),
  source: z.object({
    name: z.string(),
    domain: z.string().url()
  })
}) satisfies z.ZodType<Article>;
```

### Runtime Type Checking

```typescript
// Type guards for runtime safety
function isArticle(data: unknown): data is Article {
  return ArticleSchema.safeParse(data).success;
}

function isOrganizationMember(data: unknown): data is OrganizationMember {
  return typeof data === 'object' && 
         data !== null && 
         'userId' in data && 
         'organizationId' in data;
}
```

## Best Practices

### Import Optimization
```typescript
// ✅ Preferred: Specific imports from barrel export
import type { Article, Company, Person } from '@/lib/types';

// ❌ Avoid: Deep imports bypass the barrel pattern
import type { Article } from '@/lib/types/article';
```

### Type Composition
```typescript
// ✅ Leverage utility types
interface EditableUser extends Omit<User, 'id' | 'createdAt'> {
  tempId?: string;
}

// ✅ Interface extension over type intersection
interface EnhancedArticle extends Article {
  analytics: Pick<Stats, 'views' | 'shares'>;
}
```

### Strict Typing Enforcement
```typescript
// ✅ Explicit return types
function processArticles(articles: Article[]): StandardSearchResult<Article> {
  // Implementation
}

// ✅ Avoid any, use unknown for flexible typing
function parseApiResponse(data: unknown): Article | null {
  if (isArticle(data)) {
    return data;
  }
  return null;
}
```

### Type Architecture Adherence
```typescript
// ✅ Follow domain → response → request pattern
interface ArticleSearchRequest {
  query: string;
  filters: Partial<FiltersState>;
  pagination: PaginationParams;
}

interface ArticleSearchResponse {
  results: StandardSearchResult<Article>;
  metadata: SearchMetadata;
}
```

This centralized type index ensures type consistency, enables efficient tree-shaking, and provides a scalable foundation for the application's type system architecture.