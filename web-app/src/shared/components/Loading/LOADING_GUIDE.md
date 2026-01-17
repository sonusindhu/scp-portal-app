# Loading Components Usage Guide

## Overview
Comprehensive loading components for consistent loading states across the application.

## Components

### 1. LoadingSpinner
Basic centered spinner for simple loading indicators.

```tsx
import { LoadingSpinner } from '@/shared/components/Loading';

<LoadingSpinner size="medium" />
<LoadingSpinner size="small" color="secondary" />
```

**Props:**
- `size?: "small" | "medium" | "large"` - Spinner size (default: "medium")
- `color?: "primary" | "secondary" | "inherit"` - Color theme
- `className?: string` - Additional CSS classes

---

### 2. LoadingOverlay
Block user interaction with an overlay during async operations.

```tsx
import { LoadingOverlay } from '@/shared/components/Loading';

<LoadingOverlay visible={isLoading} message="Saving...">
  <YourContent />
</LoadingOverlay>

// Full screen overlay
<LoadingOverlay visible={isLoading} fullScreen message="Processing..." />
```

**Props:**
- `visible: boolean` - Show/hide overlay
- `message?: string` - Optional loading message
- `fullScreen?: boolean` - Cover entire viewport
- `transparent?: boolean` - More subtle background
- `children?: ReactNode` - Content to overlay

**Use Cases:**
- Form submissions
- Data loading in modals
- Full page operations

---

### 3. LoadingButton
Button with integrated loading state (replaces FormActions isSubmitting).

```tsx
import { LoadingButton } from '@/shared/components/Loading';

<LoadingButton 
  loading={isSubmitting}
  loadingText="Saving..."
  variant="contained"
  onClick={handleSubmit}
>
  Save
</LoadingButton>
```

**Props:**
- `loading?: boolean` - Show loading state
- `loadingText?: string` - Text during loading
- All standard MUI Button props

**Features:**
- Auto-disables during loading
- Shows spinner icon
- Optional loading text

---

### 4. LoadingContainer
Wrapper for content with loading, error, and empty states.

```tsx
import { LoadingContainer } from '@/shared/components/Loading';

<LoadingContainer
  loading={isLoading}
  error={error}
  empty={data.length === 0}
  emptyMessage="No items found"
  minHeight="300px"
>
  <DataTable data={data} />
</LoadingContainer>
```

**Props:**
- `loading: boolean` - Show loading spinner
- `error?: string | null` - Error message to display
- `empty?: boolean` - Show empty state
- `emptyMessage?: string` - Custom empty message
- `skeleton?: ReactNode` - Custom skeleton
- `minHeight?: string | number` - Minimum container height

---

### 5. LoadingSkeleton
Skeleton placeholders for better perceived performance.

```tsx
import { LoadingSkeleton } from '@/shared/components/Loading';

// Text lines
<LoadingSkeleton type="text" count={3} />

// Card placeholder
<LoadingSkeleton type="rectangular" height={200} />

// Avatar
<LoadingSkeleton type="circular" width={50} height={50} />
```

**Props:**
- `type?: "text" | "rectangular" | "circular" | "rounded"`
- `count?: number` - Number of skeleton items
- `height?: number | string`
- `width?: number | string`

---

### 6. TableLoadingSkeleton
Pre-built skeleton for table rows.

```tsx
import { TableLoadingSkeleton } from '@/shared/components/Loading';

<TableLoadingSkeleton rows={5} columns={4} />
```

**Props:**
- `rows?: number` - Number of rows (default: 5)
- `columns?: number` - Number of columns (default: 4)

---

### 7. InlineLoadingSpinner
Small spinner for inline use (e.g., next to text).

```tsx
import { InlineLoadingSpinner } from '@/shared/components/Loading';

<span>Saving <InlineLoadingSpinner size={16} text="please wait" /></span>
```

---

### 8. PageLoader
Full page loading for route transitions.

```tsx
import { PageLoader } from '@/shared/components/Loading';

if (isInitializing) {
  return <PageLoader message="Loading application..." />;
}
```

---

## Hooks

### useLoading
Simple hook for managing single loading state.

```tsx
import { useLoading } from '@/hooks/useLoading';

const MyComponent = () => {
  const { isLoading, withLoading } = useLoading();

  const handleSubmit = async (data) => {
    await withLoading(
      CompanyService.create(data)
    );
  };

  return (
    <LoadingButton loading={isLoading} onClick={handleSubmit}>
      Submit
    </LoadingButton>
  );
};
```

**API:**
- `isLoading: boolean` - Current loading state
- `startLoading()` - Start loading
- `stopLoading()` - Stop loading
- `withLoading<T>(promise)` - Auto manage loading for promise

---

### useLoadingStates
Manage multiple independent loading states.

```tsx
import { useLoadingStates } from '@/hooks/useLoading';

const MyForm = () => {
  const { loading, startLoading, stopLoading } = useLoadingStates();

  const handleSave = async () => {
    startLoading('save');
    await saveData();
    stopLoading('save');
  };

  const handleDelete = async () => {
    startLoading('delete');
    await deleteData();
    stopLoading('delete');
  };

  return (
    <>
      <LoadingButton loading={loading.save} onClick={handleSave}>Save</LoadingButton>
      <LoadingButton loading={loading.delete} onClick={handleDelete}>Delete</LoadingButton>
    </>
  );
};
```

**API:**
- `loading: Record<string, boolean>` - All loading states
- `startLoading(key)` - Start specific operation
- `stopLoading(key)` - Stop specific operation
- `isLoading(key)` - Check if specific operation is loading
- `isAnyLoading()` - Check if any operation is loading

---

## Migration Examples

### Before (Manual Loading)
```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await saveData();
  } finally {
    setIsLoading(false);
  }
};

return (
  <Button disabled={isLoading} onClick={handleSubmit}>
    {isLoading ? 'Saving...' : 'Save'}
  </Button>
);
```

### After (useLoading + LoadingButton)
```tsx
const { isLoading, withLoading } = useLoading();

const handleSubmit = async () => {
  await withLoading(saveData());
};

return (
  <LoadingButton loading={isLoading} onClick={handleSubmit}>
    Save
  </LoadingButton>
);
```

---

### Before (Profile with CircularProgress)
```tsx
<Grid item xs={3}>
  {isLoading ? <CircularProgress /> : <UserForm user={user} />}
</Grid>
```

### After (LoadingContainer)
```tsx
<Grid item xs={3}>
  <LoadingContainer loading={isLoading}>
    <UserForm user={user} />
  </LoadingContainer>
</Grid>
```

---

### Before (Login Button)
```tsx
<button disabled={loading} className={loading ? 'loading' : ''}>
  {loading && <span className="spinner"></span>}
  {loading ? 'Signing in...' : 'Submit'}
</button>
```

### After (LoadingButton)
```tsx
<LoadingButton loading={loading} loadingText="Signing in...">
  Submit
</LoadingButton>
```

---

## Best Practices

1. **Use LoadingButton for form actions** - Replaces manual disabled logic
2. **Use LoadingContainer for data sections** - Handles loading, error, empty states
3. **Use LoadingSkeleton for lists/tables** - Better perceived performance
4. **Use LoadingOverlay sparingly** - Only when blocking interaction is critical
5. **Use withLoading** - Simplifies loading state management

## Styling
All components use Material-UI theming and respect your app's theme configuration.
Custom styles can be added via the `className` prop or by overriding CSS classes.
