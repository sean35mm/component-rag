# FiltersPage Component

## Purpose

The `FiltersPage` component serves as the main interface for managing saved search filter presets within the search customization settings. It provides users with the ability to view existing saved filters and create new filter presets to streamline their search experience across the application.

## Component Type

**Server Component** - This component does not require client-side interactivity at the root level. It acts as a layout container that orchestrates child components, making it suitable for server-side rendering. Any interactive functionality is delegated to its child components that can opt into client-side rendering as needed.

## Props Interface

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| None | - | - | This component accepts no props |

## Usage Example

```tsx
// In a settings layout or route component
import { FiltersPage } from '@/components/settings/search-customization/filters-page';

export default function SearchCustomizationPage() {
  return (
    <div className="settings-container">
      <h1>Search Customization</h1>
      <FiltersPage />
    </div>
  );
}

// Or as part of a tabbed settings interface
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FiltersPage } from '@/components/settings/search-customization/filters-page';

export function SearchSettings() {
  return (
    <Tabs defaultValue="filters">
      <TabsList>
        <TabsTrigger value="filters">Saved Filters</TabsTrigger>
        <TabsTrigger value="preferences">Search Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="filters">
        <FiltersPage />
      </TabsContent>
    </Tabs>
  );
}
```

## Functionality

- **Layout Structure**: Provides a clean, organized layout for filter management features
- **User Guidance**: Displays instructional text explaining the purpose of saved filters
- **Component Orchestration**: Coordinates the display of saved filters list and creation interface
- **Responsive Design**: Implements responsive spacing that adapts to different screen sizes (mobile vs desktop)

## State Management

This component follows the **stateless container pattern**:

- **No Direct State**: The component itself manages no state
- **Child Component State**: State management is delegated to child components:
  - `SavedFiltersList` likely uses TanStack Query for fetching saved filters
  - `CreateSavedFilterDrawer` probably manages form state with React Hook Form and local state for drawer visibility

## Side Effects

**No Direct Side Effects** - This component performs no API calls or side effects. All data fetching and mutations are handled by its child components, maintaining clear separation of concerns.

## Dependencies

### Internal Dependencies
- `@/components/ui/typography` - UI component for consistent text styling
- `./saved-filter-drawer` - Drawer component for creating new saved filters
- `./saved-filters-list` - Component for displaying and managing existing saved filters

### External Dependencies
- `React` - Core React library for component functionality

## Integration

### Application Architecture Role
- **Settings Module**: Part of the broader settings/preferences system
- **Search System**: Integrates with the application's search functionality to provide filter preset capabilities
- **Navigation**: Typically accessed through settings navigation or search customization flows

### Data Flow
```
User Settings → Search Customization → FiltersPage
                                          ├── SavedFiltersList (displays existing filters)
                                          └── CreateSavedFilterDrawer (creates new filters)
```

### Route Integration
```tsx
// Typical route structure
/settings/search-customization/filters → FiltersPage
```

## Best Practices

### ✅ Architecture Adherence

1. **Server Component Default**: Correctly implemented as a server component since no client-side interactivity is needed at this level

2. **Component Decomposition**: Follows the "Lego block" approach by:
   - Acting as a simple layout container
   - Delegating specific functionality to focused child components
   - Maintaining flat component hierarchy

3. **Separation of Concerns**: 
   - Layout and structure handled here
   - Data fetching delegated to `SavedFiltersList`
   - Form handling delegated to `CreateSavedFilterDrawer`

4. **Responsive Design**: Implements proper responsive spacing patterns with Tailwind classes

### 📁 File Organization
- Located in domain-specific directory (`settings/search-customization`)
- Clear, descriptive filename and export
- Follows feature-based organization rather than technical grouping

### 🎨 UI Consistency
- Uses design system components (`Typography`)
- Consistent spacing and layout patterns
- Follows established visual hierarchy

This component exemplifies our architectural principles by serving as a focused, stateless container that orchestrates specialized child components while maintaining clear boundaries and responsibilities.