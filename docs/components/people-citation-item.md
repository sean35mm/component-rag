# PeopleCitationItem

## Purpose

The `PeopleCitationItem` component renders a citation item for a person entity, displaying their profile image or a placeholder with their name. It integrates with the Wikidata API to fetch person data and handles loading states with Suspense patterns. The component is built on top of the `CitationItem` system and provides fallback states for unauthorized access or missing data.

## Props Interface

### PeopleCitationItem (Main Component)

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `classNames` | `CitationItemClassNames` | No | Custom class names for styling different parts of the component |
| `wikidataId` | `string` | Yes | The Wikidata ID of the person to display |
| `priority` | `boolean` | No | Whether to prioritize image loading (for above-the-fold content) |
| `size` | `CitationItemSizes \| null` | No | Size variant for the citation item |

### PeopleCitationItemBase

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `classNames` | `CitationItemClassNames` | No | Custom class names for styling |
| `priority` | `boolean` | No | Image loading priority |
| `size` | `CitationItemSizes \| null` | No | Size variant |
| `people` | `Person` | Yes | Person data object |

### CitationItemClassNames Interface

```typescript
interface CitationItemClassNames {
  common?: string;     // Applied to all variants
  image?: string;      // Applied to image element
  placeholder?: string; // Applied to placeholder state
}
```

## Usage Example

```tsx
import { PeopleCitationItem } from '@/components/ui/people-citation-item';

function AuthorList() {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Standard usage */}
      <PeopleCitationItem 
        wikidataId="Q937"
        size="medium"
      />
      
      {/* With custom styling */}
      <PeopleCitationItem 
        wikidataId="Q5879"
        size="large"
        priority
        classNames={{
          common: 'ring-2 ring-pgBlue-500',
          image: 'rounded-full',
          placeholder: 'bg-pgNeutral-100 text-pgText-600'
        }}
      />
      
      {/* In a grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {authorIds.map((wikidataId) => (
          <PeopleCitationItem 
            key={wikidataId}
            wikidataId={wikidataId}
            size="small"
            classNames={{
              common: 'hover:ring-2 hover:ring-pgBlue-300 transition-all duration-200'
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- Inherits typography from `CitationItem` component
- Placeholder text uses system font stack with appropriate sizing based on `size` prop

### Color Tokens
```css
/* Common color applications */
.placeholder-styling {
  background-color: rgb(var(--pgNeutral-100));
  color: rgb(var(--pgText-600));
  border: 1px solid rgb(var(--pgStroke-200));
}

/* Hover states */
.hover-states {
  background-color: rgb(var(--pgNeutral-50));
  border-color: rgb(var(--pgBlue-300));
}

/* Dark mode adaptations */
@media (prefers-color-scheme: dark) {
  .placeholder-styling {
    background-color: rgb(var(--pgNeutral-800));
    color: rgb(var(--pgText-300));
    border-color: rgb(var(--pgStroke-700));
  }
}
```

## Styling

### Size Variants
Available through the `size` prop (inherited from `CitationItem`):
- `"small"` - Compact version for dense layouts
- `"medium"` - Default size for standard use cases  
- `"large"` - Prominent display for featured content
- `null` - Uses default styling

### States
1. **Loading State**: Shows fallback placeholder with "Person" text
2. **Image State**: Displays person's profile image with alt text
3. **Placeholder State**: Shows text-based placeholder with person's name
4. **Error State**: Gracefully falls back to placeholder when data unavailable

### Customization Options
```tsx
// Custom styling example
<PeopleCitationItem 
  wikidataId="Q123"
  classNames={{
    common: `
      transition-all duration-300 
      hover:scale-105 
      focus:ring-2 focus:ring-pgBlue-500 
      focus:outline-none
    `,
    image: `
      rounded-full 
      border-2 border-pgStroke-200 
      dark:border-pgStroke-700
    `,
    placeholder: `
      bg-gradient-to-br from-pgNeutral-50 to-pgNeutral-100
      dark:from-pgNeutral-800 dark:to-pgNeutral-900
      text-pgText-700 dark:text-pgText-300
      typography-labelMedium
    `
  }}
/>
```

## Responsive Design

The component adapts to different screen sizes through the underlying `CitationItem`:

```tsx
// Responsive grid example
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
  {people.map((id) => (
    <PeopleCitationItem 
      key={id}
      wikidataId={id}
      size="small"
      classNames={{
        common: 'w-full aspect-square'
      }}
    />
  ))}
</div>
```

### Breakpoint Behavior
- **sm (640px+)**: Increased spacing and potentially larger sizes
- **md (768px+)**: Optimal layout for desktop viewing
- **lg (1024px+)**: Enhanced hover states and interactions
- **xl (1280px+)**: Maximum size variants available

## Accessibility

### Built-in Features
- **Alt Text**: Automatically generated as `"Logo for ${people.name}"`
- **Semantic HTML**: Uses proper image elements and fallback text
- **Keyboard Navigation**: Inherits focus management from `CitationItem`
- **Screen Reader Support**: Meaningful alt text and placeholder content

### Best Practices
```tsx
// Accessible implementation
<PeopleCitationItem 
  wikidataId="Q456"
  classNames={{
    common: `
      focus:ring-2 focus:ring-pgBlue-500 
      focus:ring-offset-2 focus:ring-offset-pgBackground-0
      focus:outline-none
      tabindex="0"
    `
  }}
  aria-label="Author profile"
/>
```

### ARIA Considerations
- Consider adding `role="img"` for decorative usage
- Use `aria-label` or `aria-describedby` for additional context
- Ensure sufficient color contrast for placeholder text (4.5:1 minimum)

## Dependencies

### Internal Dependencies
- `CitationItem` - Base citation display component
- `CitationItemPlaceholder` - Fallback display component
- `useAccessToken` - Authentication context hook
- `usePeopleByWikidataIdSuspense` - Data fetching hook

### External Dependencies
- `React.Suspense` - For loading state management
- `@/lib/utils/cn` - Class name utility function
- Tailwind CSS - For styling utilities

### Related Components
```tsx
// Often used together
import { 
  PeopleCitationItem,
  OrganizationCitationItem,
  PublicationCitationItem 
} from '@/components/ui/citation-items';

// Common patterns
<div className="flex flex-wrap gap-2">
  <PeopleCitationItem wikidataId="Q1" />
  <OrganizationCitationItem wikidataId="Q2" />
</div>
```

### Type Dependencies
- `Person` - Person entity type
- `AccessToken` - Authorization token type
- `CitationItemSizes` - Size variant type
- `CitationItemClassNames` - Styling interface type