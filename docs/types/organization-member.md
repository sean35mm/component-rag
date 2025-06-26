# OrganizationMember Type Documentation

## Purpose

The `OrganizationMember` type represents the relationship between a user and an organization within the application. It defines the core domain object for organization membership, including role-based access control through hierarchical permission levels. This type serves as the foundation for authorization, user management, and organizational structure features.

## Type Definition

```tsx
import { Organization } from './organization';

const enum OrganizationMemberRole {
  VIEWER = 'VIEWER',
  USER = 'USER', 
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export interface OrganizationMember {
  id: number;
  createdAt: string;
  updatedAt: string;
  role: OrganizationMemberRole;
  organization: Organization;
}
```

### Enum Structure

**OrganizationMemberRole** - Defines hierarchical permission levels:
- `VIEWER`: Read-only access to organization resources
- `USER`: Standard member with basic permissions
- `ADMIN`: Administrative privileges within the organization
- `OWNER`: Full control and ownership of the organization

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique identifier for the membership record |
| `createdAt` | `string` | ✅ | ISO timestamp when membership was created |
| `updatedAt` | `string` | ✅ | ISO timestamp when membership was last modified |
| `role` | `OrganizationMemberRole` | ✅ | Member's permission level within the organization |
| `organization` | `Organization` | ✅ | Complete organization object this membership belongs to |

## Usage Examples

### Basic Component Usage

```tsx
import { OrganizationMember, OrganizationMemberRole } from '@/lib/types/organization-member';

interface MemberCardProps {
  member: OrganizationMember;
  onRoleChange: (memberId: number, newRole: OrganizationMemberRole) => void;
}

export function MemberCard({ member, onRoleChange }: MemberCardProps) {
  const canEditRole = member.role !== OrganizationMemberRole.OWNER;
  
  return (
    <div className="member-card">
      <h3>{member.organization.name}</h3>
      <p>Role: {member.role}</p>
      <p>Member since: {new Date(member.createdAt).toLocaleDateString()}</p>
      
      {canEditRole && (
        <select 
          value={member.role}
          onChange={(e) => onRoleChange(member.id, e.target.value as OrganizationMemberRole)}
        >
          {Object.values(OrganizationMemberRole).map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      )}
    </div>
  );
}
```

### Service Layer Implementation

```tsx
import { OrganizationMember, OrganizationMemberRole } from '@/lib/types/organization-member';

class OrganizationMemberService {
  async getMembersByOrganization(orgId: number): Promise<OrganizationMember[]> {
    const response = await fetch(`/api/organizations/${orgId}/members`);
    return response.json();
  }

  async updateMemberRole(
    memberId: number, 
    newRole: OrganizationMemberRole
  ): Promise<OrganizationMember> {
    const response = await fetch(`/api/members/${memberId}`, {
      method: 'PATCH',
      body: JSON.stringify({ role: newRole }),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }

  hasPermission(
    member: OrganizationMember, 
    requiredRole: OrganizationMemberRole
  ): boolean {
    const roleHierarchy = {
      [OrganizationMemberRole.VIEWER]: 1,
      [OrganizationMemberRole.USER]: 2,
      [OrganizationMemberRole.ADMIN]: 3,
      [OrganizationMemberRole.OWNER]: 4,
    };
    
    return roleHierarchy[member.role] >= roleHierarchy[requiredRole];
  }
}
```

### Permission Guard Hook

```tsx
import { OrganizationMember, OrganizationMemberRole } from '@/lib/types/organization-member';

export function usePermissions(member: OrganizationMember | null) {
  const canManageMembers = member?.role === OrganizationMemberRole.ADMIN || 
                          member?.role === OrganizationMemberRole.OWNER;
  
  const canEditOrganization = member?.role === OrganizationMemberRole.OWNER;
  
  const canViewAnalytics = member && 
    [OrganizationMemberRole.ADMIN, OrganizationMemberRole.OWNER].includes(member.role);

  return {
    canManageMembers,
    canEditOrganization,
    canViewAnalytics,
    isOwner: member?.role === OrganizationMemberRole.OWNER,
  };
}
```

## Type Architecture Pattern

This type follows our domain-first architecture pattern:

### 1. Domain Object (Current)
```tsx
// Core domain representation
export interface OrganizationMember {
  id: number;
  createdAt: string;
  updatedAt: string;
  role: OrganizationMemberRole;
  organization: Organization;
}
```

