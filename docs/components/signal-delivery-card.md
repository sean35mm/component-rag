# SignalDeliveryCard Component

## Purpose
The `SignalDeliveryCard` component displays individual contact point information within a signal delivery management interface. It presents signal delivery method details including creation date, verification status, and provides access to management actions through an integrated options menu.

## Component Type
**Client Component** - Uses the `'use client'` directive to handle interactive elements like click events and hover states for the card options menu. While the component itself doesn't manage complex client state, it needs to support user interactions with the embedded `CardOptionsMenu`.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalDelivery` | `ContactPoint` | Yes | The contact point data containing delivery method information, verification status, and metadata |
| `className` | `string` | No | Additional CSS classes to apply to the card container |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes for additional customization |

## Usage Example

```tsx
import { SignalDeliveryCard } from '@/components/settings/signal-delivery/signal-delivery-list/signal-delivery-card';

// Within a signal delivery list component
function SignalDeliveryList({ contactPoints }: { contactPoints: ContactPoint[] }) {
  return (
    <div className="space-y-2">
      {contactPoints.map((contactPoint) => (
        <SignalDeliveryCard
          key={contactPoint.id}
          signalDelivery={contactPoint}
          className="hover:shadow-sm transition-shadow"
        />
      ))}
    </div>
  );
}

// Example ContactPoint data structure
const exampleContactPoint: ContactPoint = {
  id: 'cp_123',
  name: 'webhook.example.com/signals',
  createdAt: new Date('2024-01-15'),
  verified: true,
  type: 'webhook',
  // ... other ContactPoint properties
};
```

## Functionality

### Core Features
- **Contact Point Display**: Shows signal delivery method name with appropriate icon
- **Date Formatting**: Displays creation date in readable format (MMM d, yyyy)
- **Verification Status**: Visual indication of verification state with colored status badges
- **Action Menu**: Integrated options menu for management actions (edit, delete, verify, etc.)
- **Responsive Layout**: Flexible layout that adapts to different screen sizes

### Visual Elements
- **Status Badges**: Green "Verified" or yellow "Not Verified" stroke badges
- **Icon Representation**: Generic link icon for all delivery methods
- **Card Styling**: Rounded card with subtle border and hover effects
- **Typography Hierarchy**: Consistent text sizing and color scheme

## State Management
**No Internal State** - This is a pure presentational component that receives all data through props. State management for signal delivery data is handled at higher levels in the component hierarchy, typically through:
- TanStack Query for fetching contact points data
- Parent components managing list state and updates

## Side Effects
**No Direct Side Effects** - The component is purely presentational and doesn't perform API calls or mutations. Side effects are delegated to:
- `CardOptionsMenu` for action handling (edit, delete, verify operations)
- Parent components for data fetching and state updates

## Dependencies

### Internal Components
- `StatusBadge` - UI component for displaying verification status
- `Typography` - Consistent text styling component
- `CardOptionsMenu` - Action menu for card management operations
- `PiLinksLine` - Icon component for visual representation

### External Dependencies
- `date-fns/format` - Date formatting utility
- `@/lib/utils/cn` - CSS class name utility for conditional styling

### Type Dependencies
- `ContactPoint` - Type definition for signal delivery data structure

## Integration

### Application Architecture
```
Settings Page
├── Signal Delivery Management
    ├── SignalDeliveryList
        ├── SignalDeliveryCard (this component)
        │   ├── StatusBadge
        │   ├── Typography
        │   └── CardOptionsMenu
        └── [Other list items]
```

### Data Flow
1. **Data Source**: Contact points fetched via TanStack Query at list level
2. **Props Passing**: Individual contact point data passed down as `signalDelivery` prop
3. **Action Handling**: User actions bubble up through `CardOptionsMenu` to parent handlers
4. **State Updates**: Mutations trigger query invalidation, updating the entire list

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Properly decomposed with `CardOptionsMenu` as separate component
- ✅ **Client Component Usage**: Appropriate use of `'use client'` for interactive functionality
- ✅ **Props Interface**: Clean interface extending standard HTML attributes
- ✅ **Styling Patterns**: Uses design system colors and consistent spacing

### Code Quality
- **Accessibility**: Proper semantic structure with meaningful visual hierarchy
- **Performance**: Lightweight component suitable for list rendering
- **Maintainability**: Clear separation of concerns with delegated action handling
- **Reusability**: Generic enough for different contact point types

### Integration Patterns
- **Flat Architecture**: Avoids deep nesting by keeping card logic simple
- **Composition**: Uses UI components for consistent styling
- **State Isolation**: No internal state management, relies on props
- **Action Delegation**: Pushes complex logic to specialized child components