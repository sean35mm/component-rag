# NextJS Page Props Type Definition

## Purpose

The `NextJsPageProps` interface defines the standardized structure for Next.js page component props in the App Router architecture. This type ensures type safety for route parameters and search parameters that are passed to page components, following Next.js 13+ conventions where these props are provided as Promises.

## Type Definition

```typescript
export type NextJsParams = Record<string, string>;
export type NextJsSearchParams = Record<string, string | string[] | undefined>;

export interface NextJsPageProps<
  TParams = NextJsParams,
  TSearchParams = NextJsSearchParams,
> {
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
}
```

### Structure Breakdown

- **`NextJsParams`**: Type alias for route parameters (dynamic segments)
- **`NextJsSearchParams`**: Type alias for URL search parameters (query strings)
- **`NextJsPageProps`**: Generic interface for page component props with customizable parameter types

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `params` | `Promise<TParams>` | ✅ | Dynamic route parameters from URL segments (e.g., `/users/[id]`) |
| `searchParams` | `Promise<TSearchParams>` | ✅ | URL search parameters (query string parameters) |

### Parameter Types

| Type | Structure | Description | Example |
|------|-----------|-------------|---------|
| `NextJsParams` | `Record<string, string>` | Route parameters are always strings | `{ id: "123", slug: "hello-world" }` |
| `NextJsSearchParams` | `Record<string, string \| string[] \| undefined>` | Search params can be single values, arrays, or undefined | `{ q: "search", tags: ["react", "nextjs"], page: undefined }` |

## Usage Examples

### Basic Page Component

```typescript
import { NextJsPageProps } from '@/lib/types/next-js-page-props';

// Basic usage with default parameter types
export default async function UserPage({ params, searchParams }: NextJsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  console.log('Route params:', resolvedParams); // { id: "123" }
  console.log('Search params:', resolvedSearchParams); // { tab: "profile" }
  
  return <div>User ID: {resolvedParams.id}</div>;
}
```

### Strongly Typed Page with Custom Parameters

```typescript
import { NextJsPageProps } from '@/lib/types/next-js-page-props';

// Define domain-specific parameter interfaces
interface UserPageParams {
  id: string;
  section: string;
}

interface UserPageSearchParams {
  tab?: string;
  filter?: string[];
  page?: string;
}

// Use generic type parameters for strict typing
type UserPageProps = NextJsPageProps<UserPageParams, UserPageSearchParams>;

export default async function UserDetailPage({ params, searchParams }: UserPageProps) {
  const { id, section } = await params;
  const { tab, filter, page } = await searchParams;
  
  // TypeScript knows the exact shape of these parameters
  return (
    <div>
      <h1>User {id} - Section: {section}</h1>
      {tab && <p>Active tab: {tab}</p>}
      {filter && <p>Filters: {filter.join(', ')}</p>}
    </div>
  );
}
```

### With Parameter Validation

```typescript
import { NextJsPageProps } from '@/lib/types/next-js-page-props';
import { z } from 'zod';

// Define validation schemas
const ParamsSchema = z.object({
  productId: z.string().uuid(),
  categoryId: z.string().min(1),
});

const SearchParamsSchema = z.object({
  variant: z.string().optional(),
  size: z.array(z.string()).optional(),
  inStock: z.string().transform(val => val === 'true').optional(),
});

type ProductPageParams = z.infer<typeof ParamsSchema>;
type ProductPageSearchParams = z.infer<typeof SearchParamsSchema>;

export default async function ProductPage({ 
  params, 
  searchParams 
}: NextJsPageProps<ProductPageParams, ProductPageSearchParams>) {
  // Validate parameters at runtime
  const validatedParams = ParamsSchema.parse(await params);
  const validatedSearchParams = SearchParamsSchema.parse(await searchParams);
  
  return (
    <div>
      <h1>Product: {validatedParams.productId}</h1>
      <p>Category: {validatedParams.categoryId}</p>
      {validatedSearchParams.variant && (
        <p>Variant: {validatedSearchParams.variant}</p>
      )}
    </div>
  );
}
```

## Type Architecture Pattern

This type follows our **Foundation → Domain → Application** pattern:

```typescript
// 1. Foundation Types (this file)
export type NextJsParams = Record<string, string>;
export type NextJsSearchParams = Record<string, string | string[] | undefined>;
export interface NextJsPageProps<TParams, TSearchParams> { /* ... */ }

// 2. Domain-Specific Parameter Types
interface UserParams {
  userId: string;
}

interface ProductParams {
  productId: string;
  categorySlug: string;
}

// 3. Application-Specific Page Props
type UserPageProps = NextJsPageProps<UserParams, UserSearchParams>;
type ProductPageProps = NextJsPageProps<ProductParams, ProductSearchParams>;
```

