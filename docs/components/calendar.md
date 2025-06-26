# Calendar Component

## Purpose

The Calendar component is a flexible and accessible date picker built on top of `react-day-picker`. It provides a rich calendar interface with support for single date selection, date ranges, and custom styling that integrates seamlessly with the design system. The component offers comprehensive navigation, date range highlighting, and responsive design patterns.

## Props Interface

### Calendar Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the calendar container |
| `classNames` | `object` | No | `{}` | Custom class names for specific calendar elements |
| `showOutsideDays` | `boolean` | No | `true` | Whether to show days from previous/next months |
| `range` | `DateRange` | No | - | Date range object for highlighting selected range |
| `...props` | `DayPickerProps` | No | - | All props from react-day-picker's DayPicker component |

### DayCell Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'basic' \| 'active' \| 'selected' \| 'current'` | No | `'basic'` | Visual variant of the day cell |
| `className` | `string` | No | - | Additional CSS classes |
| `asChild` | `boolean` | No | `false` | Render as child component |
| `...rest` | `ButtonHTMLAttributes` | No | - | Standard button HTML attributes |

### CalendarNavigation Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | CSS classes for the navigation icon |
| `size` | `number` | No | - | Size of the navigation icon |
| `disabled` | `boolean` | No | `false` | Whether the navigation is disabled |
| `orientation` | `'left' \| 'right' \| 'up' \| 'down'` | No | - | Direction of the navigation arrow |

## Usage Example

```tsx
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';

// Basic single date selection
function BasicCalendar() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-6 bg-pgBackground-0 rounded-lg border border-pgStroke-100">
      <h3 className="typography-titleH6 text-pgText-950 mb-4">
        Select a Date
      </h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto"
      />
    </div>
  );
}

// Date range selection
function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="p-6 bg-pgBackground-0 rounded-lg border border-pgStroke-100">
      <h3 className="typography-titleH6 text-pgText-950 mb-4">
        Select Date Range
      </h3>
      <Calendar
        mode="range"
        range={range}
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="mx-auto"
      />
      {range?.from && (
        <p className="typography-paragraphSmall text-pgText-700 mt-4">
          Selected: {range.from.toDateString()} 
          {range.to && ` - ${range.to.toDateString()}`}
        </p>
      )}
    </div>
  );
}

// Custom styling with design system tokens
function CustomStyledCalendar() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="p-8 bg-pgBlue-50 rounded-xl border border-pgBlue-200">
      <h3 className="typography-titleH5 text-pgBlue-950 mb-6">
        Custom Calendar
      </h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="bg-pgBackground-0 rounded-lg shadow-lg"
        classNames={{
          day_button: 'hover:bg-pgBlue-100 focus:ring-pgBlue-500',
          selected: 'bg-pgBlue-500 text-pgText-0 hover:bg-pgBlue-600',
          today: 'bg-pgBlue-100 text-pgBlue-950 font-semibold',
        }}
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Caption Labels**: `.typography-labelSmall` - Used for month/year caption
- **Weekday Headers**: `.typography-subheadingXSmall` - Applied to weekday abbreviations  
- **Day Cells**: `.typography-labelSmall` - Used for date numbers

### Color Tokens
- **Text Colors**:
  - `pgText-950` - Primary text for dates and labels
  - `pgText-700` - Secondary text for captions
  - `pgText-400` - Disabled state text
  - `pgText-0` - Text on dark backgrounds

- **Background Colors**:
  - `pgBackground-0` - Base calendar background
  - `pgBackground-800` - Active/selected date backgrounds
  - `pgBackgroundBlueTintAlpha-25` - Current date highlight

- **Interactive States**:
  - `alphaNeutral/16` - Hover and selected states
  - `alphaSapphire/10` - Focus ring colors
  - `pgStroke-100` - Borders and dividers

### Spacing & Layout
- **Grid Spacing**: Uses `space-y-1`, `space-y-4` for consistent vertical rhythm
- **Padding**: `p-0`, `pt-1`, `py-3` following 4px base unit
- **Sizing**: `size-10` (40px) for day cells, `h-7 w-7` (28px) for navigation buttons

## Styling

### Day Cell Variants

#### Basic (`variant="basic"`)
- Default state for unselected dates
- Hover: `hover:bg-alphaNeutral/16`
- Focus: `focus-visible:ring-2` with `ring-alphaSapphire/10`
- Disabled: 35% opacity with pointer events disabled

#### Active (`variant="active"`)  
- Used for selected dates in range mode
- Background: `bg-pgBackground-800`
- Text: `text-pgText-0`
- Maintains styling when disabled

#### Selected (`variant="selected"`)
- Applied to individually selected dates
- Background: `bg-alphaNeutral/16`
- Enhanced hover states

#### Current (`variant="current"`)
- Highlights today's date
- Includes bottom dot indicator using `::after` pseudo-element
- Blue tinted background: `bg-pgBackgroundBlueTintAlpha-25`

### Customization Options

```tsx
// Custom class names for specific elements
<Calendar
  classNames={{
    months: 'custom-months-layout',
    day_button: 'custom-day-styling',
    selected: 'custom-selected-state',
    range_start: 'custom-range-start',
    range_end: 'custom-range-end',
  }}
