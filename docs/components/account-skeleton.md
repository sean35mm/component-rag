# AccountSkeleton Component

## Purpose

The `AccountSkeleton` component provides a loading placeholder for account-related content in the signals preview section. It displays animated skeleton elements that mimic the structure of an account display while data is being fetched, maintaining visual consistency and improving perceived performance.

## Component Type

**Server Component** - This is a server component as it renders static skeleton UI elements without any client-side interactivity, state management, or event handling. No `'use client'` directive is needed.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props |

## Usage Example

```tsx
import { AccountSkeleton } from '@/components/signals/preview/account-skeleton';

// In a signals preview component
export function SignalsPreview() {
  const { data: accountData, isLoading } = useQuery({
    queryKey: ['account-data'],
    queryFn: fetchAccountData,
  });

  return (
    <div className="signals-preview">
      {isLoading ? (
        <AccountSkeleton />
      ) : (
        <AccountDisplay data={accountData} />
      )}
    </div>
  );
}

// In a page component
export function AccountPage() {
  return (
    <div>
      <Suspense fallback={<AccountSkeleton />}>
        <AccountDetails />
      </Suspense>
    </div>
  );
}
```

## Functionality

- **Visual Placeholder**: Renders animated skeleton elements that represent account information structure
- **Loading State**: Provides visual feedback during data fetching operations
- **Layout Preservation**: Maintains consistent spacing and layout to prevent layout shifts
- **Responsive Design**: Adapts to different screen sizes through Tailwind CSS classes

## State Management

**No State Management** - This component is stateless and purely presentational. It renders static skeleton elements without managing any internal state, server state, or client state.

## Side Effects

**No Side Effects** - This component performs no API calls, external interactions, or side effects. It's a pure rendering component focused solely on displaying loading placeholders.

## Dependencies

### Internal Dependencies
- `@/components/ui/skeleton` - Core skeleton component providing the animated loading effect

### External Dependencies
- **Tailwind CSS** - For styling and layout classes
- **React** - Base framework (implicit)

## Integration

The `AccountSkeleton` component integrates into the signals preview architecture as a loading state component:

```
src/components/signals/preview/
├── account-skeleton.tsx     # Loading placeholder
├── account-display.tsx      # Actual account content
└── signals-preview.tsx      # Parent container
```

**Integration Patterns:**
- Used within `Suspense` boundaries for server-side loading states
- Displayed during TanStack Query loading states
- Placed in parent components that manage account data fetching
- Maintains consistent visual hierarchy with actual account components

## Best Practices

### ✅ Architectural Adherence

1. **Server Component Usage**: Correctly implemented as a server component without unnecessary client-side code
2. **Component Decomposition**: Simple, focused component that does one thing well
3. **Flat Structure**: Minimal nesting, clean component hierarchy
4. **Domain Organization**: Properly placed in the signals/preview domain folder

### ✅ Implementation Patterns

1. **Consistent Skeleton Structure**: Layout matches the actual account display component
2. **Responsive Design**: Uses Tailwind classes for consistent spacing and sizing
3. **Reusable Skeleton Components**: Leverages the shared `Skeleton` UI component
4. **Performance**: Lightweight with no unnecessary dependencies or computations

### ✅ Usage Guidelines

1. **Loading States**: Use with TanStack Query `isLoading` states
2. **Suspense Integration**: Effective fallback for server component suspense boundaries
3. **Layout Stability**: Prevents cumulative layout shift during loading
4. **Visual Consistency**: Maintains design system consistency with rounded corners and proper spacing

This component exemplifies our architecture principles by being a focused, reusable loading state component that integrates seamlessly with our data fetching and UI patterns.