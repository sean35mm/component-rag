# TabButton Component

## Purpose

`TabButton` is a reusable UI component that renders interactive tab navigation buttons within the tabs manager system. It provides consistent styling and behavior for tab switching functionality, supporting both active and inactive states with smooth transitions and hover effects.

## Component Type

**Client Component** - This component uses interactive event handlers (`onClick`) and requires client-side interactivity for user engagement. The `forwardRef` pattern and event handling necessitate client-side rendering.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | ✅ | Content to be rendered inside the tab button (typically tab label or icon) |
| `isActive` | `boolean` | ✅ | Determines if the tab is currently active, affecting visual styling |
| `asChild` | `boolean` | ❌ | When true, renders as a Radix Slot instead of a button element |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | ❌ | Click event handler for tab selection |
| `className` | `string` | ❌ | Additional CSS classes to customize styling |

## Usage Example

```tsx
import { TabButton } from '@/components/main-layout/tabs-manager/tab-button';

function TabsManager() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex">
      <TabButton
        isActive={activeTab === 'dashboard'}
        onClick={() => setActiveTab('dashboard')}
      >
        Dashboard
      </TabButton>
      
      <TabButton
        isActive={activeTab === 'settings'}
        onClick={() => setActiveTab('settings')}
      >
        Settings
      </TabButton>
      
      {/* Using asChild with custom component */}
      <TabButton
        asChild
        isActive={activeTab === 'profile'}
        onClick={() => setActiveTab('profile')}
      >
        <Link href="/profile">
          Profile
        </Link>
      </TabButton>
    </div>
  );
}
```

## Functionality

- **Visual State Management**: Automatically applies different styling based on `isActive` prop
- **Interactive Feedback**: Provides hover effects and opacity transitions for better UX
- **Flexible Rendering**: Supports both button and custom component rendering via `asChild` prop
- **Accessible**: Uses semantic button element by default for proper accessibility
- **Customizable**: Accepts additional className for style overrides
- **Ref Forwarding**: Supports ref forwarding for parent component integration

## State Management

**Props-based State** - This component is stateless and relies on props for its behavior:
- `isActive` prop controls visual state
- `onClick` handler delegates state changes to parent components
- No internal state management required

## Side Effects

**None** - This is a pure presentational component with no side effects:
- No API calls or data fetching
- No localStorage or external storage interactions
- Only handles user interaction events through provided callbacks

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility for conditional class name merging
- Tailwind CSS classes for styling

### External Dependencies
- `@radix-ui/react-slot` - Enables flexible component composition via `asChild` pattern
- React's `forwardRef` and type definitions

## Integration

### Application Architecture Role
- **UI Layer**: Pure UI component in the presentation layer
- **Tabs Manager System**: Core building block for tab navigation functionality
- **Main Layout**: Part of the main application layout structure

### Usage Patterns
```tsx
// Typical integration in tabs manager
<div className="tab-container">
  {tabs.map(tab => (
    <TabButton
      key={tab.id}
      isActive={currentTab === tab.id}
      onClick={() => handleTabChange(tab.id)}
    >
      {tab.label}
    </TabButton>
  ))}
</div>
```

## Best Practices

### ✅ Architectural Compliance
- **Flat Component Structure**: Simple, focused component without unnecessary nesting
- **Lego Block Pattern**: Easily composable with other tab-related components
- **UI Component Placement**: Correctly located in domain-specific directory structure
- **Prop-based Configuration**: Externalized behavior control through props

### ✅ Implementation Patterns
- **Ref Forwarding**: Proper use of `forwardRef` for parent component integration
- **Conditional Rendering**: Clean `asChild` pattern for flexible component composition
- **Type Safety**: Comprehensive TypeScript interfaces with proper prop validation
- **Accessibility**: Semantic HTML button element usage by default

### ✅ Styling Approach
- **Design System Integration**: Uses consistent color tokens (`pgBackground`, `pgStroke`, etc.)
- **Responsive Design**: Flexible padding and sizing for different screen sizes
- **Transition Effects**: Smooth visual feedback for better user experience