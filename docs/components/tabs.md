# Tabs Component

## Purpose

The Tabs component provides a flexible, accessible tabbed interface built on Radix UI primitives. It allows users to navigate between different content panels while maintaining a consistent visual hierarchy. The component supports two distinct visual styles: a pill-style default variant and a more traditional inline variant with bottom borders.

## Props Interface

### Tabs (Root)
Inherits all props from `@radix-ui/react-tabs` Root component.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `defaultValue` | `string` | No | The value of the tab that should be active when initially rendered |
| `value` | `string` | No | The controlled value of the tab to activate |
| `onValueChange` | `(value: string) => void` | No | Event handler called when the value changes |
| `orientation` | `"horizontal" \| "vertical"` | No | The orientation of the component |
| `dir` | `"ltr" \| "rtl"` | No | The reading direction |
| `activationMode` | `"automatic" \| "manual"` | No | How the tab activation should be handled |

### TabsList
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `"default" \| "inline"` | No | Visual style variant (default: "default") |
| `className` | `string` | No | Additional CSS classes |

### TabsTrigger
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | A unique value that associates the trigger with a content |
| `variant` | `"default" \| "inline"` | No | Visual style variant (default: "default") |
| `size` | `"default"` | No | Size variant (default: "default") |
| `disabled` | `boolean` | No | When true, prevents the user from interacting with the tab |
| `className` | `string` | No | Additional CSS classes |

### TabsContent
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | Yes | A unique value that associates the content with a trigger |
| `forceMount` | `boolean` | No | Used to force mounting when more control is needed |
| `className` | `string` | No | Additional CSS classes |

## Usage Example

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Default pill-style tabs
function DefaultTabsExample() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="default">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-4">
        <div className="bg-pgBackground-50 p-4 rounded-lg">
          <h3 className="typography-titleH3 text-pgText-950 mb-2">Overview</h3>
          <p className="typography-paragraphMedium text-pgText-700">
            Dashboard overview content goes here.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-4">
        <div className="bg-pgBackground-50 p-4 rounded-lg">
          <h3 className="typography-titleH3 text-pgText-950 mb-2">Analytics</h3>
          <p className="typography-paragraphMedium text-pgText-700">
            Analytics dashboard content.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="reports" className="mt-4">
        <div className="bg-pgBackground-50 p-4 rounded-lg">
          <h3 className="typography-titleH3 text-pgText-950 mb-2">Reports</h3>
          <p className="typography-paragraphMedium text-pgText-700">
            Reports and data visualization.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

// Inline border-style tabs
function InlineTabsExample() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList variant="inline">
        <TabsTrigger variant="inline" value="profile">Profile</TabsTrigger>
        <TabsTrigger variant="inline" value="settings">Settings</TabsTrigger>
        <TabsTrigger variant="inline" value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="mt-6">
        <div className="space-y-4">
          <h2 className="typography-titleH2 text-pgText-950">Profile Settings</h2>
          <p className="typography-paragraphLarge text-pgText-700">
            Manage your profile information and preferences.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <div className="space-y-4">
          <h2 className="typography-titleH2 text-pgText-950">Account Settings</h2>
          <p className="typography-paragraphLarge text-pgText-700">
            Configure your account settings and security options.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications" className="mt-6">
        <div className="space-y-4">
          <h2 className="typography-titleH2 text-pgText-950">Notifications</h2>
          <p className="typography-paragraphLarge text-pgText-700">
            Customize your notification preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

// Controlled tabs with state management
function ControlledTabsExample() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList variant="default" className="grid grid-cols-3">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <div className="bg-pgStateInformation-light/20 border border-pgStateInformation-base/30 rounded-lg p-4">
          <p className="typography-paragraphMedium text-pgStateInformation-dark">
            Dashboard content with information styling
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="users">
        <div className="bg-pgStateSuccess-light/20 border border-pgStateSuccess-base/30 rounded-lg p-4">
          <p className="typography-paragraphMedium text-pgStateSuccess-dark">
            Users management interface
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="bg-pgStateWarning-light/20 border border-pgStateWarning-base/30 rounded-lg p-4">
          <p className="typography-paragraphMedium text-pgStateWarning-dark">
            Settings configuration panel
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

## Design System Usage

### Typography Classes
- **TabsTrigger (default)**: Uses `.typography-labelSmall` for compact, clear labeling
- **TabsTrigger (inline)**: Uses base font styling with medium weight for prominent navigation

### Color Tokens Used
- **Background Colors**:
  - `bg-alphaNeutral/10` - Semi-transparent background for tab list
  - `bg-white` - Active tab background in default variant
  - `bg-pgBackground-100` - Hover state for inline variant
  
- **Text Colors**:
  - `text-pgText-700` - Default tab text color
  - `text-pgText-950` - Hover state text
  - `text-pgStatic-950` - Active tab text (default variant)
  - `text-pgTextBlueDark` - Active tab text (inline variant)

