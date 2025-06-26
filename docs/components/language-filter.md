# LanguageFilter Component

## Purpose

The `LanguageFilter` component provides a searchable accordion-style filter interface for programming languages within a filters drawer. It allows users to select multiple languages, exclude specific languages from results, and search through available language options. This component is specifically designed for filtering content or data based on programming language criteria.

## Component Type

**Client Component** - Uses the `'use client'` directive (implied by useState usage) because it:
- Manages local search state with `useState`
- Handles user interactions (search, checkbox changes, exclusions)
- Requires event handlers and interactive UI elements
- Needs to maintain real-time search filtering

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<LanguagesFilters>` | Yes | Set of currently selected/active language filters |
| `onActiveChange` | `(items: Set<LanguagesFilters>) => void` | Yes | Callback fired when active language selection changes |
| `excludedItems` | `ExcludedFilterItem[]` | Yes | Array of items that are excluded from filtering |
| `onExcludedItemsChange` | `(items: ExcludedFilterItem[]) => void` | Yes | Callback fired when excluded items change |

## Usage Example

```tsx
import { useState } from 'react';
import { LanguageFilter } from '@/components/filters/filters-drawer/language-filter';
import { LanguagesFilters, ExcludedFilterItem } from '@/lib/types';

function FiltersDrawer() {
  const [activeLanguages, setActiveLanguages] = useState<Set<LanguagesFilters>>(
    new Set([LanguagesFilters.JavaScript, LanguagesFilters.TypeScript])
  );
  const [excludedItems, setExcludedItems] = useState<ExcludedFilterItem[]>([]);

  return (
    <div className="filters-drawer">
      <LanguageFilter
        active={activeLanguages}
        onActiveChange={setActiveLanguages}
        excludedItems={excludedItems}
        onExcludedItemsChange={setExcludedItems}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Multi-select Language Filtering**: Users can select multiple programming languages from available options
- **Search Functionality**: Real-time search filtering of language options with case-insensitive matching
- **Exclusion Support**: Ability to exclude specific languages from filter results
- **Active Counter**: Displays count of selected languages in the accordion header
- **Dynamic State Management**: Manages both active selections and excluded items

### Key Behaviors
- **Search Filtering**: Filters language list based on user input, matching against language names
- **Selection Management**: Adds/removes languages from active set based on checkbox interactions
- **Exclusion Handling**: Manages excluded items list for languages that should be filtered out
- **State Synchronization**: Keeps UI state in sync with parent component state through callbacks

## State Management

### Local State
- **Search State**: Uses `useState` to manage search input value for filtering languages
- **Derived State**: Uses `useMemo` to compute filtered and processed language list

### Parent State Integration
- **Active Languages**: Managed by parent component, passed down as controlled prop
- **Excluded Items**: Managed by parent component for cross-filter exclusion logic
- **Callback Pattern**: Uses callback props to communicate state changes to parent

## Side Effects

### Event Handlers
- **Item Selection**: Modifies active language set and triggers parent callback
- **Exclusion Changes**: Updates excluded items array and notifies parent component
- **Search Input**: Updates local search state for real-time filtering

### Memoization
- **Language List Processing**: Memoizes expensive language list filtering and mapping operations
- **Dependency Optimization**: Recalculates only when active set, excluded items, or search term changes

## Dependencies

### UI Components
- `FiltersDrawerAccordionList`: Core accordion list component for filter UI
- `PiTranslate`: Icon component for language filter visual representation

### Types and Enums
- `LanguagesFilters`: Enum containing available programming language options
- `ExcludedFilterItem` & `ExcludedFilterItemType`: Types for exclusion functionality

### Hooks
- `useState`: Local search state management
- `useMemo`: Performance optimization for derived state
- `useCallback`: Event handler optimization

## Integration

### Filters Architecture
- **Part of Filters Drawer System**: Integrates with larger filtering interface
- **Consistent UI Pattern**: Uses shared `FiltersDrawerAccordionList` component for uniform appearance
- **Cross-Filter Exclusion**: Participates in application-wide exclusion system

### Data Flow
- **Upward State Flow**: Communicates selections and exclusions to parent filter manager
- **Controlled Component**: Receives state from parent, ensuring single source of truth
- **Event-Driven Updates**: Uses callback pattern for loose coupling with parent components

## Best Practices

### Architecture Adherence
- ✅ **Component Decomposition**: Uses shared UI components (`FiltersDrawerAccordionList`) following Lego block principle
- ✅ **State Management**: Appropriately uses local state for UI concerns, parent state for business logic
- ✅ **Performance**: Implements proper memoization with `useMemo` and `useCallback`
- ✅ **Reusability**: Generic enough to be used in different filter contexts

### Implementation Quality
- ✅ **TypeScript Integration**: Fully typed with proper interfaces and type safety
- ✅ **Controlled Components**: Follows React best practices for controlled component patterns
- ✅ **Event Handling**: Proper event handler implementation with performance considerations
- ✅ **Search UX**: Implements intuitive search functionality with case-insensitive matching

### Domain Integration
- ✅ **Feature Organization**: Properly placed in filters domain structure
- ✅ **Consistent API**: Follows established patterns for filter component interfaces
- ✅ **Extensible Design**: Easy to extend with additional language-specific features