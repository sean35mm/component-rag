# PiFolderTransferLine Icon Component

## Purpose
The `PiFolderTransferLine` component renders an SVG icon that visually represents folder transfer functionality with a lined/outlined design style. This icon is typically used to indicate file or folder transfer operations, data migration, or folder synchronization features in the user interface.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server side for optimal performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. Spread to the root `<svg>` element |

## Usage Example

```tsx
import { PiFolderTransferLine } from '@/components/icons/pi/pi-folder-transfer-line';

// Basic usage
export function TransferButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded">
      <PiFolderTransferLine />
      Transfer Files
    </button>
  );
}

// With custom styling
export function SyncStatus() {
  return (
    <div className="flex items-center gap-3">
      <PiFolderTransferLine 
        className="text-green-600 w-5 h-5" 
        aria-label="Folder sync status"
      />
      <span>Folders synchronized</span>
    </div>
  );
}

// In a navigation menu
export function NavigationItem() {
  return (
    <a href="/transfers" className="flex items-center p-2 hover:bg-gray-100">
      <PiFolderTransferLine className="mr-3 text-gray-700" />
      File Transfers
    </a>
  );
}

// With click handler
export function InteractiveIcon() {
  const handleTransfer = () => {
    // Transfer logic here
  };

  return (
    <PiFolderTransferLine 
      className="cursor-pointer hover:text-blue-600 transition-colors"
      onClick={handleTransfer}
      role="button"
      tabIndex={0}
      aria-label="Start folder transfer"
    />
  );
}
```

## Functionality
- **SVG Rendering**: Renders a scalable vector graphic with folder and arrow transfer iconography
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Current Color**: Uses `fill='currentColor'` to inherit text color from parent elements
- **Accessibility Ready**: Supports ARIA attributes and semantic HTML props
- **Style Flexible**: Accepts all standard SVG props for customization

## State Management
**None** - This is a stateless presentational component. It doesn't require any state management solutions (TanStack Query, Zustand, or local state) as it only renders static SVG markup.

## Side Effects
**None** - The component has no side effects, API calls, or external interactions. It's a pure function that renders SVG markup based on props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Doesn't depend on other components, hooks, or services

## Integration
This icon component integrates into the larger application architecture as:

- **UI Building Block**: Part of the icon system in `/components/icons/pi/` following the flat component structure
- **Design System**: Provides consistent visual language across the application
- **Feature Integration**: Can be used in file management, data transfer, synchronization, and backup features
- **Accessibility Layer**: Supports screen readers and keyboard navigation when proper ARIA attributes are provided

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Server Component**: Correctly implemented as a server component (no 'use client' needed)
- **Flat Structure**: Located in appropriate icon directory without unnecessary nesting
- **Lego Block Approach**: Small, focused, reusable component that can be composed into larger features
- **No State Complexity**: Avoids unnecessary state management for presentational components

✅ **Icon-Specific Best Practices**:
- Always provide `aria-label` or `aria-labelledby` for accessibility
- Use semantic HTML (`role="img"` or `role="button"`) when appropriate
- Leverage `currentColor` for theme integration
- Size with relative units (`1em`) for scalability
- Combine with text labels for better UX

✅ **Performance Optimized**:
- Minimal bundle impact with inline SVG
- No runtime JavaScript for basic usage
- Server-side rendering compatible
- Efficient re-rendering with React's reconciliation