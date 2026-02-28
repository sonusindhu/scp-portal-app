
# 🌐 SCP Portal App

<div align="center">

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38BDF8?style=for-the-badge&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-%F0%9F%92%96-000?style=for-the-badge)
![Sails.js](https://img.shields.io/badge/Sails.js-1.5.2-2C3E50?style=for-the-badge&logo=sails&logoColor=white)

*A modern, full-stack portal application for business management*

</div>

---

## 📋 Overview

SCP Portal App is a comprehensive platform for managing companies, contacts, tasks, emails, quotes, and inventory. It features a modern React/TypeScript frontend and a robust Node.js/Sails.js backend, providing a seamless, responsive user experience.

## 🛠️ Tech Stack

- **Frontend**: React 19.0.0, TypeScript 5.4.5, Tailwind CSS 4.1.18, shadcn/ui, Vite
- **Backend**: Node.js, Sails.js 1.5.2, MySQL/PostgreSQL
- **UI System**: Tailwind CSS, shadcn/ui, Radix UI
- **Other Libraries**: React Router, TanStack React Table, React Hook Form, Axios, Notistack
- **Architecture**: RESTful API with JWT authentication


## 🎨 Features

- 📊 **Dashboard** - Overview of tasks, companies, and analytics
- 🏢 **Company Management** - Add, edit, and manage companies
- 👥 **Contact Management** - Maintain contact information
- ✅ **Task Management** - Create and track tasks
- 📧 **Email Integration** - Send and manage emails
- 📝 **Notes System** - Create and organize notes
- 📦 **Inventory Management** - Track inventory items
- 💰 **Quote Management** - Generate and manage quotes
- 👤 **User Profiles** - User account management
- 🔐 **User Authentication** - Secure login with JWT tokens
- 📊 **Dashboard Analytics** - Business insights and reporting
- 🎨 **Responsive Design** - Mobile-friendly interface
- 🔍 **Advanced Search & Filtering** - Quick data retrieval


## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **MySQL or PostgreSQL database**

### Clone the repository

```bash
git clone https://github.com/sonusindhu/scp-portal-app.git
cd scp-portal-app
```

### Start the Backend API

```bash
cd web-api
npm install
npm start
```

### Start the Frontend

```bash
cd web-app
npm install
npm run dev
```

**Access the application:**
- 🌐 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:1337
- 📚 **API Docs**: http://localhost:1337/docs


---

## 📁 Project Structure (Frontend)

```
src/
├── components/          # Feature and UI components
│   ├── Home/           # Home page
│   ├── Profile/        # User profile
│   ├── CompanyList/    # Company management (CRUD, forms, list)
│   ├── Contacts/       # Contact management
│   ├── Inventory/      # Inventory management
│   ├── Quote/          # Quote management
│   ├── Login/          # Auth/login UI
│   ├── ui/             # Custom UI primitives (Button, Card, Tabs, etc.)
├── layouts/            # Page layout components
├── models/             # TypeScript type definitions
├── services/           # API service functions
├── shared/             # Shared utilities and components
│   ├── components/     # Shared components (Tasks, Emails, Notes)
│   └── common/         # Common utilities
├── utils/              # Helper functions and utilities
├── App.tsx             # Main App component
└── index.tsx           # Application entry point
```

## 🧩 UI & Component System

- **Tailwind CSS** and **shadcn/ui** are used for all new UI components, providing a modern, accessible, and customizable design system.
- **Radix UI** primitives are used for accessibility and composability.

See `src/components/ui/` for custom UI primitives (Button, Card, Tabs, etc.).
See `src/components/TailwindDemo.tsx` for a demo of the new UI system.

## 🪝 Custom Hooks

Reusable hooks simplify state management and common patterns:

- `useAuth` - Authentication state and user info
- `useDeleteConfirmation` - Standardized delete confirmation dialogs
- `useDrawer` - Drawer open/close state
- `useGridActions` - Grid/list action menu logic
- `useLoading`, `useLoadingStates` - Loading state management
- `useRefresh` - Simple refresh triggers
- `useFormSubmit` - Form submission helpers

See `src/hooks/HOOKS_USAGE_GUIDE.tsx` for usage examples.

## ⚡ Loading Components & Patterns

Consistent loading UI is provided by reusable components in `src/shared/components/Loading/`:

- `LoadingButton` - Button with loading state
- `LoadingContainer` - Wrapper for loading/error/empty states
- `LoadingOverlay` - Blocks interaction during async ops
- `LoadingSpinner`, `PageLoader`, `InlineLoadingSpinner` - Spinners for various contexts

Use with hooks: `useLoading`, `useLoadingStates` (see [QUICK_REFERENCE.md](src/shared/components/Loading/QUICK_REFERENCE.md)).

**Example:**

```tsx
const { isLoading, withLoading } = useLoading();
await withLoading(saveData(data));
<LoadingButton loading={isLoading}>Save</LoadingButton>
```

## 🗂️ Constants Organization

All constants are centralized in `src/constants/` and re-exported via `src/utils/constants.util.ts` for easy import.

- **types.constants.ts** - Core types and entity enums
- **domain.constants.ts** - Business/domain values (statuses, types, etc.)
- **ui.constants.ts** - UI config (field widths, date formats, etc.)
- **api.constants.ts** - API endpoints and HTTP status codes
- **routes.constants.ts** - All route paths (see `ROUTES`)

See [src/constants/README.md](src/constants/README.md) and [src/utils/CONSTANTS_GUIDE.md](src/utils/CONSTANTS_GUIDE.md) for details and usage patterns.

## ⚙️ Environment Configuration

Create a `.env` file in the `web-app` root directory:

```bash
# API Configuration
VITE_API_ENDPOINT=http://localhost:1337/api/v1/app/
```

## ⚙️ Environment Configuration

Create a `.env` file in the `web-app` root directory:

```bash
# API Configuration
VITE_API_ENDPOINT=http://localhost:1337/api/v1/app/
```


## 🧪 Testing

Testing is set up with **Jest** and **React Testing Library**. Example test: `src/components/CompanyList/test/CompanyList.spec.tsx`.

Scripts:

```bash
npm test
npm test -- --coverage
npm test -- --watchAll
```

This project includes:
- **Unit Tests** - Component testing with React Testing Library
- **Integration Tests** - API integration testing
- **E2E Tests** - End-to-end user flow testing


## 🚀 Deployment

See the [Vite deployment documentation](https://vitejs.dev/guide/static-deploy.html) for more information on deploying this React application.

---

**Built with ❤️ by [Sonu Sindhu](https://github.com/sonusindhu)**
