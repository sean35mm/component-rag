# Schema Validation Pattern

## Pattern Overview

The Schema Validation pattern provides a centralized, reusable approach to data validation using Zod schemas. This pattern establishes a single source of truth for validation rules across the application, ensuring consistent data integrity and user experience.

**When to use this pattern:**
- Form validation in user interfaces
- API request/response validation
- Data transformation and sanitization
- Runtime type checking
- Input sanitization and security

## Architecture

```
src/lib/utils/schema.ts
├── emailSchema      # Email validation with trimming
├── passwordSchema   # Complex password requirements
└── entityUuidSchema # UUID format validation
```

The pattern follows a **modular schema architecture** where each schema is:
- **Atomic**: Single responsibility per schema
- **Composable**: Can be combined into larger schemas
- **Reusable**: Shared across multiple components
- **Declarative**: Clear validation rules and error messages

## Implementation Details

### Core Validation Techniques

```typescript
// 1. Required Field Validation
z.string({ required_error: 'Email is a required field' })

// 2. Data Transformation
.trim() // Removes whitespace before validation

// 3. Format Validation
.email('Must be a valid email')

// 4. Length Constraints
.min(3) // Minimum length validation

// 5. Complex Pattern Matching
.regex(/^(?=.*[0-9])(?=.*[special_chars])/, 'Custom error message')

// 6. Built-in Format Validators
.uuid() // UUID format validation
```

### Error Message Strategy

```typescript
// Hierarchical error messages - most specific error wins
export const passwordSchema = z
  .string({ required_error: 'Password is a required field' })
  .min(8, 'Password must be at least 8 characters long & include at least 1 number & 1 special character.')
  .regex(/^(?=.*[0-9])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/, 
    'Your password must contain at least one number and one special character.');
```

## Usage Examples

### Basic Form Validation

```typescript
import { emailSchema, passwordSchema } from '@/lib/utils/schema';

// React Hook Form integration
const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginComponent = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    // Data is guaranteed to be valid
    console.log(data);
  };
};
```

### API Route Validation

```typescript
import { emailSchema, entityUuidSchema } from '@/lib/utils/schema';

// Next.js API route
export async function POST(request: Request) {
  const requestSchema = z.object({
    email: emailSchema,
    userId: entityUuidSchema,
  });

  try {
    const validatedData = requestSchema.parse(await request.json());
    // Process validated data
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
```

### Composite Schema Creation

```typescript
import { emailSchema, passwordSchema, entityUuidSchema } from '@/lib/utils/schema';

// User registration schema
export const userRegistrationSchema = z.object({
  id: entityUuidSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Profile update schema (password optional)
export const profileUpdateSchema = z.object({
  id: entityUuidSchema,
  email: emailSchema,
  password: passwordSchema.optional(),
});
```

### Runtime Validation

```typescript
import { emailSchema } from '@/lib/utils/schema';

// Safe parsing with error handling
function validateEmail(input: unknown): string | null {
  const result = emailSchema.safeParse(input);
  
  if (result.success) {
    return result.data; // Guaranteed to be valid email string
  }
  
  console.error('Email validation failed:', result.error.format());
  return null;
}

// Throwing validation
function parseEmail(input: unknown): string {
  return emailSchema.parse(input); // Throws ZodError if invalid
}
```

## Best Practices

### 1. Schema Composition Over Duplication

```typescript
// ✅ Good - Reuse base schemas
const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// ❌ Bad - Duplicate validation logic
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### 2. Meaningful Error Messages

```typescript
// ✅ Good - User-friendly messages
export const passwordSchema = z
  .string({ required_error: 'Password is a required field' })
  .min(8, 'Password must be at least 8 characters long & include at least 1 number & 1 special character.');

// ❌ Bad - Generic messages
export const passwordSchema = z.string().min(8);
```

### 3. Progressive Validation

```typescript
// ✅ Good - Fail fast with clear hierarchy
export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .trim()
  .min(1, 'Email cannot be empty')
  .email('Must be a valid email');
```

### 4. Environment-Specific Schemas

```typescript
// Development vs Production validation
const basePasswordSchema = z.string({ required_error: 'Password is required' });

export const passwordSchema = process.env.NODE_ENV === 'development'
  ? basePasswordSchema.min(3) // Relaxed for development
  : basePasswordSchema.min(8).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/);
```

## Integration

### Form Libraries Integration

```typescript
// React Hook Form
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(loginSchema),
});

// Formik
import { toFormikValidationSchema } from 'zod-formik-adapter';

const validationSchema = toFormikValidationSchema(loginSchema);
```

### Database Integration

```typescript
// Prisma schema validation
const createUser = async (data: unknown) => {
  const validatedData = userRegistrationSchema.parse(data);
  
  return await prisma.user.create({
    data: validatedData,
  });
};
```

### State Management Integration

```typescript
// Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      // Validate before setting state
      const email = emailSchema.parse(action.payload);
      state.email = email;
    },
  },
});
```

## Type Safety

### Type Inference

```typescript
// Automatic type inference
type Email = z.infer<typeof emailSchema>; // string
type Password = z.infer<typeof passwordSchema>; // string
type EntityUuid = z.infer<typeof entityUuidSchema>; // string

