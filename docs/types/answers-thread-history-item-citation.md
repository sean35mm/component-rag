# AnswersThreadHistoryItemCitation Type Documentation

## Purpose

The `AnswersThreadHistoryItemCitation` type represents source citations for answers in a conversational thread history system. It provides a type-safe way to handle different citation sources (articles, stories, web pages, etc.) with their specific metadata while maintaining a consistent base structure for display and indexing.

## Type Definition

### Enums

```typescript
export enum CitationType {
  ARTICLE = 'NEWS_ARTICLE',
  WIKIPEDIA = 'WIKIPEDIA_PAGE',
  FINANCIAL_DATA = 'FINANCIAL_DATA',
  WEB_PAGE = 'WEB_PAGE',
  STORY = 'NEWS_STORY',
  GENERIC = 'GENERIC',
}
```

### Base Interface

```typescript
interface CitationBase {
  displayIndex: number;
  sequenceIndex: number;
  title: string;
  url: string;
}
```

### Specific Citation Interfaces

```typescript
export interface AnswersThreadHistoryArticleCitation extends CitationBase {
  type: CitationType.ARTICLE;
  pubDate: Date;
  articleId: string;
}

export interface AnswersThreadHistoryGenericCitation extends CitationBase {
  type: CitationType.GENERIC;
  image?: Image;
  snippet?: string;
  pubDate?: Date;
}

export interface AnswersThreadHistoryStoryCitation extends CitationBase {
  type: CitationType.STORY;
  clusterId: string;
  updatedAt: Date;
}
```

### Union Type

```typescript
export type AnswersThreadHistoryItemCitation =
  | AnswersThreadHistoryArticleCitation
  | AnswersThreadHistoryStoryCitation
  | AnswersThreadHistoryGenericCitation;
```

## Properties

### CitationBase Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `displayIndex` | `number` | ✅ | Visual index shown to users (e.g., [1], [2]) |
| `sequenceIndex` | `number` | ✅ | Internal ordering index for citation sequence |
| `title` | `string` | ✅ | Display title of the citation source |
| `url` | `string` | ✅ | Source URL for the citation |

### Article Citation Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `CitationType.ARTICLE` | ✅ | Discriminant for article citations |
| `pubDate` | `Date` | ✅ | Publication date of the article |
| `articleId` | `string` | ✅ | Unique identifier for the article |

### Generic Citation Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `CitationType.GENERIC` | ✅ | Discriminant for generic citations |
| `image` | `Image` | ❌ | Optional thumbnail or preview image |
| `snippet` | `string` | ❌ | Optional excerpt or description |
| `pubDate` | `Date` | ❌ | Optional publication date |

### Story Citation Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `CitationType.STORY` | ✅ | Discriminant for story citations |
| `clusterId` | `string` | ✅ | Identifier for related story cluster |
| `updatedAt` | `Date` | ✅ | Last update timestamp for the story |

## Usage Examples

### Type Guards

```typescript
function isArticleCitation(
  citation: AnswersThreadHistoryItemCitation
): citation is AnswersThreadHistoryArticleCitation {
  return citation.type === CitationType.ARTICLE;
}

function isStoryCitation(
  citation: AnswersThreadHistoryItemCitation
): citation is AnswersThreadHistoryStoryCitation {
  return citation.type === CitationType.STORY;
}
```

### Citation Rendering Component

```typescript
interface CitationProps {
  citation: AnswersThreadHistoryItemCitation;
}

const CitationComponent: React.FC<CitationProps> = ({ citation }) => {
  const renderCitationContent = () => {
    switch (citation.type) {
      case CitationType.ARTICLE:
        return (
          <div>
            <h3>{citation.title}</h3>
            <p>Published: {citation.pubDate.toLocaleDateString()}</p>
            <span>Article ID: {citation.articleId}</span>
          </div>
        );
      
      case CitationType.STORY:
        return (
          <div>
            <h3>{citation.title}</h3>
            <p>Updated: {citation.updatedAt.toLocaleDateString()}</p>
            <span>Cluster: {citation.clusterId}</span>
          </div>
        );
      
      case CitationType.GENERIC:
        return (
          <div>
            <h3>{citation.title}</h3>
            {citation.image && <img src={citation.image.url} alt={citation.title} />}
            {citation.snippet && <p>{citation.snippet}</p>}
            {citation.pubDate && <p>Published: {citation.pubDate.toLocaleDateString()}</p>}
          </div>
        );
      
      default:
        return <div>Unknown citation type</div>;
    }
  };

  return (
    <article className="citation">
      <span className="citation-index">[{citation.displayIndex}]</span>
      {renderCitationContent()}
      <a href={citation.url} target="_blank" rel="noopener noreferrer">
        View Source
      </a>
    </article>
  );
};
```

### Citation Processing Functions

