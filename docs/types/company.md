# Company Type Documentation

## Purpose

The `Company` interface represents a comprehensive company entity in the financial domain, containing both business intelligence data (website traffic, rankings) and financial market information (trading symbols, exchanges). This type serves as a core domain object that aggregates company metadata, operational details, and market presence data into a single, strongly-typed structure.

## Type Definition

```typescript
interface SymbolHolder {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  ipoDate: string;
}

export interface Company {
  id: string;
  name: string;
  altNames: string[];
  domains: string[];
  monthlyVisits: number;
  globalRank: number;
  description: string;
  ceo: string;
  industry: string;
  sector: string;
  country: string;
  fullTimeEmployees: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  logo: string;
  favicon: string;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isFund: boolean;
  isAdr: boolean;
  symbols: SymbolHolder[];
}
```

## Properties

### Company Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the company |
| `name` | `string` | ✅ | Official company name |
| `altNames` | `string[]` | ✅ | Alternative names or aliases for the company |
| `domains` | `string[]` | ✅ | Web domains owned by the company |
| `monthlyVisits` | `number` | ✅ | Monthly website traffic count |
| `globalRank` | `number` | ✅ | Global ranking based on web traffic |
| `description` | `string` | ✅ | Company description or business summary |
| `ceo` | `string` | ✅ | Chief Executive Officer name |
| `industry` | `string` | ✅ | Industry classification |
| `sector` | `string` | ✅ | Market sector classification |
| `country` | `string` | ✅ | Country of incorporation/headquarters |
| `fullTimeEmployees` | `number` | ✅ | Number of full-time employees |
| `address` | `string` | ✅ | Street address |
| `city` | `string` | ✅ | City location |
| `state` | `string` | ✅ | State/province location |
| `zip` | `string` | ✅ | Postal/ZIP code |
| `logo` | `string` | ✅ | URL to company logo image |
| `favicon` | `string` | ✅ | URL to company favicon |
| `isEtf` | `boolean` | ✅ | Whether the company is an ETF |
| `isActivelyTrading` | `boolean` | ✅ | Current trading status |
| `isFund` | `boolean` | ✅ | Whether the company is a fund |
| `isAdr` | `boolean` | ✅ | Whether the company has ADR shares |
| `symbols` | `SymbolHolder[]` | ✅ | Array of trading symbols and exchange information |

### SymbolHolder Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `symbol` | `string` | ✅ | Trading symbol/ticker |
| `exchange` | `string` | ✅ | Full exchange name |
| `exchangeShortName` | `string` | ✅ | Abbreviated exchange name |
| `ipoDate` | `string` | ✅ | Initial public offering date (ISO date string) |

## Usage Examples

### Basic Company Data Display

```typescript
import { Company } from '@/lib/types/company';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="company-card">
      <img src={company.logo} alt={`${company.name} logo`} />
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <div className="company-details">
        <span>CEO: {company.ceo}</span>
        <span>Industry: {company.industry}</span>
        <span>Employees: {company.fullTimeEmployees.toLocaleString()}</span>
      </div>
    </div>
  );
};
```

### Working with Trading Symbols

```typescript
import { Company, SymbolHolder } from '@/lib/types/company';

const getMainTradingSymbol = (company: Company): SymbolHolder | undefined => {
  return company.symbols.find(symbol => 
    symbol.exchangeShortName === 'NASDAQ' || 
    symbol.exchangeShortName === 'NYSE'
  ) || company.symbols[0];
};

const formatSymbolDisplay = (symbol: SymbolHolder): string => {
  return `${symbol.symbol} (${symbol.exchangeShortName})`;
};

// Usage in component
const CompanyTradingInfo: React.FC<{ company: Company }> = ({ company }) => {
  const mainSymbol = getMainTradingSymbol(company);
  
  if (!mainSymbol) return null;
  
  return (
    <div>
      <h3>Trading Information</h3>
      <p>Primary Symbol: {formatSymbolDisplay(mainSymbol)}</p>
      <p>IPO Date: {new Date(mainSymbol.ipoDate).toLocaleDateString()}</p>
      <p>Status: {company.isActivelyTrading ? 'Active' : 'Inactive'}</p>
    </div>
  );
};
```

### Utility Types for Partial Updates

```typescript
import { Company } from '@/lib/types/company';

// Create utility types following our guidelines
type CompanyUpdatePayload = Partial<Pick<Company, 
  'name' | 'description' | 'ceo' | 'fullTimeEmployees'
>>;

type CompanySearchResult = Pick<Company, 
  'id' | 'name' | 'logo' | 'industry' | 'sector'
>;

type CompanyFinancialInfo = Pick<Company, 
  'id' | 'name' | 'symbols' | 'isEtf' | 'isFund' | 'isAdr' | 'isActivelyTrading'
>;

// Usage example
const updateCompanyInfo = async (
  id: string, 
  updates: CompanyUpdatePayload
): Promise<Company> => {
  // Implementation here
  return fetch(`/api/companies/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  }).then(res => res.json());
};
```

## Type Architecture Pattern

This type follows our domain-first architecture pattern:

### 1. Domain Object (Current)
```typescript
// Core business entity
export interface Company { /* ... */ }
```

### 2. Response Types (Derived)
```typescript
// API response wrapper
export interface CompanyResponse {
  data: Company;
  metadata: {
    lastUpdated: string;
    source: string;
  };
}

