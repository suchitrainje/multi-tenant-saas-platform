const { Pool } = require('pg');
const auditLogger = require('../utils/auditLogger');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  const result = await pool.query(
    'INSERT INTO projects (tenant_id, name, description) VALUES ($1, $2, $3) RETURNING *',
    [req.tenant_id, name, description]
  );

  await auditLogger({
    tenant_id: req.tenant_id,
    user_id: req.user.id,
    action: `Created project ${name}`
  });

  res.status(201).json({
    success: true,
    message: 'Project created',
    data: result.rows[0]
  });
};
