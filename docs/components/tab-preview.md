# TabPreview Component

## Purpose

The `TabPreview` component displays tab preview images with built-in error handling and fallback support. It's designed to show visual previews of browser tabs within the tabs manager interface, gracefully handling image loading failures by displaying a placeholder component when images fail to load.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Manages local state (`isError`) for error handling
- Uses event handlers (`onError`) for image loading failures
- Employs `useEffect` and `useCallback` hooks for client-side interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `alt` | `string` | Yes | Alternative text for the image, used for accessibility |
| `src` | `string` | Yes | Source URL of the preview image to display |
| `placeholder` | `ReactNode` | No | Fallback content to display when image loading fails |

## Usage Example

```tsx
import { TabPreview } from '@/components/main-layout/tabs-manager/tab-preview';
import { ImageIcon } from 'lucide-react';

// Basic usage with placeholder
function TabItem() {
  return (
    <div className="w-14 h-14 relative">
      <TabPreview
        alt="Website preview"
        src="https://example.com/preview.jpg"
        placeholder={
          <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded">
            <ImageIcon className="w-6 h-6 text-gray-400" />
          </div>
        }
      />
    </div>
  );
}

// Usage in tabs manager
function TabsManager({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <div key={tab.id} className="w-14 h-14 relative">
          <TabPreview
            alt={`Preview of ${tab.title}`}
            src={tab.previewUrl}
            placeholder={<TabPlaceholder title={tab.title} />}
          />
        </div>
      ))}
    </div>
  );
}
```

## Functionality

- **Image Rendering**: Displays tab preview images using Next.js optimized Image component
- **Error Handling**: Automatically detects image loading failures and switches to placeholder
- **Responsive Design**: Uses `fill` sizing with object-cover for consistent aspect ratios
- **Auto Recovery**: Resets error state when `src` prop changes, allowing retry with new URLs
- **Accessibility**: Maintains proper alt text for screen readers

## State Management

**Local State** - Uses React's `useState` for simple error tracking:
- `isError`: Boolean flag indicating whether the image failed to load
- State automatically resets when the `src` prop changes via `useEffect`

No external state management (TanStack Query/Zustand) needed as this is a pure presentation component with minimal local state.

## Side Effects

- **Image Loading**: Monitors image load success/failure through Next.js Image `onError` callback
- **State Reset**: Automatically resets error state when `src` prop changes
- **DOM Interactions**: Handles image error events from the browser

## Dependencies

- **Next.js Image**: Uses `next/image` for optimized image loading and rendering
- **React Hooks**: Utilizes `useState`, `useEffect`, and `useCallback` for state and lifecycle management

## Integration

The `TabPreview` component integrates into the larger application architecture as:

- **Tabs Manager**: Core component within the tabs management system for displaying visual tab previews
- **Main Layout**: Part of the main application layout's tab management interface
- **UI Layer**: Acts as a specialized UI component handling image display with error boundaries
- **Performance**: Leverages Next.js image optimization for efficient loading and caching

## Best Practices

✅ **Component Decomposition**: Small, focused component with single responsibility (image display with error handling)

✅ **Client Component Usage**: Appropriately uses client component only when necessary for interactivity

✅ **Error Boundaries**: Implements graceful error handling with fallback UI

✅ **Accessibility**: Maintains proper alt text and semantic structure

✅ **Performance**: Uses Next.js Image optimization with appropriate sizing hints

✅ **State Management**: Uses minimal local state appropriate for the component's scope

✅ **Reusability**: Generic interface allows usage across different contexts within the tabs system

The component follows our architecture patterns by remaining focused, handling errors gracefully, and integrating cleanly into the broader tabs management system without unnecessary complexity.