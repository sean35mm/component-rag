# Progress Component

## Purpose

The Progress component provides a visual representation of task completion or loading states. Built on Radix UI's Progress primitive, it displays a horizontal progress bar with smooth animations and full accessibility support. The component is designed to show completion percentage with a clean, modern appearance that integrates seamlessly with our design system.

## Props Interface

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `className` | `string` | No | - | Additional CSS classes to apply to the progress container |
| `value` | `number` | No | `0` | Progress value between 0-100 representing completion percentage |
| `max` | `number` | No | `100` | Maximum value for the progress bar |
| `getValueLabel` | `(value: number, max: number) => string` | No | - | Function to generate accessible label for screen readers |
| ...props | `React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>` | No | - | All other Radix Progress Root props |

## Usage Example

```tsx
import { Progress } from '@/components/ui/progress';

function ProgressExample() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {/* Basic Progress */}
      <div className="space-y-2">
        <div className="typography-labelMedium text-pgText-700">
          Basic Progress
        </div>
        <Progress value={progress} className="w-full" />
        <div className="typography-paragraphSmall text-pgText-500">
          {progress}% complete
        </div>
      </div>

      {/* Custom Styled Progress */}
      <div className="space-y-2">
        <div className="typography-labelMedium text-pgText-700">
          Custom Height & Color
        </div>
        <Progress 
          value={75} 
          className="h-2 w-full bg-pgBackground-100 dark:bg-pgBackground-800" 
        />
      </div>

      {/* Small Progress Indicator */}
      <div className="space-y-2">
        <div className="typography-labelMedium text-pgText-700">
          Compact Size
        </div>
        <Progress 
          value={90} 
          className="h-1 w-48 bg-pgNeutral-200 dark:bg-pgNeutral-700" 
        />
      </div>
    </div>
  );
}
```

## Design System Usage

### Typography Classes
- **Labels**: Use `.typography-labelMedium` or `.typography-labelSmall` for progress descriptions
- **Paragraphs**: Use `.typography-paragraphSmall` or `.typography-paragraphXSmall` for percentage indicators
- **Subheadings**: Use `.typography-subheadingSmall` for section headers containing progress bars

### Color Tokens
- **Background**: 
  - Default: `bg-alphaNeutral/16` (semi-transparent neutral)
  - Alternatives: `bg-pgBackground-100`, `bg-pgNeutral-200`, `bg-pgStroke-200`
- **Progress Fill**: 
  - Default: `bg-pgIcon-600`
  - Success: `bg-pgStateSuccess-base`, `bg-pgGreen-600`
  - Warning: `bg-pgStateWarning-base`, `bg-pgOrange-600`
  - Error: `bg-pgStateError-base`, `bg-pgRed-600`
  - Information: `bg-pgStateInformation-base`, `bg-pgBlue-600`

### Spacing & Layout
- **Default Height**: `h-[0.375rem]` (6px)
- **Common Variants**: `h-1` (4px), `h-2` (8px), `h-3` (12px)
- **Width**: Typically `w-full` or specific widths like `w-48`, `w-64`

## Styling

### Height Variants
```tsx
{/* Extra small - 2px */}
<Progress value={50} className="h-0.5" />

{/* Small - 4px */}
<Progress value={50} className="h-1" />

{/* Default - 6px */}
<Progress value={50} />

{/* Medium - 8px */}
<Progress value={50} className="h-2" />

{/* Large - 12px */}
<Progress value={50} className="h-3" />
```

### Color Variants
```tsx
{/* Success State */}
<Progress 
  value={100} 
  className="bg-pgStateSuccess-lighter [&>div]:bg-pgStateSuccess-base" 
/>

{/* Warning State */}
<Progress 
  value={75} 
  className="bg-pgStateWarning-lighter [&>div]:bg-pgStateWarning-base" 
/>

{/* Error State */}
<Progress 
  value={25} 
  className="bg-pgStateError-lighter [&>div]:bg-pgStateError-base" 
/>

{/* Custom Brand Color */}
<Progress 
  value={60} 
  className="bg-pgBlue-100 [&>div]:bg-pgBlue-600" 
/>
```

### Background Variants
```tsx
{/* Light Background */}
<Progress 
  value={45} 
  className="bg-pgBackground-100 dark:bg-pgBackground-800" 
/>

{/* Stroke Background */}
<Progress 
  value={70} 
  className="bg-pgStroke-200 dark:bg-pgStroke-700" 
/>

{/* Neutral Background */}
<Progress 
  value={85} 
  className="bg-pgNeutral-200 dark:bg-pgNeutral-700" 
/>
```

## Responsive Design

The Progress component adapts well across all breakpoints:

```tsx
<Progress 
  value={progress}
  className={cn(
    "h-1.5 w-full",
    "sm:h-2 sm:w-80",
    "md:h-2.5 md:w-96",
    "lg:h-3 lg:w-[32rem]",
    "xl:w-[40rem]"
  )}
/>
```

### Responsive Progress Layout
```tsx
<div className="space-y-3 sm:space-y-4">
  <div className="typography-labelSmall sm:typography-labelMedium text-pgText-700">
    Upload Progress
  </div>
  <Progress 
    value={uploadProgress} 
    className="h-1 sm:h-1.5 md:h-2 w-full" 
  />
  <div className="typography-paragraphXSmall sm:typography-paragraphSmall text-pgText-500">
    {uploadProgress}% of 2.4 MB uploaded
  </div>
</div>
```

## Accessibility

The Progress component includes comprehensive accessibility features:

- **ARIA Attributes**: Automatically includes `role="progressbar"`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- **Screen Reader Support**: Progress value is announced to screen readers
- **Custom Labels**: Use `getValueLabel` prop for custom accessible descriptions
- **Semantic HTML**: Built on semantic progress elements

### Accessibility Example
```tsx
<Progress
  value={progress}
  max={100}
  getValueLabel={(value, max) => `${value} of ${max} items processed`}
  className="w-full"
  aria-label="File upload progress"
/>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils/cn` - Utility function for conditional class name merging

### External Dependencies
- `@radix-ui/react-progress` - Accessible progress primitive component
- `react` - React library for component functionality

### Related Components
- **Loading** - For indeterminate loading states
- **Skeleton** - For content loading placeholders
- **Badge** - For displaying completion status
- **Card** - Common container for progress indicators

### Usage with Related Components
```tsx
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

<Card className="p-4 space-y-4">
  <div className="flex justify-between items-center">
    <div className="typography-labelMedium text-pgText-700">
      Task Progress
    </div>
    <Badge variant="secondary" className="typography-label2XSmall">
      {Math.round(progress)}%
    </Badge>
  </div>
  <Progress value={progress} className="w-full" />
</Card>
```