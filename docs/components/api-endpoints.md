# ApiEndpoints Component

## Purpose

The `ApiEndpoints` component provides a comprehensive interface for developers to explore and interact with available API endpoints. It displays a list of API features with their URLs, documentation links, and availability status based on the user's organization permissions. This component serves as a central hub for API discovery and access management in the developer portal.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive state for copying URLs and user interactions
- Uses React hooks (`useMemo`, `useCurrentOrganizationApiLimits`)
- Requires client-side event handling for user actions
- Dynamically renders content based on permissions state

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `Omit<BlockProps, 'icon' \| 'isLoading' \| 'skeletonSizes' \| 'title'>` | No | All Block component props except those controlled internally |

The component inherits most props from the `Block` component but excludes certain props that are managed internally:
- `icon`: Fixed to `PiNodeTree`
- `isLoading`: Managed based on permissions loading state
- `skeletonSizes`: Fixed to `'h-[404px]'`
- `title`: Fixed to `'API Endpoints'`

## Usage Example

```tsx
import { ApiEndpoints } from '@/components/developers/api-endpoints';

export default function DeveloperPortal() {
  return (
    <div className="grid gap-6">
      {/* Basic usage */}
      <ApiEndpoints />
      
      {/* With additional styling */}
      <ApiEndpoints className="border-2 border-gray-200" />
      
      {/* In a dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApiEndpoints />
        <OtherDeveloperComponent />
      </div>
    </div>
  );
}
```

## Functionality

### Core Features

1. **API Feature Display**: Shows available API endpoints including Vector Search, Articles, Stories, Companies, People, Sources, and Journalists
2. **Permission-Based Access**: Dynamically shows availability based on organization API limits and permissions
3. **Interactive URL Display**: Provides copyable API endpoint URLs with method indicators
4. **Documentation Links**: Direct links to API reference and documentation for each endpoint
5. **Status Indicators**: Visual badges showing whether features are available or require upgrade
6. **Loading States**: Skeleton loading while permissions are being fetched

### Key Behaviors

- Automatically fetches and displays user's API permissions
- Filters feature availability based on organization limits
- Provides interactive elements for copying API URLs
- Opens documentation links in new tabs
- Responsive design for various screen sizes

## State Management

### TanStack Query Integration
```tsx
const { data: permissions } = useCurrentOrganizationApiLimits({
  select: (it) => it.actualPermissions,
});
```

- **Server State**: Uses `useCurrentOrganizationApiLimits` hook to fetch organization API permissions
- **Data Selection**: Selects only `actualPermissions` from the API response to optimize re-renders
- **Loading Management**: Component shows loading skeleton while permissions are undefined

### Local State
- **Memoized Features**: Uses `useMemo` to compute feature list based on permissions, preventing unnecessary recalculations
- **Permission Checking**: Utility function `isApiFeatureAvailable` determines feature availability

## Side Effects

1. **API Calls**: Fetches current organization API limits and permissions on mount
2. **External Navigation**: Opens documentation and reference links in new browser tabs
3. **URL Copying**: Interacts with clipboard API through `ApiEndpointGetUrl` component
4. **Environment Variables**: Reads API and documentation URLs from environment configuration

## Dependencies

### Components
- `Block`: Base container component with loading states
- `QuickActionItem`: Individual feature row display
- `StatusBadge`: Permission status indicators
- `Button`: Action buttons for documentation links
- `ApiEndpointGetUrl`: URL display and copying functionality

### Hooks & Utilities
- `useCurrentOrganizationApiLimits`: TanStack Query hook for permissions
- `cn`: Utility for conditional class names
- `env`: Environment configuration access

### External Libraries
- `next/link`: Navigation to external documentation
- Various Phosphor icons for feature representation

## Integration

### Application Architecture
- **Developer Portal**: Central component in the developer experience flow
- **Permission System**: Integrates with organization-based access control
- **Documentation Ecosystem**: Bridges in-app experience with external docs
- **API Discovery**: Serves as the primary interface for API exploration

### Data Flow
1. Component mounts and triggers permissions query
2. TanStack Query fetches organization API limits
3. Permissions are processed to determine feature availability
4. Features list is memoized and rendered with appropriate status
5. User interactions trigger navigation or copying actions

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for interactivity
- ✅ **Component Decomposition**: Breaks down into `FeatureRow` and `FeatureIcon` subcomponents
- ✅ **TanStack Query Integration**: Properly uses server state management for permissions
- ✅ **Reusable UI Components**: Leverages existing UI components from `/ui/` directory

### Design Patterns
- ✅ **Permission-Based Rendering**: Implements proper feature flagging based on user permissions
- ✅ **Loading States**: Provides appropriate skeleton loading during data fetch
- ✅ **Separation of Concerns**: Utility functions for permission checking separate from render logic
- ✅ **Type Safety**: Proper TypeScript interfaces for all component props and data structures

### Performance Optimization
- ✅ **Memoization**: Uses `useMemo` for expensive feature list computation
- ✅ **Selective Data**: Only selects needed data from API response
- ✅ **Conditional Rendering**: Efficiently renders based on availability status

## Exported Utilities

```tsx
// Constants
export const API_URL: string;
export const DOCS_URL: string;

// Utility Functions
export const isApiFeatureAvailable: (
  feature: string,
  permissions?: PermissionInfo[] | null
) => boolean;

// Components
export const ApiEndpoints: FC<ApiEndpointsProps>;
export const FeatureRow: FC<FeatureRowProps>;
export const FeatureIcon: FC<HTMLAttributes<HTMLDivElement>>;
```

These exports enable reuse of permission checking logic and individual components in other parts of the developer portal.