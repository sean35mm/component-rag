# Journalist Type Definition

## Purpose

The `Journalist` type represents a comprehensive profile of a journalist or media professional within the application. This domain object encapsulates all relevant information about a journalist including their basic information, social media presence, content analytics, and professional associations. It serves as the core data structure for journalist-related features such as profiles, search results, and analytics dashboards.

## Type Definition

```typescript
import { LocationHolder } from './location-holder';

interface NameCount {
  name: string;
  count: number;
}

export interface Journalist {
  id: string;
  name: string;
  title: string;
  locations: LocationHolder[];
  topTopics: NameCount[];
  topSources: NameCount[];
  topCategories: NameCount[];
  topLabels: NameCount[];
  topCountries: NameCount[];
  avgMonthlyPosts: number;
  twitterHandle: string;
  twitterBio: string;
  imageUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  websiteUrl: string;
  blogUrl: string;
  tumblrUrl: string;
  youtubeUrl: string;
}
```

## Properties

### Core Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the journalist |
| `name` | `string` | ✅ | Full name of the journalist |
| `title` | `string` | ✅ | Professional title or role |
| `locations` | `LocationHolder[]` | ✅ | Geographic locations associated with the journalist |

### Analytics Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `topTopics` | `NameCount[]` | ✅ | Most frequently covered topics with occurrence counts |
| `topSources` | `NameCount[]` | ✅ | Most referenced sources with usage counts |
| `topCategories` | `NameCount[]` | ✅ | Primary content categories with frequency data |
| `topLabels` | `NameCount[]` | ✅ | Associated labels or tags with counts |
| `topCountries` | `NameCount[]` | ✅ | Countries of coverage focus with post counts |
| `avgMonthlyPosts` | `number` | ✅ | Average number of posts per month |

### Social Media & Web Presence

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `twitterHandle` | `string` | ✅ | Twitter username without @ symbol |
| `twitterBio` | `string` | ✅ | Twitter profile biography |
| `imageUrl` | `string` | ✅ | Profile image URL |
| `linkedinUrl` | `string` | ✅ | LinkedIn profile URL |
| `facebookUrl` | `string` | ✅ | Facebook profile URL |
| `instagramUrl` | `string` | ✅ | Instagram profile URL |
| `websiteUrl` | `string` | ✅ | Personal or professional website URL |
| `blogUrl` | `string` | ✅ | Blog URL |
| `tumblrUrl` | `string` | ✅ | Tumblr profile URL |
| `youtubeUrl` | `string` | ✅ | YouTube channel URL |

## Usage Examples

### Basic Usage in Components

```typescript
import { Journalist } from '@/lib/types/journalist';

interface JournalistProfileProps {
  journalist: Journalist;
}

const JournalistProfile: React.FC<JournalistProfileProps> = ({ journalist }) => {
  return (
    <div className="journalist-profile">
      <img src={journalist.imageUrl} alt={journalist.name} />
      <h1>{journalist.name}</h1>
      <h2>{journalist.title}</h2>
      <p>Average Monthly Posts: {journalist.avgMonthlyPosts}</p>
      
      {/* Social Media Links */}
      {journalist.twitterHandle && (
        <a href={`https://twitter.com/${journalist.twitterHandle}`}>
          @{journalist.twitterHandle}
        </a>
      )}
    </div>
  );
};
```

### Working with Analytics Data

```typescript
const JournalistAnalytics: React.FC<{ journalist: Journalist }> = ({ journalist }) => {
  const topTopics = journalist.topTopics
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="analytics-section">
      <h3>Top Topics</h3>
      {topTopics.map((topic) => (
        <div key={topic.name} className="topic-item">
          <span>{topic.name}</span>
          <span className="count">{topic.count} posts</span>
        </div>
      ))}
    </div>
  );
};
```

### Service Layer Usage

```typescript
class JournalistService {
  async getJournalist(id: string): Promise<Journalist> {
    const response = await fetch(`/api/journalists/${id}`);
    return response.json();
  }

  async searchJournalists(query: string): Promise<Journalist[]> {
    const response = await fetch(`/api/journalists/search?q=${query}`);
    return response.json();
  }

