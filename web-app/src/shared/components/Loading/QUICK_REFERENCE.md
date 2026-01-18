# 🚀 Loading Components - Quick Reference

## 📦 Import
```tsx
import { LoadingButton, LoadingOverlay, LoadingContainer, LoadingSpinner } from '@/shared/components/Loading';
import { useLoading, useLoadingStates } from '@/hooks/useLoading';
```

---

## 🔘 LoadingButton (Most Common)
**Use for:** Form submissions, action buttons

```tsx
// Simple usage
const { isLoading, withLoading } = useLoading();
const handleSubmit = async (data) => {
  await withLoading(saveData(data));
};

<LoadingButton loading={isLoading} loadingText="Saving...">
  Save
</LoadingButton>
```

**Props:**
- `loading: boolean` - Show loading state
- `loadingText?: string` - Optional loading text
- All MUI Button props (variant, color, size, etc.)

---

## 📦 LoadingContainer
**Use for:** Wrapping content that loads data

```tsx
<LoadingContainer 
  loading={isLoading}
  error={error}
  empty={data.length === 0}
  emptyMessage="No items found"
>
  <YourContent />
</LoadingContainer>
```

**Props:**
- `loading: boolean` - Show loading spinner
- `error?: string` - Error message
- `empty?: boolean` - Empty state
- `emptyMessage?: string` - Custom empty message
- `minHeight?: string` - Container height

---

## 🎭 LoadingOverlay
**Use for:** Blocking UI during operations (grids, tables)

```tsx
<LoadingOverlay visible={isLoading} transparent>
  <DataGrid rows={rows} />
</LoadingOverlay>
```

**Props:**
- `visible: boolean` - Show/hide overlay
- `message?: string` - Optional message
- `fullScreen?: boolean` - Cover entire screen
- `transparent?: boolean` - Subtle background

---

## 🔄 LoadingSpinner
**Use for:** Simple loading indicators

```tsx
<LoadingSpinner size="medium" />
<LoadingSpinner size="small" color="secondary" />
```

**Props:**
- `size?: "small" | "medium" | "large"`
- `color?: "primary" | "secondary" | "inherit"`

---

## 🪝 useLoading Hook
**Use for:** Managing single loading state

```tsx
const { isLoading, withLoading, startLoading, stopLoading } = useLoading();

// Auto-manage with promise
await withLoading(fetchData());

// Manual control
startLoading();
// ... operation
stopLoading();
```

**Returns:**
- `isLoading: boolean`
- `withLoading<T>(promise): Promise<T>` - Auto manage loading
- `startLoading()` - Start loading
- `stopLoading()` - Stop loading

---

## 🪝 useLoadingStates Hook
**Use for:** Multiple independent operations

```tsx
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

<LoadingButton loading={loading.save}>Save</LoadingButton>
<LoadingButton loading={loading.delete}>Delete</LoadingButton>
```

**Returns:**
- `loading: Record<string, boolean>`
- `startLoading(key: string)`
- `stopLoading(key: string)`
- `isLoading(key: string): boolean`
- `isAnyLoading(): boolean`

---

## 📋 Common Patterns

### Pattern 1: Form with Single Action
```tsx
const { isLoading, withLoading } = useLoading();

const handleSubmit = async (data) => {
  await withLoading(CompanyService.create(data));
};

<LoadingButton loading={isLoading}>Submit</LoadingButton>
```

### Pattern 2: Form with Multiple Actions
```tsx
const { loading, startLoading, stopLoading } = useLoadingStates();

<LoadingButton loading={loading.save}>Save</LoadingButton>
<LoadingButton loading={loading.delete}>Delete</LoadingButton>
```

### Pattern 3: Data Loading
```tsx
const { isLoading, withLoading } = useLoading({ initialState: true });
const [data, setData] = useState([]);

useEffect(() => {
  const loadData = async () => {
    const result = await withLoading(fetchData());
    setData(result);
  };
  loadData();
}, []);

<LoadingContainer loading={isLoading} empty={!data.length}>
  <DataList data={data} />
</LoadingContainer>
```

### Pattern 4: Grid/Table Loading
```tsx
<LoadingOverlay visible={isLoading} transparent>
  <DataGrid rows={rows} columns={columns} />
</LoadingOverlay>
```

---

## ⚡ Migration from Old Code

### Before: Manual State
```tsx
const [isLoading, setIsLoading] = useState(false);
setIsLoading(true);
try {
  await saveData();
} finally {
  setIsLoading(false);
}
```

### After: useLoading
```tsx
const { isLoading, withLoading } = useLoading();
await withLoading(saveData());
```

---

### Before: Custom Button
```tsx
<button disabled={loading}>
  {loading ? 'Saving...' : 'Save'}
</button>
```

### After: LoadingButton
```tsx
<LoadingButton loading={loading} loadingText="Saving...">
  Save
</LoadingButton>
```

---

### Before: Conditional Render
```tsx
{isLoading ? <CircularProgress /> : <Content />}
```

### After: LoadingContainer
```tsx
<LoadingContainer loading={isLoading}>
  <Content />
</LoadingContainer>
```

---

## 🎯 Quick Decision Tree

**Need a button that shows loading?**
→ Use `LoadingButton`

**Loading data to display?**
→ Use `LoadingContainer`

**Need to block a grid/table?**
→ Use `LoadingOverlay`

**Just need a spinner?**
→ Use `LoadingSpinner`

**Managing state for the above?**
→ Use `useLoading` or `useLoadingStates`

---

## 📚 Full Documentation
See [LOADING_GUIDE.md](./LOADING_GUIDE.md) for complete documentation.
See [EXAMPLES.tsx](./EXAMPLES.tsx) for detailed examples.
See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for implementation details.
