# PreviewSkeleton Component

## Purpose

The `PreviewSkeleton` component provides a loading state placeholder that mimics the structure and layout of a signal preview interface. It displays skeleton elements that match the shape of signal information, charts, and recent articles while data is being fetched, maintaining visual consistency and improving perceived performance.

## Component Type

**Server Component** - This is a pure presentational component that renders static skeleton elements without any client-side interactivity, state management, or event handlers. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { PreviewSkeleton } from '@/components/signals/preview/preview-skeleton';

// Used in a loading state
function SignalPreviewContainer({ signalId }: { signalId: string }) {
  const { data: signal, isLoading } = useSignal(signalId);

  if (isLoading) {
    return <PreviewSkeleton />;
  }

  return <SignalPreview signal={signal} />;
}

// Used in a Suspense boundary
function SignalDashboard() {
  return (
    <div className="dashboard-container">
      <Suspense fallback={<PreviewSkeleton />}>
        <SignalPreviewContent />
      </Suspense>
    </div>
  );
}

// Used conditionally with data fetching
function PreviewSection() {
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);

  return (
    <div className="preview-section">
      {isPreviewLoading ? (
        <PreviewSkeleton />
      ) : (
        <ActualPreviewContent />
      )}
    </div>
  );
}
```

## Functionality

### Core Features
- **Layout Mimicking**: Replicates the exact structure of the signal preview interface
- **Visual Hierarchy**: Maintains proper spacing and proportions during loading states
- **Responsive Design**: Adapts skeleton layout for different screen sizes (mobile/desktop)
- **Section Organization**: Clearly delineated skeleton sections for different content areas

### Skeleton Sections
1. **Signal Info Section**:
   - Live preview badge
   - Title and description placeholders
   - Tag placeholders with pill shapes

2. **Chart Section**:
   - Integrated chart skeleton using `ChartSkeleton` component
   - Proper sizing and proportions

3. **Recent Articles Section**:
   - Section header with title and metadata
   - Scrollable list of article placeholders
   - Individual article cards with source, title, and tag information

## State Management

**No State Management** - This component is stateless and purely presentational. It doesn't manage any local state, server state, or global state, making it predictable and performant.

## Side Effects

**No Side Effects** - The component has no side effects, API calls, or external interactions. It's a pure rendering component focused solely on displaying skeleton placeholders.

## Dependencies

### UI Components
- `@/components/ui/badge` - For the live preview badge
- `@/components/ui/skeleton` - For individual skeleton elements

### Related Components
- `../details/chart-skeleton` - For the chart section skeleton
- Implicitly related to the actual preview components it represents

### Styling Dependencies
- Tailwind CSS classes for layout and styling
- Custom CSS classes (`scrollbar-custom-md`) for enhanced scrolling experience

## Integration

### Application Architecture Role
- **Loading States**: Primary component for signal preview loading states
- **Suspense Integration**: Works seamlessly with React Suspense boundaries
- **Data Fetching**: Complements TanStack Query loading states
- **User Experience**: Maintains visual continuity during asynchronous operations

### Component Relationships
```
PreviewSkeleton
├── Badge (Live preview indicator)
├── Multiple Skeleton elements (Content placeholders)
└── ChartSkeleton (Chart section)
```

### Usage Patterns
- Loading states for signal previews
- Suspense fallbacks for data-dependent preview sections
- Progressive loading experiences in signal dashboards

## Best Practices

### Architecture Alignment
✅ **Server Component**: Correctly implemented as a server component since it requires no client-side features

✅ **Component Decomposition**: Follows flat composition by reusing `ChartSkeleton` rather than nesting custom chart skeleton logic

✅ **Reusability**: Provides a reusable loading state that can be used across different signal preview contexts

✅ **Performance**: Lightweight and efficient with no unnecessary re-renders or state management

### Implementation Quality
✅ **Responsive Design**: Properly handles mobile and desktop layouts with responsive classes

✅ **Visual Consistency**: Skeleton shapes and sizes match the actual content structure

✅ **Accessibility**: Uses proper semantic structure that screen readers can navigate

✅ **Maintainability**: Clear section organization with comments for easy updates

### Integration Best Practices
- Use with TanStack Query's `isLoading` states for consistent data fetching patterns
- Combine with Suspense boundaries for automatic loading state management
- Ensure skeleton layout matches actual component structure to prevent layout shifts
- Consider using this skeleton whenever signal preview data is being fetched or revalidated