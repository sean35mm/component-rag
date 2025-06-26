# PinCard Component

## Purpose

The `PinCard` component is a feature-rich card component designed to display signal information in a grid layout. It presents signal metadata including status, type, last triggered information, and associated imagery in a visually appealing card format. The component serves as a primary interface element for signal management, allowing users to quickly assess signal status and navigate to detailed views.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Handles user interactions (click events for navigation)
- Uses the Next.js router for client-side navigation
- Manages local state through React hooks (useMemo)
- Requires browser APIs for interactive functionality

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | The display title/name of the signal |
| `href` | `string` | ✅ | The route path for navigation when card is clicked |
| `imageUrl` | `string \| null` | ❌ | Optional image URL for the signal's visual representation |
| `status` | `string` | ✅ | Current status of the signal (ACTIVE, DRAFT, STOPPED, ARCHIVED) |
| `lastTriggeredAt` | `string` | ❌ | ISO timestamp of when the signal was last triggered |
| `uuid` | `string` | ✅ | Unique identifier used for fallback image generation |
| `tags` | `Tag[]` | ✅ | Array of tags associated with the signal |
| `policyType` | `SelectionPolicyEnum` | ✅ | The selection policy type determining signal behavior |
| `schedulePolicy` | `SchedulePolicy` | ❌ | Optional scheduling configuration for the signal |
| `signalId` | `number` | ✅ | Numeric identifier for the signal |
| `signalType` | `SignalTypeEnum` | ✅ | Type classification of the signal |

## Usage Example

```tsx
import { PinCard } from '@/components/signals/pin-card';
import { SelectionPolicyEnum, SignalTypeEnum, SignalStatusEnum } from '@/lib/types';

// Basic usage in a signal dashboard
function SignalsDashboard() {
  const signals = useUserSignals();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {signals.map((signal) => (
        <PinCard
          key={signal.uuid}
          title={signal.name}
          href={signal.slug}
          imageUrl={signal.imageUrl}
          status={signal.status}
          lastTriggeredAt={signal.lastTriggeredAt}
          uuid={signal.uuid}
          tags={signal.tags}
          policyType={SelectionPolicyEnum.LATEST}
          schedulePolicy={signal.schedulePolicy}
          signalId={signal.id}
          signalType={SignalTypeEnum.ARTICLES_VOLUME}
        />
      ))}
    </div>
  );
}

// Usage with anomaly detection signal
<PinCard
  title="Tech Stock Volume Spike"
  href="tech-stock-volume-spike"
  status={SignalStatusEnum.ACTIVE}
  uuid="550e8400-e29b-41d4-a716-446655440000"
  tags={[{ id: 1, name: "Finance" }, { id: 2, name: "Technology" }]}
  policyType={SelectionPolicyEnum.AI_NEWSLETTER_SUMMARY}
  signalId={123}
  signalType={SignalTypeEnum.ARTICLES_VOLUME}
/>
```

## Functionality

### Core Features
- **Visual Signal Representation**: Displays signal information with imagery, status badges, and metadata
- **Status Indication**: Color-coded badges showing signal status (Active, Draft, Paused, Archived)
- **Signal Type Icons**: Contextual icons indicating signal behavior (Continuous, Most Important, Spike Detection)
- **Navigation**: Click-to-navigate functionality to detailed signal views
- **Responsive Design**: Adapts to different screen sizes with hover effects and transitions

### Signal Type Handling
- **Anomaly Signals**: Special handling for `ARTICLES_VOLUME` type with spike detection icons
- **Continuous Signals**: Shows "As it happens" icon for latest selection policy
- **Scheduled Signals**: Displays digest icons for AI newsletter summary policy

### Image Management
- **Fallback System**: Automatically generates fallback images using UUID-based random selection
- **Image Loading**: Uses `ImageWithFallback` component for robust image handling

## State Management

### TanStack Query Integration
```tsx
const { data: mostRecentSignalNotificationForSelectedSignal } = 
  useSignalsNotifications(signalNotificationParams);
```
- Fetches the most recent signal notification for last triggered information
- Automatically manages loading states and caching
- Follows our server state management patterns

### Local State
- **Memoized Computations**: Uses `useMemo` for expensive calculations like date formatting and signal type checks
- **Derived State**: Computes display values from props and server data

## Side Effects

### API Interactions
- **Signal Notifications Query**: Fetches recent notification data for last triggered timestamps
- **Automatic Refetching**: Leverages TanStack Query's background refetching capabilities

### Navigation Effects
- **Router Integration**: Uses Next.js router for programmatic navigation
- **URL Construction**: Builds proper routes using tab-to-href mapping utilities

## Dependencies

### UI Components
- `Badge` - Status indication with color variants
- `ImageWithFallback` - Robust image loading with fallback support
- `Typography` - Consistent text styling throughout the card

### Icons
- `IconAnomalyDetection` - Spike detection indicator
- `IconAsItHappens` - Continuous signal indicator  
- `IconScheduledDigest` - Scheduled signal indicator

### Hooks & Services
- `useSignalsNotifications` - TanStack Query hook for notification data
- `useRouter` - Next.js navigation hook

### Utilities
- `randomFallbackImage` - Generates deterministic fallback images
- `formatLastTriggered` - Date formatting for display
- `TABS_TO_HREF_BASE` - URL mapping constants

## Integration

### Application Architecture
- **Domain-Specific Component**: Lives in `/components/signals/` following domain organization
- **Feature Integration**: Integrates with signal management workflows and navigation patterns
- **Data Layer**: Connects to signal notification service through standardized query hooks

### Design System Compliance
- **Consistent Styling**: Uses design system tokens for colors, spacing, and typography
- **Component Composition**: Builds upon foundational UI components
- **Responsive Patterns**: Follows established responsive design patterns

## Best Practices

### Architecture Adherence
✅ **Client Component Usage**: Appropriately uses client directive for interactive functionality  
✅ **Component Decomposition**: Composes multiple UI components following Lego block principle  
✅ **Server State Management**: Uses TanStack Query for server data fetching  
✅ **Props Interface**: Well-defined TypeScript interface with clear contracts  

### Performance Optimizations
- **Memoized Calculations**: Prevents unnecessary re-computations of derived values
- **Efficient Queries**: Fetches minimal data (size: 1) for last triggered information
- **Image Optimization**: Uses Next.js Image component with fallback handling

### Code Quality
- **Type Safety**: Full TypeScript integration with enum-based status handling
- **Error Handling**: Graceful fallbacks for missing images and unknown statuses
- **Accessibility**: Semantic HTML structure with proper alt text for images

### Integration Patterns
- **Consistent Navigation**: Uses centralized routing utilities
- **Standardized Queries**: Follows established patterns for API parameter construction
- **Design System**: Leverages shared components and styling tokens