# MultipleSelector Component

## Purpose

The `MultipleSelector` is a flexible multi-select dropdown component that allows users to select multiple options from a searchable list. It supports features like async search, option grouping, creatable options, and provides comprehensive keyboard navigation. The component renders selected items as dismissible badges and includes debounced search functionality for optimal performance.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `Option[]` | No | `undefined` | Controlled value of selected options |
| `defaultOptions` | `Option[]` | No | `[]` | Default options to display when dropdown opens |
| `options` | `Option[]` | No | `undefined` | Static list of available options |
| `placeholder` | `string` | No | `undefined` | Placeholder text for the input field |
| `loadingIndicator` | `React.ReactNode` | No | `undefined` | Custom loading indicator component |
| `emptyIndicator` | `React.ReactNode` | No | `undefined` | Custom empty state indicator |
| `delay` | `number` | No | `500` | Debounce delay for search in milliseconds |
| `triggerSearchOnFocus` | `boolean` | No | `false` | Whether to trigger search when input focuses |
| `onSearch` | `(value: string) => Promise<Option[]>` | No | `undefined` | Async search function |
| `onSearchSync` | `(value: string) => Option[]` | No | `undefined` | Synchronous search function |
| `onChange` | `(options: Option[]) => void` | No | `undefined` | Callback when selection changes |
| `maxSelected` | `number` | No | `Number.MAX_SAFE_INTEGER` | Maximum number of selectable options |
| `onMaxSelected` | `(maxLimit: number) => void` | No | `undefined` | Callback when max selection reached |
| `hidePlaceholderWhenSelected` | `boolean` | No | `false` | Hide placeholder when options are selected |
| `disabled` | `boolean` | No | `false` | Disable the entire component |
| `groupBy` | `string` | No | `undefined` | Property name to group options by |
| `className` | `string` | No | `undefined` | Additional CSS classes for the container |
| `badgeClassName` | `string` | No | `undefined` | Additional CSS classes for selected option badges |
| `selectFirstItem` | `boolean` | No | `true` | Whether first item should be auto-selected on search |
| `creatable` | `boolean` | No | `false` | Allow creating new options from search input |
| `hideArrowDown` | `boolean` | No | `false` | Hide the dropdown arrow icon |
| `commandProps` | `React.ComponentPropsWithoutRef<typeof Command>` | No | `undefined` | Props passed to underlying Command component |
| `inputProps` | `Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, 'value' \| 'placeholder' \| 'disabled'>` | No | `undefined` | Props passed to the input element |
| `hideClearAllButton` | `boolean` | No | `false` | Hide the clear all selections button |

### Option Interface

```typescript
interface Option {
  value: string;
  label: string;
  disable?: boolean;
  fixed?: boolean; // Cannot be removed by user
  newlyCreated?: boolean; // Marked when created via creatable feature
  [key: string]: string | boolean | undefined;
}
```

### MultipleSelectorRef Interface

```typescript
interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}
```

## Usage Example

```tsx
import { MultipleSelector } from '@/components/ui/multi-select';
import { useState } from 'react';

// Basic usage
function BasicExample() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  return (
    <div className="w-full max-w-md">
      <MultipleSelector
        value={selectedOptions}
        onChange={setSelectedOptions}
        defaultOptions={options}
        placeholder="Select frameworks..."
        emptyIndicator={
          <p className="typography-paragraphSmall text-pgText-600 text-center py-4">
            No frameworks found.
          </p>
        }
        className="bg-pgBackground-0 border-pgStroke-200"
        badgeClassName="bg-pgBlue-50 text-pgBlue-700 border-pgBlue-200"
      />
    </div>
  );
}

// Async search example
function AsyncSearchExample() {
  const [selectedUsers, setSelectedUsers] = useState<Option[]>([]);

  const searchUsers = async (query: string): Promise<Option[]> => {
    if (!query) return [];
    
    const response = await fetch(`/api/users/search?q=${query}`);
    const users = await response.json();
    
    return users.map(user => ({
      value: user.id,
      label: user.name
    }));
  };

  return (
    <MultipleSelector
      value={selectedUsers}
      onChange={setSelectedUsers}
      onSearch={searchUsers}
      placeholder="Search users..."
      loadingIndicator={
        <div className="typography-paragraphSmall text-pgText-500 text-center py-4">
          Searching users...
        </div>
      }
      emptyIndicator={
        <div className="typography-paragraphSmall text-pgText-400 text-center py-4">
          No users found
        </div>
      }
      triggerSearchOnFocus
      maxSelected={5}
      onMaxSelected={(limit) => {
        console.log(`Maximum ${limit} users can be selected`);
      }}
    />
  );
}

// Creatable options example
function CreatableExample() {
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  return (
    <MultipleSelector
      value={selectedTags}
      onChange={setSelectedTags}
      placeholder="Add tags..."
      creatable
      emptyIndicator={
        <p className="typography-paragraphSmall text-pgText-500 text-center py-4">
          Start typing to create tags
        </p>
      }
      className="border-pgStroke-300 focus-within:border-pgBlue-500"
    />
  );
}
```

