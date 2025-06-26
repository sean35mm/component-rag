# ArticleWithCluster Type Documentation

## Purpose

The `ArticleWithCluster` interface represents an enhanced article domain object that includes clustering information. This type extends the base `Article` interface to associate articles with their related story clusters, enabling grouped content presentation and narrative threading across related articles.

This type is essential for content aggregation features where articles are grouped by topics, themes, or story developments, providing users with contextual relationships between related content.

## Type Definition

```typescript
import { Article } from './article';
import { Story } from './story';

export interface ArticleWithCluster extends Article {
  cluster: Story;
}
```

### Structure Breakdown

- **Base Type**: Extends `Article` interface using TypeScript's interface extension
- **Extension**: Adds a `cluster` property of type `Story`
- **Composition**: Follows composition pattern by including a complete `Story` object rather than just an ID reference

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `cluster` | `Story` | ✅ | The story cluster that this article belongs to, containing metadata about the grouped narrative |
| ...Article properties | - | - | Inherits all properties from the base `Article` interface |

> **Note**: For complete Article properties, refer to the [Article type documentation](./article.md)

## Usage Examples

### Component Integration

```typescript
import { ArticleWithCluster } from '@/lib/types/article-with-cluster';

interface ArticleClusterCardProps {
  article: ArticleWithCluster;
  onClusterClick: (clusterId: string) => void;
}

const ArticleClusterCard: React.FC<ArticleClusterCardProps> = ({ 
  article, 
  onClusterClick 
}) => {
  return (
    <div className="article-cluster-card">
      <h2>{article.title}</h2>
      <p>{article.summary}</p>
      
      {/* Cluster information */}
      <div className="cluster-info">
        <button 
          onClick={() => onClusterClick(article.cluster.id)}
          className="cluster-tag"
        >
          📚 {article.cluster.title}
        </button>
        <span className="cluster-count">
          {article.cluster.articleCount} related articles
        </span>
      </div>
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { ArticleWithCluster } from '@/lib/types/article-with-cluster';

class ArticleClusterService {
  async getArticlesWithClusters(): Promise<ArticleWithCluster[]> {
    const response = await fetch('/api/articles/with-clusters');
    const data = await response.json();
    
    // Type-safe response handling
    return data.articles as ArticleWithCluster[];
  }

  async getClusterById(clusterId: string): Promise<ArticleWithCluster[]> {
    const response = await fetch(`/api/clusters/${clusterId}/articles`);
    const data = await response.json();
    
    return data.articles as ArticleWithCluster[];
  }

  // Utility function to group articles by cluster
  groupArticlesByCluster(articles: ArticleWithCluster[]): Map<string, ArticleWithCluster[]> {
    return articles.reduce((clusters, article) => {
      const clusterId = article.cluster.id;
      if (!clusters.has(clusterId)) {
        clusters.set(clusterId, []);
      }
      clusters.get(clusterId)!.push(article);
      return clusters;
    }, new Map<string, ArticleWithCluster[]>());
  }
}
```

### Hook Implementation

```typescript
import { useState, useEffect } from 'react';
import { ArticleWithCluster } from '@/lib/types/article-with-cluster';

interface UseArticleClustersReturn {
  articles: ArticleWithCluster[];
  loading: boolean;
  error: string | null;
  clusteredArticles: Map<string, ArticleWithCluster[]>;
}

export const useArticleClusters = (): UseArticleClustersReturn => {
  const [articles, setArticles] = useState<ArticleWithCluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clusteredArticles = useMemo(() => {
    return articles.reduce((acc, article) => {
      const clusterId = article.cluster.id;
      if (!acc.has(clusterId)) {
        acc.set(clusterId, []);
      }
      acc.get(clusterId)!.push(article);
      return acc;
    }, new Map<string, ArticleWithCluster[]>());
  }, [articles]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const service = new ArticleClusterService();
        const data = await service.getArticlesWithClusters();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error, clusteredArticles };
};
```

## Type Architecture Pattern

This type follows our established architecture pattern:

```
Domain Objects → Response Types → Request Types
     ↓              ↓              ↓
ArticleWithCluster → API Response → Request Payload
```

### Domain Layer (Current)
```typescript
// Core domain object with rich cluster information
interface ArticleWithCluster extends Article {
  cluster: Story;
}
```

