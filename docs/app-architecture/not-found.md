# Not-Found Page Architecture Pattern

## Overview

This documentation covers the not-found page pattern for shared chat threads in our Next.js 15+ App Router application. This specific not-found page handles cases where a shared chat thread cannot be found or accessed.

## Route Structure

```
src/app/(dashboard)/(features)/(shareable-features)/chat/shared/[answerThreadId]/not-found.tsx
```

### Route Breakdown

- `(dashboard)` - Route group for dashboard layout
- `(features)` - Route group for feature organization
- `(shareable-features)` - Route group for features that can be shared publicly
- `chat/shared/[answerThreadId]` - Dynamic route for shared chat threads
- `not-found.tsx` - Special Next.js file for 404 handling

This route handles the URL pattern: `/chat/shared/{answerThreadId}` when the thread cannot be found.

## Purpose

This architectural pattern accomplishes several key objectives:

1. **Graceful Error Handling**: Provides a user-friendly experience when shared chat threads are not found
2. **User Feedback**: Immediately notifies users about the issue with contextual messaging
3. **Navigation Recovery**: Automatically redirects users to a safe location (home page)
4. **Security Awareness**: Handles cases where threads might be private or deleted

## Route Groups

### `(dashboard)`
- **Purpose**: Applies dashboard-specific layouts and middleware
- **Layout Effects**: Provides main navigation, sidebar, and authentication checks
- **URL Impact**: None (parentheses prevent URL segment creation)

### `(features)`
- **Purpose**: Groups all feature-related routes for organizational clarity
- **Layout Effects**: May include feature-specific providers or contexts
- **URL Impact**: None

### `(shareable-features)`
- **Purpose**: Distinguishes features that can be accessed publicly vs. private features
- **Layout Effects**: Likely includes different authentication handling for public access
- **URL Impact**: None

## Layout Hierarchy

The layout cascade for this route follows this hierarchy:

```
app/layout.tsx (Root Layout)
├── app/(dashboard)/layout.tsx (Dashboard Layout)
    ├── app/(dashboard)/(features)/layout.tsx (Features Layout)
        ├── app/(dashboard)/(features)/(shareable-features)/layout.tsx (Shareable Features Layout)
            └── not-found.tsx (Not Found Page)
```

Each layout provides:
- **Root Layout**: Global providers, fonts, metadata
- **Dashboard Layout**: Navigation, authentication context
- **Features Layout**: Feature-specific providers
- **Shareable Features Layout**: Public access handling, different auth patterns

## Data Flow

### Parameters Available
- `answerThreadId` - Dynamic route parameter (accessible in parent components)

### Data Flow Pattern
```typescript
// Parent page would receive:
// params: { answerThreadId: string }
// searchParams: Record<string, string | string[]>

// Not-found page receives no direct params but inherits context
```

### Trigger Conditions
This not-found page is triggered when:
- `notFound()` is called in a parent page/layout
- A route doesn't match any existing files
- Data fetching returns a 404 status

## Server vs Client Components

### Client Component Choice
This component is marked with `'use client'` because it:

1. **Uses Hooks**: Requires `useEffect` and `useToast` hooks
2. **Interactive Behavior**: Needs to show toast notifications
3. **Navigation Actions**: Performs client-side redirect after user feedback

### Alternative Server Component Approach
```tsx
// Alternative server component approach
import { redirect } from 'next/navigation'

export default function NotFoundPage() {
  // Server-side redirect (no user feedback)
  redirect('/')
}
```

### Architectural Decision
The client component approach is chosen to provide better UX through:
- Toast notifications for user feedback
- Controlled timing of redirect
- Opportunity for user to read the error message

## Loading States

### Current Pattern
This component doesn't implement loading states as it's designed for immediate feedback and redirect.

### Potential Enhancements
```tsx
'use client';

import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRedirecting(true);
      toast({ /* ... */ });
      redirect('/');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isRedirecting) {
    return <div>Redirecting...</div>;
  }

  return <div>Thread not found...</div>;
}
```

## Error Handling

### Current Implementation
- **Toast Notifications**: User-friendly error messaging
- **Automatic Recovery**: Redirects to safe location
- **Graceful Degradation**: Returns `null` to prevent UI breaks

