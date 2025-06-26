# SearchWorkflow Component

## Purpose

The SearchWorkflow component manages the search functionality within the omnibar interface, providing different search workflows based on user authentication status. It handles search query input, entity/topic selection, filter management, and navigation to search results pages with appropriate access levels (private/public).

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages complex interactive state through Zustand stores
- Handles keyboard events (Enter key commands)
- Performs client-side navigation with Next.js router
- Integrates with Lexical editor for real-time text input

## Props Interface

### SearchWorkflowBase Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(query: string, items: SearchTabItem[], filters: FiltersState \| null, savedFilterPresetId: string \| null) => void` | Yes | Callback function executed when search is submitted, receives query text, selected items, filters, and preset ID |

### Other Components

`PrivateSearchWorkflow`, `PublicSearchWorkflow`, and `SearchWorkflow` components accept no props.

## Usage Example

```tsx
import { SearchWorkflow } from '@/components/omnibar/workflows/search-workflow';

// Basic usage within omnibar
function OmnibarContent() {
  return (
    <div className="omnibar-container">
      <SearchWorkflow />
    </div>
  );
}

// Manual usage with custom submit handler
function CustomSearchWorkflow() {
  const handleCustomSubmit = useCallback(
    (query: string, items: SearchTabItem[], filters: FiltersState | null, savedFilterPresetId: string | null) => {
      // Custom search logic
      console.log('Search submitted:', { query, items, filters, savedFilterPresetId });
    },
    []
  );

  return <SearchWorkflowBase onSubmit={handleCustomSubmit} />;
}
```

## Functionality

### Core Features

- **Query Input Management**: Integrates with Lexical editor for rich text search queries
- **Entity & Topic Selection**: Allows users to select and combine entities and topics for refined search
- **Filter Management**: Supports advanced filtering and saved filter presets
- **AI Template Integration**: Provides access to AI-powered search templates
- **Keyboard Navigation**: Handles Enter key submission for seamless UX
- **Access Control**: Automatically routes to appropriate search access level based on authentication

### Key Behaviors

- Sanitizes editor content before submission
- Merges selected entities and topics into unified search tab items
- Closes omnibar interface after successful submission
- Prefetches search routes for improved navigation performance
- Conditionally renders workflow based on user authentication status

## State Management

**Zustand Store Integration** (`useOmnibarStore`):
- `selectedEntitiesMap`: Map of selected search entities
- `selectedTopicsMap`: Map of selected search topics
- `filters`: Current filter state
- `savedFilterPresetId`: ID of active saved filter preset
- `setIsOpen`: Controls omnibar visibility

**Local State**: Minimal local state, primarily relies on store and hook-managed state.

## Side Effects

### Navigation Effects
- Prefetches `/search/new` route on component mount for faster transitions
- Navigates to search results page with state on submission

### Event Registration
- Registers Enter key command handler with Lexical editor
- Automatically unregisters handlers on component unmount

### State Updates
- Closes omnibar interface after successful search submission
- Maintains search state across navigation transitions

## Dependencies

### Core Hooks
- `useLexicalEditorTools`: Editor content management and command handling
- `useRouteState<NewSearchPageState>`: Type-safe navigation with state
- `useAccessToken`: Authentication and authorization status
- `useOmnibarStore`: Centralized omnibar state management

### Child Components
- `EntitiesSelector`: Entity selection interface
- `TopicsSelector`: Topic selection interface  
- `AiTemplatesSelector`: AI template selection interface

### Utilities
- `sanitizeEditorContent`: Cleans editor input
- `mapEntitiesToSearchTabItems`: Transforms entities to search items

## Integration

### Omnibar Architecture
```
OmnibarProvider
├── OmnibarStore (Zustand)
├── SearchWorkflow (this component)
│   ├── EntitiesSelector
│   ├── TopicsSelector
│   └── AiTemplatesSelector
└── LexicalEditor
```

### Search Flow
1. User inputs query in Lexical editor
2. Selects entities, topics, and applies filters
3. Submits via Enter key or explicit action
4. Component determines access level (private/public)
5. Navigates to `/search/new` with complete search state

### Authentication Integration
- **Authenticated & Verified**: Uses `PrivateSearchWorkflow` with private access
- **Public User**: Uses `PublicSearchWorkflow` with public access
- **Unauthenticated**: Renders nothing (null)

## Best Practices

### Architectural Adherence

✅ **Component Decomposition**: Follows flat composition with `SearchWorkflowBase` as the core logic component and specialized variants for different access levels

✅ **State Management**: Properly uses Zustand for global omnibar state management, avoiding prop drilling

✅ **Separation of Concerns**: Base component handles core logic, variants handle specific routing behavior

✅ **Hook Integration**: Leverages custom hooks for editor tools and route state management

### Performance Optimizations

- Route prefetching for faster navigation transitions
- Memoized callbacks to prevent unnecessary re-renders
- Efficient state updates through Zustand selectors

### Type Safety

- Strong typing for search state and navigation parameters
- Generic type constraints for route state management
- Proper TypeScript integration across all component variants