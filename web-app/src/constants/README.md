# Constants Organization

This directory contains all application constants organized by domain and purpose.

## Structure

### `types.constants.ts`
Core type definitions and entity types
- `ListItem` interface - Common interface for dropdown options
- `ENTITY_TYPES` - Entity type identifiers (company, contact, quote, etc.)

### `domain.constants.ts`
Business domain-specific constants
- `COMMON_STATUS` - Status options used across entities
- `YES_NO_OPTIONS` - Boolean selection options
- `PACKAGE_TYPES` - Inventory package types
- `SERVICE_TYPES` - Quote service types
- `TRANSPORT_MODES` - Quote transport modes
- `QUOTE_STATUS` - Quote lifecycle statuses
- `TASK_STATUS` - Task lifecycle statuses
- `TASK_PRIORITY` - Task priority levels
- `TASK_CATEGORY` - Task categories
- `TEMP_USER_LIST` - Temporary user list (TODO: replace with API)

### `ui.constants.ts`
UI and presentation constants
- `FIELD_WIDTHS` - Standard form field widths
- `DATE_FORMATS` - Date/time format strings
- `TOAST_DURATION` - Notification durations
- `DIALOG_SIZES` - Modal/dialog size options

### `api.constants.ts`
API-related constants
- `HTTP_STATUS` - HTTP status codes
- `API_ENDPOINTS` - API endpoint paths for all entities

### `routes.constants.ts`
Application routing paths
- `ROUTES` - All application route paths

### `config.constants.ts`
Configuration constants
- `VALIDATION` - Validation rules and limits
- `STORAGE_KEYS` - Local storage keys
- `PAGINATION` - Pagination settings

## Usage

### Preferred Import (New Code)
```typescript
// Import from the constants barrel file
import { TASK_STATUS, API_ENDPOINTS, ROUTES } from '@/constants';

// Or import from specific files for better tree-shaking
import { TASK_STATUS } from '@/constants/domain.constants';
import { API_ENDPOINTS } from '@/constants/api.constants';
```

### Legacy Import (Existing Code)
```typescript
// Still supported for backward compatibility
import { TASK_STATUS, API_ENDPOINTS } from '@/utils/constants.util';
```

## Migration Guide

When updating existing code, prefer importing from the new constants structure:

**Before:**
```typescript
import { TASK_STATUS, API_ENDPOINTS, ROUTES } from '../utils/constants.util';
```

**After:**
```typescript
import { TASK_STATUS } from '@/constants/domain.constants';
import { API_ENDPOINTS } from '@/constants/api.constants';
import { ROUTES } from '@/constants/routes.constants';
```

## Benefits

1. **Better Organization** - Constants grouped by domain/purpose
2. **Improved Maintainability** - Easier to find and update constants
3. **Better Tree-Shaking** - Import only what you need
4. **Type Safety** - Clear type definitions in separate file
5. **Scalability** - Easy to add new constant categories

## Backward Compatibility

The old `utils/constants.util.ts` file still works and re-exports all constants from the new structure. This ensures existing code continues to work while allowing gradual migration to the new structure.
