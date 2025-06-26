# use-route-state Hook Pattern

## Pattern Overview

The `use-route-state` hook is a client-side state management pattern that enables passing complex data between Next.js pages through URL navigation while maintaining clean URLs. It combines URL search parameters with session storage to achieve stateful navigation without exposing sensitive or complex data directly in the URL.

### When to Use This Pattern

- **Cross-page state transfer**: When you need to pass complex objects between pages during navigation
- **Form data preservation**: Maintaining form state across page transitions
- **Filter/search state**: Preserving search filters when navigating between list and detail views
- **Wizard flows**: Passing accumulated data through multi-step processes
- **Deep linking with context**: Enabling shareable URLs while maintaining application context

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Source Page   │    │   URL Transit   │    │ Destination Page│
│                 │    │                 │    │                 │
│ 1. Create state │───▶│ 2. URL + Key    │───▶│ 3. Retrieve     │
│    in session   │    │    parameter    │    │    from session │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ sessionStorage  │    │ ?psk=unique-key │    │ Auto-cleanup    │
│ [key]: data     │    │                 │    │ (optional)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Core Components

1. **Session Storage**: Stores serialized data with unique keys
2. **URL Parameter**: Carries the storage key via `psk` (Page State Key) parameter
3. **Navigation Wrapper**: Integrates with Next.js router for seamless transitions
4. **Cleanup Mechanism**: Automatic removal of stored data and URL parameters

## Implementation Details

### Key Implementation Techniques

#### 1. **Unique Key Generation**
```tsx
const key = generateSeededUniqueId(seed);
```
- Uses seeded random generation for reproducible keys when needed
- Prevents key collisions across different navigation sessions

#### 2. **Client-Side Validation**
```tsx
const checkIsWindow = useCallback(() => {
  if (!isWindow) {
    throw new Error('useRouteState is only available on a client component');
  }
}, [isWindow]);
```
- Enforces client-side only usage with clear error messaging
- Prevents SSR issues with session storage access

#### 3. **Data Serialization**
```tsx
window.sessionStorage.setItem(key, JSON.stringify(data));
```
- Automatic JSON serialization/deserialization
- Maintains type safety through generic constraints

#### 4. **Navigation Integration**
```tsx
const pushWithState = useCallback(
  (path: string, data: DATA, seed?: string) => {
    const key = create(data, seed);
    const searchParams = new URLSearchParams();
    searchParams.set(SEARCH_PARAM_KEY, key);
    router.push(`${path}?${searchParams.toString()}`);
  },
  [create, router]
);
```
- Seamless integration with Next.js navigation
- Maintains existing URL parameters while adding state key

## Usage Examples

### Basic Navigation with State

```tsx
'use client';

import { useRouteState } from '@/components/hooks/use-route-state';

interface UserFilters {
  department: string;
  role: string;
  status: 'active' | 'inactive';
}

function UserListPage() {
  const { pushWithState } = useRouteState<UserFilters>();
  
  const handleUserClick = (userId: string) => {
    const currentFilters: UserFilters = {
      department: 'engineering',
      role: 'developer',
      status: 'active'
    };
    
    // Navigate to user detail with current filters
    pushWithState(`/users/${userId}`, currentFilters);
  };

  return (
    <div>
      {/* User list implementation */}
      <button onClick={() => handleUserClick('123')}>
        View User Details
      </button>
    </div>
  );
}
```

### Retrieving State on Destination Page

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouteState } from '@/components/hooks/use-route-state';

interface UserFilters {
  department: string;
  role: string;
  status: 'active' | 'inactive';
}

function UserDetailPage() {
  const { getStateForCurrentRoute } = useRouteState<UserFilters>();
  const [previousFilters, setPreviousFilters] = useState<UserFilters | null>(null);

  useEffect(() => {
    // Retrieve state and clean up URL parameter
    const filters = getStateForCurrentRoute({
      removeParamFromUrl: true,
      autoRemove: true
    });
    
    setPreviousFilters(filters);
  }, [getStateForCurrentRoute]);

  const handleBackNavigation = () => {
    // Use previous filters to reconstruct the filtered list view
    if (previousFilters) {
      // Apply filters and navigate back
      router.push(`/users?dept=${previousFilters.department}&role=${previousFilters.role}`);
    } else {
      router.push('/users');
    }
  };

  return (
    <div>
      <button onClick={handleBackNavigation}>
        Back to Users {previousFilters && '(Filtered)'}
      </button>
      {/* User detail implementation */}
    </div>
  );
}
```

### Form Data Persistence

```tsx
'use client';

