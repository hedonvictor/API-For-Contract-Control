const { sequelize, Profile, Contract, Job } = require('../models');

async function GetUnpaidJobs(req, res) {
    const { id } = req.params;

    try {
      const jobs = await Job.findAll({
        where: { contractId: id, paid: false },
      });
  
      if (!jobs.length) {
        return res.status(404).json({ error: 'No unpaid jobs found for this contract' });
      }
  
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

module.exports = {GetUnpaidJobs}