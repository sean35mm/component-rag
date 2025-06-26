# PiUpload2Line Icon Component

## Purpose

The `PiUpload2Line` component is a scalable SVG icon representing an upload action with a line-style design. It displays an upward arrow with a container/tray below, commonly used in file upload interfaces, data transfer operations, and form submissions. This icon provides visual consistency across upload-related UI elements in the application.

## Component Type

**Server Component** - This is a purely presentational SVG icon component with no client-side interactions, state management, or browser APIs. It can be safely rendered on the server and hydrated on the client without requiring the 'use client' directive.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Spread to the root SVG element |

### Inherited SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `onMouseOver` - Mouse over event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `data-*` - Data attributes

## Usage Example

```tsx
import { PiUpload2Line } from '@/components/icons/pi/pi-upload-2-line';
import { Button } from '@/components/ui/button';

// Basic usage
export function UploadButton() {
  return (
    <Button>
      <PiUpload2Line className="mr-2 h-4 w-4" />
      Upload File
    </Button>
  );
}

// File upload zone
export function FileUploadZone() {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <PiUpload2Line className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-lg font-medium">Drop files here to upload</p>
      <p className="text-sm text-gray-500">or click to browse</p>
    </div>
  );
}

// Navigation or menu item
export function DataImportMenuItem() {
  return (
    <button className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100">
      <PiUpload2Line className="h-5 w-5 text-blue-600" />
      <span>Import Data</span>
    </button>
  );
}

// With custom styling and click handler
export function CustomUploadIcon() {
  const handleUpload = () => {
    // Upload logic
  };

  return (
    <PiUpload2Line 
      className="h-6 w-6 text-green-600 cursor-pointer hover:text-green-700"
      onClick={handleUpload}
      aria-label="Upload file"
      role="button"
    />
  );
}
```

## Functionality

- **Scalable Vector Graphics**: Renders crisp at any size using em units
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessibility Ready**: Accepts ARIA attributes for screen reader compatibility
- **Event Handling**: Supports all standard SVG/DOM events through props spreading
- **Responsive Design**: Scales automatically with font size using em units (1em × 1em)
- **Theme Integration**: Automatically adapts to theme colors via currentColor

## State Management

**No State Management** - This is a pure presentational component with no internal state. It relies entirely on props for configuration and styling. Any state-dependent behavior should be managed by parent components using:

- **TanStack Query**: For upload progress tracking or file status
- **Zustand**: For global upload queue state
- **Local State**: For component-specific upload UI states

## Side Effects

**No Side Effects** - This component performs no side effects, API calls, or external interactions. It's a pure rendering component that:

- Does not trigger network requests
- Does not modify global state
- Does not access browser APIs
- Does not cause re-renders based on external data

## Dependencies

### Internal Dependencies
- `React.SVGProps<SVGSVGElement>` - TypeScript interface for SVG element props

### No External Dependencies
- Self-contained SVG component
- No utility functions or external libraries required
- No other components or hooks dependencies

### Integration Dependencies
Often used alongside:
- `@/components/ui/button` - For upload buttons
- `@/components/ui/input` - For file input fields
- Form components with React Hook Form
- File upload utilities and validation schemas

## Integration

### Design System Integration
```tsx
// Consistent sizing with design tokens
<PiUpload2Line className="h-4 w-4" /> // Small
<PiUpload2Line className="h-5 w-5" /> // Medium  
<PiUpload2Line className="h-6 w-6" /> // Large
<PiUpload2Line className="h-8 w-8" /> // Extra Large
```

### Form Integration
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const uploadSchema = z.object({
  file: z.instanceof(File).optional()
});

export function UploadForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(uploadSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="flex items-center cursor-pointer">
        <PiUpload2Line className="mr-2 h-4 w-4" />
        <span>Choose File</span>
        <input 
          {...register('file')} 
          type="file" 
          className="hidden" 
        />
      </label>
    </form>
  );
}
```

### Feature Component Integration
```tsx
// Domain-specific upload components
import { PiUpload2Line } from '@/components/icons/pi/pi-upload-2-line';

export function DocumentUploadSection() {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center text-lg font-semibold">
        <PiUpload2Line className="mr-2 h-5 w-5" />
        Document Upload
      </h2>
      {/* Upload implementation */}
    </section>
  );
}
```

## Best Practices

### Architecture Adherence
✅ **Server Component**: Renders efficiently on server without client-side overhead  
✅ **Flat Structure**: Simple, non-nested component following Lego block principle  
✅ **Reusable**: Located in `/icons/` for cross-feature usage  
✅ **TypeScript**: Fully typed with proper SVG prop interfaces  

### Usage Patterns
```tsx
// ✅ Good: Semantic usage with proper labeling
<Button aria-label="Upload document">
  <PiUpload2Line className="mr-2 h-4 w-4" />
  Upload
</Button>

// ✅ Good: Consistent sizing with Tailwind classes
<PiUpload2Line className="h-5 w-5 text-blue-600" />

// ✅ Good: Color inheritance from parent
<div className="text-green-600">
  <PiUpload2Line className="h-4 w-4" />
</div>

// ❌ Avoid: Hardcoded sizes or colors
<PiUpload2Line style={{ width: '20px', fill: '#ff0000' }} />

// ❌ Avoid: Missing accessibility context
<PiUpload2Line onClick={handleClick} /> // No aria-label or role
```

### Performance Optimization
- Use React.memo() wrapper only if parent re-renders frequently
- Leverage server-side rendering for initial page loads
- Consider icon sprite sheets for applications with many icons
- Implement proper caching headers for icon assets