# InvoicesTable Component

## Purpose

The `InvoicesTable` component renders a sortable, interactive data table for displaying billing invoice transactions. It provides a comprehensive view of invoice history including issue dates, payment methods, descriptions, amounts, and statuses, with conditional PDF download functionality for available invoices.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires client-side interactivity for:
- Table sorting functionality via TanStack Table
- Click handlers for column sorting
- Dynamic column rendering based on invoice PDF availability
- Interactive download buttons for invoice PDFs

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `invoices` | `TransactionTableItem[]` | Yes | Array of invoice transaction data to display in the table |

### TransactionTableItem Interface
```typescript
interface TransactionTableItem {
  createdAt: Date;
  cardLast4: string | null;
  description: string;
  amount: number; // Amount in cents
  status: 'succeeded' | 'pending' | 'failed';
  invoicePdf: string | null; // URL to PDF download
}
```

## Usage Example

```tsx
import { InvoicesTable } from '@/components/settings/billing/invoices/invoices-table';

const BillingPage = () => {
  const invoices = [
    {
      createdAt: new Date('2024-01-15'),
      cardLast4: '4242',
      description: 'Monthly subscription - Pro Plan',
      amount: 2999, // $29.99 in cents
      status: 'succeeded',
      invoicePdf: 'https://example.com/invoice-123.pdf'
    },
    {
      createdAt: new Date('2024-02-15'),
      cardLast4: '4242',
      description: 'Monthly subscription - Pro Plan',
      amount: 2999,
      status: 'pending',
      invoicePdf: null
    }
  ];

  return (
    <div className="space-y-6">
      <h2>Billing History</h2>
      <InvoicesTable invoices={invoices} />
    </div>
  );
};
```

## Functionality

### Core Features
- **Sortable Columns**: All columns except PDF download support ascending/descending sorting
- **Dynamic Column Configuration**: Automatically shows PDF download column only when invoices have available PDFs
- **Status Visualization**: Color-coded status badges with dots for visual status identification
- **Currency Formatting**: Automatic formatting of amounts from cents to dollar display
- **Date Formatting**: Consistent date display using `date-fns` formatting
- **Responsive Design**: Horizontal scrolling on smaller screens via overflow handling

### Column Definitions
- **Issue Date**: Sortable datetime with receipt icon and formatted date display
- **Payment**: Shows card payment method with last 4 digits when available
- **Description**: Transaction description text
- **Amount**: Currency-formatted amount with custom numeric sorting
- **Status**: Visual status badge with appropriate color coding
- **Download** (conditional): PDF download button when invoice PDF is available

### Interactive Elements
- **Sort Icons**: Dynamic icons showing sort state (unsorted, ascending, descending)
- **Download Buttons**: Compact ghost buttons linking to invoice PDF URLs
- **Clickable Headers**: All sortable column headers respond to click events

## State Management

**Local State Only** - The component uses:
- **TanStack Table State**: Internal table state management for sorting, column definitions, and row models
- **useMemo Hook**: Memoized column configuration based on invoice PDF availability
- **No External State**: Component is purely presentational, receiving all data via props

## Side Effects

**Minimal Side Effects**:
- **PDF Downloads**: Triggers browser downloads when PDF download buttons are clicked
- **DOM Manipulation**: TanStack Table handles virtual DOM updates for sorting
- **No API Calls**: Component doesn't make direct API calls; data is provided via props

## Dependencies

### UI Components
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow` from `@/components/ui/table`
- `StatusBadge` from `@/components/ui/status-badge`
- `CompactButton` from `@/components/ui/compact-button`
- `Typography` from `@/components/ui/typography`

### External Libraries
- `@tanstack/react-table` for table functionality and sorting
- `date-fns/format` for date formatting
- Icon components from `@/components/icons`

### Utilities
- `cn` utility for conditional class name handling
- `Intl.NumberFormat` for currency formatting

### Type Dependencies
- `TransactionTableItem` from local types file

## Integration

### Application Architecture Role
- **Settings Layer**: Part of the billing settings section within user account management
- **Data Display**: Pure presentation component in the data display layer
- **Billing Domain**: Specifically handles invoice transaction data visualization

### Parent Component Integration
```tsx
// Typical parent component pattern
const BillingInvoicesPage = () => {
  const { data: invoices, isLoading } = useInvoicesQuery();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="space-y-6">
      <BillingHeader />
      <InvoicesTable invoices={invoices} />
      <BillingFooter />
    </div>
  );
};
```

### Data Flow
1. Parent components fetch invoice data via TanStack Query
2. Data is passed as props to `InvoicesTable`
3. Component renders interactive table with sorting capabilities
4. User interactions (sorting, downloads) are handled locally

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for interactivity  
✅ **Single Responsibility**: Focused solely on invoice table display and interaction  
✅ **Reusable Design**: Generic table structure that could be adapted for other transaction types  
✅ **Prop-Based Data**: No direct API calls, follows data-down pattern  

### Performance Optimizations
✅ **Memoized Columns**: Uses `useMemo` to prevent unnecessary column recalculation  
✅ **Efficient Rendering**: Leverages TanStack Table's optimized rendering  
✅ **Conditional Features**: Only renders PDF column when needed  

### Type Safety
✅ **Full TypeScript**: Comprehensive typing for all props and internal data  
✅ **Exported Types**: Makes reusable constants and types available for other components  
✅ **Strict Interfaces**: Well-defined data contracts with parent components  

### Accessibility
✅ **Semantic Table Structure**: Proper table semantics for screen readers  
✅ **Interactive Elements**: Proper button and link elements for downloads  
✅ **Visual Indicators**: Clear sort state indicators and status visualization