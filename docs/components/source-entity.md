# SourceEntity Components

## Purpose

The `SourceEntity` and `SourceEntitySimple` components display information about news sources and media entities, including their logos, names, domains, bias ratings, and paywall status. These components are designed to provide consistent visual representation of source information across the application with loading states and customizable display options.

## Props Interface

### SourceEntityProps

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `domain` | `string` | ✅ | - | The domain of the source to fetch and display |
| `subTitle` | `string` | ❌ | - | Optional subtitle text to display below the source name |
| `logoType` | `'favicon' \| 'square-logo'` | ❌ | `'favicon'` | Type of logo to display - favicon or square logo |
| `classNames` | `{ name?: string }` | ❌ | - | Custom class names for specific elements |
| `hideLabels` | `boolean` | ❌ | `false` | Hide the labels section |
| `hideName` | `boolean` | ❌ | `false` | Hide the source name |
| `hideSubTitle` | `boolean` | ❌ | `false` | Hide the subtitle/domain text |
| `showDomain` | `boolean` | ❌ | `false` | Show the domain alongside the name |
| `titleLabel` | `ReactNode` | ❌ | - | Additional content to display in the title row |
| `logoSize` | `VariantProps<typeof avatarVariants>['size']` | ❌ | `64` | Size of the logo/favicon |
| `labels` | `string[]` | ❌ | - | Array of labels to display as tags |
| `className` | `string` | ❌ | - | Additional CSS classes for the root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | ❌ | - | Standard HTML div attributes |

## Usage Examples

### Basic SourceEntity

```tsx
import { SourceEntity } from '@/components/ui/source-entity';

function NewsSourceCard() {
  return (
    <SourceEntity
      domain="reuters.com"
      subTitle="International News Agency"
      className="p-4 rounded-lg bg-pgBackground-50 border border-pgStroke-200"
    />
  );
}
```

### SourceEntity with Custom Labels

```tsx
import { SourceEntity } from '@/components/ui/source-entity';

function CategorySourceCard() {
  return (
    <SourceEntity
      domain="techcrunch.com"
      logoType="square-logo"
      logoSize={48}
      labels={["Technology", "Startup"]}
      showDomain={true}
      className="hover:bg-pgBackground-100 transition-colors"
      classNames={{
        name: "flex-1"
      }}
    />
  );
}
```

### Simple Source Display

```tsx
import { SourceEntitySimple } from '@/components/ui/source-entity';

function CompactSourceList() {
  const sources = ["bbc.com", "cnn.com", "reuters.com"];
  
  return (
    <div className="space-y-2">
      {sources.map(domain => (
        <SourceEntitySimple
          key={domain}
          domain={domain}
          className="p-2 rounded border border-pgStroke-100 hover:border-pgStroke-300"
        />
      ))}
    </div>
  );
}
```

### Loading State Example

```tsx
function SourceWithLoadingState({ domain, isReady }) {
  if (!isReady) {
    return (
      <div className="flex items-center gap-2 p-4">
        <div className="size-4 rounded-full bg-pgNeutral-200 animate-pulse" />
        <div className="h-4 w-32 bg-pgNeutral-200 rounded animate-pulse" />
      </div>
    );
  }
  
  return <SourceEntity domain={domain} />;
}
```

## Design System Usage

### Typography Classes
- **Source Name**: `.typography-paragraphXSmall` with `color='950'` for primary text
- **Subtitle/Domain**: `.typography-paragraphXSmall` with `color='700'` for secondary text
- Both use `line-clamp-1` for text truncation

### Color Tokens
- **Primary Text**: `pgText-950` for source names
- **Secondary Text**: `pgText-700` for subtitles and domains with `opacity-80`
- **Background Elements**: `bg-alphaNeutral/16` for bias and paywall icons
- **Skeleton Loading**: Uses `pgNeutral-200` equivalent for loading states

### Spacing & Layout
- **Gap Spacing**: `gap-2` (8px) between logo and content, `gap-1` (4px) for icon groups
- **Padding**: Flexible padding through className prop
- **Max Width**: Responsive max-width constraints (`max-w-30`, `max-w-52`, `max-w-[210px]`)

## Styling

### Available Customizations

```tsx
// Custom logo sizing
<SourceEntity 
  domain="example.com"
  logoSize={32} // or 16, 48, 64, etc.
/>

// Hide specific elements
<SourceEntity 
  domain="example.com"
  hideName={true}
  hideSubTitle={true}
  hideLabels={true}
/>

// Custom styling
<SourceEntity 
  domain="example.com"
  className="border-l-4 border-l-pgBlue-500 pl-4"
  classNames={{
    name: "font-semibold"
  }}
/>
```

### Component Variants

1. **Full SourceEntity**: Complete display with logo, name, subtitle, bias rating, paywall indicator, and labels
2. **SourceEntitySimple**: Minimal display with just logo, name, and indicators

## Responsive Design

The component adapts across breakpoints:

- **Mobile (< 640px)**: Uses `max-w-30` for text constraints
- **Desktop (≥ 1024px)**: Expands to `max-w-[210px]` and `max-w-none` for better text display
- **Flexible Layout**: Uses flexbox with `flex-wrap` behavior for responsive label positioning

```tsx
// Responsive text constraints
<Typography className="max-w-30 line-clamp-1 lg:max-w-[210px]">
  {data?.name}
</Typography>
```

## Accessibility

### Built-in Features
- **Alt Text**: Proper alt attributes for favicon/logo images using source name
- **Semantic HTML**: Uses semantic div structure with proper heading hierarchy
- **Keyboard Navigation**: Inherits standard div focus behavior
- **Screen Reader Support**: Text content is properly structured for screen readers

### Accessibility Enhancements
```tsx
// Add ARIA labels for better context
<SourceEntity 
  domain="example.com"
  aria-label="News source information"
  role="article"
/>

// For interactive usage
<SourceEntity 
  domain="example.com"
  tabIndex={0}
  role="button"
  aria-describedby="source-description"
/>
```

## Dependencies

### Internal Components
- **`Avatar`**: Uses `avatarVariants` for logo sizing options
- **`BiasIcon`**: Displays source bias rating with visual indicator
- **`Favicon`**: Handles logo/favicon display with fallbacks
- **`SearchFilterTagBase`**: Renders source labels/tags
- **`Skeleton`**: Provides loading state placeholders  
- **`Typography`**: Handles text rendering with design system styles

### External Dependencies
- **`useSourceByDomain`**: Custom hook for fetching source data
- **`class-variance-authority`**: For component variant props
- **Icons**: `Dollar` icon for paywall indicators

### Utility Functions
- **`cn`**: Utility for conditional class name merging
- **`HTMLAttributes<HTMLDivElement>`**: Standard React HTML props

## Loading States

Both components include built-in loading states with skeleton placeholders:

```tsx
// Automatic loading state
if (isLoading) {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-4 rounded-full" />
      <Skeleton className="h-2 w-28 rounded-lg" />
    </div>
  );
}
```

The loading states use the `Skeleton` component with appropriate sizing to match the final rendered content dimensions.