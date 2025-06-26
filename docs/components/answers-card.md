# AnswersCard Component Documentation

## Purpose

The `AnswersCard` component renders an interactive card for answer prompts in the featured cards section. It provides different behaviors based on user authentication status - showing a preview for unauthenticated users, or enabling thread creation for authenticated users in either private or public mode.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its dependencies on hooks like `useAccessToken`, `useCreateThread`, and interactive callbacks. This component requires browser-side state management and event handling for authentication checks and thread creation.

## Props Interface

### AnswerCardProps (Main Component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Display title for the answer card |
| `prompt` | `string` | Yes | The question/prompt text that will be used for thread creation |
| `imageUrl` | `string` | No | Optional custom image URL for the card |
| `onClick` | `(title: string) => Promise<void>` | Yes | Async callback triggered when card is clicked |

### AnswersCardInnerProps (Internal Component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Display title for the answer card |
| `prompt` | `string` | Yes | The question/prompt text |
| `imageUrl` | `string` | No | Optional custom image URL |
| `onClick` | `(question: string) => void` | Yes | Synchronous callback with question parameter |

### InnerAnswersCardProps (Private/Public Components)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `token` | `string` | Yes | Authentication token |
| `title` | `string` | Yes | Display title for the answer card |
| `prompt` | `string` | Yes | The question/prompt text |
| `imageUrl` | `string` | No | Optional custom image URL |
| `onClick` | `(title: string) => Promise<void>` | Yes | Async callback triggered when card is clicked |

## Usage Example

```tsx
import { AnswersCard } from '@/components/home/featured-cards/answers-card';

function FeaturedAnswersSection() {
  const handleAnswerClick = async (title: string) => {
    console.log(`Answer card clicked: ${title}`);
    // Track analytics, update UI state, etc.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <AnswersCard
        title="Getting Started with React"
        prompt="What are the best practices for learning React?"
        imageUrl="/images/react-guide.jpg"
        onClick={handleAnswerClick}
      />
      
      <AnswersCard
        title="TypeScript Tips"
        prompt="How can I improve my TypeScript development workflow?"
        onClick={handleAnswerClick}
      />
    </div>
  );
}
```

## Functionality

- **Authentication-Aware Rendering**: Automatically switches between preview, private, and public modes based on user auth status
- **Dynamic Thread Creation**: Creates conversation threads with the prompt when clicked by authenticated users
- **Image Placeholder Generation**: Uses placeholder images when no custom image is provided
- **Popular Content Indicator**: Displays fire icon with "Popular" label in the footer
- **Click Handling**: Manages both title-based onClick callbacks and prompt-based thread creation

## State Management

- **Context State**: Uses `useAccessToken` context for authentication state (`token`, `isAuthorizedAndVerified`, `isPublic`)
- **No Local State**: Component is stateless, relying entirely on props and context
- **External State**: Thread creation is handled by external hooks that manage their own state

## Side Effects

- **Thread Creation**: Calls `useCreateThread` or `useCreateThreadPublic` hooks to create new conversation threads
- **Analytics/Tracking**: Triggers the `onClick` callback which may perform tracking or analytics
- **Navigation**: Thread creation typically results in navigation to the new conversation

## Dependencies

### Hooks
- `useAccessToken` - Authentication context for user state
- `useCreateThread` - Private thread creation for authenticated users
- `useCreateThreadPublic` - Public thread creation for public users
- `useImagePlaceholder` - Generates placeholder images

### Components
- `BaseCard` - Core card layout and styling
- `PreviewCard` - Fallback component for unauthenticated users
- `Typography` - Text styling component
- `PiFireLine` - Fire icon from icon library

### UI Elements
- `BadgeType.ANSWER` - Feature badge configuration for answer cards

## Integration

### Application Architecture
- **Featured Cards System**: Part of the home page featured cards grid alongside other card types
- **Authentication Flow**: Integrates with the app's authentication system to provide appropriate functionality
- **Thread Management**: Connects to the conversation/thread system for creating new discussions
- **Image Management**: Works with the app's image placeholder system for consistent visual presentation

### Data Flow
1. Parent component provides answer data via props
2. Component checks authentication status via context
3. Renders appropriate variant (preview/private/public)
4. On click, executes callback and creates thread if authenticated

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-structured with clear separation between main component, inner component, and authentication variants
- ✅ **Reusability**: Uses shared `BaseCard` component for consistent styling and behavior
- ✅ **State Management**: Properly uses context for authentication state without prop drilling
- ✅ **Hook Usage**: Leverages custom hooks for thread creation and image placeholder logic

### Code Quality
- ✅ **TypeScript**: Comprehensive type definitions for all component variants
- ✅ **Callback Optimization**: Uses `useCallback` to prevent unnecessary re-renders
- ✅ **Props Interface**: Clear separation of concerns between different component layers
- ✅ **Error Boundaries**: Graceful fallback to preview card for edge cases

### Performance
- ✅ **Conditional Rendering**: Efficiently renders only the necessary component variant
- ✅ **Memoized Callbacks**: Prevents unnecessary re-renders of child components
- ✅ **Lazy Evaluation**: Authentication checks are performed efficiently via context