/>

// Override navigation styling
<Calendar
  classNames={{
    nav: 'custom-nav-positioning',
    button_previous: 'custom-prev-button',
    button_next: 'custom-next-button',
  }}
/>
```

## Responsive Design

### Breakpoint Adaptations

#### Mobile (`< lg:1024px`)
- **Single Column Layout**: Months stack vertically
- **Centered Alignment**: `mx-auto` for calendar grid and month captions
- **Full Width**: `w-[280px]` fixed width for optimal mobile viewing
- **Navigation Positioning**: Adjusted button placement for smaller screens

#### Desktop (`lg:1024px+`)
- **Side-by-Side Months**: `lg:flex-row` for multiple month display
- **Border Separators**: `lg:border-l border-pgStroke-100` between months
- **Flexible Width**: `lg:w-auto` allows natural sizing
- **Enhanced Spacing**: `lg:pl-6` padding for visual separation

```tsx
// Responsive month layout
<Calendar
  numberOfMonths={2} // Shows 2 columns on desktop, stacks on mobile
  className="lg:max-w-none max-w-sm mx-auto"
/>
```

## Accessibility

### ARIA Support
- **Date Selection**: Uses `aria-selected` for selected dates
- **Navigation**: Proper button roles for month navigation
- **Range Selection**: Semantic markup for date ranges with start/end indicators

### Keyboard Navigation
- **Arrow Keys**: Navigate between dates
- **Enter/Space**: Select dates
- **Tab Navigation**: Focus management through calendar elements
- **Focus Visible**: `focus-visible:ring-2` provides clear focus indicators

### Screen Reader Support
- **Date Announcements**: Selected dates announced with context
- **Range Context**: Start and end dates clearly identified
- **Navigation Context**: Month/year changes announced

### Focus Management
```tsx
// Focus ring styling using design system
'ring-offset-2 ring-offset-pgBackground-0 focus-visible:outline-none focus-visible:ring-2'
```

## Dependencies

### Internal Dependencies
- **Button Component**: Uses `buttonVariants` for navigation styling
- **Icons**: `PiArrowLeftSLine`, `PiArrowRightSLine` for navigation
- **Utilities**: `cn()` function for conditional classes
- **CVA**: `class-variance-authority` for variant management

### External Dependencies
- **react-day-picker**: Core calendar functionality and date handling
- **Date Objects**: Standard JavaScript Date API for date operations

### Related Components
```tsx
import { Button } from '@/components/ui/button'; // For custom actions
import { Popover } from '@/components/ui/popover'; // For date picker dropdown
import { Input } from '@/components/ui/input'; // For date input fields
```

### Usage with Form Components
```tsx
// Integration with form systems
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

function DatePicker() {
  const [date, setDate] = useState<Date>();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          {date ? date.toDateString() : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
```