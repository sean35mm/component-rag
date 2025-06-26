# Template Component

## Purpose

The `Template` component renders individual signal suggestion templates as clickable cards. It displays template content with syntax highlighting for placeholders and provides a hover effect with an arrow icon to indicate interactivity. This component is designed for use in template selection interfaces where users can choose from predefined signal templates.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by hooks usage) because it:
- Manages interactive click handlers with `useCallback`
- Performs text highlighting computations with `useMemo`
- Requires hover states and user interactions
- Needs DOM event handling for template selection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `SignalSuggestionTemplate['content']` | Yes | The template content string to display and highlight |
| `onSelect` | `(content: string) => void` | Yes | Callback function triggered when the template is clicked, receives the template content |

## Usage Example

```tsx
import { Template } from '@/components/signals/creation/suggestion-templates/template';

function TemplateSelector() {
  const handleTemplateSelect = (content: string) => {
    // Handle template selection - could update form, navigate, etc.
    console.log('Selected template:', content);
    // Example: setFormValue('signalContent', content);
  };

  return (
    <div className="space-y-3">
      <Template
        content="Create a signal for {project} when {condition} occurs"
        onSelect={handleTemplateSelect}
      />
      <Template
        content="Monitor {metric} and alert when threshold exceeds {value}"
        onSelect={handleTemplateSelect}
      />
    </div>
  );
}
```

## Functionality

- **Template Display**: Renders template content as a clickable card with consistent styling
- **Syntax Highlighting**: Automatically highlights template placeholders (e.g., `{variable}`) using regex matching
- **Interactive Feedback**: Provides hover effects including background changes and icon visibility
- **Selection Handling**: Triggers callback with template content when clicked
- **Responsive Design**: Adapts layout and spacing for different screen sizes (lg breakpoints)
- **Accessibility**: Uses semantic markup and proper interactive elements

## State Management

**Local State Only** - No external state management:
- Uses `useMemo` for performance optimization of text highlighting computation
- Uses `useCallback` to prevent unnecessary re-renders of click handlers
- No TanStack Query or Zustand integration required as this is a pure presentation component

## Side Effects

**None** - This is a pure presentation component:
- No API calls or external data fetching
- No localStorage or sessionStorage interactions
- Only triggers the provided `onSelect` callback
- Text highlighting is computed client-side with no external dependencies

## Dependencies

### Internal Dependencies
- **UI Components**: `Typography` for consistent text styling
- **Icons**: `PiArrowUpLine` for visual feedback
- **Utilities**: 
  - `cn` for conditional className handling
  - `getHighlightedTextPartsRegex` for text highlighting
  - `SIGNAL_TEMPLATE_HIGHLIGHT_REGEX` for placeholder detection

### Type Dependencies
- `SignalSuggestionTemplate` type from `/lib/types`

### External Libraries
- React hooks (`useCallback`, `useMemo`)

## Integration

### Application Architecture Role
- **Domain**: Part of the signals creation flow in the suggestion templates system
- **Layer**: Presentation component that bridges UI and business logic
- **Parent Components**: Likely used within template listing or selection components
- **Data Flow**: Receives template data from parent, sends selection events upward

### File Structure Integration
```
src/components/signals/creation/suggestion-templates/
├── template.tsx                 # This component
├── template-list.tsx           # Likely parent component
└── template-selector.tsx       # Possible container component
```

## Best Practices

### Architecture Compliance
✅ **Component Decomposition**: Single responsibility - only handles template display and selection  
✅ **Client Component Usage**: Appropriately uses client component for interactivity  
✅ **Prop Interface**: Clean, typed interface with clear responsibilities  
✅ **Performance**: Uses `useMemo` and `useCallback` for optimization  

### Code Quality
✅ **Accessibility**: Proper semantic structure with clickable elements  
✅ **Responsive Design**: Mobile-first approach with lg breakpoints  
✅ **Type Safety**: Full TypeScript integration with proper typing  
✅ **Styling**: Uses design system tokens (pg-prefixed classes)  

### Integration Patterns
✅ **Separation of Concerns**: Pure presentation logic, business logic handled by parent  
✅ **Reusability**: Generic enough to work with any template content  
✅ **Event Handling**: Clean callback pattern for parent communication  
✅ **Dependencies**: Minimal and well-defined dependency tree