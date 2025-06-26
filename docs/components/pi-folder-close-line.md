# PiFolderCloseLine Icon Component

## Purpose
The `PiFolderCloseLine` component is an SVG icon that represents a closed folder with a deletion/close action indicator. It displays a folder outline with an "X" symbol, typically used in file management interfaces to indicate closing or removing folder items.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | Standard SVG element props including className, style, onClick, etc. |

### Inherited SVG Props
Common props you can pass include:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseEnter/onMouseLeave` - Mouse event handlers
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiFolderCloseLine } from '@/components/icons/pi/pi-folder-close-line';

// Basic usage
function FileManager() {
  return (
    <div className="file-list">
      <div className="folder-item">
        <PiFolderCloseLine />
        <span>Documents</span>
      </div>
    </div>
  );
}

// With custom styling and interaction
function FolderActionButton() {
  const handleRemoveFolder = (folderId: string) => {
    // Handle folder removal logic
  };

  return (
    <button 
      onClick={() => handleRemoveFolder('folder-123')}
      className="p-2 hover:bg-red-50 rounded-md transition-colors"
      aria-label="Remove folder"
    >
      <PiFolderCloseLine 
        className="w-5 h-5 text-red-500 hover:text-red-600" 
      />
    </button>
  );
}

// In a data table with consistent sizing
function FolderTable() {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <PiFolderCloseLine 
              style={{ fontSize: '1.25rem' }}
              className="text-gray-400"
            />
          </td>
          <td>Project Files</td>
          <td>
            <button aria-label="Close folder">
              <PiFolderCloseLine className="w-4 h-4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
```

## Functionality
- **Scalable Vector Rendering**: Uses SVG for crisp display at any size
- **Responsive Sizing**: Inherits font size from parent (1em width/height)
- **Theme Integration**: Uses `currentColor` for automatic color inheritance
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Interactive Support**: Can receive click handlers and other event listeners

## State Management
**No State Management Required** - This is a stateless presentational component that relies solely on props. Any state management would be handled by parent components using:
- **TanStack Query**: For server state related to folder operations
- **Zustand**: For client-side UI state (e.g., selected folders, UI interactions)
- **Local State**: For component-specific interactions in parent components

## Side Effects
**No Side Effects** - This component is purely functional with no:
- API calls
- External service interactions  
- DOM manipulation
- Browser storage access
- Event subscriptions

All side effects should be managed by parent components that use this icon.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No External Dependencies**: Self-contained with no third-party library requirements

## Integration
This component follows our flat component architecture:

```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-folder-close-line.tsx  # ← This component
│   ├── ui/                               # ← Can be used in UI components
│   │   ├── button/
│   │   └── data-table/
│   └── features/                         # ← Used in feature components
│       ├── file-manager/
│       └── document-library/
```

**Integration Patterns:**
- **UI Components**: Used within reusable UI components like buttons, menu items
- **Feature Components**: Integrated into domain-specific file management features
- **Layout Components**: Can be used in navigation, toolbars, and action bars

## Best Practices

### ✅ Adherence to Architecture Guidelines
- **Server-First**: Renders on server by default, no unnecessary client bundle
- **Composable**: Designed as a building block for larger components
- **Reusable**: Located in shared icons directory for cross-feature usage
- **Props Forward**: Spreads all SVG props for maximum flexibility

### ✅ Recommended Usage Patterns
```tsx
// Good: Semantic usage with proper labeling
<button aria-label="Close folder">
  <PiFolderCloseLine className="w-4 h-4" />
</button>

// Good: Consistent sizing with design system
<PiFolderCloseLine className="text-destructive w-5 h-5" />

// Good: Inheriting color from parent
<div className="text-red-500">
  <PiFolderCloseLine />
</div>
```

### ❌ Anti-Patterns to Avoid
```tsx
// Avoid: Hardcoded colors that break theming
<PiFolderCloseLine style={{ color: '#ff0000' }} />

// Avoid: Inconsistent sizing
<PiFolderCloseLine style={{ width: '23px', height: '19px' }} />

// Avoid: Missing accessibility context
<PiFolderCloseLine onClick={handleClick} /> // No aria-label or context
```

This component exemplifies our architectural principle of building simple, composable pieces that integrate seamlessly into larger feature components while maintaining consistency and reusability across the application.