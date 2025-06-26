# CreateApiKeyDialog Component

## Purpose

The `CreateApiKeyDialog` component provides a modal interface for creating new API keys in the developers section. It handles the complete API key creation workflow, from form submission to securely displaying the generated key token with appropriate warnings about key storage and security.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive form handling with React Hook Form
- Local state management for dialog visibility and created key data
- Event handlers for user interactions
- Toast notifications for user feedback

## Props Interface

This component accepts no props. It manages its own state through Zustand store integration.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| N/A | N/A | N/A | Component uses Zustand store for state management |

## Usage Example

```tsx
import { CreateApiKeyDialog } from '@/components/developers/api-keys/create-api-key-dialog';
import { useApiKeysStore } from '@/lib/contexts';

export function ApiKeysManagement() {
  const setIsOpenCreate = useApiKeysStore((state) => state.setIsOpenCreate);

  return (
    <div>
      <button onClick={() => setIsOpenCreate(true)}>
        Create New API Key
      </button>
      
      {/* Dialog will automatically render when store state changes */}
      <CreateApiKeyDialog />
    </div>
  );
}
```

## Functionality

### Core Features
- **Two-phase UI**: Form for key creation, then secure key display
- **Form validation**: Zod schema validation with 50-character name limit
- **Default naming**: Automatically uses "New key" if no name provided
- **Secure key display**: One-time display with security warnings
- **Documentation integration**: Links to authentication docs after creation
- **Toast notifications**: Success and error feedback
- **Auto-focus**: Form input focuses automatically for better UX

### User Workflow
1. User opens dialog to create API key
2. User enters optional name (or uses default)
3. User submits form to create key
4. Dialog switches to display mode showing the generated token
5. User copies key and closes dialog

### Security Features
- One-time key display with explicit security warnings
- Clear messaging about key storage responsibility
- Automatic form reset after successful creation

## State Management

### Zustand Store Integration
```tsx
const isOpenCreate = useApiKeysStore((state) => state.isOpenCreate);
const setIsOpenCreate = useApiKeysStore((state) => state.setIsOpenCreate);
```

### Local State
- `addedKey`: Stores the created API key with token for display
- Form state managed by React Hook Form with Zod validation

### State Transitions
- Dialog visibility controlled by Zustand store
- Created key state managed locally with cleanup on close
- Form state persists during creation, resets after success

## Side Effects

### API Interactions
- **Create API Key**: Uses `useCreateApiKey` mutation hook
- **Success handling**: Updates local state and shows toast
- **Error handling**: Displays error toast with details

### UI Side Effects
- Toast notifications for user feedback
- Delayed form reset (2 seconds after success)
- Delayed state cleanup (300ms after close for smooth animation)
- Auto-focus on name input when dialog opens

## Dependencies

### Core Dependencies
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for form data
- **@hookform/resolvers/zod**: Integration between RHF and Zod

### UI Components
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter`
- `Button`, `LinkButton`, `TextInput`, `Typography`
- `PiKey2Line`, `PiArrowRightUpLine` icons

### Custom Hooks & Services
- `useApiKeysStore`: Zustand store for dialog state
- `useCreateApiKey`: TanStack Query mutation hook
- `useToast`: Toast notification system

### Feature Components
- `ApiEndpointGetUrl`: Displays the API key token securely

## Integration

### Application Architecture
- **Domain Organization**: Located in `/developers/api-keys/` following domain-based structure
- **Store Integration**: Connects to global API keys management state
- **Query Integration**: Uses centralized API key mutation hooks
- **Toast System**: Integrates with application-wide notification system

### Data Flow
1. Dialog state managed in Zustand store
2. Form submission triggers TanStack Query mutation
3. Success updates local component state
4. Error/success feedback through toast system
5. Dialog close triggers state cleanup

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Correctly uses client component for interactive features
- ✅ **State Management Pattern**: Zustand for global state, local state for component-specific data
- ✅ **Form Handling**: React Hook Form with Zod validation following established patterns
- ✅ **Domain Organization**: Component placed in appropriate domain directory

### Code Quality
- ✅ **Error Handling**: Comprehensive error handling with user feedback
- ✅ **Accessibility**: Proper dialog semantics and keyboard navigation
- ✅ **Security Awareness**: Clear messaging about API key security
- ✅ **User Experience**: Smooth animations, auto-focus, and clear workflow

### Integration Standards
- ✅ **Hook Usage**: Proper use of custom hooks for API calls and state management
- ✅ **Component Composition**: Good separation between UI and business logic
- ✅ **Type Safety**: Full TypeScript integration with proper typing

## Exported Constants

```tsx
// Authentication documentation URL
export const AUTHENTICATION_DOCS: string

// Default name for new API keys
export const DEFAULT_API_KEY_NAME: string

// Zod schema for form validation
export const folderSchema: z.ZodObject
```