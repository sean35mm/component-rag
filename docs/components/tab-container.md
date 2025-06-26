# TabContainer

## Purpose

The `TabContainer` component serves as a layout wrapper for tab content within the main application layout. It provides consistent width constraints and centering behavior for tabbed interfaces, ensuring optimal content presentation across different screen sizes while maintaining proper spacing and layout boundaries.

## Component Type

**Server Component** - This is a server component as it doesn't require any client-side interactivity, state management, or browser APIs. It functions purely as a layout wrapper with static styling and can be rendered on the server for better performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the container |
| `children` | `ReactNode \| ReactNode[]` | No | Child components or content to render within the tab container |

## Usage Example

```tsx
import { TabContainer } from '@/components/main-layout/tab-container';
import { ChatInterface } from '@/components/chat/chat-interface';
import { SourceBar } from '@/components/chat/source-bar';

// Basic usage
export function ChatTab() {
  return (
    <TabContainer>
      <div className="space-y-4">
        <SourceBar />
        <ChatInterface />
      </div>
    </TabContainer>
  );
}

// With custom styling
export function DocumentTab() {
  return (
    <TabContainer className="bg-gray-50 p-4">
      <div className="document-content">
        <h1>Document Title</h1>
        <p>Document content...</p>
      </div>
    </TabContainer>
  );
}

// Multiple children
export function DashboardTab() {
  return (
    <TabContainer>
      <Header />
      <MainContent />
      <Footer />
    </TabContainer>
  );
}
```

## Functionality

The `TabContainer` component provides:

- **Responsive Layout**: Applies automatic centering and max-width constraints on large screens (`lg:mx-auto lg:max-w-[var(--max-tab-width)]`)
- **Full Height**: Ensures the container takes full available height (`h-full`)
- **Overflow Management**: Deliberately avoids `overflow-hidden` to prevent layout issues with sticky elements like chat source bars
- **Flexible Content**: Accepts any React node(s) as children for maximum flexibility
- **Customizable Styling**: Supports additional CSS classes through the `className` prop

## State Management

This component does not manage any state. It's a pure presentational component that relies on:
- **No State Management**: Stateless component focused solely on layout presentation
- **Props-based Configuration**: All behavior controlled through props

## Side Effects

This component has no side effects:
- No API calls or data fetching
- No browser storage interactions
- No event listeners or timers
- No external service communications

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility function for conditional class name merging

### External Dependencies
- `react` - For React types (`ReactNode`) and component functionality

### Related Components
This component is designed to work with:
- Tab navigation systems
- Chat interfaces with sticky source bars
- Any content requiring consistent width constraints and centering

## Integration

The `TabContainer` fits into the application architecture as:

### Layout Hierarchy
```
MainLayout
  └── TabNavigation
      └── TabContainer (this component)
          └── Tab Content (ChatInterface, Documents, etc.)
```

### Design System Role
- **Layout Component**: Part of the main layout system, not a UI primitive
- **Domain-Specific**: Located in `/main-layout/` indicating its specific use case
- **Composition Ready**: Designed to be composed with other components following the "Lego blocks" pattern

### CSS Custom Properties
- Utilizes CSS custom property `--max-tab-width` for consistent theming
- Integrates with the application's responsive design system

## Best Practices

This component adheres to our architectural guidelines:

✅ **Server Component Default**: Correctly implemented as a server component since no client-side features are needed

✅ **Component Decomposition**: Simple, focused component that does one thing well - provides tab layout structure

✅ **Flat Architecture**: Avoids unnecessary nesting, accepts children for flexible composition

✅ **Reusability**: Generic enough to be used across different tab implementations while being specific to tab layouts

✅ **Performance**: No unnecessary re-renders or client-side JavaScript overhead

✅ **Accessibility**: Maintains semantic HTML structure and doesn't interfere with accessibility features

### Usage Recommendations

- Use for any tabbed content that needs consistent width and centering
- Avoid adding `overflow-hidden` styles that could conflict with sticky elements
- Leverage the CSS custom property `--max-tab-width` for consistent theming
- Compose with other layout components rather than creating nested wrapper components