-- UP
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    project_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_tenant
      FOREIGN KEY (tenant_id) REFERENCES tenants(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_tasks_project
      FOREIGN KEY (project_id) REFERENCES projects(id)
      ON DELETE CASCADE
);

CREATE INDEX idx_tasks_tenant_id ON tasks(tenant_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);

-- DOWN
DROP TABLE IF EXISTS tasks;
