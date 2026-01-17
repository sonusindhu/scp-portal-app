# Constants Usage Guide

Quick reference for using centralized constants in the SCP Portal App.

## 📍 Import

```typescript
import {
  COMMON_STATUS,
  TASK_STATUS,
  QUOTE_STATUS,
  PACKAGE_TYPES,
  TRANSPORT_MODES,
  ENTITY_TYPES,
  API_ENDPOINTS,
  ROUTES,
  DATE_FORMATS,
  PAGINATION,
  HTTP_STATUS,
  VALIDATION,
  STORAGE_KEYS,
  ListItem,
} from '../utils/constants.util';
```

---

## 🎯 Common Patterns

### Status Lists

```typescript
// In service
import { COMMON_STATUS } from '../utils/constants.util';

class MyService extends BaseService {
  CONST = { statusList: COMMON_STATUS };
}

// In form/component
<SelectElement
  name="status"
  options={COMMON_STATUS}
  label="Status"
/>

// Task-specific status
<SelectElement
  name="taskStatus"
  options={TASK_STATUS}
  label="Task Status"
/>
```

---

### API Endpoints

```typescript
// Simple endpoints
await this.post(API_ENDPOINTS.COMPANY.CREATE, payload);
await this.post(API_ENDPOINTS.CONTACT.LIST, filters);

// Endpoints with parameters
await this.httpGet(API_ENDPOINTS.COMPANY.FIND(companyId));
await this.httpGet(API_ENDPOINTS.INVENTORY.FIND(inventoryId));

// In service class
async find(id: number) {
  return this.httpGet(API_ENDPOINTS.CONTACT.FIND(id));
}
```

---

### Routes

```typescript
// Navigation
navigate(ROUTES.COMPANY_LIST);
navigate(ROUTES.HOME);

// Parameterized routes
navigate(ROUTES.COMPANY_DETAILS(companyId));
navigate(ROUTES.CONTACT_EDIT(contactId));

// In Link components
<Link to={ROUTES.COMPANY_LIST}>Companies</Link>
<Link to={ROUTES.QUOTE_DETAILS(quoteId)}>View Quote</Link>

// Redirects
<Navigate to={ROUTES.LOGIN} />
```

---

### Entity Types

```typescript
// Type checking
if (entityType === ENTITY_TYPES.COMPANY) {
  // Handle company
}

// In dropdowns
const entityOptions = [
  { id: ENTITY_TYPES.COMPANY, label: "Company" },
  { id: ENTITY_TYPES.CONTACT, label: "Contact" },
  { id: ENTITY_TYPES.QUOTE, label: "Quote" },
];
```

---

### Date Formatting

```typescript
import { format } from 'date-fns';
import { DATE_FORMATS } from '../utils/constants.util';

// Display date
const displayDate = format(new Date(timestamp), DATE_FORMATS.DISPLAY);
// Output: "17/01/2026"

// Display with time
const fullDate = format(new Date(timestamp), DATE_FORMATS.DISPLAY_WITH_TIME);
// Output: "17/01/2026 3:45 PM"

// API format
const apiDate = format(new Date(), DATE_FORMATS.API);
// Output: "2026-01-17"
```

---

### Pagination

```typescript
// In list components
const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_PAGE_SIZE);

// In data grid config
{
  pagination: {
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
  }
}
```

---

### HTTP Status

```typescript
// In API handlers
if (response.status === HTTP_STATUS.OK) {
  // Success
}

if (response.status === HTTP_STATUS.UNAUTHORIZED) {
  // Redirect to login
}

// In error handling
catch (error) {
  if (error.status === HTTP_STATUS.NOT_FOUND) {
    toast.error("Resource not found");
  }
}
```

---

### Validation

```typescript
// In form validation
rules={{
  maxLength: {
    value: VALIDATION.MAX_EMAIL_LENGTH,
    message: `Email must be less than ${VALIDATION.MAX_EMAIL_LENGTH} characters`,
  },
  minLength: {
    value: VALIDATION.MIN_PASSWORD_LENGTH,
    message: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`,
  }
}}

// File upload validation
if (file.size > VALIDATION.MAX_FILE_SIZE) {
  toast.error("File too large");
}

if (!VALIDATION.ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
  toast.error("Invalid file type");
}
```

---

### Storage Keys

```typescript
// Save to localStorage
localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

// Retrieve from localStorage
const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

// Clear storage
localStorage.removeItem(STORAGE_KEYS.USER);
```

---

## 🔧 Advanced Usage

### Creating Custom Constants

When you need a new constant:

1. **Determine scope** - Is it used in multiple places?
2. **Add to constants.util.ts** - Keep related constants together
3. **Use `as const`** - For type safety and immutability
4. **Export properly** - Make it available to other modules

```typescript
// In constants.util.ts
export const MY_NEW_CONSTANT = {
  OPTION_A: "optionA",
  OPTION_B: "optionB",
  OPTION_C: "optionC",
} as const;

export const MY_LIST: ListItem[] = [
  { id: "a", title: "Option A" },
  { id: "b", title: "Option B" },
];
```

---

### Type-Safe Constants

```typescript
// Define type from constant
type EntityType = typeof ENTITY_TYPES[keyof typeof ENTITY_TYPES];
// EntityType = "company" | "contact" | "quote" | "inventory" | ...

