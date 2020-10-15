const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const session = require ('express-session');

const productsController = require('./controllers/ProductsController');
const usersController = require('./controllers/UsersController');
//const pedidoController = require('./controllers/PedidosController')

const User = require('./models/users/User');
const Pedido = require('./models/pedidos/Pedido');
const Product = require('./models/products/Product');

app.set('view engine', 'ejs');
app.set('views','src/views')

app.use(session({
    secret:'vitor', cookie: {maxAge: 30000000}
}));

app.use(express.static('src/views/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso');
    }).catch((error) =>{ 
        console.log(error);
    });

app.use('/', productsController);
app.use('/', usersController);

app.get('/', (req, res) =>{
    res.render("index");
});


app.listen(3000, () =>{
    console.log("Servidor on")
});

