const Sequelize = require('sequelize');
const dbConfig = require('../config/database')

const User = require('../models/User');
const Budget = require('../models/Budget');
const Procedure =require('../models/Procedure');
const Anamnesis = require('../models/Anamnesis');

console.log(dbConfig);

const connection = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL,dbConfig);

User.init(connection);
Budget.init(connection);
Procedure.init(connection);
Anamnesis.init(connection);


Budget.associate(connection.models);
User.associate(connection.models);
Procedure.associate(connection.models);
Anamnesis.associate(connection.models);

module.exports = connection;