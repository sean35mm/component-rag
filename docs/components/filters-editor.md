# FiltersEditor Component

## Purpose

The `FiltersEditor` component provides a user interface section for configuring signal filters during the signal creation process. It presents a titled container with descriptive text and integrates custom filter controls, allowing users to specify targeted criteria for their signal monitoring rather than using broad default settings.

## Component Type

**Server Component** - This is a server component as it contains no client-side interactivity, state management, or browser-specific APIs. It serves as a presentational container that composes static UI elements and delegates interactive functionality to child components.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| None | - | - | - | This component accepts no props |

## Usage Example

```tsx
import { FiltersEditor } from '@/components/signals/creation/filters-editor/filters-editor';

// Basic usage in signal creation flow
export function SignalCreationForm() {
  return (
    <div className="space-y-6">
      <SignalBasicInfo />
      <FiltersEditor />
      <SignalSettings />
      <CreateSignalActions />
    </div>
  );
}

// Usage in multi-step wizard
export function SignalCreationWizard() {
  return (
    <WizardStep title="Configure Filters" step={2}>
      <FiltersEditor />
    </WizardStep>
  );
}

// Usage in modal or drawer
export function QuickSignalCreation() {
  return (
    <Modal title="Create New Signal">
      <div className="space-y-4">
        <FiltersEditor />
      </div>
    </Modal>
  );
}
```

## Functionality

- **Section Container**: Provides a visually distinct bordered container for filter configuration
- **Instructional Content**: Displays clear title and descriptive text explaining filter purpose
- **Filter Integration**: Embeds `CustomFilters` component with appropriate styling
- **Responsive Layout**: Adapts padding and spacing for different screen sizes (lg breakpoint)
- **Visual Hierarchy**: Uses typography variants to establish clear information hierarchy

## State Management

**No State Management** - This component is purely presentational and stateless. All state management is delegated to the `CustomFilters` child component, following the pattern of keeping container components simple and pushing state down to leaf components where it's actually needed.

## Side Effects

**No Side Effects** - This component performs no API calls, side effects, or external interactions. It serves as a static layout container, maintaining separation of concerns by leaving data operations to specialized child components.

## Dependencies

### Internal Components
- `@/components/ui/typography` - For consistent text styling and hierarchy
- `../custom-filters` - Child component providing actual filter functionality

### External Dependencies
- React (implicit) - Core framework
- Tailwind CSS - For styling and responsive design

### Style Dependencies
- Custom color tokens (`pgStroke-200`) - Requires design system color configuration
- Responsive breakpoints (`lg:`) - Tailwind responsive utilities

## Integration

### Application Architecture
- **Domain Location**: Positioned within signals creation flow (`/signals/creation/`)
- **Composition Pattern**: Acts as a section container in larger form workflows
- **Layout Role**: Provides structured visual grouping for filter-related controls

### Data Flow Integration
```tsx
// Typical integration in signal creation context
export function SignalCreationPage() {
  return (
    <SignalCreationProvider>
      <FormProvider>
        <SignalCreationLayout>
          <FiltersEditor /> {/* Integrates with form context */}
        </SignalCreationLayout>
      </FormProvider>
    </SignalCreationProvider>
  );
}
```

### Parent Component Integration
- Designed to be embedded in multi-step forms or configuration wizards
- Expects to be used within signal creation context where filters are relevant
- Can be conditionally rendered based on signal type or user permissions

## Best Practices

### Architecture Adherence
- ✅ **Server Component Default**: Correctly implemented as server component without unnecessary client boundaries
- ✅ **Flat Composition**: Simple container that composes child components without deep nesting
- ✅ **Separation of Concerns**: UI layout separated from business logic and state management
- ✅ **Domain Organization**: Properly located within signals feature domain structure

### Component Design Patterns
- ✅ **Container Pattern**: Acts as presentational container for filter functionality
- ✅ **Composition Over Configuration**: Uses component composition rather than complex prop interfaces
- ✅ **Responsive Design**: Implements mobile-first responsive patterns
- ✅ **Design System Integration**: Leverages typography system for consistent styling

### Development Guidelines
- **Styling Consistency**: Uses design system tokens and utility classes
- **Accessibility Ready**: Proper heading hierarchy and semantic structure
- **Performance Optimized**: No unnecessary re-renders or client-side overhead
- **Maintainability**: Clear structure and minimal complexity for easy updates

### Usage Recommendations
- Use within signal creation workflows where filter configuration is needed
- Combine with form providers when filters need to integrate with larger form state
- Consider wrapping in conditional rendering for different signal types
- Maintain consistent spacing when composing with other creation step components