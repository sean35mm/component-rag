# PiCalendar2Line Icon Component

## Purpose
`PiCalendar2Line` is a React SVG icon component that renders a calendar icon with a line/outline style. It's part of the Pi icon collection and is designed to be used in date-related UI elements, calendar features, date pickers, and scheduling interfaces throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser-specific APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
- `className`: CSS classes for styling
- `style`: Inline styles
- `onClick`: Click event handler
- `aria-label`: Accessibility label
- `role`: ARIA role
- `width`/`height`: Override default 1em sizing

## Usage Example

```tsx
import { PiCalendar2Line } from '@/components/icons/pi/pi-calendar-2-line';

// Basic usage
export function DateSelector() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
      <PiCalendar2Line className="w-5 h-5 text-gray-600" />
      <span>Select Date</span>
    </button>
  );
}

// With custom styling and accessibility
export function CalendarButton() {
  return (
    <button 
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Open calendar"
    >
      <PiCalendar2Line 
        className="w-6 h-6 text-blue-600" 
        aria-hidden="true"
      />
    </button>
  );
}

// In a form field
export function DateInput() {
  return (
    <div className="relative">
      <input 
        type="date" 
        className="pl-10 pr-4 py-2 border rounded-lg w-full"
        placeholder="Select date"
      />
      <PiCalendar2Line 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      />
    </div>
  );
}

// With dynamic color based on state
export function EventCard({ isUpcoming }: { isUpcoming: boolean }) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <PiCalendar2Line 
        className={`w-5 h-5 ${isUpcoming ? 'text-green-600' : 'text-gray-400'}`}
      />
      <div>
        <h3>Team Meeting</h3>
        <p className="text-sm text-gray-600">Tomorrow at 2:00 PM</p>
      </div>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Renders a calendar icon with outline/line style showing a calendar grid with date markers
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Color Inheritance**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts all ARIA attributes for proper accessibility implementation
- **Customizable**: Fully customizable through standard SVG props and CSS classes

## State Management
**None** - This is a stateless presentational component that doesn't manage any internal state. It simply renders SVG markup based on the props passed to it.

## Side Effects
**None** - This component has no side effects. It doesn't perform API calls, access browser APIs, or trigger any external interactions.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No external dependencies**: Pure React component with no additional libraries

## Integration
This icon component integrates into the application architecture as:

- **UI Building Block**: Used as a visual element in date-related components
- **Design System Component**: Part of the Pi icon collection following consistent design patterns
- **Reusable Asset**: Can be used across different features like calendars, scheduling, event management, etc.
- **Accessibility Enhancement**: Provides visual context for screen readers when properly labeled

### Common Integration Patterns
```tsx
// In a date picker component
import { PiCalendar2Line } from '@/components/icons/pi/pi-calendar-2-line';
import { DatePicker } from '@/components/ui/date-picker';

export function EventForm() {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm font-medium">
        <PiCalendar2Line className="w-4 h-4" />
        Event Date
      </label>
      <DatePicker />
    </div>
  );
}

// In navigation or menu items
export function SidebarNav() {
  return (
    <nav>
      <Link 
        href="/calendar" 
        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <PiCalendar2Line className="w-5 h-5" />
        Calendar
      </Link>
    </nav>
  );
}
```

## Best Practices
- **Accessibility**: Always provide `aria-label` or `aria-labelledby` when the icon conveys important information
- **Semantic Usage**: Use `aria-hidden="true"` when the icon is purely decorative and adjacent text provides context
- **Consistent Sizing**: Use Tailwind's sizing classes (`w-4 h-4`, `w-5 h-5`) for consistent icon sizes across the application
- **Color Inheritance**: Leverage `currentColor` by setting text color on parent elements rather than directly styling the icon
- **Server-Side Rendering**: Since this is a Server Component, it can be safely used in server-rendered pages without hydration issues
- **Performance**: No additional JavaScript bundle size since it's a pure SVG component
- **Type Safety**: Utilize TypeScript's SVG props for better development experience and error catching

This component follows our architecture guidelines by being a focused, reusable UI component that can be composed with other components to build more complex date-related features.