# CurrentUsage Component

## Purpose

The `CurrentUsage` component displays an organization's API usage statistics in a visual dashboard format. It shows the current number of API requests versus the request limit for the current billing cycle, presented as both numerical values and an animated progress chart. This component serves as a key monitoring tool in the developer dashboard for tracking API consumption.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive visual elements with CSS animations
- Renders dynamic progress bars with staggered animation delays
- Requires browser-side rendering for the animated chart sections

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `Omit<BlockProps, 'icon' \| 'isLoading' \| 'title'>` | No | All Block component props except icon, isLoading, and title (which are controlled internally) |
| `className` | `string` | No | Additional CSS classes for styling |

## Usage Example

```tsx
import { CurrentUsage } from '@/components/developers/current-usage';

// Basic usage
export default function DeveloperDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CurrentUsage />
      {/* Other dashboard components */}
    </div>
  );
}

// With additional styling
export default function UsageSection() {
  return (
    <CurrentUsage 
      className="col-span-2" 
      // Any other BlockProps can be passed
    />
  );
}
```

## Functionality

### Core Features
- **Usage Display**: Shows current API requests vs. limit with formatted numbers
- **Visual Progress**: Animated chart with 36 sections representing usage percentage
- **Loading States**: Displays loading indicator while fetching data
- **Responsive Design**: Adapts chart spacing for different screen sizes
- **Staggered Animation**: Chart sections animate in sequence for visual appeal

### Visual Elements
- Speed icon (`PiSpeedUpFill`) representing performance/usage
- Numerical display with "X of Y requests" format
- 36-section horizontal bar chart with progressive fill animation
- Billing cycle context note

## State Management

### TanStack Query Integration
The component uses custom hooks that wrap TanStack Query:

```tsx
const useCurrentUsage = () => {
  // Fetches current request count from organization data
  const { data: numRequests } = useCurrentOrganization({
    select: (it) => it?.organization.tracking?.numRequests,
  });

  // Fetches API request limits for the organization
  const { data: requestLimit } = useCurrentOrganizationApiLimits({
    select: (it) => it.requestLimit,
  });

  // Returns combined data or undefined if either value is missing
  return {
    data: numRequests !== undefined && requestLimit !== undefined
      ? { numRequests, requestLimit }
      : undefined,
  };
};
```

### Data Flow
1. Queries organization tracking data for current usage
2. Queries API limits configuration
3. Combines data and handles loading states
4. Triggers re-renders when server state updates

## Side Effects

### API Interactions
- **Organization Data**: Fetches current organization's tracking information
- **API Limits**: Retrieves configured request limits for the organization
- **Automatic Refetching**: Leverages TanStack Query's background updates

### Visual Effects
- CSS animations for chart section reveals
- Staggered animation delays (15ms increments per section)
- Fade-in animations with backward fill mode

## Dependencies

### Internal Dependencies
```tsx
// UI Components
import { Block, BlockProps } from '@/components/ui/block';
import { Typography } from '@/components/ui/typography';

// Icons
import { PiSpeedUpFill } from '@/components/icons';

// Data Hooks
import {
  useCurrentOrganization,
  useCurrentOrganizationApiLimits,
} from '@/lib/query-hooks';

// Utilities
import { cn } from '@/lib/utils/cn';
```

### External Dependencies
- React for component logic
- Tailwind CSS for styling and animations

## Integration

### Developer Dashboard Context
- Part of the developers feature domain (`src/components/developers/`)
- Integrates with organization-level API management
- Connects to billing cycle tracking systems
- Provides real-time usage monitoring for API consumers

### Data Architecture
```
Organization Data → Tracking → numRequests
API Limits Config → requestLimit
Combined → Usage Visualization
```

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Uses Block as base, focuses on single responsibility  
✅ **State Management**: Proper TanStack Query usage for server state  
✅ **Reusability**: Extends BlockProps for consistent interface  
✅ **Domain Organization**: Correctly placed in developers feature folder  

### Performance Considerations
- Selective data querying with `select` functions
- Efficient re-rendering through proper data dependencies
- CSS animations over JavaScript for better performance
- Memoized array generation for chart sections

### Code Quality
- TypeScript interfaces for type safety
- Exported constants for configurability (`CHART_SECTIONS`, `NUMBER_FORMATTER`)
- Separated business logic into custom hook (`useCurrentUsage`)
- Proper loading state handling

### Accessibility
- Semantic HTML structure within Block component
- Color-coded visual feedback for usage levels
- Descriptive text for screen readers
- Responsive design for various devices