# ApiComputer Icon Component

## Purpose
The `ApiComputer` component is a presentational icon component that renders an SVG illustration of a computer/server system. It's designed to be used in interfaces related to API management, server administration, or computing contexts to provide visual context and improve user experience.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| ...props | `SVGAttributes<SVGElement>` | No | All standard SVG element attributes including className, style, onClick, etc. Allows full customization of the SVG element |

## Usage Example

```tsx
import { ApiComputer } from '@/components/icons/api-computer';

// Basic usage
<ApiComputer />

// With custom styling
<ApiComputer 
  className="w-12 h-12 text-blue-600" 
  aria-label="API Server"
/>

// With interaction handlers
<ApiComputer 
  onClick={() => navigateToApiDashboard()}
  className="cursor-pointer hover:text-blue-700 transition-colors"
  role="button"
  tabIndex={0}
/>

// In a feature component
function ApiStatusCard() {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <ApiComputer className="w-8 h-8 text-green-600" />
      <div>
        <h3>API Server</h3>
        <p className="text-sm text-gray-600">Online</p>
      </div>
    </div>
  );
}
```

## Functionality
- **SVG Rendering**: Displays a detailed computer/server icon using SVG paths
- **Responsive Design**: Default size of 49x49 pixels that can be overridden with CSS
- **Accessibility**: Uses `currentColor` for fill, allowing color inheritance from parent elements
- **Customization**: Accepts all standard SVG attributes for styling and behavior
- **Vector Graphics**: Scalable without quality loss at any size

## State Management
**None** - This is a stateless presentational component that doesn't manage any state internally.

## Side Effects
**None** - Pure component with no side effects, API calls, or external interactions.

## Dependencies
- **React**: Uses `SVGAttributes` type from React for prop typing
- **No external dependencies**: Self-contained component with no external library requirements

## Integration
This icon component follows our architectural patterns by:

- **Flat Component Structure**: Located in `/components/icons/` following domain organization
- **Reusable UI Component**: Can be used across different features and pages
- **Server-First**: Renders on server by default, reducing client bundle size
- **Prop Spreading**: Uses TypeScript for type safety while maintaining flexibility
- **Design System Integration**: Works with CSS classes and design tokens

Common integration patterns:
```tsx
// In navigation menus
<NavItem icon={<ApiComputer />} label="API Management" />

// In dashboard cards
<DashboardCard 
  icon={<ApiComputer className="w-6 h-6" />}
  title="Server Status"
/>

// In feature components
function ServerList() {
  return servers.map(server => (
    <ServerCard 
      key={server.id}
      icon={<ApiComputer />}
      server={server}
    />
  ));
}
```

## Best Practices
- **Accessibility**: Always provide `aria-label` or `alt` text when used standalone
- **Color Inheritance**: Leverages `currentColor` to inherit text color from parent
- **Size Control**: Use CSS classes rather than inline styles for responsive sizing
- **Semantic Usage**: Use in contexts related to APIs, servers, or computing
- **Performance**: Server-rendered by default, no JavaScript overhead
- **Type Safety**: Fully typed with TypeScript for compile-time error checking
- **Composition**: Designed to work within larger UI components rather than standalone usage

The component exemplifies our architecture's emphasis on simple, reusable, server-first components that can be composed into larger features while maintaining type safety and performance.