# PiFolderCheckLine Icon Component

## Purpose
`PiFolderCheckLine` is an SVG icon component that displays a folder with a checkmark overlay, representing completed or verified folder operations. This icon is part of the Phosphor Icons (Pi) collection and is commonly used to indicate successful folder actions, completed uploads, or verified directory states.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management requirements.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiFolderCheckLine } from '@/components/icons/pi/pi-folder-check-line';

// Basic usage
<PiFolderCheckLine />

// With custom styling
<PiFolderCheckLine 
  className="text-green-500 hover:text-green-600" 
  aria-label="Folder verified"
/>

// As a button icon
<button className="flex items-center gap-2">
  <PiFolderCheckLine className="w-5 h-5" />
  Upload Complete
</button>

// In a status indicator
<div className="flex items-center gap-2">
  <PiFolderCheckLine className="text-success-500" />
  <span>Folder sync completed</span>
</div>

// With click handler
<PiFolderCheckLine 
  className="cursor-pointer"
  onClick={() => handleFolderAction()}
  role="button"
  tabIndex={0}
/>
```

## Functionality

### Core Features
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font-size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Event Handling**: Supports all standard SVG events through props spreading
- **Customizable**: Fully customizable through standard SVG props

### Visual Design
- **Dual Path Structure**: Combines folder outline with checkmark overlay
- **Line Style**: Outline-based design suitable for various UI contexts
- **24x24 ViewBox**: Standard icon dimensions for consistent sizing

## State Management
**None** - This is a stateless presentational component that requires no state management. All behavior is controlled through props passed from parent components.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions. Any interactive behavior is handled through event props passed by parent components.

## Dependencies

### Internal Dependencies
- React `SVGProps` type for prop typing

### External Dependencies
- None - Self-contained SVG component

### Related Components
- Other Phosphor Icons in `/components/icons/pi/`
- UI components that use this icon (buttons, status indicators, etc.)

## Integration

### Architecture Fit
```tsx
// In feature components
const FolderUploadStatus = () => {
  return (
    <div className="status-indicator">
      <PiFolderCheckLine className="status-icon" />
      <span>Upload verified</span>
    </div>
  );
};

// In UI components
const StatusButton = ({ status, children }) => {
  const icon = status === 'complete' ? PiFolderCheckLine : OtherIcon;
  return (
    <button className="btn">
      <icon className="btn-icon" />
      {children}
    </button>
  );
};

// With state management
const FileManagerView = () => {
  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: fetchFolders
  });

  return (
    <div>
      {folders?.map(folder => (
        <div key={folder.id} className="folder-item">
          {folder.isVerified && (
            <PiFolderCheckLine className="text-success" />
          )}
          {folder.name}
        </div>
      ))}
    </div>
  );
};
```

### Common Use Cases
- File management interfaces
- Upload progress indicators
- Folder verification status
- Completed task indicators
- Success state representations

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component for static content  
✅ **Flat Composition**: Simple, single-purpose component for easy composition  
✅ **Reusability**: Generic icon component usable across different domains  
✅ **Prop Spreading**: Flexible props interface following React patterns

### Implementation Guidelines

```tsx
// ✅ Good: Semantic usage with proper accessibility
<PiFolderCheckLine 
  aria-label="Folder verification complete"
  className="text-success-500"
/>

// ✅ Good: Consistent sizing with Tailwind
<PiFolderCheckLine className="w-4 h-4" />

// ✅ Good: Proper event handling
<PiFolderCheckLine 
  onClick={handleClick}
  className="cursor-pointer hover:text-blue-600"
  role="button"
  tabIndex={0}
/>

// ❌ Avoid: Missing accessibility for interactive icons
<PiFolderCheckLine onClick={handleClick} />

// ❌ Avoid: Inline styles when Tailwind classes available
<PiFolderCheckLine style={{ color: 'green' }} />
```

### Performance Considerations
- Icon renders efficiently as inline SVG
- No bundle splitting needed for server components
- Minimal DOM footprint with optimized SVG paths
- Scales well with CSS transforms rather than multiple icon sizes