# AlertHistoryDetailPanel Component

## Purpose
The `AlertHistoryDetailPanel` component displays detailed information about a triggered signal notification, including delivery status, matched articles, key stories, and developer debugging information. It serves as the primary interface for viewing alert history and managing signal configuration.

## Component Type
**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive state management (toggles, accordions)
- Browser APIs (localStorage, router navigation)
- Dynamic user interactions (developer mode, notifications)
- Real-time UI updates based on user actions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalNotification` | `SignalNotification` | Yes | The signal notification object containing alert details, metadata, and contact point information |
| `isMobile` | `boolean` | No | Optional flag to apply mobile-specific styling and layout adjustments |

## Usage Example

```tsx
import { AlertHistoryDetailPanel } from '@/components/signals/details/alert-detail-panel';

// Basic usage
function AlertHistoryPage({ notificationId }: { notificationId: string }) {
  const { data: notification } = useSignalNotification(notificationId);
  
  if (!notification) return <div>Loading...</div>;

  return (
    <AlertHistoryDetailPanel 
      signalNotification={notification}
      isMobile={false}
    />
  );
}

// Mobile responsive usage
function MobileAlertView({ notification }: { notification: SignalNotification }) {
  return (
    <div className="mobile-container">
      <AlertHistoryDetailPanel 
        signalNotification={notification}
        isMobile={true}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Alert Information Display**: Shows trigger timestamp and alert metadata
- **Delivery Status Tracking**: Displays notification delivery status across multiple contact points (email, webhook, FASTN)
- **Article Matching**: Lists articles that triggered the signal with source information and bias indicators
- **Key Stories Integration**: Shows related stories grouped by cluster ID
- **Developer Mode**: JSON view of raw API responses for debugging
- **Signal Configuration**: Quick access to edit signal settings
- **Notification Management**: Dismissible notifications for unconfigured delivery methods

### Interactive Elements
- Expandable accordions for delivery details
- Developer mode toggle for technical users
- Clickable article and story cards for navigation
- Copy-to-clipboard functionality for JSON data
- Signal editing shortcuts

## State Management

### Local State
- `isDeveloperToggled`: Controls developer mode visibility
- `closedSignalNotificationIds`: Persisted in localStorage to track dismissed notifications

### TanStack Query Integration
- `useSignalById`: Fetches complete signal data
- `useArticles`: Retrieves articles that matched the signal
- `useSources`: Gets source metadata for bias and paywall indicators
- `useStoriesListWithPageInfo`: Fetches related key stories

### Custom Hooks
- `useImagePlaceholder`: Generates fallback images for articles
- `useSwitchSignalEditMode`: Manages signal editing navigation
- `useSignalCreation`: Handles signal limit validation

## Side Effects

### Navigation
- Routes to story detail pages on story card clicks
- Navigates to signal editing interface
- Opens external article links in new tabs

### Storage Operations
- Persists dismissed notification IDs to localStorage
- Manages user preferences for notification visibility

### API Interactions
- Fetches signal, article, and story data reactively
- Validates signal limits before editing operations

## Dependencies

### UI Components
- **Accordion**: For collapsible delivery status sections
- **Badge**: Status indicators for delivery states
- **Button**: Action triggers and navigation
- **Typography**: Consistent text styling
- **ImageWithFallback**: Article thumbnails with placeholders

### Custom Components
- `KeyStoriesCard`: Story display cards
- `Notification`: Dismissible alert messages
- `SourceCitationItem`: Source attribution display
- `DynamicJsonView`: Code-split JSON viewer

### Services & Hooks
- Query hooks for data fetching
- Usage context for signal limits
- Router for navigation

## Integration

### Signal Management Flow
```
Signal Notification → Detail Panel → Edit Mode → Signal Configuration
```

### Data Flow Architecture
```
API Services → TanStack Query → Component State → UI Updates
```

### Navigation Integration
- Integrates with the main tab navigation system
- Connects to story and signal detail routing
- Maintains deep-linking capabilities

## Best Practices

### Architecture Adherence
✅ **State Management**: Proper separation of server state (TanStack Query) and UI state (React state)  
✅ **Component Decomposition**: Flat structure with specialized sub-components  
✅ **Performance**: Dynamic imports for heavy JSON viewer component  
✅ **Data Fetching**: Conditional queries based on data availability  

### Code Organization
- Clear separation of concerns between display and business logic
- Memoized computations for expensive operations
- Proper error boundaries and loading states
- Responsive design patterns

### User Experience
- Progressive disclosure with accordion patterns
- Context-aware notifications
- Mobile-first responsive design
- Accessibility considerations with proper ARIA labels

## Exports

- `PUBLIC_SIGNALS_CLOSED_NOTIFICATIONS`: Constant for localStorage key
- `DynamicJsonView`: Code-split JSON viewer component
- `AlertHistoryDetailPanel`: Main component export