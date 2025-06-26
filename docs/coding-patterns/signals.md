# Metadata Configuration Pattern

## Pattern Overview

This pattern implements a structured approach to managing page-specific metadata in Next.js applications. It creates composable, reusable metadata objects that integrate with Next.js's built-in metadata API, enabling consistent SEO optimization across different pages while maintaining DRY principles.

### When to Use This Pattern

- **Next.js applications** requiring consistent metadata across multiple pages
- **SEO-critical applications** where metadata management is essential
- **Multi-page applications** with varying metadata requirements
- **Enterprise applications** requiring centralized metadata configuration

## Architecture

```
src/lib/metadata/
├── base/
│   ├── og.ts          # Base OpenGraph configuration
│   └── twitter.ts     # Base Twitter Card configuration
├── signals.ts         # Page-specific metadata (example)
├── dashboard.ts       # Additional page metadata
└── index.ts          # Metadata exports
```

### Core Components

1. **Base Configurations**: Shared metadata templates
2. **Page-Specific Configurations**: Extended metadata for individual pages
3. **Environment Integration**: Dynamic values from environment variables
4. **Export Structure**: Structured exports for easy consumption

## Implementation Details

### Base Configuration Pattern

```tsx
// src/lib/metadata/base/og.ts
export default {
  type: 'website',
  locale: 'en_US',
  siteName: process.env.NEXT_PUBLIC_COMPANY_NAME,
  images: [{
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
    width: 1200,
    height: 630,
    alt: 'Default OG Image',
  }],
};

// src/lib/metadata/base/twitter.ts
export default {
  card: 'summary_large_image',
  site: '@yourcompany',
  creator: '@yourcompany',
};
```

### Page-Specific Implementation

```tsx
// src/lib/metadata/signals.ts
import { env } from '@/env';
import og from './base/og';
import twitter from './base/twitter';

const description = 'Monitor the web in real time with AI...';

const metadata = {
  title: `Signals | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
  description,
  robots: {
    index: false,
    follow: false,
  },
  twitter: {
    ...twitter,
    title: `Signals | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
    description,
  },
  openGraph: {
    ...og,
    title: `Signals | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
    description,
    url: `${env.NEXT_PUBLIC_BASE_URL}/signals`,
  },
};

export { description, metadata as default };
```

### Environment Configuration

```tsx
// src/env.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_COMPANY_NAME: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
```

## Usage Examples

### Next.js App Router Integration

```tsx
// app/signals/page.tsx
import { Metadata } from 'next';
import signalsMetadata from '@/lib/metadata/signals';

export const metadata: Metadata = signalsMetadata;

export default function SignalsPage() {
  return <div>Signals Dashboard</div>;
}
```

### Dynamic Metadata Generation

```tsx
// src/lib/metadata/product.ts
import { env } from '@/env';
import og from './base/og';
import twitter from './base/twitter';

export function generateProductMetadata(product: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    title: `${product.name} | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
    description: product.description,
    openGraph: {
      ...og,
      title: product.name,
      description: product.description,
      url: `${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
    },
    twitter: {
      ...twitter,
      title: product.name,
      description: product.description,
    },
  };
}
```

### Usage in Dynamic Routes

```tsx
// app/products/[slug]/page.tsx
import { Metadata } from 'next';
import { generateProductMetadata } from '@/lib/metadata/product';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return generateProductMetadata(product);
}
```

## Best Practices

### 1. Consistent Structure

```tsx
// Template for all metadata files
const description = 'Page-specific description';

