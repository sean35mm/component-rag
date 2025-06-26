# Connected Apps Types Documentation

## Purpose

The connected apps types define the data structures for third-party application integrations within the Fastn platform. These types specifically handle Slack application metadata and environment configurations for connected applications.

## Type Definition

```tsx
export interface FastnAppSlackMetadata {
  users: { label: string }[];
  channels: { label: string }[];
}

export enum FastnEnv {
  DRAFT = 'DRAFT',
  LIVE = 'LIVE',
}
```

## Properties

### FastnAppSlackMetadata

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `users` | `{ label: string }[]` | ✅ | Array of Slack users with display labels |
| `channels` | `{ label: string }[]` | ✅ | Array of Slack channels with display labels |

### FastnEnv

| Value | Description |
|-------|-------------|
| `DRAFT` | Draft environment for testing and development |
| `LIVE` | Production environment for live applications |

## Usage Examples

### Basic Usage

```tsx
import { FastnAppSlackMetadata, FastnEnv } from '@/lib/types/connected-apps';

// Creating Slack metadata
const slackMetadata: FastnAppSlackMetadata = {
  users: [
    { label: 'John Doe (@john.doe)' },
    { label: 'Jane Smith (@jane.smith)' }
  ],
  channels: [
    { label: '#general' },
    { label: '#development' },
    { label: '#marketing' }
  ]
};

// Using environment enum
const currentEnv: FastnEnv = FastnEnv.DRAFT;
```

### Component Integration

```tsx
interface SlackConfigProps {
  metadata: FastnAppSlackMetadata;
  environment: FastnEnv;
  onUserSelect: (user: { label: string }) => void;
  onChannelSelect: (channel: { label: string }) => void;
}

const SlackConfig: React.FC<SlackConfigProps> = ({
  metadata,
  environment,
  onUserSelect,
  onChannelSelect
}) => {
  return (
    <div className="slack-config">
      <div className="environment-badge">
        Environment: {environment}
      </div>
      
      <div className="users-section">
        <h3>Available Users</h3>
        {metadata.users.map((user, index) => (
          <button
            key={index}
            onClick={() => onUserSelect(user)}
            className="user-item"
          >
            {user.label}
          </button>
        ))}
      </div>
      
      <div className="channels-section">
        <h3>Available Channels</h3>
        {metadata.channels.map((channel, index) => (
          <button
            key={index}
            onClick={() => onChannelSelect(channel)}
            className="channel-item"
          >
            {channel.label}
          </button>
        ))}
      </div>
    </div>
  );
};
```

### Service Layer Usage

