# SettingsPageTitle Component

## Purpose

The `SettingsPageTitle` component renders the header section for settings pages, displaying a centered page title with optional search functionality. It provides a consistent header layout specifically designed for settings screens within the main navigation structure.

## Component Type

**Client Component** - Uses the `'use client'` directive because it handles interactive elements like click events for the omnibar functionality and manages responsive behavior based on mobile state.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `defaultTitle` | `string` | ✅ | The title text to display in the header |
| `isActiveMobile` | `boolean` | ✅ | Controls visibility of search action based on mobile state |
| `onOpenOmnibar` | `() => void` | ✅ | Callback function triggered when search action is clicked |

## Usage Example

```tsx
import { SettingsPageTitle } from '@/components/main-layout/navigation/page-title/settings-page-title';

export default function UserSettingsPage() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const handleOpenOmnibar = () => {
    // Open search/command palette
    setOmnibarOpen(true);
  };

  return (
    <div className="settings-layout">
      <SettingsPageTitle
        defaultTitle="User Settings"
        isActiveMobile={isMobileMenuActive}
        onOpenOmnibar={handleOpenOmnibar}
      />
      
      {/* Settings content */}
      <div className="settings-content">
        {/* Settings form components */}
      </div>
    </div>
  );
}
```

## Functionality

- **Centered Title Display**: Renders the page title with line clamping and responsive width constraints
- **Responsive Search Action**: Shows/hides search functionality based on mobile state
- **Flexible Layout**: Uses flexbox for proper alignment and spacing of title and actions
- **Typography Integration**: Leverages the design system's Typography component for consistent styling

## State Management

**Props-based State** - This component is stateless and relies entirely on props passed from parent components. It doesn't manage any internal state or use external state management solutions like Zustand or TanStack Query.

## Side Effects

**Event Handling** - The component triggers the `onOpenOmnibar` callback when the search action is clicked, but doesn't perform any direct side effects or API calls itself.

## Dependencies

### Internal Components
- `@/components/ui/typography` - For consistent text styling
- `./page-title-action` - Provides the `NewSearchAction` component
- `./title-actions-container` - Container component for action buttons

### External Dependencies
- `react` - Core React functionality

## Integration

The `SettingsPageTitle` component fits into the application architecture as:

- **Navigation Layer**: Part of the main layout navigation system
- **Page Header Component**: Specifically designed for settings pages within the page title structure
- **Responsive Design**: Integrates with mobile navigation states
- **Search Integration**: Connects to the application's omnibar/search functionality

```
Main Layout
└── Navigation
    └── Page Title
        └── SettingsPageTitle ← This component
            ├── Typography (title display)
            └── TitleActionsContainer
                └── NewSearchAction
```

## Best Practices

✅ **Component Decomposition**: Follows flat architecture by composing smaller, focused components (`NewSearchAction`, `TitleActionsContainer`)

✅ **Client Component Usage**: Appropriately uses `'use client'` directive only when needed for interactivity

✅ **Props Interface**: Well-defined TypeScript interface with clear prop types and purposes

✅ **Responsive Design**: Handles mobile states through props rather than internal responsive logic

✅ **Separation of Concerns**: Delegates specific functionality to specialized child components

✅ **Design System Integration**: Uses the shared Typography component for consistent styling

✅ **Event Delegation**: Passes callback functions up to parent components rather than handling complex logic internally

The component adheres to the architectural guidelines by being a focused, reusable piece that composes well with other components and maintains clear boundaries of responsibility.