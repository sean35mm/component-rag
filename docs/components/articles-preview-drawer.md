# ArticlesPreviewDrawer

## Purpose

The `ArticlesPreviewDrawer` component provides a slide-out drawer interface for previewing articles related to signal creation. It displays article volume statistics and a filterable list of articles, helping users understand the content volume and preview specific articles before finalizing their signal configuration.

## Component Type

**Client Component** - Uses `'use client'` directive because it manages interactive UI state (drawer open/close), uses browser-specific breakpoint detection, and handles user interactions for the drawer interface.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | This component accepts no props - all state is managed through Zustand store |

## Usage Example

```tsx
import { ArticlesPreviewDrawer } from '@/components/signals/creation/articles-preview/articles-preview-drawer';

// Usage in a signal creation form
function SignalCreationForm() {
  const setIsArticlesPreviewDrawerOpen = useCreateSignalStore(
    (state) => state.setIsArticlesPreviewDrawerOpen
  );

  return (
    <div>
      <button 
        onClick={() => setIsArticlesPreviewDrawerOpen(true)}
        className="btn-primary"
      >
        Preview Articles
      </button>
      
      {/* Drawer renders when triggered */}
      <ArticlesPreviewDrawer />
    </div>
  );
}
```

## Functionality

- **Responsive Drawer Interface**: Renders as a slide-out sheet with mobile-optimized styling
- **Article Volume Display**: Shows formatted article count with volume badge and statistics
- **Articles List**: Renders a scrollable list of articles for preview
- **Mobile Adaptation**: Automatically adjusts layout and controls based on screen size
- **State Synchronization**: Maintains drawer open/close state through global store

## State Management

### Zustand Store Integration
- **`isArticlesPreviewDrawerOpen`**: Controls drawer visibility state
- **`setIsArticlesPreviewDrawerOpen`**: Function to toggle drawer open/close state
- Uses `useCreateSignalStore` for signal creation workflow state management

### Local State
- No local useState - all state managed through external store and custom hooks

## Side Effects

- **Breakpoint Detection**: Monitors screen size changes for responsive behavior
- **Articles Volume Fetching**: Retrieves article volume statistics via `useSignalArticlesVolume` hook
- **Drawer State Persistence**: Maintains drawer state across component re-renders

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader` - Drawer/modal functionality
- `Typography` - Text styling and formatting
- `Separator` - Visual content separation

### Custom Hooks
- `useBreakpoint('lg')` - Responsive design detection
- `useSignalArticlesVolume()` - Article volume data fetching

### Child Components
- `ArticlesList` - Renders the actual articles list
- `ArticlesVolumeBadge` - Displays article volume indicator

### Utilities
- `pluralize` - Handles singular/plural text formatting
- `nFormatter` - Formats large numbers for display

## Integration

### Signal Creation Workflow
- Integrated into the signal creation process as a preview mechanism
- Provides users visibility into article volume before signal finalization
- Works alongside other signal creation components in the workflow

### Global State Integration
- Connects to `useCreateSignalStore` for centralized signal creation state
- Drawer state can be triggered from any component with access to the store
- Maintains consistency across the signal creation user experience

## Best Practices

### Architecture Adherence
- ✅ **Lego Block Design**: Composed of smaller, focused components (`ArticlesList`, `ArticlesVolumeBadge`)
- ✅ **State Management**: Uses Zustand for client state, custom hooks for server data
- ✅ **Component Decomposition**: Flat structure with clear separation of concerns
- ✅ **Responsive Design**: Mobile-first approach with breakpoint-based adaptation

### Usage Patterns
- Component requires no props - state managed externally for maximum flexibility
- Can be rendered anywhere in the application and controlled via store actions
- Follows drawer/modal patterns with proper accessibility considerations
- Maintains consistent styling with application design system

### Performance Considerations
- Drawer content only renders when open (controlled by Sheet component)
- Article volume data cached through custom hook implementation
- Responsive breakpoint detection optimized to prevent unnecessary re-renders