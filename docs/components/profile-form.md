# ProfileForm Component

## Purpose

The `ProfileForm` component provides a comprehensive form interface for users to manage their profile information and organization settings. It handles user details such as name, email, country, intended use of the platform, and business information, supporting both personal and organizational account management within the settings section.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Form state management with React Hook Form
- User interactions and form submissions
- Real-time form validation and updates
- Toast notifications for user feedback

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ...props | `HTMLAttributes<HTMLDivElement>` | No | Standard HTML div attributes passed through to the root Block component |

## Usage Example

```tsx
import { ProfileForm } from '@/components/settings/account/profile-form';

export default function AccountSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1>Account Settings</h1>
      <ProfileForm className="mt-6" />
    </div>
  );
}
```

## Functionality

### Core Features
- **Personal Information Management**: First name, last name, email, and home country
- **Email Verification Status**: Visual indicator showing if email is verified
- **Use Case Selection**: Radio group for intended platform usage (Business, Personal, Academic, Journalism)
- **Organization Management**: Business name and role configuration
- **Form Validation**: Required field validation for critical inputs
- **Loading States**: Skeleton loading while fetching user and organization data
- **Error Handling**: Toast notifications for success and error states

### Form Fields
- **Name Fields**: Required first and last name inputs
- **Email**: Disabled field with verification status indicator
- **Country**: Searchable country selection dropdown
- **Usage Type**: Radio button selection for intended use
- **Business Information**: Optional business name and role fields

## State Management

### TanStack Query Integration
- **`useUserDetails()`**: Fetches current user profile data
- **`useCurrentOrganization()`**: Retrieves organization information
- **`useUpdateUserDetails()`**: Handles user profile updates
- **`useUpdateCurrentOrganization()`**: Manages organization updates

### Local State
- **React Hook Form**: Manages form state, validation, and submission
- **Form Reset**: Automatically populates form with fetched data via `useEffect`

## Side Effects

### Data Fetching
- Automatically loads user details and organization data on mount
- Resets form values when data becomes available

### Form Submission
- Parallel API calls to update both user details and organization information
- Success/error toast notifications
- Optimistic UI updates through TanStack Query

### Error Handling
- Custom error handling with `useHandleToastError` hook
- Graceful error recovery without unhandled promise rejections

## Dependencies

### UI Components
- `Block`, `Button`, `TextInput`, `RadioGroup`, `CountrySelect`
- `Label`, `HintText`, `Typography`, `ContentDivider`

### Hooks and Utilities
- `useForm`, `Controller` from React Hook Form
- `useToast`, `useHandleToastError` for user feedback
- TanStack Query hooks for data management

### Icons and Types
- `PiCheckLine`, `PiMailLine` for visual indicators
- `UpdateUserDetailsDto`, `IntendedUseType` for type safety

## Integration

### Application Architecture
- **Settings Flow**: Part of the account settings section
- **Data Layer**: Integrates with user and organization APIs
- **Form Architecture**: Follows React Hook Form patterns with controlled components
- **UI System**: Uses consistent design system components

### Data Flow
1. Component mounts and fetches user/organization data
2. Form resets with fetched data when available
3. User interactions update form state locally
4. Form submission triggers parallel API updates
5. Success/error feedback via toast notifications

## Best Practices

### Architecture Adherence
- ✅ **Client Component Usage**: Appropriately uses client-side rendering for interactive form
- ✅ **Component Decomposition**: Leverages reusable UI components from `/ui/`
- ✅ **State Management**: TanStack Query for server state, React Hook Form for form state
- ✅ **Form Handling**: React Hook Form with proper validation and error handling

### Code Quality
- ✅ **Type Safety**: Proper TypeScript usage with DTOs and type definitions
- ✅ **Error Handling**: Comprehensive error management with user feedback
- ✅ **Loading States**: Skeleton loading for better user experience
- ✅ **Accessibility**: Proper labeling and form structure

### Performance
- ✅ **Efficient Rendering**: Controlled components prevent unnecessary re-renders
- ✅ **Parallel Updates**: Simultaneous user and organization updates
- ✅ **Query Optimization**: TanStack Query handles caching and data synchronization

## Exported Constants

### `intendedUse`
Array of intended use options for the platform:
- Business/Commercial
- Personal Project  
- Academic
- Journalism

Maps to `IntendedUseType` enum values for type safety.