const Sequelize = require('sequelize');
const connection = require('../../database/database');

const User = connection.define('users',{
    idUser:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    cpfUser:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        unique:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
})

User.sync({force: false});

module.exports = User;