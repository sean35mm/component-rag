# FastN Type Definitions

## Purpose

The FastN type definitions provide TypeScript interfaces for integrating with the FastN AI platform's activation system and configuration styling. These types serve as the foundation for handling FastN activation results, status management, and customizing the visual appearance of FastN forms and components within the application.

## Type Definition

### Core Domain Objects

```typescript
// Activation Status Enumeration
export enum ActivationStatus {
  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED',
}

// Primary Domain Interface
export interface FastnActivationResult {
  status: ActivationStatus;
}

// Configuration Domain Interfaces
export interface FastnConfigurationStyle {
  form?: FormStyle;
  avatar?: CSSProperties;
  title?: CSSProperties;
  description?: CSSProperties;
  error?: CSSProperties;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface FormStyle {
  field?: FormFieldStyle;
  container?: CSSProperties;
}

// Form Field Styling (Union Type for Flexibility)
type FormFieldStyle =
  | undefined
  | null
  | {
      reactSelectStyles?: ReactSelectStylesConfig<any, boolean, ReactSelectGroupBase<any>>;
      dropdown?: CSSProperties;
    };
```

## Properties

### ActivationStatus Enum

| Value | Type | Description |
|-------|------|-------------|
| `SUCCESS` | `'SUCCESS'` | Indicates successful FastN activation |
| `CANCELLED` | `'CANCELLED'` | Indicates user cancelled the activation process |

### FastnActivationResult Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `ActivationStatus` | ✅ | The result status of the FastN activation attempt |

### FastnConfigurationStyle Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `form` | `FormStyle` | ❌ | Styling configuration for form elements |
| `avatar` | `CSSProperties` | ❌ | CSS styling for avatar components |
| `title` | `CSSProperties` | ❌ | CSS styling for title text |
| `description` | `CSSProperties` | ❌ | CSS styling for description text |
| `error` | `CSSProperties` | ❌ | CSS styling for error messages |
| `primaryColor` | `string` | ❌ | Primary brand color (hex, rgb, etc.) |
| `secondaryColor` | `string` | ❌ | Secondary brand color (hex, rgb, etc.) |

### FormStyle Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `field` | `FormFieldStyle` | ❌ | Styling for individual form fields |
| `container` | `CSSProperties` | ❌ | CSS styling for the form container |

## Usage Examples

### Basic Activation Handling

```typescript
import { FastnActivationResult, ActivationStatus } from '@/lib/types/fastn';

// Service function handling FastN activation
async function handleFastnActivation(): Promise<FastnActivationResult> {
  try {
    const result = await fastnSDK.activate();
    return {
      status: ActivationStatus.SUCCESS
    };
  } catch (error) {
    return {
      status: ActivationStatus.CANCELLED
    };
  }
}

// Component usage with proper type checking
const ActivationComponent: React.FC = () => {
  const [activationResult, setActivationResult] = useState<FastnActivationResult | null>(null);

  const handleActivation = async () => {
    const result = await handleFastnActivation();
    setActivationResult(result);
    
    if (result.status === ActivationStatus.SUCCESS) {
      // Handle successful activation
      console.log('FastN activated successfully');
    } else {
      // Handle cancellation
      console.log('FastN activation was cancelled');
    }
  };

  return (
    <button onClick={handleActivation}>
      Activate FastN
    </button>
  );
};
```

### Configuration Styling

```typescript
import { FastnConfigurationStyle, FormStyle } from '@/lib/types/fastn';

// Theme-based configuration
const createFastnTheme = (isDarkMode: boolean): FastnConfigurationStyle => {
  const baseColors = {
    primaryColor: isDarkMode ? '#3b82f6' : '#1d4ed8',
    secondaryColor: isDarkMode ? '#64748b' : '#334155'
  };

  const formStyle: FormStyle = {
    container: {
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: isDarkMode 
        ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
        : '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    field: {
      dropdown: {
        backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
        border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
        borderRadius: '6px'
      },
      reactSelectStyles: {
        control: (base) => ({
          ...base,
          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
          borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
        })
      }
    }
  };

  return {
    ...baseColors,
    form: formStyle,
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: baseColors.primaryColor,
      marginBottom: '16px'
    },
    description: {
      fontSize: '16px',
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      marginBottom: '24px'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '8px'
    }
  };
};

// Usage in component
const FastnConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const fastnConfig = createFastnTheme(theme === 'dark');

  return (
    <FastnSDKProvider configuration={{ style: fastnConfig }}>
      {children}
    </FastnSDKProvider>
  );
};
```

### Advanced Pattern with Type Guards

```typescript
// Type guard for activation result validation
function isSuccessfulActivation(result: FastnActivationResult): boolean {
  return result.status === ActivationStatus.SUCCESS;
}

// Service with comprehensive error handling
class FastnService {
  async activateWithRetry(maxRetries: number = 3): Promise<FastnActivationResult> {
    let lastResult: FastnActivationResult = { status: ActivationStatus.CANCELLED };
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.activate();
        
        if (isSuccessfulActivation(result)) {
          return result;
        }
        
        lastResult = result;
      } catch (error) {
        console.warn(`Activation attempt ${attempt} failed:`, error);
        lastResult = { status: ActivationStatus.CANCELLED };
      }
    }
    
    return lastResult;
  }

  private async activate(): Promise<FastnActivationResult> {
    // Implementation details
    return { status: ActivationStatus.SUCCESS };
  }
}
```

