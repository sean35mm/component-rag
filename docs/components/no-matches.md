# NoMatches Component

## Purpose

The `NoMatches` component displays an empty state when no search results or content matches are found for a Signal query. It provides visual feedback to users with a placeholder image, explanatory text, and a refresh action to retry the query.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Uses the `useRouter` hook for navigation actions
- Uses the `useBreakpoint` hook for responsive behavior
- Handles user interactions (refresh button click)

## Props Interface

This component accepts no props.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | This component has no props |

## Usage Example

```tsx
import { NoMatches } from '@/components/signals/details/no-matches';

// In a signals results page or component
function SignalsResults({ results }) {
  if (!results || results.length === 0) {
    return <NoMatches />;
  }

  return (
    <div>
      {results.map(result => (
        <ResultItem key={result.id} result={result} />
      ))}
    </div>
  );
}

// In a search results container
function SearchContainer() {
  const { data: searchResults, isLoading } = useSearchQuery();

  if (isLoading) return <LoadingSpinner />;
  
  if (!searchResults?.length) {
    return <NoMatches />;
  }

  return <SearchResultsList results={searchResults} />;
}
```

## Functionality

### Core Features
- **Empty State Display**: Shows a visual placeholder when no matches are found
- **Responsive Design**: Adapts image size and typography based on screen size
- **User Feedback**: Provides encouraging message explaining the situation
- **Refresh Action**: Allows users to manually retry their query

### Visual Elements
- Circular placeholder image (180px on mobile, 300px on desktop)
- Responsive typography (H5 on mobile, H4 on desktop)
- Centered layout with consistent spacing
- Subtle background with border and shadow

## State Management

### Local State
- **No internal state** - This is a purely presentational component
- **Derived state** from `useBreakpoint` hook for responsive behavior

### External State
- Relies on parent components to determine when to render (based on empty results)
- Uses router state for page refresh functionality

## Side Effects

### Navigation Effects
- **Page Refresh**: `router.refresh()` triggers a full page refresh to retry data fetching
- **No API calls** - The component itself doesn't make network requests

## Dependencies

### UI Components
- `Button` - For the refresh action
- `Typography` - For text content with consistent styling
- `NextImage` - For optimized placeholder image display

### Hooks
- `useRouter` - Next.js navigation hook for refresh functionality
- `useBreakpoint` - Custom hook for responsive breakpoint detection

### Assets
- `/placeholders/no-matches.png` - Placeholder image asset

## Integration

### Application Architecture
```
Signals Feature
├── SignalsPage (Server Component)
├── SignalsContainer (Client Component)
├── SignalsResults (Client Component)
│   ├── ResultsList (when data exists)
│   └── NoMatches (when no results) ← This component
└── SignalsFilters (Client Component)
```

### Data Flow
1. Parent component fetches/queries for signal matches
2. Parent evaluates if results exist
3. If no results, renders `NoMatches` component
4. User can trigger refresh to retry the query

### Responsive Behavior
- **Mobile (< lg)**: 180px image, H5 typography
- **Desktop (≥ lg)**: 300px image, H4 typography

## Best Practices

### ✅ Architectural Compliance
- **Appropriate Client Component**: Correctly uses client-side rendering for interactive features
- **Single Responsibility**: Focused solely on empty state presentation
- **Reusable Design**: No props dependency makes it easily reusable across signal contexts
- **Responsive First**: Built-in responsive behavior using our breakpoint system

### ✅ Component Patterns
- **Flat Structure**: No unnecessary nesting, clean component hierarchy
- **UI Component Usage**: Leverages established UI components (Button, Typography)
- **Consistent Styling**: Uses design system tokens and Tailwind classes
- **Accessibility**: Proper alt text for images, semantic HTML structure

### ✅ Integration Patterns
- **Domain-Specific Placement**: Located in signals feature directory
- **Clear Separation**: No business logic, pure presentation component
- **Error Boundary Friendly**: No complex state that could cause crashes
- **Performance Optimized**: Minimal re-renders, efficient responsive logic

### Usage Recommendations
- Use when signal queries return empty results
- Combine with loading states for complete UX
- Consider wrapping in error boundaries for robust error handling
- Pair with proper loading indicators during data fetching