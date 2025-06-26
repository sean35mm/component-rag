# SearchModal Static Components

## Purpose

The `search-modal-static-components` module provides foundational UI components for building search modal interfaces. It exports two primary components: `SearchModal` (an animated container wrapper) and `SearchFooter` (action buttons and operator information). These components serve as building blocks for complex search functionality, following the application's Lego block architecture pattern.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes Framer Motion for animations (`motion.div`)
- Handles user interactions (click events)
- Manages animation state transitions
- Requires DOM event handling capabilities

## Props Interface

### SearchModal Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | No | `undefined` | Controls visibility and animation state of the modal |
| `children` | `ReactNode` | No | `undefined` | Content to render inside the modal container |
| `className` | `string` | No | `undefined` | Additional CSS classes for styling customization |
| `ref` | `HTMLDivElement` | No | `undefined` | Forward ref to the underlying div element |
| ...rest | `HTMLMotionProps<'div'>` | No | - | All other Framer Motion div props |

### SearchFooter Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onClose` | `() => void` | Yes | - | Callback function triggered when Cancel button is clicked |
| `onConfirm` | `() => void` | Yes | - | Callback function triggered when Update Search button is clicked |
| `className` | `string` | No | `undefined` | Additional CSS classes for the footer container |
| ...rest | `HTMLAttributes<HTMLDivElement>` | No | - | Standard HTML div attributes |

## Usage Example

```tsx
import { useState } from 'react';
import { SearchModal, SearchFooter } from '@/components/search/smart-search-input/search-modal/search-modal-static-components';

function SearchInterface() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    // Implement search logic
    console.log('Performing search...');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsModalOpen(true)}>
        Open Search
      </button>
      
      <SearchModal open={isModalOpen} className="mt-2">
        {/* Search form content */}
        <div className="p-6">
          <input 
            type="text" 
            placeholder="Enter search terms..." 
            className="w-full p-2 border rounded"
          />
          {/* Additional search filters */}
        </div>
        
        <SearchFooter 
          onClose={handleCancel}
          onConfirm={handleSearch}
        />
      </SearchModal>
    </div>
  );
}
```

## Functionality

### SearchModal
- **Animated Visibility**: Smooth fade-in/fade-out transitions using Framer Motion
- **Conditional Interaction**: Automatically manages pointer events based on open state
- **Flexible Container**: Accepts any children content for modal body
- **Forward Ref Support**: Enables parent components to access DOM element directly

### SearchFooter
- **Standardized Actions**: Provides consistent Cancel/Confirm button layout
- **Boolean Operators Info**: Displays search syntax guidance to users
- **Responsive Design**: Button widths adapt to container constraints
- **Event Delegation**: Cleanly separates action handling from UI concerns

## State Management

**Local State Management** - These components are stateless UI primitives that:
- Accept state via props (controlled components)
- Delegate state management to parent components
- Use callback props for state updates (`onClose`, `onConfirm`)
- Follow the "lift state up" React pattern for reusability

No TanStack Query or Zustand integration at this level - state management is handled by consuming components.

## Side Effects

### SearchModal
- **Animation Side Effects**: Framer Motion handles opacity transitions and timing
- **DOM Manipulation**: Conditionally applies `pointer-events-none/auto` classes

### SearchFooter
- **Event Propagation**: Button clicks trigger parent callback functions
- **No Direct Side Effects**: Pure UI component with externalized action handling

## Dependencies

### External Dependencies
- **Framer Motion**: `motion` component and `HTMLMotionProps` for animations
- **React**: `forwardRef`, `HTMLAttributes` for component composition

### Internal Dependencies
- **UI Components**: 
  - `@/components/ui/boolean-operators-info` - Search syntax guidance
  - `@/components/ui/button` - Standardized button components
- **Utilities**: `@/lib/utils/cn` - Conditional className merging

## Integration

### Application Architecture Role
- **UI Layer**: Provides reusable search modal primitives
- **Composition Pattern**: Designed to be composed into larger search features
- **Domain Separation**: Lives in `/components/search/` domain-specific directory
- **Flat Architecture**: Avoids deep nesting, promotes component reusability

### Integration Points
- **Parent Search Components**: Consumed by higher-level search modal implementations
- **Form Integration**: Works with React Hook Form in parent components
- **Theme System**: Uses design token classes (`pgStroke-250`, `pgBackground-0`)

## Best Practices

### Architecture Adherence
✅ **Lego Block Composition**: Small, focused components that combine well  
✅ **Client Component Justification**: Uses `'use client'` only for animation requirements  
✅ **Props Interface Design**: Clear, type-safe interfaces with appropriate defaults  
✅ **Forward Ref Pattern**: Enables DOM access while maintaining component abstraction  

### Design Patterns
✅ **Controlled Components**: State management delegated to parents  
✅ **Callback Props**: Clean separation of UI and business logic  
✅ **Conditional Rendering**: Efficient animation and interaction state management  
✅ **Utility-First Styling**: Leverages Tailwind classes with design tokens  

### Reusability Focus
✅ **Generic Container**: `SearchModal` accepts any children content  
✅ **Configurable Actions**: `SearchFooter` uses callback props for flexibility  
✅ **Extensible Styling**: className props allow customization without modification  
✅ **Minimal Dependencies**: Focused on essential functionality only