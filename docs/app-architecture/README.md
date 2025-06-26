# App Architecture

This directory contains documentation for Next.js 15+ App Router architecture patterns used throughout the Perigon application. These patterns leverage the latest Next.js features for optimal performance, developer experience, and maintainability.

## Overview

Our Next.js 15+ architecture follows these core principles:

- **Server-First Components**: Components are server-rendered by default
- **App Router**: Utilizes the stable App Router with route groups and layouts
- **Colocation**: Data fetching close to where it's consumed
- **Route Groups**: Logical organization without affecting URL structure
- **Streaming**: Progressive rendering with loading states
- **Parallel Routes**: Multiple page sections loading independently

## Next.js 15+ Features

### App Router Stability

Next.js 15+ brings full stability to the App Router with:

- **Improved Performance**: Better tree-shaking and bundle optimization
- **Enhanced Streaming**: More granular loading states
- **Better Error Handling**: Improved error boundaries and recovery
- **TypeScript Integration**: Better type inference for routes and layouts

### Server Components by Default

All components are Server Components unless explicitly marked with `'use client'`:

```typescript
// ✅ Server Component (default)
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}

// ✅ Client Component (explicit)
'use client';
function ClientComponent() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

## Route Organization Patterns

### File-Based Routing

Our routing follows Next.js 15+ conventions with kebab-case naming:

```
app/
├── page.tsx                    # / (root)
├── layout.tsx                  # Root layout
├── loading.tsx                 # Root loading UI
├── error.tsx                   # Root error boundary
├── dashboard/
│   ├── page.tsx               # /dashboard
│   ├── layout.tsx             # Dashboard layout
│   ├── loading.tsx            # Dashboard loading
│   └── billing/
│       └── page.tsx           # /dashboard/billing
└── (auth)/                    # Route group (no URL segment)
    ├── layout.tsx             # Auth layout
    ├── sign-in/
    │   └── page.tsx           # /sign-in
    └── sign-up/
        └── page.tsx           # /sign-up
```

### Route Groups

Route groups organize routes without affecting the URL structure:

```typescript
// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
}

// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
```

## Data Fetching Patterns

### Server-Side Data Fetching

Fetch data directly in Server Components:

```typescript
// app/dashboard/signals/page.tsx
async function SignalsPage() {
  // Direct async/await in Server Components
  const signals = await fetch('/api/signals', {
    next: { revalidate: 60 }, // ISR with 60s revalidation
  }).then(res => res.json());

  return (
    <div>
      <h1>Signals</h1>
      <SignalsList signals={signals} />
    </div>
  );
}
```

### Client-Side Data Fetching

Use TanStack Query for client-side data fetching:

```typescript
// components/signals/signals-list.tsx
'use client';

import { useSignalsList } from '@/lib/query-hooks/signals';

export function SignalsList() {
  const { data: signals, isLoading, error } = useSignalsList(
    { sortBy: 'createdAt', sortOrder: 'desc' },
    true // enabled
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {signals?.data.map(signal => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
    </div>
  );
}
```

## Layout Hierarchy

### Root Layout

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';
import { AppProviders } from '@/components/app-providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
```

### Feature Layouts

```typescript
// app/(dashboard)/layout.tsx
import { Navigation } from '@/components/main-layout/navigation';
import { TabsManager } from '@/components/main-layout/tabs-manager';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-pgBackground-0">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <TabsManager />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## Loading and Error States

### Loading UI

```typescript
// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pgBlue-500"></div>
    </div>
  );
}
```

### Error Boundaries

```typescript
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

## Environment Variables

### Centralized Validation

```typescript
// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ANTHROPIC_API_KEY: z.string(),
    NEXTAUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
  },
  // Next.js 15+: Only destructure client variables
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
});
```

### Usage in Components

```typescript
import { env } from '@/env';

// ✅ Server Component
async function ServerComponent() {
  const apiKey = env.ANTHROPIC_API_KEY; // Server-only variable
  // ...
}

// ✅ Client Component
'use client';
function ClientComponent() {
  const apiUrl = env.NEXT_PUBLIC_API_BASE_URL; // Client-safe variable
  // ...
}
```

## Metadata and SEO

### Static Metadata

```typescript
// app/dashboard/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Perigon',
  description: 'Your personalized news dashboard',
};

export default function DashboardPage() {
  return <div>Dashboard content</div>;
}
```

### Dynamic Metadata

```typescript
// app/story/[id]/page.tsx
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await fetch(`/api/stories/${params.id}`).then(res => res.json());

  return {
    title: story.title,
    description: story.summary,
    openGraph: {
      title: story.title,
      description: story.summary,
      images: [story.imageUrl],
    },
  };
}

export default function StoryPage({ params }: Props) {
  // ...
}
```

## Streaming and Suspense

### Progressive Loading

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { SignalsList } from '@/components/signals/signals-list';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Suspense fallback={<SignalsListSkeleton />}>
        <SignalsList />
      </Suspense>

      <Suspense fallback={<RecentActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}
```

## Parallel Routes

### Multiple Page Sections

```typescript
// app/dashboard/@analytics/page.tsx
export default function AnalyticsSlot() {
  return <AnalyticsDashboard />;
}

// app/dashboard/@feed/page.tsx
export default function FeedSlot() {
  return <NewsFeed />;
}

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  feed,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  feed: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">{children}</div>
      <div>{analytics}</div>
      <div className="col-span-3">{feed}</div>
    </div>
  );
}
```

## Authentication Patterns

### Route Protection

```typescript
// app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}
```

### Middleware Protection

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

## Performance Optimization

### Bundle Optimization

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Client-side only if needed
});
```

### Image Optimization

```typescript
import Image from 'next/image';

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      priority // For above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Best Practices

### Component Organization

- **Server Components**: Default choice for data fetching and rendering
- **Client Components**: Only when interactivity is needed
- **Colocation**: Keep components close to where they're used
- **Composition**: Prefer composition over inheritance

### Data Fetching Strategy

- **Server Components**: For initial data loading
- **Client Components**: For interactive data (TanStack Query)
- **Streaming**: For progressive loading experiences
- **Caching**: Leverage Next.js caching strategies

### Error Handling

- **Error Boundaries**: At route level for graceful degradation
- **Loading States**: Provide feedback during data fetching
- **Fallbacks**: Always have fallback UI for errors

## Related Documentation

- [Coding Patterns](../coding-patterns/README.md)
- [TypeScript Types](../types/README.md)
- [Component Documentation](../components/)
- [Service Documentation](../services/)
- [Query Hooks Documentation](../query-hooks/)
