const adminService = require('../../services/admin/index');

module.exports = async (req, res) => {
  const contractors = await adminService.getBestProfession(req, res);
  res.json(contractors)
}