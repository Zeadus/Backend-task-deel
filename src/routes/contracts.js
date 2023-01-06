const express = require('express');
const router = express.Router();
const contractsController = require('../controllers/contracts/index');

// Middlewares
const getProfile = require('../middleware/getProfile');


/**
 *
 * @returns contract by id
 */
router.get('/:id', getProfile, contractsController.getContractByID);

/**
 *
 * @returns all contracts
 */
router.get('/', getProfile, contractsController.getContracts);

module.exports = router;