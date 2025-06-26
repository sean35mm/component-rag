# DeepSearchCard Component

## Purpose

The `DeepSearchCard` component is a featured card component that enables users to perform deep search operations on the platform. It provides an interactive card interface for trending search queries with different behaviors based on user authentication status (private, public, or preview mode). The component serves as an entry point to the deep search functionality from the home page's featured cards section.

## Component Type

**Client Component** - Uses the `'use client'` directive due to:
- Interactive click handlers and navigation logic
- Client-side routing with Next.js router
- Authentication state management and conditional rendering
- Custom hooks that manage client-side state and side effects

## Props Interface

### DeepSearchCard Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The display title for the search query |
| `query` | `ComplexAllEndpointQuery` | Yes | The complex query object for deep search operations |
| `imageUrl` | `string` | No | Optional custom image URL for the card |
| `onClick` | `(title: string) => Promise<void>` | Yes | Async callback function executed when card is clicked |

### DeepSearchCardInner Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The display title for the search query |
| `imageUrl` | `string` | No | Optional custom image URL for the card |
| `onClick` | `() => void` | Yes | Click handler function for the card |

## Usage Example

```tsx
import { DeepSearchCard } from '@/components/home/featured-cards/deep-search-card';
import { ComplexAllEndpointQuery } from '@/lib/types';

function FeaturedSearches() {
  const trendingSearchQuery: ComplexAllEndpointQuery = {
    filters: { category: 'technology' },
    sort: { field: 'relevance', order: 'desc' }
  };

  const handleSearchClick = async (title: string) => {
    // Analytics tracking or other side effects
    console.log(`Starting search for: ${title}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <DeepSearchCard
        title="AI Technology Trends"
        query={trendingSearchQuery}
        imageUrl="/images/ai-trends.jpg"
        onClick={handleSearchClick}
      />
      <DeepSearchCard
        title="Market Analysis 2024"
        query={trendingSearchQuery}
        onClick={handleSearchClick}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Authentication-Aware Rendering**: Conditionally renders different card variants based on user authentication status
- **Deep Search Integration**: Initiates deep search operations with proper query handling
- **Image Management**: Supports custom images with automatic placeholder fallback
- **Navigation Handling**: Manages routing for public users while preserving URL parameters
- **Trending Indicator**: Displays trending status with icon and label

### Behavioral Variants
- **PrivateDeepSearchCard**: For authenticated users with verified access
- **PublicDeepSearchCard**: For public users with navigation to explore page
- **PreviewCard**: Fallback for unauthenticated users

## State Management

- **Authentication State**: Uses `useAccessToken` context for user authentication status
- **Search State**: Leverages `useDeepSearch` and `usePublicExplorePage` hooks for search operations
- **Local State**: Minimal local state, primarily relies on callback props and context

## Side Effects

### API Interactions
- Initiates deep search queries through `onStartDeepSearch` and `onStartPublicDeepSearch`
- Executes provided `onClick` callback for analytics or logging

### Navigation Effects
- Public users are redirected to explore page with preserved URL parameters
- Private users remain in current context with search overlay

### UI Effects
- Generates placeholder images when custom image is not provided
- Updates trending status display

## Dependencies

### Hooks
- `useDeepSearch` - Deep search functionality for authenticated users
- `useImagePlaceholder` - Placeholder image generation
- `useAccessToken` - Authentication and authorization context
- `usePublicExplorePage` - Public search page management
- `useRouter` - Next.js navigation

### Components
- `BaseCard` - Foundation card component with common styling
- `PreviewCard` - Fallback component for unauthenticated users
- `Typography` - Text rendering component
- `ArrowTrendUp` - Trending indicator icon

### Utilities
- `getGenericDeepSearchHref` - URL generation for search pages
- `preserveUrlParams` - URL parameter preservation during navigation

## Integration

### Application Architecture
- **Feature Cards System**: Part of the home page's featured cards collection
- **Search Ecosystem**: Integrates with the broader search functionality
- **Authentication Flow**: Respects the application's authentication boundaries
- **Navigation System**: Properly integrates with Next.js routing patterns

### Data Flow
1. Receives search query configuration from parent components
2. Determines user authentication status
3. Renders appropriate card variant
4. Handles click interactions based on user type
5. Initiates search operations or navigation

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-structured with clear separation between authentication variants
- ✅ **State Management**: Proper use of context for authentication, hooks for search operations
- ✅ **Reusability**: Built on composable `BaseCard` foundation
- ✅ **Feature Organization**: Properly placed in domain-specific directory structure

### Implementation Patterns
- ✅ **Conditional Rendering**: Clean authentication-based component selection
- ✅ **Callback Patterns**: Proper async callback handling with error boundaries
- ✅ **URL Management**: Thoughtful parameter preservation during navigation
- ✅ **Accessibility**: Proper image alt text and semantic structure

### Performance Considerations
- ✅ **useCallback**: Proper memoization of click handlers to prevent unnecessary re-renders
- ✅ **Lazy Loading**: Component variants only rendered when needed
- ✅ **Image Optimization**: Efficient placeholder generation and caching