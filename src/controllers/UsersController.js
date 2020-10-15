const express = require('express');
const router = express.Router();
const User = require('../models/users/User');
const { cpf } = require('cpf-cnpj-validator'); 
const bcrypt = require('bcrypt');
const adminAuth = require('../middlewares/adminAuth');
const userAuth = require('../middlewares/userAuth');

router.get('/users/new', (req, res) =>{
res.render('users/newCliente.ejs');
});

router.get('/login', (req, res) =>{
   res.render('index.ejs')
    
});

router.get('/admin/login', (req, res) =>{
    res.render("admlogin.ejs")
});

router.post('/users/save', (req, res) =>{

    var name = req.body.name;
    var cpfUser = req.body.cpfUser;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then( user => {
        if (user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        
            var cpfvalido = cpf.isValid(req.body.cpfUser);
        
            const usuarioAtual = User.findOne({
                cpfUser: cpfUser
            });
            
            if(!cpfvalido ){
                
                    res.redirect('/users/new');
                    //adicionar mensagem
                }else{
                    
                if(email != undefined){
                    
                User.create({
                    name: name,
                    cpfUser: cpfUser,
                    email: email,
                    password: hash
                }).then(() =>{
                    res.redirect("/");
                })
        
            }
        }
    }

  else{
      //adicionar mensagem
        res.redirect('/users/new');
    }
})

});

router.get('/admin/users', adminAuth, (req, res) =>{

    User.findAll().then(users =>{
        res.render('admin/index', {users: users});
    });
});

router.post('/user/delete', adminAuth, (req, res) =>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){

            User.destroy({
                where:{
                    idUser: id
                }
            }).then(() =>{
                res.redirect('/admin/users');
            });

        }else{
            res.redirect('/admin/users');
        }
    }else{
        res.redirect('/admin/users');
    }
});

router.get('/user/edit/:id', adminAuth, (req, res) =>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect('/admin/users');
    }

    User.findByPk(id).then(user =>{
        if(user != undefined){

            res.render('admin/edit.ejs', {user: user});

        }else{
        res.redirect('/admin/users');
        }
    }).catch(erro =>{
        res.redirect('/admin/users');
    })
});

router.post('/user/update', adminAuth, (req, res) =>{
    var idUser = req.body.idUser;
    var name = req.body.name;
    var cpfUser = req.body.cpfUser;
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.update({
        idUser: idUser,
        name: name,
        cpfUser: cpfUser,
        email: email,
        password: hash},{
        where: {
            idUser: idUser
        }
    }).then(() =>{
        res.redirect('/admin/users');
    })

});

router.post('/authenticate', (req, res) => {

    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){

            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.idUser,
                    email: user.email
                }
                res.redirect('/user/cardapio');
            }else{
                res.redirect('/login');    
            }
        }else{
            res.redirect('/login');
        }
    })

});

router.post('/authenticateadm', (req, res) => {

    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{email: email}}).then(user => {
        if(user){

            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.idUser,
                    email: user.email
                }
                res.redirect('/admin/users');
            }else{
                res.redirect('/admin/login');    
            }
        }else{
            res.redirect('/admin/login');
        }
    })

});

router.get('/logout', (req, res) =>{
    req.session.user = undefined;
    res.redirect('/');
})

module.exports = router;