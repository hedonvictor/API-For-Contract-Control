module.exports = (sequelize, DataTypes) => {
    const Deposit = sequelize.define('Deposit', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      clientId: DataTypes.INTEGER,
      operationDate: DataTypes.DATE,
      depositValue: DataTypes.DOUBLE,
    }, { tableName: 'Deposits', timestamps: false });
  
    Deposit.associate = (models) => {
      Deposit.belongsTo(models.Profile, { foreignKey: 'clientId', as: 'client' });
    };
  
    return Deposit;
  };
  