# FramerVariant Type Definition

## Purpose

The `FramerVariant` type serves as a standardized container for Framer Motion animation variants within our application. It provides type safety for animation configurations by mapping string keys to Framer Motion `Variant` objects, enabling consistent and reusable animation patterns across components.

This type acts as a bridge between our application's animation requirements and Framer Motion's variant system, ensuring all animation states are properly typed and discoverable.

## Type Definition

```typescript
import { Variant } from 'framer-motion';

export type FramerVariant = Record<string, Variant>;
```

### Structure Breakdown

- **Base Type**: `Record<string, Variant>`
- **Key Type**: `string` - Animation state names (e.g., "initial", "animate", "exit")
- **Value Type**: `Variant` - Framer Motion variant configuration object
- **External Dependency**: Leverages `Variant` from `framer-motion` library

## Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `[key: string]` | `Variant` | Animation variant configuration mapped to a state name | Yes |

### Variant Properties (from Framer Motion)

Each `Variant` can contain:

| Property | Type | Description |
|----------|------|-------------|
| `x`, `y`, `z` | `number \| string` | Transform positions |
| `scale` | `number` | Scale transformation |
| `opacity` | `number` | Opacity value (0-1) |
| `rotate` | `number \| string` | Rotation angle |
| `transition` | `Transition` | Animation timing configuration |
| `when` | `string` | Orchestration timing |

## Usage Examples

### Basic Animation Variants

```typescript
import { FramerVariant } from '@/lib/types/framer-variants';

// Fade in/out animation
const fadeVariants: FramerVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Slide animation with transitions
const slideVariants: FramerVariant = {
  initial: { x: -100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};
```

### Component Integration

```typescript
import { motion } from 'framer-motion';
import { FramerVariant } from '@/lib/types/framer-variants';

interface AnimatedCardProps {
  children: React.ReactNode;
  variants?: FramerVariant;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  variants = defaultCardVariants 
}) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

// Default variants for the component
const defaultCardVariants: FramerVariant = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 }
};
```

### Complex Animation States

```typescript
// Modal animation with multiple states
const modalVariants: FramerVariant = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  closing: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15 }
  }
};
```

### Utility Functions

```typescript
// Helper function to create consistent variants
function createFadeVariants(duration: number = 0.3): FramerVariant {
  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { duration } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: duration * 0.8 } 
    }
  };
}

// Usage
const quickFade = createFadeVariants(0.2);
const slowFade = createFadeVariants(0.8);
```

## Type Architecture Pattern

### Domain Layer
```typescript
// Animation domain objects
export type FramerVariant = Record<string, Variant>;

// Specific animation interfaces
interface TransitionConfig {
  duration?: number;
  ease?: string;
  delay?: number;
}
```

### Component Layer
```typescript
// Component-specific variant props
interface ComponentVariantProps {
  variants?: FramerVariant;
  initial?: string;
  animate?: string;
  exit?: string;
}
```

### Service Layer
```typescript
// Animation service configurations
interface AnimationPreset {
  name: string;
  variants: FramerVariant;
  description: string;
}
```

## Related Types

### Core Dependencies
- `Variant` from `framer-motion` - Base variant type
- `Transition` from `framer-motion` - Animation timing configuration

### Extended Types
```typescript
// Themed variants with consistent naming
interface ThemeVariants {
  fade: FramerVariant;
  slide: FramerVariant;
  scale: FramerVariant;
  flip: FramerVariant;
}

// Page transition variants
interface PageTransitionVariants extends FramerVariant {
  initial: Variant;
  animate: Variant;
  exit: Variant;
}
```

### Composition Types
```typescript
// Component with animation capabilities
interface AnimatableProps {
  variants?: FramerVariant;
  animate?: boolean;
  animationKey?: string;
}
```

## Integration Points

### Components
- **AnimatedCard**: Uses variants for enter/exit animations
- **PageTransition**: Implements page-level animation variants
- **Modal**: Utilizes variants for show/hide animations
- **Toast**: Applies variants for notification animations

### Services
- **AnimationService**: Manages preset variant configurations
- **ThemeService**: Provides theme-aware animation variants

### Hooks
```typescript
// Custom hook for animation variants
function useAnimationVariants(type: 'fade' | 'slide' | 'scale'): FramerVariant {
  return useMemo(() => {
    switch (type) {
      case 'fade': return fadeVariants;
      case 'slide': return slideVariants;
      case 'scale': return scaleVariants;
      default: return fadeVariants;
    }
  }, [type]);
}
```

## Validation

### Runtime Validation with Zod

```typescript
import { z } from 'zod';

// Variant value schema
const VariantSchema = z.record(z.any()); // Framer Motion variants are flexible

// FramerVariant validation
const FramerVariantSchema = z.record(z.string(), VariantSchema);

// Usage in component props validation
const AnimatedComponentPropsSchema = z.object({
  variants: FramerVariantSchema.optional(),
  children: z.any()
});

type AnimatedComponentProps = z.infer<typeof AnimatedComponentPropsSchema>;
```

### Type Guards

```typescript
// Type guard for FramerVariant
function isFramerVariant(value: unknown): value is FramerVariant {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.values(value).every(variant => 
      typeof variant === 'object' && variant !== null
    )
  );
}
```

## Best Practices

### 1. Consistent Naming Convention
```typescript
// ✅ Good: Descriptive state names
const buttonVariants: FramerVariant = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.95 },
  disabled: { scale: 1, opacity: 0.5 }
};

// ❌ Avoid: Generic or unclear names
const badVariants: FramerVariant = {
  state1: { scale: 1 },
  state2: { scale: 1.05 }
};
```

### 2. Reusable Variant Patterns
```typescript
// ✅ Good: Create reusable variant factories
function createScaleVariants(
  baseScale: number = 1,
  hoverScale: number = 1.05
): FramerVariant {
  return {
    initial: { scale: baseScale },
    hover: { scale: hoverScale },
    tap: { scale: baseScale * 0.95 }
  };
}
```

### 3. Type Safety with Strict Typing
```typescript
// ✅ Good: Explicit typing
const variants: FramerVariant = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
};

// ✅ Good: Using const assertion for immutability
const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 }
} as const satisfies FramerVariant;
```

### 4. Performance Optimization
```typescript
// ✅ Good: Memoize variants outside components
const CARD_VARIANTS: FramerVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// ✅ Good: Use useMemo for dynamic variants
function useResponsiveVariants(isMobile: boolean): FramerVariant {
  return useMemo(() => ({
    initial: { x: isMobile ? -100 : -200 },
    animate: { x: 0 },
    exit: { x: isMobile ? 100 : 200 }
  }), [isMobile]);
}
```

This type definition successfully adheres to our TypeScript guidelines by leveraging TypeScript's built-in `Record` utility type and maintaining strict typing through the imported `Variant` type from Framer Motion, ensuring type safety across all animation implementations.