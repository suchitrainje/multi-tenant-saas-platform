const { Pool } = require('pg');
const auditLogger = require('../utils/auditLogger');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.createTask = async (req, res) => {
  const { project_id, title } = req.body;

  const result = await pool.query(
    'INSERT INTO tasks (tenant_id, project_id, title) VALUES ($1, $2, $3) RETURNING *',
    [req.tenant_id, project_id, title]
  );

  await auditLogger({
    tenant_id: req.tenant_id,
    user_id: req.user.id,
    action: `Created task ${title}`
  });

  res.status(201).json({
    success: true,
    message: 'Task created',
    data: result.rows[0]
  });
};
