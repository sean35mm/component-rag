# EntitiesEditor Component

## Purpose

The `EntitiesEditor` component provides an interface for users to add and manage entities (people, companies, and topics) when creating signals. It enhances signal creation by allowing users to refine their search results with specific entities, featuring a search bar with suggested entities based on the current query.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through Zustand store
- Handles user input and real-time entity management
- Requires client-side reactivity for the search functionality

## Props Interface

This component accepts no props - it's a self-contained editor that manages its state through the global store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component is self-contained with no external props |

## Usage Example

```tsx
import { EntitiesEditor } from '@/components/signals/creation/entities-editor';

// Basic usage within a signal creation form
function SignalCreationForm() {
  return (
    <div className="space-y-6">
      <QueryEditor />
      <EntitiesEditor />
      <AdvancedFilters />
    </div>
  );
}

// Used in a multi-step creation wizard
function CreateSignalWizard() {
  return (
    <div className="wizard-container">
      {step === 'entities' && (
        <div className="step-content">
          <h2>Refine with Entities</h2>
          <EntitiesEditor />
        </div>
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Entity Management**: Add, remove, and manage entities for signal refinement
- **Smart Suggestions**: Provides suggested entities based on current query and title
- **Visual Feedback**: Clean, accessible interface with proper spacing and typography
- **Real-time Updates**: Immediately reflects changes in the global signal creation state

### User Interface
- Rounded border container with consistent spacing
- Clear labeling with description text
- Integrated search bar with custom styling
- Add button with icon for intuitive interaction

### Search Integration
- Connects to `SearchBarSimple` for entity search functionality
- Hides empty state for cleaner appearance
- Custom styling for consistent design language

## State Management

**Zustand Store Integration** - Uses `useCreateSignalStore` for:

```tsx
// State accessed from store
const entities = useCreateSignalStore((state) => state.entities);
const setEntities = useCreateSignalStore((state) => state.setEntities);
const enhancedQuery = useCreateSignalStore((state) => state.enhancedQuery);
const queryTitle = useCreateSignalStore((state) => state.queryTitle);
```

### State Flow
1. **Read State**: Accesses current entities, enhanced query, and query title
2. **Update State**: Modifies entities through `setEntities` action
3. **Computed Values**: Generates suggestion parameters based on current query state
4. **Reactive Updates**: Component re-renders when store state changes

## Side Effects

### Memoization
- **Query Parameters**: Uses `useMemo` to optimize suggested entities query parameters
- **Dependency Tracking**: Re-computes when `enhancedQuery` or `queryTitle` changes

### External Interactions
- **Search API**: Indirectly triggers entity suggestion API calls through `SearchBarSimple`
- **Store Updates**: Persists entity changes to global application state

## Dependencies

### Internal Components
- `SearchBarSimple` - Core search functionality
- `Typography` - Consistent text styling
- `PiAddLine` - Icon for add button

### Hooks & Stores
- `useCreateSignalStore` - Global signal creation state management
- `useMemo` - Performance optimization for computed values

### Types
- `AllEndpointParams` - Type safety for API query parameters

## Integration

### Signal Creation Flow
```
Query Input → Enhanced Query → Entity Suggestions → Entity Selection → Signal Creation
     ↑                                                      ↓
     └─────────────── Global State Management ──────────────┘
```

### Store Architecture
- **Centralized State**: Part of larger signal creation workflow
- **Reactive Updates**: Changes propagate to other creation components
- **Persistence**: State maintained across component re-renders

### API Integration
- **Suggestion Endpoint**: Provides entity suggestions based on query context
- **Parameter Mapping**: Transforms store state into API-compatible parameters

## Best Practices

### Architecture Compliance
✅ **Client Component Usage**: Appropriately uses client-side rendering for interactivity  
✅ **State Management**: Proper Zustand integration for global state  
✅ **Component Decomposition**: Leverages existing UI components (`SearchBarSimple`, `Typography`)  
✅ **Performance**: Implements memoization for expensive computations  

### Code Quality
- **Type Safety**: Proper TypeScript usage with defined interfaces
- **Separation of Concerns**: UI logic separated from business logic
- **Accessibility**: Semantic HTML structure with proper labeling
- **Consistent Styling**: Follows design system patterns

### Integration Patterns
- **Store Integration**: Clean separation between component logic and state management
- **Component Reuse**: Leverages existing search components rather than rebuilding
- **Prop Drilling Avoidance**: Uses global state appropriately to avoid complex prop chains