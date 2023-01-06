// @returns contract by id
const balancesService = require('../../services/balances/index');

module.exports = async (req, res) => {
  try {
    const profile = await balancesService.depositBalance(req, res);
    res.json(profile)
  } catch (error) {
    console.log('ERROR', error);
    const json = {
      message: error
    }
    return res.status(400).send(json).end();
  }

}