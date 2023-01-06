// @returns contract by id
const contractsService = require('../../services/contracts/index');

module.exports = async (req, res) => {
  const contract = await contractsService.getContractByID(req, res);

  if(!contract){
    const json ={
      message: 'Contract not found'
    };
  
    return res.status(404).send(json).end();
  }

  res.json(contract)
}