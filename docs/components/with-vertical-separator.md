# WithVerticalSeparator Component

## Purpose

The `WithVerticalSeparator` component is a layout utility component that adds a vertical separator line above or below its children. It's specifically designed for the keywords editor interface in the signals creation flow, providing visual separation between keyword groups or sections while maintaining proper spacing and alignment.

## Component Type

**Server Component** - This is a presentational component that doesn't require client-side interactivity, state management, or browser APIs. It purely handles layout and styling logic, making it suitable as a server component for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | The content to be wrapped with the vertical separator |
| `side` | `'top' \| 'bottom'` | Yes | `'bottom'` | Determines whether the separator appears above or below the content |
| `isHidden` | `boolean` | No | `false` | When true, renders only the children without the separator |

## Usage Example

```tsx
import { WithVerticalSeparator } from '@/components/signals/creation/keywords-editor/with-vertical-separator';

// Basic usage with bottom separator
function KeywordGroup() {
  return (
    <WithVerticalSeparator side="bottom">
      <div className="p-4">
        <h3>Keyword Category</h3>
        <ul>
          <li>keyword 1</li>
          <li>keyword 2</li>
        </ul>
      </div>
    </WithVerticalSeparator>
  );
}

// Usage with top separator
function KeywordSection() {
  return (
    <WithVerticalSeparator side="top">
      <div className="keyword-section">
        <input type="text" placeholder="Add keyword" />
      </div>
    </WithVerticalSeparator>
  );
}

// Conditional rendering without separator
function ConditionalKeywordGroup({ isLastItem }: { isLastItem: boolean }) {
  return (
    <WithVerticalSeparator side="bottom" isHidden={isLastItem}>
      <div className="keyword-group">
        {/* Keyword content */}
      </div>
    </WithVerticalSeparator>
  );
}
```

## Functionality

- **Visual Separation**: Adds a subtle vertical line separator positioned relative to the content
- **Flexible Positioning**: Supports separator placement on top or bottom of content
- **Conditional Rendering**: Can hide the separator while preserving the component structure
- **Responsive Layout**: Uses flexbox for proper content flow and positioning
- **Consistent Styling**: Maintains uniform separator appearance across the keywords editor

## State Management

**No State Management** - This is a pure presentational component that doesn't manage any internal state. It receives all necessary data through props and renders accordingly.

## Side Effects

**No Side Effects** - The component is purely functional with no side effects, API calls, or external interactions. It focuses solely on layout and visual presentation.

## Dependencies

### Internal Dependencies
- `@/components/ui/separator` - Core separator UI component for consistent styling
- `@/lib/utils/cn` - Utility for conditional className merging

### External Dependencies
- `React` - For ReactNode type and component structure

## Integration

This component is specifically designed for the **signals creation workflow**, particularly within the keywords editor interface:

```
src/components/signals/creation/keywords-editor/
├── with-vertical-separator.tsx  # This component
├── keyword-group.tsx           # Likely consumer
├── keywords-list.tsx           # Likely consumer
└── keywords-editor.tsx         # Main editor component
```

The component integrates into the larger signals creation flow by providing consistent visual separation between keyword groups, enhancing the user experience during signal configuration.

## Best Practices

### ✅ Follows Architecture Guidelines

- **Server Component**: Correctly implemented as a server component since no client-side interactivity is needed
- **Component Decomposition**: Simple, focused component that does one thing well - adding visual separators
- **Reusability**: Domain-specific component placed in appropriate feature directory rather than generic /ui/
- **Flat Structure**: Minimal nesting with clear, direct prop interface

### ✅ Implementation Best Practices

- **Conditional Rendering**: Graceful handling of hidden state without breaking layout
- **Type Safety**: Proper TypeScript interfaces with clear prop constraints
- **Performance**: Lightweight component with minimal DOM manipulation
- **Accessibility**: Uses semantic separator component for proper screen reader support
- **Maintainability**: Clear prop names and logical default values

### ✅ Usage Recommendations

- Use for separating logical groups in the keywords editor
- Leverage `isHidden` prop for dynamic separator visibility based on list position
- Combine with other layout components for complex keyword editor interfaces
- Consider the visual hierarchy when choosing `top` vs `bottom` placement