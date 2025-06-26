# PiRefreshLine Icon Component

## Purpose

The `PiRefreshLine` component is an SVG icon representing a refresh or reload action with circular arrows. It's part of the Phosphor Icons collection and provides a consistent, scalable refresh icon that inherits text color and sizing from its parent context. This component is commonly used for refresh buttons, reload actions, and indicating data synchronization states.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | All standard SVG element props including `className`, `onClick`, `style`, `aria-label`, etc. Spread to the root `<svg>` element |

### Inherited SVG Props (Common Usage)
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `onClick` | `(event: MouseEvent) => void` | Click handler for interactive usage |
| `style` | `CSSProperties` | Inline styles |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiRefreshLine } from '@/components/icons/pi/pi-refresh-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function DataTable() {
  return (
    <div className="flex items-center gap-2">
      <h2>User Data</h2>
      <PiRefreshLine className="w-4 h-4 text-gray-500" />
    </div>
  );
}

// Interactive refresh button
export function RefreshButton({ onRefresh }: { onRefresh: () => void }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onRefresh}
      className="flex items-center gap-2"
    >
      <PiRefreshLine className="w-4 h-4" />
      Refresh Data
    </Button>
  );
}

// Loading state with animation
export function RefreshingIndicator({ isRefreshing }: { isRefreshing: boolean }) {
  return (
    <PiRefreshLine 
      className={`w-5 h-5 text-blue-600 ${
        isRefreshing ? 'animate-spin' : ''
      }`}
      aria-label={isRefreshing ? 'Refreshing...' : 'Refresh'}
    />
  );
}

// Custom sizing and styling
export function CustomRefreshIcon() {
  return (
    <PiRefreshLine 
      className="w-8 h-8 text-green-500 hover:text-green-600 cursor-pointer transition-colors"
      onClick={() => window.location.reload()}
      role="button"
      aria-label="Reload page"
    />
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisply at any size using `1em` dimensions
- **Color Inheritance**: Uses `currentColor` to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Framework Agnostic**: Standard SVG that works with any styling approach
- **Responsive Design**: Scales with font-size using `em` units

### Visual Design
- Clean line-art style refresh icon with circular arrows
- 24x24 viewBox providing consistent proportions
- Multiple path elements creating a cohesive refresh symbol
- Optimized for both light and dark themes

## State Management

**No State Management** - This is a stateless presentational component that doesn't manage any internal state. State management occurs in parent components that use this icon.

Common state patterns with this icon:
- **Loading States**: Parent components track `isLoading` and apply rotation animations
- **Data Freshness**: Used with TanStack Query's `isFetching` states
- **User Interactions**: Click handlers managed by parent components

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure function that returns SVG markup based on props.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Works with any button or interactive component
- Commonly used with:
  - `Button` components for refresh actions
  - `IconButton` for compact refresh controls
  - Data table headers and toolbars
  - Loading spinners and status indicators

## Integration

### Application Architecture Integration
```tsx
// Feature-level refresh functionality
export function UserManagement() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1>Users</h1>
        <Button onClick={() => refetch()} disabled={isLoading}>
          <PiRefreshLine className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <UserTable data={data} />
    </div>
  );
}

// UI component integration
export function DataTableToolbar({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <TableFilters />
      <div className="flex items-center gap-2">
        <PiRefreshLine 
          className="w-4 h-4 cursor-pointer hover:text-blue-600"
          onClick={onRefresh}
        />
        <TableViewOptions />
      </div>
    </div>
  );
}
```

### Theme Integration
```tsx
// Adapts to theme context
export function ThemedRefreshButton() {
  return (
    <Button variant="ghost" size="icon">
      <PiRefreshLine className="w-4 h-4 text-foreground" />
    </Button>
  );
}
```

## Best Practices

### ✅ Recommended Patterns

1. **Consistent Sizing**: Use Tailwind size classes (`w-4 h-4`, `w-5 h-5`) for consistency
2. **Semantic Usage**: Always provide `aria-label` when used interactively
3. **Loading States**: Combine with `animate-spin` for loading indicators
4. **Color Context**: Let the icon inherit color from parent text context
5. **Event Handling**: Attach click handlers to parent buttons, not the icon directly

### ✅ Architecture Compliance

- **Server-First**: Renders on server without client-side JavaScript
- **Composable**: Works as a building block in larger UI components
- **Accessible**: Supports ARIA attributes for screen readers
- **Type-Safe**: Fully typed with SVG element props
- **Performance**: No runtime overhead, static SVG rendering

### ❌ Anti-Patterns

```tsx
// ❌ Don't hardcode dimensions
<PiRefreshLine width={16} height={16} />

// ✅ Use CSS classes instead
<PiRefreshLine className="w-4 h-4" />

// ❌ Don't override fill color directly
<PiRefreshLine fill="#ff0000" />

// ✅ Use CSS for color control
<PiRefreshLine className="text-red-500" />

// ❌ Don't make the icon itself clickable without context
<PiRefreshLine onClick={handleRefresh} />

// ✅ Wrap in proper interactive element
<Button onClick={handleRefresh}>
  <PiRefreshLine className="w-4 h-4" />
</Button>
```

### Integration Guidelines

- Use with TanStack Query's `refetch` functions for data refresh
- Combine with loading states from server state management
- Include in design system icon libraries for consistent usage
- Apply consistent sizing and spacing across the application