# Source Type Definition Documentation

## Purpose

The `Source` type represents a news source or media organization within the application's content aggregation system. It encapsulates comprehensive metadata about news publishers, including their identity, content statistics, bias ratings from multiple providers, audience metrics, and visual branding assets. This type serves as the foundational domain object for source management, analytics, and content attribution throughout the platform.

## Type Definition

```typescript
import { ImageHolder } from './image-holder';
import { SourceLocation } from './source-location';

interface SourceTopStatHolder {
  name: string;
  count: number;
}

export interface Source {
  id: string;
  domain: string;
  name: string | null;
  primaryRecordId?: string | null;
  updatedAt: string;
  altNames: string[];
  description: string;
  avgMonthlyPosts: number;
  paywall: boolean;
  location: SourceLocation;
  topCategories: SourceTopStatHolder[];
  topTopics: SourceTopStatHolder[];
  topCountries: SourceTopStatHolder[];
  topLabels: SourceTopStatHolder[];
  avgBiasRating: string | null;
  adFontesBiasRating: string;
  allSidesBiasRating: string;
  mbfcBiasRating: string;
  monthlyVisits: number;
  globalRank: number;
  logoLarge: ImageHolder;
  logoFavIcon: ImageHolder | null;
  logoSquare: ImageHolder;
}

export type SourcePreview = Partial<Source> & {
  isPreview: boolean;
  isUnmatched: boolean;
};
```

## Properties

### Source Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the source |
| `domain` | `string` | ✅ | Website domain (e.g., "cnn.com") |
| `name` | `string \| null` | ✅ | Display name of the source |
| `primaryRecordId` | `string \| null` | ❌ | Optional primary record identifier for data deduplication |
| `updatedAt` | `string` | ✅ | ISO timestamp of last update |
| `altNames` | `string[]` | ✅ | Alternative names/aliases for the source |
| `description` | `string` | ✅ | Descriptive text about the source |
| `avgMonthlyPosts` | `number` | ✅ | Average number of posts published per month |
| `paywall` | `boolean` | ✅ | Whether the source has a paywall |
| `location` | `SourceLocation` | ✅ | Geographic location information |
| `topCategories` | `SourceTopStatHolder[]` | ✅ | Most frequent content categories |
| `topTopics` | `SourceTopStatHolder[]` | ✅ | Most frequent content topics |
| `topCountries` | `SourceTopStatHolder[]` | ✅ | Most covered countries |
| `topLabels` | `SourceTopStatHolder[]` | ✅ | Most applied content labels |
| `avgBiasRating` | `string \| null` | ✅ | Aggregated bias rating across providers |
| `adFontesBiasRating` | `string` | ✅ | Ad Fontes Media bias rating |
| `allSidesBiasRating` | `string` | ✅ | AllSides bias rating |
| `mbfcBiasRating` | `string` | ✅ | Media Bias/Fact Check rating |
| `monthlyVisits` | `number` | ✅ | Estimated monthly website visits |
| `globalRank` | `number` | ✅ | Global traffic ranking |
| `logoLarge` | `ImageHolder` | ✅ | Large format logo image |
| `logoFavIcon` | `ImageHolder \| null` | ✅ | Favicon image (optional) |
| `logoSquare` | `ImageHolder` | ✅ | Square format logo image |

### SourceTopStatHolder Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Name of the statistical category |
| `count` | `number` | ✅ | Frequency count for this category |

### SourcePreview Type

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `...Source` | `Partial<Source>` | ❌ | All Source properties as optional |
| `isPreview` | `boolean` | ✅ | Indicates this is preview data |
| `isUnmatched` | `boolean` | ✅ | Indicates source hasn't been matched to known sources |

## Usage Examples

### Basic Source Display Component

```typescript
import React from 'react';
import { Source } from '@/lib/types/source';

interface SourceCardProps {
  source: Source;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  return (
    <div className="source-card">
      <img 
        src={source.logoSquare.url} 
        alt={`${source.name} logo`}
        width={source.logoSquare.width}
        height={source.logoSquare.height}
      />
      <div>
        <h3>{source.name}</h3>
        <p>{source.domain}</p>
        <p>{source.description}</p>
        <div className="stats">
          <span>Monthly Posts: {source.avgMonthlyPosts.toLocaleString()}</span>
          <span>Global Rank: #{source.globalRank.toLocaleString()}</span>
          {source.paywall && <span className="paywall-badge">Paywall</span>}
        </div>
      </div>
    </div>
  );
};
```

