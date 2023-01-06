// @returns contract by id
const contractsService = require('../../services/contracts/index');

module.exports = async (req, res) => {
  const contract = await contractsService.getContracts(req, res);

  if(!contract){
    const json ={
      message: 'No Contracts found'
    };
  
    return res.status(404).send(json).end();
  }

  res.json(contract)
}