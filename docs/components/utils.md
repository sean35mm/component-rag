# Tabs Manager Utils

## Purpose

The `utils.tsx` file provides constants, configurations, and mappings for the tabs manager system. It centralizes tab-related data including pre-opened tab configurations, icon mappings, and display name mappings for both authenticated and unauthenticated users. This utility module enables consistent tab behavior and appearance across the application.

## Component Type

**Utility Module** - This is not a React component but a collection of constants and configuration objects that support the tabs manager functionality.

## Exports Interface

| Export | Type | Description |
|--------|------|-------------|
| `TAB_CONTAINER_ID` | `string` | DOM ID for the tab container element |
| `PRE_OPENED_GENERIC_TABS` | `PreOpenedGenericTabType[]` | Array of tabs that should be opened by default |
| `PRE_OPENED_GENERIC_TABS_ICONS` | `Record<PreOpenedGenericTabType, ReactNode>` | Icon mappings for pre-opened generic tabs |
| `GENERIC_TAB_TO_NAME` | `Record<TabOptionType, string>` | Display names for tabs (authenticated users) |
| `GENERIC_TAB_TO_NAME_UNAUTH` | `Record<TabOptionType, string>` | Display names for tabs (unauthenticated users) |
| `TABS_ICONS` | `Partial<Record<TabEntityType, ReactNode>>` | Icon mappings for tab entities |
| `GENERIC_TABS_ICONS` | `Partial<Record<TabOptionType, ReactNode>>` | Icon mappings for generic tab options |

## Usage Example

```tsx
import {
  TAB_CONTAINER_ID,
  PRE_OPENED_GENERIC_TABS,
  GENERIC_TAB_TO_NAME,
  TABS_ICONS,
} from '@/components/main-layout/tabs-manager/utils';

// Using the tab container ID
const TabContainer = () => (
  <div id={TAB_CONTAINER_ID}>
    {/* Tab content */}
  </div>
);

// Getting display name for a tab
const getTabName = (tabType: TabOptionType, isAuthenticated: boolean) => {
  return isAuthenticated 
    ? GENERIC_TAB_TO_NAME[tabType]
    : GENERIC_TAB_TO_NAME_UNAUTH[tabType];
};

// Rendering tab icon
const TabIcon = ({ tabType }: { tabType: TabEntityType }) => (
  <div className="tab-icon">
    {TABS_ICONS[tabType]}
  </div>
);

// Initializing with pre-opened tabs
const initializeTabs = () => {
  PRE_OPENED_GENERIC_TABS.forEach(tabType => {
    // Open each pre-configured tab
    openTab(tabType);
  });
};
```

## Functionality

### Core Features

1. **Tab Container Reference**: Provides a consistent DOM ID for the tab container
2. **Pre-opened Tab Configuration**: Defines which tabs should be opened by default
3. **Icon Management**: Centralizes icon mappings for different tab types
4. **Display Name Management**: Provides user-friendly names for tabs
5. **Authentication-aware Naming**: Different tab names for authenticated vs unauthenticated users

### Key Configurations

- **Default Tabs**: Currently only HOME tab is pre-opened (notifications commented out)
- **Icon Consistency**: Uses consistent sizing (`size-4`, `size-full`) across tab icons
- **User Context**: Separates tab naming for different user authentication states

## State Management

**N/A** - This is a utility module that provides static configuration. It doesn't manage state directly but provides the data structures that state management systems use.

## Side Effects

**None** - This module only exports constants and configuration objects with no side effects.

## Dependencies

### Internal Dependencies
- `@/components/icons` - Various icon components for tab visualization
- `@/lib/types` - Type definitions for tabs and related entities

### External Dependencies
- `React` - For ReactNode type definitions

## Integration

### Application Architecture Role

1. **Configuration Layer**: Serves as the configuration layer for the tabs manager system
2. **Icon Centralization**: Centralizes all tab-related icons in one location
3. **Naming Strategy**: Implements naming strategy that adapts to user authentication state
4. **Default Behavior**: Defines default tab opening behavior for new sessions

### Usage Patterns

```tsx
// In tab manager components
import { GENERIC_TAB_TO_NAME, TABS_ICONS } from './utils';

const TabComponent = ({ tabType, isAuthenticated }) => (
  <div>
    {TABS_ICONS[tabType]}
    <span>{isAuthenticated ? GENERIC_TAB_TO_NAME[tabType] : GENERIC_TAB_TO_NAME_UNAUTH[tabType]}</span>
  </div>
);

// In initialization logic
import { PRE_OPENED_GENERIC_TABS } from './utils';

const initializeDefaultTabs = () => {
  return PRE_OPENED_GENERIC_TABS.map(createTab);
};
```

## Best Practices

### Architecture Adherence

1. **Separation of Concerns**: ✅ Separates configuration from component logic
2. **Type Safety**: ✅ Uses proper TypeScript types for all exports
3. **Centralization**: ✅ Centralizes tab-related constants in one location
4. **Modularity**: ✅ Exports individual pieces for selective importing

### Configuration Management

1. **Immutable Data**: All exports are read-only configuration objects
2. **Type-safe Mappings**: Uses Record types for type-safe object mappings
3. **Icon Consistency**: Maintains consistent icon sizing and styling
4. **Extensibility**: Easy to add new tab types and their corresponding configurations

### Development Guidelines

1. **Import Selectively**: Import only the constants you need
2. **Type Checking**: Leverage TypeScript for compile-time validation
3. **Icon Updates**: Update icon mappings here when adding new tab types
4. **Authentication Context**: Consider user authentication state when using name mappings

This utility module follows the principle of centralized configuration management, making it easy to maintain and update tab-related behavior across the entire application.