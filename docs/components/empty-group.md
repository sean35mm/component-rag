# EmptyGroup Component Documentation

## Purpose
The `EmptyGroup` component renders an empty state interface for creating new source groups in the search customization settings. It provides visual feedback and guidance to users when no source domains have been selected, featuring an illustration, descriptive text, and action buttons to facilitate source group creation.

## Component Type
**Server Component** - This is a purely presentational component that renders static content without requiring client-side interactivity, state management, or browser APIs. It follows our default pattern of using Server Components unless client-side features are explicitly needed.

## Props Interface
This component does not accept any props.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| - | - | - | No props accepted |

## Usage Example
```tsx
import { EmptyGroup } from '@/components/settings/search-customization/source-group-drawer/empty-group';

// Used within the source group drawer when no sources are selected
function SourceGroupDrawer() {
  const { selectedSources } = useSourceGroup();
  
  return (
    <div className="drawer-container">
      {selectedSources.length === 0 ? (
        <EmptyGroup />
      ) : (
        <SourceGroupList sources={selectedSources} />
      )}
    </div>
  );
}
```

## Functionality
- **Empty State Visualization**: Displays an SVG illustration (`EmptySourceGroupSvg`) to provide visual context
- **Instructional Content**: Shows clear title and description text to guide user actions
- **Action Integration**: Renders `ActionButtons` component to enable user interaction
- **Responsive Layout**: Uses flexbox layout with responsive height (h-4/6) and proper spacing
- **Accessibility**: Structured content hierarchy with semantic typography variants

## State Management
This component does not manage any state directly. It serves as a pure presentation layer that:
- Relies on parent components for conditional rendering logic
- Delegates interactive functionality to the `ActionButtons` child component
- Follows our architecture pattern of keeping state management at appropriate component boundaries

## Side Effects
This component has no side effects. It:
- Does not perform API calls
- Does not trigger external state changes
- Does not interact with browser APIs
- Maintains pure functional behavior

## Dependencies

### Internal Components
- `EmptySourceGroupSvg` - Custom SVG icon from `@/components/icons`
- `Typography` - UI component from `@/components/ui/typography`
- `ActionButtons` - Sibling component for user interactions

### External Dependencies
- `React` - Core React library for component definition

## Integration
The `EmptyGroup` component integrates into the search customization flow as follows:

```
Settings Page
└── Search Customization
    └── Source Group Drawer
        ├── EmptyGroup (when no sources selected)
        └── ActionButtons
            ├── Add Sources Button
            └── Create Group Button
```

**Architecture Role**:
- **Feature Component**: Domain-specific to search customization settings
- **Presentation Layer**: Handles UI rendering without business logic
- **Composite Structure**: Combines UI primitives with domain-specific content
- **Conditional Rendering Target**: Rendered based on parent component state

## Best Practices

### ✅ Follows Our Architecture Guidelines
- **Server Component Default**: Correctly uses Server Component without unnecessary client-side features
- **Component Decomposition**: Well-decomposed with `ActionButtons` as separate concern
- **Flat Structure**: Avoids unnecessary nesting, delegates action handling to child components
- **Domain Organization**: Properly located in feature-specific directory structure

### ✅ Design Patterns Adherence
- **Single Responsibility**: Focused solely on empty state presentation
- **Composition over Inheritance**: Uses component composition with `ActionButtons`
- **Semantic Structure**: Proper content hierarchy with appropriate Typography variants
- **Responsive Design**: Uses Tailwind classes for responsive and accessible layout

### ✅ Integration Best Practices
- **Conditional Rendering**: Designed to be conditionally rendered by parent components
- **State Boundaries**: Maintains clear separation between presentation and state management
- **Reusable Structure**: Can be easily reused in similar empty state scenarios
- **Accessibility**: Uses semantic HTML structure and proper text hierarchy