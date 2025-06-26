# ThreadChatTabDetails Component Documentation

## Purpose

The `ThreadChatTabDetails` component provides tab header functionality for answers thread chat interfaces. It renders breadcrumb navigation, sharing controls, and action buttons for both private and shared thread contexts. The component displays thread information, folder hierarchy, and provides access to thread-specific actions like sharing and management.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state through Zustand store (`useAnswersThreadChatStore`)
- Handles user interactions (sharing, actions)
- Uses multiple client-side hooks for data fetching and state management
- Requires real-time updates for thread information

## Props Interface

### PrivateAnswersThreadChatTabDetails

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling |
| `token` | `string` | Yes | Authentication token for API operations |
| `isTemporary` | `boolean` | Yes | Whether the thread is temporary (not yet saved) |

### SharedAnswersThreadChatTabDetails

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling |
| `thread` | `AnswersThread` | Yes | The shared thread object containing thread data |

## Usage Example

```tsx
import { 
  PrivateAnswersThreadChatTabDetails, 
  SharedAnswersThreadChatTabDetails 
} from '@/components/answers/thread-chat-tab-details';

// Private thread usage
function PrivateThreadView() {
  return (
    <PrivateAnswersThreadChatTabDetails
      token={userToken}
      isTemporary={false}
      className="border-b"
    />
  );
}

// Shared thread usage
function SharedThreadView({ thread }: { thread: AnswersThread }) {
  return (
    <SharedAnswersThreadChatTabDetails
      thread={thread}
      className="bg-gray-50"
    />
  );
}

// Using the exported constant for layout calculations
const tabHeight = ANSWERS_TAB_DETAILS_HEIGHT; // 35px
```

## Functionality

### Core Features
- **Breadcrumb Navigation**: Displays folder hierarchy and thread name with icons
- **Thread Sharing**: Provides share buttons with different permissions for private/shared contexts
- **Action Controls**: Integrates folder entity actions (edit, delete, move, etc.)
- **Loading States**: Shows skeleton placeholders while data is loading
- **Access Control**: Handles different UI states based on user authorization

### Visual Elements
- Thread icon in breadcrumb
- Share button with popover
- Folder actions container
- Public/private indicators

## State Management

### TanStack Query
- `useAnswersThreadById`: Fetches thread data from server
- `useFolderById`: Retrieves folder information for breadcrumb
- `useSavedSharedMemberThreadById`: Gets saved shared thread data
- `useUpdateAnswersThreadAccess`: Handles thread sharing mutations

### Zustand Store
- `useAnswersThreadChatStore`: Manages current thread state in client

### Context Hooks
- `useAccessToken`: Provides authentication and authorization state
- `usePublicSharedThreadPage`: Handles public shared thread metadata

## Side Effects

- **API Calls**: Fetches thread, folder, and shared thread data
- **State Updates**: Updates thread access permissions through mutations
- **Navigation**: Constructs navigation URLs for different tab types
- **Real-time Sync**: Synchronizes client state with server data

## Dependencies

### Components
- `TabDetails`: Base tab header component
- `AnswersThreadShareButtonWithPopover`: Thread sharing controls
- `AnswersSharedThreadShareButtonWithPopover`: Shared thread sharing controls
- `FolderEntityItemActionsContainer`: Action buttons container
- `BreadcrumbItem`: Breadcrumb navigation items
- `Skeleton`: Loading state placeholders
- `IconAnswers`: Thread icon component

### Hooks & Services
- Authentication and authorization hooks
- Thread and folder query hooks
- Store management hooks

### Types
- `AnswersThread`: Thread data structure
- `FolderEntity`: Folder entity interface
- `TabEntity`: Tab type enumeration

## Integration

### Application Architecture
- **Tab System**: Integrates with main layout tab management
- **File Display Panel**: Works with folder entity actions
- **Authentication Flow**: Respects user permissions and access levels
- **Routing**: Generates proper URLs for different thread types

### Data Flow
1. Component receives props (token, thread data)
2. Fetches related data (folder, thread details)
3. Constructs breadcrumb and entity objects
4. Renders with appropriate sharing and action controls
5. Handles user interactions through mutations

## Best Practices

### Architecture Adherence
- ✅ **Proper Decomposition**: Separates private and shared variants cleanly
- ✅ **State Management**: Uses TanStack Query for server state, Zustand for client state
- ✅ **Component Composition**: Leverages existing UI components and containers
- ✅ **Type Safety**: Strongly typed props and memoized computed values

### Performance Optimizations
- Uses `useMemo` for expensive breadcrumb and entity calculations
- Conditional data fetching with `enabled` flags
- Proper forwarding of refs for DOM access
- Skeleton loading states for better UX

### Error Handling
- Graceful fallbacks for missing data
- Loading states during data fetching
- Proper null checks for optional data

### Accessibility
- Semantic breadcrumb structure
- Proper ARIA attributes through base components
- Keyboard navigation support