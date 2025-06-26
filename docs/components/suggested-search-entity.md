# SuggestedSearchEntity Component

## Purpose

The `SuggestedSearchEntity` component renders interactive search entity suggestions as pill-style buttons with icons and add functionality. It handles different entity types (companies, people, topics, stories) by wrapping them in type-specific data fetchers and displaying them with appropriate loading states and fallbacks.

## Props Interface

### SuggestedEntityProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the component |
| `entity` | `SearchEntityItem` | Yes | The search entity item containing id, type, name, and icon information |
| `onAddEntity` | `(entity: SearchEntityItem) => void` | No | Callback fired when the add button is clicked |
| `onClick` | `(entity: SearchEntityItem) => void` | No | Callback fired when the pill button is clicked |

## Usage Example

```tsx
import { SuggestedSearchEntity } from '@/components/ui/suggested-search-entity';
import { SearchEntities, SearchEntityItem } from '@/lib/types';

function SearchSuggestions() {
  const handleAddEntity = (entity: SearchEntityItem) => {
    console.log('Adding entity:', entity.originalName);
  };

  const handleEntityClick = (entity: SearchEntityItem) => {
    console.log('Entity clicked:', entity.originalName);
  };

  const companyEntity: SearchEntityItem = {
    id: 'company-123',
    type: SearchEntities.COMPANIES,
    originalName: 'Acme Corporation',
    icon: 'https://example.com/acme-logo.png'
  };

  const topicEntity: SearchEntityItem = {
    id: 'artificial-intelligence',
    type: SearchEntities.TOPICS,
    originalName: 'Artificial Intelligence',
    icon: null
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      <SuggestedSearchEntity
        entity={companyEntity}
        onAddEntity={handleAddEntity}
        onClick={handleEntityClick}
        className="mr-2"
      />
      
      <SuggestedSearchEntity
        entity={topicEntity}
        onAddEntity={handleAddEntity}
        onClick={handleEntityClick}
      />
    </div>
  );
}
```

## Design System Usage

### Typography
- Uses inherited text styling from `PillButton` component
- Entity names displayed with default pill button typography

### Colors
- **Border**: `border-pgStroke-200` (default dashed border)
- **Hover Border**: `hover:border-pgStroke-300` (interactive state)
- **Background**: `bg-transparent` (transparent background)
- Inherits color system from `PillButton` variant='topic'

### Spacing
- **Padding**: `px-1.5 py-1` (6px horizontal, 4px vertical)
- **Border Radius**: `rounded-[10px]` (custom 10px radius)
- **Icon Size**: Fixed at `20px` for consistency

## Styling

### Variants
The component uses the `PillButton` with:
- **Variant**: `'topic'` (fixed variant for consistent styling)
- **Size**: `'sm'` (small size for compact display)

### States
- **Default**: Dashed border with transparent background
- **Hover**: Enhanced border color (`pgStroke-300`)
- **Loading**: Shows skeleton fallback during data fetching
- **Closable**: Includes add/close functionality

### Customization Options
```tsx
// Custom styling
<SuggestedSearchEntity
  entity={entity}
  className="border-pgStroke-400 hover:border-pgBlue-300"
  onAddEntity={handleAdd}
/>

// Additional spacing
<div className="flex gap-3">
  <SuggestedSearchEntity entity={entity1} />
  <SuggestedSearchEntity entity={entity2} />
</div>
```

## Responsive Design

The component inherits responsive behavior from its container:

```tsx
// Responsive grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
  {entities.map(entity => (
    <SuggestedSearchEntity key={entity.id} entity={entity} />
  ))}
</div>

// Responsive flex wrap
<div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
  {entities.map(entity => (
    <SuggestedSearchEntity key={entity.id} entity={entity} />
  ))}
</div>
```

## Accessibility

### ARIA Support
- Inherits accessibility features from `PillButton` component
- Icon images include descriptive `alt` text with entity names
- Interactive elements are keyboard accessible

### Screen Reader Support
```tsx
// Enhanced accessibility
<SuggestedSearchEntity
  entity={entity}
  onAddEntity={handleAdd}
  onClick={handleClick}
  // PillButton internally handles ARIA labels and roles
/>
```

### Focus Management
- Supports keyboard navigation through inherited button behavior
- Focus indicators follow design system standards
- Tab order respects natural document flow

## Dependencies

### Internal Components
- **`PillButton`**: Core interactive button component
- **`CitationItem`**: Icon/image display with fallback support
- **`CitationItemPlaceholder`**: Fallback component for missing icons
- **`Skeleton`**: Loading state component

### Hooks & Utilities
- **`useCompanies`**: Data fetching for company entities
- **`usePeoples`**: Data fetching for people entities  
- **`useTopics`**: Data fetching for topic entities
- **`cn`**: Utility for conditional class merging

### Mapping Functions
- **`mapCompany`**: Transform company data to SearchEntityItem
- **`mapPeople`**: Transform people data to SearchEntityItem
- **`mapTopic`**: Transform topic data to SearchEntityItem
- **`mapResult`**: Generic result transformation utility

### Type Dependencies
```tsx
import {
  SearchEntityItem,
  SearchEntities,
  Company,
  Person,
  Topic,
  StandardSearchResult,
  CustomSearchResult
} from '@/lib/types';
```

## Loading States

The component includes built-in loading states for async data fetching:

```tsx
// Skeleton dimensions match pill button size
function SuggestedEntityFallback() {
  return <Skeleton className="h-[2.125rem] w-40 rounded-3xl" />;
}
```