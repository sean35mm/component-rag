# TopicCitationItem Component

## Purpose

The `TopicCitationItem` component displays a topic citation with data fetching capabilities and loading states. It renders a topic name as a citation placeholder with proper authorization handling and Suspense-based data loading. The component provides fallback states and optimizes rendering with priority loading support.

## Props Interface

### TopicCitationItem (Main Component)

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `classNames` | `CitationItemClassNames` | No | `undefined` | Custom class names for styling different parts of the citation item |
| `name` | `string` | Yes | - | The name of the topic to fetch and display |
| `priority` | `boolean` | No | `false` | Whether this citation should be prioritized for loading |
| `size` | `CitationItemSizes \| null` | No | `null` | Size variant for the citation item display |

### TopicCitationItemBase

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `classNames` | `CitationItemClassNames` | No | `undefined` | Custom class names for styling |
| `priority` | `boolean` | No | `false` | Priority loading flag |
| `size` | `CitationItemSizes \| null` | No | `null` | Size variant |
| `topic` | `Topic` | Yes | - | Topic object containing the data to display |

### TopicCitationItemFallback

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `classNames` | `CitationItemClassNames` | No | `undefined` | Custom class names for styling |
| `size` | `CitationItemSizes \| null` | No | `null` | Size variant for the fallback display |

## Usage Example

```tsx
import { TopicCitationItem } from '@/components/ui/topic-citation-item';

// Basic usage
function CitationList() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <TopicCitationItem 
        name="artificial-intelligence"
        size="medium"
      />
      <TopicCitationItem 
        name="machine-learning"
        priority={true}
        size="small"
      />
    </div>
  );
}

// With custom styling using design system tokens
function StyledCitationExample() {
  const customClassNames = {
    common: "bg-pgBackground-50 border-pgStroke-200 hover:bg-pgBackground-100 transition-colors",
    placeholder: "text-pgText-700 typography-labelMedium"
  };

  return (
    <div className="space-y-3">
      <TopicCitationItem 
        name="data-science"
        classNames={customClassNames}
        size="large"
      />
      <TopicCitationItem 
        name="deep-learning"
        classNames={{
          common: "bg-pgBlue-50 border-pgBlue-200 text-pgBlue-800",
          placeholder: "typography-labelSmall font-medium"
        }}
        size="small"
      />
    </div>
  );
}

// Priority loading for above-the-fold content
function PriorityExample() {
  return (
    <section className="mb-8">
      <h2 className="typography-titleH3 text-pgText-900 mb-4">
        Featured Topics
      </h2>
      <div className="flex gap-2">
        <TopicCitationItem 
          name="featured-topic"
          priority={true}
          size="large"
          classNames={{
            common: "bg-pgGold-50 border-pgGold-300",
            placeholder: "text-pgGold-800 typography-labelLarge"
          }}
        />
      </div>
    </section>
  );
}
```

## Design System Usage

### Typography Classes
- **Primary Text**: `typography-labelMedium`, `typography-labelSmall`, `typography-labelLarge`
- **Fallback Text**: `typography-paragraph3XSmall` for loading states
- **Size Variants**: Adapts typography scale based on `size` prop through `CitationItemSizes`

### Color Tokens
- **Background Colors**: 
  - Default: `bg-pgBackground-50`, `bg-pgBackground-100`
  - Hover states: `hover:bg-pgBackground-200`
  - State variants: `bg-pgState[State]-light` for different topic states
- **Text Colors**:
  - Primary: `text-pgText-700`, `text-pgText-800`
  - Secondary: `text-pgText-600`
  - Brand variants: `text-pgBlue-800`, `text-pgGreen-800`
- **Border Colors**:
  - Default: `border-pgStroke-200`, `border-pgStroke-300`
  - Focus: `focus:border-pgBlue-500`

### Spacing & Layout
```css
/* Standard spacing using Tailwind scale */
.citation-spacing {
  @apply px-3 py-2 gap-2 rounded-md;
  @apply border border-solid;
}
```

## Styling

### Size Variants
The component supports multiple size variants through the inherited `CitationItemSizes`:
- `small`: Compact display with `typography-labelSmall`
- `medium`: Standard size with `typography-labelMedium` 
- `large`: Prominent display with `typography-labelLarge`

### Custom Class Names Structure
```tsx
interface CitationItemClassNames {
  common?: string;      // Applied to the main container
  placeholder?: string; // Applied to the text content
}
```

### State Variations
```tsx
// Loading state styling
const loadingClasses = "bg-pgNeutral-100 animate-pulse text-pgText-400";

// Error state styling  
const errorClasses = "bg-pgStateError-light border-pgStateError-base text-pgStateError-dark";

// Success/loaded state
const loadedClasses = "bg-pgStateSuccess-lighter border-pgStateSuccess-light text-pgStateSuccess-dark";
```

## Responsive Design

The component adapts across breakpoints using Tailwind responsive utilities:

```tsx
// Responsive sizing example
<TopicCitationItem 
  name="responsive-topic"
  classNames={{
    common: `
      px-2 py-1 text-xs
      sm:px-3 sm:py-2 sm:text-sm
      md:px-4 md:py-2 md:text-base
      lg:px-5 lg:py-3 lg:text-lg
    `,
    placeholder: `
      typography-label3XSmall
      sm:typography-labelSmall
      md:typography-labelMedium
      lg:typography-labelLarge
    `
  }}
/>
```

### Breakpoint Behavior
- **Mobile (< 640px)**: Compact display, smaller typography
- **Tablet (640px - 1024px)**: Standard sizing with medium typography  
- **Desktop (1024px+)**: Full sizing with larger typography options

## Accessibility

### ARIA Support
- Inherits accessibility features from `CitationItemPlaceholder`
- Proper semantic markup for citation context
- Screen reader friendly loading states

### Keyboard Navigation
```tsx
// Accessible implementation
<TopicCitationItem 
  name="accessible-topic"
  classNames={{
    common: `
      focus:outline-none focus:ring-2 focus:ring-pgBlue-500 focus:ring-offset-2
      focus:border-pgBlue-500 transition-all duration-200
    `
  }}
/>
```

### Loading States
- Provides meaningful fallback content during data fetching
- Uses proper loading indicators with `animate-pulse`
- Maintains layout stability during state transitions

## Dependencies

### Internal Components
- **CitationItemPlaceholder**: Base citation display component
- **CitationItemClassNames**: Type definition for styling props
- **CitationItemSizes**: Size variant type definitions

### Hooks & Context
- **useAccessToken**: Authentication and authorization context
- **useTopicByNameSuspense**: Data fetching hook with Suspense support

### Utilities
- **cn**: Class name utility for conditional styling
- **topicToPlaceholder**: Helper function to extract display text from Topic objects

### Types
- **Topic**: Core topic data structure
- **AccessToken**: Authentication token type

### Related Components
Consider using alongside:
- `CitationList`: For displaying multiple topic citations
- `TopicTag`: For interactive topic selection
- `SearchResults`: For topic discovery contexts