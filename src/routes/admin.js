const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/index');

// Middlewares
const getProfile = require('../middleware/getProfile');


/** TODO
 * Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 * @returns contract by id
 */
router.get('/best-profession', getProfile, adminController.getBestProfession);

/** TODO
 * returns the clients the paid the most for jobs in the query time period. 
 * limit query parameter should be applied, default limit is 2.
 * @returns all contracts
 */
router.get('/best-clients', getProfile, adminController.getBestClients);

module.exports = router;