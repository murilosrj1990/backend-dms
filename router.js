const express= require('express');

const authMiddleware = require('./src/middlewares/auth')

const routes = express.Router();

const UserController = require('./src/controllers/UserController');
const BudgetController = require('./src/controllers/BudgetController');
const ProcedureController = require('./src/controllers/ProcedureController');

routes.post('/authenticate', UserController.authenticate);
routes.post('/register', UserController.store);

routes.get('/users', UserController.index);
routes.delete('/users/:user_id', UserController.delete);

routes.get('/users/:user_id/budgets', BudgetController.index);
routes.post('/users/:user_id/budgets', BudgetController.store);

routes.post('/budgets/:budget_id/procedures', ProcedureController.store);
routes.get('/budgets/:budget_id/procedures', ProcedureController.index);


module.exports= routes;