# Loading Components

Comprehensive loading UI components for consistent loading states across the application.

## 🎯 Overview

This directory contains reusable loading components that provide a consistent user experience during async operations. The components are built on Material-UI and fully typed with TypeScript.

## 📁 Files

- **index.tsx** - Main components export (8 components)
- **Loading.css** - Component styles
- **useLoading.ts** - Custom hooks for state management (in /hooks/)
- **QUICK_REFERENCE.md** - ⭐ Start here for quick usage patterns
- **LOADING_GUIDE.md** - Complete documentation
- **EXAMPLES.tsx** - Real-world migration examples
- **IMPLEMENTATION_SUMMARY.md** - Technical details and impact analysis

## 🚀 Quick Start

```tsx
// 1. Import what you need
import { LoadingButton, useLoading } from '@/shared/components/Loading';
import { useLoading } from '@/hooks/useLoading';

// 2. Use the hook
const { isLoading, withLoading } = useLoading();

// 3. Wrap async operations
const handleSubmit = async (data) => {
  await withLoading(saveData(data));
};

// 4. Use the component
<LoadingButton loading={isLoading} loadingText="Saving...">
  Save
</LoadingButton>
```

## 📦 Components

### 1. **LoadingButton** ⭐ Most Used
Button with integrated loading state for form submissions.

### 2. **LoadingContainer**
Wrapper for content with loading/error/empty states.

### 3. **LoadingOverlay**
Blocks interaction with backdrop during operations.

### 4. **LoadingSpinner**
Basic centered spinner for simple loading indicators.

### 5. **LoadingSkeleton**
Skeleton placeholders for better perceived performance.

### 6. **TableLoadingSkeleton**
Pre-built skeleton for table rows.

### 7. **InlineLoadingSpinner**
Small spinner for inline use.

### 8. **PageLoader**
Full page loading for route transitions.

## 🪝 Hooks

### **useLoading**
Single loading state with automatic promise handling.

### **useLoadingStates**
Multiple independent loading states.

## 📖 Documentation

- **New to this?** Start with [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
- **Need details?** Read [LOADING_GUIDE.md](./LOADING_GUIDE.md)
- **Migrating code?** See [EXAMPLES.tsx](./EXAMPLES.tsx)
- **Technical info?** Check [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## ✨ Benefits

- **Consistency** - Same loading UI everywhere
- **Less Code** - ~60% reduction in loading-related code
- **Type Safety** - Full TypeScript support
- **Easy to Use** - Simple API, minimal boilerplate
- **Flexible** - Customizable for any use case

## 🎨 Examples

### Example 1: Basic Form
```tsx
const { isLoading, withLoading } = useLoading();
await withLoading(saveData(data));
<LoadingButton loading={isLoading}>Save</LoadingButton>
```

### Example 2: Data Loading
```tsx
<LoadingContainer loading={isLoading} empty={!data.length}>
  <DataTable data={data} />
</LoadingContainer>
```

### Example 3: Grid Overlay
```tsx
<LoadingOverlay visible={isLoading} transparent>
  <DataGrid rows={rows} />
</LoadingOverlay>
```

## 🔄 Migration Status

### Migrated Components ✅
- [x] Login.tsx
- [x] Profile.tsx
- [x] GridListView.tsx
- [x] Loader.tsx (deprecated wrapper)

### Remaining Components (Optional)
- [ ] AuthWrapper.tsx
- [ ] UserProfileImage.tsx
- [ ] Other forms with manual loading states

## 📊 Impact

- **Code Reduction:** ~60% less loading-related code
- **Consistency:** 3 different spinners → 1 standard implementation
- **Maintainability:** Single source of truth
- **Type Safety:** Full TypeScript coverage

## 🛠️ Technical

- Built on Material-UI 5.15.14
- React 19.0.0 compatible
- TypeScript 5.4.5
- Zero external dependencies (beyond MUI)
- Tree-shakeable exports

## 🤝 Contributing

When adding new loading patterns:
1. Use existing components first
2. If needed, add to this directory
3. Update documentation
4. Add examples
5. Maintain type safety

## 📝 License

Part of the SCP Portal App project.
