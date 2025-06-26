# PiEditBoxLine Icon Component

## Purpose

The `PiEditBoxLine` component is an SVG icon that represents an edit box or document editing interface. It displays a line-style (outlined) icon showing a document with an edit pencil, commonly used to indicate editing functionality for forms, documents, or content management features.

## Component Type

**Server Component** - This is a pure presentational SVG icon component with no interactivity, state, or client-side behavior. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spreads to the root `<svg>` element |

### Common SVG Props Examples:
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiEditBoxLine } from '@/components/icons/pi/pi-edit-box-line';

// Basic usage
export function DocumentCard() {
  return (
    <div className="document-card">
      <h3>My Document</h3>
      <button className="edit-btn">
        <PiEditBoxLine className="w-5 h-5" />
        Edit
      </button>
    </div>
  );
}

// Interactive usage with click handler
export function EditableContent() {
  const handleEdit = () => {
    // Navigate to edit mode or open edit modal
    console.log('Edit clicked');
  };

  return (
    <div className="content-header">
      <h2>Article Title</h2>
      <PiEditBoxLine 
        className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
        onClick={handleEdit}
        aria-label="Edit article"
        role="button"
        tabIndex={0}
      />
    </div>
  );
}

// Within a form context
export function FormField() {
  return (
    <div className="field-group">
      <label className="field-label">
        <PiEditBoxLine className="w-4 h-4 mr-2" />
        Description
      </label>
      <textarea className="form-textarea" />
    </div>
  );
}

// Styled with Tailwind classes
export function ActionButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      <PiEditBoxLine className="w-4 h-4" />
      Edit Document
    </button>
  );
}
```

## Functionality

### Key Features:
- **Scalable Vector Icon**: Renders crisply at any size using `1em` dimensions
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Responsive Design**: Scales with font-size due to `em` units
- **Customizable**: Accepts all standard SVG props for styling and behavior

### Visual Design:
- **Line Style**: Outlined/stroke design (not filled)
- **Document Representation**: Shows a document/box with editing pencil overlay
- **24x24 ViewBox**: Optimized for common icon sizes
- **Clean Paths**: Uses fillRule and clipRule for crisp rendering

## State Management

**No State Management** - This is a pure presentational component with no internal state. Any state-dependent behavior should be managed by parent components using:
- **TanStack Query** for server state related to document editing
- **Zustand** for client state like edit mode toggles
- **Local State** for simple UI state in parent components

## Side Effects

**No Side Effects** - This component has no side effects, API calls, or external interactions. It's a pure SVG rendering component.

## Dependencies

### Internal Dependencies:
- `React.SVGProps` type from React for TypeScript support

### No External Dependencies:
- No other components, hooks, or services required
- No runtime dependencies beyond React

## Integration

### Application Architecture Role:
- **UI Component Layer**: Part of the foundational icon system in `/components/icons/`
- **Design System**: Contributes to consistent iconography across the application
- **Feature Integration**: Used by feature components for editing interfaces

### Common Integration Patterns:
```tsx
// Content Management System
import { PiEditBoxLine } from '@/components/icons/pi/pi-edit-box-line';

export function ContentEditor() {
  const { mutate: updateContent } = useMutation(updateContentApi);
  
  return (
    <div className="editor-toolbar">
      <button onClick={() => setEditMode(true)}>
        <PiEditBoxLine className="w-5 h-5" />
        Edit Content
      </button>
    </div>
  );
}

// Form Builder
export function FormFieldEditor() {
  const editFieldStore = useFormEditorStore();
  
  return (
    <div className="field-controls">
      <PiEditBoxLine 
        className="edit-icon"
        onClick={() => editFieldStore.setEditingField(field.id)}
      />
    </div>
  );
}
```

## Best Practices

### Architecture Adherence:
✅ **Server Component**: No client-side state or effects  
✅ **Component Decomposition**: Single responsibility (icon rendering)  
✅ **Reusability**: Generic icon usable across features  
✅ **Flat Structure**: No unnecessary nesting or complexity  

### Usage Recommendations:
1. **Accessibility**: Always provide `aria-label` when used as interactive element
2. **Sizing**: Use Tailwind classes like `w-4 h-4`, `w-5 h-5` for consistent sizing
3. **Color**: Leverage `currentColor` by setting text color on parent elements
4. **Performance**: Component is lightweight and can be used liberally
5. **Semantic HTML**: Pair with appropriate semantic elements (buttons, links)

### Anti-Patterns to Avoid:
❌ Don't add state or effects to this component  
❌ Don't hard-code colors (use currentColor inheritance)  
❌ Don't use without proper accessibility attributes in interactive contexts  
❌ Don't nest multiple icons unnecessarily  

This icon component follows our architectural guidelines by being a simple, reusable UI component that can be composed into larger feature components while maintaining clean separation of concerns.