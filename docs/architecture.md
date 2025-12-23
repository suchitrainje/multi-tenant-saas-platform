## System Architecture Diagram

![System Architecture](images/system-architecture.png)

This diagram illustrates the high-level architecture of the multi-tenant SaaS application. 
The client interacts with a React-based frontend, which communicates with a Node.js and Express backend API.
Authentication is handled using JWT tokens, and all data is stored in a shared PostgreSQL database.
Tenant isolation is enforced at the application level using middleware and `tenant_id` filtering.

## Database ERD

![Database ERD](images/database-erd.png)

The database schema is designed using a shared database and shared schema multi-tenancy approach.
Each table includes a `tenant_id` column to enforce strict tenant-level data isolation.
Relationships between tenants, users, projects, tasks, and audit logs ensure secure and scalable data access.
