# PiThumbsDown Icon Component

## Purpose
The `PiThumbsDown` component is a React SVG icon component that renders a thumbs down symbol. It's part of the icon library and provides a reusable thumbs down icon for user interface elements such as dislike buttons, negative feedback indicators, or voting systems.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG markup without any client-side interactivity, event handlers, or state management. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | Optional | All standard SVG element props including `className`, `style`, `onClick`, `width`, `height`, `aria-label`, etc. |

**Common SVG Props:**
- `className` - CSS classes for styling
- `style` - Inline styles
- `width` / `height` - Dimensions (defaults to currentColor sizing)
- `onClick` - Click handler for interactive usage
- `aria-label` - Accessibility label
- `role` - ARIA role for accessibility

## Usage Example

```tsx
import { PiThumbsDown } from '@/components/icons/pi/pi-thumbs-down';

// Basic usage
<PiThumbsDown />

// With custom styling
<PiThumbsDown 
  className="w-6 h-6 text-red-500 hover:text-red-600" 
/>

// Interactive dislike button
<button 
  onClick={handleDislike}
  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
>
  <PiThumbsDown className="w-5 h-5" />
  <span>Dislike</span>
</button>

// With accessibility
<PiThumbsDown 
  aria-label="Thumbs down"
  role="img"
  className="w-4 h-4"
/>

// In a voting component
<div className="flex items-center gap-4">
  <button onClick={handleUpvote}>
    <PiThumbsUp className="w-5 h-5 text-green-600" />
  </button>
  <span>{voteCount}</span>
  <button onClick={handleDownvote}>
    <PiThumbsDown className="w-5 h-5 text-red-600" />
  </button>
</div>
```

## Functionality
- **SVG Rendering**: Renders a scalable thumbs down icon using SVG
- **Color Inheritance**: Uses `fill='currentColor'` to inherit text color from parent
- **Responsive Sizing**: Scales with CSS width/height or inherits from font-size
- **Prop Forwarding**: Accepts all standard SVG element properties
- **Accessibility Ready**: Can accept ARIA attributes for screen readers

## State Management
**None** - This is a stateless presentational component. State management for any interactive behavior (like vote counting) should be handled by parent components using:
- **TanStack Query** for server state (fetching/updating vote data)
- **Zustand** for client state (UI state management)
- **Local State** for simple toggle states

## Side Effects
**None** - This component has no side effects, API calls, or external interactions. It's a pure rendering component.

## Dependencies
- **React**: Uses `SVGProps` type from React
- **No external dependencies** - Self-contained SVG component

## Integration
This component fits into the application architecture as:

- **UI Component Layer**: Located in `/components/icons/pi/` following the flat component structure
- **Reusable Asset**: Can be used across any feature domain that needs thumbs down iconography
- **Design System**: Part of the icon library that maintains visual consistency
- **Composable**: Designed to be composed into larger interactive components like voting buttons, feedback forms, or rating systems

## Best Practices

### ✅ Adheres to Architecture Guidelines
- **Server Component Default**: No client-side state or interactivity
- **Flat Structure**: Simple, single-purpose component without nesting
- **Prop Transparency**: Uses prop spreading for maximum flexibility
- **Reusability**: Generic enough for multiple use cases

### 📋 Usage Recommendations
```tsx
// ✅ Good: Semantic usage with proper styling
<button onClick={handleDislike} className="inline-flex items-center gap-2">
  <PiThumbsDown className="w-4 h-4" />
  Dislike
</button>

// ✅ Good: Accessible usage
<PiThumbsDown 
  aria-label="Negative rating" 
  className="w-5 h-5 text-red-500"
/>

// ✅ Good: Composed in larger components  
const VotingButtons = ({ onVote }) => (
  <div className="flex items-center gap-2">
    <IconButton onClick={() => onVote('up')}>
      <PiThumbsUp />
    </IconButton>
    <IconButton onClick={() => onVote('down')}>
      <PiThumbsDown />
    </IconButton>
  </div>
);

// ❌ Avoid: Adding interactivity directly to icon
const PiThumbsDown = (props) => {
  const [clicked, setClicked] = useState(false); // Don't do this
  // Keep icons as pure presentation components
};
```

### 🎯 Integration Patterns
- Use within interactive wrapper components (buttons, links)
- Compose with other UI components for complex interfaces
- Apply consistent sizing and color schemes across the application
- Implement proper accessibility attributes when used in interactive contexts