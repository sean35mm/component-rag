# Collapsible

## Purpose

The Collapsible component provides an accessible way to show and hide content sections. Built on top of Radix UI's Collapsible primitive, it offers smooth animations and keyboard navigation while maintaining semantic HTML structure. Perfect for FAQ sections, expandable menus, and content organization.

## Props Interface

### Collapsible (Root)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | No | `undefined` | Controls the open state when used as controlled component |
| `defaultOpen` | `boolean` | No | `false` | Initial open state for uncontrolled usage |
| `onOpenChange` | `(open: boolean) => void` | No | `undefined` | Callback fired when open state changes |
| `disabled` | `boolean` | No | `false` | Disables the collapsible interaction |
| `children` | `ReactNode` | Yes | - | Collapsible content and trigger elements |

### CollapsibleTrigger

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `asChild` | `boolean` | No | `false` | Render as child element instead of button |
| `className` | `string` | No | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | Yes | - | Trigger content (usually text or icon) |

### CollapsibleContent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes |
| `forceMount` | `boolean` | No | `false` | Force mounting content when closed |
| `children` | `ReactNode` | Yes | - | Collapsible content |

## Usage Example

```tsx
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Basic FAQ Item
function FAQItem() {
  return (
    <Collapsible className="border border-pgStroke-200 rounded-lg bg-pgBackground-0">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-pgBackground-50 transition-colors">
        <span className="typography-labelLarge text-pgText-900">
          How do I reset my password?
        </span>
        <ChevronDownIcon className="h-5 w-5 text-pgText-600 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4">
          <p className="typography-paragraphMedium text-pgText-700">
            You can reset your password by clicking the "Forgot Password" link on the login page. 
            We'll send you an email with instructions to create a new password.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Advanced Settings Panel
function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-3 p-4 w-full text-left rounded-lg border border-pgStroke-200 hover:border-pgStroke-300 transition-colors">
          <div className="flex-1">
            <h3 className="typography-labelLarge text-pgText-900">
              Advanced Settings
            </h3>
            <p className="typography-paragraphSmall text-pgText-600 mt-1">
              Configure advanced options and preferences
            </p>
          </div>
          <ChevronDownIcon 
            className={`h-5 w-5 text-pgText-600 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <div className="p-4 space-y-4 bg-pgBackground-25 rounded-lg border border-pgStroke-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="typography-labelMedium text-pgText-800 block mb-2">
                  API Timeout (ms)
                </label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-pgStroke-200 rounded-md focus:ring-2 focus:ring-pgBlue-500 focus:border-pgBlue-500"
                  defaultValue={5000}
                />
              </div>
              <div>
                <label className="typography-labelMedium text-pgText-800 block mb-2">
                  Max Retries
                </label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-pgStroke-200 rounded-md focus:ring-2 focus:ring-pgBlue-500 focus:border-pgBlue-500"
                  defaultValue={3}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Navigation Menu
function NavigationMenu() {
  return (
    <nav className="w-64 bg-pgBackground-0 border-r border-pgStroke-200">
      <div className="space-y-2 p-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-left rounded-md hover:bg-pgBackground-50">
            <span className="typography-labelMedium text-pgText-800">
              Dashboard
            </span>
            <ChevronDownIcon className="h-4 w-4 text-pgText-600" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-4 mt-2 space-y-1">
              <a href="#" className="block px-3 py-2 typography-paragraphSmall text-pgText-700 hover:text-pgText-900 hover:bg-pgBackground-50 rounded-md">
                Overview
              </a>
              <a href="#" className="block px-3 py-2 typography-paragraphSmall text-pgText-700 hover:text-pgText-900 hover:bg-pgBackground-50 rounded-md">
                Analytics
              </a>
              <a href="#" className="block px-3 py-2 typography-paragraphSmall text-pgText-700 hover:text-pgText-900 hover:bg-pgBackground-50 rounded-md">
                Reports
              </a>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </nav>
  );
}
```

## Design System Usage

### Typography Classes
- **Triggers**: Use `.typography-labelLarge` or `.typography-labelMedium` for primary trigger text
- **Content**: Use `.typography-paragraphMedium` or `.typography-paragraphSmall` for body content
- **Descriptions**: Use `.typography-paragraphSmall` for secondary text
- **Headings**: Use `.typography-subheadingMedium` for content section headers

### Colors
- **Backgrounds**: 
  - `bg-pgBackground-0` for main container
  - `bg-pgBackground-25` or `bg-pgBackground-50` for content areas
  - `hover:bg-pgBackground-50` for trigger hover states
- **Borders**: 
  - `border-pgStroke-200` for default borders
  - `border-pgStroke-300` for hover states
  - `border-pgStroke-100` for subtle content borders
- **Text**: 
  - `text-pgText-900` for primary text
  - `text-pgText-700` for secondary text
  - `text-pgText-600` for icons and tertiary text

### Spacing & Layout
- **Padding**: Use `p-4` for trigger padding, `px-4 pb-4` for content
- **Margins**: Use `space-y-2` or `space-y-4` for multiple collapsibles
- **Gaps**: Use `gap-3` or `gap-4` for trigger element spacing

## Styling

### Available Variants

```tsx
// Minimal variant
<Collapsible>
  <CollapsibleTrigger className="typography-labelMedium text-pgText-800 underline hover:text-pgText-900">
    Show Details
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <p className="typography-paragraphSmall text-pgText-700">Content here</p>
  </CollapsibleContent>