### Error Boundary Integration
```tsx
// Parent error boundary would catch any errors in this component
// Located likely in dashboard or features layout

export function ChatErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error) => {
        // Log error, send to monitoring service
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Enhanced Error Handling
```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      toast({
        title: 'Thread not found',
        description: 'This chat thread might have been deleted or set to private.',
        variant: 'destructive',
        action: {
          label: 'Go Home',
          onClick: () => router.push('/')
        }
      });
    } catch (error) {
      // Fallback to immediate redirect if toast fails
      router.push('/');
    }
  }, [toast, router]);

  return null;
}
```

## Metadata

### Current Implementation
This component doesn't set metadata, inheriting from parent layouts.

### Recommended Metadata Pattern
```tsx
// In parent layout or page
export const metadata: Metadata = {
  title: 'Chat Thread Not Found',
  description: 'The requested chat thread could not be found.',
  robots: 'noindex, nofollow', // Prevent indexing of error pages
};
```

### Dynamic Metadata for Not-Found
```tsx
// In app/(dashboard)/(features)/(shareable-features)/chat/shared/[answerThreadId]/page.tsx
export async function generateMetadata({ params }: { params: { answerThreadId: string } }): Promise<Metadata> {
  const thread = await fetchThread(params.answerThreadId);
  
  if (!thread) {
    return {
      title: 'Chat Thread Not Found',
      description: 'The requested chat thread could not be found.',
      robots: 'noindex, nofollow',
    };
  }
  
  return {
    title: thread.title,
    description: thread.summary,
  };
}
```

## Security

### Current Security Considerations
1. **Information Disclosure**: Generic error message prevents leaking thread existence
2. **Auto-redirect**: Prevents users from staying on invalid URLs
3. **Public Access**: Handles both private and deleted threads uniformly

### Enhanced Security Pattern
```tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function NotFoundPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Different messages based on authentication state
    const message = user 
      ? 'This chat thread might have been deleted or set to private.'
      : 'This chat thread might not exist or require authentication.';
      
    toast({
      title: 'Thread not accessible',
      description: message,
      variant: 'destructive',
    });
    
    // Redirect to appropriate location
    const redirectPath = user ? '/dashboard' : '/';
    redirect(redirectPath);
  }, [user, toast]);

  return null;
}
```

### Rate Limiting Considerations
```tsx
// Implement rate limiting for not-found attempts
import { rateLimit } from '@/lib/rate-limit';

export default function NotFoundPage() {
  useEffect(() => {
    // Track not-found attempts to prevent enumeration attacks
    rateLimit.track('not-found-attempt');
  }, []);
}
```

## Performance

### Current Optimizations
1. **Lightweight Component**: Returns `null`, minimal DOM impact
2. **Client-side Redirect**: Fast navigation without server round-trip
3. **Immediate Feedback**: Toast shows instantly

### Performance Enhancements
```tsx
'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  
  const handleRedirect = useCallback(() => {
    // Prefetch home page for faster navigation
    router.prefetch('/');
    router.push('/');
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(handleRedirect, 2000);
    return () => clearTimeout(timer);
  }, [handleRedirect]);

  return null;
}
```

### Caching Considerations
```tsx
// In parent page component
export const dynamic = 'force-dynamic'; // Prevent caching of not-found states
export const revalidate = 0; // Ensure fresh data for thread existence checks
```

## Environment Variables

### Related Environment Variables
```typescript
// src/env.ts
export const env = {
  // Redirect configuration
  DEFAULT_REDIRECT_URL: process.env.DEFAULT_REDIRECT_URL ?? '/',
  
  // Error tracking
  ERROR_REPORTING_ENABLED: process.env.ERROR_REPORTING_ENABLED === 'true',
  
  // Rate limiting
  RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED === 'true',
  
  // Feature flags
  ENHANCED_ERROR_PAGES: process.env.ENHANCED_ERROR_PAGES === 'true',
} as const;
```

### Usage in Component
```tsx
'use client';

import { env } from '@/env';

export default function NotFoundPage() {
  useEffect(() => {
    if (env.ERROR_REPORTING_ENABLED) {
      // Report 404s for monitoring
      analytics.track('chat_thread_not_found');
    }
    
    redirect(env.DEFAULT_REDIRECT_URL);
  }, []);

  return null;
}
```

## Best Practices

1. **User Experience**: Always provide feedback before redirecting
2. **Security**: Use generic error messages to prevent information disclosure
3. **Performance**: Keep not-found pages lightweight
4. **Accessibility**: Ensure error messages are screen reader accessible
5. **Monitoring**: Track not-found occurrences for debugging
6. **Recovery**: Always provide a path back to working functionality

## Related Patterns

- **Global Not-Found**: `app/not-found.tsx` for site-wide 404s
- **Error Boundaries**: For handling component errors
- **Loading Pages**: `loading.tsx` for async operations
- **Route Handlers**: API routes for data fetching that might return 404s