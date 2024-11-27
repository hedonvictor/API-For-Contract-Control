const { Sequelize, DataTypes } = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const models = {};
models.Profile = require('./Profile')(sequelize, DataTypes);
models.Contract = require('./Contract')(sequelize, DataTypes);
models.Job = require('./Job')(sequelize, DataTypes);
models.Deposit = require('./Deposit')(sequelize, DataTypes);
models.Payment = require('./Payment')(sequelize, DataTypes);

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
