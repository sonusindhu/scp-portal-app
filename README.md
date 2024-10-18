# SCP Portal App

Welcome to the SCP Portal App! This project consists of two main components: a frontend web application and a backend API. Below is a brief overview of each component and how to set up the project.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)

## Overview

The SCP Portal App is designed to [brief description of the app's purpose, features, and functionality].

## Directory Structure

```plaintext
scp-portal-app/
│
├── web-app/          # Frontend application
│
└── web-api/          # Backend API
│
└── db/import.sql     # Sql to Import
```


## Technologies Used

### Frontend:
- React
- Material-UI (MUI)
- AG Grid

### Backend:
- Sails.js (Node.js framework)

### Database:
- MySQL/MariaDB

### Other Tools:
- [Any additional tools or libraries]

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (for both frontend and backend)
- MySQL/MariaDB

### Frontend Setup

1. Navigate to the `web-app` directory:
   ```bash
   cd web-app
    ```

2. Install the dependencies:
   ```bash
   npm install
    ```

3. Start the development server:
   ```bash
   npm start
    ```

### Backend Setup

1. Navigate to the `web-api` directory:
   ```bash
   cd web-api
    ```

2. Install the dependencies:
   ```bash
   npm install
    ```
3. Complete [Database Setup](#database-setup):

4. Start the development server:
   ```bash
   sails lift
    ```

## API Documentation

The API provides endpoints for various functionalities. Below are some key endpoints:

- **GET** `/api/example`: Retrieve example data.
- **POST** `/api/example`: Create a new example entry.
- **PUT** `/api/example/:id`: Update an existing example entry.
- **DELETE** `/api/example/:id`: Delete an example entry.

## Database Setup

1. Ensure that MySQL/MariaDB is installed and running.
2. Create a new database for the project.
3. Run the database migration scripts (if applicable) to set up the schema.
4. Update the database connection settings in the backend configuration file. under `web-api/config/datasources.js`
   
   ```bash
   adapter: process.env.DB_ADAPTER || "sails-mysql",
   url: process.env.DB_URL || "mysql://root@localhost:3306/sails_scpapi",
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a descriptive message.
4. Push to the branch.
5. Create a pull request.

## License

This project is licensed under the Free License.
