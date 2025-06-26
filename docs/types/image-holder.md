# ImageHolder Type Documentation

## Purpose

The `ImageHolder` interface represents a fundamental domain object that encapsulates an image resource by its URL. This type serves as a building block for components and data structures that need to handle image assets throughout the application. It follows our domain-first type architecture pattern, providing a strict, reusable contract for image-related data.

## Type Definition

```typescript
export interface ImageHolder {
  url: string;
}
```

This interface defines a simple but essential contract for any entity that holds an image reference via URL.

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | `string` | ✅ Yes | The URL string pointing to the image resource. Can be absolute URLs, relative paths, or data URLs |

## Usage Examples

### Basic Component Usage

```typescript
import { ImageHolder } from '@/lib/types/image-holder';

// Component props extending ImageHolder
interface AvatarProps extends ImageHolder {
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

function Avatar({ url, alt, size = 'md' }: AvatarProps) {
  return (
    <img 
      src={url} 
      alt={alt} 
      className={`avatar avatar-${size}`}
    />
  );
}

// Usage
const userAvatar: ImageHolder = {
  url: 'https://example.com/user-avatar.jpg'
};

<Avatar {...userAvatar} alt="User profile picture" />
```

### Composing with Other Domain Objects

```typescript
interface User extends ImageHolder {
  id: string;
  name: string;
  email: string;
  // url inherited from ImageHolder
}

interface Product extends ImageHolder {
  id: string;
  title: string;
  price: number;
  // url inherited from ImageHolder for product image
}
```

### Working with Collections

```typescript
interface Gallery {
  id: string;
  title: string;
  images: ImageHolder[];
}

function ImageGallery({ images }: { images: ImageHolder[] }) {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img 
          key={index} 
          src={image.url} 
          alt={`Gallery image ${index + 1}`}
        />
      ))}
    </div>
  );
}
```

### Utility Type Applications

```typescript
// Making ImageHolder optional for draft states
interface DraftProduct {
  id: string;
  title: string;
  image?: ImageHolder; // Optional during creation
}

// Picking only URL for lightweight operations
type ImageUrl = Pick<ImageHolder, 'url'>;

// Extending with additional metadata
interface ImageWithMetadata extends ImageHolder {
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}
```

## Type Architecture Pattern

Following our **domain objects → response types → request types** pattern:

### 1. Domain Object (Current)
```typescript
// Base domain object
export interface ImageHolder {
  url: string;
}
```

### 2. Response Types
```typescript
// API response that includes image data
interface UserProfileResponse extends ImageHolder {
  id: string;
  name: string;
  email: string;
  // url from ImageHolder represents profile picture
}

interface ProductListResponse {
  products: Array<Product & ImageHolder>;
  total: number;
  page: number;
}
```

### 3. Request Types
```typescript
// Image upload request
interface ImageUploadRequest {
  file: File;
  alt?: string;
}

// Profile update request
interface UpdateProfileRequest extends Partial<ImageHolder> {
  name?: string;
  email?: string;
  // url is optional for image updates
}
```

## Related Types

### Extension Types
```typescript
// Common extensions of ImageHolder
interface Avatar extends ImageHolder {
  alt: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface Thumbnail extends ImageHolder {
  width: number;
  height: number;
}

interface ResponsiveImage extends ImageHolder {
  srcSet?: string;
  sizes?: string;
}
```

### Composition Types
```typescript
// Types that commonly include ImageHolder
interface Card extends ImageHolder {
  title: string;
  description: string;
}

interface MediaItem extends ImageHolder {
  type: 'image' | 'video';
  duration?: number; // for videos
}
```

## Integration Points

### Components
- `Avatar` - User profile pictures
- `ProductCard` - Product thumbnails
- `ImageGallery` - Collection displays
- `Banner` - Hero images
- `Thumbnail` - Preview images

### Services
```typescript
// Image service operations
class ImageService {
  async uploadImage(file: File): Promise<ImageHolder> {
    const response = await uploadToS3(file);
    return { url: response.url };
  }

  validateImageHolder(data: unknown): data is ImageHolder {
    return typeof data === 'object' && 
           data !== null && 
           typeof (data as any).url === 'string';
  }
}
```

### State Management
```typescript
// Redux/Zustand state shapes
interface AppState {
  user: {
    profile: User & ImageHolder;
  };
  gallery: {
    images: ImageHolder[];
  };
}
```

## Validation

### Zod Schema
```typescript
import { z } from 'zod';

export const ImageHolderSchema = z.object({
  url: z.string().url('Must be a valid URL')
});

// Extended validation with additional constraints
export const StrictImageHolderSchema = z.object({
  url: z.string()
    .url('Must be a valid URL')
    .refine((url) => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      return imageExtensions.some(ext => url.toLowerCase().includes(ext));
    }, 'URL must point to an image file')
});

// Usage in API handlers
function validateImageData(data: unknown): ImageHolder {
  return ImageHolderSchema.parse(data);
}
```

### Runtime Validation
```typescript
function isImageHolder(value: unknown): value is ImageHolder {
  return (
    typeof value === 'object' &&
    value !== null &&
    'url' in value &&
    typeof (value as any).url === 'string'
  );
}
```

## Best Practices

### ✅ Adherence to Guidelines

1. **Strict Typing**: Uses `string` instead of `any` for URL
2. **Interface over Type**: Uses `interface` declaration
3. **Domain-First**: Represents a clear domain concept
4. **Extensibility**: Easily extended with intersection types

### ✅ Recommended Patterns

```typescript
// Good: Extending with related properties
interface ProductImage extends ImageHolder {
  alt: string;
  caption?: string;
}

// Good: Using with utility types
type OptionalImage = Partial<ImageHolder>;
type ImageUrl = Pick<ImageHolder, 'url'>;

// Good: Composing with other interfaces
interface MediaCard extends ImageHolder {
  title: string;
  description: string;
}
```

### ❌ Anti-Patterns to Avoid

```typescript
// Bad: Using 'any' type
interface BadImageHolder {
  url: any; // Avoid this
}

// Bad: Using 'type' for object shapes
type ImageHolderType = { // Use interface instead
  url: string;
}

// Bad: Overly specific single-use type
interface SpecificUserAvatarImageHolder { // Too specific
  userAvatarImageUrl: string;
}
```

### Performance Considerations

```typescript
// Efficient: Reuse ImageHolder for consistent shapes
const memoizedImageComponent = memo(({ url }: ImageHolder) => (
  <img src={url} alt="" />
));

// Efficient: Use ImageHolder in generic components
function LazyImage<T extends ImageHolder>({ data }: { data: T }) {
  return <img src={data.url} loading="lazy" />;
}
```

This type serves as a foundational building block in our type architecture, promoting consistency and reusability across image-handling components and services.