# ⚡ SCP Portal - Web API Server

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.0-339933?style=for-the-badge&logo=node.js)
![Sails.js](https://img.shields.io/badge/Sails.js-1.5-14ACC2?style=for-the-badge&logo=sails.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

*Backend API server for SCP Portal built with Sails.js*

</div>

---

## 📋 Overview

This is the **server-side application** for the SCP Portal. It's built with Sails.js framework and provides RESTful APIs for managing users, companies, contacts, tasks, emails, quotes, and inventory.

## 🛠️ Tech Stack

- **Sails.js 1.5.2** - MVC framework for Node.js
- **Node.js 18.0+** - JavaScript runtime
- **MySQL/PostgreSQL** - Relational database support
- **JWT** - JSON Web Token authentication
- **Swagger** - API documentation
- **Waterline ORM** - Database abstraction layer
- **Bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **MySQL** or **PostgreSQL** database

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The API server will run on [http://localhost:1337](http://localhost:1337)

## 📁 Project Structure

```
api/
├── 📂 controllers/         # API route controllers
│   ├── AuthController.js   # Authentication endpoints
│   ├── CompanyController.js # Company management
│   ├── ContactController.js # Contact management
│   ├── EmailController.js  # Email system
│   ├── TaskController.js   # Task management
│   └── UserController.js   # User management
├── 📂 models/              # Database models (ORM)
│   ├── User.js             # User model
│   ├── Company.js          # Company model
│   ├── Task.js             # Task model
│   ├── Email.js            # Email model
│   └── Quote.js            # Quote model
├── 📂 policies/            # Security policies
│   └── isLoggedIn.js       # Authentication middleware
├── 📂 services/            # Business logic services
│   ├── AuthService.js      # Authentication service
│   ├── CompanyService.js   # Company service
│   └── QuoteService.js     # Quote service
├── 📂 helpers/             # Helper functions
│   ├── send-template-email.js # Email utilities
│   └── verify-jwt.js       # JWT verification
└── 📂 hooks/               # Sails.js hooks
config/
├── 📂 env/                 # Environment-specific config
├── routes.js               # API routes definition
├── datastores.js           # Database configuration
└── policies.js             # Security policies config
```

## ⚙️ Database Configuration

Update `config/datastores.js` for your database:

```javascript
module.exports.datastores = {
  default: {
    adapter: 'sails-mysql', // or 'sails-postgresql'
    host: 'localhost',
    user: 'your-db-username',
    password: 'your-db-password',
    database: 'scp_portal'
  }
};
```

## 🔐 Environment Configuration

Update `config/env/development.js`:

```javascript
module.exports = {
  // Database configuration
  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'your-db-username',
      password: 'your-db-password',
      database: 'scp_portal'
    }
  },

  // JWT configuration
  jwt: {
    secret: 'your-super-secret-jwt-key',
    expiresIn: '7d'
  },

  // CORS settings
  cors: {
    allRoutes: true,
    allowOrigins: ['http://localhost:3000'],
    allowCredentials: true
  }
};
```

## 📜 Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Run ESLint
npm run lint

# Production start
NODE_ENV=production npm start
```

## 📖 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### User Management
- `GET /api/v1/user` - Get all users
- `POST /api/v1/user` - Create user
- `PUT /api/v1/user/:id` - Update user
- `DELETE /api/v1/user/:id` - Delete user

### Company Management
- `GET /api/v1/company` - Get all companies
- `POST /api/v1/company` - Create company
- `PUT /api/v1/company/:id` - Update company
- `DELETE /api/v1/company/:id` - Delete company

### Task Management
- `GET /api/v1/task` - Get all tasks
- `POST /api/v1/task` - Create task
- `PUT /api/v1/task/:id` - Update task
- `DELETE /api/v1/task/:id` - Delete task

### Email System
- `GET /api/v1/email` - Get emails
- `POST /api/v1/email/send` - Send email
- `DELETE /api/v1/email/:id` - Delete email

### Quote Management
- `GET /api/v1/quote` - Get quotes
- `POST /api/v1/quote` - Create quote
- `PUT /api/v1/quote/:id` - Update quote
- `DELETE /api/v1/quote/:id` - Delete quote

## 📊 API Documentation

- **Swagger UI**: [http://localhost:1337/docs](http://localhost:1337/docs)
- **Swagger JSON**: Available at `/swagger/swagger.json`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run ESLint
npm run lint

# Run custom tests
npm run custom-tests
```

## 🚀 Production Deployment

1. **Set Environment Variables**:
   ```bash
   export NODE_ENV=production
   export DB_HOST=your-production-db-host
   export DB_USER=your-production-db-user
   export DB_PASSWORD=your-production-db-password
   ```

2. **Start Production Server**:
   ```bash
   NODE_ENV=production npm start
   ```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **CORS Protection** - Configurable cross-origin resource sharing
- **Input Validation** - Request validation and sanitization
- **Rate Limiting** - API rate limiting capabilities

## 📧 Email Integration

The API supports email functionality with configurable SMTP settings. Update your environment configuration with email credentials.

## 🗃️ Database Models

- **User** - User accounts and authentication
- **Company** - Company information management
- **Contact** - Contact details and relationships
- **Task** - Task management and tracking
- **Email** - Email communication logs
- **Quote** - Quote generation and management
- **Inventory** - Inventory item tracking

---

### 🔗 Sails.js Resources

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)

### 📅 Version Info

This app was originally generated on Sat Apr 30 2022 using Sails v1.5.2.

---

**Built with ❤️ by [Sonu Sindhu](https://github.com/sonusindhu)**

