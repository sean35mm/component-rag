# Pagination Component

## Purpose

The Pagination component provides a comprehensive navigation interface for paginated content, allowing users to navigate between pages with previous/next controls, direct page links, and ellipsis indicators for large page sets. It features smart pagination logic that shows relevant page numbers and provides visual feedback for the current page.

## Props Interface

### PaginationComponent Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `number` | ✓ | - | Total number of pages |
| `currentPage` | `number` | ✓ | - | Currently active page (1-indexed) |
| `onChange` | `(page: number) => void` | ✗ | - | Callback fired when page changes |
| `isDisablePagination` | `boolean` | ✗ | `false` | Disables pagination controls (only page 1 remains active) |
| `className` | `string` | ✗ | - | Additional CSS classes |

### Individual Component Props

| Component | Props | Description |
|-----------|-------|-------------|
| `PaginationLink` | `isActive?: boolean`, `isDisabled?: boolean` | Link styling states |
| `PaginationPrevious` | `disabled?: boolean` | Previous button state |
| `PaginationNext` | `disabled?: boolean` | Next button state |
| `PaginationEllipsis` | `disabled?: boolean` | Ellipsis indicator state |

## Usage Example

```tsx
import { useState } from 'react';
import { PaginationComponent } from '@/components/ui/pagination';

function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;
  const isLoading = false;

  return (
    <div className="space-y-4">
      {/* Your data content */}
      <div className="bg-pgBackground-50 p-6 rounded-lg">
        <h2 className="typography-titleH3 text-pgText-900 mb-4">
          Data Results
        </h2>
        {/* Data rows */}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <PaginationComponent
          size={totalPages}
          currentPage={currentPage}
          onChange={setCurrentPage}
          isDisablePagination={isLoading}
          className="mt-6"
        />
      </div>
    </div>
  );
}

// Custom pagination with manual control
function CustomPagination() {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => console.log('Previous')}
            disabled={false}
          />
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink isActive={false}>1</PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink isActive={true}>2</PaginationLink>
        </PaginationItem>
        
        <PaginationItem>
          <PaginationLink isActive={false}>3</PaginationLink>
        </PaginationItem>
        
        <PaginationEllipsis />
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => console.log('Next')}
            disabled={false}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## Design System Usage

### Typography
- **Labels**: `typography-labelSmall` - Used for page numbers and navigation controls
- Provides consistent text sizing across all pagination elements

### Colors
- **Borders**: `border-pgStroke-200` - Subtle borders for page items
- **Text Colors**: 
  - `text-pgText-700/75` - Default text with 75% opacity
  - `text-pgText-800` - Hover state text
  - `text-pgText-0` - Active page text (white)
- **Background Colors**:
  - `bg-pgBackground-800` - Active page background (dark)
  - `hover:bg-alphaNeutral/6` - Subtle hover background
- **Interactive States**: `hover:text-pgText-800` - Enhanced text on hover

### Spacing & Layout
- **Item Sizing**: `h-8 min-w-8` - Consistent 32px height and minimum width
- **Gaps**: `gap-2` - 8px spacing between pagination items
- **Padding**: `p-2` - 8px internal padding for clickable areas
- **Border Radius**: `rounded-[0.625rem]` - 10px rounded corners

## Styling

### Variants

#### Active State
```tsx
<PaginationLink isActive={true}>
  {/* Dark background with white text */}
  {/* bg-pgBackground-800 text-pgText-0 */}
</PaginationLink>
```

#### Disabled State
```tsx
<PaginationLink isDisabled={true}>
  {/* Reduced opacity with no hover effects */}
  {/* opacity-50 cursor-not-allowed */}
</PaginationLink>
```

#### Navigation Buttons
```tsx
<PaginationPrevious disabled={false} />
<PaginationNext disabled={false} />
{/* Border-less buttons with arrow icons */}
```

### Customization Options

```tsx
// Custom styling
<PaginationComponent
  size={10}
  currentPage={1}
  onChange={handlePageChange}
  className="justify-end bg-pgBackground-100 p-4 rounded-lg"
/>

// Individual component styling
<PaginationLink 
  className="border-pgBlue-200 text-pgBlue-600 hover:bg-pgBlue-50"
  isActive={true}
>
  1
</PaginationLink>
```

## Responsive Design

The pagination component maintains its layout across all breakpoints:

- **Mobile (sm: 640px)**: Compact spacing maintained, touch-friendly 32px minimum targets
- **Tablet (md: 768px+)**: Standard spacing and sizing
- **Desktop (lg: 1024px+)**: Full feature set with hover states
- **Large screens (xl: 1280px+)**: Consistent behavior with proper spacing

```tsx
// Responsive positioning
<PaginationComponent
  className="justify-center md:justify-start lg:justify-end"
  // ... other props
/>
```

## Accessibility

### ARIA Support
- **Navigation Role**: `role="navigation"` on main container
- **Pagination Label**: `aria-label="pagination"` for screen readers
- **Current Page**: `aria-current="page"` on active page links
- **Disabled State**: `aria-disabled="true"` on disabled elements
- **Action Labels**: `aria-label="Go to previous page"` and `aria-label="Go to next page"`

### Screen Reader Support
- **Hidden Content**: `sr-only` class for "More pages" text on ellipsis
- **Semantic HTML**: Proper `<nav>`, `<ul>`, `<li>` structure
- **Button Elements**: Native `<button>` elements for navigation controls

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through pagination controls
- **Enter/Space**: Activate pagination links and buttons
- **Focus Management**: Visible focus indicators on all interactive elements

```tsx
// Screen reader friendly ellipsis
<PaginationEllipsis>
  <PiMoreFill className="size-4" />
  <span className="sr-only">More pages</span>
</PaginationEllipsis>
```

## Dependencies

### Internal Dependencies
- **Icons**: `PiArrowLeftSLine`, `PiArrowRightSLine`, `PiMoreFill` from `@/components/icons`
- **Utilities**: `cn` utility from `@/lib/utils/cn` for conditional classes

### Design System Dependencies
- **Typography System**: `typography-labelSmall` for consistent text sizing
- **Color System**: `pgText-*`, `pgBackground-*`, `pgStroke-*` color tokens
- **Spacing System**: Tailwind spacing utilities (`gap-2`, `p-2`, `h-8`, etc.)

### External Dependencies
- **React**: `React.forwardRef` for proper ref forwarding
- **Tailwind CSS**: For utility classes and responsive design

## Advanced Usage

### Smart Pagination Logic
The component automatically handles complex pagination scenarios:
- Shows up to 5 visible pages
- Adds ellipsis for large page sets
- Keeps current page centered when possible
- Shows first and last pages when appropriate

```tsx
// Example with 100 pages, current page 50
<PaginationComponent
  size={100}
  currentPage={50}
  onChange={handlePageChange}
  // Will show: [< 48 49 50 51 52 ... 100 >]
/>
```