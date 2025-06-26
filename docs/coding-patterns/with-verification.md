# With-Verification Pattern Documentation

## Pattern Overview

The **With-Verification** pattern is a React authentication gate that conditionally renders content based on user verification status. This pattern implements a higher-order component (HOC) approach to protect routes and components, ensuring only verified users can access certain content while providing a user-friendly verification flow for unverified users.

### When to Use
- Protecting routes that require email verification
- Gating premium features behind verification status
- Implementing progressive authentication flows
- Creating conditional content rendering based on verification state

## Architecture

The pattern consists of two main components working in tandem:

```
WithVerification (HOC)
├── Authentication Check
├── Loading State Management
└── Conditional Rendering
    ├── Verified: Render children
    ├── Unverified: Render Verification component
    └── Loading: Render empty state

Verification (UI Component)
├── User Feedback Interface
├── Resend Email Action
└── Success State Display
```

### Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| `WithVerification` | Authentication logic, conditional rendering, loading states |
| `Verification` | User interface for verification flow, email resend functionality |

## Implementation Details

### Key Implementation Techniques

1. **Conditional Rendering Strategy**
   ```tsx
   return isAuthorizedAndVerified ? (
     children
   ) : !isLoading ? (
     <Verification />
   ) : (
     <></>
   );
   ```

2. **State-Driven UI Updates**
   ```tsx
   {isSuccess ? (
     <Typography variant='paragraphMedium' as='p'>
       Click the link in the email we just sent to finish account setup.
     </Typography>
   ) : (
     <Button
       disabled={isPending}
       size='xl'
       onClick={() => onResendEmailVerification({})}
     >
       Resend verification email
     </Button>
   )}
   ```

3. **Extensible Styling System**
   ```tsx
   className={cn(
     'mx-auto flex max-w-[500px] flex-col items-center text-center',
     className
   )}
   ```

## Usage Examples

### Basic Route Protection

```tsx
import { WithVerification } from '@/components/authentication/with-verification';

export default function ProtectedPage() {
  return (
    <WithVerification>
      <div>
        <h1>Protected Content</h1>
        <p>This content is only visible to verified users.</p>
      </div>
    </WithVerification>
  );
}
```

### Protecting Multiple Components

```tsx
function Dashboard() {
  return (
    <WithVerification>
      <Header />
      <MainContent />
      <Footer />
    </WithVerification>
  );
}
```

### Custom Verification Component

```tsx
import { Verification } from '@/components/authentication/with-verification';

function CustomVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Verification className="pt-20" />
    </div>
  );
}
```

### Nested Protection

```tsx
function App() {
  return (
    <WithAuthentication>
      <WithVerification>
        <VerifiedUserDashboard />
      </WithVerification>
    </WithAuthentication>
  );
}
```

## Best Practices

### 1. Component Composition
```tsx
// ✅ Good: Clean composition
<WithVerification>
  <DashboardContent />
</WithVerification>

// ❌ Avoid: Logic mixing
<WithVerification>
  {someCondition && <ConditionalContent />}
</WithVerification>
```

### 2. Loading State Management
```tsx
// ✅ Good: Explicit loading handling
const { isLoading, isAuthorizedAndVerified } = useAccessToken();
return isAuthorizedAndVerified ? children : !isLoading ? <Verification /> : <></>;
```

### 3. Error Boundary Integration
```tsx
function ProtectedRoute() {
  return (
    <ErrorBoundary>
      <WithVerification>
        <RouteContent />
      </WithVerification>
    </ErrorBoundary>
  );
}
```

### 4. Accessibility Considerations
```tsx
<Block
  role="main"
  aria-live="polite"
  className={cn('mx-auto flex max-w-[500px] flex-col items-center text-center', className)}
>
  <Typography variant='titleH4' as='h1'>
    To unlock this page please verify your account
  </Typography>
</Block>
```

## Integration

### Required Dependencies

```tsx
// Context providers
import { useAccessToken } from '@/lib/contexts';

// Query hooks
import { useResendEmailVerification } from '@/lib/query-hooks';

// UI components
import { Block } from '@/components/ui/block';
import { Button } from '@/components/ui/button';
import { ContentDivider } from '@/components/ui/content-divider';
import { Typography } from '@/components/ui/typography';

// Utilities
import { cn } from '@/lib/utils/cn';
```

### Provider Setup

```tsx
// App.tsx or layout.tsx
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessTokenProvider>
        <Routes />
      </AccessTokenProvider>
    </QueryClientProvider>
  );
}
```

### Hook Requirements

The pattern expects specific hook contracts:

```tsx
// useAccessToken contract
interface AccessTokenHook {
  isLoading: boolean;
  isAuthorizedAndVerified: boolean;
}

// useResendEmailVerification contract
interface ResendEmailHook {
  mutate: (params: {}) => void;
  isPending: boolean;
  isSuccess: boolean;
}
```

## Type Safety

### Component Type Definitions

```tsx
interface VerificationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface WithVerificationProps {
  children: ReactNode;
}
```

### Generic Wrapper Extension

```tsx
// Extended version with custom verification component
interface WithVerificationProps<T = {}> {
  children: ReactNode;
  verificationComponent?: FC<T>;
  verificationProps?: T;
}

export const WithVerification = <T,>({
  children,
  verificationComponent: VerificationComponent = Verification,
  verificationProps,
}: WithVerificationProps<T>) => {
  const { isLoading, isAuthorizedAndVerified } = useAccessToken();
  
  return isAuthorizedAndVerified ? (
    children
  ) : !isLoading ? (
    <VerificationComponent {...(verificationProps as T)} />
  ) : (
    <></>
  );
};
```