const metadata = {
  title: `Page Name | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
  description,
  // Always include robots directive
  robots: { index: true, follow: true },
  // Consistent social media metadata
  twitter: { ...twitter, title: '...', description },
  openGraph: { ...og, title: '...', description, url: '...' },
};
```

### 2. Environment Variable Usage

```tsx
// Always use environment variables for dynamic values
const metadata = {
  title: `${pageTitle} | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
  openGraph: {
    url: `${env.NEXT_PUBLIC_BASE_URL}${pathname}`,
    siteName: env.NEXT_PUBLIC_COMPANY_NAME,
  },
};
```

### 3. Description Reusability

```tsx
// Export descriptions for reuse in components
export const description = 'Reusable description text';
export default {
  description,
  // ... other metadata
};
```

### 4. Type-Safe Metadata

```tsx
// Define metadata types
interface PageMetadata {
  title: string;
  description: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

const createMetadata = (config: PageMetadata): Metadata => ({
  ...config,
  openGraph: { ...og, ...config },
  twitter: { ...twitter, ...config },
});
```

## Integration

### With Next.js Metadata API

```tsx
// app/layout.tsx
import { Metadata } from 'next';
import defaultMetadata from '@/lib/metadata/default';

export const metadata: Metadata = defaultMetadata;
```

### With SEO Components

```tsx
// components/SEOHead.tsx
import { description } from '@/lib/metadata/signals';

export function SEOHead() {
  return (
    <section>
      <h1>Signals</h1>
      <p>{description}</p>
    </section>
  );
}
```

### With CMS Integration

```tsx
// lib/metadata/cms.ts
export function createCMSMetadata(page: CMSPage) {
  return {
    title: `${page.title} | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
    description: page.seoDescription || page.excerpt,
    openGraph: {
      ...og,
      title: page.title,
      description: page.seoDescription,
      images: page.featuredImage ? [page.featuredImage] : og.images,
    },
  };
}
```

## Type Safety

### Metadata Type Definitions

```tsx
// types/metadata.ts
import { Metadata } from 'next';

export interface ExtendedMetadata extends Metadata {
  customField?: string;
}

export interface BaseMetadataConfig {
  title: string;
  description: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}
```

### Environment Type Safety

```tsx
// Ensure environment variables are properly typed
const metadata = {
  title: `${title} | ${env.NEXT_PUBLIC_COMPANY_NAME}`, // TypeScript ensures this exists
  openGraph: {
    url: `${env.NEXT_PUBLIC_BASE_URL}/path`, // Type-safe URL construction
  },
};
```

### Generic Metadata Factory

```tsx
// lib/metadata/factory.ts
export function createPageMetadata<T extends BaseMetadataConfig>(
  config: T
): Metadata {
  return {
    title: config.title,
    description: config.description,
    robots: config.robots || { index: true, follow: true },
    openGraph: {
      ...og,
      title: config.title,
      description: config.description,
    },
  };
}
```

## Performance

### 1. Static Generation

```tsx
// Metadata is generated at build time for static pages
export const metadata: Metadata = signalsMetadata; // Static
```

### 2. Lazy Loading for Dynamic Content

```tsx
// Only load metadata when needed
export async function generateMetadata({ params }) {
  // This runs only when the page is requested
  const data = await fetchData(params.id);
  return generateProductMetadata(data);
}
```

### 3. Caching Strategies

```tsx
// Cache metadata for dynamic pages
const metadataCache = new Map();

export function getCachedMetadata(key: string, generator: () => Metadata) {
  if (!metadataCache.has(key)) {
    metadataCache.set(key, generator());
  }
  return metadataCache.get(key);
}
```

## Testing

### Unit Testing Metadata

```tsx
// __tests__/metadata/signals.test.ts
import { describe, it, expect } from 'vitest';
import signalsMetadata, { description } from '@/lib/metadata/signals';

describe('Signals Metadata', () => {
  it('should have correct title format', () => {
    expect(signalsMetadata.title).toMatch(/Signals \| .+/);
  });

  it('should export description', () => {
    expect(description).toBeDefined();
    expect(typeof description).toBe('string');
  });

  it('should have proper OpenGraph configuration', () => {
    expect(signalsMetadata.openGraph).toMatchObject({
      title: expect.stringContaining('Signals'),
      description: expect.stringContaining('Monitor'),
      url: expect.stringContaining('/signals'),
    });
  });
});
```

### Integration Testing

```tsx
// __tests__/pages/signals.test.tsx
import { render } from '@testing-library/react';
import { metadata } from '@/app/signals/page';

describe('Signals Page', () => {
  it('should have correct metadata', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
  });
});
```

### E2E Testing with Playwright

```tsx
// e2e/metadata.spec.ts
import { test, expect } from '@playwright/test';

test('signals page has correct metadata', async ({ page }) => {
  await page.goto('/signals');
  
  await expect(page).toHaveTitle(/Signals \|/);
  
  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', /Monitor the web/);
});
```

## Common Pitfalls

### 1. **Environment Variable Leakage**

```tsx
// ❌ Avoid server-side environment variables in client metadata
const metadata = {
  title: `Page | ${process.env.SECRET_KEY}`, // Wrong!
};

// ✅ Use only public environment variables
const metadata = {
  title: `Page | ${env.NEXT_PUBLIC_COMPANY_NAME}`, // Correct!
};
```

### 2. **Missing URL Encoding**

```tsx
// ❌ Unencoded special characters
const metadata = {
  openGraph: {
    url: `${baseUrl}/page with spaces`, // Wrong!
  },
};

// ✅ Proper URL construction
const metadata = {
  openGraph: {
    url: `${baseUrl}/${encodeURIComponent(slug)}`, // Correct!
  },
};
```

### 3. **Inconsistent Base Inheritance**

```tsx
// ❌ Not spreading base configurations
const metadata = {
  openGraph: {
    title: 'Page Title', // Missing base OG properties
  },
};

// ✅ Always spread base configurations
const metadata = {
  openGraph: {
    ...og, // Include base properties
    title: 'Page Title',
  },
};
```

### 4. **Hardcoded Values**

```tsx
// ❌ Hardcoded company name
const metadata = {
  title: 'Signals | MyCompany',
};

// ✅ Use environment variables
const metadata = {
  title: `Signals | ${env.NEXT_PUBLIC_COMPANY_NAME}`,
};
```

### 5. **Missing Robot Directives**

```tsx
// ❌ No robot configuration
const metadata = {
  title: 'Private Page',
  description: 'Internal tool',
};

// ✅ Explicit robot directives
const metadata = {
  title: 'Private Page',
  description: 'Internal tool',
  robots: {
    index: false,
    follow: false,
  },
};
```

This pattern provides a scalable, maintainable approach to metadata management in Next.js applications while ensuring consistency, type safety, and optimal SEO performance.