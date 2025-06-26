# Global Metadata Configuration Pattern

## Pattern Overview

The **Global Metadata Configuration Pattern** is a centralized approach to managing application-wide metadata such as SEO tags, favicon configurations, and browser-specific settings. This pattern encapsulates all metadata in a single, reusable configuration object that can be consumed by various parts of the application.

### When to Use This Pattern

- **Next.js Applications**: When building Next.js apps that require consistent metadata across pages
- **SEO Optimization**: When implementing comprehensive SEO strategies with complex favicon and metadata requirements
- **Progressive Web Apps**: When configuring PWA-specific metadata like web app manifests
- **Brand Consistency**: When ensuring consistent branding across all browser touchpoints

## Architecture

```
src/lib/metadata/
├── global.ts          # Global metadata configuration
├── pages/             # Page-specific metadata (optional)
│   ├── home.ts
│   └── about.ts
└── types.ts           # TypeScript definitions
```

### Structure Components

1. **Configuration Object**: Centralized metadata structure
2. **Icon Management**: Comprehensive favicon and touch icon definitions
3. **SEO Controls**: Robot directives and search engine preferences
4. **Browser Integration**: Platform-specific configurations (iOS, Android, Windows)

## Implementation Details

### Core Configuration Structure

```typescript
// src/lib/metadata/types.ts
export interface GlobalMetadata {
  title: string;
  description: string;
  icons: {
    apple: AppleIconConfig;
    icon: IconConfig[];
    other: SafariIconConfig;
  };
  manifest: string;
  other: Record<string, string>;
  robots: RobotsConfig;
}

interface AppleIconConfig {
  sizes: string;
  url: string;
}

interface IconConfig {
  sizes: string;
  type: string;
  url: string;
}

interface SafariIconConfig {
  color: string;
  rel: string;
  url: string;
}

interface RobotsConfig {
  index: boolean;
  follow: boolean;
  noarchive: boolean;
}
```

### Enhanced Implementation

```typescript
// src/lib/metadata/global.ts
import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://perigon.com';

export const globalMetadata: Metadata = {
  title: {
    default: 'Perigon | Know More, Faster',
    template: '%s | Perigon'
  },
  description: 'Perigon delivers AI-powered context in real time, distilling global data, news, and trends into actionable answers and automated signals.',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Perigon',
    title: 'Perigon | Know More, Faster',
    description: 'AI-powered context in real time',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Perigon - Know More, Faster'
      }
    ]
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@perigon',
    creator: '@perigon',
    title: 'Perigon | Know More, Faster',
    description: 'AI-powered context in real time',
    images: [`${baseUrl}/twitter-image.png`]
  },

  // Icons
  icons: {
    apple: [
      { sizes: '180x180', url: '/apple-touch-icon.png' }
    ],
    icon: [
      { sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' },
      { sizes: '32x32', type: 'image/png', url: '/favicon-32x32.png' },
      { sizes: '192x192', type: 'image/png', url: '/android-chrome-192x192.png' },
      { sizes: '512x512', type: 'image/png', url: '/android-chrome-512x512.png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#f6b627'
      }
    ]
  },

  // PWA Manifest
  manifest: '/site.webmanifest',

  // Browser-specific
  other: {
    'msapplication-TileColor': '#ffc40d',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#ffffff'
  },

  // SEO Robots
  robots: {
    index: process.env.NODE_ENV === 'production',
    follow: process.env.NODE_ENV === 'production',
    noarchive: true,
    nocache: process.env.NODE_ENV !== 'production'
  },

  // Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION
  }
};

export default globalMetadata;
```

## Usage Examples

### Next.js App Router Implementation

```typescript
// app/layout.tsx
import { Metadata } from 'next';
import globalMetadata from '@/lib/metadata/global';

export const metadata: Metadata = globalMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Page-Specific Metadata Extension

```typescript
// app/about/page.tsx
import { Metadata } from 'next';
import globalMetadata from '@/lib/metadata/global';

export const metadata: Metadata = {
  ...globalMetadata,
  title: 'About Us | Perigon',
  description: 'Learn more about Perigon\'s mission to deliver AI-powered insights.',
  openGraph: {
    ...globalMetadata.openGraph,
    title: 'About Us | Perigon',
    url: 'https://perigon.com/about'
  }
};

