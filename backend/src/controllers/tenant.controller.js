const { Pool } = require('pg');
const auditLogger = require('../utils/auditLogger');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.createTenant = async (req, res) => {
  const { name, subdomain, plan } = req.body;

  const result = await pool.query(
    'INSERT INTO tenants (name, subdomain, plan, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, subdomain, plan, 'active']
  );

  await auditLogger({
    tenant_id: null,
    user_id: req.user.id,
    action: `Created tenant ${name}`
  });

  res.status(201).json({
    success: true,
    message: 'Tenant created',
    data: result.rows[0]
  });
};
