# LeafRender Component

## Purpose

The `LeafRender` component displays categorized "leaf" items (like sources, citations, or references) in an animated, pill-based interface. It's part of the thread thinking visualization system, presenting structured data in a visually organized and accessible format with motion animations that respect user preferences.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Integrates with Framer Motion for complex animations
- Handles user motion preferences dynamically
- Manages interactive visual states and transitions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `leaves` | `LeafItem[]` | Yes | Array of leaf items to render, each containing a type and payload |
| `prefersReducedMotion` | `boolean \| null` | Yes | User's motion preference setting - disables animations when true |

### LeafItem Type Structure
```typescript
interface LeafItem {
  leafType: string;
  payload: any[];
  restCount?: number;
}
```

## Usage Example

```tsx
import { LeafRender } from '@/components/answers/thread-question-answer-pair/thread-thinking/leaves';

function ThinkingDisplay() {
  const leaves = [
    {
      leafType: 'sources',
      payload: ['wikipedia.org', 'nature.com', 'arxiv.org'],
      restCount: 5
    },
    {
      leafType: 'citations',
      payload: ['Smith et al. 2023', 'Johnson 2022']
    }
  ];

  return (
    <div className="thinking-section">
      <LeafRender 
        leaves={leaves}
        prefersReducedMotion={false}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Conditional Rendering**: Returns null for empty or invalid leaf arrays
- **Categorized Display**: Groups items by leaf type with descriptive labels
- **Pill-Based UI**: Renders individual items as interactive pills
- **Overflow Handling**: Shows "more" indicators for truncated lists
- **Accessibility**: Respects reduced motion preferences
- **Staggered Animation**: Sequential reveal of leaf categories and items

### Animation Behavior
- Container animates from hidden to visible state
- Individual leaf items animate with custom delays based on index
- Pills animate independently with entrance transitions
- All animations disabled when `prefersReducedMotion` is true

## State Management

**No Direct State Management** - This is a pure presentation component that:
- Receives all data through props
- Relies on parent components for state management
- Uses Framer Motion's internal animation state only

## Side Effects

**Animation Side Effects Only**:
- Framer Motion manages DOM transformations and transitions
- `willChange: 'opacity, transform'` optimizes rendering performance
- No external API calls or data mutations

## Dependencies

### Internal Dependencies
- `getLeafDescription()` - Utility function for generating leaf type descriptions
- `LeafPill` - Renders individual pill components
- `leafItemVariants`, `pillVariants` - Animation configuration objects

### External Dependencies
- **Framer Motion**: `motion`, `AnimatePresence` for animations
- **UI Components**: `Typography` for consistent text styling
- **Type Definitions**: `LeafItem` from answers thread store

## Integration

### Application Architecture Role
```
Thread Question Answer Pair
└── Thread Thinking
    ├── LeafRender ← Current component
    ├── LeafPill (child)
    └── Animation Variants
```

### Data Flow
1. Parent component fetches/manages leaf data
2. `LeafRender` receives structured leaf items
3. Renders categorized pills with descriptions
4. Handles animation orchestration and accessibility

### Styling Integration
- Uses Tailwind utility classes for layout and spacing
- Integrates with design system typography variants
- Maintains consistent pill-based visual language

## Best Practices

### Architecture Adherence
✅ **Client Component Justified**: Motion animations require client-side execution  
✅ **Component Decomposition**: Delegates pill rendering to specialized `LeafPill` component  
✅ **Accessibility First**: Respects user motion preferences throughout  
✅ **Performance Optimized**: Uses `willChange` and `AnimatePresence` for efficient animations  

### Implementation Patterns
- **Null Checks**: Defensive programming with early returns for invalid data
- **Key Strategy**: Stable keys combining leaf type, index, and item index
- **Conditional Animation**: Animation variants conditionally applied based on user preferences
- **Semantic Structure**: Clear hierarchy with labels and grouped content

### Recommended Usage
- Use within thinking/reasoning display contexts
- Ensure parent provides properly structured `LeafItem[]` data
- Always pass user's motion preference setting
- Consider loading states in parent components for better UX