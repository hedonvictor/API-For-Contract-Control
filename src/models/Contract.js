module.exports = (sequelize, DataTypes) => {
    const Contract = sequelize.define('Contract', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      terms: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
      contractorId: DataTypes.INTEGER,
      operationDate: DataTypes.DATE,
      status: DataTypes.STRING,
    }, { tableName: 'Contracts', timestamps: false });
  
    Contract.associate = (models) => {
      Contract.belongsTo(models.Profile, { foreignKey: 'clientId', as: 'client' });
      Contract.belongsTo(models.Profile, { foreignKey: 'contractorId', as: 'contractor' });
      Contract.hasMany(models.Job, { foreignKey: 'contractId', as: 'jobs' });
    };
  
    return Contract;
  };
  