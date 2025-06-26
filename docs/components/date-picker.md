# DatePickerWithRange Component

## Purpose

The `DatePickerWithRange` component is a sophisticated date range picker that provides both preset options and custom date selection. It features a responsive design with mobile-optimized interfaces, preset management, and special handling for public users with date restrictions.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `DateRange` | No | `undefined` | The selected date range value |
| `onChange` | `(value: DateRange) => void` | No | `undefined` | Callback fired when the date range changes |
| `presets` | `DatePreset[]` | No | `defaultPresets` | Array of preset date ranges to display |
| `disablePresetsPopover` | `boolean` | No | `false` | Hides the preset dropdown button |
| `disablePresets` | `boolean` | No | `false` | Hides the preset selection bar in the dialog |
| `showPresetNameInRange` | `boolean` | No | `false` | Shows preset name instead of date range in trigger button |
| `buttonClassName` | `string` | No | `undefined` | Additional CSS classes for the trigger button |
| `isPublic` | `boolean` | No | `false` | Enables public user restrictions (90-day limit) |
| `className` | `string` | No | `undefined` | Additional CSS classes for the dialog content |

## Usage Example

```tsx
import { DatePickerWithRange, defaultPresets } from '@/components/ui/date-picker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

function Analytics() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date()
  });

  const customPresets = [
    ...defaultPresets,
    {
      name: 'Last Quarter',
      range: (now: Date) => ({
        from: startOfDay(subDays(now, 90)),
        to: endOfDay(now),
      }),
    }
  ];

  return (
    <div className="flex items-center gap-4 p-6 bg-pgBackground-0">
      <DatePickerWithRange
        value={dateRange}
        onChange={setDateRange}
        presets={customPresets}
        buttonClassName="min-w-[200px]"
        className="lg:max-w-[700px]"
      />
      
      {/* Public user example */}
      <DatePickerWithRange
        value={dateRange}
        onChange={setDateRange}
        isPublic={true}
        showPresetNameInRange={true}
        disablePresetsPopover={false}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Dialog Title**: Uses `.sr-only` for accessibility
- **Preset Names**: `.typography-labelSmall` and `.typography-paragraphSmall`
- **Date Display**: `.typography-labelSmall` for emphasized dates
- **Warning Text**: `.typography-paragraphXSmall` for public user notices
- **Labels**: `.typography-labelLarge` for mobile headers

### Color Tokens
- **Background Colors**: 
  - `bg-pgBackground-0` - Main dialog background
  - `bg-pgBackground-50` - Header and footer sections
- **Border Colors**:
  - `border-pgStroke-250` - Section dividers
  - `border-alphaNeutral/16` - Subtle borders
- **State Colors**:
  - `bg-pgStateAway-lighter` - Public user warning background
  - `text-pgStateAway-dark` - Warning text color
  - `border-pgStateAway-light` - Warning border
- **Interactive States**:
  - `bg-alphaNeutral/16` - Active preset background
  - `hover:bg-alphaNeutral/16` - Hover states

### Button Variants
- `variant='neutralStroke'` - Primary trigger buttons
- `variant='neutralGhost'` - Preset selection buttons
- `variant='neutralLighter'` - Cancel button
- `variant='primaryFilled'` - Save button
- `size='sm'`, `size='xs'`, `size='xxs'` - Various button sizes

## Styling

### Available Variants

**Button Configurations:**
```tsx
// Standard configuration
<DatePickerWithRange 
  buttonClassName="px-4 min-w-[180px]"
/>

// Compact mobile
<DatePickerWithRange 
  buttonClassName="px-2"
/>

// With custom styling
<DatePickerWithRange 
  className="lg:max-w-[800px] shadow-lg"
  buttonClassName="border-pgBlue-300 text-pgBlue-600"
/>
```

### Customization Options

**Dialog Appearance:**
- `className` - Controls dialog content styling
- Rounded corners: `lg:rounded-[1.25rem]` on desktop
- Full-screen on mobile with `rounded-none`

**State Modifications:**
- Preset button active state: `bg-alphaNeutral/16`
- Disabled dates use calendar's built-in disabled styling
- Public user restrictions show warning banner

## Responsive Design

### Breakpoint Adaptations

**Mobile (< 1024px):**
- Full-screen dialog with `rounded-none`
- Single month calendar view
- Compact button sizing (`size='xs'`)
- Manual date input fields in footer
- Header with close button

**Desktop (≥ 1024px):**
- Modal dialog with rounded corners
- Two-month calendar view
- Standard button sizing (`size='sm'`)
- Centered preset buttons
- Inline date display in footer

**Responsive Classes:**
```tsx
// Responsive sizing
className="px-2 lg:px-4"
className="min-h-[514px] lg:max-w-[635px] lg:rounded-[1.25rem]"

// Conditional layouts
numberOfMonths={isMobile ? 1 : 2}
size={isMobile ? 'xs' : 'sm'}
```

## Accessibility

### ARIA Support
- `DialogTitle` with screen reader text: "Select date range"
- Calendar component includes full keyboard navigation
- Focus management with `autoFocus` on calendar
- Proper focus trapping within dialog

### Keyboard Navigation
- Tab navigation through presets and calendar
- Arrow key navigation within calendar
- Enter/Space for selection
- Escape to close dialog

### Screen Reader Support
- Semantic button roles for all interactive elements
- Descriptive labels for date inputs
- Status announcements for date selection changes
- Tooltip content for public user restrictions

## Dependencies

### Internal Components
- `Button` - All interactive buttons
- `Calendar` - Core date selection interface
- `Dialog` family - Modal container and controls
- `DropdownMenu` family - Preset selection
- `TextInput` - Manual date entry on mobile
- `Typography` - Consistent text styling
- `Tooltip` family - Information overlays
- `LinkButton` - Sign-up call-to-action

### External Dependencies
- `date-fns` functions for date manipulation
- `react-day-picker` for DateRange type
- `react-indiana-drag-scroll` for preset scrolling
- `next/link` for navigation

### Utility Functions
```tsx
// Exported utilities
export { defaultPresets, getMinAllowedDate, isDateRangeEqual };

// Usage
import { defaultPresets, getMinAllowedDate } from '@/components/ui/date-picker';
```

### Hook Dependencies
- `useBreakpoint('lg')` - Responsive behavior detection
- Standard React hooks for state management