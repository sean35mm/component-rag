# BaseFeaturedCard Component

## Purpose
The `BaseFeaturedCard` component serves as a foundational UI wrapper for featured content within the answers next-steps flow. It provides a consistent, styled container with a fixed height and responsive design, specifically designed to showcase important featured items or recommendations to users.

## Component Type
**Server Component** - This is a presentational component that doesn't require client-side interactivity, state management, or browser APIs. It renders static content and styling, making it suitable for server-side rendering.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | No | - | Content to be rendered inside the featured card |
| `className` | `string` | No | - | Additional CSS classes to customize styling |
| `disabled` | `boolean` | No | `false` | Whether the card should appear in a disabled state |
| `...rest` | `HtmlHTMLAttributes<HTMLDivElement>` | No | - | All standard HTML div attributes (onClick, onHover, etc.) |

## Usage Example

```tsx
import { BaseFeaturedCard } from '@/components/answers/next-steps/base-featured-card';

// Basic usage
export function NextStepsRecommendation() {
  return (
    <BaseFeaturedCard>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Recommended Action</h3>
        <p className="text-sm text-gray-600">
          Take this next step to improve your workflow
        </p>
      </div>
    </BaseFeaturedCard>
  );
}

// With custom styling and disabled state
export function DisabledFeatureCard() {
  return (
    <BaseFeaturedCard 
      className="border-dashed opacity-60" 
      disabled={true}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center h-full">
        <span>Coming Soon</span>
      </div>
    </BaseFeaturedCard>
  );
}

// Interactive card with click handler
export function ActionableCard() {
  const handleCardClick = () => {
    // Handle card interaction
  };

  return (
    <BaseFeaturedCard 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        <img src="/feature-icon.svg" alt="Feature" className="w-12 h-12" />
        <h4 className="font-medium">Interactive Feature</h4>
        <p className="text-sm">Click to explore this feature</p>
      </div>
    </BaseFeaturedCard>
  );
}
```

## Functionality

- **Consistent Layout**: Provides a standardized 468px height container for featured content
- **Responsive Design**: Full width with flexible content arrangement
- **Disabled State**: Visual indication when content is not interactive
- **Customizable Styling**: Accepts additional CSS classes via className prop
- **Event Handling**: Supports all standard HTML div events through prop spreading
- **Selection Prevention**: Includes `select-none` to prevent text selection for better UX
- **Background Styling**: Uses design system background color for visual consistency

## State Management

This component is stateless and doesn't manage any internal state. It relies on:
- **Props**: All behavior and appearance controlled through props
- **Parent State**: Any dynamic behavior comes from parent components
- **No State Libraries**: Doesn't use TanStack Query or Zustand as it's purely presentational

## Side Effects

This component has no side effects:
- No API calls or data fetching
- No browser API interactions
- No localStorage or sessionStorage usage
- No external service integrations

## Dependencies

### Internal Dependencies
- `@/components/ui/card` - Base Card component for styling foundation
- `@/lib/utils/cn` - Utility for conditional CSS class merging

### External Dependencies
- `react` - For React types (`HtmlHTMLAttributes`)

### Design System Integration
- Uses design system background color (`pgBackgroundWhiteInvAlpha-800`)
- Leverages consistent spacing patterns (`p-6`)
- Follows design system height standards (`h-[468px]`)

## Integration

The `BaseFeaturedCard` fits into the application architecture as:

- **Domain-Specific Component**: Located in `/answers/next-steps/` indicating its specific use case
- **Composition Layer**: Designed to be composed with other components rather than used standalone
- **UI Foundation**: Provides consistent styling foundation for featured content across the answers flow
- **Wrapper Component**: Acts as a standardized container for various types of featured content

## Best Practices

✅ **Architecture Adherence**:
- Server Component by default (no unnecessary client-side code)
- Flat component structure (wrapper without complex nesting)
- Domain-specific location following feature-based organization
- Proper prop interface with TypeScript

✅ **Reusability Patterns**:
- Generic enough for various featured content types
- Configurable through props rather than hard-coded behavior
- Extends HTML attributes for maximum flexibility
- Consistent with design system patterns

✅ **Performance Optimization**:
- No runtime state or effects
- Minimal JavaScript bundle impact
- Server-side renderable
- Efficient CSS class composition with `cn` utility

✅ **Developer Experience**:
- Clear prop interface with TypeScript
- Sensible defaults for common use cases
- Predictable behavior through standard HTML attributes
- Easy to extend and customize