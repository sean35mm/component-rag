# Dialog Component Pattern

## Pattern Overview

The Dialog component pattern implements a reusable, accessible modal dialog system built on top of Radix UI primitives. This pattern provides a comprehensive solution for creating overlay dialogs with consistent styling, animations, and behavior across an application.

**When to use this pattern:**
- Modal confirmations and alerts
- Forms that require user focus
- Complex user interactions that need isolation
- Data entry workflows
- Settings panels and configuration dialogs

## Architecture

### Component Hierarchy
```
Dialog (Root)
├── DialogTrigger
├── DialogPortal
│   ├── DialogOverlay
│   └── DialogContent
│       ├── DialogHeader
│       │   ├── DialogTitle
│       │   ├── DialogDescription
│       │   └── DialogClose (optional)
│       ├── DialogContentDivider (optional)
│       └── DialogFooter
```

### Key Architectural Decisions

1. **Primitive Re-exports**: Direct exports of Radix primitives for maximum flexibility
2. **Styled Wrappers**: Enhanced components with consistent styling and behavior
3. **Variant-based Styling**: Using `class-variance-authority` for configurable appearances
4. **Composition Pattern**: Allowing flexible dialog construction through composable parts

## Implementation Details

### Core Techniques

1. **Primitive Wrapping Strategy**
```tsx
// Direct re-export for maximum flexibility
export const Dialog = DialogPrimitive.Root;

// Enhanced wrapper with styling
export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  // Implementation with enhanced styling
));
```

2. **Variant System Implementation**
```tsx
const dialogHeaderVariants = cva('flex px-5 py-4', {
  variants: {
    divider: { true: 'border-b border-alphaNeutral/16' },
  },
  defaultVariants: { divider: true },
});
```

3. **Automatic Portal and Overlay Integration**
```tsx
export const DialogContent = forwardRef((props, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content>
      {/* Content */}
    </DialogPrimitive.Content>
  </DialogPortal>
));
```

## Usage Examples

### Basic Dialog
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to perform this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Form Dialog with Controlled State
```tsx
function FormDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async () => {
    // Process form data
    await submitForm(formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle size="l">Create New User</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new user account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-5 py-4 space-y-4">
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Complex Dialog with Sections
```tsx
function ComplexDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader divider={true}>
          <DialogTitle size="l">Application Settings</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col">
          <DialogContentDivider label="General Settings" />
          <div className="px-5 py-4">
            {/* General settings content */}
          </div>
          
          <DialogContentDivider label="Advanced Options" />
          <div className="px-5 py-4">
            {/* Advanced settings content */}
          </div>
        </div>

        <DialogFooter alt={false}>
          <Button variant="outline">Reset</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Best Practices

### 1. State Management
```tsx
// ✅ Use controlled state for complex interactions
const [dialogOpen, setDialogOpen] = useState(false);

// ✅ Handle cleanup on close
const handleClose = () => {
  setFormData(initialState);
  setDialogOpen(false);
};
```

### 2. Accessibility
```tsx
// ✅ Always provide titles and descriptions
<DialogHeader>
  <DialogTitle>Action Required</DialogTitle>
  <DialogDescription>
    This action cannot be undone.
  </DialogDescription>
</DialogHeader>

// ✅ Use proper close button labeling
<DialogClose>
  <PiCloseLine />
  <span className="sr-only">Close</span>
</DialogClose>
```

### 3. Content Structure
```tsx
// ✅ Use consistent spacing and structure
<DialogContent>
  <DialogHeader>
    {/* Header content */}
  </DialogHeader>
  
  <div className="px-5 py-4">
    {/* Main content with consistent padding */}
  </div>
  
  <DialogFooter>
    {/* Footer actions */}
  </DialogFooter>
</DialogContent>
```

### 4. Animation and Performance
```tsx
// ✅ Let the component handle animations
// The built-in animations are optimized and accessible

// ✅ Use DialogPortal for proper layering
// This is handled automatically in DialogContent
```

## Integration

### With Form Libraries
```tsx
import { useForm } from 'react-hook-form';

function FormIntegrationDialog() {
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    // Process form
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog content with form integration */}
    </Dialog>
  );
}
```

### With State Management
```tsx
// Redux/Zustand integration
function StateIntegratedDialog() {
  const { isDialogOpen, closeDialog } = useAppStore();
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      {/* Dialog content */}
    </Dialog>
  );
}
```

