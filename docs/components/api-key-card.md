# ApiKeyCard Component

## Purpose

The `ApiKeyCard` component renders a clickable card displaying API key information including name, preview, creation date, and last used date. It provides a user interface for viewing and managing individual API keys within the developers dashboard, with integrated options menu for key operations.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Handles interactive click events (`onClick`)
- Uses React hooks (`useCallback`)
- Manages client-side state through Zustand store
- Requires DOM event handling and manipulation

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `ApiKey` | Yes | The API key object containing all key information (name, preview, dates, etc.) |
| `className` | `string` | No | Additional CSS classes to apply to the card container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the container |

## Usage Example

```tsx
import { ApiKeyCard } from '@/components/developers/api-keys/api-key-card';

// Basic usage
function ApiKeysList({ apiKeys }: { apiKeys: ApiKey[] }) {
  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => (
        <ApiKeyCard 
          key={apiKey.id}
          apiKey={apiKey}
        />
      ))}
    </div>
  );
}

// With custom styling
function CustomApiKeyCard({ apiKey }: { apiKey: ApiKey }) {
  return (
    <ApiKeyCard
      apiKey={apiKey}
      className="hover:shadow-lg transition-shadow"
      data-testid="api-key-card"
    />
  );
}
```

## Functionality

### Core Features
- **Key Information Display**: Shows API key name, preview, creation date, and last used date
- **Interactive Card**: Clickable area that opens edit dialog (excludes menu interactions)
- **Options Menu Integration**: Embedded `CardOptionsMenu` for key management actions
- **Smart Click Handling**: Prevents edit dialog when clicking on menu elements
- **Date Formatting**: Displays dates with relative formatting for better UX
- **Responsive Layout**: Flexible grid layout that adapts to content

### User Interactions
- **Card Click**: Opens edit dialog and populates form with current key data
- **Menu Actions**: Provides additional operations through integrated options menu
- **Visual Feedback**: Hover states and group styling for enhanced interactivity

## State Management

### Zustand Store Integration
Uses `useApiKeysStore` for managing API key operations:

```tsx
const setApiKeyToEdit = useApiKeysStore((state) => state.setApiKeyToEdit);
const setIsOpenEdit = useApiKeysStore((state) => state.setIsOpenEdit);
const setSourceGroupName = useApiKeysStore((state) => state.setApiKeyName);
```

### State Updates on Click
- Sets the current API key as the one being edited
- Opens the edit dialog
- Stores the original key name for comparison/rollback

## Side Effects

### Click Event Handling
- **DOM Traversal**: Uses `closest('[role="menu"]')` to detect menu clicks
- **Event Delegation**: Prevents edit dialog when clicking menu elements
- **State Synchronization**: Updates multiple store values atomically

### Date Processing
- **ISO String Parsing**: Converts API date strings to Date objects
- **Conditional Rendering**: Handles missing date values gracefully

## Dependencies

### UI Components
- `Typography` - Text rendering with consistent styling
- `CardOptionsMenu` - Integrated menu for key operations

### Utilities
- `cn` - Utility for conditional class name merging
- `formatDateWithRelativeDay` - Date formatting with relative time
- `parseISO` from `date-fns` - ISO string to Date conversion

### State Management
- `useApiKeysStore` - Zustand store for API key management

### Types
- `ApiKey` - TypeScript interface for API key data structure

## Integration

### Developer Dashboard Flow
1. **List View**: Rendered within API keys listing page
2. **Edit Workflow**: Clicking card opens edit dialog with pre-populated data
3. **Menu Integration**: Options menu provides delete, regenerate, and other operations
4. **State Persistence**: Edit state maintained across component re-renders

### Data Flow
```
ApiKey data → Card Display → User Click → Store Update → Edit Dialog
```

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Properly uses client directive for interactivity
- ✅ **Flat Component Structure**: Single responsibility with clear prop interface
- ✅ **Zustand Integration**: Follows client state management patterns
- ✅ **UI Component Reuse**: Leverages shared Typography component

### Code Quality
- ✅ **Event Handling**: Robust click detection with menu exclusion logic
- ✅ **Error Handling**: Graceful fallbacks for missing data (shows '-')
- ✅ **Performance**: Uses `useCallback` for click handler optimization
- ✅ **Accessibility**: Maintains semantic HTML structure

### Integration Patterns
- ✅ **Prop Spreading**: Properly extends HTML attributes
- ✅ **Conditional Rendering**: Handles optional data elegantly
- ✅ **State Coordination**: Updates multiple related state values together
- ✅ **Component Composition**: Integrates child components without tight coupling