- **Border Colors**:
  - `border-pgStroke-200` - General border styling
  - `border-pgTextBlueDark` - Active tab bottom border (inline variant)

- **State Colors**:
  - `hover:bg-alphaNeutral/16` - Hover background effect
  - `shadow-toggleSwitch` - Active tab shadow effect

### Spacing and Layout
- **Default variant**: `h-9` list height, `h-7` trigger height, `gap-1` between tabs
- **Inline variant**: `gap-6` between tabs, `px-4` list padding, `py-3` trigger padding
- **Content**: `mt-2` default top margin

## Styling

### Available Variants

#### TabsList Variants
- **`default`**: Pill-style container with rounded background and gap spacing
- **`inline`**: Horizontal layout with bottom border separator

#### TabsTrigger Variants
- **`default`**: Rounded pill-style buttons with background changes on active state
- **`inline`**: Border-bottom style with underline activation indicator

### States
- **Default**: Neutral text color with subtle background
- **Hover**: Increased background opacity and darker text
- **Active**: 
  - Default: White background with shadow and dark text
  - Inline: Blue bottom border and blue text color
- **Disabled**: Reduced opacity and disabled pointer events
- **Focus**: Ring outline for keyboard navigation

### Customization Options

```tsx
// Custom styling with design system tokens
<TabsList 
  variant="default" 
  className="bg-pgBackground-100 border border-pgStroke-300"
>
  <TabsTrigger 
    variant="default"
    className="data-[state=active]:bg-pgBlue-500 data-[state=active]:text-white"
    value="custom"
  >
    Custom Tab
  </TabsTrigger>
</TabsList>

// Brand color variants
<TabsTrigger 
  className="data-[state=active]:bg-pgGreen-500 data-[state=active]:text-white hover:bg-pgGreen-100"
  value="success"
>
  Success Tab
</TabsTrigger>
```

## Responsive Design

The component adapts across breakpoints using Tailwind's responsive utilities:

```tsx
// Responsive tab layout
<TabsList className="flex-col sm:flex-row gap-2 sm:gap-1">
  <TabsTrigger className="w-full sm:w-auto">Mobile Full Width</TabsTrigger>
  <TabsTrigger className="w-full sm:w-auto">Desktop Auto</TabsTrigger>
</TabsList>

// Responsive content spacing
<TabsContent className="mt-4 md:mt-6 lg:mt-8">
  <div className="px-4 md:px-6 lg:px-8">
    Responsive content with adaptive padding
  </div>
</TabsContent>

// Grid-based responsive tabs
<TabsList className="grid grid-cols-2 md:grid-cols-4 lg:inline-flex">
  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  <TabsTrigger value="tab4">Tab 4</TabsTrigger>
</TabsList>
```

## Accessibility

### Built-in Accessibility Features
- **ARIA Attributes**: Automatically handles `role="tablist"`, `role="tab"`, and `role="tabpanel"`
- **Keyboard Navigation**: 
  - Arrow keys navigate between tabs
  - Space/Enter activates tabs
  - Tab key moves focus to content
- **Focus Management**: Proper focus indication with `focus-visible:ring-2`
- **Screen Reader Support**: Proper labeling and state announcement

### Best Practices
```tsx
// Provide meaningful labels
<TabsTrigger value="profile" aria-label="User profile settings">
  Profile
</TabsTrigger>

// Use descriptive content for screen readers
<TabsContent value="analytics" aria-label="Analytics dashboard content">
  <div role="region" aria-labelledby="analytics-heading">
    <h2 id="analytics-heading" className="typography-titleH2">
      Analytics Overview
    </h2>
    {/* Content */}
  </div>
</TabsContent>

// Handle disabled states appropriately
<TabsTrigger 
  value="premium" 
  disabled 
  aria-label="Premium features (requires upgrade)"
>
  Premium
</TabsTrigger>
```

### Manual Activation Mode
```tsx
// Use manual activation for complex content
<Tabs activationMode="manual" defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="detailed">Detailed Report</TabsTrigger>
  </TabsList>
  {/* Users must press Enter/Space to activate tabs */}
</Tabs>
```

## Dependencies

### Internal Dependencies
- **`@/lib/utils/cn`**: Utility function for conditional class name merging
- **Design System**: Relies on typography classes and color tokens from `globals.css`

### External Dependencies
- **`@radix-ui/react-tabs`**: Core tab functionality and accessibility
- **`class-variance-authority`**: Variant management for styling
- **`React`**: Component framework with forwardRef support

### Related Components
- Works well with **Card** components for content containers
- Integrates with **Button** components for additional actions
- Compatible with **Form** components within tab content
- Can contain **DataTable** or **List** components in content areas

### Utility Integration
```tsx
import { cn } from '@/lib/utils/cn';

// Example of extending with additional utilities
<TabsContent 
  className={cn(
    "custom-animation-class",
    "responsive-grid-layout",
    className
  )}
>
  {children}
</TabsContent>
```