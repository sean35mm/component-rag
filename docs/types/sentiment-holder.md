# SentimentHolder Type Documentation

## Purpose

The `SentimentHolder` interface defines a structured container for sentiment analysis data, representing the distribution of emotional tone across three primary categories: positive, negative, and neutral sentiments. This type serves as a foundational data structure for sentiment analysis features throughout the application, enabling consistent representation of sentiment scoring and analysis results.

## Type Definition

```typescript
export interface SentimentHolder {
  positive: number;
  negative: number;
  neutral: number;
}
```

This interface follows our strict typing guidelines by:
- Using `interface` over `type` for object shapes
- Implementing strict typing with explicit `number` types
- Avoiding `any` types completely
- Providing a clear, domain-focused structure

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `positive` | `number` | ✅ | Numeric value representing positive sentiment score or count |
| `negative` | `number` | ✅ | Numeric value representing negative sentiment score or count |
| `neutral` | `number` | ✅ | Numeric value representing neutral sentiment score or count |

## Usage Examples

### Basic Implementation

```typescript
import { SentimentHolder } from '@/lib/types/sentiment-holder';

// Creating a sentiment analysis result
const sentimentAnalysis: SentimentHolder = {
  positive: 0.75,
  negative: 0.15,
  neutral: 0.10
};

// Using in a function
function calculateSentimentTotal(sentiment: SentimentHolder): number {
  return sentiment.positive + sentiment.negative + sentiment.neutral;
}
```

### Component Usage

```tsx
import React from 'react';
import { SentimentHolder } from '@/lib/types/sentiment-holder';

interface SentimentDisplayProps {
  sentiment: SentimentHolder;
  showPercentages?: boolean;
}

export const SentimentDisplay: React.FC<SentimentDisplayProps> = ({ 
  sentiment, 
  showPercentages = false 
}) => {
  const total = sentiment.positive + sentiment.negative + sentiment.neutral;
  
  return (
    <div className="sentiment-display">
      <div className="positive">
        Positive: {showPercentages ? `${((sentiment.positive / total) * 100).toFixed(1)}%` : sentiment.positive}
      </div>
      <div className="negative">
        Negative: {showPercentages ? `${((sentiment.negative / total) * 100).toFixed(1)}%` : sentiment.negative}
      </div>
      <div className="neutral">
        Neutral: {showPercentages ? `${((sentiment.neutral / total) * 100).toFixed(1)}%` : sentiment.neutral}
      </div>
    </div>
  );
};
```

### Service Integration

```typescript
import { SentimentHolder } from '@/lib/types/sentiment-holder';

class SentimentAnalysisService {
  async analyzeSentiment(text: string): Promise<SentimentHolder> {
    // API call to sentiment analysis service
    const response = await fetch('/api/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    const data = await response.json();
    
    return {
      positive: data.scores.positive,
      negative: data.scores.negative,
      neutral: data.scores.neutral
    } satisfies SentimentHolder;
  }
}
```

## Type Architecture Pattern

### Domain Object (Current)
```typescript
// Core domain representation
export interface SentimentHolder {
  positive: number;
  negative: number;
  neutral: number;
}
```

### Response Types (Built from domain)
```typescript
// API response containing sentiment data
export interface SentimentAnalysisResponse {
  id: string;
  text: string;
  sentiment: SentimentHolder;
  confidence: number;
  timestamp: string;
}

// Paginated sentiment results
export interface SentimentResultsResponse {
  results: SentimentAnalysisResponse[];
  sentiment: SentimentHolder; // Aggregated sentiment
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
```

### Request Types (Built from domain)
```typescript
// Request for bulk sentiment analysis
export interface BulkSentimentRequest {
  texts: string[];
  options?: {
    includeConfidence?: boolean;
    aggregateResults?: boolean;
  };
}

// Request for sentiment comparison
export interface SentimentComparisonRequest {
  baseline: SentimentHolder;
  comparison: SentimentHolder;
  metrics: ('difference' | 'ratio' | 'correlation')[];
}
```

## Related Types

