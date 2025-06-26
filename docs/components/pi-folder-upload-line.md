# PiFolderUploadLine Icon Component

## Purpose
The `PiFolderUploadLine` component is an SVG icon that represents a folder with an upload action. It's part of the Phosphor icon family and displays a folder outline with an upward arrow, commonly used in file upload interfaces to indicate folder-based upload functionality or to represent upload destinations.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role |

## Usage Example

```tsx
import { PiFolderUploadLine } from '@/components/icons/pi/pi-folder-upload-line';

// Basic usage
export function FileUploadButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiFolderUploadLine />
      Upload to Folder
    </button>
  );
}

// With custom styling
export function UploadArea() {
  return (
    <div className="border-2 border-dashed border-gray-300 p-8 text-center">
      <PiFolderUploadLine 
        className="mx-auto mb-4 text-4xl text-gray-400"
        aria-label="Upload folder icon"
      />
      <p>Drag and drop files to upload to folder</p>
    </div>
  );
}

// In a navigation menu
export function NavigationItem() {
  return (
    <a href="/upload" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100">
      <PiFolderUploadLine className="text-gray-600" />
      <span>Bulk Upload</span>
    </a>
  );
}

// With click handler
export function InteractiveIcon() {
  const handleUpload = () => {
    // Trigger upload logic
  };

  return (
    <PiFolderUploadLine 
      className="cursor-pointer text-blue-500 hover:text-blue-700"
      onClick={handleUpload}
      role="button"
      aria-label="Upload files to folder"
    />
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with folder and upload arrow paths
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Props Forwarding**: Spreads all props to the SVG element for maximum flexibility
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility

## State Management
**None** - This is a pure presentational component with no state management requirements. It simply renders SVG markup based on the provided props.

## Side Effects
**None** - This component has no side effects, API calls, or external interactions. It's a pure function that returns JSX.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No external dependencies**: Self-contained icon component

## Integration
This icon component integrates into the application architecture as:

- **UI Layer Component**: Part of the foundational UI components in `/components/icons/`
- **Design System**: Contributes to the consistent icon language across the application
- **Reusable Asset**: Can be used across different features and domains
- **Composable**: Easily composed with other UI components like buttons, cards, and forms

### Common Integration Patterns:
```tsx
// In file upload features
import { PiFolderUploadLine } from '@/components/icons/pi/pi-folder-upload-line';

// In form components
export function FileUploadForm() {
  return (
    <form>
      <label className="flex items-center gap-2">
        <PiFolderUploadLine />
        Select Upload Folder
      </label>
      {/* form fields */}
    </form>
  );
}

// In dashboard widgets
export function UploadStats() {
  return (
    <div className="stat-card">
      <PiFolderUploadLine className="stat-icon" />
      <span>Folder Uploads: 24</span>
    </div>
  );
}
```

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component**: Correctly implemented as server component (no client-side features)
- **Flat Structure**: Simple, non-nested component structure
- **Reusable**: Placed in `/components/icons/` for cross-domain usage
- **Composable**: Easily combined with other UI components

### ✅ Implementation Best Practices
- **Accessibility**: Include `aria-label` for meaningful icons
- **Semantic Usage**: Use in contexts related to folder uploads or file management
- **Consistent Sizing**: Leverage `1em` sizing for text-relative scaling
- **Color Theming**: Utilize `currentColor` for theme consistency

### ✅ Usage Recommendations
```tsx
// Good: Semantic usage with accessibility
<PiFolderUploadLine 
  aria-label="Upload to folder" 
  className="text-blue-500" 
/>

// Good: Consistent with design system
<Button variant="primary">
  <PiFolderUploadLine />
  Upload Files
</Button>

// Avoid: Overriding core SVG attributes
<PiFolderUploadLine 
  width="fixed-width" // Breaks responsive behavior
  fill="hardcoded-color" // Breaks theming
/>
```

The component adheres to the established patterns for icon components, providing a reliable and consistent folder upload icon that integrates seamlessly with the application's design system and accessibility requirements.