# 🌐 SCP Portal - Web Client

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-5.6-007FFF?style=for-the-badge&logo=mui)

*Frontend React TypeScript application for SCP Portal*

</div>

---

## 📋 Overview

This is the **client-side application** for the SCP Portal. It's built with React, TypeScript, and Material-UI to provide a modern, responsive user interface for managing tasks, companies, contacts, emails, and more.

## 🛠️ Tech Stack

- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Material-UI (MUI) 5.6** - React component library for consistent UI
- **React Router 6.2** - Client-side routing
- **AG Grid 27.3** - Advanced data grid for tables
- **React Hook Form 7.45** - Form handling with validation
- **Axios 0.24** - HTTP client for API requests
- **Notistack 3.0** - Snackbar notifications

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **Backend API** running on port 1337

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── 📂 components/          # Reusable UI components
│   ├── 📂 Home/           # Home page component
│   ├── 📂 Profile/        # User profile components
│   ├── 📂 CompanyList/    # Company management
│   ├── 📂 Contacts/       # Contact management
│   └── 📂 Inventory/      # Inventory components
├── 📂 layouts/            # Page layout components
├── 📂 models/             # TypeScript type definitions
├── 📂 services/           # API service functions
├── 📂 shared/             # Shared utilities and components
│   ├── 📂 components/     # Shared components (Tasks, Emails, Notes)
│   └── 📂 common/         # Common utilities
├── 📂 utils/              # Helper functions and utilities
├── App.tsx                # Main App component
└── index.tsx              # Application entry point
```

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:1337
REACT_APP_ENV=development

# Optional: Analytics
REACT_APP_GA_TRACKING_ID=your-google-analytics-id
```

## 📜 Available Scripts

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000). The page will reload when you make changes.

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watchAll
```

### Production Build

```bash
# Build for production
npm run build
```

Builds the app for production to the `build` folder. The build is minified and optimized for the best performance.

## 🔗 Backend Integration

This client application requires the **SCP Portal API** to be running on port 1337.

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

See the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment) for more information on deploying this React application.

---

**Built with ❤️ by [Sonu Sindhu](https://github.com/sonusindhu)**
