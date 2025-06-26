# RegisterTab Component Documentation

## Purpose
The `RegisterTab` component is a utility component that automatically manages tab registration and updates in the application's tab system. It monitors for tab creation/update conditions and ensures that tabs are properly synchronized with their corresponding entities. This component acts as a side-effect manager rather than a UI component.

## Component Type
**Client Component** - Uses the `'use client'` directive because it:
- Manages client-side state through Zustand (`useTabsStore`)
- Uses `useEffect` for side effect management
- Interacts with TanStack Query mutation state
- Requires browser-side lifecycle management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `TabEntity` | ✅ | The type/category of the tab entity |
| `entityId` | `string` | ✅ | Unique identifier for the entity this tab represents |
| `name` | `string` | ✅ | Display name for the tab |
| `previewUrl` | `string` | ❌ | Optional URL for tab preview functionality |
| `slug` | `string` | ❌ | Optional URL slug for the tab |

## Usage Example

```tsx
import { RegisterTab } from '@/components/main-layout/register-tab';

// Register a project tab
function ProjectPage({ projectId, projectName }: ProjectPageProps) {
  return (
    <div>
      <RegisterTab
        type="project"
        entityId={projectId}
        name={projectName}
        previewUrl={`/projects/${projectId}/preview`}
        slug={`project-${projectId}`}
      />
      
      {/* Rest of your project page content */}
      <ProjectContent projectId={projectId} />
    </div>
  );
}

// Register a document tab
function DocumentViewer({ documentId, title }: DocumentViewerProps) {
  return (
    <>
      <RegisterTab
        type="document"
        entityId={documentId}
        name={title}
        previewUrl={`/docs/${documentId}/preview`}
      />
      
      <DocumentContent documentId={documentId} />
    </>
  );
}
```

## Functionality

### Core Features
- **Automatic Tab Registration**: Creates new tabs when entities are accessed for the first time
- **Tab Synchronization**: Updates existing tabs when entity names or metadata change
- **Duplicate Prevention**: Uses ref-based tracking to prevent multiple creation attempts
- **Conditional Execution**: Respects authentication, loading states, and ongoing mutations

### Behavior Logic
1. **Initial Check**: Verifies user authorization and system readiness
2. **Tab Discovery**: Searches for existing tabs matching the entity ID
3. **Creation Path**: Creates a new tab if none exists
4. **Update Path**: Updates existing tab if name differs
5. **Prevention**: Blocks execution during loading states or active mutations

## State Management

### TanStack Query
- **Mutation Monitoring**: Uses `useIsMutating` to track tab creation state
- **Query Keys**: Leverages standardized query keys for tab operations

### Zustand Store (`useTabsStore`)
- **Tab Collection**: Accesses current tabs array
- **Loading States**: Monitors `isPendingTabs` and `isFetchingTabs`
- **Actions**: Utilizes `onTabCreate` and `onTabUpdate` for tab management

### Local State
- **Creation Tracking**: Uses `useRef` to prevent duplicate creation attempts

## Side Effects

### Primary Effects
- **Tab Creation**: Automatically creates tabs for new entities
- **Tab Updates**: Synchronizes tab names with entity changes
- **State Synchronization**: Keeps tab system in sync with entity state

### Triggers
- Component mount with valid conditions
- Entity name changes
- Authentication state changes
- Tab loading state changes

## Dependencies

### Contexts & Stores
- `useAccessToken` - Authentication and authorization state
- `useTabsStore` - Tab management and state

### Query System
- `@tanstack/react-query` - Mutation state monitoring
- `queryKeys.tabs` - Standardized query key patterns
- `TabMutationKey.CREATE` - Specific mutation identifiers

### Types
- `TabEntity` - Entity type definitions
- `RegisterTabProps` - Component prop interface

## Integration

### Application Architecture
- **Tab System**: Core component of the application's tab management system
- **Entity Tracking**: Bridges entity pages with the global tab state
- **Navigation**: Supports tab-based navigation patterns

### Usage Patterns
- **Page Components**: Include in entity detail pages (projects, documents, etc.)
- **Route Components**: Integrate with route-level components for automatic registration
- **Layout Integration**: Works within the main layout's tab management system

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Properly uses client directive for state management needs  
✅ **State Management**: Follows TanStack Query + Zustand pattern correctly  
✅ **Side Effect Management**: Uses `useEffect` appropriately for tab synchronization  
✅ **Component Decomposition**: Single responsibility for tab registration logic  

### Implementation Patterns
- **Conditional Logic**: Comprehensive guards prevent unnecessary operations
- **Ref Usage**: Proper use of `useRef` for preventing duplicate side effects
- **Dependency Array**: Complete and accurate dependency management in `useEffect`
- **Memoization**: Uses `useMemo` for derived state optimization

### Integration Guidelines
- Place `RegisterTab` early in component tree for entity pages
- Ensure `entityId` uniqueness across different entity types
- Provide meaningful `name` props that reflect current entity state
- Include `previewUrl` when preview functionality is available