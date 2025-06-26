# Article Type Definition

## Purpose

The `article.ts` file defines the core data structure for representing news articles and related metadata in our application. This type system handles article content, search results, highlighting, and comprehensive metadata including geolocation, sentiment analysis, entity recognition, and various categorization schemes. It serves as the foundational domain object for all article-related operations across the application.

## Type Definition

### Core Types Structure

```typescript
// Search container type
export interface ArticlesSearchResult<T> {
  status: number;
  numResults: number;
  articles: T[];
}

// Highlighting for search results
export interface ArticleHighlight {
  content: string[];
  title: string[];
}

// Main domain object
export interface Article {
  // Core identification
  url: string;
  articleId: string;
  clusterId: string;
  
  // Content
  title: string;
  description: string;
  content: string;
  
  // Metadata
  source: SourceHolder;
  authorsByline: string;
  pubDate: string;
  addDate: string;
  refreshDate: string;
  
  // Analysis results
  sentiment: SentimentHolder;
  topics: TopicHolder[];
  categories: CategoryHolder[];
  entities: EntityHolder[];
  
  // Optional features
  highlights?: ArticleHighlight;
  labels?: LabelHolder[];
}
```

### Supporting Interfaces

```typescript
interface SourceHolder {
  domain: string;
  paywall: boolean;
  location: SourceLocation | null;
}

interface LabelHolder {
  name: string;
}

interface IdNameHolder {
  id: string | null;
  name: string;
}

interface KeywordHolder {
  name: string;
  weight: number;
}

interface EntityHolder {
  data: string;
  type: string;
  mentions: number;
}

interface Place {
  osmId: string;
  road: string;
  quarter: string;
  suburb: string;
  city: string;
  town: string;
  county: string;
  stateDistrict: string;
  state: string;
  postcode: string;
  country: string;
  countryCode: string;
  amenity: string;
  neighbourhood: string;
  coordinates: Coordinate;
}
```

## Properties

### ArticlesSearchResult\<T\>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `number` | ✓ | HTTP status code of the search operation |
| `numResults` | `number` | ✓ | Total number of results found |
| `articles` | `T[]` | ✓ | Array of article objects (generic type) |

### ArticleHighlight

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `content` | `string[]` | ✓ | Highlighted text snippets from article content |
| `title` | `string[]` | ✓ | Highlighted text snippets from article title |

### Article

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | `string` | ✓ | Original article URL |
| `authorsByline` | `string` | ✓ | Author attribution string |
| `articleId` | `string` | ✓ | Unique article identifier |
| `clusterId` | `string` | ✓ | Related articles cluster ID |
| `imageUrl` | `string` | ✓ | Article image URL (may be empty string) |
| `source` | `SourceHolder` | ✓ | Source publication information |
| `country` | `string` | ✓ | Country of publication |
| `language` | `string` | ✓ | Article language code |
| `pubDate` | `string` | ✓ | Publication date (ISO string) |
| `addDate` | `string` | ✓ | Date added to system (ISO string) |
| `refreshDate` | `string` | ✓ | Last refresh date (ISO string) |
| `score` | `number` | ✓ | Relevance or quality score |
| `title` | `string` | ✓ | Article title |
| `description` | `string` | ✓ | Article description/summary |
| `content` | `string` | ✓ | Full article content |
| `medium` | `string` | ✓ | Publication medium type |
| `links` | `string[]` | ✓ | External links found in article |
| `labels` | `LabelHolder[]` | ✗ | Optional content labels |
| `matchedAuthors` | `IdNameHolder[]` | ✓ | Authors with system IDs |
| `claim` | `string` | ✓ | Fact-check claim (if applicable) |
| `verdict` | `string` | ✓ | Fact-check verdict (if applicable) |
| `keywords` | `KeywordHolder[]` | ✓ | Extracted keywords with weights |
| `topics` | `TopicHolder[]` | ✓ | Topic classifications |
| `categories` | `CategoryHolder[]` | ✓ | Category classifications |
| `entities` | `EntityHolder[]` | ✓ | Named entities found |
| `companies` | `CompanyHolder[]` | ✓ | Company entities mentioned |
| `sentiment` | `SentimentHolder` | ✓ | Sentiment analysis results |
| `summary` | `string` | ✓ | AI-generated summary |
| `translation` | `string` | ✓ | Translated content (if applicable) |
| `translatedTitle` | `string` | ✓ | Translated title |
| `translatedDescription` | `string` | ✓ | Translated description |
| `translatedSummary` | `string` | ✓ | Translated summary |
| `locations` | `LocationHolder[]` | ✓ | Location entities mentioned |
| `reprint` | `boolean` | ✓ | Whether article is a reprint |
| `reprintGroupId` | `string` | ✓ | Group ID for reprints |
| `places` | `Place[]` | ✓ | Detailed geographic place data |
| `people` | `PersonHolder[]` | ✓ | People mentioned in article |
| `highlights` | `ArticleHighlight` | ✗ | Search result highlights |

