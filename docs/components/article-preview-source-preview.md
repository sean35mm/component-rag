# ArticlePreviewSourcePreview Component

## Purpose

The `ArticlePreviewSourcePreview` component displays source metadata for article previews, including domain information, paywall status, bias rating, geographical data, and monthly visitor statistics. It provides a compact visual representation of source credibility indicators with animated country flags and progressive loading states.

## Component Type

**Client Component** - Uses the `'use client'` directive due to:
- Complex state management for animation cycling
- useEffect for interval-based country flag rotation
- Suspense boundaries for progressive loading
- Interactive animations with Framer Motion

## Props Interface

### ArticlePreviewSourcePreviewProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | Optional | Additional CSS classes for styling customization |
| `domain` | `string` | **Required** | Source domain to display and fetch data for |
| `paywall` | `boolean` | **Required** | Whether the source has paywall restrictions |

### ArticlePreviewSourcePreviewSuspenseProps

Extends `ArticlePreviewSourcePreviewProps` with:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isAuthorizedAndVerified` | `boolean` | **Required** | User authorization status |
| `isPublic` | `boolean` | **Required** | Whether content is publicly accessible |
| `token` | `AccessToken` | Optional | User access token for authenticated requests |

## Usage Example

```tsx
import { ArticlePreviewSourcePreview } from '@/components/story/article-explorer/article-preview-source-preview';

// Basic usage in article preview
function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <ArticlePreviewSourcePreview
        domain={article.source.domain}
        paywall={article.source.hasPaywall}
        className="mt-2"
      />
    </div>
  );
}

// In article explorer grid
function ArticleGrid({ articles }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {articles.map(article => (
        <div key={article.id} className="border rounded-lg p-4">
          <ArticlePreviewSourcePreview
            domain={article.domain}
            paywall={article.paywall}
          />
        </div>
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Domain Display**: Shows source domain with favicon/citation item
- **Paywall Indicator**: Dollar icon for paywalled content
- **Bias Rating**: Visual bias indicator based on source reliability
- **Animated Countries**: Cycling display of top countries with flag animations
- **Visitor Statistics**: Formatted monthly visitor count with compact notation
- **Progressive Loading**: Skeleton states during data fetching

### Animation System
- Country flags rotate every 4 seconds using Framer Motion
- Smooth opacity transitions between country indicators
- Responsive layout that handles dynamic content changes

### Data Formatting
- Uses `Intl.NumberFormat` for compact number display (e.g., "1.2M" for 1,200,000)
- Handles country code formatting and flag display
- Graceful fallbacks for missing data

## State Management

### Server State (TanStack Query)
- **Primary**: `useSourceByDomainSuspense` hook for fetching source metadata
- **Caching**: Automatic caching and background updates
- **Authorization**: Conditional fetching based on user permissions

### Local State
- **Animation State**: `useState` for current country index in rotation
- **Effect Management**: `useEffect` with cleanup for interval-based animations

### Access Control
- Uses `useAccessToken` context for permission-based rendering
- Falls back to skeleton when unauthorized

## Side Effects

### Intervals
- Sets up 4-second interval for country flag rotation
- Proper cleanup on component unmount
- State-based animation cycling

### Data Fetching
- Suspense-based data loading with `useSourceByDomainSuspense`
- Conditional API calls based on authorization status
- Automatic error boundaries through Suspense

## Dependencies

### UI Components
- `BiasIcon` - Source bias rating display
- `Skeleton` - Loading state placeholders
- `SourceCitationItem` - Domain favicon/citation
- `Typography` - Consistent text styling

### External Libraries
- `framer-motion` - Animation system
- `react-circle-flags` - Country flag components

### Hooks & Context
- `useAccessToken` - User authorization context
- `useSourceByDomainSuspense` - Source data fetching

### Utilities
- `cn` - Conditional class name utility
- `NUMBER_FORMATTER` - Exported number formatting utility

## Integration

### Article Explorer Architecture
```
ArticleExplorer
├── ArticleGrid
│   ├── ArticleCard
│   │   ├── ArticlePreviewSourcePreview ← This component
│   │   ├── ArticleContent
│   │   └── ArticleActions
│   └── LoadingStates
└── FilterControls
```

### Data Flow
1. Parent provides `domain` and `paywall` props
2. Component checks user authorization via context
3. Conditionally renders Suspense wrapper or fallback
4. Fetches source data when authorized
5. Animates through country data when available

## Best Practices

### Architecture Adherence
- ✅ **Proper Decomposition**: Split into Suspense, Fallback, and Main components
- ✅ **State Management**: TanStack Query for server state, local state for UI
- ✅ **Reusability**: Accepts className prop, flexible domain handling
- ✅ **Error Boundaries**: Suspense fallbacks for loading states

### Performance Optimizations
- `useMemo` for expensive country data transformations
- Conditional rendering based on authorization
- Proper cleanup of intervals and effects
- Skeleton loading states prevent layout shifts

### Accessibility
- Semantic HTML structure with proper Typography components
- Alt text through CircleFlag components
- Readable color contrast with design system colors
- Keyboard navigation support through proper DOM structure

### Export Pattern
```tsx
// Exported utilities and components
export { NUMBER_FORMATTER }; // Reusable formatter
export { ArticlePreviewSourcePreviewSuspense }; // Internal component
export { ArticlePreviewSourcePreviewFallback }; // Loading state
export { ArticlePreviewSourcePreview }; // Main component (default)
```

This component exemplifies proper React patterns with Suspense boundaries, progressive enhancement, and clean separation of concerns while maintaining high performance and accessibility standards.