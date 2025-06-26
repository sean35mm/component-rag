# Question Type Documentation

## Purpose

The `Question` interface represents a fundamental domain object for FAQ or Q&A functionality within the application. It encapsulates a question-answer pair along with supporting reference materials, providing a structured way to store and manage knowledge base content.

## Type Definition

```typescript
export interface Question {
  question: string;
  answer: string;
  references: string[];
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `question` | `string` | ✅ | The question text or query being addressed |
| `answer` | `string` | ✅ | The corresponding answer or response to the question |
| `references` | `string[]` | ✅ | Array of reference URLs, citations, or source identifiers supporting the answer |

## Usage Examples

### Basic Question Creation

```typescript
import { Question } from '@/lib/types/question';

const faqItem: Question = {
  question: "What is TypeScript?",
  answer: "TypeScript is a strongly typed programming language that builds on JavaScript.",
  references: [
    "https://www.typescriptlang.org/docs/",
    "https://github.com/microsoft/TypeScript"
  ]
};
```

### Component Usage

```tsx
import React from 'react';
import { Question } from '@/lib/types/question';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="question-card">
      <h3>{question.question}</h3>
      <p>{question.answer}</p>
      {question.references.length > 0 && (
        <div className="references">
          <h4>References:</h4>
          <ul>
            {question.references.map((ref, index) => (
              <li key={index}>
                <a href={ref} target="_blank" rel="noopener noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
```

### Service Layer Integration

```typescript
import { Question } from '@/lib/types/question';

class QuestionService {
  async getQuestions(): Promise<Question[]> {
    const response = await fetch('/api/questions');
    return response.json();
  }

  async searchQuestions(query: string): Promise<Question[]> {
    const response = await fetch(`/api/questions/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }

  async createQuestion(question: Omit<Question, 'id'>): Promise<Question> {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question)
    });
    return response.json();
  }
}
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### 1. Domain Object (Current)
```typescript
// Base domain object
export interface Question {
  question: string;
  answer: string;
  references: string[];
}
```

### 2. Response Types
```typescript
// API response with metadata
export interface QuestionResponse extends Question {
  id: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
}

// Collection response
export interface QuestionsListResponse {
  questions: QuestionResponse[];
  total: number;
  page: number;
  limit: number;
}

// Search response with relevance scoring
export interface QuestionSearchResponse extends QuestionResponse {
  relevanceScore: number;
  matchedTerms: string[];
}
```

### 3. Request Types
```typescript
// Creation request
export interface CreateQuestionRequest extends Question {
  tags?: string[];
  authorId: string;
}

// Update request
export interface UpdateQuestionRequest extends Partial<Question> {
  id: string;
  tags?: string[];
}

// Search request
export interface SearchQuestionsRequest {
  query: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}
```

## Related Types

### Extended Domain Types
```typescript
// FAQ-specific extension
export interface FAQQuestion extends Question {
  category: string;
  priority: 'high' | 'medium' | 'low';
  isPublic: boolean;
}

// Interactive Q&A with voting
export interface InteractiveQuestion extends Question {
  upvotes: number;
  downvotes: number;
  viewCount: number;
  lastModified: Date;
}
```

### Utility Types
```typescript
// For forms or partial updates
type QuestionDraft = Partial<Question>;

// For display-only contexts
type QuestionSummary = Pick<Question, 'question'>;

// For validation or processing
type QuestionContent = Omit<Question, 'references'>;
```

## Integration Points

### Components
- **QuestionCard**: Displays individual questions
- **QuestionList**: Renders collections of questions
- **QuestionForm**: Creates/edits questions
- **SearchResults**: Shows filtered questions

### Services
- **QuestionService**: CRUD operations
- **SearchService**: Question search functionality
- **ValidationService**: Question content validation

### Hooks
```typescript
import { Question } from '@/lib/types/question';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  // Implementation...
};

export const useQuestionSearch = (query: string) => {
  const [results, setResults] = useState<Question[]>([]);
  // Implementation...
};
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const QuestionSchema = z.object({
  question: z.string()
    .min(5, 'Question must be at least 5 characters')
    .max(500, 'Question must not exceed 500 characters'),
  answer: z.string()
    .min(10, 'Answer must be at least 10 characters')
    .max(2000, 'Answer must not exceed 2000 characters'),
  references: z.array(z.string().url('Each reference must be a valid URL'))
    .min(0)
    .max(10, 'Maximum 10 references allowed')
});

// Type inference from schema
export type ValidatedQuestion = z.infer<typeof QuestionSchema>;
```

### Validation Usage
```typescript
import { QuestionSchema } from '@/lib/validation/question';

export const validateQuestion = (data: unknown): Question => {
  return QuestionSchema.parse(data);
};

export const isValidQuestion = (data: unknown): data is Question => {
  return QuestionSchema.safeParse(data).success;
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties use specific string types rather than `any`
2. **Interface Usage**: Uses `interface` for object shape definition
3. **Domain-First Design**: Represents core business entity without implementation details
4. **Utility Types**: Examples show proper use of `Omit`, `Partial`, `Pick`
5. **Type Architecture**: Follows domain → response → request pattern

### 🎯 Recommended Patterns

```typescript
// ✅ Good: Extend the base type for specific use cases
interface AdminQuestion extends Question {
  moderationStatus: 'pending' | 'approved' | 'rejected';
}

// ✅ Good: Use utility types for operations
type QuestionUpdate = Partial<Pick<Question, 'answer' | 'references'>>;

// ✅ Good: Compose with other domain types
interface QuestionWithAuthor {
  question: Question;
  author: User;
}

// ❌ Avoid: Modifying the base interface directly
// Don't add optional UI-specific properties to the core domain type
```

### 🔧 Extension Strategies

```typescript
// For different contexts, create specific interfaces
export interface DisplayQuestion extends Question {
  readonly formattedAnswer: string;
  readonly referenceCount: number;
}

// For API boundaries
export interface QuestionDTO {
  question: string;
  answer: string;
  references: string[];
  metadata?: Record<string, unknown>;
}
```

This type serves as a solid foundation for Q&A functionality while maintaining strict typing standards and clear architectural boundaries.