### Source Analytics Service

```typescript
import { Source, SourceTopStatHolder } from '@/lib/types/source';

class SourceAnalyticsService {
  /**
   * Calculate bias rating consensus across providers
   */
  calculateBiasConsensus(source: Source): {
    consensus: string;
    confidence: number;
  } {
    const ratings = [
      source.adFontesBiasRating,
      source.allSidesBiasRating,
      source.mbfcBiasRating
    ].filter(Boolean);

    // Implementation would analyze rating convergence
    return {
      consensus: source.avgBiasRating || 'Unknown',
      confidence: ratings.length / 3
    };
  }

  /**
   * Get top statistics by category
   */
  getTopStats(
    source: Source, 
    category: keyof Pick<Source, 'topCategories' | 'topTopics' | 'topCountries' | 'topLabels'>
  ): SourceTopStatHolder[] {
    return source[category].slice(0, 5);
  }

  /**
   * Calculate source authority score
   */
  calculateAuthorityScore(source: Source): number {
    const visitWeight = Math.log10(source.monthlyVisits) / 10;
    const rankWeight = (1000000 - source.globalRank) / 1000000;
    const contentWeight = Math.log10(source.avgMonthlyPosts) / 5;
    
    return Math.min(100, (visitWeight + rankWeight + contentWeight) * 33.33);
  }
}
```

### Source Preview Handling

```typescript
import { Source, SourcePreview } from '@/lib/types/source';

interface SourceListProps {
  sources: (Source | SourcePreview)[];
}

export const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  const renderSource = (source: Source | SourcePreview) => {
    if ('isPreview' in source) {
      return (
        <div className="source-preview">
          <div className="preview-badge">
            {source.isUnmatched ? 'New Source' : 'Preview'}
          </div>
          <h4>{source.name || source.domain}</h4>
          {source.description && <p>{source.description}</p>}
        </div>
      );
    }

    return <SourceCard source={source} />;
  };

  return (
    <div className="source-list">
      {sources.map((source) => (
        <div key={source.id || source.domain}>
          {renderSource(source)}
        </div>
      ))}
    </div>
  );
};
```

### Filtering and Search

```typescript
import { Source } from '@/lib/types/source';

interface SourceFilters {
  hasPaywall?: boolean;
  biasRating?: string;
  minMonthlyPosts?: number;
  location?: string;
}

class SourceFilterService {
  filterSources(sources: Source[], filters: SourceFilters): Source[] {
    return sources.filter(source => {
      if (filters.hasPaywall !== undefined && source.paywall !== filters.hasPaywall) {
        return false;
      }

      if (filters.biasRating && source.avgBiasRating !== filters.biasRating) {
        return false;
      }

      if (filters.minMonthlyPosts && source.avgMonthlyPosts < filters.minMonthlyPosts) {
        return false;
      }

      if (filters.location && source.location.country !== filters.location) {
        return false;
      }

      return true;
    });
  }

  searchSources(sources: Source[], query: string): Source[] {
    const lowercaseQuery = query.toLowerCase();
    
    return sources.filter(source => 
      source.name?.toLowerCase().includes(lowercaseQuery) ||
      source.domain.toLowerCase().includes(lowercaseQuery) ||
      source.altNames.some(alt => alt.toLowerCase().includes(lowercaseQuery)) ||
      source.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}
```

## Type Architecture Pattern

Following our domain objects → response types → request types pattern:

### 1. Domain Object (Current)
```typescript
// Primary domain representation
export interface Source { /* ... */ }
```

### 2. Response Types (Recommended additions)
```typescript
// API response wrapper
export interface SourceResponse {
  source: Source;
  metadata: {
    lastUpdated: string;
    dataVersion: string;
  };
}

// Collection response
export interface SourceListResponse {
  sources: Source[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  filters: {
    available: Record<string, string[]>;
    applied: Record<string, unknown>;
  };
}
```

