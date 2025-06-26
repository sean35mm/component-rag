# ArticlesPreview Component

## Purpose

The `ArticlesPreview` component displays a summary of articles associated with a signal in the signal creation flow. It shows the average number of articles from the past 30 days with a visual indicator and provides an interactive preview mechanism through a drawer interface. This component serves as both an informational display and an entry point for users to explore the underlying articles data.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state for drawer opening/closing
- Handles click events and user interactions
- Uses breakpoint detection for responsive behavior
- Integrates with Zustand store for state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| No props | - | - | This component accepts no external props and manages its state internally |

## Usage Example

```tsx
import { ArticlesPreview } from '@/components/signals/creation/articles-preview/articles-preview';

// Basic usage in signal creation flow
function SignalCreationForm() {
  return (
    <div className="signal-creation-container">
      <h2>Signal Configuration</h2>
      
      {/* Articles preview section */}
      <div className="articles-section">
        <ArticlesPreview />
      </div>
      
      {/* Other signal creation components */}
    </div>
  );
}

// Usage with surrounding context
function CreateSignalPage() {
  return (
    <CreateSignalProvider>
      <div className="create-signal-layout">
        <ArticlesPreview />
      </div>
    </CreateSignalProvider>
  );
}
```

## Functionality

### Core Features
- **Articles Volume Display**: Shows formatted count of articles from the past 30 days
- **Visual Indicators**: Uses a blue animated dot to represent active article monitoring
- **Volume Classification**: Displays a badge indicating the relative volume of articles (high/medium/low)
- **Interactive Preview**: Clickable interface that opens a detailed articles drawer
- **Responsive Design**: Adapts button text and spacing based on screen size
- **Loading States**: Shows skeleton loader while articles data is being fetched

### Interactive Behaviors
- **Hover Effects**: Background color changes on hover to indicate interactivity
- **Click Handler**: Opens articles preview drawer when clicked anywhere on the component
- **Responsive Text**: Button text adapts based on desktop/mobile breakpoints

## State Management

### Zustand Store Integration
```tsx
const setIsArticlesPreviewDrawerOpen = useCreateSignalStore(
  (state) => state.setIsArticlesPreviewDrawerOpen
);
```
- Uses `useCreateSignalStore` to manage drawer open/close state
- Follows centralized state management pattern for signal creation flow

### Custom Hooks
- **`useSignalArticlesVolume`**: Fetches and manages articles volume data
- **`useBreakpoint`**: Provides responsive breakpoint detection

## Side Effects

### Data Fetching
- Automatically fetches articles volume data through `useSignalArticlesVolume` hook
- Displays loading skeleton during data fetch operations
- No manual API calls - relies on custom hook abstraction

### UI State Changes
- Updates global drawer state when user interacts with component
- Triggers re-renders based on breakpoint changes for responsive behavior

## Dependencies

### Internal Components
- `ArticlesPreviewDrawer`: Modal/drawer component for detailed articles view
- `ArticlesPreviewSkeleton`: Loading state component
- `ArticlesVolumeBadge`: Badge component for volume classification
- `CustomizedDot`: Animated dot indicator from story stats
- `Button`, `Typography`: Base UI components

### Custom Hooks
- `useBreakpoint`: Responsive design hook
- `useSignalArticlesVolume`: Articles data management hook
- `useCreateSignalStore`: Zustand store hook for signal creation state

### External Dependencies
- `pluralize`: Text pluralization utility
- `PiArrowRightSLine`: Phosphor icon component

## Integration

### Signal Creation Flow
```tsx
// Typical integration pattern
<CreateSignalProvider>
  <SignalConfigurationForm>
    <ArticlesPreview /> {/* Shows current articles volume */}
    <SignalParametersForm />
    <ActionButtons />
  </SignalConfigurationForm>
</CreateSignalProvider>
```

### Data Flow
1. Component mounts and triggers articles volume data fetch
2. Displays loading skeleton during data retrieval
3. Renders formatted articles count with visual indicators
4. User interaction opens drawer with detailed articles view
5. Drawer state managed through centralized Zustand store

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriate use of 'use client' for interactive features
✅ **Component Decomposition**: Well-decomposed with separate skeleton, drawer, and badge components
✅ **State Management**: Proper use of Zustand for global state, custom hooks for data fetching
✅ **Reusability**: Uses shared UI components from /ui/ directory

### Performance Considerations
✅ **Loading States**: Implements skeleton loading for better UX
✅ **Responsive Design**: Uses breakpoint hook for efficient responsive behavior
✅ **Event Handling**: Single click handler for entire component area

### Code Organization
✅ **Constants Export**: Exports `DOT_COLOR_BLUE` constant for reuse
✅ **Clear Separation**: Separates concerns between data fetching, state management, and UI rendering
✅ **Utility Integration**: Proper use of formatting utilities (`nFormatter`, `pluralize`)