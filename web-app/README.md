# 🌐 SCP Portal - Web Client

<div align="center">

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178C6?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.14-007FFF?style=for-the-badge&logo=mui)

*Frontend React TypeScript application for SCP Portal*

</div>

---

## 📋 Overview

This is the **client-side application** for the SCP Portal. It's built with React, TypeScript, and Material-UI to provide a modern, responsive user interface for managing tasks, companies, contacts, emails, and more.

## 🛠️ Tech Stack

- **React 19.0.0** - Modern React with hooks and functional components
- **TypeScript 5.4.5** - Type-safe JavaScript for better development experience
- **Material-UI (MUI) 5.15.14** - React component library for consistent UI
- **React Router 6.22.3** - Client-side routing
- **TanStack React Table 8.21.3** - Advanced data grid for tables
- **React Hook Form 7.51.2** - Form handling with validation
- **Axios 1.6.8** - HTTP client for API requests
- **Notistack 3.0.1** - Snackbar notifications

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **Backend API** running (see below)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at [http://localhost:5173](http://localhost:5173) (default Vite port).

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Home/           # Home page component
│   ├── Profile/        # User profile components
│   ├── CompanyList/    # Company management
│   ├── Contacts/       # Contact management
│   └── Inventory/      # Inventory components
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

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_ENDPOINT=http://localhost:1337/api/v1/app/
```

## 📜 Available Scripts

### Development

```bash
npm install
npm run dev
```

### Testing

```bash
npm test
npm test -- --coverage
npm test -- --watchAll
```

### Production Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

## 🔗 Backend Integration

This client application requires the **SCP Portal API** to be running.

Make sure to start the backend server first:
```bash
cd ../web-api
npm start
```

## 🎨 Features

- 📊 **Dashboard** - Overview of tasks, companies, and analytics
- 👥 **Company Management** - Add, edit, and manage companies
- 📞 **Contact Management** - Maintain contact information
- ✅ **Task Management** - Create and track tasks
- 📧 **Email Integration** - Send and manage emails
- 📝 **Notes System** - Create and organize notes
- 📦 **Inventory Management** - Track inventory items
- 💰 **Quote Management** - Generate and manage quotes
- 👤 **User Profiles** - User account management

## 🧪 Testing

This project includes comprehensive testing with:
- **Unit Tests** - Component testing with React Testing Library
- **Integration Tests** - API integration testing
- **E2E Tests** - End-to-end user flow testing

## 🚀 Deployment

See the [Vite deployment documentation](https://vitejs.dev/guide/static-deploy.html) for more information on deploying this React application.

---

**Built with ❤️ by [Sonu Sindhu](https://github.com/sonusindhu)**
