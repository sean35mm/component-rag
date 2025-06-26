# AnswersThreadCitationBubble Component

## Purpose

The `AnswersThreadCitationBubble` component renders citation numbers or labels within answer threads, providing interactive tooltips with citation details on desktop devices. It serves as a visual reference point that connects specific claims in answers to their source materials, enhancing the credibility and traceability of AI-generated responses.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state with tooltip triggers
- Uses the `useBreakpoint` hook for responsive behavior
- Handles click events and hover interactions
- Integrates with client-side authentication context

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes for styling customization |
| `articleId` | `string` | No | Unique identifier for the cited article, enables hover effects and tooltip content |
| `children` | `ReactNode \| ReactNode[]` | Yes | Content to display inside the citation bubble (typically numbers or labels) |
| `onClick` | `() => void` | No | Click handler function; when provided, renders as interactive button |
| `title` | `string` | No | Title of the cited source for tooltip display |
| `url` | `string` | No | URL of the cited source for tooltip navigation |
| `clusterId` | `string` | No | Cluster identifier for grouping related citations |

## Usage Example

```tsx
import { AnswersThreadCitationBubble } from '@/components/answers/thread-citation-bubble';

// Basic citation bubble
<AnswersThreadCitationBubble
  articleId="article-123"
  title="Research Paper on AI Ethics"
  url="https://example.com/paper"
>
  1
</AnswersThreadCitationBubble>

// Interactive citation with click handler
<AnswersThreadCitationBubble
  articleId="article-456"
  clusterId="cluster-789"
  onClick={() => navigateToSource('article-456')}
  className="mx-1"
>
  [2]
</AnswersThreadCitationBubble>

// Citation without tooltip (no articleId)
<AnswersThreadCitationBubble>
  *
</AnswersThreadCitationBubble>
```

## Functionality

- **Responsive Tooltips**: Shows detailed citation information on desktop devices only
- **Conditional Rendering**: Renders as button when `onClick` is provided, otherwise as static element
- **Hover Effects**: Applies interactive styling when `articleId` is present
- **Authentication-Aware**: Displays tooltip content based on user authorization status
- **Error Handling**: Wraps tooltip content in error boundary for graceful failure
- **Lazy Loading**: Uses Suspense for tooltip content to improve performance

## State Management

- **Local State**: Manages tooltip visibility and hover states internally
- **Context Integration**: Consumes `useAccessToken` context for authentication state
- **Responsive State**: Uses `useBreakpoint` hook for device-specific behavior
- **No External State**: Does not interact with TanStack Query or Zustand stores

## Side Effects

- **Tooltip Rendering**: Conditionally renders tooltip content based on desktop breakpoint
- **Authentication Checks**: Validates user permissions before showing citation details
- **Error Boundary**: Catches and handles errors in citation tooltip rendering
- **Dynamic Imports**: Lazy loads `CitationTooltipContent` component

## Dependencies

### Components
- `CitationTooltipContent` - Renders detailed citation information
- `Tooltip`, `TooltipProvider`, `TooltipTrigger` - UI tooltip system
- `ErrorBoundary` - Error handling wrapper

### Hooks
- `useBreakpoint` - Responsive design hook
- `useAccessToken` - Authentication context hook

### Utilities
- `cn` - Class name utility for conditional styling

## Integration

The component integrates into the answers system architecture by:

- **Thread Integration**: Embedded within answer text to mark citation points
- **Authentication Flow**: Respects user authorization levels for content access
- **Responsive Design**: Adapts behavior based on device capabilities
- **Error Resilience**: Maintains answer readability even if citation details fail to load
- **Performance Optimization**: Uses lazy loading to prevent blocking answer rendering

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Cleanly separated from tooltip content logic
- ✅ **Conditional Client Component**: Uses client-side features only when necessary
- ✅ **Error Boundaries**: Implements proper error handling patterns
- ✅ **Responsive Design**: Follows mobile-first, progressive enhancement approach

### Usage Recommendations
- Always provide `articleId` when citation source is available for better UX
- Use consistent `children` formatting (numbers, brackets) across citation sets
- Include `title` and `url` props to enhance tooltip usefulness
- Group related citations using `clusterId` for better organization
- Apply hover effects only when citation is actionable (has `articleId`)

### Integration Patterns
- Embed inline within answer text using appropriate spacing classes
- Coordinate with answer rendering system for proper citation numbering
- Ensure citation data availability before rendering with detailed props
- Handle missing citation data gracefully by omitting optional props