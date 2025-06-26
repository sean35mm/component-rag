# SignalCreationManager Component

## Purpose

The `SignalCreationManager` is a comprehensive orchestration component that manages the entire signal creation workflow. It provides a multi-step guided experience for users to create and configure signals, handling both new signal creation and editing existing signals with proper state management, navigation, and user feedback.

## Component Type

**Client Component** - Uses `'use client'` directive because it:
- Manages complex multi-step navigation state
- Handles URL search parameters and routing
- Implements multiple useEffect hooks for lifecycle management
- Requires browser-specific APIs for scrolling and navigation
- Integrates with analytics tracking

## Props Interface

This component accepts no props - it's a self-contained manager that derives all state from Zustand stores and URL parameters.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | Component operates through global state management |

## Usage Example

```tsx
// In a page or layout component
import { SignalCreationManager } from '@/components/signals/creation/signal-creation-manager';

export default function CreateSignalPage() {
  return (
    <div className="min-h-screen">
      <SignalCreationManager />
    </div>
  );
}

// With initial query parameter
// URL: /create-signal?initial_query=keyword
// The component automatically handles the initial_query parameter
```

## Functionality

### Core Features

- **Multi-Step Workflow**: Manages 4-step signal creation process with dynamic content rendering
- **Edit Mode Support**: Handles both creation and editing workflows seamlessly
- **Query Parameter Integration**: Processes `initial_query` from URL and pre-populates forms
- **Responsive Design**: Adapts layout and behavior for desktop and mobile viewports
- **Loading States**: Provides comprehensive loading feedback for different operations
- **Saving Animation**: Shows dedicated saving state with contextual messaging
- **Auto-scroll Management**: Automatically scrolls to top when navigating between steps

### Step Management

The component renders different steps based on the active step:
- **Step 1**: Initial signal configuration
- **Step 2**: Entity matching and selection
- **Step 3**: Additional configuration
- **Step 4**: Final review and activation

## State Management

### Zustand Store Integration

Uses `useCreateSignalStore` for comprehensive state management:

```tsx
// Key state properties accessed
const {
  activeStep,
  isContinueLoading,
  isFinalCreationStepSaving,
  isSaving,
  isEditMode,
  isComingFromOmnibar,
  selectedContactPointEmails,
  setQuery,
  setIsFinalCreationStepSaving
} = useCreateSignalStore();
```

### State Categories

- **Navigation State**: `activeStep` for step progression
- **Loading States**: Multiple loading indicators for different operations
- **Mode Management**: `isEditMode`, `isComingFromOmnibar` for workflow context
- **Data State**: Form data, selected entities, contact points

## Side Effects

### URL Parameter Processing

```tsx
// Handles initial_query parameter and cleans up URL
useEffect(() => {
  const initialQuery = searchParams.get('initial_query');
  if (initialQuery) {
    setQuery(initialQuery);
    // Clean up URL after processing
    router.replace(newPath, { scroll: false });
  }
}, [searchParams, setQuery, router]);
```

### Analytics Tracking

```tsx
// Tracks step navigation for analytics
useEffect(() => {
  SignalCreationTracker.stepOpened({ step: activeStep });
}, [activeStep]);
```

### Scroll Management

```tsx
// Auto-scroll to top on step changes
useEffect(() => {
  containerRef?.current?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, [activeStep, containerRef, isDesktop]);
```

## Dependencies

### Internal Dependencies

- **Step Components**: `Step1`, `Step2`, `Step3`, `Step4`
- **UI Components**: `Typography`, `CreateSignalScreenSkeleton`, `SavingAnimation`
- **Custom Hooks**: `useBreakpoint`, `useMatchSignalEntities`, `useTabContainer`
- **State Management**: `useCreateSignalStore`
- **Analytics**: `SignalCreationTracker`

### External Dependencies

- **Next.js**: `useRouter`, `useSearchParams` for navigation
- **React**: Core hooks for state and lifecycle management

## Integration

### Application Architecture

```
┌─ Create Signal Page
│  └─ SignalCreationManager (orchestrator)
│     ├─ Step1 (query definition)
│     ├─ Step2 (entity matching)
│     ├─ Step3 (configuration)
│     ├─ Step4 (review/activation)
│     └─ SavingAnimation (feedback)
```

### Data Flow

1. **Initialization**: Processes URL parameters and sets initial state
2. **Step Navigation**: Manages progression through creation steps
3. **Entity Matching**: Coordinates with backend for signal entity resolution
4. **Saving Process**: Handles final signal creation with user feedback
5. **Cleanup**: Manages state cleanup and navigation

## Best Practices

### Architectural Adherence

- ✅ **Proper Client Component Usage**: Uses client-side features appropriately
- ✅ **Centralized State Management**: Leverages Zustand for complex state coordination
- ✅ **Component Decomposition**: Each step is a separate, focused component
- ✅ **Separation of Concerns**: UI logic separated from business logic
- ✅ **Loading State Management**: Comprehensive loading states for better UX

### Performance Optimizations

- **Memoized Step Resolution**: Uses `useMemo` for efficient step lookup
- **Conditional Rendering**: Renders only active step content
- **Cleanup Management**: Proper cleanup prevention during saving states
- **Skeleton Loading**: Shows skeleton while fetching matching entities

### Error Handling

- **Graceful Degradation**: Handles missing query parameters elegantly
- **Loading States**: Multiple loading indicators prevent user confusion
- **State Consistency**: Prevents state conflicts during transitions

### Accessibility

- **Keyboard Navigation**: Supports keyboard navigation through steps
- **Screen Reader Support**: Proper heading structure and content organization
- **Focus Management**: Auto-scroll ensures proper focus context