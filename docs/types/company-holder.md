# CompanyHolder Type Documentation

## Purpose

The `CompanyHolder` interface represents a company entity within the application, serving as a domain object that encapsulates core company information including identification, naming, associated domains, and stock symbols. This type acts as a foundational data structure for company-related operations and serves as the basis for building more specific request and response types throughout the application.

## Type Definition

```typescript
export interface CompanyHolder {
  id: string;
  name: string;
  domains: string[];
  symbols: string[];
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the company |
| `name` | `string` | ✅ | Official company name or display name |
| `domains` | `string[]` | ✅ | Array of domain names associated with the company |
| `symbols` | `string[]` | ✅ | Array of stock ticker symbols for the company |

## Usage Examples

### Basic Type Usage

```typescript
import { CompanyHolder } from '@/lib/types/company-holder';

// Creating a company holder instance
const company: CompanyHolder = {
  id: 'comp_123456',
  name: 'Acme Corporation',
  domains: ['acme.com', 'acmecorp.com'],
  symbols: ['ACME', 'ACM']
};

// Function accepting CompanyHolder
function displayCompanyInfo(company: CompanyHolder): string {
  return `${company.name} (${company.symbols.join(', ')})`;
}

// Array of companies
const companies: CompanyHolder[] = [
  {
    id: 'comp_apple',
    name: 'Apple Inc.',
    domains: ['apple.com', 'icloud.com'],
    symbols: ['AAPL']
  },
  {
    id: 'comp_microsoft',
    name: 'Microsoft Corporation',
    domains: ['microsoft.com', 'msn.com', 'outlook.com'],
    symbols: ['MSFT']
  }
];
```

### Component Integration

```typescript
import React from 'react';
import { CompanyHolder } from '@/lib/types/company-holder';

