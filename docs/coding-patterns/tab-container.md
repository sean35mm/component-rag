# TabContainer Component Pattern

## Pattern Overview

The `TabContainer` component implements a **layout container pattern** that provides responsive width constraints and proper spacing for tab-based content layouts. This pattern is particularly useful for creating consistent, centered content areas that adapt to different screen sizes while maintaining optimal readability and visual hierarchy.

**When to use this pattern:**
- Creating tab-based interfaces with consistent width constraints
- Implementing responsive layouts that need different behaviors on mobile vs desktop
- Building chat interfaces or similar content that requires specific overflow handling
- Establishing consistent spacing and centering for main content areas

## Architecture

```
TabContainer
├── Props Interface (TabContainerProps)
├── Styling System Integration (cn utility)
├── Responsive Layout Logic
└── Children Rendering
```

The component follows a **wrapper pattern** architecture:
- **Container Layer**: Provides structural layout and responsive behavior
- **Styling Layer**: Handles responsive classes and custom styling
- **Content Layer**: Renders child components without modification

## Implementation Details

### Core Implementation Techniques

1. **CSS Custom Properties Integration**
   ```tsx
   'lg:max-w-[var(--max-tab-width)]'
   ```
   Uses CSS custom properties for dynamic width configuration, allowing theme-level control over tab container dimensions.

2. **Conditional Class Merging**
   ```tsx
   className={cn(
     'h-full lg:mx-auto lg:max-w-[var(--max-tab-width)]',
     className
   )}
   ```
   Merges default styles with optional custom classes using the `cn` utility.

3. **Responsive Design Pattern**
   ```tsx
   // Mobile: full width, no constraints
   // Desktop (lg+): centered with max-width constraint
   ```

4. **Overflow Handling Strategy**
   ```tsx
   // Intentionally avoids overflow-hidden to prevent layout issues
   // Specific consideration for sticky elements in chat interfaces
   ```

## Usage Examples

### Basic Usage
```tsx
import { TabContainer } from '@/components/main-layout/tab-container';

function MyTabInterface() {
  return (
    <TabContainer>
      <div>Tab content goes here</div>
    </TabContainer>
  );
}
```

### With Custom Styling
```tsx
import { TabContainer } from '@/components/main-layout/tab-container';

function CustomTabInterface() {
  return (
    <TabContainer className="bg-slate-100 p-4 rounded-lg">
      <TabPanel>
        <h2>Dashboard</h2>
        <p>Dashboard content...</p>
      </TabPanel>
    </TabContainer>
  );
}
```

### Chat Interface Usage
```tsx
import { TabContainer } from '@/components/main-layout/tab-container';

function ChatInterface() {
  return (
    <TabContainer>
      <div className="sticky top-0 bg-white border-b">
        {/* Sticky header - works because container doesn't have overflow-hidden */}
        <SourceBar />
      </div>
      <div className="flex-1">
        <ChatMessages />
      </div>
    </TabContainer>
  );
}
```

### Multiple Children
```tsx
function ComplexTabLayout() {
  return (
    <TabContainer className="space-y-4">
      <Header />
      <Navigation />
      <MainContent />
      <Footer />
    </TabContainer>
  );
}
```

## Best Practices

### 1. CSS Custom Properties Setup
```css
/* In your CSS/theme file */
:root {
  --max-tab-width: 1200px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :root {
    --max-tab-width: 100%;
  }
}
```

### 2. Proper Class Ordering
```tsx
// ✅ Good: Specific classes last for proper override
<TabContainer className="bg-custom border-custom" />

// ❌ Avoid: May not override default styles properly
<TabContainer className="h-auto bg-custom" /> // h-auto may not override h-full
```

### 3. Responsive Considerations
```tsx
// ✅ Good: Consider mobile-first approach
<TabContainer className="p-2 lg:p-6">
  {/* Content adapts to container padding */}
</TabContainer>

// ✅ Good: Test sticky elements
<TabContainer>
  <div className="sticky top-0">Sticky Header</div>
  <div>Scrollable content</div>
</TabContainer>
```

## Integration

### Theme System Integration
```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'tab-max': 'var(--max-tab-width)',
      }
    }
  }
}
```

### Layout System Integration
```tsx
// Main layout component
function MainLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <TabContainer>
        <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </TabContainer>
    </div>
  );
}
```

### State Management Integration
```tsx
// With context providers
function AppWithProviders() {
  return (
    <ThemeProvider>
      <TabContainer>
        <ChatProvider>
          <ChatInterface />
        </ChatProvider>
      </TabContainer>
    </ThemeProvider>
  );
}
```

## Type Safety

