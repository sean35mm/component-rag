# SuggestionTemplatesSkeleton Component

## Purpose
The `SuggestionTemplatesSkeleton` component provides a loading state placeholder for suggestion templates in the signals creation flow. It renders skeleton elements that match the layout and dimensions of actual suggestion template cards, creating a smooth loading experience while template data is being fetched.

## Component Type
**Server Component** - This is a pure presentational component that renders static skeleton elements. It doesn't require client-side interactivity, state management, or browser APIs, making it suitable as a server component for optimal performance.

## Props Interface
| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| None | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { SuggestionTemplatesSkeleton } from '@/components/signals/creation/suggestion-templates/suggestion-templates-skeleton';

// In a signals creation page
export function SignalsCreationPage() {
  const { data: templates, isLoading } = useTemplatesQuery();

  return (
    <div className="signals-creation-container">
      <h2>Choose a Template</h2>
      
      {isLoading ? (
        <SuggestionTemplatesSkeleton />
      ) : (
        <SuggestionTemplatesGrid templates={templates} />
      )}
    </div>
  );
}

// In a Suspense boundary
export function TemplatesSection() {
  return (
    <Suspense fallback={<SuggestionTemplatesSkeleton />}>
      <SuggestionTemplates />
    </Suspense>
  );
}
```

## Functionality
- **Grid Layout**: Renders a responsive grid that matches the actual templates layout (1 column on mobile, 3 columns on large screens)
- **Skeleton Cards**: Displays 6 skeleton elements with consistent dimensions (92px height, 10.833rem width on large screens)
- **Responsive Design**: Adapts layout based on screen size using Tailwind CSS breakpoints
- **Loading Placeholder**: Provides visual feedback during data loading states

## State Management
**No State Management** - This component is stateless and purely presentational. It doesn't manage any state internally or interact with external state management systems.

## Side Effects
**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Core skeleton UI component for loading states
- Tailwind CSS classes for responsive grid layout and styling

### External Dependencies
- React (implicit) - For JSX rendering and component functionality

## Integration

### Application Architecture Context
- **Domain**: Signals creation workflow
- **Layer**: Feature component within the suggestion templates domain
- **Purpose**: Loading state UI for template selection
- **Usage Pattern**: Conditional rendering during async operations

### Related Components
```
signals/creation/
├── suggestion-templates/
│   ├── suggestion-templates-skeleton.tsx (this component)
│   ├── suggestion-templates-grid.tsx
│   └── suggestion-template-card.tsx
```

### Integration Points
- Used in conjunction with TanStack Query loading states
- Paired with actual template components for seamless transitions
- Integrated into Suspense boundaries for server-side loading states

## Best Practices

### Architecture Adherence
✅ **Server Component Default**: Correctly implemented as server component since no client interactivity is needed

✅ **Component Decomposition**: Single responsibility - only handles skeleton loading state

✅ **Flat Structure**: Simple, non-nested implementation following Lego block pattern

✅ **Domain Organization**: Properly placed within signals/creation feature domain

### Implementation Standards
✅ **Consistent Dimensions**: Skeleton dimensions match actual template cards for smooth transitions

✅ **Responsive Design**: Uses consistent breakpoint patterns with the actual templates grid

✅ **Performance Optimized**: Lightweight implementation with minimal overhead

✅ **Accessibility**: Skeleton component provides appropriate loading semantics

### Usage Recommendations
- Always pair with actual loading states from TanStack Query
- Use consistent grid patterns between skeleton and actual content
- Consider using in Suspense boundaries for server-side loading
- Maintain visual consistency with the components it's replacing