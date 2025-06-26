# Barrel Export Pattern for React Components

## Pattern Overview

The **Barrel Export Pattern** is a module organization technique that creates a centralized export point for related functionality. This pattern uses an index file to re-export all public APIs from a component or module, providing a clean and simplified import interface for consumers.

**When to use this pattern:**
- Organizing complex components with multiple sub-components
- Creating a clean public API for component libraries
- Simplifying import statements across your application
- Maintaining backward compatibility when refactoring component structure
- Establishing clear boundaries between internal and external APIs

## Architecture

```
src/components/omnibar/
├── index.tsx          # Barrel export file (public API)
├── omnibar.tsx        # Main component implementation
├── omnibar-item.tsx   # Sub-component (internal)
├── omnibar-menu.tsx   # Sub-component (internal)
├── hooks/             # Internal hooks
│   ├── use-search.ts
│   └── use-keyboard.ts
├── utils/             # Internal utilities
│   └── search-utils.ts
└── types.ts           # Type definitions
```

The barrel export pattern creates a clear separation between:
- **Public API**: What consumers can import
- **Internal Implementation**: Private components and utilities
- **Entry Point**: Single location for all exports

## Implementation Details

### Basic Barrel Export Structure

```tsx
// src/components/omnibar/index.tsx
export * from './omnibar';
```

### Advanced Barrel Export Patterns

```tsx
// Selective exports with re-naming
export { Omnibar as default } from './omnibar';
export { OmnibarProps } from './omnibar';
export type { SearchResult, SearchCallback } from './types';

// Conditional exports
export { OmnibarProvider } from './context';
export { useOmnibar } from './hooks';

// Grouped exports
export * as OmnibarUtils from './utils';
```

### Main Component Implementation

```tsx
// src/components/omnibar/omnibar.tsx
import React from 'react';
import { OmnibarItem } from './omnibar-item';
import { OmnibarMenu } from './omnibar-menu';
import { useSearch } from './hooks/use-search';
import { SearchResult } from './types';

export interface OmnibarProps {
  placeholder?: string;
  onSelect: (result: SearchResult) => void;
  searchFunction: (query: string) => Promise<SearchResult[]>;
}

export const Omnibar: React.FC<OmnibarProps> = ({
  placeholder = "Search...",
  onSelect,
  searchFunction
}) => {
  const { query, results, isLoading, handleSearch } = useSearch(searchFunction);
  
  return (
    <div className="omnibar">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <OmnibarMenu>
        {results.map((result) => (
          <OmnibarItem
            key={result.id}
            result={result}
            onClick={() => onSelect(result)}
          />
        ))}
      </OmnibarMenu>
    </div>
  );
};
```

## Usage Examples

### Basic Import and Usage

```tsx
// Clean import thanks to barrel export
import { Omnibar } from '@/components/omnibar';

// Instead of:
// import { Omnibar } from '@/components/omnibar/omnibar';

function App() {
  const handleSelect = (result: SearchResult) => {
    console.log('Selected:', result);
  };

  const searchApi = async (query: string) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
  };

  return (
    <Omnibar
      placeholder="Search everything..."
      onSelect={handleSelect}
      searchFunction={searchApi}
    />
  );
}
```

### Multiple Exports Usage

```tsx
// Multiple imports from single barrel
import { 
  Omnibar, 
  OmnibarProvider, 
  useOmnibar,
  type OmnibarProps 
} from '@/components/omnibar';

function SearchApp() {
  return (
    <OmnibarProvider>
      <Omnibar searchFunction={searchApi} onSelect={handleSelect} />
      <SearchResults />
    </OmnibarProvider>
  );
}

function SearchResults() {
  const { results, isLoading } = useOmnibar();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {results.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
}
```

## Best Practices

### 1. Selective Exports

```tsx
// Good: Only export what consumers need
export { Omnibar } from './omnibar';
export { OmnibarProvider } from './context';
export type { OmnibarProps, SearchResult } from './types';

// Avoid: Don't export internal components
// export { OmnibarItem } from './omnibar-item'; // Internal only
```

### 2. Consistent Naming

```tsx
// Good: Consistent naming with component
export { Omnibar } from './omnibar';
export { OmnibarProvider } from './omnibar-provider';
export { useOmnibar } from './use-omnibar';

// Types with clear naming
export type { 
  OmnibarProps,
  OmnibarConfig,
  OmnibarSearchResult as SearchResult 
} from './types';
```

### 3. Default Export Strategy

```tsx
// Option 1: Named exports only (recommended for libraries)
export { Omnibar } from './omnibar';

// Option 2: Default + named exports
export { Omnibar as default, OmnibarProps } from './omnibar';

// Option 3: Separate default
export { Omnibar } from './omnibar';
export { Omnibar as default } from './omnibar';
```

### 4. Documentation in Barrel

```tsx
/**
 * Omnibar Component Library
 * 
 * Provides a universal search interface with keyboard navigation,
 * async search capabilities, and customizable rendering.
 * 
 * @example
 * ```tsx
 * import { Omnibar } from '@/components/omnibar';
 * 
 * <Omnibar 
 *   searchFunction={searchApi} 
 *   onSelect={handleSelect} 
 * />
 * ```
 */

export { Omnibar } from './omnibar';
export type { OmnibarProps } from './omnibar';
```

