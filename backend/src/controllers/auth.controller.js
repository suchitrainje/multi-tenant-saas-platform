const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const auditService = require('../services/audit.service');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1d';

/* ================================
   POST /api/auth/register-tenant
================================ */
exports.registerTenant = async (req, res, next) => {
  const client = await db.connect();

  try {
    const {
      tenantName,
      subdomain,
      adminEmail,
      adminPassword,
      adminFullName
    } = req.body;

    await client.query('BEGIN');

    // 1️⃣ Check tenant uniqueness
    const tenantCheck = await client.query(
      'SELECT id FROM tenants WHERE subdomain = $1',
      [subdomain]
    );
    if (tenantCheck.rows.length > 0) {
      throw new Error('Tenant already exists');
    }

    // 2️⃣ Create tenant
    const tenantResult = await client.query(
      `INSERT INTO tenants (name, subdomain, status)
       VALUES ($1, $2, 'active')
       RETURNING id`,
      [tenantName, subdomain]
    );

    const tenantId = tenantResult.rows[0].id;

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 4️⃣ Create admin user
    const userResult = await client.query(
      `INSERT INTO users (email, password, role, tenant_id, full_name)
       VALUES ($1, $2, 'tenant_admin', $3, $4)
       RETURNING id, email, role`,
      [adminEmail, hashedPassword, tenantId, adminFullName]
    );

    // 5️⃣ Audit log
    await auditService.log({
      tenantId,
      userId: userResult.rows[0].id,
      action: 'TENANT_REGISTERED'
    });

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Tenant registered successfully',
      data: {
        tenantId,
        admin: userResult.rows[0]
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

/* ================================
   POST /api/auth/login
================================ */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      `SELECT id, email, password, role, tenant_id
       FROM users
       WHERE email = $1 AND is_active = true`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        tenantId: user.tenant_id
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await auditService.log({
      tenantId: user.tenant_id,
      userId: user.id,
      action: 'USER_LOGIN'
    });

    res.json({
      success: true,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

/* ================================
   GET /api/auth/me
================================ */
exports.me = async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};

/* ================================
   POST /api/auth/logout
   (Stateless JWT)
================================ */
exports.logout = async (req, res) => {
  await auditService.log({
    tenantId: req.user.tenantId,
    userId: req.user.userId,
    action: 'USER_LOGOUT'
  });

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
exports.me = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user.userId,
        role: req.user.role,
        tenant_id: req.user.tenantId
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
};

exports.logout = async (req, res) => {
  // JWT is stateless → logout is handled on frontend
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};
