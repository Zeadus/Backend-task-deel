const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Contract = sequelize.define('Contract', {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status:{
      type: Sequelize.ENUM('new','in_progress','terminated')
    }
  });

  Contract.associate = (models) => {
    Contract.hasMany(models.Job);
    models.Job.belongsTo(Contract);
  };

  return Contract;
};