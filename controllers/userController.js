const db = require("../models");
let express = require("express");
let router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../config/auth/auth.js');

router.post('/user/forgot-password', function (req, res) {
    const providedEmail = req.body.email;

    db.User.findOne({ where: { email: providedEmail } }).then(function (data) {
        let sqlUser = data.dataValues;

        res.send({ id: sqlUser.id });
        res.status(200);
    })
    .catch(function(error){
        res.send("No User Found")
    });
});

router.get('/fogot-password/:error', function(req,res){
    res.render('forgot-password', {error: req.params.error})
});

router.get('/user/:id/reset-password', function (req, res) {
    res.render("reset-password", { id: req.params.id });
});

router.post('/user/:id/reset-password', function (req, res) {
    let selectedId = req.params.id;
    bcrypt.hash(req.body.password, 10).then(function (hashedPass) {
        let newPassword = hashedPass;

        db.User.update({ password: newPassword }, { where: { id: selectedId } }).then(function (result) {
            if (result) {
                res.sendStatus(200);
            }
        })
    });
});

router.post('/user/login', function (req, res) {
    auth.login(req.body).then(function (result) {
        req.session.email = result.email;
        res.end(JSON.stringify({
            code: 200
        }));
    })
        .catch(function (error) {
            res.end(JSON.stringify({
                code: 500,
                error: error
            }));
        });
});

router.post('/user/register', function (req, res) {
    auth.register(req.body).then(function (result) {
        req.session.email = result.email;
        res.end(JSON.stringify({
            code: 200
        }));
    })
        .catch(function (error) {
            res.end(JSON.stringify({
                code: 500,
                error: error
            }));
        });
});

router.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;