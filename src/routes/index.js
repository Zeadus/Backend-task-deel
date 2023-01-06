const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin');
const contractsRoutes = require('./contracts');
const balancesRoutes = require('./balances');
const jobsRoutes = require('./jobs');


router.use('/admin', adminRoutes);
router.use('/contracts', contractsRoutes);
router.use('/balances', balancesRoutes);
router.use('/jobs', jobsRoutes);

module.exports = router;