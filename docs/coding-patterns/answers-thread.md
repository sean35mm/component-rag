# Answers Thread Type System Pattern

## Pattern Overview

The **Answers Thread Type System** is a comprehensive TypeScript type definition pattern that models a conversational AI system with citations, filtering, and real-time streaming capabilities. This pattern accomplishes:

- **Conversational Threading**: Models question-answer conversations with hierarchical message structures
- **Citation Management**: Tracks and references multiple types of sources (articles, Wikipedia, web pages, etc.)
- **Real-time Streaming**: Handles chunked response data for live chat experiences
- **Content Filtering**: Integrates news filtering and saved search capabilities
- **Thinking Process Visualization**: Models AI reasoning steps and decision trees

**When to use this pattern:**
- Building conversational AI interfaces with citation tracking
- Implementing real-time chat systems with structured responses
- Creating content recommendation systems
- Developing applications requiring complex filtering and search capabilities

## Architecture

The pattern follows a **layered type architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│           Core Entities             │
│  AnswersThread, AnswersThreadMessage│
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│        Citation System             │
│   Multiple citation types & refs   │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│      Streaming Response            │
│   Real-time chat elements          │
└─────────────────────────────────────┘
                    │
┌─────────────────────────────────────┐
│    Recommendations & Actions       │
│   Next steps and suggestions       │
└─────────────────────────────────────┘
```

### Key Architectural Components:

1. **Thread Management**: Core conversation container
2. **Message System**: Bi-directional communication model
3. **Citation Engine**: Multi-source reference tracking
4. **Streaming Protocol**: Real-time response handling
5. **Recommendation Engine**: Action suggestion system

## Implementation Details

### 1. **Discriminated Union Pattern**

```typescript
export type AnswersThreadMessage =
  | AnswersThreadMessageQuestion
  | AnswersThreadMessageAnswer;

// Role-based discrimination
export enum AnswersThreadMessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}
```

### 2. **Generic Base Interfaces**

```typescript
interface AnswersThreadMessageBase<T = AnswersThreadMessageRole> {
  id: string;
  createdAt: string;
  updatedAt: string;
  threadId: string;
  role: T;
  content: string;
  // Optional extensions
  newsFilter?: AnswersNewsFilter;
  newsFilterUpdatedAt?: string;
}
```

### 3. **Citation Polymorphism**

```typescript
export type AnswersThreadMessageCitationValue =
  | string
  | AnswersThreadMessageCitationArticle
  | AnswersThreadMessageCitationWikipedia
  | AnswersThreadMessageCitationFinancialData
  | AnswersThreadMessageCitationWebPage
  | AnswersThreadMessageCitationStory
  | AnswersThreadHistoryGenericCitation;
