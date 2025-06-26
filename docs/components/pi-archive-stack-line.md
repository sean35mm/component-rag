# PiArchiveStackLine Icon Component

## Purpose

The `PiArchiveStackLine` component is an SVG icon that displays a stacked archive representation with a line-style design. It's part of the Phosphor Icons (pi) collection and is used to represent archive functionality, document stacking, or storage features in the user interface. The icon shows multiple stacked layers with an archive box, making it ideal for file management, backup, or organizational features.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any interactive features, state management, or browser-specific APIs. It can be safely rendered on the server side, improving initial page load performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root SVG element |

## Usage Example

```tsx
import { PiArchiveStackLine } from '@/components/icons/pi/pi-archive-stack-line';

// Basic usage
export function ArchiveButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
      <PiArchiveStackLine />
      Archive Files
    </button>
  );
}

// With custom styling
export function DocumentManager() {
  return (
    <div className="sidebar-menu">
      <a href="/archives" className="menu-item">
        <PiArchiveStackLine 
          className="w-5 h-5 text-gray-600 hover:text-blue-600" 
          aria-label="Archived documents"
        />
        <span>Archives</span>
      </a>
    </div>
  );
}

// In a feature component
export function FileActions({ onArchive }: { onArchive: () => void }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onArchive}
        className="p-2 rounded hover:bg-gray-100"
        title="Archive selected files"
      >
        <PiArchiveStackLine className="w-4 h-4" />
      </button>
    </div>
  );
}

// With accessibility
export function ArchiveStatus({ count }: { count: number }) {
  return (
    <div className="status-indicator">
      <PiArchiveStackLine 
        aria-hidden="true"
        className="w-6 h-6 text-amber-600" 
      />
      <span className="sr-only">Archived items:</span>
      <span>{count} archived</span>
    </div>
  );
}
```

## Functionality

- **SVG Rendering**: Renders a scalable vector graphic with archive stack imagery
- **Responsive Sizing**: Uses `1em` width/height, automatically scales with parent font-size
- **Theme Integration**: Uses `currentColor` fill, inherits text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes and other accessibility props
- **Customizable**: Supports all standard SVG props for styling and event handling

## State Management

**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state, server state, or client state. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - This component is a pure function that doesn't perform any:
- API calls
- DOM mutations outside of rendering
- Event subscriptions
- Timer operations
- External service interactions

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Integration Dependencies
- **UI Components**: Often used within buttons, navigation items, and action menus from `/ui/` directory
- **Feature Components**: Integrated into file management, document organization, and backup-related domain components
- **Styling System**: Works with Tailwind CSS classes and CSS-in-JS solutions

## Integration

This icon component fits into the larger application architecture as:

### UI Layer Integration
```tsx
// In UI components
import { PiArchiveStackLine } from '@/components/icons/pi/pi-archive-stack-line';

export function IconButton({ icon: Icon, ...props }) {
  return (
    <button className="icon-button" {...props}>
      <Icon />
    </button>
  );
}

// Usage
<IconButton icon={PiArchiveStackLine} onClick={handleArchive} />
```

### Feature Domain Integration
```tsx
// In file management features
export function FileManagerToolbar() {
  const archiveMutation = useMutation({
    mutationFn: archiveFiles,
    onSuccess: () => queryClient.invalidateQueries(['files'])
  });

  return (
    <Toolbar>
      <ToolbarButton 
        onClick={() => archiveMutation.mutate(selectedFiles)}
        icon={PiArchiveStackLine}
      >
        Archive
      </ToolbarButton>
    </Toolbar>
  );
}
```

## Best Practices

### ✅ Follows Architecture Guidelines

- **Server Component**: Leverages server-side rendering capabilities
- **Component Decomposition**: Simple, focused component that stacks well with other UI elements
- **Reusability**: Located in `/components/icons/` for application-wide usage
- **Flat Structure**: No unnecessary nesting, direct prop forwarding

### ✅ Implementation Best Practices

```tsx
// Good: Semantic usage with proper accessibility
<button onClick={handleArchive} aria-label="Archive selected files">
  <PiArchiveStackLine aria-hidden="true" />
  <span className="sr-only">Archive</span>
</button>

// Good: Consistent sizing with design system
<PiArchiveStackLine className="w-icon-sm" /> // Small: 16px
<PiArchiveStackLine className="w-icon-md" /> // Medium: 20px  
<PiArchiveStackLine className="w-icon-lg" /> // Large: 24px

// Good: Theme-aware coloring
<PiArchiveStackLine className="text-primary-600 dark:text-primary-400" />

// Avoid: Inline styles for sizing (breaks consistency)
<PiArchiveStackLine style={{ width: '18px', height: '18px' }} />

// Avoid: Missing accessibility context
<button onClick={handleArchive}>
  <PiArchiveStackLine /> {/* No context for screen readers */}
</button>
```

### ✅ Integration Patterns

- Use within feature-specific components that handle archive functionality
- Combine with TanStack Query mutations for archive operations
- Integrate with form components when building archive configuration UIs
- Pair with notification systems to provide feedback on archive actions