interface FormData {
  personalInfo: {
    name: string;
    email: string;
  };
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

function MultiStepForm() {
  const { pushWithState, replaceWithState } = useRouteState<FormData>();
  
  const proceedToNextStep = (formData: FormData) => {
    // Use replaceWithState to avoid back button issues in multi-step flows
    replaceWithState('/form/step-2', formData, 'form-session');
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = getFormData(); // Your form data extraction logic
      proceedToNextStep(formData);
    }}>
      {/* Form fields */}
    </form>
  );
}
```

## Best Practices

### 1. **Data Structure Design**
```tsx
// ✅ Good: Serializable data structures
interface NavigationState {
  filters: Record<string, string>;
  pagination: { page: number; limit: number };
  sortBy: string;
}

// ❌ Avoid: Non-serializable data
interface BadState {
  callback: () => void;        // Functions can't be serialized
  promise: Promise<any>;       // Promises can't be serialized
  domNode: HTMLElement;        // DOM nodes can't be serialized
}
```

### 2. **Memory Management**
```tsx
// Always clean up when possible
const data = getStateForCurrentRoute({
  removeParamFromUrl: true,  // Clean URL
  autoRemove: true          // Clean session storage
});
```

### 3. **Error Handling**
```tsx
function SafeStateRetrieval() {
  const { getStateForCurrentRoute } = useRouteState<MyData>();
  
  useEffect(() => {
    try {
      const state = getStateForCurrentRoute();
      if (state) {
        // Validate state structure before using
        if (isValidStateStructure(state)) {
          setAppState(state);
        }
      }
    } catch (error) {
      console.error('Failed to retrieve route state:', error);
      // Fallback to default state
      setAppState(getDefaultState());
    }
  }, []);
}
```

### 4. **Type Safety**
```tsx
// Define strict interfaces for your state
interface StrictUserState {
  readonly id: string;
  readonly filters: {
    readonly department: string;
    readonly role: string;
  };
  readonly timestamp: number;
}

const { pushWithState } = useRouteState<StrictUserState>();
```

## Integration

### Next.js App Router Integration

```tsx
// app/users/page.tsx
'use client';

import { useRouteState } from '@/components/hooks/use-route-state';

export default function UsersPage() {
  const routeState = useRouteState<UserFilters>();
  
  // Component implementation
}
```

### Middleware Integration

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // You can inspect or modify psk parameters if needed
  const psk = request.nextUrl.searchParams.get('psk');
  
  if (psk && !isValidPskFormat(psk)) {
    // Handle invalid state keys
    const url = request.nextUrl.clone();
    url.searchParams.delete('psk');
    return NextResponse.redirect(url);
  }
}
```

### State Management Integration

```tsx
// Integration with Zustand or other state managers
interface GlobalState {
  routeState: any;
  setRouteState: (state: any) => void;
}

function useIntegratedRouteState<T>() {
  const { getStateForCurrentRoute } = useRouteState<T>();
  const setGlobalRouteState = useStore(state => state.setRouteState);
  
  useEffect(() => {
    const routeState = getStateForCurrentRoute();
    if (routeState) {
      setGlobalRouteState(routeState);
    }
  }, []);
}
```

## Type Safety

### Generic Type Constraints

```tsx
// Ensure serializable data types
type SerializableValue = string | number | boolean | null | undefined;
type SerializableObject = {
  [key: string]: SerializableValue | SerializableObject | SerializableValue[];
};

export function useRouteState<DATA extends SerializableObject>() {
  // Implementation ensures type safety
}
```

### Runtime Type Validation

```tsx
import { z } from 'zod';

const UserFiltersSchema = z.object({
  department: z.string(),
  role: z.string(),
  status: z.enum(['active', 'inactive'])
});

function TypeSafeComponent() {
  const { getStateForCurrentRoute } = useRouteState<z.infer<typeof UserFiltersSchema>>();
  
  useEffect(() => {
    const rawState = getStateForCurrentRoute();
    
    if (rawState) {
      try {
        const validatedState = UserFiltersSchema.parse(rawState);
        setFilters(validatedState);
      } catch (error) {
        console.error('Invalid state structure:', error);
      }
    }
  }, []);
}
```

## Performance

### Memory Optimization

```tsx
// Use cleanup to prevent memory leaks
useEffect(() => {
  return () => {
    // Clean up any remaining session storage on unmount
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('generated-id-prefix')) {
        sessionStorage.removeItem(key);
      }
    });
  };
}, []);
```

### Debounced Navigation

```tsx
import { useMemo } from 'react';
import { debounce } from 'lodash';

function OptimizedNavigation() {
  const { pushWithState } = useRouteState<SearchState>();
  
  const debouncedNavigation = useMemo(
    () => debounce((path: string, state: SearchState) => {
      pushWithState(path, state);
    }, 300),
    [pushWithState]
  );
  
  return { debouncedNavigation };
}
```