// Use in function signature
function handleEntity(type: EntityType) {
  // TypeScript will enforce valid entity types
}
```

---

### Combining Constants

```typescript
// Create derived constants
const ALL_STATUSES = [
  ...COMMON_STATUS,
  ...TASK_STATUS.slice(1), // Skip "Select"
];

// Create lookup maps
const STATUS_MAP = COMMON_STATUS.reduce((acc, status) => {
  acc[status.id] = status.title;
  return acc;
}, {} as Record<string, string>);
```

---

## ⚠️ Common Mistakes

### ❌ DON'T: Hardcode values
```typescript
navigate("/app/company/list");  // BAD
await this.post("contact/create", data);  // BAD
```

### ✅ DO: Use constants
```typescript
navigate(ROUTES.COMPANY_LIST);  // GOOD
await this.post(API_ENDPOINTS.CONTACT.CREATE, data);  // GOOD
```

---

### ❌ DON'T: Duplicate constants
```typescript
const statusList = [
  { id: "active", title: "Active" },
  { id: "inactive", title: "Inactive" },
];
```

### ✅ DO: Import existing
```typescript
import { COMMON_STATUS } from '../utils/constants.util';
```

---

### ❌ DON'T: Magic strings
```typescript
if (type === "company") { }  // BAD
```

### ✅ DO: Use entity types
```typescript
if (type === ENTITY_TYPES.COMPANY) { }  // GOOD
```

---

## 📚 Complete Constants Reference

### Status Lists
- `COMMON_STATUS` - Active/Inactive (used by Contact, Inventory, Company)
- `TASK_STATUS` - New, In Progress, Completed, Canceled
- `QUOTE_STATUS` - Draft, Pending, Approved, Rejected, Completed

### Dropdown Options
- `PACKAGE_TYPES` - Parcel, Pallet, Bale
- `TRANSPORT_MODES` - FTL, LTL
- `SERVICE_TYPES` - Transportation

### Entity Types
- `ENTITY_TYPES.COMPANY`
- `ENTITY_TYPES.CONTACT`
- `ENTITY_TYPES.QUOTE`
- `ENTITY_TYPES.INVENTORY`
- `ENTITY_TYPES.TASK`
- `ENTITY_TYPES.EMAIL`
- `ENTITY_TYPES.NOTE`

### API Endpoints
- `API_ENDPOINTS.AUTH` - Login, logout, signup, etc.
- `API_ENDPOINTS.COMPANY` - CRUD operations
- `API_ENDPOINTS.CONTACT` - CRUD operations
- `API_ENDPOINTS.QUOTE` - CRUD operations
- `API_ENDPOINTS.INVENTORY` - CRUD operations
- `API_ENDPOINTS.TASK` - CRUD operations
- `API_ENDPOINTS.EMAIL` - CRUD operations
- `API_ENDPOINTS.NOTE` - CRUD operations

### Routes
- `ROUTES.LOGIN`, `ROUTES.HOME`, `ROUTES.APP_ROOT`
- `ROUTES.COMPANY_LIST`, `ROUTES.COMPANY_CREATE`, `ROUTES.COMPANY_DETAILS(id)`, `ROUTES.COMPANY_EDIT(id)`
- Similar patterns for CONTACT, QUOTE, INVENTORY
- `ROUTES.PROFILE`, `ROUTES.PROFILE_PASSWORD`, etc.

### Date Formats
- `DATE_FORMATS.DISPLAY` - "dd/MM/yyyy"
- `DATE_FORMATS.DISPLAY_WITH_TIME` - "dd/MM/yyyy p"
- `DATE_FORMATS.API` - "yyyy-MM-dd"
- `DATE_FORMATS.API_WITH_TIME` - "yyyy-MM-dd HH:mm:ss"
- `DATE_FORMATS.TIME_ONLY` - "HH:mm"

### Configuration
- `PAGINATION.DEFAULT_PAGE_SIZE` - 20
- `PAGINATION.PAGE_SIZE_OPTIONS` - [10, 20, 50, 100]
- `HTTP_STATUS.OK`, `HTTP_STATUS.CREATED`, etc.
- `FIELD_WIDTHS.FULL`, `FIELD_WIDTHS.HALF`, etc.
- `VALIDATION.MAX_EMAIL_LENGTH`, `VALIDATION.MIN_PASSWORD_LENGTH`, etc.
- `STORAGE_KEYS.USER`, `STORAGE_KEYS.AUTH_TOKEN`, etc.

---

## 🎯 When to Add New Constants

Add to centralized constants when:
- ✅ Value is used in 2+ files
- ✅ Value represents business logic/rules
- ✅ Value is a configuration setting
- ✅ Value is an API endpoint or route
- ✅ Value is a status or enum-like option

Keep local when:
- ❌ Value is specific to one component
- ❌ Value is temporary/experimental
- ❌ Value is UI-specific (colors, sizes in CSS)
- ❌ Value is derived from props/state

---

## 🚀 Quick Tips

1. **Always import from constants.util.ts** - Single source of truth
2. **Use TypeScript autocomplete** - Let your IDE help you
3. **Check existing constants first** - Avoid duplication
4. **Use `as const`** - For type safety
5. **Group related constants** - Keep organized
6. **Document new constants** - Help your team

---

## 📞 Need Help?

- See [constants.util.ts](./constants.util.ts) for full definitions
- See [CONSTANTS_MANAGEMENT_SUMMARY.md](../../CONSTANTS_MANAGEMENT_SUMMARY.md) for implementation details
- Ask the team if unsure about adding new constants
