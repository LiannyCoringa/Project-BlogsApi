const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    underscored: true,
    tableName: 'users',
    timestamps: false,
  });
  return UserModel;
};

module.exports = User;