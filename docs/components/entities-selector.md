# EntitiesSelector Component

## Purpose

The `EntitiesSelector` component provides an interactive dropdown interface for searching and selecting entities (people, companies) within the omnibar editor. It enables users to mention entities by typing `@` followed by a search query, displaying real-time search results with rich formatting and icons. Selected entities are converted into mention nodes within the Lexical editor and tracked in the application state.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages complex interactive state with user input and selections
- Integrates with Lexical editor for real-time text manipulation
- Handles keyboard events and dynamic UI updates
- Uses multiple React hooks for state management and side effects

## Props Interface

This component accepts no props - it's a self-contained widget that manages its own state through Zustand stores.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | No external props accepted |

## Usage Example

```tsx
import { EntitiesSelector } from '@/components/omnibar/entities-selector/entities-selector';

// Used within the omnibar workflow system
function OmnibarWorkflows() {
  return (
    <div className="omnibar-workflows">
      {/* Other workflow components */}
      <EntitiesSelector />
    </div>
  );
}

// The component automatically activates when user types @ in the editor
// Example user flow:
// 1. User types "@john" in the editor
// 2. EntitiesSelector appears with matching people/companies
// 3. User selects an entity from the dropdown
// 4. Entity becomes a mention node: @John Doe
```

## Functionality

### Core Features

- **Real-time Entity Search**: Searches for people and companies as user types
- **Rich Result Display**: Shows entity names, labels, and appropriate icons/favicons
- **Mention Node Creation**: Converts selections into Lexical editor mention nodes
- **Entity State Tracking**: Maintains a map of selected entities for the session
- **Temporary Highlighting**: Provides visual feedback while typing mentions
- **Smart Deduplication**: Prevents duplicate entity selections

### Search Integration

- Integrates with the global search system
- Filters results to entities only (disables stories and topics)
- Displays company favicons and person avatars
- Provides fallback placeholder icons for missing assets

### Editor Integration

- Works with Lexical editor's typeahead system
- Creates persistent `MentionNode` instances
- Handles node lifecycle (creation, updates, deletion)
- Manages temporary mention highlighting during typing

## State Management

### Zustand Store Integration

Uses `useOmnibarStore` for:
- `entitiesSearchQuery`: Current search query from user input
- `selectedEntitiesMap`: Map of node keys to selected entity items
- `entityPluginMatch`: Current typeahead match context
- `setIsDisableAiSuggestions`: Controls AI suggestion state

### Local State

- Search results managed by `useSearch` hook
- Loading states for search operations
- Selection and keyboard navigation state

## Side Effects

### Search Operations
- Triggers entity search when `entitiesSearchQuery` changes
- Debounced search requests to prevent excessive API calls
- Updates AI suggestion availability based on search state

### Editor Mutations
- Listens for mention node lifecycle events
- Automatically cleans up entity mappings when nodes are deleted
- Handles node updates and visual state changes

### UI State Updates
- Disables AI suggestions when entity results are available
- Updates entity selection map when mentions are created/destroyed

## Dependencies

### Core Hooks
- `useSearch`: Entity search functionality
- `useLexicalEditorTools`: Editor integration and node manipulation
- `useCreateTextEntityFromTextNode`: Temporary mention highlighting

### UI Components
- `SelectorMenu`: Dropdown menu functionality
- `CitationItem`/`CitationItemWrapper`: Entity visual representation
- `Favicon`: Company favicon display
- `Typography`: Text rendering

### Editor Nodes
- `MentionNode`: Persistent entity mentions
- `TemporaryMentionNode`: Typing preview highlights
- `BaseTokenNode`: Token node base functionality

## Integration

### Omnibar Ecosystem
- Part of the omnibar workflow system
- Integrates with `WorkflowSection` for consistent UI
- Coordinates with other selectors and AI suggestions

### Search System
- Leverages global search infrastructure
- Respects search filtering and result formatting
- Provides entity-specific search behavior

### Editor Architecture
- Extends Lexical editor with mention capabilities
- Follows editor plugin patterns for typeahead functionality
- Maintains editor state consistency

## Best Practices

### Architecture Adherence
- ✅ **State Management**: Uses Zustand for global state, local state for UI-specific concerns
- ✅ **Component Decomposition**: Composed of focused UI components and hooks
- ✅ **Reusability**: Leverages shared UI components and search infrastructure

### Performance Considerations
- Memoizes selector items to prevent unnecessary re-renders
- Uses callbacks to prevent function recreation on each render
- Efficient entity mapping updates with immutable patterns

### User Experience
- Provides immediate visual feedback during typing
- Handles edge cases like duplicate selections
- Maintains consistent visual hierarchy with other omnibar components

### Code Organization
- Separates concerns between search, UI, and editor logic
- Uses TypeScript for type safety across entity interfaces
- Follows established patterns for Lexical node manipulation

## Exported Utilities

### `getPlaceholderEntityIcon`

```tsx
function getPlaceholderEntityIcon(type: SearchEntityItem['type']): JSX.Element
```

Utility function that returns appropriate placeholder icons for different entity types:
- Companies: `EmptyBuilding` icon
- People: `Person` icon

Used when entity-specific icons are not available.