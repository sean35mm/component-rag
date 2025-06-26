# CriticalQuestions Component Documentation

## Purpose

The `CriticalQuestions` component displays an interactive accordion-style FAQ section for story pages. It presents critical questions and answers related to a story with citation references, copy functionality, and structured data markup for SEO. The component provides an engaging way for users to explore key questions about a story while maintaining analytics tracking and accessibility features.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive accordion functionality with state management
- Event handlers for user interactions (clicks, expansions)
- Browser-specific APIs for breakpoint detection
- Client-side analytics tracking

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the component |
| `story` | `StoryWithPageInfo` | Yes | Story object containing questions array and metadata for analytics |

### Story Questions Structure
```typescript
story.questions: Array<{
  question: string;    // The question text
  answer: string;      // The answer text
  references: string[]; // Array of article IDs for citations
}>
```

## Usage Example

```tsx
import { CriticalQuestions } from '@/components/story/critical-questions';

// Basic usage
function StoryPage({ story }: { story: StoryWithPageInfo }) {
  return (
    <div className="story-layout">
      <CriticalQuestions story={story} />
    </div>
  );
}

// With custom styling
function CustomStoryLayout({ story }: { story: StoryWithPageInfo }) {
  return (
    <div className="max-w-4xl mx-auto">
      <CriticalQuestions 
        story={story}
        className="my-8 shadow-lg"
      />
    </div>
  );
}

// Example story data structure
const exampleStory: StoryWithPageInfo = {
  questions: [
    {
      question: "What caused the market volatility?",
      answer: "Several factors contributed including inflation concerns and geopolitical tensions...",
      references: ["article-123", "article-456"]
    },
    {
      question: "How will this affect consumers?",
      answer: "Consumers may see changes in pricing and availability...",
      references: ["article-789"]
    }
  ],
  // ... other story properties
};
```

## Functionality

### Core Features
- **Accordion Interface**: Expandable/collapsible questions using Radix UI primitives
- **Citation System**: Clickable citation bubbles that open source drawer
- **Copy Functionality**: Copy button for each answer with tooltip
- **Responsive Design**: Adaptive styling for desktop and mobile viewports
- **SEO Optimization**: Structured data (JSON-LD) markup for FAQ schema
- **Analytics Integration**: Tracks expansion and citation interactions

### User Interactions
- **Question Expansion**: Click to expand/collapse individual questions
- **Citation Access**: Click citation bubbles to view source articles
- **Content Copying**: Copy answer text to clipboard
- **Keyboard Navigation**: Full keyboard accessibility support

### Visual Features
- **Hover States**: Interactive feedback on hover
- **Transition Animations**: Smooth accordion animations
- **Icon Integration**: Question and dropdown icons for visual clarity
- **Responsive Typography**: Adaptive text sizing based on screen size

## State Management

### Local State
- **Accordion State**: Managed by Radix UI AccordionPrimitive (single expandable item)
- **Responsive State**: `useBreakpoint('lg')` hook for layout decisions

### External State
- **Drawer State**: Integrates with `useStoryCitedSourcesDrawer` context for citation management
- **No server state**: Component is purely presentational with provided story data

## Side Effects

### Analytics Tracking
- **Question Expansion**: Tracks when users expand critical questions
- **Citation Interactions**: Monitors citation bubble clicks for engagement metrics

### External Interactions
- **Clipboard API**: Copy functionality for answer text
- **Drawer System**: Opens cited sources drawer with filtered articles
- **SEO Injection**: Injects structured data script into document head

## Dependencies

### UI Components
- `@radix-ui/react-accordion` - Accessible accordion primitives
- `CitationBubbleListFromArticles` - Citation display component
- `CopyButton` - Copy to clipboard functionality
- `Typography` - Consistent text styling
- `TooltipProvider` - Tooltip context for copy button

### Hooks & Utilities
- `useBreakpoint` - Responsive design hook
- `useStoryCitedSourcesDrawer` - Citation drawer context
- `useId` - Unique ID generation for schema
- `cn` - Class name utility

### External Libraries
- `schema-dts` - TypeScript types for structured data
- Analytics tracking via `StoryPageTracker`

## Integration

### Application Architecture
- **Story Pages**: Primary usage in story detail views
- **Citation System**: Integrates with article reference system
- **Analytics Pipeline**: Feeds user interaction data to tracking system
- **SEO Strategy**: Contributes to structured data and search optimization

### Context Dependencies
- **StoryCitedSourcesDrawer**: Required context for citation functionality
- **Responsive System**: Relies on application breakpoint system
- **Analytics Context**: Assumes analytics tracking is configured

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Correctly uses client component for interactive features  
✅ **Component Decomposition**: Flat structure with UI components as dependencies  
✅ **State Management**: Appropriate use of local state and context  
✅ **Accessibility**: Leverages Radix UI primitives for keyboard navigation  

### Performance Considerations
- **Memoized Schema**: Uses `useMemo` for expensive JSON-LD generation
- **Callback Optimization**: Uses `useCallback` for event handlers
- **Conditional Rendering**: Efficient rendering based on questions array

### Code Quality
- **TypeScript**: Fully typed with proper interfaces
- **Error Handling**: Graceful handling of missing questions data
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Semantic HTML**: Proper section and heading structure for accessibility

### Integration Patterns
- **Context Usage**: Proper integration with application contexts
- **Analytics**: Comprehensive event tracking following established patterns
- **Styling**: Consistent with design system using utility classes