# UpdatePasswordForm Component

## Purpose

The `UpdatePasswordForm` component provides a secure form interface for users to update their account password. It handles current password verification, new password entry with confirmation, validation, and submission to the password update API. This component is part of the account settings section and ensures users can safely change their authentication credentials.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages interactive form state with React Hook Form
- Handles user input events and form submission
- Uses client-side hooks for API mutations and toast notifications
- Requires real-time form validation and error handling

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `HTMLAttributes<HTMLDivElement>` | No | Additional HTML attributes to pass to the root Block component |

## Usage Example

```tsx
import { UpdatePasswordForm } from '@/components/settings/account/update-password-form';

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <h1>Account Settings</h1>
      
      {/* Basic usage */}
      <UpdatePasswordForm />
      
      {/* With additional props */}
      <UpdatePasswordForm 
        className="custom-styling"
        data-testid="password-form"
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Current Password Verification**: Requires users to enter their existing password
- **New Password Entry**: Dual input fields for new password and confirmation
- **Real-time Validation**: Client-side validation using Zod schema
- **Password Matching**: Ensures new password and confirmation match
- **Success Feedback**: Toast notification on successful password update
- **Error Handling**: Comprehensive error display for validation and API errors
- **Loading States**: Visual feedback during form submission

### Form Fields
- **Current Password**: Required field for authentication
- **New Password**: Must meet password schema requirements
- **Repeat New Password**: Confirmation field that must match new password

### Validation Rules
- All fields are required
- Passwords must meet `passwordSchema` requirements (minimum 8 characters, at least one number)
- New password and confirmation must match

## State Management

### TanStack Query Integration
```tsx
// User data fetching
const { data: userData } = useUserDetails();

// Password update mutation
const { mutate: onUpdatePassword, isPending } = useUpdateUserPassword({
  onSuccess: () => {
    toast({ title: 'Your password has been updated.' });
  },
  onError: handleToastError,
});
```

### Local Form State
```tsx
// React Hook Form with Zod validation
const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<UpdatePasswordFormState>({
  mode: 'onTouched',
  resolver: zodResolver(schema),
});
```

## Side Effects

### Form Reset Effect
```tsx
useEffect(() => {
  reset({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
}, [reset]);
```

### API Interactions
- **User Details Query**: Fetches current user data for form context
- **Password Update Mutation**: Submits password change request
- **Toast Notifications**: Success and error feedback
- **Error Handling**: Centralized error processing via `useHandleToastError`

## Dependencies

### UI Components
- `Block` - Container with loading states
- `Button` - Form submission
- `PasswordInput` - Secure password entry
- `HintText` - Error message display
- `Typography` - Text styling

### Hooks & Utilities
- `useForm`, `Controller` from React Hook Form
- `useUpdateUserPassword`, `useUserDetails` - Data mutations and queries
- `useToast`, `useHandleToastError` - User feedback
- `zodResolver` - Form validation integration

### Schema & Types
- `UpdateUserPasswordDto` - API data transfer object
- `passwordSchema` - Password validation rules
- Custom `UpdatePasswordFormState` interface

## Integration

### Settings Architecture
```
settings/
├── account/
│   ├── update-password-form.tsx    ← This component
│   ├── profile-form.tsx
│   └── account-settings.tsx
└── preferences/
```

### Data Flow
1. Component loads user data via `useUserDetails`
2. User fills out password form fields
3. Client-side validation occurs on touch/submit
4. Form submission triggers `useUpdateUserPassword` mutation
5. Success/error feedback displayed via toast system

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriate use of 'use client' for interactive form
- ✅ **Form Management**: React Hook Form with Zod validation
- ✅ **Server State**: TanStack Query for API interactions
- ✅ **Component Decomposition**: Uses UI components from /ui/ directory
- ✅ **Error Handling**: Centralized error handling patterns

### Security Considerations
- Password fields use `PasswordInput` component for secure entry
- Current password verification required
- Form data properly sanitized before API submission
- No password values exposed in component state unnecessarily

### User Experience
- Loading states during form submission
- Clear validation error messages
- Success feedback via toast notifications
- Responsive grid layout for form fields
- Accessible form structure with proper labeling