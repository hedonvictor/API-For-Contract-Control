const express = require('express');
const { Profile, Contract } = require('../models');

const router = express.Router();


router.get('/:profileId/contracts', async (req, res) => {
  const { profileId } = req.params;

  try {
    const profile = await Profile.findByPk(profileId, {
      include: [
        { model: Contract, as: 'clientContracts' },
        { model: Contract, as: 'contractorContracts' },
      ],
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      clientContracts: profile.clientContracts,
      contractorContracts: profile.contractorContracts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
  
router.post('/:profileId/deposit', async (req, res) => {
    const { profileId } = req.params;
    const { depositValue } = req.body;
  
    if (depositValue <= 0) {
      return res.status(400).json({ error: 'Deposit value must be greater than 0' });
    }
  
    try {
      const profile = await Profile.findByPk(profileId);
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      
      profile.balance += depositValue;
      await profile.save();
  
      
      await profile.createDeposit({
        clientId: profile.id,
        operationDate: new Date(),
        depositValue,
      });
  
      res.json({ message: 'Deposit successful', profile });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
  
});

module.exports = router;