## Usage Examples

### Basic Article Display

```typescript
import { Article } from '@/lib/types/article';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Handle empty imageUrl gracefully
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className="article-card">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          onError={handleImageError}
        />
      )}
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <div className="metadata">
        <span>Source: {article.source.domain}</span>
        <span>Published: {new Date(article.pubDate).toLocaleDateString()}</span>
        {article.source.paywall && <span className="paywall">Paywall</span>}
      </div>
    </div>
  );
}
```

### Search Results with Highlighting

```typescript
import { ArticlesSearchResult, Article, ArticleHighlight } from '@/lib/types/article';

interface SearchResultsProps {
  results: ArticlesSearchResult<Article>;
  searchTerm: string;
}

export function SearchResults({ results }: SearchResultsProps) {
  const renderHighlights = (highlights: ArticleHighlight | undefined) => {
    if (!highlights) return null;
    
    return (
      <div className="highlights">
        {highlights.title.map((highlight, index) => (
          <div key={`title-${index}`} dangerouslySetInnerHTML={{ __html: highlight }} />
        ))}
        {highlights.content.slice(0, 3).map((highlight, index) => (
          <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: highlight }} />
        ))}
      </div>
    );
  };

  return (
    <div className="search-results">
      <h2>Found {results.numResults} articles</h2>
      {results.articles.map((article) => (
        <div key={article.articleId} className="search-result">
          <h3>{article.title}</h3>
          {renderHighlights(article.highlights)}
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Entity and Topic Analysis

```typescript
import { Article } from '@/lib/types/article';

