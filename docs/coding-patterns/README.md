# Coding Patterns Documentation

This section documents the coding patterns, architectural decisions, and best practices used throughout the Perigon codebase.

## Overview

The codebase follows consistent patterns that promote:

- **Type Safety**: Comprehensive TypeScript usage
- **Maintainability**: Clear separation of concerns
- **Performance**: Optimized data fetching and state management
- **Developer Experience**: Consistent APIs and patterns
- **Scalability**: Modular architecture that grows with the application

## Core Patterns

### State Management Architecture

**Server State**: React Query (TanStack Query)

- Centralized cache management
- Automatic background refetching
- Optimistic updates
- Error handling and retry logic

**Client State**: Zustand stores

- Lightweight and performant
- TypeScript-first design
- Devtools integration
- Persistent state when needed

**URL State**: Next.js router integration

- Shareable application state
- Deep linking support
- Browser history management

### Data Fetching Patterns

**Service Layer**: Centralized API communication

- Consistent error handling
- Request/response transformation
- Authentication integration
- Type-safe endpoints

**Query Hooks**: React Query integration

- Declarative data fetching
- Cache management
- Loading and error states
- Infinite queries for pagination

**Service Wrappers**: Business logic abstraction

- Domain-specific operations
- Error transformation
- Data normalization

### Component Architecture

**Composition Patterns**:

- Compound components for complex UI
- Render props for flexible behavior
- Higher-order components for cross-cutting concerns

**Context Usage**:

- Authentication state
- Theme and UI preferences
- Feature flags and configuration

**Custom Hooks**:

- Reusable stateful logic
- Side effect management
- Business logic encapsulation

### Type System Patterns

**Discriminated Unions**: Type-safe state machines

- Loading, success, error states
- Different data shapes based on context
- Exhaustive pattern matching

**Generic Types**: Reusable type patterns

- API response wrappers
- Component prop patterns
- Utility type functions

**Branded Types**: Enhanced type safety

- Entity IDs with compile-time checking
- Validated string types
- Domain-specific primitives

## Development Practices

### Error Handling Strategy

**Graceful Degradation**:

- Fallback UI components
- Error boundaries at strategic levels
- User-friendly error messages

**Monitoring and Observability**:

- Structured error reporting
- Performance monitoring
- User experience tracking

### Performance Optimization

**Bundle Optimization**:

- Dynamic imports for code splitting
- Tree shaking for unused code
- Optimized dependencies

**Runtime Performance**:

- Memoization strategies
- Virtual scrolling for large lists
- Debounced user interactions

**Network Optimization**:

- Request deduplication
- Background prefetching
- Caching strategies

### Testing Patterns

**Unit Testing**:

- Pure function testing
- Hook testing with React Testing Library
- Mock strategies for external dependencies

**Integration Testing**:

- Component integration tests
- API integration tests
- End-to-end user flows

### Security Patterns

**Authentication & Authorization**:

- JWT token management
- Role-based access control
- Route protection patterns

**Data Validation**:

- Input sanitization
- Schema validation with Zod
- Type-safe API contracts

## Code Organization

### File Structure Conventions

- Feature-based organization
- Co-location of related files
- Consistent naming patterns
- Clear import/export strategies

### Naming Conventions

- PascalCase for components and types
- camelCase for functions and variables
- kebab-case for file names
- SCREAMING_SNAKE_CASE for constants

### Import/Export Patterns

- Barrel exports for public APIs
- Relative imports within features
- Absolute imports for shared utilities
- Type-only imports where appropriate

## Documentation Structure

Each coding pattern is documented with:

- Pattern overview and use cases
- Implementation examples
- Best practices and guidelines
- Common pitfalls to avoid
- Performance considerations
- Testing strategies

Browse the individual pattern documentation files to understand specific implementations and usage guidelines.

# Coding Patterns

This directory contains documentation for common coding patterns and development practices used throughout the Perigon application. These patterns ensure consistency, maintainability, and best practices across the codebase.

## Overview

Our codebase follows strict patterns for:

