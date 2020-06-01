const express= require('express');

const authMiddleware = require('./src/middlewares/auth')

const routes = express.Router();

const UserController = require('./src/controllers/UserController');
const BudgetController = require('./src/controllers/BudgetController');

routes.post('/authenticate', UserController.authenticate);
routes.post('/register', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:user_id/budgets', BudgetController.index);
routes.post('/users/:user_id/budgets', BudgetController.store);


module.exports= routes;