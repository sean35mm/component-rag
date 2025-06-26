# StoryDrawer Component

## Purpose

The `StoryDrawer` component provides a mobile-optimized drawer interface for displaying detailed story information. It serves as a modal-like overlay that presents story details with a footer action to navigate to the full story view. This component acts as a bridge between story previews and the complete story experience.

## Component Type

**Client Component** - Uses the `'use client'` directive (inherited from `EntityDrawerMobile`) because it:
- Manages interactive drawer state (open/close)
- Handles user interactions and navigation
- Integrates with client-side state management (Zustand)
- Requires responsive mobile UI behaviors

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component receives no props; it manages its own state through Zustand store |

## Usage Example

```tsx
import { StoryDrawer } from '@/components/drawers/story-detail-drawer';

// In your main layout or page component
export default function StoriesPage() {
  return (
    <div>
      {/* Your story list or grid */}
      <StoryGrid stories={stories} />
      
      {/* The drawer will automatically appear when story state is set */}
      <StoryDrawer />
    </div>
  );
}

// Triggering the drawer from a story item
import { useEntityDetailDrawerStore } from '@/lib/contexts';

function StoryCard({ story }) {
  const { setStory, setIsOpen } = useEntityDetailDrawerStore();
  
  const handleViewDetails = () => {
    setStory(story);
    setIsOpen(true);
  };
  
  return (
    <div onClick={handleViewDetails}>
      {/* Story card content */}
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Only renders when story data is available
- **Mobile-Optimized Display**: Uses `EntityDrawerMobile` for responsive mobile experience
- **Story Details Presentation**: Displays comprehensive story information via `StoryDetails` component
- **Navigation Integration**: Provides direct link to full story view
- **State-Driven Visibility**: Automatically manages open/close state through Zustand store

### User Interactions
- **Open/Close Drawer**: Controlled through global state management
- **Story Navigation**: Footer button navigates to complete story page
- **Backdrop Dismissal**: Inherits dismissal behavior from `EntityDrawerMobile`

## State Management

### Zustand Store Integration
```tsx
const isOpen = useEntityDetailDrawerStore((state) => state.isOpen);
const setIsOpen = useEntityDetailDrawerStore((state) => state.setIsOpen);
const storyData = useEntityDetailDrawerStore((state) => state.story);
```

**State Dependencies**:
- `isOpen`: Controls drawer visibility
- `setIsOpen`: Function to toggle drawer state
- `story`: Current story data to display

**State Flow**:
1. External components set story data in store
2. Component reactively renders when story data exists
3. User interactions update store state
4. Component re-renders based on state changes

## Side Effects

### Computed Values
- **Dynamic Href Generation**: Uses `useMemo` to compute story URL when story data changes
- **Conditional Footer Rendering**: Footer only appears when valid href exists

### Navigation Effects
- **Next.js Routing**: Integrates with Next.js Link component for client-side navigation
- **URL Generation**: Utilizes `getStoryHref` utility for consistent story URL patterns

## Dependencies

### UI Components
- `EntityDrawerMobile`: Base drawer component for mobile layouts
- `StoryDetails`: Component for rendering story information
- `Button`: UI button component for navigation action

### Utilities & Hooks
- `useEntityDetailDrawerStore`: Zustand store for drawer state management
- `getStoryHref`: Utility function for generating story URLs
- `NextLink`: Next.js link component for navigation

### External Libraries
- React hooks (`useMemo`) for performance optimization
- Next.js routing system for navigation

## Integration

### Application Architecture Role
```
Story List/Grid Components
         ↓
Entity Detail Drawer Store (Zustand)
         ↓
StoryDrawer Component
         ↓
EntityDrawerMobile + StoryDetails
         ↓
Full Story Page (via navigation)
```

### State Flow Integration
1. **Trigger**: Story selection updates global drawer state
2. **Display**: StoryDrawer reactively renders with story data
3. **Interaction**: User views details and optionally navigates to full story
4. **Cleanup**: Drawer state managed through store actions

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Leverages existing UI components (`EntityDrawerMobile`, `StoryDetails`)
- ✅ **State Management**: Uses Zustand for client state management
- ✅ **Reusability**: Built on reusable drawer and detail components
- ✅ **Performance**: Implements `useMemo` for expensive computations

### Design Patterns
- **Conditional Rendering**: Guards against rendering without data
- **Store Integration**: Follows Zustand patterns for state access
- **URL Management**: Uses utility functions for consistent routing
- **Mobile-First**: Specifically designed for mobile experiences

### Performance Considerations
- **Memoized Computations**: Story href calculation optimized with `useMemo`
- **Conditional Mounting**: Only renders when story data exists
- **Efficient State Selection**: Uses specific store selectors to minimize re-renders