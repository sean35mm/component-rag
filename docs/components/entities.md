# Entities Component

## Purpose
The Entities component displays and manages the entities (companies, people, topics) associated with a signal. It provides an expandable interface for viewing matched entities with click-to-edit functionality, allowing users to navigate to the signal editing mode for entity refinement.

## Component Type
**Client Component** - Uses the `'use client'` directive because it manages local state for expansion/collapse functionality, handles DOM measurements for truncation detection, and provides interactive click handlers.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalData` | `Signal` | Yes | The signal data object containing query fields used to match and display entities |

## Usage Example

```tsx
import { Entities } from '@/components/signals/details/entities/entities';
import { Signal } from '@/lib/types';

// In a signal details page
function SignalDetailsPage({ signal }: { signal: Signal }) {
  return (
    <div className="space-y-4">
      <h2>Signal Entities</h2>
      <Entities signalData={signal} />
    </div>
  );
}

// Loading state usage
function SignalDetailsWithLoading({ signal, isLoading }: { signal?: Signal; isLoading: boolean }) {
  if (isLoading) {
    return <EntitiesLoadingSkeleton />;
  }
  
  return signal ? <Entities signalData={signal} /> : null;
}
```

## Functionality

### Core Features
- **Entity Display**: Renders matched companies, people, and topics as interactive chips
- **Expandable Interface**: Automatically truncates content with expand/collapse functionality
- **Click-to-Edit**: Clicking any entity navigates to signal edit mode (Step 2)
- **Loading States**: Provides skeleton loading UI during entity matching
- **Empty States**: Displays "No entities found" when no matches exist

### Visual Behavior
- **Truncation Detection**: Uses DOM measurement to determine if content overflow requires expand button
- **Responsive Layout**: Flexbox layout with gap spacing that adapts to content
- **Styling Variants**: Uses CVA for consistent expansion state styling

## State Management

### Local State (useState)
- `isExpanded`: Controls whether the entity list is expanded or truncated
- `needsTruncation`: Tracks whether content overflow requires expand functionality

### External State Dependencies
- **Entity Matching**: Relies on `useMatchEntities` hook for fetching and matching entities
- **Edit Mode**: Uses `useSwitchSignalEditMode` for navigation state management

## Side Effects

### DOM Interactions
- **Scroll Height Detection**: Measures DOM element dimensions to determine truncation needs
- **Safari Mobile Fix**: Implements 50ms timeout for accurate height calculation on mobile Safari

### Navigation Effects
- **Edit Mode Switching**: Triggers navigation to signal creation step 2 when entities are clicked

## Dependencies

### Custom Hooks
- `useMatchEntities`: Fetches and matches entities based on signal data
- `useSwitchSignalEditMode`: Manages signal edit mode transitions

### UI Components
- `SearchEntity`: Renders individual entity chips with styling and interaction
- `Skeleton`: Provides loading state placeholders
- `ExpandButton`: Handles expand/collapse functionality

### Utilities
- `mapQueryFieldsToPendingSignalEntities`: Transforms signal data for entity matching
- `cva`: Class variance authority for component styling variants

## Integration

### Signal Management Flow
```
Signal Data → Entity Mapping → Entity Matching → Display → Edit Navigation
     ↓              ↓              ↓           ↓           ↓
  signalData → pendingEntities → matchedEntities → UI → Edit Mode
```

### Parent Component Integration
- **Signal Details Views**: Primary usage in signal detail pages and dashboards
- **Signal Editing Flow**: Integrates with multi-step signal creation/editing process
- **Entity Management**: Part of larger entity relationship management system

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive functionality
- ✅ **Component Decomposition**: Well-decomposed with separate loading skeleton and expand button
- ✅ **Hook Integration**: Properly leverages custom hooks for data fetching and state management
- ✅ **Reusable Components**: Uses shared UI components (`SearchEntity`, `Skeleton`, `ExpandButton`)

### Performance Considerations
- **Memoization**: Uses `useMemo` for entity transformations and combinations
- **Callback Optimization**: Uses `useCallback` for event handlers to prevent unnecessary re-renders
- **Efficient DOM Queries**: Minimal DOM manipulation with targeted element selection

### Error Handling
- **Loading States**: Graceful handling of loading states with skeleton UI
- **Empty States**: Clear messaging when no entities are found
- **Fallback Behavior**: Safe defaults for expansion and truncation states

### Accessibility
- **Interactive Elements**: Proper cursor styling for clickable entities
- **Visual Hierarchy**: Clear visual separation between expanded and collapsed states
- **Loading Indicators**: Accessible loading states with skeleton components