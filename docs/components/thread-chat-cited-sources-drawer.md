# AnswersThreadChatCitedSourcesDrawer

## Purpose

The `AnswersThreadChatCitedSourcesDrawer` component provides a modal drawer interface for displaying and managing cited sources from an AI thread conversation. It allows users to view all sources that were referenced in the chat response, interact with individual articles, and exclude specific domains from future responses. This component serves as a comprehensive source management tool within the answers thread feature.

## Component Type

**Client Component** - This component uses the `'use client'` directive (implied by the use of hooks like `useState`, `useEffect`, `useCallback`) because it requires:
- Interactive state management for the drawer open/close state
- User interactions for excluding domains and clicking articles
- Real-time updates to excluded items list
- Form-like behavior for managing source preferences

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `citations` | `AnswersThreadHistoryItemCitations` | Yes | Collection of cited sources from the chat response |
| `excludedItems` | `ExcludedFilterItem[]` | Yes | Array of currently excluded filter items (domains, sources, etc.) |
| `isOpen` | `boolean` | Yes | Controls the visibility state of the drawer |
| `onArticleClick` | `(articleId: string, url: string, title: string) => void` | Yes | Callback fired when user clicks on an individual article/source |
| `onIsOpenChange` | `(isOpen: boolean) => void` | Yes | Callback to handle drawer open/close state changes |
| `onUpdate` | `(excludedItems: ExcludedFilterItem[]) => void` | Yes | Callback fired when user updates the excluded items list |

## Usage Example

```tsx
import { AnswersThreadChatCitedSourcesDrawer } from '@/components/answers/thread-chat-cited-sources-drawer';
import { useAnswersThread } from '@/lib/hooks/use-answers-thread';

function ChatInterface() {
  const [isSourcesDrawerOpen, setIsSourcesDrawerOpen] = useState(false);
  const { currentCitations, excludedItems, updateExcludedItems } = useAnswersThread();

  const handleArticleClick = (articleId: string, url: string, title: string) => {
    // Track analytics or open article in new tab
    window.open(url, '_blank');
    trackEvent('source_article_clicked', { articleId, title });
  };

  const handleExcludedItemsUpdate = (newExcludedItems: ExcludedFilterItem[]) => {
    updateExcludedItems(newExcludedItems);
    // Optionally trigger a new search with updated filters
    refetchWithNewFilters();
  };

  return (
    <div>
      <button onClick={() => setIsSourcesDrawerOpen(true)}>
        View Sources ({currentCitations.size})
      </button>
      
      <AnswersThreadChatCitedSourcesDrawer
        citations={currentCitations}
        excludedItems={excludedItems}
        isOpen={isSourcesDrawerOpen}
        onArticleClick={handleArticleClick}
        onIsOpenChange={setIsSourcesDrawerOpen}
        onUpdate={handleExcludedItemsUpdate}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Source Display**: Renders all cited sources in an organized list format
- **Domain Exclusion**: Allows users to exclude specific domains from future responses
- **Article Navigation**: Provides click handlers for individual articles/sources
- **Dynamic Counting**: Shows pluralized source count in the header
- **State Synchronization**: Syncs excluded items with parent component state

### User Interactions
- Open/close drawer functionality
- Toggle domain exclusion checkboxes
- Click individual articles to navigate or view details
- Submit changes to apply new exclusion filters
- Cancel changes by closing without submitting

## State Management

**Local State Management** - Uses React's built-in state management:

```tsx
const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);
```

### State Patterns
- **Derived State**: `excludedDomains` computed from `excludedItems` using `useMemo`
- **Effect Synchronization**: Syncs local state with props when drawer opens
- **Optimistic Updates**: Updates local state immediately, then propagates to parent on submit
- **State Reset**: Resets local state when drawer closes without submitting

## Side Effects

### useEffect Hook
```tsx
useEffect(() => {
  setExcludedItems(isOpen ? excludedItemsProps : []);
}, [isOpen, excludedItemsProps]);
```
- Synchronizes internal excluded items state with external props
- Resets state when drawer closes to prevent stale data

### Callback Effects
- `onUpdate`: Triggers parent state updates and external API calls
- `onArticleClick`: May trigger navigation, analytics, or external link opening
- `onIsOpenChange`: Updates parent component's drawer visibility state

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetContentDivider` from `@/components/ui/sheet`
- `SourceList` - Child component for rendering the actual source list

### Utilities
- `pluralize` - Third-party library for handling singular/plural text
- `AnswersThreadHistoryItemCitations` - Store type for citation data
- `ExcludedFilterItem`, `ExcludedFilterItemType` - Type definitions for filtering

### Hooks
- React hooks: `useCallback`, `useEffect`, `useMemo`, `useState`

## Integration

### Application Architecture
- **Domain**: Lives within the `answers` feature domain
- **Component Hierarchy**: Consumed by thread chat components
- **Data Flow**: Receives citations from thread store, updates exclusion filters
- **Event Propagation**: Communicates state changes back to parent components

### Store Integration
```tsx
// Typical integration with thread store
const { citations, excludedItems, updateExcludedItems } = useAnswersThreadStore();
```

### Router Integration
- May integrate with routing for article navigation
- Could update URL parameters for filter persistence

## Best Practices

### ✅ Architecture Compliance
- **Component Decomposition**: Delegates source rendering to `SourceList` child component
- **State Management**: Uses appropriate local state for UI-specific behavior
- **Event Handling**: Proper callback patterns for parent communication
- **Type Safety**: Full TypeScript integration with proper interfaces

### ✅ Performance Optimizations
- `useMemo` for expensive computations (filtering excluded domains)
- `useCallback` for stable function references
- Conditional state updates to prevent unnecessary re-renders

### ✅ User Experience
- Smooth drawer animations via Sheet component
- Immediate visual feedback for user interactions
- Clear visual hierarchy with proper headers and dividers
- Accessibility support through semantic UI components

### ✅ Maintainability
- Single responsibility: manages cited sources display and filtering
- Clear prop interface for easy testing and integration
- Separation of concerns between display logic and business logic
- Consistent naming conventions and code organization