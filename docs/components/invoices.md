# Invoices Component

## Purpose

The `Invoices` component displays an organization's billing invoice history in a tabular format. It serves as the main interface for users to view their recent transactions, including payment details, status, and downloadable invoice PDFs. The component handles both empty states and loading states gracefully while limiting display to the 100 most recent transactions.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes TanStack Query hooks (`useCurrentOrganization`, `useUserTransactions`) for real-time data fetching
- Implements interactive UI elements and state-dependent rendering
- Requires client-side data processing with `useMemo` for transaction transformation

## Props Interface

### Invoices
```typescript
// No props - self-contained component
```

### InvoicesInner
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `billing` | `OrganizationBilling \| undefined` | No | Billing data containing transaction history and organization details |

## Usage Example

```tsx
import { Invoices } from '@/components/settings/billing/invoices/invoices';

// Basic usage in billing settings page
export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1>Billing & Invoices</h1>
      <Invoices />
    </div>
  );
}

// The component automatically handles:
// - Organization validation (requires Stripe ID)
// - Data fetching and loading states
// - Empty state presentation
// - Transaction data transformation
```

## Functionality

### Core Features
- **Conditional Rendering**: Only displays for organizations with Stripe integration
- **Transaction Display**: Shows up to 100 most recent billing transactions
- **Data Transformation**: Converts raw transaction data to table-friendly format
- **Empty State Handling**: Displays informative empty state with illustration
- **Loading States**: Shows skeleton loader while data is being fetched
- **Transaction Details**: Displays amount, description, status, card info, and PDF links

### Data Processing
- Parses ISO date strings to Date objects for proper sorting/display
- Maps transaction data to `TransactionTableItem` interface
- Memoizes transaction processing for performance optimization

## State Management

### TanStack Query Integration
```typescript
// Organization membership data
const { data: member } = useCurrentOrganization();

// Billing transactions (limited to 100)
const { data: billing } = useUserTransactions({ numTransactions: 100 });
```

### Local State
- **Computed State**: `transactions` derived from billing data using `useMemo`
- **Conditional Logic**: Stripe ID validation determines component visibility

## Side Effects

### Data Fetching
- Fetches current organization membership to validate Stripe integration
- Retrieves user transaction history with 100-item limit
- Automatically refetches data based on TanStack Query configuration

### External Dependencies
- **Stripe Integration**: Requires organization to have `stripeId` configured
- **PDF Generation**: Links to external invoice PDF URLs from billing service

## Dependencies

### UI Components
- `Skeleton` - Loading state display
- `Typography` - Consistent text styling
- `InvoicesTable` - Tabular transaction display

### Hooks & Services
- `useCurrentOrganization` - Organization membership and Stripe validation
- `useUserTransactions` - Billing transaction data fetching

### Utilities
- `parseISO` (date-fns) - Date string parsing
- `cn` - Conditional className utility

### Types
- `OrganizationBilling` - Billing data interface
- `TransactionTableItem` - Table row data structure

## Integration

### Application Architecture
```
Settings Page
  └── Billing Section
      └── Invoices Component
          └── InvoicesTable Component
```

### Data Flow
1. **Authorization Check**: Validates organization has Stripe integration
2. **Data Fetching**: Retrieves organization and billing data in parallel
3. **Data Transformation**: Processes transactions for table display
4. **Conditional Rendering**: Shows table, empty state, or loading skeleton

### Feature Integration
- Part of the broader billing management system
- Integrates with Stripe payment processing
- Connects to PDF invoice generation service

## Best Practices

### Architecture Adherence
✅ **Component Decomposition**: Clean separation with `InvoicesInner` for testability  
✅ **State Management**: Proper use of TanStack Query for server state  
✅ **Client-Side Logic**: Appropriate use of client component for interactive features  
✅ **Error Boundaries**: Graceful handling of missing Stripe integration  

### Performance Optimization
- **Memoization**: Transaction processing optimized with `useMemo`
- **Conditional Rendering**: Avoids unnecessary renders for non-Stripe organizations
- **Lazy Loading**: Image loading optimized with Next.js Image component

### User Experience
- **Progressive Enhancement**: Loading states prevent layout shift
- **Clear Communication**: Informative empty states and transaction limits
- **Accessibility**: Proper semantic HTML and alt text for images

### Security Considerations
- **Data Validation**: Stripe ID verification before data access
- **Limited Exposure**: Only shows last 100 transactions for security
- **External Links**: Safe handling of PDF URLs from trusted billing service