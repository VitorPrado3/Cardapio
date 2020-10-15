const Sequelize = require('sequelize');
const connection = require('../../database/database');
const User = require('../users/User');

const Pedido = connection.define('pedidos',{
    idPedido:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    itens:{
        type: Sequelize.STRING,
        allowNull: false
    },
    total:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

User.hasMany(Pedido);
Pedido.belongsTo(User);

Pedido.sync({force: false});

module.exports = Pedido;