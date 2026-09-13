# SCP Portal App

A full-stack business portal for managing companies, contacts, tasks, notes, emails, quotes, and inventory. The project currently uses a migrated Express + TypeScript + Prisma API and a React + Vite frontend.

## Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- Backend: Express, TypeScript, Prisma ORM, PostgreSQL-compatible database
- Auth: JWT-based authentication via middleware
- Validation: Zod
- Testing: Vitest + Supertest

## Repository structure

```bash
scp-portal-app/
├── server-api/          # Express + Prisma backend
│   ├── src/
│   ├── prisma/
│   ├── deployment/
│   ├── package.json
│   └── README.md
├── web-app/             # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── README.md            # root project overview
├── CONSTANTS_CHECKLIST.md
├── CONSTANTS_MANAGEMENT_SUMMARY.md
├── FORM_VALIDATION_SUMMARY.md
├── SERVICE_MIGRATION_SUMMARY.md
└── ...
```

## Prerequisites

- Node.js 18+
- npm or pnpm
- PostgreSQL database running locally or in your environment
- Environment variables configured for the backend

## Environment setup

### Backend

Create a `.env` file in `server-api` based on your database and JWT setup, for example:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/scp_portal"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=4001
```

### Frontend

Create a `.env` file in `web-app` if needed:

```bash
VITE_API_URL=http://localhost:4001/api
```

## Run the app

### 1) Install dependencies

```bash
cd server-api && npm install
cd ../web-app && npm install
```

### 2) Prepare database

```bash
cd server-api
npm run prisma:generate
npm run prisma:migrate
npm run seed:users
```

If you want the full setup in one command:

```bash
cd server-api
npm run db:prepare
```

### 3) Start backend

```bash
cd server-api
npm run dev
```

The API runs on:

- http://localhost:4001
- health endpoint: http://localhost:4001/api/health

### 4) Start frontend

```bash
cd web-app
npm run dev
```

The frontend runs on:

- http://localhost:3000

## Main features

- Company management
- Contact management
- Quote management
- Task management
- Notes and emails
- Inventory tracking
- User authentication and role-aware access
- List filtering, sorting, and generic query handling
- API response hydration with friendly names for related entities

## Backend scripts

```bash
cd server-api
npm run dev
npm run build
npm run test
npm run lint
npm run prisma:generate
npm run prisma:migrate
npm run seed:users
```

## Frontend scripts

```bash
cd web-app
npm run dev
npm run build
npm run preview
npm run type-check
npm run lint
```

## API conventions

The migrated backend follows a consistent response envelope and a shared list-query utility for filter/sort logic. The frontend uses the backend API contract where list responses include hydrated display values such as:

- createdByName
- updatedByName
- companyName
- contactName

## Notes

The migration work is split between the backend and frontend, with the backend now serving as the source of truth for data validation, Prisma access, and API contracts.

For deeper implementation details, see the docs in the root folder and theREADME files inside each app folder.

---

Built for SCP Portal operations and ongoing migration work.
