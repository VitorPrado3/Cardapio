function adminAuth(req, res, next){
    if(req.session.user.email == 'adm@gmail.com'){
        next();
    }else{
        res.redirect('/');
    }
}

module.exports = adminAuth