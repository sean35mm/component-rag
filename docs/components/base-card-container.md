# BaseCardContainer Component

## Purpose
The `BaseCardContainer` component provides a standardized layout foundation for featured cards on the home page. It establishes a consistent visual structure with designated areas for title, preview content, and footer actions, while `BaseCardWrapper` serves as the base styling wrapper that can be used independently for custom card layouts.

## Component Type
**Server Component** - This is a pure presentational component that renders static markup without any client-side interactivity, state management, or browser APIs. It follows the default server component pattern and doesn't require the 'use client' directive.

## Props Interface

### BaseCardWrapper Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to merge with default styling |
| `...other` | `ComponentPropsWithoutRef<'div'>` | No | All standard div HTML attributes |

### BaseCardContainer Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `ReactNode` | Yes | Header content for the card (text, components, etc.) |
| `preview` | `ReactNode` | Yes | Main content area, typically images or interactive elements |
| `footer` | `ReactNode` | Yes | Bottom section for actions, metadata, or additional content |
| `className` | `string` | No | Additional CSS classes to merge with default styling |
| `...other` | `Omit<ComponentPropsWithoutRef<'div'>, 'children' \| 'title'>` | No | Standard div attributes except children and title |

## Usage Example

```tsx
import { BaseCardContainer, BaseCardWrapper } from '@/components/home/featured-cards/base-card-container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Using BaseCardContainer with structured layout
function FeaturedProductCard() {
  return (
    <BaseCardContainer
      title={
        <div>
          <h3 className="text-xl font-semibold">New Product Launch</h3>
          <p className="text-sm text-gray-600">Limited time offer</p>
        </div>
      }
      preview={
        <Image
          src="/product-preview.jpg"
          alt="Product preview"
          fill
          className="object-cover rounded-lg"
        />
      }
      footer={
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">$99.99</span>
          <Button>Learn More</Button>
        </div>
      }
      className="hover:shadow-lg transition-shadow"
    />
  );
}

// Using BaseCardWrapper for custom layouts
function CustomCard() {
  return (
    <BaseCardWrapper className="p-6">
      <div className="custom-layout">
        {/* Custom content structure */}
      </div>
    </BaseCardWrapper>
  );
}
```

## Functionality

### Key Features
- **Consistent Styling**: Applies standardized card appearance with rounded corners, borders, and responsive padding
- **Flexible Content Areas**: Three distinct sections (title, preview, footer) that accept any React content
- **Responsive Design**: Adapts spacing, sizing, and layout across different screen sizes (lg breakpoint)
- **Composition Pattern**: `BaseCardWrapper` can be used independently for custom card layouts
- **Accessibility**: Includes `select-none` to prevent text selection on interactive cards

### Layout Structure
- **Title Section**: Flexible height container that adapts to content
- **Preview Section**: Fixed height container (160px mobile, 184px desktop) for consistent card alignment
- **Footer Section**: Auto-height area for actions and metadata

## State Management
**No State Management** - This is a purely presentational component that receives all content through props. It doesn't manage any internal state or interact with external state management systems.

## Side Effects
**No Side Effects** - The component performs no API calls, browser API interactions, or external side effects. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility function for conditional className merging

### React Dependencies
- `React.ComponentPropsWithoutRef` - For type-safe prop forwarding
- `React.ReactNode` - For flexible content composition

## Integration

### Application Architecture Role
- **Design System Layer**: Provides foundational card layout patterns for the home page featured section
- **Composition Root**: Serves as a building block for higher-level feature cards
- **Responsive Foundation**: Handles responsive behavior so consuming components focus on content

### Usage Patterns
```tsx
// Feature-specific cards build on this foundation
import { BaseCardContainer } from './base-card-container';

// Analytics card
export function AnalyticsCard({ data }: { data: AnalyticsData }) {
  return (
    <BaseCardContainer
      title={<AnalyticsTitle />}
      preview={<ChartPreview data={data} />}
      footer={<ViewDetailsLink />}
    />
  );
}

// News card
export function NewsCard({ article }: { article: Article }) {
  return (
    <BaseCardContainer
      title={<NewsTitle title={article.title} />}
      preview={<NewsImage src={article.image} />}
      footer={<ReadMoreButton />}
    />
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: No unnecessary client-side code
- ✅ **Component Decomposition**: Clean separation between wrapper and structured container
- ✅ **Flat Structure**: Avoids deep nesting, promotes composition
- ✅ **Reusability**: Generic enough for various card types while maintaining consistency

### Implementation Guidelines
- **Content Flexibility**: Use `ReactNode` props to allow rich content composition
- **Responsive Design**: Leverage built-in responsive classes rather than custom breakpoints
- **Styling Extension**: Use `className` prop for customization while preserving base styles
- **Type Safety**: Properly exclude conflicting props in container component interface

### Performance Considerations
- **Static Rendering**: Server component enables efficient static generation
- **CSS Optimization**: Uses utility classes that can be optimized by build tools
- **No Runtime Overhead**: Pure component with no state or effects