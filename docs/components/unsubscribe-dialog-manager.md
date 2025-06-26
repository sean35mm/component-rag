# UnsubscribeDialogManager

## Purpose

The `UnsubscribeDialogManager` is a URL parameter-driven component that automatically opens an unsubscribe dialog when specific query parameters are present in the URL. It serves as a bridge between URL-based unsubscribe links (typically from emails) and the unsubscribe dialog interface, enabling users to unsubscribe from signals directly from email links.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Relies on browser-specific hooks (`useSearchParams` from Next.js navigation)
- Manages local state with `useState`
- Performs side effects with `useEffect` that depend on URL parameters

## Props Interface

This component accepts no props - it operates entirely based on URL search parameters.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | No props accepted |

**Expected URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `unsubscribe` | flag | Yes | Presence indicates unsubscribe intent |
| `email` | string | Yes | Email address to unsubscribe |
| `signalId` | string | Yes | UUID of the signal to unsubscribe from |
| `contactPointId` | string | Yes | UUID of the contact point |

## Usage Example

```tsx
// In a layout or page component
import { UnsubscribeDialogManager } from '@/components/signals/verification/unsubscribe-dialog-manager';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        {/* Place at root level to handle unsubscribe URLs app-wide */}
        <UnsubscribeDialogManager />
      </body>
    </html>
  );
}

// Expected URL format that triggers the dialog:
// https://app.example.com/dashboard?unsubscribe&email=user@example.com&signalId=123e4567-e89b-12d3-a456-426614174000&contactPointId=987fcdeb-51a2-43d1-b789-123456789abc
```

## Functionality

### Core Features
- **URL Parameter Detection**: Monitors URL search parameters for unsubscribe-related data
- **Automatic Dialog Triggering**: Opens unsubscribe dialog when all required parameters are present
- **Parameter Validation**: Ensures all necessary parameters exist before showing dialog
- **State Management**: Controls dialog open/close state

### Behavior
1. Continuously monitors URL search parameters via `useSearchParams`
2. Validates presence of required parameters: `unsubscribe` flag, `email`, `signalId`, `contactPointId`
3. Opens unsubscribe dialog when all parameters are valid
4. Passes extracted parameters to the `UnsubscribeDialog` component
5. Handles dialog state changes through the `onOpenChange` callback

## State Management

**Local State (useState)**:
- `isUnsubscribeDialogOpen`: Boolean flag controlling dialog visibility

The component uses local state rather than global state management since:
- State is component-specific and doesn't need sharing
- Follows the principle of keeping state close to where it's used
- URL parameters serve as the source of truth for triggering behavior

## Side Effects

**useEffect Dependencies**: `[searchParams]`
- **Parameter Monitoring**: Reacts to URL search parameter changes
- **Validation Logic**: Checks for presence and validity of required unsubscribe parameters
- **State Updates**: Updates dialog open state based on parameter validation

No direct API calls are made in this component - it delegates data operations to the `UnsubscribeDialog` component.

## Dependencies

### Components
- `UnsubscribeDialog`: The actual dialog component that handles the unsubscribe process

### Hooks
- `useSearchParams` (Next.js): Accesses URL search parameters
- `useState` (React): Manages dialog open state
- `useEffect` (React): Handles parameter monitoring and validation

### External Dependencies
- Next.js navigation system for URL parameter access

## Integration

### Application Architecture Role
- **Entry Point**: Serves as the entry point for email-based unsubscribe flows
- **URL Handler**: Translates URL parameters into component interactions
- **Dialog Orchestrator**: Manages the lifecycle of the unsubscribe dialog

### Placement Strategy
Should be placed at a high level in the component tree (layout or root page) to ensure it can handle unsubscribe URLs regardless of the current page context.

### Data Flow
```
Email Link → URL Parameters → UnsubscribeDialogManager → UnsubscribeDialog → Unsubscribe API
```

## Best Practices

### Architecture Adherence
✅ **Proper Client Component Usage**: Uses `'use client'` only when necessary for browser APIs  
✅ **Component Decomposition**: Delegates actual unsubscribe logic to specialized `UnsubscribeDialog`  
✅ **Separation of Concerns**: Focuses solely on URL parameter management  
✅ **State Locality**: Keeps state management local and simple  

### Implementation Patterns
✅ **URL-Driven UX**: Enables direct deep-linking to functionality  
✅ **Parameter Validation**: Ensures all required data is present before acting  
✅ **Graceful Handling**: Safely handles missing or invalid parameters  
✅ **Clean Delegation**: Passes responsibility to appropriate child components  

### Integration Guidelines
- Place in layout components for app-wide coverage
- Ensure URL parameter names match email template expectations
- Consider adding loading states for better UX
- Monitor for parameter changes to handle navigation scenarios