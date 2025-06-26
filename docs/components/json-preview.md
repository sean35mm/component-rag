# JsonPreview Component

## Purpose

The `JsonPreview` component is a specialized code viewer designed for developers' logs and API request visualization. It renders formatted JSON with syntax highlighting and provides a convenient copy-to-clipboard functionality for API endpoints. This component is primarily used in developer tools to display formatted request data with an integrated copy mechanism for quick testing.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires browser APIs (`navigator.clipboard`) and manages interactive state (copy feedback). The component needs client-side JavaScript for the copy functionality and user interaction handling.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `jsonString` | `string` | ✅ | - | The JSON string to be displayed with syntax highlighting |
| `showCopyButton` | `boolean` | ❌ | `true` | Controls visibility of the copy button |
| `query` | `string` | ✅ | - | Query parameters for the API request URL construction |
| `endpoint` | `string` | ✅ | - | API endpoint path for URL construction |
| `className` | `string` | ❌ | - | Additional CSS classes for styling |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes |

## Usage Example

```tsx
import { JsonPreview } from '@/components/developers/logs/json-preview';

// In a developer logs page
export default function LogsPage() {
  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token'
    },
    body: {
      user_id: '12345',
      action: 'create_session'
    }
  };

  return (
    <div className="space-y-6">
      <h2>API Request Details</h2>
      
      <JsonPreview
        jsonString={JSON.stringify(requestData, null, 2)}
        query="user_id=12345&action=create_session"
        endpoint="/v1/api/sessions/"
        showCopyButton={true}
        className="rounded-lg bg-white"
      />
    </div>
  );
}

// In a request builder interface
function RequestBuilder({ selectedRequest }: { selectedRequest: ApiRequest }) {
  return (
    <JsonPreview
      jsonString={selectedRequest.formattedJson}
      query={selectedRequest.queryParams}
      endpoint={selectedRequest.endpoint}
      showCopyButton={true}
    />
  );
}
```

## Functionality

### Core Features
- **Syntax Highlighted JSON**: Uses `react-syntax-highlighter` with custom theme matching design system colors
- **Copy API Endpoint**: Constructs and copies full API URL to clipboard for testing
- **Visual Feedback**: Shows "Copied" state with checkmark icon for 2 seconds
- **Responsive Design**: Handles long lines with word breaking and wrapping
- **Line Numbers**: Displays line numbers for easier reference

### Custom Theme Integration
- Integrates with design system CSS variables (`--color-pg-*`)
- Consistent typography using `px_grotesk_mono` font family
- Color-coded syntax elements (strings in sapphire, numbers/booleans in gold)
- Proper contrast and accessibility considerations

## State Management

**Local State Only** - Uses React's `useState` for simple UI state:
- `copied`: Boolean flag to track copy button feedback state
- Temporary state that auto-resets after 2 seconds
- No complex state management needed as this is a presentation component

## Side Effects

### Clipboard API Integration
```tsx
const handleCopy = useCallback(() => {
  navigator.clipboard.writeText(
    `${env.NEXT_PUBLIC_API_BASE_URL}${endpoint.replace('/v1', '').slice(0, -1)}?${query}`
  );
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}, [query, endpoint]);
```

- **Browser API**: Uses `navigator.clipboard.writeText()`
- **URL Construction**: Combines base URL, endpoint, and query parameters
- **Automatic Reset**: 2-second timeout to reset copy feedback state

## Dependencies

### External Libraries
- `react-syntax-highlighter/dist/esm/prism`: Code syntax highlighting
- Custom UI components: `Button`, `Typography`
- Icons: `PiCheckLine`, `PiFileCopyLine`

### Internal Dependencies
- `@/env`: Environment configuration for API base URL
- `@/lib/utils/cn`: Class name utility for conditional styling
- Design system color variables via CSS custom properties

## Integration

### Developer Tools Ecosystem
- **Logs Interface**: Primary use in developer logs and request inspection
- **API Documentation**: Can be used in interactive API documentation
- **Debug Tools**: Integrates with debugging interfaces for request visualization

### Design System Integration
- Uses consistent spacing, typography, and color tokens
- Follows button and typography component patterns
- Maintains visual hierarchy with proper contrast ratios

## Best Practices

### Architecture Adherence
✅ **Client Component Justification**: Properly uses client component only when needed for browser APIs  
✅ **Single Responsibility**: Focused solely on JSON preview with copy functionality  
✅ **Props Interface**: Clean, well-typed interface extending HTML attributes  
✅ **Reusability**: Generic enough for various JSON preview scenarios  

### Implementation Patterns
✅ **Custom Theme Export**: Allows theme reuse in other syntax highlighting contexts  
✅ **Callback Optimization**: Uses `useCallback` to prevent unnecessary re-renders  
✅ **Error Boundaries**: Should be wrapped in error boundaries when clipboard API fails  
✅ **Accessibility**: Provides visual feedback for copy actions  

### Usage Recommendations
- Wrap in error boundaries for clipboard API failure handling
- Consider debouncing rapid copy attempts
- Use loading states for large JSON payloads
- Implement keyboard shortcuts for power users (Ctrl+C)