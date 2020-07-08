const express= require('express');

const authMiddleware = require('./src/middlewares/auth');


const routes = express.Router();

const UserController = require('./src/controllers/UserController');
const BudgetController = require('./src/controllers/BudgetController');
const ProcedureController = require('./src/controllers/ProcedureController');
const AnamnesisController = require('./src/controllers/AnamnesisController');

routes.post('/authenticate', UserController.authenticate);
routes.post('/register', UserController.store);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.delete('/users/:user_id', UserController.delete);
routes.put('/users/:user_id', UserController.edit);

routes.get('/users/:user_id/budgets', BudgetController.index);
routes.post('/users/:user_id/budgets', BudgetController.store);
routes.delete('/budgets/:budget_id', BudgetController.delete);

routes.post('/budgets/:budget_id/procedures', ProcedureController.store);
routes.get('/budgets/:budget_id/procedures', ProcedureController.index);

routes.get('/users/:user_id/anamnesis', AnamnesisController.index);
routes.get('/anamnesis/:anamnesis_id', AnamnesisController.get);
routes.post('/users/:user_id/anamnesis', AnamnesisController.store);
routes.put('/anamnesis/:anamnesis_id', AnamnesisController.edit);


module.exports= routes;