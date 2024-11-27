module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      jobId: DataTypes.INTEGER,
      operationDate: DataTypes.DATE,
      paymentValue: DataTypes.DOUBLE,
    }, { tableName: 'Payments', timestamps: false });
  
    Payment.associate = (models) => {
      Payment.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
    };
  
    return Payment;
  };
  