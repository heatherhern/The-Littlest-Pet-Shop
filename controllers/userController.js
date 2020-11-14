const db = require("../models");
let express = require("express");
let router = express.Router();
const bcrypt = require('bcrypt');

router.post('/api/user/forgot-password', function (req, res) {
    const providedEmail = req.body.email;
    console.log(req.user);

    db.User.findOne({ where: { email: providedEmail } }).then(function (data) {
        let sqlUser = data.dataValues;

        res.send({ id: sqlUser.id });
        res.status(200);

    });
});

router.get('/user/:id/reset-password', function (req, res) {
    res.render("reset-password", { id: req.params.id });
});

router.post('/api/user/:id/reset-password', function (req, res) {
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


module.exports = router;