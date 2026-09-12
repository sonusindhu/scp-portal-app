Frontend → Backend Endpoint Mapping

Notes:
- Frontend call paths are passed to `BaseService` which prefixes with `VITE_API_ENDPOINT` (e.g. `http://localhost:4001/api`).
- Backend routes are mounted under `/api` in `server-api`. For compatibility both legacy action-style paths and hyphenated bulk-delete aliases are available (e.g. `deleteRange` and `delete-range`).
- All responses use the standard response envelope: { status: boolean, message: string, result?: any, error?: any }.

Company Service
- find(id?)
  - Frontend: GET `company/find` or `company/find/{id}`
  - Backend: GET `/api/company/find` or `/api/company/find/{id}`
- create
  - Frontend: POST `company/create`
  - Backend: POST `/api/company/create`
- update
  - Frontend: POST `company/update`
  - Backend: POST `/api/company/update`
- deleteCompanies
  - Frontend: POST `company/deleteRange` (payload: { ids: number[] })
  - Backend: POST `/api/company/deleteRange` and `/api/company/delete-range` (compatibility)

Contact Service
- getContacts(filters)
  - Frontend: POST `contact/get` (payload: filters)
  - Backend: POST `/api/contact/get`
- find(id)
  - Frontend: GET `contact/find/{id}`
  - Backend: GET `/api/contact/find/{id}`
- create
  - Frontend: POST `contact/create`
  - Backend: POST `/api/contact/create`
- update
  - Frontend: POST `contact/update`
  - Backend: POST `/api/contact/update`
- deleteContacts
  - Frontend: POST `contact/delete` (payload: { ids })
  - Backend: POST `/api/contact/delete` and `/api/contact/delete-range`
- getCompanies
  - Frontend: GET `company/listOfNames`
  - Backend: GET `/api/company/listOfNames`

Quote Service
- find(id)
  - Frontend: GET `quote/find/{id}`
  - Backend: GET `/api/quote/find/{id}`
- create
  - Frontend: POST `quote/create`
  - Backend: POST `/api/quote/create`
- update
  - Frontend: POST `quote/update`
  - Backend: POST `/api/quote/update`
- deleteRange
  - Frontend: POST `quote/deleteRange` (payload: { ids })
  - Backend: POST `/api/quote/deleteRange` and `/api/quote/delete-range`
- getCompanies
  - Frontend: GET `quote/getCompanies`
  - Backend: GET `/api/quote/getCompanies`
- getContactsByCompany(id)
  - Frontend: GET `quote/getContactsByCompany/{id}`
  - Backend: GET `/api/quote/getContactsByCompany/{id}`
- common resources
  - Frontend: GET `common/getEquipments`, `common/getCommodities`, `common/getCargos`
  - Backend (preferred new docs): GET `/api/common/equipments`, `/api/common/commodities`, `/api/common/cargos` (compat aliases `/api/common/getEquipments`, etc. remain available)
- notes/tasks/emails for quote
  - Frontend: POST `quote/{id}/notes`, `quote/{id}/tasks`, `quote/{id}/emails` (list fetches are POSTs)
  - Backend: POST `/api/quote/{id}/notes`, `/api/quote/{id}/tasks`, `/api/quote/{id}/emails`
- createNote/createTask/createEmail
  - Frontend: POST `quote/createNote`, `quote/createTask`, `quote/createEmail`
  - Backend: POST `/api/quote/createNote`, `/api/quote/createTask`, `/api/quote/createEmail`
- getEmailById
  - Frontend: GET `quote/{id}/getEmailById/{emailId}`
  - Backend: GET `/api/quote/{id}/getEmailById/{emailId}`

Inventory Service
- find(id)
  - Frontend: GET `inventory/find/{id}`
  - Backend: GET `/api/inventory/find/{id}`
- create/update/delete
  - Frontend: POST `inventory/create`, `inventory/update`, `inventory/delete` (or API_ENDPOINTS.INVENTORY.DELETE)
  - Backend: POST `/api/inventory/create`, `/api/inventory/update`, `/api/inventory/delete` (compat aliases `/api/inventory/delete-range`)
- getCompanies
  - Frontend: GET `company/listOfNames`
  - Backend: GET `/api/company/listOfNames`

Task Service
- list
  - Frontend: POST `task/list`
  - Backend: POST `/api/task/list`
- find
  - Frontend: GET `task/find/{id}`
  - Backend: GET `/api/task/find/{id}`
- create/update/deleteRange
  - Frontend: POST `task/create`, `task/update`, `task/deleteRange`
  - Backend: POST `/api/task/create`, `/api/task/update`, `/api/task/deleteRange` (and hyphen alias)

Note Service
- list/find/create/update/deleteRange
  - Frontend: `note/list`, `note/find/{id}`, `note/create`, `note/update`, `note/deleteRange`
  - Backend: `/api/note/list`, `/api/note/find/{id}`, `/api/note/create`, `/api/note/update`, `/api/note/deleteRange`

Email Service
- list/find/create/update/deleteRange
  - Frontend: `email/list`, `email/find/{id}`, `email/create`, `email/update`, `email/deleteRange`
  - Backend: `/api/email/list`, `/api/email/find/{id}`, `/api/email/create`, `/api/email/update`, `/api/email/deleteRange`

GridService
- Grid calls `axios.post(url, payload)` directly. Ensure `url` values use API_ENDPOINTS constants (e.g. `company/get`) so final request becomes `${VITE_API_ENDPOINT}company/get` → POST `/api/company/get`.

Auth & User
- Frontend uses `auth/signin`, `auth/signout`, etc. Map to `/api/auth/signin`, `/api/auth/signout`, `/api/auth/refresh`, `/api/auth/verify`.

Developer Notes / Next Steps
- Set `VITE_API_ENDPOINT` in `web-app/.env` to point to the server API base, e.g. `VITE_API_ENDPOINT=http://localhost:4001/api/`.
- For safety during migration, keep backend compatibility aliases active. After frontend is migrated and verified, plan to remove legacy aliases and document final routes.
- If you want, I can generate a CSV of frontend method → HTTP method → backend path → payload example for import into tracking tools.

Generated: mapping extracted from `web-app/src/services/*` and `web-app/src/constants/api.constants.ts`.
