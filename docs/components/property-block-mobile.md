# PropertyBlockMobile Components

## Purpose

The `PropertyBlockMobile` and `PropertyBlockMobileDrawer` components are specialized UI blocks designed for displaying property information in mobile interfaces. They provide consistent formatting for title-value pairs with different visual treatments - `PropertyBlockMobile` for standard property displays and `PropertyBlockMobileDrawer` for drawer/modal contexts with enhanced visual hierarchy.

## Props Interface

### PropertyBlockMobile

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The label/title text displayed above the content |
| `children` | `React.ReactNode` | ❌ | - | The content/value to display below the title |
| `className` | `string` | ❌ | - | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes (onClick, data-*, etc.) |

### PropertyBlockMobileDrawer

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | The label/title text displayed above the content |
| `children` | `React.ReactNode` | ❌ | - | The content/value to display below the title |
| `className` | `string` | ❌ | - | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes (onClick, data-*, etc.) |

## Usage Examples

### Basic PropertyBlockMobile

```tsx
import { PropertyBlockMobile } from '@/components/ui/property-block-mobile';

function PropertyList() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PropertyBlockMobile title="Property Type">
        <span className="typography-labelMedium text-pgText-900">
          Residential
        </span>
      </PropertyBlockMobile>
      
      <PropertyBlockMobile title="Square Footage">
        <span className="typography-labelMedium text-pgText-900">
          2,450 sq ft
        </span>
      </PropertyBlockMobile>
      
      <PropertyBlockMobile title="Year Built">
        <span className="typography-labelMedium text-pgText-900">
          2018
        </span>
      </PropertyBlockMobile>
    </div>
  );
}
```

### PropertyBlockMobileDrawer with Rich Content

```tsx
import { PropertyBlockMobileDrawer } from '@/components/ui/property-block-mobile';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';

function PropertyDrawer() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PropertyBlockMobileDrawer title="Status">
        <Badge variant="success" className="typography-labelSmall">
          Active
        </Badge>
      </PropertyBlockMobileDrawer>
      
      <PropertyBlockMobileDrawer title="Amenities">
        <div className="flex items-center gap-2">
          <Icon name="pool" className="text-pgBlue-500" size={16} />
          <Icon name="gym" className="text-pgBlue-500" size={16} />
          <Icon name="parking" className="text-pgBlue-500" size={16} />
        </div>
      </PropertyBlockMobileDrawer>
      
      <PropertyBlockMobileDrawer title="Price Range">
        <div className="flex items-center gap-2">
          <span className="typography-labelLarge text-pgText-900">
            $450,000
          </span>
          <span className="typography-labelSmall text-pgText-600">
            - $650,000
          </span>
        </div>
      </PropertyBlockMobileDrawer>
    </div>
  );
}
```

### Interactive Properties

```tsx
import { PropertyBlockMobile } from '@/components/ui/property-block-mobile';

function InteractivePropertyList() {
  return (
    <div className="flex flex-col gap-3">
      <PropertyBlockMobile 
        title="Contact Agent"
        className="cursor-pointer hover:bg-pgBackground-50 p-3 rounded-lg transition-colors"
        onClick={() => console.log('Contact clicked')}
      >
        <div className="flex items-center gap-2">
          <span className="typography-labelMedium text-pgBlue-600">
            Sarah Johnson
          </span>
          <Icon name="phone" size={16} className="text-pgBlue-500" />
        </div>
      </PropertyBlockMobile>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **PropertyBlockMobile**: Uses `typography-paragraphXSmall` for titles
- **PropertyBlockMobileDrawer**: Uses `typography-subheading2XSmall` for titles with uppercase transformation

### Color Tokens
- **Title Colors**: 
  - PropertyBlockMobile: `pgText-700` (medium gray)
  - PropertyBlockMobileDrawer: `pgText-400` (lighter gray for subtle hierarchy)
- **Content Colors**: Flexible - typically `pgText-900` for primary content, `pgText-600` for secondary

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `gap-1`, `items-center`
- **Typography**: `uppercase` (PropertyBlockMobileDrawer only)
- **Spacing**: Standard Tailwind spacing scale

## Styling

### Default Styles

**PropertyBlockMobile:**
- Simple vertical layout with no gap
- Title in medium gray (`pgText-700`)
- Content flows naturally below title

**PropertyBlockMobileDrawer:**
- Vertical layout with `gap-1` (4px)
- Uppercase title styling for emphasis
- Horizontal content alignment with `items-center`
- Lighter title color for reduced visual weight

### Customization Options

```tsx
// Custom spacing and background
<PropertyBlockMobile 
  className="bg-pgBackground-50 p-4 rounded-lg gap-2 flex flex-col"
  title="Custom Property"
