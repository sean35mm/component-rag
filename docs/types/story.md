# Story Type Definitions

## Purpose

The `Story` type system represents the domain model for news stories in the application. A story is an aggregated collection of related articles about the same topic or event, containing analyzed metadata such as sentiment, key points, entities (people, companies, locations), and statistical information. This type serves as the core domain object for story-related features including story display, search, and analytics.

## Type Definition

### Core Interfaces

```typescript
interface PersonCount {
  wikidataId: string;
  name: string;
  count: number;
}

interface CompanyCount {
  id: string;
  name: string;
  domains: string[];
  symbols: string[];
  count: number;
}

interface LocationCount {
  state: string;
  county: string;
  city: string;
  area: string;
  count: number;
}

interface Story {
  // Timestamps
  createdAt: string;
  updatedAt: string;
  initializedAt: string;
  
  // Identity
  id: string;
  name: string;
  
  // Content
  summary: string;
  summaryReferences?: string[];
  keyPoints: KeyPoint[];
  questions?: Question[];
  
  // Analytics
  sentiment: SentimentHolder;
  uniqueCount: number;
  reprintCount: number;
  totalCount: number;
  
  // Entity Collections
  countries: RecordStatHolder[];
  topCountries: string[];
  topics: RecordStatHolder[];
  topTopics: TopicHolder[];
  categories: RecordStatHolder[];
  topCategories: CategoryHolder[];
  people: PersonCount[];
  topPeople: PersonHolder[];
  companies: CompanyCount[];
  topCompanies: CompanyHolder[];
  locations: LocationCount[];
  topLocations: LocationHolder[];
  
  // Media
  imageUrl?: string;
}
```

### Composition Interfaces

```typescript
interface WithPageInfo {
  duplicateOf?: string;
  slug?: string;
  imageUrl?: string;
  imageSource?: Pick<Source, 'domain' | 'location' | 'paywall'>;
  uniqueSources: string[];
}

interface WithSelectedArticles {
  selectedArticles: Article[];
}

// Composed Story Types
interface StoryWithPageInfo extends Story, WithPageInfo {}
interface StoryWithSelectedArticles extends Story, WithSelectedArticles {}
interface StoryWithPageInfoAndSelectedArticles 
  extends Story, WithPageInfo, WithSelectedArticles {}
```

## Properties

### Story Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `createdAt` | `string` | ✅ | ISO timestamp when story was created |
| `updatedAt` | `string` | ✅ | ISO timestamp of last update |
| `initializedAt` | `string` | ✅ | ISO timestamp when story was initialized |
| `id` | `string` | ✅ | Unique story identifier |
| `name` | `string` | ✅ | Story title/headline |
| `summary` | `string` | ✅ | AI-generated story summary |
| `summaryReferences` | `string[]` | ❌ | References used in summary generation |
| `keyPoints` | `KeyPoint[]` | ✅ | Important points extracted from articles |
| `questions` | `Question[]` | ❌ | Questions related to the story |
| `sentiment` | `SentimentHolder` | ✅ | Aggregated sentiment analysis |
| `uniqueCount` | `number` | ✅ | Number of unique articles |
| `reprintCount` | `number` | ✅ | Number of reprinted articles |
| `totalCount` | `number` | ✅ | Total article count |
| `countries` | `RecordStatHolder[]` | ✅ | Country statistics |
| `topCountries` | `string[]` | ✅ | Most mentioned countries |
| `topics` | `RecordStatHolder[]` | ✅ | Topic statistics |
| `topTopics` | `TopicHolder[]` | ✅ | Most relevant topics |
| `categories` | `RecordStatHolder[]` | ✅ | Category statistics |
| `topCategories` | `CategoryHolder[]` | ✅ | Primary categories |
| `people` | `PersonCount[]` | ✅ | People mentioned with counts |
| `topPeople` | `PersonHolder[]` | ✅ | Most mentioned people |
| `companies` | `CompanyCount[]` | ✅ | Companies mentioned with counts |
| `topCompanies` | `CompanyHolder[]` | ✅ | Most mentioned companies |
| `locations` | `LocationCount[]` | ✅ | Locations mentioned with counts |
| `topLocations` | `LocationHolder[]` | ✅ | Most mentioned locations |
| `imageUrl` | `string` | ❌ | Representative image URL |

### Entity Count Interfaces

