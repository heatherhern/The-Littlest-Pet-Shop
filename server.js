const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./models");

app.use(express.static("public"));

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


