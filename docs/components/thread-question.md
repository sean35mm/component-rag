# ThreadQuestion Component

## Purpose

The `ThreadQuestion` component displays a formatted question within a thread-based answer pair interface. It dynamically adjusts typography size based on question length to ensure optimal readability and visual hierarchy. The component provides responsive design and smooth animations for enhanced user experience in conversational interfaces.

## Component Type

**Client Component** - Uses `'use client'` directive because it implements:
- Framer Motion animations with `motion.div` and animation states
- Interactive hover states that require client-side event handling
- Dynamic styling that responds to user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `question` | `string` | Yes | The question text to display. Length determines typography variant automatically |

## Usage Example

```tsx
import { ThreadQuestion } from '@/components/answers/thread-question-answer-pair/thread-question';

// Short question (large typography)
<ThreadQuestion question="What is React?" />

// Medium question (medium typography)
<ThreadQuestion question="How do I implement state management in a React application using modern patterns?" />

// Long question (compact typography)
<ThreadQuestion question="Can you explain the differences between server components and client components in Next.js 13+ App Router, including when to use each approach, performance implications, and how they affect the overall application architecture when building full-stack applications?" />

// In a thread context
function ThreadQuestionAnswerPair({ question, answer }) {
  return (
    <div className="space-y-4">
      <ThreadQuestion question={question} />
      <ThreadAnswer answer={answer} />
    </div>
  );
}
```

## Functionality

### Dynamic Typography Scaling
- **Large Questions (750+ chars)**: Uses `headlines14` for compact display
- **Medium Questions (350-750 chars)**: Uses `headlines16` for balanced readability
- **Short Questions (<350 chars)**: Uses `headlines24` for prominent display

### Responsive Layout
- **Mobile**: Single column layout with stacked elements
- **Desktop**: Flexible row layout with proper spacing and max-width constraints

### Animation System
- Framer Motion integration with `initial` and `hover` states
- Smooth transitions for interactive feedback
- Group-based hover effects for coordinated animations

### Accessibility Features
- Semantic typography with proper color contrast (800 color variant)
- Flexible text wrapping with gap spacing
- Keyboard navigation support through proper DOM structure

## State Management

**No State Management** - This is a pure presentational component that:
- Receives props and renders content without internal state
- Uses computed values (`getVariant`) based on props
- Follows functional programming patterns for predictable rendering

## Side Effects

**No Side Effects** - The component:
- Performs no API calls or data fetching
- Has no external service dependencies
- Uses pure functions for all computations
- Relies on parent components for data provisioning

## Dependencies

### Internal Components
- `Typography` - Core typography component from UI library
- `typographyVariants` - Variant system for consistent text styling

### External Libraries
- `framer-motion` - Animation and interaction handling
- `class-variance-authority` - Type-safe variant prop management

### Utility Functions
- `getVariant()` - Pure function for typography variant calculation
- Constants: `TEXT_THRESHOLDS`, `HEADING_VARIANTS`

## Integration

### Application Architecture Role
```
Thread Interface Layer
├── ThreadQuestionAnswerPair (Parent)
├── ThreadQuestion (Current)
└── ThreadAnswer (Sibling)
```

### Data Flow Pattern
```tsx
// Typical integration in answer display system
function AnswerThread({ threadData }) {
  return (
    <div className="answer-thread">
      {threadData.pairs.map((pair, index) => (
        <div key={index} className="thread-pair">
          <ThreadQuestion question={pair.question} />
          <ThreadAnswer answer={pair.answer} />
        </div>
      ))}
    </div>
  );
}
```

### Design System Integration
- Follows UI component patterns with consistent spacing
- Integrates with application's typography system
- Maintains responsive design principles across breakpoints

## Best Practices

### Architecture Compliance
✅ **Proper Client Component Usage** - Justifiable use of client-side features for animations
✅ **Component Decomposition** - Single responsibility focused on question display
✅ **Reusable Design** - Generic enough for various thread contexts
✅ **Type Safety** - Full TypeScript integration with proper prop interfaces

### Performance Optimization
```tsx
// Efficient variant calculation
const variant = useMemo(() => getVariant(question.length), [question.length]);

// Consider memoization for expensive re-renders
export const ThreadQuestion = memo(function ThreadQuestion(props: ThreadQuestionProps) {
  // Component implementation
});
```

### Accessibility Best Practices
```tsx
// Enhanced accessibility example
<Typography
  as="h3" // Semantic heading for screen readers
  role="heading"
  aria-level={3}
  variant={variant}
  className="flex flex-wrap items-center gap-2"
>
  {question}
</Typography>
```

### Integration Patterns
```tsx
// Recommended usage with error boundaries
<ErrorBoundary fallback={<QuestionLoadingState />}>
  <ThreadQuestion question={validatedQuestion} />
</ErrorBoundary>
```

This component exemplifies our architecture principles by maintaining clear separation of concerns, providing predictable behavior, and integrating seamlessly with the broader design system while delivering smooth user interactions.