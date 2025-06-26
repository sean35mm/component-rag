# Persistent Tabs Component

## Purpose

The `persistent-tabs` component provides a URL-persistent tab navigation system that maintains the active tab state in the browser's URL via search parameters. This allows users to bookmark, share, and navigate back to specific tabs while providing a seamless, client-side navigation experience using Next.js routing.

## Props Interface

### Tabs

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | ✅ | - | Tab components (TabsList, TabsContent) |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `defaultValue` | `string` | ✅ | - | The default active tab identifier |
| `searchParam` | `string` | ❌ | `"tab"` | URL search parameter name for persistence |

### TabsList

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | ✅ | - | TabsTrigger components |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `variant` | `'default' \| 'inline'` | ❌ | `'default'` | Visual style variant |

### TabsTrigger

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | ✅ | - | Tab trigger content |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `value` | `string` | ✅ | - | Unique tab identifier |
| `variant` | `'default' \| 'inline'` | ❌ | `'default'` | Visual style variant |
| `size` | `'default'` | ❌ | `'default'` | Size variant |

### TabsContent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | ✅ | - | Tab panel content |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `value` | `string` | ✅ | - | Tab identifier (must match TabsTrigger value) |

## Usage Example

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/persistent-tabs';

export function ProjectDashboard() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="typography-titleH2 text-pgText-950 mb-6">
        Project Dashboard
      </h1>
      
      <Tabs 
        defaultValue="overview" 
        searchParam="section"
        className="w-full"
      >
        {/* Default pill-style tabs */}
        <TabsList variant="default" className="mb-6">
          <TabsTrigger value="overview">
            <span className="typography-labelSmall">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <span className="typography-labelSmall">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <span className="typography-labelSmall">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="bg-pgBackground-50 p-6 rounded-lg border border-pgStroke-200">
            <h3 className="typography-subheadingMedium text-pgText-900 mb-2">
              Project Overview
            </h3>
            <p className="typography-paragraphMedium text-pgText-700">
              Your project statistics and recent activity.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="bg-pgBackground-50 p-6 rounded-lg border border-pgStroke-200">
            <h3 className="typography-subheadingMedium text-pgText-900 mb-2">
              Analytics Dashboard
            </h3>
            <p className="typography-paragraphMedium text-pgText-700">
              Detailed analytics and performance metrics.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="bg-pgBackground-50 p-6 rounded-lg border border-pgStroke-200">
            <h3 className="typography-subheadingMedium text-pgText-900 mb-2">
              Project Settings
            </h3>
            <p className="typography-paragraphMedium text-pgText-700">
              Configure your project preferences.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Inline border-style tabs */}
      <Tabs 
        defaultValue="details" 
        searchParam="view"
        className="w-full mt-12"
      >
        <TabsList variant="inline" className="mb-8">
          <TabsTrigger value="details" variant="inline">
            Project Details
          </TabsTrigger>
          <TabsTrigger value="team" variant="inline">
            Team Members
          </TabsTrigger>
          <TabsTrigger value="history" variant="inline">
            Change History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pgNeutral-50 p-4 rounded-lg">
              <h4 className="typography-labelLarge text-pgText-950 mb-2">
                Basic Information
              </h4>
              <p className="typography-paragraphSmall text-pgText-600">
                Project name, description, and metadata.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="space-y-4">
            <h4 className="typography-labelLarge text-pgText-950">
              Team Members
            </h4>
            <p className="typography-paragraphSmall text-pgText-600">
              Manage team access and permissions.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            <h4 className="typography-labelLarge text-pgText-950">
              Change History
            </h4>
            <p className="typography-paragraphSmall text-pgText-600">
              View recent changes and updates.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Tab Labels**: `.typography-labelSmall` for default tabs
- **Tab Content Headers**: `.typography-subheadingMedium`, `.typography-labelLarge`
- **Content Text**: `.typography-paragraphMedium`, `.typography-paragraphSmall`
- **Page Titles**: `.typography-titleH2`

### Color Tokens
- **Text Colors**: 
  - Primary: `text-pgText-950`, `text-pgText-900`
  - Secondary: `text-pgText-700`, `text-pgText-600`
  - Active state: `text-pgTextBlueDark`
