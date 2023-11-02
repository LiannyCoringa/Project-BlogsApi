const PostCategory = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define(
    'PostCategory',
      {
        postId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'blog_posts',
            key: 'id'
          }
        },
        categoryId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'categories',
            key: 'id'
          }
        },
      },
      {
        timestamps: false,
        tableName: 'posts_categories',
        underscored: true,
      },
  );

  PostCategoryModel.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategoryModel,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryModel,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  };

  return PostCategoryModel;
};

module.exports = PostCategory;