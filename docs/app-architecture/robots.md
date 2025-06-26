# Robots Route Pattern Documentation

## Overview

The `robots.ts` file implements Next.js 15+ App Router's built-in SEO metadata API to generate a robots.txt file. This special route file automatically creates a `/robots.txt` endpoint that search engines can crawl to understand site indexing permissions.

## Route Structure

```
src/app/
├── robots.ts          # Generates /robots.txt endpoint
└── ...
```

**Generated Route**: `/robots.txt`
**Type**: Special Route File (Metadata API)
**Response**: `text/plain` robots.txt format

## Purpose

This architectural pattern serves several critical functions:

- **Search Engine Control**: Defines crawling permissions for web crawlers and bots
- **SEO Management**: Controls which pages search engines can index
- **Development Safety**: Currently configured to block all crawling (development/staging protection)
- **Compliance**: Provides standard robots.txt implementation following web standards
- **Performance**: Eliminates need for static robots.txt file management

## Route Groups

**Not Applicable**: Special route files like `robots.ts` exist at the app directory level and don't participate in route group organization. They generate their own specific endpoints regardless of folder structure.

## Layout Hierarchy

**Not Applicable**: Robots.txt generation bypasses the normal layout hierarchy since it returns plain text, not HTML. The response is generated directly by Next.js without rendering React components.

## Data Flow

```typescript
Request: GET /robots.txt
    ↓
robots() function execution
    ↓
MetadataRoute.Robots object
    ↓
Next.js serialization to text/plain
    ↓
Response: robots.txt content
```

**Input Parameters**: None (no params or searchParams)
**Output**: Plain text robots.txt file
**Processing**: Server-side generation only

## Server vs Client Components

**Server-Only Pattern**: 
- Special route files always execute on the server
- No client-side JavaScript involved
- Function runs during request time on the server
- No hydration or client-side rendering

**Why Server-Only**:
- Robots.txt must be served as static content
- Search engines expect consistent, cacheable responses
- No interactivity required

## Loading States

**Not Applicable**: Special route files don't support loading UI patterns since they don't render React components. The response is immediate plain text generation.

**Performance Considerations**:
- Response is lightweight (minimal text content)
- Can be cached by CDN/edge networks
- No streaming required due to small payload size

## Error Handling

```typescript
// Error handling is implicit through Next.js
export default function robots(): MetadataRoute.Robots {
  try {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  } catch (error) {
    // Next.js handles errors automatically
    // Falls back to default behavior
  }
}
```

**Error Patterns**:
- **Runtime Errors**: Next.js automatically handles function errors
- **Type Safety**: TypeScript ensures `MetadataRoute.Robots` compliance
- **Fallback**: If function fails, Next.js may serve empty/default robots.txt

## Metadata

**Self-Contained Metadata**: The robots.ts file IS the metadata - it doesn't generate page metadata but rather serves as site-wide crawling instructions.

**SEO Impact**:
- Currently blocks all search engine indexing (`disallow: '/'`)
- Affects entire site crawling behavior
- Critical for development/staging environment protection

## Security

**Current Configuration**:
```typescript
rules: {
  userAgent: '*',     // Applies to all bots
  disallow: '/',      // Blocks entire site
}
```

**Security Benefits**:
- **Development Protection**: Prevents accidental indexing of dev/staging sites
- **Content Protection**: Blocks unauthorized crawling
- **Privacy**: Keeps site content private from search engines

**Production Considerations**:
```typescript
// Example production configuration
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    rules: {
      userAgent: '*',
      disallow: isProduction ? ['/admin/', '/api/'] : '/',
      allow: isProduction ? '/' : undefined,
    },
    sitemap: isProduction ? 'https://example.com/sitemap.xml' : undefined,
  };
}
```

## Performance

**Optimization Strategies**:

1. **Edge Caching**: Robots.txt is highly cacheable
2. **Minimal Processing**: Simple object return with no complex logic
3. **No Database Calls**: Static configuration reduces response time
4. **CDN Friendly**: Can be cached at edge locations globally

**Caching Headers**: Next.js automatically applies appropriate caching headers for robots.txt responses.

## Environment Variables

**Current Implementation**: No environment variables used, but recommended pattern:

```typescript
// Enhanced implementation with environment awareness
import { env } from '@/env';

export default function robots(): MetadataRoute.Robots {
  const allowCrawling = env.ALLOW_SEARCH_INDEXING === 'true';
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  
  return {
    rules: {
      userAgent: '*',
      disallow: allowCrawling ? ['/admin/', '/api/'] : '/',
      allow: allowCrawling ? '/' : undefined,
    },
    sitemap: allowCrawling ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
```

**Recommended Environment Variables**:
- `ALLOW_SEARCH_INDEXING`: Boolean flag for indexing permission
- `NEXT_PUBLIC_SITE_URL`: Base URL for sitemap references
- `NODE_ENV`: Environment detection for behavior switching

## Advanced Configuration

**Multiple Rules Pattern**:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/admin/',
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: '*',
        disallow: '/',
      }
    ],
    sitemap: 'https://example.com/sitemap.xml',
    host: 'https://example.com',
  };
}
```

**Dynamic Configuration**:
```typescript
export default async function robots(): Promise<MetadataRoute.Robots> {
  // Can be async for dynamic rules
  const settings = await fetchRobotsSettings();
  
  return {
    rules: settings.rules,
    sitemap: settings.sitemapUrl,
  };
}
```

This pattern provides a robust, type-safe approach to robots.txt generation that integrates seamlessly with Next.js 15+ App Router architecture while maintaining security and performance best practices.