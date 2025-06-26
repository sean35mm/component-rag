# PiReceiptLine Icon Component

## Purpose
The `PiReceiptLine` component is an SVG icon that renders a receipt symbol in outline style. It's part of the Phosphor Icons collection and is designed to represent receipts, invoices, bills, or transaction records in the user interface. This icon is commonly used in financial applications, shopping interfaces, or anywhere transaction history is displayed.

## Component Type
**Server Component** - This is a pure presentational component that renders static SVG content without any client-side interactivity, state management, or browser APIs. It can be safely rendered on the server.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `...props` | `SVGProps<SVGSVGElement>` | No | - | All standard SVG element props including className, style, onClick, etc. Spreads directly to the root `<svg>` element |

### Common SVG Props Examples:
- `className?: string` - CSS classes for styling
- `style?: CSSProperties` - Inline styles
- `onClick?: MouseEventHandler` - Click event handler
- `aria-label?: string` - Accessibility label
- `role?: string` - ARIA role attribute

## Usage Example

```tsx
import { PiReceiptLine } from '@/components/icons/pi/pi-receipt-line';

// Basic usage
export function TransactionHistory() {
  return (
    <div className="flex items-center gap-2">
      <PiReceiptLine />
      <span>Transaction History</span>
    </div>
  );
}

// With custom styling
export function ReceiptButton() {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-100">
      <PiReceiptLine 
        className="text-blue-600 hover:text-blue-800" 
        aria-label="View receipt"
      />
      <span>View Receipt</span>
    </button>
  );
}

// As clickable icon with event handler
export function ReceiptIcon({ onReceiptClick }: { onReceiptClick: () => void }) {
  return (
    <PiReceiptLine
      className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900"
      onClick={onReceiptClick}
      role="button"
      aria-label="Download receipt"
    />
  );
}

// In a list or table context
export function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.amount}</td>
      <td>
        <PiReceiptLine className="w-4 h-4 text-green-600" />
      </td>
    </tr>
  );
}
```

## Functionality

### Key Features:
- **Scalable Vector Graphics**: Renders crisply at any size using SVG format
- **Responsive Sizing**: Uses `1em` dimensions to scale with parent font size
- **Theme Integration**: Uses `currentColor` fill to inherit text color from parent
- **Accessibility Ready**: Accepts ARIA attributes for screen reader support
- **Flexible Styling**: Accepts all standard SVG props for complete customization

### Visual Design:
- Clean outline style receipt icon with paper fold details
- Two-layer design showing receipt body and bottom tear-off section
- Consistent with Phosphor Icons design language
- Optimized 24x24 viewBox for sharp rendering

## State Management
**None** - This is a stateless presentational component. It renders static SVG content and doesn't manage any internal state. Any state management would be handled by parent components that use this icon.

## Side Effects
**None** - This component has no side effects. It performs no API calls, doesn't interact with external services, and doesn't trigger any asynchronous operations. It's a pure rendering component.

## Dependencies

### Internal Dependencies:
- `react` - Uses `SVGProps` type from React for prop typing

### External Dependencies:
- None - This component has no external dependencies beyond React

### Related Components:
- Other Phosphor Icons components in `/components/icons/pi/`
- UI components that might use this icon (buttons, navigation items, etc.)

## Integration

### Application Architecture Role:
- **Icon System**: Part of the centralized icon component library
- **Design System**: Provides consistent visual language across the application
- **Component Composition**: Used as a building block in higher-level components
- **Theme Integration**: Inherits colors and sizing from design system tokens

### Common Integration Patterns:
```tsx
// In navigation menus
<NavItem icon={<PiReceiptLine />} label="Receipts" href="/receipts" />

// In data tables
<ActionButton icon={<PiReceiptLine />} onClick={handleViewReceipt} />

// In status indicators
<StatusBadge icon={<PiReceiptLine />} status="completed" />

// In feature components
<ReceiptViewer 
  receipt={receipt}
  headerIcon={<PiReceiptLine className="w-5 h-5" />}
/>
```

## Best Practices

### Architecture Adherence:
✅ **Server Component**: Correctly implemented as server component for static content  
✅ **Component Decomposition**: Simple, focused component that serves as a reusable building block  
✅ **Prop Interface**: Uses standard React patterns with proper TypeScript typing  
✅ **Reusability**: Located in appropriate `/icons/` directory for shared usage  

### Usage Recommendations:
- **Semantic Usage**: Use specifically for receipt, invoice, or transaction-related contexts
- **Accessibility**: Always provide `aria-label` when used as interactive element
- **Sizing**: Leverage `1em` sizing or use CSS classes for consistent scaling
- **Color**: Rely on `currentColor` for theme consistency, override only when necessary
- **Performance**: Component is lightweight and suitable for repeated use in lists

### Anti-patterns to Avoid:
- Don't add client-side state or effects to this component
- Don't use for non-receipt related contexts (use appropriate semantic icons instead)
- Don't override the viewBox or core SVG structure
- Don't nest this component unnecessarily deep in component hierarchies