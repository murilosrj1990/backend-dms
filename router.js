const express= require('express');

const routes = express.Router();

const UserController = require('./src/controllers/UserController');


routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

module.exports= routes;