## Design System Usage

### Typography Classes
- **Empty/Loading States**: Uses `.typography-paragraphSmall` for consistent text sizing
- **Option Labels**: Inherits text sizing from Command component (typically 14px)
- **Badges**: Uses default badge typography with proper contrast

### Color Tokens
- **Background Colors**: 
  - `bg-pgBackground-0` (light mode container)
  - `dark:bg-pgNeutral-950` (dark mode container)
  - `bg-white` (dropdown background)
- **Border Colors**:
  - `border-pgStroke-200` (default border)
  - `border-pgStrokeBlue` (focused state)
- **Text Colors**:
  - `text-pgText-500` (muted text)
  - `text-pgText-600` (secondary text)
  - `text-muted-foreground` (placeholder/disabled)
- **State Colors**:
  - Focus: `data-[focused=true]:border-pgStrokeBlue`
  - Badges use design system badge color variants

### Tailwind Utilities
- **Layout**: `flex`, `flex-wrap`, `relative`, `absolute`
- **Spacing**: `gap-1`, `py-2`, `pl-2`, `pr-6`, `px-3`
- **Sizing**: `min-h-10`, `size-4`, `w-full`
- **Borders**: `rounded-xl`, `rounded-lg`, `border`
- **Shadows**: `shadow-inputFieldPop`, `shadow-md`
- **Animations**: `animate-in`

## Styling

### Variants and States

#### Container States
```tsx
// Default state
<MultipleSelector className="border-pgStroke-200" />

// Focused state (automatically applied)
// Uses data-[focused=true]:border-pgStrokeBlue

// Disabled state
<MultipleSelector 
  disabled 
  className="opacity-50 pointer-events-none" 
/>

// Error state (custom)
<MultipleSelector 
  className="border-pgStateError-base focus-within:border-pgStateError-dark" 
/>
```

#### Badge Customization
```tsx
// Custom badge styling
<MultipleSelector 
  badgeClassName="bg-pgGreen-50 text-pgGreen-700 border-pgGreen-200" 
/>

// Different colors for different types
<MultipleSelector 
  onChange={(options) => {
    // Handle color logic based on option properties
  }}
  badgeClassName={(option) => 
    option.newlyCreated 
      ? "bg-pgPurple-50 text-pgPurple-700"
      : "bg-pgBlue-50 text-pgBlue-700"
  }
/>
```

#### Dropdown Customization
```tsx
<MultipleSelector 
  commandProps={{
    className: "border-pgStroke-300 shadow-lg"
  }}
  inputProps={{
    className: "typography-paragraphMedium"
  }}
/>
```

## Responsive Design

The component adapts across breakpoints using:

```tsx
// Responsive container
<div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
  <MultipleSelector 
    className="w-full"
    // Component automatically handles internal responsive layout
  />
</div>

// Responsive badge layout
// Badges automatically wrap using flex-wrap
// On smaller screens, badges may take full width if needed
```

The dropdown automatically positions itself and adjusts width to match the trigger element across all breakpoints.

## Accessibility

### Keyboard Navigation
- **Tab**: Focus input field
- **Arrow Keys**: Navigate through dropdown options
- **Enter/Space**: Select highlighted option
- **Escape**: Close dropdown and blur input
- **Backspace**: Remove last selected option when input is empty
- **Delete**: Same as Backspace

### ARIA Support
- `role="presentation"` on empty state elements
- `cmdk-empty` attribute for screen reader compatibility
- Proper focus management with `focus:ring-2` utilities
- `aria-expanded` states managed by underlying Command component

### Screen Reader Features
- Selected options announced as badges with removal buttons
- Search results announced when updated
- Loading and empty states properly communicated
- Option descriptions and group headings read aloud

### Focus Management
```tsx
// Programmatic focus control
const selectorRef = useRef<MultipleSelectorRef>(null);

// Focus the input
selectorRef.current?.focus();

// Access current selection
const currentValues = selectorRef.current?.selectedValue;
```

## Dependencies

### Internal Components
- `Badge` - For displaying selected options
- `Command`, `CommandGroup`, `CommandItem`, `CommandList` - Dropdown functionality
- `PiArrowDownSLine`, `PiCloseLine` - Icons from icon system

### Utilities
- `cn` - Class name utility for conditional styling
- `useDebounce` - Custom hook for search debouncing (exported)

### External Dependencies
- `cmdk` - Command palette primitive
- `React` - Core React functionality with hooks and forwardRef

### Related Components
Works well with:
- `Form` components for validation
- `Label` for accessible labeling
- `Popover` for custom dropdown triggers
- `Sheet` or `Dialog` for mobile-optimized selection interfaces