### Interface Design
```tsx
export interface TabContainerProps {
  className?: string;           // Optional styling override
  children?: ReactNode | ReactNode[]; // Flexible children handling
}
```

### Enhanced Type Safety
```tsx
// Extended interface for specific use cases
interface ExtendedTabContainerProps extends TabContainerProps {
  'data-testid'?: string;
  role?: string;
  'aria-label'?: string;
}

// Generic version for typed children
interface TypedTabContainerProps<T = ReactNode> extends Omit<TabContainerProps, 'children'> {
  children?: T;
}
```

### Type Guards
```tsx
// Type guard for validation
function isValidTabContainerProps(props: unknown): props is TabContainerProps {
  return (
    typeof props === 'object' &&
    props !== null &&
    ('className' in props ? typeof props.className === 'string' : true)
  );
}
```

## Performance

### Optimization Strategies

1. **CSS-in-JS Avoidance**
   ```tsx
   // ✅ Good: Static classes for better performance
   const baseClasses = 'h-full lg:mx-auto lg:max-w-[var(--max-tab-width)]';
   
   // ❌ Avoid: Dynamic style objects
   const dynamicStyles = { height: '100%', maxWidth: 'var(--max-tab-width)' };
   ```

2. **Class Name Optimization**
   ```tsx
   // ✅ Good: Memoize complex class computations
   const containerClasses = useMemo(() => cn(
     'h-full lg:mx-auto lg:max-w-[var(--max-tab-width)]',
     className
   ), [className]);
   ```

3. **Bundle Size Considerations**
   ```tsx
   // Component is lightweight - minimal bundle impact
   // Only depends on React and cn utility
   ```

### Performance Monitoring
```tsx
// Development-only performance wrapper
const TabContainer = process.env.NODE_ENV === 'development' 
  ? React.memo(TabContainerComponent)
  : TabContainerComponent;
```

## Testing

### Unit Testing
```tsx
// TabContainer.test.tsx
import { render, screen } from '@testing-library/react';
import { TabContainer } from './tab-container';

describe('TabContainer', () => {
  it('renders children correctly', () => {
    render(
      <TabContainer>
        <div data-testid="child">Test Content</div>
      </TabContainer>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <TabContainer className="custom-class" data-testid="container">
        <div>Content</div>
      </TabContainer>
    );
    
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveClass('h-full');
  });

  it('handles multiple children', () => {
    render(
      <TabContainer>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
      </TabContainer>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});
```

### Integration Testing
```tsx
// Integration with routing
it('works with router navigation', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <TabContainer>
        <Routes>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </TabContainer>
    </MemoryRouter>
  );
  
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});
```

### Visual Testing
```tsx
// Storybook stories
export const Default = {
  args: {
    children: <div className="p-4 bg-gray-100">Sample content</div>
  }
};

export const WithCustomStyling = {
  args: {
    className: "bg-blue-50 border border-blue-200",
    children: <div className="p-4">Custom styled content</div>
  }
};
```

## Common Pitfalls

### 1. Overflow Handling
```tsx
// ❌ Avoid: Adding overflow-hidden breaks sticky elements
<TabContainer className="overflow-hidden">
  <div className="sticky top-0">Won't stick properly</div>
</TabContainer>

// ✅ Good: Let container handle overflow naturally
<TabContainer>
  <div className="sticky top-0">Sticks properly</div>
</TabContainer>
```

### 2. Responsive Design Issues
```tsx
// ❌ Avoid: Hardcoded max-width overrides responsive behavior
<TabContainer className="max-w-4xl">
  {/* May not work well on mobile */}
</TabContainer>

// ✅ Good: Use responsive utilities
<TabContainer className="max-w-sm lg:max-w-4xl">
  {/* Adapts to screen size */}
</TabContainer>
```

### 3. CSS Custom Property Dependencies
```tsx
// ❌ Avoid: Not defining CSS custom properties
// Will fall back to default max-width behavior

// ✅ Good: Ensure CSS custom properties are defined
/* In CSS */
:root {
  --max-tab-width: 1200px;
}
```

### 4. Class Name Conflicts
```tsx
// ❌ Avoid: Classes that conflict with defaults
<TabContainer className="h-auto"> {/* Conflicts with h-full */}

// ✅ Good: Use complementary classes
<TabContainer className="min-h-screen"> {/* Works with h-full */}
```

### 5. Accessibility Oversights
```tsx
// ❌ Avoid: Missing semantic structure
<TabContainer>
  <div>Tab 1</div>
  <div>Tab 2</div>
</TabContainer>

// ✅ Good: Proper semantic structure
<TabContainer role="tabpanel" aria-label="Main content">
  <div role="tab">Tab 1</div>
  <div role="tab">Tab 2</div>
</TabContainer>
```