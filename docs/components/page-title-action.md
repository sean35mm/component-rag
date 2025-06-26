# PageTitleAction Components

## Purpose

The `PageTitleAction` component provides a reusable foundation for action buttons in page title bars, with specialized variants for common operations like creating new searches and sharing content. It offers consistent styling, visibility control, and flexible composition through the `asChild` pattern for seamless integration with other UI components.

## Component Type

**Client Component** - Uses interactive features like button events and requires the `forwardRef` pattern for imperative DOM access. The component handles user interactions and manages visual states, necessitating client-side rendering.

## Props Interface

### PageTitleAction

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `asChild` | `boolean` | No | When true, merges props with direct child component instead of rendering a button |
| `children` | `ReactNode` | Yes | Icon or content to display inside the action button |
| `isVisible` | `boolean` | Yes | Controls opacity transition for showing/hiding the action |
| `className` | `string` | No | Additional CSS classes for styling customization |
| `...other` | `ButtonHTMLAttributes` | No | All standard button HTML attributes except children |

### NewSearchAction

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility state of the new search action |
| `onClick` | `() => void` | Yes | Callback function executed when the action is clicked |

### ShareAction

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isVisible` | `boolean` | Yes | Controls visibility state of the share action |
| `...other` | `ButtonHTMLAttributes` | No | All standard button HTML attributes |

## Usage Example

```tsx
import { 
  PageTitleAction, 
  NewSearchAction, 
  ShareAction 
} from '@/components/main-layout/navigation/page-title/page-title-action';
import { PiBookmarkLine } from '@/components/icons';

// Basic usage with custom icon
function PageHeader() {
  const [showActions, setShowActions] = useState(true);
  
  return (
    <div className="flex items-center gap-2">
      <h1>Search Results</h1>
      
      {/* New search action */}
      <NewSearchAction 
        isVisible={showActions}
        onClick={() => router.push('/search/new')}
      />
      
      {/* Share action */}
      <ShareAction 
        isVisible={showActions}
        onClick={() => handleShare()}
      />
      
      {/* Custom action using base component */}
      <PageTitleAction 
        isVisible={showActions}
        onClick={() => handleBookmark()}
      >
        <PiBookmarkLine />
      </PageTitleAction>
    </div>
  );
}

// Advanced usage with asChild pattern
function CustomAction({ children, ...props }) {
  return (
    <PageTitleAction asChild isVisible={props.isVisible}>
      <Tooltip content="Save to favorites">
        <button onClick={props.onClick}>
          {children}
        </button>
      </Tooltip>
    </PageTitleAction>
  );
}
```

## Functionality

### Core Features
- **Visibility Control**: Smooth opacity transitions for showing/hiding actions based on context
- **Flexible Composition**: `asChild` pattern allows wrapping other interactive components
- **Consistent Styling**: Standardized 32px square button with branded colors and spacing
- **Icon Integration**: Optimized for 22px icons with proper sizing and color inheritance
- **Accessibility**: Maintains button semantics and keyboard navigation support

### Specialized Actions
- **NewSearchAction**: Pre-configured with add icon and CompactButton integration
- **ShareAction**: Ready-to-use share button with forward icon

## State Management

**Local State Only** - These components are stateless and rely on:
- Parent components for visibility state management
- Callback props for handling user interactions
- No internal state management or external state dependencies

## Side Effects

**Minimal Side Effects**:
- CSS transitions for opacity changes during visibility toggles
- Event propagation through onClick handlers
- No API calls or data fetching operations

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiAddLine, PiShareForward2Line icons
- `@/components/ui/compact-button` - Enhanced button component for NewSearchAction
- `@/lib/utils/cn` - Utility for conditional CSS class merging

### External Dependencies
- `@radix-ui/react-slot` - Enables asChild composition pattern
- `react` - Core React functionality and forwardRef

## Integration

### Architecture Role
```
Main Layout
└── Navigation
    └── Page Title
        ├── PageTitleAction (base component)
        ├── NewSearchAction (search flows)
        └── ShareAction (content sharing)
```

### Common Integration Patterns
- **Search Interface**: NewSearchAction in search result headers
- **Content Pages**: ShareAction for articles, documents, or data views
- **Dynamic Toolbars**: Multiple actions with conditional visibility
- **Mobile Responsive**: Actions hide/show based on screen size or navigation state

## Best Practices

### Architecture Adherence
✅ **Lego Block Design**: Base component with specialized variants  
✅ **Flat Composition**: Uses Slot pattern instead of deep nesting  
✅ **Reusable Foundation**: Generic base with specific implementations  
✅ **TypeScript Safety**: Proper prop interfaces and ref forwarding  

### Usage Guidelines
- Use `NewSearchAction` for initiating search flows
- Use `ShareAction` for content sharing functionality  
- Use base `PageTitleAction` for custom icons and behaviors
- Implement `isVisible` based on navigation state or user permissions
- Leverage `asChild` when composing with tooltips, dropdowns, or other interactive wrappers
- Maintain consistent 22px icon sizing for visual harmony