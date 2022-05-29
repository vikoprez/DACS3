var express = require('express');
var router = express.Router();

const authAdmin = require('../middlewares/auth-admin');

router.post('/login', (req, res) => {
    // login the user and return the user object
    // if the login is successful
    req.session.email = user.email;
    req.session.role = user.role
})

router.get('/admin', authAdmin, (req, res) => {
    res.render('admin');
});