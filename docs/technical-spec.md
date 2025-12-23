# Technical Specification

## Backend Project Structure

The backend is built using Node.js and Express and follows a modular and scalable folder structure to support a multi-tenant SaaS architecture.

backend/
├── src/
│   ├── controllers/
│   │   Handles incoming HTTP requests and returns appropriate responses.
│   │   Controllers contain business logic for authentication, users, projects, and tasks.
│   ├── routes/
│   │   Defines API routes and maps them to corresponding controllers.
│   │   Routes are grouped by modules such as auth, users, projects, and tasks.
│   ├── middleware/
│   │   Contains reusable middleware functions such as JWT authentication,
│   │   role-based access control, and tenant isolation using tenant_id.
│   ├── models/
│   │   Defines database models and schema mappings for PostgreSQL tables.
│   ├── utils/
│   │   Contains helper functions such as token generation, password hashing,
│   │   and response formatting.
│   ├── config/
│   │   Stores configuration files such as database connection and environment variables.
│   └── app.js
│       Application entry point that initializes Express, middleware, and routes.
├── migrations/
│   Database migration files for schema creation and updates.
└── tests/
    Automated tests for APIs and business logic.

---

## Frontend Project Structure

The frontend is a React-based single-page application designed to provide a responsive and role-based user interface.

frontend/
├── src/
│   ├── pages/
│   │   Contains main application pages such as Login, Registration, Dashboard,
│   │   Projects List, Project Details, and Users List.
│   ├── components/
│   │   Reusable UI components such as navigation bars, forms, and modals.
│   ├── services/
│   │   Handles API communication with the backend using HTTP clients.
│   │   Includes authentication and token management.
│   ├── context/
│   │   Manages global application state such as user authentication and roles.
│   ├── styles/
│   │   Contains CSS or styling files for responsive design.
│   └── App.js
│       Main application component that defines routes and protected views.

---

## Development Setup Guide

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Environment Variables
The application uses environment variables for configuration, including:
- Database connection details
- JWT secret key
- Backend and frontend service URLs

All environment variables are defined in a `.env` file or directly in `docker-compose.yml`
using development-safe values.

### Running the Application (Docker)
To start all services (database, backend, frontend), run:

```bash
docker-compose up -d
