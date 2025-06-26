# OrganizationIntent Type Documentation

## Purpose

The `OrganizationIntent` interface represents the structured data required to express an organization's intention to register or be created within the system. This type serves as a domain object that captures the essential information needed before an organization entity is formally established, acting as a precursor to the full organization registration process.

## Type Definition

```typescript
export interface OrganizationIntent {
  secret: string;
  name: string;
  email: string;
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `secret` | `string` | ✅ | A secure token or identifier used for authentication and verification purposes during the organization creation process |
| `name` | `string` | ✅ | The intended name of the organization to be created |
| `email` | `string` | ✅ | The primary email address associated with the organization intent, likely used for verification and communication |

## Usage Examples

### Basic Usage in Components

```typescript
import { OrganizationIntent } from '@/lib/types/organization-intent';

// Component props with organization intent
interface OrganizationSetupProps {
  intent: OrganizationIntent;
  onSubmit: (intent: OrganizationIntent) => Promise<void>;
}

const OrganizationSetup: React.FC<OrganizationSetupProps> = ({ intent, onSubmit }) => {
  const handleSubmit = async () => {
    await onSubmit(intent);
  };

  return (
    <div>
      <h2>Setting up: {intent.name}</h2>
      <p>Email: {intent.email}</p>
      <button onClick={handleSubmit}>Complete Setup</button>
    </div>
  );
};
```

### Service Layer Integration

```typescript
import { OrganizationIntent } from '@/lib/types/organization-intent';

class OrganizationIntentService {
  async validateIntent(intent: OrganizationIntent): Promise<boolean> {
    // Validate the intent using the secret
    return this.verifySecret(intent.secret) && 
           this.validateEmail(intent.email) && 
           this.checkNameAvailability(intent.name);
  }

  async createOrganizationFromIntent(intent: OrganizationIntent): Promise<Organization> {
    const validIntent = await this.validateIntent(intent);
    if (!validIntent) {
      throw new Error('Invalid organization intent');
    }

    return this.organizationService.create({
      name: intent.name,
      email: intent.email,
      // Additional properties would be added here
    });
  }
}
```

### Utility Type Applications

```typescript
import { OrganizationIntent } from '@/lib/types/organization-intent';

// Partial intent for form updates
type PartialOrganizationIntent = Partial<OrganizationIntent>;

// Intent without secret for public display
type PublicOrganizationIntent = Omit<OrganizationIntent, 'secret'>;

// Form data type
interface OrganizationIntentForm extends Pick<OrganizationIntent, 'name' | 'email'> {
  confirmEmail: string;
  termsAccepted: boolean;
}

// API response type
interface OrganizationIntentResponse {
  intent: PublicOrganizationIntent;
  status: 'pending' | 'verified' | 'expired';
  expiresAt: string;
}
```

## Type Architecture Pattern

Following our domain-first architecture pattern:

```typescript
// 1. Domain Object (Current)
interface OrganizationIntent {
  secret: string;
  name: string;
  email: string;
}

// 2. Response Types
interface OrganizationIntentApiResponse {
  data: OrganizationIntent;
  metadata: {
    createdAt: string;
    expiresAt: string;
    status: 'active' | 'expired' | 'used';
  };
}

interface OrganizationIntentListResponse {
  intents: OrganizationIntent[];
  pagination: PaginationMetadata;
}

// 3. Request Types
interface CreateOrganizationIntentRequest {
  name: string;
  email: string;
}

interface ValidateOrganizationIntentRequest {
  secret: string;
}

interface ProcessOrganizationIntentRequest extends OrganizationIntent {
  additionalData?: Record<string, unknown>;
}
```

## Related Types

```typescript
// Extended organization types that build upon the intent
interface Organization extends Omit<OrganizationIntent, 'secret'> {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'suspended' | 'pending';
}

// Invitation system integration
interface OrganizationInvitation {
  intent: OrganizationIntent;
  invitedBy: string;
  role: OrganizationRole;
  expiresAt: string;
}

// Audit trail
interface OrganizationIntentAudit {
  intentSecret: string;
  action: 'created' | 'validated' | 'processed' | 'expired';
  timestamp: string;
  metadata?: Record<string, unknown>;
}
```

## Integration Points

### Services
- **OrganizationIntentService**: Primary service for managing organization intents
- **EmailService**: Sends verification emails using the intent email
- **AuthService**: Validates secrets and manages intent-based authentication

### Components
- **OrganizationSetupWizard**: Multi-step form consuming organization intent
- **IntentVerificationModal**: Validates intent secrets
- **OrganizationPreview**: Displays intent information before confirmation

### API Endpoints
- `POST /api/organization-intents` - Create new intent
- `GET /api/organization-intents/:secret` - Retrieve intent by secret
- `POST /api/organization-intents/:secret/validate` - Validate intent
- `POST /api/organization-intents/:secret/process` - Convert to organization

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

export const OrganizationIntentSchema = z.object({
  secret: z.string()
    .min(32, 'Secret must be at least 32 characters')
    .regex(/^[A-Za-z0-9+/=]+$/, 'Invalid secret format'),
  name: z.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name cannot exceed 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .trim()
});

// Validation helper
export const validateOrganizationIntent = (data: unknown): OrganizationIntent => {
  return OrganizationIntentSchema.parse(data);
};

// Type guard
export const isOrganizationIntent = (data: unknown): data is OrganizationIntent => {
  return OrganizationIntentSchema.safeParse(data).success;
};
```

### Runtime Validation

```typescript
// Form validation
const useOrganizationIntentForm = () => {
  const [errors, setErrors] = useState<Partial<Record<keyof OrganizationIntent, string>>>({});

  const validateField = (field: keyof OrganizationIntent, value: string): boolean => {
    try {
      OrganizationIntentSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  return { errors, validateField };
};
```

## Best Practices

### Type Safety
```typescript
// ✅ Good: Strict typing with proper validation
const processIntent = async (intent: OrganizationIntent): Promise<Organization> => {
  const validatedIntent = validateOrganizationIntent(intent);
  return await organizationService.createFromIntent(validatedIntent);
};

// ❌ Avoid: Using any or bypassing validation
const processIntent = async (intent: any) => {
  return await organizationService.createFromIntent(intent);
};
```

### Interface Composition
```typescript
// ✅ Good: Using utility types for specific use cases
interface OrganizationIntentFormData extends Omit<OrganizationIntent, 'secret'> {
  confirmEmail: string;
}

// ✅ Good: Extending for related functionality
interface TimestampedOrganizationIntent extends OrganizationIntent {
  createdAt: string;
  expiresAt: string;
}
```

### Error Handling
```typescript
// ✅ Good: Proper error handling with types
const handleIntentValidation = async (intent: OrganizationIntent) => {
  try {
    const result = await validateOrganizationIntent(intent);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    throw error; // Re-throw unexpected errors
  }
};
```

### State Management
```typescript
// ✅ Good: Typed state management
interface OrganizationIntentState {
  current: OrganizationIntent | null;
  loading: boolean;
  error: string | null;
}

const useOrganizationIntent = () => {
  const [state, setState] = useState<OrganizationIntentState>({
    current: null,
    loading: false,
    error: null
  });

  const setIntent = (intent: OrganizationIntent) => {
    setState(prev => ({ ...prev, current: intent, error: null }));
  };

  return { ...state, setIntent };
};
```

This type serves as a foundational domain object in our organization management system, providing a secure and structured approach to handling organization creation intents while maintaining strict type safety throughout the application.