// List response
export interface CompanyListResponse {
  companies: Company[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
```

### 3. Request Types (Derived)
```typescript
// Creation payload
export interface CreateCompanyRequest {
  name: string;
  description: string;
  industry: string;
  sector: string;
  // ... other required fields
}

// Search filters
export interface CompanySearchFilters {
  industry?: string;
  sector?: string;
  country?: string;
  minEmployees?: number;
  isActivelyTrading?: boolean;
}
```

## Related Types

### Extensions and Compositions

```typescript
// Extended company with computed fields
export interface EnrichedCompany extends Company {
  marketCap?: number;
  revenue?: number;
  employeeGrowthRate?: number;
  webTrafficTrend?: 'up' | 'down' | 'stable';
}

// Company with relationships
export interface CompanyWithRelations extends Company {
  competitors?: Pick<Company, 'id' | 'name' | 'logo'>[];
  subsidiaries?: Pick<Company, 'id' | 'name'>[];
  parentCompany?: Pick<Company, 'id' | 'name'> | null;
}
```

### Type Guards

```typescript
export const isPublicCompany = (company: Company): boolean => {
  return company.symbols.length > 0 && company.isActivelyTrading;
};

export const isETF = (company: Company): boolean => {
  return company.isEtf;
};

export const isFund = (company: Company): boolean => {
  return company.isFund;
};
```

## Integration Points

### Services
- `CompanyService` - CRUD operations and business logic
- `FinancialDataService` - Symbol and trading data integration
- `WebAnalyticsService` - Traffic and ranking data

### Components
- `CompanyCard` - Display company overview
- `CompanyProfile` - Detailed company information
- `CompanySearch` - Search and filter companies
- `TradingSymbolList` - Display trading information

### API Endpoints
- `GET /api/companies` - List companies
- `GET /api/companies/:id` - Get company details
- `POST /api/companies` - Create company
- `PATCH /api/companies/:id` - Update company

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const SymbolHolderSchema = z.object({
  symbol: z.string().min(1).max(10),
  exchange: z.string().min(1),
  exchangeShortName: z.string().min(1).max(10),
  ipoDate: z.string().datetime(),
});

export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  altNames: z.array(z.string()),
  domains: z.array(z.string().url()),
  monthlyVisits: z.number().int().min(0),
  globalRank: z.number().int().min(1),
  description: z.string().min(1),
  ceo: z.string().min(1),
  industry: z.string().min(1),
  sector: z.string().min(1),
  country: z.string().length(2), // ISO country code
  fullTimeEmployees: z.number().int().min(0),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  logo: z.string().url(),
  favicon: z.string().url(),
  isEtf: z.boolean(),
  isActivelyTrading: z.boolean(),
  isFund: z.boolean(),
  isAdr: z.boolean(),
  symbols: z.array(SymbolHolderSchema),
});

// Type inference from schema
export type ValidatedCompany = z.infer<typeof CompanySchema>;
```

## Best Practices

### 1. Strict Typing Adherence
- ✅ All properties are explicitly typed
- ✅ No `any` types used
- ✅ Uses interface over type for object shapes

### 2. Type Safety Patterns
```typescript
// Use utility types for partial operations
const updateCompany = (
  id: string, 
  updates: Partial<Pick<Company, 'name' | 'description'>>
) => {
  // Type-safe updates
};

// Use branded types for IDs if needed
type CompanyId = string & { readonly brand: unique symbol };
```

### 3. Null Safety
```typescript
// Handle optional data safely
const getCompanyMainWebsite = (company: Company): string | null => {
  return company.domains.length > 0 ? company.domains[0] : null;
};
```

### 4. Array Handling
```typescript
// Type-safe array operations
const getActiveSymbols = (company: Company): SymbolHolder[] => {
  return company.isActivelyTrading ? company.symbols : [];
};
```

### 5. Integration with React
```typescript
// Proper prop typing
interface CompanyProps {
  company: Company;
  onUpdate?: (updates: Partial<Company>) => void;
  className?: string;
}

const CompanyComponent: React.FC<CompanyProps> = ({ 
  company, 
  onUpdate, 
  className 
}) => {
  // Implementation
};
```

This type system provides a robust foundation for handling company data throughout the application while maintaining type safety and following established architectural patterns.