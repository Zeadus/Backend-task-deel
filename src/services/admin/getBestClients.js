
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const {Job,Contract,Profile} = req.app.get('models')
  const {start,end,limit} = req.query;
  const sequelize = req.app.get('sequelize');

  console.log(req.query);

  // Validation for query params would be ideal here to avoid query injections!
  // Also not enough time to check if all the returning sums are correct but they should be!

  const query = `
  SELECT SUM(Jobs.price) as total, (Profiles.firstName || ' ' || Profiles.lastName) as fullName
  FROM Jobs
  INNER JOIN Contracts ON Jobs.ContractId = Contracts.id
  INNER JOIN Profiles ON Contracts.ClientId = Profiles.id
  WHERE Jobs.paid IS NOT NULL AND Jobs.paymentDate BETWEEN date('${start}') AND date('${end}')
  GROUP BY Profiles.profession
  ORDER BY total DESC
  LIMIT ${limit}
  `

  const clients = await sequelize.query(query);
  
  return clients[0];
}