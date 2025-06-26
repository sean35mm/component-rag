# CitationTooltipContent Component

## Purpose

The `CitationTooltipContent` component is a smart routing component that conditionally renders different types of citation tooltips based on the citation source type. It acts as a presentation layer controller that determines whether to display article citations, story citations, or non-news citations based on the provided identifiers and fallback values.

## Component Type

**Client Component** - This component uses React props and conditional rendering logic that requires client-side JavaScript execution. While it doesn't directly use browser APIs or state hooks, it serves as a presentation controller that routes to different UI components based on runtime conditions.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleId` | `string` | Optional | Unique identifier for a specific article. Special value `'non-news'` indicates fallback to non-news content |
| `clusterId` | `string` | Optional | Unique identifier for a story cluster. Special value `'non-story'` indicates no story grouping |
| `isAuthorizedAndVerified` | `boolean` | Required | Flag indicating if the current user has authorized and verified access permissions |
| `isPublic` | `boolean` | Required | Flag indicating if the citation content is publicly accessible |
| `title` | `string` | Optional | Title text for non-news citations when article/story identifiers are not available |
| `token` | `AccessToken` | Optional | Authentication token for accessing protected citation content |
| `url` | `string` | Optional | Direct URL for the citation source, used primarily for non-news and story citations |

## Usage Example

```tsx
import { CitationTooltipContent } from '@/components/answers/citation-tooltip';
import { AccessToken } from '@/lib/types';

// Article citation tooltip
<CitationTooltipContent
  articleId="article-123"
  clusterId="cluster-456"
  isAuthorizedAndVerified={true}
  isPublic={false}
  token={userToken}
/>

// Story citation tooltip
<CitationTooltipContent
  articleId="non-news"
  clusterId="story-cluster-789"
  isAuthorizedAndVerified={true}
  isPublic={true}
  token={userToken}
  url="https://example.com/story"
/>

// Non-news citation tooltip
<CitationTooltipContent
  articleId="non-news"
  clusterId="non-story"
  isAuthorizedAndVerified={false}
  isPublic={true}
  title="External Reference"
  url="https://external-source.com"
/>

// No valid citation (renders null)
<CitationTooltipContent
  isAuthorizedAndVerified={false}
  isPublic={true}
/>
```

## Functionality

### Citation Type Resolution
- **Article Citations**: Rendered when `articleId` is present and not equal to `'non-news'`, and `clusterId` is not `'non-story'`
- **Non-News Citations**: Rendered when both `articleId` equals `'non-news'` and `clusterId` equals `'non-story'`
- **Story Citations**: Rendered when `clusterId` is present and not equal to `'non-story'`, while `articleId` equals `'non-news'`
- **Fallback**: Returns `null` when no valid citation type can be determined

### Conditional Rendering Logic
The component implements a priority-based rendering system:
1. Article citations take precedence when valid article identifiers are provided
2. Non-news citations are shown when both article and story identifiers fall back to their default values
3. Story citations are displayed when story identifiers are valid but articles fall back
4. No content is rendered when insufficient information is provided

## State Management

**No State Management** - This component is purely presentational and stateless. It acts as a routing component that passes props through to appropriate child components without managing any internal state. State management is delegated to the individual citation bubble components it renders.

## Side Effects

**No Direct Side Effects** - The component itself doesn't perform API calls or side effects. However, the child components it renders may have their own side effects:
- `AnswersThreadCitationBubbleTooltip` may fetch article data
- `StoryCitationBubble` may fetch story cluster information
- `NonNewsCitationBubble` is typically static with no side effects

## Dependencies

### Components
- `AnswersThreadCitationBubbleTooltip` - Handles article-specific citation tooltips
- `NonNewsCitationBubble` - Displays non-news citation information
- `StoryCitationBubble` - Shows story cluster citation details

### Types
- `AccessToken` from `@/lib/types` - Authentication token interface

### External Dependencies
- `React` - For component functionality and TypeScript support

## Integration

### Application Architecture Role
- **Answers System**: Core component in the answers/citations feature domain
- **Tooltip System**: Integrates with tooltip/popover UI components to display citation information
- **Authentication Flow**: Respects user authorization state to show appropriate citation content
- **Content Routing**: Acts as a presentation router that delegates to specialized citation components

### Usage Context
Typically used within:
- Answer threads where citations need to be displayed
- Tooltip/popover components that show citation details on hover or click
- Citation reference systems in AI-generated content
- Knowledge base article references

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Follows flat composition by delegating to specialized citation components rather than nesting complex logic
- ✅ **Separation of Concerns**: Acts purely as a routing layer, leaving specific citation logic to dedicated components
- ✅ **Reusability**: Generic interface allows usage across different citation contexts in the answers domain
- ✅ **Type Safety**: Comprehensive TypeScript interface with clear prop definitions

### Implementation Patterns
- **Conditional Rendering**: Uses clear, readable conditional logic with explicit fallback values
- **Props Forwarding**: Cleanly passes relevant props to child components without modification
- **Null Returns**: Gracefully handles invalid states by returning `null` rather than throwing errors
- **Single Responsibility**: Focuses solely on citation type determination and routing

### Integration Guidelines
- Always provide `isAuthorizedAndVerified` and `isPublic` flags for proper access control
- Include `token` when displaying protected citation content
- Provide fallback `title` and `url` for non-news citations to ensure meaningful content display
- Handle the `null` return case in parent components when no valid citation can be displayed