```tsx
class SlackService {
  async fetchSlackMetadata(appId: string): Promise<FastnAppSlackMetadata> {
    const response = await fetch(`/api/apps/${appId}/slack/metadata`);
    const data = await response.json();
    
    return {
      users: data.users.map((user: any) => ({
        label: `${user.displayName} (@${user.username})`
      })),
      channels: data.channels.map((channel: any) => ({
        label: channel.name.startsWith('#') ? channel.name : `#${channel.name}`
      }))
    };
  }
  
  async deployApp(appId: string, environment: FastnEnv): Promise<void> {
    await fetch(`/api/apps/${appId}/deploy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ environment })
    });
  }
}
```

## Type Architecture Pattern

Following our domain objects → response types → request types pattern:

```tsx
// Domain objects (current types)
interface FastnAppSlackMetadata { /* ... */ }
enum FastnEnv { /* ... */ }

// Response types (extended from domain)
interface SlackMetadataResponse {
  metadata: FastnAppSlackMetadata;
  lastUpdated: string;
  status: 'connected' | 'disconnected' | 'error';
}

interface AppDeploymentResponse {
  environment: FastnEnv;
  deployedAt: string;
  version: string;
  status: 'success' | 'failed' | 'pending';
}

// Request types
interface SlackMetadataRequest {
  appId: string;
  refreshCache?: boolean;
}

interface AppDeploymentRequest {
  appId: string;
  environment: FastnEnv;
  configuration?: Record<string, unknown>;
}
```

## Related Types

```tsx
// Extended connected app types
interface ConnectedApp {
  id: string;
  name: string;
  type: 'slack' | 'discord' | 'teams';
  environment: FastnEnv;
  metadata: FastnAppSlackMetadata | DiscordMetadata | TeamsMetadata;
  createdAt: string;
  updatedAt: string;
}

interface SlackIntegration {
  appId: string;
  workspaceId: string;
  botToken: string;
  metadata: FastnAppSlackMetadata;
  environment: FastnEnv;
}

// Utility types
type SlackEntity = FastnAppSlackMetadata['users'][0] | FastnAppSlackMetadata['channels'][0];
type EnvironmentConfig = Record<FastnEnv, { apiUrl: string; webhookUrl: string }>;
```

## Integration Points

### Components
- `ConnectedAppsList` - Displays all connected applications with their environments
- `SlackConfiguration` - Manages Slack-specific settings and metadata
- `EnvironmentSelector` - Allows switching between DRAFT and LIVE environments
- `UserChannelPicker` - Selection interface for Slack users and channels

### Services
- `ConnectedAppsService` - Main service for managing connected applications
- `SlackAPIService` - Handles Slack-specific API interactions
- `DeploymentService` - Manages app deployments across environments

### Hooks
```tsx
const useSlackMetadata = (appId: string) => {
  const [metadata, setMetadata] = useState<FastnAppSlackMetadata | null>(null);
  // Implementation...
};

const useEnvironmentSwitch = () => {
  const [environment, setEnvironment] = useState<FastnEnv>(FastnEnv.DRAFT);
  // Implementation...
};
```

## Validation

### Zod Schemas

```tsx
import { z } from 'zod';

const SlackEntitySchema = z.object({
  label: z.string().min(1, 'Label cannot be empty')
});

const FastnAppSlackMetadataSchema = z.object({
  users: z.array(SlackEntitySchema),
  channels: z.array(SlackEntitySchema)
});

const FastnEnvSchema = z.nativeEnum(FastnEnv);

// Usage in API routes
const validateSlackMetadata = (data: unknown): FastnAppSlackMetadata => {
  return FastnAppSlackMetadataSchema.parse(data);
};
```

### Runtime Validation

```tsx
const isValidSlackMetadata = (data: unknown): data is FastnAppSlackMetadata => {
  return FastnAppSlackMetadataSchema.safeParse(data).success;
};

const isValidEnvironment = (env: string): env is FastnEnv => {
  return Object.values(FastnEnv).includes(env as FastnEnv);
};
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: All properties are strictly typed with no `any` usage
2. **Interface Usage**: `FastnAppSlackMetadata` uses `interface` for object shape
3. **Enum for Reusable Values**: `FastnEnv` uses enum for environment states that are reused across the application
4. **Utility Types**: Extended types use `Record`, `Pick`, and other utility types

### ✅ Recommended Patterns

```tsx
// Use discriminated unions for different app types
interface BaseConnectedApp {
  id: string;
  name: string;
  environment: FastnEnv;
}

interface SlackApp extends BaseConnectedApp {
  type: 'slack';
  metadata: FastnAppSlackMetadata;
}

interface DiscordApp extends BaseConnectedApp {
  type: 'discord';
  metadata: DiscordMetadata;
}

type ConnectedApp = SlackApp | DiscordApp;

// Use branded types for IDs
type AppId = string & { __brand: 'AppId' };
type WorkspaceId = string & { __brand: 'WorkspaceId' };
```

### ✅ Type Guards

```tsx
const isSlackApp = (app: ConnectedApp): app is SlackApp => {
  return app.type === 'slack';
};

const isDraftEnvironment = (env: FastnEnv): boolean => {
  return env === FastnEnv.DRAFT;
};
```

These types provide a solid foundation for connected app functionality while maintaining type safety and following established architectural patterns.