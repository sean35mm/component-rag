# PiFolderAddLine Icon Component

## Purpose
The `PiFolderAddLine` component renders an SVG icon representing a folder with an add/plus symbol. This icon is commonly used in file management interfaces to indicate actions like "create new folder" or "add to folder" functionality.

## Component Type
**Client Component** - While this component doesn't explicitly use the `'use client'` directive, it accepts `SVGProps<SVGSVGElement>` which includes event handlers and interactive properties that may require client-side functionality when used with click handlers or other user interactions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| ...props | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, onClick, style, etc. |
| width | `string \| number` | No | `'1em'` | Width of the SVG icon |
| height | `string \| number` | No | `'1em'` | Height of the SVG icon |
| fill | `string` | No | `'currentColor'` | Fill color of the icon paths |

## Usage Example

```tsx
import { PiFolderAddLine } from '@/components/icons/pi/pi-folder-add-line';

// Basic usage
function FileManager() {
  return (
    <div className="file-controls">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
        <PiFolderAddLine />
        Create Folder
      </button>
    </div>
  );
}

// With custom styling
function CustomFolderButton() {
  const handleCreateFolder = () => {
    // Folder creation logic
  };

  return (
    <button 
      onClick={handleCreateFolder}
      className="p-2 hover:bg-gray-100 rounded"
      aria-label="Create new folder"
    >
      <PiFolderAddLine 
        className="w-6 h-6 text-green-600" 
        aria-hidden="true"
      />
    </button>
  );
}

// In a navigation menu
function SidebarActions() {
  return (
    <nav className="space-y-2">
      <a href="/folders/new" className="flex items-center gap-3 p-2 hover:bg-gray-50">
        <PiFolderAddLine className="w-5 h-5 text-gray-600" />
        <span>New Folder</span>
      </a>
    </nav>
  );
}
```

## Functionality
- **Scalable Vector Icon**: Renders as an SVG with responsive sizing using `1em` dimensions
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent elements
- **Accessibility Ready**: Can be enhanced with ARIA labels and descriptions
- **Customizable**: Accepts all standard SVG props for styling and event handling
- **Consistent Sizing**: Default `1em` sizing ensures the icon scales with font size

## State Management
This component is **stateless** and does not manage any internal state. It follows the pure component pattern:
- No local state management required
- No TanStack Query or Zustand integration needed
- State management handled by parent components when used in interactive contexts

## Side Effects
**No side effects** - This is a pure presentational component that:
- Does not perform API calls
- Does not access external services
- Does not modify global state
- Does not trigger navigation or routing changes

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No external dependencies**: Self-contained SVG icon component
- **TypeScript**: Properly typed with SVG element props

## Integration
This icon component integrates into the application architecture as:

```tsx
// File management features
import { PiFolderAddLine } from '@/components/icons/pi/pi-folder-add-line';

// Used in feature components
function DocumentLibrary() {
  const createFolder = useMutation({
    mutationFn: folderService.create,
    onSuccess: () => queryClient.invalidateQueries(['folders'])
  });

  return (
    <div className="toolbar">
      <button 
        onClick={() => createFolder.mutate({ name: 'New Folder' })}
        disabled={createFolder.isLoading}
      >
        <PiFolderAddLine />
        {createFolder.isLoading ? 'Creating...' : 'New Folder'}
      </button>
    </div>
  );
}
```

## Best Practices
1. **Icon Library Organization**: Properly organized in `/components/icons/pi/` following the Phosphor Icons pattern
2. **Reusable UI Component**: Can be used across different feature domains without coupling
3. **Prop Spreading**: Uses `{...props}` pattern for maximum flexibility
4. **Semantic Usage**: Combine with meaningful text labels or ARIA attributes for accessibility
5. **Consistent Naming**: Follows PascalCase naming convention matching the icon library
6. **Type Safety**: Leverages TypeScript's `SVGProps` for compile-time safety
7. **Performance**: Lightweight SVG implementation without unnecessary re-renders
8. **Theming Support**: Uses `currentColor` for automatic theme integration

The component adheres to our architecture by being a focused, reusable UI component that can be composed into larger feature components while maintaining separation of concerns.