# TopicPreviewCardMobile

## Purpose

The `TopicPreviewCardMobile` is a mobile-optimized wrapper component designed to display topic preview information in a card format specifically for mobile viewports. It serves as a container that applies mobile-specific styling and spacing to the `TopicPreviewCardSmall` component, ensuring optimal presentation on smaller screens.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `topic` | `Topic` | ✓ | The topic object containing metadata and content information to be displayed |
| `entityStats` | `EntityCount[]` | ○ | Optional array of entity statistics for additional context data |
| `row` | `Row<EntityCount>` | ✓ | TanStack Table row object for handling table-related functionality and data access |

## Usage Example

```tsx
import { TopicPreviewCardMobile } from '@/components/ui/topic-preview-card-mobile';
import { Topic, EntityCount } from '@/lib/types';
import { Row } from '@tanstack/react-table';

// Example usage in a mobile topic list
function MobileTopicList({ topics, entityData, tableRows }: {
  topics: Topic[];
  entityData: EntityCount[];
  tableRows: Row<EntityCount>[];
}) {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {topics.map((topic, index) => (
        <TopicPreviewCardMobile
          key={topic.id}
          topic={topic}
          entityStats={entityData}
          row={tableRows[index]}
        />
      ))}
    </div>
  );
}

// Example with responsive grid layout
function ResponsiveTopicGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
      <TopicPreviewCardMobile
        topic={{
          id: '1',
          title: 'AI & Machine Learning',
          description: 'Latest developments in artificial intelligence',
          tags: ['technology', 'ai', 'ml']
        }}
        entityStats={[
          { entityType: 'articles', count: 24 },
          { entityType: 'discussions', count: 8 }
        ]}
        row={tableRow}
      />
    </div>
  );
}
```

## Design System Usage

### Background Colors
- **Primary Background**: `bg-pgBackground-0` - Uses the lightest background token for card surfaces
- **Dark Mode**: Automatically adapts through CSS variables to `pgBackground-0` dark variant

### Spacing & Layout
- **Padding**: `p-4` (16px) - Standard mobile touch-friendly spacing
- **Container**: Inherits responsive behavior from `TopicPreviewCardSmall`

### Typography Integration
The component inherits typography from `TopicPreviewCardSmall`, which typically uses:
- **Topic Titles**: `.typography-headlines20` or `.typography-headlines18`
- **Descriptions**: `.typography-paragraphSmall` or `.typography-paragraphXSmall`
- **Metadata**: `.typography-labelSmall` or `.typography-label2XSmall`

## Styling

### Default Styling
```tsx
// Applied styling
className='bg-pgBackground-0 p-4'
```

### Customization Options

```tsx
// Custom background variants
<TopicPreviewCardMobile
  // Light emphasis
  className="bg-pgNeutral-50 p-4 border border-pgStroke-200"
  
  // Information state
  className="bg-pgStateInformation-light p-4"
  
  // Custom spacing for dense layouts
  className="bg-pgBackground-0 p-3"
/>

// With elevation and shadows
<div className="shadow-md rounded-lg overflow-hidden bg-pgBackground-0">
  <TopicPreviewCardMobile {...props} />
</div>
```

### State Variations
```tsx
// Highlighted/Featured topics
<TopicPreviewCardMobile 
  className="bg-pgStateHighlighted-lighter p-4 border-l-4 border-pgBlue-500"
/>

// Error/Unavailable state
<TopicPreviewCardMobile 
  className="bg-pgStateError-lighter p-4 opacity-75"
/>
```

## Responsive Design

### Breakpoint Behavior
- **Mobile (< 640px)**: Primary usage - full-width cards with touch-friendly spacing
- **Small (640px - 768px)**: Can be used in 2-column grids
- **Medium+ (768px+)**: Typically hidden in favor of desktop topic components

### Responsive Implementation
```tsx
// Hide on larger screens, show desktop version
<div className="block lg:hidden">
  <TopicPreviewCardMobile {...props} />
</div>
<div className="hidden lg:block">
  <TopicPreviewCardDesktop {...props} />
</div>

// Responsive grid with mobile cards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:hidden gap-4">
  {topics.map(topic => (
    <TopicPreviewCardMobile key={topic.id} {...props} />
  ))}
</div>
```

## Accessibility

### Semantic Structure
- Inherits semantic HTML structure from `TopicPreviewCardSmall`
- Maintains proper heading hierarchy and content organization
- Supports keyboard navigation through tabindex management

### Touch Accessibility
```tsx
// Enhanced touch targets for mobile
<div className="min-h-[44px] touch-manipulation">
  <TopicPreviewCardMobile {...props} />
</div>
```

### Screen Reader Support
- Topic titles are properly marked as headings
- Statistical information includes appropriate ARIA labels
- Interactive elements maintain focus indicators

### Color Contrast
- Background color `pgBackground-0` ensures sufficient contrast ratios
- Inherits text colors that meet WCAG AA standards
- State colors maintain accessibility compliance

## Dependencies

### Internal Components
- **TopicPreviewCardSmall**: Core component providing the topic display functionality
- Located at: `@/components/ui/topic-preview-card-small`

### External Dependencies
- **@tanstack/react-table**: Required for `Row<EntityCount>` type and table functionality
- **React**: Uses client-side rendering with `'use client'` directive

### Type Dependencies
```tsx
import { Topic, EntityCount } from '@/lib/types';
import { Row } from '@tanstack/react-table';
```

### Design System Dependencies
- **Background System**: `pgBackground-*` color tokens
- **Spacing System**: Tailwind spacing utilities
- **Typography System**: Inherited through child component
- **Responsive System**: Tailwind breakpoint utilities

### Related Components
- `TopicPreviewCardSmall` - Core functionality provider
- `TopicPreviewCard` - Desktop variant
- `TopicGrid` - Container component for topic layouts
- `EntityStatsDisplay` - Related statistics component