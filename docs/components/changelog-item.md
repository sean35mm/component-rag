# ChangelogItem Component

## Purpose

The `ChangelogItem` component renders individual changelog entries with support for both preview and full-detail views. It displays formatted markdown content, dates, and titles with configurable styling and optional linking functionality. This component is specifically designed for developer-facing changelog displays and documentation pages.

## Component Type

**Client Component** - Uses the `'use client'` directive because it:
- Utilizes the `ReactMarkdown` library which requires client-side rendering
- Implements interactive hover states and transitions
- Uses the `useMemo` hook for performance optimization
- Handles click events for navigation links

## Props Interface

### ChangelogItem Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | `undefined` | Additional CSS classes to apply to the component |
| `bordered` | `boolean` | No | `undefined` | Whether to show a top border separator |
| `changelog` | `Changelog` | Yes | - | The changelog data object containing title, body, dates, and ID |
| `link` | `{ href: string; external?: boolean }` | No | `undefined` | Optional link configuration for making the item clickable |
| `variant` | `'preview' \| 'full'` | No | `'preview'` | Display variant controlling layout and content visibility |

### Changelog Type Structure

```typescript
interface Changelog {
  id: number;
  Title?: string;
  Body: string;
  effectiveDate?: string;
  created_at: string;
}
```

## Usage Example

```tsx
import { ChangelogItem } from '@/components/developers/changelog-item/changelog-item';

// Basic preview usage
<ChangelogItem
  changelog={{
    id: 1,
    Title: "API Rate Limiting Updates",
    Body: "We've increased rate limits for authenticated users...",
    effectiveDate: "2024-01-15T10:00:00Z",
    created_at: "2024-01-15T10:00:00Z"
  }}
  variant="preview"
  bordered
/>

// Full detail view with external link
<ChangelogItem
  changelog={changelogData}
  variant="full"
  link={{
    href: "/changelog/api-updates-jan-2024",
    external: false
  }}
  className="mb-6"
/>

// Clickable preview item
<ChangelogItem
  changelog={changelogData}
  variant="preview"
  link={{ href: "/changelog/item/123" }}
  bordered
/>
```

## Functionality

### Core Features

- **Dual Display Modes**: Preview mode shows condensed information; full mode renders complete markdown content
- **Markdown Rendering**: Full markdown support with GitHub Flavored Markdown (GFM) and raw HTML
- **Custom MDX Components**: Enhanced rendering with custom anchor links, headings, and code blocks
- **Date Formatting**: Automatic date formatting using `date-fns` (e.g., "Jan 15")
- **Interactive Navigation**: Optional link wrapping with support for external links
- **Responsive Design**: Adaptive layout that adjusts between mobile and desktop views

### Styling Variants

- **Preview**: Compact layout with hover effects, suitable for lists
- **Full**: Expanded layout with borders and full content display

### Custom Markdown Components

The component includes custom MDX components for enhanced rendering:
- `AnchorMdx`: Custom link styling and behavior
- `H1Mdx`, `H2Mdx`, `H3Mdx`, `H4Mdx`: Styled heading components
- `PreMdx`: Enhanced code block rendering

## State Management

**Local State Only** - This component uses:
- `useMemo` for performance optimization of computed props
- No external state management (TanStack Query/Zustand)
- Props-driven rendering with no internal state mutations

The component follows a pure, functional approach where all data flows through props.

## Side Effects

**Minimal Side Effects**:
- Date formatting operations via `date-fns`
- Markdown parsing and rendering via `ReactMarkdown`
- No API calls or external data fetching
- No localStorage or sessionStorage interactions

## Dependencies

### UI Components
- `Typography` - Text rendering and styling
- Custom MDX components (`AnchorMdx`, `H1Mdx`, etc.)

### External Libraries
- `ReactMarkdown` - Markdown parsing and rendering
- `remark-gfm` - GitHub Flavored Markdown support
- `rehype-raw` - Raw HTML support in markdown
- `date-fns` - Date formatting utilities
- `class-variance-authority` - Variant-based styling

### Internal Dependencies
- `Changelog` type from `@/lib/types`
- `cn` utility for className merging
- Next.js `Link` component for navigation

## Integration

### Application Architecture

The component integrates into the developer documentation ecosystem:

```
developers/
├── changelog-page/          # Parent changelog listing
├── changelog-detail/        # Individual changelog pages
└── changelog-item/          # This component
    ├── changelog-item.tsx
    └── customMdx/          # Custom markdown components
```

### Usage Patterns

1. **Changelog Lists**: Multiple preview items in a feed-like layout
2. **Featured Updates**: Full variant for highlighting important changes
3. **Navigation Hub**: Linked items for routing to detailed views
4. **Documentation Embeds**: Inline changelog items within other content

## Best Practices

### Architecture Adherence

✅ **Component Decomposition**: 
- Properly separates presentation (`ChangelogItem`) from internal logic (`ChangelogInnerInner`)
- Flat component structure without deep nesting

✅ **Reusability**: 
- Configurable variants for different use cases
- Props-driven design allows flexible integration
- Custom MDX components are modular and reusable

✅ **Performance**: 
- Uses `useMemo` for expensive computations
- Efficient prop passing and component splitting

✅ **Type Safety**: 
- Comprehensive TypeScript interfaces
- Proper variant typing with `class-variance-authority`

### Implementation Guidelines

- Always provide the required `changelog` prop with complete data
- Use `variant="preview"` for lists, `variant="full"` for detailed views
- Set `bordered={true}` when stacking multiple items vertically
- Include `link` prop for interactive/navigable items
- Leverage custom className for specific styling needs

### Integration Recommendations

- Combine with pagination for large changelog lists
- Use consistent `effectiveDate` formatting across the application
- Implement proper loading states when fetching changelog data
- Consider accessibility when using as clickable items (proper ARIA labels)