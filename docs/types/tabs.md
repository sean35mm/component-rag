# Tabs Type Definition

## Purpose

The tabs type system provides a comprehensive type-safe framework for managing tabbed navigation in the application. It handles both entity-specific tabs (with backend persistence) and general navigation tabs, supporting features like tab positioning, metadata management, and search results for tab collections.

## Type Definition

### Core Enums and Constants

```tsx
// Pre-opened tabs without entity persistence
export const enum PreOpenedGenericTabType {
  HOME = 'HOME',
  NOTIFICATIONS = 'NOTIFICATIONS',
}

// Entity-specific tabs with backend persistence
export enum TabEntity {
  ANSWER = 'ANSWER',
  SEARCH = 'SEARCH',
  SIGNAL = 'SIGNAL',
  STORY = 'STORY',
  SHARED_MEMBER_THREAD = 'SHARED_MEMBER_THREAD',
}

// General navigation tabs without entity persistence
export enum GeneralTab {
  DEVELOPERS = 'DEVELOPERS',
  SETTINGS = 'SETTINGS',
  TRENDING = 'TRENDING',
  ACCOUNT = 'ACCOUNT',
  STORY_PREVIEW = 'STORY_PREVIEW',
}

// Unified tab options combining all tab types
export const TabOptions = { ...GeneralTab, ...TabEntity };
```

### Type Aliases

```tsx
export type TabEntityType = (typeof TabEntity)[keyof typeof TabEntity];
export type TabOptionType = (typeof TabOptions)[keyof typeof TabOptions];
```

### Core Interfaces

```tsx
export interface TabStructure {
  type: TabOptionType;
  href: string;
  name?: string;
  preview?: string;
}

export interface TabEntityMetadata {
  entityId: string;
  previewUrl?: string | null;
  slug?: string | null;
}

export interface Tab {
  id: number;
  type: TabEntityType;
  position: number;
  name: string;
  metadata: TabEntityMetadata;
  createdAt: string;
  lastActiveAt?: string;
  updatedAt: string;
  closedAt?: string;
}
```

### Utility Types

```tsx
export type TabEntityTypeMapper<T> = {
  [K in TabEntityType]: T;
};

export type TabList = CustomSearchResult<Tab>;
```

## Properties

### TabStructure Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `TabOptionType` | ✅ | The tab type identifier |
| `href` | `string` | ✅ | Navigation URL for the tab |
| `name` | `string` | ❌ | Display name for the tab |
| `preview` | `string` | ❌ | Preview content or description |

### TabEntityMetadata Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entityId` | `string` | ✅ | Unique identifier for the entity |
| `previewUrl` | `string \| null` | ❌ | URL for preview image or content |
| `slug` | `string \| null` | ❌ | URL-friendly identifier |

### Tab Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` | ✅ | Unique tab identifier |
| `type` | `TabEntityType` | ✅ | Entity type of the tab |
| `position` | `number` | ✅ | Display order position |
| `name` | `string` | ✅ | User-visible tab name |
| `metadata` | `TabEntityMetadata` | ✅ | Associated entity metadata |
| `createdAt` | `string` | ✅ | ISO timestamp of creation |
| `lastActiveAt` | `string` | ❌ | ISO timestamp of last access |
| `updatedAt` | `string` | ✅ | ISO timestamp of last update |
| `closedAt` | `string` | ❌ | ISO timestamp when tab was closed |

## Usage Examples

### Creating Tab Structures

```tsx
import { TabStructure, TabOptions } from '@/lib/types/tabs';

// General navigation tab
const settingsTab: TabStructure = {
  type: TabOptions.SETTINGS,
  href: '/settings',
  name: 'Settings',
  preview: 'Manage your account preferences'
};

// Entity-specific tab
const storyTab: TabStructure = {
  type: TabOptions.STORY,
  href: '/story/my-journey',
  name: 'My Journey',
  preview: 'A personal story about growth'
};
```

### Working with Tab Entities

