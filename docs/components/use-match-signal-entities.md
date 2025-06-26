# useMatchSignalEntities Hook

## Purpose

The `useMatchSignalEntities` hook manages the lifecycle of signal entity matching in the signal creation workflow. It processes pending signal entities (companies, people, topics) through entity matching and automatically updates the application state when matches are found, providing a seamless experience for building signal configurations.

## Component Type

**Client Component** - This is a custom hook that requires client-side state management and uses `useEffect` for side effects. It integrates with Zustand stores that manage client-side state for the signal creation process.

## Props Interface

This hook takes no parameters.

**Return Type:**
| Property | Type | Description |
|----------|------|-------------|
| `companies` | `SearchEntityItem[]` | Array of matched company entities |
| `people` | `SearchEntityItem[]` | Array of matched people entities |
| `topics` | `SearchEntityItem[]` | Array of matched topic entities |
| `isFetching` | `boolean` | Loading state indicator for entity matching operations |

## Usage Example

```tsx
'use client';

import { useMatchSignalEntities } from '@/components/hooks/use-match-signal-entities';

function SignalEntitiesManager() {
  const { companies, people, topics, isFetching } = useMatchSignalEntities();

  if (isFetching) {
    return <div>Matching entities...</div>;
  }

  return (
    <div className="space-y-4">
      {companies.length > 0 && (
        <section>
          <h3>Companies ({companies.length})</h3>
          <ul>
            {companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </section>
      )}

      {people.length > 0 && (
        <section>
          <h3>People ({people.length})</h3>
          <ul>
            {people.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
        </section>
      )}

      {topics.length > 0 && (
        <section>
          <h3>Topics ({topics.length})</h3>
          <ul>
            {topics.map((topic) => (
              <li key={topic.id}>{topic.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function CreateSignalPage() {
  return (
    <div>
      <h2>Create Signal</h2>
      <SignalEntitiesManager />
    </div>
  );
}
```

## Functionality

### Core Features
- **Automatic Entity Processing**: Monitors pending signal entities and processes them through entity matching
- **State Synchronization**: Automatically updates the main entities collection when matches are found
- **Multi-Entity Support**: Handles companies, people, and topics simultaneously
- **Loading State Management**: Provides real-time feedback on matching operations
- **Smart Updates**: Only triggers state updates when actual matches are found

### Entity Lifecycle Management
- Retrieves pending entities from the signal creation store
- Processes entities through the matching system
- Clears pending entities once they're successfully matched
- Appends matched entities to the main entities collection

## State Management

**Zustand Integration:**
- Uses `useCreateSignalStore` for accessing and updating signal creation state
- Manages `pendingSignalEntities` for entities awaiting processing
- Updates `entities` collection with successfully matched entities
- Provides centralized state management for the signal creation workflow

**State Operations:**
```tsx
// State access
const pendingSignalEntities = useCreateSignalStore(state => state.pendingSignalEntities);
const entities = useCreateSignalStore(state => state.entities);

// State mutations
const setEntities = useCreateSignalStore(state => state.setEntities);
const setPendingSignalEntities = useCreateSignalStore(state => state.setPendingSignalEntities);
```

## Side Effects

### Entity Processing Effect
- **Trigger**: Changes to pending signal entities or matched results
- **Operation**: Processes matched entities and updates application state
- **Cleanup**: Clears processed pending entities to prevent reprocessing
- **Dependencies**: All relevant state values and setters for comprehensive reactivity

### State Update Logic
```tsx
useEffect(() => {
  // Process entities when matches are found
  // Clear pending entities after processing
  // Update main entities collection
}, [companies, people, topics, entities, pendingSignalEntities, setEntities, setPendingSignalEntities]);
```

## Dependencies

### Internal Dependencies
- **`useMatchEntities`**: Core entity matching functionality
- **`useCreateSignalStore`**: Zustand store for signal creation state
- **`SearchEntityItem`**: Type definition for entity items

### External Dependencies
- **React**: `useEffect` for side effect management
- **Zustand**: State management through context integration

## Integration

### Signal Creation Workflow
```
User Input → Pending Entities → Entity Matching → Matched Results → State Update
```

### Store Integration
- Integrates with the broader signal creation context
- Maintains consistency between pending and confirmed entities
- Supports undo/redo functionality through state management
- Enables real-time updates across connected components

### Component Ecosystem
- Works with entity input components for capturing user selections
- Supports entity display components for showing matched results
- Integrates with form validation for signal creation
- Enables preview functionality for signal configuration

## Best Practices

### Architecture Adherence
- **✅ Client-Side State Management**: Properly uses Zustand for client state
- **✅ Custom Hook Pattern**: Encapsulates complex logic in a reusable hook
- **✅ Separation of Concerns**: Delegates entity matching to specialized hook
- **✅ State Synchronization**: Maintains consistency across state updates

### Performance Optimization
- **Efficient Updates**: Only processes entities when actual changes occur
- **Batch Operations**: Groups related state updates for better performance
- **Dependency Management**: Comprehensive effect dependencies prevent stale closures

### Error Handling Considerations
```tsx
// Consider adding error boundaries for entity matching failures
// Implement retry logic for failed entity matches
// Provide fallback states for partial matching results
```

### Testing Strategy
```tsx
// Test entity processing lifecycle
// Verify state updates occur correctly
// Ensure pending entities are cleared after processing
// Validate integration with useMatchEntities hook
```