export default function AboutPage() {
  return <div>About content</div>;
}
```

### Dynamic Metadata Generation

```typescript
// lib/metadata/utils.ts
import { Metadata } from 'next';
import globalMetadata from './global';

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  additionalMeta?: Partial<Metadata>
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://perigon.com';
  const fullUrl = `${baseUrl}${path}`;

  return {
    ...globalMetadata,
    title,
    description,
    openGraph: {
      ...globalMetadata.openGraph,
      title,
      description,
      url: fullUrl
    },
    twitter: {
      ...globalMetadata.twitter,
      title,
      description
    },
    alternates: {
      canonical: fullUrl
    },
    ...additionalMeta
  };
}

// Usage in page
export const metadata = generatePageMetadata(
  'Product Features',
  'Discover Perigon\'s powerful AI features',
  '/features'
);
```

## Best Practices

### 1. Environment-Based Configuration

```typescript
// lib/metadata/config.ts
const metadataConfig = {
  production: {
    robots: { index: true, follow: true },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      bing: process.env.BING_SITE_VERIFICATION
    }
  },
  development: {
    robots: { index: false, follow: false, noarchive: true },
    verification: {}
  }
};

export const getEnvironmentMetadata = () => {
  const env = process.env.NODE_ENV as keyof typeof metadataConfig;
  return metadataConfig[env] || metadataConfig.development;
};
```

### 2. Icon Size Validation

```typescript
// lib/metadata/validators.ts
export const validateIconSizes = (icons: IconConfig[]) => {
  const requiredSizes = ['16x16', '32x32', '180x180', '192x192', '512x512'];
  const providedSizes = icons.map(icon => icon.sizes);
  
  const missingSizes = requiredSizes.filter(size => 
    !providedSizes.includes(size)
  );
  
  if (missingSizes.length > 0) {
    console.warn(`Missing icon sizes: ${missingSizes.join(', ')}`);
  }
};
```

### 3. Metadata Merging Utility

```typescript
// lib/metadata/merge.ts
import { Metadata } from 'next';

export function mergeMetadata(
  base: Metadata,
  override: Partial<Metadata>
): Metadata {
  return {
    ...base,
    ...override,
    openGraph: {
      ...base.openGraph,
      ...override.openGraph
    },
    twitter: {
      ...base.twitter,
      ...override.twitter
    },
    icons: {
      ...base.icons,
      ...override.icons
    }
  };
}
```

## Integration

### Next.js Integration Patterns

```typescript
// middleware.ts - Dynamic metadata based on request
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}
```

### CMS Integration

```typescript
// lib/metadata/cms.ts
interface CMSMetadata {
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export function transformCMSMetadata(
  cmsData: CMSMetadata,
  path: string
): Metadata {
  return generatePageMetadata(
    cmsData.seoTitle || cmsData.title,
    cmsData.seoDescription || cmsData.description,
    path,
    {
      openGraph: {
        images: cmsData.ogImage ? [cmsData.ogImage] : undefined
      }
    }
  );
}
```

## Type Safety

### Comprehensive Type Definitions

```typescript
// lib/metadata/types.ts
import { Metadata } from 'next';

export interface ExtendedMetadata extends Metadata {
  structuredData?: Record<string, any>;
  customMeta?: Array<{
    name: string;
    content: string;
    property?: string;
  }>;
}

export interface MetadataBuilder {
  setTitle(title: string): MetadataBuilder;
  setDescription(description: string): MetadataBuilder;
  setPath(path: string): MetadataBuilder;
  addStructuredData(data: Record<string, any>): MetadataBuilder;
  build(): Metadata;
}

// Implementation
export class MetadataBuilderImpl implements MetadataBuilder {
  private metadata: Partial<ExtendedMetadata> = {};
  
  setTitle(title: string): MetadataBuilder {
    this.metadata.title = title;
    return this;
  }
  
  setDescription(description: string): MetadataBuilder {
    this.metadata.description = description;
    return this;
  }
  
  build(): Metadata {
    return mergeMetadata(globalMetadata, this.metadata);
  }
}
```

### Runtime Type Validation

```typescript
// lib/metadata/validation.ts
import { z } from 'zod';

const MetadataSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(160),
  robots: z.object({
    index: z.boolean(),
    follow: z.boolean()
  }).optional()
});

export function validateMetadata(metadata: unknown) {
  try {
    return MetadataSchema.parse(metadata);
  } catch (error) {
    console.error('Metadata validation failed:', error);
    throw new Error('Invalid metadata configuration');
  }
}
```

## Performance

### Lazy Loading and Code Splitting

```typescript
// lib/metadata/lazy.ts
export const getMetadataAsync = async (page: string) => {
  const { default: pageMetadata } = await import(`./pages/${page}`);
  return mergeMetadata(globalMetadata, pageMetadata);
};

