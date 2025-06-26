# EmptySourceGroupSvg Component

## Purpose
The `EmptySourceGroupSvg` component renders an SVG illustration representing an empty state for source groups. It displays a visual metaphor of an empty document with a search magnifying glass overlay, commonly used in UI empty states to indicate that no source groups are available or found.

## Component Type
**Server Component** - This is a pure presentational SVG component with no client-side interactivity, state management, or event handlers. It can safely render on the server as it only returns static SVG markup.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGAttributes<SVGElement>` | No | `{}` | Standard SVG element attributes that can be passed to customize the SVG (className, style, onClick, etc.) |

## Usage Example

```tsx
import { EmptySourceGroupSvg } from '@/components/icons/empty-source-group';

// Basic usage in an empty state component
function EmptySourceGroupState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <EmptySourceGroupSvg className="mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No source groups found
      </h3>
      <p className="text-gray-600 text-center max-w-md">
        Create your first source group to organize your data sources
      </p>
    </div>
  );
}

// With custom styling
function CustomEmptyState() {
  return (
    <div className="empty-state-container">
      <EmptySourceGroupSvg 
        className="opacity-75 hover:opacity-100 transition-opacity"
        style={{ filter: 'grayscale(20%)' }}
      />
    </div>
  );
}

// In a search results empty state
function SearchEmptyState() {
  return (
    <div className="text-center p-8">
      <EmptySourceGroupSvg aria-hidden="true" />
      <p className="mt-4 text-sm text-gray-500">
        No source groups match your search criteria
      </p>
    </div>
  );
}
```

## Functionality

### Key Features
- **Static SVG Rendering**: Renders a fixed 74x54px SVG illustration
- **Prop Spreading**: Accepts and forwards all standard SVG attributes for customization
- **Semantic Illustration**: Visual metaphor combining document and search elements
- **Responsive Design**: SVG scales appropriately with CSS transforms
- **Filter Effects**: Includes built-in drop shadow filter for visual depth

### Visual Elements
- Document card with rounded corners and border
- Location pin icon inside the document
- Placeholder content bars (gray rectangles)
- Magnifying glass overlay indicating search/exploration
- Drop shadow effect for dimensional appearance

## State Management
**No State Management** - This is a stateless presentational component that renders static SVG content. It doesn't interact with TanStack Query, Zustand, or maintain any local state.

## Side Effects
**No Side Effects** - Pure component with no API calls, subscriptions, or external interactions. Only renders SVG markup based on props.

## Dependencies

### Direct Dependencies
- `react` - Uses `SVGAttributes` type from React

### Typical Usage Context
- Empty state components
- Loading/placeholder UI components
- Search result containers
- Dashboard widgets
- Data visualization components

## Integration

### Application Architecture Fit
```
src/
├── components/
│   ├── icons/
│   │   └── empty-source-group.tsx    # ← This component
│   ├── ui/
│   │   ├── empty-state.tsx           # Consumers
│   │   └── search-results.tsx        # Consumers
│   └── features/
│       └── source-groups/
│           ├── source-group-list.tsx # Primary consumer
│           └── source-group-search.tsx
```

### Common Integration Patterns
```tsx
// In feature components
function SourceGroupList({ groups }: { groups: SourceGroup[] }) {
  if (groups.length === 0) {
    return (
      <div className="empty-state">
        <EmptySourceGroupSvg />
        <EmptyStateContent />
      </div>
    );
  }
  
  return <GroupGrid groups={groups} />;
}

// In reusable UI components
function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="empty-state-container">
      <Icon className="empty-state-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: No 'use client' directive needed
- ✅ **Component Decomposition**: Single responsibility (icon rendering)
- ✅ **Flat Structure**: Direct icon component, not nested in complex hierarchy
- ✅ **Reusability**: Generic icon usable across multiple contexts

### Usage Recommendations
- Use `aria-hidden="true"` when the icon is purely decorative
- Provide alternative text context in parent components
- Apply consistent sizing through CSS classes rather than inline styles
- Combine with loading states and skeleton components for better UX

### Performance Considerations
- SVG is inlined, avoiding additional HTTP requests
- Static content enables optimal server-side rendering
- Small file size (minimal impact on bundle)
- No runtime JavaScript execution required

### Accessibility
- Include descriptive context in parent components
- Use semantic HTML structure around the icon
- Ensure sufficient color contrast in surrounding content
- Consider reduced motion preferences for any animations applied via CSS