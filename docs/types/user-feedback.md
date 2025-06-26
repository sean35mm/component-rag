# User Feedback Types Documentation

## Purpose

The user feedback types define the enumerated values for categorizing user feedback across different features in the application. These types establish a consistent vocabulary for feedback collection, enabling systematic analysis and processing of user input on stories, AI chat responses, and signals.

This type system supports the application's feedback mechanism by providing structured categories for feedback type, location context, and user reasoning, ensuring consistent data collection and analysis across the platform.

## Type Definition

```typescript
// Feedback feature categorization
export enum UserFeedbackType {
  STORY = 'STORY',
  AI_CHAT = 'AI_CHAT',
  SIGNAL = 'SIGNAL',
}

// UI location context for feedback
export enum UserFeedbackLocation {
  STORY_SUMMARY = 'STORY_SUMMARY',
  ARTICLE_PREVIEW = 'ARTICLE_PREVIEW',
  AI_CHAT = 'CHAT_RESPONSE',
  SIGNAL = 'SIGNAL',
}

// User's reasoning for providing feedback
export enum UserFeedbackReason {
  INACCURATE = 'INACCURATE',
  LOW_QUALITY = 'LOW_QUALITY',
  MISSING_DETAILS = 'MISSING_DETAILS',
  HARMFUL = 'HARMFUL',
  OPINIONATED = 'OPINIONATED',
  NOT_HELPFUL = 'NOT_HELPFUL',
  DOESNT_MATCH_QUERY = 'DOESNT_MATCH_QUERY',
  UNEXPECTED_RESULTS = 'UNEXPECTED_RESULTS',
  POSITIVE = 'POSITIVE',
}
```

## Properties

### UserFeedbackType Enum

| Value | Description | Use Case |
|-------|-------------|----------|
| `STORY` | Feedback on story content and presentation | Story summaries, article content |
| `AI_CHAT` | Feedback on AI-generated chat responses | Chat interactions, AI suggestions |
| `SIGNAL` | Feedback on signal detection and relevance | Signal accuracy, signal quality |

### UserFeedbackLocation Enum

| Value | Description | Context |
|-------|-------------|---------|
| `STORY_SUMMARY` | Feedback from story summary views | Story overview pages |
| `ARTICLE_PREVIEW` | Feedback from article preview components | Article preview cards, snippets |
| `AI_CHAT` | Feedback from chat response interface | Chat conversation threads |
| `SIGNAL` | Feedback from signal display components | Signal dashboard, signal details |

### UserFeedbackReason Enum

| Value | Description | Sentiment | Applicable Types |
|-------|-------------|-----------|------------------|
| `INACCURATE` | Content contains factual errors | Negative | All types |
| `LOW_QUALITY` | Poor content quality or presentation | Negative | All types |
| `MISSING_DETAILS` | Lacks necessary information | Negative | STORY, AI_CHAT |
| `HARMFUL` | Contains harmful or inappropriate content | Negative | All types |
| `OPINIONATED` | Content is biased or opinion-based | Negative | STORY, AI_CHAT |
| `NOT_HELPFUL` | Content doesn't provide value | Negative | AI_CHAT, SIGNAL |
| `DOESNT_MATCH_QUERY` | Response doesn't match user query | Negative | AI_CHAT |
| `UNEXPECTED_RESULTS` | Results differ from expectations | Negative | SIGNAL |
| `POSITIVE` | General positive feedback | Positive | All types |

## Usage Examples

### Basic Enum Usage

```typescript
import { UserFeedbackType, UserFeedbackLocation, UserFeedbackReason } from '@/lib/types/user-feedback';

// Creating feedback categorization
const feedbackCategory = UserFeedbackType.AI_CHAT;
const feedbackLocation = UserFeedbackLocation.AI_CHAT;
const feedbackReason = UserFeedbackReason.NOT_HELPFUL;
```

### Domain Object Interface

```typescript
interface UserFeedback {
  readonly id: string;
  readonly userId: string;
  readonly type: UserFeedbackType;
  readonly location: UserFeedbackLocation;
  readonly reason: UserFeedbackReason;
  readonly contentId: string;
  readonly comment?: string;
  readonly timestamp: Date;
  readonly resolved: boolean;
}
```

### Component Integration