```tsx
import { Tab, TabEntity, TabEntityMetadata } from '@/lib/types/tabs';

// Creating tab metadata
const answerMetadata: TabEntityMetadata = {
  entityId: 'ans_123456',
  previewUrl: 'https://example.com/answer-preview.jpg',
  slug: 'how-to-setup-typescript'
};

// Full tab object
const answerTab: Tab = {
  id: 1,
  type: TabEntity.ANSWER,
  position: 0,
  name: 'How to Setup TypeScript',
  metadata: answerMetadata,
  createdAt: '2024-01-15T10:00:00Z',
  lastActiveAt: '2024-01-15T14:30:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};
```

### Using Type Mappers

```tsx
import { TabEntityTypeMapper, TabEntity } from '@/lib/types/tabs';

// Configuration mapping for different entity types
const tabIcons: TabEntityTypeMapper<string> = {
  [TabEntity.ANSWER]: 'question-mark',
  [TabEntity.SEARCH]: 'magnifying-glass',
  [TabEntity.SIGNAL]: 'bell',
  [TabEntity.STORY]: 'book-open',
  [TabEntity.SHARED_MEMBER_THREAD]: 'chat-bubble'
};

// Handler mapping for different entity types
const tabHandlers: TabEntityTypeMapper<(tab: Tab) => void> = {
  [TabEntity.ANSWER]: (tab) => navigateToAnswer(tab.metadata.entityId),
  [TabEntity.SEARCH]: (tab) => executeSearch(tab.metadata.slug),
  [TabEntity.SIGNAL]: (tab) => openSignal(tab.metadata.entityId),
  [TabEntity.STORY]: (tab) => readStory(tab.metadata.slug),
  [TabEntity.SHARED_MEMBER_THREAD]: (tab) => openThread(tab.metadata.entityId)
};
```

### Component Integration

```tsx
import { Tab, TabList, GeneralTab } from '@/lib/types/tabs';

interface TabNavigationProps {
  tabs: TabList;
  activeTabId?: number;
  onTabSelect: (tab: Tab) => void;
  onTabClose: (tabId: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose
}) => {
  const sortedTabs = tabs.results.sort((a, b) => a.position - b.position);
  
  return (
    <nav className="tab-navigation">
      {sortedTabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          onClick={() => onTabSelect(tab)}
          onClose={() => onTabClose(tab.id)}
        />
      ))}
    </nav>
  );
};
```

## Type Architecture Pattern

This tabs type system follows our domain-first architecture:

### 1. Domain Objects (Core)
```tsx
// Core domain entities
interface Tab { /* ... */ }
interface TabEntityMetadata { /* ... */ }
interface TabStructure { /* ... */ }
```

### 2. Response Types
```tsx
// API response wrapper
type TabList = CustomSearchResult<Tab>;

// Extended response types for specific endpoints
interface TabsWithAnalytics extends TabList {
  analytics: {
    totalActiveTime: number;
    mostUsedTab: TabEntityType;
    averageTabsOpen: number;
  };
}
```

### 3. Request Types
```tsx
// Tab creation request
interface CreateTabRequest {
  type: TabEntityType;
  name: string;
  metadata: Omit<TabEntityMetadata, 'entityId'> & { entityId?: string };
  position?: number;
}

// Tab update request
interface UpdateTabRequest {
  name?: string;
  position?: number;
  metadata?: Partial<TabEntityMetadata>;
}

// Tab filtering and search
interface TabSearchParams {
  types?: TabEntityType[];
  includesClosed?: boolean;
  sortBy?: 'position' | 'lastActiveAt' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
```

## Related Types

### Dependencies
- `CustomSearchResult<T>` - Generic search result wrapper
- Standard TypeScript utility types (`Partial`, `Pick`, `Omit`)

### Extended Types
```tsx
// Tab with computed properties
interface EnhancedTab extends Tab {
  isActive: boolean;
  timeOpen: number;
  hasUnsavedChanges: boolean;
}

// Tab group for organization
interface TabGroup {
  id: string;
  name: string;
  tabs: Tab[];
  collapsed: boolean;
}

// Tab history for navigation
interface TabHistoryEntry {
  tab: Pick<Tab, 'id' | 'type' | 'name'>;
  accessedAt: string;
  timeSpent: number;
}
```

## Integration Points