## Related Types

### Extension Types

```typescript
// Enhanced page props with additional metadata
interface EnhancedPageProps<TParams = NextJsParams, TSearchParams = NextJsSearchParams> 
  extends NextJsPageProps<TParams, TSearchParams> {
  metadata?: {
    title: string;
    description: string;
  };
}

// Layout props that might receive similar parameters
interface LayoutProps<TParams = NextJsParams> {
  params: Promise<TParams>;
  children: React.ReactNode;
}
```

### Utility Types

```typescript
// Extract parameter types from page props
type ExtractParams<T> = T extends NextJsPageProps<infer P, any> ? P : never;
type ExtractSearchParams<T> = T extends NextJsPageProps<any, infer S> ? S : never;

// Create page props from existing parameter types
type CreatePageProps<TParams, TSearchParams> = NextJsPageProps<TParams, TSearchParams>;
```

## Integration Points

### Page Components
```typescript
// app/users/[id]/page.tsx
export default function UserPage(props: NextJsPageProps) { /* ... */ }

// app/products/[category]/[id]/page.tsx  
export default function ProductPage(props: NextJsPageProps<ProductParams>) { /* ... */ }
```

### Middleware Integration
```typescript
// middleware.ts - Type-safe parameter handling
import { NextRequest } from 'next/server';
import { NextJsParams } from '@/lib/types/next-js-page-props';

export function middleware(request: NextRequest) {
  const params: NextJsParams = {
    id: request.nextUrl.pathname.split('/')[2]
  };
  // Handle typed parameters
}
```

### API Route Handlers
```typescript
// app/api/users/[id]/route.ts
interface ApiParams {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<ApiParams> }
) {
  const { id } = await params;
  // Handle API with typed parameters
}
```

## Validation

### Zod Schema Patterns

```typescript
import { z } from 'zod';

// Base parameter validation
export const BaseParamsSchema = z.record(z.string());
export const BaseSearchParamsSchema = z.record(
  z.union([z.string(), z.array(z.string()), z.undefined()])
);

// Domain-specific validation
export const UserParamsSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
});

export const PaginationSearchParamsSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(Number).pipe(z.number().max(100)).optional(),
  sort: z.enum(['asc', 'desc']).optional(),
});

// Validation helper
export async function validatePageProps<TParams, TSearchParams>(
  props: NextJsPageProps,
  paramsSchema: z.ZodSchema<TParams>,
  searchParamsSchema: z.ZodSchema<TSearchParams>
) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ]);
  
  return {
    params: paramsSchema.parse(params),
    searchParams: searchParamsSchema.parse(searchParams)
  };
}
```

## Best Practices

### 1. **Strict Typing Adherence**
```typescript
// ✅ Good: Use specific parameter interfaces
interface BlogPostParams {
  slug: string;
  category: string;
}

// ❌ Avoid: Using any or overly generic types
type BlogPostParams = any;
```

### 2. **Promise Handling**
```typescript
// ✅ Good: Always await params and searchParams
export default async function Page({ params, searchParams }: NextJsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  // Use resolved values
}

// ❌ Avoid: Forgetting to await
export default function Page({ params, searchParams }: NextJsPageProps) {
  console.log(params.id); // Error: params is a Promise
}
```

### 3. **Generic Type Usage**
```typescript
// ✅ Good: Provide specific type parameters
type UserPageProps = NextJsPageProps<
  { userId: string },
  { tab?: string; edit?: string }
>;

// ✅ Also good: Use default types when parameters are simple
function handleGenericPage(props: NextJsPageProps) {
  // Uses NextJsParams and NextJsSearchParams defaults
}
```

### 4. **Validation Integration**
```typescript
// ✅ Good: Combine TypeScript types with runtime validation
const ParamsSchema = z.object({
  id: z.string().uuid(),
});

type ValidatedParams = z.infer<typeof ParamsSchema>;
type PageProps = NextJsPageProps<ValidatedParams>;

export default async function Page({ params }: PageProps) {
  const validatedParams = ParamsSchema.parse(await params);
  // Both compile-time and runtime safety
}
```

### 5. **Error Handling**
```typescript
// ✅ Good: Handle parameter validation errors gracefully
export default async function Page({ params, searchParams }: NextJsPageProps) {
  try {
    const [resolvedParams, resolvedSearchParams] = await Promise.all([
      params,
      searchParams
    ]);
    
    // Validate and use parameters
  } catch (error) {
    // Handle invalid parameters
    return <ErrorPage message="Invalid page parameters" />;
  }
}
```

This type definition serves as the foundation for type-safe Next.js page development, ensuring consistent parameter handling across the application while maintaining flexibility for domain-specific requirements.