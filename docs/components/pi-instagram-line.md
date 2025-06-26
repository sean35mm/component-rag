# PiInstagramLine Icon Component

## Purpose
The `PiInstagramLine` component renders an Instagram icon using SVG. It provides a standardized, scalable Instagram logo icon that follows the outlined/line style variant, commonly used for social media links, sharing buttons, and brand representation throughout the application.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | `{}` | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for styling |
| `style` | `CSSProperties` | Inline styles |
| `onClick` | `MouseEventHandler` | Click event handler |
| `aria-label` | `string` | Accessibility label |
| `role` | `string` | ARIA role attribute |

## Usage Example

```tsx
import { PiInstagramLine } from '@/components/icons/pi/pi-instagram-line';

// Basic usage
export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <PiInstagramLine className="w-6 h-6 text-gray-600 hover:text-pink-500" />
    </div>
  );
}

// As a clickable social media link
export function InstagramLink() {
  return (
    <a 
      href="https://instagram.com/yourhandle"
      className="inline-flex items-center gap-2 text-gray-700 hover:text-pink-600"
      aria-label="Follow us on Instagram"
    >
      <PiInstagramLine className="w-5 h-5" />
      <span>Follow us</span>
    </a>
  );
}

// In a social sharing component
export function SocialShareButtons({ url }: { url: string }) {
  const shareOnInstagram = () => {
    // Instagram sharing logic
    window.open(`https://www.instagram.com/`, '_blank');
  };

  return (
    <button
      onClick={shareOnInstagram}
      className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
      aria-label="Share on Instagram"
    >
      <PiInstagramLine className="w-4 h-4" />
    </button>
  );
}

// With custom styling
export function BrandFooter() {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="flex items-center justify-center">
        <PiInstagramLine 
          className="w-8 h-8 text-pink-400"
          style={{ filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.3))' }}
        />
      </div>
    </footer>
  );
}
```

## Functionality

### Core Features
- **Scalable Vector Rendering**: SVG-based icon that scales perfectly at any size
- **Current Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Default `1em` sizing adapts to parent font size
- **Accessibility Ready**: Accepts all ARIA attributes for screen reader support
- **Interactive Capable**: Supports click handlers and hover states

### Visual Characteristics
- **Style**: Outlined/line variant of Instagram logo
- **Viewbox**: 24x24 coordinate system
- **Paths**: Multi-path SVG with camera body, lens, and viewfinder elements
- **Fill Strategy**: Solid fill using current color

## State Management
**None Required** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions. All interactivity is handled by parent components through event props.

## Dependencies

### Internal Dependencies
- `react` - For `SVGProps` type definition

### External Dependencies
- None - Completely self-contained component

### Related Components
- Other Pi icon family components (`pi-facebook-line`, `pi-twitter-line`, etc.)
- Social media link components
- Brand/footer components
- Sharing button components

## Integration

### Application Architecture Role
```
App Layout
├── Header/Navigation
│   └── SocialLinks (uses PiInstagramLine)
├── Content Areas
│   ├── SocialShareButtons (uses PiInstagramLine)
│   └── AuthorBio (uses PiInstagramLine)
└── Footer
    └── BrandSocials (uses PiInstagramLine)
```

### Common Integration Patterns
- **Social Media Sections**: Combined with other social icons
- **Share Functionality**: Part of content sharing toolbars
- **Contact Information**: In author bios and team profiles
- **Brand Elements**: Footer and header branding areas
- **Call-to-Action Buttons**: Social follow prompts

## Best Practices

### Architecture Adherence
✅ **Server Component**: Correctly implemented as server component  
✅ **Flat Component Structure**: Single-purpose icon component  
✅ **Reusable Design**: Generic enough for multiple use cases  
✅ **Prop Spreading**: Properly forwards all SVG props  

### Usage Recommendations

```tsx
// ✅ Good: Semantic usage with proper accessibility
<a href="instagram-url" aria-label="Instagram profile">
  <PiInstagramLine className="w-6 h-6" />
</a>

// ✅ Good: Consistent sizing with Tailwind classes
<PiInstagramLine className="w-5 h-5 text-pink-500" />

// ✅ Good: Color inheritance
<div className="text-gray-600">
  <PiInstagramLine /> {/* Inherits gray-600 */}
</div>

// ❌ Avoid: Hardcoded dimensions in style
<PiInstagramLine style={{ width: '24px', height: '24px' }} />

// ❌ Avoid: Missing accessibility context
<button onClick={shareHandler}>
  <PiInstagramLine /> {/* No aria-label */}
</button>
```

### Performance Considerations
- **Bundle Size**: Minimal impact due to simple SVG structure
- **Rendering**: Fast server-side rendering with no hydration needed
- **Accessibility**: Always provide `aria-label` for interactive usage
- **SEO**: Use semantic HTML structure around icons for context