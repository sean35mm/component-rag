# ThreadChatMileMarker Component

## Purpose

The `ThreadChatMileMarker` component creates visual dividers in chat threads to mark significant events such as errors or filter updates. It displays a horizontal line with centered content that can include timestamps, error messages, and regeneration controls. The component helps users understand the chronology and state changes within a conversation thread.

## Component Type

**Client Component** - Uses the `'use client'` directive (inferred from context usage) because it:
- Consumes the `useAskQuestion` context hook for regeneration functionality
- Handles interactive elements like the regenerate button
- Manages dynamic content based on variant props

## Props Interface

### ThreadChatMileMarkerProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'error' \| 'filterUpdate'` | ✅ | Determines the display style and content of the mile marker |
| `time` | `string` | ❌ | ISO timestamp string for when the event occurred |
| `question` | `string` | ❌ | The question text to regenerate (required when `showRegenerate` is true) |
| `showRegenerate` | `boolean` | ❌ | Whether to show the regenerate button functionality |
| `className` | `string` | ❌ | Additional CSS classes to apply |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | Standard HTML div attributes |

### MileMarkerText Props

Extends `TypographyProps` with preset styling for consistent text appearance within mile markers.

## Usage Example

```tsx
import { ThreadChatMileMarker } from '@/components/answers/thread-chat-milemarker';

// Error mile marker with regeneration
<ThreadChatMileMarker
  variant="error"
  question="What are the latest trends in AI?"
  showRegenerate={true}
  className="my-4"
/>

// Filter update mile marker with timestamp
<ThreadChatMileMarker
  variant="filterUpdate"
  time="2024-01-15T10:30:00Z"
/>

// Simple error marker without regeneration
<ThreadChatMileMarker
  variant="error"
/>
```

## Functionality

### Core Features
- **Visual Separation**: Creates horizontal dividers with centered content
- **Event Indication**: Displays different content based on variant (error vs filter update)
- **Timestamp Display**: Formats and shows event timestamps in user's timezone
- **Error Handling**: Provides visual feedback for generation errors
- **Regeneration Control**: Integrates regenerate functionality for failed responses

### Visual Elements
- Horizontal line dividers using background strokes
- Centered content area with appropriate spacing
- Error icon for error variants
- Formatted timestamp display
- Regenerate button integration

## State Management

### Context Consumption
- **useAskQuestion**: Consumes context for `onRegenerate` callback function
- **No Internal State**: Component is stateless and relies on props and context

### Data Flow
```
Parent Component → Props → ThreadChatMileMarker → useAskQuestion Context → RegenerateButton
```

## Side Effects

### Date Formatting
- Formats timestamps using `date-fns-tz` with user's local timezone
- Automatically detects timezone via `Intl.DateTimeFormat().resolvedOptions().timeZone`

### No Direct API Calls
- Delegates regeneration actions to context-provided callbacks
- No direct external service interactions

## Dependencies

### Internal Components
- `PiAlertFill` - Icon for error display
- `TooltipProvider` - Tooltip context wrapper
- `Typography` - Text styling component
- `RegenerateButton` - Regeneration control component

### Hooks & Contexts
- `useAskQuestion` - Chat question management context

### Utilities
- `formatInTimeZone` - Date formatting utility
- `cn` - Class name utility for conditional styling

## Integration

### Thread Architecture
```
ThreadQuestionAnswerPair
├── ThreadChatMileMarker (error/update markers)
├── Question Display
└── Answer Display
```

### Usage Context
- **Chat Threads**: Marks conversation milestones and errors
- **Filter Updates**: Indicates when search/filter parameters change
- **Error Recovery**: Provides regeneration options for failed responses
- **Timeline Display**: Shows chronological events in conversations

### Styling Dependencies
- Relies on specific padding styles for integration with `thread-question-answer-pair.tsx`
- Uses design system colors and spacing tokens

## Best Practices

### Architectural Adherence
- ✅ **Component Decomposition**: Separates `MileMarkerText` as reusable subcomponent
- ✅ **Context Usage**: Properly consumes shared context for regeneration logic
- ✅ **Props Interface**: Well-defined TypeScript interfaces with clear variants
- ✅ **Styling Patterns**: Uses `cn` utility and design system tokens

### Usage Guidelines
- Always provide `question` prop when `showRegenerate` is true
- Use `variant="error"` for generation failures
- Use `variant="filterUpdate"` for search parameter changes
- Include timestamps for chronological context when available
- Be cautious when modifying padding styles due to integration dependencies

### Performance Considerations
- Lightweight component with minimal re-render triggers
- Date formatting only occurs when `time` prop is provided
- Context consumption is optimized through selective destructuring