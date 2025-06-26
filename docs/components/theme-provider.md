# ThemeProvider Component

## Purpose

The `ThemeProvider` component is a wrapper around the `next-themes` library that provides theme management capabilities to the entire React application. It enables dynamic theme switching (light/dark mode) and persists theme preferences across browser sessions. This component serves as the root-level provider that makes theme context available to all child components in the application.

## Component Type

**Client Component** - Uses the `'use client'` directive because it needs to:
- Access browser APIs for theme persistence (localStorage)
- Handle client-side theme state management
- Provide React context that requires client-side hydration
- Manage theme transitions and system theme detection

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Child components that will have access to theme context |
| `...props` | `ThemeProviderProps` | No | All props from next-themes ThemeProvider (attribute, defaultTheme, enableSystem, etc.) |

### Extended Props from next-themes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attribute` | `string` | `'data-theme'` | HTML attribute applied to enable styling |
| `defaultTheme` | `string` | `'system'` | Default theme when no preference is set |
| `enableSystem` | `boolean` | `true` | Whether to enable system theme detection |
| `themes` | `string[]` | `['light', 'dark']` | Available theme options |
| `storageKey` | `string` | `'theme'` | localStorage key for theme persistence |

## Usage Example

```tsx
// app/layout.tsx - Root layout setup
import { ThemeProvider } from '@/components/theme/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['light', 'dark']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// components/theme-toggle.tsx - Consumer component
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme
    </Button>
  );
}
```

## Functionality

### Core Features
- **Theme Context**: Provides theme state and controls to all child components
- **Persistence**: Automatically saves theme preference to localStorage
- **System Detection**: Respects user's system theme preference when enabled
- **Hydration Safe**: Prevents hydration mismatches between server and client
- **CSS Integration**: Applies theme attributes to HTML elements for styling

### Theme Management
- Supports multiple themes (light, dark, custom themes)
- Smooth theme transitions without flash of incorrect theme
- Automatic fallback to system preference or default theme
- Real-time theme switching capabilities

## State Management

**Client-side Context State** - Uses React Context internally via next-themes:
- Theme preference stored in localStorage
- Current theme state available through `useTheme` hook
- System theme detection managed automatically
- No additional state management libraries required

```tsx
// Theme state is accessed via the useTheme hook
const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
```

## Side Effects

### Browser Interactions
- **localStorage**: Reads/writes theme preference on mount and theme changes
- **Media Query**: Listens to `prefers-color-scheme` for system theme detection
- **DOM Manipulation**: Applies theme attributes to HTML elements
- **Event Listeners**: Monitors system theme changes in real-time

### Hydration Handling
- Suppresses hydration warnings for theme-dependent content
- Ensures consistent theme application after client-side hydration

## Dependencies

### External Dependencies
- `next-themes` - Core theme management functionality
- `React` - Context and component lifecycle management

### Internal Dependencies
- Typically consumed by:
  - Theme toggle components
  - UI components with theme-aware styling
  - Layout components requiring theme context

## Integration

### Application Architecture
```
App Root (layout.tsx)
└── ThemeProvider
    ├── Header (with theme toggle)
    ├── Main Content
    │   ├── Feature Components
    │   └── UI Components (theme-aware)
    └── Footer
```

### CSS Integration
```css
/* globals.css - Theme-based styling */
.light {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

### Hook Usage Pattern
```tsx
// In any child component
import { useTheme } from 'next-themes';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Component logic using theme state
}
```

## Best Practices

### Architecture Adherence
- ✅ **Proper Client Component Usage**: Uses `'use client'` only where necessary for browser APIs
- ✅ **Flat Component Structure**: Simple wrapper without unnecessary nesting
- ✅ **Single Responsibility**: Focused solely on theme management
- ✅ **Reusable Foundation**: Provides base functionality for theme-aware components

### Implementation Guidelines
- Place at the root level (app/layout.tsx) to ensure global availability
- Use `suppressHydrationWarning` on HTML element to prevent theme-related hydration issues
- Configure `attribute="class"` for CSS class-based theme switching
- Enable system theme detection for better user experience
- Keep theme-related styling in CSS custom properties for consistency

### Performance Considerations
- Minimal overhead as it's a thin wrapper around next-themes
- Theme state changes are optimized and don't cause unnecessary re-renders
- localStorage operations are handled efficiently by the underlying library