# ErrorScreen Component

## Purpose

The ErrorScreen component provides a comprehensive error display interface that presents users with a friendly error message and helpful navigation options when data fetching fails or other errors occur. It serves as a fallback UI that maintains user engagement by offering alternative pathways to navigate the application.

## Component Type

**Client Component** - Uses the `'use client'` directive implicitly through its interactive elements (onClick handlers) and Next.js components that require client-side hydration. The component needs to handle user interactions for the refresh functionality and navigation links.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the root container |
| `code` | `string \| number` | No | Error code to display to users for debugging purposes |
| `onRefresh` | `() => void` | No | Callback function triggered when user clicks the refresh button |

## Usage Example

```tsx
import { ErrorScreen } from '@/components/error/error-screen';

// Basic error screen
function DataErrorFallback() {
  return <ErrorScreen code="404" />;
}

// With refresh functionality
function QueryErrorFallback() {
  const { refetch } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  return (
    <ErrorScreen 
      code="FETCH_ERROR"
      onRefresh={() => refetch()}
      className="min-h-screen"
    />
  );
}

// In error boundary
function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <ErrorScreen 
      code={error.code}
      onRefresh={resetErrorBoundary}
    />
  );
}
```

## Functionality

- **Error Display**: Shows a user-friendly error message with optional error code
- **Navigation Links**: Provides quick access to key application sections (Home, Account, Trending, Blog)
- **Refresh Capability**: Optional refresh button to retry failed operations
- **Responsive Design**: Adapts layout for mobile and desktop viewports
- **Visual Hierarchy**: Uses typography and spacing to guide user attention
- **Brand Consistency**: Includes company logo and maintains design system standards

## State Management

**No State Management** - This is a purely presentational component that:
- Receives all data through props
- Delegates state management to parent components
- Uses callback props for user interactions
- Maintains no internal state

## Side Effects

**No Direct Side Effects** - The component:
- Does not make API calls
- Does not perform data fetching
- Delegates side effects to parent components through callback props
- Uses Next.js Link components for client-side navigation

## Dependencies

### UI Components
- `Typography` - Text styling and hierarchy
- `Separator` - Visual dividers between sections
- `IconPerigonLogoFull` - Company branding
- `PiRefreshLine` - Refresh action icon

### Next.js Components
- `NextImage` - Optimized image rendering
- `NextLink` - Client-side navigation

### Utilities
- `cn` - Conditional className composition
- `GENERIC_TABS_TO_HREF` - Tab navigation mapping
- `PRE_OPENED_GENERIC_TABS_TO_HREF` - Pre-configured navigation mapping

### Types
- `PreOpenedGenericTabType` - Navigation type definitions
- `TabOptions` - Application tab configurations

## Integration

### Error Boundary Integration
```tsx
function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorScreen 
          code={error.code}
          onRefresh={resetErrorBoundary}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Query Error Integration
```tsx
function DataComponent() {
  const { data, error, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  if (error) {
    return (
      <ErrorScreen 
        code="QUERY_ERROR"
        onRefresh={() => refetch()}
      />
    );
  }

  return <DataDisplay data={data} />;
}
```

## Best Practices

### Architecture Adherence
- ✅ **Flat Component Structure**: Single-level component without unnecessary nesting
- ✅ **Separation of Concerns**: Pure presentation logic, delegates behavior to parents
- ✅ **Prop-Based Configuration**: Flexible through props rather than internal state
- ✅ **Design System Integration**: Uses established Typography and UI components

### Usage Patterns
- ✅ **Error Boundary Fallback**: Primary use case for application-level error handling
- ✅ **Query Error Display**: Integration with TanStack Query error states
- ✅ **Conditional Rendering**: Show/hide refresh functionality based on context
- ✅ **Responsive Design**: Adapts to different screen sizes appropriately

### Performance Considerations
- ✅ **Optimized Images**: Uses Next.js Image with proper sizing and priority
- ✅ **Conditional Rendering**: Only renders refresh section when callback provided
- ✅ **Static Navigation**: Uses pre-computed href mappings for consistent routing