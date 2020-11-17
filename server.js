const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");
const cookieParser = require('cookie-parser');
const session = require("express-session"),
    bodyParser = require("body-parser");

let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({
    secret: "yo mama",
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));

app.use((req, res, next) => {
    if (req.session.email) {
        db.User.findOne({ where: { email: req.session.email } }).then(function (user) {
            res.locals.user = {
                id: user.id,
                name: user.name
            }
            next();
        })
    }else{
        next();
    }
    
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let getRoutes = require("./controllers/petController.js");
let userRoutes = require("./controllers/userController.js");

app.use(getRoutes);
app.use(userRoutes);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});


