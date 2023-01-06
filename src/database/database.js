const Sequelize = require('sequelize');

// DB Config this could be moved to a different js file while having config values in another place but for this scenario which is a simple sqlite databse its not necessary
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

//There are better ways of doing this, like scanning for all files in the model folder and doing it programatically, but for this scenario ill do it simple

// Models
const Profile = require('./model/Profile')(sequelize);
const Contract = require('./model/Contract')(sequelize);
const Job = require('./model/Job')(sequelize);

// Associations
Profile.associate(sequelize.models);
Contract.associate(sequelize.models);
Job.associate(sequelize.models);


module.exports = {
  sequelize,
  Profile,
  Contract,
  Job
};
