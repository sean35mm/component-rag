# RegenerateButton Component

## Purpose
The `RegenerateButton` component provides a user interface element for regenerating answers in a conversational thread. It handles the regeneration process with proper loading states and integrates with the answers filtering system to maintain context during regeneration.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires:
- Local state management for loading states
- Event handlers for user interactions
- Integration with Zustand store for streaming state
- Browser-specific APIs for user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `question` | `string` | Optional | The question to regenerate an answer for |
| `onRegenerate` | `(filters: AnswersThreadNewsArticlesFilter, question?: string) => Promise<void>` | Required | Callback function called when regeneration is triggered |
| `className` | `string` | Optional | Additional CSS classes to apply to the button |
| `...rest` | `Omit<TooltipButtonProps, 'icon' \| 'tooltip'>` | Optional | All other TooltipButton props except icon and tooltip |

## Usage Example

```tsx
import { RegenerateButton } from '@/components/answers/regenerate-button';
import { AnswersThreadNewsArticlesFilter } from '@/lib/types';

function AnswerCard({ questionText }: { questionText: string }) {
  const handleRegenerate = async (
    filters: AnswersThreadNewsArticlesFilter,
    question?: string
  ) => {
    try {
      // Call your regeneration API
      await regenerateAnswer(question, filters);
      // Handle success
    } catch (error) {
      console.error('Failed to regenerate:', error);
    }
  };

  return (
    <div className="answer-card">
      <div className="answer-content">
        {/* Answer content here */}
      </div>
      <div className="answer-actions">
        <RegenerateButton
          question={questionText}
          onRegenerate={handleRegenerate}
          className="ml-auto"
        />
      </div>
    </div>
  );
}
```

## Functionality

### Core Features
- **Regeneration Trigger**: Initiates answer regeneration with current filters and question
- **Loading State Management**: Shows visual feedback during regeneration process
- **Streaming Integration**: Respects ongoing streaming operations
- **Filter Context**: Automatically includes current filter state in regeneration requests

### Interactive Behaviors
- Displays loading animation (spin) when regeneration is in progress
- Becomes disabled during loading or streaming operations
- Shows tooltip with "Regenerate" text for accessibility
- Maintains cursor state changes for better UX

## State Management

### Local State (useState)
- `isLoading`: Boolean flag tracking regeneration operation status

### Zustand Store Integration
- **useAnswersThreadChatStore**: Accesses `isStreaming` state to prevent concurrent operations

### Custom Hooks
- **useGetFilterQuery**: Retrieves current filter state for regeneration context

## Side Effects

### Async Operations
- Executes the `onRegenerate` callback with proper error handling
- Manages loading state lifecycle (set to true before operation, false in finally block)

### UI Updates
- Applies conditional styling based on loading state
- Updates button accessibility states (disabled/enabled)

## Dependencies

### Internal Components
- `TooltipButton`: Base button component with tooltip functionality
- `PiArrowRoundRight`: Icon component for the regenerate action

### Hooks & Utilities
- `useGetFilterQuery`: Custom hook for filter state management
- `useAnswersThreadChatStore`: Zustand store hook for chat state
- `cn`: Utility for conditional CSS class names

### Types
- `AnswersThreadNewsArticlesFilter`: Type definition for filter parameters
- `TooltipButtonProps`: Base props interface from TooltipButton

## Integration

### Application Architecture
- **Feature Component**: Domain-specific component for answers functionality
- **Composition Pattern**: Extends TooltipButton while adding specialized behavior
- **Filter Integration**: Seamlessly works with the application's filtering system
- **State Coordination**: Integrates with global chat state management

### Data Flow
1. Component receives regeneration callback via props
2. User clicks button triggering `handleRegenerate`
3. Current filters are retrieved via `useGetFilterQuery`
4. Callback is executed with filters and question
5. Loading states are managed throughout the process

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses 'use client' only when necessary for interactivity
- ✅ **Composition Over Inheritance**: Extends TooltipButton functionality rather than reimplementing
- ✅ **Single Responsibility**: Focused solely on regeneration trigger functionality
- ✅ **State Management Patterns**: Uses appropriate state management (local for UI, Zustand for global)

### Performance Considerations
- Uses `useCallback` for event handlers to prevent unnecessary re-renders
- Minimal state management with only essential local state
- Efficient prop spreading to maintain TooltipButton API

### Accessibility & UX
- Provides clear visual feedback during operations
- Maintains proper disabled states during concurrent operations
- Includes descriptive tooltip for user guidance
- Handles error states gracefully through try/finally pattern