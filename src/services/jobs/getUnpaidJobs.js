const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const {Job, Contract} = req.app.get('models')
  
  const profileId = req.profile.dataValues.id;

  const jobs = await Job.findAll({
    include: {
      model: Contract,
      where: {
        [Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ]
      }
    },
    where: {
      paid: null,
    },
  });
  
  return jobs;
}