# RequestsCount Component

## Purpose

RequestsCount is a display component that renders formatted API request statistics with an optional HTTP status indicator. It's designed to show request counts in developer dashboards and analytics interfaces, providing a clean visual representation of API usage metrics with proper number formatting and status-based styling.

## Component Type

**Server Component** - This is a pure presentational component that receives data as props without any client-side interactivity, state management, or browser APIs. It follows the default server component pattern for display-only UI elements.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `count` | `number` | ✅ | - | The request count to display, will be formatted using US number format |
| `status` | `number` | ❌ | - | HTTP status code to display with status indicator (ignored if label is provided) |
| `size` | `'md' \| 'lg'` | ❌ | `'md'` | Size variant affecting typography and padding |
| `label` | `string` | ❌ | - | Custom label text, takes precedence over status display |
| `active` | `boolean` | ❌ | `false` | Whether the component appears in active/selected state |
| `className` | `string` | ❌ | - | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes |

## Usage Example

```tsx
import { RequestsCount, formatter } from '@/components/developers/api-requests/requests-count';

export function ApiDashboard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Basic usage with HTTP status */}
      <RequestsCount 
        status={200} 
        count={12500} 
      />
      
      {/* Large variant with custom label */}
      <RequestsCount
        size="lg"
        label="Total Requests"
        count={50000}
        active={true}
      />
      
      {/* Error status display */}
      <RequestsCount
        status={500}
        count={23}
        className="border-red-200"
      />
      
      {/* Using the exported formatter separately */}
      <div>
        Formatted count: {formatter.format(1234567)}
      </div>
    </div>
  );
}
```

## Functionality

- **Number Formatting**: Automatically formats numbers using US locale (e.g., 1,234,567)
- **Status Display**: Shows HTTP status codes with appropriate styling via HttpRequestStatus component
- **Label Override**: Custom labels take precedence over status display
- **Size Variants**: Two size options (`md`, `lg`) with different typography and spacing
- **Active State**: Visual indication when component is in selected/active state
- **Responsive Design**: Flexible layout that adapts to container constraints

## State Management

**No State Management** - This is a pure presentational component that relies entirely on props. It doesn't manage any internal state, server state, or client state, following the stateless component pattern for display elements.

## Side Effects

**No Side Effects** - The component performs no API calls, browser interactions, or external operations. It's a pure rendering component that transforms props into JSX.

## Dependencies

### Internal Dependencies
- `@/components/ui/http-request-status` - Displays HTTP status codes with appropriate styling
- `@/components/ui/typography` - Provides consistent text styling
- `@/lib/utils/cn` - Utility for conditional className merging

### External Dependencies
- React's `HTMLAttributes` type for prop extension
- Browser's `Intl.NumberFormat` API for number formatting

## Integration

This component integrates into the developer tools ecosystem:

- **API Analytics Dashboard**: Displays request counts by status code, endpoint, or time period
- **Monitoring Interfaces**: Shows real-time or historical API usage statistics  
- **Developer Console**: Provides request metrics in API management interfaces
- **Reporting Components**: Used in larger dashboard layouts for API insights

The component follows the domain-specific pattern, living under `/developers/api-requests/` rather than `/ui/` since it's tailored for API request analytics rather than general-purpose use.

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: No client-side features, properly remains server component
- ✅ **Component Decomposition**: Flat structure using Typography and HttpRequestStatus as building blocks
- ✅ **Domain Organization**: Correctly placed in feature-specific directory structure
- ✅ **Prop Interface**: Clean, well-typed interface extending HTML attributes

### Usage Patterns
- Use `label` prop for custom contexts, `status` prop for HTTP status display
- Leverage the exported `formatter` for consistent number formatting across related components
- Apply `active` state for selection indicators in filterable lists
- Combine with grid layouts for dashboard-style metric displays

### Performance Considerations
- Lightweight render with no state or effects
- Number formatting is handled by native `Intl.NumberFormat` for optimal performance
- Conditional styling uses efficient className merging