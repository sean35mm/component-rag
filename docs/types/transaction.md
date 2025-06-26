# Transaction Type Documentation

## Purpose

The `Transaction` type represents payment transaction data structures in the application, designed to handle various payment methods supported by Stripe. This type uses discriminated unions to ensure type safety between different payment methods, particularly distinguishing between card payments (which have last 4 digits) and other payment methods (which do not).

## Type Definition

### Core Interface

```typescript
interface TransactionBase<
  TType extends string | null,
  TCardLast4 extends string | null,
> {
  createdAt: string;
  stripeId: string;
  amount: number;
  description: string;
  status: 'succeeded' | 'pending' | 'failed';
  type: TType;
  cardLast4: TCardLast4;
  invoicePdf: string | null;
}
```

### Discriminated Union Type

```typescript
export type Transaction =
  | TransactionBase<'card', string>           // Card payments with last 4 digits
  | TransactionBase<PaymentMethod | null, null>; // Other payment methods without card info
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `createdAt` | `string` | ✅ | ISO 8601 timestamp of transaction creation |
| `stripeId` | `string` | ✅ | Unique Stripe payment intent or charge identifier |
| `amount` | `number` | ✅ | Transaction amount in smallest currency unit (cents) |
| `description` | `string` | ✅ | Human-readable transaction description |
| `status` | `'succeeded' \| 'pending' \| 'failed'` | ✅ | Current transaction status |
| `type` | `string \| null` | ✅ | Payment method type (discriminator property) |
| `cardLast4` | `string \| null` | ✅ | Last 4 digits of card (only for card payments) |
| `invoicePdf` | `string \| null` | ✅ | URL to PDF invoice or null if not available |

## Usage Examples

### Type Guards and Discrimination

```typescript
// Type guard for card transactions
function isCardTransaction(transaction: Transaction): transaction is TransactionBase<'card', string> {
  return transaction.type === 'card' && transaction.cardLast4 !== null;
}

// Usage in component
function TransactionDisplay({ transaction }: { transaction: Transaction }) {
  if (isCardTransaction(transaction)) {
    // TypeScript knows cardLast4 is string here
    return (
      <div>
        Card ending in {transaction.cardLast4}
        Amount: ${transaction.amount / 100}
      </div>
    );
  }
  
  // TypeScript knows cardLast4 is null here
  return (
    <div>
      Payment via {transaction.type || 'Unknown method'}
      Amount: ${transaction.amount / 100}
    </div>
  );
}
```

### Service Layer Usage

```typescript
// Transaction service
class TransactionService {
  async createTransaction(paymentData: CreateTransactionRequest): Promise<Transaction> {
    const response = await stripe.paymentIntents.create(paymentData);
    
    return {
      createdAt: new Date().toISOString(),
      stripeId: response.id,
      amount: response.amount,
      description: response.description || '',
      status: response.status as Transaction['status'],
      type: response.payment_method?.type || null,
      cardLast4: response.payment_method?.card?.last4 || null,
      invoicePdf: null
    };
  }
  
  async getTransactionHistory(userId: string): Promise<Transaction[]> {
    // Implementation would return properly typed transactions
  }
}
```

### React Hook Usage

```typescript
// Custom hook for transaction management
function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  
  const processTransaction = useCallback(async (transaction: Transaction) => {
    if (transaction.status === 'pending') {
      // Handle pending transaction logic
      await pollTransactionStatus(transaction.stripeId);
    }
  }, []);
  
  return {
    transactions,
    loading,
    processTransaction
  };
}
```

## Type Architecture Pattern

This type follows our domain-first architecture pattern:

### 1. Domain Object (Current)
```typescript
// Core business entity
type Transaction = TransactionBase<'card', string> | TransactionBase<PaymentMethod | null, null>;
```

### 2. Response Types (Recommended Extensions)
```typescript
// API response wrapper
interface TransactionResponse {
  data: Transaction;
  metadata: {
    processingTime: number;
    apiVersion: string;
  };
}

// List response
interface TransactionListResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

### 3. Request Types (Recommended Extensions)
```typescript
// Transaction creation request
interface CreateTransactionRequest {
  amount: number;
  description: string;
  paymentMethodId: string;
  customerId?: string;
}

// Transaction query filters
interface TransactionFilters {
  status?: Transaction['status'];
  type?: Transaction['type'];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}
```

## Related Types

### Recommended Companion Types

