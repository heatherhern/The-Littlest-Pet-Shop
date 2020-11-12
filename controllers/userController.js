const db = require("../models");
let express = require("express");
let router = express.Router();

const bcrypt = require('bcrypt');




router.post('/api/user/register', function(req, res){
    const registerObj = req.body;

    bcrypt.hash(registerObj.password, 10).then(function(hashedPass){
        registerObj.password = hashedPass;

        if(registerObj.agreeToTerms === 'on'){
            registerObj.agreeToTerms = true;
        };

        console.log(registerObj);

        res.status(200);
        res.json(200);
    });
});


module.exports = router;