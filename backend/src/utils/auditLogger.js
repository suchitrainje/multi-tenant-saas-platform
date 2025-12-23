const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = async ({ tenant_id, user_id, action }) => {
  await pool.query(
    'INSERT INTO audit_logs (tenant_id, user_id, action) VALUES ($1, $2, $3)',
    [tenant_id, user_id, action]
  );
};