### Services
```tsx
// Tab management service
class TabService {
  async createTab(request: CreateTabRequest): Promise<Tab> { /* ... */ }
  async updateTab(id: number, request: UpdateTabRequest): Promise<Tab> { /* ... */ }
  async getTabs(params?: TabSearchParams): Promise<TabList> { /* ... */ }
  async closeTab(id: number): Promise<void> { /* ... */ }
}
```

### State Management
```tsx
// Redux/Zustand store slice
interface TabsState {
  tabs: Tab[];
  activeTabId: number | null;
  loading: boolean;
  error: string | null;
}
```

### React Hooks
```tsx
const useTabs = (params?: TabSearchParams) => {
  const [tabs, setTabs] = useState<TabList | null>(null);
  // Hook implementation
};

const useActiveTab = (tabId: number) => {
  const [tab, setTab] = useState<Tab | null>(null);
  // Hook implementation
};
```

## Validation

### Zod Schemas
```tsx
import { z } from 'zod';

export const TabEntityMetadataSchema = z.object({
  entityId: z.string().min(1),
  previewUrl: z.string().url().nullable().optional(),
  slug: z.string().min(1).nullable().optional()
});

export const TabSchema = z.object({
  id: z.number().positive(),
  type: z.nativeEnum(TabEntity),
  position: z.number().min(0),
  name: z.string().min(1).max(100),
  metadata: TabEntityMetadataSchema,
  createdAt: z.string().datetime(),
  lastActiveAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime(),
  closedAt: z.string().datetime().optional()
});

export const CreateTabRequestSchema = z.object({
  type: z.nativeEnum(TabEntity),
  name: z.string().min(1).max(100),
  metadata: TabEntityMetadataSchema.partial().extend({
    entityId: z.string().optional()
  }),
  position: z.number().min(0).optional()
});
```

## Best Practices

### 1. Strict Typing Compliance
```tsx
// ✅ Good: Strict typing with proper interfaces
interface TabProps {
  tab: Tab;
  onSelect: (tab: Tab) => void;
}

// ❌ Avoid: Using any or loose typing
interface TabProps {
  tab: any;
  onSelect: (tab: any) => void;
}
```

### 2. Enum Usage
```tsx
// ✅ Good: Using enums for reusable values
const getTabIcon = (type: TabEntityType): string => {
  switch (type) {
    case TabEntity.ANSWER:
      return 'question-mark';
    case TabEntity.SEARCH:
      return 'magnifying-glass';
    // ... other cases
  }
};

// ✅ Good: Const enum for compile-time optimization
const enum PreOpenedGenericTabType {
  HOME = 'HOME',
  NOTIFICATIONS = 'NOTIFICATIONS',
}
```

### 3. Utility Type Leverage
```tsx
// ✅ Good: Using utility types for derived types
type TabCreationData = Omit<Tab, 'id' | 'createdAt' | 'updatedAt'>;
type TabUpdateData = Partial<Pick<Tab, 'name' | 'position'>>;

// ✅ Good: Generic type mapping
type TabEntityTypeMapper<T> = {
  [K in TabEntityType]: T;
};
```

### 4. Interface Design
```tsx
// ✅ Good: Interfaces for object shapes
interface TabEntityMetadata {
  entityId: string;
  previewUrl?: string | null;
  slug?: string | null;
}

// ✅ Good: Extending interfaces when appropriate
interface EnhancedTab extends Tab {
  isActive: boolean;
  computedProperty: string;
}
```

### 5. Type Safety in Practice
```tsx
// ✅ Good: Type-safe tab operations
const updateTabPosition = (
  tabs: Tab[],
  tabId: number,
  newPosition: number
): Tab[] => {
  return tabs.map(tab =>
    tab.id === tabId
      ? { ...tab, position: newPosition, updatedAt: new Date().toISOString() }
      : tab
  );
};

// ✅ Good: Type guards for runtime safety
const isEntityTab = (type: TabOptionType): type is TabEntityType => {
  return Object.values(TabEntity).includes(type as TabEntityType);
};
```

This tabs type system provides a robust, type-safe foundation for managing complex tabbed interfaces while maintaining strict TypeScript compliance and architectural consistency.