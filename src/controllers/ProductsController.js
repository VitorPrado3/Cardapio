const express = require('express');
const router = express.Router();
const Product = require('../models/products/Product');
const adminAuth = require('../middlewares/adminAuth');
const userAuth = require('../middlewares/userAuth');


router.get('/admin/new', (req, res) =>{
    res.render("admin/cadastroProdutos.ejs")
});

router.post('/admin/save', adminAuth, (req, res) =>{

    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var category = req.body.category;

        if(name != undefined){

        Product.create({
            name: name,
            price: price,
            description: description,
            category: category
        }).then(() =>{
            res.redirect("/admin/produtos");
        })

    }else{
        res.redirect('/admin/new');
    }
});

router.get('/admin/produtos', adminAuth, (req, res) =>{

    Product.findAll().then(products =>{
        res.render('admin/produtos', {products: products});
    });
});

router.get('/user/cardapio', userAuth, (req, res) =>{
    
    Product.findAll().then(products =>{
        res.render('users/cardapio', {products: products});
    });
});

router.post('/produto/delete', adminAuth, (req, res) =>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){

            Product.destroy({
                where:{
                    idProduct: id
                }
            }).then(() =>{
                res.redirect('/admin/produtos');
            });

        }else{
            res.redirect('/admin/produtos');
        }
    }else{
        res.redirect('/admin/produtos');
    }
});

router.get('/produto/edit/:id', adminAuth, (req, res) =>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/produtos');
    }

    Product.findByPk(id).then(product =>{
        if(product != undefined){

            res.render('admin/editproduto.ejs', {product: product});

        }else{
        res.redirect('/admin/produtos');
        }
    }).catch(erro =>{
        res.redirect('/admin/produtos');
    })
});

router.post('/produto/update', adminAuth, (req, res) =>{

    var idProduct = req.body.idProduct;
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    var category = req.body.category;

    Product.update({
        idProduct: idProduct,
        name: name,
        price: price,
        description: description,
        category: category},{
        where: {
            idProduct: idProduct
        }
    }).then(() =>{
        res.redirect('/admin/produtos');
    })

});

module.exports = router;