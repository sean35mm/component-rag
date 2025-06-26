# RecentArticles Component Documentation

## Purpose

The `RecentArticles` component displays a list of recent articles associated with a specific signal within the last 7 days. It provides users with a quick preview of signal-related content through an infinite scroll interface, allowing them to explore articles that match the signal's criteria.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state with TanStack Query hooks
- Handles user interactions (clicking article links)
- Uses callbacks for data transformation and event handling
- Requires client-side rendering for the infinite scroll functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signal` | `SignalPreview` | Yes | The signal object containing metadata used to filter and display related articles |

## Usage Example

```tsx
import { RecentArticles } from '@/components/signals/preview/recent-articles';
import { SignalPreview } from '@/lib/types';

function SignalDetailsPage({ signal }: { signal: SignalPreview }) {
  return (
    <div className="signal-details">
      <h1>{signal.name}</h1>
      <RecentArticles signal={signal} />
    </div>
  );
}
```

## Functionality

- **Article Filtering**: Automatically filters articles based on the provided signal parameters
- **Infinite Scroll**: Loads articles in batches of 25 using infinite query functionality
- **Article Previews**: Displays articles using `ArticlePreviewCard` with labels and highlights
- **External Navigation**: Opens articles in new tabs when clicked
- **Empty State Handling**: Shows appropriate message when no articles are found
- **Time-based Filtering**: Restricts results to articles from the last 7 days
- **Loading States**: Handles loading states during data fetching

## State Management

The component uses **TanStack Query** for server state management:
- `useArticlesInfinite`: Manages infinite scroll pagination and article data fetching
- `useSignalArticlesIntervalData`: Provides query parameters based on signal configuration
- Custom `selectArticles` callback transforms paginated data into a flat article list
- Reactive updates when signal parameters change

## Side Effects

- **API Calls**: Fetches articles through the `useArticlesInfinite` hook
- **External Navigation**: Opens article URLs in new browser tabs
- **Data Transformation**: Flattens paginated article data for display
- **Dynamic Queries**: Rebuilds queries when signal parameters change

## Dependencies

### Hooks
- `useSignalArticlesIntervalData`: Generates query parameters from signal data
- `useArticlesInfinite`: Manages infinite scroll article fetching

### UI Components
- `ArticlePreviewCard`: Renders individual article previews
- `Typography`: Provides consistent text styling
- `NextLink`: Handles client-side navigation

### External Libraries
- `@tanstack/react-query`: For infinite data management
- `next/link`: For optimized navigation

## Integration

The component integrates into the signals preview architecture:
- **Signal Dashboard**: Used within signal detail views to show related content
- **Preview System**: Part of the broader signal preview functionality
- **Article Ecosystem**: Connects signals to the article browsing experience
- **Navigation Flow**: Bridges between signal exploration and article consumption

## Best Practices

✅ **Architectural Alignment**:
- Uses TanStack Query for server state management
- Implements proper client component pattern with `'use client'`
- Follows component decomposition with reusable UI components
- Exports constants (`BATCH_SIZE`) for configuration

✅ **Performance Optimizations**:
- Memoizes callback functions with `useCallback`
- Uses infinite scroll to prevent loading all articles at once
- Implements efficient data selection to avoid unnecessary re-renders

✅ **User Experience**:
- Provides clear loading states and empty state handling
- Shows relevant time context ("Last 7 days")
- Uses external links for article navigation to maintain context

✅ **Code Organization**:
- Clear separation of data fetching, transformation, and presentation logic
- Consistent prop interfaces and TypeScript usage
- Follows established styling patterns with Tailwind classes