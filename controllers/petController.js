const db = require("../models");
const short = require('short-uuid');

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({ apiKey: process.env.API_KEY, secret: process.env.SECRET_KEY });

let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.get("/login/:error", function(req, res){
    res.render('login', {error: req.params.error});
})

router.get("/register", function (req, res) {
    res.render("register");
});

router.get("/register/:error", function (req, res) {
    res.render("register", {error: req.params.error});
});

router.get("/forgot-password", function (req, res) {
    res.render("forgot-password");
});


router.get("/search-pet", function (req, res) {
    client.animal.search().then(function (response) {
        let petArr = [];

        response.data.animals.forEach(element => {
            let petObj = {
                name: element.name,
                url: element.url,
                species: element.species,
                age: element.age,
                gender: element.gender,
                organization_id: element.organization_id,
                email: element.contact.email,
                phone: element.contact.phone,
                address1: element.contact.address.address1,
                address2: element.contact.address.address2,
                city: element.contact.address.city,
                state: element.contact.address.state,
                zipcode: parseInt(element.contact.address.postcode),
                country: element.contact.address.country,
                uuid: short.generate()
            };

            if (res.locals.user) {
                petObj.userId = res.locals.user.id
            }

            if (element.photos[0]) {
                petObj.photo_url = element.photos[0].medium
            } else {
                petObj.photo_url = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png";
            }

            petArr.push(petObj);
        });

        res.render("search-pet", { pet: petArr });

    });

});

router.get("/saved-pets", function (req, res) {
    if(req.session.email){
        // let userId = res.locals.user.id;

        // db.SavedPets.findAll({where: {UserId : userId}}).then(function(response){
        //     console.log(response);
        //     res.render("saved-pets");
        // })

        res.render("saved-pets");
    } else{
        res.render('login');
    }
    
});

router.post("/api/save-pet/:id", function(req, res){
    let userId = req.params.id;
    console.log(req.body);

    db.SavedPets.create(req.body).then(function(response){
        console.log(response);
    });
});




module.exports = router;