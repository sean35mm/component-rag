# AccessVariantSelector Component

## Purpose

The `AccessVariantSelector` component provides a radio button interface for selecting between private and public access modes for shared chat conversations. When public access is selected, it reveals an animated URL input field with copy functionality, allowing users to share chat links with appropriate access controls.

## Component Type

**Client Component** - Uses the `'use client'` directive because it requires:
- Interactive event handlers (focus, value change, copy actions)
- Framer Motion animations for smooth UI transitions
- Local state management for user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isCopied` | `boolean` | Yes | Controls the display of the "Link copied!" confirmation message |
| `isShared` | `boolean` | Yes | Determines whether public sharing is enabled and controls URL input visibility |
| `url` | `string` | Yes | The shareable URL to display in the input field when public access is selected |
| `onCopy` | `() => void` | Yes | Callback function triggered when the copy button is clicked |
| `onIsSharedChange` | `(isShared: boolean) => void` | Yes | Callback function triggered when access variant selection changes |

## Usage Example

```tsx
import { useState, useCallback } from 'react';
import { AccessVariantSelector } from '@/components/answers/share-button/access-variant-selector';

function ShareChatDialog() {
  const [isShared, setIsShared] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl] = useState('https://app.example.com/chat/abc123');

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [shareUrl]);

  const handleIsSharedChange = useCallback((shared: boolean) => {
    setIsShared(shared);
    if (!shared) {
      setIsCopied(false); // Reset copy state when going private
    }
  }, []);

  return (
    <div className="w-full max-w-md">
      <AccessVariantSelector
        isCopied={isCopied}
        isShared={isShared}
        url={shareUrl}
        onCopy={handleCopy}
        onIsSharedChange={handleIsSharedChange}
      />
    </div>
  );
}
```

## Functionality

### Core Features
- **Access Control Selection**: Radio button interface for private vs. public access modes
- **Animated URL Revelation**: Smooth reveal/hide animation of URL input when toggling access modes
- **Copy to Clipboard**: Integrated copy button with visual feedback
- **Auto-select on Focus**: URL input automatically selects all text when focused for easy copying
- **Visual Feedback**: Animated confirmation message when link is successfully copied

### Interactive Behaviors
- **Private Mode**: Only the chat creator can view the conversation
- **Public Mode**: Anyone with the link can view chat history and new messages
- **Smooth Transitions**: Framer Motion animations provide polished user experience
- **Accessibility**: Proper labeling and keyboard navigation support

## State Management

**Local State Only** - This component is fully controlled by its parent:
- Receives all state via props (`isCopied`, `isShared`, `url`)
- Communicates state changes through callback props (`onCopy`, `onIsSharedChange`)
- Uses `useCallback` hooks for performance optimization of event handlers
- No internal state management or external state dependencies

## Side Effects

### Direct Side Effects
- **Clipboard Access**: Copy functionality triggers `navigator.clipboard.writeText()` (handled by parent)
- **DOM Manipulation**: Input focus handler programmatically selects text content

### Animation Effects
- **Layout Animations**: Framer Motion layout animations on show/hide transitions
- **Timed Animations**: Coordinated reveal/exit animations for URL input section

## Dependencies

### UI Components
- `RadioGroup`, `RadioGroupItem` - Core radio button functionality
- `TextInput` - URL input field with integrated copy button
- `CopyButtonUncontrolled` - Clipboard copy functionality with visual states
- `Typography` - Consistent text styling
- `TooltipProvider` - Tooltip context for copy button

### External Libraries
- `framer-motion` - Animation library for smooth transitions
- Custom animation variants from `./animations`

### Utilities
- `cn` utility for conditional className merging
- `PiFileCopyLine` icon for copy confirmation

## Integration

### Application Architecture
```
Share Dialog
├── AccessVariantSelector (this component)
├── Chat Sharing Service
└── Clipboard API Integration
```

### Data Flow
1. Parent component manages sharing state and URL generation
2. User selects access variant through radio buttons
3. Component notifies parent via `onIsSharedChange` callback
4. Parent generates/updates shareable URL
5. User copies URL, parent handles clipboard operation and feedback timing

### Feature Context
- Part of the chat sharing workflow in the answers domain
- Integrates with broader chat management and permissions system
- Supports both private (creator-only) and public (link-based) sharing models

## Best Practices

### Architecture Adherence
- ✅ **Client Component**: Appropriately uses client-side rendering for interactivity
- ✅ **Controlled Component**: Fully controlled by parent, no internal state leakage
- ✅ **Single Responsibility**: Focused solely on access variant selection and URL sharing
- ✅ **Composition**: Leverages existing UI components rather than reinventing functionality

### Performance Optimizations
- ✅ **Callback Memoization**: Uses `useCallback` for stable event handler references
- ✅ **Conditional Rendering**: AnimatePresence efficiently mounts/unmounts URL input
- ✅ **Layout Optimization**: Framer Motion layout animations prevent jarring transitions

### Accessibility & UX
- ✅ **Semantic HTML**: Proper label associations for radio buttons
- ✅ **Keyboard Navigation**: Full keyboard accessibility support
- ✅ **Visual Feedback**: Clear confirmation states for user actions
- ✅ **Progressive Enhancement**: Graceful fallback if animations fail

### Code Organization
- ✅ **Clear Separation**: Animation variants externalized to separate file
- ✅ **Type Safety**: Comprehensive TypeScript interfaces and enum usage
- ✅ **Reusable Constants**: `ACCESS_VARIANTS` exported for potential reuse