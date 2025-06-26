# Responsive Navigation Component Pattern

## Pattern Overview

The Responsive Navigation Component Pattern implements adaptive UI rendering based on device breakpoints. This pattern conditionally renders different navigation components for desktop and mobile viewports, providing optimized user experiences across device types.

**When to use this pattern:**
- Building responsive applications with different UI requirements per device
- Managing complex navigation systems that need device-specific implementations
- Implementing adaptive layouts that go beyond CSS media queries
- Creating components that require fundamentally different behaviors across breakpoints

## Architecture

```
Navigation (Root Component)
├── Breakpoint Detection Layer
│   └── useBreakpoint('lg')
├── Analytics Layer
│   └── useHeap()
├── Desktop Branch
│   └── FileDisplayPanel
└── Mobile Branch
    ├── MobileNavigation
    └── MobileAccessibilityHint
```

### Component Hierarchy

```tsx
Navigation
├── Desktop (≥ lg breakpoint)
│   └── FileDisplayPanel
└── Mobile (< lg breakpoint)
    ├── MobileNavigation
    └── MobileAccessibilityHint
```

## Implementation Details

### Core Implementation Techniques

1. **Breakpoint-Driven Conditional Rendering**
   ```tsx
   const isDesktop = useBreakpoint('lg');
   
   if (isDesktop) {
     return <DesktopComponent />;
   }
   
   return <MobileComponent />;
   ```

2. **Hook-Based State Management**
   - `useBreakpoint`: Manages responsive state
   - `useHeap`: Handles analytics tracking

3. **Component Composition Strategy**
   - Single responsibility: Navigation only handles routing logic
   - Delegates actual UI to specialized components
   - Clean separation between desktop and mobile implementations

### Key Architectural Decisions

- **Client-side rendering** (`'use client'`) for dynamic breakpoint detection
- **Early return pattern** for cleaner conditional rendering
- **Fragment wrapping** for multiple mobile components without additional DOM nodes

## Usage Examples

### Basic Implementation

```tsx
'use client';

import React from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';

export const ResponsiveNavigation = () => {
  const isDesktop = useBreakpoint('lg');

  if (isDesktop) {
    return <DesktopNavigation />;
  }

  return (
    <>
      <MobileNavigation />
      <MobileAccessibilityFeatures />
    </>
  );
};
```

### Extended Pattern with Multiple Breakpoints

```tsx
'use client';

import React from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';

export const MultiBreakpointNavigation = () => {
  const isMobile = useBreakpoint('sm');
  const isTablet = useBreakpoint('md');
  const isDesktop = useBreakpoint('lg');

  if (isDesktop) {
    return <DesktopNavigation />;
  }

  if (isTablet) {
    return <TabletNavigation />;
  }

  return <MobileNavigation />;
};
```

### Pattern with Loading States

```tsx
'use client';

import React from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';

export const NavigationWithLoading = () => {
  const { isDesktop, isLoading } = useBreakpoint('lg');

  if (isLoading) {
    return <NavigationSkeleton />;
  }

  return isDesktop ? <DesktopNav /> : <MobileNav />;
};
```

## Best Practices

### 1. Consistent Breakpoint Strategy
```tsx
// Define breakpoints in a central configuration
const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const;

// Use consistent breakpoint keys across components
const isDesktop = useBreakpoint('lg');
```

### 2. Component Naming Conventions
```tsx
// Clear, descriptive component names
export const Navigation = () => { /* ... */ };
export const MobileNavigation = () => { /* ... */ };
export const DesktopNavigation = () => { /* ... */ };
```

### 3. Accessibility Considerations
```tsx
return (
  <>
    <MobileNavigation />
    <MobileAccessibilityHint /> {/* Always include accessibility features */}
  </>
);
```

### 4. Performance Optimization
```tsx
// Lazy load heavy components
const DesktopNavigation = React.lazy(() => import('./desktop-navigation'));
const MobileNavigation = React.lazy(() => import('./mobile-navigation'));

export const Navigation = () => {
  const isDesktop = useBreakpoint('lg');

  return (
    <Suspense fallback={<NavigationSkeleton />}>
      {isDesktop ? <DesktopNavigation /> : <MobileNavigation />}
    </Suspense>
  );
};
```

## Integration

### Hook Dependencies

```tsx
// useBreakpoint hook structure
interface UseBreakpointReturn {
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  currentBreakpoint: string;
}

// useHeap hook for analytics
interface UseHeapReturn {
  track: (event: string, properties?: object) => void;
  identify: (userId: string, properties?: object) => void;
}
```

### Component Dependencies

```tsx
// Import structure
import { FileDisplayPanel } from '../file-display-panel';
import { MobileNavigation } from './mobile-navigation';
import { MobileAccessibilityHint } from './mobile-accessibility-hint';
```

### Context Integration

```tsx
// Integration with layout context
export const Navigation = () => {
  const { layout } = useLayoutContext();
  const isDesktop = useBreakpoint('lg');
  
  useHeap(); // Analytics tracking
  
  if (isDesktop && layout.showFilePanel) {
    return <FileDisplayPanel />;
  }
  
  return <MobileNavigation />;
};
```

## Type Safety

### Component Props Interface

```tsx
interface NavigationProps {
  className?: string;
  testId?: string;
}

interface MobileNavigationProps extends NavigationProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

interface DesktopNavigationProps extends NavigationProps {
  showFilePanel?: boolean;
  onFileSelect?: (file: File) => void;
}
```

### Breakpoint Type Definitions

```tsx
type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface UseBreakpointOptions {
  fallback?: boolean;
  ssr?: boolean;
}

function useBreakpoint(
  breakpoint: BreakpointKey,
  options?: UseBreakpointOptions
): boolean;
```