```typescript
interface FeedbackFormProps {
  readonly contentId: string;
  readonly feedbackType: UserFeedbackType;
  readonly location: UserFeedbackLocation;
  readonly onSubmit: (feedback: UserFeedbackSubmission) => Promise<void>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  contentId, 
  feedbackType, 
  location, 
  onSubmit 
}) => {
  const [selectedReason, setSelectedReason] = useState<UserFeedbackReason | null>(null);
  
  const handleSubmit = async (comment: string) => {
    if (!selectedReason) return;
    
    await onSubmit({
      contentId,
      type: feedbackType,
      location,
      reason: selectedReason,
      comment: comment.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReasonSelector
        reasons={getApplicableReasons(feedbackType)}
        selected={selectedReason}
        onChange={setSelectedReason}
      />
      {/* Form implementation */}
    </form>
  );
};
```

### Service Integration

```typescript
interface FeedbackService {
  readonly submitFeedback: (feedback: UserFeedbackSubmission) => Promise<UserFeedback>;
  readonly getFeedbackByType: (type: UserFeedbackType) => Promise<readonly UserFeedback[]>;
  readonly getFeedbackMetrics: () => Promise<FeedbackMetrics>;
}

const feedbackService: FeedbackService = {
  async submitFeedback(submission: UserFeedbackSubmission): Promise<UserFeedback> {
    const response = await api.post('/api/feedback', {
      ...submission,
      timestamp: new Date().toISOString(),
    });
    return response.data;
  },

  async getFeedbackByType(type: UserFeedbackType): Promise<readonly UserFeedback[]> {
    const response = await api.get(`/api/feedback?type=${type}`);
    return response.data;
  },
};
```

## Type Architecture Pattern

Following our domain-first approach:

### 1. Domain Objects (Primary)
```typescript
// Core domain representation
interface UserFeedback {
  readonly id: string;
  readonly userId: string;
  readonly type: UserFeedbackType;
  readonly location: UserFeedbackLocation;
  readonly reason: UserFeedbackReason;
  readonly contentId: string;
  readonly comment?: string;
  readonly timestamp: Date;
  readonly resolved: boolean;
}
```

### 2. Request Types
```typescript
// API request payload
interface UserFeedbackSubmission {
  readonly type: UserFeedbackType;
  readonly location: UserFeedbackLocation;
  readonly reason: UserFeedbackReason;
  readonly contentId: string;
  readonly comment?: string;
}

// Feedback query parameters
interface FeedbackQueryParams {
  readonly type?: UserFeedbackType;
  readonly location?: UserFeedbackLocation;
  readonly resolved?: boolean;
  readonly limit?: number;
  readonly offset?: number;
}
```

### 3. Response Types
```typescript
// API response shapes
interface FeedbackResponse {
  readonly feedback: UserFeedback;
  readonly success: boolean;
}

interface FeedbackListResponse {
  readonly feedbacks: readonly UserFeedback[];
  readonly total: number;
  readonly hasMore: boolean;
}

interface FeedbackMetrics {
  readonly totalFeedback: number;
  readonly byType: Record<UserFeedbackType, number>;
  readonly byReason: Record<UserFeedbackReason, number>;
  readonly positiveRatio: number;
}
```

## Related Types

### Feedback Context Types
```typescript
// Content-specific feedback context
interface StoryFeedbackContext {
  readonly storyId: string;
  readonly title: string;
  readonly summary: string;
}

interface ChatFeedbackContext {
  readonly conversationId: string;
  readonly messageId: string;
  readonly query: string;
  readonly response: string;
}

interface SignalFeedbackContext {
  readonly signalId: string;
  readonly signalType: string;
  readonly confidence: number;
}
```

### Utility Types
```typescript
// Type-specific reason filtering
type StoryFeedbackReason = Exclude<UserFeedbackReason, 'DOESNT_MATCH_QUERY' | 'UNEXPECTED_RESULTS'>;
type ChatFeedbackReason = Exclude<UserFeedbackReason, 'UNEXPECTED_RESULTS'>;
type SignalFeedbackReason = Exclude<UserFeedbackReason, 'MISSING_DETAILS' | 'OPINIONATED' | 'DOESNT_MATCH_QUERY'>;

// Feedback aggregation types
type FeedbackByLocation = Record<UserFeedbackLocation, readonly UserFeedback[]>;
type ReasonDistribution = Record<UserFeedbackReason, number>;
```

## Integration Points

