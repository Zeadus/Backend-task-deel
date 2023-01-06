
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const {Contract} = req.app.get('models')
  
  const {id} = req.params
  const profileId = req.profile.dataValues.id;

  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId },
      ]
    },
  });
  
  return contract;
}