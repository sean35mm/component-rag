# AnswersThreadSourceBuilder Component

## Purpose

The `AnswersThreadSourceBuilder` component displays a collapsible sidebar of sources and citations for AI-generated answers in a thread interface. It provides users with quick access to reference materials, citation previews, and source management functionality. The component adapts its layout for different screen sizes and includes loading states for better user experience.

## Component Type

**Client Component** - Uses the 'use client' directive because it:
- Relies on browser-specific hooks (`useBreakpoint`)
- Implements interactive animations with Framer Motion
- Manages responsive behavior and user interactions
- Requires access to DOM measurements and viewport data

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| `citations` | `AnswersThreadHistoryItemCitations` | Yes | Map of citations to display in the source builder |
| `isSourcesLoading` | `boolean` | Yes | Loading state indicator for source data |
| `onArticleClick` | `(articleId: string, url: string, title: string) => void` | Yes | Callback when a user clicks on an article citation |
| `onViewSources` | `() => void` | Yes | Callback when user clicks the "View/Edit Sources" button |

## Usage Example

```tsx
import { AnswersThreadSourceBuilder } from '@/components/answers/thread-question-answer-pair/thread-source-builder';

function AnswersThreadContainer() {
  const [citations, setCitations] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const handleArticleClick = (articleId: string, url: string, title: string) => {
    // Navigate to article or open in modal
    router.push(`/articles/${articleId}`);
  };

  const handleViewSources = () => {
    // Open sources management modal
    setSourcesModalOpen(true);
  };

  return (
    <div className="flex gap-6">
      <main className="flex-1">
        {/* Main content */}
      </main>
      <aside>
        <AnswersThreadSourceBuilder
          citations={citations}
          isSourcesLoading={isLoading}
          onArticleClick={handleArticleClick}
          onViewSources={handleViewSources}
        />
      </aside>
    </div>
  );
}
```

## Functionality

### Core Features
- **Citation Display**: Shows up to 4 citations with preview information
- **Responsive Layout**: Adapts between mobile and desktop presentations
- **Publication Dates**: Displays the most recent publication date across sources
- **Interactive Citations**: Clickable citation previews with hover states
- **Source Management**: Button to access full source editing interface
- **Loading States**: Comprehensive fallback UI during data loading

### Responsive Behavior
- **Desktop**: Sticky sidebar with full citation previews and source count
- **Mobile**: Condensed view with citation bubbles and simplified layout
- **Breakpoint**: Uses `lg` breakpoint for layout switching

### Animation
- Smooth opacity transitions when citations appear/disappear
- Motion-based reveals for better perceived performance

## State Management

**Local State Only** - Component uses:
- `useMemo` hooks for computed values (citation sorting, date calculations)
- No external state management required
- Props-driven architecture for maximum reusability

### Computed Values
```tsx
// Sorted and limited citation list
const citationList = useMemo(() => 
  Array.from(citations.values())
    .toSorted((it1, it2) => it1.sequenceIndex - it2.sequenceIndex)
    .slice(0, MAX_NUMBER),
  [citations]
);

// Most recent publication date
const mostRecent = useMemo(() => {
  // Complex date comparison logic
}, [citationList]);
```

## Side Effects

**No Direct Side Effects** - Component is purely presentational:
- All interactions handled through callback props
- No API calls or external data fetching
- No global state mutations

## Dependencies

### UI Components
- `Button`, `Card`, `Skeleton`, `Typography` from design system
- `CitationBubbleListFromArticles` for mobile citation display
- `CitationPreview` for individual citation rendering

### Hooks & Utilities
- `useBreakpoint` for responsive behavior
- `cn` utility for conditional styling
- `formatDistance` from date-fns for relative dates

### External Libraries
- **Framer Motion**: Animation and transitions
- **Pluralize**: Dynamic text pluralization
- **Date-fns**: Date formatting and calculations

## Integration

### Application Architecture
```
AnswersThread
├── ThreadQuestionAnswerPair
│   ├── ThreadChatMessage (main content)
│   └── AnswersThreadSourceBuilder (sidebar)
└── SourcesModal (launched via onViewSources)
```

### Data Flow
1. Parent component provides citations map
2. Component sorts and filters for display
3. User interactions bubble up through callbacks
4. External components handle navigation and modals

## Best Practices

### ✅ Follows Architecture Guidelines

**Component Decomposition**: 
- Flat structure with clear separation of concerns
- Fallback component for loading states
- Reusable citation preview components

**Performance Optimization**:
- Memoized computations for expensive operations
- Efficient sorting and filtering with proper dependencies
- Conditional rendering based on data availability

**Responsive Design**:
- Breakpoint-based layout switching
- Mobile-first approach with desktop enhancements
- Consistent spacing and typography scales

### Code Quality
- **Constants**: `MAX_NUMBER` exported for reuse
- **Type Safety**: Full TypeScript integration
- **Accessibility**: Semantic HTML structure with proper ARIA labels
- **Error Handling**: Graceful fallbacks for missing data

### Integration Patterns
- **Callback Props**: Clean separation of concerns
- **Compound Components**: Works seamlessly with related citation components
- **State Lifting**: All state management handled by parent components