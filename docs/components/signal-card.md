# SignalCard Component

## Purpose

The `SignalCard` component renders a clickable card interface for suggested signal queries in the home page's featured cards section. It displays formatted signal titles with syntax highlighting for code snippets and handles navigation to the signal creation flow while enforcing usage limits.

## Component Type

**Client Component** - Uses `'use client'` directive because it requires:
- Interactive click handlers with navigation
- Client-side hooks (`useRouter`, `useCallback`, `useMemo`)
- Real-time usage context updates
- Dynamic state management for user interactions

## Props Interface

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClick` | `(title: string) => Promise<void>` | Yes | Async callback function executed when the card is clicked, receives the signal title |
| `title` | `string` | Yes | The signal title/query text to display, supports backtick syntax for code highlighting |
| `query` | `Pick<ComplexAllEndpointBody, 'query' \| 'showReprints'>` | Yes | Query configuration object containing search parameters |

## Usage Example

```tsx
import { SignalCard } from '@/components/home/featured-cards/signal-card';

function FeaturedSignals() {
  const handleSignalClick = async (title: string) => {
    // Track signal selection analytics
    await analytics.track('signal_card_clicked', { title });
    
    // Pre-populate any additional signal data
    await prepareSignalData(title);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SignalCard
        title="Monitor `React 18` performance updates"
        onClick={handleSignalClick}
        query={{
          query: "React 18 performance",
          showReprints: false
        }}
      />
      
      <SignalCard
        title="Track `Next.js` security vulnerabilities in `app` directory"
        onClick={handleSignalClick}
        query={{
          query: "Next.js security app directory",
          showReprints: true
        }}
      />
    </div>
  );
}
```

## Functionality

### Core Features

- **Title Formatting**: Automatically formats titles with backtick syntax highlighting
- **Smart Truncation**: Intelligently truncates long titles while preserving formatting
- **Usage Enforcement**: Checks signal limits before allowing navigation
- **Navigation Handling**: Routes to signal creation with pre-populated query parameters
- **Visual Feedback**: Provides consistent card-based UI with hover states

### Title Processing

- **Syntax Highlighting**: Text wrapped in backticks renders with code styling
- **Length Management**: Truncates at 50 characters while maintaining word boundaries
- **Format Preservation**: Maintains highlighting across truncation boundaries

### User Flow Integration

1. User clicks suggested signal card
2. System checks remaining signal quota
3. If quota exceeded, shows limit notification
4. If quota available, executes onClick callback
5. Navigates to signal creation with pre-filled query

## State Management

### Context Dependencies
- **Usage Context**: Monitors `activeSignalsRemaining` for quota enforcement
- **Router State**: Manages navigation state through Next.js router

### Local State
- **Memoized Computations**: Uses `useMemo` for title formatting and truncation
- **Callback Optimization**: Uses `useCallback` for click handler performance

### State Flow
```tsx
// Usage limit check
activeSignalsRemaining === 0 
  ? showLimitToast() 
  : navigateToCreation()

// Title processing pipeline
title → formatTitle() → truncateTitle() → renderContent()
```

## Side Effects

### Navigation Effects
- **Route Changes**: Programmatically navigates to `/signals/create`
- **URL Parameters**: Sets `initial_query` parameter from cleaned title
- **History Management**: Pushes new route to browser history

### External Interactions
- **Limit Enforcement**: Triggers toast notifications for quota violations
- **Analytics Tracking**: Executes provided onClick callback for metrics
- **Query Preparation**: May trigger pre-loading of signal data

## Dependencies

### UI Components
- `BaseCard`: Provides consistent card layout and styling
- `Typography`: Handles text rendering with design system compliance
- `FeatureBadge`: Supplies badge type definitions

### Hooks & Context
- `useRouter`: Next.js navigation management
- `useUsageContext`: Real-time usage quota monitoring
- `useSignalCreation`: Signal creation flow utilities

### External Services
- `ComplexAllEndpointBody`: Type definitions for search queries
- Navigation routing system
- Usage tracking and analytics

## Integration

### Application Architecture
```
Home Page
└── Featured Cards Section
    └── SignalCard (multiple instances)
        ├── BaseCard (layout)
        ├── Typography (content)
        └── Router (navigation)
```

### Data Flow
1. **Parent Component** provides suggested signals and click handlers
2. **SignalCard** formats and displays signal information
3. **Usage Context** provides real-time quota information
4. **Router** handles navigation to signal creation flow

### Feature Integration
- **Signal Creation Flow**: Primary entry point for suggested signals
- **Usage Management**: Integrates with subscription and quota systems
- **Analytics Pipeline**: Connects to user behavior tracking
- **Search System**: Pre-populates search queries for signal creation

## Best Practices

### Architecture Compliance
- ✅ **Client Component Justified**: Interactive navigation requires client-side execution
- ✅ **Flat Component Structure**: Single-level composition with clear dependencies
- ✅ **Performance Optimized**: Memoized computations and optimized callbacks
- ✅ **Reusable Design**: Accepts configuration through props interface

### State Management Patterns
- ✅ **Context for Global State**: Uses context for usage limits and user data
- ✅ **Local State for UI**: Memoized formatting and display logic
- ✅ **No Prop Drilling**: Direct context consumption where needed

### User Experience
- ✅ **Immediate Feedback**: Instant navigation and limit enforcement
- ✅ **Accessible Design**: Semantic markup and keyboard navigation support
- ✅ **Consistent Interface**: Follows design system patterns through BaseCard

### Integration Patterns
- ✅ **Loose Coupling**: Depends on abstractions rather than concrete implementations
- ✅ **Event-Driven**: Uses callback pattern for parent communication
- ✅ **Error Boundaries**: Graceful handling of quota limits and navigation errors