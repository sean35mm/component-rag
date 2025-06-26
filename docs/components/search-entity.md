# SearchEntity Component

## Purpose

The `SearchEntity` component renders interactive entity buttons (companies, people, topics) with icons and remove functionality. It serves as a unified interface for displaying different types of search entities with consistent styling and behavior, featuring automatic data fetching and fallback states.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `entity` | `SearchEntityItem` | ✅ | - | The entity data to display (company, person, or topic) |
| `onRemoveEntity` | `(entity: SearchEntityItem) => void` | ❌ | - | Callback fired when entity remove button is clicked |
| `onClick` | `(entity: SearchEntityItem) => void` | ❌ | - | Callback fired when entity button is clicked |
| `disableRemove` | `boolean` | ❌ | `false` | Disables the remove functionality |
| `className` | `string` | ❌ | - | Additional CSS classes for styling |
| `size` | `'sm' \| 'md'` | ❌ | `'md'` | Size variant for the entity button |

### SearchEntityItem Type Structure
```tsx
interface SearchEntityItem {
  id: string;
  type: SearchEntities.COMPANIES | SearchEntities.PEOPLE | SearchEntities.TOPICS;
  originalName?: string;
  icon?: string | React.ReactNode;
  domain?: string; // For companies
}
```

## Usage Example

```tsx
import { SearchEntity } from '@/components/ui/search-entity';
import { SearchEntities } from '@/lib/types';

// Company entity
const companyEntity = {
  id: 'company-123',
  type: SearchEntities.COMPANIES,
  originalName: 'Acme Corporation',
  icon: 'https://example.com/logo.png',
  domain: 'acme.com'
};

// People entity
const personEntity = {
  id: 'person-456',
  type: SearchEntities.PEOPLE,
  originalName: 'John Doe',
  icon: 'https://example.com/avatar.jpg'
};

// Topic entity
const topicEntity = {
  id: 'artificial-intelligence',
  type: SearchEntities.TOPICS,
  originalName: 'Artificial Intelligence'
};

function SearchFilters() {
  const handleRemoveEntity = (entity) => {
    console.log('Removing entity:', entity);
  };

  const handleEntityClick = (entity) => {
    console.log('Entity clicked:', entity);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {/* Company entity with custom styling */}
      <SearchEntity
        entity={companyEntity}
        onRemoveEntity={handleRemoveEntity}
        onClick={handleEntityClick}
        className="text-pgText-900 bg-pgBackground-50"
        size="md"
      />

      {/* People entity - non-removable */}
      <SearchEntity
        entity={personEntity}
        onClick={handleEntityClick}
        disableRemove
        size="sm"
      />

      {/* Topic entity with custom colors */}
      <SearchEntity
        entity={topicEntity}
        onRemoveEntity={handleRemoveEntity}
        className="bg-pgBlue-50 text-pgBlue-900 border-pgBlue-200"
      />
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Uses typography classes inherited from `PillButton` component
- Entity names typically use `.typography-labelMedium` or `.typography-labelSmall` based on size

### Color Tokens
```css
/* Default entity button colors */
.entity-button {
  background: rgb(var(--pgBackground-50));
  color: rgb(var(--pgText-900));
  border: 1px solid rgb(var(--pgStroke-200));
}

/* Hover states */
.entity-button:hover {
  background: rgb(var(--pgBackground-100));
  border-color: rgb(var(--pgStroke-300));
}

/* Topic variant colors */
.entity-button--topic {
  background: rgb(var(--pgBlue-50));
  color: rgb(var(--pgBlue-900));
  border-color: rgb(var(--pgBlue-200));
}
```

### Tailwind Utilities Used
- **Layout**: `flex`, `items-center`, `gap-2`
- **Sizing**: `size-5`, `h-[2.125rem]`, `w-40`
- **Spacing**: `p-2`, `px-3`, `py-1.5`
- **Borders**: `rounded-3xl`, `rounded-md`, `border`
- **Colors**: `bg-pgBackground-*`, `text-pgText-*`, `border-pgStroke-*`

## Styling

### Available Variants
The component inherits variants from `PillButton`:
- **topic** (default): Blue-themed styling for topic entities
- Custom styling can be applied via `className` prop

### States
- **Default**: Standard appearance with icon and text
- **Loading**: Shows skeleton placeholder while fetching data
- **Hover**: Enhanced border and background colors
- **Removable**: Displays close button when `disableRemove` is false
- **Non-removable**: No close button, click-only interaction

### Customization Options
```tsx
// Custom colors using design system tokens
<SearchEntity
  entity={entity}
  className="
    bg-pgGreen-50 
    text-pgGreen-900 
    border-pgGreen-200
    hover:bg-pgGreen-100
    hover:border-pgGreen-300
  "
/>

// Dark mode support
<SearchEntity
  entity={entity}
  className="
    dark:bg-pgBackground-800 
    dark:text-pgText-100
    dark:border-pgStroke-700
  "
/>
```

## Responsive Design

### Breakpoint Adaptations
```tsx
// Responsive sizing and layout
<div className="
  flex flex-wrap gap-1 sm:gap-2 
  text-sm sm:text-base
">
  <SearchEntity
    entity={entity}
    size="sm"
    className="
      px-2 py-1 sm:px-3 sm:py-1.5
      text-xs sm:text-sm
    "
  />
</div>
```

### Mobile Considerations
- Icons maintain consistent 20px size across breakpoints
- Button padding adjusts for touch targets on mobile
- Text truncation prevents overflow on smaller screens

## Accessibility

### ARIA Support
- Inherits ARIA properties from `PillButton` component
- Remove buttons include proper `aria-label` attributes
- Entity buttons have appropriate `role` and `tabindex`

### Keyboard Navigation
```tsx
// Full keyboard support
<SearchEntity
  entity={entity}
  onRemoveEntity={handleRemove}
  // Supports:
  // - Tab navigation
  // - Enter/Space to activate
  // - Escape to close (when removable)
/>
```

### Screen Reader Support
- Entity names are properly announced
- Remove functionality is clearly communicated
- Loading states provide appropriate feedback

## Dependencies

### Required Components
- **PillButton**: Core button component with pill styling
- **CitationItemWrapper**: Wrapper for entity icons
- **CitationItemPlaceholder**: Fallback for missing icons
- **Favicon**: Dynamic favicon loading component
- **Skeleton**: Loading state placeholder

### Query Hooks
- **useCompanies**: Fetches company data
- **usePeoples**: Fetches person data  
- **useTopics**: Fetches topic data

### Utility Functions
- **mapCompany**: Maps company API response to entity format
- **mapPeople**: Maps person API response to entity format
- **mapTopic**: Maps topic API response to entity format
- **mapResult**: Generic result mapping utility

### Type Dependencies
```tsx
import {
  SearchEntities,
  SearchEntityItem,
  Company,
  Person,
  Topic
} from '@/lib/types';
```