### 2. Response Types (Derived)
```tsx
// API response variations
export interface OrganizationMemberListResponse {
  members: OrganizationMember[];
  total: number;
  page: number;
}

export interface OrganizationMemberWithUser extends OrganizationMember {
  user: {
    id: number;
    email: string;
    name: string;
    avatar?: string;
  };
}
```

### 3. Request Types (Derived)
```tsx
// API request payloads
export interface CreateMemberRequest {
  organizationId: number;
  userEmail: string;
  role: OrganizationMemberRole;
}

export interface UpdateMemberRequest extends Partial<Pick<OrganizationMember, 'role'>> {}
```

## Related Types

### Extending Types
```tsx
// Lightweight version without full organization object
export interface OrganizationMemberSummary extends Omit<OrganizationMember, 'organization'> {
  organizationId: number;
  organizationName: string;
}

// For invitation workflows
export interface PendingOrganizationMember extends Omit<OrganizationMember, 'id' | 'createdAt' | 'updatedAt'> {
  invitationToken: string;
  expiresAt: string;
}
```

### Composition Types
```tsx
export interface UserWithMemberships {
  id: number;
  email: string;
  name: string;
  memberships: OrganizationMember[];
}
```

## Integration Points

### Components
- `MemberManagementTable` - Display and manage organization members
- `RoleSelector` - Role assignment interface
- `MemberInviteModal` - New member invitation workflow
- `PermissionGuard` - Conditional rendering based on member permissions

### Services
- `OrganizationMemberService` - CRUD operations for memberships
- `AuthorizationService` - Permission checking and validation
- `InvitationService` - Member invitation workflows

### State Management
- `useMembersQuery` - React Query hook for fetching members
- `useMemberMutations` - Mutations for member operations
- `useCurrentMember` - Current user's membership context

## Validation

### Zod Schema
```tsx
import { z } from 'zod';

export const OrganizationMemberRoleSchema = z.enum([
  'VIEWER',
  'USER', 
  'ADMIN',
  'OWNER'
]);

export const OrganizationMemberSchema = z.object({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  role: OrganizationMemberRoleSchema,
  organization: z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    // ... other organization fields
  }),
});

export const CreateMemberRequestSchema = z.object({
  organizationId: z.number().positive(),
  userEmail: z.string().email(),
  role: OrganizationMemberRoleSchema,
});
```

### Runtime Validation
```tsx
export function validateMemberRole(role: string): role is OrganizationMemberRole {
  return Object.values(OrganizationMemberRole).includes(role as OrganizationMemberRole);
}

export function validateRoleTransition(
  currentRole: OrganizationMemberRole,
  newRole: OrganizationMemberRole,
  requestorRole: OrganizationMemberRole
): boolean {
  // Owners cannot be demoted except by themselves
  if (currentRole === OrganizationMemberRole.OWNER && 
      requestorRole !== OrganizationMemberRole.OWNER) {
    return false;
  }
  
  // Only owners can promote to admin or owner
  if ([OrganizationMemberRole.ADMIN, OrganizationMemberRole.OWNER].includes(newRole) &&
      requestorRole !== OrganizationMemberRole.OWNER) {
    return false;
  }
  
  return true;
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: Uses const enum for role values, avoiding any types
2. **Interfaces over Types**: Uses interface for the main object shape
3. **Enum Usage**: OrganizationMemberRole enum is reusable across member management features
4. **Domain-First**: Starts with core domain object, enables derived types

### ✅ Recommended Patterns

```tsx
// Use utility types for variations
type EditableMemberFields = Pick<OrganizationMember, 'role'>;
type MemberTimestamps = Pick<OrganizationMember, 'createdAt' | 'updatedAt'>;

// Compose with other domain objects
interface MembershipContext {
  member: OrganizationMember;
  permissions: string[];
  lastActivity: string;
}

// Use discriminated unions for different states
type MembershipState = 
  | { status: 'active'; member: OrganizationMember }
  | { status: 'pending'; invitation: PendingOrganizationMember }
  | { status: 'revoked'; revokedAt: string };
```

### ✅ Type Safety Patterns

```tsx
// Type-safe role checking
function requireRole<T extends OrganizationMemberRole>(
  member: OrganizationMember,
  role: T
): member is OrganizationMember & { role: T } {
  return member.role === role;
}

// Usage
if (requireRole(member, OrganizationMemberRole.ADMIN)) {
  // TypeScript knows member.role is 'ADMIN'
  performAdminAction();
}
```

This type definition serves as a robust foundation for organization membership management, providing type safety, clear role hierarchies, and extensibility for complex authorization scenarios.