```typescript
// Payment method enumeration (following our enum guidelines)
enum PaymentMethodType {
  CARD = 'card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  // ... other methods
}

// Transaction summary for analytics
interface TransactionSummary {
  totalAmount: number;
  transactionCount: number;
  successRate: number;
  averageAmount: number;
}

// Audit trail
interface TransactionAudit {
  transactionId: string;
  changes: Array<{
    field: keyof Transaction;
    oldValue: unknown;
    newValue: unknown;
    timestamp: string;
    userId: string;
  }>;
}
```

## Integration Points

### 1. API Layer
```typescript
// REST endpoints
app.get('/api/transactions', (req, res) => {
  const transactions: Transaction[] = getTransactions(req.query);
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const transaction: Transaction = createTransaction(req.body);
  res.json(transaction);
});
```

### 2. Database Layer
```typescript
// Prisma schema integration
interface TransactionEntity {
  id: string;
  // Maps to Transaction type properties
  created_at: Date;
  stripe_id: string;
  amount: number;
  // ... other fields
}

// Conversion utilities
function entityToTransaction(entity: TransactionEntity): Transaction {
  return {
    createdAt: entity.created_at.toISOString(),
    stripeId: entity.stripe_id,
    amount: entity.amount,
    // ... field mapping
  };
}
```

### 3. State Management
```typescript
// Redux/Zustand store
interface TransactionStore {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  filters: TransactionFilters;
  
  actions: {
    addTransaction: (transaction: Transaction) => void;
    updateTransaction: (id: string, updates: Partial<Transaction>) => void;
    setFilters: (filters: TransactionFilters) => void;
  };
}
```

## Validation

### Zod Schema (Recommended)

```typescript
import { z } from 'zod';

// Base schema for shared validation
const transactionBaseSchema = z.object({
  createdAt: z.string().datetime(),
  stripeId: z.string().min(1),
  amount: z.number().positive(),
  description: z.string().min(1),
  status: z.enum(['succeeded', 'pending', 'failed']),
  invoicePdf: z.string().url().nullable(),
});

// Card transaction schema
const cardTransactionSchema = transactionBaseSchema.extend({
  type: z.literal('card'),
  cardLast4: z.string().length(4).regex(/^\d{4}$/),
});

// Other payment methods schema
const otherTransactionSchema = transactionBaseSchema.extend({
  type: z.enum([
    'paypal', 'apple_pay', 'google_pay', // ... other methods
  ]).nullable(),
  cardLast4: z.null(),
});

// Union schema
export const transactionSchema = z.discriminatedUnion('type', [
  cardTransactionSchema,
  otherTransactionSchema,
]);

// Validation utility
export function validateTransaction(data: unknown): Transaction {
  return transactionSchema.parse(data);
}
```

### Runtime Type Checking

```typescript
// Type assertion with validation
function assertTransaction(data: unknown): asserts data is Transaction {
  const result = transactionSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid transaction data: ${result.error.message}`);
  }
}
```

## Best Practices

### 1. **Strict Typing Compliance** ✅
- Uses discriminated unions for type safety
- Avoids `any` types completely
- Leverages generic constraints for reusability

### 2. **Interface Usage** ⚠️
**Recommendation**: Consider refactoring to use interfaces for better extensibility:

```typescript
// Preferred approach
interface CardTransaction extends TransactionBase {
  type: 'card';
  cardLast4: string;
}

interface OtherTransaction extends TransactionBase {
  type: PaymentMethodType | null;
  cardLast4: null;
}

type Transaction = CardTransaction | OtherTransaction;
```

### 3. **Literal Types** ✅
- Uses string literals for status and type discrimination
- Consider extracting to enums for reusability across the application

### 4. **Utility Type Integration**

```typescript
// Leveraging utility types
type TransactionUpdate = Partial<Pick<Transaction, 'status' | 'description' | 'invoicePdf'>>;
type TransactionSummary = Omit<Transaction, 'cardLast4' | 'invoicePdf'>;
type RequiredTransactionFields = Required<Pick<Transaction, 'stripeId' | 'amount'>>;
```

### 5. **Type Architecture Compliance** ✅
- Follows domain-first pattern
- Provides clear extension points for response/request types
- Maintains separation of concerns

### 6. **Performance Considerations**

```typescript
// Use readonly for immutable transaction data
interface ReadonlyTransaction extends Readonly<Transaction> {
  readonly createdAt: string;
  readonly stripeId: string;
  // ... other readonly properties
}

// Consider freezing objects for runtime immutability
function createImmutableTransaction(data: Transaction): ReadonlyTransaction {
  return Object.freeze(data) as ReadonlyTransaction;
}
```

This transaction type system provides a robust foundation for payment processing while maintaining type safety and following established architectural patterns.