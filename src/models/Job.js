module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      contractId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      operationDate: DataTypes.DATE,
      paymentDate: DataTypes.DATE,
      price: DataTypes.DOUBLE,
      paid: DataTypes.BOOLEAN,
    }, { tableName: 'Jobs', timestamps: false });
  
    Job.associate = (models) => {
      Job.belongsTo(models.Contract, { foreignKey: 'contractId', as: 'contract' });
    };
  
    return Job;
  };
  