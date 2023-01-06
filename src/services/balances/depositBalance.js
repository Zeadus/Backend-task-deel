
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const sequelize = req.app.get('sequelize');
  const t = await sequelize.transaction();

  
  try {
    const profileId = req.profile.dataValues.id;
    const {Job, Contract, Profile} = req.app.get('models')
    const depositAmount = req.body.depositAmount;
    const clientId = req.params.userId;

    let client = await Profile.findOne({where: {id: clientId, type: 'client'}});
    console.log(client);
    if (!client) {
      throw 'Client not found';
    }

    const totalUnpaid = await Job.sum('price', {
      include: {
        model: Contract,
        where: {
          ClientId: clientId,
        }
      },
      where: {
        paid: null,
      },
    });

    console.log(totalUnpaid);

    const maxDeposit = totalUnpaid/4;

    if (depositAmount > maxDeposit) {
      throw 'Deposit is higher than 25% of total jobs to pay';
    }

    const newBalance = client.balance + depositAmount;

    console.log(newBalance);

    await Profile.update({ balance: newBalance }, {
      where: {id: clientId},
      returning: true
    });

    // Unnecessary query here, returning should return the new object but it doesnt seem to be working with sqlite

    client = await Profile.findOne({where: {id: clientId, type: 'client'}});
    console.log(client);
    if (!client) {
      throw 'Client not found';
    }

    await t.commit();

    return client;

  } catch (error) {
    await t.rollback();
    throw error;
  }    
}