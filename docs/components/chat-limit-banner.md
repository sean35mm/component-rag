# ChatLimitBanner Component

## Purpose

The `ChatLimitBanner` component displays a notification banner to inform users when they have reached their chat response limit for unauthenticated sessions. It encourages users to sign up for a free account to unlock unlimited chat responses, serving as a conversion tool to drive user registration.

## Component Type

**Client Component** - Uses the `'use client'` directive because it's part of the interactive chat interface where user state and session limits are dynamically managed on the client side.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the banner container for custom styling |

## Usage Example

```tsx
import { ChatLimitBanner } from '@/components/answers/chat-limit-banner';

// Basic usage in a chat interface
function ChatInterface() {
  const hasReachedLimit = useAuthStore(state => state.hasReachedChatLimit);
  
  return (
    <div className="chat-container">
      {hasReachedLimit && <ChatLimitBanner />}
      <ChatMessages />
      <ChatInput disabled={hasReachedLimit} />
    </div>
  );
}

// With custom styling
function ChatPage() {
  return (
    <div>
      <ChatLimitBanner className="mb-4 shadow-md" />
      {/* Other chat components */}
    </div>
  );
}

// Conditional rendering based on user state
function AnswersPage() {
  const { user } = useAuth();
  const chatCount = useChatLimit();
  
  return (
    <div>
      {!user && chatCount >= CHAT_LIMIT && (
        <ChatLimitBanner className="sticky top-0 z-10" />
      )}
      <AnswersContent />
    </div>
  );
}
```

## Functionality

- **Limit Notification**: Displays a clear message indicating the chat response limit has been reached
- **Call-to-Action**: Provides a prominent "Sign up" button to encourage user registration
- **Visual Hierarchy**: Uses distinct styling with warning colors (`pgStateAway`) to draw attention
- **Responsive Design**: Flexbox layout that adapts to different container widths
- **Accessibility**: Semantic structure with proper typography components
- **Dark Mode Support**: Includes dark mode styling with backdrop blur effects

## State Management

This component is **stateless** and relies on external state management:

- **No Internal State**: Pure presentational component that doesn't manage its own state
- **External Dependencies**: Expects parent components to determine when to render based on:
  - User authentication status (likely from Zustand auth store)
  - Chat usage limits (potentially from TanStack Query or Zustand)
  - Session tracking for anonymous users

## Side Effects

- **Navigation**: The sign-up link triggers client-side navigation to `/sign-up` route
- **No Direct API Calls**: Component doesn't make API requests itself
- **No State Mutations**: Pure component that doesn't modify external state

## Dependencies

### UI Components
- `LinkButton` - Styled button component for the call-to-action
- `Typography` - Consistent text styling and typography system

### Utilities
- `cn` - Class name utility for conditional styling
- `NextLink` - Next.js routing component for client-side navigation

### Styling Dependencies
- Tailwind CSS classes for layout and responsive design
- Custom color tokens (`pgStateAway-*`) for consistent theming

## Integration

### Application Architecture Role
- **Feature Component**: Domain-specific component in `/components/answers/`
- **Conversion Funnel**: Part of the user acquisition flow for chat features
- **UI Layer**: Presentational component that bridges UI and business logic

### Integration Points
```tsx
// Typical integration with auth and limit checking
function ChatContainer() {
  const { user } = useAuthStore();
  const { data: chatLimits } = useQuery({
    queryKey: ['chat-limits'],
    queryFn: getChatLimits,
    enabled: !user
  });
  
  const showLimitBanner = !user && chatLimits?.hasReachedLimit;
  
  return (
    <div>
      {showLimitBanner && <ChatLimitBanner />}
      {/* Chat interface */}
    </div>
  );
}
```

## Best Practices

### ✅ Architecture Adherence
- **Proper Component Placement**: Located in domain-specific `/answers/` directory
- **Client Component Usage**: Correctly uses 'use client' for interactive chat context
- **Composition Pattern**: Composes UI components rather than implementing custom styling
- **Single Responsibility**: Focused solely on displaying limit notification

### ✅ Reusability Patterns
- **Flexible Styling**: Accepts `className` prop for customization without modification
- **Stateless Design**: Can be reused across different limit scenarios
- **Clear Props Interface**: Simple, predictable API

### ✅ Performance Considerations
- **Lightweight Component**: Minimal rendering overhead
- **No Unnecessary Re-renders**: Pure component that only re-renders when props change
- **Efficient Styling**: Uses Tailwind classes for optimal CSS bundle size

### ✅ User Experience
- **Clear Messaging**: Straightforward explanation of the limitation
- **Obvious Action**: Prominent call-to-action button
- **Visual Distinction**: Uses appropriate warning styling to indicate limitation
- **Accessible Navigation**: Semantic link structure for screen readers