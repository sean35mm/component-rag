# NlpQueryAnimation Component

## Purpose
The `NlpQueryAnimation` component provides visual feedback during natural language processing (NLP) query enrichment operations. It displays the user's original query alongside an animated loading indicator with pulsing dots, communicating that the system is actively processing and enhancing their search query.

## Component Type
**Client Component** - This component uses CSS animations and interactive visual effects that require client-side rendering. The pulsing dot animation and dynamic styling necessitate browser execution.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | ✅ | - | The original user query text to display |
| `showPlaceholderValue` | `boolean` | ❌ | `true` | Controls whether to show the user's query text |
| `className` | `string` | ❌ | - | Additional CSS classes for styling customization |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes |

## Usage Example

```tsx
import { NlpQueryAnimation } from '@/components/signals/nlp-query-animation';

function SearchInterface() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const handleSearch = async (query: string) => {
    setUserQuery(query);
    setIsProcessing(true);
    
    try {
      // Simulate NLP processing
      await processNlpQuery(query);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="search-container">
      <SearchInput onSubmit={handleSearch} />
      
      {isProcessing && (
        <NlpQueryAnimation 
          value={userQuery}
          className="mt-4 rounded-lg border bg-slate-50"
        />
      )}
      
      {/* Hide query text for minimal view */}
      <NlpQueryAnimation 
        value={userQuery}
        showPlaceholderValue={false}
        className="compact-loader"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Query Display**: Shows the user's original search query with text truncation for long queries (max-width: 260px)
- **Loading Animation**: Animated shining icon and pulsing dots to indicate active processing
- **Flexible Visibility**: Optional query text display for different UI contexts
- **Responsive Design**: Flexible container with proper spacing and alignment

### Visual Elements
- **Shining Icon**: `PiShiningFill` icon indicating AI/NLP enhancement
- **Pulsing Dots**: Three dots with staggered animation delays (0ms, 200ms, 500ms)
- **Typography**: Consistent text styling using the design system
- **Color Scheme**: Uses `pgTextBlue` for processing indicators

## State Management
**No State Management** - This is a purely presentational component that receives all data via props. It relies on parent components to manage the query state and processing status using appropriate state management solutions (TanStack Query for server operations, Zustand for complex client state).

## Side Effects
**No Side Effects** - The component is purely presentational with no API calls, timers, or external interactions. All animations are CSS-based and don't require JavaScript side effects.

## Dependencies

### Internal Dependencies
- `@/components/icons` - For the `PiShiningFill` icon
- `@/components/ui/typography` - For consistent text rendering
- `@/lib/utils/cn` - For className merging utility

### External Dependencies
- React HTMLAttributes interface for prop typing
- CSS animation classes (`animate-pulseDot`) defined in the application's Tailwind configuration

## Integration

### Application Architecture
- **Location**: `src/components/signals/` - Part of the signals domain for user feedback components
- **Usage Pattern**: Typically rendered conditionally during async NLP operations
- **Parent Integration**: Embedded in search interfaces, query builders, and AI-powered features

### Common Integration Points
```tsx
// Search results page
{isEnrichingQuery && <NlpQueryAnimation value={searchTerm} />}

// Query builder interface  
{processingState === 'enhancing' && (
  <NlpQueryAnimation 
    value={rawQuery} 
    className="query-enhancement-indicator"
  />
)}

// Chat interface
{aiProcessing && (
  <NlpQueryAnimation 
    value={userMessage}
    showPlaceholderValue={false}
  />
)}
```

## Best Practices

### Architecture Adherence
- ✅ **Flat Composition**: Single-purpose component without complex nesting
- ✅ **Prop Interface**: Well-defined TypeScript interface extending HTML attributes
- ✅ **Styling Approach**: Uses className merging with cn() utility for flexibility
- ✅ **Domain Organization**: Properly placed in signals domain for user feedback components

### Usage Recommendations
- Use during NLP query processing operations to provide user feedback
- Combine with proper loading states in parent components
- Consider accessibility by ensuring animations don't cause issues for sensitive users
- Keep query text concise or rely on built-in truncation for long queries
- Pair with appropriate error handling in parent components for failed NLP operations

### Performance Considerations
- CSS animations are hardware-accelerated and performant
- Component re-renders only when props change
- Text truncation prevents layout shifts with long query strings