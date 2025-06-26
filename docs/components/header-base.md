# StoryHeaderBase Component

## Purpose

The `StoryHeaderBase` component serves as a foundational header layout for story-related pages. It provides a consistent structure with a prominent title and an optional actions area for interactive elements like buttons or controls. This component establishes the visual hierarchy and spacing for story headers while maintaining responsive design patterns.

## Component Type

**Server Component** - This component renders static markup without client-side interactivity, state management, or event handlers. It focuses purely on layout and presentation, making it an ideal server component that can be rendered on the server for better performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | The main heading text displayed in the header |
| `className` | `string` | No | Additional CSS classes for custom styling |
| `children` | `ReactNode \| ReactNode[]` | No | Interactive elements (buttons, controls) displayed in the actions area |

## Usage Example

```tsx
import { StoryHeaderBase } from '@/components/story/header/header-base';
import { Button } from '@/components/ui/button';
import { ShareIcon, BookmarkIcon } from 'lucide-react';

// Basic usage with title only
<StoryHeaderBase title="The Adventure Begins" />

// With action buttons
<StoryHeaderBase 
  title="Mystery of the Lost Kingdom"
  className="border-b"
>
  <Button variant="ghost" size="sm">
    <ShareIcon className="h-4 w-4" />
  </Button>
  <Button variant="ghost" size="sm">
    <BookmarkIcon className="h-4 w-4" />
  </Button>
</StoryHeaderBase>

// In a story page layout
function StoryPage({ storyData }) {
  return (
    <div className="container mx-auto">
      <StoryHeaderBase title={storyData.title}>
        <StoryActionsMenu storyId={storyData.id} />
        <StoryShareButton story={storyData} />
      </StoryHeaderBase>
      <main>
        {/* Story content */}
      </main>
    </div>
  );
}
```

## Functionality

- **Responsive Typography**: Automatically scales title typography from `headlines32` on mobile to `headlines36` on large screens
- **Conditional Actions Area**: Only renders the actions container when children are provided
- **Flexible Layout**: Uses flexbox for proper alignment between title and actions
- **Tooltip Integration**: Wraps children in `TooltipProvider` for consistent tooltip behavior
- **Responsive Visibility**: Actions area is hidden on mobile and visible on large screens
- **Spacing Management**: Provides consistent padding and gap spacing across breakpoints

## State Management

This component is stateless and does not manage any state. It serves as a pure presentational component that relies on:
- Props for configuration
- Parent components for state management needs
- Children components for interactive functionality

## Side Effects

No side effects. This component performs pure rendering without:
- API calls
- Local storage interactions
- External service communications
- DOM manipulations beyond rendering

## Dependencies

### Internal Dependencies
- `@/components/ui/tooltip` - TooltipProvider for action button tooltips
- `@/components/ui/typography` - Typography component for consistent text styling
- `@/lib/utils/cn` - Utility for conditional className merging

### External Dependencies
- `react` - Core React functionality for component rendering and children utilities

## Integration

This component fits into the application architecture as:

- **Layout Foundation**: Base component for story-related headers across the application
- **Composition Root**: Designed to be composed with domain-specific action components
- **Design System Integration**: Leverages the UI component system for consistent styling
- **Responsive Framework**: Implements the application's responsive design patterns

### Common Integration Patterns

```tsx
// Story reading page
<StoryHeaderBase title={story.title}>
  <StoryBookmarkButton storyId={story.id} />
  <StoryShareMenu story={story} />
</StoryHeaderBase>

// Story editing page
<StoryHeaderBase title={story.title} className="border-b">
  <StoryEditActions 
    onSave={handleSave}
    onPublish={handlePublish}
  />
</StoryHeaderBase>

// Story listing page headers
<StoryHeaderBase title="Featured Stories">
  <StoryFilterControls />
  <StorySortMenu />
</StoryHeaderBase>
```

## Best Practices

### Architectural Adherence
- ✅ **Flat Composition**: Designed for flat component composition rather than deep nesting
- ✅ **Server-First**: Implements server component patterns for optimal performance
- ✅ **Single Responsibility**: Focuses solely on header layout without business logic
- ✅ **Reusable Foundation**: Provides a flexible base for various story header needs

### Usage Guidelines
- Use `children` for action buttons and interactive controls only
- Keep titles concise as they use large typography on desktop
- Leverage the responsive visibility of actions area for mobile-first design
- Compose with domain-specific components rather than generic UI components
- Apply custom styling through `className` prop rather than modifying the component

### Performance Considerations
- Minimal render cost due to server component nature
- Efficient children rendering using React's `Children.count()` utility
- No unnecessary re-renders as component is stateless