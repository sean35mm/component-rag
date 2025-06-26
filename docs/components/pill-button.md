# PillButton Component

## Purpose

The `PillButton` component is a versatile, pill-shaped interactive element designed for tagging, filtering, and content management interfaces. It supports inline editing, highlighting, adding/removing functionality, and multiple visual variants. Perfect for entity tags, keywords, topics, and interactive filter systems.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'entity' \| 'keyword' \| 'topic'` | No | `'entity'` | Visual style variant |
| `size` | `'lg' \| 'md' \| 'sm'` | No | `'md'` | Size of the pill button |
| `asChild` | `boolean` | No | `false` | Render as child component using Radix Slot |
| `closable` | `boolean` | No | `false` | Show close/remove icon |
| `editable` | `boolean` | No | `false` | Enable inline editing functionality |
| `empty` | `boolean` | No | `false` | Render in empty state |
| `icon` | `ReactNode` | No | - | Optional icon to display |
| `placeholder` | `string` | No | `'Add entity'` | Placeholder text for empty state |
| `showEditIcon` | `boolean` | No | `false` | Force show edit icon |
| `isAddIcon` | `boolean` | No | `false` | Show add icon variant |
| `value` | `string` | No | - | Current text value |
| `highlight` | `string[]` | No | - | Array of strings to highlight within text |
| `onChangeValue` | `(value: string \| undefined) => void` | No | - | Callback when value changes |
| `onRemove` | `() => void` | No | - | Callback when remove button clicked |
| `onAdd` | `() => void` | No | - | Callback when add button clicked |
| `onClick` | `(value: string) => void` | No | - | Callback when pill is clicked |
| `className` | `string` | No | - | Additional CSS classes |
| `disabled` | `boolean` | No | `false` | Disable the button |

## Usage Example

```tsx
import { PillButton } from '@/components/ui/pill-button';
import { PiUserFill } from '@/components/icons';

// Basic entity pill
<PillButton 
  variant="entity" 
  value="John Doe" 
  closable 
  onRemove={() => console.log('Remove entity')}
/>

// Editable keyword pill
<PillButton
  variant="keyword"
  size="lg"
  value="Machine Learning"
  editable
  onChangeValue={(value) => console.log('New value:', value)}
/>

// Topic pill with icon and highlighting
<PillButton
  variant="topic"
  size="sm"
  icon={<PiUserFill />}
  value="React Development Best Practices"
  highlight={['React', 'Development']}
  onClick={(value) => console.log('Clicked:', value)}
/>

// Empty/Add state
<PillButton
  variant="entity"
  placeholder="Add new tag"
  isAddIcon
  onAdd={() => console.log('Add new item')}
/>

// Custom styling with design tokens
<PillButton
  variant="keyword"
  className="bg-pgBlue-50 hover:bg-pgBlue-100 border-pgBlue-200"
  value="Custom Styled"
/>
```

## Design System Usage

### Typography Classes
- **Large**: `.typography-labelMedium` - Medium label typography
- **Medium**: `.typography-labelSmall` - Small label typography  
- **Small**: `.typography-labelXSmall` - Extra small label typography

### Color Tokens
- **Entity Variant**: 
  - Border: `pgStroke-250`, `pgStroke-300` (hover), `pgStrokeBlue` (focus)
  - Text: `pgText-950`, `pgText-700` (placeholder), `pgText-300` (disabled)
- **Keyword Variant**:
  - Background: `pgBackgroundBluePillAlpha-10`, `pgBackgroundBlueTintAlpha-15` (hover)
  - Highlight: `pgBackgroundBlueTintDark`
- **Topic Variant**:
  - Background: `alphaNeutral/10`, `alphaNeutral/16` (hover)

### Spacing & Layout
- **Large**: `px-3 py-1.5` with `size-6` icons
- **Medium**: `px-3 py-1.5` with `size-5` icons  
- **Small**: `h-7 px-1.5 py-0.5` with base-sized icons
- Border radius: `rounded-3xl` (large), `rounded-[0.625rem]` (small)

## Styling

### Variants

#### Entity (`variant="entity"`)
- Clean bordered style for entity tags
- Default transparent background with stroke borders
- Focus state with blue accent border

#### Keyword (`variant="keyword"`)  
- Subtle blue-tinted background for keyword tags
- No border, relies on background color differentiation
- Ideal for search terms and categories

#### Topic (`variant="topic"`)
- Neutral semi-transparent background
- Minimal styling for topic classifications
- Blends well with various backgrounds

### States

- **Default**: Standard appearance per variant
- **Hover**: Enhanced border/background colors
- **Focus**: Blue accent borders and visual emphasis
- **Disabled**: Transparent background, muted text (`pgText-300`)
- **Empty**: Shows placeholder text and add icon
- **Editing**: Inline contentEditable with caret positioning

### Icon States
- **Add Icon**: Plus icon for empty/add states
- **Edit Icon**: Pencil icon when editable and not focused
- **Close Icon**: X icon when closable (hidden during focus/edit)
- **Enter Icon**: Return arrow during focused editing

## Responsive Design

The component maintains consistent sizing across breakpoints:

```tsx
// Responsive sizing example
<div className="grid gap-2 sm:gap-3 md:gap-4">
  <PillButton size="sm" className="sm:hidden" />
  <PillButton size="md" className="hidden sm:block lg:hidden" />  
  <PillButton size="lg" className="hidden lg:block" />
</div>
```

Icon sizes automatically adjust:
- **Small**: `text-base` icons
- **Medium**: `text-lg` icons  
- **Large**: `text-xl` icons

## Accessibility

### Keyboard Navigation
- **Enter Key**: Confirms inline editing changes
- **Focus/Blur**: Proper focus management for editing states
- **Tab Navigation**: Standard button tab order

### Screen Reader Support
- Semantic button element structure
- Clear placeholder text for empty states
- Proper focus indicators with design system colors

### ARIA Considerations
```tsx
// Enhanced accessibility example
<PillButton
  value="Accessible Tag"
  closable
  onRemove={handleRemove}
  aria-label="Remove accessible tag"
  role="button"
  tabIndex={0}
/>
```

### Visual Indicators
- High contrast focus states using `pgStrokeBlue`
- Clear hover states for interactive elements
- Sufficient color contrast meeting WCAG guidelines

## Dependencies

### Internal Dependencies
- **Icons**: `PiAddFill`, `PiAddLine`, `PiCloseLine`, `PiCornerDownLeftFill`, `PiPencilFill`
- **Utilities**: `cn` utility for className merging
- **Design System**: Typography classes, color tokens, spacing utilities

### External Dependencies
- **Radix UI**: `@radix-ui/react-slot` for polymorphic rendering
- **CVA**: `class-variance-authority` for variant management
- **React**: Hooks (`useState`, `useEffect`, `useRef`, `useCallback`)

### Related Components
Works well with:
- Form controls and input fields
- Filter interfaces and search components  
- Tag management systems
- Content categorization interfaces