const Sequelize = require('sequelize');
const dbConfig = require('../config/database')

const User = require('../models/User');
const Budget = require('../models/Budget');
const Procedure =require('../models/Procedure');


const connection = new Sequelize(dbConfig);

User.init(connection);
Budget.init(connection);
Procedure.init(connection);


Budget.associate(connection.models);
User.associate(connection.models);
Procedure.associate(connection.models);

module.exports = connection;