- **TypeScript**: Strict typing with interfaces over types
- **State Management**: TanStack Query for server state, Zustand for client state
- **Services**: Clean API service architecture with proper error handling
- **Components**: Reusable UI components with proper separation of concerns
- **Forms**: React Hook Form with Zod validation
- **Architecture**: Next.js 15+ App Router patterns

## TypeScript Patterns

### Strict Typing Guidelines

- **Always use strict typing** (`strict: true` in `tsconfig.json`)
- **Avoid `any`** unless absolutely necessary
- **Use `interface` over `type`** for object shapes (better readability and extension)
- **Literals vs Enums**: Use literals for single-use, enums for reusable values

```typescript
// ✅ LITERALS - Single use
interface ScheduleIntervalObject {
  hour: number;
  minute: number;
  days: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
}

// ✅ ENUMS - Reusable values
export enum SignalStatusEnum {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  STOPPED = 'STOPPED',
  ARCHIVED = 'ARCHIVED',
}

export interface SignalObject {
  status: SignalStatusEnum;
}
```

### Type Architecture Pattern

Start with domain objects, then build response shapes and request types:

```typescript
// DOMAIN OBJECTS
interface SignalObject {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  status: SignalStatus;
  signalType: SignalType;
  schedulePolicy: SchedulePolicy;
  signalQuery: SignalQuery | null;
}

// QUERY RESPONSE TYPES
export interface SignalListResponse {
  data: SignalObject[];
  total: number;
}

export type SignalDetailResponse = Partial<SignalObject>;

export interface SignalListFilters {
  sortBy: 'createdAt' | 'updatedAt' | 'id';
  sortOrder: 'desc' | 'asc';
  folderIsNull?: boolean;
}

// MUTATION REQUEST TYPES
export interface SignalMutateGenericParameters {
  resourceId: string;
  body: Partial<SignalObject>;
}

export type SignalCreateRequest = Pick<
  SignalObject,
  'name' | 'signalType' | 'schedulePolicy'
>;
export type SignalUpdateStatusRequest = Pick<SignalObject, 'status'>;
export type SignalUpdateQueryRequest = Pick<SignalObject, 'signalQuery'>;
```

## Service Architecture

### API Services Pattern

Services handle CRUD operations with:

- **Simple, focused methods**
- **No error handling** (handled by query hooks)
- **No data transformation** (raw API responses)
- **Proper credential management**

```typescript
export const SignalService = ApiWithCredentialsServiceWrapper((api) => ({
  async list(
    filters: SignalListFilters,
    signal?: AbortSignal
  ): Promise<SignalListResponse> {
    const response = await api.get('/signal/all', { params: filters, signal });

    // Response settled but server replied with non-2xx
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new HttpException(response.statusText, response.status, payload);
    }

    return await response.json();
  },

  async create(body: SignalCreateRequest): Promise<SignalObject> {
    const response = await api.post('/signal', { json: body });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new HttpException(response.statusText, response.status, payload);
    }

    return await response.json();
  },
}));
```

## TanStack Query Patterns

### Query Keys with Factory Pattern

Use `@lukemorales/query-key-factory` for consistent query keys:

```typescript
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const signals = createQueryKeys('signals', {
  list: (filters: SignalListFilters) => ({
    queryKey: [{ filters }],
  }),
  detail: (resourceId: string) => ({
    queryKey: [resourceId],
  }),
});
```

### Custom Query Hooks

```typescript
// Custom hook with selector support
interface UseQueryOptionSelect<TInputSelectorData, UOutputSelectorData> {
  select?: (data: TInputSelectorData) => UOutputSelectorData;
}

export function useSignalsList<TOutputSelectorData = SignalListResponse>(
  filters: SignalListFilters,
  enabled: boolean,
  select?: UseQueryOptionSelect<SignalListResponse, TOutputSelectorData>
) {
  return useQuery({
    ...queryKeys.signals.list(filters),
    ...select,
    enabled,
    queryFn: ({ signal }) => SignalService.list(filters, signal),
  });
}
```

### Mutation Hooks with Cache Management

