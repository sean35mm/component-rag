# SourceCitationItem Component

## Purpose

The `SourceCitationItem` component displays a favicon or domain logo as a visual citation marker for external sources. It fetches and displays the favicon from a given domain, with automatic fallback to a text-based placeholder when the favicon fails to load. This component is primarily used in content citation systems, reference lists, and source attribution interfaces.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `domain` | `string` | ✅ | - | The domain name to fetch the favicon from and display as fallback text |
| `classNames` | `CitationItemClassNames` | ❌ | `undefined` | Custom CSS classes for styling different parts of the component |
| `priority` | `boolean` | ❌ | `false` | Whether to prioritize loading this favicon (useful for above-the-fold content) |
| `size` | `CitationItemSizes \| null` | ❌ | `'32'` | Size variant for the citation item |

### CitationItemClassNames Interface
```typescript
interface CitationItemClassNames {
  common?: string;      // Applied to both favicon and placeholder
  placeholder?: string; // Applied only to the fallback placeholder
  wrapper?: string;     // Applied to the outer wrapper
}
```

## Usage Example

```tsx
import { SourceCitationItem } from '@/components/ui/source-citation-item';

function ArticleCitations() {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-pgBackground-50 dark:bg-pgBackground-900 rounded-lg">
      {/* Basic usage */}
      <SourceCitationItem domain="example.com" />
      
      {/* With custom styling */}
      <SourceCitationItem 
        domain="github.com"
        size="48"
        priority={true}
        classNames={{
          wrapper: "ring-2 ring-pgBlue-200 dark:ring-pgBlue-800",
          common: "shadow-lg",
          placeholder: "bg-pgBlue-100 text-pgBlue-800 dark:bg-pgBlue-900 dark:text-pgBlue-200"
        }}
      />
      
      {/* Multiple sources with consistent styling */}
      {['stackoverflow.com', 'developer.mozilla.org', 'reactjs.org'].map(domain => (
        <SourceCitationItem
          key={domain}
          domain={domain}
          size="24"
          classNames={{
            wrapper: "hover:scale-110 transition-transform duration-200",
            common: "border border-pgStroke-200 dark:border-pgStroke-700"
          }}
        />
      ))}
    </div>
  );
}

// In a citation list with typography
function SourceList() {
  return (
    <div className="space-y-4">
      <h3 className="typography-titleH3 text-pgText-900 dark:text-pgText-100">
        Sources
      </h3>
      
      <div className="flex items-center gap-3 p-3 bg-pgNeutral-50 dark:bg-pgNeutral-900 rounded-md">
        <SourceCitationItem 
          domain="wikipedia.org"
          size="32"
          classNames={{
            wrapper: "flex-shrink-0"
          }}
        />
        <p className="typography-paragraphMedium text-pgText-700 dark:text-pgText-300">
          Wikipedia - The Free Encyclopedia
        </p>
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- The component relies on the `CitationItemPlaceholder` sub-component which may use:
  - `.typography-labelSmall` or `.typography-labelXSmall` for placeholder text
  - Font sizes adapt based on the `size` prop

### Color Tokens
- **Background Colors**: `pgBackground-*` variants for container backgrounds
- **Text Colors**: `pgText-*` variants for placeholder text
- **Border Colors**: `pgStroke-*` variants for borders and outlines
- **State Colors**: `pgStateInformation-*` for default citation styling

### Spacing & Layout
- Uses Tailwind spacing utilities (`gap-*`, `p-*`, `m-*`)
- Flexible sizing based on the design system's 4px base unit
- Consistent with other citation and badge components

## Styling

### Size Variants
The component supports multiple size variants through the `size` prop:
- `"16"` - Extra small (16x16px)
- `"20"` - Small (20x20px) 
- `"24"` - Small-medium (24x24px)
- `"32"` - Medium/Default (32x32px)
- `"48"` - Large (48x48px)
- `"64"` - Extra large (64x64px)

### Custom Styling Examples
```tsx
// Branded citation item
<SourceCitationItem 
  domain="company.com"
  classNames={{
    wrapper: "bg-pgBlue-50 dark:bg-pgBlue-950 rounded-full p-2",
    common: "ring-2 ring-pgBlue-200 dark:ring-pgBlue-800",
    placeholder: "bg-pgBlue-500 text-white"
  }}
/>

// Error state styling
<SourceCitationItem 
  domain="unreachable-site.com"
  classNames={{
    wrapper: "bg-pgStateError-lighter dark:bg-pgStateError-dark",
    placeholder: "bg-pgRed-100 text-pgRed-800 dark:bg-pgRed-900 dark:text-pgRed-200"
  }}
/>

// Highlighted/featured source
<SourceCitationItem 
  domain="featured-source.com"
  classNames={{
    wrapper: "bg-pgStateHighlighted-lighter dark:bg-pgStateHighlighted-dark shadow-lg",
    common: "border-2 border-pgGold-300 dark:border-pgGold-700"
  }}
/>
```

## Responsive Design

The component adapts across breakpoints:

```tsx
// Responsive sizing
<SourceCitationItem 
  domain="example.com"
  size="24"
  classNames={{
    wrapper: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
  }}
/>

// Responsive layout in citation grids
<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3 md:gap-4">
  {sources.map(domain => (
    <SourceCitationItem 
      key={domain}
      domain={domain}
      size="32"
      classNames={{
        wrapper: "aspect-square"
      }}
    />
  ))}
</div>
```

## Accessibility

### ARIA Considerations
- The `Favicon` component includes an `alt` prop with descriptive text: `"Logo for ${domain}"`
- Fallback placeholder provides text content when images fail to load
- Proper semantic structure for screen readers

### Keyboard Navigation
- Inherits focus styles from the design system
- Can be made interactive with additional wrapper elements:

```tsx
<button className="focus:ring-2 focus:ring-pgBlue-500 focus:outline-none rounded">
  <SourceCitationItem domain="interactive-source.com" />
</button>
```

### Color Contrast
- Fallback placeholder respects design system contrast ratios
- Dark mode support ensures proper contrast in all themes
- State colors maintain WCAG AA compliance

## Dependencies

### Related Components
- **`CitationItemWrapper`** - Provides consistent wrapper styling and layout
- **`CitationItemPlaceholder`** - Text-based fallback when favicon fails to load
- **`Favicon`** - Core favicon loading and display component

### Utilities
- **`cn`** - Class name utility for conditional styling
- **`CitationItemSizes`** - Type definitions for size variants
- **`CitationItemClassNames`** - Type definitions for custom styling

### External Dependencies
- Relies on favicon availability from external domains
- Uses `https://${domain}` URL pattern for favicon fetching
- Graceful degradation when network requests fail

## Best Practices

1. **Performance**: Use `priority={true}` for above-the-fold citations
2. **Consistency**: Apply consistent sizing within citation groups
3. **Fallbacks**: Always provide meaningful domain names for fallback text
4. **Grouping**: Use flex layouts with consistent gap spacing
5. **Loading States**: Consider loading indicators for slow favicon requests