## Type Safety

### Key Type Patterns

1. **Variant Props Integration**
```tsx
export interface DialogHeaderProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof dialogHeaderVariants> {
  closeable?: boolean;
}
```

2. **Forwarded Ref Typing**
```tsx
export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>((props, ref) => {
  // Implementation
});
```

3. **Extended Component Props**
```tsx
export interface DialogFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogFooterVariants> {}
```

### Custom Hook Typing
```tsx
interface DialogState {
  isOpen: boolean;
  data?: any;
}

function useDialog<T = any>() {
  const [state, setState] = useState<DialogState>({ isOpen: false });
  
  const openDialog = (data?: T) => {
    setState({ isOpen: true, data });
  };
  
  const closeDialog = () => {
    setState({ isOpen: false, data: undefined });
  };
  
  return { ...state, openDialog, closeDialog };
}
```

## Performance

### Optimization Strategies

1. **Lazy Loading Dialog Content**
```tsx
const LazyDialogContent = lazy(() => import('./HeavyDialogContent'));

function OptimizedDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <Suspense fallback={<DialogSkeleton />}>
          <LazyDialogContent />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
```

2. **Memoized Dialog Components**
```tsx
const MemoizedDialogContent = memo(({ data }) => (
  <DialogContent>
    {/* Expensive content rendering */}
  </DialogContent>
));
```

3. **Portal Optimization**
```tsx
// The DialogPortal automatically handles efficient DOM mounting
// No additional optimization needed for basic use cases
```

## Testing

### Unit Testing Approach
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog, DialogContent, DialogTrigger } from './dialog';

describe('Dialog Component', () => {
  it('opens and closes correctly', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <div>Dialog Content</div>
        </DialogContent>
      </Dialog>
    );

    // Initially closed
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();

    // Open dialog
    fireEvent.click(screen.getByText('Open Dialog'));
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();

    // Close with escape
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
    });
  });

  it('handles controlled state', () => {
    const handleOpenChange = jest.fn();
    
    render(
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialodContent>Content</DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
```

### Integration Testing
```tsx
// Test dialog within application context
describe('Dialog Integration', () => {
  it('integrates with form submission', async () => {
    const mockSubmit = jest.fn();
    
    render(<FormDialog onSubmit={mockSubmit} />);
    
    // Open dialog, fill form, submit
    fireEvent.click(screen.getByText('Open Form'));
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
    });
  });
});
```

## Common Pitfalls

### 1. Portal and Focus Management
```tsx
// ❌ Don't manually manage focus
useEffect(() => {
  if (open) {
    document.getElementById('first-input')?.focus();
  }
}, [open]);

// ✅ Let Radix handle focus management
// Focus is automatically managed by the primitive
```

### 2. State Cleanup
```tsx
// ❌ Forgetting to clean up state
<Dialog onOpenChange={setOpen}>
  {/* State persists when dialog closes */}
</Dialog>

// ✅ Clean up on close
<Dialog onOpenChange={(open) => {
  setOpen(open);
  if (!open) {
    resetFormState();
  }
}}>
```

### 3. Accessibility Issues
```tsx
// ❌ Missing semantic information
<DialogContent>
  <div>Important Message</div>
</DialogContent>

// ✅ Proper semantic structure
<DialogContent>
  <DialogHeader>
    <DialogTitle>Important Message</DialogTitle>
    <DialogDescription>
      Please review the following information.
    </DialogDescription>
  </DialogHeader>
</DialogContent>
```

### 4. Performance Issues
```tsx
// ❌ Heavy computations in render
<DialogContent>
  {heavyComputation(data)}
</DialogContent>

// ✅ Memoize expensive operations
const processedData = useMemo(() => heavyComputation(data), [data]);

<DialogContent>
  {processedData}
</DialogContent>
```

### 5. Animation Conflicts
```tsx
// ❌ Overriding built-in animations incorrectly
<DialogContent className="animate-bounce">
  {/* Conflicts with built-in animations */}
</DialogContent>

// ✅ Work with the existing animation system
<DialogContent className="duration-300">
  {/* Enhances existing animations */}
</DialogContent>
```

This dialog pattern provides a robust foundation for modal interactions while maintaining accessibility, performance, and type safety throughout your application.