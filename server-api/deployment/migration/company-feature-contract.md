# Company feature contract

## 1. Legacy review summary

The legacy feature in `web-api/api/controllers/CompanyController.js` exposes the following business operations:

- `listOfNames`
- `listView`
- `create`
- `update`
- `findById`
- `delete`
- `deleteRange`

The legacy model in `web-api/api/models/Company.js` indicates the real business fields are:

- name
- email
- type
- status
- phone
- extension
- address1
- address2
- city
- state
- zipcode
- country
- employeesCount
- revenue
- relation to contact / createdBy / updatedBy / isDeleted

Important findings:

- The old feature is not a simple CRUD copy. It supports list filtering, sorting, pagination, and total counts.
- The old API encapsulates uniqueness checks for company name and email.
- The old response envelope is the legacy Sails format (`status`, `message`, `result`, `total`), which must be translated to the new app contract (`status`, `message`, `data`, `meta`).
- The legacy feature is a good business reference, not a direct implementation template.

## 2. Business intent to preserve

We should preserve the real domain behavior:

- list companies with basic identifiers
- list companies with search/filter/pagination support
- create a company with validation
- prevent duplicate company names and emails
- fetch one company by ID
- update a company by ID
- delete one or many companies

## 3. New app contract

### Response contract

All company endpoints should use the shared response envelope:

```json
{
  "status": true,
  "message": "Company created successfully",
  "data": { ... },
  "meta": { "total": 10 }
}
```

Error responses:

```json
{
  "status": false,
  "message": "Company name is already taken",
  "data": { "code": "COMPANY_NAME_EXISTS" }
}
```

## 4. Endpoints to implement

### 1) GET /api/company/list-of-names
Purpose: returns minimal list of companies for dropdowns/select controls.

Response:

```json
{
  "status": true,
  "message": "Company list fetched successfully.",
  "data": [
    { "id": 1, "name": "Acme Logistics" }
  ]
}
```

### 2) GET /api/company
Purpose: returns all companies.

Optional query params:
- `skip`
- `take`
- `sortBy`
- `sortDirection`

### 3) POST /api/company
Purpose: create a company.

Body:

```json
{
  "name": "Acme Logistics",
  "email": "hello@acme.com",
  "type": "customer",
  "status": "active",
  "phone": "1234567890",
  "extension": "101",
  "address1": "123 Main St",
  "address2": "Suite 200",
  "city": "Dallas",
  "state": "TX",
  "zipcode": "75201",
  "country": "USA",
  "employeesCount": 120,
  "revenue": 5000000
}
```

Rules:
- name is required
- email is required and unique
- invalid payload returns 400
- duplicate name/email returns 409

### 4) GET /api/company/:id
Purpose: fetch company by id.

### 5) PUT /api/company/:id
Purpose: update company.

Rules:
- check company exists
- if name or email changes, ensure uniqueness

### 6) DELETE /api/company/:id
Purpose: delete a company.

### 7) POST /api/company/list
Purpose: list with pagination/filter data in request body.

Body shape similar to legacy pattern:

```json
{
  "skip": 0,
  "take": 20,
  "sort": [{ "id": "asc" }],
  "filter": {
    "filters": [
      { "field": "name", "operator": "contains", "value": "Acme" }
    ]
  }
}
```

This may be implemented later if filter/sort support is required for the front-end grid.

## 5. Required Prisma fields for the new app

The initial company schema should include:

- id
- name
- email
- type
- status
- phone
- extension
- address1
- address2
- city
- state
- zipcode
- country
- employeesCount
- revenue
- createdAt
- updatedAt

The following are optional for later consideration and should not be added unless required:

- mainContact
- createdBy
- updatedBy
- isDeleted

These legacy relations are not essential for the first company migration and should be deferred unless the product clearly needs them.

## 6. Scope decision for this migration

We should implement the current company feature in phases.

Phase 1 (required):
- list-of-names
- create
- fetch one
- update
- delete
- unique validation

Phase 2 (optional / later):
- advanced grid list/filter payload
- soft delete support
- audit user relations
- relationship to contacts

## 7. Conclusion

The legacy feature is useful as a behavioral reference, but not as a direct code template. The migration should preserve the business intent while conforming to the new modular Monolith pattern and the shared API response contract.

This contract will guide the actual implementation and prevent rework.
