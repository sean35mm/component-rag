# ExcludedLanguageItem Component

## Purpose

The `ExcludedLanguageItem` component renders a filter item representing an excluded programming language in the filters drawer. It displays the language name with a translate icon and provides a standardized interface for users to remove language exclusions from their search filters.

## Component Type

**Server Component** - This is a presentational component that doesn't require client-side interactivity beyond click handling. It renders static content and delegates event handling to parent components, making it suitable as a server component.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `LanguagesFilters` | Yes | The programming language identifier/name to display |
| `onClick` | `() => void` | Yes | Callback function executed when the user clicks to remove this language filter |

## Usage Example

```tsx
import { ExcludedLanguageItem } from '@/components/filters/filters-drawer/excluded-language-item';

// In a parent component managing excluded languages
const FilterDrawer = () => {
  const [excludedLanguages, setExcludedLanguages] = useState<LanguagesFilters[]>([
    'javascript',
    'python',
    'java'
  ]);

  const handleRemoveLanguage = (languageToRemove: LanguagesFilters) => {
    setExcludedLanguages(prev => 
      prev.filter(lang => lang !== languageToRemove)
    );
  };

  return (
    <div className="filter-drawer">
      <h3>Excluded Languages</h3>
      {excludedLanguages.map((language) => (
        <ExcludedLanguageItem
          key={language}
          value={language}
          onClick={() => handleRemoveLanguage(language)}
        />
      ))}
    </div>
  );
};
```

## Functionality

- **Visual Representation**: Displays excluded programming languages with a consistent translate icon
- **Interactive Removal**: Provides click interaction to remove language filters
- **Standardized Layout**: Uses base component for consistent styling and behavior
- **Accessibility**: Inherits accessibility features from the base component
- **Type Safety**: Enforces proper language filter types through TypeScript

## State Management

**Stateless Component** - This component manages no internal state. It receives all necessary data through props and delegates state changes to parent components through the `onClick` callback. State management for excluded languages typically occurs in:

- Parent filter components using local React state
- Global filter state managed through Zustand stores
- Server state synchronization via TanStack Query for persisted filter preferences

## Side Effects

**No Direct Side Effects** - The component itself performs no side effects. However, the `onClick` callback may trigger:

- Parent component state updates
- Filter synchronization with backend services
- URL parameter updates for shareable filter states
- Local storage persistence of filter preferences

## Dependencies

### Internal Dependencies
- `@/components/icons` - PiTranslate icon for visual representation
- `@/lib/types` - LanguagesFilters type definition
- `./excluded-filter-item-base` - Base component providing common layout and styling

### External Dependencies
- `React` - Core React functionality for component structure

## Integration

### Application Architecture
- **Filters System**: Part of the broader filtering mechanism for search/discovery features
- **Drawer UI**: Integrates within the filters drawer interface for managing search parameters
- **Type System**: Leverages shared type definitions for language filters across the application

### Component Hierarchy
```
FilterDrawer
├── ExcludedLanguageItem (this component)
│   └── ExcludedFilterListItemBase
└── Other filter components
```

### Data Flow
1. Parent component provides excluded language value and removal handler
2. Component renders using base component with language-specific props
3. User interaction triggers callback to parent for state management
4. Parent updates filter state and potentially synchronizes with backend

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Uses composition with `ExcludedFilterListItemBase` for shared functionality
- ✅ **Reusability**: Specific to language filters while maintaining consistent interface
- ✅ **Server Component**: Appropriately implemented as server component for static rendering
- ✅ **Type Safety**: Proper TypeScript integration with domain-specific types

### Implementation Patterns
- **Single Responsibility**: Focused solely on language filter representation
- **Prop Drilling**: Minimal props interface for clean component boundaries
- **Event Delegation**: Delegates state management to appropriate parent components
- **Consistent Styling**: Leverages base component for uniform filter item appearance

### Integration Recommendations
- Use within filter management systems requiring language exclusion
- Combine with other excluded filter item components for comprehensive filtering UI
- Integrate with global state management for persistent filter preferences
- Consider accessibility requirements when implementing parent interaction handlers