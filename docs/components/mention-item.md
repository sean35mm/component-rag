# MentionItem Component Documentation

## Purpose
The MentionItem component is a collapsible accordion item that displays story mentions (companies or people) with their frequency counts and contextual information. It renders a visual progress bar showing relative mention frequency and provides an expandable view with the full mention text and copy functionality.

## Component Type
**Client Component** - Uses the `'use client'` directive because it:
- Implements interactive accordion functionality with Radix UI primitives
- Uses responsive breakpoint detection with `useBreakpoint` hook
- Manages client-side state for accordion expansion/collapse
- Handles click events and copy operations

## Props Interface

### MentionItem Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the accordion item |
| `item` | `StoryMention` | Yes | The story mention data containing type and mention details |
| `max` | `number` | Yes | Maximum count value used for calculating progress bar width |

### MentionItemWrapper Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the accordion item |
| `children` | `ReactNode \| ReactNode[]` | Yes | Child components to render within the wrapper |

### MentionItemTrigger Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Display name of the mention |
| `subtitle` | `string` | No | Optional subtitle (e.g., company symbols) |
| `logo` | `string \| null` | No | URL for the logo/avatar image |
| `max` | `number` | Yes | Maximum count for progress bar calculation |
| `count` | `number` | Yes | Current mention count |
| `company` | `Company \| null` | No | Company data for enhanced favicon rendering |

## Usage Example

```tsx
import { MentionItem } from '@/components/story/top-mentions/mention-item';
import { StoryMentionType } from '@/components/story/top-mentions/types';

function TopMentions() {
  const companyMention = {
    type: StoryMentionType.COMPANY,
    data: {
      id: 'company-123',
      name: 'Apple Inc.',
      count: 45,
      symbols: ['AAPL']
    },
    mention: 'Apple Inc. reported strong quarterly earnings...'
  };

  const personMention = {
    type: StoryMentionType.PERSON,
    data: {
      name: 'Tim Cook',
      count: 12,
      wikidataId: 'Q312'
    },
    mention: 'CEO Tim Cook announced the new product line...'
  };

  return (
    <Accordion.Root type="multiple">
      <MentionItem
        id="company-mention-1"
        item={companyMention}
        max={50}
      />
      <MentionItem
        id="person-mention-1"
        item={personMention}
        max={50}
      />
    </Accordion.Root>
  );
}
```

## Functionality
- **Accordion Interface**: Expandable/collapsible trigger showing mention details
- **Visual Progress Bar**: Displays relative mention frequency with minimum 5% width
- **Responsive Design**: Adapts typography and spacing based on screen size
- **Logo/Avatar Display**: Shows company favicons or person images when available
- **Fallback Rendering**: Gracefully handles missing images with placeholder components
- **Copy Functionality**: Allows users to copy mention text to clipboard
- **Hover States**: Interactive feedback on hover and focus states

## State Management
- **TanStack Query**: Uses `useCompanyByIdSuspense` and `usePeopleByWikidataIdSuspense` for server state
- **Local State**: Accordion expansion state managed by Radix UI primitives
- **Context State**: Accesses authentication state via `useAccessToken` context

## Side Effects
- **Data Fetching**: Suspense-wrapped queries fetch company and person data
- **Image Loading**: Lazy loads favicons and profile images
- **Clipboard Operations**: Copy button triggers clipboard write operations
- **Responsive Updates**: Breakpoint changes trigger re-renders for responsive typography

## Dependencies

### Internal Dependencies
- `@/components/hooks/use-breakpoint` - Responsive breakpoint detection
- `@/components/ui/citation-item` - Image rendering with fallbacks
- `@/components/ui/copy-button` - Clipboard copy functionality
- `@/components/ui/favicon` - Company favicon rendering
- `@/components/ui/typography` - Consistent text styling
- `@/lib/contexts` - Authentication context
- `@/lib/query-hooks` - Server state management hooks

### External Dependencies
- `@radix-ui/react-accordion` - Accessible accordion primitives
- `react` - Core React functionality with Suspense

## Integration
The MentionItem component integrates into the story page architecture by:
- **Story Analysis**: Displays extracted mentions from story content analysis
- **Authentication Flow**: Respects user permissions for enhanced data access
- **Design System**: Uses consistent UI components and typography patterns
- **Accessibility**: Leverages Radix UI for keyboard navigation and screen reader support

## Best Practices
✅ **Proper Decomposition**: Component is split into logical sub-components (Wrapper, Trigger, Content)

✅ **Suspense Boundaries**: Uses React Suspense for graceful loading states during data fetching

✅ **Responsive Design**: Implements breakpoint-aware rendering with `useBreakpoint` hook

✅ **Error Boundaries**: Provides fallback rendering when data fetching fails

✅ **Accessibility**: Uses semantic HTML and ARIA attributes through Radix UI primitives

✅ **Type Safety**: All props are properly typed with TypeScript interfaces

✅ **State Co-location**: Server state managed through TanStack Query, UI state through Radix primitives

✅ **Conditional Rendering**: Handles different mention types (company/person) with appropriate data fetching strategies

The component follows the established patterns of being a focused, reusable piece that composes well with other components while maintaining clear boundaries and responsibilities.