```

### 4. **Streaming Response Elements**

```typescript
export enum AnswersThreadChatResponseElementType {
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

## Usage Examples

### 1. **Creating a New Thread**

```typescript
import { AnswersThread, AnswersNewsFilter } from './answers-thread';

const createThread = (name: string, filter?: AnswersNewsFilter): AnswersThread => {
  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name,
    newsFilter: filter,
    withoutFirstResponse: false,
    shared: false,
    folderId: null,
  };
};
```

### 2. **Processing Streaming Responses**

```typescript
const processStreamElement = (
  element: AnswersThreadChatResponseElement
): void => {
  switch (element.type) {
    case AnswersThreadChatResponseElementType.RESPONSE_CHUNK:
      appendToResponse(element.content);
      break;
    
    case AnswersThreadChatResponseElementType.CITATION:
      addCitation(element);
      break;
    
    case AnswersThreadChatResponseElementType.THINKING_BRANCH:
      updateThinkingProcess(element);
      break;
    
    case AnswersThreadChatResponseElementType.ERROR:
      handleError(element.message);
      break;
    
    default:
      console.warn('Unknown element type:', element);
  }
};
```

### 3. **Building Messages with Citations**

```typescript
const createAnswerMessage = (
  content: string,
  citations: AnswersThreadMessageCitation[],
  suggestions: NextStepRecommendationType[]
): AnswersThreadMessageAnswer => {
  return {
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    threadId: 'thread-123',
    role: AnswersThreadMessageRole.ASSISTANT,
    content,
    parentId: 1,
    traceId: generateTraceId(),
    citations,
    suggestions,
  };
};
```

### 4. **Handling Next Step Recommendations**

```typescript
const processRecommendation = (
  recommendation: NextStepRecommendationType
): void => {
  switch (recommendation.type) {
    case NextStepActionType.SEARCH:
      executeSearch(recommendation.articlesQuery);
      break;
    
    case NextStepActionType.STORY:
      navigateToStory(recommendation.story);
      break;
    
    case NextStepActionType.SIGNAL:
      createSignal(recommendation.articlesQuery);
      break;
  }
};
```

## Best Practices

### 1. **Type Guards for Runtime Safety**

```typescript
const isAnswerMessage = (
  message: AnswersThreadMessage
): message is AnswersThreadMessageAnswer => {
  return message.role === AnswersThreadMessageRole.ASSISTANT;
};

const isQuestionMessage = (
  message: AnswersThreadMessage
): message is AnswersThreadMessageQuestion => {
  return message.role === AnswersThreadMessageRole.USER;
};
```

### 2. **Citation Type Validation**

```typescript
const validateCitation = (citation: AnswersThreadMessageCitation): boolean => {
  const hasValidReference = citation.referenceId.length > 0;
  const hasAtLeastOneSource = !!(
    citation.article || 
    citation.wikipediaPage || 
    citation.financialData || 
    citation.webPage || 
    citation.story
  );
  
  return hasValidReference && hasAtLeastOneSource;
};
```

### 3. **Immutable Updates**

```typescript
const addMessageToThread = (
  thread: AnswersThreadWithMessages,
  message: AnswersThreadMessage
): AnswersThreadWithMessages => {
  return {
    ...thread,
    messages: [...thread.messages, message],
    updatedAt: new Date().toISOString(),
  };
};
```

### 4. **Error Boundary Handling**

```typescript
const safeProcessElement = (
  element: AnswersThreadChatResponseElement
): Result<void, string> => {
  try {
    processStreamElement(element);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: `Failed to process element: ${error.message}` 
    };
  }
};
```

## Integration

### 1. **Store Integration**

```typescript
// Redux/Zustand store slice
interface AnswersThreadState {
  threads: Record<string, AnswersThreadWithMessages>;
  activeThreadId: string | null;
  streamingElements: AnswersThreadChatResponseElement[];
}

const useAnswersStore = create<AnswersThreadState>((set, get) => ({
  threads: {},
  activeThreadId: null,
  streamingElements: [],
  
  addThread: (thread: AnswersThread) => {
    set(state => ({
      threads: {
        ...state.threads,
        [thread.id]: { ...thread, messages: [] }
      }
    }));
  },
}));
```

### 2. **API Integration**

```typescript
// API service layer
class AnswersThreadService {
  async createThread(data: Partial<AnswersThread>): Promise<AnswersThread> {
    const response = await fetch('/api/threads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  async *streamChat(
    threadId: string, 
    message: string
  ): AsyncGenerator<AnswersThreadChatResponseElement> {
    const response = await fetch(`/api/threads/${threadId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    
    const reader = response.body?.getReader();
    // Stream processing logic
  }
}
```

### 3. **Component Integration**

```typescript
// React component usage
const ThreadViewer: React.FC<{ threadId: string }> = ({ threadId }) => {
  const thread = useAnswersStore(state => state.threads[threadId]);
  
  return (
    <div>
      {thread.messages.map(message => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
};
```

## Type Safety

### 1. **Strict Type Definitions**

```typescript
// Ensure all message types have required fields
type RequiredMessageFields = 'id' | 'createdAt' | 'updatedAt' | 'threadId' | 'role' | 'content';

// Compile-time validation
type ValidateMessage<T> = T extends Record<RequiredMessageFields, any> ? T : never;
```

### 2. **Template Literal Types**

```typescript
type CitationKey = `citation_${string}`;
type ThreadRoutePattern = `/threads/${string}`;

// Usage in API routes
const buildThreadRoute = (id: string): ThreadRoutePattern => 
  `/threads/${id}` as ThreadRoutePattern;
```

### 3. **Conditional Types for Citations**

```typescript
type ExtractCitationType<T> = T extends { object: infer U } ? U : never;

type ArticleCitationType = ExtractCitationType<NewsArticleCitationChunk>; // CitationType.ARTICLE
```

## Performance

### 1. **Streaming Optimization**

```typescript
const BATCH_SIZE = 10;
const DEBOUNCE_DELAY = 100;

const batchedStreamProcessor = debounce((elements: AnswersThreadChatResponseElement[]) => {
  const batches = chunk(elements, BATCH_SIZE);
  
  batches.forEach(batch => {
    requestAnimationFrame(() => {
      batch.forEach(processStreamElement);
    });
  });
}, DEBOUNCE_DELAY);
```

### 2. **Memory Management**

```typescript
const MAX_THREAD_HISTORY = 100;

const pruneThreadHistory = (thread: AnswersThreadWithMessages): AnswersThreadWithMessages => {
  if (thread.messages.length <= MAX_THREAD_HISTORY) {
    return thread;
  }
  
  return {
    ...thread,
    messages: thread.messages.slice(-MAX_THREAD_HISTORY),
  };
};
```

### 3. **Selective Updates**

```typescript
// Only update specific parts of the thread
const updateThreadMetadata = (
  threadId: string, 
  metadata: Partial<AnswersThread>
): void => {
  useAnswersStore.setState(state => ({
    threads: {
      ...state.threads,
      [threadId]: {
        ...state.threads[threadId],
        ...metadata,
        updatedAt: new Date().toISOString(),
      }
    }
  }));
};
```

## Testing

### 1. **Type Testing**

```typescript
// Type-level tests
import { expectType, expectError } from 'tsd';

expectType<AnswersThreadMessageRole.USER>(
  AnswersThreadMessageRole.USER
);

expectError<AnswersThreadMessageAnswer>({
  role: AnswersThreadMessageRole.USER, // Should error
});
```

### 2. **Mock Factories**

```typescript
// Test data factories
export const createMockThread = (
  overrides: Partial<AnswersThread> = {}
): AnswersThread => ({
  id: 'thread-123',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  name: 'Test Thread',
  withoutFirstResponse: false,
  shared: false,
  folderId: null,
  ...overrides,
});

export const createMockAnswer = (
  overrides: Partial<AnswersThreadMessageAnswer> = {}
): AnswersThreadMessageAnswer => ({
  id: 'msg-456',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  threadId: 'thread-123',
  role: AnswersThreadMessageRole.ASSISTANT,
  content: 'Test answer',
  parentId: 1,
  traceId: 'trace-789',
  citations: [],
  suggestions: [],
  ...overrides,
});
```

### 3. **Integration Tests**

```typescript
describe('AnswersThread Integration', () => {
  it('should handle complete conversation flow', async () => {
    const thread = createMockThread();
    const question = createMockQuestion();
    const answer = createMockAnswer();
    
    // Test thread creation
    expect(thread.id).toBeDefined();
    
    // Test message addition
    const threadWithMessages = addMessageToThread(thread, question);
    expect(threadWithMessages.messages).toHaveLength(1);
    
    // Test streaming response
    const streamElements = await collectStreamElements(thread.id);
    expect(streamElements).toContainEqual(
      expect.objectContaining({
        type: AnswersThreadChatResponseElementType.RESPONSE_CHUNK
      })
    );
  });
});
```

## Common Pitfalls

### 1. **Avoid Circular Dependencies**

```typescript
// ❌ Bad - circular reference
interface ThreadWithMessages {
  messages: MessageWithThread[];
}

interface MessageWithThread {
  thread: ThreadWithMessages;
}

// ✅ Good - use IDs for references
interface Thread {
  id: string;
  messages: Message[];
}

interface Message {
  threadId: string; // Reference by ID
}
```

### 2. **Handle Optional Citation Fields**

```typescript
// ❌ Bad - assumes citation exists
const getCitationTitle = (citation: AnswersThreadMessageCitation): string => {
  return citation.article.title; // May throw if article is undefined
};

// ✅ Good - defensive programming
const getCitationTitle = (citation: AnswersThreadMessageCitation): string | null => {
  return citation.article?.title || 
         citation.webPage?.title || 
         citation.story?.title || 
         null;
};
```

### 3. **Validate Stream Element Types**

```typescript
// ❌ Bad - assumes element structure
const processElement = (element: any): void => {
  if (element.type === 'CITATION') {
    addCitation(element.article); // May be undefined
  }
};

// ✅ Good - type-safe processing
const processElement = (element: AnswersThreadChatResponseElement): void => {
  if (element.type === AnswersThreadChatResponseElementType.CITATION) {
    // TypeScript knows this is a citation element
    addCitation(element);
  }
};
```

### 4. **Manage State Mutations**

```typescript
// ❌ Bad - direct mutation
const addMessage = (thread: AnswersThreadWithMessages, message: AnswersThreadMessage): void => {
  thread.messages.push(message); // Mutates original
  thread.updatedAt = new Date().toISOString();
};

// ✅ Good - immutable updates
const addMessage = (
  thread: AnswersThreadWithMessages, 
  message: AnswersThreadMessage
): AnswersThreadWithMessages => {
  return {
    ...thread,
    messages: [...thread.messages, message],
    updatedAt: new Date().toISOString(),
  };
};
```

This comprehensive type system provides a robust foundation for building sophisticated conversational AI applications while maintaining type safety and architectural clarity.