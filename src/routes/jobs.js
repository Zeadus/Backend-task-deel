const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobs/index');

// Middlewares
const getProfile = require('../middleware/getProfile');

/**
 * Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.
 * @returns All unpaid jobs for a user
 */
router.get('/unpaid', getProfile, jobsController.getUnpaidJobs);

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay. 
 * The amount should be moved from the client's balance to the contractor balance.
 * @returns confirmation of the payment
 */
router.post('/:job_id/pay', getProfile, jobsController.payJob);

module.exports = router;