export function ArticleAnalysis({ article }: { article: Article }) {
  const topKeywords = article.keywords
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  const entitiesByType = article.entities.reduce((acc, entity) => {
    acc[entity.type] = acc[entity.type] || [];
    acc[entity.type].push(entity);
    return acc;
  }, {} as Record<string, typeof article.entities>);

  return (
    <div className="article-analysis">
      <section>
        <h4>Top Keywords</h4>
        {topKeywords.map((keyword, index) => (
          <span key={index} className="keyword">
            {keyword.name} ({keyword.weight.toFixed(2)})
          </span>
        ))}
      </section>

      <section>
        <h4>Topics</h4>
        {article.topics.map((topic, index) => (
          <span key={index} className="topic">{topic.name}</span>
        ))}
      </section>

      <section>
        <h4>Entities</h4>
        {Object.entries(entitiesByType).map(([type, entities]) => (
          <div key={type}>
            <h5>{type}</h5>
            {entities.map((entity, index) => (
              <span key={index}>{entity.data} ({entity.mentions})</span>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
```

### Geographic Information Display

```typescript
import { Article, Place } from '@/lib/types/article';

export function ArticleLocations({ article }: { article: Article }) {
  const formatPlace = (place: Place): string => {
    const parts = [place.city, place.state, place.country].filter(Boolean);
    return parts.join(', ') || place.road || 'Unknown location';
  };

  return (
    <div className="article-locations">
      <h4>Mentioned Locations</h4>
      
      {article.locations.length > 0 && (
        <div className="location-entities">
          {article.locations.map((location, index) => (
            <span key={index} className="location-tag">
              {location.name}
            </span>
          ))}
        </div>
      )}

      {article.places.length > 0 && (
        <div className="detailed-places">
          {article.places.map((place, index) => (
            <div key={place.osmId || index} className="place">
              <span>{formatPlace(place)}</span>
              <small>
                {place.coordinates.lat.toFixed(4)}, {place.coordinates.lng.toFixed(4)}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Type Architecture Pattern

This type follows our domain-first architecture pattern:

### 1. Domain Objects (Current Layer)
```typescript
// Core business entities
interface Article { /* comprehensive article data */ }
interface Place { /* geographic data */ }
interface SourceHolder { /* publication source */ }
```

### 2. Response Types (Built from Domain Objects)
```typescript
// API response containers
interface ArticlesSearchResult<T> {
  status: number;
  numResults: number;
  articles: T[];
}

// Specialized response types
type ArticleSearchResponse = ArticlesSearchResult<Article>;
type ArticlePreviewResponse = ArticlesSearchResult<Pick<Article, 'title' | 'description' | 'url'>>;
```

### 3. Request Types (Derived from Domain Needs)
```typescript
// Search and filter parameters
interface ArticleSearchParams {
  query?: string;
  categories?: string[];
  dateFrom?: string;
  dateTo?: string;
  sources?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

// Update operations
type ArticleUpdateRequest = Partial<Pick<Article, 'labels' | 'claim' | 'verdict'>>;
```

## Related Types

### Direct Dependencies
- `CategoryHolder` - Article categorization
- `CompanyHolder` - Company entity data
- `Coordinate` - Geographic coordinates
- `LocationHolder` - Location entity data
- `PersonHolder` - Person entity data
- `SentimentHolder` - Sentiment analysis results
- `SourceLocation` - Publication source location
- `TopicHolder` - Topic classification

### Derived Types
```typescript
// Utility types for different use cases
type ArticlePreview = Pick<Article, 'title' | 'description' | 'url' | 'imageUrl' | 'pubDate'>;
type ArticleMetadata = Pick<Article, 'source' | 'country' | 'language' | 'pubDate'>;
type ArticleAnalytics = Pick<Article, 'sentiment' | 'topics' | 'categories' | 'entities'>;

// Search-specific types
interface SearchableArticle extends Article {
  highlights: ArticleHighlight; // Make highlights required for search results
}
```

## Integration Points

### Services
```typescript
// Article API service
class ArticleService {
  async searchArticles(params: ArticleSearchParams): Promise<ArticlesSearchResult<Article>> {
    // Implementation
  }
  
  async getArticle(id: string): Promise<Article> {
    // Implementation
  }
}
```

### Components
- `ArticleCard` - Display article previews
- `ArticleDetail` - Full article view
- `SearchResults` - Search result listings
- `ArticleAnalysis` - Entity and topic analysis
- `ArticleMap` - Geographic visualization

### State Management
```typescript
// Zustand store example
interface ArticleStore {
  articles: Article[];
  searchResults: ArticlesSearchResult<Article> | null;
  selectedArticle: Article | null;
  filters: ArticleSearchParams;
}
```

## Validation

### Zod Schema Example
```typescript
import { z } from 'zod';

const SourceHolderSchema = z.object({
  domain: z.string(),
  paywall: z.boolean(),
  location: z.union([SourceLocationSchema, z.null()]),
});

const ArticleSchema = z.object({
  url: z.string().url(),
  authorsByline: z.string(),
  articleId: z.string(),
  clusterId: z.string(),
  imageUrl: z.string(), // Note: may be empty string
  source: SourceHolderSchema,
  title: z.string().min(1),
  description: z.string(),
  content: z.string(),
  pubDate: z.string().datetime(),
  score: z.number().min(0),
  keywords: z.array(z.object({
    name: z.string(),
    weight: z.number(),
  })),
  highlights: z.object({
    content: z.array(z.string()),
    title: z.array(z.string()),
  }).optional(),
  // ... other fields
});

type ValidatedArticle = z.infer<typeof ArticleSchema>;
```

## Best Practices

### 1. Type Safety with Utility Types
```typescript
// Create focused interfaces for specific use cases
type ArticleCardData = Pick<Article, 'title' | 'description' | 'imageUrl' | 'url' | 'pubDate' | 'source'>;

interface ArticleCardProps {
  article: ArticleCardData;
  onClick?: (articleId: string) => void;
}
```

### 2. Handle Optional Fields Gracefully
```typescript
// Safe access to optional fields
function getArticleLabels(article: Article): string[] {
  return article.labels?.map(label => label.name) ?? [];
}

// Safe rendering of highlights
function renderHighlights(highlights: ArticleHighlight | undefined) {
  if (!highlights?.content.length) return null;
  // Render logic
}
```

### 3. Type Guards for Runtime Safety
```typescript
function isArticleWithHighlights(article: Article): article is Article & { highlights: ArticleHighlight } {
  return article.highlights !== undefined;
}

// Usage
if (isArticleWithHighlights(article)) {
  // TypeScript knows highlights is defined
  console.log(article.highlights.content);
}
```

### 4. Generic Search Results
```typescript
// Flexible search results for different article projections
function useArticleSearch<T = Article>(
  params: ArticleSearchParams,
  projection?: keyof Article[]
): ArticlesSearchResult<T> {
  // Implementation handles different return types
}
```

### 5. Immutable Updates
```typescript
// Safe article updates using utility types
function updateArticleLabels(
  article: Article, 
  newLabels: LabelHolder[]
): Article {
  return {
    ...article,
    labels: newLabels,
  };
}
```

This type definition serves as the cornerstone of our article data model, providing comprehensive typing for all article-related operations while maintaining flexibility for different use cases and ensuring type safety throughout the application.