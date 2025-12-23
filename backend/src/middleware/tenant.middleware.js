module.exports = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    req.tenant_id = req.user.tenant_id;
  }
  next();
};
