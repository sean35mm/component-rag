# OmniFilters Component

## Purpose

The `OmniFilters` component provides a comprehensive filtering interface for the omnibar, allowing users to apply custom filters and clear existing filters. It serves as a central filtering control that combines multiple filter-related actions into a cohesive UI element with configurable sizing options.

## Component Type

**Server Component** - This is a server component as it doesn't require client-side interactivity at the top level. It acts as a composition layer that orchestrates child components, with any client-side behavior delegated to its child components (`CustomFiltersDrawer`, `TriggerButton`, and `ClearFiltersButton`).

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `'xxs' \| 'xs' \| 'md'` | No | `'md'` | Controls the size of the filter buttons and overall component dimensions |

## Usage Example

```tsx
import { OmniFilters } from '@/components/omnibar/omni-filters/omni-filters';

// Basic usage with default medium size
export function SearchPage() {
  return (
    <div className="omnibar">
      <OmniFilters />
    </div>
  );
}

// Compact version for dense layouts
export function CompactSearchBar() {
  return (
    <div className="compact-omnibar">
      <OmniFilters size="xs" />
    </div>
  );
}

// Extra small for mobile or constrained spaces
export function MobileOmnibar() {
  return (
    <div className="mobile-omnibar">
      <OmniFilters size="xxs" />
    </div>
  );
}
```

## Functionality

- **Filter Management**: Provides access to custom filter application through an integrated drawer interface
- **Filter Clearing**: Offers quick filter reset functionality via a dedicated clear button
- **Size Adaptation**: Supports multiple size variants to fit different layout requirements
- **Responsive Layout**: Uses flexbox layout with consistent spacing between filter controls
- **Modular Composition**: Combines specialized filter components into a unified interface

## State Management

The `OmniFilters` component itself doesn't manage state directly. State management is delegated to its child components:

- **Filter State**: Managed by child components, likely using Zustand for filter selections and active states
- **Drawer State**: The `CustomFiltersDrawer` manages its own open/close state
- **Button States**: Individual button components handle their own interaction states

## Side Effects

- **No Direct Side Effects**: This composition component doesn't perform side effects itself
- **Child Component Effects**: Side effects are handled by child components (filter applications, API calls for filter data, etc.)
- **Layout Rendering**: Renders a drawer component that may be positioned outside normal document flow

## Dependencies

### Internal Components
- `CustomFiltersDrawer` - Provides the filter application interface
- `ClearFiltersButton` - Handles filter clearing functionality  
- `TriggerButton` - Triggers filter-related actions

### External Dependencies
- React - Core component functionality
- Tailwind CSS - Styling classes for layout and spacing

## Integration

The `OmniFilters` component integrates into the larger application architecture as:

- **Omnibar Integration**: Core component of the omnibar search and filtering system
- **Search Experience**: Part of the global search interface that appears across multiple pages
- **Filter Ecosystem**: Works in conjunction with other filter-related components and state management
- **Responsive Design**: Adapts to different screen sizes and layout constraints through size props

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Server Component Default**: Correctly uses server component as default, delegating client interactions to children
- **Component Decomposition**: Exhibits flat composition pattern, stacking specialized components like Lego blocks
- **Reusability**: Provides size variants for different use cases and layouts
- **Single Responsibility**: Focuses solely on composing filter-related UI elements

✅ **Implementation Best Practices**:
- **Prop Interface**: Simple, focused prop interface with sensible defaults
- **Layout Pattern**: Uses modern flexbox with consistent spacing
- **Size Consistency**: Passes size prop to child components for uniform sizing
- **Fragment Usage**: Appropriately uses React Fragment to avoid unnecessary DOM nesting

✅ **Integration Patterns**:
- **Domain Separation**: Lives in omnibar domain, following feature-based organization
- **State Delegation**: Properly delegates state management to appropriate child components
- **Composition Over Configuration**: Uses composition pattern rather than complex configuration options