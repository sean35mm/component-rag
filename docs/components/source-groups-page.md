# SourceGroupsPage Component

## Purpose

The `SourceGroupsPage` component provides the main interface for managing custom source groups in the search customization settings. It allows users to view, create, and update groups of specific domains for targeted searches, serving as the primary page component within the search customization section.

## Component Type

**Server Component** - This is a server component as it doesn't require client-side interactivity at the top level. It serves as a layout component that orchestrates child components, some of which may be client components for handling user interactions like creating and updating source groups.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| None | - | - | This component accepts no props |

## Usage Example

```tsx
import { SourceGroupsPage } from '@/components/settings/search-customization/source-groups-page';

// Used within the search customization settings route
export default function SearchCustomizationPage() {
  return (
    <div className="settings-container">
      <SourceGroupsPage />
    </div>
  );
}

// Or as part of a tabbed interface
function SearchCustomizationTabs() {
  return (
    <Tabs defaultValue="source-groups">
      <TabsList>
        <TabsTrigger value="source-groups">Source Groups</TabsTrigger>
        <TabsTrigger value="other-settings">Other Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="source-groups">
        <SourceGroupsPage />
      </TabsContent>
    </Tabs>
  );
}
```

## Functionality

### Core Features
- **Page Layout**: Provides structured layout for source groups management interface
- **Instructional Content**: Displays descriptive text explaining the purpose of source groups
- **Component Orchestration**: Renders and coordinates multiple child components for complete functionality
- **Responsive Design**: Adapts layout spacing based on screen size (mobile vs desktop)

### User Interface Elements
- Explanatory typography with proper spacing and color scheme
- List view for existing source groups
- Drawer components for creating and updating source groups
- Flexible column layout that works across device sizes

## State Management

The component itself doesn't manage state directly, following the **composition pattern**:

- **No Local State**: Acts as a pure layout component
- **Child Component State**: State management is delegated to child components:
  - `SourceGroupsList` - Likely uses TanStack Query for fetching source groups data
  - `CreateSourceGroupDrawer` - Probably uses Zustand for drawer visibility state and React Hook Form for form data
  - `UpdateSourceGroupDrawer` - Similar state management pattern as create drawer

## Side Effects

This component has no direct side effects. Side effects are handled by child components:

- **Data Fetching**: Performed by `SourceGroupsList` component
- **API Mutations**: Handled by drawer components for create/update operations
- **UI State Changes**: Managed by individual drawer components

## Dependencies

### Internal Components
- `@/components/ui/typography` - For styled text display
- `./source-group-drawer` - Create and update drawer components
- `./source-groups-list` - List display component

### External Dependencies
- **React** - Core framework
- **Tailwind CSS** - For styling classes

### Architectural Dependencies
- Child components likely depend on:
  - TanStack Query for server state management
  - Zustand stores for UI state (drawer visibility)
  - React Hook Form + Zod for form handling

## Integration

### Application Architecture Role
```
Settings Page
├── Search Customization Section
    └── SourceGroupsPage (Current Component)
        ├── SourceGroupsList
        ├── CreateSourceGroupDrawer
        └── UpdateSourceGroupDrawer
```

### Route Integration
- Typically rendered within `/settings/search-customization` route
- May be part of a tabbed interface or accordion within settings
- Could be integrated into a multi-step settings wizard

### Data Flow
1. Page renders with static layout and instructions
2. `SourceGroupsList` fetches and displays existing source groups
3. User interactions trigger drawer components
4. Drawers handle create/update operations
5. List automatically refreshes via TanStack Query cache invalidation

## Best Practices

### Architectural Adherence
✅ **Composition Over Nesting**: Uses flat component structure with clear separation of concerns

✅ **Server Component Default**: Appropriately uses server component for layout without unnecessary client-side JavaScript

✅ **Component Decomposition**: Follows Lego block principle - each child component has a single responsibility

✅ **Domain Organization**: Properly located within settings/search-customization domain folder

### Performance Considerations
- **Minimal Bundle Size**: Server component reduces client-side JavaScript
- **Lazy Loading**: Drawer components only load their functionality when needed
- **Efficient Re-renders**: Stateless design prevents unnecessary re-renders

### Maintainability
- **Clear Separation**: Layout logic separated from business logic
- **Testable Structure**: Easy to test layout without complex state setup
- **Flexible Composition**: Easy to add/remove features by modifying child components

### Responsive Design
- Uses responsive Tailwind classes (`lg:m-6`)
- Maintains consistent spacing across breakpoints
- Follows mobile-first design principles