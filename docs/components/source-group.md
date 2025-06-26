# SourceGroup Component Documentation

## Purpose
The SourceGroup component provides two variants for displaying groups of cited sources organized by domain in thread chat citation drawers. It shows citations from the same domain grouped together with selection capabilities and renders different citation types (articles, stories, generic) with appropriate preview components.

## Component Type
**Client Component** - Uses `'use client'` directive (implied by `useMemo` hooks and interactive handlers) because it manages interactive state for selection, click handlers, and dynamic rendering of citation previews.

## Props Interface

### SourceGroupCard
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | `string` | ✅ | The domain name for grouping citations |
| `citations` | `AnswersThreadHistoryItemCitation[]` | ✅ | Array of citations from this domain |
| `selected` | `boolean` | ✅ | Whether this source group is currently selected |
| `onSelect` | `(domain: string) => void` | ✅ | Callback fired when source group is selected/deselected |
| `articleIdToArticle` | `Record<string, Article>` | ✅ | Mapping of article IDs to full article objects |
| `onArticleClick` | `(articleId: string, url: string, title: string) => void` | ✅ | Callback fired when an article citation is clicked |

### SourceGroupCardFallback
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | `string` | ✅ | The domain name for grouping citations |
| `citations` | `AnswersThreadHistoryItemCitation[]` | ✅ | Array of citations from this domain |

## Usage Example

```tsx
import { SourceGroupCard, SourceGroupCardFallback } from '@/components/answers/thread-chat-cited-sources-drawer/source-list/source-group';

function CitationDrawer() {
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  
  const handleDomainSelect = (domain: string) => {
    setSelectedDomains(prev => {
      const newSet = new Set(prev);
      if (newSet.has(domain)) {
        newSet.delete(domain);
      } else {
        newSet.add(domain);
      }
      return newSet;
    });
  };

  const handleArticleClick = (articleId: string, url: string, title: string) => {
    // Track analytics and navigate
    analytics.track('citation_clicked', { articleId, domain: new URL(url).hostname });
    window.open(url, '_blank');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {citationGroups.map((group) => (
          <SourceGroupCardFallback
            key={group.domain}
            domain={group.domain}
            citations={group.citations}
          />
        ))}
      </div>
    );
  }

  // Loaded state
  return (
    <div className="space-y-4">
      {citationGroups.map((group) => (
        <SourceGroupCard
          key={group.domain}
          domain={group.domain}
          citations={group.citations}
          selected={selectedDomains.has(group.domain)}
          onSelect={handleDomainSelect}
          articleIdToArticle={articleData}
          onArticleClick={handleArticleClick}
        />
      ))}
    </div>
  );
}
```

## Functionality

### Core Features
- **Domain-based Grouping**: Groups citations by their source domain
- **Selection State**: Supports selecting/deselecting entire source groups via checkbox
- **Citation Type Rendering**: Renders different preview components based on citation type:
  - Articles: Uses `CitedNewsPreviewContent` with full article data
  - Stories: Uses `CitedStoryPreview` for story cluster citations
  - Generic: Uses `GenericCitedPreview` for other citation types
- **Fallback Support**: Provides skeleton loading states for all citation types
- **Special Domain Handling**: Disables selection for 'perigon.io' domain

### Visual Indicators
- Selected state styling with border and background changes
- Citation count display (singular/plural handling)
- Consistent rounded card design with proper spacing

## State Management
**Local State Only** - Uses `useMemo` hooks for performance optimization of citation card rendering. No external state management needed as all interactive state is managed by parent components through callback props.

## Side Effects
- **Click Handlers**: Triggers parent callbacks for domain selection and article navigation
- **Conditional Rendering**: Dynamically renders different citation preview components based on citation type
- **Performance Optimization**: Memoizes expensive citation card rendering operations

## Dependencies

### UI Components
- `Card`, `CardContent` from `@/components/ui/card`
- `Checkbox` from `@/components/ui/checkbox`
- `Skeleton` from `@/components/ui/skeleton`

### Citation Preview Components
- `CitedNewsPreviewContent`, `CitedNewsSourcePreviewFallback`
- `CitedStoryPreview`, `CitedStorySourcePreviewFallback`
- `GenericCitedPreview`

### Types & Utilities
- `AnswersThreadHistoryItemCitation`, `Article`, `CitationType` from `@/lib/types`
- `cn` utility for conditional className handling

## Integration

### Application Architecture
- **Answers Flow**: Core component in the thread chat citation drawer system
- **Source Management**: Handles the grouped view of citations within the larger source list
- **User Interaction**: Provides selection interface for filtering citations by source
- **Data Flow**: Receives processed citation data and article mappings from parent containers

### Parent Components
- Typically used within citation drawer or source list containers
- Expects pre-grouped citations by domain from parent
- Relies on parent for article data fetching and state management

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-separated fallback and main components
- ✅ **Reusability**: Clear prop interfaces allow flexible usage across citation contexts
- ✅ **Performance**: Proper memoization of expensive rendering operations
- ✅ **State Management**: Appropriate use of local state with parent callback pattern

### Implementation Patterns
- **Conditional Rendering**: Clean handling of different citation types
- **Accessibility**: Proper checkbox implementation for source selection
- **Error Boundaries**: Graceful fallback for missing article data
- **Type Safety**: Comprehensive TypeScript interfaces for all props and data structures

### Usage Guidelines
- Always provide both main and fallback components for loading states
- Ensure article data is available before rendering main component
- Handle the special case of 'perigon.io' domain in parent components
- Use consistent citation counting and domain display patterns