## Integration

### With Module Federation

```tsx
// Expose through module federation
export { Omnibar } from './omnibar';
export type { OmnibarProps } from './types';

// webpack.config.js
new ModuleFederationPlugin({
  exposes: {
    './Omnibar': './src/components/omnibar/index.tsx',
  },
});
```

### With Component Libraries

```tsx
// Library's main index
export { 
  Omnibar,
  OmnibarProvider,
  useOmnibar 
} from './components/omnibar';
export { Button } from './components/button';
export { Modal } from './components/modal';

// Consumer usage
import { Omnibar, Button } from 'design-system';
```

### With Lazy Loading

```tsx
// Lazy load the entire omnibar module
const OmnibarModule = React.lazy(() => import('@/components/omnibar'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OmnibarModule.Omnibar {...props} />
    </Suspense>
  );
}
```

## Type Safety

### Strict Type Exports

```tsx
// Export types explicitly
export type { OmnibarProps } from './omnibar';
export type { SearchResult, SearchCallback } from './types';

// Re-export with type-only imports
export type { ComponentProps } from 'react';
export type { IconProps } from '@/components/icon';
```

### Generic Type Handling

```tsx
// Generic component with proper type exports
interface OmnibarProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onSelect: (item: T) => void;
}

export const Omnibar = <T,>(props: OmnibarProps<T>) => {
  // Implementation
};

// Barrel export with generics
export { Omnibar } from './omnibar';
export type { OmnibarProps } from './omnibar';
```

### Type Augmentation

```tsx
// Allow consumers to extend types
export interface OmnibarConfig {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

declare module '@/components/omnibar' {
  interface OmnibarConfig {
    customProperty?: string;
  }
}
```

## Performance

### Tree Shaking Optimization

```tsx
// Good: Named exports enable tree shaking
export { Omnibar } from './omnibar';
export { OmnibarProvider } from './context';

// Avoid: Barrel exports that prevent tree shaking
// export * from './heavy-module';
```

### Code Splitting Strategy

```tsx
// Separate heavy dependencies
export { Omnibar } from './omnibar';

// Lazy load heavy features
export const OmnibarAdvanced = React.lazy(() => 
  import('./omnibar-advanced').then(m => ({ default: m.OmnibarAdvanced }))
);
```

### Bundle Analysis

```bash
# Analyze what's being exported
npx webpack-bundle-analyzer build/static/js/*.js

# Check for unused exports
npx ts-unused-exports tsconfig.json
```

## Testing

### Testing Barrel Exports

```tsx
// Test all exports are available
import * as OmnibarModule from '@/components/omnibar';

describe('Omnibar barrel exports', () => {
  it('should export main component', () => {
    expect(OmnibarModule.Omnibar).toBeDefined();
  });

  it('should export provider', () => {
    expect(OmnibarModule.OmnibarProvider).toBeDefined();
  });

  it('should export hooks', () => {
    expect(OmnibarModule.useOmnibar).toBeDefined();
  });
});
```

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { Omnibar } from '@/components/omnibar';

describe('Omnibar', () => {
  it('should render search input', () => {
    render(
      <Omnibar 
        searchFunction={jest.fn()} 
        onSelect={jest.fn()} 
      />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
```

### Integration Testing

```tsx
// Test the complete import path
import { Omnibar } from '../../../src/components/omnibar';

// Test dynamic imports
it('should support dynamic imports', async () => {
  const module = await import('@/components/omnibar');
  expect(module.Omnibar).toBeDefined();
});
```

## Common Pitfalls

### 1. Circular Dependencies

```tsx
// ❌ Avoid: Circular dependency
// omnibar.tsx
import { OmnibarItem } from './index'; // Wrong!

// ✅ Correct: Direct imports internally
// omnibar.tsx
import { OmnibarItem } from './omnibar-item';
```

### 2. Over-exporting

```tsx
// ❌ Avoid: Exporting internal implementation
export * from './internal-utils';
export * from './private-components';

// ✅ Correct: Only export public API
export { Omnibar } from './omnibar';
export type { OmnibarProps } from './omnibar';
```

### 3. Default Export Confusion

```tsx
// ❌ Confusing: Mixed default/named patterns
export { Omnibar as default } from './omnibar';
export * from './other-components';

// ✅ Clear: Consistent export strategy
export { Omnibar } from './omnibar';
export { OmnibarProvider } from './context';
```

### 4. Type-only Export Issues

```tsx
// ❌ Runtime error: Importing type as value
export type { OmnibarProps } from './omnibar';
// Consumer: const props: OmnibarProps = ...; // Error!

// ✅ Correct: Separate type and value exports
export { Omnibar } from './omnibar';
export type { OmnibarProps } from './omnibar';
```

### 5. Bundle Size Issues

```tsx
// ❌ Imports entire module
export * from './heavy-dependency';

// ✅ Selective exports
export { specificFunction } from './heavy-dependency';
export type { SpecificType } from './heavy-dependency';
```

This barrel export pattern provides a clean, maintainable way to organize complex React components while maintaining clear boundaries between public and private APIs. It's particularly valuable for component libraries and large applications where import clarity and maintainability are crucial.