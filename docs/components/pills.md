# Pills Component Documentation

## Purpose

The Pills component provides a collection of specialized pill-shaped UI elements for displaying various types of content references within thread thinking contexts. It includes web source links, story citations, company tags, and overflow indicators, all built on a shared base component for consistent styling and behavior.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires browser APIs (`window.open`) for URL navigation and handles click events that need client-side interactivity.

## Props Interface

### BasePill
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Content to display inside the pill |
| `onClick` | `() => void` | No | Click handler function |
| `className` | `string` | No | Additional CSS classes |

### WebSourcePill
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | Web source URL to open on click |

### StoryPill
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `story` | `LeafStoryItem` | Yes | Story object with slug and title |

### CompanyPill
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Company name to display |

### CustomPillMore
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | `number` | Yes | Number of additional items |

### LeafPill
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `LeafItem['leafType']` | Yes | Type of pill to render |
| `item` | `unknown` | Yes | Data item to display |

## Usage Example

```tsx
import { 
  LeafPill, 
  WebSourcePill, 
  StoryPill, 
  CompanyPill 
} from '@/components/answers/thread-question-answer-pair/thread-thinking/pills';

function ThinkingSection() {
  const storyItem = {
    slug: 'https://example.com/story',
    title: 'Breaking News Story'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Factory component for dynamic rendering */}
      <LeafPill 
        type="web_sources" 
        item="https://example.com/article" 
      />
      
      <LeafPill 
        type="stories" 
        item={storyItem} 
      />
      
      <LeafPill 
        type="companies" 
        item="Tesla Inc" 
      />
      
      <LeafPill 
        type="custom_pill_more" 
        item={5} 
      />

      {/* Direct component usage */}
      <WebSourcePill url="https://techcrunch.com/article" />
      
      <StoryPill story={storyItem} />
      
      <CompanyPill name="Apple Inc" />
    </div>
  );
}
```

## Functionality

- **Factory Pattern**: `LeafPill` acts as a factory component that renders the appropriate pill type based on the `type` prop
- **Type Safety**: Includes `isStoryItem` type guard for runtime type checking
- **Safe Navigation**: `safeOpenUrl` function handles URL opening with error handling
- **Responsive Design**: Pills include hover effects and responsive text truncation
- **Visual Hierarchy**: Different pill types have distinct styling (rounded-full vs rounded-md)
- **Icon Integration**: Company pills include stock chart icons, story pills show citation items

## State Management

**No State Management** - This is a purely presentational component set that doesn't manage any state. It relies on props for all data and handles only UI interactions (clicks).

## Side Effects

- **External Navigation**: Opens URLs in new browser tabs/windows
- **Focus Management**: Automatically focuses new windows when opened
- **Error Handling**: Silently handles failed window.open operations

## Dependencies

### UI Components
- `Typography` - Text styling and variants
- `SourceCitationItem` - Citation display for stories
- `MediaSourceReferenceBuilder` - Media source formatting

### Icons
- `IconStockChart` - Company pill icon

### Utilities
- `cn` - CSS class name concatenation
- `safeExtractDomain` - URL domain extraction

### Types
- `LeafItem`, `LeafStoryItem` from answers thread chat store

## Integration

This component integrates into the thread thinking section of the answers system:

```
Thread Question Answer Pair
└── Thread Thinking
    └── Pills (various source references)
        ├── Web Sources
        ├── Story Citations  
        ├── Company Tags
        └── Overflow Indicators
```

The pills provide visual representations of the various sources and references that inform the AI's thinking process, giving users insight into the breadth of information considered.

## Best Practices

✅ **Component Decomposition**: Follows flat architecture with specialized components built on shared `BasePill` foundation

✅ **Reusability**: `BasePill` provides consistent base behavior while specialized components handle specific use cases

✅ **Type Safety**: Includes proper TypeScript interfaces and runtime type guards

✅ **Error Handling**: Gracefully handles URL opening failures without breaking the UI

✅ **Performance**: Uses factory pattern to avoid unnecessary component instantiation

✅ **Accessibility**: Maintains semantic structure and provides hover feedback

✅ **Separation of Concerns**: Utility functions are extracted and reusable across components