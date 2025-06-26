# SearchLimitBanner Component

## Purpose

The `SearchLimitBanner` component displays an informational banner to non-authenticated users indicating that search results are limited to a single page. It serves as a conversion tool by encouraging users to sign up for a free account to access unlimited search results, featuring a clear call-to-action button that directs users to the registration page.

## Component Type

**Server Component** - This is a pure presentational component with static content and no client-side interactivity. It renders consistent markup and styling without requiring browser APIs, user events, or dynamic state, making it ideal for server-side rendering to improve initial page load performance.

## Props Interface

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| N/A | N/A | N/A | N/A | This component accepts no props and renders static content |

## Usage Example

```tsx
import { SearchLimitBanner } from '@/components/search/all-results/search-limit-banner';

// In a search results page component
export default function SearchResultsPage() {
  const isAuthenticated = await checkUserAuthentication();
  
  return (
    <div className="search-results-container">
      <SearchFilters />
      <SearchResults />
      
      {/* Show banner only for non-authenticated users */}
      {!isAuthenticated && <SearchLimitBanner />}
      
      <SearchPagination />
    </div>
  );
}

// In a search layout component
export default function AllResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="search-layout">
      <SearchHeader />
      {children}
      <SearchLimitBanner />
    </div>
  );
}
```

## Functionality

- **Visual Notice**: Displays a prominent banner with warning-style colors (pgStateAway theme) to catch user attention
- **Limitation Messaging**: Clearly communicates that search results are restricted for non-authenticated users
- **Call-to-Action**: Provides a direct link to the sign-up page with appropriate styling and accessibility
- **Responsive Design**: Adapts layout between mobile (`mx-7`, `max-w-fit`) and desktop (`lg:mx-0`, `lg:max-w-full`) viewports
- **Dark Mode Support**: Includes `dark:backdrop-blur-lg` for proper dark theme integration

## State Management

**No State Management** - This component is completely stateless and renders the same content on every render. All styling and content are static, following the principle of keeping presentational components simple and predictable.

## Side Effects

**No Side Effects** - The component performs no API calls, external data fetching, or browser interactions. It's a pure presentational component that renders static markup and relies on Next.js routing for navigation.

## Dependencies

### Internal Dependencies
- `@/components/ui/link-button` - Styled button component for the sign-up CTA
- `@/components/ui/typography` - Consistent text styling and typography system
- `@/lib/utils/cn` - Utility for conditional CSS class composition

### External Dependencies
- `next/link` - Next.js client-side navigation for the sign-up link
- `react` - Base React library for component structure

### Design System Dependencies
- **Color Tokens**: Uses `pgStateAway-*` color variants for warning/informational styling
- **Responsive Utilities**: Leverages Tailwind CSS responsive prefixes for mobile-first design
- **Border/Layout**: Follows design system patterns for cards and containers

## Integration

### Application Architecture Role
- **Feature Component**: Part of the search domain (`/search/all-results/`)
- **Conversion Funnel**: Acts as a strategic touchpoint in the user acquisition flow
- **Authentication Gating**: Works in conjunction with authentication checks to show/hide appropriately

### Layout Integration
```tsx
// Typical integration pattern
{!user && <SearchLimitBanner />}
{hasMoreResults && !user && <SearchLimitBanner />}
{searchResults.length >= RESULTS_LIMIT && !user && <SearchLimitBanner />}
```

### Navigation Flow
The component integrates with the application's authentication flow by directing users to `/sign-up`, which should handle:
- New user registration
- Redirect back to search results after successful signup
- Progressive enhancement of search capabilities

## Best Practices

### ✅ Follows Architecture Guidelines
- **Server Component Default**: Uses server component appropriately for static content
- **Component Decomposition**: Single responsibility focused on limit messaging
- **UI Component Usage**: Leverages reusable UI components (`LinkButton`, `Typography`)
- **Domain Organization**: Properly located in search feature directory

### ✅ Implementation Patterns
- **Responsive First**: Mobile-optimized with desktop enhancements
- **Accessibility**: Semantic HTML structure with clear call-to-action
- **Design System**: Consistent use of color tokens and spacing utilities
- **Performance**: No unnecessary client-side JavaScript or state

### ✅ Integration Best Practices
- **Conditional Rendering**: Should be wrapped in authentication checks by parent components
- **User Experience**: Clear messaging with actionable next steps
- **Conversion Optimization**: Strategic placement and compelling copy to drive sign-ups