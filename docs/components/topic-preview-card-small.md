# TopicPreviewCardSmall

## Purpose

The `TopicPreviewCardSmall` component displays topic information in a compact, mobile-friendly card format. It's designed for list views and includes features like selection checkboxes, expandable actions, progress indicators for article counts, and category display. The component provides both an interactive card and a loading fallback skeleton.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `topic` | `Topic` | ✅ | - | Topic object containing name, labels, and other topic data |
| `onClick` | `(e: React.MouseEvent) => void` | ❌ | - | Handler for card click events |
| `isSelected` | `boolean` | ❌ | `false` | Whether the card is currently selected |
| `isLoading` | `boolean` | ❌ | `false` | Shows loading skeleton when true |
| `onMobileExpand` | `(e: React.MouseEvent) => void` | ❌ | - | Handler for mobile expand button (shows more options) |
| `entityStats` | `EntityCount[]` | ❌ | - | Array of entity statistics for progress visualization |
| `row` | `Row<EntityCount>` | ✅ | - | TanStack table row for selection handling |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Additional HTML div attributes |

## Usage Example

```tsx
import { TopicPreviewCardSmall } from '@/components/ui/topic-preview-card-small';

function TopicList() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  const handleTopicClick = (topicId: string) => {
    // Navigate to topic detail
    router.push(`/topics/${topicId}`);
  };

  const handleMobileExpand = (e: React.MouseEvent) => {
    // Show action menu
    setShowActionMenu(true);
  };

  return (
    <div className="space-y-2">
      {topics.map((topic) => (
        <TopicPreviewCardSmall
          key={topic.id}
          topic={topic}
          row={table.getRow(topic.id)}
          isSelected={selectedTopics.includes(topic.id)}
          onClick={() => handleTopicClick(topic.id)}
          onMobileExpand={handleMobileExpand}
          entityStats={articleStats}
          className="hover:shadow-md transition-shadow"
        />
      ))}
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **`.typography-labelMedium`** - Used for topic names (h3 headings)
- **`.typography-labelSmall`** - Used for category labels
- **`.typography-subheadingXSmall`** - Used for article count numbers

### Color Tokens
- **Border Colors**:
  - `border-pgStroke-250` - Default card border
  - `border-pgStroke-950` - Selected state border
- **Background Colors**:
  - `bg-pgBackgroundWhiteInv-800` - Selected state and loading skeleton background
- **Text Colors**:
  - `color='800'` prop - Secondary text color for categories and counts

### Tailwind Utilities
- **Layout**: `flex`, `flex-col`, `justify-between`, `items-center`
- **Spacing**: `gap-4`, `px-3`, `py-2`, `mt-3.5`, `ml-2`
- **Sizing**: `size-6`, `size-32`, `max-w-32`, `h-[150px]`
- **Visual**: `rounded-xl`, `shadow-sm`, `line-clamp-1`
- **Interactive**: `cursor-pointer`, `hover:shadow-md`

## Styling

### States
- **Default**: Light border with subtle shadow
- **Selected**: Dark border (`pgStroke-950`) with inverted background
- **Loading**: Skeleton fallback with animated placeholders
- **Hover**: Enhanced shadow (can be added via className)

### Customization Options
```tsx
// Custom styling examples
<TopicPreviewCardSmall
  className="hover:border-pgBlue-500 transition-colors"
  // ... other props
/>

// Different background on selection
<TopicPreviewCardSmall
  className={cn(
    "transition-all duration-200",
    isSelected && "bg-pgBlue-50 border-pgBlue-300"
  )}
  // ... other props
/>
```

## Responsive Design

### Breakpoint Adaptations
- **Mobile (default)**: Compact layout with mobile expand button visible
- **Large screens (lg: 1024px+)**: Increased bottom margin (`lg:mb-4`)

### Mobile-Specific Features
- Mobile expand button (⋮) appears when `onMobileExpand` is provided
- Compact button styling with `size-6` and `fullRadius`
- Horizontal property layout for space efficiency

## Accessibility

### ARIA Features
- Semantic HTML structure with proper heading hierarchy (`h3` for topic names)
- Checkbox integration with TanStack table row selection
- Click handlers properly handle event propagation

### Keyboard Navigation
- Card is keyboard accessible through standard div click handling
- Checkbox maintains standard keyboard interaction
- Action button is focusable and keyboard accessible

### Screen Reader Support
- Topic names use proper heading structure
- Categories and article counts have descriptive labels via `PropertyBlockMobile`
- Avatar provides text alternative through `name` prop

## Dependencies

### Internal Components
- **`Avatar`** - Displays topic representation with fallback initials
- **`Checkbox`** - Handles row selection state
- **`CompactButton`** - Mobile expand action button
- **`Progress`** - Visual representation of article count ratio
- **`PropertyBlockMobile`** - Labeled property display for mobile
- **`Skeleton`** - Loading state placeholders
- **`Typography`** - Design system typography component

### External Dependencies
- **`@tanstack/react-table`** - Row selection management
- **`react-icons/pi`** - More options icon (`PiMore2Fill`)

### Utilities
- **`cn`** - Conditional class name utility
- **`nFormatter`** - Number formatting for large counts

### Types
- **`Topic`** - Core topic data structure
- **`EntityCount`** - Statistics data for progress visualization