### Components
- `FeedbackButton` - Feedback collection trigger
- `FeedbackForm` - Feedback submission interface
- `FeedbackModal` - Modal feedback collection
- `FeedbackSummary` - Admin feedback overview

### Services
- `FeedbackService` - Feedback CRUD operations
- `AnalyticsService` - Feedback metrics and reporting
- `NotificationService` - Feedback alerts and notifications

### Hooks
- `useFeedback` - Feedback submission and retrieval
- `useFeedbackMetrics` - Feedback analytics
- `useFeedbackForm` - Form state management

## Validation

### Zod Schemas

```typescript
import { z } from 'zod';

// Enum validation schemas
const UserFeedbackTypeSchema = z.nativeEnum(UserFeedbackType);
const UserFeedbackLocationSchema = z.nativeEnum(UserFeedbackLocation);
const UserFeedbackReasonSchema = z.nativeEnum(UserFeedbackReason);

// Domain object validation
const UserFeedbackSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: UserFeedbackTypeSchema,
  location: UserFeedbackLocationSchema,
  reason: UserFeedbackReasonSchema,
  contentId: z.string().min(1),
  comment: z.string().optional(),
  timestamp: z.date(),
  resolved: z.boolean(),
});

// Request validation
const FeedbackSubmissionSchema = z.object({
  type: UserFeedbackTypeSchema,
  location: UserFeedbackLocationSchema,
  reason: UserFeedbackReasonSchema,
  contentId: z.string().min(1),
  comment: z.string().max(1000).optional(),
});

// Custom validation for reason-type compatibility
const validateFeedbackReason = (type: UserFeedbackType, reason: UserFeedbackReason): boolean => {
  const incompatibleCombinations: Array<[UserFeedbackType, UserFeedbackReason]> = [
    [UserFeedbackType.STORY, UserFeedbackReason.DOESNT_MATCH_QUERY],
    [UserFeedbackType.STORY, UserFeedbackReason.UNEXPECTED_RESULTS],
    [UserFeedbackType.SIGNAL, UserFeedbackReason.MISSING_DETAILS],
    [UserFeedbackType.SIGNAL, UserFeedbackReason.OPINIONATED],
  ];
  
  return !incompatibleCombinations.some(([t, r]) => t === type && r === reason);
};
```

## Best Practices

### 1. Enum Usage Patterns
```typescript
// ✅ Use enum values directly
const feedbackType = UserFeedbackType.AI_CHAT;

// ✅ Type-safe enum iteration
const allFeedbackTypes = Object.values(UserFeedbackType);

// ❌ Avoid string literals
const badType = 'AI_CHAT'; // Type error potential
```

### 2. Type Composition
```typescript
// ✅ Compose with utility types
interface FeedbackFilter {
  readonly types?: readonly UserFeedbackType[];
  readonly locations?: readonly UserFeedbackLocation[];
  readonly reasons?: readonly UserFeedbackReason[];
}

// ✅ Use conditional types for context-specific validation
type FeedbackReasonForType<T extends UserFeedbackType> = 
  T extends UserFeedbackType.STORY ? StoryFeedbackReason :
  T extends UserFeedbackType.AI_CHAT ? ChatFeedbackReason :
  T extends UserFeedbackType.SIGNAL ? SignalFeedbackReason :
  UserFeedbackReason;
```

### 3. Strict Interface Design
```typescript
// ✅ Use readonly for immutable data
interface UserFeedback {
  readonly id: string;
  readonly type: UserFeedbackType;
  // ... other readonly properties
}

// ✅ Prefer interfaces over types for extensibility
interface FeedbackContext {
  readonly contentId: string;
  readonly metadata: Record<string, unknown>;
}

// ✅ Use branded types for IDs
type FeedbackId = string & { readonly __brand: 'FeedbackId' };
```

### 4. Error Handling
```typescript
// ✅ Type-safe error handling
interface FeedbackError {
  readonly code: 'INVALID_REASON' | 'CONTENT_NOT_FOUND' | 'RATE_LIMITED';
  readonly message: string;
  readonly context?: {
    readonly type?: UserFeedbackType;
    readonly reason?: UserFeedbackReason;
  };
}

// ✅ Result type pattern
type FeedbackResult<T> = 
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: FeedbackError };
```

This type system provides a robust foundation for user feedback collection while maintaining type safety and clear categorization across all feedback contexts in the application.