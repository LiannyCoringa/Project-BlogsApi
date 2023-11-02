const Category = (sequelize, DataTypes) => {
    const CategoryModel = sequelize.define('Category', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'categories',
      timestamps: false,
    });
    return CategoryModel;
  };

  module.exports = Category;