### Response Layer
```typescript
// API response wrapper
interface ArticleClusterResponse {
  articles: ArticleWithCluster[];
  pagination: PaginationMeta;
  totalClusters: number;
}

// Single article with cluster response
interface ArticleWithClusterResponse {
  article: ArticleWithCluster;
  relatedArticles: Pick<ArticleWithCluster, 'id' | 'title' | 'cluster'>[];
}
```

### Request Layer
```typescript
// Request for clustered articles
interface ArticleClusterRequest {
  clusterId?: string;
  limit?: number;
  offset?: number;
  includeRelated?: boolean;
}
```

## Related Types

### Direct Dependencies
- **`Article`** - Base interface that this type extends
- **`Story`** - Cluster information included in this type

### Composition Types
```typescript
// Utility types for specific use cases
type ArticleClusterSummary = Pick<ArticleWithCluster, 'id' | 'title' | 'cluster'>;
type ArticleWithClusterMeta = ArticleWithCluster & {
  clusterPosition: number;
  isClusterLead: boolean;
};

// Partial type for updates
type ArticleClusterUpdate = Partial<Pick<ArticleWithCluster, 'cluster'>> & {
  articleId: string;
};
```

### Related Interfaces
```typescript
// For cluster navigation
interface ClusterNavigation {
  currentArticle: ArticleWithCluster;
  previousInCluster?: ArticleWithCluster;
  nextInCluster?: ArticleWithCluster;
  clusterOverview: Story;
}
```

## Integration Points

### Frontend Components
- **Article Cards**: Displaying articles with cluster badges
- **Cluster Views**: Showing all articles in a story cluster
- **Navigation**: Cluster-based article navigation
- **Search Results**: Grouped search results by cluster

### API Endpoints
- `GET /api/articles/with-clusters` - Fetch articles with cluster data
- `GET /api/clusters/:id/articles` - Get articles in specific cluster
- `POST /api/articles/:id/cluster` - Assign article to cluster

### State Management
- **Article Store**: Managing clustered article collections
- **Cluster Store**: Story cluster metadata and relationships
- **Navigation Store**: Cluster-based routing and breadcrumbs

## Validation

### Zod Schema
```typescript
import { z } from 'zod';
import { ArticleSchema } from './article';
import { StorySchema } from './story';

export const ArticleWithClusterSchema = ArticleSchema.extend({
  cluster: StorySchema,
});

// Validation function
export const validateArticleWithCluster = (data: unknown): ArticleWithCluster => {
  return ArticleWithClusterSchema.parse(data);
};

// Array validation
export const ArticleWithClusterArraySchema = z.array(ArticleWithClusterSchema);
```

### Runtime Validation
```typescript
// Type guard
export const isArticleWithCluster = (obj: unknown): obj is ArticleWithCluster => {
  try {
    ArticleWithClusterSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
};

// Safe parsing with error handling
export const safeParseArticleWithCluster = (data: unknown) => {
  const result = ArticleWithClusterSchema.safeParse(data);
  return result.success ? result.data : null;
};
```

## Best Practices

### 1. **Strict Typing Adherence** ✅
- Uses interface extension over type unions
- Maintains strict typing through composition
- No use of `any` type

### 2. **Interface over Type** ✅
- Implements as `interface` for object shape definition
- Leverages interface extension capabilities
- Maintains consistency with type architecture

### 3. **Composition Pattern** ✅
```typescript
// ✅ Good: Full object composition
interface ArticleWithCluster extends Article {
  cluster: Story;
}

// ❌ Avoid: ID-only reference without context
interface ArticleWithCluster extends Article {
  clusterId: string;
}
```

### 4. **Utility Type Integration**
```typescript
// Leverage TypeScript utilities for variations
type ArticleClusterPreview = Pick<ArticleWithCluster, 'id' | 'title' | 'cluster'>;
type OptionalCluster = Omit<ArticleWithCluster, 'cluster'> & {
  cluster?: Story;
};
```

### 5. **Type Safety in Usage**
```typescript
// ✅ Type-safe cluster access
const getClusterTitle = (article: ArticleWithCluster): string => {
  return article.cluster.title; // No null checks needed
};

// ✅ Proper error handling with validation
const processClusteredArticle = (data: unknown) => {
  const article = safeParseArticleWithCluster(data);
  if (!article) {
    throw new Error('Invalid article cluster data');
  }
  return article;
};
```

This type definition exemplifies our commitment to strict typing and clean type architecture, providing a robust foundation for cluster-aware article functionality throughout the application.