  getTopTopicsByCount(journalist: Journalist, limit: number = 10): NameCount[] {
    return journalist.topTopics
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
}
```

## Type Architecture Pattern

Following our domain-first architecture, the `Journalist` type serves as the foundational domain object:

### Domain Object (Current)
```typescript
export interface Journalist {
  // Core domain properties
}
```

### Response Types (Derived)
```typescript
// API response wrapper
export interface JournalistResponse {
  data: Journalist;
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

// List response
export interface JournalistListResponse {
  journalists: Journalist[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
```

### Request Types (Derived)
```typescript
// Create/Update operations
export interface CreateJournalistRequest extends Omit<Journalist, 'id'> {}

export interface UpdateJournalistRequest extends Partial<Omit<Journalist, 'id'>> {}

// Search and filtering
export interface JournalistSearchRequest {
  query?: string;
  locations?: string[];
  topics?: string[];
  minAvgPosts?: number;
}
```

## Related Types

### Dependencies
- `LocationHolder` - Imported from `./location-holder` for geographic data
- `NameCount` - Internal interface for analytics data structures

### Utility Types
```typescript
// Profile view with minimal data
export type JournalistProfile = Pick<
  Journalist, 
  'id' | 'name' | 'title' | 'imageUrl' | 'twitterHandle'
>;

// Analytics-focused view
export type JournalistAnalytics = Pick<
  Journalist,
  'id' | 'topTopics' | 'topSources' | 'topCategories' | 'avgMonthlyPosts'
>;

// Social media links only
export type JournalistSocialMedia = Pick<
  Journalist,
  'twitterHandle' | 'linkedinUrl' | 'facebookUrl' | 'instagramUrl' | 
  'websiteUrl' | 'blogUrl' | 'tumblrUrl' | 'youtubeUrl'
>;
```

## Integration Points

### Frontend Components
- **Journalist Profile Pages** - Full journalist display
- **Search Results** - Journalist listing and filtering
- **Analytics Dashboards** - Data visualization components
- **Social Media Integration** - Links and profile connections

### Backend Services
- **Journalist API** - CRUD operations and search endpoints
- **Analytics Service** - Metrics calculation and aggregation
- **Social Media Sync** - Profile data synchronization
- **Content Analysis** - Topic and source categorization

### Database Layer
- **Journalist Collection** - Primary storage
- **Analytics Cache** - Computed metrics storage
- **Search Index** - Full-text search optimization

## Validation

### Zod Schema Example
```typescript
import { z } from 'zod';

const NameCountSchema = z.object({
  name: z.string().min(1),
  count: z.number().int().min(0)
});

export const JournalistSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  locations: z.array(LocationHolderSchema),
  topTopics: z.array(NameCountSchema),
  topSources: z.array(NameCountSchema),
  topCategories: z.array(NameCountSchema),
  topLabels: z.array(NameCountSchema),
  topCountries: z.array(NameCountSchema),
  avgMonthlyPosts: z.number().min(0),
  twitterHandle: z.string().regex(/^[A-Za-z0-9_]+$/),
  twitterBio: z.string().max(280),
  imageUrl: z.string().url(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  blogUrl: z.string().url().optional().or(z.literal('')),
  tumblrUrl: z.string().url().optional().or(z.literal('')),
  youtubeUrl: z.string().url().optional().or(z.literal(''))
});
```

## Best Practices

### Type Safety
- **Strict Interface Adherence** - All properties are required, use utility types for partial data
- **Avoid Any Types** - All properties have explicit types
- **Nested Type Safety** - Uses imported `LocationHolder` and defined `NameCount` interfaces

### Architecture Alignment
- **Domain-First Design** - Represents business domain accurately
- **Interface Over Type** - Uses `interface` for extensibility
- **Composition** - Composes with `LocationHolder` rather than inline definitions

### Usage Patterns
```typescript
// ✅ Good: Type-safe property access
const getJournalistSummary = (journalist: Journalist): string => {
  return `${journalist.name} - ${journalist.title} (${journalist.avgMonthlyPosts} posts/month)`;
};

// ✅ Good: Using utility types for partial operations
const updateJournalistProfile = async (
  id: string, 
  updates: Partial<Pick<Journalist, 'name' | 'title' | 'imageUrl'>>
): Promise<Journalist> => {
  // Implementation
};

// ❌ Avoid: Accessing potentially undefined properties without checks
const badExample = (journalist: Journalist) => {
  // All properties are required, but still validate URLs before use
  if (journalist.websiteUrl) {
    window.open(journalist.websiteUrl);
  }
};
```

### Performance Considerations
- **Lazy Loading** - Consider splitting large analytics arrays for better performance
- **Memoization** - Cache computed values from analytics data
- **Selective Fetching** - Use utility types to fetch only needed properties