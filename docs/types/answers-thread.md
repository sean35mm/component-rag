# Answers Thread Type Documentation

## Purpose

The `answers-thread` types define the comprehensive type system for AI-powered conversation threads in the news analysis platform. These types support threaded conversations between users and AI assistants, including citations, recommendations, and real-time thinking process visualization. The type system handles complex chat responses with streaming elements, news filtering, and multi-modal citations from various sources.

## Type Architecture Pattern

Following our domain-first architecture:

1. **Domain Objects**: Core thread and message entities (`AnswersThread`, `AnswersThreadMessage`)
2. **Response Types**: Chat response elements and streaming data structures
3. **Request Types**: Route state and filter compositions

## Core Domain Types

### AnswersThread

The primary thread entity representing a conversation session.

```typescript
interface AnswersThread {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  newsFilter?: AnswersNewsFilter;
  withoutFirstResponse: boolean;
  shared: boolean;
  folderId: number | null;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✓ | Unique thread identifier |
| `createdAt` | `string` | ✓ | ISO 8601 creation timestamp |
| `updatedAt` | `string` | ✓ | ISO 8601 last modified timestamp |
| `name` | `string` | ✓ | Display name for the thread |
| `newsFilter` | `AnswersNewsFilter` | ✗ | Applied news filtering criteria |
| `withoutFirstResponse` | `boolean` | ✓ | Whether thread excludes initial response |
| `shared` | `boolean` | ✓ | Public sharing status |
| `folderId` | `number \| null` | ✓ | Organization folder reference |

### Message System

#### AnswersThreadMessageRole Enum

```typescript
enum AnswersThreadMessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}
```

#### Question Messages

```typescript
interface AnswersThreadMessageQuestion 
  extends AnswersThreadMessageBase<AnswersThreadMessageRole.USER> {
  parentId: string | null;
}
```

#### Answer Messages

```typescript
interface AnswersThreadMessageAnswer 
  extends AnswersThreadMessageBase<AnswersThreadMessageRole.ASSISTANT> {
  parentId: number;
  traceId: string;
  citations: AnswersThreadMessageCitation[];
  suggestions: NextStepRecommendationType[];
  followups?: string[];
  error?: string;
  metadata?: AnswersThreadChatResponseTraceMetadata;
  thoughtProcess?: {
    steps: BranchItem[];
    duration: ThinkingDuration;
  };
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `parentId` | `number` | ✓ | Reference to parent message |
| `traceId` | `string` | ✓ | Execution trace identifier |
| `citations` | `AnswersThreadMessageCitation[]` | ✓ | Source citations array |
| `suggestions` | `NextStepRecommendationType[]` | ✓ | AI-generated next steps |
| `followups` | `string[]` | ✗ | Suggested follow-up questions |
| `error` | `string` | ✗ | Error message if applicable |
| `metadata` | `AnswersThreadChatResponseTraceMetadata` | ✗ | Execution metadata |
| `thoughtProcess` | `object` | ✗ | AI reasoning visualization |

## Citation System

### Citation Types

Multiple citation interfaces support different source types:

```typescript
interface AnswersThreadMessageCitationArticle
  extends AnswersThreadMessageCitationBase {
  articleId: string;
  pubDate: string;
  summary: string;
  language: string;
}

interface AnswersThreadMessageCitationStory
  extends AnswersThreadMessageCitationBase {
  clusterId: string;
  updatedAt: string;
}

interface AnswersThreadMessageCitationWikipedia
  extends AnswersThreadMessageCitationBase {
  summary: string;
}
```

### Citation Container

```typescript
interface AnswersThreadMessageCitation {
  referenceId: string;
  article?: AnswersThreadMessageCitationArticle;
  wikipediaPage?: AnswersThreadMessageCitationWikipedia;
  financialData?: AnswersThreadMessageCitationFinancialData;
  webPage?: AnswersThreadMessageCitationWebPage;
  story?: AnswersThreadMessageCitationStory;
  [key: string]: AnswersThreadMessageCitationValue | undefined;
}
```

## Chat Response System

### Response Element Types

```typescript
enum AnswersThreadChatResponseElementType {
  RESPONSE_CHUNK = 'RESPONSE_CHUNK',
  CITATION = 'CITATION',
  ERROR = 'ERROR',
  THREAD_METADATA = 'THREAD_METADATA',
  TRACE = 'TRACE',
  MESSAGE_METADATA = 'MESSAGE_METADATA',
  THINKING_BRANCH = 'THINKING_BRANCH',
  THINKING_LEAF = 'THINKING_LEAF',
  THINKING_DURATION = 'THINKING_DURATION',
}
```

### Streaming Elements

Each response element extends a base type for type discrimination:

```typescript
interface AnswersThreadChatResponseChunkElement
  extends AnswersThreadChatResponseElementBase<AnswersThreadChatResponseElementType.RESPONSE_CHUNK> {
  content: string;
}

interface AnswersThreadChatResponseErrorElement
  extends AnswersThreadChatResponseElementBase<AnswersThreadChatResponseElementType.ERROR> {
  message: string;
}
```

## Recommendation System

### Action Types

```typescript
enum NextStepActionType {
  SEARCH = 'SEARCH',
  SIGNAL = 'SIGNAL',
  STORY = 'STORY',
}
```

### Recommendation Interfaces

```typescript
interface SearchNextStepRecommendation
  extends QueryDrivenNextStepRecommendation {
  type: NextStepActionType.SEARCH;
}

interface StoryNextStepRecommendation extends NextStepRecommendation {
  type: NextStepActionType.STORY;
  story: StoryWithPageInfo;
}
```

## Usage Examples

### Creating a New Thread

```typescript
const createThread = (name: string, folderId?: number): AnswersThread => ({
  id: generateId(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name,
  withoutFirstResponse: false,
  shared: false,
  folderId: folderId ?? null,
});
```

### Processing Chat Messages

```typescript
const processMessage = (
  message: AnswersThreadMessage
): string => {
  switch (message.role) {
    case AnswersThreadMessageRole.USER:
      return `Q: ${message.content}`;
    case AnswersThreadMessageRole.ASSISTANT:
      const citationCount = message.citations.length;
      return `A: ${message.content} (${citationCount} sources)`;
  }
};
```

### Handling Streaming Responses

```typescript
const handleStreamElement = (
  element: AnswersThreadChatResponseElement
): void => {
  switch (element.type) {
    case AnswersThreadChatResponseElementType.RESPONSE_CHUNK:
      appendToResponse(element.content);
      break;
    case AnswersThreadChatResponseElementType.CITATION:
      addCitation(element);
      break;
    case AnswersThreadChatResponseElementType.ERROR:
      handleError(element.message);
      break;
  }
};
```

### Working with Citations

```typescript
const formatCitation = (
  citation: AnswersThreadMessageCitation
): string => {
  if (citation.article) {
    return `${citation.article.title} (${citation.article.pubDate})`;
  }
  if (citation.story) {
    return `Story: ${citation.story.title}`;
  }
  if (citation.wikipediaPage) {
    return `Wikipedia: ${citation.wikipediaPage.title}`;
  }
  return citation.referenceId;
};
```

### Building Recommendations

```typescript
const createSearchRecommendation = (
  query: ComplexAllEndpointBody,
  title: string,
  rationale: string
): SearchNextStepRecommendation => ({
  type: NextStepActionType.SEARCH,
  featured: false,
  articlesQuery: query,
  title,
  rationale,
});
```

## Related Types

- `BranchItem`, `LeafStoryItem` - Thinking process visualization
- `ComplexAllEndpointBody` - Query structures
- `FiltersState`, `SavedFilterQueryData` - News filtering
- `StoryWithPageInfo` - Story recommendations
- Citation types from `answers-thread-history-item-citation`

## Integration Points

### Components
- Chat interfaces for message rendering
- Citation display components
- Recommendation action handlers
- Thinking process visualizers

### Services
- WebSocket streaming handlers
- Thread persistence layer
- Citation resolution services
- Recommendation engines

### State Management
- Thread state in stores
- Message history management
- Real-time updates

## Best Practices

### Type Safety
```typescript
// ✅ Use discriminated unions for message types
const handleMessage = (message: AnswersThreadMessage) => {
  if (message.role === AnswersThreadMessageRole.ASSISTANT) {
    // TypeScript knows this is AnswersThreadMessageAnswer
    message.citations.forEach(processCitation);
  }
};

// ✅ Leverage utility types for partial updates
type ThreadUpdate = Partial<Pick<AnswersThread, 'name' | 'shared' | 'folderId'>>;
```

### Citation Handling
```typescript
// ✅ Type-safe citation access
const getCitationTitle = (citation: AnswersThreadMessageCitation): string => {
  return citation.article?.title 
    || citation.story?.title 
    || citation.wikipediaPage?.title 
    || 'Unknown Source';
};
```

### Stream Processing
```typescript
// ✅ Exhaustive type checking for stream elements
const processStreamElement = (element: AnswersThreadChatResponseElement) => {
  switch (element.type) {
    case AnswersThreadChatResponseElementType.RESPONSE_CHUNK:
    case AnswersThreadChatResponseElementType.CITATION:
    case AnswersThreadChatResponseElementType.ERROR:
    case AnswersThreadChatResponseElementType.THREAD_METADATA:
    case AnswersThreadChatResponseElementType.TRACE:
    case AnswersThreadChatResponseElementType.MESSAGE_METADATA:
    case AnswersThreadChatResponseElementType.THINKING_BRANCH:
    case AnswersThreadChatResponseElementType.THINKING_LEAF:
    case AnswersThreadChatResponseElementType.THINKING_DURATION:
      // Handle each case
      break;
    default:
      // TypeScript ensures exhaustiveness
      const _exhaustive: never = element;
  }
};
```

This type system provides comprehensive coverage for AI conversation threads with strong type safety, extensible citation systems, and real-time streaming capabilities.