var passport = require("../config/passport/passport.js");
var path = require("path");
var db = require("../models");
module.exports = function (app, passport) {

    app.get("/logout", function (req, res) {
        console.log("Log Out Route Hit");
        req.session.destroy(function (err) {
            if (err) console.log(err)
            res.sendStatus(200);
        });
    });


    app.post('/api/user/register', passport.authenticate('local-signup'), function (req, res) {
        console.log("signup hit")
        console.log(req.user.id);
        res.sendStatus(200);
    });


    app.post("/api/user/login", passport.authenticate('local-signin'), function (req, res) {
        console.log("login hit");
        console.log(req.user.id);
        res.sendStatus(200);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        return res.redirect('/register');

    }
}