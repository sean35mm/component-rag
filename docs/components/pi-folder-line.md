# PiFolderLine Icon Component

## Purpose

The `PiFolderLine` component is an SVG icon component that renders a folder outline icon. It's part of the Phosphor Icons (pi) icon set and provides a consistent, scalable folder representation for file management interfaces, navigation menus, and organizational features throughout the application.

## Component Type

**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactions, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiFolderLine } from '@/components/icons/pi/pi-folder-line';

// Basic usage
export function FileExplorer() {
  return (
    <div className="file-explorer">
      <PiFolderLine />
      <span>Documents</span>
    </div>
  );
}

// With custom styling
export function NavigationMenu() {
  return (
    <nav>
      <button className="nav-item">
        <PiFolderLine 
          className="w-5 h-5 text-blue-600" 
          aria-label="Folders"
        />
        My Folders
      </button>
    </nav>
  );
}

// With click handler
export function FolderButton({ onOpenFolder }: { onOpenFolder: () => void }) {
  return (
    <button 
      onClick={onOpenFolder}
      className="flex items-center gap-2 p-2 hover:bg-gray-100"
    >
      <PiFolderLine className="w-4 h-4" />
      Open Folder
    </button>
  );
}

// In a file tree component
export function FileTreeNode({ name, type }: { name: string; type: 'file' | 'folder' }) {
  return (
    <div className="flex items-center gap-2">
      {type === 'folder' && <PiFolderLine className="w-4 h-4 text-amber-500" />}
      <span>{name}</span>
    </div>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design
- **Outline Style**: Clean line-based folder icon without fill
- **24x24 Viewbox**: Standard icon dimensions for consistent sizing
- **Folder Structure**: Depicts a realistic folder with tab and body sections

## State Management

**No State Management** - This is a stateless presentational component that doesn't require any state management. It simply renders SVG markup based on the provided props.

## Side Effects

**No Side Effects** - This component is a pure function that renders static SVG content without any side effects, API calls, or external interactions.

## Dependencies

### Direct Dependencies
- `react` - For `SVGProps` type definition

### Related Components
- Other Phosphor Icons in `/components/icons/pi/` directory
- File management components that use folder icons
- Navigation components requiring folder representations

## Integration

### Application Architecture Integration

```tsx
// In file management features
import { PiFolderLine } from '@/components/icons/pi/pi-folder-line';

// Feature component example
export function DocumentLibrary() {
  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: fetchFolders
  });

  return (
    <div className="document-library">
      {folders?.map(folder => (
        <div key={folder.id} className="folder-item">
          <PiFolderLine className="w-5 h-5" />
          <span>{folder.name}</span>
        </div>
      ))}
    </div>
  );
}

// In UI component library
export function Button({ variant, icon, children }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant })}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
}

// Usage with button
<Button icon={<PiFolderLine />}>
  New Folder
</Button>
```

## Best Practices

### Architecture Adherence
- ✅ **Server Component**: No client-side state or interactions required
- ✅ **Flat Component Structure**: Simple, focused component without nested complexity
- ✅ **Reusable Design**: Located in `/ui/` equivalent (`/icons/`) for cross-feature usage
- ✅ **TypeScript Integration**: Properly typed with SVG props interface

### Usage Recommendations

1. **Consistent Sizing**: Use Tailwind classes for consistent icon sizing
   ```tsx
   <PiFolderLine className="w-4 h-4" /> // Small
   <PiFolderLine className="w-5 h-5" /> // Medium
   <PiFolderLine className="w-6 h-6" /> // Large
   ```

2. **Accessibility**: Always provide context for screen readers
   ```tsx
   <PiFolderLine aria-label="Folder" role="img" />
   ```

3. **Color Theming**: Leverage `currentColor` for theme integration
   ```tsx
   <PiFolderLine className="text-blue-600 dark:text-blue-400" />
   ```

4. **Performance**: Use as Server Component when possible to reduce client bundle size

5. **Semantic Usage**: Pair with meaningful text or labels for better UX
   ```tsx
   <div className="flex items-center gap-2">
     <PiFolderLine />
     <span>Project Files</span>
   </div>
   ```