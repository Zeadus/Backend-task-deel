
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const {Contract} = req.app.get('models')
  const profileId = req.profile.dataValues.id;
  

  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId },
      ]
    },
  });
  
  return contracts;
}