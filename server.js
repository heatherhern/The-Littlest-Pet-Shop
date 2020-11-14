const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");
const passport = require("passport");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require("express-session"),
    bodyParser = require("body-parser");


app.use(flash());
app.use(cookieParser());
app.use(express.static("public"));
app.use(session({ secret: "cats",resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport/passport.js")(passport, db.User);
require("./controllers/authController.js")(app,passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let getRoutes = require("./controllers/petController.js");
let userRoutes = require("./controllers/userController.js");

app.use(getRoutes);
app.use(userRoutes);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});