```typescript
// Sort citations by display index
function sortCitationsByDisplay(
  citations: AnswersThreadHistoryItemCitation[]
): AnswersThreadHistoryItemCitation[] {
  return [...citations].sort((a, b) => a.displayIndex - b.displayIndex);
}

// Filter citations by type
function filterCitationsByType<T extends CitationType>(
  citations: AnswersThreadHistoryItemCitation[],
  type: T
): Extract<AnswersThreadHistoryItemCitation, { type: T }>[] {
  return citations.filter((citation) => citation.type === type) as Extract<
    AnswersThreadHistoryItemCitation,
    { type: T }
  >[];
}

// Create citation summary
function createCitationSummary(citations: AnswersThreadHistoryItemCitation[]) {
  return {
    total: citations.length,
    byType: citations.reduce((acc, citation) => {
      acc[citation.type] = (acc[citation.type] || 0) + 1;
      return acc;
    }, {} as Record<CitationType, number>),
    hasImages: citations.some(
      (c) => c.type === CitationType.GENERIC && c.image
    ),
  };
}
```

## Type Architecture Pattern

This type follows our **domain objects → response types → request types** pattern:

```typescript
// 1. Domain Object (this file)
export type AnswersThreadHistoryItemCitation = /* ... */;

// 2. Response Types (in API response files)
export interface ThreadHistoryResponse {
  threadId: string;
  items: Array<{
    id: string;
    content: string;
    citations: AnswersThreadHistoryItemCitation[];
  }>;
}

// 3. Request Types (in API request files)
export interface CreateThreadItemRequest {
  threadId: string;
  content: string;
  citationSources: Pick<AnswersThreadHistoryItemCitation, 'url' | 'title'>[];
}
```

## Related Types

- **`Image`**: Referenced in `AnswersThreadHistoryGenericCitation.image`
- **`AnswersThreadHistoryItem`**: Parent type that contains citations
- **`AnswersThread`**: Container for thread history items
- **`SourceMetadata`**: Potential base type for citation metadata

## Integration Points

### Services

```typescript
// Citation service
class CitationService {
  async fetchCitationMetadata(
    url: string
  ): Promise<Partial<AnswersThreadHistoryGenericCitation>> {
    // Implementation
  }

  validateCitation(citation: AnswersThreadHistoryItemCitation): boolean {
    // Implementation
  }
}
```

### State Management

```typescript
// Redux/Zustand store slice
interface CitationsState {
  citations: AnswersThreadHistoryItemCitation[];
  loading: boolean;
  error: string | null;
}
```

### API Integration

```typescript
// API client method
async function fetchThreadCitations(
  threadId: string
): Promise<AnswersThreadHistoryItemCitation[]> {
  const response = await api.get(`/threads/${threadId}/citations`);
  return response.data.citations;
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const CitationBaseSchema = z.object({
  displayIndex: z.number().min(1),
  sequenceIndex: z.number().min(0),
  title: z.string().min(1),
  url: z.string().url(),
});

const ArticleCitationSchema = CitationBaseSchema.extend({
  type: z.literal(CitationType.ARTICLE),
  pubDate: z.date(),
  articleId: z.string().min(1),
});

const GenericCitationSchema = CitationBaseSchema.extend({
  type: z.literal(CitationType.GENERIC),
  image: ImageSchema.optional(),
  snippet: z.string().optional(),
  pubDate: z.date().optional(),
});

const StoryCitationSchema = CitationBaseSchema.extend({
  type: z.literal(CitationType.STORY),
  clusterId: z.string().min(1),
  updatedAt: z.date(),
});

export const AnswersThreadHistoryItemCitationSchema = z.discriminatedUnion('type', [
  ArticleCitationSchema,
  GenericCitationSchema,
  StoryCitationSchema,
]);
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are explicitly typed, no `any` usage
2. **Interfaces over Types**: Uses interfaces for object shapes, type for union
3. **Enums for Reusability**: `CitationType` enum provides reusable citation categories
4. **Utility Types**: Can leverage `Pick`, `Omit` for derived types
5. **Domain-First Architecture**: Starts with domain objects, builds outward

### ✅ Recommended Patterns

```typescript
// Use discriminated unions for type safety
function processCitation(citation: AnswersThreadHistoryItemCitation) {
  switch (citation.type) {
    case CitationType.ARTICLE:
      // TypeScript knows this is ArticleCitation
      return `Article: ${citation.articleId}`;
    // ... other cases
  }
}

// Create utility types for common operations
type CitationIdentifier = Pick<AnswersThreadHistoryItemCitation, 'url' | 'title'>;
type CitationMetadata = Omit<AnswersThreadHistoryItemCitation, 'displayIndex' | 'sequenceIndex'>;
```

### ❌ Anti-Patterns to Avoid

```typescript
// Don't use type assertions without validation
const citation = data as AnswersThreadHistoryItemCitation; // ❌

// Don't bypass discriminated union safety
if ((citation as any).articleId) { // ❌
  // Handle as article
}

// Instead, use proper type guards
if (isArticleCitation(citation)) { // ✅
  // Handle as article
}
```