# Accordion Component

## Purpose

The Accordion component provides an expandable/collapsible interface for organizing content into sections. Built on Radix UI primitives, it allows users to show or hide content by clicking on section headers, making it ideal for FAQs, settings panels, and content organization where space efficiency is important.

## Props Interface

### Accordion (Root)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `'single' \| 'multiple'` | Yes | - | Whether only one item can be open at a time ('single') or multiple items can be open ('multiple') |
| `collapsible` | `boolean` | No | `false` | When type is 'single', allows closing the open item |
| `defaultValue` | `string \| string[]` | No | - | Default open item(s) |
| `value` | `string \| string[]` | No | - | Controlled open item(s) |
| `onValueChange` | `(value: string \| string[]) => void` | No | - | Callback when open items change |

### AccordionItem

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes for styling |
| `value` | `string` | Yes | - | Unique identifier for this accordion item |
| `disabled` | `boolean` | No | `false` | Whether the item is disabled |

### AccordionTrigger

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes for styling |
| `children` | `ReactNode` | Yes | - | Content to display in the trigger button |

### AccordionContent

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes for styling |
| `children` | `ReactNode` | Yes | - | Content to display when accordion item is expanded |

## Usage Example

```tsx
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

function FAQSection() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="typography-titleH2 text-pgText-950 mb-6">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem 
          value="item-1" 
          className="border-b border-pgStroke-200"
        >
          <AccordionTrigger className="typography-labelLarge text-pgText-900 hover:text-pgBlue-600">
            How do I reset my password?
          </AccordionTrigger>
          <AccordionContent className="typography-paragraphMedium text-pgText-700">
            To reset your password, click on the "Forgot Password" link on the 
            login page. You'll receive an email with instructions to create a 
            new password.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem 
          value="item-2" 
          className="border-b border-pgStroke-200"
        >
          <AccordionTrigger className="typography-labelLarge text-pgText-900 hover:text-pgBlue-600">
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent className="typography-paragraphMedium text-pgText-700">
            We accept all major credit cards, PayPal, and bank transfers. 
            Payment processing is handled securely through our encrypted 
            payment gateway.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem 
          value="item-3" 
          className="border-b border-pgStroke-200"
        >
          <AccordionTrigger className="typography-labelLarge text-pgText-900 hover:text-pgBlue-600">
            How can I contact customer support?
          </AccordionTrigger>
          <AccordionContent className="typography-paragraphMedium text-pgText-700">
            You can reach our customer support team through:
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Email: support@example.com</li>
              <li>Phone: 1-800-123-4567</li>
              <li>Live chat on our website</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// Multiple items open example
function SettingsAccordion() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="account" className="border-b border-pgStroke-300">
        <AccordionTrigger className="typography-subheadingMedium text-pgText-950">
          Account Settings
        </AccordionTrigger>
        <AccordionContent className="bg-pgBackground-50 rounded-md p-4">
          <div className="space-y-3">
            <div className="typography-paragraphSmall text-pgText-700">
              Manage your account preferences and profile information.
            </div>
            {/* Account settings form would go here */}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="privacy" className="border-b border-pgStroke-300">
        <AccordionTrigger className="typography-subheadingMedium text-pgText-950">
          Privacy Settings
        </AccordionTrigger>
        <AccordionContent className="bg-pgBackground-50 rounded-md p-4">
          <div className="typography-paragraphSmall text-pgText-700">
            Control your privacy and data sharing preferences.
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Design System Usage

### Typography Classes Used
- **Triggers**: Use `.typography-labelLarge`, `.typography-labelMedium`, or `.typography-subheadingMedium` for section headers
- **Content**: Use `.typography-paragraphMedium`, `.typography-paragraphSmall` for body text
- **Titles**: Use `.typography-titleH2`, `.typography-titleH3` for accordion section titles

### Color Tokens Applied
- **Text Colors**: 
  - `text-pgText-950` for primary trigger text
  - `text-pgText-700` for content text
  - `text-pgText-600` for secondary information
- **Borders**: 
  - `border-pgStroke-200` for light borders
  - `border-pgStroke-300` for more prominent borders
- **Backgrounds**: 
  - `bg-pgBackground-50` for subtle content backgrounds
  - `bg-pgBackground-100` for more prominent backgrounds
- **Interactive States**: 
  - `hover:text-pgBlue-600` for trigger hover states
  - `text-pgStateInformation-base` for informational content

### Default Classes
- **AccordionItem**: `border-b` (bottom border)
- **AccordionTrigger**: `flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline`
- **AccordionContent**: `overflow-hidden text-sm transition-all`
- **Arrow Icon**: `size-4 shrink-0 transition-transform duration-200`

## Styling

### Available Customizations

```tsx
// Custom spacing and colors
<AccordionItem className="border-b-2 border-pgStroke-400 my-2">
  <AccordionTrigger className="py-6 px-4 bg-pgBackground-100 rounded-t-lg typography-labelXLarge text-pgText-950 hover:bg-pgBlue-50">
    Custom Styled Trigger
  </AccordionTrigger>
  <AccordionContent className="px-4 bg-pgBackground-50 rounded-b-lg border-x-2 border-b-2 border-pgStroke-400">
    Custom styled content with consistent borders
  </AccordionContent>