### Type Guards

```tsx
function isVerifiedUser(user: User): user is VerifiedUser {
  return user.emailVerified === true;
}
```

## Performance

### Optimization Strategies

1. **Memoization of Verification Component**
```tsx
const MemoizedVerification = React.memo(Verification);

export const WithVerification: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading, isAuthorizedAndVerified } = useAccessToken();
  
  return isAuthorizedAndVerified ? (
    children
  ) : !isLoading ? (
    <MemoizedVerification />
  ) : null;
};
```

2. **Lazy Loading Protected Content**
```tsx
const LazyProtectedContent = lazy(() => import('./ProtectedContent'));

function ProtectedRoute() {
  return (
    <WithVerification>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyProtectedContent />
      </Suspense>
    </WithVerification>
  );
}
```

3. **Query Optimization**
```tsx
// Pre-fetch verification status
const { data } = useQuery({
  queryKey: ['verification-status'],
  queryFn: fetchVerificationStatus,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Bundle Size Considerations

- Components are tree-shakeable
- UI dependencies are imported individually
- Client-side only (`'use client'` directive)

## Testing

### Unit Testing Strategy

```tsx
// with-verification.test.tsx
import { render, screen } from '@testing-library/react';
import { WithVerification, Verification } from './with-verification';

// Mock dependencies
jest.mock('@/lib/contexts', () => ({
  useAccessToken: jest.fn(),
}));

jest.mock('@/lib/query-hooks', () => ({
  useResendEmailVerification: jest.fn(),
}));

describe('WithVerification', () => {
  it('renders children when user is verified', () => {
    (useAccessToken as jest.Mock).mockReturnValue({
      isLoading: false,
      isAuthorizedAndVerified: true,
    });

    render(
      <WithVerification>
        <div data-testid="protected-content">Protected Content</div>
      </WithVerification>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('renders verification component when user is not verified', () => {
    (useAccessToken as jest.Mock).mockReturnValue({
      isLoading: false,
      isAuthorizedAndVerified: false,
    });

    render(
      <WithVerification>
        <div>Protected Content</div>
      </WithVerification>
    );

    expect(screen.getByText(/verify your account/i)).toBeInTheDocument();
  });

  it('renders nothing when loading', () => {
    (useAccessToken as jest.Mock).mockReturnValue({
      isLoading: true,
      isAuthorizedAndVerified: false,
    });

    const { container } = render(
      <WithVerification>
        <div>Protected Content</div>
      </WithVerification>
    );

    expect(container.firstChild).toBeNull();
  });
});
```

### Integration Testing

```tsx
// verification-flow.test.tsx
import { renderWithProviders } from '@/test-utils';
import userEvent from '@testing-library/user-event';

describe('Verification Flow', () => {
  it('sends verification email when button is clicked', async () => {
    const mockMutate = jest.fn();
    (useResendEmailVerification as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
    });

    renderWithProviders(<Verification />);
    
    const resendButton = screen.getByText(/resend verification email/i);
    await userEvent.click(resendButton);

    expect(mockMutate).toHaveBeenCalledWith({});
  });
});
```

### E2E Testing

```tsx
// verification.e2e.test.ts
describe('Verification Flow', () => {
  it('should redirect unverified users to verification page', () => {
    cy.loginAsUnverifiedUser();
    cy.visit('/protected-route');
    cy.contains('verify your account').should('be.visible');
    cy.get('[data-testid="resend-button"]').click();
    cy.contains('email we just sent').should('be.visible');
  });
});
```

## Common Pitfalls

### 1. Infinite Loading States

**Problem:**
```tsx
// ❌ Can cause infinite loading
const { isLoading } = useAccessToken();
if (isLoading) return <Spinner />;
```

**Solution:**
```tsx
// ✅ Proper loading state handling
const { isLoading, isAuthorizedAndVerified } = useAccessToken();
return isAuthorizedAndVerified ? children : !isLoading ? <Verification /> : <></>;
```

### 2. Missing Error Boundaries

**Problem:**
```tsx
// ❌ No error handling
<WithVerification>
  <ComponentThatMightError />
</WithVerification>
```

**Solution:**
```tsx
// ✅ Wrapped with error boundary
<ErrorBoundary fallback={<ErrorFallback />}>
  <WithVerification>
    <ComponentThatMightError />
  </WithVerification>
</ErrorBoundary>
```

### 3. Authentication vs Verification Confusion

**Problem:**
```tsx
// ❌ Wrong hook usage
const { isAuthenticated } = useAuth(); // Only checks auth, not verification
```

**Solution:**
```tsx
// ✅ Correct hook usage
const { isAuthorizedAndVerified } = useAccessToken(); // Checks both
```

### 4. Improper Nesting

**Problem:**
```tsx
// ❌ Verification inside authentication
<WithAuthentication>
  <SomeComponent>
    <WithVerification>
      <ProtectedContent />
    </WithVerification>
  </SomeComponent>
</WithAuthentication>
```

**Solution:**
```tsx
// ✅ Proper nesting order
<WithAuthentication>
  <WithVerification>
    <SomeComponent>
      <ProtectedContent />
    </SomeComponent>
  </WithVerification>
</WithAuthentication>
```

### 5. State Synchronization Issues

**Problem:**
```tsx
// ❌ Stale verification state
const [isVerified, setIsVerified] = useState(false);
// State might be out of sync with server
```

**Solution:**
```tsx
// ✅ Server-synchronized state
const { isAuthorizedAndVerified } = useAccessToken();
// Always reflects server state
```