| Interface | Properties | Description |
|-----------|------------|-------------|
| `PersonCount` | `wikidataId`, `name`, `count` | Person entity with mention count |
| `CompanyCount` | `id`, `name`, `domains`, `symbols`, `count` | Company entity with metadata |
| `LocationCount` | `state`, `county`, `city`, `area`, `count` | Geographic entity hierarchy |

## Usage Examples

### Basic Story Display

```typescript
import { Story } from '@/lib/types/story';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <div className="story-card">
      <h2>{story.name}</h2>
      <p>{story.summary}</p>
      
      {/* Display article counts */}
      <div className="stats">
        <span>Unique: {story.uniqueCount}</span>
        <span>Reprints: {story.reprintCount}</span>
        <span>Total: {story.totalCount}</span>
      </div>
      
      {/* Display top entities */}
      <div className="entities">
        <div>
          <h4>Top People:</h4>
          {story.people.slice(0, 3).map(person => (
            <span key={person.wikidataId}>
              {person.name} ({person.count})
            </span>
          ))}
        </div>
        
        <div>
          <h4>Top Companies:</h4>
          {story.companies.slice(0, 3).map(company => (
            <span key={company.id}>
              {company.name} ({company.count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
```

### Story with Page Information

```typescript
import { StoryWithPageInfo } from '@/lib/types/story';

interface StoryPageProps {
  story: StoryWithPageInfo;
}

const StoryPage: React.FC<StoryPageProps> = ({ story }) => {
  // Handle duplicate detection
  if (story.duplicateOf) {
    return <DuplicateStoryRedirect targetId={story.duplicateOf} />;
  }

  return (
    <article>
      <header>
        <h1>{story.name}</h1>
        {story.imageUrl && (
          <img 
            src={story.imageUrl} 
            alt={story.name}
            data-source={story.imageSource?.domain}
          />
        )}
      </header>
      
      <section>
        <p>{story.summary}</p>
        <div className="sources">
          <span>Sources: {story.uniqueSources.length}</span>
        </div>
      </section>
    </article>
  );
};
```

### Story Analytics Dashboard

```typescript
import { Story } from '@/lib/types/story';

interface AnalyticsProps {
  stories: Story[];
}

const StoryAnalytics: React.FC<AnalyticsProps> = ({ stories }) => {
  // Aggregate sentiment across stories
  const aggregateSentiment = (stories: Story[]) => {
    return stories.reduce((acc, story) => {
      acc.positive += story.sentiment.positive || 0;
      acc.negative += story.sentiment.negative || 0;
      acc.neutral += story.sentiment.neutral || 0;
      return acc;
    }, { positive: 0, negative: 0, neutral: 0 });
  };

  // Find most mentioned companies across stories
  const getTopCompanies = (stories: Story[], limit: number = 10) => {
    const companyMap = new Map<string, CompanyCount>();
    
    stories.forEach(story => {
      story.companies.forEach(company => {
        const existing = companyMap.get(company.id);
        if (existing) {
          existing.count += company.count;
        } else {
          companyMap.set(company.id, { ...company });
        }
      });
    });
    
    return Array.from(companyMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  const sentiment = aggregateSentiment(stories);
  const topCompanies = getTopCompanies(stories);

  return (
    <div className="analytics-dashboard">
      <section>
        <h2>Sentiment Overview</h2>
        <div>Positive: {sentiment.positive}</div>
        <div>Negative: {sentiment.negative}</div>
        <div>Neutral: {sentiment.neutral}</div>
      </section>
      
      <section>
        <h2>Top Companies</h2>
        {topCompanies.map(company => (
          <div key={company.id}>
            {company.name}: {company.count} mentions
            {company.symbols.length > 0 && (
              <span> ({company.symbols.join(', ')})</span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { Story, StoryWithPageInfo } from '@/lib/types/story';

class StoryService {
  async getStory(id: string): Promise<Story> {
    const response = await fetch(`/api/stories/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch story');
    }
    return response.json();
  }

  async getStoryWithPageInfo(slug: string): Promise<StoryWithPageInfo> {
    const response = await fetch(`/api/stories/by-slug/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch story');
    }
    return response.json();
  }

  async searchStories(query: string): Promise<Story[]> {
    const response = await fetch(`/api/stories/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search stories');
    }
    return response.json();
  }

  // Type-safe entity filtering
  getStoriesByCompany(stories: Story[], companyId: string): Story[] {
    return stories.filter(story => 
      story.companies.some(company => company.id === companyId)
    );
  }

  getStoriesByPerson(stories: Story[], wikidataId: string): Story[] {
    return stories.filter(story =>
      story.people.some(person => person.wikidataId === wikidataId)
    );
  }
}
```

## Type Architecture Pattern

The Story types follow our established pattern:

```
Domain Objects (Story, PersonCount, CompanyCount, LocationCount)
    ↓
