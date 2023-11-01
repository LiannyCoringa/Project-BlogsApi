const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await loginService.login(email, password);
  return res.status(status).json(data);
};

module.exports = {
  login,
};