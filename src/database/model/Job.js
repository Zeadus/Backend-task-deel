const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Job = sequelize.define('Job', {
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price:{
      type: Sequelize.DECIMAL(12,2),
      allowNull: false
    },
    paid: {
      type: Sequelize.BOOLEAN,
      default:false
    },
    paymentDate:{
      type: Sequelize.DATE
    }
  });

  Job.associate = (models) => {}

  return Job;
};