## Type Architecture Pattern

Following our established pattern of **domain objects → response types → request types**:

### 1. Domain Objects (Current Implementation)
- `ActivationStatus` - Core business logic enum
- `FastnActivationResult` - Primary domain interface
- `FastnConfigurationStyle` - Configuration domain object

### 2. Response Types (Recommended Extensions)
```typescript
// API Response wrapper
interface FastnActivationResponse {
  data: FastnActivationResult;
  timestamp: string;
  requestId: string;
}

// Enhanced result with metadata
interface FastnActivationResultWithMetadata extends FastnActivationResult {
  activationId?: string;
  timestamp: Date;
  userAgent?: string;
}
```

### 3. Request Types (Recommended Extensions)
```typescript
// Activation request payload
interface FastnActivationRequest {
  userId: string;
  configuration?: FastnConfigurationStyle;
  metadata?: Record<string, unknown>;
}

// Configuration update request
interface FastnConfigurationUpdateRequest {
  configurationId: string;
  style: Partial<FastnConfigurationStyle>;
  version: number;
}
```

## Related Types

### Direct Dependencies
- `CSSProperties` from React - Used for styling properties
- `ReactSelectStylesConfig`, `ReactSelectGroupBase` from `@fastn-ai/react` - Form field styling

### Recommended Companion Types
```typescript
// User preferences for FastN
interface FastnUserPreferences {
  autoActivate: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

// FastN integration configuration
interface FastnIntegrationConfig {
  apiKey: string;
  environment: 'development' | 'staging' | 'production';
  style: FastnConfigurationStyle;
  userPreferences: FastnUserPreferences;
}
```

## Integration Points

### Services
- **FastnService**: Primary service for handling activation logic
- **ThemeService**: Integration for dynamic styling based on application theme
- **ConfigurationService**: Management of FastN styling configurations

### Components
- **FastnActivationButton**: Trigger component for activation
- **FastnConfigurationPanel**: Admin interface for style configuration
- **FastnStatusIndicator**: Visual status display component

### Hooks
```typescript
// Custom hook for FastN activation
function useFastnActivation() {
  const [result, setResult] = useState<FastnActivationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const activate = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fastnService.activate();
      setResult(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { result, activate, isLoading };
}
```

## Validation

### Zod Schema Patterns
```typescript
import { z } from 'zod';

// Activation Status validation
const ActivationStatusSchema = z.nativeEnum(ActivationStatus);

// Activation Result validation
const FastnActivationResultSchema = z.object({
  status: ActivationStatusSchema,
});

// Configuration Style validation
const FastnConfigurationStyleSchema = z.object({
  form: z.object({
    field: z.object({
      dropdown: z.record(z.string(), z.any()).optional(),
      reactSelectStyles: z.any().optional(),
    }).nullable().optional(),
    container: z.record(z.string(), z.any()).optional(),
  }).optional(),
  avatar: z.record(z.string(), z.any()).optional(),
  title: z.record(z.string(), z.any()).optional(),
  description: z.record(z.string(), z.any()).optional(),
  error: z.record(z.string(), z.any()).optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
});

// Runtime validation function
function validateActivationResult(data: unknown): FastnActivationResult {
  return FastnActivationResultSchema.parse(data);
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All types are strictly defined with minimal use of `any` (only in react-select integration)
2. **Interfaces over Types**: Primary object shapes use `interface` keyword
3. **Enums for Reusable Values**: `ActivationStatus` uses enum for reusable status values
4. **Domain-First Architecture**: Core business objects defined first

### ✅ Recommended Patterns

```typescript
// Use type guards for runtime safety
function isValidActivationStatus(status: string): status is ActivationStatus {
  return Object.values(ActivationStatus).includes(status as ActivationStatus);
}

// Leverage utility types for variations
type PartialFastnConfig = Partial<FastnConfigurationStyle>;
type RequiredFormStyle = Required<Pick<FormStyle, 'container'>>;

// Create branded types for IDs
type ActivationId = string & { readonly brand: unique symbol };
type ConfigurationId = string & { readonly brand: unique symbol };
```

### ⚠️ Areas for Improvement

1. **FormFieldStyle Type**: Consider converting to interface for better extensibility
2. **Any Usage**: The `any` usage in ReactSelect types should be constrained when possible
3. **Missing Validation**: Add runtime validation for color values and CSS properties

### 🔄 Future Enhancements

```typescript
// Enhanced type safety for colors
type ColorValue = `#${string}` | `rgb(${string})` | `rgba(${string})` | `hsl(${string})`;

interface EnhancedFastnConfigurationStyle extends Omit<FastnConfigurationStyle, 'primaryColor' | 'secondaryColor'> {
  primaryColor?: ColorValue;
  secondaryColor?: ColorValue;
}

// Result discrimination for better type narrowing
type FastnActivationResult = 
  | { status: ActivationStatus.SUCCESS; activationId: string }
  | { status: ActivationStatus.CANCELLED; reason?: string };
```