- **Background Colors**:
  - Container: `bg-pgBackground-50`, `bg-pgBackground-100`
  - Neutral: `bg-pgNeutral-50`
  - Tab bar: `bg-alphaNeutral/10`
  - Active tab: `bg-white`
- **Border Colors**: `border-pgStroke-200`, `border-pgTextBlueDark`

### Tailwind Utilities
- **Layout**: `inline-flex`, `items-center`, `justify-center`
- **Spacing**: `gap-1`, `gap-6`, `p-1`, `px-3`, `py-3`
- **Borders**: `rounded-xl`, `rounded-[0.625rem]`, `border-b-2`
- **Shadows**: `shadow-toggleSwitch`

## Styling

### Variants

#### TabsList Variants
- **`default`**: Pill-style tab bar with rounded background
  - Background: `bg-alphaNeutral/10`
  - Spacing: `gap-1`, `p-1`
  - Height: `h-9`

- **`inline`**: Borderless inline tabs with bottom border indicators
  - Background: `bg-transparent`
  - Spacing: `gap-6`, `px-4`
  - Border: `border-b`

#### TabsTrigger Variants
- **`default`**: Rounded pill buttons
  - Typography: `.typography-labelSmall`
  - Height: `h-7`
  - Padding: `px-3`
  - Active state: White background with shadow
  - Hover: `hover:bg-alphaNeutral/16`

- **`inline`**: Text-based tabs with underline indicator
  - Typography: `text-base font-medium`
  - Padding: `px-0 py-3`
  - Min width: `min-w-[90px]`
  - Active state: Blue underline and text color
  - Hover: `hover:bg-pgBackground-100`

### States
- **Active**: `data-[state=active]` - Enhanced styling with background/border changes
- **Inactive**: `data-[state=inactive]` - Default subdued appearance
- **Hover**: Enhanced contrast and background changes
- **Focus**: Ring-based focus indicators with `focus-visible:ring-2`
- **Disabled**: Reduced opacity and pointer events disabled

## Responsive Design

The component adapts across breakpoints using our responsive system:

```tsx
// Responsive layout example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <TabsContent value="mobile-first">
    {/* Content stacks on mobile, side-by-side on larger screens */}
  </TabsContent>
</div>

// Responsive tab list
<TabsList className="w-full sm:w-auto sm:mx-auto lg:mx-0">
  {/* Full width on mobile, auto width centered on tablet, left-aligned on desktop */}
</TabsList>
```

**Breakpoint Behavior**:
- **Mobile (< 640px)**: Full-width tabs, stacked content
- **Tablet (640px+)**: Centered tab navigation, flexible content layout
- **Desktop (1024px+)**: Optimized spacing and multi-column content support

## Accessibility

### ARIA Features
- **Tab Navigation**: Uses Next.js Link for proper navigation semantics
- **Keyboard Support**: Full keyboard navigation with focus management
- **Focus Indicators**: Visible focus rings with `focus-visible:ring-2`
- **Screen Reader Support**: Proper tab/panel relationships

### Implementation Details
- Uses `data-state` attributes for styling and screen reader context
- Prevents default link behavior while maintaining URL updates
- Supports browser back/forward navigation
- Maintains focus management during tab switches

### Best Practices
```tsx
// Always provide descriptive labels
<TabsTrigger value="settings" aria-label="Project settings and configuration">
  Settings
</TabsTrigger>

// Use semantic HTML in content
<TabsContent value="overview">
  <section aria-labelledby="overview-heading">
    <h3 id="overview-heading">Project Overview</h3>
    {/* content */}
  </section>
</TabsContent>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Class name utility function
- `./tabs-common` - Shared tab context and URL persistence logic

### External Dependencies
- `@radix-ui/react-tabs` - Base tab primitives (used for typing)
- `class-variance-authority` - Variant-based styling system
- `next/link` - Next.js routing integration

### Related Components
- Consider using with `Card` components for content containers
- Pairs well with `Badge` components for tab indicators
- Can be combined with `Skeleton` components for loading states