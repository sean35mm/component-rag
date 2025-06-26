# Action Buttons Component

## Purpose

The `action-buttons` component provides interactive controls for managing sources within the source group drawer in the settings search customization feature. It enables users to search for and add sources to a source group, as well as remove existing sources. The component handles both matched sources from the API and unmatched domains that users manually enter.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive user inputs (search, button clicks)
- Complex state management with Zustand store
- Debounced search functionality
- Form interactions and real-time updates

## Props Interface

### SearchAndAddSource
No props - uses global state from Zustand store.

### RemoveSourceButton
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `source` | `SourcePreview` | Yes | The source object to be removed, containing domain, metadata, and preview flags |

### AddSourceButton & ActionButtons
No props - self-contained components.

## Usage Example

```tsx
import { 
  ActionButtons, 
  SearchAndAddSource, 
  RemoveSourceButton 
} from '@/components/settings/search-customization/source-group-drawer/action-buttons';

// Basic usage in source group drawer
function SourceGroupDrawer() {
  return (
    <div>
      {/* Add new sources section */}
      <div className="p-4">
        <SearchAndAddSource />
      </div>
      
      {/* Action buttons for general source management */}
      <ActionButtons />
      
      {/* Individual source removal */}
      {sources.map(source => (
        <div key={source.domain} className="flex items-center justify-between">
          <span>{source.domain}</span>
          <RemoveSourceButton source={source} />
        </div>
      ))}
    </div>
  );
}

// Usage in preview mode for adding sources
function SourcePreviewRow({ source, isPreview }) {
  return (
    <div className="source-row">
      {isPreview ? (
        <SearchAndAddSource />
      ) : (
        <>
          <span>{source.domain}</span>
          <RemoveSourceButton source={source} />
        </>
      )}
    </div>
  );
}
```

## Functionality

### SearchAndAddSource
- **Debounced Search**: 500ms delay to prevent excessive API calls
- **Autocomplete Interface**: Real-time source suggestions with logos
- **Duplicate Prevention**: Filters out already selected sources
- **Domain Validation**: Uses regex to validate domain format
- **Unmatched Domain Support**: Allows adding domains not found in API
- **Auto-focus**: Automatically focuses input when mounted

### AddSourceButton
- **Preview Mode**: Adds a new source in preview state for editing
- **Single Addition**: Prevents multiple simultaneous source additions
- **State Management**: Updates global source group data

### RemoveSourceButton
- **Source Removal**: Removes source from the group
- **Selection Cleanup**: Updates table selection state if source was selected
- **State Synchronization**: Maintains consistency across related UI components

### ActionButtons
- **Container Component**: Provides consistent styling and layout for action controls

## State Management

**Zustand Store Integration** (`useSourceGroupsDrawerStore`):
- `createSourceGroupData`: Array of sources being added to the group
- `updatePreviewCreateSourceGroupData`: Adds new source to the group
- `addCreateSourceGroupData`: Adds preview source for editing
- `removeCreateSourceGroupData`: Removes source from the group
- `rowSelectionState`: Tracks table row selections
- `decrementTotalSelectedTableSources`: Updates selection counts

**Local State**:
- `useDebounce`: Manages search input debouncing for API efficiency

## Side Effects

### API Interactions
- **Source Search**: Queries sources API with prefix search when user types
- **Debounced Requests**: Prevents API spam with 500ms debounce delay

### State Updates
- **Global State Mutations**: Updates source group data across the application
- **Selection State Management**: Synchronizes removal with table selection state
- **Preview State Transitions**: Manages preview-to-confirmed source transitions

## Dependencies

### UI Components
- `AutoComplete`: Search and selection interface
- `Button`: Primary action buttons
- `CompactButton`: Space-efficient remove buttons

### Icons
- `PiAddLine`: Add source icon
- `PiDeleteBinLine`: Remove source icon

### Hooks & Utilities
- `useSources`: TanStack Query hook for source data fetching
- `useDebounce`: Input debouncing for search optimization
- `DOMAIN_REGEX`: Domain validation pattern

### Types
- `SourcePreview`: Source object interface
- `Option`: Autocomplete option interface

## Integration

### Search Customization Flow
1. **Source Group Creation**: User creates/edits source groups
2. **Source Addition**: Search and add sources via autocomplete
3. **Source Management**: Remove unwanted sources
4. **Validation**: Ensure domains meet requirements
5. **State Persistence**: Maintain changes across drawer interactions

### Data Flow
```
User Input → Debounced Search → API Query → Filtered Results → 
Selection → State Update → UI Refresh → Validation → Persistence
```

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriate use for interactive functionality
- ✅ **Component Decomposition**: Flat structure with focused responsibilities
- ✅ **State Management**: Proper Zustand integration for global state
- ✅ **Query Integration**: TanStack Query for server state management

### Performance Optimizations
- **Debounced Search**: Reduces API call frequency
- **Memoized Options**: Prevents unnecessary re-renders
- **Conditional Queries**: Only fetches when search input exists
- **Duplicate Filtering**: Client-side deduplication

### User Experience
- **Auto-focus**: Immediate interaction capability
- **Loading States**: Visual feedback during API calls
- **Validation**: Real-time domain format checking
- **Prevention Logic**: Blocks invalid operations (duplicate additions)

### Error Handling
- **Empty States**: Graceful handling of no search results
- **Validation Feedback**: Domain format requirements
- **State Consistency**: Maintains data integrity across operations