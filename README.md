# 🚀 SCP Portal App

<div align="center">

![SCP Portal](https://img.shields.io/badge/SCP%20Portal-App-4A90E2?style=for-the-badge&logo=react&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-28a745?style=for-the-badge&logo=github&logoColor=white)
![License](https://img.shields.io/badge/license-Free%20to%20Use-ffc107?style=for-the-badge&logo=open-source-initiative&logoColor=white)

*A modern, full-stack portal application built with React and Node.js*

</div>

---

## 📖 About Application

SCP Portal App is a comprehensive business management platform designed to streamline operations across multiple domains. Built with modern web technologies, it provides an intuitive interface for managing companies, contacts, tasks, emails, quotes, and inventory in one centralized system.

**Tech Stack:**
- **Frontend**: React 18.3 + TypeScript + Material-UI 5.6
- **Backend**: Node.js + Sails.js 1.5.2 + MySQL/PostgreSQL
- **Architecture**: RESTful API with JWT authentication

## ⭐ Feature Includes

- 🏢 **Company Management** - Complete company profiles and information tracking
- 👥 **Contact Management** - Comprehensive contact database with relationships
- ✅ **Task Management** - Task creation, assignment, and progress tracking
- 📧 **Email System** - Integrated email functionality with templates
- 💰 **Quote Management** - Generate, manage, and track business quotes
- 📦 **Inventory Management** - Stock tracking and inventory control
- 🔐 **User Authentication** - Secure login with JWT tokens
- 📊 **Dashboard Analytics** - Business insights and reporting
- 🎨 **Responsive Design** - Mobile-friendly interface
- 🔍 **Advanced Search & Filtering** - Quick data retrieval

## 🚀 Quick Start

Get up and running in minutes:

```bash
# Clone the repository
git clone https://github.com/sonusindhu/scp-portal-app.git
cd scp-portal-app

# Install and start frontend
cd web-app && npm install && npm start

# Install and start backend (in another terminal)
cd web-api && npm install && npm start
```

**Access the application:**
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:1337
- 📚 **API Docs**: http://localhost:1337/docs

## 🖥️ Server Setup

### Prerequisites
- Node.js 16+ and npm
- MySQL or PostgreSQL database
- Git

### Installation Steps

1. **Navigate to server directory:**
   ```bash
   cd web-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure database:**
   - Copy `config/datastores.js.example` to `config/datastores.js`
   - Update database connection settings

4. **Set environment variables:**
   ```bash
   cp config/env/production.js.example config/env/production.js
   # Edit production.js with your settings
   ```

5. **Start the server:**
   ```bash
   npm start              # Development mode
   NODE_ENV=production npm start  # Production mode
   ```

### Available Scripts
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run lint` - Code linting

**Server will be available at:** http://localhost:1337

## 💻 Client Setup

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation Steps

1. **Navigate to client directory:**
   ```bash
   cd web-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoint
   ```

4. **Start the application:**
   ```bash
   npm start              # Development mode
   npm run build          # Production build
   ```

### Available Scripts
- `npm start` - Start development server with hot reload
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run lint` - Code linting and formatting

**Client will be available at:** http://localhost:3000

## 🤝 Contribution

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 **Make** your changes
4. ✅ **Add** tests for your changes
5. 🧪 **Ensure** all tests pass (`npm test`)
6. 📝 **Commit** your changes (`git commit -m 'Add amazing feature'`)
7. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
8. 🔄 **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation when necessary
- Ensure all existing tests pass

### Code Standards
- **ESLint**: Run `npm run lint` before committing
- **Prettier**: Use `npm run format` for code formatting
- **TypeScript**: Maintain strict type checking

### Reporting Issues
- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include system information and screenshots when relevant

## 📄 License

This project is free to use for personal and commercial purposes. Feel free to modify, distribute, and use as needed.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Sonu Sindhu](https://github.com/sonusindhu)

</div>
