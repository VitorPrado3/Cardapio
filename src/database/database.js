const Sequelize = require('sequelize');
const connection = new Sequelize('usuariossmart', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;