Composition Interfaces (WithPageInfo, WithSelectedArticles)
    ↓
Response Types (StoryWithPageInfo, StoryWithSelectedArticles)
    ↓
Request Types (Story filters, search parameters)
```

### Domain Layer
- `Story`: Core domain object containing all story data
- `PersonCount`, `CompanyCount`, `LocationCount`: Entity aggregation objects

### Composition Layer
- `WithPageInfo`: Adds web-specific metadata
- `WithSelectedArticles`: Adds article relationship data

### Response Layer
- `StoryWithPageInfo`: For story pages and SEO
- `StoryWithSelectedArticles`: For detailed story views
- `StoryWithPageInfoAndSelectedArticles`: For complete story presentations

## Related Types

- **`Article`**: Individual news articles that comprise a story
- **`KeyPoint`**: Important extracted information
- **`Question`**: Generated questions about the story
- **`SentimentHolder`**: Sentiment analysis results
- **`CategoryHolder`**: Story categorization
- **`CompanyHolder`**: Company entity information
- **`LocationHolder`**: Geographic entity information
- **`PersonHolder`**: Person entity information
- **`TopicHolder`**: Topic classification
- **`RecordStatHolder`**: Statistical aggregations
- **`Source`**: News source information

## Integration Points

### Components
- **Story Cards**: Display story summaries in feeds
- **Story Pages**: Full story presentation with metadata
- **Search Results**: Story discovery and filtering
- **Analytics Dashboards**: Story statistics and trends

### Services
- **Story API**: CRUD operations for stories
- **Search Service**: Story discovery and filtering
- **Analytics Service**: Story statistics and reporting
- **Entity Service**: People, company, and location analysis

### State Management
- **Story Store**: Current story state
- **Search Store**: Story search results and filters
- **Analytics Store**: Aggregated story metrics

## Validation

### Zod Schema Example

```typescript
import { z } from 'zod';

const PersonCountSchema = z.object({
  wikidataId: z.string(),
  name: z.string(),
  count: z.number().int().min(0)
});

const CompanyCountSchema = z.object({
  id: z.string(),
  name: z.string(),
  domains: z.array(z.string()),
  symbols: z.array(z.string()),
  count: z.number().int().min(0)
});

const StorySchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  initializedAt: z.string().datetime(),
  id: z.string(),
  name: z.string().min(1),
  summary: z.string().min(1),
  summaryReferences: z.array(z.string()).optional(),
  keyPoints: z.array(KeyPointSchema),
  questions: z.array(QuestionSchema).optional(),
  sentiment: SentimentHolderSchema,
  uniqueCount: z.number().int().min(0),
  reprintCount: z.number().int().min(0),
  totalCount: z.number().int().min(0),
  // ... entity arrays
  people: z.array(PersonCountSchema),
  companies: z.array(CompanyCountSchema),
  imageUrl: z.string().url().optional()
});
```

## Best Practices

### Type Safety
- ✅ Use composition interfaces to extend base Story type
- ✅ Leverage Pick utility type for partial source information
- ✅ Maintain strict typing for entity counts and statistics
- ✅ Use optional properties appropriately for nullable fields

### Performance
- ✅ Consider pagination for large entity arrays
- ✅ Use lazy loading for heavy properties like `selectedArticles`
- ✅ Implement proper memoization for computed values

### Maintainability
- ✅ Keep entity count interfaces separate and reusable
- ✅ Use composition over inheritance for story variants
- ✅ Maintain consistent naming conventions across entity types
- ✅ Document the relationship between counts and holders

### Error Handling
```typescript
// Type-safe error handling
const validateStoryEntities = (story: Story): string[] => {
  const errors: string[] = [];
  
  if (story.totalCount !== story.uniqueCount + story.reprintCount) {
    errors.push('Total count does not match unique + reprint counts');
  }
  
  if (story.people.some(p => p.count < 0)) {
    errors.push('Person counts cannot be negative');
  }
  
  if (story.companies.some(c => c.count < 0)) {
    errors.push('Company counts cannot be negative');
  }
  
  return errors;
};
```

This type system provides a robust foundation for story-related functionality while maintaining type safety and following our established architectural patterns.