```typescript
export function useSignalCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SignalCreateRequest) => SignalService.create(body),
    onSuccess(createdSignal) {
      // Cache the new signal
      if (createdSignal?.id !== undefined) {
        queryClient.setQueryData(
          queryKeys.signals.detail(createdSignal.id).queryKey,
          createdSignal
        );
      }

      // Invalidate list queries
      const filters: SignalListFilters = {
        sortBy: 'createdAt',
        sortOrder: 'desc',
        folderIsNull: true,
      };
      queryClient.invalidateQueries({
        queryKey: queryKeys.signals.list(filters).queryKey,
      });
    },
  });
}
```

## Zustand State Management

### Store Architecture

- **Client state only** (no API data)
- **Explicit atomic selectors**
- **Separate actions from state**
- **No direct store exports**

```typescript
interface BearStore {
  bears: number;
  fish: number;
  actions: {
    increasePopulation: (by: number) => void;
    eatFish: () => void;
    removeAllBears: () => void;
  };
}

// ✅ Store not exported directly
const useBearStore = create<BearStore>()((set) => ({
  bears: 0,
  fish: 0,

  // ✅ Separate actions from state
  actions: {
    increasePopulation: (by) =>
      set((state) => ({ bears: state.bears + by })),
    eatFish: () => set((state) => ({ fish: state.fish - 1 })),
    removeAllBears: () => set({ bears: 0 }),
  },
}));

// ✅ Explicit atomic selectors
export const useBears = () => useBearStore((state) => state.bears);
export const useFish = () => useBearStore((state) => state.fish);
export const useBearActions = () => useBearStore((state) => state.actions);
```

## Next.js 15+ Patterns

### App Router Architecture

- **Server-first components** by default
- **Fetch data close to usage**
- **Proper layout hierarchy**
- **Route groups for organization**

### Environment Variables

Centralized validation with `src/env.ts`:

```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SITEMAP_URL: z.string().url(),
    API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_ENC_CODE: z.string(),
  },
  // Next.js 15+: Only destructure client variables
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_ENC_CODE: process.env.NEXT_PUBLIC_ENC_CODE,
  },
});
```

## Form Patterns

### React Hook Form with Zod

```typescript
// Schema definition
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
});

type UserSchema = z.infer<typeof userSchema>;

// Form component
const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};
```

## Error Handling Patterns

### Ground Truths

- **Fail early** with proper validation
- **Log verbosely** for unknown errors
- **Retry transient errors** on queries
- **Clear error messages** with actionable guidance
- **Invalidate queries** on mutation errors

### TanStack Query Error Handling

```typescript
// Global error handling
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      toast.error(`Something went wrong: ${error.message}`),
  }),
});

// Component-level error boundaries
function TodoList() {
  const todos = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    // Propagate server errors to Error Boundary
    throwOnError: (error) => error.response?.status >= 500,
  });

  if (todos.data) {
    return <div>{/* render todos */}</div>;
  }

  return 'Loading...';
}
```

## File Structure Patterns

### Organization by Feature

```
/lib/types/
  - folders.ts
  - signals.ts
  - index.ts

/lib/query-keys/
  - folders.ts
  - signals.ts
  - index.ts

/lib/query-hooks/
  - folders/
    - use-query.ts
    - use-mutation.ts
  - signals/
    - use-query.ts
    - use-mutation.ts

/components/
  - ui/           # Reusable components
  - dashboard/    # Feature-specific components
  - auth/         # Authentication components
```

### Component Reusability

- **UI components** in `/components/ui/` for maximum reusability
- **Feature components** in feature-specific directories
- **Use `cva` for variants** in reusable components
- **Extend with `className`** for unique styling

## Development Patterns

### Core Principles

- **For every endpoint**: type, service, query-key, custom hooks
- **Component decomposition**: Stack like Lego blocks
- **Pages as orchestrators**: Flat UI components over nested
- **Abstractions for current needs**: Not future speculation

### Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

### Branching Strategy

- `main` - Production branch (protected)
- `staging` - Staging environment
- `dev` - Development branch
- Feature branches: `PER-123` or `PER-123/description`

## Related Documentation

- [TypeScript Types](../types/README.md)
- [App Architecture](../app-architecture/README.md)
- [Component Documentation](../components/)
- [Service Documentation](../services/)
- [Query Hooks Documentation](../query-hooks/)