</Collapsible>

// Card variant
<Collapsible className="border border-pgStroke-200 rounded-lg shadow-sm">
  <CollapsibleTrigger className="w-full p-4 text-left bg-pgBackground-0 hover:bg-pgBackground-25 rounded-t-lg">
    Card Header
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="p-4 border-t border-pgStroke-100">
      Card content
    </div>
  </CollapsibleContent>
</Collapsible>

// Highlighted variant
<Collapsible className="border-l-4 border-pgBlue-500 bg-pgBlue-25 rounded-r-lg">
  <CollapsibleTrigger className="w-full p-4 text-left hover:bg-pgBlue-50">
    Important Information
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="px-4 pb-4">
      Content with blue accent
    </div>
  </CollapsibleContent>
</Collapsible>
```

### State Styles

```tsx
// Success state
<Collapsible className="border border-pgStateSuccess-base/20 bg-pgStateSuccess-lighter rounded-lg">
  <CollapsibleTrigger className="hover:bg-pgStateSuccess-light/50">
    Success Message
  </CollapsibleTrigger>
</Collapsible>

// Warning state
<Collapsible className="border border-pgStateWarning-base/20 bg-pgStateWarning-lighter rounded-lg">
  <CollapsibleTrigger className="hover:bg-pgStateWarning-light/50">
    Warning Information
  </CollapsibleTrigger>
</Collapsible>

// Error state
<Collapsible className="border border-pgStateError-base/20 bg-pgStateError-lighter rounded-lg">
  <CollapsibleTrigger className="hover:bg-pgStateError-light/50">
    Error Details
  </CollapsibleTrigger>
</Collapsible>
```

## Responsive Design

The Collapsible component adapts across breakpoints:

```tsx
<Collapsible className="border border-pgStroke-200 rounded-lg">
  <CollapsibleTrigger className="
    flex flex-col sm:flex-row items-start sm:items-center justify-between 
    w-full p-3 sm:p-4 text-left gap-2 sm:gap-3
    hover:bg-pgBackground-50 transition-colors
  ">
    <div className="flex-1">
      <span className="typography-labelMedium sm:typography-labelLarge text-pgText-900">
        Responsive Trigger
      </span>
      <p className="typography-paragraphSmall text-pgText-600 mt-1 sm:mt-0 sm:ml-2">
        Description text
      </p>
    </div>
    <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-pgText-600" />
  </CollapsibleTrigger>
  
  <CollapsibleContent>
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Responsive grid content */}
      </div>
    </div>
  </CollapsibleContent>
</Collapsible>
```

## Accessibility

### Built-in Features
- **Keyboard Navigation**: Space/Enter to toggle, Tab to navigate
- **ARIA Attributes**: Automatic `aria-expanded`, `aria-controls`, and `aria-labelledby`
- **Screen Reader Support**: Proper announcements for state changes
- **Focus Management**: Maintains focus on trigger after state changes

### Best Practices

```tsx
// Provide clear labels
<CollapsibleTrigger aria-label="Toggle advanced settings panel">
  <span className="sr-only">Click to expand</span>
  Advanced Settings
</CollapsibleTrigger>

// Add context for screen readers
<CollapsibleContent>
  <div role="region" aria-label="Advanced settings options">
    {/* Content */}
  </div>
</CollapsibleContent>

// Use semantic HTML
<Collapsible asChild>
  <section>
    <CollapsibleTrigger asChild>
      <h3>
        <button>Section Title</button>
      </h3>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div>Section content</div>
    </CollapsibleContent>
  </section>
</Collapsible>
```

### Focus Indicators

```tsx
<CollapsibleTrigger className="
  focus:outline-none focus:ring-2 focus:ring-pgBlue-500 focus:ring-offset-2 
  focus:ring-offset-pgBackground-0 rounded-md
">
  Accessible Trigger
</CollapsibleTrigger>
```

## Dependencies

### Related Components
- **Accordion**: For when only one item should be open at a time
- **Tabs**: Alternative for switching between content sections
- **Disclosure**: Similar functionality with different styling patterns

### Required Utilities
- `cn()` utility for className merging
- Radix UI Collapsible primitive
- Custom slide animations (`animate-slide-up`, `animate-slide-down`)

### Recommended Pairings
- **Icons**: Heroicons or Lucide icons for expand/collapse indicators
- **Form Elements**: When collapsing form sections
- **Navigation**: For expandable menu items
- **Cards**: For expandable card content