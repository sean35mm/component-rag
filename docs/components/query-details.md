# QueryDetails Component

## Purpose

The `QueryDetails` component displays comprehensive details about a signal's query configuration, including the main query text, title filters, entities, and additional filters. It provides a read-only view with editing capabilities and handles query expansion/truncation for better UX.

## Component Type

**Client Component** - Uses `'use client'` due to:
- Interactive state management (expansion/truncation)
- DOM manipulation for measuring content height
- Event handlers for editing and expanding content
- Multiple hooks for client-side state management

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signalData` | `Signal` | Yes | Complete signal object containing query, entities, and filter configuration |

## Usage Example

```tsx
import { QueryDetails } from '@/components/signals/details/query-details';
import { Signal } from '@/lib/types';

function SignalDetailsPage({ signal }: { signal: Signal }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <QueryDetails signalData={signal} />
      {/* Other signal detail components */}
    </div>
  );
}

// Example with typical signal data structure
const exampleSignal: Signal = {
  id: 'signal-123',
  signalQuery: {
    query: {
      articlesQuery: {
        query: {
          q: 'artificial intelligence AND machine learning',
          title: 'breakthrough OR innovation'
        },
        showReprints: false
      }
    }
  },
  status: SignalStatusEnum.ACTIVE,
  // ... other signal properties
};

<QueryDetails signalData={exampleSignal} />
```

## Functionality

### Core Features
- **Query Display**: Shows main query text with syntax highlighting for boolean operators
- **Title Filtering**: Displays title-specific query filters when present
- **Smart Truncation**: Automatically truncates long queries with expand/collapse functionality
- **Copy Functionality**: Provides copy buttons for both main query and title query
- **Entity Display**: Shows associated entities when present in the signal
- **Filter Management**: Displays current filters applied to the signal
- **Edit Access**: Provides edit buttons with proper permission checking

### Display Modes
- **Query + Title**: Shows both main query and title query with AND separator
- **Query Only**: Displays main query content without title section
- **Title Only**: Shows only title query when no main query exists

### Interactive Elements
- **Expand/Collapse**: Dynamic content expansion for long queries
- **Copy Buttons**: One-click copying of query strings
- **Edit Buttons**: Navigate to edit mode with proper validation

## State Management

### Local State (useState)
```tsx
const [isExpanded, setIsExpanded] = useState(false);
const [needsTruncation, setNeedsTruncation] = useState(false);
```

### Zustand Store Integration
- **Filters Drawer Store**: Manages filter application state
- **Usage Context**: Tracks active signal limits

### Computed State (useMemo)
- Query text extraction from nested signal structure
- Title query extraction
- Reprint settings
- Entity presence checking

## Side Effects

### DOM Measurement (useEffect)
```tsx
useEffect(() => {
  const element = document.querySelector('#query-details');
  if (element) {
    setTimeout(() => {
      // Measure content height for truncation logic
      setNeedsTruncation(element.scrollHeight > 70);
    }, 50); // Mobile Safari compatibility fix
  }
}, [signalQuery?.q, queryTitle]);
```

### Filter Application (useEffect)
```tsx
useEffect(() => {
  const filters = mapComplexAllEndpointQueryToFilters(signalQuery, showReprints);
  onFiltersApply(filters);
}, [signalQuery, showReprints, onFiltersApply]);
```

## Dependencies

### Custom Hooks
- `useSwitchSignalEditMode`: Handles transition to edit mode
- `useSignalCreation`: Manages signal creation limits and validation
- `useFiltersDrawerStore`: Global filter state management
- `useUsageContext`: Signal usage tracking

### UI Components
- `Block`: Container component for consistent layout
- `Button`: Action buttons with consistent styling
- `CopyButton`: Copy-to-clipboard functionality
- `RichTextarea`: Enhanced textarea with syntax highlighting
- `TextareaHighlight`: Basic textarea highlighting
- `Typography`: Consistent text styling
- `Tooltip`: Contextual help and information

### Utility Functions
- `combinedBooleanAndBracketRenderer`: Query syntax highlighting
- `mapComplexAllEndpointQueryToFilters`: Filter conversion
- `getIsSignalHasEntities`: Entity presence detection

## Integration

### Application Flow
1. **Signal Details View**: Primary container for displaying signal information
2. **Edit Mode Integration**: Seamlessly transitions to signal editing workflow
3. **Filter System**: Integrates with global filter management
4. **Copy Functionality**: Enables query sharing and reuse

### Data Flow
```
Signal Data → Query Extraction → Display Components → User Interactions → State Updates
                    ↓
            Filter Application → Global Filter Store
                    ↓
            Edit Actions → Signal Edit Mode → Signal Creation Flow
```

## Best Practices

### Architecture Adherence
- ✅ **Lego Block Design**: Composed of focused sub-components (`QueryContent`, `QueryMainContent`, etc.)
- ✅ **Flat Structure**: Avoids deep nesting through component decomposition
- ✅ **Client State Management**: Uses Zustand for global state, local state for UI concerns
- ✅ **Proper Separation**: UI logic separated from business logic

### Performance Optimizations
- `useMemo` for expensive computations (query extraction, entity checking)
- `useCallback` for stable event handlers
- Conditional rendering to avoid unnecessary DOM updates
- Delayed DOM measurements for mobile compatibility

### User Experience
- Progressive disclosure with expand/collapse functionality
- Clear visual hierarchy with consistent typography
- Accessible tooltips for edit actions
- Copy functionality for query reuse
- Proper loading states and error boundaries

### Code Organization
- Small, focused sub-components for maintainability
- Clear prop interfaces with TypeScript
- Consistent naming conventions
- Proper error handling and edge cases