// Usage
export async function generateMetadata({ params }: { params: { slug: string } }) {
  return await getMetadataAsync(params.slug);
}
```

### Caching Strategy

```typescript
// lib/metadata/cache.ts
const metadataCache = new Map<string, Metadata>();

export function getCachedMetadata(key: string, generator: () => Metadata): Metadata {
  if (!metadataCache.has(key)) {
    metadataCache.set(key, generator());
  }
  return metadataCache.get(key)!;
}

// Usage
export const metadata = getCachedMetadata('home', () => 
  generatePageMetadata('Home', 'Welcome to Perigon', '/')
);
```

## Testing

### Unit Tests

```typescript
// __tests__/metadata/global.test.ts
import { describe, it, expect } from 'vitest';
import globalMetadata from '@/lib/metadata/global';
import { validateMetadata } from '@/lib/metadata/validation';

describe('Global Metadata', () => {
  it('should have required fields', () => {
    expect(globalMetadata.title).toBeDefined();
    expect(globalMetadata.description).toBeDefined();
    expect(globalMetadata.icons).toBeDefined();
  });

  it('should validate against schema', () => {
    expect(() => validateMetadata(globalMetadata)).not.toThrow();
  });

  it('should have proper icon configurations', () => {
    expect(globalMetadata.icons?.icon).toHaveLength(2);
    expect(globalMetadata.icons?.apple).toBeDefined();
  });

  it('should have environment-appropriate robot settings', () => {
    const isProduction = process.env.NODE_ENV === 'production';
    expect(globalMetadata.robots?.index).toBe(isProduction);
  });
});
```

### Integration Tests

```typescript
// __tests__/metadata/integration.test.ts
import { render } from '@testing-library/react';
import { generatePageMetadata } from '@/lib/metadata/utils';

describe('Metadata Integration', () => {
  it('should generate proper page metadata', () => {
    const metadata = generatePageMetadata(
      'Test Page',
      'Test description',
      '/test'
    );

    expect(metadata.title).toBe('Test Page');
    expect(metadata.openGraph?.url).toBe('https://perigon.com/test');
  });
});
```

### Visual Testing

```typescript
// tests/metadata/visual.test.ts
import { test, expect } from '@playwright/test';

test('should display correct favicon', async ({ page }) => {
  await page.goto('/');
  
  const favicon = page.locator('link[rel="icon"][sizes="32x32"]');
  await expect(favicon).toHaveAttribute('href', '/favicon-32x32.png');
});

test('should have proper Open Graph tags', async ({ page }) => {
  await page.goto('/');
  
  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', 'Perigon | Know More, Faster');
});
```

## Common Pitfalls

### 1. **Inconsistent Icon Sizes**
```typescript
// ❌ Wrong - Missing required sizes
icons: {
  icon: [
    { sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' }
    // Missing 32x32, 192x192, 512x512
  ]
}

// ✅ Correct - Complete icon set
icons: {
  icon: [
    { sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' },
    { sizes: '32x32', type: 'image/png', url: '/favicon-32x32.png' },
    { sizes: '192x192', type: 'image/png', url: '/android-chrome-192x192.png' },
    { sizes: '512x512', type: 'image/png', url: '/android-chrome-512x512.png' }
  ]
}
```

### 2. **Environment-Specific Configuration Issues**
```typescript
// ❌ Wrong - Hard-coded production settings
robots: {
  index: true,
  follow: true
}

// ✅ Correct - Environment-aware configuration
robots: {
  index: process.env.NODE_ENV === 'production',
  follow: process.env.NODE_ENV === 'production',
  noarchive: true
}
```

### 3. **Missing URL Validation**
```typescript
// ❌ Wrong - No URL validation
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ✅ Correct - Proper fallback and validation
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

if (!isValidUrl(baseUrl)) {
  throw new Error('Invalid base URL configuration');
}
```

### 4. **Metadata Duplication**
```typescript
// ❌ Wrong - Duplicating metadata in multiple places
export const metadata = {
  title: 'Perigon | Know More, Faster', // Duplicated
  openGraph: {
    title: 'Perigon | Know More, Faster' // Duplicated
  }
}

// ✅ Correct - Single source of truth
const title = 'Perigon | Know More, Faster';
export const metadata = {
  title,
  openGraph: {
    title // Reused
  }
}
```

This pattern provides a robust, scalable approach to managing application metadata while maintaining type safety, performance, and developer experience.