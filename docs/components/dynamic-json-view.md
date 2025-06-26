# DynamicJsonView Component

## Purpose

The `DynamicJsonView` component provides a visual JSON viewer for displaying structured data in a collapsible, formatted tree interface. It serves as a read-only display component for JSON data within signal details, offering syntax highlighting and hierarchical navigation of complex objects.

## Component Type

**Client Component** - This component requires browser-side rendering due to its dependency on the `react-json-view` library, which provides interactive features like collapsible tree nodes and dynamic rendering that cannot be server-side rendered.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `object` | Yes | The JSON object to be displayed in the tree view |

## Usage Example

```tsx
import DynamicJsonView from '@/components/signals/details/dynamic-json-view';

// Basic usage with signal data
function SignalDetailsPanel({ signal }) {
  return (
    <div className="signal-details">
      <h3>Signal Payload</h3>
      <DynamicJsonView data={signal.payload} />
      
      <h3>Signal Metadata</h3>
      <DynamicJsonView data={signal.metadata} />
    </div>
  );
}

// Usage with API response data
function ApiResponseViewer({ response }) {
  return (
    <div className="api-response-container">
      <DynamicJsonView data={response} />
    </div>
  );
}

// Usage with configuration objects
function ConfigurationDisplay({ config }) {
  return (
    <section>
      <h2>Current Configuration</h2>
      <DynamicJsonView data={config} />
    </section>
  );
}
```

## Functionality

- **JSON Visualization**: Renders JSON data in a hierarchical tree structure with syntax highlighting
- **Read-only Display**: Provides view-only access to JSON data without editing capabilities
- **Clipboard Integration**: Disables clipboard functionality to prevent data copying (security consideration)
- **Automatic Formatting**: Handles nested objects and arrays with proper indentation and collapsible nodes
- **Type Recognition**: Distinguishes between different data types (strings, numbers, booleans, arrays, objects)

## State Management

This component is **stateless** and relies entirely on props for data. It does not use:
- TanStack Query (data is passed via props)
- Zustand (no global state requirements)
- Local state (purely presentational)

The component follows the pattern of receiving data from parent components that manage the actual data fetching and state.

## Side Effects

**None** - This is a pure presentational component with no side effects:
- No API calls
- No external data mutations
- No browser storage interactions
- No event handlers that modify external state

## Dependencies

### External Libraries
- `react-json-view`: Third-party library for JSON visualization and tree rendering

### Internal Dependencies
- React (core framework)
- No internal component dependencies
- No custom hooks or services

## Integration

### Application Architecture Role
```
Signal Management Flow:
├── Signal List Components
├── Signal Details Container
│   ├── Signal Header
│   ├── Signal Metadata
│   └── DynamicJsonView ← Displays structured data
└── Signal Actions
```

### Data Flow Integration
1. **Data Source**: Receives JSON data from parent components (typically signal details containers)
2. **Display Layer**: Acts as the final presentation layer for structured data
3. **No Data Transformation**: Displays data as-is without modification or processing

### Common Integration Patterns
```tsx
// With TanStack Query data
function SignalDetails({ signalId }) {
  const { data: signal } = useQuery(['signal', signalId], fetchSignal);
  
  return (
    <div>
      {signal && <DynamicJsonView data={signal.details} />}
    </div>
  );
}

// With error boundaries
function SafeJsonView({ data }) {
  return (
    <ErrorBoundary fallback={<div>Error displaying JSON</div>}>
      <DynamicJsonView data={data} />
    </ErrorBoundary>
  );
}
```

## Best Practices

### Architectural Adherence
- ✅ **Single Responsibility**: Focused solely on JSON visualization
- ✅ **Prop-based Data Flow**: Receives all data via props, no side effects
- ✅ **Domain Organization**: Correctly placed in `/signals/details/` following feature-based structure
- ✅ **Component Decomposition**: Small, focused component that can be easily composed

### Usage Recommendations
1. **Data Validation**: Ensure parent components validate that `data` prop is a valid object
2. **Error Handling**: Wrap in error boundaries when displaying dynamic/external data
3. **Performance**: Consider memoization for large objects that don't change frequently
4. **Security**: Component already disables clipboard to prevent data leakage

### Anti-patterns to Avoid
- ❌ Don't add state management to this component
- ❌ Don't perform data fetching within this component
- ❌ Don't add editing capabilities (breaks single responsibility)
- ❌ Don't add business logic or data transformation

This component exemplifies the "Lego block" philosophy by providing a single, reusable piece of functionality that can be composed into larger features while maintaining clear boundaries and responsibilities.