const express = require('express');
const loginController = require('./controllers/login');
const userController = require('./controllers/userController');
const loginMiddleware = require('./middlewares/login');
const userMiddleware = require('./middlewares/user');
const auth = require('./middlewares/auth');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginMiddleware, loginController.login);
app.get('/user', auth, userController.findAll);
app.post('/user', userMiddleware, userController.create);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
