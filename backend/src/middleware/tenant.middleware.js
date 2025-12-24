module.exports = (req, res, next) => {
  if (req.user.role === 'super_admin') {
    return next();
  }

  req.tenant_id = req.user.tenant_id;
  next();
};
