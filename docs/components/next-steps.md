# NextSteps Component Documentation

## Purpose

The `NextSteps` component provides users with actionable follow-up options after receiving an answer in the chat interface. It presents two distinct sections: "Explore more" with recommendation cards for deeper exploration of related topics, and "Continue the conversation" with follow-up questions to extend the current chat thread. This component enhances user engagement by suggesting relevant next actions based on the current conversation context.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through callback handlers
- Integrates with Zustand stores (`useAnswersThreadChatStore`)
- Handles user interactions (clicks on recommendations and follow-ups)
- Requires browser-side event handling for accordion interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `recommendations` | `NextStepRecommendationType[]` | ✅ | Array of recommendation objects for the "Explore more" section |
| `isBuildingNextSteps` | `boolean` | ✅ | Loading state indicator that shows skeletons while generating recommendations |
| `isOpenByDefault` | `boolean` | ✅ | Controls whether accordion sections are expanded by default |
| `showNextSteps` | `boolean` | ✅ | Master toggle to show/hide the entire next steps component |
| `answerHadCitations` | `boolean` | ✅ | Determines if "Explore more" section should be shown (requires citations) |
| `followups` | `string[]` | ❌ | Array of follow-up question strings for conversation continuation |
| `onRecommendationClick` | `(recommendation: NextStepRecommendationType) => Promise<void>` | ❌ | Callback fired when user clicks a recommendation card |

## Usage Example

```tsx
import { NextSteps } from '@/components/answers/next-steps/next-steps';
import { NextStepRecommendationType } from '@/lib/types';

function ChatAnswerContainer() {
  const recommendations: NextStepRecommendationType[] = [
    {
      id: '1',
      title: 'Learn about React Hooks',
      description: 'Dive deeper into useState and useEffect',
      category: 'tutorial'
    }
  ];

  const followups = [
    'What are the best practices for using React Hooks?',
    'How do I handle side effects in functional components?',
    'What is the difference between useState and useReducer?'
  ];

  const handleRecommendationClick = async (rec: NextStepRecommendationType) => {
    // Navigate to detailed content or start new search
    await startNewSearch(rec.title);
  };

  return (
    <div className="chat-answer">
      {/* Answer content */}
      
      <NextSteps
        recommendations={recommendations}
        isBuildingNextSteps={false}
        isOpenByDefault={true}
        showNextSteps={true}
        answerHadCitations={true}
        followups={followups}
        onRecommendationClick={handleRecommendationClick}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Intelligently shows/hides sections based on content availability
- **Dual Section Layout**: Separates exploration recommendations from conversational follow-ups
- **Loading States**: Displays skeleton placeholders while generating next steps
- **Responsive Design**: Adapts grid layout for mobile and desktop viewing
- **Accordion Interaction**: Collapsible sections for better space management

### Content Sections
1. **Explore More**: Grid of recommendation cards for topic exploration
2. **Continue Conversation**: List of suggested follow-up questions

### Smart Display Logic
- Only renders when `showNextSteps` is true AND at least one section has content
- "Explore more" requires both recommendations AND citations from the answer
- "Continue conversation" requires follow-up questions array

## State Management

### External State Integration
- **Zustand Store**: Accesses `useAnswersThreadChatStore` for current thread context
- **Thread Name**: Retrieves active thread name for question continuity
- **Filter Query**: Uses `useGetFilterQuery` hook for maintaining search context

### Local State
- **Callback Memoization**: Uses `useCallback` to optimize `onFollowupClick` performance
- **Derived State**: Computes section visibility based on props and content availability

## Side Effects

### User Interactions
- **Follow-up Questions**: Triggers new questions in the current thread context via `onAskQuestion`
- **Recommendation Clicks**: Executes optional callback for custom recommendation handling
- **Context Preservation**: Maintains filter query and thread name across interactions

### No Direct API Calls
The component itself doesn't make API calls but facilitates actions that trigger them through the provided hooks and callbacks.

## Dependencies

### Internal Components
- `AccordionSection` - Collapsible container for each section
- `Skeleton` - Loading state placeholders
- `ThreadChatDivider` - Visual separator between sections
- `NextStepGridItem` - Individual recommendation card
- `NextStepFollowupItem` - Individual follow-up question item

### Hooks & Context
- `useAnswersThreadChatStore` - Thread state management
- `useAskQuestion` - Question submission functionality
- `useGetFilterQuery` - Search filter context

### Type Dependencies
- `NextStepRecommendationType` - Recommendation object structure

## Integration

### Chat Flow Integration
The component serves as a natural conclusion to chat answers, providing pathways for continued engagement. It integrates seamlessly with:

- **Answer Components**: Appears after answer content with proper spacing
- **Thread Management**: Maintains conversation continuity through thread context
- **Search System**: Preserves filter state when asking follow-up questions

### Responsive Architecture
- Mobile-first design with single-column layouts
- Desktop enhancement with two-column grid for recommendations
- Consistent spacing and padding across breakpoints

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive features  
✅ **Component Decomposition**: Delegates specific functionality to focused child components  
✅ **State Management**: Leverages Zustand for global state, local state for component-specific logic  
✅ **Conditional Rendering**: Implements smart display logic to avoid empty states  

### Performance Optimizations
✅ **Callback Memoization**: Uses `useCallback` to prevent unnecessary re-renders  
✅ **Early Returns**: Exits rendering early when content is not needed  
✅ **Skeleton Loading**: Provides immediate feedback during content generation  

### User Experience
✅ **Progressive Disclosure**: Uses accordions to manage content density  
✅ **Context Preservation**: Maintains user's search and thread context  
✅ **Accessible Interactions**: Leverages semantic button components for actions  

### Integration Patterns
✅ **Flexible Callbacks**: Accepts optional handlers for customizable behavior  
✅ **Content-Aware Display**: Shows sections only when relevant content exists  
✅ **Responsive Design**: Adapts layout appropriately across device sizes