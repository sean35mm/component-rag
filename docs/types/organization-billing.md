# OrganizationBilling Type Documentation

## Purpose

The `OrganizationBilling` interface represents the billing information structure for an organization, encapsulating all financial transactions associated with an organization's account. This type serves as a domain object that aggregates transaction data for billing purposes, providing a centralized view of an organization's financial activity.

## Type Definition

```typescript
import { Transaction } from './transaction';

export interface OrganizationBilling {
  transactions: Transaction[];
}
```

This interface follows our **Interfaces over Types** guideline, providing a clear contract for organization billing data structures.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `transactions` | `Transaction[]` | ✅ Yes | Array of all transactions associated with the organization's billing account |

## Usage Examples

### Basic Usage in Components

```typescript
import { OrganizationBilling } from '@/lib/types/organization-billing';
import { Transaction } from '@/lib/types/transaction';

// Component props
interface BillingDashboardProps {
  billing: OrganizationBilling;
}

const BillingDashboard: React.FC<BillingDashboardProps> = ({ billing }) => {
  const totalAmount = billing.transactions.reduce(
    (sum, transaction) => sum + transaction.amount, 
    0
  );

  return (
    <div>
      <h2>Organization Billing</h2>
      <p>Total Transactions: {billing.transactions.length}</p>
      <p>Total Amount: ${totalAmount}</p>
    </div>
  );
};
```

### Service Layer Usage

```typescript
import { OrganizationBilling } from '@/lib/types/organization-billing';

class BillingService {
  async getOrganizationBilling(organizationId: string): Promise<OrganizationBilling> {
    const response = await fetch(`/api/organizations/${organizationId}/billing`);
    const data = await response.json();
    
    return {
      transactions: data.transactions
    };
  }

  calculateMonthlyTotal(billing: OrganizationBilling, month: number, year: number): number {
    return billing.transactions
      .filter(transaction => {
        const date = new Date(transaction.createdAt);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  }
}
```

### Using Utility Types

```typescript
import { OrganizationBilling } from '@/lib/types/organization-billing';

// Partial billing for updates
type PartialBilling = Partial<OrganizationBilling>;

// Pick specific fields for display
type BillingSummary = Pick<OrganizationBilling, 'transactions'> & {
  totalAmount: number;
  transactionCount: number;
};

// Create summary from billing data
function createBillingSummary(billing: OrganizationBilling): BillingSummary {
  return {
    transactions: billing.transactions,
    totalAmount: billing.transactions.reduce((sum, t) => sum + t.amount, 0),
    transactionCount: billing.transactions.length
  };
}
```

## Type Architecture Pattern

Following our **Type Architecture** guideline, `OrganizationBilling` serves as a domain object in our type hierarchy:

```typescript
// 1. Domain Object (Current)
interface OrganizationBilling {
  transactions: Transaction[];
}

// 2. Response Types
interface OrganizationBillingResponse {
  data: OrganizationBilling;
  pagination?: PaginationMeta;
  meta: {
    totalAmount: number;
    currency: string;
  };
}

// 3. Request Types
interface GetOrganizationBillingRequest {
  organizationId: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  transactionTypes?: TransactionType[];
}

interface UpdateBillingRequest {
  organizationId: string;
  billing: Partial<OrganizationBilling>;
}
```

## Related Types

### Direct Dependencies
- `Transaction` - Core transaction entity that composes the billing data

### Extended Types
```typescript
// Enhanced billing with computed properties
interface EnhancedOrganizationBilling extends OrganizationBilling {
  totalAmount: number;
  lastTransactionDate: string | null;
  monthlyBreakdown: MonthlyBilling[];
}

// Billing with organization context
interface OrganizationBillingWithContext {
  organizationId: string;
  organizationName: string;
  billing: OrganizationBilling;
}
```

### Composed Types
```typescript
interface OrganizationFinancials {
  billing: OrganizationBilling;
  paymentMethods: PaymentMethod[];
  subscriptions: Subscription[];
  invoices: Invoice[];
}
```

## Integration Points

### API Endpoints
- `GET /api/organizations/:id/billing` - Fetch organization billing data
- `POST /api/organizations/:id/billing/export` - Export billing information
- `GET /api/organizations/:id/billing/summary` - Get billing summary

### Components
- `BillingDashboard` - Main billing overview component
- `TransactionList` - Displays billing transactions
- `BillingExport` - Handles billing data export
- `InvoiceGenerator` - Creates invoices from billing data

### Services
- `BillingService` - Core billing operations
- `ReportingService` - Billing analytics and reporting
- `ExportService` - Data export functionality

## Validation

### Zod Schema

```typescript
import { z } from 'zod';
import { TransactionSchema } from './transaction';

export const OrganizationBillingSchema = z.object({
  transactions: z.array(TransactionSchema)
});

// Validation function
export function validateOrganizationBilling(
  data: unknown
): OrganizationBilling {
  return OrganizationBillingSchema.parse(data);
}

// Type guard
export function isOrganizationBilling(
  data: unknown
): data is OrganizationBilling {
  return OrganizationBillingSchema.safeParse(data).success;
}
```

### Runtime Validation Example

```typescript
import { validateOrganizationBilling } from '@/lib/types/organization-billing';

async function fetchBillingData(organizationId: string): Promise<OrganizationBilling> {
  try {
    const response = await fetch(`/api/organizations/${organizationId}/billing`);
    const rawData = await response.json();
    
    // Validate and ensure type safety
    return validateOrganizationBilling(rawData);
  } catch (error) {
    console.error('Invalid billing data:', error);
    throw new Error('Failed to fetch valid billing data');
  }
}
```

## Best Practices

### 1. Strict Typing Adherence
```typescript
// ✅ Good: Strict typing with proper interface
function processBilling(billing: OrganizationBilling): number {
  return billing.transactions.reduce((sum, t) => sum + t.amount, 0);
}

// ❌ Avoid: Using 'any'
function processBilling(billing: any): number {
  return billing.transactions.reduce((sum: any, t: any) => sum + t.amount, 0);
}
```

### 2. Interface Usage
```typescript
// ✅ Good: Using interface for object shape
interface OrganizationBilling {
  transactions: Transaction[];
}

// ❌ Less preferred: Using type alias
type OrganizationBilling = {
  transactions: Transaction[];
}
```

### 3. Composition with Utility Types
```typescript
// ✅ Good: Leveraging utility types
type BillingUpdate = Partial<OrganizationBilling>;
type BillingTransactions = Pick<OrganizationBilling, 'transactions'>;

// Create specialized types for different use cases
interface BillingPreview extends Omit<OrganizationBilling, 'transactions'> {
  transactionCount: number;
  previewTransactions: Transaction[];
}
```

### 4. Type Safety in Operations
```typescript
// ✅ Good: Type-safe operations
function filterTransactionsByType(
  billing: OrganizationBilling,
  type: TransactionType
): OrganizationBilling {
  return {
    transactions: billing.transactions.filter(t => t.type === type)
  };
}

// ✅ Good: Immutable updates
function addTransaction(
  billing: OrganizationBilling,
  newTransaction: Transaction
): OrganizationBilling {
  return {
    ...billing,
    transactions: [...billing.transactions, newTransaction]
  };
}
```

This type definition exemplifies our commitment to **Strict Typing** by maintaining clear interfaces and avoiding any loose typing patterns. It serves as a foundation for building more complex billing-related types while maintaining type safety throughout the application.