const Sequelize = require('sequelize');
const Contract = require('./Contract');

module.exports = (sequelize) => {
  const Profile = sequelize.define('Profile', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance:{
      type:Sequelize.DECIMAL(12,2)
    },
    type: {
      type: Sequelize.ENUM('client', 'contractor')
    }
  });

  Profile.associate = (models) => {
    Profile.hasMany(models.Contract, {as :'Contractor',foreignKey:'ContractorId'})
    models.Contract.belongsTo(Profile, {as: 'Contractor'})

    Profile.hasMany(models.Contract, {as : 'Client', foreignKey:'ClientId'})
    models.Contract.belongsTo(Profile, {as: 'Client'})
  }

  return Profile;
};