### Component Type Exports

```tsx
export type { NavigationProps, MobileNavigationProps, DesktopNavigationProps };
export type { BreakpointKey, UseBreakpointOptions };
```

## Performance

### Optimization Strategies

1. **Code Splitting**
   ```tsx
   // Split mobile and desktop bundles
   const MobileNavigation = React.lazy(() => 
     import('./mobile-navigation').then(module => ({
       default: module.MobileNavigation
     }))
   );
   ```

2. **Memoization**
   ```tsx
   const Navigation = React.memo(() => {
     const isDesktop = useBreakpoint('lg');
     // Component logic
   });
   ```

3. **Conditional Loading**
   ```tsx
   // Only load components when needed
   if (isDesktop) {
     return <FileDisplayPanel />;
   }
   
   // Mobile components loaded only on mobile
   return (
     <>
       <MobileNavigation />
       <MobileAccessibilityHint />
     </>
   );
   ```

### Performance Metrics

- **Bundle Size**: Desktop and mobile components loaded separately
- **Runtime Performance**: Single breakpoint check per render
- **Memory Usage**: Unused components not instantiated

## Testing

### Unit Testing Strategy

```tsx
// Navigation.test.tsx
import { render, screen } from '@testing-library/react';
import { Navigation } from './navigation';

// Mock breakpoint hook
jest.mock('@/hooks/use-breakpoint');
const mockUseBreakpoint = useBreakpoint as jest.MockedFunction<typeof useBreakpoint>;

describe('Navigation', () => {
  it('renders desktop navigation on large screens', () => {
    mockUseBreakpoint.mockReturnValue(true);
    
    render(<Navigation />);
    
    expect(screen.getByTestId('file-display-panel')).toBeInTheDocument();
  });

  it('renders mobile navigation on small screens', () => {
    mockUseBreakpoint.mockReturnValue(false);
    
    render(<Navigation />);
    
    expect(screen.getByTestId('mobile-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-accessibility-hint')).toBeInTheDocument();
  });
});
```

### Integration Testing

```tsx
// Integration test with real breakpoint detection
describe('Navigation Integration', () => {
  it('responds to breakpoint changes', async () => {
    const { rerender } = render(<Navigation />);
    
    // Simulate viewport change
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    window.dispatchEvent(new Event('resize'));
    
    await waitFor(() => {
      expect(screen.getByTestId('file-display-panel')).toBeInTheDocument();
    });
  });
});
```

### E2E Testing

```tsx
// Cypress test
describe('Responsive Navigation', () => {
  it('shows correct navigation for different viewports', () => {
    cy.visit('/');
    
    // Test desktop view
    cy.viewport(1200, 800);
    cy.get('[data-testid="file-display-panel"]').should('be.visible');
    
    // Test mobile view
    cy.viewport(375, 667);
    cy.get('[data-testid="mobile-navigation"]').should('be.visible');
    cy.get('[data-testid="mobile-accessibility-hint"]').should('be.visible');
  });
});
```

## Common Pitfalls

### 1. Server-Side Rendering Hydration Mismatch

**Problem:**
```tsx
// ❌ Can cause hydration mismatch
export const Navigation = () => {
  const isDesktop = useBreakpoint('lg'); // undefined on server
  
  if (isDesktop) {
    return <DesktopNav />;
  }
  
  return <MobileNav />;
};
```

**Solution:**
```tsx
// ✅ Handle SSR properly
export const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint('lg');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <NavigationSkeleton />;
  }
  
  return isDesktop ? <DesktopNav /> : <MobileNav />;
};
```

### 2. Breakpoint Inconsistency

**Problem:**
```tsx
// ❌ Inconsistent breakpoint usage
const Navigation = () => {
  const isDesktop = useBreakpoint('lg');
  // ...
};

const Header = () => {
  const isDesktop = useBreakpoint('xl'); // Different breakpoint!
  // ...
};
```

**Solution:**
```tsx
// ✅ Consistent breakpoint strategy
const DESKTOP_BREAKPOINT = 'lg' as const;

const Navigation = () => {
  const isDesktop = useBreakpoint(DESKTOP_BREAKPOINT);
  // ...
};
```

### 3. Missing Accessibility Considerations

**Problem:**
```tsx
// ❌ Missing accessibility features
return isDesktop ? <DesktopNav /> : <MobileNav />;
```

**Solution:**
```tsx
// ✅ Include accessibility features
return isDesktop ? (
  <DesktopNav />
) : (
  <>
    <MobileNav />
    <MobileAccessibilityHint />
  </>
);
```

### 4. Performance Issues with Heavy Components

**Problem:**
```tsx
// ❌ Both components always imported
import { HeavyDesktopNav } from './heavy-desktop-nav';
import { HeavyMobileNav } from './heavy-mobile-nav';
```

**Solution:**
```tsx
// ✅ Conditional imports with lazy loading
const DesktopNav = React.lazy(() => import('./heavy-desktop-nav'));
const MobileNav = React.lazy(() => import('./heavy-mobile-nav'));
```

### 5. State Management Complexity

**Problem:**
```tsx
// ❌ State lost during breakpoint changes
const [navState, setNavState] = useState(initialState);

if (isDesktop) {
  return <DesktopNav state={navState} />; // State might not be compatible
}

return <MobileNav state={navState} />;
```

**Solution:**
```tsx
// ✅ Shared state management
const navState = useNavigationState(); // Shared hook
const isDesktop = useBreakpoint('lg');

return isDesktop ? (
  <DesktopNav {...navState} />
) : (
  <MobileNav {...navState} />
);
```