# AiTemplatesSelector Component Documentation

## Purpose

The `AiTemplatesSelector` component provides AI-powered template suggestions within the omnibar interface. It displays contextual templates based on the current workflow (Chat, Signal, or Search) and allows users to quickly insert pre-defined prompts or titles into the editor. The component adapts its functionality based on user authentication status and provides different template sources for authenticated and public users.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages interactive state through Zustand store
- Handles user interactions (template selection)
- Integrates with Lexical editor for real-time text insertion
- Uses callbacks and event handlers for user input

## Props Interface

### AiTemplatesSelector
```typescript
// No external props - uses internal state management
```

### ProtectedAiTemplatesSelectorProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isDisableAiTitle` | `boolean` | Yes | Controls whether to show the template section title |
| `suggestionType` | `OmnibarAiSuggestionType` | Yes | Type of suggestions to fetch (CHAT, SIGNAL, SEARCH) |
| `onSelectTemplate` | `(item: SelectorMenuItem, suggestions?: OmnibarAiSuggestions) => void` | Yes | Callback when user selects a template |

### AiTemplatesSelectorInnerProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isDisableAiTitle` | `boolean` | Yes | Controls section title visibility |
| `isFetching` | `boolean` | Yes | Loading state for template suggestions |
| `suggestions` | `OmnibarAiSuggestions` | No | Array of AI template suggestions |
| `onSelectTemplate` | `(item: SelectorMenuItem) => void` | Yes | Template selection handler |

## Usage Example

```tsx
import { AiTemplatesSelector } from '@/components/omnibar/ai-templates-selector';

// Basic usage within omnibar
function OmnibarContent() {
  return (
    <div className="omnibar-container">
      {/* Other omnibar components */}
      <AiTemplatesSelector />
    </div>
  );
}

// Custom implementation with specific workflow
function CustomAiSelector() {
  const handleTemplateSelect = useCallback(
    (item: SelectorMenuItem, suggestions?: OmnibarAiSuggestions) => {
      // Custom template selection logic
      console.log('Selected template:', item.value);
    },
    []
  );

  return (
    <PrivateAiTemplatesSelector
      isDisableAiTitle={false}
      suggestionType={OmnibarAiSuggestionType.CHAT}
      onSelectTemplate={handleTemplateSelect}
    />
  );
}
```

## Functionality

- **Contextual Templates**: Displays different templates based on current workflow (Chat, Signal, Search)
- **Authentication Awareness**: Shows different template sources for authenticated vs. public users
- **Editor Integration**: Inserts selected templates directly into the Lexical editor
- **Loading States**: Provides skeleton loading while fetching templates
- **Conditional Rendering**: Hides when AI suggestions are disabled
- **Template Selection**: Handles template selection with proper state updates

## State Management

### Zustand Store (useOmnibarStore)
- `currentWorkflow`: Determines which type of templates to show
- `isDisableAiSuggestions`: Controls component visibility
- `isDisableAiTitle`: Controls section title display
- `setIsDisableAiSuggestions`: Updates suggestion visibility state

### TanStack Query
- `useOmnibarAiSuggestions`: Fetches templates for authenticated users
- `usePublicOmnibarAiSuggestions`: Fetches templates for public users
- Provides `data`, `isFetching` states for template management

## Side Effects

- **Editor Updates**: Modifies Lexical editor content when template is selected
- **API Calls**: Fetches AI templates based on workflow type and user status
- **State Mutations**: Updates omnibar store state to disable suggestions after selection
- **Content Replacement**: Clears editor and inserts new template text

## Dependencies

### Hooks
- `useLexicalEditorTools`: Editor integration and manipulation
- `useAccessToken`: Authentication and authorization status
- `useOmnibarStore`: Omnibar state management
- `useOmnibarAiSuggestions` / `usePublicOmnibarAiSuggestions`: Template data fetching

### Components
- `SelectorMenu`: Template list rendering and selection
- `Typography`: Text styling and display
- `WorkflowSection`: Section wrapper with title
- `LoadingSkeleton`: Loading state display

### External Libraries
- **Lexical**: `$getRoot`, `$getSelection`, `TextNode` for editor manipulation
- **React**: `useCallback`, `useMemo` for performance optimization

## Integration

The component integrates into the omnibar ecosystem as a contextual helper:

1. **Workflow Integration**: Adapts to current workflow (Chat/Signal/Search) to show relevant templates
2. **Authentication Flow**: Seamlessly switches between private and public template sources
3. **Editor Integration**: Works with Lexical editor for seamless text insertion
4. **Omnibar Ecosystem**: Part of the larger omnibar interface with shared state management

## Best Practices

✅ **Proper Component Decomposition**: 
- Main component handles routing logic
- Separate components for private/public/inner functionality
- Flat component structure following Lego block principle

✅ **State Management Patterns**:
- TanStack Query for server state (template fetching)
- Zustand for client state (omnibar configuration)
- Local state minimized with useMemo/useCallback optimization

✅ **Performance Optimization**:
- `useCallback` for stable event handlers
- `useMemo` for expensive computations (workflow type mapping)
- Conditional rendering to avoid unnecessary renders

✅ **User Experience**:
- Loading states with skeleton components
- Contextual templates based on workflow
- Proper authentication handling

✅ **Separation of Concerns**:
- Template selection logic separated from rendering
- Authentication logic isolated in routing component
- Editor integration contained within selection handler