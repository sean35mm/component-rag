# Answers Service

## Purpose

The Answers Service manages AI-powered chatbot interactions and thread management for both authenticated members and public platform users. It provides comprehensive CRUD operations for chat threads, real-time streaming chat responses, and message suggestion functionality through two distinct service interfaces.

## Architecture

This service follows our dual-service pattern:
- **AnswersService**: Private API for authenticated members
- **PublicAnswersServiceBuilder**: Public platform API for external integrations

## Methods

### AnswersService (Private API)

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `create` | `CreateThreadDto`, `AbortSignal?` | `Promise<AnswersThreadWithMessages>` | Creates a new chat thread |
| `chat` | `AnswersThreadQuestion`, `threadUuid?`, `AbortSignal?` | `AsyncGenerator<AnswersThreadChatResponseElement>` | Streams chat responses |
| `stopChat` | `messageId: string`, `AbortSignal?` | `Promise<void>` | Stops an active chat stream |
| `getById` | `threadUuid: string`, `AbortSignal?` | `Promise<AnswersThreadWithMessages>` | Retrieves thread by UUID |
| `getList` | `GetAnswersMemberThreadsListParams`, `AbortSignal?` | `Promise<AnswersThread[]>` | Lists user's threads |
| `update` | `{uuid: string, dto: UpdateAnswersMemberThreadDto}`, `AbortSignal?` | `Promise<AnswersThreadWithMessages>` | Updates thread metadata |
| `delete` | `uuid: string`, `AbortSignal?` | `Promise<AnswersThreadWithMessages>` | Deletes a thread |
| `createSuggestion` | `{messageId: string}`, `AbortSignal?` | `Promise<MessageRecommendations>` | Generates message suggestions |

### PublicAnswersServiceBuilder (Public API)

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `create` | `CreateThreadDto`, `AbortSignal?` | `Promise<AnswersThreadWithMessages>` | Creates public chat thread |
| `chat` | `AnswersThreadQuestion`, `threadUuid?`, `AbortSignal?` | `AsyncGenerator<AnswersThreadChatResponseElement>` | Streams public chat responses |
| `stopChat` | `messageId: string`, `AbortSignal?` | `Promise<void>` | Stops public chat stream |
| `getById` | `id: string`, `AbortSignal?` | `Promise<AnswersThreadWithMessages>` | Retrieves public thread |
| `getList` | `AbortSignal?` | `Promise<AnswersThread[]>` | Lists public threads |
| `createSuggestion` | `{messageId: string}`, `AbortSignal?` | `Promise<MessageRecommendations>` | Generates public suggestions |

### Utility Functions

| Function | Parameters | Return Type | Description |
|----------|------------|-------------|-------------|
| `readBodyAsync` | `ReadableStream<Uint8Array>`, `encoding?` | `AsyncGenerator<string>` | Reads stream body as text chunks |
| `readChatResponseElements` | `ReadableStream<Uint8Array>` | `AsyncGenerator<AnswersThreadChatResponseElement>` | Parses streaming chat responses |

## Authentication

### Private API (AnswersService)
- **Wrapper**: `PrivateApiServiceWrapper`
- **Requirements**: Authenticated member session
- **Credentials**: Managed automatically by the wrapper

### Public API (PublicAnswersServiceBuilder)  
- **Wrapper**: `PublicPlatformApiServiceWrapper`
- **Requirements**: Platform API credentials
- **Credentials**: Configured through platform API authentication

## Error Handling

Following our service architecture, this service **does not handle errors**. All error handling is delegated to the query layer:

- **HTTP Errors**: Thrown as `HttpException` for non-2xx responses
- **Network Errors**: Propagated to TanStack Query hooks
- **Validation Errors**: Handled by consuming components
- **Stream Errors**: Propagated through AsyncGenerator

## Usage Examples

### Creating and Chatting with Threads

```typescript
import { AnswersService } from '@/lib/services/answers-service';

// Create a new thread
const thread = await AnswersService.create({
  question: "What is machine learning?",
  // Additional CreateThreadDto properties
});

// Stream chat responses
const chatGenerator = AnswersService.chat({
  content: "Explain neural networks",
  stream: true,
  parentMessageId: "msg-123"
});

for await (const element of chatGenerator) {
  switch (element.type) {
    case AnswersThreadChatResponseElementType.RESPONSE_CHUNK:
      console.log("Content:", element.content);
      break;
    case AnswersThreadChatResponseElementType.THREAD_CREATED:
      console.log("Thread created:", element.threadUuid);
      break;
  }
}
```

### Thread Management

