# OmniToolbar Component

## Purpose

The `OmniToolbar` component serves as the primary action interface for the omnibar system, providing workflow-specific submit buttons, filters, and keyboard shortcuts. It adapts its behavior and labeling based on the current workflow (chat, search, signal creation, etc.) and handles submission logic with appropriate loading states and usage limits.

## Component Type

**Client Component** - Uses `'use client'` directive (implied by hooks usage) because it:
- Manages interactive state with multiple Zustand stores
- Handles user interactions and form submissions
- Uses multiple React hooks for state management and side effects
- Requires real-time updates based on user actions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isInside` | `boolean` | No | Whether the toolbar is rendered inside a container (affects padding) |
| `size` | `'xxs' \| 'xs' \| 'md'` | No | Size variant for the toolbar components (default: `'md'`) |
| `customLabel` | `string \| ReactNode` | No | Custom label to override the default workflow-specific button text |
| `className` | `string` | No | Additional CSS classes for styling |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes |

## Usage Example

```tsx
import { OmniToolbar } from '@/components/omnibar/omni-toolbar/omni-toolbar';

// Basic usage
function OmnibarContainer() {
  return (
    <div className="omnibar-container">
      <OmniToolbar />
    </div>
  );
}

// Inside a modal or container
function ModalOmnibar() {
  return (
    <div className="modal-content">
      <OmniToolbar 
        isInside={true}
        size="xs"
        className="border-t"
      />
    </div>
  );
}

// With custom label
function CustomOmnibar() {
  return (
    <OmniToolbar 
      customLabel="Process Request"
      size="md"
    />
  );
}

// Workflow-specific usage
function SignalCreationForm() {
  // When currentWorkflow is OMNI_WORKFLOWS.SIGNAL
  // Button automatically shows "Create signal"
  return (
    <form>
      <textarea placeholder="Describe your signal..." />
      <OmniToolbar size="xs" />
    </form>
  );
}
```

## Functionality

### Core Features
- **Workflow-Aware Labeling**: Automatically updates button text based on current workflow
- **Usage Limit Enforcement**: Prevents actions when usage limits are reached
- **Loading State Management**: Shows spinner during submission
- **Responsive Design**: Conditionally shows shortcuts on desktop
- **Keyboard Integration**: Dispatches Lexical editor commands for form submission

### Workflow Button Labels
- `CHAT`: "Start chat"
- `SEARCH`: "Start search" 
- `SIGNAL`: "Create signal"
- `STORY`: "Open"
- `FILES`: "Open"
- `ALL/Default`: "Continue"

### Usage Limit Handling
- **Chat Limits**: Shows `ChatLimitBanner` when chat limit reached
- **Signal Limits**: Prevents signal creation and shows toast notification
- **Conditional Disabling**: Disables submit button when limits exceeded

## State Management

### Zustand Stores
- **`useOmnibarStore`**: Primary state management
  - `currentWorkflow`: Current active workflow
  - `isSubmitLoading`: Submission loading state
  - `aiTemplatesSearchQuery`: Search query state
  - `setDisableChats`: Chat disable control

### Context Usage
- **`useUsageContext`**: Usage limits and remaining counts
  - `activeSignalsRemaining`: Available signal creation count
  - `chatsRemaining`: Available chat count
- **`useAccessToken`**: Authorization state

### Local State
- Uses `useRef` for container reference
- Computed values with `useMemo` for performance optimization

## Side Effects

### Editor Integration
- Dispatches `KEY_ENTER_COMMAND` to Lexical editor for form submission
- Integrates with `useLexicalEditorTools` for editor control

### Usage Tracking
- Updates chat disable state based on remaining usage
- Triggers signal limit validation and toast notifications

### Responsive Behavior
- Conditionally renders shortcuts based on breakpoint detection

## Dependencies

### Internal Components
- `ChatLimitBanner`: Usage limit notification
- `OmniFilters`: Workflow filtering interface
- `ViewShortcuts`: Keyboard shortcut display
- `Button`: Primary UI button component
- `PiLoader3Line`: Loading spinner icon

### Hooks and Utilities
- `useBreakpoint`: Responsive design detection
- `useLexicalEditorTools`: Editor integration
- `useSignalCreation`: Signal creation logic
- `cn`: CSS class name utility

### External Libraries
- **Lexical**: Rich text editor command system

## Integration

### Omnibar System
- Central component in the omnibar interface
- Coordinates with filters and shortcuts
- Integrates with workflow state management

### Form Submission Flow
1. User clicks submit button
2. Component checks usage limits
3. Dispatches appropriate editor command
4. Handles loading states and error conditions

### Usage Monitoring
- Tracks and enforces chat/signal usage limits
- Updates UI based on remaining usage
- Provides user feedback for limit violations

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses client-side hooks appropriately
- ✅ **State Management**: Leverages Zustand for complex state coordination
- ✅ **Component Decomposition**: Flat structure with clear separation of concerns
- ✅ **Reusable Design**: Flexible props interface for various use cases

### Implementation Patterns
- ✅ **Memoization**: Uses `useMemo` for expensive computations
- ✅ **Callback Optimization**: Uses `useCallback` for event handlers
- ✅ **Ref Management**: Proper use of refs for DOM access
- ✅ **Conditional Rendering**: Clean logic for responsive and state-based rendering

### User Experience
- ✅ **Loading States**: Clear feedback during async operations
- ✅ **Accessibility**: Proper button labeling and test IDs
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Error Prevention**: Proactive limit checking and user guidance

## Exported Functions

### `getWorkflowButtonLabel(workflow: OMNI_WORKFLOWS): string`

Utility function that maps workflow types to appropriate button labels.

```tsx
import { getWorkflowButtonLabel, OMNI_WORKFLOWS } from './omni-toolbar';

const label = getWorkflowButtonLabel(OMNI_WORKFLOWS.CHAT); // "Start chat"
```

**Parameters:**
- `workflow`: The current workflow type

**Returns:** 
- Appropriate button label string for the workflow