// Complex type inference
const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  id: entityUuidSchema,
});

type User = z.infer<typeof userSchema>;
// {
//   email: string;
//   password: string;
//   id: string;
// }
```

### Type Guards

```typescript
// Custom type guards
function isValidEmail(value: unknown): value is string {
  return emailSchema.safeParse(value).success;
}

function assertValidUuid(value: unknown): asserts value is string {
  entityUuidSchema.parse(value);
}
```

## Performance

### Optimization Strategies

```typescript
// 1. Schema Precompilation
const compiledEmailSchema = emailSchema._def; // Internal optimization

// 2. Conditional Validation
const conditionalSchema = z.lazy(() => 
  someCondition ? emailSchema : z.string()
);

// 3. Partial Validation for Updates
const partialUserSchema = userSchema.partial();

// 4. Caching Validation Results
const validationCache = new Map<string, boolean>();

function cachedEmailValidation(email: string): boolean {
  if (validationCache.has(email)) {
    return validationCache.get(email)!;
  }
  
  const isValid = emailSchema.safeParse(email).success;
  validationCache.set(email, isValid);
  return isValid;
}
```

## Testing

### Unit Testing Schemas

```typescript
import { describe, it, expect } from 'vitest';
import { emailSchema, passwordSchema, entityUuidSchema } from '@/lib/utils/schema';

describe('Schema Validation', () => {
  describe('emailSchema', () => {
    it('should validate correct emails', () => {
      expect(emailSchema.safeParse('test@example.com').success).toBe(true);
      expect(emailSchema.safeParse('  test@example.com  ').success).toBe(true); // Trimming
    });

    it('should reject invalid emails', () => {
      expect(emailSchema.safeParse('').success).toBe(false);
      expect(emailSchema.safeParse('invalid-email').success).toBe(false);
      expect(emailSchema.safeParse('@example.com').success).toBe(false);
    });

    it('should provide meaningful error messages', () => {
      const result = emailSchema.safeParse('');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is a required field');
      }
    });
  });

  describe('passwordSchema', () => {
    it('should validate strong passwords', () => {
      expect(passwordSchema.safeParse('StrongP@ss1').success).toBe(true);
      expect(passwordSchema.safeParse('myPassword123!').success).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(passwordSchema.safeParse('weak').success).toBe(false);
      expect(passwordSchema.safeParse('noNumbers!').success).toBe(false);
      expect(passwordSchema.safeParse('noSpecialChars123').success).toBe(false);
    });
  });

  describe('entityUuidSchema', () => {
    it('should validate UUIDs', () => {
      expect(entityUuidSchema.safeParse('123e4567-e89b-12d3-a456-426614174000').success).toBe(true);
    });

    it('should reject invalid UUIDs', () => {
      expect(entityUuidSchema.safeParse('not-a-uuid').success).toBe(false);
      expect(entityUuidSchema.safeParse('123').success).toBe(false);
    });
  });
});
```

### Integration Testing

```typescript
// Testing with form libraries
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const TestForm = () => {
  const form = useForm({
    resolver: zodResolver(z.object({ email: emailSchema })),
  });

  return (
    <form onSubmit={form.handleSubmit(() => {})}>
      <input {...form.register('email')} />
      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}
    </form>
  );
};

it('should show validation errors in forms', async () => {
  render(<TestForm />);
  
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'invalid' } });
  fireEvent.blur(screen.getByRole('textbox'));
  
  expect(await screen.findByText('Must be a valid email')).toBeInTheDocument();
});
```

## Common Pitfalls

### 1. Over-Validation

```typescript
// ❌ Bad - Too restrictive
const emailSchema = z
  .string()
  .email()
  .min(5)
  .max(50)
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/); // Redundant with .email()

// ✅ Good - Appropriate validation
const emailSchema = z
  .string({ required_error: 'Email is required' })
  .trim()
  .email('Must be a valid email');
```

### 2. Inconsistent Error Messages

```typescript
// ❌ Bad - Inconsistent messaging
const schema1 = z.string({ required_error: 'Field is required' });
const schema2 = z.string({ required_error: 'This field is mandatory' });

// ✅ Good - Consistent messaging
const requiredString = (fieldName: string) => 
  z.string({ required_error: `${fieldName} is required` });
```

### 3. Not Handling Async Validation

```typescript
// ❌ Bad - Synchronous only
const emailSchema = z.string().email();

// ✅ Good - Support for async validation
const emailSchema = z.string().email().refine(
  async (email) => {
    // Check if email exists in database
    const exists = await checkEmailExists(email);
    return !exists;
  },
  { message: 'Email already exists' }
);
```

### 4. Schema Pollution

```typescript
// ❌ Bad - Mixing business logic with validation
const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
}).transform((data) => {
  // Don't put business logic here
  sendWelcomeEmail(data.email);
  return data;
});

// ✅ Good - Pure validation
const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Handle business logic separately
const createUser = (data: unknown) => {
  const validatedData = userSchema.parse(data);
  // Business logic here
  sendWelcomeEmail(validatedData.email);
  return validatedData;
};
```

This pattern provides a robust foundation for data validation across your application while maintaining type safety, reusability, and clear error messaging.