```typescript
// Get thread details
const thread = await AnswersService.getById("thread-uuid-123");

// List user threads
const threads = await AnswersService.getList({
  folderIsNull: true
});

// Update thread
const updatedThread = await AnswersService.update({
  uuid: "thread-uuid-123",
  dto: { title: "New Title" }
});

// Delete thread
await AnswersService.delete("thread-uuid-123");
```

### Public API Usage

```typescript
import { PublicAnswersServiceBuilder } from '@/lib/services/answers-service';

// Build service with platform credentials
const publicService = PublicAnswersServiceBuilder(platformCredentials);

// Create public thread
const publicThread = await publicService.create({
  question: "How does AI work?",
});

// Stream public chat
for await (const element of publicService.chat({
  content: "Tell me more",
  stream: true
})) {
  console.log(element);
}
```

### Advanced Streaming with News Filters

```typescript
// Chat with news article filtering
const chatWithNews = AnswersService.chat({
  content: "What's happening in tech?",
  stream: true,
  newsFilter: {
    categories: ["technology", "business"],
    dateRange: "last_week"
  },
  newsArticlesFilterId: 456
});

for await (const element of chatWithNews) {
  if (element.type === AnswersThreadChatResponseElementType.NEWS_ARTICLES) {
    console.log("Related articles:", element.articles);
  }
}
```

## Related Types

### Core Interfaces

```typescript
interface AnswersThreadQuestion {
  parentMessageId?: string;
  content?: string;
  stream: boolean;
  newsFilter?: AnswersThreadNewsArticlesFilter;
  newsArticlesFilterId?: number;
}

interface GetAnswersMemberThreadsListParams {
  folderIsNull?: boolean;
}

interface PythonChatParams {
  trace: boolean;
  includeEvents: boolean;
}
```

### Response Types

- `AnswersThread`: Basic thread metadata
- `AnswersThreadWithMessages`: Full thread with message history
- `AnswersThreadChatResponseElement`: Streaming response elements
- `MessageRecommendations`: AI-generated message suggestions
- `AnswersThreadNewsArticlesFilter`: News filtering configuration

### DTOs

- `CreateThreadDto`: Thread creation payload
- `UpdateAnswersMemberThreadDto`: Thread update payload

## Dependencies

### Service Wrappers
- `PrivateApiServiceWrapper`: Handles member authentication
- `PublicPlatformApiServiceWrapper`: Manages platform API credentials

### External Dependencies
- DTOs from `@/lib/dto`
- Types from `@/lib/types`
- Stream processing utilities (built-in)

## Integration

### TanStack Query Integration

```typescript
// Query hooks usage
const { data: thread } = useQuery({
  queryKey: ['answers-thread', threadId],
  queryFn: ({ signal }) => AnswersService.getById(threadId, signal),
});

const { data: threads } = useQuery({
  queryKey: ['answers-threads'],
  queryFn: ({ signal }) => AnswersService.getList({}, signal),
});

// Mutation hooks
const createThread = useMutation({
  mutationFn: (dto: CreateThreadDto) => AnswersService.create(dto),
});

const updateThread = useMutation({
  mutationFn: (data: {uuid: string, dto: UpdateAnswersMemberThreadDto}) => 
    AnswersService.update(data),
});
```

### Streaming Integration

```typescript
// Custom hook for streaming chat
function useChatStream(question: AnswersThreadQuestion) {
  const [elements, setElements] = useState<AnswersThreadChatResponseElement[]>([]);
  
  useEffect(() => {
    const startChat = async () => {
      const generator = AnswersService.chat(question);
      for await (const element of generator) {
        setElements(prev => [...prev, element]);
      }
    };
    
    startChat();
  }, [question]);
  
  return elements;
}
```

## Best Practices

### Service Architecture Compliance

✅ **Simple, focused methods**: Each method handles one specific operation  
✅ **No error handling**: Errors propagated to query layer  
✅ **No data transformation**: Returns raw API responses  
✅ **Proper credential management**: Uses appropriate service wrappers  
✅ **HTTP Exception pattern**: Throws HttpException for non-2xx responses  

### Streaming Best Practices

- Always handle AbortSignal for cancellation
- Process stream elements incrementally for better UX
- Concatenate consecutive RESPONSE_CHUNK elements to minimize re-renders
- Handle incomplete JSON lines in stream buffer

### Performance Considerations

- Use AbortSignal for request cancellation
- Implement proper cleanup for streaming connections
- Leverage TanStack Query caching for thread data
- Consider pagination for large thread lists

### Security Notes

- Private API requires authenticated session
- Public API requires platform credentials
- All requests support cancellation through AbortSignal
- Stream connections are automatically cleaned up