# PiDatabase2Line Component

## Purpose
The `PiDatabase2Line` component renders a database icon with a line-style design. It provides a visual representation for database-related functionality in the application, commonly used for indicating data storage, database connections, or data management features in user interfaces.

## Component Type
**Server Component** - This is a purely presentational SVG icon component with no client-side interactivity, state management, or browser APIs. It can be rendered on the server and doesn't require the 'use client' directive.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `aria-label`, etc. |

### Common SVG Props
- `className` - CSS classes for styling
- `style` - Inline styles
- `onClick` - Click event handler
- `aria-label` - Accessibility label
- `role` - ARIA role
- `width`/`height` - Size overrides (defaults to '1em')

## Usage Example

```tsx
import { PiDatabase2Line } from '@/components/icons/pi/pi-database-2-line';

// Basic usage
export function DatabaseStatus() {
  return (
    <div className="flex items-center gap-2">
      <PiDatabase2Line />
      <span>Database Connected</span>
    </div>
  );
}

// With custom styling
export function DatabaseCard() {
  return (
    <div className="p-4 border rounded-lg">
      <PiDatabase2Line 
        className="w-8 h-8 text-blue-600 mb-2" 
        aria-label="Database icon"
      />
      <h3>Main Database</h3>
      <p>PostgreSQL Instance</p>
    </div>
  );
}

// As a clickable button
export function DatabaseButton() {
  const handleDatabaseClick = () => {
    // Navigate to database management
  };

  return (
    <button 
      onClick={handleDatabaseClick}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
    >
      <PiDatabase2Line className="w-5 h-5" />
      Manage Database
    </button>
  );
}

// In navigation or menu
export function AdminSidebar() {
  return (
    <nav>
      <a href="/admin/database" className="flex items-center gap-3 p-2">
        <PiDatabase2Line className="w-4 h-4" />
        Database Management
      </a>
    </nav>
  );
}
```

## Functionality

### Key Features
- **Scalable Vector Graphics**: Renders crisp at any size using SVG format
- **Responsive Sizing**: Uses '1em' dimensions to scale with font size
- **Theme Integration**: Uses 'currentColor' fill to inherit text color
- **Accessibility Ready**: Accepts ARIA attributes for screen readers
- **Event Handling**: Supports all standard SVG event handlers
- **Customizable**: Accepts all SVG props for full customization

### Visual Design
- Line-style database icon with cylindrical database representation
- Multi-layered design showing database stack/layers
- Clean, minimal aesthetic suitable for modern interfaces
- Consistent with Phosphor Icons design system

## State Management
**No State Management Required** - This is a stateless presentational component that doesn't manage any internal state or require external state management solutions.

## Side Effects
**No Side Effects** - Pure rendering component with no:
- API calls
- Local storage interactions  
- Browser API usage
- External service communications

## Dependencies

### Direct Dependencies
- `react` - For SVGProps type definition
- No external icon libraries or dependencies

### Related Components
- Other Phosphor Icons in the `/components/icons/pi/` directory
- UI components that use this icon (buttons, cards, navigation items)

## Integration

### Application Architecture
```
src/
├── components/
│   ├── icons/
│   │   └── pi/
│   │       └── pi-database-2-line.tsx  ← This component
│   ├── ui/                             ← UI components using this icon
│   └── features/                       ← Feature components using this icon
```

### Common Integration Patterns
- **Navigation Systems**: Database admin sections, data management routes
- **Dashboard Cards**: Database status indicators, connection monitoring
- **Form Controls**: Database selection dropdowns, connection builders
- **Status Indicators**: Health checks, connection states
- **Action Buttons**: Database operations, backup/restore actions

## Best Practices

### Architectural Adherence
✅ **Server Component**: Correctly implemented as server component (no client-side code)  
✅ **Single Responsibility**: Focused solely on rendering database icon  
✅ **Prop Flexibility**: Accepts all SVG props for maximum reusability  
✅ **No State Coupling**: Stateless design promotes reusability  

### Usage Recommendations
- **Accessibility**: Always provide `aria-label` when icon conveys important information
- **Sizing**: Use CSS classes rather than inline width/height for consistency
- **Color**: Leverage `currentColor` by setting text color on parent elements
- **Semantic Context**: Pair with descriptive text for clarity
- **Performance**: Can be used freely without performance concerns (no JavaScript bundle impact)

### Anti-patterns to Avoid
❌ Don't hardcode colors (use currentColor inheritance)  
❌ Don't add 'use client' directive unnecessarily  
❌ Don't embed business logic within the icon component  
❌ Don't create wrapper components for simple styling (use CSS classes)