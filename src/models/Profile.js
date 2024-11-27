
module.exports = (sequelize, DataTypes) => {
  
  const Profile = sequelize.define(
    'Profile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0, 
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Profiles',
      timestamps: false, 
    }
  );

  
  Profile.associate = (models) => {
    Profile.hasMany(models.Contract, {
      foreignKey: 'clientId',
      as: 'clientContracts', 
    });

    Profile.hasMany(models.Contract, {
      foreignKey: 'contractorId',
      as: 'contractorContracts', 
    });

    Profile.hasMany(models.Deposit, {
      foreignKey: 'clientId',
      as: 'deposits', 
    });
  };

  return Profile;
};
