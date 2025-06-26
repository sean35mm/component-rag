# FirstTimeModal Component

## Purpose

The `FirstTimeModal` component displays a one-time tutorial modal for the search feature, introducing users to Perigon's search capabilities and boolean commands. It automatically shows on first visit and never appears again once dismissed, improving user onboarding experience.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state with `useLocalStorage` hook
- Handles user interactions (modal dismiss, button clicks)
- Conditionally renders based on browser storage state

## Props Interface

This component accepts no props - it's a self-contained modal that manages its own visibility state.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | Component is fully self-contained |

## Usage Example

```tsx
import { FirstTimeModal } from '@/components/search/first-time-modal';

// In your search page or layout
export default function SearchPage() {
  return (
    <div>
      {/* Your search interface */}
      <SearchInput />
      <SearchResults />
      
      {/* Modal will auto-show for first-time users */}
      <FirstTimeModal />
    </div>
  );
}
```

## Functionality

### Core Features
- **One-time Display**: Shows only on first visit, never again after dismissal
- **Educational Content**: Explains Perigon's search capabilities and boolean commands
- **Call-to-Action Guidance**: Highlights the "Create Signal" feature with visual indicators
- **External Learning**: Provides link to boolean search documentation
- **Responsive Design**: Adapts layout for mobile and desktop viewports

### User Interactions
- **Get Started Button**: Dismisses modal and marks as seen
- **Learn Boolean Link**: Opens boolean search guide in new tab
- **Auto-dismiss**: Modal closes when user acknowledges the tutorial

## State Management

### Local Storage Pattern
```tsx
const [hasSeenModal, setHasSeenModal] = useLocalStorage(
  SEARCH_FIRST_TIME_MODAL_KEY,
  false
);
```

- **Storage Key**: `SEARCH_FIRST_TIME_MODAL_KEY` for consistent reference
- **Persistence**: Boolean flag persists across browser sessions
- **Default State**: `false` (modal shows) until user dismisses

## Side Effects

### Browser Storage
- **Reads**: Checks localStorage on component mount
- **Writes**: Updates localStorage when modal is dismissed
- **Persistence**: State survives page refreshes and browser restarts

### Navigation
- **External Link**: Opens boolean search documentation in new tab
- **No Route Changes**: Modal doesn't affect current page navigation

## Dependencies

### UI Components
```tsx
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
```

### Feature Components
```tsx
import { WorkflowDisplay } from '@/components/omnibar/infobar/workflow-display';
```

### External Libraries
```tsx
import { useLocalStorage } from 'usehooks-ts';
import NextLink from 'next/link';
```

### Icons and Constants
```tsx
import { PiArrowRightUpLine, PiFlashlightLine } from '@/components/icons';
import { OMNI_WORKFLOWS } from '@/lib/types';
```

## Integration

### Search Feature Integration
- **Placement**: Typically included in search pages or layouts
- **Workflow Context**: Shows `OMNI_WORKFLOWS.SEARCH` workflow indicator
- **Feature Guidance**: References the "Create Signal" functionality

### Application Architecture
```tsx
Search Page
├── Search Interface Components
├── Search Results
└── FirstTimeModal (auto-shows for new users)
```

### Storage Architecture
- **Key Export**: `SEARCH_FIRST_TIME_MODAL_KEY` available for external reference
- **Consistent Naming**: Follows application storage key conventions
- **Type Safety**: Uses TypeScript for storage value types

## Best Practices

### ✅ Follows Architecture Guidelines

**Client Component Usage**: Appropriately uses `'use client'` for state management and user interactions

**Component Decomposition**: Self-contained modal that doesn't create deep nesting

**State Management**: Uses appropriate local storage for persistent UI state (not server state)

**Reusability**: Leverages UI components from `/ui/` directory for consistent styling

### ✅ Implementation Patterns

**Conditional Rendering**: Returns `null` when modal shouldn't show, avoiding unnecessary DOM

**User Experience**: One-time display pattern prevents modal fatigue

**Accessibility**: Uses proper Dialog components with semantic HTML structure

**External Links**: Safely opens documentation with `target='_blank'` and security attributes

### ✅ Performance Considerations

**Early Return**: Exits rendering early when modal isn't needed

**Storage Efficiency**: Uses simple boolean flag rather than complex state objects

**Component Isolation**: No props drilling or complex parent-child communication