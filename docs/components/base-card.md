# BaseCard Component

## Purpose

The `BaseCard` component is a versatile, reusable card component designed for displaying featured content on the home page. It provides a standardized structure for showcasing items with an image preview, title, feature badge, and footer content. The component serves as a flexible foundation for various types of featured content cards while maintaining consistent visual styling and interaction patterns.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied through interactive features) because it handles click events and interactive hover states. The component needs client-side interactivity for user engagement and requires access to the DOM for event handling.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `BadgeType` | ✅ | Determines the type of feature badge displayed (e.g., "new", "featured", "popular") |
| `titleContent` | `ReactNode` | ✅ | The main title content displayed in the card header |
| `imageSrc` | `string` | ✅ | Source URL for the card's preview image |
| `imageAlt` | `string` | ✅ | Alt text for the preview image for accessibility |
| `footerContent` | `ReactNode` | ✅ | Content displayed in the card footer (e.g., metadata, actions) |
| `headerContent` | `ReactNode` | ❌ | Optional additional content displayed in the header beside the badge |
| `children` | `ReactNode` | ❌ | Optional child content (currently unused but available for extension) |
| `onClick` | `() => void` | ❌ | Click handler for card interaction |
| `className` | `string` | ❌ | Additional CSS classes for the outer container |
| `previewClassName` | `string` | ❌ | Additional CSS classes for the preview image |

## Usage Example

```tsx
import { BaseCard } from '@/components/home/featured-cards/base-card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Basic usage
<BaseCard
  type="featured"
  titleContent="Getting Started with React Components"
  imageSrc="/images/react-tutorial.jpg"
  imageAlt="React tutorial preview"
  footerContent={
    <>
      <Avatar src="/avatars/john.jpg" alt="John Doe" size="sm" />
      <span className="text-sm text-gray-600">By John Doe</span>
      <span className="text-sm text-gray-400">• 5 min read</span>
    </>
  }
  onClick={() => router.push('/tutorials/react-components')}
  className="max-w-sm"
/>

// With header content
<BaseCard
  type="new"
  titleContent="Advanced TypeScript Patterns"
  imageSrc="/images/typescript-guide.jpg"
  imageAlt="TypeScript guide preview"
  headerContent={
    <Button variant="ghost" size="sm">
      <BookmarkIcon className="w-4 h-4" />
    </Button>
  }
  footerContent={
    <>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Advanced</Badge>
    </>
  }
  onClick={() => handleCardClick('typescript-patterns')}
  previewClassName="aspect-video"
/>
```

## Functionality

- **Structured Layout**: Provides a consistent card structure with header, preview, and footer sections
- **Interactive Behavior**: Supports click interactions with hover effects and visual feedback
- **Image Handling**: Integrates fallback image support through `ImageWithFallback` component
- **Responsive Design**: Adapts typography and spacing across different screen sizes
- **Badge Integration**: Displays feature badges to categorize content
- **Flexible Content**: Accepts React nodes for title, header, and footer content allowing rich customization

## State Management

**Local State Only** - This component is stateless and doesn't manage any internal state. It relies on:
- Props for all configuration and content
- Parent components for state management
- The `useImagePlaceholder` hook for fallback image generation

No TanStack Query or Zustand integration is needed as this is a pure presentation component.

## Side Effects

- **Image Loading**: Triggers image loading with fallback handling through `ImageWithFallback`
- **Placeholder Generation**: Uses `useImagePlaceholder` hook to generate fallback images
- **Event Propagation**: Handles click events and propagates them to parent components

## Dependencies

### Internal Components
- `BaseCardContainer` - Provides the underlying card structure and styling
- `FeatureBadge` - Displays categorization badges
- `ImageWithFallback` - Handles image loading with fallback support
- `Typography` - Provides consistent text styling

### Hooks
- `useImagePlaceholder` - Generates placeholder images for fallback scenarios

### Utilities
- `cn` - Utility for conditional className concatenation

## Integration

The `BaseCard` component fits into the application architecture as:

- **Feature Component**: Located in `/components/home/featured-cards/` following domain-based organization
- **Composition Pattern**: Built by composing smaller UI components following the "Lego blocks" principle
- **Presentation Layer**: Acts as a presentation component that receives data from parent containers
- **Home Page Integration**: Specifically designed for featured content sections on the home page
- **Reusable Foundation**: Can be extended or specialized for different types of featured content

## Best Practices

✅ **Follows Architecture Guidelines**:
- Uses flat component composition over deep nesting
- Separates concerns between presentation and data logic
- Implements proper TypeScript interfaces for type safety
- Follows domain-based file organization

✅ **Accessibility**:
- Provides proper alt text for images
- Uses semantic HTML structure
- Supports keyboard navigation through click handlers

✅ **Performance**:
- Uses optimized image loading with `priority` and `loading` props
- Implements efficient re-rendering through props-based updates
- Leverages CSS classes for styling over inline styles

✅ **Maintainability**:
- Clear separation of concerns between components
- Consistent prop naming conventions
- Extensible design through ReactNode props
- Proper TypeScript typing for all interfaces