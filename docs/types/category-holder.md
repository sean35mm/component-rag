# CategoryHolder Type Definition

## Purpose

The `CategoryHolder` interface represents a fundamental domain object that encapsulates entities which hold or contain category information. This type serves as a base interface for objects that need to maintain category identification through a named property, providing a standardized contract for category-aware components and services throughout the application.

## Type Definition

```typescript
export interface CategoryHolder {
  name: string;
}
```

This interface follows our **Interfaces over Types** guideline, providing a clean object shape definition that can be extended and composed with other types.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | The unique identifier name for the category. Must be a non-empty string that serves as both display name and internal reference. |

## Usage Examples

### Basic Implementation

```typescript
// Simple category implementation
const userCategory: CategoryHolder = {
  name: 'Premium Users'
};

// Function accepting CategoryHolder
function displayCategory(category: CategoryHolder): string {
  return `Category: ${category.name}`;
}

console.log(displayCategory(userCategory)); // "Category: Premium Users"
```

### Component Integration

```tsx
// React component using CategoryHolder
interface CategoryDisplayProps {
  category: CategoryHolder;
  className?: string;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ 
  category, 
  className 
}) => {
  return (
    <div className={className}>
      <h3>{category.name}</h3>
    </div>
  );
};

// Usage
const productCategory: CategoryHolder = { name: 'Electronics' };
<CategoryDisplay category={productCategory} />
```

### Service Layer Usage

```typescript
// Service function utilizing CategoryHolder
class CategoryService {
  async findByCategory(category: CategoryHolder): Promise<Item[]> {
    return await this.repository.findByName(category.name);
  }
  
  validateCategory(category: CategoryHolder): boolean {
    return category.name.trim().length > 0;
  }
}
```

## Type Architecture Pattern

Following our **Type Architecture** pattern, `CategoryHolder` serves as a foundational domain object:

```typescript
// 1. Domain Object (Current)
interface CategoryHolder {
  name: string;
}

// 2. Extended Domain Objects
interface DetailedCategory extends CategoryHolder {
  description: string;
  itemCount: number;
  createdAt: Date;
}

// 3. Response Types
interface CategoryResponse {
  categories: CategoryHolder[];
  total: number;
  page: number;
}

// 4. Request Types
interface CreateCategoryRequest {
  category: Pick<CategoryHolder, 'name'>;
}

interface UpdateCategoryRequest {
  category: Partial<CategoryHolder>;
  id: string;
}
```

## Related Types

### Extensions and Compositions

```typescript
// Extended interfaces
interface CategoryWithMetadata extends CategoryHolder {
  id: string;
  slug: string;
  parentCategory?: CategoryHolder;
}

// Utility type applications
type CategoryName = Pick<CategoryHolder, 'name'>;
type PartialCategory = Partial<CategoryHolder>;
type RequiredCategory = Required<CategoryHolder>;

// Collection types
interface CategoryCollection {
  categories: CategoryHolder[];
  defaultCategory: CategoryHolder;
}
```

### Discriminated Unions

```typescript
interface ProductCategory extends CategoryHolder {
  type: 'product';
  sku: string;
}

interface ServiceCategory extends CategoryHolder {
  type: 'service';
  duration: number;
}

type BusinessCategory = ProductCategory | ServiceCategory;
```

## Integration Points

### Components
- **CategorySelector**: Dropdown component for category selection
- **CategoryBreadcrumb**: Navigation showing category hierarchy
- **CategoryCard**: Display component for category information

### Services
- **CategoryService**: CRUD operations for categories
- **SearchService**: Category-based filtering and search
- **ValidationService**: Category name validation

### State Management
```typescript
// Redux/Zustand store integration
interface CategoryState {
  selectedCategory: CategoryHolder | null;
  availableCategories: CategoryHolder[];
  loading: boolean;
}

// Actions
interface SelectCategoryAction {
  type: 'SELECT_CATEGORY';
  payload: CategoryHolder;
}
```

## Validation

### Zod Schema

```typescript
import { z } from 'zod';

const CategoryHolderSchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must be less than 100 characters')
    .trim()
});

// Type inference
type CategoryHolderInput = z.infer<typeof CategoryHolderSchema>;

// Validation function
function validateCategoryHolder(data: unknown): CategoryHolder {
  return CategoryHolderSchema.parse(data);
}

// Safe parsing
function safeParseCategoryHolder(data: unknown): CategoryHolder | null {
  const result = CategoryHolderSchema.safeParse(data);
  return result.success ? result.data : null;
}
```

### Runtime Validation

```typescript
// Type guard
function isCategoryHolder(obj: unknown): obj is CategoryHolder {
  return typeof obj === 'object' && 
         obj !== null && 
         'name' in obj && 
         typeof (obj as CategoryHolder).name === 'string';
}

// Validation with error handling
function assertCategoryHolder(obj: unknown): asserts obj is CategoryHolder {
  if (!isCategoryHolder(obj)) {
    throw new Error('Invalid CategoryHolder object');
  }
}
```

## Best Practices

### 1. **Strict Typing Adherence**
```typescript
// ✅ Good: Explicit typing
const categories: CategoryHolder[] = data.map(item => ({
  name: item.categoryName
}));

// ❌ Avoid: Implicit any
const categories = data.map(item => item);
```

### 2. **Interface Extension Pattern**
```typescript
// ✅ Good: Extending base interface
interface EnhancedCategory extends CategoryHolder {
  priority: number;
}

// ❌ Avoid: Duplicating properties
interface EnhancedCategory {
  name: string;
  priority: number;
}
```

### 3. **Utility Type Usage**
```typescript
// ✅ Good: Using utility types
function updateCategoryName(
  category: CategoryHolder, 
  updates: Partial<CategoryHolder>
): CategoryHolder {
  return { ...category, ...updates };
}

// ✅ Good: Picking specific properties
function getCategoryName(category: CategoryHolder): Pick<CategoryHolder, 'name'> {
  return { name: category.name };
}
```

### 4. **Composition Over Inheritance**
```typescript
// ✅ Good: Composition
interface CategoryWithActions {
  category: CategoryHolder;
  actions: {
    select: () => void;
    delete: () => void;
  };
}

// ✅ Good: Generic constraints
function processCategoryHolder<T extends CategoryHolder>(
  item: T
): T {
  // Process while maintaining type
  return item;
}
```

This type definition exemplifies clean, extensible TypeScript design that serves as a building block for more complex category-related functionality throughout the application.