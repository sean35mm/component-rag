# AnswersSharedThreadPageContainer Component

## Purpose

The `AnswersSharedThreadPageContainer` component serves as the main entry point for displaying shared answer threads. It handles URL parameter validation, authentication-based routing, and renders the appropriate shared thread view based on user access level (private authenticated users vs. public access).

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Uses React's experimental `use()` hook for parameter unwrapping
- Requires client-side authentication state management
- Performs conditional rendering based on user access tokens
- Integrates with TanStack Query hooks for data fetching

## Props Interface

### AnswersSharedThreadPageContainer

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `props` | `NextJsPageProps` | Yes | Next.js page props containing params and searchParams |

### PrivateSharedThreadPageInner / PublicSharedThreadPageInner

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | `string` | Yes | UUID of the shared thread to display |

### SharedThreadPageInner

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `thread` | `AnswersThreadWithMessages` | Yes | Complete thread data with messages |

## Usage Example

```tsx
// In a Next.js page component
import { AnswersSharedThreadPageContainer } from '@/components/chat/answers-shared-page';

// pages/shared/answers/[answerThreadId]/page.tsx
export default function SharedAnswerThreadPage(props: NextJsPageProps) {
  return <AnswersSharedThreadPageContainer {...props} />;
}

// Example URL: /shared/answers/123e4567-e89b-12d3-a456-426614174000
```

## Functionality

### Core Features

1. **URL Parameter Validation**: Validates `answerThreadId` parameter using Zod schema
2. **Authentication-Based Routing**: Routes to different components based on user access level
3. **Error Handling**: Triggers 404 for invalid parameters or failed thread loading
4. **Loading States**: Shows appropriate fallbacks during data fetching
5. **Thread Display**: Renders shared thread content with tab management

### Access Control Flow

```mermaid
graph TD
    A[AnswersSharedThreadPageContainer] --> B{Validate Params}
    B -->|Invalid| C[notFound()]
    B -->|Valid| D{Check Access}
    D -->|Authorized & Verified| E[PrivateSharedThreadPageInner]
    D -->|Public Access| F[PublicSharedThreadPageInner]
    D -->|No Access| G[ChatFallback]
    E --> H[useSharedMemberThreadById]
    F --> I[usePublicSharedMemberThreadById]
    H --> J[SharedThreadPageInner]
    I --> J
```

## State Management

### TanStack Query Integration

- **Private Access**: Uses `useSharedMemberThreadById` hook for authenticated thread fetching
- **Public Access**: Uses `usePublicSharedMemberThreadById` hook for public thread access
- **Error States**: Handles loading errors with automatic 404 redirects
- **Loading States**: Provides loading indicators during data fetching

### Authentication State

- Leverages `useAccessToken` hook for access level determination
- No local state management - relies on global auth context

## Side Effects

1. **Navigation**: Calls `notFound()` to trigger Next.js 404 pages
2. **API Calls**: Fetches thread data through TanStack Query hooks
3. **Route Protection**: Conditionally renders based on authentication status

## Dependencies

### Hooks
- `useAccessToken` - Authentication state management
- `useSharedMemberThreadById` - Private thread data fetching
- `usePublicSharedMemberThreadById` - Public thread data fetching

### Components
- `AnswersSharedThreadPage` - Main thread display component
- `AnswersSharedThreadTabManager` - Tab navigation for thread
- `TabContainer` - Empty state container
- `ChatFallback` - Loading/fallback skeleton
- `ReportIssueDialogProvider` - Issue reporting context

### Utilities
- `entityUuidSchema` - UUID validation schema
- Next.js `notFound()` function

## Integration

### Application Architecture Role

```
Next.js Route Handler
├── AnswersSharedThreadPageContainer (Entry Point)
├── Authentication Layer (useAccessToken)
├── Data Layer (TanStack Query)
└── UI Layer (Shared Thread Components)
```

### Data Flow

1. Route receives `answerThreadId` parameter
2. Container validates parameter format
3. Authentication determines access level
4. Appropriate data hook fetches thread data
5. Thread data flows to display components

## Best Practices

### ✅ Follows Our Patterns

- **Component Decomposition**: Cleanly separated into logical sub-components
- **State Management**: Uses TanStack Query for server state, no unnecessary local state
- **Error Handling**: Proper error boundaries with Next.js integration
- **Validation**: Zod schema validation for type safety
- **Reusability**: Modular inner components for different access levels

### ✅ Architecture Alignment

- **Flat Structure**: Components are decomposed horizontally rather than deeply nested
- **Single Responsibility**: Each component has a clear, focused purpose
- **Data Fetching**: Follows TanStack Query patterns for server state
- **Client Components**: Appropriate use of client components only where needed

### 🔧 Usage Recommendations

1. **URL Structure**: Ensure routes follow the expected pattern with `answerThreadId`
2. **Error Handling**: Component handles errors gracefully - no additional error boundaries needed
3. **Loading States**: Built-in loading states - no additional loading management required
4. **Authentication**: Relies on global auth context - ensure proper auth provider setup