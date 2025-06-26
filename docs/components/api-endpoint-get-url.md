# ApiEndpointGetUrl Component

## Purpose

The `ApiEndpointGetUrl` component is a specialized UI element designed for displaying API endpoint URLs in developer documentation and configuration interfaces. It provides a clickable, copyable text field with visual feedback states, optional HTTP method badges, and an intuitive copy-to-clipboard interaction pattern. This component is specifically tailored for developer-facing interfaces where API endpoints need to be easily copied and referenced.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management for copy feedback
- Event handlers for click interactions
- Browser APIs for clipboard operations
- Hover state transitions and animations

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes for custom styling |
| `disabled` | `boolean` | No | `false` | Disables interaction and applies disabled styling |
| `includeMethod` | `boolean` | No | `false` | Whether to display the HTTP method badge |
| `token` | `string` | Yes | - | The API endpoint URL or token to display and copy |
| `method` | `string` | No | `undefined` | HTTP method to display in badge (e.g., "GET", "POST") |

## Usage Example

```tsx
import { ApiEndpointGetUrl } from '@/components/developers/api-endpoint-get-url';

export default function ApiDocumentation() {
  return (
    <div className="space-y-4">
      {/* Basic endpoint URL */}
      <ApiEndpointGetUrl 
        token="https://api.example.com/v1/users"
      />

      {/* With HTTP method badge */}
      <ApiEndpointGetUrl 
        token="https://api.example.com/v1/users/123"
        includeMethod
        method="GET"
      />

      {/* Disabled state */}
      <ApiEndpointGetUrl 
        token="https://api.example.com/v1/admin"
        disabled
        includeMethod
        method="POST"
        className="mb-6"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Copy-to-Clipboard**: Single-click copying of the endpoint URL
- **Visual Feedback**: Animated transitions showing copy success state
- **Method Badge**: Optional HTTP method indicator with consistent styling
- **Hover States**: Progressive disclosure of copy functionality
- **Disabled State**: Prevents interaction when endpoint is unavailable

### Interaction Flow
1. **Default State**: Shows URL with subtle copy icon
2. **Hover State**: Reveals "Click to copy" text and highlights copy icon
3. **Click Action**: Copies URL to clipboard and shows success feedback
4. **Success State**: Displays "Copied" message with checkmark icon
5. **Reset**: Returns to default state after brief delay

### Accessibility Features
- Keyboard accessible through click handlers
- Visual feedback for all interaction states
- Disabled state properly communicated to assistive technologies

## State Management

**Local State Management** using React's `useState`:
- `isCopied`: Boolean state tracking copy success feedback
- Managed through the `useHandleCopy` custom hook
- No external state management needed due to isolated component functionality

The component follows the **local state** pattern from our architecture guidelines, as the copy state is:
- Component-specific and temporary
- Not shared across components
- Reset automatically after user interaction

## Side Effects

### Clipboard Operations
- Integrates with browser Clipboard API through `useHandleCopy` hook
- Temporary state changes for user feedback
- Automatic reset of copy feedback state

### Visual Transitions
- CSS transitions for smooth hover and copy state changes
- Dynamic className applications based on interaction state
- Progressive icon and text visibility changes

## Dependencies

### Custom Hooks
- `useHandleCopy`: Handles clipboard operations and state management

### UI Components
- `Badge`: Displays HTTP method with consistent styling
- `Typography`: Provides text styling for feedback messages

### Icons
- `PiCheckFill`: Success state indicator
- `PiFileCopyFill` / `PiFileCopyLine`: Copy action icons with hover states

### Utilities
- `cn`: Conditional className utility for dynamic styling

## Integration

### Developer Documentation Context
- Primary use in API documentation pages
- Integration with developer portal interfaces
- Part of the broader developers feature domain

### Design System Integration
- Follows established color tokens (`pgText-*`, `pgIcon-*`, `pgStroke-*`)
- Consistent with Badge and Typography component patterns
- Maintains design system spacing and interaction patterns

### Feature Domain
Located in `/components/developers/` following our domain-based organization:
- Specific to developer-facing functionality
- Reusable across different API documentation contexts
- Isolated from general UI components

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriate use of 'use client' for interactive functionality
✅ **Component Decomposition**: Single responsibility for API endpoint display
✅ **Local State**: Proper use of local state for temporary UI feedback
✅ **Domain Organization**: Correctly placed in developers feature domain

### Implementation Patterns
✅ **TypeScript Interface**: Well-defined props with proper typing
✅ **Conditional Rendering**: Clean handling of optional method badge
✅ **CSS Classes**: Proper use of conditional styling with `cn` utility
✅ **Accessibility**: Proper disabled state handling and visual feedback

### Integration Guidelines
- Use for API endpoint display in developer documentation
- Combine with other developer components for comprehensive API docs
- Maintain consistent styling through design system tokens
- Consider responsive behavior in mobile developer interfaces