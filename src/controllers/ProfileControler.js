const { sequelize, Profile, Contract, Job } = require('../models');


async function GetContractsById(req, res) {
    const { id } = req.params;

    try {
      const contracts = await Contract.findAll({
        where: { clientId: id },
      });
  
      if (!contracts.length) {
        return res.status(404).json({ error: 'No contracts found for this profile' });
      }
  
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

async function DepositiForId(req, res) {
    const { id } = req.params;
    const { depositValue } = req.body;
  
    if (!depositValue || depositValue <= 0) {
      return res.status(400).json({ error: 'Invalid deposit value' });
    }
  
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) return res.status(404).json({ error: 'Profile not found' });
  
    
      profile.balance += depositValue;
      await profile.save();
  
     
      await Deposit.create({
        clientId: id,
        depositValue,
        operationDate: new Date(),
      });
  
      res.json({ message: 'Deposit successful', profile });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}



module.exports = {GetContractsById, DepositiForId}