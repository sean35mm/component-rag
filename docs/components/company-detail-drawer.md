# CompanyDetailDrawer Components

## Purpose

The `CompanyDetailDrawer` components provide a mobile-optimized drawer interface for displaying detailed company information and related articles. The `CompanyDetail` component renders comprehensive company data including favicon, description, industry information, and related articles, while `CompanyDrawer` wraps this in a mobile drawer interface with global state management.

## Component Type

**Client Components** - Both components use 'use client' implicitly through their dependencies on Zustand store (`useEntityDetailDrawerStore`) and interactive UI elements. They require client-side state management and user interactions.

## Props Interface

### CompanyDetail

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `Company` | ✅ | Complete company object containing name, description, industry, domains, favicon, logo, and other company details |
| `articleQuery` | `AllEndpointParams` | ✅ | Query parameters for fetching related articles, passed to SearchDrawerArticles component |

### CompanyDrawer

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `articleQuery` | `AllEndpointParams` | ✅ | Query parameters for article searches, forwarded to CompanyDetail component |

## Usage Example

```tsx
import { CompanyDetail, CompanyDrawer } from '@/components/drawers/company-detail-drawer';

// Using CompanyDetail directly
function CompanyProfile() {
  const companyData = {
    id: 'company-123',
    name: 'TechCorp Inc.',
    description: 'Leading technology solutions provider',
    industry: 'software development',
    domains: ['techcorp.com'],
    favicon: 'https://techcorp.com/favicon.ico',
    logo: 'https://techcorp.com/logo.png'
  };

  const searchParams = {
    size: 20,
    sortBy: 'pubDate' as const,
    // ... other search parameters
  };

  return (
    <CompanyDetail 
      data={companyData} 
      articleQuery={searchParams} 
    />
  );
}

// Using CompanyDrawer with global state
function App() {
  const searchParams = {
    size: 20,
    sortBy: 'pubDate' as const,
  };

  return (
    <div>
      {/* Other app content */}
      <CompanyDrawer articleQuery={searchParams} />
    </div>
  );
}

// Opening the drawer programmatically
function CompanySearchResult({ company }) {
  const { setIsOpen, setCompany } = useEntityDetailDrawerStore();

  const handleCompanyClick = () => {
    setCompany(company);
    setIsOpen(true);
  };

  return (
    <button onClick={handleCompanyClick}>
      View {company.name} Details
    </button>
  );
}
```

## Functionality

### Core Features
- **Company Information Display**: Shows company favicon, name, industry, and description with proper formatting
- **Mobile-Optimized Layout**: Responsive design with mobile drawer interface
- **Search Integration**: Includes/exclude company from search filters with `SearchExcludeInclude` component
- **Related Articles**: Displays recent articles related to the company via `SearchDrawerArticles`
- **External Navigation**: Direct link to company website with external indicator
- **Text Truncation**: Smart text truncation for descriptions and industry names

### Interactive Elements
- **Search Actions**: Add company to search filters or exclude from results
- **Article Navigation**: Browse related articles within the drawer
- **Website Access**: Direct navigation to company's primary domain
- **Drawer Controls**: Open/close drawer with gesture support

## State Management

### Zustand Store Integration
```tsx
const isOpen = useEntityDetailDrawerStore((state) => state.isOpen);
const setIsOpen = useEntityDetailDrawerStore((state) => state.setIsOpen);
const company = useEntityDetailDrawerStore((state) => state.company);
```

- **Global Drawer State**: Uses `useEntityDetailDrawerStore` for drawer visibility and company data
- **Persistent Company Data**: Company information persists in global state until updated
- **Drawer Visibility**: Centralized control over drawer open/closed state

## Side Effects

### External Interactions
- **Website Navigation**: Opens company domain in new tab/window
- **Article Fetching**: Triggers article searches based on company ID
- **Image Loading**: Loads company favicon and logo from external sources
- **Search Filter Updates**: Modifies search parameters when including/excluding companies

### Performance Considerations
- **Conditional Rendering**: CompanyDrawer only renders when company data exists
- **Lazy Loading**: Articles loaded on-demand within drawer context
- **Image Optimization**: Uses Favicon component for optimized image loading

## Dependencies

### Internal Components
- `SearchDrawerArticles` - Article listing and search functionality
- `SearchExcludeInclude` - Search filter management
- `EntityDrawerMobile` - Mobile drawer container
- `Favicon` - Optimized company logo/favicon display
- `PropertyBlockMobileDrawer` - Structured property display
- `TruncatedText` - Text overflow handling
- `Typography` - Consistent text styling
- `Button` - Interactive elements

### External Libraries
- `NextLink` - Client-side navigation
- `@/components/icons` - Icon components

### Store Dependencies
- `useEntityDetailDrawerStore` - Global drawer state management

## Integration

### Application Architecture
```tsx
// Typical integration pattern
function CompanySearchInterface() {
  return (
    <div>
      <CompanySearchResults />
      <CompanyDrawer articleQuery={searchParams} />
    </div>
  );
}

// Store integration for opening drawer
function CompanyCard({ company }) {
  const { setCompany, setIsOpen } = useEntityDetailDrawerStore();
  
  const viewCompanyDetails = () => {
    setCompany(company);
    setIsOpen(true);
  };
}
```

### Data Flow
1. **Company Selection**: User selects company from search results or listings
2. **State Update**: Company data stored in global Zustand store
3. **Drawer Activation**: Drawer opens with company information
4. **Article Loading**: Related articles fetched based on company ID
5. **User Interactions**: Search filter updates, website navigation, drawer dismissal

## Best Practices

### Component Architecture Adherence
- ✅ **Flat Composition**: Components stack cleanly without deep nesting
- ✅ **Single Responsibility**: CompanyDetail handles display, CompanyDrawer handles state
- ✅ **Reusable UI Components**: Leverages established UI component library
- ✅ **Proper State Management**: Uses Zustand for global drawer state

### Mobile-First Design
- ✅ **Touch-Friendly Interface**: Large touch targets and gesture support
- ✅ **Responsive Layout**: Adapts to different mobile screen sizes
- ✅ **Performance Optimized**: Conditional rendering and lazy loading

### Data Handling
- ✅ **Null Safety**: Proper null checks for optional company data
- ✅ **Type Safety**: Full TypeScript integration with Company interface
- ✅ **Error Boundaries**: Graceful handling of missing or invalid data

### Integration Patterns
- ✅ **Global State**: Centralized drawer management across application
- ✅ **Prop Drilling Avoidance**: Uses store for shared state management
- ✅ **Component Composition**: Clean separation between data and presentation layers