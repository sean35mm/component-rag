# SearchCompanies Component

## Purpose

The `SearchCompanies` component provides a filterable accordion interface for selecting companies within a search drawer. It displays a searchable list of companies with checkboxes, showing default companies when no search is active and dynamic results when searching. The component handles both authenticated and public access scenarios with appropriate fallbacks.

## Component Type

**Client Component** - Uses `'use client'` directive because it manages local state (search input, active selections), handles user interactions (checkbox changes, search input), and utilizes browser-specific hooks like `useState` and `useCallback`.

## Props Interface

### SearchCompanies Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Set of currently selected company IDs |
| `onActiveChange` | `(items: Set<string>) => void` | Yes | Callback fired when the selection changes |

### Internal Component Props

#### CompanyCheckboxInternalProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Company ID |
| `onCheckedChange` | `(id: string, checked: boolean) => void` | Yes | Callback for checkbox state changes |
| `...other` | `FiltersDrawerCheckboxProps` | No | Additional checkbox props |

#### CompaniesListProps
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `active` | `Set<string>` | Yes | Currently selected company IDs |
| `defaultCompanies` | `Set<string>` | Yes | Default companies to display |
| `search` | `string` | No | Current search query |
| `onCheckedChange` | `(domain: string, checked: boolean) => void` | Yes | Checkbox change handler |

## Usage Example

```tsx
import { SearchCompanies } from '@/components/search/smart-search-input/search-drawer/search-companies';

function SearchDrawer() {
  const [selectedCompanies, setSelectedCompanies] = useState(new Set<string>());

  return (
    <div className="search-drawer">
      <SearchCompanies
        active={selectedCompanies}
        onActiveChange={setSelectedCompanies}
      />
    </div>
  );
}

// Usage with pre-selected companies
function SearchDrawerWithDefaults() {
  const [selectedCompanies, setSelectedCompanies] = useState(
    new Set(['5985872d662c4a3f941a9c581a9fce71']) // Apple Inc.
  );

  return (
    <SearchCompanies
      active={selectedCompanies}
      onActiveChange={setSelectedCompanies}
    />
  );
}
```

## Functionality

### Core Features
- **Searchable Company List**: Real-time search with dynamic results
- **Default Companies**: Displays predefined companies when no search is active
- **Checkbox Selection**: Multi-select interface with visual feedback
- **Access Control**: Handles authenticated, public, and fallback states
- **Loading States**: Animated loading indicators during data fetching
- **Suspense Integration**: Graceful loading with fallback components

### Key Behaviors
- Search triggers API calls to fetch matching companies
- Default companies are shown when search is empty
- Selected state persists across search/default view transitions
- Animated transitions between loading and content states
- Industry information displayed as subtitles when available

## State Management

### Local State (useState)
- `search`: Current search input value
- Component maintains search state independently from parent

### Props State
- `active`: Selected company IDs managed by parent component
- `onActiveChange`: Updates parent's selection state

### TanStack Query Integration
- `useCompanies`: Fetches companies based on search query
- `useCompanyByIdSuspense`: Fetches individual company details for defaults
- Query enabled conditionally based on search presence

## Side Effects

### API Calls
- **Company Search**: Triggered when search query exists
- **Company Details**: Fetched for default companies when authenticated
- **Conditional Fetching**: Queries disabled when search is empty

### User Interactions
- Search input changes trigger re-queries
- Checkbox changes update parent selection state
- Smooth animations on state transitions

## Dependencies

### UI Components
- `FiltersDrawerAccordionItem`: Accordion container
- `FiltersDrawerCheckbox`: Individual checkbox items
- `CompanyCitationItemBase/Fallback`: Company display components
- `MenuSearchInput`: Search input field

### Hooks & Contexts
- `useAccessToken`: Authentication and authorization state
- `useCompanies`: Company search query hook
- `useCompanyByIdSuspense`: Individual company data hook

### External Libraries
- `framer-motion`: Animation and transitions
- `react`: Core React functionality

## Integration

### Search Drawer Architecture
```
SearchDrawer
├── SearchCompanies (this component)
│   ├── FiltersDrawerAccordionItem
│   ├── MenuSearchInput
│   └── CompaniesList
│       ├── CompanyCheckboxBase (with data)
│       ├── CompanyCheckboxFallback (loading/error)
│       └── PeopleCheckboxSuspense (async loading)
```

### Data Flow
1. Parent manages selected companies state
2. Component handles search input locally
3. TanStack Query manages server state
4. Authentication context determines data access level

## Best Practices

### Architectural Adherence
- ✅ **Client Component**: Uses client-side interactivity appropriately
- ✅ **Component Decomposition**: Well-decomposed with specialized sub-components
- ✅ **TanStack Query**: Proper server state management
- ✅ **Reusability**: Leverages UI components from `/ui/` directory

### Performance Optimizations
- Conditional query execution based on search state
- Memoized default companies list
- Suspense boundaries for non-blocking UI
- Efficient Set operations for selection management

### Error Handling
- Graceful degradation with fallback components
- Default company names when API data unavailable
- Loading states prevent UI flashing

### Accessibility
- Screen reader support with loading announcements
- Proper ARIA attributes through base components
- Keyboard navigation support via checkbox components