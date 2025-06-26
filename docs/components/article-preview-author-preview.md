# ArticlePreviewAuthorPreview

## Purpose

The `ArticlePreviewAuthorPreview` component displays author information within article previews, showing an avatar and name in a compact list item format. It provides a fallback version for loading states and handles different authorization scenarios for fetching author data.

## Component Type

**Client Component** - Uses the `useJournalistByIdSuspense` hook for data fetching and requires browser APIs for rendering dynamic content based on server state.

## Props Interface

### ArticlePreviewAuthorPreview

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `authorId` | `string` | ✅ | Unique identifier for the author/journalist |
| `authorName` | `string` | ✅ | Display name of the author |
| `isAuthorizedAndVerified` | `boolean` | ✅ | Whether the current user has authorized and verified access |
| `isPublic` | `boolean` | ✅ | Whether the content is publicly accessible |
| `token` | `AccessToken` | ❌ | Authentication token for API requests |

### ArticlePreviewAuthorPreviewFallback

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `authorName` | `string` | ✅ | Display name of the author for fallback display |

## Usage Example

```tsx
import { Suspense } from 'react';
import { 
  ArticlePreviewAuthorPreview, 
  ArticlePreviewAuthorPreviewFallback 
} from '@/components/story/article-explorer/article-preview-author-preview';

function ArticlePreview({ article, token, isPublic }) {
  return (
    <div className="article-preview">
      <h3>{article.title}</h3>
      
      <ul className="authors-list">
        {article.authors.map((author) => (
          <Suspense 
            key={author.id}
            fallback={
              <ArticlePreviewAuthorPreviewFallback 
                authorName={author.name} 
              />
            }
          >
            <ArticlePreviewAuthorPreview
              authorId={author.id}
              authorName={author.name}
              isAuthorizedAndVerified={user?.isVerified && user?.isAuthorized}
              isPublic={isPublic}
              token={token}
            />
          </Suspense>
        ))}
      </ul>
    </div>
  );
}
```

## Functionality

- **Author Display**: Renders author name with avatar in a compact list item format
- **Avatar Loading**: Fetches and displays author avatar from journalist data
- **Responsive Layout**: Uses flexible layout with gap spacing and text truncation
- **Fallback Support**: Provides loading state component without data fetching
- **Authorization Handling**: Respects authorization and public access permissions

## State Management

**TanStack Query**: Uses `useJournalistByIdSuspense` hook for:
- Fetching journalist data based on author ID
- Selecting only the `imageUrl` field for performance optimization
- Managing loading, error, and success states through Suspense boundaries
- Handling cache invalidation and background updates

The component follows the **server state** pattern with TanStack Query managing all data fetching concerns.

## Side Effects

- **API Calls**: Fetches journalist data including avatar URL
- **Image Loading**: Triggers avatar image loading through the Avatar component
- **Suspense Boundary**: May suspend rendering until data is available

## Dependencies

### Components
- `Avatar` - UI component for displaying user avatars
- `Typography` - UI component for consistent text styling

### Hooks
- `useJournalistByIdSuspense` - Query hook for fetching journalist data

### Types
- `AccessToken` - Authentication token type definition

## Integration

This component integrates into the **article exploration** feature within the story domain:

```
src/components/story/
├── article-explorer/
│   ├── article-preview-author-preview.tsx  # ← This component
│   ├── article-preview.tsx                 # Parent component
│   └── article-list.tsx                    # Container component
```

**Usage Context**:
- Article preview cards showing author information
- Story exploration interfaces
- Content discovery features
- Author attribution in article listings

## Best Practices

✅ **Proper Decomposition**: Separates main component from fallback, following the Lego block pattern

✅ **Server State Management**: Uses TanStack Query for data fetching with proper Suspense integration

✅ **Performance Optimization**: Selects only required fields (`imageUrl`) from API response

✅ **Reusable UI Components**: Leverages shared `Avatar` and `Typography` components from `/ui/`

✅ **Clear Props Interface**: Well-defined TypeScript interfaces with descriptive names

✅ **Fallback Strategy**: Provides dedicated fallback component for loading states

✅ **Domain Organization**: Properly placed in story/article-explorer domain structure

✅ **Authorization Handling**: Properly passes through authorization context for secure data access

The component exemplifies our architecture guidelines by maintaining clear separation of concerns, using appropriate state management patterns, and providing a robust fallback strategy for optimal user experience.