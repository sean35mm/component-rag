# CopySignalToMyAccount Component

## Purpose

The `CopySignalToMyAccount` component serves as a call-to-action interface for unauthenticated users viewing signal previews. It encourages users to create an account to access personalized signals and alerts by presenting compelling messaging and a prominent action button that redirects to a specified registration or login flow.

## Component Type

**Server Component** - This component is implemented as a server component since it only renders static content with a client-side navigation link. It doesn't require any client-side state, event handlers, or browser APIs, making it suitable for server-side rendering to improve initial page load performance.

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `redirectTo` | `string` | Yes | The URL path where users will be redirected when clicking the action button, typically pointing to registration or login pages |

## Usage Example

```tsx
import { CopySignalToMyAccount } from '@/components/signals/preview/copy-signal-to-my-account';

export function SignalPreviewPage() {
  return (
    <div className="signal-preview-container">
      {/* Signal preview content */}
      <div className="signal-content">
        {/* Preview signal data */}
      </div>
      
      {/* Call-to-action for unauthenticated users */}
      <CopySignalToMyAccount 
        redirectTo="/auth/register?intent=copy-signal&signalId=abc123" 
      />
    </div>
  );
}

// In a signal preview modal or overlay
export function SignalPreviewModal({ signalId }: { signalId: string }) {
  const redirectUrl = `/auth/login?redirect=/signals/${signalId}`;
  
  return (
    <Modal>
      <div className="modal-content">
        <CopySignalToMyAccount redirectTo={redirectUrl} />
      </div>
    </Modal>
  );
}
```

## Functionality

- **Responsive Messaging**: Displays different layouts for desktop (lg:) and mobile screens with appropriate typography scaling
- **Value Proposition**: Presents clear benefits of creating an account with industry-specific signal alerts
- **Visual Hierarchy**: Uses typography variants and colors to create an effective information hierarchy
- **Action-Oriented Design**: Features a prominent call-to-action button with an eye-catching icon
- **Flexible Routing**: Accepts any redirect URL to support various authentication flows and post-signup destinations

## State Management

**No State Management Required** - This component is purely presentational and stateless. It receives a redirect URL as a prop and renders static content without managing any local or global state.

## Side Effects

**Navigation Only** - The component's only side effect is client-side navigation through Next.js Link component when users click the action button. No API calls, data fetching, or other external interactions are performed.

## Dependencies

### UI Components
- `Button` - Provides the styled action button with primary filled variant
- `Typography` - Handles text rendering with consistent styling and variants

### External Libraries
- `NextLink` - Next.js navigation component for client-side routing
- `PiShiningFill` - Icon component for visual enhancement of the action button

### Styling
- Tailwind CSS classes for responsive layout, spacing, and visual styling

## Integration

This component fits into the signals preview architecture as a user conversion tool:

- **Authentication Flow**: Integrates with the app's authentication system by redirecting to login/registration pages
- **Signal Management**: Part of the broader signals feature domain, specifically handling preview scenarios
- **User Onboarding**: Serves as an entry point for user acquisition and account creation
- **Responsive Design**: Follows the application's responsive design patterns with mobile-first approach

The component is typically used in:
- Signal preview pages for unauthenticated users
- Modal overlays showing signal teasers
- Landing pages promoting signal features
- Paywall or access restriction interfaces

## Best Practices

✅ **Follows Architecture Guidelines**:
- **Server Component**: Correctly implemented as server component since no client-side interactivity is needed
- **Component Decomposition**: Simple, focused component with single responsibility
- **UI Component Usage**: Leverages shared UI components (Button, Typography) for consistency
- **Domain Organization**: Properly placed in signals feature directory structure

✅ **Design Patterns**:
- **Responsive Design**: Implements mobile-first responsive patterns with appropriate breakpoints
- **Accessibility**: Uses semantic HTML structure and proper typography hierarchy
- **Performance**: Server-rendered for optimal initial load performance
- **Maintainability**: Clean prop interface with clear, typed parameters

✅ **Integration Best Practices**:
- **Flexible Routing**: Accepts redirect URLs as props rather than hardcoding destinations
- **Separation of Concerns**: Focuses only on presentation, leaving routing logic to parent components
- **Consistent Styling**: Uses established design system components and utility classes