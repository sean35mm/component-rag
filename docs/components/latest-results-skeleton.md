# LatestResultsSkeleton Component

## Purpose

The `LatestResultsSkeleton` component provides a loading state placeholder that matches the layout and structure of the actual latest results display in the signals details section. It creates a skeleton loading UI with shimmer effects to improve perceived performance while data is being fetched.

## Component Type

**Server Component** - This is a server component as it renders static skeleton elements without any client-side interactivity or state management. No 'use client' directive is needed since it only displays loading placeholders.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { LatestResultsSkeleton } from '@/components/signals/details/latest-results-skeleton';

// In a signals details page during loading state
function SignalDetailsPage() {
  const { data: signalResults, isLoading } = useQuery({
    queryKey: ['signal-results', signalId],
    queryFn: () => fetchSignalResults(signalId)
  });

  return (
    <div className="signal-details">
      <h1>Signal Analysis</h1>
      {isLoading ? (
        <LatestResultsSkeleton />
      ) : (
        <LatestResults results={signalResults} />
      )}
    </div>
  );
}

// In a Suspense boundary
function SignalDetailsWrapper() {
  return (
    <Suspense fallback={<LatestResultsSkeleton />}>
      <SignalDetailsContent />
    </Suspense>
  );
}
```

## Functionality

### Layout Structure
- **Responsive Design**: Adapts from single-column on mobile to two-column layout on large screens
- **Left Panel**: Shows 5 skeleton items representing a list of results with icons, titles, descriptions, and metadata
- **Right Panel**: Hidden on mobile, displays a detailed view skeleton with chart placeholder and content areas

### Visual Elements
- **Result Items**: Each skeleton item includes avatar, title, description lines, and metadata placeholders
- **Detail Panel**: Contains header with title and action button, chart area, content blocks, and footer metadata
- **Skeleton Components**: Uses the base `Skeleton` component with appropriate sizing and spacing

### Responsive Behavior
- Mobile: Single column showing only the results list
- Desktop: Two-column layout with results list and detail panel side-by-side
- Maximum height constraint on desktop to prevent excessive scrolling

## State Management

**No State Management** - This component is purely presentational and maintains no internal state. It renders static skeleton elements without any data dependencies or state updates.

## Side Effects

**No Side Effects** - The component performs no API calls, data fetching, or external interactions. It's a pure rendering component for loading states.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Base skeleton component for shimmer effects

### Design System
- Uses design tokens for colors (`pgStroke-250`)
- Follows consistent spacing and sizing patterns
- Implements responsive breakpoints (`lg:`)

## Integration

### Application Architecture
- **Signals Domain**: Part of the signals feature module for trading/analysis data
- **Details Section**: Specifically for the latest results view within signal details
- **Loading States**: Integrates with async data fetching patterns using TanStack Query
- **Suspense Boundaries**: Can be used as fallback UI for React Suspense

### Related Components
- `LatestResults` - The actual component this skeleton represents
- Other signal detail skeletons for consistent loading experience
- Base `Skeleton` component from the UI library

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: Correctly implemented as server component for static content
- ✅ **Component Decomposition**: Flat structure using base UI components
- ✅ **Domain Organization**: Properly placed in signals feature directory
- ✅ **No Unnecessary Complexity**: Simple, focused component without over-engineering

### Performance Considerations
- **Static Rendering**: No runtime JavaScript needed for basic skeleton display
- **Layout Stability**: Matches actual content dimensions to prevent layout shifts
- **Perceived Performance**: Provides immediate visual feedback during loading

### Design Consistency
- **Responsive Patterns**: Follows application-wide responsive design principles
- **Spacing System**: Uses consistent gap and padding patterns
- **Component Reuse**: Leverages shared Skeleton component for consistency

### Usage Patterns
- Should be used as direct replacement for `LatestResults` during loading
- Ideal for Suspense fallbacks and conditional rendering based on loading states
- Can be extended with props if variations are needed across different contexts