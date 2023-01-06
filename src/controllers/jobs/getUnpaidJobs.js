// @returns contract by id
const jobsService = require('../../services/jobs/index');

module.exports = async (req, res) => {
  const jobs = await jobsService.getUnpaidJobs(req, res);

  if(!jobs){
    const json ={
      message: 'No pending jobs'
    };
  
    return res.status(404).send(json).end();
  }

  res.json(jobs)
}