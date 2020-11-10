let express = require("express");
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: "5TkMnekEnJXhvW93ahigxXgDTTRoN6vx6ILaDflK6EXBovIOOD", secret: "KGpQTqYKB3gyq72fi5lCvLJ2r81dEGHdC4jLagfO" });

let PORT = process.env.PORT || 3000;

let app = express();

var db = require("./models");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let routes = require("./controllers/petController.js");

app.use(routes);

db.sequelize.sync({ force: true }).then(function () {
    client.animal.search().then(function (response) {
        let clinicArr = [];


        response.data.animals.forEach(element => {
            let petObj = {
                name: element.name,
                url: element.url,
                species: element.species,
                age: element.age,
                gender: element.gender,
                photo_url: element.photos,
                organization_id: element.organization_id
            };

            let clinicObj = {
                organization_id: element.organization_id,
                email: element.contact.email,
                phone: element.contact.phone,
                address1: element.contact.address.address1,
                address2: element.contact.address.address2,
                city: element.contact.address.city,
                state: element.contact.address.state,
                zipcode: parseInt(element.contact.address.postcode),
                country: element.contact.address.country
            };

            clinicArr.forEach(el => {
                if (el.organization_id === clinicObj.organization_id) { }
                else {
                    clinicArr.push(clinicObj);
                }
            });
        });
    });









    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});