### 3. Request Types (Recommended additions)
```typescript
// Source creation/update
export interface CreateSourceRequest {
  domain: string;
  name?: string;
  description?: string;
  location?: Partial<SourceLocation>;
}

export interface UpdateSourceRequest extends Partial<CreateSourceRequest> {
  id: string;
}

// Query parameters
export interface SourceQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  filters?: SourceFilters;
  sortBy?: 'name' | 'globalRank' | 'monthlyVisits' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
```

## Related Types

- **`ImageHolder`**: Manages logo and image assets
- **`SourceLocation`**: Geographic information for sources
- **`SourceTopStatHolder`**: Statistical data structure for analytics

### Potential Extensions
```typescript
// Source relationship types
export interface SourceNetwork {
  parentCompany?: string;
  subsidiaries: string[];
  partnerships: string[];
}

// Historical data tracking
export interface SourceMetrics {
  sourceId: string;
  timestamp: string;
  monthlyVisits: number;
  globalRank: number;
  biasRatings: Record<string, string>;
}
```

## Integration Points

### Services
- **Source Management Service**: CRUD operations
- **Analytics Service**: Metrics and statistics
- **Search Service**: Discovery and filtering
- **Content Attribution Service**: Linking articles to sources

### Components
- **Source Cards/Lists**: Display components
- **Source Analytics Dashboard**: Metrics visualization
- **Source Selection**: Filtering and search interfaces
- **Admin Management**: Source data administration

### API Endpoints
- `GET /api/sources` - List sources with filtering
- `GET /api/sources/:id` - Individual source details
- `POST /api/sources` - Create new source
- `PUT /api/sources/:id` - Update source
- `GET /api/sources/:id/analytics` - Source metrics

## Validation

### Recommended Zod Schema
```typescript
import { z } from 'zod';

const SourceTopStatHolderSchema = z.object({
  name: z.string().min(1),
  count: z.number().int().min(0)
});

export const SourceSchema = z.object({
  id: z.string().uuid(),
  domain: z.string().url(),
  name: z.string().nullable(),
  primaryRecordId: z.string().nullable().optional(),
  updatedAt: z.string().datetime(),
  altNames: z.array(z.string()),
  description: z.string(),
  avgMonthlyPosts: z.number().int().min(0),
  paywall: z.boolean(),
  location: SourceLocationSchema,
  topCategories: z.array(SourceTopStatHolderSchema),
  topTopics: z.array(SourceTopStatHolderSchema),
  topCountries: z.array(SourceTopStatHolderSchema),
  topLabels: z.array(SourceTopStatHolderSchema),
  avgBiasRating: z.string().nullable(),
  adFontesBiasRating: z.string(),
  allSidesBiasRating: z.string(),
  mbfcBiasRating: z.string(),
  monthlyVisits: z.number().int().min(0),
  globalRank: z.number().int().min(1),
  logoLarge: ImageHolderSchema,
  logoFavIcon: ImageHolderSchema.nullable(),
  logoSquare: ImageHolderSchema
});

export const SourcePreviewSchema = SourceSchema.partial().extend({
  isPreview: z.boolean(),
  isUnmatched: z.boolean()
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties have explicit types, avoiding `any`
2. **Interface Usage**: Uses `interface` for object shapes (`Source`, `SourceTopStatHolder`)
3. **Utility Types**: Leverages `Partial<Source>` for preview type
4. **Null Safety**: Explicit nullable types where appropriate
5. **Type Composition**: Composes with `ImageHolder` and `SourceLocation`

### 📚 Usage Recommendations

1. **Type Guards**: Implement type guards for `SourcePreview` detection
2. **Immutability**: Treat source objects as immutable in state management
3. **Validation**: Always validate external data against schemas
4. **Error Handling**: Handle cases where required images might be unavailable
5. **Performance**: Consider lazy loading for image assets and statistics

### 🔧 Extension Points

1. **Historical Tracking**: Add versioning for source data changes
2. **Relationships**: Model parent/subsidiary relationships
3. **Real-time Updates**: Consider WebSocket integration for live metrics
4. **Caching**: Implement appropriate caching strategies for source data
5. **Internationalization**: Support for localized source names and descriptions