const express = require('express');
const { Job } = require('../models');

const router = express.Router();


router.get('/:contractId/unpaid-jobs', async (req, res) => {
  const { contractId } = req.params;

  try {
    const jobs = await Job.findAll({
      where: { contractId, paid: false },
    });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No unpaid jobs found for this contract' });
    }

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
