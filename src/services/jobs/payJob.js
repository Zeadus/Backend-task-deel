
const { Op, Sequelize } = require('sequelize');

module.exports = async (req, res) => {
  const sequelize = req.app.get('sequelize');
  const t = await sequelize.transaction();

  
  try {
    const profileId = req.profile.dataValues.id;
    const {Job, Contract, Profile} = req.app.get('models')
    const depositAmount = req.body.depositAmount;
    const jobId = req.params.job_id;

    const client = await Profile.findOne({where: {id: profileId, type: 'client'}});
    console.log(client);
    if (!client) {
      throw 'You are not a client';
    };

    let job = await Job.findOne({
      include: {
        model: Contract,
        where: {
          ClientId: profileId
        }
      },
      where: {
        id: jobId
      },
    });

    if (!job) {
      throw 'Job doesnt exist';
    } else if (job.paid) {
      throw 'Job already paid';
    }

    if (job.price > client.balance) {
      throw 'You dont have enough money to pay this job';
    }

    const newBalance = client.balance - job.price;
    await Profile.update({ balance: newBalance }, {
      where: {id: profileId}
    });

    await Job.update({ paid: true, paymentDate: Sequelize.literal("date('now')") }, {
      where: {id: jobId},
      returning: true
    });

    // Unnecessary query here, returning should return the new object but it doesnt seem to be working with sqlite

    job = await Job.findOne({
      include: {
        model: Contract,
        where: {
          ClientId: profileId
        }
      },
      where: {
        id: jobId,
        paid: null
      },
    });

    await t.commit();

    return client;

  } catch (error) {
    await t.rollback();
    throw error;
  }    
}