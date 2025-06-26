# SignalInfo Component

## Purpose

The `SignalInfo` component displays detailed information about a signal in preview mode, including the signal name, query details with syntax highlighting, and associated filters. It serves as an informational header component for signal previews, providing users with a clear view of the signal's configuration and current state.

## Component Type

**Client Component** - Uses the `'use client'` directive because it renders interactive UI elements like the `RichTextarea` with custom syntax highlighting that requires client-side JavaScript execution.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The display name of the signal |
| `signalArticlesQuery` | `Partial<ComplexAllEndpointQuery>` | Yes | Query object containing search parameters and filters for the signal |
| `showReprints` | `boolean` | Yes | Flag indicating whether reprints should be displayed in the signal results |

## Usage Example

```tsx
import { SignalInfo } from '@/components/signals/preview/signal-info';

export function SignalPreview() {
  const signalQuery = {
    q: 'technology AND (AI OR "artificial intelligence")',
    sources: ['reuters', 'bloomberg'],
    dateRange: '7d'
  };

  return (
    <div className="signal-preview">
      <SignalInfo
        name="AI Technology News"
        signalArticlesQuery={signalQuery}
        showReprints={false}
      />
      {/* Additional preview content */}
    </div>
  );
}
```

## Functionality

- **Live Preview Badge**: Displays a prominent "LIVE PREVIEW" badge to indicate the current state
- **Signal Title Display**: Shows the signal name with proper typography styling
- **Syntax-Highlighted Query**: Renders the query string with custom color coding for operators and quotes
- **Filter Integration**: Includes the `SignalFilters` component to display additional query parameters
- **Read-Only Interface**: Presents information in a non-editable format suitable for preview contexts

## State Management

This component is **stateless** and relies entirely on props for its data. It doesn't manage any internal state, TanStack Query, or Zustand stores. All state management is handled by parent components that provide the necessary signal data.

## Side Effects

**No side effects** - This is a pure presentation component that doesn't perform API calls, mutations, or other side effects. It focuses solely on displaying the provided signal information.

## Dependencies

### UI Components
- `Badge` - For the live preview indicator
- `RichTextarea` - For syntax-highlighted query display
- `Typography` - For consistent text styling

### Utilities
- `createCustomColorRenderer` - Custom syntax highlighting for query strings

### Child Components
- `SignalFilters` - Displays additional query filters and parameters

### Types
- `ComplexAllEndpointQuery` - Type definition for query structure

## Integration

The `SignalInfo` component fits into the signal preview architecture as a header component:

```
Signal Preview Flow:
├── SignalPreview (Parent)
│   ├── SignalInfo (Header with query details)
│   ├── SignalResults (Article listings)
│   └── SignalActions (Controls)
```

It serves as the informational top section of signal previews, providing context before users see the actual results. The component is designed to work within the broader signals feature domain.

## Best Practices

### ✅ Architecture Adherence
- **Domain Organization**: Properly placed in `/signals/preview/` following feature-based structure
- **Component Decomposition**: Flat structure with clear separation of concerns
- **Reusable UI**: Uses shared UI components from `/ui/` directory
- **TypeScript Integration**: Fully typed with proper interface definitions

### ✅ Design Patterns
- **Single Responsibility**: Focuses solely on displaying signal information
- **Composition**: Composes smaller UI components rather than building monolithic structure
- **Prop Drilling Prevention**: Accepts only necessary data through props
- **Custom Styling**: Uses Tailwind classes with proper component-specific styling

### ⚠️ Considerations
- The component exports both `customRenderer` and `SignalInfo` - consider if the renderer should be internal
- Monitor performance if query strings become very large due to syntax highlighting
- Ensure accessibility standards are met for the read-only textarea usage