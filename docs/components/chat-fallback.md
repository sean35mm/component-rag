# ChatFallback Component

## Purpose

The `ChatFallback` component provides a skeleton loading state for the chat interface. It displays placeholder content while the actual chat data is being loaded, maintaining the visual layout structure and providing a smooth user experience during loading states.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| No props | - | - | This component does not accept any props |

## Usage Example

```tsx
import { ChatFallback } from '@/components/ui/skeletons/chat-fallback';

// Basic usage - typically used as a fallback component
function ChatContainer() {
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <ChatFallback />;
  }
  
  return <ChatInterface />;
}

// Usage with Suspense boundary
function ChatPage() {
  return (
    <Suspense fallback={<ChatFallback />}>
      <ChatContent />
    </Suspense>
  );
}

// Usage in route-level loading
export default function ChatRoute() {
  return (
    <div className="min-h-screen bg-pgBackground-0 dark:bg-pgBackground-950">
      <ChatFallback />
    </div>
  );
}
```

## Design System Usage

### Layout & Spacing
- **Container Spacing**: `lg:px-10` - Provides consistent horizontal padding on large screens
- **Content Spacing**: `pb-4` - Bottom padding for content separation
- **Size Utilities**: `size-full` - Full width and height coverage

### Positioning & Z-Index
- **Sticky Positioning**: `sticky top-0` - Keeps tab details fixed at top
- **Z-Index**: `z-[1]` - Ensures proper layering hierarchy
- **Relative Positioning**: `relative` - Establishes positioning context

### Responsive Design Classes
- **Responsive Visibility**: `hidden lg:flex` - Hides tab details on mobile, shows on desktop
- **Responsive Padding**: `lg:px-10` - Adaptive padding for different screen sizes

## Styling

### Layout Structure
```tsx
// Component follows this visual hierarchy:
<>
  <TabDetailsFallback />     // Sticky header (desktop only)
  <TabContainer>             // Main container wrapper
    <div>                    // Content wrapper with padding
      <AnswersThreadChatWrapperFallback>  // Chat thread container
        <div>                // Question-answer content area
          <AnswersThreadQuestionAnswerPairFallback />
        </div>
      </AnswersThreadChatWrapperFallback>
    </div>
  </TabContainer>
</>
```

### Customization Options
Since this is a skeleton component, customization is limited but can be achieved through:

```tsx
// Wrapping with custom styling
<div className="bg-pgBackground-50 dark:bg-pgBackground-900">
  <ChatFallback />
</div>

// Custom loading states
<div className="animate-pulse">
  <ChatFallback />
</div>
```

## Responsive Design

### Breakpoint Behavior

| Breakpoint | Behavior |
|------------|----------|
| **Mobile** (`< lg: 1024px`) | - Tab details hidden<br>- Reduced padding<br>- Stacked layout |
| **Desktop** (`lg: 1024px+`) | - Tab details visible and sticky<br>- Increased padding (`px-10`)<br>- Full layout structure |

### Responsive Classes Used
- `hidden lg:flex` - Progressive disclosure of tab details
- `lg:px-10` - Responsive horizontal padding
- `sticky top-0` - Consistent sticky behavior across devices

## Accessibility

### Loading State Indicators
```tsx
// Recommended accessibility enhancements
<div role="status" aria-label="Loading chat content">
  <ChatFallback />
  <span className="sr-only">Loading chat messages...</span>
</div>
```

### Keyboard Navigation
- Component maintains focus management through its child components
- Tab details fallback preserves keyboard navigation structure
- No interactive elements in skeleton state prevents focus traps

### Screen Reader Support
- Skeleton components should be announced as loading states
- Consider adding `aria-busy="true"` to parent containers
- Use `aria-live="polite"` for loading state announcements

## Dependencies

### Internal Components
- `AnswersThreadChatWrapperFallback` - Chat thread skeleton wrapper
- `AnswersThreadQuestionAnswerPairFallback` - Question-answer skeleton content
- `TabContainer` - Main layout container component
- `TabDetailsFallback` - Tab details skeleton header

### Design System Dependencies
- **Tailwind Utilities**: Spacing, positioning, responsive classes
- **Layout System**: Tab-based layout structure
- **Responsive Breakpoints**: `lg` breakpoint for desktop layout

### Usage Context
This component is typically used in:
- Route-level loading states
- Suspense boundaries for chat interfaces
- Progressive loading scenarios
- Error boundary fallbacks

### Related Components
- `ChatInterface` - The actual chat component this skeleton represents
- `LoadingSpinner` - Alternative loading indicator
- `ErrorFallback` - Error state equivalent
- Other skeleton components in the `/skeletons` directory