>
  <span>Custom content</span>
</PropertyBlockMobile>

// Custom title styling override
<PropertyBlockMobileDrawer 
  className="gap-3 bg-pgNeutral-50 p-3 rounded-md"
  title="Enhanced Property"
>
  <span className="typography-labelLarge text-pgText-900">
    Enhanced content
  </span>
</PropertyBlockMobileDrawer>
```

### State Variations

```tsx
// Error state
<PropertyBlockMobile 
  title="Validation Error"
  className="border-l-4 border-pgStateError-base pl-3"
>
  <span className="typography-labelSmall text-pgStateError-dark">
    Invalid property value
  </span>
</PropertyBlockMobile>

// Success state
<PropertyBlockMobileDrawer 
  title="Verified Property"
  className="bg-pgStateSuccess-lighter/20 p-3 rounded-lg"
>
  <Badge variant="success">Verified</Badge>
</PropertyBlockMobileDrawer>
```

## Responsive Design

### Breakpoint Behavior
- **sm (640px)**: Optimized for mobile-first design
- **md (768px)**: Maintains mobile layout but can be used in sidebar contexts
- **lg+ (1024px+)**: Typically replaced by desktop property components

### Responsive Usage Example

```tsx
// Responsive property display
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <PropertyBlockMobile title="Bedrooms">
    <span className="typography-labelMedium">3</span>
  </PropertyBlockMobile>
  
  <PropertyBlockMobile title="Bathrooms">
    <span className="typography-labelMedium">2.5</span>
  </PropertyBlockMobile>
</div>

// Hide on larger screens
<div className="block lg:hidden">
  <PropertyBlockMobileDrawer title="Mobile Only">
    <span>This content only shows on mobile</span>
  </PropertyBlockMobileDrawer>
</div>
```

## Accessibility

### ARIA Considerations
- Components use semantic HTML structure
- Titles are properly associated with content through DOM hierarchy
- Interactive variants should include appropriate ARIA labels

### Screen Reader Support

```tsx
// Enhanced accessibility
<PropertyBlockMobile 
  title="Price"
  role="group"
  aria-labelledby="price-label"
>
  <span id="price-label" className="sr-only">Property price</span>
  <span aria-label="450 thousand dollars">$450,000</span>
</PropertyBlockMobile>

// Interactive accessibility
<PropertyBlockMobileDrawer 
  title="Contact Information"
  onClick={handleContact}
  role="button"
  tabIndex={0}
  aria-label="Contact property agent"
  onKeyDown={(e) => e.key === 'Enter' && handleContact()}
>
  <span>Sarah Johnson</span>
</PropertyBlockMobileDrawer>
```

### Focus Management
- Interactive variants support keyboard navigation
- Visual focus indicators follow design system standards
- Proper tab order maintained

## Dependencies

### Internal Dependencies
- **Typography Component**: `@/components/ui/typography` - Provides consistent text styling
- **Utility Functions**: `@/lib/utils/cn` - Class name utility for conditional styling

### Related Components
- **PropertyBlock**: Desktop variant for larger screens
- **Badge**: Commonly used for status indicators within property blocks
- **Icon**: Frequently used for visual enhancement in property displays
- **Card**: Often used as container for multiple property blocks

### Design System Dependencies
- **Color System**: Relies on pgText and pgBackground color tokens
- **Typography Scale**: Uses paragraph and subheading typography variants
- **Spacing System**: Follows standard Tailwind spacing conventions