interface CompanyCardProps {
  company: CompanyHolder;
  onSelect?: (company: CompanyHolder) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelect }) => {
  return (
    <div className="company-card" onClick={() => onSelect?.(company)}>
      <h3>{company.name}</h3>
      <div className="symbols">
        {company.symbols.map(symbol => (
          <span key={symbol} className="symbol-badge">{symbol}</span>
        ))}
      </div>
      <div className="domains">
        {company.domains.length} domain{company.domains.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### 1. Domain Object (Base)
```typescript
// Current CompanyHolder serves as the domain object
export interface CompanyHolder {
  id: string;
  name: string;
  domains: string[];
  symbols: string[];
}
```

### 2. Response Types
```typescript
// API response wrapper
export interface CompanyHolderResponse {
  data: CompanyHolder;
  metadata?: {
    lastUpdated: string;
    source: string;
  };
}

// List response
export interface CompanyHoldersListResponse {
  companies: CompanyHolder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Search response with additional context
export interface CompanySearchResponse {
  companies: CompanyHolder[];
  searchTerm: string;
  matchedFields: Array<keyof CompanyHolder>;
}
```

### 3. Request Types
```typescript
// Create company request
export interface CreateCompanyRequest {
  name: string;
  domains: string[];
  symbols: string[];
  // id is generated server-side
}

// Update company request (partial updates allowed)
export interface UpdateCompanyRequest extends Partial<Pick<CompanyHolder, 'name' | 'domains' | 'symbols'>> {
  id: string; // Required for updates
}

// Search/filter request
export interface CompanySearchRequest {
  query?: string;
  domains?: string[];
  symbols?: string[];
  limit?: number;
  offset?: number;
}
```

## Related Types

### Utility Types
```typescript
// Partial company for forms/drafts
export type PartialCompanyHolder = Partial<CompanyHolder>;

// Company without arrays (for basic display)
export type CompanyHolderCore = Omit<CompanyHolder, 'domains' | 'symbols'>;

// Company identifiers only
export type CompanyIdentifier = Pick<CompanyHolder, 'id' | 'name'>;

// Domain-specific types
export type CompanyDomain = CompanyHolder['domains'][number];
export type CompanySymbol = CompanyHolder['symbols'][number];
```

### Extended Types
```typescript
// Enhanced company with additional metadata
export interface EnhancedCompanyHolder extends CompanyHolder {
  industry?: string;
  marketCap?: number;
  headquarters?: string;
  website?: string;
  logoUrl?: string;
}

// Company with relational data
export interface CompanyHolderWithRelations extends CompanyHolder {
  employees?: Employee[];
  subsidiaries?: CompanyHolder[];
  parentCompany?: CompanyIdentifier;
}
```

## Integration Points

### Services
```typescript
// Company service using the type
export class CompanyService {
  async getCompany(id: string): Promise<CompanyHolder> {
    // Implementation
  }

  async searchCompanies(request: CompanySearchRequest): Promise<CompanyHolder[]> {
    // Implementation
  }

  async createCompany(request: CreateCompanyRequest): Promise<CompanyHolder> {
    // Implementation
  }
}
```

### State Management
```typescript
// Redux/Zustand store slice
interface CompanyState {
  companies: CompanyHolder[];
  selectedCompany: CompanyHolder | null;
  loading: boolean;
  error: string | null;
}

// React Query/SWR key factory
export const companyKeys = {
  all: ['companies'] as const,
  lists: () => [...companyKeys.all, 'list'] as const,
  list: (filters: CompanySearchRequest) => [...companyKeys.lists(), filters] as const,
  details: () => [...companyKeys.all, 'detail'] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
};
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const CompanyHolderSchema = z.object({
  id: z.string().min(1, 'Company ID is required'),
  name: z.string().min(1, 'Company name is required'),
  domains: z.array(z.string().url('Invalid domain format')).min(1, 'At least one domain is required'),
  symbols: z.array(z.string().regex(/^[A-Z]{1,5}$/, 'Invalid stock symbol format')).min(1, 'At least one symbol is required')
});

// Validation helper
export function validateCompanyHolder(data: unknown): CompanyHolder {
  return CompanyHolderSchema.parse(data);
}

// Type guard
export function isCompanyHolder(data: unknown): data is CompanyHolder {
  return CompanyHolderSchema.safeParse(data).success;
}
```

### Request Validation Schemas
```typescript
export const CreateCompanyRequestSchema = CompanyHolderSchema.omit({ id: true });
export const UpdateCompanyRequestSchema = CompanyHolderSchema.partial().required({ id: true });
export const CompanySearchRequestSchema = z.object({
  query: z.string().optional(),
  domains: z.array(z.string()).optional(),
  symbols: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0)
});
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties use specific string and string array types, avoiding `any`
2. **Interface Usage**: Uses `interface` for object shape definition as recommended
3. **Consistent Naming**: Follows PascalCase for interface names and camelCase for properties
4. **Array Typing**: Uses `string[]` syntax for better readability

### ✅ Recommended Patterns

```typescript
// Use utility types for variations
const updateCompany = (id: string, updates: Partial<Omit<CompanyHolder, 'id'>>) => {
  // Implementation
};

// Leverage type narrowing
function processCompany(company: CompanyHolder | CompanyIdentifier) {
  if ('domains' in company) {
    // TypeScript knows this is CompanyHolder
    console.log(`Processing ${company.domains.length} domains`);
  } else {
    // TypeScript knows this is CompanyIdentifier
    console.log(`Processing company: ${company.name}`);
  }
}

// Use const assertions for type safety
const DEMO_COMPANY = {
  id: 'demo',
  name: 'Demo Company',
  domains: ['demo.com'],
  symbols: ['DEMO']
} as const satisfies CompanyHolder;
```

### ⚠️ Considerations

- **Immutability**: Consider using `readonly` modifiers for arrays if mutation should be avoided
- **Validation**: Always validate data from external sources using the Zod schema
- **Null Safety**: Consider if any properties should be optional or nullable based on business requirements
- **Scalability**: The current flat structure works well; consider nested objects if additional company details are needed

This type serves as a solid foundation for company-related operations while maintaining strict typing and following established architectural patterns.