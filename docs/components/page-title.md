# PageTitle Component

## Purpose

The `PageTitle` component serves as a dynamic page header that renders different title components based on the current route. It acts as a routing-aware dispatcher that displays appropriate page titles and actions for different sections of the application, including Signals, Trending Stories, Settings, Search, Shared Threads, Answers, Stories, Developers, and Account pages.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes Next.js `usePathname` hook for route detection
- Handles interactive callbacks like `onOpenOmnibar`
- Manages conditional rendering based on browser location

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActiveMobile` | `boolean` | Yes | Indicates if the mobile navigation is currently active, used to control mobile-specific UI behavior |
| `onOpenOmnibar` | `() => void` | Yes | Callback function to trigger the omnibar/search overlay, typically used for global search functionality |

## Usage Example

```tsx
import { PageTitle } from '@/components/main-layout/navigation/page-title/page-title';

function MainLayout() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const handleOpenOmnibar = () => {
    // Open global search/omnibar
    setSearchModalOpen(true);
  };

  return (
    <header className="main-header">
      <PageTitle
        isActiveMobile={isMobileNavActive}
        onOpenOmnibar={handleOpenOmnibar}
      />
    </header>
  );
}
```

## Functionality

### Route-Based Title Rendering
- **Dynamic Component Selection**: Analyzes current pathname to determine appropriate title component
- **Specialized Page Titles**: Renders specific title components for different application sections:
  - `StaticPageTitle` for Signals, Trending, Developers, Account pages
  - `SettingsPageTitle` for Settings pages
  - `SearchPageTitle` for Search results
  - `SharedThreadPageTitle` for shared member threads
  - `AnswersPageTitle` for answer pages
  - `StoryPageTitle` for story pages

### Fallback Behavior
- **Default State**: Shows Perigon logo and new search action when no specific route match is found
- **Branding**: Maintains consistent branding with `IconPerigonLogoFull` component

### Action Integration
- **Context-Aware Actions**: Passes through action handlers to child components
- **Mobile Responsiveness**: Considers mobile state for appropriate UI rendering

## State Management

**No Direct State Management** - This component is stateless and relies on:
- **Route State**: Uses Next.js `usePathname` for current location
- **Prop State**: Receives state through props from parent layout components
- **Delegation Pattern**: Passes state management responsibilities to child title components

## Side Effects

### Navigation Monitoring
- **Route Detection**: Continuously monitors pathname changes through `usePathname`
- **Component Switching**: Re-renders appropriate child components when routes change

### No Direct Side Effects
- Does not perform API calls or data fetching
- Delegates side effects to specialized child components

## Dependencies

### Next.js Integration
- `usePathname` from `next/navigation` for route detection
- Client-side navigation awareness

### Internal Components
- **Title Components**: `AnswersPageTitle`, `SearchPageTitle`, `SettingsPageTitle`, etc.
- **Action Components**: `NewSearchAction`, `TitleActionsContainer`
- **Icon Components**: `IconPerigonLogoFull`

### Utility Dependencies
- **Routing Constants**: `GENERIC_TABS_TO_HREF` for route matching
- **Type Definitions**: `TabEntity`, `TabOptions` for type safety

## Integration

### Layout Architecture
```
MainLayout
├── Navigation
│   ├── PageTitle (this component)
│   │   ├── StaticPageTitle
│   │   ├── SearchPageTitle
│   │   ├── SettingsPageTitle
│   │   └── [other specialized titles]
│   └── [other nav components]
└── [main content]
```

### Route Mapping
- **URL Pattern Matching**: Uses `includes()` and `startsWith()` for flexible route detection
- **Tab System Integration**: Integrates with application's tab-based navigation system
- **Entity-Specific Routing**: Supports entity-specific routes with dynamic IDs

## Best Practices

### ✅ Architectural Adherence
- **Component Decomposition**: Follows "flat over nested" principle by delegating to specialized components
- **Separation of Concerns**: Each page type has its own dedicated title component
- **Reusability**: Uses `StaticPageTitle` for multiple similar page types

### ✅ Performance Considerations
- **Conditional Rendering**: Only renders necessary components based on current route
- **Prop Drilling Minimization**: Passes consistent interface to all child components

### ✅ Maintainability
- **Centralized Routing Logic**: Single place to manage page title routing decisions
- **Type Safety**: Uses TypeScript interfaces and enums for route matching
- **Extensible Pattern**: Easy to add new page types by adding new conditions

### ✅ Mobile Responsiveness
- **Responsive Actions**: Considers mobile state for appropriate action visibility
- **Consistent Interface**: Maintains uniform props interface across all title components

### 🔧 Integration Pattern
```tsx
// Typical usage in main layout
<PageTitle
  isActiveMobile={mobileNavState}
  onOpenOmnibar={globalSearchHandler}
/>
```

This component exemplifies the router-component pattern, providing a clean interface between URL-based navigation and component rendering while maintaining consistency across different application sections.