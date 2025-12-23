-- SUPER ADMIN (NO TENANT)
INSERT INTO users (email, password_hash, role)
VALUES (
  'superadmin@system.com',
  '$2a$10$8K9cZ3zqEJdL3N9Gg1Qz6eO6f7nZC9ZbLkXKp7g5p9CzLzXcNw6',
  'super_admin'
);

-- TENANT
INSERT INTO tenants (name, subdomain, plan, status)
VALUES (
  'Demo Company',
  'demo',
  'pro',
  'active'
);

-- TENANT ADMIN
INSERT INTO users (tenant_id, email, password_hash, role)
SELECT
  id,
  'admin@demo.com',
  '$2a$10$8K9cZ3zqEJdL3N9Gg1Qz6eO6f7nZC9ZbLkXKp7g5p9CzLzXcNw6',
  'tenant_admin'
FROM tenants
WHERE subdomain = 'demo';

-- REGULAR USER 1
INSERT INTO users (tenant_id, email, password_hash, role)
SELECT
  id,
  'user1@demo.com',
  '$2a$10$8K9cZ3zqEJdL3N9Gg1Qz6eO6f7nZC9ZbLkXKp7g5p9CzLzXcNw6',
  'user'
FROM tenants
WHERE subdomain = 'demo';

-- REGULAR USER 2
INSERT INTO users (tenant_id, email, password_hash, role)
SELECT
  id,
  'user2@demo.com',
  '$2a$10$8K9cZ3zqEJdL3N9Gg1Qz6eO6f7nZC9ZbLkXKp7g5p9CzLzXcNw6',
  'user'
FROM tenants
WHERE subdomain = 'demo';

-- PROJECT 1
INSERT INTO projects (tenant_id, name, description)
SELECT
  id,
  'Project Alpha',
  'First demo project'
FROM tenants
WHERE subdomain = 'demo';

-- PROJECT 2
INSERT INTO projects (tenant_id, name, description)
SELECT
  id,
  'Project Beta',
  'Second demo project'
FROM tenants
WHERE subdomain = 'demo';

-- TASKS
INSERT INTO tasks (tenant_id, project_id, title, status)
SELECT
  t.id,
  p.id,
  'Task 1',
  'pending'
FROM tenants t
JOIN projects p ON p.tenant_id = t.id
WHERE t.subdomain = 'demo'
LIMIT 1;

INSERT INTO tasks (tenant_id, project_id, title, status)
SELECT
  t.id,
  p.id,
  'Task 2',
  'in_progress'
FROM tenants t
JOIN projects p ON p.tenant_id = t.id
WHERE t.subdomain = 'demo'
OFFSET 1 LIMIT 1;

INSERT INTO tasks (tenant_id, project_id, title, status)
SELECT
  t.id,
  p.id,
  'Task 3',
  'completed'
FROM tenants t
JOIN projects p ON p.tenant_id = t.id
WHERE t.subdomain = 'demo'
LIMIT 1;

INSERT INTO tasks (tenant_id, project_id, title, status)
SELECT
  t.id,
  p.id,
  'Task 4',
  'pending'
FROM tenants t
JOIN projects p ON p.tenant_id = t.id
WHERE t.subdomain = 'demo'
OFFSET 1 LIMIT 1;

INSERT INTO tasks (tenant_id, project_id, title, status)
SELECT
  t.id,
  p.id,
  'Task 5',
  'pending'
FROM tenants t
JOIN projects p ON p.tenant_id = t.id
WHERE t.subdomain = 'demo'
LIMIT 1;
