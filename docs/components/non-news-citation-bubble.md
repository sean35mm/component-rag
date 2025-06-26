# NonNewsCitationBubble Component

## Purpose

The `NonNewsCitationBubble` component displays citation information for non-news sources in a tooltip format. It presents the source title and domain in a compact, visually consistent bubble that appears when users hover over citation references in answers or content.

## Component Type

**Server Component** - This is a presentational component that renders static content based on props without any client-side interactivity, state management, or event handlers.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Optional | The title of the cited source/document |
| `url` | `string` | Optional | The URL of the cited source, used to extract the domain |

## Usage Example

```tsx
import { NonNewsCitationBubble } from '@/components/answers/non-news-citation-bubble';

// Basic usage with title and URL
<NonNewsCitationBubble 
  title="Machine Learning Fundamentals - Stanford CS229"
  url="https://cs229.stanford.edu/syllabus-autumn2018.html"
/>

// Usage with only title
<NonNewsCitationBubble 
  title="Research Paper on AI Ethics"
/>

// Usage with Tooltip trigger
<Tooltip>
  <TooltipTrigger>
    <span className="citation-marker">[1]</span>
  </TooltipTrigger>
  <NonNewsCitationBubble 
    title="OpenAI GPT-4 Technical Report"
    url="https://arxiv.org/abs/2303.08774"
  />
</Tooltip>
```

## Functionality

- **Domain Extraction**: Automatically extracts and displays the domain from the provided URL
- **Responsive Layout**: Constrains maximum width to 96 units for consistent presentation
- **Visual Consistency**: Uses standardized typography and spacing for citation display
- **Tooltip Integration**: Designed to work seamlessly within tooltip containers
- **Graceful Degradation**: Handles missing title or URL props without breaking

## State Management

**No State Management** - This is a pure presentational component that renders based solely on incoming props without any internal state, TanStack Query usage, or Zustand stores.

## Side Effects

**No Side Effects** - The component performs no API calls, external interactions, or side effects. The only computation is the synchronous domain extraction from the URL prop.

## Dependencies

### UI Components
- `TooltipContent` - Provides the tooltip container and styling
- `Typography` - Handles text rendering with consistent styling
- `MediaSourceReferenceBuilder` - Renders the domain reference with visual indicators

### Utilities
- `extractDomain` from `@/lib/utils/url` - Utility function to parse domain from URL

### External Dependencies
- React (implicit) - Core React functionality for component rendering

## Integration

### Application Architecture
- **Domain**: Part of the answers domain (`/components/answers/`)
- **Role**: Presentational component for citation display in answer contexts
- **Usage Pattern**: Typically used within tooltip systems to show source information on hover
- **Content Flow**: Receives citation data from parent components that manage answer content and citations

### Related Components
- Works in conjunction with news citation components for comprehensive citation display
- Integrates with tooltip systems for hover-based information display
- Part of the broader answer rendering system

## Best Practices

### Architectural Compliance
✅ **Server Component**: Correctly implemented as server component for static content  
✅ **Component Decomposition**: Single responsibility for non-news citation display  
✅ **Reusability**: Located in feature-specific directory with clear naming  
✅ **UI Component Usage**: Properly leverages shared UI components for consistency  

### Implementation Strengths
- **Type Safety**: Well-defined TypeScript props interface
- **Graceful Handling**: Safely handles undefined/missing props
- **Consistent Styling**: Uses design system components for visual consistency
- **Domain Separation**: Clear separation between news and non-news citation handling
- **Accessibility**: Leverages tooltip component's built-in accessibility features

### Usage Recommendations
- Always provide meaningful titles when available for better user experience
- Use within tooltip systems for optimal user interaction patterns
- Consider providing fallback content when both title and URL are missing
- Pair with appropriate tooltip triggers for clear citation references