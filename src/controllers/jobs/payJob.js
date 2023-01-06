// @returns contract by id
const jobsService = require('../../services/jobs/index');

module.exports = async (req, res) => {

  try {
    const job = await jobsService.payJob(req, res);
    res.status(200).json(job);
  } catch (error) {
    console.log('ERROR', error);
    const json = {
      message: error
    }
    return res.status(400).send(json).end();
  }
}