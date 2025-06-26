# StaticPageTitle Component

## Purpose

The `StaticPageTitle` component renders a dynamic page title within the main layout navigation. It intelligently displays either a default title or dynamically resolves the title from active tabs based on URL parameters. The component also includes an integrated search action that adapts to mobile visibility states.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes Next.js navigation hooks (`useParams`)
- Manages interactive state through Zustand store (`useTabsStore`)
- Handles user interactions (click events)
- Performs dynamic rendering based on client-side state

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `defaultTitle` | `string` | Yes | Fallback title displayed when no dynamic title is resolved |
| `isActiveMobile` | `boolean` | Yes | Controls visibility of search action on mobile devices |
| `tabSelector` | `{ type: TabEntity; entityIdKey: string }` | No | Configuration for dynamic title resolution from tabs |
| `onOpenOmnibar` | `() => void` | Yes | Callback function triggered when search action is clicked |

## Usage Example

```tsx
import { StaticPageTitle } from '@/components/main-layout/navigation/page-title/static-page-title';

// Basic usage with static title
<StaticPageTitle
  defaultTitle="Dashboard"
  isActiveMobile={false}
  onOpenOmnibar={() => setOmnibarOpen(true)}
/>

// Advanced usage with dynamic tab-based title resolution
<StaticPageTitle
  defaultTitle="Project Overview"
  isActiveMobile={isMobileMenuActive}
  tabSelector={{
    type: 'project',
    entityIdKey: 'projectId'
  }}
  onOpenOmnibar={handleOmnibarOpen}
/>
```

## Functionality

### Dynamic Title Resolution
- **Static Mode**: Displays the `defaultTitle` when no tab selector is configured
- **Dynamic Mode**: Resolves title from active tabs based on URL parameters
- **Fallback Logic**: Returns to default title when no matching tab is found

### Responsive Search Integration
- Conditionally renders search action based on mobile state
- Integrates with omnibar functionality for global search
- Maintains consistent spacing and layout across different screen sizes

### Layout Adaptation
- Implements text truncation with `line-clamp-1` for overflow handling
- Responsive width constraints with `max-w-[calc(100%-3rem)]`
- Centered text alignment for visual balance

## State Management

### Zustand Integration
- **Store**: `useTabsStore()` - Accesses global tabs state
- **Usage**: Reads tabs array to match against URL parameters
- **Pattern**: Read-only consumption of centralized tab management state

### Local State
- **Memoization**: Uses `useMemo` for performance optimization of title resolution
- **Dependencies**: Recalculates when `defaultTitle`, `params`, `tabSelector`, or `tabs` change

## Side Effects

### Navigation Tracking
- Monitors URL parameter changes through `useParams()`
- Automatically updates title when route parameters change
- No direct side effects - purely reactive to navigation state

## Dependencies

### Internal Components
- `Typography` - UI component for consistent text rendering
- `NewSearchAction` - Search trigger component
- `TitleActionsContainer` - Layout wrapper for action buttons

### Hooks & Context
- `useParams` - Next.js navigation hook for URL parameters
- `useTabsStore` - Zustand store for tab state management

### Types
- `TabEntity` - Type definition for tab categorization
- `StaticPageTitleProps` - Component props interface

## Integration

### Main Layout Architecture
```
MainLayout
├── Navigation
│   ├── PageTitle
│   │   ├── StaticPageTitle ← This Component
│   │   └── DynamicPageTitle
│   └── Actions
└── Content
```

### Data Flow
1. **URL Changes** → `useParams()` updates
2. **Tab State** → `useTabsStore()` provides current tabs
3. **Title Resolution** → Component matches URL params to tab metadata
4. **Rendering** → Displays resolved or default title

## Best Practices

### Architectural Adherence
- ✅ **Client Component Justification**: Appropriate use of client-side features
- ✅ **Component Decomposition**: Flat structure with clear separation of concerns
- ✅ **State Management**: Proper Zustand integration for global state
- ✅ **Performance**: Memoization prevents unnecessary recalculations

### Implementation Patterns
- **Props Destructuring**: Clean parameter extraction
- **Conditional Rendering**: Efficient search action visibility control
- **Type Safety**: Comprehensive TypeScript interface definitions
- **Responsive Design**: Mobile-first approach with adaptive features

### Usage Guidelines
- Use for static or semi-dynamic page titles in main navigation
- Configure `tabSelector` only when dynamic title resolution is needed
- Ensure `entityIdKey` matches the actual URL parameter name
- Handle `onOpenOmnibar` callback to integrate with global search functionality