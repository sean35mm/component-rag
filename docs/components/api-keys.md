# API Keys Component

## Purpose

The `ApiKeys` component provides a comprehensive interface for managing API keys in a developer portal. It displays API keys in a responsive table format, allows users to create, edit, and delete API keys, and includes helpful documentation links. The component adapts between desktop table view and mobile card view based on screen size.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state through Zustand store
- Handles user interactions (clicks, form submissions)
- Uses client-side hooks for responsive behavior
- Requires real-time updates for CRUD operations

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the root container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the root element |

## Usage Example

```tsx
import { ApiKeys } from '@/components/developers/api-keys/api-keys';

// Basic usage
export default function DeveloperDashboard() {
  return (
    <div className="container mx-auto p-6">
      <ApiKeys />
    </div>
  );
}

// With custom styling
export default function CustomApiKeysPage() {
  return (
    <ApiKeys 
      className="bg-gray-50 rounded-lg p-4" 
      data-testid="api-keys-section"
    />
  );
}
```

## Functionality

### Core Features
- **Responsive Design**: Automatically switches between desktop table and mobile card layouts
- **CRUD Operations**: Complete create, read, update, delete functionality for API keys
- **Sorting & Filtering**: Sortable columns with default sorting by creation date
- **Token Preview**: Displays masked API key tokens for security
- **Usage Tracking**: Shows last used dates with relative time formatting
- **Contextual Actions**: Edit and delete actions with tooltips
- **Documentation Integration**: Direct links to authentication documentation

### Data Display
- **Name**: API key identifier
- **Token**: Masked preview of the actual key
- **Last Used**: Formatted date with relative time
- **Created On**: Creation timestamp with relative formatting
- **Actions**: Edit and delete buttons with tooltip guidance

### Responsive Behavior
- **Desktop (lg+)**: Full table view with all columns
- **Mobile**: Card-based layout via `ApiKeyCardList`
- **Loading States**: Dedicated fallback components for each breakpoint

## State Management

### Zustand Store (`useApiKeysStore`)
```typescript
// State management for dialogs and selected items
const setIsOpenCreate = useApiKeysStore((state) => state.setIsOpenCreate);
const setIsOpenEdit = useApiKeysStore((state) => state.setIsOpenEdit);
const setApiKeyToEdit = useApiKeysStore((state) => state.setApiKeyToEdit);
const setIsDeleteDialogOpen = useApiKeysStore((state) => state.setIsDeleteDialogOpen);
```

### TanStack Query (`usePaginatedOrganizationApiKeys`)
```typescript
const {
  data: apiKeys,
  isLoading,
  isError,
} = usePaginatedOrganizationApiKeys({
  size: 100,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  enabled: true,
});
```

## Side Effects

### API Interactions
- **Data Fetching**: Automatically fetches paginated API keys on mount
- **Real-time Updates**: Responds to CRUD operations through query invalidation
- **Error Handling**: Graceful fallback for failed API requests

### User Interface Effects
- **Responsive Breakpoint Detection**: Monitors screen size changes
- **Dialog State Management**: Controls visibility of create/edit/delete modals
- **Loading States**: Shows appropriate fallbacks during data fetching

## Dependencies

### Internal Components
- `CrudTable` - Base table component with CRUD functionality
- `ApiKeyCardList` - Mobile card view renderer
- `CreateApiKeyDialog` - Modal for creating new keys
- `EditApiKeyDialog` - Modal for editing existing keys
- `DeleteApiKeyDialog` - Confirmation modal for deletion
- `ApiKeysDesktopFallback` / `ApiKeysMobileFallback` - Loading states

### Hooks & Utilities
- `useBreakpoint` - Responsive design detection
- `useApiKeysStore` - State management
- `usePaginatedOrganizationApiKeys` - Data fetching
- `formatDateWithRelativeDay` - Date formatting utility

### External Libraries
- `@tanstack/react-table` - Table functionality
- `date-fns` - Date parsing and manipulation
- `next/link` - Navigation to documentation

## Integration

### Developer Portal Flow
```
DeveloperDashboard
├── ApiKeys (this component)
│   ├── CrudTable
│   │   └── ActionButtons
│   ├── CreateApiKeyDialog
│   ├── EditApiKeyDialog
│   └── DeleteApiKeyDialog
```

### Data Architecture
- **Organization Scoped**: Keys are fetched per organization context
- **Pagination Ready**: Supports large datasets with configurable page sizes
- **Real-time Sync**: Integrates with global state for immediate UI updates

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Uses `'use client'` only for interactive features
✅ **Flat Component Structure**: Minimal nesting, clear separation of concerns
✅ **State Management Pattern**: TanStack Query for server state, Zustand for UI state
✅ **Reusable UI Components**: Leverages shared components from `/ui/`

### Performance Optimizations
- **Memoized Callbacks**: Uses `useCallback` for event handlers
- **Conditional Rendering**: Efficient breakpoint-based component switching
- **Optimistic Updates**: Zustand store enables immediate UI feedback

### User Experience
- **Progressive Enhancement**: Works on all screen sizes
- **Clear Visual Hierarchy**: Consistent typography and spacing
- **Helpful Tooltips**: Contextual guidance for actions
- **External Documentation**: Easy access to authentication guides

### Security Considerations
- **Token Masking**: Never displays full API keys in the interface
- **Confirmation Dialogs**: Prevents accidental deletions
- **Secure Documentation Links**: Uses environment-based URLs