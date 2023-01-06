const adminService = require('../../services/admin/index');

module.exports = async (req, res) => {
const clients = await adminService.getBestClients(req, res);
  res.json(clients)
}