</AccordionItem>

// Success state styling
<AccordionItem className="border-b border-pgStateSuccess-light bg-pgStateSuccess-lighter/20">
  <AccordionTrigger className="text-pgStateSuccess-dark hover:text-pgStateSuccess-base">
    Success Section
  </AccordionTrigger>
  <AccordionContent className="text-pgStateSuccess-dark">
    Content with success theming
  </AccordionContent>
</AccordionItem>

// Warning state styling
<AccordionItem className="border-b border-pgStateWarning-light bg-pgStateWarning-lighter/20">
  <AccordionTrigger className="text-pgStateWarning-dark hover:text-pgStateWarning-base">
    Warning Section
  </AccordionTrigger>
  <AccordionContent className="text-pgStateWarning-dark">
    Content with warning theming
  </AccordionContent>
</AccordionItem>
```

### State Variants
- **Default**: Standard border and text colors
- **Hover**: Underline effect on trigger, color transitions
- **Open**: Arrow rotates 180 degrees, content slides down
- **Closed**: Content slides up and hides
- **Disabled**: Reduced opacity and no interaction

## Responsive Design

The accordion adapts well across breakpoints:

```tsx
<Accordion type="single" collapsible className="w-full">
  <AccordionItem className="border-b border-pgStroke-200">
    <AccordionTrigger className="
      py-3 sm:py-4 
      typography-labelMedium sm:typography-labelLarge 
      text-left
    ">
      <span className="pr-4">Responsive Trigger Text</span>
    </AccordionTrigger>
    <AccordionContent className="
      typography-paragraphSmall sm:typography-paragraphMedium
      px-0 sm:px-2
    ">
      Content that adapts to screen size with appropriate typography scaling.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Breakpoint Considerations
- **Mobile (< 640px)**: Reduced padding, smaller typography
- **Tablet (640px+)**: Standard spacing and typography
- **Desktop (1024px+)**: May benefit from max-width constraints

## Accessibility

### Built-in Accessibility Features
- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and Space
- **ARIA Attributes**: Proper `aria-expanded`, `aria-controls`, and `aria-labelledby`
- **Screen Reader Support**: Semantic HTML structure with proper heading hierarchy
- **Focus Management**: Visible focus states and logical tab order

### Accessibility Best Practices

```tsx
// Proper semantic structure
<section aria-labelledby="faq-heading">
  <h2 id="faq-heading" className="typography-titleH2">
    Frequently Asked Questions
  </h2>
  
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger className="focus:outline-none focus:ring-2 focus:ring-pgBlue-500 focus:ring-offset-2 rounded">
        Question with proper focus styles
      </AccordionTrigger>
      <AccordionContent>
        <div className="typography-paragraphMedium" role="region" aria-label="Answer content">
          Answer content with semantic markup
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</section>

// High contrast mode support
<AccordionTrigger className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-pgBlue-500 
  focus:ring-offset-2 
  contrast-more:border-pgText-950
  contrast-more:text-pgText-950
">
```

## Dependencies

### Internal Dependencies
- **Icons**: `PiArrowDownSLine` from `@/components/icons`
- **Utilities**: `cn` utility from `@/lib/utils/cn`
- **Design Tokens**: Tailwind classes with pgDesign system color tokens

### External Dependencies
- **@radix-ui/react-accordion**: Provides accessible accordion primitives
- **React**: `forwardRef` for proper ref forwarding

### Related Components
Often used with:
- **Card** components for structured content sections
- **Badge** components for status indicators in triggers
- **Button** components for actions within content
- **Form** components for settings accordions
- **List** components for structured content within panels

### Animation Requirements
Requires these Tailwind animation classes to be defined:
- `animate-accordion-up`: For closing animation
- `animate-accordion-down`: For opening animation

These should be defined in your Tailwind config or CSS:

```css
@keyframes accordion-down {
  from { height: 0 }
  to { height: var(--radix-accordion-content-height) }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height) }
  to { height: 0 }
}

.animate-accordion-down {
  animation: accordion-down 0.2s ease-out;
}

.animate-accordion-up {
  animation: accordion-up 0.2s ease-out;
}
```