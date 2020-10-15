const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Product = connection.define('products',{
    idProduct:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false,
        notEmpty: true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
})

Product.sync({force: false});


module.exports = Product;