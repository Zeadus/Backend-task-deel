
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const {Job,Contract,Profile} = req.app.get('models')
  const {start,end} = req.query;
  const sequelize = req.app.get('sequelize');

  // Date validation for query params would be ideal here to avoid query injections!
  // Also not enough time to check if all the returning sums are correct but they should be!

  const query = `
  SELECT SUM(Jobs.price) as total, Profiles.profession, Profiles.lastName 
  FROM Jobs
  INNER JOIN Contracts ON Jobs.ContractId = Contracts.id
  INNER JOIN Profiles ON Contracts.ContractorId = Profiles.id
  WHERE Jobs.paid IS NOT NULL AND Jobs.paymentDate BETWEEN date('${start}') AND date('${end}')
  GROUP BY Profiles.profession
  ORDER BY total DESC
  `

  const contractors = await sequelize.query(query);

  return contractors[0];
}