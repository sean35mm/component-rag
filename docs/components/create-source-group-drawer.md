# CreateSourceGroupDrawer

## Purpose

The `CreateSourceGroupDrawer` component provides a slide-out drawer interface for creating new source groups within the search customization settings. It offers a comprehensive workflow for users to search, select, and organize search sources into named groups, with features for managing unsupported domains and providing visual feedback for empty states.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive drawer state with callbacks
- Handles user interactions for source selection and management
- Integrates with Zustand store for complex state management
- Requires browser APIs for drawer animations and interactions

## Props Interface

This component accepts no props - it's a self-contained feature component that manages its own state through the Zustand store.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component uses internal state management |

## Usage Example

```tsx
import { CreateSourceGroupDrawer } from '@/components/settings/search-customization/source-group-drawer/create-source-group-drawer';

// The component is typically rendered at the root level of the settings page
export function SearchCustomizationPage() {
  return (
    <div className="settings-page">
      {/* Other settings content */}
      
      {/* Drawer renders conditionally based on store state */}
      <CreateSourceGroupDrawer />
    </div>
  );
}

// Trigger the drawer from anywhere in the app
function SomeOtherComponent() {
  const { onIsOpenChange } = useSourceGroupsDrawerStore();
  
  return (
    <Button onClick={() => onIsOpenChange(true)}>
      Create Source Group
    </Button>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Only displays when `isOpen` is true and not in edit mode
- **Source Search**: Integrated search functionality for finding available sources
- **Dynamic Content**: Shows empty state when no sources selected, or management interface when sources are present
- **Source Management**: Table view for selected sources with action buttons
- **Unsupported Domain Handling**: Dedicated section for managing unsupported domains
- **Form Actions**: Save and cancel functionality with proper state cleanup

### User Interactions
- **Auto-reset**: Automatically resets store state when drawer closes
- **Responsive Design**: Adapts drawer width based on screen size
- **Keyboard Navigation**: Supports standard drawer keyboard interactions

## State Management

**Zustand Store Integration** - Uses `useSourceGroupsDrawerStore` for:

```tsx
// State accessed from store
const {
  isOpen,              // Controls drawer visibility
  onIsOpenChange,      // Handles open/close state
  createSourceGroupData, // Selected sources data
  isEditMode,          // Determines if in edit vs create mode
  reset               // Resets all drawer state
} = useSourceGroupsDrawerStore();
```

**State Flow**:
1. Store manages drawer open/close state
2. Source selection data persists in store during session
3. Form data resets automatically on drawer close
4. Edit mode prevents create drawer from showing

## Side Effects

### State Management
- **Cleanup Effect**: Automatically calls `reset()` when drawer closes to prevent state leakage
- **Conditional Rendering**: Monitors `isEditMode` to prevent conflicts with edit functionality

### User Experience
- **Focus Management**: Drawer handles focus trapping and restoration
- **Scroll Lock**: Prevents background scrolling when drawer is open

## Dependencies

### UI Components
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetFooter`, `SheetClose` - Base drawer functionality
- `Button` - Action buttons and form controls
- `PiGlobalFill` - Icon for visual identity

### Feature Components
- `SearchSources` - Source search and filtering
- `SourcesTable` - Selected sources management
- `ActionButtons` - Source manipulation actions
- `EmptyGroup` - Empty state presentation
- `SaveButton` - Form submission handling
- `UnsupportedDomains` - Domain management section

### State Management
- `useSourceGroupsDrawerStore` - Zustand store for drawer state

## Integration

### Application Architecture
```
Settings Page
├── Search Customization Section
│   ├── Source Groups Management
│   │   ├── Create Source Group Trigger
│   │   └── CreateSourceGroupDrawer (this component)
│   └── Other customization options
└── Store Provider Context
```

### Data Flow
1. **Trigger**: User action opens drawer via store method
2. **Search**: User searches and selects sources
3. **Management**: Selected sources appear in table with actions
4. **Validation**: Save button validates and processes data
5. **Cleanup**: Drawer closes and resets state

## Best Practices

### Architecture Compliance
- ✅ **Client Component Usage**: Properly uses `'use client'` for interactive functionality
- ✅ **Component Decomposition**: Well-decomposed with single-responsibility child components
- ✅ **State Management**: Correctly uses Zustand for complex drawer state
- ✅ **Flat Structure**: Avoids deep nesting by using composition

### Implementation Patterns
- ✅ **Callback Optimization**: Uses `useCallback` for performance optimization
- ✅ **Conditional Logic**: Clean conditional rendering based on state
- ✅ **Resource Cleanup**: Proper state reset on component unmount
- ✅ **Responsive Design**: Adaptive layout for different screen sizes

### User Experience
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation
- ✅ **Visual Feedback**: Clear empty states and loading indicators
- ✅ **Error Handling**: Graceful handling of unsupported domains
- ✅ **State Persistence**: Maintains user selections during session