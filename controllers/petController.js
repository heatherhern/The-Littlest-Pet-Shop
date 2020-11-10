const db = require("../models");

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: "5TkMnekEnJXhvW93ahigxXgDTTRoN6vx6ILaDflK6EXBovIOOD", secret: "KGpQTqYKB3gyq72fi5lCvLJ2r81dEGHdC4jLagfO" });

let express = require("express");
let router = express.Router();


router.get("/", function (req, res) {
    client.animal.search().then(function (response) {
        //console.log(response.data.animals[0]);
        //console.log(response.data.animals.length);
        response.data.animals.forEach(element => {
            let petObj = {
                name: element.name,
                url: element.url,
                species: element.species,
                age: element.age,
                gender: element.gender,
                photo_url: element.photos
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

            console.log(petObj);
            console.log("++++++++++++++++++++++++++++");
            console.log(clinicObj);
            console.log("===========================================================")
        });


    })
    //res.render("index");
})






module.exports = router;