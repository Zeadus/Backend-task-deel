const express = require('express');
const router = express.Router();
const balancesController = require('../controllers/balances/index');

// Middlewares
const getProfile = require('../middleware/getProfile');


/**
 * Deposits money into the the the balance of a client, 
 * a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 * @returns profile object
 */
router.post('/deposit/:userId', getProfile, balancesController.depositBalance);

module.exports = router;