### Utility Types
```typescript
// Partial sentiment for incomplete analysis
type PartialSentiment = Partial<SentimentHolder>;

// Sentiment keys for iteration
type SentimentKey = keyof SentimentHolder;

// Sentiment values array
type SentimentValues = SentimentHolder[SentimentKey][];

// Read-only sentiment
type ReadonlySentiment = Readonly<SentimentHolder>;
```

### Extended Types
```typescript
// Enhanced sentiment with metadata
interface EnhancedSentimentHolder extends SentimentHolder {
  confidence: number;
  timestamp: Date;
  source: string;
}

// Comparative sentiment analysis
interface SentimentComparison {
  current: SentimentHolder;
  previous: SentimentHolder;
  change: SentimentHolder;
}
```

## Integration Points

### Components
- `SentimentChart` - Visualizes sentiment distribution
- `SentimentMeter` - Displays sentiment as a gauge/meter
- `SentimentTrend` - Shows sentiment changes over time
- `SentimentFilter` - Filters content based on sentiment thresholds

### Services
- `SentimentAnalysisService` - Performs sentiment analysis
- `SentimentAggregationService` - Combines multiple sentiment results
- `SentimentCacheService` - Caches sentiment analysis results

### API Endpoints
- `POST /api/sentiment/analyze` - Single text analysis
- `POST /api/sentiment/bulk` - Bulk text analysis
- `GET /api/sentiment/aggregate` - Aggregate sentiment data

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const SentimentHolderSchema = z.object({
  positive: z.number().min(0).max(1),
  negative: z.number().min(0).max(1),
  neutral: z.number().min(0).max(1)
}).refine(
  (data) => {
    const total = data.positive + data.negative + data.neutral;
    return Math.abs(total - 1) < 0.001; // Allow for floating point precision
  },
  {
    message: "Sentiment values must sum to approximately 1.0"
  }
);

// Alternative schema for count-based sentiment
export const SentimentCountSchema = z.object({
  positive: z.number().int().min(0),
  negative: z.number().int().min(0),
  neutral: z.number().int().min(0)
});
```

### Runtime Validation

```typescript
import { SentimentHolderSchema } from './validation';

function validateSentiment(data: unknown): SentimentHolder {
  const result = SentimentHolderSchema.safeParse(data);
  
  if (!result.success) {
    throw new Error(`Invalid sentiment data: ${result.error.message}`);
  }
  
  return result.data;
}
```

## Best Practices

### 1. **Strict Typing Adherence**
```typescript
// ✅ Good: Explicit typing
const sentiment: SentimentHolder = {
  positive: 0.7,
  negative: 0.2,
  neutral: 0.1
};

// ❌ Avoid: Using any
const sentiment: any = { positive: 0.7 };
```

### 2. **Interface Usage**
```typescript
// ✅ Good: Using interface for object shapes
interface SentimentHolder {
  positive: number;
  negative: number;
  neutral: number;
}

// ❌ Avoid: Using type for simple object shapes
type SentimentHolder = {
  positive: number;
  negative: number;
  neutral: number;
};
```

### 3. **Utility Type Leverage**
```typescript
// ✅ Good: Using utility types for variations
type OptionalSentiment = Partial<SentimentHolder>;
type SentimentSubset = Pick<SentimentHolder, 'positive' | 'negative'>;

// ✅ Good: Type-safe property access
function getSentimentKeys(): (keyof SentimentHolder)[] {
  return ['positive', 'negative', 'neutral'];
}
```

### 4. **Domain-First Architecture**
```typescript
// ✅ Good: Domain object first, then build upon it
interface SentimentHolder { /* core domain */ }
interface SentimentResponse { sentiment: SentimentHolder; /* + metadata */ }
interface SentimentRequest { targetSentiment?: Partial<SentimentHolder>; }
```

### 5. **Type Safety in Operations**
```typescript
// ✅ Good: Type-safe sentiment operations
function normalizeSentiment(sentiment: SentimentHolder): SentimentHolder {
  const total = sentiment.positive + sentiment.negative + sentiment.neutral;
  
  return {
    positive: sentiment.positive / total,
    negative: sentiment.negative / total,
    neutral: sentiment.neutral / total
  } satisfies SentimentHolder;
}
```

This type serves as a cornerstone for sentiment analysis features, providing a consistent, type-safe foundation that integrates seamlessly with our application's type architecture and development practices.