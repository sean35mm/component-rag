# MyApiKey Component

## Purpose

The `MyApiKey` component displays a summary view of an organization's API keys with their associated request statistics. It presents up to 3 API keys in a tabular format showing key names, token previews, and request counts for the current billing cycle. The component serves as a dashboard widget for developers to quickly monitor their API key usage.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes multiple React hooks (`useMemo`, custom query hooks)
- Manages interactive state through TanStack Query
- Renders dynamic content based on API responses
- Requires client-side data fetching and state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `Omit<BlockProps, 'icon' \| 'isLoading' \| 'skeletonSizes' \| 'title'>` | No | All Block component props except the excluded ones that are managed internally |

**Note**: The component extends `BlockProps` but excludes `icon`, `isLoading`, `skeletonSizes`, and `title` as these are handled internally by the component.

## Usage Example

```tsx
import { MyApiKey } from '@/components/developers/my-api-key';

// Basic usage in a dashboard
function DeveloperDashboard() {
  return (
    <div className="grid gap-4">
      <MyApiKey />
      {/* Other dashboard widgets */}
    </div>
  );
}

// With additional Block props
function CustomDashboard() {
  return (
    <MyApiKey 
      className="custom-styling"
      // Any other BlockProps except excluded ones
    />
  );
}
```

## Functionality

### Core Features
- **API Key Display**: Shows up to 3 most recent API keys with names and token previews
- **Request Statistics**: Displays formatted request counts for the current billing cycle
- **Empty State Handling**: Renders `EmptyApiKeys` component when no API keys exist
- **Loading States**: Shows skeleton loading while fetching data
- **Navigation**: Provides "Manage all keys" action link to full API keys management page

### Data Processing
- Combines API key data with request statistics
- Limits display to first 3 API keys
- Formats request counts using `Intl.NumberFormat`
- Calculates billing period dates from subscription configuration

### UI Layout
- Tabular presentation with three columns: Key name, Token, Requests
- Responsive design with fractional width classes
- Consistent typography using the Typography component
- Footer note explaining billing cycle context

## State Management

**TanStack Query Integration**:
- `useOrganizationApiKeys`: Fetches organization's API keys data
- `useRequestStatsByApiKey`: Retrieves request statistics for the billing period
- Automatic loading state management and error handling
- Efficient data caching and background updates

**Custom Hooks**:
- `useSubscriptionDetails`: Provides subscription configuration for billing period calculation

**Local State**:
- `useMemo` for computed values (billing period dates, combined API key data)
- No local component state management needed

## Side Effects

### API Calls
- Organization API keys retrieval
- Request statistics fetching based on billing period
- Automatic refetching based on TanStack Query configuration

### Date Calculations
- Billing period date computation from subscription metadata
- Dynamic date range for statistics queries

## Dependencies

### Internal Components
- `Block`: Base container component with consistent styling and layout
- `Typography`: Text rendering with consistent styling
- `EmptyApiKeys`: Empty state component
- `PiKey2Line`: Icon component

### Hooks & Utilities
- `useOrganizationApiKeys`: API keys data fetching
- `useRequestStatsByApiKey`: Request statistics fetching  
- `useSubscriptionDetails`: Subscription configuration
- `billingPeriodToDate`: Date utility for billing period calculation
- `formatter`: Exported number formatter utility

## Integration

### Dashboard Integration
- Designed as a dashboard widget component
- Fits into grid-based layouts alongside other summary components
- Provides quick overview before navigating to detailed views

### Navigation Flow
- Links to `/developers/api-keys` for comprehensive API key management
- Part of the developers section navigation hierarchy

### Data Flow
- Consumes organization-level API key data
- Integrates with billing and subscription systems
- Coordinates with request analytics services

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` appropriately for interactive features
- ✅ **Component Decomposition**: Leverages `Block` base component and delegates empty state to separate component
- ✅ **TanStack Query Integration**: Proper server state management with loading and error states
- ✅ **Reusable Utilities**: Exports `formatter` utility for reuse across components

### Performance Optimization
- ✅ **Memoized Computations**: Uses `useMemo` for expensive billing date calculations and data transformations
- ✅ **Efficient Data Fetching**: Leverages TanStack Query caching and background updates
- ✅ **Limited Data Display**: Shows only top 3 API keys to prevent UI overflow

### User Experience
- ✅ **Loading States**: Proper skeleton loading during data fetching
- ✅ **Empty States**: Graceful handling of no-data scenarios
- ✅ **Clear Information Hierarchy**: Well-structured tabular layout with clear headers
- ✅ **Contextual Information**: Includes billing cycle context for request statistics

### Code Quality
- ✅ **Type Safety**: Proper TypeScript interfaces and prop typing
- ✅ **Error Boundaries**: Relies on TanStack Query error handling
- ✅ **Clean Separation**: Clear separation between data fetching, processing, and presentation