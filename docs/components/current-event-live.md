# CurrentEventLive Component

## Purpose
The `CurrentEventLive` component is an SVG icon that visually represents a live event status indicator. It renders as a circular icon with multiple overlapping circles at reduced opacity to create a subtle "live" or "active" visual effect, commonly used to indicate real-time or ongoing events in the application interface.

## Component Type
**Server Component** - This is a pure presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be safely rendered on the server as it only accepts props and returns static SVG markup.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, etc. Spreads directly to the root `<svg>` element |

## Usage Example

```tsx
import { CurrentEventLive } from '@/components/icons/current-event-live';

// Basic usage
export function EventCard() {
  return (
    <div className="flex items-center gap-2">
      <CurrentEventLive />
      <span>Live Event</span>
    </div>
  );
}

// With custom styling
export function LiveEventBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 rounded-full">
      <CurrentEventLive 
        className="text-red-600" 
        width={16} 
        height={16} 
      />
      <span className="text-sm font-medium text-red-800">LIVE</span>
    </div>
  );
}

// As clickable element
export function LiveEventButton({ onViewLive }: { onViewLive: () => void }) {
  return (
    <button 
      onClick={onViewLive}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
    >
      <CurrentEventLive className="text-green-500" />
      <span>Join Live Event</span>
    </button>
  );
}
```

## Functionality
- **Visual Indicator**: Provides a standardized visual representation for live/active events
- **Scalable Vector**: Renders crisply at any size as an SVG
- **Theme Integration**: Uses `currentColor` for fill, automatically inheriting text color from parent elements
- **Accessibility Ready**: Accepts all standard SVG props for ARIA attributes and event handlers
- **Customizable**: Supports all SVG styling and sizing options through props spreading

## State Management
**None** - This is a stateless presentational component. It doesn't manage any internal state or interact with external state management systems (TanStack Query, Zustand, etc.).

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions. It only renders SVG markup based on the provided props.

## Dependencies
- **React**: Uses `SVGProps` type from React for prop typing
- **No External Dependencies**: Self-contained icon component with no additional dependencies

## Integration
This icon component integrates into the larger application architecture as:
- **UI Layer Component**: Lives in `/components/icons/` following the flat component organization pattern
- **Design System Element**: Part of the icon library for consistent visual language
- **Feature Integration**: Used across various domains (events, notifications, dashboards) to indicate live status
- **Composable Element**: Designed to be easily composed with other UI components in layouts

```tsx
// Example integration in feature components
import { CurrentEventLive } from '@/components/icons/current-event-live';
import { Badge } from '@/components/ui/badge';

export function EventStatusIndicator({ isLive }: { isLive: boolean }) {
  if (!isLive) return null;
  
  return (
    <Badge variant="success" className="gap-1">
      <CurrentEventLive width={12} height={12} />
      Live
    </Badge>
  );
}
```

## Best Practices
- ✅ **Server Component**: Correctly implemented as server component since it requires no client-side interactivity
- ✅ **Flat Architecture**: Properly placed in `/components/icons/` following flat over nested structure
- ✅ **Reusable Design**: Generic icon that can be reused across multiple domains and features
- ✅ **Props Spreading**: Uses TypeScript's `SVGProps` and spreads props for maximum flexibility
- ✅ **Semantic Naming**: Clear component name that describes its purpose and usage context
- ✅ **Consistent Styling**: Uses `currentColor` for theme integration and consistent visual behavior
- ✅ **Accessibility Ready**: Accepts all standard SVG props for proper accessibility implementation when needed

**Recommended Usage Patterns:**
- Combine with text or badges for clear context
- Use consistent sizing within the same interface section
- Apply appropriate colors to convey status (red/green for live states)
- Add proper ARIA labels when used as standalone interactive elements