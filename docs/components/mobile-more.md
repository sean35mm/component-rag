# MobileMore Component Documentation

## Purpose

The `MobileMore` component renders an extended navigation menu specifically designed for mobile devices. It provides access to social media links, product links, policy links, and a cancel action in a mobile-optimized layout. This component is typically used within a mobile navigation drawer or modal to offer additional navigation options beyond the primary menu items.

## Component Type

**Client Component** - Uses the `'use client'` directive because it handles user interactions (onClick events) and is designed to be rendered in an interactive mobile navigation context where user events need to be processed on the client side.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onClose` | `() => void` | Optional | `undefined` | Callback function triggered when the Cancel button is clicked, typically used to close the mobile navigation menu |

## Usage Example

```tsx
import { MobileMore } from '@/components/main-layout/navigation/mobile-more';

// Basic usage in a mobile navigation drawer
export const MobileNavDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-nav-drawer">
      {/* Other mobile nav items */}
      <MobileMore onClose={handleClose} />
    </div>
  );
};

// Usage in a modal context
export const MobileNavModal = () => {
  const { isOpen, close } = useMobileNavStore();

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <MobileMore onClose={close} />
    </Modal>
  );
};
```

## Functionality

### Core Features

- **Social Media Integration**: Renders interactive social media icons with hover effects and proper accessibility attributes
- **Product Navigation**: Displays product links with external targeting for seamless navigation
- **Policy Access**: Provides quick access to legal/policy documents
- **Dismissal Action**: Includes a cancel button for closing the extended menu
- **Responsive Design**: Optimized layout with proper spacing and visual hierarchy for mobile screens

### Visual Elements

- Social icons with background styling and hover states
- Bordered sections for visual separation
- Typography hierarchy using the design system
- Full-width cancel button for easy interaction

## State Management

**Local State Only** - This component doesn't manage complex state internally. It relies on:
- Props for configuration (`onClose` callback)
- External state management for open/close state (typically handled by parent components)
- Static data from constants for link definitions

## Side Effects

### External Interactions

- **External Navigation**: Opens product and policy links in new tabs/windows
- **Social Media Links**: Navigates to external social media platforms
- **Parent Communication**: Triggers parent component callbacks via `onClose`

### Browser APIs

- Uses `target='_blank'` and `rel='noopener noreferrer'` for secure external link handling
- Relies on browser navigation APIs through Next.js Link component

## Dependencies

### Internal Dependencies

```tsx
// UI Components
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

// Navigation
import NextLink from 'next/link';

// Constants
import { POLICY_LINKS, PRODUCT_LINKS, SOCIAL_LINKS } from '@/lib/constants';
```

### External Dependencies

- **Next.js**: For optimized client-side navigation
- **React**: Core framework functionality

## Integration

### Application Architecture Role

```
Main Layout
└── Navigation System
    ├── Desktop Navigation
    ├── Mobile Navigation
    │   ├── Primary Mobile Menu
    │   └── MobileMore (Extended Options) ←
    └── Navigation State Management
```

### Integration Patterns

- **Mobile-First Design**: Complements responsive navigation strategy
- **Modular Navigation**: Can be composed with other navigation components
- **State Coordination**: Works with parent navigation state management
- **Design System Compliance**: Uses standardized UI components and typography

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: Follows flat structure principle - single responsibility for mobile extended navigation

✅ **Reusability**: Uses shared UI components (`Button`, `Typography`) from the design system

✅ **Client Component Usage**: Appropriately uses 'use client' for interactive functionality

✅ **External Link Security**: Implements proper security practices with `noopener noreferrer`

### Implementation Recommendations

```tsx
// ✅ Good: Proper callback handling
<MobileMore onClose={() => setNavOpen(false)} />

// ✅ Good: Integration with state management
const { closeMobileNav } = useNavigationStore();
<MobileMore onClose={closeMobileNav} />

// ❌ Avoid: Missing onClose handling
<MobileMore /> // Cancel button won't function properly
```

### Performance Considerations

- Static link data prevents unnecessary re-renders
- Minimal state management reduces component complexity
- External links properly configured to avoid security issues
- Uses semantic HTML structure for accessibility