### Bundle Size Considerations

```tsx
// Lazy load the hook for better code splitting
const useRouteState = lazy(() => import('@/hooks/use-route-state'));

// Or use dynamic imports
const navigateWithState = async (path: string, data: any) => {
  const { useRouteState } = await import('@/hooks/use-route-state');
  // Use the hook
};
```

## Testing

### Unit Testing

```tsx
// __tests__/use-route-state.test.tsx
import { renderHook } from '@testing-library/react';
import { useRouteState } from '@/hooks/use-route-state';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn()
  }),
  useSearchParams: () => new URLSearchParams()
}));

describe('useRouteState', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  it('should create and retrieve state', () => {
    const { result } = renderHook(() => useRouteState<{test: string}>());
    
    const testData = { test: 'value' };
    const key = result.current.create(testData);
    const retrieved = result.current.get(key);
    
    expect(retrieved).toEqual(testData);
  });

  it('should handle navigation with state', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    
    const { result } = renderHook(() => useRouteState<{id: number}>());
    
    result.current.pushWithState('/test-path', { id: 123 });
    
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('/test-path?psk=')
    );
  });
});
```

### Integration Testing

```tsx
// __tests__/navigation-flow.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SourcePage } from '@/pages/source';
import { DestinationPage } from '@/pages/destination';

describe('Navigation Flow', () => {
  it('should preserve state across navigation', async () => {
    const { rerender } = render(<SourcePage />);
    
    // Simulate navigation with state
    fireEvent.click(screen.getByText('Navigate with State'));
    
    // Rerender as destination page
    rerender(<DestinationPage />);
    
    // Verify state was preserved
    expect(screen.getByText('Received State: test-value')).toBeInTheDocument();
  });
});
```

### E2E Testing

```tsx
// cypress/e2e/route-state.cy.ts
describe('Route State Navigation', () => {
  it('should maintain state across page navigation', () => {
    cy.visit('/users');
    
    // Set up some filters
    cy.get('[data-testid="department-filter"]').select('Engineering');
    cy.get('[data-testid="role-filter"]').select('Developer');
    
    // Navigate to detail page
    cy.get('[data-testid="user-item"]').first().click();
    
    // Navigate back
    cy.get('[data-testid="back-button"]').click();
    
    // Verify filters are restored
    cy.get('[data-testid="department-filter"]').should('have.value', 'Engineering');
    cy.get('[data-testid="role-filter"]').should('have.value', 'Developer');
  });
});
```

## Common Pitfalls

### 1. **Server-Side Rendering Issues**

```tsx
// ❌ Wrong: Using hook in server component
export default function ServerComponent() {
  const { pushWithState } = useRouteState(); // Will throw error
  return <div>Content</div>;
}

// ✅ Correct: Use only in client components
'use client';
export default function ClientComponent() {
  const { pushWithState } = useRouteState();
  return <div>Content</div>;
}
```

### 2. **Memory Leaks**

```tsx
// ❌ Wrong: Not cleaning up session storage
const navigateToDetail = (id: string) => {
  const state = { filters: getCurrentFilters() };
  pushWithState(`/detail/${id}`, state);
  // State remains in session storage indefinitely
};

// ✅ Correct: Enable auto-cleanup
const retrieveState = () => {
  return getStateForCurrentRoute({
    autoRemove: true,        // Removes from session storage
    removeParamFromUrl: true // Cleans URL
  });
};
```

### 3. **Non-Serializable Data**

```tsx
// ❌ Wrong: Including functions or complex objects
const badState = {
  callback: () => console.log('test'),
  date: new Date(),
  regex: /pattern/g
};

// ✅ Correct: Use serializable data only
const goodState = {
  callbackId: 'handleUserClick',
  dateString: new Date().toISOString(),
  pattern: 'pattern'
};
```

### 4. **State Validation**

```tsx
// ❌ Wrong: Assuming state structure is always valid
const state = getStateForCurrentRoute();
const userId = state.user.id; // Could throw if state is null or malformed

// ✅ Correct: Always validate retrieved state
const state = getStateForCurrentRoute();
if (state && typeof state === 'object' && 'user' in state) {
  const userId = state.user?.id;
}
```

### 5. **URL Parameter Conflicts**

```tsx
// ❌ Wrong: Using 'psk' for other purposes
const searchParams = new URLSearchParams();
searchParams.set('psk', 'my-custom-value'); // Conflicts with route state

// ✅ Correct: Use different parameter names
const searchParams = new URLSearchParams();
searchParams.set('customKey', 'my-custom-value');
```

This pattern provides a robust solution for stateful navigation in Next.js applications while maintaining clean URLs and good performance characteristics. The key to success is proper error handling, memory management, and understanding the client-side limitations.