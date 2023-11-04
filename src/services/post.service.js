const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const validateCategory = (categoryIds) => {
  const valid = categoryIds.every((categoryId) =>
    Category.findByPk(categoryId));
  return valid;
};

const create = async (newPost, id) => {
  const t = await sequelize.transaction();
  try {
    const { title, content, categoryIds } = newPost;
    const newPost1 = { title, content, userId: id, published: new Date(), updated: new Date() };
    const post = await BlogPost.create(newPost1);
    const postId = post.id;

    const valid = validateCategory(categoryIds);
    if (!valid) return { status: 400, data: { message: 'one or more "categoryIds" not found' } };

    const promises = categoryIds.map((categoryId) =>
      PostCategory.create({ postId, categoryId }, { transaction: t }));
    await Promise.all(promises);
    await t.commit();
    return { status: 201, data: newPost1 };
  } catch (err) {
    await t.rollback();
  }
};

module.exports = {
  create,
};