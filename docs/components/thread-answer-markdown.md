# ThreadAnswerMarkdown Component

## Purpose

The `ThreadAnswerMarkdown` component renders markdown content for thread answers with enhanced features including citation bubbles, syntax highlighting, and custom styling. It serves as a specialized markdown renderer that transforms AI-generated responses into well-formatted, interactive content with proper citation handling and code block functionality.

## Component Type

**Client Component** - Uses the `'use client'` directive (implicitly through React contexts and interactive elements). This is necessary because:
- Uses React contexts (`createContext`, `useContext`) for managing list depth and code block state
- Handles interactive citation clicks and copy functionality
- Manages dynamic component rendering with custom markdown transformations

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `answer` | `string` | ✅ | The markdown content to be rendered |
| `citations` | `AnswersThreadHistoryItemCitations` | ✅ | Map of citations referenced in the answer |
| `onCitationClick` | `() => void` | ✅ | Callback function triggered when a citation is clicked |

## Usage Example

```tsx
import { ThreadAnswerMarkdown } from '@/components/answers/thread-question-answer-pair/thread-answer-markdown';

function ThreadAnswer() {
  const citations = new Map([
    [1, { displayIndex: 1, title: "Example Article", url: "https://example.com" }],
    [2, { displayIndex: 2, title: "Another Source", url: "https://source.com" }]
  ]);

  const handleCitationClick = () => {
    // Handle citation click logic
    console.log('Citation clicked');
  };

  const markdownContent = `
# Main Topic

This is a comprehensive answer with [citation](data-article-id="abc123" data-story-id="story456" data-display-index="1").

## Code Example

\`\`\`javascript
const example = "Hello World";
console.log(example);
\`\`\`

- Point one
- Point two with **emphasis**
  - Nested point

> Important blockquote information
`;

  return (
    <ThreadAnswerMarkdown
      answer={markdownContent}
      citations={citations}
      onCitationClick={handleCitationClick}
    />
  );
}
```

## Functionality

### Core Features
- **Markdown Rendering**: Converts markdown text to styled HTML using ReactMarkdown
- **Citation Integration**: Transforms special citation links into interactive citation bubbles
- **Code Syntax Highlighting**: Enhanced code blocks with copy functionality
- **Custom Typography**: Consistent styling aligned with design system
- **List Management**: Context-aware nested list rendering with proper styling
- **Table Support**: Responsive table rendering with custom styling
- **External Link Handling**: Automatic security attributes for external links

### Markdown Enhancements
- **GFM Support**: GitHub Flavored Markdown features (tables, strikethrough, etc.)
- **Raw HTML**: Sanitized HTML rendering capability
- **Custom Components**: Specialized renderers for headings, lists, code blocks, and citations

## State Management

- **Local Context State**: Uses multiple React contexts:
  - `MarkdownListContext`: Tracks list nesting depth for proper styling
  - `CodeBlockContext`: Manages code block rendering state
- **No External State**: Component is purely presentational, receiving all data via props
- **Memoized Components**: Uses `useMemo` for performance optimization of markdown component mappings

## Side Effects

- **Citation Click Events**: Triggers provided callback when citations are interacted with
- **Copy Operations**: Initiates clipboard operations through the CopyButton component
- **External Navigation**: Opens external links in new tabs with security attributes

## Dependencies

### Internal Components
- `CopyButton` - Provides copy-to-clipboard functionality for code blocks
- `TooltipProvider` - Enables tooltip functionality for UI elements
- `AnswersThreadCitationBubble` - Renders interactive citation elements

### External Libraries
- `react-markdown` - Core markdown parsing and rendering
- `remark-gfm` - GitHub Flavored Markdown support
- `rehype-external-links` - External link processing
- `rehype-raw` - Raw HTML support
- `rehype-sanitize` - HTML sanitization for security

### Utilities
- `cn` - Utility for conditional CSS class merging
- `AnswersThreadHistoryItemCitations` - Type definition for citation data

## Integration

### Application Architecture
- **Answer Display Layer**: Primary component for rendering AI-generated responses in thread conversations
- **Citation System**: Integrates with the broader citation management system
- **Design System**: Utilizes consistent typography and color tokens from the design system
- **Thread Context**: Operates within the thread question-answer pair component hierarchy

### Data Flow
1. Receives markdown content and citation data from parent thread components
2. Processes markdown through configured plugins for security and enhancement
3. Renders interactive elements that communicate back to parent via callbacks

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Well-structured with clear separation of concerns
- ✅ **Reusability**: Exports both main component and utility functions for broader use
- ✅ **Performance**: Uses memoization to prevent unnecessary re-renders
- ✅ **Type Safety**: Comprehensive TypeScript interfaces and type constraints

### Security Considerations
- **HTML Sanitization**: Uses rehype-sanitize with custom schema for safe HTML rendering
- **External Links**: Automatically applies security attributes (`rel="noopener noreferrer"`)
- **Input Validation**: Citation data attributes validated with regex patterns

### Styling Patterns
- **Design System Integration**: Consistent use of typography and color tokens
- **Responsive Design**: Tables and code blocks handle overflow appropriately
- **Context-Aware Styling**: List and code styling adapts based on nesting context

### Plugin Configuration
```tsx
// Exported for reuse in other markdown contexts
export const REMARK_PLUGINS = [remarkGfm];
export const REHYPE_PLUGINS = [
  rehypeRaw,
  [rehypeExternalLinks, { rel: 'noopener noreferrer', target: '_blank' }],
  [rehypeSanitize, { /* custom schema */ }]
];
```

This component exemplifies proper markdown handling in a React application while maintaining security, performance, and design consistency standards.