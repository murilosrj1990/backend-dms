const express= require('express');

const authMiddleware = require('./src/middlewares/auth')

const routes = express.Router();

const UserController = require('./src/controllers/UserController');


routes.get('/users', authMiddleware,UserController.index);
routes.post('/users', authMiddleware, UserController.store);
routes.post('/authenticate', UserController.authenticate);

module.exports= routes;